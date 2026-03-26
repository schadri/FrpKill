'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import styles from './Profile.module.css';

interface UserData {
  email: string | undefined;
  fullName: string;
  avatarUrl: string;
}

export default function ProfileClient({ user }: { user: UserData }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'purchases'>('profile');
  
  // Form states
  const [fullName, setFullName] = useState(user.fullName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [purchases, setPurchases] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, totalArs, clearCart } = useCart();
  const supabase = createClient();

  useEffect(() => {
    // Load absolute purchases from Supabase DB
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setPurchases(data);
      }
    };
    
    fetchOrders();

    // Check successful payment from Mercado Pago
    if (searchParams.get('payment') === 'success' || searchParams.get('status') === 'approved') {
      const currentCartRaw = localStorage.getItem('shopping_cart');
      const currentCart = currentCartRaw ? JSON.parse(currentCartRaw) : items;

      if (currentCart && currentCart.length > 0) {
        const processOrder = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const newOrder = {
            user_id: user.id,
            order_number: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
            items: currentCart.map((i: any) => `${i.quantity}x ${i.product.name}`).join(', '),
            total_ars: `$${currentCart.reduce((acc: number, val: any) => acc + val.finalArs * val.quantity, 0).toLocaleString('es-AR')} ARS`,
            status: 'Completado'
          };

          const { error: insertError } = await supabase.from('orders').insert([newOrder]);

          if (!insertError) {
            fetchOrders(); // Refresh table exactly as it is in the DB
            clearCart();
            setMessage('¡Pago completado con éxito! Tus artículos han sido agregados permanentemente a tu historial de compras.');
            setActiveTab('purchases');
          } else {
            console.error(insertError);
            setError('Error de base de datos guardando la orden. Habla con soporte.');
          }

          router.replace('/profile');
        };

        processOrder();
      }
    }
  }, [searchParams, items, clearCart, router, supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const updates: any = {
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      }
    };

    if (email !== user.email) {
      updates.email = email;
    }
    if (password.length > 0) {
      updates.password = password;
    }

    const { error: updateError } = await supabase.auth.updateUser(updates);

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Perfil actualizado exitosamente. Algunos cambios como el email pueden requerir confirmación enviada a tu bandeja de entrada.');
      if (password.length > 0) setPassword('');
    }
    setLoading(false);
  };

  const mockPurchases = [
    { id: 'ORD-2026-8812', date: '24 Mar 2026', items: 'Licencia Profesional 1 Año', total: '$145,000 ARS', status: 'Completado' },
    { id: 'ORD-2025-4491', date: '12 Nov 2025', items: 'Pack de 350 Creditos', total: '$55,000 ARS', status: 'Completado' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Mi Perfil</h1>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.avatarOverview}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className={styles.largeAvatar} referrerPolicy="no-referrer" />
            ) : (
              <div className={styles.largeAvatarPlaceholder}>
                {user.email ? user.email[0].toUpperCase() : 'U'}
              </div>
            )}
            <p className={styles.sidebarName}>{fullName || 'Usuario Conectado'}</p>
            <p className={styles.sidebarEmail}>{user.email}</p>
          </div>

          <nav className={styles.navMenu}>
            <button 
              className={`${styles.navBtn} ${activeTab === 'profile' ? styles.active : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Configuración de Cuenta
            </button>
            <button 
              className={`${styles.navBtn} ${activeTab === 'purchases' ? styles.active : ''}`}
              onClick={() => setActiveTab('purchases')}
            >
              Mis Compras
            </button>
          </nav>
        </aside>

        <section className={styles.content}>
          {activeTab === 'profile' && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Actualizar Perfil</h2>
              <form onSubmit={handleUpdateProfile} className={styles.formContainer}>
                
                <div className={styles.inputGroup}>
                  <label>Nombre Completo</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ej. Juan Pérez" />
                </div>

                <div className={styles.inputGroup}>
                  <label>URL de Foto de Perfil (Avatar)</label>
                  <input type="url" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://ejemplo.com/mifoto.jpg" />
                  <small>Pega el enlace directo a una imagen para actualizar tu foto de perfil.</small>
                </div>

                <hr className={styles.divider} />

                <div className={styles.inputGroup}>
                  <label>Correo Electrónico</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className={styles.inputGroup}>
                  <label>Cambiar Contraseña</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Dejar en blanco para no cambiar" />
                </div>

                {error && <div className={styles.errorBanner}>{error}</div>}
                {message && <div className={styles.successBanner}>{message}</div>}

                <div className={styles.actions}>
                  <button type="submit" disabled={loading} className={styles.saveBtn}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Historial de Compras</h2>
              <p className={styles.cardSubtitle}>Aquí aparecerán tus licencias y créditos adquiridos recientemente.</p>
              
              <div className={styles.tableContainer}>
                {purchases.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    <p>Aún no tienes compras registradas.</p>
                  </div>
                ) : (
                  <table className={styles.purchasesTable}>
                    <thead>
                      <tr>
                        <th>Orden</th>
                        <th>Fecha</th>
                        <th>Artículos</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase: any) => (
                        <tr key={purchase.id}>
                          <td>{purchase.order_number}</td>
                          <td>{new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(purchase.created_at))}</td>
                          <td>{purchase.items}</td>
                          <td>{purchase.total_ars}</td>
                          <td><span className={styles.statusBadge}>{purchase.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
