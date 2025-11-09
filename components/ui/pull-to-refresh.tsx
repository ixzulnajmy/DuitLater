'use client'

export function PullToRefreshHint({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <span className="inline-block animate-wave">👋</span>
      <span>Pull down to refresh vibes</span>
    </div>
  )
}
