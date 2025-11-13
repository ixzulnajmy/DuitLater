# 🚀 DuitLater Development Quick Reference

## 📋 Your Complete Toolkit

**5 Documents Created:**
1. ✅ README.md - Start here!
2. ✅ sync-and-check.sh - Sync your local
3. ✅ CLAUDE_CODE_INVESTIGATION_CHECKLIST.md - Full investigation
4. ✅ DUITLATER_PHASE_PLAN.md - Complete roadmap
5. ✅ DESIGN_REFERENCE.md - Design patterns from Yukee

---

## ⚡ Quick Commands

### Sync Local Environment
```bash
cd /path/to/duitlater
bash sync-and-check.sh
```

### Start Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Run Linting
```bash
npm run lint
```

### Check TypeScript
```bash
npx tsc --noEmit
```

---

## 🎯 Git Workflow

### Create Feature Branch
```bash
git checkout -b feature/bill-creation
# or
git checkout -b fix/supabase-security
```

### Commit Convention
```bash
# Features
git commit -m "feat: add QR code scanner for friends"

# Fixes
git commit -m "fix: calculation error in split logic"

# UI changes
git commit -m "ui: redesign bill detail page"

# Performance
git commit -m "perf: optimize friend list query"

# Documentation
git commit -m "docs: update README with setup instructions"
```

### Push & Deploy
```bash
# Push feature branch
git push origin feature/bill-creation

# Create PR on GitHub
# Review → Merge to main → Auto-deploys to Vercel
```

---

## 🎨 Design Quick Reference

### Color Variables (Tailwind)
```tsx
// Text
text-gray-900      // Primary text
text-gray-600      // Secondary text
text-gray-500      // Metadata

// Backgrounds
bg-white           // Main background
bg-gray-50         // Surface
bg-gray-100        // Subtle background

// Accent
bg-blue-500        // Primary actions (iOS blue)
text-blue-500      // Links

// Status
bg-orange-500      // Pending
bg-green-500       // Success/Settled
bg-red-500         // Error/Overdue
```

### Common Components
```tsx
// Button
<button className="w-full py-4 bg-black text-white rounded-full font-semibold">
  Continue
</button>

// Card
<div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
  {/* Content */}
</div>

// Input
<input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500" />

// Empty State
<div className="flex flex-col items-center justify-center py-12">
  <div className="w-16 h-16 rounded-full bg-gray-100 mb-4">
    <Icon />
  </div>
  <p className="text-lg font-medium text-gray-900">No bills yet</p>
  <p className="text-sm text-gray-600 mb-6">Create your first bill</p>
  <Button>Create Bill</Button>
</div>
```

---

## 🔧 Supabase Quick Commands

### Run Migrations
```bash
npx supabase migration list
npx supabase migration up
```

### Generate Types
```bash
npx supabase gen types typescript --local > types/database.ts
```

### Check RLS Policies
```sql
-- In Supabase SQL Editor
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public';
```

---

## 🧪 Testing Checklist (Before Each PR)

```bash
# 1. No TypeScript errors
npx tsc --noEmit

# 2. No lint errors
npm run lint

# 3. Build succeeds
npm run build

# 4. Manual testing
npm run dev
# → Test the feature you built
# → Test on mobile viewport (DevTools)
# → Check console for errors

# 5. Git status clean
git status

# 6. Commit & push
git add .
git commit -m "feat: your feature"
git push origin your-branch
```

---

## 📱 Mobile Testing

### Browser DevTools
```
Chrome DevTools:
Cmd/Ctrl + Shift + M → Toggle device toolbar
Test on: iPhone 14 Pro, Samsung Galaxy S21
```

### Test PWA Install
```
1. Run: npm run dev
2. Open: http://localhost:3000 on your phone (same network)
3. Tap: Share → Add to Home Screen
4. Test: Offline mode, notifications
```

---

## 🐛 Common Issues & Fixes

### Issue: Supabase Connection Error
```bash
# Check environment variables
cat .env.local

# Should have:
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### Issue: Build Fails
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Issue: TypeScript Errors
```bash
# Regenerate Supabase types
npx supabase gen types typescript --project-id your-project-id > types/database.ts

# Check tsconfig.json is correct
```

### Issue: Animations Laggy
```tsx
// Use CSS transforms (GPU-accelerated)
// ✅ Good
transform: translateX(100px)
transform: scale(0.95)

// ❌ Avoid
left: 100px
width: 50%
```

---

## 🎭 Motion.dev Patterns

### Page Transition
```tsx
import { Motion } from "motion/react"

<Motion
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</Motion>
```

### Button Press
```tsx
<Motion whileTap={{ scale: 0.95 }}>
  <button>Click me</button>
</Motion>
```

### List Animation
```tsx
{items.map((item, i) => (
  <Motion
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
  >
    {item}
  </Motion>
))}
```

---

## 📊 Phase Progress Tracking

### Phase 0: Foundation Fix
- [ ] Sync local environment
- [ ] Run Claude Code investigation
- [ ] Fix Supabase security issues
- [ ] Remove mint green colors
- [ ] Remove glassmorphism
- [ ] Set up git workflow

### Phase 1: Core Flow
- [ ] Bill creation form
- [ ] Add participants
- [ ] Split calculation
- [ ] Bill summary page

### Phase 2: Friends System
- [ ] Username search
- [ ] QR code scanner
- [ ] Friends list
- [ ] Friend stats

### Phase 3: UI Overhaul
- [ ] Update design tokens
- [ ] Redesign all pages
- [ ] Add Motion.dev animations
- [ ] Test on mobile

### Phase 4: PWA Polish
- [ ] PWA manifest
- [ ] Service worker
- [ ] Install prompt
- [ ] Offline mode

### Phase 5: Beta Launch
- [ ] Security audit
- [ ] Performance check
- [ ] Invite beta testers
- [ ] Collect feedback

---

## 🎯 Daily Development Workflow

**Morning:**
1. ☕ Coffee + Review yesterday's progress
2. 📋 Check Phase plan - what's today's goal?
3. 🔄 Pull latest: `git pull origin main`
4. 🌿 Create branch: `git checkout -b feature/today-feature`

**During Development:**
1. 💻 Code in small chunks
2. 🧪 Test frequently (npm run dev)
3. 💾 Commit often (meaningful messages)
4. 🎨 Compare with design reference

**Evening:**
1. ✅ Run testing checklist
2. 📤 Push branch: `git push origin feature/today-feature`
3. 🔍 Review your work (GitHub preview deployment)
4. 📝 Note tomorrow's priorities

---

## 🆘 When You're Stuck

**Questions about code:**
→ Come back to Claude with specific question

**Design decisions:**
→ Check DESIGN_REFERENCE.md
→ Look at Yukee screenshots
→ "What would Apple do?"

**Supabase issues:**
→ Check docs: https://supabase.com/docs
→ Review RLS policies
→ Test with SQL editor

**Performance issues:**
→ Check bundle size
→ Use React DevTools Profiler
→ Optimize animations to 60fps

---

## 🎉 Celebrate Small Wins!

- ✅ Fixed a bug? Nice!
- ✅ Completed a feature? Awesome!
- ✅ Clean design implemented? Beautiful!
- ✅ Passed all tests? You're killing it!

**Remember:** Small chunks, iterative progress, thorough testing. That's the Ryo way! 🚀

---

## 📞 Need Help?

Come back to Claude with:
- Specific error messages
- Code snippets (what you tried)
- What you expected vs what happened
- Screenshots (if UI related)

I'm here to help you ship DuitLater! 💪

---

**Pro Tip:** Bookmark this file - you'll reference it daily! 📌
