import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => line.split('=').map(p => p.trim()))
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing credentials");
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  console.log("Testing Blog Posts...");
  const { data: blogs, error: blogsError } = await supabase.from('blog_posts').select('*').limit(1);
  console.log("Blogs:", blogs, "Error:", blogsError);

  console.log("Testing Resumes...");
  const { data: resumes, error: resumesError } = await supabase.from('resumes').select('*').limit(1);
  console.log("Resumes:", resumes, "Error:", resumesError);
  
  console.log("Testing Profiles...");
  const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*').limit(1);
  console.log("Profiles:", profiles, "Error:", profilesError);
}

test();
