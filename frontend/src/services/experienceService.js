import { supabase } from '../lib/supabase';

export async function getExperience() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false, nullsLast: true });

  if (error) throw error;
  return data || [];
}
