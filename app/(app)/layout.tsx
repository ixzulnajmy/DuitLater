import type { ReactNode } from 'react'
import { BottomNav } from '@/components/ui/bottom-nav'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-emerald/10 via-background to-background">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-28 pt-6 sm:px-6">
        {children}
      </div>
      <footer className="hidden items-center justify-center pb-6 text-xs text-muted-foreground sm:flex">
        Made with 💚 in Malaysia
      </footer>
      <BottomNav />
    </div>
  )
}
