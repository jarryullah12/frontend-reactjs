import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdfywmdmuhsggjfhzgpa.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZnl3bWRtdWhzZ2dqZmh6Z3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2Mjk1MTIsImV4cCI6MjA4OTIwNTUxMn0.WkgMbZDd0WLSPoYFNSAdcQFm7EgKbIDymQ5YNXpJZz0';

export const supabase = createClient(supabaseUrl, supabaseKey);
