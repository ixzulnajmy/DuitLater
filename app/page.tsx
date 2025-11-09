'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Users, Receipt, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-7xl">💸</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              DuitLater
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-foreground/80 mb-3 font-semibold">
            Bayar Nanti, Track Sekarang
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Split bills easily, settle later — the Malaysian way. Zero fees, forever free. 🇲🇾
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl">
              Get Started Free →
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
          <div className="card text-center p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
              <Receipt className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Bills</h3>
            <p className="text-muted-foreground text-sm">
              Add bills manually or scan receipts. Tag items to specific friends effortlessly.
            </p>
          </div>

          <div className="card text-center p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Split Smart</h3>
            <p className="text-muted-foreground text-sm">
              Item-level splitting. Know exactly who owes what. No more awkward calculations.
            </p>
          </div>

          <div className="card text-center p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Settle Easy</h3>
            <p className="text-muted-foreground text-sm">
              Mark payments with one tap. Clear overview of who you owe and who owes you.
            </p>
          </div>
        </div>

        {/* Why DuitLater */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Kenapa DuitLater?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 card p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl flex-shrink-0">💚</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">100% Free Forever</h4>
                <p className="text-muted-foreground text-sm">
                  No premium plans, no hidden fees. Built for friends, not profit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 card p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl flex-shrink-0">⚡</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Zero Friction</h4>
                <p className="text-muted-foreground text-sm">
                  Add bill → Split with friends → Done. No complex forms or unnecessary steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 card p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl flex-shrink-0">🇲🇾</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Made for Malaysians</h4>
                <p className="text-muted-foreground text-sm">
                  Perfect for mamak sessions, kopitiam breakfasts, and everything in between!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-12 max-w-2xl mx-auto">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Join your friends and start splitting bills the easy way
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Splitting Bills 🚀
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Made with 💚 in Malaysia
          </p>
        </div>
      </div>
    </div>
  )
}
