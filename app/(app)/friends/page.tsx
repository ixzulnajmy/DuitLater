'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/ui/header'
import { FriendRow } from '@/components/ui/friend-row'
import { PrimaryButton } from '@/components/ui/buttons'
import { friends } from '@/lib/mock-data'

export default function FriendsPage() {
  const [query, setQuery] = useState('')

  const filteredFriends = useMemo(() => {
    if (!query) return friends
    return friends.filter((friend) => friend.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div className="space-y-6">
      <Header title="Friends" subtitle="Who owes who" />
      <div className="rounded-3xl border border-border/60 bg-card p-4 shadow-sm">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search kakis..."
          className="w-full rounded-2xl border border-transparent bg-muted px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        />
      </div>
      <div className="space-y-3">
        {filteredFriends.map((friend) => (
          <FriendRow key={friend.id} friend={friend} />
        ))}
      </div>
      <PrimaryButton className="mt-4" onClick={() => setQuery('')}>
        Settle balances
      </PrimaryButton>
    </div>
  )
}
