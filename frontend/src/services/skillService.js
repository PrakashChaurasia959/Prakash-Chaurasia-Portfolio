import { supabase } from '../lib/supabase';

export async function getSkills() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true, nullsFirst: true })
    .order('name', { ascending: true });

  if (error) throw error;

  const grouped = new Map();
  (data || []).forEach((skill) => {
    const key = skill.category || 'General';
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(skill.name);
  });

  return Array.from(grouped.entries()).map(([category, items]) => ({ category, items }));
}
