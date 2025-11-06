// file: components/ui/badge.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

export const Badge = ({
  className,
  variant = 'default',
  ...props
}: BadgeProps) => {
  const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-orange-100 text-orange-700 border border-orange-200',
    secondary: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
    outline: 'border border-neutral-300 text-neutral-700',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
