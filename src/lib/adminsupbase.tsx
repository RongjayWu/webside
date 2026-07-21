import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase admin environment variables. Make sure SUPABASE_SERVICE_ROLE_KEY is in .env.local');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);