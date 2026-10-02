import { supabase } from '../lib/supabase';

export async function getCertificates() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issue_date', { ascending: false, nullsLast: true });

  if (error) throw error;
  return data || [];
}
