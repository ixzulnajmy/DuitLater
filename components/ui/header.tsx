'use client'

import { useRouter } from 'next/navigation'
import { Share2, ArrowLeft } from 'lucide-react'
import { IconButton } from './buttons'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  trailingAction?: React.ReactNode
}

export function Header({ title, subtitle, showBack = false, trailingAction }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        {showBack ? (
          <IconButton onClick={() => router.back()} aria-label="Go back" className="bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </IconButton>
        ) : null}
        <div>
          <h1 className={cn('text-xl font-semibold text-foreground', showBack ? '' : 'text-2xl')}>{title}</h1>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {trailingAction}
        <IconButton aria-label="Share DuitLater" className="bg-muted">
          <Share2 className="h-5 w-5" />
        </IconButton>
      </div>
    </header>
  )
}
