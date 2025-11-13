# Supabase Setup Instructions

## 🔐 Adding DELETE Policies (Critical Security Fix)

### Why This Is Important

The original database schema was missing DELETE policies on all 7 tables. This means users couldn't delete their own data, which is both a security issue and poor UX. These policies fix that.

### What Was Added

✅ **7 DELETE Policies:**
1. **profiles** - Users can delete their own profile
2. **friendships** - Users can unfriend others
3. **bills** - Bill creators can delete their bills
4. **bill_participants** - Bill creators can remove participants
5. **bill_items** - Bill creators can delete items from their bills
6. **item_shares** - Bill creators can modify who shares items
7. **settlements** - Users can delete pending settlements (not paid/cancelled ones)

✅ **1 INSERT Policy (Bonus):**
- **settlements** - Only bill participants can create settlements

---

## 📝 Step-by-Step Instructions

### Step 1: Access Supabase SQL Editor

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your **DuitLater** project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query** button

### Step 2: Copy the SQL

1. Open the file: `supabase/add_delete_policies.sql`
2. Copy **ALL** the SQL commands (entire file)
3. Paste into the SQL Editor

### Step 3: Run the SQL

1. Click the **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. Wait for execution to complete
3. You should see: **"Success. No rows returned"** (this is normal!)

### Step 4: Verify Policies Were Created

Run the verification query at the bottom of the file:

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND cmd = 'DELETE'
ORDER BY tablename, policyname;
```

**Expected Result:**

| schemaname | tablename | policyname | cmd |
|------------|-----------|------------|-----|
| public | bill_items | Bill creator can delete items | DELETE |
| public | bill_participants | Bill creator can remove participants | DELETE |
| public | bills | Users can delete own bills | DELETE |
| public | friendships | Users can delete their friendships | DELETE |
| public | item_shares | Bill creator can delete item shares | DELETE |
| public | profiles | Users can delete own profile | DELETE |
| public | settlements | Users can delete pending settlements | DELETE |

You should see **7 DELETE policies** total.

---

## ✅ Testing the Policies

### Test 1: User Can Delete Own Bill

1. Create a test user account
2. Create a bill as that user
3. Try to delete the bill (should succeed)
4. Log in as a different user
5. Try to delete the first user's bill (should fail with permission error)

### Test 2: User Can Unfriend

1. User A adds User B as friend
2. User A should be able to delete the friendship
3. User B should also be able to delete the friendship (mutual unfriend)

### Test 3: User Cannot Delete Paid Settlements

1. Create a settlement with status 'pending'
2. User should be able to delete it
3. Update settlement to status 'paid'
4. User should NOT be able to delete it (prevents history tampering)

---

## 🔍 Troubleshooting

### Error: "policy already exists"

This means the policy was already created. Options:
1. Skip that policy (it's already there)
2. Drop and recreate (see Rollback section in SQL file)

### Error: "permission denied"

Make sure you're running the SQL as a Supabase admin user, not as an app user.

### Error: "relation does not exist"

The table doesn't exist. Make sure you ran the main schema.sql file first:
```bash
# Check if tables exist
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

---

## 📊 Policy Summary

### Security Model

**Profiles:**
- ✅ Anyone can view (needed for friend search)
- ✅ Users can only update/delete their own

**Bills:**
- ✅ Only participants can view
- ✅ Only creator can update/delete
- ✅ Participants can't see bills they're not part of

**Friendships:**
- ✅ Mutual control - either user can delete the friendship
- ✅ Users can't see other people's friend lists

**Settlements:**
- ✅ Pending settlements can be deleted
- ✅ Paid/cancelled settlements are permanent (audit trail)
- ✅ Only the people involved can see/modify

---

## 🔄 Rollback Instructions

If you need to remove these policies (not recommended):

1. Go to Supabase SQL Editor
2. Copy the rollback SQL from the bottom of `add_delete_policies.sql`
3. Uncomment it (remove the `/*` and `*/`)
4. Run it

---

## 📈 Next Steps

After adding these policies:

1. ✅ Test with two user accounts
2. ✅ Verify users can delete their own data
3. ✅ Verify users cannot delete others' data
4. ✅ Update your app to add delete functionality in the UI
5. ✅ Consider adding soft deletes for bills (mark as deleted instead of hard delete)

---

## 📞 Need Help?

If you encounter issues:

1. Check the Supabase logs: Dashboard → Logs → Postgres Logs
2. Review the original schema: `supabase/schema.sql`
3. Check Supabase docs: https://supabase.com/docs/guides/auth/row-level-security

---

**Last Updated:** November 12, 2025
**Version:** 1.0
