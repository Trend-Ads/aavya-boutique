-- ==============================================================================
-- Aavya Boutique — Supabase Schema: Categories Table & Seed Data
-- ==============================================================================
-- Run this script in your Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard/project/spdzbnlwowrmuyypcapi/sql
-- 2. Click "+ New query"
-- 3. Paste this script and click "Run"
-- ==============================================================================

-- 1. Create categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure image_url column exists if table was already created
alter table public.categories add column if not exists image_url text;

-- 2. Enable Row Level Security (RLS)
alter table public.categories enable row level security;

-- 3. RLS Policies
-- Anyone (public visitors + admin) can view categories
drop policy if exists "Allow public read access on categories" on public.categories;
create policy "Allow public read access on categories"
  on public.categories
  for select
  using (true);

-- Only authenticated users (Admins) can insert, update, or delete categories
drop policy if exists "Allow authenticated admin full access to categories" on public.categories;
create policy "Allow authenticated admin full access to categories"
  on public.categories
  for all
  to authenticated
  using (true)
  with check (true);

-- 4. Seed initial boutique categories (matching storefront navigation)
insert into public.categories (name, slug, description, display_order, is_active)
values
  ('New In', 'new-in', 'Latest fresh arrivals and contemporary boutique drops', 1, true),
  ('Dresses', 'dresses', 'Designer midi, wrap, and flowing silhouette dresses', 2, true),
  ('Kurtis', 'kurtis', 'Artisanal hand-block and festive embroidered kurtis', 3, true),
  ('Co-ords', 'co-ords', 'Effortlessly matching luxury linen and silk sets', 4, true),
  ('Tops', 'tops', 'Contemporary tunics, blouses, and elegant tops', 5, true),
  ('Ethnic', 'ethnic', 'Timeless traditional silhouettes, sarees, and heritage wear', 6, true),
  ('Party Wear', 'party-wear', 'Luminous evening gowns and celebratory glam wear', 7, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  display_order = excluded.display_order,
  is_active = excluded.is_active,
  updated_at = now();
