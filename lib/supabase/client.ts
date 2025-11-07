import { createBrowserClient } from '@supabase/ssr'

import type { Database } from './database.types'
import { createMockSupabaseClient } from './mock'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase environment variables missing; using mock client')
    }
    return createMockSupabaseClient()
  }

  return createBrowserClient<Database>(url, anonKey)
}
