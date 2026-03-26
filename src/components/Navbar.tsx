import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import CartIcon from './CartIcon';
import UserDropdown from './UserDropdown';
import styles from './Navbar.module.css';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          FRP KILL
        </Link>
        <div className={styles.actions}>
          <CartIcon />
          {user ? (
            <UserDropdown email={user.email} avatarUrl={avatarUrl} />
          ) : (
            <Link href="/login" className={styles.authButton}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
