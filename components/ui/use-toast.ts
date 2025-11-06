// file: components/ui/use-toast.ts
import { toast as sonnerToast } from 'sonner'

type ToastInput = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  action?: { label: string; onClick: () => void }
}

export const useToast = () => {
  return {
    toast: ({ title, description, variant = 'default', action }: ToastInput) => {
      const style =
        variant === 'success'
          ? { className: 'bg-emerald-500 text-white' }
          : variant === 'destructive'
          ? { className: 'bg-red-500 text-white' }
          : undefined
      sonnerToast(title ?? description ?? '', {
        description: title ? description : undefined,
        action:
          action && variant !== 'destructive'
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        ...style,
      })
    },
  }
}
