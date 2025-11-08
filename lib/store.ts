import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from './types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

type ToastType = 'success' | 'error' | 'info'

interface UIState {
  isLoading: boolean
  activeBillFilter: 'all' | 'pending' | 'settled'
  settleBillId: string | null
  isConfettiActive: boolean
  showPullHint: boolean
  toast: {
    message: string
    type: ToastType
  } | null
  setLoading: (loading: boolean) => void
  setActiveBillFilter: (filter: 'all' | 'pending' | 'settled') => void
  openSettleModal: (billId: string) => void
  closeSettleModal: () => void
  triggerConfetti: () => void
  clearConfetti: () => void
  setShowPullHint: (value: boolean) => void
  showToast: (message: string, type: ToastType) => void
  clearToast: () => void
}

interface BillState {
  draft: {
    title: string
    amount: number
    category: string | null
    payerId: string | null
    participantIds: string[]
  }
  updateDraft: (values: Partial<BillState['draft']>) => void
  resetDraft: () => void
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
    activeBillFilter: 'all',
    settleBillId: null,
    isConfettiActive: false,
    showPullHint: true,
    toast: null,
    setLoading: (loading) => set({ isLoading: loading }),
    setActiveBillFilter: (filter) => set({ activeBillFilter: filter }),
    openSettleModal: (billId) => set({ settleBillId: billId }),
    closeSettleModal: () => set({ settleBillId: null }),
    triggerConfetti: () => set({ isConfettiActive: true }),
    clearConfetti: () => set({ isConfettiActive: false }),
    setShowPullHint: (value) => set({ showPullHint: value }),
    showToast: (message, type) => set({ toast: { message, type } }),
    clearToast: () => set({ toast: null }),
  }))
)

// Bill Store (for temporary bill creation state)
export const useBillStore = create<BillState>()(
  devtools(
    persist(
      (set) => ({
        draft: {
          title: '',
          amount: 0,
          category: null,
          payerId: null,
          participantIds: [],
        },
        updateDraft: (values) =>
          set((state) => ({
            draft: {
              ...state.draft,
              ...values,
            },
          })),
        resetDraft: () =>
          set({
            draft: {
              title: '',
              amount: 0,
              category: null,
              payerId: null,
              participantIds: [],
            },
          }),
      }),
      {
        name: 'bill-draft-storage',
      }
    )
  )
)
