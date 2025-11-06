'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { signUpSchema, signInSchema, type SignUpInput, type SignInInput } from '@/lib/validations'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const setUser = useAuthStore((state) => state.setUser)

  // Sign Up Form
  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  })

  // Sign In Form
  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSignUp = async (data: SignUpInput) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (error) throw error

      toast.success('Check your email for verification link!')
      signUpForm.reset()
    } catch (error: any) {
      toast.error(error.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  const onSignIn = async (data: SignInInput) => {
    setLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (authData.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (profile) {
          setUser(profile)
        }

        toast.success('Selamat datang kembali! 🎉')
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-5xl">💰</span>
            <h1 className="text-5xl font-bold text-amber-600">DuitLater</h1>
          </div>
          <p className="text-gray-600">Bayar nanti, track sekarang</p>
        </div>

        {/* Auth Card */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Selamat Datang Kembali'}
          </h2>

          {isSignUp ? (
            // Sign Up Form
            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Penuh
                </label>
                <input
                  {...signUpForm.register('fullName')}
                  className="input"
                  placeholder="Ahmad bin Abdullah"
                  disabled={loading}
                />
                {signUpForm.formState.errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">
                    {signUpForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  {...signUpForm.register('email')}
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  disabled={loading}
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  {...signUpForm.register('password')}
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  disabled={loading}
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner w-5 h-5 border-2"></div>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          ) : (
            // Sign In Form
            <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  {...signInForm.register('email')}
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  disabled={loading}
                />
                {signInForm.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  {...signInForm.register('password')}
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  disabled={loading}
                />
                {signInForm.formState.errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner w-5 h-5 border-2"></div>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                signUpForm.reset()
                signInForm.reset()
              }}
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
              disabled={loading}
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center text-sm text-gray-600 space-y-1">
          <p>✨ Zero fees, forever free</p>
          <p>📸 Scan receipts with OCR</p>
          <p>🤝 Split bills instantly</p>
        </div>
      </div>
    </div>
  )
}
