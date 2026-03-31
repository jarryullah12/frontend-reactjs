-- Run this in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  image TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Allow public read access on users"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on users"
  ON public.users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on users"
  ON public.users FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete on users"
  ON public.users FOR DELETE
  USING (true);

-- Create policies for blogs
CREATE POLICY "Allow public read access on blogs"
  ON public.blogs FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on blogs"
  ON public.blogs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on blogs"
  ON public.blogs FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete on blogs"
  ON public.blogs FOR DELETE
  USING (true);

-- Insert some dummy data
INSERT INTO public.users (name, email, password, role) VALUES
  ('Admin User', 'admin@example.com', 'admin123', 'admin'),
  ('Test User', 'test@example.com', 'password123', 'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.blogs (title, content, author, category, image) VALUES
  ('How to Optimize Your Website for SEO in 2024', 'Search Engine Optimization (SEO) is constantly evolving...', 'Admin', 'SEO', 'https://picsum.photos/seed/seo/800/400'),
  ('The Future of AI in Digital Marketing', 'Artificial Intelligence is revolutionizing the way we approach marketing...', 'Admin', 'AI', 'https://picsum.photos/seed/ai/800/400');
