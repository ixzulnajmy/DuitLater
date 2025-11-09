'use client'

import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CategoryChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  color: string
  isActive?: boolean
}

export function CategoryChip({ label, color, isActive = false, className, ...props }: CategoryChipProps) {
  return (
    <button
      style={{ '--chip-color': color } as React.CSSProperties}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-color)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive
          ? 'border-[var(--chip-color)] bg-[var(--chip-color)]/15 text-foreground'
          : 'border-transparent bg-muted text-muted-foreground hover:bg-[var(--chip-color)]/10',
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
}
