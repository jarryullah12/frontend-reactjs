import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hhftqoauatvtxscsacjl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZnRxb2F1YXR2dHhzY3NhY2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NzcwNDQsImV4cCI6MjA4MTQ1MzA0NH0.po4A4K14D7yZ3BYLHpX0D6BnIBJ_FtpG4haN2-vwzTc';

export const supabase = createClient(supabaseUrl.trim(), supabaseKey.trim());

export const SQL_SETUP_SNIPPET = `-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Profiles table
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'client',
  phone text,
  address text,
  join_date text,
  password text
);

-- 2. Create Orders table
create table if not exists public.orders (
  id text not null primary key default gen_random_uuid()::text,
  client text,
  email text,
  phone text,
  pickup text,
  dropoff text,
  distance text,
  vehicle text,
  route text,
  amount text,
  status text default 'Pending Review',
  date text,
  invoice_url text,
  client_proof_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Create admin_doc_review table
create table if not exists public.admin_doc_review (
  id uuid primary key default gen_random_uuid(),
  order_id text,
  client_email text,
  client_name text,
  doc_url text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Create Fleet table
create table if not exists public.fleet (
  id text not null primary key,
  type text,
  plate text,
  driver text,
  status text default 'Available',
  location text
);

-- 5. RLS Policies for Tables
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.fleet enable row level security;
alter table public.admin_doc_review enable row level security;

create policy "Allow all on profiles" on public.profiles for all using (true) with check (true);
create policy "Allow all on orders" on public.orders for all using (true) with check (true);
create policy "Allow all on fleet" on public.fleet for all using (true) with check (true);
create policy "Allow all on admin_doc_review" on public.admin_doc_review for all using (true) with check (true);

-- 6. Storage Bucket & Policies Setup
-- Create bucket 'invoices'
insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', true)
on conflict (id) do update set public = true;

-- Storage Policies
create policy "Allow Public Insert" on storage.objects for insert with check ( bucket_id = 'invoices' );
create policy "Allow Public Select" on storage.objects for select using ( bucket_id = 'invoices' );
create policy "Allow Public Update" on storage.objects for update using ( bucket_id = 'invoices' );
create policy "Allow Public Delete" on storage.objects for delete using ( bucket_id = 'invoices' );

-- 7. Grant Permissions
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.profiles to anon, authenticated, service_role;
grant all on table public.orders to anon, authenticated, service_role;
grant all on table public.fleet to anon, authenticated, service_role;
grant all on table public.admin_doc_review to anon, authenticated, service_role;

NOTIFY pgrst, 'reload config';`;