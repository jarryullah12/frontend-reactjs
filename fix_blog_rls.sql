-- FIX: Update RLS policies for blog_posts to allow public read access

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

-- Create more explicit policies
-- Allow EVERYONE (anon + authenticated) to SELECT published posts
CREATE POLICY "Public read published posts" ON public.blog_posts 
  FOR SELECT 
  TO public
  USING (status = 'published' OR auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Allow admins to do everything
CREATE POLICY "Admin full access" ON public.blog_posts 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Verify the table has RLS enabled
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
