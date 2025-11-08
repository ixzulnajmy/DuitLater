import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'
import type { BillSummary } from '@/lib/mock-data'
import { PrimaryButton } from './buttons'

interface BillCardProps {
  bill: BillSummary
  href?: string
  onSettle?: () => void
  showAction?: boolean
}

export function BillCard({ bill, href = '#', onSettle, showAction = false }: BillCardProps) {
  const amountClass = bill.youOwe > 0 ? 'text-coral-500' : bill.youOwe < 0 ? 'text-emerald-600' : 'text-emerald-900'

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card p-5 shadow-sm ring-1 ring-inset ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-card/80 dark:ring-white/10">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-10" style={{ background: bill.accent }} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{bill.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{bill.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{bill.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">You {bill.youOwe >= 0 ? 'owe' : 'get back'}</p>
          <p className={`text-xl font-semibold ${amountClass}`}>{formatCurrency(Math.abs(bill.youOwe))}</p>
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">Paid by {bill.payer}</span>
          <span>•</span>
          <span>{formatRelativeDate(bill.date)}</span>
        </div>
        <span className={bill.status === 'pending' ? 'text-coral-500 font-medium' : 'text-emerald-500 font-medium'}>
          {bill.status === 'pending' ? 'Pending' : 'Settled'}
        </span>
      </div>
      <div className="relative mt-4 flex items-center justify-between gap-3">
        {bill.status === 'pending' && onSettle ? (
          <PrimaryButton className="h-11 w-auto px-6" onClick={onSettle}>
            Settle
          </PrimaryButton>
        ) : (
          <span className="text-sm text-muted-foreground">Split with {bill.participants.length} friends</span>
        )}
        <Link href={href} className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
          View
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
