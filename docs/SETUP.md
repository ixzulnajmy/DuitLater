# 🚀 DuitLater Setup Guide

Follow these steps to get DuitLater running locally!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, Supabase client, TailwindCSS, and more.

## Step 2: Set Up Supabase Database

### 2.1 Create a Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: duitlater (or whatever you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for initialization

### 2.2 Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Open the file `supabase/schema.sql` in this project
4. Copy ALL the contents (it's a long file!)
5. Paste it into the SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

This creates all tables, relationships, security policies, and helper functions!

### 2.3 Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** > **API** (left sidebar)
2. Find and copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and paste your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
   ```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

## Step 5: Create Your First Account

1. Click "Get Started"
2. Click "Don't have an account? Sign up"
3. Enter your email and password
4. Check your email for verification link
5. Click the verification link
6. Go back to http://localhost:3000/auth and sign in
7. You'll be redirected to the dashboard!

## Step 6: Test It Out

Right now you can:
- ✅ Sign up / Sign in
- ✅ View the dashboard
- ✅ See the balance summary (will be $0 for now)
- ✅ Click the giant + button

Next steps to implement:
- [ ] Manual bill entry form
- [ ] Add friends
- [ ] Split items
- [ ] Calculate settlements

## Optional: Set Up OneSignal (Push Notifications)

You can skip this for now and add it later when we implement push notifications!

### When you're ready:

1. Go to https://onesignal.com
2. Create a free account
3. Create a new app
4. Select "Web Push" platform
5. Follow their setup wizard
6. Get your App ID
7. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_ONESIGNAL_APP_ID=your-app-id-here
   ```

## 🎨 Optional: Add App Icons

Create two PNG images for your PWA:
- `public/icon-192x192.png` (192x192 pixels)
- `public/icon-512x512.png` (512x512 pixels)

Use any green/bill-themed icon you like! Or I can help you create one later.

## 🐛 Troubleshooting

### "Supabase client not initialized"
- Check your `.env.local` file has correct credentials
- Restart the dev server after changing env variables

### "Cannot read properties of undefined"
- Make sure you ran the full `schema.sql` in Supabase
- Check Supabase dashboard > Database > Tables - you should see: profiles, bills, friendships, etc.

### "Auth error" when signing up
- Check your email for verification link
- Some email providers (Gmail) may put it in spam
- Try a different email or check Supabase logs

### PWA not installing
- PWA only works in production or with HTTPS
- For local dev, it's disabled (see `next.config.js`)

## 📱 Testing on Your Phone

1. Run `npm run build && npm start` (production mode)
2. Find your computer's local IP (e.g., 192.168.1.5)
3. On your phone, visit `http://192.168.1.5:3000`
4. Add to home screen!

OR deploy to Vercel (free):
```bash
npm install -g vercel
vercel
```

## Next Development Steps

Ready to build more features? Here's the priority:

1. **Friends Management** (`app/friends/page.tsx`)
   - Add friends by email
   - Accept friend requests
   - View friend list

2. **Manual Bill Entry** (`app/bills/new/manual/page.tsx`)
   - Form to add bill details
   - Add items dynamically
   - Tag items to friends
   - Calculate totals

3. **Settlement Calculation** (`lib/settlements.ts`)
   - Calculate who owes whom
   - Create settlement records
   - Show on dashboard

4. **Mark as Paid** (update settlement status)
   - Button to mark settlement as paid
   - Update balance immediately

5. **OCR Scanner** (`app/bills/new/scan/page.tsx`)
   - Camera capture
   - Tesseract.js integration
   - Parse receipt text

Want help implementing any of these? Just ask! 🚀

## 🎉 You're All Set!

Your DuitLater instance is running! Now you can start building the features or just test what's there.

Invite your friends once you've implemented more features, and enjoy splitting bills without the headache! 💚
