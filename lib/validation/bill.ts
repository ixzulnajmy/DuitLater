// file: lib/validation/bill.ts
import { parseISO } from 'date-fns'
import { z } from 'zod'

import { computeNetTotal } from '@/lib/calc'
import { BillItem } from '@/types/bill'

export const decimalCheck = (value: number) => Math.round(value * 100) === value * 100

export const toOptionalNumber = (value: unknown) => {
  if (value === '' || value === null || typeof value === 'undefined') return undefined
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

const moneySchema = (min: number, minMessage: string, max: number) =>
  z
    .number({ invalid_type_error: 'Invalid amount' })
    .min(min, minMessage)
    .max(max, 'Too large')
    .refine(decimalCheck, 'Max 2 decimal places')

const baseMoneySchema = moneySchema(0, 'Must be at least 0', 9_999_999)

const optionalMoneySchema = z
  .preprocess(toOptionalNumber, moneySchema(0, 'Must be at least 0', 99_999))
  .optional()

const percentageSchema = z
  .preprocess(toOptionalNumber, z.number().min(0, 'Min 0%').max(30, 'Max 30%').refine(decimalCheck, 'Max 2 decimals'))
  .optional()

export const billFormSchema = z
  .object({
    title: z.string().min(2, 'Title is required'),
    date: z
      .string()
      .refine((val) => {
        if (!val) return false
        const date = parseISO(val)
        return !Number.isNaN(date.getTime())
      }, 'Date is required'),
    merchant: z.string().optional(),
    notes: z.string().optional(),
    currency: z.literal('MYR'),
    total: z
      .preprocess(toOptionalNumber, moneySchema(0.01, 'Enter a positive amount', 9_999_999))
      .optional(),
    method: z.enum(['equal', 'itemized']),
    payerId: z.string(),
    participantIds: z.array(z.string()).min(1, 'Select participants'),
    serviceChargePct: percentageSchema,
    taxPct: percentageSchema,
    tip: optionalMoneySchema,
    discount: optionalMoneySchema,
    tags: z.array(z.string()).default([]),
    groupTag: z.string().optional(),
    receiptFile: z.any().optional(),
    items: z
      .array(
        z.object({
          id: z.string(),
          name: z.string().min(1, 'Item name required'),
          price: z.preprocess(
            toOptionalNumber,
            z
              .number({ invalid_type_error: 'Price required' })
              .min(0, 'Price must be ≥ 0')
              .refine(decimalCheck, 'Max 2 decimals')
          ),
          assigneeIds: z.array(z.string()).min(1, 'Assign at least 1 person'),
        })
      )
      .min(1, 'Add at least one item'),
  })
  .superRefine((data, ctx) => {
    if (data.participantIds.length < 2) {
      ctx.addIssue({
        path: ['participantIds'],
        code: z.ZodIssueCode.custom,
        message: 'Add at least 2 people to split',
      })
    }

    if (data.method === 'equal' && (!data.total || data.total <= 0)) {
      ctx.addIssue({
        path: ['total'],
        code: z.ZodIssueCode.custom,
        message: 'Enter a total amount',
      })
    }

    if (data.method === 'itemized') {
      if (!data.items?.length) {
        ctx.addIssue({
          path: ['items'],
          code: z.ZodIssueCode.custom,
          message: 'Add at least one item',
        })
      }

      data.items?.forEach((item, index) => {
        if (!item.price || item.price <= 0) {
          ctx.addIssue({
            path: ['items', index, 'price'],
            code: z.ZodIssueCode.custom,
            message: 'Price must be greater than 0',
          })
        }
        if (!item.assigneeIds?.length) {
          ctx.addIssue({
            path: ['items', index, 'assigneeIds'],
            code: z.ZodIssueCode.custom,
            message: 'Assign at least 1 person',
          })
        }
      })
    }

    const netInfo = computeNetTotal({
      method: data.method,
      total: data.total,
      items: data.items as BillItem[],
      serviceChargePct: data.serviceChargePct,
      taxPct: data.taxPct,
      tip: data.tip,
      discount: data.discount,
    })

    if (netInfo.net < 0) {
      ctx.addIssue({
        path: ['discount'],
        code: z.ZodIssueCode.custom,
        message: 'Discount too large',
      })
    }
  })

export type BillFormSchema = z.infer<typeof billFormSchema>
