'use client'

import { ThemeProvider } from './theme-provider'
import { QueryClientProvider } from './query-provider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        {children}
        <Toaster position="top-center" toastOptions={{ className: 'rounded-2xl px-4 py-3 shadow-glow' }} richColors />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
