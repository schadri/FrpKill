import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BuyButtons from './BuyButtons';
import styles from './ProductCard.module.css';
import type { Product } from '@/lib/scraper';

interface ProductCardProps {
  product: Product;
  conversionRate: number;
  isLoggedIn: boolean;
}

export default function ProductCard({ product, conversionRate, isLoggedIn }: ProductCardProps) {
  const { name, url, usdPrice, error, image, slug } = product;

  // Calculate final price. Allow some safety checks
  const formattedUsd = usdPrice !== null ? usdPrice.toFixed(2) : '--';
  
  let finalArs = '--';
  if (url === 'test') {
    finalArs = '10';
  } else if (usdPrice !== null) {
    const rawArs = (usdPrice * conversionRate) + 15000;
    const roundedArs = Math.ceil(rawArs / 1000) * 1000;
    finalArs = roundedArs.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // If there is a slug, navigate internally. Otherwise, go to external store
  const targetUrl = slug ? `/producto/${slug}` : url;
  const isExternal = !slug;

  return (
    <Link 
      href={targetUrl} 
      target={isExternal ? "_blank" : undefined} 
      rel={isExternal ? "noopener noreferrer" : undefined} 
      className={`${styles.card} ${styles.clickable}`}
    >
      <div className={styles.cardGlow}></div>
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{name}</h3>
        {image && (
          <div className={styles.imageContainer}>
            <Image src={image} alt={name} fill className={styles.productImage} />
          </div>
        )}
        
        {error ? (
          <div className={styles.error}>Error fetching price</div>
        ) : (
          <div className={styles.pricing}>
            <div className={styles.arsPrice}>
              <span className={styles.currencyLabel}>ARS</span>
              <span className={styles.arsValue}>${finalArs}</span>
            </div>
          </div>
        )}
        
        <div className={styles.actionsWrapper}>
          <BuyButtons product={product} conversionRate={conversionRate} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </Link>
  );
}
