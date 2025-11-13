# 🎨 DuitLater Design Reference

## Visual Inspiration from Yukee App

Based on the Yukee app screenshots you provided, here are the key design patterns to implement in DuitLater:

---

## 🎯 Core Design Principles (From Yukee)

### 1. Clean Onboarding Flow
**What we see in Yukee:**
- Simple, progressive onboarding screens
- One concept per screen
- Minimal text, maximum clarity
- Smooth "Continue" button at bottom
- Back button (top left)
- Clean illustrations/icons

**Apply to DuitLater:**
- Onboarding: "Welcome to DuitLater" → "Create your first bill" → "Add friends" → "Start splitting"
- Each screen focuses on ONE action
- Large, friendly icons (not too colorful)
- Consistent bottom CTA button

---

### 2. Typography & Hierarchy
**Yukee pattern:**
- **Large, bold headlines** (24-32px)
- **Regular body text** (14-16px) in gray
- Generous line-height (1.5-1.6)
- System fonts (clean, readable)

**DuitLater implementation:**
```tsx
// Headline
className="text-2xl font-semibold text-gray-900"

// Body
className="text-base text-gray-600"

// Small text / metadata
className="text-sm text-gray-500"
```

---

### 3. Color Usage
**Yukee approach:**
- **Minimal color** - mostly grayscale
- **Accent colors** for status (orange for today, purple for tomorrow)
- **Black text** on white background (high contrast)
- **Gray for secondary info**

**DuitLater palette:**
```css
/* Primary actions */
--accent-blue: #007AFF (iOS blue)

/* Status colors */
--pending: #FF9500 (orange)
--completed: #34C759 (green)  
--overdue: #FF3B30 (red)

/* Neutrals */
--text-primary: #1D1D1F
--text-secondary: #86868B
--background: #FFFFFF
--surface: #F5F5F7
```

---

### 4. Component Patterns

#### Card Design (Bill items, Friend cards)
**Yukee style:**
- White background
- Subtle shadow (0 1px 3px rgba(0,0,0,0.1))
- Rounded corners (12px)
- Padding (16-20px)
- Clear separation between items

**DuitLater implementation:**
```tsx
<div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
  {/* Content */}
</div>
```

#### Task/Item Lists
**Yukee pattern:**
- Checkbox on left
- Primary text (bold/semibold)
- Secondary text (gray, smaller)
- Clean spacing between items
- Dividers or whitespace separation

**DuitLater bill items:**
```tsx
<div className="space-y-3">
  {bills.map(bill => (
    <div key={bill.id} className="flex items-center gap-3 p-4 bg-white rounded-lg">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {/* Icon or Avatar */}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{bill.name}</p>
        <p className="text-sm text-gray-600">RM {bill.amount}</p>
      </div>
      <span className="text-sm font-medium text-gray-900">
        {bill.status}
      </span>
    </div>
  ))}
</div>
```

---

### 5. Navigation & Actions

#### Bottom Sheet Actions
**Yukee style:**
- Slide up from bottom
- Rounded top corners (16px)
- Handle bar at top (optional)
- Clear title
- Action buttons below

**DuitLater implementation:**
```tsx
// Using shadcn/ui Sheet component
<Sheet>
  <SheetContent side="bottom" className="rounded-t-2xl">
    <SheetHeader>
      <SheetTitle>Split Bill</SheetTitle>
    </SheetHeader>
    {/* Content */}
    <SheetFooter>
      <Button className="w-full">Confirm</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

#### Bottom Navigation (if needed)
**Yukee pattern:**
- 3-5 items max
- Icons + labels
- Clear active state (blue indicator)
- Clean, minimal icons

---

### 6. Empty States
**Yukee approach:**
- "You have no task for today"
- Simple, honest message
- No overwhelming graphics
- Clear next action (+ button)

**DuitLater empty states:**
```tsx
<div className="flex flex-col items-center justify-center py-12">
  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-gray-400" />
  </div>
  <p className="text-lg font-medium text-gray-900 mb-1">
    No bills yet
  </p>
  <p className="text-sm text-gray-600 mb-6">
    Create your first bill to start splitting
  </p>
  <Button>Create Bill</Button>
</div>
```

---

### 7. Form Design
**Yukee patterns:**
- Clean input fields
- Minimal borders (or bottom border only)
- Clear labels
- Toggle switches (iOS style)
- Clean dropdown/pickers

**DuitLater forms:**
```tsx
<div className="space-y-4">
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1.5 block">
      Bill Name
    </label>
    <input 
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      placeholder="Mamak dinner"
    />
  </div>
</div>
```

---

### 8. Button Styles

#### Primary Button (Yukee's black button)
```tsx
<button className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
  Continue →
</button>
```

#### Secondary/Ghost Button
```tsx
<button className="w-full py-4 bg-transparent text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors">
  Skip
</button>
```

---

### 9. Date/Time Display
**Yukee style:**
- Day name + date number
- Clean, readable format
- "Today", "Tomorrow" labels
- Color-coded dots for categories

**DuitLater implementation:**
```tsx
<div className="flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-orange-500" />
  <span className="text-sm font-medium text-gray-900">Today</span>
  <span className="text-sm text-gray-600">Nov 12</span>
</div>
```

---

### 10. Settings/Profile Page
**Yukee approach:**
- Dark background for settings
- Grouped sections
- Toggle switches
- Clear labels + descriptions
- Pro/Premium CTA at top (blue card)

**DuitLater settings:**
```tsx
<div className="bg-gray-50 min-h-screen">
  {/* Profile Header */}
  <div className="bg-white p-6 border-b border-gray-200">
    <div className="flex items-center gap-4">
      <img src={avatar} className="w-16 h-16 rounded-full" />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">@{username}</p>
      </div>
    </div>
  </div>

  {/* Settings Groups */}
  <div className="p-4 space-y-4">
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Notifications
      </h3>
      <div className="space-y-3">
        {/* Toggle items */}
      </div>
    </div>
  </div>
</div>
```

---

## ⚡ Animation Patterns (Motion.dev)

### Page Transitions
```tsx
import { Motion } from "motion/react"

<Motion
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
  {/* Page content */}
</Motion>
```

### List Item Animations
```tsx
{items.map((item, i) => (
  <Motion
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
  >
    {/* Item content */}
  </Motion>
))}
```

### Button Press (Haptic feedback)
```tsx
<Motion
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.1 }}
>
  <button>Confirm</button>
</Motion>
```

### Modal/Sheet Entry
```tsx
<Motion
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
>
  {/* Sheet content */}
</Motion>
```

---

## 📐 Spacing & Layout

### Consistent Spacing Scale (Tailwind)
- **xs**: 8px (gap-2, p-2)
- **sm**: 12px (gap-3, p-3)
- **md**: 16px (gap-4, p-4)
- **lg**: 20px (gap-5, p-5)
- **xl**: 24px (gap-6, p-6)
- **2xl**: 32px (gap-8, p-8)

### Touch Targets
- Minimum: 44px height (iOS guideline)
- Buttons: 48-56px height
- List items: 56-64px height

### Screen Padding
- Mobile: 16px (p-4)
- Tablet: 24px (p-6)

---

## 🎭 Dark Mode Consideration

While **light theme is default**, prepare for optional dark mode:

```tsx
// Using Tailwind's dark mode
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">
    {/* Content */}
  </p>
</div>
```

Keep dark mode as Phase 4 or later - not a priority for MVP.

---

## ✅ Design Checklist

Before considering any screen "done", verify:

- [ ] Clean, minimal design (no clutter)
- [ ] Proper text hierarchy (headline, body, metadata)
- [ ] Consistent spacing (using scale above)
- [ ] Smooth animations (60fps)
- [ ] High contrast text (WCAG AA minimum)
- [ ] Touch targets ≥44px
- [ ] Loading states designed
- [ ] Error states designed  
- [ ] Empty states designed
- [ ] No mint green
- [ ] No glassmorphism
- [ ] Feels Apple-like

---

## 🔗 Resources

**Motion.dev:**
- https://motion.dev/docs/react/quick-start
- https://motion.dev/docs/react/gestures

**Shadcn/ui:**
- https://ui.shadcn.com/docs/components/button
- https://ui.shadcn.com/docs/components/sheet
- https://ui.shadcn.com/docs/components/card

**iOS Design Guidelines:**
- https://developer.apple.com/design/human-interface-guidelines/

**Color Contrast Checker:**
- https://webaim.org/resources/contrastchecker/

---

## 💡 Pro Tips

1. **Less is more** - When in doubt, remove elements
2. **Whitespace is content** - Don't fear empty space
3. **Consistency > Creativity** - Use patterns repeatedly
4. **Fast animations** - 200-300ms max for most transitions
5. **Test on device** - Always test on actual iPhone/Android

---

Ready to design like Apple? Let's make DuitLater beautiful! ✨
