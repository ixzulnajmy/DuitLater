'use client'

import { Header } from '@/components/ui/header'
import { AvatarEmoji } from '@/components/ui/avatar-emoji'
import { GhostButton } from '@/components/ui/buttons'
import { profile } from '@/lib/mock-data'
import { useTheme } from '@/components/providers/theme-provider'

const settings = [
  { id: 'notifications', label: 'Notifications', description: 'Control bill and reminder alerts' },
  { id: 'payments', label: 'Payment methods', description: 'Connect DuitNow or bank accounts' },
  { id: 'help', label: 'Help & support', description: 'Reach out if you need anything' },
]

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-6">
      <Header title="Profile" subtitle="Made with 💚 in Malaysia" />
      <section className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <AvatarEmoji emoji="💸" size="lg" className="bg-emerald/20" />
          <div>
            <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">Split bills easily, settle later — the Malaysian way 💸</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Theme</p>
            <p className="text-xs text-muted-foreground">Switch between light & dark</p>
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
          >
            {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
          </button>
        </div>
        <div className="space-y-2">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 hover:border-emerald/40"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
              <span className="text-lg">➡️</span>
            </div>
          ))}
        </div>
        <GhostButton className="w-full text-coral-500">Log out</GhostButton>
      </section>
    </div>
  )
}
