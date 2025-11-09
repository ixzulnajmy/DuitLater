"use client"

import { cn } from "@/lib/utils"

interface CategoryChipProps {
  emoji: string
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function CategoryChip({ emoji, label, selected, onClick, className }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all active:scale-95",
        selected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border bg-card hover:border-primary/50",
        className
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  )
}
