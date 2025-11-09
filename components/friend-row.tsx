"use client"

import { Friend } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AvatarEmoji } from "./avatar-emoji"

interface FriendRowProps {
  friend: Friend
  onSettle?: (friendId: string) => void
  className?: string
}

export function FriendRow({ friend, onSettle, className }: FriendRowProps) {
  const isPositive = friend.balance > 0
  const isZero = friend.balance === 0

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-2xl bg-card border border-border",
      className
    )}>
      <div className="flex items-center gap-3">
        <AvatarEmoji emoji={friend.emoji} size="md" />
        <div>
          <p className="font-semibold">{friend.name}</p>
          {!isZero && (
            <p className="text-sm text-muted-foreground">
              {isPositive ? 'owes you' : 'you owe'}
            </p>
          )}
          {isZero && (
            <p className="text-sm text-primary">All settled! ✨</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className={cn(
          "text-lg font-bold",
          isZero ? "text-muted-foreground" : isPositive ? "text-primary" : "text-accent"
        )}>
          {!isZero && (isPositive ? '+' : '-')}RM {Math.abs(friend.balance).toFixed(2)}
        </p>
        {!isZero && onSettle && (
          <Button
            size="sm"
            variant={isPositive ? "default" : "outline"}
            onClick={() => onSettle(friend.id)}
          >
            Settle
          </Button>
        )}
      </div>
    </div>
  )
}
