'use client'

import { useMemo } from 'react'
import { Header } from '@/components/ui/header'
import { SegmentedTabs } from '@/components/ui/segmented-tabs'
import { BillCard } from '@/components/ui/bill-card'
import { useQuery } from '@/lib/mock-query'
import { useUIStore } from '@/lib/store'
import { outstandingBills, recentBills } from '@/lib/mock-data'

type FilterValue = 'all' | 'pending' | 'settled'

const options: { value: FilterValue; label: string; badge?: string }[] = [
  { value: 'all', label: 'All', badge: `${outstandingBills.length + recentBills.length}` },
  { value: 'pending', label: 'Pending', badge: `${outstandingBills.filter((bill) => bill.status === 'pending').length}` },
  { value: 'settled', label: 'Settled', badge: `${recentBills.filter((bill) => bill.status === 'settled').length}` },
]

export default function BillsPage() {
  const { value, setValue } = useUIStore((state) => ({
    value: state.activeBillFilter,
    setValue: state.setActiveBillFilter,
  }))

  const { data: bills } = useQuery({
    queryKey: ['all-bills'],
    queryFn: async () => [...outstandingBills, ...recentBills],
    initialData: [...outstandingBills, ...recentBills],
  })

  const filteredBills = useMemo(() => {
    if (!bills) return []
    switch (value) {
      case 'pending':
        return bills.filter((bill) => bill.status === 'pending')
      case 'settled':
        return bills.filter((bill) => bill.status === 'settled')
      default:
        return bills
    }
  }, [bills, value])

  return (
    <div className="space-y-6">
      <Header title="Bills" subtitle="Track, split, settle" />
      <SegmentedTabs<FilterValue> options={options} value={value} onValueChange={setValue} />
      <div className="space-y-4">
        {filteredBills.map((bill) => (
          <BillCard key={bill.id} bill={bill} href={`/bills/${bill.id}`} />
        ))}
      </div>
    </div>
  )
}
