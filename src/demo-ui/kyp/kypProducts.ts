/* Mock product directory for KYP name-search.
 *
 * Article IDs match the demo product in ProductDetailPage so any selected
 * result loads a real-looking profile. The detail page falls back to its
 * default product when an unknown ID is passed.
 */

export interface KypProduct {
  articleId: string;
  name: string;
  brand: string;
  category: string;
  priceInr: number;
}

export const kypProducts: KypProduct[] = [
  {
    articleId: '491296926',
    name: 'Pureit Mineral Classic RO + UV Water Purifier 6 L',
    brand: 'Pureit',
    category: 'Water Purifier',
    priceInr: 12599,
  },
  {
    articleId: '491298011',
    name: 'Pureit Eco Mineral RO 7 L',
    brand: 'Pureit',
    category: 'Water Purifier',
    priceInr: 14999,
  },
  {
    articleId: '512441088',
    name: 'AquaGuard Aura RO + UV + MTDS',
    brand: 'AquaGuard',
    category: 'Water Purifier',
    priceInr: 16990,
  },
  {
    articleId: '703918221',
    name: 'Voltbox 320L Frost-Free Double Door Refrigerator',
    brand: 'Voltbox',
    category: 'Refrigerator',
    priceInr: 38990,
  },
  {
    articleId: '703918774',
    name: 'Voltbox 240L Single Door Refrigerator',
    brand: 'Voltbox',
    category: 'Refrigerator',
    priceInr: 22999,
  },
  {
    articleId: '880411033',
    name: 'CoolWind 1.5 Ton 5-Star Split Inverter AC',
    brand: 'CoolWind',
    category: 'Air Conditioner',
    priceInr: 44990,
  },
  {
    articleId: '880411099',
    name: 'CoolWind 1.0 Ton 3-Star Window AC',
    brand: 'CoolWind',
    category: 'Air Conditioner',
    priceInr: 28990,
  },
  {
    articleId: '215008772',
    name: 'BrewMaster 1.5 L Electric Kettle Stainless',
    brand: 'BrewMaster',
    category: 'Small Appliance',
    priceInr: 1899,
  },
  {
    articleId: '215008812',
    name: 'BrewMaster 800W Induction Cooktop',
    brand: 'BrewMaster',
    category: 'Small Appliance',
    priceInr: 2799,
  },
  {
    articleId: '604227310',
    name: 'SonixBeats Pro Wireless Over-Ear Headphones',
    brand: 'SonixBeats',
    category: 'Audio',
    priceInr: 5499,
  },
];

const ID_RE = /^\d{4,}$/;

/** True when the query looks like an article ID (mostly digits). */
export function looksLikeArticleId(q: string): boolean {
  return ID_RE.test(q.trim());
}

/** Case-insensitive substring match across name/brand/category. */
export function searchProductsByName(query: string): KypProduct[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];
  return kypProducts.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}
