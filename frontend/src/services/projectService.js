import { supabase } from '../lib/supabase';

export async function getProjects() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createProject(project) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id, project) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  if (!supabase) return null;

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
}
