"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CategoryChip } from "@/components/category-chip"
import { AvatarEmoji } from "@/components/avatar-emoji"
import { categoryOptions, mockFriends } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AddBillPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedPayer, setSelectedPayer] = useState<string>("")
  const [selectedParticipants, setSelectedParticipants] = useState<Set<string>>(new Set())

  const handleParticipantToggle = (friendId: string) => {
    const newSet = new Set(selectedParticipants)
    if (newSet.has(friendId)) {
      newSet.delete(friendId)
    } else {
      newSet.add(friendId)
    }
    setSelectedParticipants(newSet)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Please enter a bill title")
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (!selectedCategory) {
      toast.error("Please select a category")
      return
    }

    if (!selectedPayer) {
      toast.error("Please select who paid")
      return
    }

    if (selectedParticipants.size === 0) {
      toast.error("Please select at least one participant")
      return
    }

    // Success!
    toast.success("Bill added successfully! 🎉")
    setTimeout(() => router.push('/bills'), 1000)
  }

  const splitAmount = selectedParticipants.size > 0
    ? (parseFloat(amount || "0") / selectedParticipants.size).toFixed(2)
    : "0.00"

  return (
    <div className="min-h-screen pb-20">
      <Header title="Add Bill" showBack />

      <form onSubmit={handleSubmit} className="container px-4 py-6 space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Bill Title</label>
              <Input
                placeholder="e.g., Mamak Session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Total Amount (RM)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {categoryOptions.map((category) => (
                <CategoryChip
                  key={category.emoji}
                  emoji={category.emoji}
                  label={category.label}
                  selected={selectedCategory === category.emoji}
                  onClick={() => setSelectedCategory(category.emoji)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payer Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Who Paid?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {mockFriends.map((friend) => (
                <button
                  key={friend.id}
                  type="button"
                  onClick={() => setSelectedPayer(friend.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                    selectedPayer === friend.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <AvatarEmoji emoji={friend.emoji} size="sm" />
                  <span className="font-medium text-sm">{friend.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Split With</CardTitle>
            {selectedParticipants.size > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                RM {splitAmount} per person
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {mockFriends.map((friend) => (
                <button
                  key={friend.id}
                  type="button"
                  onClick={() => handleParticipantToggle(friend.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                    selectedParticipants.has(friend.id)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <AvatarEmoji emoji={friend.emoji} size="sm" />
                  <span className="font-medium text-sm">{friend.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button type="submit" className="w-full" size="lg">
          Add Bill
        </Button>
      </form>
    </div>
  )
}
