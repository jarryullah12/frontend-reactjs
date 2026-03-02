
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvdqzknmphfgkaoxqocb.supabase.co';
const supabaseKey = 'sb_publishable_bK80YqEQ2WGUSisRIlNVeQ_SVcRmS_G';

export const supabase = createClient(supabaseUrl, supabaseKey);
