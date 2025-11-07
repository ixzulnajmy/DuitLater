'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Camera, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewBillPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<'choose' | 'scan' | 'manual'>('choose')

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [loading, user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold">New Bill</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {mode === 'choose' && (
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              How would you like to add this bill?
            </h2>

            {/* Scan Receipt Option */}
            <button
              onClick={() => setMode('scan')}
              className="w-full card hover:shadow-lg transition-all p-8 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-4 rounded-full group-hover:bg-primary-200 transition-colors">
                  <Camera size={32} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Scan Receipt</h3>
                  <p className="text-gray-600">
                    Take a photo and let OCR detect items automatically
                  </p>
                  <span className="inline-block mt-2 text-sm text-primary-600 font-medium">
                    Recommended ✨
                  </span>
                </div>
              </div>
            </button>

            {/* Manual Entry Option */}
            <button
              onClick={() => setMode('manual')}
              className="w-full card hover:shadow-lg transition-all p-8 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-4 rounded-full group-hover:bg-gray-200 transition-colors">
                  <FileText size={32} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Enter Manually</h3>
                  <p className="text-gray-600">
                    Type in the items and amounts yourself
                  </p>
                </div>
              </div>
            </button>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                💡 Tip: Scanning is faster and more accurate!
              </p>
            </div>
          </div>
        )}

        {mode === 'scan' && <ScanReceiptComponent user={user} />}
        {mode === 'manual' && <ManualEntryComponent user={user} />}
      </div>
    </div>
  )
}

// Placeholder components - will implement in next files
function ScanReceiptComponent({ user }: { user: any }) {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8 text-center">
        <Camera size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">Scan Receipt</h3>
        <p className="text-gray-600 mb-6">
          This feature will be implemented next! It will use your camera to scan
          receipts and extract items using OCR.
        </p>
        <button
          onClick={() => router.push('/bills/new/scan')}
          className="btn-primary"
        >
          Coming Soon - Go to Scan Page
        </button>
      </div>
    </div>
  )
}

function ManualEntryComponent({ user }: { user: any }) {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6">Enter Bill Details</h3>
        <p className="text-gray-600 mb-6">
          Manual entry form will be implemented next! You'll be able to add:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Bill title (e.g., "McDonald's Lunch")</li>
          <li>Add items one by one</li>
          <li>Assign items to friends</li>
          <li>Add service charge and tax</li>
          <li>Select who paid</li>
        </ul>
        <button
          onClick={() => router.push('/bills/new/manual')}
          className="btn-primary"
        >
          Coming Soon - Go to Manual Entry Page
        </button>
      </div>
    </div>
  )
}
