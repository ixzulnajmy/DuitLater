# Product Requirements Document (PRD)
## 💰 DuitLater - Bayar Nanti, Track Sekarang

**Version:** 2.0 (Rebranded!)  
**Last Updated:** November 2025  
**Author:** Product Team  
**Status:** MVP Development  
**Market:** Malaysia & SEA 🇲🇾

---

## 📋 Executive Summary

### Vision
DuitLater is a zero-fee bill splitting application built specifically for Malaysian and Southeast Asian dining culture. By leveraging OCR technology and focusing on zero-friction UX, DuitLater makes bill splitting as simple as: Scan → Tag → Done.

**Tagline:** "Bayar nanti, track sekarang!" (Pay later, track now!)

### The Malaysian Problem
"Nanti aku bayar ko" (I'll pay you later) is a phrase we all know too well:
1. **Forgetting who owes what** - Mamak bills piling up, lupa siapa bayar
2. **Complex splitting** - Different people order different things
3. **Awkward reminders** - Segan nak mintak duit balik
4. **Service charge & tax** - Need to split properly
5. **Existing apps mahal** - OCR and features behind paywall

### Solution
DuitLater provides:
- **Item-level splitting** - Tag specific items to specific people
- **Free OCR scanning** - Scan receipts, auto-detect items
- **Clear balance tracking** - Always know who owes what
- **Zero fees** - Completely free, forever
- **Zero friction UX** - Minimal steps from scan to settlement

### Success Metrics
- **User Adoption**: 50 active users within first month
- **Engagement**: Average 5+ bills per user per month
- **Accuracy**: 80%+ OCR accuracy on receipts
- **Speed**: < 2 minutes from scan to settlement calculation
- **Satisfaction**: 4.5+ star rating from early users

---

## 🎯 Target Users

### Primary Personas

**1. "Social Izzul" - The Friend Group Organizer**
- Age: 25-35
- Frequency: Splits bills 10-15 times/month
- Context: Dinner with childhood friends, weekly hangouts
- Pain: Constantly tracking who paid for what, sending payment reminders
- Goal: Effortless tracking, clear settlement view

**2. "Office Alan" - The Work Colleague**
- Age: 28-40
- Frequency: Splits bills 8-12 times/month
- Context: Team lunches, coffee runs, office celebrations
- Pain: Mixing personal and work expenses, awkward payment requests
- Goal: Professional tracking, quick settlements with coworkers

**3. "Budget Najmi" - The Careful Spender**
- Age: 23-30
- Frequency: Splits bills 5-8 times/month
- Context: Occasional dining out, grocery runs with roommates
- Pain: Wants accurate tracking, only pays for what was ordered
- Goal: Fair splitting, expense tracking, transparency

### User Segments
- **Primary**: Young professionals (25-35) who frequently dine out
- **Secondary**: College students, roommates, travel groups
- **Geography**: Urban areas with high restaurant density
- **Tech Savviness**: Comfortable with mobile apps and PWAs

---

## 🚀 Product Goals

### MVP Goals (Phase 1)
1. ✅ **User Authentication** - Secure sign up/login
2. ✅ **Friends Management** - Add and manage friends
3. ✅ **Manual Bill Entry** - Create bills with items
4. ✅ **Item Tagging** - Assign items to specific people
5. ✅ **Settlement Calculation** - Automatic "who owes what"
6. ✅ **Balance Tracking** - Dashboard with clear balance summary
7. ✅ **Mark as Paid** - Update settlement status

### Phase 2 Goals
1. **OCR Scanning** - Scan receipts, auto-detect items
2. **Receipt Parsing** - Extract merchant, items, prices
3. **Manual Correction** - Edit OCR results
4. **Receipt Storage** - Save receipt images for reference

### Phase 3 Goals
1. **Push Notifications** - New bill alerts
2. **Smart Netting** - Optimize payment paths
3. **Groups** - Quick access to frequent groups
4. **Payment Links** - Direct links to Venmo/PayNow

### Future Considerations
- Recurring bills (subscriptions)
- Multiple currencies
- Expense analytics
- CSV export
- API for third-party integrations

---

## 💡 Core Features

### 1. User Authentication
**Priority:** P0 (Must Have)

**Requirements:**
- Email/password signup with email verification
- Secure login with session management
- Profile creation with name, email, avatar
- Password reset functionality
- OAuth (Google, Apple) - Future

**Success Criteria:**
- < 30 seconds to create account
- Email verification within 5 minutes
- Zero auth-related errors in production

---

### 2. Friends Management
**Priority:** P0 (Must Have)

**Requirements:**
- Search users by email
- Send friend requests
- Accept/reject friend requests
- View friends list
- Remove friends

**User Flow:**
```
1. User taps "Add Friend" icon
2. Enters friend's email
3. Friend request sent
4. Friend accepts request
5. Both can now split bills together
```

**Success Criteria:**
- < 10 seconds to add a friend
- 100% friend request delivery rate
- Clear pending requests view

---

### 3. Bill Creation (Manual Entry)
**Priority:** P0 (Must Have)

**Requirements:**
- Enter bill title (e.g., "McDonald's Lunch")
- Optional description
- Select bill date
- Add multiple items dynamically
- Each item: name, price, quantity
- Tag items to specific friends
- Add service charge (split equally)
- Add tax (split equally)
- Select who paid upfront
- Calculate total automatically
- Preview before submitting

**User Flow:**
```
1. Tap giant + button
2. Choose "Enter Manually"
3. Enter bill title & date
4. Add items one by one
5. For each item, tap friends to tag
6. Add service charge/tax
7. Select who paid
8. Review & Submit
```

**Validation Rules:**
- Title: Required, max 100 chars
- Items: Min 1 item required
- Price: Must be positive number
- Tagged people: Min 1 person per item
- Paid by: Required selection

**Success Criteria:**
- < 2 minutes to create a bill with 5 items
- 95%+ data accuracy
- Zero calculation errors

---

### 4. Bill Creation (OCR Scanning)
**Priority:** P1 (Should Have - Phase 2)

**Requirements:**
- Camera capture or upload image
- Run OCR on receipt image
- Extract merchant name
- Detect line items with prices
- Identify subtotal, tax, service charge
- Calculate confidence score
- Allow manual correction
- Save receipt image

**OCR Parsing Rules:**
- Item pattern: Text followed by price (e.g., "Big Mac 5.50")
- Price pattern: Decimal number with 2 decimals
- Tax keywords: "tax", "gst", "vat"
- Service keywords: "service", "tip", "gratuity"
- Total keywords: "total", "amount", "subtotal"

**Fallback Strategy:**
1. Try Tesseract.js (client-side, free)
2. If confidence < 80%, suggest manual entry
3. Optional: Fallback to Mindee API (paid)

**Success Criteria:**
- 80%+ OCR accuracy on standard receipts
- < 10 seconds processing time
- Clear error messages for failed scans

---

### 5. Settlement Calculation
**Priority:** P0 (Must Have)

**Algorithm:**
```
Step 1: Calculate each person's item total
  For each item:
    sharePerPerson = item.price / item.shared_by.length
    Add to each person's subtotal

Step 2: Add extras (service charge + tax)
  extraPerPerson = (serviceCharge + tax) / participants.length
  Add to each person's subtotal

Step 3: Create settlements
  For each participant (except payer):
    Create settlement: participant owes payer their subtotal
```

**Edge Cases:**
- Rounding: Always round to 2 decimals
- Unequal splits: Support manual percentage adjustment (future)
- Payer is also participant: Don't create self-settlement
- Zero amount items: Skip

**Success Criteria:**
- 100% calculation accuracy
- Totals always match bill amount
- < 1 second calculation time

---

### 6. Dashboard & Balance Tracking
**Priority:** P0 (Must Have)

**Requirements:**
- Show total amount owed
- Show total amount owed to user
- Calculate net balance
- List recent bills (last 10)
- List pending settlements
- Quick access to bill details
- Mark settlement as paid

**Layout:**
```
Header: App name + Friends icon + Logout
Balance Card:
  - You owe: $XX (red)
  - Owed to you: $XX (green)
  - Net: $XX (green if positive, red if negative)
Recent Bills:
  - Bill title, payer, date, total
Pending Settlements:
  - Who owes whom, amount, bill name
FAB: Giant + button (bottom right)
```

**Success Criteria:**
- Dashboard loads in < 2 seconds
- Real-time balance updates
- Clear visual hierarchy

---

### 7. Push Notifications
**Priority:** P2 (Nice to Have - Phase 3)

**Triggers:**
- New bill created (you're a participant)
- Friend request received
- Settlement marked as paid
- Payment reminder (optional)

**Platforms:**
- Android: Full push support via OneSignal
- Desktop: Full push support
- iOS: Limited PWA support (fallback to email)

**Success Criteria:**
- < 5 second notification delivery
- 80%+ notification open rate
- Zero spam complaints

---

## 🎨 User Experience

### Design Principles
1. **Zero Friction** - Minimize steps to complete any task
2. **Mobile First** - Optimized for one-handed phone use
3. **Instant Feedback** - Real-time updates, no waiting
4. **Trust & Transparency** - Show all calculations clearly
5. **Familiar Patterns** - Use standard mobile UI patterns

### Key UX Decisions

**Giant + Button (FAB)**
- Always visible, bottom right
- Primary action: Create new bill
- 60x60px, green, shadow

**Item Tagging Interface**
- Show friends as chips with avatars
- Tap to toggle selection
- Visual feedback (selected = filled background)
- Allow multi-select

**Balance Display**
- Use color coding: Red (owe), Green (owed)
- Show net balance prominently
- Grid layout for easy scanning

**Forms**
- Inline validation with immediate feedback
- Clear error messages
- Auto-save drafts to prevent data loss

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Minimum touch target: 44x44px

---

## 🔐 Security & Privacy

### Authentication
- Supabase Auth with JWT tokens
- Password minimum: 6 characters
- Email verification required
- Session timeout: 30 days

### Authorization
- Row Level Security (RLS) on all tables
- Users can only see their own data
- Friends-only access to bills
- No public bill sharing (MVP)

### Data Privacy
- No data selling or tracking
- No third-party analytics (MVP)
- Receipt images stored securely
- GDPR compliant (future)
- User can delete all data

### Security Best Practices
- HTTPS only
- SQL injection prevention (Supabase handles)
- XSS prevention (React handles)
- CSRF protection
- Rate limiting on auth endpoints

---

## 📱 Technical Architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **UI**: Lucide Icons, Sonner (toasts)
- **PWA**: next-pwa

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime
- **Edge Functions**: Supabase Edge Functions (future)

### Third-Party Services
- **Push**: OneSignal (free tier)
- **OCR**: Tesseract.js (client-side)
- **OCR Fallback**: Mindee API (optional)

### Deployment
- **Hosting**: Vercel (free tier)
- **Domain**: Custom domain (future)
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

---

## 📊 Data Models

See `supabase/schema.sql` for complete schema.

**Key Tables:**
- `profiles` - User information
- `friendships` - User connections
- `bills` - Bill metadata
- `bill_items` - Individual items
- `item_shares` - Who shares each item
- `settlements` - Who owes whom
- `bill_participants` - Who's in each bill

**Key Relationships:**
- User has many Friends (many-to-many)
- Bill has many Items (one-to-many)
- Item has many Users sharing it (many-to-many)
- Bill generates many Settlements (one-to-many)

---

## 🧪 Testing Strategy

### Unit Tests
- Form validation (Zod schemas)
- Settlement calculation logic
- OCR parsing functions
- Utility functions

### Integration Tests
- Auth flow (signup, login, logout)
- Bill creation end-to-end
- Settlement calculation
- Database queries

### Manual Testing Checklist
- [ ] Create account
- [ ] Add 2-3 friends
- [ ] Create manual bill
- [ ] Tag items to friends
- [ ] Verify calculations
- [ ] Mark as paid
- [ ] Check balance updates
- [ ] Test on multiple devices
- [ ] Test offline functionality (PWA)

### User Acceptance Testing
- 5-10 beta testers
- Real-world scenarios
- Feedback forms
- Bug reporting

---

## 🚦 Launch Plan

### Pre-Launch (2 weeks)
- [ ] Complete MVP features
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Create onboarding guide
- [ ] Prepare support docs

### Soft Launch (Week 1)
- [ ] Invite 10 close friends
- [ ] Daily feedback sessions
- [ ] Fix critical bugs
- [ ] Monitor performance

### Beta Launch (Week 2-4)
- [ ] Expand to 50 users
- [ ] Weekly feedback reviews
- [ ] Iterate on UX
- [ ] Add OCR scanning

### Public Launch (Week 5+)
- [ ] Social media announcement
- [ ] Product Hunt launch
- [ ] Open to public
- [ ] Scale infrastructure

---

## 📈 Success Metrics

### Engagement Metrics
- Daily Active Users (DAU)
- Bills created per user per month
- Average settlement time
- Friend invites sent
- App retention (D1, D7, D30)

### Performance Metrics
- Page load time < 2s
- OCR accuracy > 80%
- Bill creation time < 2 min
- Zero calculation errors
- 99.9% uptime

### User Satisfaction
- App store rating > 4.5
- NPS score > 50
- Support ticket volume < 5/week
- Bug report rate < 1%

---

## 🎯 Non-Goals (Out of Scope)

### MVP Non-Goals
- ❌ In-app payments (use external apps)
- ❌ Currency conversion
- ❌ Expense analytics
- ❌ Bill splitting for strangers
- ❌ Business expense tracking
- ❌ Integration with banking apps

### Future Non-Goals
- ❌ Becoming a payment processor
- ❌ B2B enterprise features
- ❌ White-label solutions
- ❌ Cryptocurrency payments

---

## 💰 Business Model

### Revenue Strategy
**Phase 1-2**: $0 revenue (MVP focus)
- Build user base
- Prove product-market fit
- Gather feedback
- Iterate quickly

**Phase 3+**: Optional monetization
- Premium features (analytics, advanced groups)
- Tips/donations from users
- Affiliate links for payment apps
- **Never**: Ads, data selling, paywalling core features

### Cost Structure
- Infrastructure: $0/month (free tiers)
- Domain: $12/year
- Total: ~$1/month

---

## 📚 Resources

### Documentation
- `README.md` - Overview
- `SETUP.md` - Setup guide
- `IMPLEMENTATION.md` - Development guide
- `PROJECT_SUMMARY.md` - Project summary
- This PRD - Product requirements

### External Links
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- OneSignal Docs: https://documentation.onesignal.com
- Tesseract.js Docs: https://tesseract.projectnaptha.com

---

## 🔄 Changelog

### Version 1.0 (November 2025)
- Initial PRD
- Defined MVP scope
- Technical architecture
- Launch plan

---

**Questions or Feedback?**
Contact: [Your Email/Contact]

**Last Updated:** November 6, 2025
