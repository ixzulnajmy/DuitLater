// file: app/api/bills/route.ts
import { NextResponse } from 'next/server'

import { computeShares } from '@/lib/calc'
import { billFormSchema, toOptionalNumber } from '@/lib/validation/bill'
import { BillItem } from '@/types/bill'

const parseJSONField = <T>(value: FormDataEntryValue | null): T | undefined => {
  if (!value) return undefined
  try {
    return JSON.parse(String(value)) as T
  } catch (error) {
    console.error('Failed to parse JSON field', error)
    return undefined
  }
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const participantIds = parseJSONField<string[]>(formData.get('participantIds')) ?? []
  const tags = parseJSONField<string[]>(formData.get('tags')) ?? []
  const items = parseJSONField<BillItem[]>(formData.get('items')) ?? []
  const normalisedItems = items.map((item, index) => ({
    id: item.id ?? `item_${index}`,
    name: item.name ?? '',
    price:
      typeof item.price === 'number'
        ? item.price
        : toOptionalNumber(item.price) ?? 0,
    assigneeIds: Array.isArray(item.assigneeIds)
      ? item.assigneeIds.map((id) => id.toString())
      : [],
  }))

  const payload = {
    title: formData.get('title')?.toString() ?? '',
    date: formData.get('date')?.toString() ?? '',
    merchant: formData.get('merchant')?.toString() ?? undefined,
    notes: formData.get('notes')?.toString() ?? undefined,
    currency: 'MYR' as const,
    total: toOptionalNumber(formData.get('total')),
    method: (formData.get('method')?.toString() ?? 'equal') as 'equal' | 'itemized',
    payerId: formData.get('payerId')?.toString() ?? '',
    participantIds,
    serviceChargePct: toOptionalNumber(formData.get('serviceChargePct')),
    taxPct: toOptionalNumber(formData.get('taxPct')),
    tip: toOptionalNumber(formData.get('tip')),
    discount: toOptionalNumber(formData.get('discount')),
    tags,
    groupTag: formData.get('groupTag')?.toString() ?? undefined,
    receiptFile: formData.get('receiptFile') instanceof File ? (formData.get('receiptFile') as File) : null,
    items: normalisedItems,
  }

  const parsed = billFormSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Validation failed', errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data

  const shareInfo = computeShares({
    method: data.method,
    payerId: data.payerId,
    participantIds: data.participantIds,
    items: data.items,
    total: data.total,
    serviceChargePct: data.serviceChargePct,
    taxPct: data.taxPct,
    tip: data.tip,
    discount: data.discount,
  })

  return NextResponse.json({
    id: crypto.randomUUID(),
    net: shareInfo.net,
    shares: shareInfo.byUser,
    roundingAdjustment: shareInfo.roundingAdjustment,
  })
}
