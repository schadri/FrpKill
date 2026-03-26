'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalArs } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (amount: number) => {
    return amount.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error procesando el pago');
      }
      
      if (data.init_point) {
        // Redirect standard window location to Mercado Pago's checkout url
        window.location.href = data.init_point;
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="container animate-in">
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestras licencias y créditos para empezar.</p>
          <Link href="/" className={styles.primaryBtn}>
            Ver Productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container animate-in">
      <h1 className={styles.pageTitle}>Tu Carrito</h1>
      
      <div className={styles.grid}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.product.slug} className={styles.cartItem}>
              {item.product.image && (
                <div className={styles.itemImage}>
                  <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'contain' }} />
                </div>
              )}
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.product.name}</h3>
                <div className={styles.itemPrice}>
                  <span>ARS</span> ${formatPrice(item.finalArs)}
                </div>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button 
                    onClick={() => updateQuantity(item.product.slug!, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.slug!, item.quantity + 1)}
                  >+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.slug!)} 
                  className={styles.removeBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className={styles.clearBtn}>
            Vaciar carrito
          </button>
        </div>

        <div className={styles.summarySidebar}>
          <div className={styles.summaryCard}>
            <h3>Resumen de orden</h3>
            <div className={styles.summaryRow}>
              <span>Productos ({totalItems}):</span>
              <span>ARS ${formatPrice(totalArs)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Impuestos:</span>
              <span>Incluidos</span>
            </div>
            <hr className={styles.divider} />
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total:</span>
              <span>ARS ${formatPrice(totalArs)}</span>
            </div>

            {error && <div className={styles.errorBanner}>{error}</div>}

            <button 
              className={styles.checkoutBtn} 
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Finalizar Compra'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
