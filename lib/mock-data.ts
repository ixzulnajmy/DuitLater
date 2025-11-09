export type Friend = {
  id: string
  name: string
  emoji: string
  balance: number // positive = they owe you, negative = you owe them
}

export type BillItem = {
  id: string
  name: string
  price: number
  payers: string[] // friend IDs who ordered this item
}

export type Bill = {
  id: string
  title: string
  category: '🍜' | '🚗' | '🎟️' | '🛍️' | '⚡' | '📦'
  totalAmount: number
  paidBy: string // friend ID
  date: string
  status: 'pending' | 'settled'
  items: BillItem[]
  participants: string[] // friend IDs
  receiptUrl?: string
}

export type Activity = {
  id: string
  type: 'bill_added' | 'bill_settled' | 'payment_received' | 'payment_made'
  title: string
  description: string
  amount?: number
  timestamp: string
  friendId?: string
}

// Mock data
export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Ahmad',
    emoji: '😄',
    balance: 45.50, // Ahmad owes you RM 45.50
  },
  {
    id: '2',
    name: 'Sarah',
    emoji: '😊',
    balance: -23.00, // You owe Sarah RM 23.00
  },
  {
    id: '3',
    name: 'Wei Ming',
    emoji: '🤓',
    balance: 12.75,
  },
  {
    id: '4',
    name: 'Priya',
    emoji: '🌟',
    balance: 0, // All settled
  },
  {
    id: '5',
    name: 'Chong',
    emoji: '🎮',
    balance: -8.50,
  },
]

export const mockBills: Bill[] = [
  {
    id: '1',
    title: 'Mamak Session',
    category: '🍜',
    totalAmount: 87.50,
    paidBy: '1', // Ahmad paid
    date: '2025-11-08T19:30:00',
    status: 'pending',
    participants: ['1', '2', '3'],
    items: [
      { id: '1-1', name: 'Roti Canai', price: 3.50, payers: ['1'] },
      { id: '1-2', name: 'Nasi Lemak', price: 5.00, payers: ['2', '3'] },
      { id: '1-3', name: 'Mee Goreng', price: 7.50, payers: ['1', '3'] },
      { id: '1-4', name: 'Teh Tarik', price: 2.80, payers: ['1', '2'] },
      { id: '1-5', name: 'Teh O Ais', price: 2.50, payers: ['3'] },
    ],
  },
  {
    id: '2',
    title: 'Grab to KLCC',
    category: '🚗',
    totalAmount: 25.00,
    paidBy: '2', // Sarah paid
    date: '2025-11-07T14:20:00',
    status: 'pending',
    participants: ['1', '2', '4'],
    items: [
      { id: '2-1', name: 'Grab Ride', price: 25.00, payers: ['1', '2', '4'] },
    ],
  },
  {
    id: '3',
    title: 'Spotify Family Plan',
    category: '⚡',
    totalAmount: 22.90,
    paidBy: '3', // Wei Ming paid
    date: '2025-11-05T10:00:00',
    status: 'settled',
    participants: ['1', '2', '3', '5'],
    items: [
      { id: '3-1', name: 'Monthly Subscription', price: 22.90, payers: ['1', '2', '3', '5'] },
    ],
  },
  {
    id: '4',
    title: 'Birthday Cake',
    category: '🛍️',
    totalAmount: 85.00,
    paidBy: '1', // Ahmad paid
    date: '2025-11-03T16:45:00',
    status: 'pending',
    participants: ['1', '2', '3', '4', '5'],
    items: [
      { id: '4-1', name: 'Secret Recipe Cake', price: 85.00, payers: ['1', '2', '3', '4', '5'] },
    ],
  },
  {
    id: '5',
    title: 'Movie Night',
    category: '🎟️',
    totalAmount: 108.00,
    paidBy: '2', // Sarah paid
    date: '2025-11-01T20:00:00',
    status: 'settled',
    participants: ['1', '2', '3'],
    items: [
      { id: '5-1', name: 'Movie Tickets', price: 54.00, payers: ['1', '2', '3'] },
      { id: '5-2', name: 'Popcorn Combo', price: 36.00, payers: ['1', '2', '3'] },
      { id: '5-3', name: 'Drinks', price: 18.00, payers: ['2'] },
    ],
  },
]

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'bill_added',
    title: 'New bill added',
    description: 'Mamak Session - RM 87.50',
    amount: 87.50,
    timestamp: '2025-11-08T19:35:00',
    friendId: '1',
  },
  {
    id: '2',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Wei Ming paid you RM 12.75',
    amount: 12.75,
    timestamp: '2025-11-07T18:20:00',
    friendId: '3',
  },
  {
    id: '3',
    type: 'bill_added',
    title: 'New bill added',
    description: 'Grab to KLCC - RM 25.00',
    amount: 25.00,
    timestamp: '2025-11-07T14:22:00',
    friendId: '2',
  },
  {
    id: '4',
    type: 'bill_settled',
    title: 'Bill settled',
    description: 'Spotify Family Plan - RM 22.90',
    amount: 22.90,
    timestamp: '2025-11-06T09:15:00',
    friendId: '3',
  },
  {
    id: '5',
    type: 'payment_made',
    title: 'Payment sent',
    description: 'You paid Sarah RM 23.00',
    amount: 23.00,
    timestamp: '2025-11-05T11:30:00',
    friendId: '2',
  },
  {
    id: '6',
    type: 'bill_added',
    title: 'New bill added',
    description: 'Birthday Cake - RM 85.00',
    amount: 85.00,
    timestamp: '2025-11-03T16:50:00',
    friendId: '1',
  },
  {
    id: '7',
    type: 'bill_settled',
    title: 'Bill settled',
    description: 'Movie Night - RM 108.00',
    amount: 108.00,
    timestamp: '2025-11-02T10:00:00',
    friendId: '2',
  },
]

// Category options for bill creation
export const categoryOptions = [
  { emoji: '🍜', label: 'Food & Dining' },
  { emoji: '🚗', label: 'Transportation' },
  { emoji: '🎟️', label: 'Entertainment' },
  { emoji: '🛍️', label: 'Shopping' },
  { emoji: '⚡', label: 'Utilities' },
  { emoji: '📦', label: 'Other' },
]
