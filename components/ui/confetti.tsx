'use client'

import { useEffect, useMemo } from 'react'

interface ConfettiProps {
  isActive: boolean
  onComplete?: () => void
}

export function Confetti({ isActive, onComplete }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        left: `${(index / 16) * 100}%`,
        delay: `${index * 0.08}s`,
        background: index % 2 === 0 ? '#34D399' : '#FF6B6B',
      })),
    []
  )

  useEffect(() => {
    if (!isActive || !onComplete) return
    const timeout = setTimeout(onComplete, 2800)
    return () => clearTimeout(timeout)
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center overflow-hidden">
      <div className="relative h-full w-full max-w-xl">
        {pieces.map((piece, index) => (
          <span
            key={index}
            className="absolute h-3 w-2 rounded-full opacity-0 animate-confetti"
            style={{ left: piece.left, background: piece.background, animationDelay: piece.delay }}
          />
        ))}
        <div className="absolute top-24 left-1/2 w-[260px] -translate-x-1/2 rounded-3xl bg-background/90 px-5 py-4 text-center text-sm font-semibold text-emerald-600 shadow-lg">
          Semua hutang settle! 🎉
        </div>
      </div>
    </div>
  )
}
