"use client"

import { AvatarEmoji } from "@/components/avatar-emoji"
import { mockActivities, mockFriends } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { TrendingUp, TrendingDown, FileText, CheckCircle2 } from "lucide-react"

export default function ActivityPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bill_added':
        return <FileText className="h-5 w-5 text-primary" />
      case 'bill_settled':
        return <CheckCircle2 className="h-5 w-5 text-primary" />
      case 'payment_received':
        return <TrendingUp className="h-5 w-5 text-primary" />
      case 'payment_made':
        return <TrendingDown className="h-5 w-5 text-accent" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container px-4 py-4">
          <h1 className="text-2xl font-bold">Activity</h1>
        </div>
      </div>

      <div className="container px-4 py-6">
        {mockActivities.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-semibold mb-1">No activity yet</p>
            <p className="text-sm text-muted-foreground">
              Your bill activity will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockActivities.map((activity, index) => {
              const friend = activity.friendId
                ? mockFriends.find(f => f.id === activity.friendId)
                : null

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-sm transition-shadow"
                >
                  {/* Icon */}
                  <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      {activity.amount && (
                        <p
                          className={`text-sm font-bold flex-shrink-0 ${
                            activity.type === 'payment_received' || activity.type === 'bill_settled'
                              ? 'text-primary'
                              : activity.type === 'payment_made'
                              ? 'text-accent'
                              : 'text-foreground'
                          }`}
                        >
                          {activity.type === 'payment_received' && '+'}
                          {activity.type === 'payment_made' && '-'}
                          RM {activity.amount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {friend && (
                        <div className="flex items-center gap-1">
                          <AvatarEmoji emoji={friend.emoji} size="sm" />
                          <span className="text-xs text-muted-foreground">
                            {friend.name}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
