"use client"

import { useState } from "react"
import { FriendRow } from "@/components/friend-row"
import { Input } from "@/components/ui/input"
import { mockFriends, type Friend } from "@/lib/mock-data"
import { Search } from "lucide-react"
import { toast } from "sonner"
import confetti from "canvas-confetti"

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-2xl font-bold mb-4">Friends</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Outstanding Balances */}
        <div>
          <h2 className="text-lg font-bold mb-3">Outstanding Balances</h2>
          {filteredFriends.filter(f => f.balance !== 0).length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
              <p className="text-4xl mb-3">🎉</p>
              <p className="font-semibold mb-1">All Settled!</p>
              <p className="text-sm text-muted-foreground">
                No outstanding balances with anyone
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFriends
                .filter(f => f.balance !== 0)
                .map((friend) => (
                  <FriendRow
                    key={friend.id}
                    friend={friend}
                    onSettle={handleSettle}
                  />
                ))}
            </div>
          )}
        </div>

        {/* All Friends */}
        {filteredFriends.filter(f => f.balance === 0).length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">All Friends</h2>
            <div className="space-y-2">
              {filteredFriends
                .filter(f => f.balance === 0)
                .map((friend) => (
                  <FriendRow
                    key={friend.id}
                    friend={friend}
                  />
                ))}
            </div>
          </div>
        )}

        {filteredFriends.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold mb-1">No friends found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
