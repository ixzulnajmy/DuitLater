'use client'

import { Header } from '@/components/ui/header'
import { activity } from '@/lib/mock-data'
import { formatRelativeDate } from '@/lib/utils'

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <Header title="Activity" subtitle="Latest happenings" />
      <div className="space-y-3">
        {activity.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-3xl border border-border/60 bg-card px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground">{formatRelativeDate(item.timestamp)}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {item.tone === 'positive' ? 'Good vibes' : 'Update'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
