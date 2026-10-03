import emailjs from '@emailjs/browser';
import { supabase } from './api';

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

  const { error } = await supabase
    .from('messages')
    .insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject || 'Portfolio enquiry',
      message: payload.message,
      status: 'new',
    });

  if (error) throw error;

  // Send email notification through EmailJS
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        title: payload.subject || 'Portfolio enquiry',
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  } catch (emailError) {
    console.error('EmailJS notification failed:', emailError);
  }

  return true;
}

export async function updateMessageStatus(id, status) {
  if (!supabase) return null;

  const { error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', id);

  if (error) throw error;

  return true;
}

export async function deleteMessage(id) {
  if (!supabase) return null;

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return true;
}
