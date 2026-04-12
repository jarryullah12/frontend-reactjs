
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qqyenpvijzxsdsdqyzii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxeWVucHZpanp4c2RzZHF5emlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2Mzg3OTIsImV4cCI6MjA4NzIxNDc5Mn0.6LitFZRp2KOvhk8I66PARcyouzYYPGMaqp6qrLvu9oc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
