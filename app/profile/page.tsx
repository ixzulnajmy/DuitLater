"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { AvatarEmoji } from "@/components/avatar-emoji"
import { useTheme } from "next-themes"
import {
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    toast.success(enabled ? "Notifications enabled" : "Notifications disabled")
  }

  const handleLogout = () => {
    toast.success("Logged out successfully")
  }

  const settingsItems = [
    {
      icon: Bell,
      label: "Notifications",
      action: (
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={handleNotificationToggle}
        />
      ),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      action: <ChevronRight className="h-5 w-5 text-muted-foreground" />,
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      action: <ChevronRight className="h-5 w-5 text-muted-foreground" />,
    },
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container px-4 py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <AvatarEmoji emoji="😊" size="lg" className="h-16 w-16 text-3xl" />
            <div>
              <h2 className="text-xl font-bold">You</h2>
              <p className="text-sm text-muted-foreground">user@duitlater.com</p>
            </div>
          </div>
        </Card>

        {/* Theme Toggle */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  {theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                theme === 'light'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Sun className="h-4 w-4 mx-auto mb-1" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Moon className="h-4 w-4 mx-auto mb-1" />
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                theme === 'system'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Sparkles className="h-4 w-4 mx-auto mb-1" />
              Auto
            </button>
          </div>
        </Card>

        {/* Settings */}
        <Card className="divide-y divide-border">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.action}
            </button>
          ))}
        </Card>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          Made with 💚 in Malaysia
        </div>
      </div>
    </div>
  )
}
