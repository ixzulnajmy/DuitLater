// file: app/bill/[id]/page.tsx
import Link from 'next/link'

import { Button } from '@/components/ui/button'

type BillPageProps = {
  params: Promise<{ id: string }>
}

export default async function BillSummaryPage({ params }: BillPageProps) {
  const { id } = await params
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm text-neutral-500">Bill ID</p>
        <h1 className="text-3xl font-bold text-neutral-900">{id}</h1>
        <p className="text-sm text-neutral-600">
          This is a placeholder summary page. Your bill has been recorded via the manual input form.
        </p>
      </header>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-neutral-700">
          In a full experience this screen would show the breakdown of shares, receipt and settlement actions.
        </p>
      </div>
      <Link href="/" className="self-start">
        <Button>Back to home</Button>
      </Link>
    </main>
  )
}
