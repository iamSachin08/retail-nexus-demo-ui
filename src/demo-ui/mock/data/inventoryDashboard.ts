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

/* ─── All Products ────────────────────────────────────── */

export type ProductCategory = 'Apparel' | 'Footwear' | 'Accessories' | 'Bags';
export type ProductStockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  sku: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  costPrice: number;
  stock: number;
  reorderAt: number;
  soldLast30: number;
}

export const categoryColor: Record<ProductCategory, string> = {
  Apparel: '#3B82F6',
  Footwear: '#7C5CFF',
  Accessories: '#F59E0B',
  Bags: '#EC4899',
};

export function stockStatus(p: Product): ProductStockStatus {
  if (p.stock <= 0) return 'out-of-stock';
  if (p.stock <= p.reorderAt) return 'low-stock';
  return 'in-stock';
}

export const stockStatusColor: Record<ProductStockStatus, string> = {
  'in-stock': '#22C55E',
  'low-stock': '#F59E0B',
  'out-of-stock': '#EF4444',
};

export const stockStatusLabel: Record<ProductStockStatus, string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
};

export const products: Product[] = [
  { sku: 'SKU-1001', name: 'Slim-fit Denim 32',     category: 'Apparel',     brand: 'Levi’s',  price: 2400, costPrice: 1480, stock: 0,  reorderAt: 8,  soldLast30: 142 },
  { sku: 'SKU-1002', name: 'Slim-fit Denim 34',     category: 'Apparel',     brand: 'Levi’s',  price: 2400, costPrice: 1480, stock: 6,  reorderAt: 8,  soldLast30: 96  },
  { sku: 'SKU-1003', name: 'Slim-fit Denim 36',     category: 'Apparel',     brand: 'Levi’s',  price: 2400, costPrice: 1480, stock: 22, reorderAt: 8,  soldLast30: 64  },
  { sku: 'SKU-2001', name: 'White Sneaker 9',       category: 'Footwear',    brand: 'Nike',    price: 4200, costPrice: 2620, stock: 4,  reorderAt: 6,  soldLast30: 98  },
  { sku: 'SKU-2002', name: 'White Sneaker 10',      category: 'Footwear',    brand: 'Nike',    price: 4200, costPrice: 2620, stock: 18, reorderAt: 6,  soldLast30: 72  },
  { sku: 'SKU-2003', name: 'Running Shoes 11',      category: 'Footwear',    brand: 'Puma',    price: 3600, costPrice: 2240, stock: 14, reorderAt: 6,  soldLast30: 48  },
  { sku: 'SKU-2004', name: 'Crocs Slide 8',         category: 'Footwear',    brand: 'Crocs',   price: 1800, costPrice: 1080, stock: 26, reorderAt: 6,  soldLast30: 54  },
  { sku: 'SKU-3001', name: 'Linen Shirt L',         category: 'Apparel',     brand: 'Marks',   price: 1800, costPrice: 1080, stock: 7,  reorderAt: 8,  soldLast30: 76  },
  { sku: 'SKU-3002', name: 'Linen Shirt XL',        category: 'Apparel',     brand: 'Marks',   price: 1800, costPrice: 1080, stock: 12, reorderAt: 8,  soldLast30: 58  },
  { sku: 'SKU-3003', name: 'Cotton Tee — Pastel',   category: 'Apparel',     brand: 'Local',   price: 1200, costPrice: 640,  stock: 38, reorderAt: 12, soldLast30: 124 },
  { sku: 'SKU-3004', name: 'Cargo Shorts XL',       category: 'Apparel',     brand: 'Local',   price: 1600, costPrice: 980,  stock: 18, reorderAt: 10, soldLast30: 32  },
  { sku: 'SKU-4001', name: 'Bandhani Kurta M',      category: 'Apparel',     brand: 'Local',   price: 2200, costPrice: 1280, stock: 24, reorderAt: 12, soldLast30: 92  },
  { sku: 'SKU-4002', name: 'Festive Saree — Blue',  category: 'Apparel',     brand: 'Local',   price: 4800, costPrice: 2800, stock: 6,  reorderAt: 8,  soldLast30: 54  },
  { sku: 'SKU-5001', name: 'Black Belt M',          category: 'Accessories', brand: 'Tommy',   price: 1400, costPrice: 760,  stock: 5,  reorderAt: 8,  soldLast30: 86  },
  { sku: 'SKU-5002', name: 'Leather Wallet',        category: 'Accessories', brand: 'Local',   price: 1800, costPrice: 940,  stock: 22, reorderAt: 10, soldLast30: 18  },
  { sku: 'SKU-5003', name: 'Sports Socks (3-pack)', category: 'Accessories', brand: 'Nike',    price: 600,  costPrice: 280,  stock: 12, reorderAt: 20, soldLast30: 102 },
  { sku: 'SKU-6001', name: 'Travel Bag 60L',        category: 'Bags',        brand: 'Wildcraft', price: 3800, costPrice: 2280, stock: 11, reorderAt: 6,  soldLast30: 14  },
  { sku: 'SKU-6002', name: 'Backpack 32L',          category: 'Bags',        brand: 'Wildcraft', price: 2400, costPrice: 1440, stock: 9,  reorderAt: 6,  soldLast30: 28  },
  { sku: 'SKU-6003', name: 'Winter Jacket M',       category: 'Apparel',     brand: 'Local',   price: 3200, costPrice: 1860, stock: 16, reorderAt: 8,  soldLast30: 8   },
];
