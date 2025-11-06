// file: lib/utils.ts
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const formatCurrency = (value: number, currency: string = 'MYR') => {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
