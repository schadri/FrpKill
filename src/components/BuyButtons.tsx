'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './BuyButtons.module.css';
import type { Product } from '@/lib/scraper';

export default function BuyButtons({ 
  product, 
  conversionRate, 
  isLoggedIn,
  isDetailView = false
}: { 
  product: Product, 
  conversionRate: number, 
  isLoggedIn: boolean,
  isDetailView?: boolean
}) {
  const { addToCart, showToast } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, conversionRate);
    showToast('¡Se ha agregado al carrito!');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart(product, conversionRate);
    router.push('/cart');
  };

  return (
    <div className={isDetailView ? styles.detailContainer : styles.cardContainer}>
      <button onClick={handleAddToCart} className={styles.addBtn}>
        Agregar al Carrito
      </button>
      <button onClick={handleBuyNow} className={isDetailView ? styles.buyDetailBtn : styles.buyBtn}>
        {isDetailView ? 'Comprar Ahora' : 'Comprar'}
        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}
