# DuitLater - Complete Phase Plan
**Vibecoding Method: Small Chunks, Iterative, Thorough Testing**

---

## 🎨 Design Philosophy

### Core Principles
- **Clean & Minimalist** - Apple-like aesthetic
- **Light Theme Default** - Professional, approachable
- **No Gimmicks** - No glassmorphism, no mint green
- **Smooth Animations** - Motion.dev for buttery interactions
- **Shadcn/ui** - Consistent, accessible components
- **Malaysian Context** - Local language touches where appropriate

### Visual References
- Yukee app (task management aesthetics)
- Apple Human Interface Guidelines
- Shadcn/ui documentation examples

---

## 📋 Phase Breakdown

### **Phase 0: Foundation Fix & Sync**
*Goal: Clean slate, secure base, working local environment*

#### Tasks:
1. **Local Environment**
   - ✅ Pull latest from main branch
   - ✅ Run npm install
   - ✅ Test dev server startup
   - ✅ Verify environment variables

2. **Supabase Security**
   - Fix all 21 security/performance issues
   - Implement proper RLS policies for all 7 tables
   - Review and optimize database indexes
   - Set up proper authentication flows

3. **Code Audit**
   - Run Claude Code investigation
   - Document current features vs broken features
   - Create technical debt backlog
   - Identify quick wins

4. **Git Hygiene**
   - Protect main branch
   - Create development branch
   - Set up proper commit conventions
   - Clear old/dead branches

**Definition of Done:**
- Local dev runs without errors
- All Supabase security issues resolved
- Complete project status report generated
- Clean git workflow established

---

### **Phase 1: Core Flow - Bill Splitting**
*Goal: One complete, working bill splitting flow*

#### User Story:
"As a user, I can create a bill, add the total amount, split it with friends, and track who owes what."

#### Features:
1. **Create Bill**
   - Form: Bill name, total amount, date
   - Clean, minimal form design
   - Instant validation feedback
   - Smooth form animations

2. **Add Participants**
   - List of friends (if available)
   - Manual name entry (for non-users)
   - Quick "add me" button
   - Clean participant chips/tags

3. **Split Logic**
   - Equal split (default)
   - Custom amounts per person
   - Percentage-based split
   - Real-time calculation display

4. **Bill Summary**
   - Clear breakdown of who owes what
   - Copy-friendly format
   - Share capability
   - Settlement status

**UI Components Needed:**
- Form inputs (shadcn/ui)
- Button variants
- Cards for bill display
- Bottom sheets for actions
- Toast notifications

**Testing:**
- Create bill with 2 people
- Create bill with 5 people
- Test equal split
- Test custom amounts
- Verify calculations
- Test edge cases (0 amount, decimal places)

**Definition of Done:**
- User can create a complete bill flow
- All calculations are accurate
- UI is clean and Apple-like
- Animations are smooth (Motion.dev)
- Works on mobile viewport
- No console errors

---

### **Phase 2: Friends System**
*Goal: Robust friend connection and management*

#### Sub-Phase 2.1: User Discovery
**Features:**
1. **Username System**
   - Unique username on signup (@izzul format)
   - Username search functionality
   - Profile preview before adding
   
2. **Search Interface**
   - Clean search bar
   - Instant results
   - User avatar + username + name
   - "Add Friend" action button

#### Sub-Phase 2.2: QR Code Connection
**Features:**
1. **QR Code Generation**
   - Generate personal QR code
   - Display in profile
   - Include: user_id, username, name
   
2. **QR Scanner**
   - Camera permission flow
   - Scan interface (clean viewfinder)
   - Auto-detect and confirm
   - Success animation

#### Sub-Phase 2.3: Friends Management
**Features:**
1. **Friends List Page**
   - Alphabetical sorting
   - Search within friends
   - Quick stats (owes/owed)
   - Friend actions (view profile, remove)

2. **Friend Detail View**
   - Shared bill history
   - Total owed/owing
   - Quick settle up button
   - Settlement history

3. **Smart Organization**
   - Categories: "Owes Me", "I Owe", "Settled"
   - Sort by: amount, recent activity, name
   - Filter options
   - Clean section headers

**Database Schema:**
```
friends table:
- id (uuid)
- user_id (uuid) -> auth.users
- friend_id (uuid) -> auth.users
- status (enum: pending, accepted, blocked)
- created_at (timestamp)
- updated_at (timestamp)

friend_stats view:
- Calculate total owed/owing per friend
- Recent activity timestamp
```

**Testing:**
- Add friend via search
- Add friend via QR
- View friend list
- Check friend stats accuracy
- Remove friend
- Block user

**Definition of Done:**
- Users can connect via search and QR
- Friends list is clean and organized
- Stats are accurate
- All friend actions work smoothly

---

### **Phase 3: UI Overhaul - Apple-like Redesign**
*Goal: Transform entire app into clean, minimalist aesthetic*

#### Design System Setup
1. **Color Palette**
   ```
   Primary: Clean blues/grays (not mint green!)
   Background: White (#FFFFFF)
   Surface: Light gray (#F5F5F7)
   Text: Dark gray (#1D1D1F)
   Accent: iOS blue (#007AFF)
   Destructive: iOS red (#FF3B30)
   Success: iOS green (#34C759)
   ```

2. **Typography**
   - System font stack (SF Pro on iOS, Inter/Geist fallback)
   - Consistent text scales
   - Proper hierarchy
   - Readable line heights

3. **Spacing System**
   - 4px base unit
   - Consistent padding/margins
   - Generous whitespace
   - Proper touch targets (44px minimum)

4. **Component Library**
   - All shadcn/ui components customized
   - Remove any glassmorphism
   - Clean shadows (subtle, Apple-like)
   - Smooth border-radius (8px/12px/16px)

#### Animation Library
1. **Motion.dev Setup**
   - Install and configure
   - Create animation presets
   - Page transitions
   - Micro-interactions

2. **Animation Patterns**
   - Fade in/out for modals
   - Slide for page transitions
   - Scale for button presses
   - Smooth list animations
   - Pull-to-refresh
   - Skeleton loaders

#### Pages to Redesign
- [ ] Landing/Onboarding
- [ ] Home/Dashboard
- [ ] Create Bill
- [ ] Bill Detail
- [ ] Friends List
- [ ] Friend Detail
- [ ] Profile/Settings
- [ ] History/Activity

**Testing:**
- Visual regression testing
- Animation performance (60fps)
- Responsive on all screen sizes
- Dark mode toggle (optional)
- Accessibility (contrast, focus states)

**Definition of Done:**
- Every screen matches Apple-like aesthetic
- All animations are smooth and fast
- No visual glitches
- Passes accessibility checks
- Users say "wow, this looks professional"

---

### **Phase 4: PWA Polish - Native-like Experience**
*Goal: Make it feel like a real native app*

#### PWA Essentials
1. **Manifest Configuration**
   - Proper app name and description
   - High-quality icons (multiple sizes)
   - Theme colors
   - Display mode: standalone
   - Start URL optimization

2. **Service Worker**
   - Offline-first strategy
   - Cache static assets
   - Background sync for bills
   - Smart cache invalidation

3. **Install Experience**
   - Install prompt (iOS/Android)
   - Custom install UI
   - Onboarding after install
   - App shortcuts

#### Native-like Features
1. **Haptic Feedback**
   - Button presses
   - Success/error actions
   - Pull-to-refresh
   - Swipe gestures

2. **Gestures**
   - Swipe to delete
   - Pull to refresh
   - Swipe between tabs
   - Long press actions

3. **Notifications**
   - Push notification setup
   - Permission flow
   - Notification types:
     - Friend request
     - Bill created (you're included)
     - Payment received
     - Reminder (outstanding balance)

4. **Performance**
   - Optimize bundle size
   - Image optimization
   - Lazy loading
   - Route prefetching
   - Fast refresh

**Testing:**
- Install on iOS device
- Install on Android device
- Test offline mode
- Test notifications
- Performance audit (Lighthouse)
- Battery usage monitoring

**Definition of Done:**
- Lighthouse score: 90+ on all metrics
- Installable on iOS and Android
- Works offline (gracefully)
- Notifications work
- Feels like native app

---

### **Phase 5: Beta Launch - Production Ready**
*Goal: Real users, real feedback, real iteration*

#### Pre-Launch Checklist
1. **Security Audit**
   - [ ] All RLS policies tested
   - [ ] No exposed API keys
   - [ ] Rate limiting implemented
   - [ ] Input validation everywhere
   - [ ] XSS prevention
   - [ ] CSRF protection

2. **Performance Check**
   - [ ] Fast initial load (<2s)
   - [ ] Smooth animations (60fps)
   - [ ] Efficient database queries
   - [ ] Optimized images
   - [ ] Proper caching

3. **Error Handling**
   - [ ] Graceful error messages
   - [ ] Error logging (Sentry?)
   - [ ] Offline error states
   - [ ] Network error recovery
   - [ ] Form validation errors

4. **Content**
   - [ ] Privacy policy
   - [ ] Terms of service
   - [ ] Onboarding guide
   - [ ] Help/FAQ section
   - [ ] Contact/feedback form

#### Beta Testing
1. **Invite Friends/Family**
   - 10-20 initial testers
   - Mix of tech-savvy and non-technical
   - Malaysian users preferred
   - Document feedback channel

2. **Feedback Collection**
   - In-app feedback form
   - Bug reporting mechanism
   - Feature request voting
   - Usage analytics (privacy-respecting)

3. **Iteration Cycle**
   - Week 1: Fix critical bugs
   - Week 2: Polish rough edges
   - Week 3: Add most-requested features
   - Week 4: Final prep for public launch

#### Launch Day
1. **Soft Launch**
   - Announce on personal social media
   - Share in Malaysian tech communities
   - Product Hunt (optional)
   - Reddit r/sideproject

2. **Monitoring**
   - Error rates
   - Performance metrics
   - User signups
   - Active usage
   - Feedback sentiment

**Definition of Done:**
- 50+ active beta users
- <5% error rate
- Positive feedback majority
- No critical bugs
- Ready for public use

---

## 🎯 Success Metrics

### Phase 0
- ✅ Zero security issues in Supabase
- ✅ Dev environment runs smoothly

### Phase 1
- ✅ 10 test bills created successfully
- ✅ All calculations are accurate

### Phase 2
- ✅ 20+ friend connections made
- ✅ QR scanning works reliably

### Phase 3
- ✅ "Looks professional" feedback from testers
- ✅ 90+ Lighthouse performance score

### Phase 4
- ✅ Works offline
- ✅ Installable as PWA

### Phase 5
- ✅ 50+ active users
- ✅ Positive feedback
- ✅ <1% crash rate

---

## 🚀 Quick Wins (Immediate Morale Boosters)

1. **Fix Supabase security warnings** - Feel secure
2. **Update app icon** - Visual refresh
3. **Add loading animations** - Feel polished
4. **Improve error messages** - Better UX
5. **Add haptic feedback** - Native feel

---

## 📝 Development Workflow

### Git Branch Strategy
```
main (production)
├── development (staging)
    ├── feature/bill-creation
    ├── feature/friends-system
    ├── feature/ui-overhaul
    └── fix/supabase-security
```

### Commit Convention
```
feat: add QR code scanner for friends
fix: calculation error in split logic
ui: redesign bill detail page
perf: optimize friend list query
docs: update README with setup instructions
```

### Testing Before Merge
- [ ] Runs locally without errors
- [ ] Manual testing of feature
- [ ] No console errors/warnings
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation)

---

## 🎨 Design Resources

### Motion.dev Examples
- https://motion.dev/docs/react/quick-start
- https://motion.dev/docs/react/animate
- https://motion.dev/docs/react/animate-presence

### Shadcn/ui Components
- https://ui.shadcn.com/docs/components/button
- https://ui.shadcn.com/docs/components/card
- https://ui.shadcn.com/docs/components/form
- https://ui.shadcn.com/docs/components/sheet

### Inspiration
- Yukee app (clean, minimal task management)
- Apple Notes (typography, spacing)
- Things 3 (smooth animations)
- Splitwise (bill splitting UX patterns)

---

## 🏁 Ready to Start?

**Next Immediate Steps:**
1. Run `bash sync-and-check.sh` to sync your local
2. Give INVESTIGATION_PROMPT.md to Claude Code
3. Review the investigation report together
4. Start Phase 0 tasks based on findings

Let's build something beautiful! 🚀
