// file: lib/supabase/mock.ts
import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

type MockResult<T> = { data: T; error: null }

type Subscription = { unsubscribe: () => void }

type AuthChangeResponse = { data: { subscription: Subscription } }

type PostgrestResponse<T> = Promise<{ data: T | null; error: null }>

type MockFromBuilder = {
  select: () => {
    eq: (_column: string, _value: unknown) => {
      single: () => PostgrestResponse<Record<string, unknown>>
    }
  }
}

type MockSupabase = {
  auth: {
    getSession: () => Promise<MockResult<{ session: null }>>
    onAuthStateChange: (
      _event: unknown,
      _callback: unknown
    ) => AuthChangeResponse
    signInWithPassword: (_params: unknown) => Promise<MockResult<null>>
    signUp: (_params: unknown) => Promise<MockResult<null>>
    signOut: () => Promise<{ error: null }>
  }
  from: (_table: string) => MockFromBuilder
}

const createMockFromBuilder = (): MockFromBuilder => ({
  select: () => ({
    eq: () => ({
      single: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
})

export const createMockSupabaseClient = () => {
  const subscription: Subscription = { unsubscribe: () => {} }

  const mock: MockSupabase = {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null }
      },
      onAuthStateChange() {
        return { data: { subscription } }
      },
      async signInWithPassword() {
        return { data: null, error: null }
      },
      async signUp() {
        return { data: null, error: null }
      },
      async signOut() {
        return { error: null }
      },
    },
    from() {
      return createMockFromBuilder()
    },
  }

  return mock as unknown as SupabaseClient<Database>
}
