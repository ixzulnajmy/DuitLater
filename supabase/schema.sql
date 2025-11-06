-- Spleet Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  onesignal_player_id TEXT, -- For push notifications
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FRIENDSHIPS TABLE (many-to-many)
-- ============================================
CREATE TABLE public.friendships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Index for faster friend lookups
CREATE INDEX idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON public.friendships(friend_id);

-- ============================================
-- BILLS TABLE
-- ============================================
CREATE TABLE public.bills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL, -- e.g., "McDonald's Lunch"
  description TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  service_charge DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  paid_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receipt_image_url TEXT,
  bill_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bills_paid_by ON public.bills(paid_by);
CREATE INDEX idx_bills_created_by ON public.bills(created_by);

-- ============================================
-- BILL PARTICIPANTS (who's involved in the bill)
-- ============================================
CREATE TABLE public.bill_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bill_id, user_id)
);

CREATE INDEX idx_bill_participants_bill_id ON public.bill_participants(bill_id);
CREATE INDEX idx_bill_participants_user_id ON public.bill_participants(user_id);

-- ============================================
-- BILL ITEMS (line items from receipt)
-- ============================================
CREATE TABLE public.bill_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL, -- e.g., "Big Mac"
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bill_items_bill_id ON public.bill_items(bill_id);

-- ============================================
-- ITEM SHARES (who shares each item)
-- ============================================
CREATE TABLE public.item_shares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  item_id UUID REFERENCES public.bill_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(item_id, user_id)
);

CREATE INDEX idx_item_shares_item_id ON public.item_shares(item_id);
CREATE INDEX idx_item_shares_user_id ON public.item_shares(user_id);

-- ============================================
-- SETTLEMENTS (who owes whom)
-- ============================================
CREATE TABLE public.settlements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE NOT NULL,
  from_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_settlements_bill_id ON public.settlements(bill_id);
CREATE INDEX idx_settlements_from_user_id ON public.settlements(from_user_id);
CREATE INDEX idx_settlements_to_user_id ON public.settlements(to_user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view all profiles (to search/add friends), but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Friendships: Users can only see their own friendships
CREATE POLICY "Users can view own friendships"
  ON public.friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friendships"
  ON public.friendships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own friendships"
  ON public.friendships FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Bills: Users can only see bills they're participants in
CREATE POLICY "Users can view bills they're part of"
  ON public.bills FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.bill_participants 
      WHERE bill_id = bills.id
    )
  );

CREATE POLICY "Users can create bills"
  ON public.bills FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update bills they created"
  ON public.bills FOR UPDATE
  USING (auth.uid() = created_by);

-- Bill Participants: Users can see participants of bills they're in
CREATE POLICY "Users can view participants of their bills"
  ON public.bill_participants FOR SELECT
  USING (
    bill_id IN (
      SELECT bill_id FROM public.bill_participants 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Bill creators can add participants"
  ON public.bill_participants FOR INSERT
  WITH CHECK (
    bill_id IN (
      SELECT id FROM public.bills 
      WHERE created_by = auth.uid()
    )
  );

-- Bill Items: Users can see items of bills they're in
CREATE POLICY "Users can view items of their bills"
  ON public.bill_items FOR SELECT
  USING (
    bill_id IN (
      SELECT bill_id FROM public.bill_participants 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Bill creators can add items"
  ON public.bill_items FOR INSERT
  WITH CHECK (
    bill_id IN (
      SELECT id FROM public.bills 
      WHERE created_by = auth.uid()
    )
  );

-- Item Shares: Users can see who shares items in their bills
CREATE POLICY "Users can view item shares of their bills"
  ON public.item_shares FOR SELECT
  USING (
    item_id IN (
      SELECT bi.id FROM public.bill_items bi
      JOIN public.bill_participants bp ON bi.bill_id = bp.bill_id
      WHERE bp.user_id = auth.uid()
    )
  );

CREATE POLICY "Bill creators can add item shares"
  ON public.item_shares FOR INSERT
  WITH CHECK (
    item_id IN (
      SELECT bi.id FROM public.bill_items bi
      JOIN public.bills b ON bi.bill_id = b.id
      WHERE b.created_by = auth.uid()
    )
  );

-- Settlements: Users can see settlements involving them
CREATE POLICY "Users can view their settlements"
  ON public.settlements FOR SELECT
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can update settlements they're part of"
  ON public.settlements FOR UPDATE
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_bills
  BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_settlements
  BEFORE UPDATE ON public.settlements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- HELPER VIEWS
-- ============================================

-- View: Get all friends (accepted friendships)
CREATE OR REPLACE VIEW public.user_friends AS
SELECT 
  f.user_id,
  p.id AS friend_id,
  p.full_name AS friend_name,
  p.email AS friend_email,
  p.avatar_url AS friend_avatar
FROM public.friendships f
JOIN public.profiles p ON f.friend_id = p.id
WHERE f.status = 'accepted'
UNION
SELECT 
  f.friend_id AS user_id,
  p.id AS friend_id,
  p.full_name AS friend_name,
  p.email AS friend_email,
  p.avatar_url AS friend_avatar
FROM public.friendships f
JOIN public.profiles p ON f.user_id = p.id
WHERE f.status = 'accepted';

-- View: Calculate user balances (who owes/is owed)
CREATE OR REPLACE VIEW public.user_balances AS
SELECT 
  user_id,
  SUM(CASE WHEN user_id = from_user_id THEN -amount ELSE amount END) as balance
FROM (
  SELECT from_user_id as user_id, amount FROM public.settlements WHERE status = 'pending'
  UNION ALL
  SELECT to_user_id as user_id, amount FROM public.settlements WHERE status = 'pending'
) combined
GROUP BY user_id;

-- ============================================
-- SAMPLE DATA (for testing - remove in production)
-- ============================================
-- Uncomment below to add test data

-- INSERT INTO public.profiles (id, email, full_name) VALUES
-- ('00000000-0000-0000-0000-000000000001', 'izzul@test.com', 'Izzul'),
-- ('00000000-0000-0000-0000-000000000002', 'alan@test.com', 'Alan'),
-- ('00000000-0000-0000-0000-000000000003', 'najmi@test.com', 'Najmi');
