'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

function hashKey(key: QueryKey) {
  return typeof key === 'string' ? key : JSON.stringify(key)
}

type QueryKey = string | readonly unknown[]

type Listener = (value: unknown) => void

class MockQueryClient {
  private cache = new Map<string, unknown>()
  private listeners = new Map<string, Set<Listener>>()

  get(key: string) {
    return this.cache.get(key)
  }

  set(key: string, value: unknown) {
    this.cache.set(key, value)
    const listeners = this.listeners.get(key)
    if (listeners) {
      listeners.forEach((listener) => listener(value))
    }
  }

  subscribe(key: string, listener: Listener) {
    const listeners = this.listeners.get(key) ?? new Set<Listener>()
    listeners.add(listener)
    this.listeners.set(key, listeners)
    return () => {
      const current = this.listeners.get(key)
      current?.delete(listener)
      if (current && current.size === 0) {
        this.listeners.delete(key)
      }
    }
  }
}

interface QueryContextValue {
  client: MockQueryClient
}

const QueryContext = createContext<QueryContextValue | null>(null)

export function QueryProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => new MockQueryClient(), [])
  const value = useMemo(() => ({ client }), [client])

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

interface UseQueryOptions<T> {
  queryKey: QueryKey
  queryFn: () => Promise<T> | T
  initialData?: T
}

export function useQuery<T>({ queryKey, queryFn, initialData }: UseQueryOptions<T>) {
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('useQuery must be used within the QueryProvider')
  }

  const { client } = context
  const key = hashKey(queryKey)
  const initial = useMemo(() => {
    const cached = client.get(key)
    if (cached !== undefined) {
      return cached as T
    }
    if (initialData !== undefined) {
      client.set(key, initialData)
      return initialData
    }
    return undefined
  }, [client, key, initialData])

  const [data, setData] = useState<T | undefined>(initial)
  const [isLoading, setIsLoading] = useState(() => initial === undefined)

  const resolveQuery = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await queryFn()
      client.set(key, result)
      setData(result)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [client, key, queryFn])

  useEffect(() => {
    if (data === undefined) {
      resolveQuery()
    }
    return client.subscribe(key, (next) => {
      setData(next as T)
    })
  }, [client, data, key, resolveQuery])

  return {
    data,
    isLoading,
    status: isLoading ? ('loading' as const) : ('success' as const),
    refetch: resolveQuery,
  }
}
