"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AvatarEmoji } from "@/components/avatar-emoji"
import { mockBills, mockFriends } from "@/lib/mock-data"
import { formatDistanceToNow, format } from "date-fns"
import { ExternalLink } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export default function BillDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const billId = params.id as string

  const bill = mockBills.find(b => b.id === billId)

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold mb-1">Bill not found</p>
          <p className="text-sm text-muted-foreground">
            This bill doesn&apos;t exist or has been deleted
          </p>
        </div>
      </div>
    )
  }

  const payer = mockFriends.find(f => f.id === bill.paidBy)
  const participants = bill.participants
    .map(id => mockFriends.find(f => f.id === id))
    .filter(Boolean)

  const handleMarkAsPaid = () => {
    toast.success(`Bill marked as settled! 🎉`)
    setTimeout(() => router.push('/bills'), 1000)
  }

  const handleShare = () => {
    toast.success("Share link copied to clipboard! 📋")
  }

  return (
    <div className="min-h-screen pb-20">
      <Header title="Bill Details" showBack showShare onShare={handleShare} />

      <div className="container px-4 py-6 space-y-4">
        {/* Bill Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="text-4xl">{bill.category}</div>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{bill.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(bill.date), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(bill.date), { addSuffix: true })}
                  </p>
                </div>
              </div>
              {bill.status === 'settled' && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Settled
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-2xl font-bold">RM {bill.totalAmount.toFixed(2)}</span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Paid by</p>
              <div className="flex items-center gap-2 p-3 rounded-xl border border-border">
                <AvatarEmoji emoji={payer?.emoji || '👤'} size="sm" />
                <span className="font-medium">{payer?.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Split Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Split Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bill.items.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">RM {item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.payers.map(payerId => {
                    const friend = mockFriends.find(f => f.id === payerId)
                    return (
                      <div
                        key={payerId}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-xs"
                      >
                        <span>{friend?.emoji}</span>
                        <span>{friend?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Participants ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {participants.map((participant) => (
                <div
                  key={participant?.id}
                  className="flex items-center gap-2 p-2 pr-4 rounded-full border border-border bg-card"
                >
                  <AvatarEmoji emoji={participant?.emoji || '👤'} size="sm" />
                  <span className="text-sm font-medium">{participant?.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Receipt Link */}
        {bill.receiptUrl && (
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href={bill.receiptUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Receipt
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {bill.status === 'pending' && (
          <Button
            className="w-full"
            size="lg"
            onClick={handleMarkAsPaid}
          >
            Mark as Paid
          </Button>
        )}
      </div>
    </div>
  )
}
