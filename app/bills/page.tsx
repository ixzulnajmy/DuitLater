"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { BillCard } from "@/components/bill-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { mockBills } from "@/lib/mock-data"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function BillsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "settled">("all")

  const allBills = mockBills
  const pendingBills = mockBills.filter(b => b.status === 'pending')
  const settledBills = mockBills.filter(b => b.status === 'settled')

  const getBillsToShow = () => {
    switch (activeTab) {
      case 'pending':
        return pendingBills
      case 'settled':
        return settledBills
      default:
        return allBills
    }
  }

  const billsToShow = getBillsToShow()

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container px-4 py-4">
          <h1 className="text-2xl font-bold">Bills</h1>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Segmented Control */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="settled">Settled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2 mt-4">
            {allBills.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
                <p className="text-4xl mb-3">📝</p>
                <p className="font-semibold mb-1">No bills yet</p>
                <p className="text-sm text-muted-foreground">
                  Tap the + button to add your first bill
                </p>
              </div>
            ) : (
              allBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-2 mt-4">
            {pendingBills.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
                <p className="text-4xl mb-3">✅</p>
                <p className="font-semibold mb-1">All caught up!</p>
                <p className="text-sm text-muted-foreground">
                  No pending bills to settle
                </p>
              </div>
            ) : (
              pendingBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
            )}
          </TabsContent>

          <TabsContent value="settled" className="space-y-2 mt-4">
            {settledBills.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold mb-1">No settled bills</p>
                <p className="text-sm text-muted-foreground">
                  Settled bills will appear here
                </p>
              </div>
            ) : (
              settledBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* FAB */}
      <Link href="/add-bill" className="fab">
        <Plus size={28} strokeWidth={2.5} />
      </Link>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
