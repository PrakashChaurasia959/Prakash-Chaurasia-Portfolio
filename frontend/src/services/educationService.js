import { supabase } from '../lib/supabase';

export async function getEducation() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('end_year', { ascending: false, nullsLast: true });

  if (error) throw error;
  return data || [];
}
