'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import styles from '../login/Login.module.css';

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Contraseña actualizada con éxito. Redirigiendo...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>Actualizar Contraseña</h1>
      <p className={styles.subtitle}>Ingresa tu nueva contraseña</p>

      <form onSubmit={handleUpdate} className={styles.form}>
        <input 
          type="password" 
          placeholder="Nueva contraseña" 
          className={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success}>{message}</div>}

        <button type="submit" className={styles.submitBtn}>
          Guardar Contraseña
        </button>
      </form>
    </div>
  );
}
