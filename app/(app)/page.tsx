'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui/header'
import { BalanceCard } from '@/components/ui/balance-card'
import { BillCard } from '@/components/ui/bill-card'
import { FriendRow } from '@/components/ui/friend-row'
import { PullToRefreshHint } from '@/components/ui/pull-to-refresh'
import { Confetti } from '@/components/ui/confetti'
import { SettleModal } from '@/components/ui/settle-modal'
import { PrimaryButton } from '@/components/ui/buttons'
import { useQuery } from '@/lib/mock-query'
import { useUIStore } from '@/lib/store'
import { balance, friends, outstandingBills, profile, recentBills } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

export default function HomePage() {
  const router = useRouter()

  const { data: outstanding } = useQuery({
    queryKey: ['outstanding-bills'],
    queryFn: async () => outstandingBills,
    initialData: outstandingBills,
  })
  const { data: recent } = useQuery({
    queryKey: ['recent-bills'],
    queryFn: async () => recentBills,
    initialData: recentBills,
  })
  const [billList, setBillList] = useState(outstanding)
  const [recentList] = useState(recent)

  const {
    settleBillId,
    openSettleModal,
    closeSettleModal,
    setShowPullHint,
    showPullHint,
    triggerConfetti,
    clearConfetti,
    isConfettiActive,
  } = useUIStore((state) => ({
    settleBillId: state.settleBillId,
    openSettleModal: state.openSettleModal,
    closeSettleModal: state.closeSettleModal,
    setShowPullHint: state.setShowPullHint,
    showPullHint: state.showPullHint,
    triggerConfetti: state.triggerConfetti,
    clearConfetti: state.clearConfetti,
    isConfettiActive: state.isConfettiActive,
  }))

  useEffect(() => {
    const timeout = setTimeout(() => setShowPullHint(false), 3200)
    return () => clearTimeout(timeout)
  }, [setShowPullHint])

  useEffect(() => {
    setBillList(outstanding)
  }, [outstanding])

  const billToSettle = useMemo(() => billList?.find((bill) => bill.id === settleBillId), [billList, settleBillId])

  const pendingBills = billList?.filter((bill) => bill.status === 'pending') ?? []

  useEffect(() => {
    if (pendingBills.length === 0 && billList && billList.length > 0) {
      triggerConfetti()
      toast.success('All debts settled! 💚')
    }
  }, [billList, pendingBills.length, triggerConfetti])

  const handleConfirmSettle = () => {
    if (!billToSettle) return
    const amount = billToSettle.youOwe
    setBillList((prev) =>
      prev?.map((bill) =>
        bill.id === billToSettle.id
          ? {
              ...bill,
              status: 'settled',
              youOwe: 0,
              participants: bill.participants.map((participant) => ({
                ...participant,
                hasPaid: participant.id === 'aiman' ? true : participant.hasPaid,
              })),
            }
          : bill
      )
    )
    toast.success(`Settled ${formatCurrency(amount)}`)
    closeSettleModal()
  }

  return (
    <>
      <Confetti isActive={isConfettiActive} onComplete={clearConfetti} />
      <Header title={profile.greeting} subtitle={profile.tagline} />
      <PullToRefreshHint show={showPullHint} />
      <div className="space-y-6">
        <BalanceCard net={balance.net} youAreOwed={balance.youAreOwed} youOwe={balance.youOwe} />
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Outstanding</h2>
            <Link href="/bills" className="text-sm font-semibold text-emerald-600">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {billList?.map((bill) => (
              <BillCard
                key={bill.id}
                bill={bill}
                href={`/bills/${bill.id}`}
                onSettle={bill.status === 'pending' ? () => openSettleModal(bill.id) : undefined}
              />
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent bills</h2>
            <Link href="/activity" className="text-sm font-semibold text-emerald-600">
              Activity
            </Link>
          </div>
          <div className="space-y-4">
            {recentList?.map((bill) => <BillCard key={bill.id} bill={bill} href={`/bills/${bill.id}`} />)}
          </div>
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Friends</h2>
            <Link href="/friends" className="text-sm font-semibold text-emerald-600">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {friends.slice(0, 3).map((friend) => (
              <FriendRow key={friend.id} friend={friend} />
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Quick actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PrimaryButton className="h-auto py-4" onClick={() => router.push('/add-bill')}>
              + Add bill
            </PrimaryButton>
            <PrimaryButton
              className="h-auto bg-gradient-to-br from-coral-400 to-coral-500 py-4 text-white shadow-lg"
              onClick={() => router.push('/bills')}
            >
              Settle all
            </PrimaryButton>
          </div>
        </section>
      </div>
      <SettleModal
        open={Boolean(billToSettle)}
        onClose={closeSettleModal}
        onConfirm={handleConfirmSettle}
        title="Mark bill as paid?"
        description={
          billToSettle ? `Confirm that ${billToSettle.payer} has received ${formatCurrency(billToSettle.youOwe)}.` : ''
        }
      />
    </>
  )
}
