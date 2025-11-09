import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth-context'
import { ThemeProvider } from '@/components/theme-provider'
import CompactFloatingNav from '@/components/navigation/CompactFloatingNav'

export const metadata: Metadata = {
  title: 'DuitLater - Bayar Nanti, Track Sekarang',
  description: 'Split bills with friends, scan receipts, and settle up without the headache. Bayar nanti, track sekarang! 💰',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DuitLater',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#34D399',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans pb-24">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="top-center" richColors />
          <CompactFloatingNav />
        </ThemeProvider>
      </body>
    </html>
  )
}