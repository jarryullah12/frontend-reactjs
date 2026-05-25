-- SQL Script for Supabase

-- Create User Table (Supabase handles authentication automatically in its auth.users table, 
-- but you can create a public profile table if you want, but considering we have a User interface here we can do it)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  name TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  plain_password TEXT, -- WARNING: Extremely insecure, added only for the direct retrieval feature.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- MIGRATION FOR PLAIN PASSWORD FEATURE
-- ==========================================
-- If you get "column plain_password does not exist", run this in Supabase SQL Editor:
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plain_password TEXT;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- ==========================================
-- POLICY UPDATES FOR PASSWORD RECOVERY
-- ==========================================
-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can lookup password by email" ON public.profiles;

-- Allow anyone to lookup the profile by email ONLY for retrieved password
-- (This is a security trade-off for the requested prompt-based feature)
CREATE POLICY "Anyone can lookup password by email" 
ON public.profiles FOR SELECT 
USING (true);

-- Turn on RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  template_id TEXT NOT NULL,
  content JSONB, -- Added for flexible storage
  accent_color TEXT,
  font TEXT,
  pages INTEGER,
  personal_info JSONB,
  experience JSONB,
  education JSONB,
  skills JSONB,
  languages JSONB,
  projects JSONB,
  references_list JSONB,
  cover_letter JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS for resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Policies for public.profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Policies for public.resumes
CREATE POLICY "Users can view their own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- trigger to create profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    CASE WHEN new.email = 'jarryullah46@gmail.com' THEN 'admin' ELSE 'user' END
  )
  ON CONFLICT (id) DO UPDATE 
  SET email = EXCLUDED.email,
      name = COALESCE(EXCLUDED.name, profiles.name),
      role = COALESCE(EXCLUDED.role, profiles.role);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing if any to avoid errors
DROP POLICY IF EXISTS "Anyone can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

-- Explicitly allow public (anon) and authenticated users to view published posts
CREATE POLICY "Anyone can view blog posts" ON public.blog_posts 
  FOR SELECT 
  USING (true);

-- Explicitly handle admins separately for all actions
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts 
  FOR ALL 
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- INSERT SAMPLE DATA
INSERT INTO public.blog_posts (title, excerpt, content, author, date, category, status, image)
VALUES (
  'Blog Tip PK Experts Will Not Tell You: Unveiled Secrets for Pakistani Bloggers',
  'Discover the hidden strategies that successful Pakistani bloggers use to dominate the digital landscape. Learn how to grow your audience and build a community.',
  '<p>Welcome, dear reader, to the vibrant world of blogging in Pakistan. In an era where digital presence is paramount, blogging stands out as a powerful medium for personal expression, information sharing, and community building.</p><p><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200" alt="Blogging in Pakistan"></p><h2>The Core of Digital Success</h2><p>The importance of blogging in Pakistan cannot be overstated, offering a unique platform for voices from diverse backgrounds to be heard. This guide aims to unveil the secrets behind successful blogging, providing you with the tools and knowledge to make your blog a success.</p><h3>1. Know Your Niche</h3><p>Pakistani audiences are diverse. Whether it\'s tech, food, fashion, or career consulting, being specific helps you stand out. Don\'t try to talk to everyone; talk to the right people.</p><h3>2. Quality Over Quantity</h3><p>One well-researched article is worth ten low-quality ones. Focus on providing value. Your readers will thank you with their loyalty.</p><h3>3. The Power of Networking</h3><p>Connect with other creators in the Pakistani blogosphere. Collaboration is the fastest way to grow your reach and credibility.</p>',
  'Jarryullah',
  'May 18, 2026',
  'Career Development',
  'published',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
) ON CONFLICT DO NOTHING;

-- MANUALLY SET ADMIN (Run this for your account)
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'jarryullah46@gmail.com';

-- ==========================================
-- HELPERS & TROUBLESHOOTING
-- ==========================================

-- 1. FORCE CONFIRM EXISTING USERS (Run this if login fails with "Email not confirmed")
-- Run this in your Supabase SQL Editor:
-- UPDATE auth.users SET email_confirmed_at = now() WHERE email_confirmed_at IS NULL;

-- 2. PASSWORD MANAGEMENT:
-- NOTE: You do NOT need to add a "password" column to the profiles table. 
-- Supabase manages passwords securely in the internal `auth.users` table.
-- Your app connects to that table automatically via Supabase Auth services.
-- To allow direct login without email confirmation:
-- Go to Authentication -> Settings -> Email Auth -> Toggle OFF "Confirm Email".

-- ==========================================
-- EMAIL NORMALIZATION (GMAIL ALIAS LINKING)
-- ==========================================
-- This section lets gmail aliases (dots/+tag/googlemail.com) behave as one identity,
-- so email/password and Google OAuth can access the same resumes.

-- 1) Add normalized email columns to resumes
ALTER TABLE public.resumes
  ADD COLUMN IF NOT EXISTS owner_email TEXT,
  ADD COLUMN IF NOT EXISTS owner_email_normalized TEXT;

-- 2) Normalization function (immutable, safe in policies)
CREATE OR REPLACE FUNCTION public.normalize_identity_email(input_email TEXT)
RETURNS TEXT AS $$
DECLARE
  local_part TEXT;
  domain_part TEXT;
BEGIN
  IF input_email IS NULL OR btrim(input_email) = '' THEN
    RETURN NULL;
  END IF;

  input_email := lower(btrim(input_email));
  local_part := split_part(input_email, '@', 1);
  domain_part := split_part(input_email, '@', 2);

  IF domain_part = 'googlemail.com' THEN
    domain_part := 'gmail.com';
  END IF;

  IF domain_part = 'gmail.com' THEN
    local_part := replace(local_part, '.', '');
    local_part := split_part(local_part, '+', 1);
  END IF;

  RETURN local_part || '@' || domain_part;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2.1) Normalize admin assignment for both email/password and Google OAuth identities
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    CASE
      WHEN public.normalize_identity_email(new.email) = public.normalize_identity_email('jarryullah46@gmail.com')
      THEN 'admin'
      ELSE 'user'
    END
  )
  ON CONFLICT (id) DO UPDATE 
  SET email = EXCLUDED.email,
      name = COALESCE(EXCLUDED.name, profiles.name),
      role = CASE
        WHEN profiles.role = 'admin' OR EXCLUDED.role = 'admin' THEN 'admin'
        ELSE COALESCE(profiles.role, EXCLUDED.role, 'user')
      END;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2.2) Backfill any existing alias-based admin profile to role='admin'
UPDATE public.profiles
SET role = 'admin'
WHERE public.normalize_identity_email(email) = public.normalize_identity_email('jarryullah46@gmail.com');

-- 3) Backfill existing rows
UPDATE public.resumes
SET
  owner_email = COALESCE(owner_email, lower((
    SELECT email FROM auth.users u WHERE u.id = resumes.user_id
  ))),
  owner_email_normalized = COALESCE(
    owner_email_normalized,
    public.normalize_identity_email(COALESCE(owner_email, (
      SELECT email FROM auth.users u WHERE u.id = resumes.user_id
    )))
  );

-- 4) Trigger to keep normalized email updated
CREATE OR REPLACE FUNCTION public.set_resume_owner_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.owner_email IS NULL OR btrim(NEW.owner_email) = '' THEN
    SELECT email INTO NEW.owner_email FROM auth.users WHERE id = NEW.user_id;
  END IF;

  NEW.owner_email := lower(NEW.owner_email);
  NEW.owner_email_normalized := public.normalize_identity_email(NEW.owner_email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_resume_owner_email_before_write ON public.resumes;
CREATE TRIGGER set_resume_owner_email_before_write
BEFORE INSERT OR UPDATE ON public.resumes
FOR EACH ROW
EXECUTE PROCEDURE public.set_resume_owner_email();

-- 5) RLS policies based on normalized auth email
DROP POLICY IF EXISTS "Users can view resumes by normalized email" ON public.resumes;
DROP POLICY IF EXISTS "Users can insert resumes by normalized email" ON public.resumes;
DROP POLICY IF EXISTS "Users can update resumes by normalized email" ON public.resumes;
DROP POLICY IF EXISTS "Users can delete resumes by normalized email" ON public.resumes;

CREATE POLICY "Users can view resumes by normalized email"
ON public.resumes FOR SELECT
USING (
  owner_email_normalized = public.normalize_identity_email(auth.jwt() ->> 'email')
  OR auth.uid() = user_id
);

CREATE POLICY "Users can insert resumes by normalized email"
ON public.resumes FOR INSERT
WITH CHECK (
  owner_email_normalized = public.normalize_identity_email(auth.jwt() ->> 'email')
  OR auth.uid() = user_id
);

CREATE POLICY "Users can update resumes by normalized email"
ON public.resumes FOR UPDATE
USING (
  owner_email_normalized = public.normalize_identity_email(auth.jwt() ->> 'email')
  OR auth.uid() = user_id
)
WITH CHECK (
  owner_email_normalized = public.normalize_identity_email(auth.jwt() ->> 'email')
  OR auth.uid() = user_id
);

CREATE POLICY "Users can delete resumes by normalized email"
ON public.resumes FOR DELETE
USING (
  owner_email_normalized = public.normalize_identity_email(auth.jwt() ->> 'email')
  OR auth.uid() = user_id
);
