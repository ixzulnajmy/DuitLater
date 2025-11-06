# Technical Skills & Patterns Guide
## Spleet Development Reference

This document explains all the technical patterns, skills, and best practices used in Spleet. Use this as a reference when developing new features.

---

## 📚 Table of Contents
1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Structure](#project-structure)
3. [Patterns & Best Practices](#patterns--best-practices)
4. [State Management (Zustand)](#state-management-zustand)
5. [Forms (React Hook Form + Zod)](#forms-react-hook-form--zod)
6. [Supabase Integration](#supabase-integration)
7. [PWA Development](#pwa-development)
8. [OCR Implementation](#ocr-implementation)
9. [Push Notifications](#push-notifications)
10. [Common Patterns](#common-patterns)

---

## Tech Stack Overview

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Zustand** - Global state management
- **Sonner** - Toast notifications

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage
  - Row Level Security (RLS)

### Third-Party
- **OneSignal** - Push notifications
- **Tesseract.js** - OCR (client-side)
- **next-pwa** - Progressive Web App

---

## Project Structure

```
spleet/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (metadata, fonts)
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Main dashboard
│   └── bills/               # Bill management
├── lib/                     # Utilities & configs
│   ├── store.ts            # Zustand stores
│   ├── validations.ts      # Zod schemas
│   ├── types.ts            # TypeScript types
│   └── supabase/           # Supabase clients
│       ├── client.ts       # Browser client
│       ├── server.ts       # Server client
│       └── database.types.ts # Generated types
├── supabase/               # Database
│   └── schema.sql          # Complete schema
├── public/                 # Static assets
│   └── manifest.json       # PWA manifest
└── docs/                   # Documentation
    ├── PRD.md
    ├── SETUP.md
    ├── IMPLEMENTATION.md
    └── SKILLS.md (this file)
```

---

## Patterns & Best Practices

### 1. File Naming Conventions

**Pages:**
```
app/feature/page.tsx          # Route page
app/feature/layout.tsx        # Route layout
app/feature/[id]/page.tsx     # Dynamic route
```

**Components:**
```
components/FeatureName.tsx    # PascalCase
components/ui/button.tsx      # lowercase for primitives
```

**Utilities:**
```
lib/feature-name.ts           # kebab-case
lib/types.ts                  # descriptive name
```

### 2. Code Organization

**Component Structure:**
```tsx
// 1. Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. Types
interface Props {
  id: string
}

// 3. Component
export default function ComponentName({ id }: Props) {
  // 4. Hooks
  const router = useRouter()
  const [state, setState] = useState()
  
  // 5. Effects
  useEffect(() => {}, [])
  
  // 6. Handlers
  const handleClick = () => {}
  
  // 7. Render
  return <div>...</div>
}
```

### 3. TypeScript Best Practices

**Use explicit types:**
```tsx
// ✅ Good
const user: User | null = null

// ❌ Avoid
const user = null
```

**Prefer interfaces for objects:**
```tsx
// ✅ Good
interface User {
  id: string
  name: string
}

// ✅ Also good for unions
type Status = 'active' | 'inactive'
```

**Use type inference when obvious:**
```tsx
// ✅ Good (inferred)
const count = 0

// ❌ Redundant
const count: number = 0
```

---

## State Management (Zustand)

### Why Zustand?
- Minimal boilerplate
- No Context Provider hell
- DevTools support
- Persist middleware
- TypeScript friendly

### Basic Store Pattern

```tsx
// lib/store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MyState {
  value: string
  setValue: (value: string) => void
}

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        value: '',
        setValue: (value) => set({ value }),
      }),
      {
        name: 'my-storage', // localStorage key
      }
    )
  )
)
```

### Usage in Components

```tsx
// Read state
const value = useMyStore((state) => state.value)

// Read multiple
const { value, setValue } = useMyStore()

// Read with selector (optimized)
const value = useMyStore((state) => state.value)
```

### Best Practices
- ✅ One store per domain (auth, UI, bills)
- ✅ Use selectors for performance
- ✅ Keep stores small and focused
- ❌ Don't put everything in global state
- ❌ Don't store derived data

---

## Forms (React Hook Form + Zod)

### Why This Combo?
- **React Hook Form**: Minimal re-renders, great DX
- **Zod**: Type-safe validation, runtime checking
- **Together**: Type inference from schema to form

### Basic Form Pattern

**1. Define Schema:**
```tsx
// lib/validations.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Too short'),
})

export type LoginInput = z.infer<typeof loginSchema>
```

**2. Create Form:**
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations'

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    // data is type-safe!
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}
      
      <button type="submit" disabled={form.formState.isSubmitting}>
        Submit
      </button>
    </form>
  )
}
```

### Advanced Patterns

**Dynamic Fields:**
```tsx
import { useFieldArray } from 'react-hook-form'

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'items', // array field name
})

// Add item
append({ name: '', price: 0 })

// Remove item
remove(index)
```

**Conditional Validation:**
```tsx
const schema = z.object({
  type: z.enum(['email', 'phone']),
  contact: z.string(),
}).refine((data) => {
  if (data.type === 'email') {
    return z.string().email().safeParse(data.contact).success
  }
  return true
}, 'Invalid email')
```

---

## Supabase Integration

### Client-Side (Browser)

```tsx
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Query
const { data, error } = await supabase
  .from('bills')
  .select('*')
  .eq('user_id', userId)
  
// Insert
const { data, error } = await supabase
  .from('bills')
  .insert({ title: 'New Bill' })
  
// Update
const { data, error } = await supabase
  .from('bills')
  .update({ title: 'Updated' })
  .eq('id', billId)
  
// Delete
const { data, error } = await supabase
  .from('bills')
  .delete()
  .eq('id', billId)
```

### Server-Side (Server Components)

```tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createServerSupabaseClient()
  
  const { data } = await supabase
    .from('bills')
    .select('*')
    
  return <div>{/* render data */}</div>
}
```

### Real-Time Subscriptions

```tsx
useEffect(() => {
  const channel = supabase
    .channel('bills')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'bills' },
      (payload) => {
        console.log('Change received!', payload)
        // Update UI
      }
    )
    .subscribe()
    
  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

### Best Practices
- ✅ Use RLS for security (all tables)
- ✅ Always handle errors
- ✅ Use TypeScript types
- ✅ Optimize queries (select only needed fields)
- ❌ Don't expose service role key
- ❌ Don't bypass RLS in client

---

## PWA Development

### Manifest Configuration

```json
// public/manifest.json
{
  "name": "Spleet",
  "short_name": "Spleet",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#10b981",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Next.js PWA Config

```js
// next.config.js
const withPWA = require('@next/pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA(nextConfig)
```

### iOS Specific Meta Tags

```tsx
// app/layout.tsx
<head>
  <link rel="apple-touch-icon" href="/icon-192x192.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</head>
```

### Testing PWA
1. Build production: `npm run build && npm start`
2. Open Chrome DevTools → Application → Manifest
3. Check for errors
4. Test "Add to Home Screen"

---

## OCR Implementation

### Tesseract.js Setup

```tsx
import Tesseract from 'tesseract.js'

async function scanReceipt(imageFile: File) {
  const { data: { text } } = await Tesseract.recognize(
    imageFile,
    'eng',
    {
      logger: (m) => console.log(m), // Progress
    }
  )
  
  return text
}
```

### Receipt Parsing Pattern

```tsx
function parseReceipt(text: string) {
  const lines = text.split('\n')
  const items: Array<{ name: string; price: number }> = []
  
  // Pattern: Item name followed by price
  const itemRegex = /(.+?)\s+(\d+\.\d{2})/
  
  lines.forEach((line) => {
    const match = line.match(itemRegex)
    if (match) {
      items.push({
        name: match[1].trim(),
        price: parseFloat(match[2]),
      })
    }
  })
  
  // Extract totals
  const taxMatch = text.match(/tax[:\s]+(\d+\.\d{2})/i)
  const totalMatch = text.match(/total[:\s]+(\d+\.\d{2})/i)
  
  return {
    items,
    tax: taxMatch ? parseFloat(taxMatch[1]) : null,
    total: totalMatch ? parseFloat(totalMatch[1]) : null,
  }
}
```

### Best Practices
- ✅ Good lighting for photos
- ✅ Flat, straight receipts
- ✅ Allow manual correction
- ✅ Show confidence scores
- ❌ Don't trust OCR 100%

---

## Push Notifications

### OneSignal Setup

```tsx
// lib/onesignal.ts
import OneSignal from 'react-onesignal'

export async function initOneSignal() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
    allowLocalhostAsSecureOrigin: true,
  })
}

export async function subscribeUser(userId: string) {
  const playerId = await OneSignal.getUserId()
  
  // Save to database
  await supabase
    .from('profiles')
    .update({ onesignal_player_id: playerId })
    .eq('id', userId)
}
```

### Sending Notifications

```tsx
// Via OneSignal REST API
async function sendNotification(playerIds: string[], message: string) {
  await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      include_player_ids: playerIds,
      contents: { en: message },
    }),
  })
}
```

---

## Common Patterns

### Loading States

```tsx
function Component() {
  const [loading, setLoading] = useState(false)
  
  async function fetchData() {
    setLoading(true)
    try {
      const data = await fetch(...)
      // handle data
    } catch (error) {
      // handle error
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) return <Spinner />
  return <Content />
}
```

### Error Handling

```tsx
import { toast } from 'sonner'

try {
  await action()
  toast.success('Success!')
} catch (error) {
  if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error('Something went wrong')
  }
}
```

### Protected Routes

```tsx
'use client'

export default function ProtectedPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])
  
  if (!user) return <Spinner />
  
  return <Content />
}
```

### Debounced Search

```tsx
import { useState, useEffect } from 'react'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchAPI(query).then(setResults)
      }
    }, 300) // 300ms debounce
    
    return () => clearTimeout(timer)
  }, [query])
  
  return (
    <input 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
    />
  )
}
```

---

## Performance Tips

### 1. Optimize Images
```tsx
import Image from 'next/image'

<Image 
  src="/photo.jpg" 
  width={500} 
  height={300}
  alt="Description"
  priority // for above-fold images
/>
```

### 2. Code Splitting
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // client-only
})
```

### 3. Memoization
```tsx
import { useMemo, useCallback } from 'react'

// Expensive calculation
const value = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// Callback reference
const handleClick = useCallback(() => {
  doSomething(value)
}, [value])
```

---

## Testing Patterns

### Component Tests
```tsx
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders button', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### API Tests
```tsx
import { createClient } from '@/lib/supabase/client'

test('fetches bills', async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from('bills').select('*')
  
  expect(error).toBeNull()
  expect(Array.isArray(data)).toBe(true)
})
```

---

## Deployment Checklist

### Pre-Deploy
- [ ] Run `npm run build` successfully
- [ ] Test in production mode locally
- [ ] Check environment variables
- [ ] Test PWA installation
- [ ] Verify database migrations
- [ ] Test on mobile devices

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Post-Deploy
- [ ] Test production URL
- [ ] Verify auth works
- [ ] Check Supabase connection
- [ ] Test PWA on mobile
- [ ] Monitor error logs

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server

# Supabase
npm run supabase:types         # Generate TypeScript types

# Testing
npm test                       # Run tests
npm run lint                   # Lint code
```

---

## Resources

### Official Docs
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Zustand](https://zustand-demo.pmnd.rs)
- [TailwindCSS](https://tailwindcss.com/docs)

### Tutorials
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [PWA Guide](https://web.dev/progressive-web-apps/)

---

**Last Updated:** November 6, 2025

---

This guide is a living document. Update it as you learn new patterns!
