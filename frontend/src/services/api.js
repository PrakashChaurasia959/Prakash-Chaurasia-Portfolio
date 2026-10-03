import { createClient } from '@supabase/supabase-js';

// Netlify और Localhost दोनों जगह चाबियाँ पढ़ने का सही तरीका
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase को इनिशियलाइज़ करना
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const api = supabase; 
export default api;