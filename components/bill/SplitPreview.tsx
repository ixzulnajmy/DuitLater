// file: components/bill/SplitPreview.tsx
'use client'

import * as React from 'react'
import { Users, Info } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { computeNetTotal, computeShares } from '@/lib/calc'
import { BillItem, BillSplitMethod, User } from '@/types/bill'

type SplitPreviewProps = {
  method: BillSplitMethod
  payerId: string
  participantIds: string[]
  total?: number
  items: BillItem[]
  serviceChargePct?: number
  taxPct?: number
  tip?: number
  discount?: number
  users: User[]
}

export function SplitPreview(props: SplitPreviewProps) {
  const {
    method,
    payerId,
    participantIds,
    total,
    items,
    serviceChargePct,
    taxPct,
    tip,
    discount,
    users,
  } = props

  const participants = participantIds.filter((id, idx, arr) => arr.indexOf(id) === idx)
  const userMap = React.useMemo(() => {
    const map = new Map<string, User>()
    users.forEach((user) => map.set(user.id, user))
    return map
  }, [users])

  const netInfo = computeNetTotal({
    method,
    total,
    items,
    serviceChargePct,
    taxPct,
    tip,
    discount,
  })

  const shareInfo = computeShares({
    method,
    payerId,
    participantIds,
    items,
    total,
    serviceChargePct,
    taxPct,
    tip,
    discount,
  })

  const insufficientParticipants = participants.length < 2

  return (
    <Card className="sticky top-20 space-y-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-orange-500" /> Split preview
        </CardTitle>
        <p className="text-sm text-neutral-500">
          Updated instantly as you adjust the bill. Totals shown in Malaysian Ringgit (MYR).
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="space-y-2">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-900">{formatCurrency(netInfo.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Service charge</span>
            <span className="font-medium text-neutral-900">{formatCurrency(netInfo.serviceAmt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Tax</span>
            <span className="font-medium text-neutral-900">{formatCurrency(netInfo.taxAmt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Tip</span>
            <span className="font-medium text-neutral-900">{formatCurrency(netInfo.tip)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Discount</span>
            <span className="font-medium text-neutral-900">
              {netInfo.discount > 0 ? `- ${formatCurrency(netInfo.discount)}` : formatCurrency(0)}
            </span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-neutral-900">
            <span>Net total</span>
            <span>{formatCurrency(shareInfo.net)}</span>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <span>Who owes what</span>
            <Badge variant="secondary">{method === 'equal' ? 'Divide equally' : 'Itemized'}</Badge>
          </div>

          {insufficientParticipants ? (
            <div className="flex items-start gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-600">
              <Info className="mt-0.5 h-4 w-4 text-orange-500" aria-hidden="true" />
              <span>Add at least 2 people to split.</span>
            </div>
          ) : null}

          {participants.length === 0 ? (
            <p className="text-sm text-neutral-500">Select friends to view their shares.</p>
          ) : (
            <ul className="space-y-3">
              {participants.map((participantId) => {
                const user = userMap.get(participantId)
                const amount = shareInfo.byUser[participantId] ?? 0
                return (
                  <li
                    key={participantId}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium text-neutral-900">{user?.name ?? 'Unknown'}</span>
                      <span className="text-xs text-neutral-500">@{user?.username ?? 'user'}</span>
                    </span>
                    <span className="text-right font-semibold text-neutral-900">
                      {formatCurrency(amount)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}

          {shareInfo.roundingAdjustment && Math.abs(shareInfo.roundingAdjustment.amount) > 0 ? (
            <p className="text-xs text-neutral-500">
              Rounding adj: {formatCurrency(Math.abs(shareInfo.roundingAdjustment.amount))} applied to
              {" "}
              <span className="font-medium text-neutral-700">
                {userMap.get(shareInfo.roundingAdjustment.userId)?.name ?? 'payer'}
              </span>
              .
            </p>
          ) : null}
        </section>
      </CardContent>
    </Card>
  )
}
