'use client';

import { useState, useMemo } from 'react';
import type { UserData } from './actions';
import styles from './admin.module.css';

export default function AdminClient({ users }: { users: UserData[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const term = searchTerm.toLowerCase();
      return (
        user.email.toLowerCase().includes(term) ||
        user.fullName.toLowerCase().includes(term) ||
        user.chimeraUser.toLowerCase().includes(term)
      );
    });
  }, [users, searchTerm]);

  const activeChimeraUsers = useMemo(() => {
    return users.filter(u => u.chimeraUser && u.chimeraPassword).length;
  }, [users]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de Administración</h1>
        
        <div className={styles.searchBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#a1a1aa'}}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Buscar por email, nombre o usuario chimera..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Usuarios</span>
          <span className={styles.statValue}>{users.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Usuarios Activos (Chimera)</span>
          <span className={styles.statValue} style={{color: '#34d399'}}>{activeChimeraUsers}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Último Registro</span>
          <span className={styles.statValue} style={{fontSize: '1.25rem', marginTop: 'auto'}}>
            {users.length > 0 
              ? new Date(users.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt).toLocaleDateString()
              : 'N/A'
            }
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Status Chimera</th>
              <th>Credenciales Chimera</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className={styles.userRow}>
                  <td>
                    <div className={styles.userProfileCell}>
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.fullName} className={styles.userAvatar} />
                      ) : (
                        <div className={styles.userAvatar}>
                          {user.fullName.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.fullName}</span>
                        <span className={styles.userEmail}>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.chimeraBadge} ${user.chimeraUser && user.chimeraPassword ? styles.active : ''}`}>
                      {user.chimeraUser && user.chimeraPassword ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    {user.chimeraUser && user.chimeraPassword ? (
                      <div className={styles.chimeraInfoContainer}>
                        <div className={styles.chimeraDataLine}>
                          <span style={{color: '#a1a1aa'}}>U:</span> {user.chimeraUser}
                          <button onClick={() => handleCopy(user.chimeraUser)} className={styles.copyBtn} title="Copiar Usuario">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                        <div className={styles.chimeraDataLine}>
                          <span style={{color: '#a1a1aa'}}>P:</span> {user.chimeraPassword}
                          <button onClick={() => handleCopy(user.chimeraPassword)} className={styles.copyBtn} title="Copiar Contraseña">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span style={{color: '#a1a1aa', fontSize: '0.85rem'}}>Sin credenciales</span>
                    )}
                  </td>
                  <td style={{color: '#a1a1aa', fontSize: '0.9rem'}}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className={styles.emptyState}>
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
