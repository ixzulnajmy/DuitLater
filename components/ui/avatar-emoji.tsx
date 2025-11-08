import { cn } from '@/lib/utils'

interface AvatarEmojiProps {
  emoji: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
}

export function AvatarEmoji({ emoji, size = 'md', className }: AvatarEmojiProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-emerald/10 font-medium text-emerald-700 shadow-inner',
        sizeMap[size],
        className
      )}
    >
      <span aria-hidden className="leading-none">
        {emoji}
      </span>
      <span className="sr-only">{emoji}</span>
    </div>
  )
}
