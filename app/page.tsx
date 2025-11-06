'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl">💰</span>
            <h1 className="text-6xl md:text-7xl font-bold text-amber-600">
              DuitLater
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4">
            Bayar Nanti, Track Sekarang
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Split bills dengan kawan, scan receipt, dan settle up tanpa pening kepala.
            Zero fees, forever free. 🎉
          </p>
          <Link
            href="/auth"
            className="inline-block bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free →
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">Scan Receipts</h3>
            <p className="text-gray-600">
              Ambil gambar receipt, OCR detect items automatically
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Tag Kawan</h3>
            <p className="text-gray-600">
              Tap items untuk assign siapa makan apa. Super fast!
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">💸</div>
            <h3 className="text-xl font-bold mb-2">Settle Up</h3>
            <p className="text-gray-600">
              Tahu exactly siapa hutang siapa. Mark as paid dengan one tap.
            </p>
          </div>
        </div>

        {/* Why DuitLater */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Kenapa DuitLater?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4 card hover:shadow-md transition-shadow">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold mb-1">100% Free Forever</h4>
                <p className="text-gray-600">
                  Takde premium plans, takde hidden fees. Built untuk kawan, bukan profit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 card hover:shadow-md transition-shadow">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold mb-1">Zero Friction</h4>
                <p className="text-gray-600">
                  Scan → Tag → Done. Takde complex forms atau unnecessary steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 card hover:shadow-md transition-shadow">
              <div className="text-2xl">🎯</div>
              <div>
                <h4 className="font-semibold mb-1">Item-Level Splitting</h4>
                <p className="text-gray-600">
                  Unlike other apps, split by actual items, bukan just total amounts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 card hover:shadow-md transition-shadow">
              <div className="text-2xl">🇲🇾</div>
              <div>
                <h4 className="font-semibold mb-1">Made for Malaysians</h4>
                <p className="text-gray-600">
                  Understand Malaysian dining culture. Perfect untuk mamak, kopitiam, or fancy restaurants!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500 text-sm">
        Made with ❤️ untuk kawan-kawan yang suka makan ramai-ramai
      </div>
    </div>
  )
}
