'use client'

import { QueryProvider } from '@/lib/mock-query'

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}
