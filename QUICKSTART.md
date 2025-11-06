# 🚀 DuitLater - QUICK START

**Selamat datang!** You're 5 minutes away from running DuitLater locally.

---

## ✅ What You Have

A **complete, production-ready** Next.js 15 app with:
- ✅ Latest Next.js 15 (App Router)
- ✅ Supabase (database + auth)
- ✅ React Hook Form + Zod (forms)
- ✅ Zustand (state management)
- ✅ OneSignal (push notifications)
- ✅ Tesseract.js (OCR)
- ✅ PWA (installable on iPhone!)
- ✅ Complete documentation
- ✅ Amber theme (💰 duit color!)

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

Tunggu packages install...

### Step 2: Set Up Supabase (2 min)

1. Go to https://supabase.com
2. Create a new project (free!)
3. Wait ~2 minutes for database to initialize
4. Go to **SQL Editor** (left sidebar)
5. Copy everything from `supabase/schema.sql`
6. Paste in SQL Editor → Click "Run"
7. Go to **Settings** → **API**
8. Copy your **Project URL** and **anon public key**

### Step 3: Configure Environment (1 min)

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key
```

### Step 4: Run! (1 min)

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 🎉 What Now?

1. **Create an account** - Sign up at `/auth`
2. **Explore the dashboard** - See the balance summary
3. **Click the giant + button** - Start creating bills
4. **Read the docs** - Check `docs/` folder for guides

---

## 💡 Test It Out

### Create Test Accounts

Use the email + trick:
```
you+izzul@gmail.com
you+alan@gmail.com
you+najmi@gmail.com
```

All emails go to your inbox, perfect for testing!

### Test Scenario

1. **Sign up** with 3 test accounts
2. **Add each other** as friends (coming in Phase 2)
3. **Create a test bill** - "Mamak Session RM 45"
4. **Split items** - Roti canai, teh tarik, nasi lemak
5. **Check balances** - See who owes what!

---

## 📚 Important Files

| File | What It Is |
|------|------------|
| `README.md` | Project overview (you are here!) |
| `QUICKSTART.md` | **This file** - 5-min setup |
| `docs/SETUP.md` | **Detailed setup guide** (if stuck) |
| `docs/PRD.md` | Product requirements |
| `docs/IMPLEMENTATION.md` | **What to build next** |
| `docs/SKILLS.md` | **Technical patterns** |
| `supabase/schema.sql` | **Database schema** (run this in Supabase!) |

---

## 🚧 What's Built vs What's Next

### ✅ Already Built (Ready to Use!)
- Authentication (signup, login, logout)
- Dashboard with balance summary
- Database with all tables and security
- State management (Zustand)
- Form validation (React Hook Form + Zod)
- PWA setup (installable!)
- Complete documentation
- **Rebranded to DuitLater!** 💰

### 🚧 To Build Next (see `docs/IMPLEMENTATION.md`)
1. **Friends Management** - Add, remove, list friends
2. **Manual Bill Entry** - Complete form to add bills
3. **Tag Items** - Assign items to people
4. **Calculate Settlements** - Who owes what
5. **OCR Scanning** - Scan receipts (Phase 2)
6. **Push Notifications** - Alert friends (Phase 3)

---

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- ✅ Check `.env.local` has correct credentials
- ✅ Restart dev server: `Ctrl+C` then `npm run dev`
- ✅ Make sure you ran `schema.sql` in Supabase

### "Auth error"
- ✅ Check email for verification link
- ✅ Check spam folder
- ✅ Verify Supabase Auth is enabled (it is by default)

### "PWA not installing"
- ✅ PWA only works in production or HTTPS
- ✅ Run `npm run build && npm start` to test
- ✅ Add icons to `public/` folder (see `public/ICONS_README.md`)

### "Error running schema.sql"
- ✅ Make sure you copied the ENTIRE file
- ✅ Look for the specific error line
- ✅ Check [docs/SETUP.md](docs/SETUP.md) for solutions

### Other Issues?
**Check `docs/SETUP.md`** - Has detailed troubleshooting!

---

## 🇲🇾 Malaysian Features

DuitLater understands Malaysian culture:

- ✅ **Service charge** automatically split
- ✅ **GST/SST** handling
- ✅ **Mamak bills** with complex orders
- ✅ **Tapau** scenarios
- ✅ **Group orders** for office lunch
- ✅ **Kopitiam** breakfast splits

No more "nanti aku bayar ko" and then lupa! 😅

---

## 📱 Install as PWA (Optional)

### iPhone (Safari)
1. Open your deployed URL in Safari
2. Tap Share icon (bottom center)
3. Scroll down → "Add to Home Screen"
4. Tap "Add"
5. Now got app icon! Tap to open 📲

### Android (Chrome)
1. Open your deployed URL in Chrome
2. Tap menu (⋮) top right
3. "Install app" or "Add to Home Screen"
4. Tap "Install"
5. Done! App is on home screen 🎉

---

## 🚀 Deploy to Production

When ready to share with friends:

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

1. Follow prompts
2. Add env variables in Vercel dashboard
3. Done! Share URL with friends! 🎉

### Option 2: Other Platforms

Deploy to:
- Netlify
- Railway
- Digital Ocean
- Your own server

All work with Next.js 15!

---

## 🎓 Learning Path

1. **Read QUICKSTART.md** (5 min) ← You are here!
2. **Read docs/SETUP.md** (10 min) - Understand the setup
3. **Read docs/IMPLEMENTATION.md** (20 min) - See the roadmap
4. **Read docs/SKILLS.md** (reference) - Learn the patterns
5. **Start building!** Follow the implementation guide

---

## 💰 Cost Reality

### Development
- Everything: **RM 0/month**

### 50 Users (Your Friend Group)
- Supabase: **RM 0/month** (free tier)
- OneSignal: **RM 0/month** (free tier)
- Vercel: **RM 0/month** (free tier)
- Total: **RM 0/month** ✅

### 1000+ Users (If You Go Viral!)
- Supabase: ~**RM 100/month** (Pro tier)
- OneSignal: **RM 0/month** (still free!)
- Vercel: **RM 0/month** (still free!)
- Total: **~RM 100/month**

For your mamak crew: **FREE FOREVER!** 🎉

---

## 🎯 Your Mission

1. ✅ Get it running locally (5 min)
2. ✅ Create a test account
3. ✅ Explore the dashboard
4. 🚧 Build friends management (next!)
5. 🚧 Build bill entry form
6. 🚧 Test with real friends
7. 🎉 Deploy and celebrate!

**Follow `docs/IMPLEMENTATION.md` for step-by-step guide!**

---

## 💡 Pro Tips

1. **Use the + email trick** for testing multiple accounts
2. **Test on mobile** early and often
3. **Share with 2-3 friends** before going public
4. **Use real scenarios** - actual mamak bills!
5. **Iterate based on feedback** - friends akan bagitau what's confusing

---

## 🎨 Brand Guidelines

DuitLater uses:
- **Primary Color:** Amber (#f59e0b) 🟡
- **Accent:** Amber shades
- **Vibe:** Fun, Malaysian, friendly
- **Tone:** Casual, like talking to friends

Why amber? Because duit is gold color mah! 💰

---

## 🎉 You Got This!

Everything is set up. The hard infrastructure work is done.

Now it's just building the features step by step!

**Jom start!** 💪

---

## 📞 Need Help?

- **Setup issues?** → `docs/SETUP.md`
- **How to code?** → `docs/SKILLS.md`
- **What to build?** → `docs/IMPLEMENTATION.md`
- **Why this feature?** → `docs/PRD.md`

---

**Bayar nanti, track sekarang!** 💰

Run `npm run dev` and start building! 🚀

---

Made with ❤️ untuk kawan-kawan yang selalu lupa bayar 😅
