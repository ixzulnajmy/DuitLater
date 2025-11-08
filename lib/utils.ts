import clsx, { type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace('MYR', 'RM')
    .trim()
}

export function formatRelativeDate(date: string) {
  const target = new Date(date)
  const now = new Date()
  const diff = Number(now) - Number(target)
  const minutes = Math.floor(diff / (1000 * 60))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  return target.toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
