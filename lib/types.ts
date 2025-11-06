// Core types for Spleet application

export interface User {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  onesignal_player_id: string | null
}

export interface Friend {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
}

export interface Bill {
  id: string
  title: string
  description: string | null
  total_amount: number
  service_charge: number
  tax: number
  paid_by: string
  created_by: string
  receipt_image_url: string | null
  bill_date: string
  created_at: string
  updated_at: string
  participants?: User[]
  items?: BillItem[]
  payer?: User
}

export interface BillItem {
  id: string
  bill_id: string
  name: string
  price: number
  quantity: number
  shared_by?: User[]
  created_at: string
}

export interface Settlement {
  id: string
  bill_id: string
  from_user_id: string
  to_user_id: string
  amount: number
  status: 'pending' | 'paid' | 'cancelled'
  paid_at: string | null
  from_user?: User
  to_user?: User
  bill?: Bill
}

export interface UserBalance {
  total_owed: number // Amount user owes others
  total_owed_to_me: number // Amount others owe user
  net_balance: number // Positive = you're owed, Negative = you owe
  settlements: Settlement[]
}

export interface OCRResult {
  merchant_name: string | null
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
  subtotal: number | null
  tax: number | null
  service_charge: number | null
  total: number | null
  confidence: number // 0-1
}
