# 💰 DuitLater - Bayar Nanti, Track Sekarang!

**Zero-fee bill splitting app made for Malaysians** 🇲🇾

Tired of "nanti aku bayar ko" and then lupa? DuitLater got your back!

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)](https://tailwindcss.com/)

---

## ✨ Features

- 📸 **Scan Receipts** - OCR auto-detect items (Phase 2)
- 👥 **Item-Level Splitting** - Tag specific items to specific people
- 💸 **Smart Settlements** - Tahu exactly siapa hutang siapa
- 🔔 **Push Notifications** - Get notified of new bills (Android/Desktop)
- 📱 **PWA** - Install on your phone like a native app (works on iPhone!)
- 🆓 **100% Free** - No premium plans, forever free
- 🇲🇾 **Made for Malaysians** - Understand our dining culture!

---

## 🎯 Perfect For

- 🍜 **Mamak sessions** with the boys
- ☕ **Kopitiam breakfast** with colleagues
- 🍔 **Food delivery** for the office
- 🎂 **Birthday celebrations** with friends
- 🏠 **Roommate expenses** for groceries
- ✈️ **Travel trips** with squad

---

## 🚀 Quick Start

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Set Up Supabase (2 min)

1. Go to [supabase.com](https://supabase.com) → Create project
2. Copy `supabase/schema.sql` → Paste in SQL Editor → Run
3. Get your credentials from Settings → API

### 3. Configure Environment (1 min)

```bash
cp .env.local.example .env.local
```

Add your Supabase credentials to `.env.local`

### 4. Run! (1 min)

```bash
npm run dev
```

Open http://localhost:3000 🎉

**Detailed guide:** See [`docs/SETUP.md`](docs/SETUP.md)

---

## 📱 Install as PWA

### iPhone (Safari)
1. Open DuitLater in Safari
2. Tap Share icon 
3. "Add to Home Screen"
4. Siap! Now got app icon on home screen 📲

### Android (Chrome)
1. Open DuitLater
2. Tap menu (⋮)
3. "Install app"
4. Done! 🎉

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - Latest React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS (amber theme! 🟡)
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Zustand** - Global state
- **Sonner** - Toast notifications

### Backend
- **Supabase** - PostgreSQL + Auth + Real-time
- **Row Level Security** - Privacy built-in

### Third-Party
- **OneSignal** - Push notifications (free!)
- **Tesseract.js** - OCR scanning (free!)
- **next-pwa** - PWA magic

---

## 💡 Why "DuitLater"?

**Duit** = Money (in Malay/Indonesian)  
**Later** = Pay later, track now!

We know how it goes:
- "Nanti aku bayar ko" 
- "Esok transfer lah"
- "Lupa pulak!"

With DuitLater, no more awkward reminders! Just split, track, settle. Simple! 🎯

---

## 🎨 Features Explained

### Scan Receipts (Coming Soon - Phase 2)
```
Take photo of receipt
  ↓
OCR detects items & prices
  ↓
You review & confirm
  ↓
Tag items to friends
  ↓
Done! 🎉
```

### Manual Entry (MVP - Phase 1)
```
Enter bill manually
  ↓
Add items one by one
  ↓
Tag who ordered what
  ↓
System calculates who owes what
  ↓
Everyone sees their share
```

### Settlement Made Easy
- See who you owe (red)
- See who owes you (green)
- Mark as paid with one tap
- No more "dah transfer ke belum?"

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | **START HERE!** 5-min setup |
| [docs/PRD.md](docs/PRD.md) | Product requirements |
| [docs/SETUP.md](docs/SETUP.md) | Detailed setup guide |
| [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) | Build roadmap |
| [docs/SKILLS.md](docs/SKILLS.md) | Technical patterns |

---

## 🚧 Development Status

### ✅ Phase 1: Foundation (DONE!)
- [x] Database schema with RLS
- [x] User authentication
- [x] Dashboard with balance summary
- [x] Bill creation UI
- [x] React Hook Form + Zod validation
- [x] Zustand state management
- [x] PWA setup (installable!)
- [x] Complete documentation
- [x] Rebranded to DuitLater! 🎉

### 🚧 Phase 2: MVP (Next)
- [ ] Friends management
- [ ] Manual bill entry (complete form)
- [ ] Tag items to friends
- [ ] Calculate settlements
- [ ] Mark settlements as paid

### 🔮 Phase 3: OCR & Polish
- [ ] Camera capture
- [ ] Tesseract.js OCR
- [ ] Receipt parsing
- [ ] Push notifications

**Full roadmap:** See [`docs/IMPLEMENTATION.md`](docs/IMPLEMENTATION.md)

---

## 💰 Cost to Run

For your friend group:

| Service | Cost |
|---------|------|
| Supabase | RM 0/month (free tier) |
| OneSignal | RM 0/month (free tier) |
| Tesseract.js | RM 0 (client-side) |
| Vercel Hosting | RM 0/month (free tier) |
| **Total** | **RM 0/month** ✅ |

Only pay if you get thousands of users! 🚀

---

## 🎯 Core Principles

1. **Zero Friction** - Scan → Tag → Done
2. **Zero Fees** - Free forever, no catch
3. **Malaysian First** - Built for our culture
4. **Privacy First** - Your data is yours
5. **Friends First** - Built for trust, not strangers

---

## 🇲🇾 Malaysian Features

- Understands mamak culture (service charge, tax, GST/SST)
- Supports Malaysian dining patterns
- Group billing for office lunch orders
- Perfect for "tapau" scenarios
- Split by individual items (because we all order different things!)

---

## 🤝 Contributing

This is for kawan-kawan! Feel free to:
- Fork and use for your own group
- Submit bug reports
- Suggest features
- Share with friends!

---

## 📱 Screenshots

*Coming soon! Building features first* 🚀

---

## 🎉 Fun Facts

- Built by Malaysians, for Malaysians 🇲🇾
- Name inspired by "nanti bayar" culture
- Zero fees because we're not corporate
- Open source because sharing is caring
- Amber theme because 💰 duit gold color mah!

---

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add env variables in Vercel dashboard. Done! 🎉

---

## 📞 Support

- **Setup issues?** → Check [docs/SETUP.md](docs/SETUP.md)
- **How to code?** → Check [docs/SKILLS.md](docs/SKILLS.md)
- **What to build?** → Check [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md)

---

## ⭐ Show Your Support

If DuitLater helped you:
- ⭐ Star this repo
- 🗣️ Tell your friends
- 📱 Share on social media
- 💚 Give feedback!

---

## 🙏 Acknowledgments

Built with:
- ❤️ Love for friends
- 😤 Frustration with forgetting who paid
- 🍜 Many mamak sessions
- ☕ Lots of kopi
- 🌙 Late night coding sessions

---

## 📄 License

MIT License - Free to use, modify, and share!

---

**Made with ❤️ untuk kawan-kawan yang suka makan ramai-ramai tapi selalu lupa bayar** 😅

---

## 🎯 Quick Links

- [🚀 Quick Start](#-quick-start)
- [📚 Documentation](#-documentation)
- [💰 Cost](#-cost-to-run)
- [📱 Install as PWA](#-install-as-pwa)
- [🛠️ Tech Stack](#️-tech-stack)

---

**Bayar nanti, track sekarang! 💰**

Start building: `npm run dev` 🚀
