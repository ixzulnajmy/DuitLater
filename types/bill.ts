// file: types/bill.ts
export type User = {
  id: string
  name: string
  username: string
  avatarUrl?: string
}

export type BillSplitMethod = 'equal' | 'itemized'

export type BillItem = {
  id: string
  name: string
  price: number
  assigneeIds: string[]
}

export type BillForm = {
  title: string
  date: string
  merchant?: string
  notes?: string
  currency: 'MYR'
  total?: number
  method: BillSplitMethod
  payerId: string
  participantIds: string[]
  serviceChargePct?: number
  taxPct?: number
  tip?: number
  discount?: number
  tags: string[]
  groupTag?: string
  receiptFile?: File | null
  items: BillItem[]
}
