import { AvatarEmoji } from './avatar-emoji'
import { formatCurrency } from '@/lib/utils'
import type { FriendBalance } from '@/lib/mock-data'

interface FriendRowProps {
  friend: FriendBalance
  onSettle?: () => void
}

export function FriendRow({ friend, onSettle }: FriendRowProps) {
  const balance = friend.balance
  const label = balance > 0 ? 'owes you' : balance < 0 ? 'you owe' : 'all settled'
  const color = balance > 0 ? 'text-emerald-600' : balance < 0 ? 'text-coral-500' : 'text-muted-foreground'

  return (
    <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card px-4 py-3 shadow-sm transition-colors hover:border-emerald/40 hover:bg-card/80">
      <div className="flex items-center gap-3">
        <AvatarEmoji emoji={friend.emoji} size="md" />
        <div>
          <p className="text-sm font-semibold text-foreground">{friend.name}</p>
          <p className="text-xs text-muted-foreground">
            {friend.highlight ?? `Last activity ${friend.lastActivity}`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${color}`}>
          {label !== 'all settled' ? `${label} ${formatCurrency(Math.abs(balance))}` : 'All settled 💸'}
        </p>
        <p className="text-[11px] text-muted-foreground">{friend.lastActivity}</p>
      </div>
    </div>
  )
}
