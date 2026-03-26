import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UpdatePasswordForm from './UpdatePasswordForm';

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="container animate-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <UpdatePasswordForm />
    </main>
  );
}
