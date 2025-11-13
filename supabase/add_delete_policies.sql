-- ============================================
-- DELETE POLICIES FOR DUITLATER
-- Add these to Supabase SQL Editor
-- Run Date: November 12, 2025
-- ============================================

-- IMPORTANT: Run this entire file in your Supabase SQL Editor
-- These policies allow users to delete their own data

-- ============================================
-- 1. PROFILES
-- ============================================
-- Users can delete their own profile
CREATE POLICY "Users can delete own profile"
ON profiles FOR DELETE
USING (auth.uid() = id);

-- ============================================
-- 2. FRIENDSHIPS
-- ============================================
-- Users can delete friendships they're part of (unfriend)
CREATE POLICY "Users can delete their friendships"
ON friendships FOR DELETE
USING (
  auth.uid() = user_id
  OR auth.uid() = friend_id
);

-- ============================================
-- 3. BILLS
-- ============================================
-- Users can only delete bills they created
CREATE POLICY "Users can delete own bills"
ON bills FOR DELETE
USING (auth.uid() = created_by);

-- ============================================
-- 4. BILL PARTICIPANTS
-- ============================================
-- Bill creator can remove participants
CREATE POLICY "Bill creator can remove participants"
ON bill_participants FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM bills
    WHERE bills.id = bill_participants.bill_id
    AND bills.created_by = auth.uid()
  )
);

-- ============================================
-- 5. BILL ITEMS
-- ============================================
-- Bill creator can delete items
CREATE POLICY "Bill creator can delete items"
ON bill_items FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM bills
    WHERE bills.id = bill_items.bill_id
    AND bills.created_by = auth.uid()
  )
);

-- ============================================
-- 6. ITEM SHARES
-- ============================================
-- Bill creator can delete item shares
CREATE POLICY "Bill creator can delete item shares"
ON item_shares FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM bill_items bi
    JOIN bills b ON b.id = bi.bill_id
    WHERE bi.id = item_shares.item_id
    AND b.created_by = auth.uid()
  )
);

-- ============================================
-- 7. SETTLEMENTS
-- ============================================
-- Users can delete settlements where they're involved
-- (Only if status is 'pending' - can't delete paid/cancelled settlements)
CREATE POLICY "Users can delete pending settlements"
ON settlements FOR DELETE
USING (
  (auth.uid() = from_user_id OR auth.uid() = to_user_id)
  AND status = 'pending'
);

-- ============================================
-- BONUS: ADD MISSING INSERT POLICY
-- ============================================

-- Settlement creation policy (was missing in original schema)
-- Only participants of a bill can create settlements for that bill
CREATE POLICY "Bill participants can create settlements"
ON settlements FOR INSERT
WITH CHECK (
  auth.uid() = from_user_id
  AND EXISTS (
    SELECT 1 FROM bill_participants
    WHERE bill_participants.bill_id = settlements.bill_id
    AND bill_participants.user_id = auth.uid()
  )
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all DELETE policies are created
SELECT
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND cmd = 'DELETE'
ORDER BY tablename, policyname;

-- Expected Result:
-- You should see 7 DELETE policies:
-- 1. profiles: "Users can delete own profile"
-- 2. friendships: "Users can delete their friendships"
-- 3. bills: "Users can delete own bills"
-- 4. bill_participants: "Bill creator can remove participants"
-- 5. bill_items: "Bill creator can delete items"
-- 6. item_shares: "Bill creator can delete item shares"
-- 7. settlements: "Users can delete pending settlements"

-- Count policies by type
SELECT
  cmd as policy_type,
  COUNT(*) as count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY cmd
ORDER BY cmd;

-- Expected counts:
-- DELETE: 7
-- INSERT: 8 (original 7 + 1 new for settlements)
-- SELECT: 7
-- UPDATE: ~5-7 (depending on original schema)

-- ============================================
-- ROLLBACK (if needed)
-- ============================================
-- If you need to remove these policies, run:
/*
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their friendships" ON friendships;
DROP POLICY IF EXISTS "Users can delete own bills" ON bills;
DROP POLICY IF EXISTS "Bill creator can remove participants" ON bill_participants;
DROP POLICY IF EXISTS "Bill creator can delete items" ON bill_items;
DROP POLICY IF EXISTS "Bill creator can delete item shares" ON item_shares;
DROP POLICY IF EXISTS "Users can delete pending settlements" ON settlements;
DROP POLICY IF EXISTS "Bill participants can create settlements" ON settlements;
*/
