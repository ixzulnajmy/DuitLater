// file: components/ui/label.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('flex items-center gap-1 text-sm font-medium text-neutral-800', className)}
        {...props}
      >
        {children}
        {required ? <span className="text-red-500" aria-hidden="true">*</span> : null}
      </label>
    )
  }
)
Label.displayName = 'Label'
