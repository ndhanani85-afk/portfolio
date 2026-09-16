-- ==============================================================================
-- NIKUNJ DHANANI COUNSELING PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Run this script in your new Supabase Project:
-- Dashboard -> SQL Editor -> New query -> Paste & Click 'Run'
-- ==============================================================================

-- 1. BOOKINGS TABLE (Stores counseling appointments & consultation leads)
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. REVIEWS TABLE (Stores client feedback and testimonials)
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER DEFAULT 5 NOT NULL,
  category TEXT,
  sub_type TEXT,
  review_text TEXT NOT NULL,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'site_storage',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on both tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ── BOOKINGS POLICIES ──
-- Allow public users (website visitors) to submit bookings
CREATE POLICY "Allow public inserts on bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- Allow backend API / admin to read bookings
CREATE POLICY "Allow service role full access on bookings"
ON public.bookings
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ── REVIEWS POLICIES ──
-- Allow public users to submit reviews
CREATE POLICY "Allow public inserts on reviews"
ON public.reviews
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- Allow public read of reviews for testimonials showcase
CREATE POLICY "Allow public read on reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- Allow backend API / admin to manage reviews
CREATE POLICY "Allow service role full access on reviews"
ON public.reviews
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
