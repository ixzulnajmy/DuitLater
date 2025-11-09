"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BalanceCardProps {
  balance: number
  className?: string
}

export function BalanceCard({ balance, className }: BalanceCardProps) {
  const isPositive = balance >= 0
  const absBalance = Math.abs(balance)

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">Your Balance</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">RM</span>
          <span
            className={cn(
              "text-5xl font-bold",
              isPositive ? "text-primary" : "text-accent"
            )}
          >
            {absBalance.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {isPositive
            ? balance === 0
              ? "All settled! 🎉"
              : "You're owed"
            : "You owe"
          }
        </p>
      </div>
    </Card>
  )
}
