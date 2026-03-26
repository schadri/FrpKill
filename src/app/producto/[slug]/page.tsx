import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/lib/scraper';
import { createClient } from '@/utils/supabase/server';
import BuyButtons from '@/components/BuyButtons';
import styles from './Detail.module.css';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { licenses, credits, conversionRate } = await getAllProducts();
  const allProducts: import('@/lib/scraper').Product[] = [...licenses, ...credits];
  
  const product = allProducts.find(p => p.slug === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { name, url, usdPrice, image, description } = product;
  const rate = conversionRate || 1400;
  
  let finalArs = '--';
  if (usdPrice !== null) {
    const rawArs = (usdPrice * rate) + 15000;
    const roundedArs = Math.ceil(rawArs / 1000) * 1000;
    finalArs = roundedArs.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  return (
    <main className={`container ${styles.detailContainer}`}>
      <Link href="/" className={styles.backButton}>
        ← Volver al inicio
      </Link>
      
      <div className={styles.contentGrid}>
        <div className={styles.imageColumn}>
          {image && (
            <div className={styles.imageWrapper}>
              <div className={styles.cardGlow}></div>
              <Image src={image} alt={name} fill className={styles.productImage} priority />
            </div>
          )}
        </div>
        
        <div className={styles.infoColumn}>
          <h1 className={styles.title}>{name}</h1>
          
          <div className={styles.priceBox}>
            <span className={styles.currencyLabel}>ARS</span>
            <span className={styles.priceValue}>${finalArs}</span>
          </div>

          <BuyButtons 
            product={product} 
            conversionRate={rate} 
            isLoggedIn={!!user} 
            isDetailView={true} 
          />
          
          {description && (
            <div className={styles.descriptionSection}>
              <div 
                className={styles.descriptionContent} 
                dangerouslySetInnerHTML={{ __html: description }} 
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
