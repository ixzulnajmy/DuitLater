# Claude Code Investigation Checklist

## How to Use This
Copy this entire file and use it as your prompt when working with Claude Code in VS Code.

---

## Investigation Task

Hi Claude Code! I need you to thoroughly investigate the DuitLater project and provide a comprehensive status report.

### Context
- **Project**: DuitLater - Bill splitting PWA for Malaysian dining culture
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Supabase, Shadcn/ui
- **Status**: Currently deployed but needs comprehensive review and rebuild
- **Goal**: Prepare for production-ready relaunch with clean, Apple-like design

### Your Mission
Analyze the entire codebase and provide a detailed report that will guide the rebuild strategy.

---

## Step-by-Step Investigation

### 1️⃣ Project Overview (5 mins)
```bash
# Commands to run:
npm list --depth=0
ls -la
cat package.json | jq '.dependencies'
cat package.json | jq '.scripts'
```

**Document:**
- Next.js version
- All major dependencies
- Available npm scripts
- Project structure at root level

---

### 2️⃣ Database Schema Review (10 mins)
**Look for:**
- `supabase/` directory or related files
- Database types file (usually `types/database.ts` or `lib/database.types.ts`)
- Migration files
- Seed files

**Analyze:**
1. List all 7 tables and their purpose
2. Identify relationships between tables
3. Check for RLS policies (Row Level Security)
4. Note any missing indexes
5. Identify security vulnerabilities

**Create a diagram:**
```
users
├── bills (creator_id)
├── friends (user_id, friend_id)
└── ...
```

---

### 3️⃣ Routing & Pages Inventory (10 mins)
**Explore:**
- `app/` directory structure (Next.js 15 App Router)
- All route files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- API routes in `app/api/`

**Document each route:**
```
Route: /dashboard
File: app/dashboard/page.tsx
Purpose: Main user dashboard
Status: ✅ Complete / ⚠️ Incomplete / ❌ Broken
Missing: [list what's missing]
```

---

### 4️⃣ Feature Completeness Assessment (15 mins)

#### Authentication
- [ ] Sign up flow
- [ ] Login flow
- [ ] Password reset
- [ ] Social auth (Google, etc.)
- [ ] Session management
- [ ] Protected routes

#### Bill Management
- [ ] Create bill
- [ ] View bill details
- [ ] Edit bill
- [ ] Delete bill
- [ ] List all bills
- [ ] Filter/sort bills

#### Splitting Logic
- [ ] Equal split
- [ ] Custom amounts
- [ ] Percentage-based
- [ ] Item-by-item split
- [ ] Tax/tip handling

#### Friends System
- [ ] Add friend (search)
- [ ] Add friend (QR code)
- [ ] Friend list
- [ ] Friend profile
- [ ] Remove friend
- [ ] Block user

#### Settlements
- [ ] Mark as paid
- [ ] Payment history
- [ ] Settlement reminders
- [ ] Payment methods

#### Profile & Settings
- [ ] View profile
- [ ] Edit profile
- [ ] Upload avatar
- [ ] Settings page
- [ ] Notifications preferences

---

### 5️⃣ UI/UX Component Audit (10 mins)

**Check for:**
1. **Shadcn/ui components** - which ones are installed?
   ```bash
   ls components/ui/
   ```

2. **Custom components** - what's in `components/`?

3. **Current design tokens:**
   - Colors in `tailwind.config.js`
   - Fonts
   - Spacing scale
   - Border radius values

4. **Animation libraries:**
   - Framer Motion?
   - Other animation libs?
   - Motion.dev already integrated?

**Note any:**
- Glassmorphism usage (needs to be removed)
- Mint green (#10B981) usage (needs to be removed)
- Inconsistent styling
- Missing loading states
- Poor error handling UI

---

### 6️⃣ State Management Review (5 mins)

**Look for:**
- `store/` or `stores/` directory
- Context providers
- Zustand stores
- React Query/TanStack Query usage

**Document:**
- What state management is used?
- What global state exists?
- Is state persisted? How?
- Any state management issues?

---

### 7️⃣ Code Quality Assessment (10 mins)

**Check for:**
1. **TypeScript:**
   - Are types properly defined?
   - Any excessive `any` usage?
   - Are there type errors when building?

2. **Error Handling:**
   - Try-catch blocks present?
   - Error boundaries?
   - User-friendly error messages?

3. **Code Organization:**
   - Is code DRY (Don't Repeat Yourself)?
   - Are components reusable?
   - Clear file/folder structure?

4. **Performance:**
   - Unnecessary re-renders?
   - Large bundle sizes?
   - Unoptimized images?

**Run these checks:**
```bash
npm run build  # Check for build errors
npm run lint   # Check linting errors
```

---

### 8️⃣ Security Issues (15 mins)

**Supabase Dashboard showed 21 issues - investigate:**

1. **Check RLS policies:**
   - Are all tables protected?
   - Can users access only their data?
   - Are there any exposed tables?

2. **Environment variables:**
   - Check `.env.example`
   - Are API keys properly secured?
   - Are there any hardcoded secrets?

3. **Authentication:**
   - Is auth properly implemented?
   - Session management secure?
   - Password requirements?

4. **Input validation:**
   - Are forms validated?
   - SQL injection prevention?
   - XSS prevention?

**Document each security issue:**
```
Issue #1: Users table has no RLS policy
Severity: 🔴 Critical
Impact: Any user can read all users' data
Fix: Add RLS policy for user isolation
```

---

### 9️⃣ Missing Features vs MVP Requirements (5 mins)

**Compare what exists vs what's needed for MVP:**

Must-Have Features:
- [ ] User can create account
- [ ] User can create a bill
- [ ] User can split bill equally
- [ ] User can add friends
- [ ] User can view bills owed/owing
- [ ] User can mark bills as settled

Nice-to-Have Features:
- [ ] QR code friend adding
- [ ] Custom split amounts
- [ ] Bill history
- [ ] Notifications
- [ ] Receipt scanning

---

### 🔟 Technical Debt & Blockers (5 mins)

**Identify:**
1. **Broken Features:**
   - What doesn't work at all?
   - What throws errors?

2. **Incomplete Features:**
   - What's half-built?
   - Any commented-out code?
   - Any TODO comments?

3. **Blockers:**
   - What prevents moving forward?
   - Dependencies issues?
   - Configuration problems?

---

## Output Format

Please provide your findings in this structure:

### Executive Summary (1 page max)
```
🟢 Health Score: X/10
📊 Completeness: XX%
🚨 Critical Issues: X
⚠️ Warnings: X

Top 3 Priorities:
1. [Most critical issue]
2. [Second priority]
3. [Third priority]

Overall Assessment:
[2-3 paragraphs summarizing the project state]
```

### Detailed Findings
For each section above (1-10), provide:
- ✅ What's working
- ⚠️ What needs work
- ❌ What's broken
- 💡 Recommendations

### File-by-File Issues
List specific files that need attention:
```
📁 app/dashboard/page.tsx
└── Issue: Missing error boundary
└── Fix: Add error.tsx
└── Priority: Medium

📁 lib/supabase/queries.ts
└── Issue: No input validation
└── Fix: Add Zod schemas
└── Priority: High
```

### Quick Wins (Top 5)
1. [Easy fix with high impact]
2. [Easy fix with high impact]
3. ...

### Phase 0 Action Items
Based on findings, list specific tasks for Phase 0:
- [ ] Fix Supabase security issue #1
- [ ] Remove mint green colors
- [ ] Add error handling to bill creation
- ...

---

## Additional Commands You Can Run

```bash
# Check bundle size
npm run build && du -sh .next/

# Find TODOs in code
grep -r "TODO" --include="*.ts" --include="*.tsx" .

# Find mint green color usage
grep -r "#10B981" --include="*.ts" --include="*.tsx" .
grep -r "bg-emerald" --include="*.ts" --include="*.tsx" .

# Check for glassmorphism
grep -r "backdrop-blur" --include="*.ts" --include="*.tsx" .

# List all installed shadcn components
ls components/ui/

# Check TypeScript errors
npx tsc --noEmit

# Check for unused dependencies
npx depcheck
```

---

## Timeline

Please spend approximately:
- **1 hour** on thorough investigation
- **30 minutes** on documentation
- **Total: 1.5 hours** for complete report

---

## Final Deliverable

A markdown file named `PROJECT_STATUS_REPORT.md` with:
1. Executive summary
2. All findings (sections 1-10)
3. File-specific issues
4. Phase 0 action plan
5. Quick wins list

This report will be the foundation for the entire DuitLater rebuild strategy.

---

Ready to investigate? Let's uncover everything! 🔍
