/**
 * Procurement module mock data — ported verbatim from the ShopOS reference
 * design (/Downloads/ShopOS/procurement-*.jsx). Content domain matches the
 * mockups (grocery / multi-category kirana store).
 */

export type POStatus = 'DELIVERED' | 'IN-TRANSIT' | 'DELAYED' | 'AWAITING' | 'DRAFT';
export type PayStatus = 'PAID' | 'PARTIAL' | 'UNPAID';
export type TrustTier = 'TRUSTED' | 'STABLE' | 'NEW' | 'WATCH' | 'BLOCKED';

export interface Mono {
  tint: string;
  glyph: string;
}

/* ── INSIGHTS ─────────────────────────────────────────────── */
export const aiPlan = {
  posRecommended: 18,
  projectedSpend: '₹3.2L',
  demandCoverage: 94,
  savings: '₹22K',
};

export interface VendorInsight {
  mono: Mono;
  name: string;
  sub: string;
  score: number;
  metric: string;
  unit: string;
  delta: string;
  deltaTone: 'up' | 'down';
}

export interface ProductInsight {
  thumb: Mono;
  name: string;
  sub: string;
  metric: string;
  unit: string;
  delta?: string;
  deltaTone?: 'up' | 'down';
}

export const topVendors: VendorInsight[] = [
  { mono: { tint: '#22322A', glyph: 'SA' }, name: 'Surya Agencies', sub: 'GROCERY · 42 orders', score: 5, metric: '98%', unit: 'ON-TIME', delta: '3%', deltaTone: 'up' },
  { mono: { tint: '#22322F', glyph: 'ND' }, name: 'Nivea Distributors', sub: 'BEAUTY · 28 orders', score: 5, metric: '96%', unit: 'ON-TIME', delta: '2%', deltaTone: 'up' },
  { mono: { tint: '#23323A', glyph: 'BZ' }, name: 'Boat Zone Wholesale', sub: 'AUDIO · 18 orders', score: 4, metric: '92%', unit: 'ON-TIME', delta: '1%', deltaTone: 'up' },
];

export const topVendorRecos = [
  'Shift Aashirvaad atta orders to Surya Agencies — 6.2% better unit price at same delivery SLA.',
  'Lock 90-day rate card with Nivea Distributors before May 30 (volume tier expires).',
];

export const procureNow: ProductInsight[] = [
  { thumb: { tint: '#3A2522', glyph: 'AT' }, name: 'Aashirvaad Atta 5kg', sub: '6 left · sells 9/day · 16h cover', metric: '40', unit: 'SUGGESTED QTY', delta: 'OUT IN 16h', deltaTone: 'down' },
  { thumb: { tint: '#3A2725', glyph: 'TT' }, name: 'Tata Tea Premium 1kg', sub: '12 left · sells 7/day · 1.7d cover', metric: '60', unit: 'SUGGESTED QTY', delta: 'LOW', deltaTone: 'down' },
  { thumb: { tint: '#22293A', glyph: 'CL' }, name: 'Cooler 50L', sub: 'Pre-monsoon demand · +27% trend', metric: '12', unit: 'SUGGESTED QTY', delta: '+27%', deltaTone: 'up' },
];

export const procureNowRecos = [
  'Bundle Aashirvaad atta + Tata tea into a single PO to Surya — saves 1 freight slot.',
  'Skip the cooler reorder if vendor cannot ship by May 24 — heat-wave window closes May 28.',
];

export const costOpt: ProductInsight[] = [
  { thumb: { tint: '#332E22', glyph: 'MG' }, name: 'Maggi 70g · 12 pack', sub: 'Star Foods · ₹118/pack', metric: '−4.2%', unit: 'BETTER OFFER', delta: '₹6.3K SAVE', deltaTone: 'up' },
  { thumb: { tint: '#2F2426', glyph: 'CC' }, name: 'Coca-Cola 750ml', sub: 'Cola Depot · ₹40.20/unit', metric: '−4.5%', unit: 'MEDIAN', delta: '₹4.8K SAVE', deltaTone: 'up' },
];

export const costOptRecos = [
  'Move Maggi from Star Foods to BigBasket B2B — 4.2% lower at 200+ unit slab.',
  'Coca-Cola: ask current vendor to match marketplace median ₹38.40 (you currently pay ₹40.20).',
];

export const vendorsToWatch: VendorInsight[] = [
  { mono: { tint: '#3A2522', glyph: 'CD' }, name: 'Cola Depot', sub: 'BEVERAGE · 14 orders', score: 2, metric: '64%', unit: 'ON-TIME', delta: '11%', deltaTone: 'down' },
  { mono: { tint: '#3A2326', glyph: 'KH' }, name: 'Kurta House', sub: 'APPAREL · 9 orders', score: 2, metric: '22%', unit: 'RETURNS', delta: '5%', deltaTone: 'down' },
  { mono: { tint: '#322826', glyph: 'EW' }, name: 'Earphone World', sub: 'AUDIO · 6 orders', score: 3, metric: '18%', unit: 'RETURNS', delta: '3%', deltaTone: 'down' },
];

export const vendorsToWatchRecos = [
  'Cola Depot — 3 of last 5 deliveries late by 2+ days. Get a backup vendor before next reorder.',
  'Kurta House: 22% return rate on M-size lot. Withhold next PO until quality audit clears.',
];

export const marketplaceFinds: VendorInsight[] = [
  { mono: { tint: '#2A2438', glyph: 'GL' }, name: 'Greenleaf Organics', sub: 'GROCERY · MARKETPLACE', score: 4, metric: '−8%', unit: 'VS SURYA', delta: 'VERIFIED', deltaTone: 'up' },
  { mono: { tint: '#2A2538', glyph: 'FB' }, name: 'FreshBev Supply', sub: 'BEVERAGE · MARKETPLACE', score: 4, metric: '−5%', unit: 'VS COLA DEPOT', delta: 'VERIFIED', deltaTone: 'up' },
  { mono: { tint: '#2B2538', glyph: 'MM' }, name: 'MetroMart B2B', sub: 'MULTI-CAT · MARKETPLACE', score: 3, metric: '−3%', unit: 'AVG SAVING', delta: 'NEW', deltaTone: 'up' },
];

export const marketplaceRecos = [
  'Greenleaf Organics offers 8% lower atta than Surya at comparable SLA — request a sample lot.',
  'FreshBev is verified by 3 nearby stores; consider as Coca-Cola backup.',
];

/* ── DASHBOARD ────────────────────────────────────────────── */
export const delivery = { delivered: 42, transit: 11, delayed: 4 };

export const spendOverTime: [string, number][] = [
  ['W1', 56], ['W2', 72], ['W3', 64], ['W4', 88],
  ['W5', 74], ['W6', 96], ['W7', 82], ['W8', 108],
];

export const qualityBreakdown: [string, number, string][] = [
  ['Accepted', 88, 'green'],
  ['Partial', 8, 'amber'],
  ['Rejected', 4, 'redSoft'],
];
export const qualityValues = ['₹16.2L', '₹1.5L', '₹0.7L'];

export const vendorTrustDist: [string, number, string][] = [
  ['TRUSTED', 18, 'green'],
  ['STABLE', 14, 'fg'],
  ['NEW', 6, 'tilePurple'],
  ['WATCH', 4, 'amber'],
  ['BLOCKED', 1, 'redSoft'],
];

export const spendByCategory: [string, number, string][] = [
  ['Grocery & Staples', 36, '₹6.6L'],
  ['Beverages', 22, '₹4.0L'],
  ['Personal Care', 18, '₹3.3L'],
  ['Apparel', 14, '₹2.6L'],
  ['Home & Kitchen', 10, '₹1.9L'],
];

export const payments = {
  total: '₹2.8L',
  deltaPct: '4.2%',
  buckets: [
    ['DUE TODAY', '₹0.6L', 'redSoft'],
    ['THIS WEEK', '₹1.4L', 'amber'],
    ['LATER', '₹0.8L', 'fgMuted'],
  ] as [string, string, string][],
};

/* ── PROCUREMENT LIST ─────────────────────────────────────── */
export interface PORow {
  po: string;
  vendor: string;
  vendorMono: Mono;
  items: number;
  amount: string;
  status: POStatus;
  pay: PayStatus;
}

export const poRows: PORow[] = [
  { po: 'PO-2086', vendor: 'Surya Agencies', vendorMono: { tint: '#22322A', glyph: 'SA' }, items: 6, amount: '₹68K', status: 'IN-TRANSIT', pay: 'PARTIAL' },
  { po: 'PO-2085', vendor: 'Nivea Distributors', vendorMono: { tint: '#22322F', glyph: 'ND' }, items: 4, amount: '₹42K', status: 'IN-TRANSIT', pay: 'UNPAID' },
  { po: 'PO-2084', vendor: 'Cola Depot', vendorMono: { tint: '#3A2522', glyph: 'CD' }, items: 3, amount: '₹28K', status: 'DELAYED', pay: 'PARTIAL' },
  { po: 'PO-2083', vendor: 'Boat Zone Wholesale', vendorMono: { tint: '#23323A', glyph: 'BZ' }, items: 2, amount: '₹54K', status: 'DELIVERED', pay: 'PAID' },
  { po: 'PO-2082', vendor: 'Star Foods', vendorMono: { tint: '#2E2A1F', glyph: 'SF' }, items: 8, amount: '₹38K', status: 'DELIVERED', pay: 'PAID' },
  { po: 'PO-2081', vendor: 'Himalaya Wellness', vendorMono: { tint: '#22302A', glyph: 'HW' }, items: 5, amount: '₹22K', status: 'DELIVERED', pay: 'PAID' },
  { po: 'PO-2080', vendor: 'Kurta House', vendorMono: { tint: '#3A2326', glyph: 'KH' }, items: 3, amount: '₹46K', status: 'DELIVERED', pay: 'PAID' },
  { po: 'PO-2079', vendor: 'Surya Agencies', vendorMono: { tint: '#22322A', glyph: 'SA' }, items: 4, amount: '₹56K', status: 'DELIVERED', pay: 'PAID' },
];

export const listFilters: { key: string; label: string; count: number }[] = [
  { key: 'ALL', label: 'ALL', count: 57 },
  { key: 'IN-TRANSIT', label: 'IN-TRANSIT', count: 11 },
  { key: 'DELAYED', label: 'DELAYED', count: 4 },
  { key: 'DELIVERED', label: 'DELIVERED', count: 42 },
  { key: 'AWAITING', label: 'AWAITING PO', count: 3 },
];

/* ── NEW PROCUREMENT FLOW ─────────────────────────────────── */
export interface LibItem {
  id: string;
  thumb: Mono;
  name: string;
  sub: string;
  stock: string;
  aiQty: number;
  unit: string;
  basis: string;
}

export const itemsLib: LibItem[] = [
  { id: 'ATA', thumb: { tint: '#3A2522', glyph: 'AT' }, name: 'Aashirvaad Atta 5kg', sub: 'GROCERY · SKU-1042', stock: '6 left · 16h cover', aiQty: 40, unit: '₹260/bag', basis: '30d velocity 9/day · safety 7d' },
  { id: 'TTP', thumb: { tint: '#3A2725', glyph: 'TT' }, name: 'Tata Tea Premium 1kg', sub: 'GROCERY · SKU-0218', stock: '12 left · 1.7d cover', aiQty: 60, unit: '₹420/kg', basis: '30d velocity 7/day · safety 7d' },
  { id: 'NBL', thumb: { tint: '#33282A', glyph: 'NL' }, name: 'Nivea Body Lotion 400ml', sub: 'BEAUTY · SKU-1184', stock: '0 left · OUT', aiQty: 24, unit: '₹185/btl', basis: '4 orders queued · 30d avg 3/day' },
  { id: 'CL50', thumb: { tint: '#22323A', glyph: 'CL' }, name: 'Cooler 50L', sub: 'APPLIANCE', stock: 'NEW SKU', aiQty: 12, unit: '₹4.6K/u', basis: 'Pre-monsoon trend +27% · 4w window' },
];

export interface CompareVendor {
  id: string;
  mono: Mono;
  name: string;
  tag: string;
  cost: string;
  costDelta: string;
  eta: string;
  etaNote: string;
  quality: string;
  qualityNote: string;
  trust: number;
  aiPick?: boolean;
}

export const compareVendors: CompareVendor[] = [
  { id: 'SA', mono: { tint: '#22322A', glyph: 'SA' }, name: 'Surya Agencies', tag: 'PREFERRED · MAPPED', cost: '₹248', costDelta: '−4.6%', eta: '1 day', etaNote: 'tomorrow 4pm', quality: '98%', qualityNote: '42 past POs', trust: 5, aiPick: true },
  { id: 'BB', mono: { tint: '#22302A', glyph: 'BB' }, name: 'BigBasket B2B', tag: 'MAPPED', cost: '₹252', costDelta: '−3.1%', eta: '2 days', etaNote: 'May 21', quality: '94%', qualityNote: '14 past POs', trust: 4 },
  { id: 'SF', mono: { tint: '#2E2A1F', glyph: 'SF' }, name: 'Star Foods', tag: 'MAPPED', cost: '₹268', costDelta: '+3.1%', eta: '3 days', etaNote: 'May 22', quality: '90%', qualityNote: '22 past POs', trust: 3 },
  { id: 'GL', mono: { tint: '#2A2438', glyph: 'GL' }, name: 'Greenleaf Organics', tag: 'MARKETPLACE · NEW', cost: '₹242', costDelta: '−6.9%', eta: '3 days', etaNote: 'May 22', quality: '—', qualityNote: 'no past PO', trust: 4 },
];

/* ── PO TRACKING SHEET ────────────────────────────────────── */
export const trackingSteps: { label: string; sub: string; done?: boolean; active?: boolean }[] = [
  { label: 'PO created', sub: 'May 16 · 11:42 AM', done: true },
  { label: 'Vendor accepted', sub: 'May 16 · 12:08 PM', done: true },
  { label: 'Advance paid (50%)', sub: 'May 16 · ₹34,000 · UPI', done: true },
  { label: 'Shipped from warehouse', sub: 'May 17 · 8:14 PM', done: true },
  { label: 'Out for delivery', sub: 'ETA tomorrow 4:00 PM', active: true },
  { label: 'Quality check + receive', sub: 'Pending' },
  { label: 'Final payment', sub: 'Due May 19 · ₹34,000' },
];

export const poItems: ProductInsight[] = [
  { thumb: { tint: '#3A2522', glyph: 'AT' }, name: 'Aashirvaad Atta 5kg', sub: '₹248/bag · GROCERY', metric: '×40', unit: '₹9.9K' },
  { thumb: { tint: '#3A2725', glyph: 'TT' }, name: 'Tata Tea Premium 1kg', sub: '₹412/kg · GROCERY', metric: '×60', unit: '₹24.7K' },
  { thumb: { tint: '#332B1F', glyph: 'MG' }, name: 'Maggi 70g · 12 pack', sub: '₹114/pack · GROCERY', metric: '×80', unit: '₹9.1K' },
  { thumb: { tint: '#2D2A2A', glyph: 'PG' }, name: 'Parle-G 80g', sub: '₹9.60/pack · GROCERY', metric: '×500', unit: '₹4.8K' },
  { thumb: { tint: '#2F2426', glyph: 'CC' }, name: 'Coca-Cola 750ml', sub: '₹38.40/u · BEVERAGE', metric: '×120', unit: '₹4.6K' },
  { thumb: { tint: '#26212F', glyph: 'CM' }, name: 'Colgate MaxFresh 200g', sub: '₹98/u · BEAUTY', metric: '×150', unit: '₹14.7K' },
];

/* ── VENDORS ──────────────────────────────────────────────── */
export interface VendorRow {
  mono: Mono;
  name: string;
  cat: string;
  tier: TrustTier;
  score: string;
  onTime: string;
  returns: string;
  spend: string;
  orders: number;
}

export const vendorRows: VendorRow[] = [
  { mono: { tint: '#22322A', glyph: 'SA' }, name: 'Surya Agencies', cat: 'GROCERY', tier: 'TRUSTED', score: '4.9', onTime: '98%', returns: '0.4%', spend: '₹4.2L', orders: 42 },
  { mono: { tint: '#22322F', glyph: 'ND' }, name: 'Nivea Distributors', cat: 'BEAUTY', tier: 'TRUSTED', score: '4.8', onTime: '96%', returns: '0.9%', spend: '₹2.8L', orders: 28 },
  { mono: { tint: '#23323A', glyph: 'BZ' }, name: 'Boat Zone Wholesale', cat: 'AUDIO', tier: 'TRUSTED', score: '4.6', onTime: '92%', returns: '1.2%', spend: '₹2.1L', orders: 18 },
  { mono: { tint: '#22302A', glyph: 'HW' }, name: 'Himalaya Wellness', cat: 'BEAUTY', tier: 'TRUSTED', score: '4.7', onTime: '95%', returns: '1.0%', spend: '₹1.6L', orders: 16 },
  { mono: { tint: '#2E2A1F', glyph: 'SF' }, name: 'Star Foods', cat: 'GROCERY', tier: 'STABLE', score: '4.1', onTime: '88%', returns: '2.4%', spend: '₹1.4L', orders: 22 },
  { mono: { tint: '#22302A', glyph: 'BB' }, name: 'BigBasket B2B', cat: 'MULTI-CAT', tier: 'STABLE', score: '4.3', onTime: '90%', returns: '1.8%', spend: '₹1.2L', orders: 14 },
  { mono: { tint: '#3A2522', glyph: 'CD' }, name: 'Cola Depot', cat: 'BEVERAGE', tier: 'WATCH', score: '3.0', onTime: '64%', returns: '4.6%', spend: '₹98K', orders: 14 },
  { mono: { tint: '#3A2326', glyph: 'KH' }, name: 'Kurta House', cat: 'APPAREL', tier: 'WATCH', score: '2.6', onTime: '78%', returns: '22%', spend: '₹68K', orders: 9 },
  { mono: { tint: '#322826', glyph: 'EW' }, name: 'Earphone World', cat: 'AUDIO', tier: 'WATCH', score: '3.1', onTime: '82%', returns: '18%', spend: '₹54K', orders: 6 },
  { mono: { tint: '#2A2438', glyph: 'GL' }, name: 'Greenleaf Organics', cat: 'GROCERY', tier: 'NEW', score: '—', onTime: '—', returns: '—', spend: '₹0', orders: 0 },
  { mono: { tint: '#2A2538', glyph: 'FB' }, name: 'FreshBev Supply', cat: 'BEVERAGE', tier: 'NEW', score: '—', onTime: '—', returns: '—', spend: '₹0', orders: 0 },
  { mono: { tint: '#3A2A22', glyph: 'TF' }, name: 'Trendy Fashions', cat: 'APPAREL', tier: 'BLOCKED', score: '1.4', onTime: '52%', returns: '38%', spend: '₹24K', orders: 4 },
];

export const vendorFilters: { key: string; label: string; count: number }[] = [
  { key: 'ALL', label: 'ALL', count: 43 },
  { key: 'TRUSTED', label: 'TRUSTED', count: 18 },
  { key: 'STABLE', label: 'STABLE', count: 14 },
  { key: 'NEW', label: 'NEW', count: 6 },
  { key: 'WATCH', label: 'WATCH', count: 4 },
  { key: 'BLOCKED', label: 'BLOCKED', count: 1 },
];

/* ── VENDOR PROFILE (sample: Surya Agencies) ──────────────── */
export const vendorProfile = {
  name: 'Surya Agencies',
  glyph: 'SA',
  tint: '#22322A',
  sub: 'GROCERY · KORAMANGALA, BENGALURU',
  tier: 'TRUSTED' as TrustTier,
  score: '4.9',
  stats: [
    ['POs', '42', 'fg'],
    ['ON-TIME', '98%', 'green'],
    ['QUALITY', '99.6%', 'green'],
  ] as [string, string, string][],
  lifetimeSpend: '₹4.2L',
  paymentTerms: 'NET-15 · UPI',
  firstPo: 'OCT 2023',
  aiNote:
    'Surya is your most consistent grocery vendor — zero rejections on 42 POs, average SLA beats commitment by 4 hours, and unit pricing has stayed within 1.2% of the locality median. Lock in the next quarterly rate card while they’re below market.',
  items: [
    { thumb: { tint: '#3A2522', glyph: 'AT' }, name: 'Aashirvaad Atta 5kg', sub: 'GROCERY · 6.2K units lifetime', metric: '₹248', unit: 'AVG' },
    { thumb: { tint: '#3A2725', glyph: 'TT' }, name: 'Tata Tea Premium 1kg', sub: 'GROCERY · 3.4K units lifetime', metric: '₹412', unit: 'AVG' },
    { thumb: { tint: '#332B1F', glyph: 'MG' }, name: 'Maggi 70g · 12 pack', sub: 'GROCERY · 1.8K packs lifetime', metric: '₹114', unit: 'AVG' },
    { thumb: { tint: '#2D2A2A', glyph: 'PG' }, name: 'Parle-G 80g', sub: 'GROCERY · 24K packs lifetime', metric: '₹9.60', unit: 'AVG' },
  ] as ProductInsight[],
  pastPOs: [
    { po: 'PO-2086', date: 'MAY 16', items: 6, amount: '₹68K', status: 'IN-TRANSIT' as POStatus, quality: '—' },
    { po: 'PO-2079', date: 'MAY 09', items: 4, amount: '₹56K', status: 'DELIVERED' as POStatus, quality: '100%' },
    { po: 'PO-2068', date: 'MAY 02', items: 5, amount: '₹62K', status: 'DELIVERED' as POStatus, quality: '100%' },
    { po: 'PO-2054', date: 'APR 22', items: 3, amount: '₹38K', status: 'DELIVERED' as POStatus, quality: '98%' },
    { po: 'PO-2041', date: 'APR 12', items: 7, amount: '₹84K', status: 'DELIVERED' as POStatus, quality: '100%' },
    { po: 'PO-2028', date: 'APR 04', items: 4, amount: '₹52K', status: 'DELIVERED' as POStatus, quality: '100%' },
  ],
  qualityHistory: [
    ['Accepted in full', 95, 'green', '40 POs'],
    ['Partial accept', 5, 'amber', '2 POs'],
    ['Rejected', 0, 'redSoft', '0 POs'],
  ] as [string, number, string, string][],
};
