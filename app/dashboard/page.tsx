'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/store'
import type { Bill, Settlement } from '@/lib/types'
import { Plus, LogOut, Users } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user, clearUser } = useAuthStore()
  const router = useRouter()
  const [bills, setBills] = useState<Bill[]>([])
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Calculate balances
  const totalOwed = settlements
    .filter((s) => s.from_user_id === user?.id && s.status === 'pending')
    .reduce((sum, s) => sum + s.amount, 0)

  const totalOwedToMe = settlements
    .filter((s) => s.to_user_id === user?.id && s.status === 'pending')
    .reduce((sum, s) => sum + s.amount, 0)

  const netBalance = totalOwedToMe - totalOwed

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/auth')
      return
    }

    if (!user) {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        useAuthStore.getState().setUser(profile)
      }
    }
  }

  async function fetchData() {
    try {
      // Fetch bills where user is a participant
      const { data: billsData, error: billsError } = await supabase
        .from('bills')
        .select(`
          *,
          payer:profiles!bills_paid_by_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      if (billsError) throw billsError

      // Fetch settlements
      const { data: settlementsData, error: settlementsError } = await supabase
        .from('settlements')
        .select(`
          *,
          from_user:profiles!settlements_from_user_id_fkey(full_name, email),
          to_user:profiles!settlements_to_user_id_fkey(full_name, email),
          bill:bills(title)
        `)
        .or(`from_user_id.eq.${user?.id},to_user_id.eq.${user?.id}`)

      if (settlementsError) throw settlementsError

      setBills(billsData || [])
      setSettlements(settlementsData || [])
    } catch (error: any) {
      toast.error('Failed to load data')
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    clearUser()
    toast.success('Signed out successfully')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <h1 className="text-2xl font-bold text-amber-600">DuitLater</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/friends"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Users size={24} className="text-gray-600" />
              </Link>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LogOut size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="container mx-auto px-4 py-6">
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Balance</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">You owe</p>
              <p className="text-2xl font-bold text-red-600">
                ${totalOwed.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Owed to you</p>
              <p className="text-2xl font-bold text-green-600">
                ${totalOwedToMe.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Net</p>
              <p
                className={`text-2xl font-bold ${
                  netBalance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ${Math.abs(netBalance).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Bills</h2>
          {bills.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No bills yet!</p>
              <p className="text-sm text-gray-400">
                Tap the + button below to add your first bill
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bills.map((bill: any) => (
                <Link href={`/bills/${bill.id}`} key={bill.id}>
                  <div className="card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{bill.title}</h3>
                        <p className="text-sm text-gray-500">
                          Paid by {bill.payer?.full_name || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(bill.bill_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${bill.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pending Settlements */}
        {settlements.filter((s: any) => s.status === 'pending').length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Pending Settlements</h2>
            <div className="space-y-3">
              {settlements
                .filter((s: any) => s.status === 'pending')
                .map((settlement: any) => (
                  <div key={settlement.id} className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        {settlement.from_user_id === user?.id ? (
                          <p className="font-medium">
                            You owe {settlement.to_user?.full_name}
                          </p>
                        ) : (
                          <p className="font-medium">
                            {settlement.from_user?.full_name} owes you
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {settlement.bill?.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xl font-bold ${
                            settlement.from_user_id === user?.id
                              ? 'text-red-600'
                              : 'text-green-600'
                          }`}
                        >
                          ${settlement.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Giant + Button (FAB) */}
      <Link href="/bills/new" className="fab">
        <Plus size={32} />
      </Link>
    </div>
  )
}
