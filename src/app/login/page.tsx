import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <main className="container animate-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <LoginForm />
    </main>
  );
}
