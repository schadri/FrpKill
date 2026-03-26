'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from './Navbar.module.css';

interface UserDropdownProps {
  email: string | undefined;
  avatarUrl: string | undefined;
}

export default function UserDropdown({ email, avatarUrl }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/'; // force full refresh to reset server auth state
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.avatarButton}
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Perfil" 
            className={styles.avatar} 
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {email ? email[0].toUpperCase() : 'U'}
          </div>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownEmail}>{email}</span>
          </div>
          <div className={styles.dropdownBody}>
            <Link 
              href="/profile" 
              className={styles.profileLink}
              onClick={() => setIsOpen(false)}
            >
              Mi Perfil
            </Link>
            <button onClick={handleSignOut} className={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
