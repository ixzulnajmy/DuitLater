// file: lib/calc.ts
import { BillItem, BillSplitMethod } from '@/types/bill'

const toTwo = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

const clampNonNegative = (value: number) => {
  return value < 0 ? 0 : value
}

export function computeNetTotal(args: {
  method: BillSplitMethod
  total?: number
  items?: BillItem[]
  serviceChargePct?: number
  taxPct?: number
  tip?: number
  discount?: number
}): {
  net: number
  subtotal: number
  serviceAmt: number
  taxAmt: number
  tip: number
  discount: number
} {
  const {
    method,
    total,
    items = [],
    serviceChargePct = 0,
    taxPct = 0,
    tip = 0,
    discount = 0,
  } = args

  const subtotalRaw =
    method === 'itemized'
      ? items.reduce((acc, item) => acc + (isFinite(item.price) ? item.price : 0), 0)
      : total ?? 0

  const subtotal = clampNonNegative(subtotalRaw)

  let net = subtotal

  const safeServicePct = clampNonNegative(serviceChargePct)
  const safeTaxPct = clampNonNegative(taxPct)
  const safeTip = clampNonNegative(tip)
  const safeDiscount = clampNonNegative(discount)

  const serviceAmt = safeServicePct > 0 ? (net * safeServicePct) / 100 : 0
  net += serviceAmt

  const taxAmt = safeTaxPct > 0 ? (net * safeTaxPct) / 100 : 0
  net += taxAmt

  net += safeTip

  const netBeforeDiscount = net
  const discountApplied = Math.min(safeDiscount, netBeforeDiscount)
  net -= discountApplied

  const finalNet = toTwo(clampNonNegative(net))

  return {
    net: finalNet,
    subtotal: toTwo(subtotal),
    serviceAmt: toTwo(serviceAmt),
    taxAmt: toTwo(taxAmt),
    tip: toTwo(safeTip),
    discount: toTwo(discountApplied),
  }
}

export function computeShares(params: {
  method: BillSplitMethod
  payerId: string
  participantIds: string[]
  items: BillItem[]
  total?: number
  serviceChargePct?: number
  taxPct?: number
  tip?: number
  discount?: number
}): {
  net: number
  byUser: Record<string, number>
  roundingAdjustment: { userId: string; amount: number } | null
} {
  const {
    method,
    payerId,
    participantIds,
    items,
    total,
    serviceChargePct,
    taxPct,
    tip,
    discount,
  } = params

  const participants = Array.from(new Set(participantIds))
  const baseShares: Record<string, number> = {}
  participants.forEach((id) => {
    baseShares[id] = 0
  })

  if (participants.length === 0) {
    return { net: 0, byUser: baseShares, roundingAdjustment: null }
  }

  const netInfo = computeNetTotal({
    method,
    total,
    items,
    serviceChargePct,
    taxPct,
    tip,
    discount,
  })

  if (method === 'equal') {
    const count = participants.length
    if (count === 0 || !isFinite(count) || netInfo.net === 0) {
      return { net: netInfo.net, byUser: baseShares, roundingAdjustment: null }
    }

    const rawShare = netInfo.net / count
    const roundedShare = toTwo(rawShare)

    let assignedTotal = 0
    participants.forEach((id) => {
      baseShares[id] = roundedShare
      assignedTotal += roundedShare
    })

    const residual = toTwo(netInfo.net - assignedTotal)

    if (Math.abs(residual) > 0) {
      baseShares[payerId] = toTwo((baseShares[payerId] ?? 0) + residual)
      return {
        net: netInfo.net,
        byUser: baseShares,
        roundingAdjustment: {
          userId: payerId,
          amount: toTwo(residual),
        },
      }
    }

    return { net: netInfo.net, byUser: baseShares, roundingAdjustment: null }
  }

  // Itemized
  const participantSet = new Set(participants)
  const subtotalShares: Record<string, number> = {}
  participants.forEach((id) => {
    subtotalShares[id] = 0
  })

  items.forEach((item) => {
    if (!item.price || item.price <= 0) return
    const assignees = item.assigneeIds.filter((id) => participantSet.has(id))
    if (assignees.length === 0) return
    const share = item.price / assignees.length
    assignees.forEach((id) => {
      subtotalShares[id] = (subtotalShares[id] ?? 0) + share
    })
  })

  const subtotal = Object.values(subtotalShares).reduce((acc, value) => acc + value, 0)

  const serviceTotal = netInfo.serviceAmt
  const taxTotal = netInfo.taxAmt
  const tipTotal = netInfo.tip
  const discountTotal = netInfo.discount

  participants.forEach((id) => {
    const userSubtotal = subtotalShares[id] ?? 0
    const ratio = subtotal > 0 ? userSubtotal / subtotal : 0
    const serviceShare = serviceTotal * ratio
    const taxShare = taxTotal * ratio
    const tipShare = tipTotal * ratio
    const discountShare = discountTotal * ratio
    baseShares[id] = userSubtotal + serviceShare + taxShare + tipShare - discountShare
  })

  let assignedTotal = 0
  participants.forEach((id) => {
    baseShares[id] = toTwo(baseShares[id] ?? 0)
    assignedTotal += baseShares[id]
  })

  const residual = toTwo(netInfo.net - assignedTotal)
  if (Math.abs(residual) > 0) {
    baseShares[payerId] = toTwo((baseShares[payerId] ?? 0) + residual)
    return {
      net: netInfo.net,
      byUser: baseShares,
      roundingAdjustment: {
        userId: payerId,
        amount: toTwo(residual),
      },
    }
  }

  return { net: netInfo.net, byUser: baseShares, roundingAdjustment: null }
}
