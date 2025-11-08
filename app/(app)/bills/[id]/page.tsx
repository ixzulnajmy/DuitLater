import type { Metadata } from 'next'
import BillDetailsClient from './bill-details-client'

export const metadata: Metadata = {
  title: 'Bill details — DuitLater',
}

type BillDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function BillDetailsPage({ params }: BillDetailsPageProps) {
  const { id } = await params
  return <BillDetailsClient billId={id} />
}
