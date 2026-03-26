import { getDolarConversionRate, getProductPrice } from './src/lib/scraper';

async function main() {
  console.log('Testing DolarHoy...');
  const rate = await getDolarConversionRate();
  console.log('Dolar rate:', rate);

  console.log('Testing GSMServer...');
  const price = await getProductPrice('https://gsmserver.es/chimera-tool-basic-1-year-license/');
  console.log('License price:', price);
}

main().catch(console.error);
