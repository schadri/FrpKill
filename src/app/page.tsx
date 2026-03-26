import { getAllProducts } from '@/lib/scraper';
import ProductCard from '@/components/ProductCard';
import TrustBanner from '@/components/TrustBanner';
import { createClient } from '@/utils/supabase/server';
import './globals.css';

export default async function Home() {
  const { conversionRate, licenses, credits } = await getAllProducts();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <main className="container animate-in">
      <h1 className="page-title">Obtené tu licencia oficial<br /> Facil, Rápido y Seguro</h1>
      <h2 className="page-subtitle">Solo para Argentina</h2>

      <TrustBanner />

      <h3 className="section-title">Licencias</h3>
      <div className="products-grid">
        {licenses.map((license, idx) => (
          <ProductCard
            key={`license-${idx}`}
            product={license}
            conversionRate={conversionRate || 1400} // Falback if error
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      <h3 className="section-title">Créditos</h3>
      <div className="products-grid">
        {credits.map((credit, idx) => (
          <ProductCard
            key={`credit-${idx}`}
            product={credit}
            conversionRate={conversionRate || 1400} // Fallback if error
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </main>
  );
}
