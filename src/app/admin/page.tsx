import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAllUsers } from './actions';
import AdminClient from './AdminClient';

// You can add more emails here in the future
const ADMIN_EMAILS = ['lopatomandan@gmail.com'];

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if current user is an admin
  if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
    // If not admin, redirect to profile or home
    redirect('/profile');
  }

  // Fetch all users safely via the admin action
  const users = await getAllUsers();

  return (
    <main className="container animate-in">
      <AdminClient users={users} />
    </main>
  );
}
