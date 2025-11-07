// file: app/(routes)/bill/new/page.tsx
import { Metadata } from 'next'

import { BillForm } from '@/components/bill/BillForm'
import { MOCK_USERS } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'New Bill | DuitLater',
  description: 'Manual input screen to create a new bill.',
}

export const dynamic = 'force-dynamic'

export default function NewBillPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-10">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">New bill</h1>
          <p className="text-sm text-neutral-600">
            Log a new expense, split it with friends, and keep everyone in sync.
          </p>
        </header>
        <BillForm users={MOCK_USERS} />
      </div>
    </main>
  )
}
