import { supabase } from '../lib/supabase';

export async function getSiteSettings() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateSiteSettings(payload) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_settings')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}
