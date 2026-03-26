import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="container animate-in">
      <ProfileClient 
        user={{
          email: user.email,
          fullName: user.user_metadata?.full_name || '',
          avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || ''
        }} 
      />
    </main>
  );
}
