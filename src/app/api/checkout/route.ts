import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Initialize the MercadoPago client
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  // options: { timeout: 5000 }
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error('MERCADOPAGO_ACCESS_TOKEN no está configurado en .env.local');
      return NextResponse.json(
        { error: 'El sistema de pagos no está configurado (Falta el Token de MercadoPago).' },
        { status: 500 }
      );
    }

    // Map cart items exactly to Mercado Pago's expected schema
    const mpItems = items.map((cartItem: any) => ({
      id: cartItem.product.slug ? String(cartItem.product.slug) : 'item',
      title: cartItem.product.name ? String(cartItem.product.name).substring(0, 250) : 'Producto Chimera',
      currency_id: 'ARS',
      picture_url: cartItem.product.image ? `https://ui-avatars.com/api/?name=FRP` : undefined, // safer generic URL or leave undefined
      description: `Compra en FRP KILL: ${cartItem.product.name}`.substring(0, 250),
      category_id: 'services',
      quantity: Number(cartItem.quantity) || 1,
      unit_price: Number(cartItem.finalArs),
    }));

    const origin = new URL(req.url).origin;
    const isLocalhost = origin.includes('localhost');

    const preference = new Preference(client);

    // Create the preference using the SDK
    const response = await preference.create({
      body: {
        items: mpItems,
        back_urls: {
          success: `${origin}/profile?payment=success`,
          failure: `${origin}/cart?payment=failure`,
          pending: `${origin}/cart?payment=pending`,
        },
        auto_return: isLocalhost ? undefined : 'approved',
      }
    });

    return NextResponse.json({ init_point: response.init_point });

  } catch (error: any) {
    console.error('Error detallado creando preferencia MP:', error);
    return NextResponse.json({ 
      error: error.message ? `MP Rechazó el pago: ${error.message}` : 'Ocurrió un error al procesar el pago con Mercado Pago. Verifica tu Token.' 
    }, { status: 500 });
  }
}
