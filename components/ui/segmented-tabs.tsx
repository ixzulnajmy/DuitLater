'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TabOption<T extends string> = {
  value: T
  label: string
  badge?: string
}

interface SegmentedTabsProps<T extends string> {
  options: TabOption<T>[]
  value: T
  onValueChange: (value: T) => void
}

export function SegmentedTabs<T extends string>({ options, value, onValueChange }: SegmentedTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ width: number; left: number }>({ width: 0, left: 0 })
  const buttonRefs = useRef(new Map<T, HTMLButtonElement | null>())

  useEffect(() => {
    const current = buttonRefs.current.get(value)
    if (!current || !containerRef.current) return
    const { offsetLeft, offsetWidth } = current
    setIndicator({ left: offsetLeft, width: offsetWidth })
  }, [options, value])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center rounded-2xl bg-muted p-1 text-sm text-muted-foreground"
    >
      <span
        className="absolute top-1 bottom-1 rounded-2xl bg-background shadow-sm transition-all duration-200"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            ref={(node) => {
              if (node) {
                buttonRefs.current.set(option.value, node)
              } else {
                buttonRefs.current.delete(option.value)
              }
            }}
            onClick={() => onValueChange(option.value)}
            className={cn(
              'relative z-10 flex-1 rounded-2xl px-3 py-2 font-medium transition-colors duration-200',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {option.label}
              {option.badge ? (
                <span className="rounded-full bg-emerald/15 px-2 text-[11px] font-semibold text-emerald-600">
                  {option.badge}
                </span>
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}
