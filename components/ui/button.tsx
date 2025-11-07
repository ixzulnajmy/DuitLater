// file: components/ui/button.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-orange-500 text-white hover:bg-orange-500/90 focus-visible:ring-orange-500',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-400',
  outline:
    'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:ring-neutral-400',
  ghost: 'hover:bg-neutral-100 text-neutral-800 focus-visible:ring-neutral-400',
  destructive: 'bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-md px-3 text-sm',
  default: 'h-10 rounded-lg px-4 text-sm',
  lg: 'h-11 rounded-lg px-6 text-base',
  icon: 'h-10 w-10 rounded-lg p-0',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
