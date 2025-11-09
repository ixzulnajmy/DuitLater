"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bill, mockFriends } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BillCardProps {
  bill: Bill
  className?: string
}

export function BillCard({ bill, className }: BillCardProps) {
  const payer = mockFriends.find(f => f.id === bill.paidBy)
  const isSettled = bill.status === 'settled'

  return (
    <Link href={`/bills/${bill.id}`}>
      <Card className={cn(
        "p-4 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]",
        className
      )}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-3xl">{bill.category}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base">{bill.title}</h3>
                {isSettled && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    Settled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Paid by {payer?.name} {payer?.emoji}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(bill.date), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn(
              "text-lg font-bold",
              isSettled ? "text-muted-foreground" : "text-foreground"
            )}>
              RM {bill.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
