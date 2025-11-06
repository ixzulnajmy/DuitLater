import { z } from 'zod'

// Auth Schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>

// Bill Item Schema
export const billItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  price: z.coerce.number().positive('Price must be positive'),
  quantity: z.coerce.number().int().positive('Quantity must be at least 1').default(1),
  sharedBy: z.array(z.string()).min(1, 'Select at least one person'),
})

export type BillItemInput = z.infer<typeof billItemSchema>

// Manual Bill Entry Schema
export const manualBillSchema = z.object({
  title: z.string().min(1, 'Bill title is required'),
  description: z.string().optional(),
  billDate: z.string().or(z.date()),
  items: z.array(billItemSchema).min(1, 'Add at least one item'),
  serviceCharge: z.coerce.number().min(0, 'Service charge cannot be negative').default(0),
  tax: z.coerce.number().min(0, 'Tax cannot be negative').default(0),
  paidBy: z.string().min(1, 'Select who paid'),
  participants: z.array(z.string()).min(1, 'Select at least one participant'),
})

export type ManualBillInput = z.infer<typeof manualBillSchema>

// Add Friend Schema
export const addFriendSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type AddFriendInput = z.infer<typeof addFriendSchema>

// Profile Update Schema
export const profileUpdateSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>

// Settlement Schema
export const settlementSchema = z.object({
  settlementId: z.string().uuid(),
  status: z.enum(['pending', 'paid', 'cancelled']),
})

export type SettlementInput = z.infer<typeof settlementSchema>
