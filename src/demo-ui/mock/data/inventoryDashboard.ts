export interface InventoryDashboard {
  instock: number;
  total: number;
  lowStock: number;
  outOfStock: number;
  last30Days: { day: string; lowStock: number; oos: number; orders: number; leads: number }[];
  categories: { name: string; value: number; max: number }[];
  brands: { name: string; value: number; max: number }[];
}

export interface InventoryInsight {
  name: string;
  meta: string;
  metric: string;
  tone?: 'positive' | 'warning' | 'critical' | 'info';
}

export interface PurchaseSuggestion {
  name: string;
  reason: string;
  urgency?: 'high' | 'medium' | 'low';
  currentStock?: number;
  suggestedQty?: number;
  /** For locality view */
  meta?: string;
}

export const inventoryDashboard: InventoryDashboard = {
  instock: 287,
  total: 312,
  lowStock: 12,
  outOfStock: 8,
  last30Days: [
    { day: 'W1', lowStock: 8, oos: 3, orders: 124, leads: 62 },
    { day: 'W2', lowStock: 10, oos: 4, orders: 138, leads: 71 },
    { day: 'W3', lowStock: 14, oos: 6, orders: 156, leads: 84 },
    { day: 'W4', lowStock: 12, oos: 8, orders: 162, leads: 89 },
  ],
  categories: [
    { name: 'Apparel', value: 142, max: 180 },
    { name: 'Footwear', value: 78, max: 120 },
    { name: 'Accessories', value: 54, max: 90 },
    { name: 'Bags', value: 28, max: 60 },
  ],
  brands: [
    { name: 'Levi’s', value: 92, max: 120 },
    { name: 'Nike', value: 64, max: 100 },
    { name: 'Adidas', value: 48, max: 80 },
    { name: 'Puma', value: 36, max: 70 },
  ],
};

export const insightsBestSelling: InventoryInsight[] = [
  { name: 'Slim-fit Denim 32', meta: 'Apparel · Levi’s', metric: '142 sold / 30d', tone: 'positive' },
  { name: 'White Sneaker 9', meta: 'Footwear · Nike', metric: '98 sold / 30d', tone: 'positive' },
  { name: 'Linen Shirt L', meta: 'Apparel · Marks', metric: '76 sold / 30d', tone: 'positive' },
];

export const insightsHighReturning: InventoryInsight[] = [
  { name: 'Cargo Shorts XL', meta: 'Apparel · Local', metric: '24% return rate', tone: 'critical' },
  { name: 'Running Shoes 11', meta: 'Footwear · Puma', metric: '18% return rate', tone: 'warning' },
];

export const insightsSlowMoving: InventoryInsight[] = [
  { name: 'Winter Jacket M', meta: 'Apparel · Outerwear', metric: '92 days in stock', tone: 'warning' },
  { name: 'Leather Wallet', meta: 'Accessories', metric: '68 days in stock', tone: 'warning' },
  { name: 'Travel Bag 60L', meta: 'Bags', metric: '54 days in stock' },
];

export const insightsInDemand: InventoryInsight[] = [
  { name: 'Cotton Tee — Pastel', meta: 'Apparel · Summer', metric: '+38% search vol.', tone: 'info' },
  { name: 'Crocs Slide 8', meta: 'Footwear', metric: '+24% search vol.', tone: 'info' },
];

export const purchasePredictionTop: PurchaseSuggestion[] = [
  {
    name: 'Slim-fit Denim 32',
    reason: 'Out of stock — 18 leads waiting',
    urgency: 'high',
    currentStock: 0,
    suggestedQty: 60,
  },
  {
    name: 'White Sneaker 9',
    reason: 'Low stock — sells out in 1.2 days',
    urgency: 'high',
    currentStock: 4,
    suggestedQty: 40,
  },
  {
    name: 'Linen Shirt L',
    reason: 'Below safety stock',
    urgency: 'medium',
    currentStock: 7,
    suggestedQty: 24,
  },
  {
    name: 'Black Belt M',
    reason: 'Low stock — high attach rate',
    urgency: 'medium',
    currentStock: 5,
    suggestedQty: 30,
  },
  {
    name: 'Sports Socks (3-pack)',
    reason: 'Frequently bundled with sneakers',
    urgency: 'low',
    currentStock: 12,
    suggestedQty: 50,
  },
];

export const purchasePredictionRising: PurchaseSuggestion[] = [
  {
    name: 'Cotton Tee — Pastel',
    reason: 'Demand predicted to rise 38% next month',
    suggestedQty: 80,
    meta: 'Trending: summer wear',
  },
  {
    name: 'Crocs Slide 8',
    reason: 'Searches up 24% in last 14 days',
    suggestedQty: 35,
    meta: 'Trending: monsoon casuals',
  },
];

export const purchasePredictionLocality: PurchaseSuggestion[] = [
  {
    name: 'Bandhani Kurta — M',
    reason: 'Top seller in your area',
    suggestedQty: 40,
    meta: '24 instock · 92 area sales',
  },
  {
    name: 'Festive Saree — Blue',
    reason: 'Local festival demand',
    suggestedQty: 18,
    meta: '6 instock · 54 area sales',
  },
];

export const aiSuggestedPrompts: string[] = [
  'What should I purchase this week?',
  'Which products are slowing down?',
  'How should I arrange the inventory by category?',
  'Which SKUs hurt my margin most?',
];
