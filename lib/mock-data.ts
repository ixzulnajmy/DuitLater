export type BillStatus = 'pending' | 'settled'

export interface BillParticipant {
  id: string
  name: string
  emoji: string
  amount: number
  hasPaid: boolean
}

export interface BillSummary {
  id: string
  title: string
  location: string
  category: string
  accent: string
  total: number
  youOwe: number
  date: string
  status: BillStatus
  payer: string
  receiptUrl?: string
  participants: BillParticipant[]
  notes?: string
}

export interface FriendBalance {
  id: string
  name: string
  emoji: string
  balance: number
  lastActivity: string
  highlight?: string
}

export interface ActivityItem {
  id: string
  description: string
  timestamp: string
  emoji: string
  tone: 'positive' | 'neutral'
}

export const profile = {
  id: 'user-aiman',
  name: 'Aiman',
  greeting: '👋 Hey Aiman!',
  tagline: 'Split bills easily, settle later — the Malaysian way 💸',
}

export const balance = {
  net: 248.5,
  youAreOwed: 386.8,
  youOwe: 138.3,
}

export const outstandingBills: BillSummary[] = [
  {
    id: 'bill-nasi-lemak',
    title: 'Weekend Brunch',
    location: 'Kopitiam Sri Hartamas',
    category: '🍜 Makan',
    accent: '#34D399',
    total: 180.4,
    youOwe: 48.4,
    date: '2024-12-12T09:30:00',
    status: 'pending',
    payer: 'Nadia',
    receiptUrl: '#',
    notes: 'Remember to upload the kopi receipt later',
    participants: [
      { id: 'aiman', name: 'Aiman', emoji: '😄', amount: 48.4, hasPaid: false },
      { id: 'nadia', name: 'Nadia', emoji: '💁‍♀️', amount: 0, hasPaid: true },
      { id: 'hafiz', name: 'Hafiz', emoji: '😎', amount: 72, hasPaid: false },
      { id: 'leena', name: 'Leena', emoji: '🤩', amount: 60, hasPaid: true },
    ],
  },
  {
    id: 'bill-movie-night',
    title: 'Movie Night',
    location: 'GSC Mid Valley',
    category: '🎟️ Entertainment',
    accent: '#FF6B6B',
    total: 96,
    youOwe: 24,
    date: '2024-12-10T21:00:00',
    status: 'pending',
    payer: 'Hafiz',
    receiptUrl: '#',
    participants: [
      { id: 'aiman', name: 'Aiman', emoji: '😄', amount: 24, hasPaid: false },
      { id: 'hafiz', name: 'Hafiz', emoji: '😎', amount: 24, hasPaid: false },
      { id: 'nadia', name: 'Nadia', emoji: '💁‍♀️', amount: 24, hasPaid: false },
      { id: 'leena', name: 'Leena', emoji: '🤩', amount: 24, hasPaid: false },
    ],
  },
]

export const recentBills: BillSummary[] = [
  {
    id: 'bill-grab',
    title: 'Grab Ride',
    location: 'Bangsar ➝ PJ',
    category: '🚗 Transport',
    accent: '#a855f7',
    total: 28,
    youOwe: -14,
    date: '2024-12-09T18:30:00',
    status: 'settled',
    payer: 'Aiman',
    participants: [
      { id: 'aiman', name: 'Aiman', emoji: '😄', amount: 14, hasPaid: true },
      { id: 'amir', name: 'Amir', emoji: '🧑‍💻', amount: 14, hasPaid: true },
    ],
  },
  {
    id: 'bill-lazada',
    title: 'Group Gift',
    location: 'Lazada',
    category: '📦 Shopping',
    accent: '#34D399',
    total: 210,
    youOwe: 0,
    date: '2024-12-07T13:15:00',
    status: 'settled',
    payer: 'Leena',
    participants: [
      { id: 'aiman', name: 'Aiman', emoji: '😄', amount: 70, hasPaid: true },
      { id: 'leena', name: 'Leena', emoji: '🤩', amount: 70, hasPaid: true },
      { id: 'nadia', name: 'Nadia', emoji: '💁‍♀️', amount: 70, hasPaid: true },
    ],
  },
]

export const friends: FriendBalance[] = [
  {
    id: 'nadia',
    name: 'Nadia',
    emoji: '💁‍♀️',
    balance: 68.4,
    lastActivity: 'Dec 12, 09:30',
    highlight: 'She covered kopi & toast 🥪',
  },
  {
    id: 'hafiz',
    name: 'Hafiz',
    emoji: '😎',
    balance: -34,
    lastActivity: 'Dec 10, 21:00',
    highlight: 'You paid for snacks 🍿',
  },
  {
    id: 'leena',
    name: 'Leena',
    emoji: '🤩',
    balance: 0,
    lastActivity: 'Dec 07, 13:15',
    highlight: 'All settled. 💸',
  },
  {
    id: 'amir',
    name: 'Amir',
    emoji: '🧑‍💻',
    balance: -12,
    lastActivity: 'Dec 08, 22:00',
  },
]

export const activity: ActivityItem[] = [
  {
    id: 'activity-1',
    description: 'Nadia marked Weekend Brunch as paid',
    timestamp: '2024-12-12T18:30:00',
    emoji: '✅',
    tone: 'positive',
  },
  {
    id: 'activity-2',
    description: 'You added Movie Night bill',
    timestamp: '2024-12-10T21:10:00',
    emoji: '🎬',
    tone: 'neutral',
  },
  {
    id: 'activity-3',
    description: 'Leena settled Group Gift',
    timestamp: '2024-12-07T13:25:00',
    emoji: '🎁',
    tone: 'positive',
  },
  {
    id: 'activity-4',
    description: 'Hafiz reminded everyone to pay for Movie Night snacks',
    timestamp: '2024-12-10T21:05:00',
    emoji: '🍿',
    tone: 'neutral',
  },
]

export const categories = [
  { id: 'food', label: '🍜 Food', color: '#34D399' },
  { id: 'transport', label: '🚗 Ride', color: '#60a5fa' },
  { id: 'entertainment', label: '🎟️ Fun', color: '#f97316' },
  { id: 'shopping', label: '🛍️ Shopping', color: '#a855f7' },
  { id: 'utilities', label: '⚡ Utilities', color: '#facc15' },
  { id: 'delivery', label: '📦 Delivery', color: '#f472b6' },
]
