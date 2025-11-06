import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from './types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

interface UIState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  toast: {
    message: string
    type: 'success' | 'error' | 'info'
  } | null
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  clearToast: () => void
}

interface BillState {
  currentBill: any | null
  setCurrentBill: (bill: any) => void
  clearCurrentBill: () => void
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)

// UI Store
export const useUIStore = create<UIState>()(
  devtools((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    toast: null,
    showToast: (message, type) => set({ toast: { message, type } }),
    clearToast: () => set({ toast: null }),
  }))
)

// Bill Store (for temporary bill creation state)
export const useBillStore = create<BillState>()(
  devtools(
    persist(
      (set) => ({
        currentBill: null,
        setCurrentBill: (bill) => set({ currentBill: bill }),
        clearCurrentBill: () => set({ currentBill: null }),
      }),
      {
        name: 'bill-draft-storage',
      }
    )
  )
)
