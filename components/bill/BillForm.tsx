// file: components/bill/BillForm.tsx
'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatISO } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { Loader2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { ItemsTable } from '@/components/bill/ItemsTable'
import { SplitPreview } from '@/components/bill/SplitPreview'
import { computeNetTotal } from '@/lib/calc'
import { formatCurrency } from '@/lib/utils'
import { MOCK_USERS } from '@/lib/mockData'
import { billFormSchema, BillFormSchema } from '@/lib/validation/bill'
import { BillItem, BillSplitMethod } from '@/types/bill'

type FormSchema = BillFormSchema

const DRAFT_KEY = 'duitlater:bill:new'
const defaultPayer = MOCK_USERS[0]?.id ?? ''
const defaultParticipants = MOCK_USERS.slice(0, 2).map((user) => user.id)

const defaultValues: FormSchema = {
  title: '',
  date: formatISO(new Date(), { representation: 'date' }),
  merchant: '',
  notes: '',
  currency: 'MYR',
  total: undefined,
  method: 'equal',
  payerId: defaultPayer,
  participantIds: Array.from(new Set([defaultPayer, ...defaultParticipants])),
  serviceChargePct: undefined,
  taxPct: undefined,
  tip: undefined,
  discount: undefined,
  tags: [],
  groupTag: '',
  receiptFile: null,
  items: [
    {
      id: 'item_initial',
      name: '',
      price: 0.0,
      assigneeIds: Array.from(new Set([defaultPayer, ...defaultParticipants])),
    },
  ],
}

type BillFormProps = {
  users?: typeof MOCK_USERS
}

export function BillForm({ users = MOCK_USERS }: BillFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [receiptPreview, setReceiptPreview] = React.useState<string | null>(null)
  const [tagInput, setTagInput] = React.useState('')
  const formRef = React.useRef<HTMLFormElement | null>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(billFormSchema),
    mode: 'onChange',
    defaultValues,
  })

  const { control, handleSubmit, reset, watch, setValue, getValues, formState } = form

  const payerId = watch('payerId')
  const participantIds = watch('participantIds')
  const method = watch('method')

  React.useEffect(() => {
    if (!participantIds.includes(payerId)) {
      setValue('participantIds', Array.from(new Set([payerId, ...participantIds])), {
        shouldValidate: true,
      })
    }
  }, [payerId, participantIds, setValue])

  React.useEffect(() => {
    const currentItems = (getValues('items') ?? []) as BillItem[]
    let hasChanged = false
    const nextItems: BillItem[] = currentItems.map((item) => {
      const filtered = item.assigneeIds.filter((id) => participantIds.includes(id))
      if (filtered.length !== item.assigneeIds.length) {
        hasChanged = true
      }
      return {
        ...item,
        assigneeIds: filtered.length ? filtered : [payerId],
      }
    })
    if (hasChanged) {
      setValue('items', nextItems, { shouldValidate: true })
    }
  }, [participantIds, getValues, setValue, payerId])

  const watchedValues = watch()

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const { receiptFile, ...rest } = watchedValues
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(rest))
    } catch (error) {
      console.error('Failed to save draft', error)
    }
  }, [watchedValues])

  React.useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview)
      }
    }
  }, [receiptPreview])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem(DRAFT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<FormSchema>
        reset({ ...defaultValues, ...parsed, receiptFile: null })
        setReceiptPreview(null)
        toast({ title: 'Draft restored', description: 'Picked up where you left off.' })
      }
    } catch (error) {
      console.error('Failed to restore draft', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTagAdd = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    setValue(
      'tags',
      Array.from(new Set([...(getValues('tags') ?? []), trimmed])),
      { shouldDirty: true, shouldValidate: true }
    )
    setTagInput('')
  }

  const handleTagDelete = (tag: string) => {
    setValue(
      'tags',
      (getValues('tags') ?? []).filter((existing: string) => existing !== tag),
      { shouldDirty: true, shouldValidate: true }
    )
  }

  const handleReceiptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setValue('receiptFile', null, { shouldDirty: true })
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview)
      }
      setReceiptPreview(null)
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image under 5MB.',
        variant: 'destructive',
      })
      return
    }
    setValue('receiptFile', file, { shouldDirty: true })
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview)
    }
    const previewUrl = URL.createObjectURL(file)
    setReceiptPreview(previewUrl)
  }

  const removeReceipt = () => {
    setValue('receiptFile', null, { shouldDirty: true })
    setReceiptPreview(null)
  }

  const onSubmit = async (values: FormSchema) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'items') {
          formData.append('items', JSON.stringify(value))
        } else if (key === 'tags') {
          formData.append('tags', JSON.stringify(value))
        } else if (key === 'participantIds') {
          formData.append('participantIds', JSON.stringify(value))
        } else if (key === 'receiptFile') {
          if (value) {
            formData.append('receiptFile', value as File)
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      const response = await fetch('/api/bills', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit bill')
      }

      const result = await response.json()

      toast({
        title: 'Bill created',
        description: `Net total ${formatCurrency(result.net ?? 0)}`,
        variant: 'success',
      })

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(DRAFT_KEY)
      }
      reset(defaultValues)
      setReceiptPreview(null)

      router.push(`/bill/${result.id ?? 'preview'}`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong',
        description: 'Unable to save bill. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    toast({ title: 'Draft saved', description: 'Your bill is autosaved.' })
  }

  const handleReset = () => {
    reset(defaultValues)
    setReceiptPreview(null)
    toast({ title: 'Form reset', description: 'Cleared inputs and draft.' })
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(DRAFT_KEY)
    }
  }

  const totalValue = watch('total') ?? 0
  const serviceChargePct = watch('serviceChargePct')
  const taxPct = watch('taxPct')
  const tipValue = watch('tip') ?? 0
  const discountValue = watch('discount') ?? 0
  const items = watch('items') as BillItem[]

  const chargesSummary = computeNetTotal({
    method,
    total: method === 'equal' ? totalValue : undefined,
    items: method === 'itemized' ? items : undefined,
    serviceChargePct,
    taxPct,
    tip: tipValue,
    discount: discountValue,
  })

  const previewNet =
    method === 'equal'
      ? chargesSummary.net
      : computeNetTotal({
          method,
          items,
          serviceChargePct,
          taxPct,
          tip: tipValue,
          discount: discountValue,
        }).net

  return (
    <form
      ref={formRef}
      className="grid gap-6 pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:pb-0"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-6">
        <Card className="space-y-4 border-none bg-transparent p-0 shadow-none">
          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">Bill details</h2>
              <p className="text-sm text-neutral-500">Fill in what this bill is about.</p>
            </header>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" required>
                  Title
                </Label>
                <Input id="title" placeholder="eg. Dinner at Mama's" {...form.register('title')} />
                {formState.errors.title?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.title.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" required>
                  Date
                </Label>
                <Input id="date" type="date" {...form.register('date')} />
                {formState.errors.date?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.date.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant</Label>
                <Input id="merchant" placeholder="eg. Village Park" {...form.register('merchant')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Include any reminders." {...form.register('notes')} />
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">People</h2>
              <p className="text-sm text-neutral-500">Who paid and who is involved.</p>
            </header>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="payerId" required>
                  Payer
                </Label>
                <Select
                  id="payerId"
                  value={payerId}
                  onChange={(event) => setValue('payerId', event.target.value, { shouldValidate: true })}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label required>Participants</Label>
                <Controller
                  control={control}
                  name="participantIds"
                  render={({ field }) => (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {field.value?.map((id: string) => {
                          const user = users.find((u) => u.id === id)
                          return user ? <Badge key={id}>{user.name}</Badge> : null
                        })}
                      </div>
                      <div className="grid gap-2">
                        {users.map((user) => {
                          const checked = field.value?.includes(user.id)
                          return (
                            <label
                              key={`participant-${user.id}`}
                              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
                            >
                              <span className="flex flex-col">
                                <span className="font-medium text-neutral-900">{user.name}</span>
                                <span className="text-xs text-neutral-500">@{user.username}</span>
                              </span>
                              <Checkbox
                                checked={checked}
                                onChange={(event) => {
                                  const isChecked = event.target.checked
                                  const next = new Set(field.value ?? [])
                                  if (isChecked) {
                                    next.add(user.id)
                                  } else if (user.id !== payerId) {
                                    next.delete(user.id)
                                  }
                                  field.onChange(Array.from(next))
                                }}
                                disabled={user.id === payerId}
                                aria-label={`Toggle ${user.name}`}
                              />
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )}
                />
                {formState.errors.participantIds?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.participantIds.message}</p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">Split method</h2>
              <p className="text-sm text-neutral-500">Choose how you want to divide the bill.</p>
            </header>
            <div className="flex gap-2">
              {(['equal', 'itemized'] as BillSplitMethod[]).map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={method === option ? 'default' : 'outline'}
                  onClick={() => setValue('method', option, { shouldValidate: true })}
                  className="flex-1"
                >
                  {option === 'equal' ? 'Divide equally' : 'Itemized'}
                </Button>
              ))}
            </div>
            {method === 'equal' ? (
              <div className="space-y-2">
                <Label htmlFor="total" required>
                  Total amount
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-500">
                    RM
                  </span>
                  <Input
                    id="total"
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="pl-10"
                    placeholder="0.00"
                    {...form.register('total', { valueAsNumber: true })}
                  />
                </div>
                {formState.errors.total?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.total.message}</p>
                ) : null}
              </div>
            ) : (
              <ItemsTable
                control={control as any}
                register={form.register as any}
                watch={watch as any}
                setValue={setValue as any}
                participants={users}
                participantIds={participantIds}
                errors={formState.errors as any}
              />
            )}
          </section>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">Charges</h2>
              <p className="text-sm text-neutral-500">Optional additions or deductions.</p>
            </header>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="serviceChargePct">Service charge %</Label>
                <Input
                  id="serviceChargePct"
                  type="number"
                  step="0.01"
                  min="0"
                  max="30"
                  placeholder="0"
                  {...form.register('serviceChargePct', { valueAsNumber: true })}
                />
                <p className="text-xs text-neutral-500">Applies before tax.</p>
                {formState.errors.serviceChargePct?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.serviceChargePct.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxPct">Tax %</Label>
                <Input
                  id="taxPct"
                  type="number"
                  step="0.01"
                  min="0"
                  max="30"
                  placeholder="0"
                  {...form.register('taxPct', { valueAsNumber: true })}
                />
                <p className="text-xs text-neutral-500">GST/SST applied after service charge.</p>
                {formState.errors.taxPct?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.taxPct.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tip">Tip (RM)</Label>
                <Input
                  id="tip"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...form.register('tip', { valueAsNumber: true })}
                />
                {formState.errors.tip?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.tip.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (RM)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...form.register('discount', { valueAsNumber: true })}
                />
                {formState.errors.discount?.message ? (
                  <p className="text-xs text-red-500">{formState.errors.discount.message}</p>
                ) : null}
              </div>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
              Net total after charges: <span className="font-semibold text-neutral-900">{formatCurrency(chargesSummary.net)}</span>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">Tags & group</h2>
              <p className="text-sm text-neutral-500">Organise your bill for easy search.</p>
            </header>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {watch('tags')?.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      #{tag}
                      <button
                        type="button"
                        className="text-neutral-400 hover:text-neutral-700"
                        onClick={() => handleTagDelete(tag)}
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ',') {
                      event.preventDefault()
                      handleTagAdd(tagInput)
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupTag">Group / Trip</Label>
                <Input id="groupTag" placeholder="eg. Langkawi trip" {...form.register('groupTag')} />
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900">Receipt</h2>
              <p className="text-sm text-neutral-500">Attach a photo (optional, max 5MB).</p>
            </header>
            <div className="space-y-3">
              <input
                id="receiptFile"
                type="file"
                accept="image/*"
                onChange={handleReceiptChange}
                className="w-full rounded-lg border border-dashed border-neutral-300 bg-white p-3 text-sm"
              />
              {receiptPreview ? (
                <div className="relative h-52 overflow-hidden rounded-xl border border-neutral-200">
                  <img src={receiptPreview} alt="Receipt preview" className="h-full w-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute right-3 top-3"
                    onClick={removeReceipt}
                  >
                    Remove
                  </Button>
                </div>
              ) : null}
            </div>
          </section>
        </Card>

        <div className="flex gap-2 lg:hidden">
          <Button type="button" variant="secondary" className="flex-1" onClick={handleSaveDraft}>
            Save draft
          </Button>
          <Button type="button" variant="ghost" className="flex-1" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <SplitPreview
          method={method}
          payerId={payerId}
          participantIds={participantIds}
          total={method === 'equal' ? totalValue : undefined}
          items={method === 'itemized' ? items : []}
          serviceChargePct={serviceChargePct}
          taxPct={taxPct}
          tip={tipValue}
          discount={discountValue}
          users={users}
        />

        <div className="hidden space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:block">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Net total</span>
            <span className="text-lg font-semibold text-neutral-900">{formatCurrency(previewNet)}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Button type="button" variant="secondary" onClick={handleSaveDraft}>
              Save draft
            </Button>
            <Button type="button" variant="ghost" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" disabled={!formState.isValid || isSubmitting} className="sm:col-span-1">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </span>
              ) : (
                'Submit bill'
              )}
            </Button>
          </div>
          {!formState.isValid ? (
            <p className="text-xs text-neutral-500">
              Complete the required fields to enable submission.
            </p>
          ) : null}
        </div>
      </div>

      <div className="lg:hidden" aria-hidden="true" />

      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0))]">
            <div className="flex flex-col text-sm">
              <span className="text-neutral-500">Net total</span>
              <span className="text-base font-semibold text-neutral-900">{formatCurrency(previewNet)}</span>
            </div>
            <Button type="submit" className="flex-1" disabled={!formState.isValid || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </span>
              ) : (
                'Submit bill'
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
