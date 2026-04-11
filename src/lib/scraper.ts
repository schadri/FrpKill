import * as cheerio from 'cheerio';

export interface Product {
  name: string;
  url: string;
  usdPrice: number | null;
  error?: string;
  image?: string;
  description?: string;
  slug?: string;
}

export const licenses = [
  { 
    name: 'Licencia Basica 1 Año', 
    slug: 'licencia-basica-1-ano',
    url: 'https://gsmserver.es/chimera-tool-basic-1-year-license/', 
    image: '/licencias%20fotos/Basica.png',
    description: `
      <p><strong>Detalles de precios y licencia</strong></p>
      <ul>
        <li>Incluye hasta <strong>100 conexiones</strong> de teléfono anuales, sin límites mensuales o semanales.</li>
        <li>Cada conexión cuenta — exitosa o no — pero si conecta el mismo teléfono en el mismo modo y ejecuta múltiples procedimientos (por ejemplo, en un dispositivo Samsung en modo ADB, realiza reparación de IMEI y Patch Cert), solo se contará como una conexión.</li>
        <li>Más de <strong>30 marcas móviles</strong> compatibles, incluidos modelos populares de Samsung, Xiaomi, Huawei y más.</li>
        <li>La licencia se puede adjuntar a <strong>8 computadoras diferentes</strong> por año (2 computadoras diferentes por trimestre). Una computadora = una ranura. Puede volver a una computadora anterior sin usar una nueva ranura.</li>
        <li>Cada desconexión de dispositivo (intercambios) es posible cada <strong>48 horas</strong>.</li>
        <li>Si 8 intercambios por año no son suficientes, considere actualizar a Professional o Premium para cambios adicionales.</li>
        <li>Puede cambiar fácilmente entre sus computadoras desconectando su licencia de su computadora cada 48 horas. Esto le permite flexibilidad si trabaja en múltiples estaciones de trabajo, pero tenga cuidado: una vez que conecte 2 computadoras diferentes a su licencia, no podrá adjuntar más a menos que actualice su licencia.</li>
        <li>El paquete también incluye <strong>10 comprobaciones gratuitas</strong> de lista negra de IMEI + 10 comprobaciones gratuitas de bloqueos administrados de Samsung y un <strong>bono de licencia de 1 semana</strong> si extiende su suscripción antes de que expire.</li>
        <li>Sin embargo, no se incluyen créditos de procedimiento adicionales, y no puede conectar un Authenticator USB a este plan.</li>
        <li>Tenga en cuenta que el soporte de cliente prioritario no está incluido, pero aún tiene acceso a la documentación detallada de Chimera y los canales de soporte estándar.</li>
      </ul>
    `
  },
  { 
    name: 'Licencia Profesional 1 Año', 
    slug: 'licencia-profesional-1-ano',
    url: 'https://gsmserver.es/chimera-tool-professional-1-year-license/', 
    image: '/licencias%20fotos/profesional.png',
    description: `
      <p><strong>Detalles de precios y licencia</strong></p>
      <ul>
        <li>Incluye <strong>acceso completo a características</strong>, sin necesidad de créditos adicionales para reparación de IMEI o eliminación de FRP.</li>
        <li>Ya sea que administre un centro de reparación u opere como técnico independiente, esta licencia ofrece funcionalidad estable y completa para uso diario. Es particularmente ideal para flujos de trabajo de alto volumen, gracias a su eficiencia y modelo libre de crédito.</li>
        <li><strong>1.500 teléfonos</strong> pueden conectarse.</li>
        <li>La licencia se puede adjuntar a <strong>24 computadoras diferentes</strong> por año (6 computadoras diferentes cada trimestre). Una computadora = una ranura. Puede volver a una computadora anterior sin usar una nueva ranura.</li>
        <li>Bonificación de extensión: <strong>100 CRD + 2 semanas validez</strong>. Obtiene créditos gratuitos y validez de licencia extendida cada vez que renueva.</li>
        <li><strong>USB de Chimera Authenticator</strong> compatible.</li>
        <li>Cada desconexión de dispositivo (intercambios) es posible cada <strong>48 horas</strong>. Si 24 intercambios por año no son suficientes, actualice a Premium para más cambios.</li>
        <li><strong>50 comprobaciones gratuitas</strong> de lista negra de IMEI incluidas y 50 comprobaciones gratuitas de bloqueos administrados de Samsung incluidas.</li>
        <li>La licencia se ejecuta durante 12 meses.</li>
      </ul>
    `
  },
  { 
    name: 'Licencia Premium 1 Año', 
    slug: 'licencia-premium-1-ano',
    url: 'https://gsmserver.es/chimera-tool-premium-1-year-license/', 
    image: '/licencias%20fotos/Preimum.png',
    description: `
      <p><strong>Detalles de precios y licencia</strong></p>
      <ul>
        <li><strong>5.000 teléfonos</strong> pueden conectarse.</li>
        <li>La licencia se puede adjuntar a <strong>32 computadoras diferentes</strong> por año (8 computadoras diferentes cada trimestre). Una computadora = una ranura. Puede volver a una computadora anterior sin usar una nueva ranura.</li>
        <li>Cada desconexión de dispositivo (intercambios) es posible cada <strong>48 horas</strong>.</li>
        <li><strong>100 comprobaciones gratuitas</strong> de lista negra de IMEI incluidas y 100 comprobaciones gratuitas de bloqueos administrados de Samsung incluidas.</li>
        <li>Bonificación de extensión: <strong>150 CRD + 3 semanas validez</strong>. Obtiene créditos gratuitos y validez de licencia extendida cada vez que renueva.</li>
        <li><strong>USB de Chimera Authenticator</strong> compatible.</li>
        <li><strong>Sin costos de crédito</strong> para procedimientos estándar.</li>
        <li><strong>Soporte de cliente prioritario</strong>.</li>
        <li>Este es el paquete Chimera Tool más poderoso disponible, ideal para profesionales serios que desean escalar sus operaciones de manera eficiente y segura.</li>
      </ul>
    `
  },
];

export const credits = [
  { 
    name: 'Pack de 150 Creditos', 
    slug: 'pack-150-creditos', 
    url: 'https://gsmserver.es/chimera-small-function-pack-of-150-credits/', 
    image: '/Creditos/150%20creditos.png',
    description: `
      <p>Usted recibirá en su cuenta <strong>150 créditos</strong> del servidor Chimera Tool, que permiten realizar cualquier operación que requiere créditos.</p>
      <p>Para poder usar los créditos Chimera usted debe tener:</p>
      <ul>
        <li>Licencia Basica 1 Año</li>
        <li>Licencia Profesional 1 Año</li>
        <li>Licencia Premium 1 Año</li>
      </ul>
    `
  },
  { 
    name: 'Pack de 350 Creditos', 
    slug: 'pack-350-creditos', 
    url: 'https://gsmserver.es/chimera-medium-function-pack-of-350-credits/', 
    image: '/Creditos/350%20creditos.png',
    description: `
      <p>Usted recibirá en su cuenta <strong>350 créditos</strong> del servidor Chimera Tool, que permiten realizar cualquier operación que requiere créditos.</p>
      <p>Para poder usar los créditos Chimera usted debe tener:</p>
      <ul>
        <li>Licencia Basica 1 Año</li>
        <li>Licencia Profesional 1 Año</li>
        <li>Licencia Premium 1 Año</li>
      </ul>
    `
  },
  { 
    name: 'Pack de 1000 Creditos', 
    slug: 'pack-1000-creditos', 
    url: 'https://gsmserver.es/chimera-super-function-pack-of-1000-credits/', 
    image: '/Creditos/1000%20creditos.png',
    description: `
      <p>Usted recibirá en su cuenta <strong>1000 créditos</strong> del servidor Chimera Tool, que permiten realizar cualquier operación que requiere créditos.</p>
      <p>Para poder usar los créditos Chimera usted debe tener:</p>
      <ul>
        <li>Licencia Basica 1 Año</li>
        <li>Licencia Profesional 1 Año</li>
        <li>Licencia Premium 1 Año</li>
      </ul>
    `
  },
  { 
    name: 'Creditos test', 
    slug: 'creditos-test', 
    url: 'test', 
    image: '/Creditos/150%20creditos.png',
    description: `
      <p>Créditos de prueba con valor de 10 USD.</p>
    `
  },
];

const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export async function getDolarConversionRate(): Promise<number | null> {
  try {
    const response = await fetchWithTimeout('https://dolarhoy.com/', {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // The user provided the format: <div class="venta-wrapper"><div class="label">Venta</div><div class="val">$1400</div></div>
    const ventaValText = $('.venta-wrapper .val').first().text().trim();
    if (ventaValText) {
      const numberValue = parseFloat(ventaValText.replace(/[^0-9,.]/g, '').replace(',', '.'));
      if (!isNaN(numberValue)) {
        return numberValue;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    return null;
  }
}

export async function getProductPrice(url: string): Promise<number | null> {
  if (url === 'test') {
    return 10;
  }

  try {
    const response = await fetchWithTimeout(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Attempting common gsmserver price selectors:
    // They usually use something like `<div class="product-price">...</div>` or `<div class="price">...</div>`
    // Wait, let's fetch one via read_url_content or just try multiple potential matches if we don't know the exact class.
    
    // E.g., class="price" or itemprop="price"
    const priceText = $('[itemprop="price"]').attr('content') || $('.price').first().text().trim() || $('.current-price').first().text().trim() || $('.product-price').first().text().trim();
    
    if (priceText) {
      // Clean string to get only numbers and dot/comma
      const numberStr = priceText.replace(/[^\d.,]/g, '').replace(',', '.');
      const numberValue = parseFloat(numberStr);
      if (!isNaN(numberValue)) {
        return numberValue;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching product price from ${url}:`, error);
    return null;
  }
}

export async function getAllProducts() {
  const [conversionRate, ...licensePrices] = await Promise.all([
    getDolarConversionRate(),
    ...licenses.map(l => getProductPrice(l.url)),
  ]);

  const creditPricesStartIndex = licenses.length;
  const creditsFetched = await Promise.all(
    credits.map(c => getProductPrice(c.url))
  );

  const parsedLicenses = licenses.map((l, index) => ({
    ...l,
    usdPrice: licensePrices[index],
  }));

  const parsedCredits = credits.map((c, index) => ({
    ...c,
    usdPrice: creditsFetched[index],
  }));

  return {
    conversionRate,
    licenses: parsedLicenses,
    credits: parsedCredits,
  };
}
