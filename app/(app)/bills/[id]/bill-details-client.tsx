'use client'

import { useEffect, useMemo, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/ui/header'
import { AvatarEmoji } from '@/components/ui/avatar-emoji'
import { PrimaryButton, GhostButton } from '@/components/ui/buttons'
import { useQuery } from '@/lib/mock-query'
import { outstandingBills, recentBills } from '@/lib/mock-data'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'
import { toast } from 'sonner'

type BillDetailsClientProps = {
  billId: string
}

export default function BillDetailsClient({ billId }: BillDetailsClientProps) {
  const { data } = useQuery({
    queryKey: ['all-bills'],
    queryFn: async () => [...outstandingBills, ...recentBills],
    initialData: [...outstandingBills, ...recentBills],
  })

  const initialBill = useMemo(() => data?.find((bill) => bill.id === billId), [data, billId])
  const [bill, setBill] = useState(initialBill)

  useEffect(() => {
    setBill(initialBill)
  }, [initialBill])

  if (!bill) {
    notFound()
  }

  const totalParticipants = bill.participants.length
  const amountEach = bill.total / totalParticipants

  const markAsPaid = () => {
    if (bill.status === 'settled') return
    setBill({ ...bill, status: 'settled', youOwe: 0 })
    toast.success('Bill settled!')
  }

  return (
    <div className="space-y-6">
      <Header title={bill.title} subtitle={bill.location} showBack />
      <section className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Total bill</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{formatCurrency(bill.total)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              You {bill.youOwe >= 0 ? 'owe' : 'get back'}
            </p>
            <p className={`text-xl font-semibold ${bill.youOwe > 0 ? 'text-coral-500' : 'text-emerald-600'}`}>
              {formatCurrency(Math.abs(bill.youOwe))}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1 font-medium">Paid by {bill.payer}</span>
          <span>•</span>
          <span>{formatRelativeDate(bill.date)}</span>
          <span>•</span>
          <span>{totalParticipants} friends</span>
        </div>
        {bill.notes ? <p className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">{bill.notes}</p> : null}
        <div className="grid grid-cols-1 gap-3">
          {bill.participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <AvatarEmoji emoji={participant.emoji} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{participant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {participant.hasPaid ? 'Paid' : 'Pending'} · {formatCurrency(amountEach)} share
                  </p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${participant.hasPaid ? 'text-emerald-600' : 'text-coral-500'}`}>
                {participant.hasPaid ? 'Paid' : formatCurrency(participant.amount)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryButton onClick={markAsPaid} isActive={bill.status === 'pending'} disabled={bill.status !== 'pending'}>
            {bill.status === 'pending' ? 'Mark as paid' : 'Already settled 💚'}
          </PrimaryButton>
          <GhostButton onClick={() => toast.info('Receipt coming soon!')}>View receipt</GhostButton>
        </div>
      </section>
    </div>
  )
}
