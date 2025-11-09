'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/ui/header'
import { CategoryChip } from '@/components/ui/category-chip'
import { AvatarEmoji } from '@/components/ui/avatar-emoji'
import { PrimaryButton, GhostButton } from '@/components/ui/buttons'
import { categories, friends, profile } from '@/lib/mock-data'
import { useBillStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const people = [
  { id: profile.id, name: profile.name, emoji: '😄' },
  ...friends.map((friend) => ({ id: friend.id, name: friend.name, emoji: friend.emoji })),
]

export default function AddBillPage() {
  const { draft, updateDraft, resetDraft } = useBillStore((state) => ({
    draft: state.draft,
    updateDraft: state.updateDraft,
    resetDraft: state.resetDraft,
  }))
  const [title, setTitle] = useState(draft.title)
  const [amount, setAmount] = useState(draft.amount)
  const [category, setCategory] = useState<string | null>(draft.category)
  const [payerId, setPayerId] = useState<string | null>(draft.payerId ?? profile.id)
  const [participantIds, setParticipantIds] = useState<string[]>(
    draft.participantIds.length ? draft.participantIds : people.map((person) => person.id)
  )

  const splitAmount = useMemo(() => {
    if (participantIds.length === 0) return 0
    return amount / participantIds.length
  }, [amount, participantIds.length])

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((participant) => participant !== id) : [...prev, id]
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateDraft({ title, amount, category, payerId, participantIds })
    toast.success('Bill created! 🎉')
    resetDraft()
    setTitle('')
    setAmount(0)
    setCategory(null)
    setPayerId(profile.id)
    setParticipantIds(people.map((person) => person.id))
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Header title="Add bill" subtitle="Split evenly with friends" showBack />
      <section className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Bill title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Eg. Kopitiam brunch"
            className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Amount</label>
          <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-4 py-3">
            <span className="text-sm font-semibold text-muted-foreground">RM</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount || ''}
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="0.00"
              className="w-full bg-transparent text-xl font-semibold text-foreground focus-visible:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">Split evenly: {formatCurrency(splitAmount)} per person</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <CategoryChip
                key={item.id}
                label={item.label}
                color={item.color}
                isActive={category === item.id}
                onClick={() => setCategory(item.id)}
                type="button"
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Who paid?</p>
          <div className="grid grid-cols-2 gap-3">
            {people.map((person) => (
              <GhostButton
                key={person.id}
                type="button"
                className={payerId === person.id ? 'border-emerald-400 bg-emerald/15 text-emerald-700' : ''}
                onClick={() => setPayerId(person.id)}
              >
                <div className="flex items-center gap-3">
                  <AvatarEmoji emoji={person.emoji} />
                  <span className="text-sm font-semibold text-foreground">{person.name}</span>
                </div>
              </GhostButton>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Split with</p>
          <div className="space-y-3">
            {people.map((person) => (
              <label
                key={person.id}
                className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm text-foreground"
              >
                <span className="flex items-center gap-3">
                  <AvatarEmoji emoji={person.emoji} />
                  {person.name}
                </span>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded-full border border-emerald-300 text-emerald-500"
                  checked={participantIds.includes(person.id)}
                  onChange={() => toggleParticipant(person.id)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Split summary</p>
          <ul className="space-y-2">
            {participantIds.map((id) => {
              const person = people.find((item) => item.id === id)
              if (!person) return null
              return (
                <li key={id} className="flex items-center justify-between text-sm text-foreground">
                  <span className="flex items-center gap-2">
                    <span>{person.emoji}</span>
                    {person.name}
                  </span>
                  <span>{formatCurrency(splitAmount || 0)}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <PrimaryButton type="submit">Save bill</PrimaryButton>
      </section>
    </form>
  )
}
