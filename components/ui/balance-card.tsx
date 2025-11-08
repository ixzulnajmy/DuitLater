import { formatCurrency } from '@/lib/utils'

interface BalanceCardProps {
  net: number
  youAreOwed: number
  youOwe: number
}

export function BalanceCard({ net, youAreOwed, youOwe }: BalanceCardProps) {
  const isPositive = net >= 0
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 p-6 text-emerald-950 shadow-glow">
      <div className="absolute inset-x-6 top-6 flex justify-between text-sm font-semibold uppercase tracking-widest text-emerald-900/60">
        <span>Your Balance</span>
        <span>{isPositive ? 'You are up 🎉' : 'Let’s settle soon'}</span>
      </div>
      <div className="pt-10">
        <div className="text-[2.75rem] font-bold leading-none">{formatCurrency(net)}</div>
        <p className="mt-2 max-w-[15rem] text-sm text-emerald-900/70">
          {isPositive ? 'Friends owe you more than you owe them. Treat yourself to teh tarik!' : 'You owe more than you are owed. Time to settle up 💸'}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/70 px-4 py-3">
            <p className="text-emerald-900/60">You are owed</p>
            <p className="text-lg font-semibold text-emerald-900">{formatCurrency(youAreOwed)}</p>
          </div>
          <div className="rounded-2xl bg-emerald-900/10 px-4 py-3">
            <p className="text-emerald-900/60">You owe</p>
            <p className="text-lg font-semibold text-emerald-900">{formatCurrency(youOwe)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
