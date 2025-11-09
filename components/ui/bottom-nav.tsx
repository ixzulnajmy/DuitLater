'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Receipt,
  Users,
  Sparkles,
  CircleUserRound,
  PlusCircle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  isAccent?: boolean
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/bills', label: 'Bills', icon: Receipt },
  { href: '/add-bill', label: 'Add', icon: PlusCircle, isAccent: true },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/activity', label: 'Activity', icon: Sparkles },
  { href: '/profile', label: 'Profile', icon: CircleUserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-background/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-1 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          if (item.isAccent) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-1 flex-col items-center pt-6">
                <span className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-glow">
                  <Icon className="h-8 w-8 text-emerald-950" />
                </span>
                <span className="mt-1 text-xs font-semibold text-emerald-600">{item.label}</span>
              </Link>
            )
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors',
                isActive ? 'text-emerald-600' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
