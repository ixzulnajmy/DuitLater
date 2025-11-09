"use client"

import { ArrowLeft, Share2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  showBack?: boolean
  showShare?: boolean
  showMore?: boolean
  onShare?: () => void
  onMore?: () => void
  className?: string
}

export function Header({
  title,
  showBack = false,
  showShare = false,
  showMore = false,
  onShare,
  onMore,
  className
}: HeaderProps) {
  const router = useRouter()

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {title && (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showShare && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="rounded-full"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          )}
          {showMore && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMore}
              className="rounded-full"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
