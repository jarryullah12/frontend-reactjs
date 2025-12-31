-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create 'orders' table if it completely doesn't exist
create table if not exists public.orders (
  id text not null primary key default gen_random_uuid()::text,
  client text,
  email text,
  phone text,
  pickup text,
  pickup_time text,
  dropoff text,
  delivery_time text,
  billing_address text,
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

-- 2. Ensure columns exist (in case the table existed but was missing columns)
do $$
begin
    -- Check for billing_address
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'billing_address') then
        alter table public.orders add column billing_address text;
    end if;

    -- Check for pickup_time
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'pickup_time') then
        alter table public.orders add column pickup_time text;
    end if;

    -- Check for delivery_time
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'delivery_time') then
        alter table public.orders add column delivery_time text;
    end if;

    -- Check for client_proof_url
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'client_proof_url') then
        alter table public.orders add column client_proof_url text;
    end if;
end $$;

-- 3. Create 'admin_doc_review' table if it doesn't exist
create table if not exists public.admin_doc_review (
  id uuid primary key default gen_random_uuid(),
  order_id text,
  client_email text,
  client_name text,
  doc_url text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Create 'fleet' table if it doesn't exist (Just in case)
create table if not exists public.fleet (
  id text not null primary key,
  type text,
  plate text,
  driver text,
  status text default 'Available',
  location text
);

-- 5. Enable RLS (Row Level Security) - Safe to run multiple times
alter table public.orders enable row level security;
alter table public.admin_doc_review enable row level security;
alter table public.fleet enable row level security;

-- 6. Create RLS Policies (Drop first to ensure clean update)
drop policy if exists "Allow all on orders" on public.orders;
create policy "Allow all on orders" on public.orders for all using (true) with check (true);

drop policy if exists "Allow all on admin_doc_review" on public.admin_doc_review;
create policy "Allow all on admin_doc_review" on public.admin_doc_review for all using (true) with check (true);

drop policy if exists "Allow all on fleet" on public.fleet;
create policy "Allow all on fleet" on public.fleet for all using (true) with check (true);

-- 7. Storage Bucket & Policies
insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', true)
on conflict (id) do update set public = true;

drop policy if exists "Allow Public Insert Invoices" on storage.objects;
create policy "Allow Public Insert Invoices" on storage.objects for insert with check ( bucket_id = 'invoices' );

drop policy if exists "Allow Public Select Invoices" on storage.objects;
create policy "Allow Public Select Invoices" on storage.objects for select using ( bucket_id = 'invoices' );

-- Grant permissions to public/anon (Important for public interaction if needed)
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.orders to anon, authenticated, service_role;
grant all on table public.fleet to anon, authenticated, service_role;
grant all on table public.admin_doc_review to anon, authenticated, service_role;

-- 8. RELOAD SCHEMA CACHE (Critical step!)
NOTIFY pgrst, 'reload config';
