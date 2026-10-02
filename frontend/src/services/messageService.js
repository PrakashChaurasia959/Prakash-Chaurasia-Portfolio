import { supabase } from '../lib/supabase';

export async function getMessages() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createMessage(payload) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('messages')
    .insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject || 'Portfolio enquiry',
      message: payload.message,
      status: 'new',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMessageStatus(id, status) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMessage(id) {
  if (!supabase) return null;

  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
  return true;
}
