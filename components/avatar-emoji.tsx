"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AvatarEmojiProps {
  emoji: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AvatarEmoji({ emoji, size = "md", className }: AvatarEmojiProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-lg",
    md: "h-10 w-10 text-xl",
    lg: "h-12 w-12 text-2xl",
  }

  return (
    <Avatar className={cn(sizeClasses[size], "bg-primary/10", className)}>
      <AvatarFallback className="bg-transparent">{emoji}</AvatarFallback>
    </Avatar>
  )
}
