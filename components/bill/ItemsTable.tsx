// file: components/bill/ItemsTable.tsx
'use client'

import * as React from 'react'
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { User } from '@/types/bill'

export type ItemField = {
  id: string
  name: string
  price: number | ''
  assigneeIds: string[]
  notes?: string
}

type ItemsTableProps<TFormValues extends { items: ItemField[] }> = {
  control: Control<TFormValues>
  register: UseFormRegister<TFormValues>
  watch: UseFormWatch<TFormValues>
  setValue: UseFormSetValue<TFormValues>
  participants: User[]
  participantIds: string[]
  errors?: FieldErrors<TFormValues>
  disabled?: boolean
}

export function ItemsTable<TFormValues extends { items: ItemField[] }>(props: ItemsTableProps<TFormValues>) {
  const { control, register, watch, setValue, participants, participantIds, errors, disabled } = props

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items' as never,
  })

  const items = watch('items') as ItemField[]

  const subtotal = items?.reduce((acc, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price || '0')
    return acc + (isNaN(price) ? 0 : price)
  }, 0) ?? 0

  const handleAssigneeToggle = (itemIndex: number, userId: string, checked: boolean) => {
    const path = `items.${itemIndex}.assigneeIds` as any
    const current = new Set((watch(path) as string[]) ?? [])
    if (checked) {
      current.add(userId)
    } else {
      current.delete(userId)
    }
    setValue(path, Array.from(current), { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full min-w-[600px] table-fixed border-collapse text-sm" role="grid">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Price (RM)</th>
              <th className="px-4 py-3">Assignees</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {fields.map((field, index) => {
              const nameError = errors?.items?.[index]?.name as { message?: string } | undefined
              const priceError = errors?.items?.[index]?.price as { message?: string } | undefined
              const assigneeError = errors?.items?.[index]?.assigneeIds as { message?: string } | undefined

              return (
                <tr key={field.id} className="border-t border-neutral-200 align-top">
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <Input
                        placeholder="eg. Nasi lemak"
                        aria-label={`Item ${index + 1} name`}
                        disabled={disabled}
                        {...register(`items.${index}.name` as const)}
                      />
                      {nameError?.message ? (
                        <p className="text-xs text-red-500">{nameError.message}</p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        aria-label={`Item ${index + 1} price`}
                        disabled={disabled}
                        {...register(`items.${index}.price` as const, {
                          valueAsNumber: true,
                        })}
                      />
                      {priceError?.message ? (
                        <p className="text-xs text-red-500">{priceError.message}</p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="grid gap-2">
                        {participants.map((user) => {
                          const checked = (items?.[index]?.assigneeIds ?? []).includes(user.id)
                          const disabledParticipant = !participantIds.includes(user.id)
                          return (
                            <label
                              key={`${field.id}-${user.id}`}
                              className={
                                'flex items-center justify-between gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm shadow-sm'
                              }
                            >
                              <span className="flex flex-col">
                                <span className="font-medium text-neutral-900">{user.name}</span>
                                <span className="text-xs text-neutral-500">@{user.username}</span>
                              </span>
                              <Checkbox
                                checked={checked && !disabledParticipant}
                                onCheckedChange={(value) =>
                                  handleAssigneeToggle(index, user.id, Boolean(value))
                                }
                                disabled={disabled || disabledParticipant}
                                aria-label={`Toggle ${user.name} for item ${index + 1}`}
                              />
                            </label>
                          )
                        })}
                      </div>
                      {assigneeError?.message ? (
                        <p className="text-xs text-red-500">{assigneeError.message}</p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={disabled || fields.length <= 1}
                      onClick={() => remove(index)}
                      aria-label={`Remove item ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-neutral-900">Subtotal</p>
          <p className="text-lg font-semibold text-orange-600">RM{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                id: `item_${Date.now()}`,
                name: '',
                price: 0,
                assigneeIds: participantIds,
              } as any)
            }
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add item
          </Button>
        </div>
      </div>
    </div>
  )
}
