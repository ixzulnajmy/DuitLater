'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { PrimaryButton, GhostButton } from './buttons'

interface SettleModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

export function SettleModal({ open, onClose, onConfirm, title, description }: SettleModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-8 pt-24">
      <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-col gap-3">
          <PrimaryButton onClick={onConfirm}>Mark as paid</PrimaryButton>
          <GhostButton onClick={onClose}>Cancel</GhostButton>
        </div>
      </div>
    </div>,
    document.body
  )
}
