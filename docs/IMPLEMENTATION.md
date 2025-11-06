# 🎯 Implementation Plan - Next Steps

This is your roadmap for completing DuitLater MVP! Follow these in order for fastest results.

## 🏃 Week 1: Core Bill Splitting

### Priority 1: Friends Management (2-3 hours)

**File**: `app/friends/page.tsx`

What to build:
- [ ] Search users by email
- [ ] Send friend request
- [ ] Accept/reject friend requests  
- [ ] Display friends list
- [ ] Simple UI with search bar + list

**Database queries needed**:
```typescript
// Search users
const { data } = await supabase
  .from('profiles')
  .select('*')
  .ilike('email', `%${searchTerm}%`)

// Add friend
await supabase
  .from('friendships')
  .insert({ user_id: myId, friend_id: friendId })

// Get my friends
const { data } = await supabase
  .from('friendships')
  .select('*, friend:friend_id(*)')
  .eq('user_id', myId)
  .eq('status', 'accepted')
```

### Priority 2: Manual Bill Entry (4-5 hours)

**File**: `app/bills/new/manual/page.tsx`

What to build:
- [ ] Form with: title, description, date
- [ ] Dynamic item list (add/remove items)
- [ ] Each item: name, price, quantity
- [ ] Select who paid upfront
- [ ] Select participants (from friends list)
- [ ] Tag each item to specific participants
- [ ] Calculate service charge & tax (optional)
- [ ] Preview total before submitting

**Flow**:
```
1. Enter bill basics → 
2. Add items one by one → 
3. For each item, tag friends (@izzul, @alan) → 
4. Add service charge/tax (split equally) → 
5. Select who paid → 
6. Preview & Submit
```

**Key UI component**: Item tagging
```tsx
<div className="item">
  <input name="item-name" placeholder="Big Mac" />
  <input name="price" type="number" placeholder="5.50" />
  <div className="friends-tags">
    {friends.map(f => (
      <button 
        onClick={() => toggleFriend(f.id)}
        className={selected ? 'bg-primary' : 'bg-gray'}
      >
        @{f.name}
      </button>
    ))}
  </div>
</div>
```

### Priority 3: Settlement Calculation (2-3 hours)

**File**: `lib/settlements.ts`

Algorithm:
```typescript
function calculateSettlements(bill: Bill, items: BillItem[]) {
  // 1. Calculate each person's share
  const shares = {}
  
  items.forEach(item => {
    const sharePerPerson = item.price / item.shared_by.length
    item.shared_by.forEach(userId => {
      shares[userId] = (shares[userId] || 0) + sharePerPerson
    })
  })
  
  // 2. Add service charge & tax (split equally)
  const extraPerPerson = (bill.service_charge + bill.tax) / bill.participants.length
  Object.keys(shares).forEach(userId => {
    shares[userId] += extraPerPerson
  })
  
  // 3. Create settlements (everyone owes the payer)
  const settlements = []
  Object.entries(shares).forEach(([userId, amount]) => {
    if (userId !== bill.paid_by) {
      settlements.push({
        from_user_id: userId,
        to_user_id: bill.paid_by,
        amount: amount,
        bill_id: bill.id
      })
    }
  })
  
  return settlements
}
```

### Priority 4: Mark as Paid (1 hour)

**File**: `app/dashboard/page.tsx` (add button)

Simple:
```typescript
async function markAsPaid(settlementId: string) {
  await supabase
    .from('settlements')
    .update({ status: 'paid', paid_at: new Date() })
    .eq('id', settlementId)
  
  // Refresh data
  fetchData()
}
```

---

## 🚀 Week 2: OCR Magic

### Priority 5: Camera Capture (2 hours)

**File**: `app/bills/new/scan/page.tsx`

Use browser's camera API:
```tsx
<input 
  type="file" 
  accept="image/*" 
  capture="environment"
  onChange={handleImageCapture}
/>
```

Better UX: Use a library like `react-camera-pro`

### Priority 6: Tesseract.js Integration (3-4 hours)

**File**: `lib/ocr.ts`

```typescript
import Tesseract from 'tesseract.js'

async function scanReceipt(imageFile: File): Promise<OCRResult> {
  // 1. Run OCR
  const { data: { text } } = await Tesseract.recognize(
    imageFile,
    'eng',
    { logger: m => console.log(m) }
  )
  
  // 2. Parse text (this is the hard part!)
  const lines = text.split('\n')
  const items = []
  
  lines.forEach(line => {
    // Look for pattern: "Item Name" followed by "price"
    const match = line.match(/(.+?)\s+(\d+\.\d{2})/)
    if (match) {
      items.push({
        name: match[1].trim(),
        price: parseFloat(match[2]),
        quantity: 1
      })
    }
  })
  
  // 3. Extract totals (look for keywords)
  const taxMatch = text.match(/tax[:\s]+(\d+\.\d{2})/i)
  const totalMatch = text.match(/total[:\s]+(\d+\.\d{2})/i)
  
  return {
    items,
    tax: taxMatch ? parseFloat(taxMatch[1]) : null,
    total: totalMatch ? parseFloat(totalMatch[1]) : null,
    confidence: 0.8 // Calculate based on matches
  }
}
```

**Challenges**:
- Receipt formats vary wildly
- OCR isn't 100% accurate
- Parsing is tricky

**Solution**: Let users manually correct!

### Priority 7: OCR Review UI (2 hours)

After scanning:
```
1. Show detected items
2. Allow editing each item
3. Allow adding/removing items
4. Then proceed to tagging (same as manual)
```

---

## 🎨 Week 3: Polish & Friends

### Priority 8: Push Notifications (3 hours)

**Setup OneSignal**:
```typescript
// lib/onesignal.ts
import OneSignal from 'react-onesignal'

export async function initOneSignal() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
  })
  
  const playerId = await OneSignal.getUserId()
  
  // Save to profile
  await supabase
    .from('profiles')
    .update({ onesignal_player_id: playerId })
    .eq('id', userId)
}
```

**Send notification** (use Supabase Edge Function or client-side):
```typescript
async function notifyBillParticipants(bill: Bill) {
  bill.participants.forEach(async (participant) => {
    if (participant.onesignal_player_id) {
      await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YOUR_REST_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          app_id: ONESIGNAL_APP_ID,
          include_player_ids: [participant.onesignal_player_id],
          contents: { en: `You're in a new bill: ${bill.title}` }
        })
      })
    }
  })
}
```

### Priority 9: Bill Details View (2 hours)

**File**: `app/bills/[id]/page.tsx`

Show:
- Bill title, date, total
- Who paid
- List of items with tags
- Settlement breakdown
- Button to mark as paid (if you owe)

### Priority 10: Loading States & Error Handling (2 hours)

Add throughout the app:
- Loading spinners while fetching
- Error messages when things fail
- Success toasts when actions complete
- Optimistic UI updates

---

## ⚡ Bonus Features (If Time)

### Smart Debt Netting
Instead of everyone paying the payer, calculate minimum payments:
```
Example: 
- You owe Alan $10
- Alan owes Najmi $10
Simplify to: You owe Najmi $10
```

### Groups
- Create "Office Lunch" group
- Bills default to group members
- Quick access to split with same people

### Receipt Storage
- Upload receipt image to Supabase Storage
- Display in bill details
- Reference later if disputes

### Export History
- Download CSV of all bills
- Filter by date range
- Use for expense tracking

---

## 📊 Testing Checklist

Before shipping to friends:

- [ ] Can create account
- [ ] Can add friends
- [ ] Can create manual bill
- [ ] Can tag items to friends
- [ ] Settlements calculate correctly
- [ ] Can mark as paid
- [ ] Dashboard shows accurate balances
- [ ] Works on mobile (responsive)
- [ ] Can sign out and back in
- [ ] Multiple people can use simultaneously

---

## 🎯 MVP Definition

**Ready to share when you have**:
1. ✅ Authentication
2. ✅ Add friends
3. ✅ Create bill (manual)
4. ✅ Tag items to people
5. ✅ Calculate settlements
6. ✅ Mark as paid
7. ✅ Dashboard with balances

**OCR is Phase 2** - Get manual entry working first!

---

## 💡 Pro Tips

1. **Test with real data**: Use actual restaurant receipts
2. **Mobile-first**: Your friends will use phones
3. **Keep it simple**: Don't overcomplicate the UX
4. **Iterate fast**: Ship early, get feedback, improve
5. **Document quirks**: If something is weird, add a tooltip

---

Ready to build? Start with **Friends Management** - it's the foundation for everything else! 🚀

Need help with any specific feature? Just ask!
