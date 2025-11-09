"use client"

import { useState } from "react"
import { BalanceCard } from "@/components/balance-card"
import { BillCard } from "@/components/bill-card"
import { FriendRow } from "@/components/friend-row"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { mockBills, mockFriends, type Friend } from "@/lib/mock-data"
import { Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import confetti from "canvas-confetti"

export default function DashboardPage() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends)

  // Calculate total balance
  const totalBalance = friends.reduce((sum, friend) => sum + friend.balance, 0)

  // Get outstanding friends (who owe or are owed)
  const outstandingFriends = friends.filter(f => f.balance !== 0)

  // Get recent pending bills
  const recentBills = mockBills
    .filter(b => b.status === 'pending')
    .slice(0, 5)

  const handleSettle = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId)
    if (!friend) return

    const isPositive = friend.balance > 0
    const amount = Math.abs(friend.balance)

    // Update friend balance to 0
    setFriends(prev => prev.map(f =>
      f.id === friendId ? { ...f, balance: 0 } : f
    ))

    // Show success message
    toast.success(
      isPositive
        ? `${friend.name} settled RM ${amount.toFixed(2)}! 🎉`
        : `You settled RM ${amount.toFixed(2)} with ${friend.name}! 💚`
    )

    // Check if all debts are settled
    const allSettled = friends.every(f => f.balance === 0 || f.id === friendId)
    if (allSettled) {
      // Fire confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      toast.success("All debts settled! You're awesome! 🎉")
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💸</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DuitLater
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              👋 Hey there!
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Balance Card */}
        <BalanceCard balance={totalBalance} />

        {/* Outstanding Section */}
        {outstandingFriends.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Outstanding</h2>
              <Link href="/friends">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              {outstandingFriends.slice(0, 3).map((friend) => (
                <FriendRow
                  key={friend.id}
                  friend={friend}
                  onSettle={handleSettle}
                />
              ))}
            </div>
          </div>
        )}

        {outstandingFriends.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-semibold mb-1">All Settled!</p>
            <p className="text-sm text-muted-foreground">
              No outstanding balances. You&apos;re doing great!
            </p>
          </div>
        )}

        {/* Recent Bills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Bills</h2>
            <Link href="/bills">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          {recentBills.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-8 text-center">
              <p className="text-4xl mb-3">📝</p>
              <p className="font-semibold mb-1">No bills yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Tap the + button to add your first bill
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentBills.map((bill) => (
                <BillCard key={bill.id} bill={bill} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <Link href="/add-bill" className="fab">
        <Plus size={28} strokeWidth={2.5} />
      </Link>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
