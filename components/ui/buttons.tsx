'use client'

import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

export function PrimaryButton({ className, isActive = true, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 px-5 text-base font-semibold text-emerald-950 shadow-glow transition-all duration-200',
        'hover:from-emerald-300 hover:to-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60',
        !isActive && 'opacity-70 saturate-50',
        className
      )}
      {...props}
    />
  )
}

export function GhostButton({ className, isActive = true, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-emerald/20 bg-transparent px-5 text-sm font-medium text-emerald-600 transition-all duration-200',
        'hover:bg-emerald/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60',
        !isActive && 'opacity-70',
        className
      )}
      {...props}
    />
  )
}

export function IconButton({ className, isActive = true, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent bg-emerald/10 text-emerald-600 transition-all duration-200',
        'hover:bg-emerald/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60',
        !isActive && 'opacity-60',
        className
      )}
      {...props}
    />
  )
}
