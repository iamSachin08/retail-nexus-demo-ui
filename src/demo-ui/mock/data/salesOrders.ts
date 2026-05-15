export type OrderStatus = 'New' | 'Confirmed' | 'Packed' | 'Out for delivery' | 'Delivered' | 'Returned' | 'Cancelled';
export type OrderSource = 'POS' | 'WhatsApp' | 'Walk-in' | 'Online';

export interface Order {
  orderId: string;
  customer: string;
  customerPhone?: string;
  source: OrderSource;
  status: OrderStatus;
  total: number;
  profit: number;
  itemCount: number;
  items: string;
  createdAt: string;
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'Pending';
}

export interface SalesDashboard {
  actualToday: number;
  targetToday: number;
  totalOrders: number;
  totalProfit: number;
  profitMarginPct: number;
  profitDeltaPct: number;
  salesHealth: {
    score: number;
    label: string;
    deltaPts: number;
    breakdown: { label: string; score: number; hint: string }[];
  };
  revenueProfit: { day: string; revenue: number; profit: number }[];
  topProducts: { name: string; units: number; revenue: number }[];
  source: { name: OrderSource; orders: number; revenue: number }[];
}

export interface ReportSummary {
  id: string;
  title: string;
  period: string;
  status: 'pending-review' | 'sent' | 'scheduled';
  generatedAt: string;
  sentTo?: string;
  sentChannel?: 'WhatsApp';
  kpis: { label: string; value: string; delta?: number }[];
  comments: { author: 'Owner' | 'Manager'; text: string; ts: string }[];
}

export interface InsightOrder {
  orderId: string;
  customer: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  age: string;
}

export interface InsightReview {
  customer: string;
  rating: number;
  text: string;
  product?: string;
  age: string;
  tone: 'positive' | 'negative';
}

export interface TargetPrediction {
  currentPct: number;
  predictedEod: number;
  hourly: { hour: string; revenue: number; target: number }[];
  suggestions: string[];
}

export const orderStatusColor: Record<OrderStatus, string> = {
  New: '#94A3B8',
  Confirmed: '#3B82F6',
  Packed: '#8B5CF6',
  'Out for delivery': '#F59E0B',
  Delivered: '#22C55E',
  Returned: '#EF4444',
  Cancelled: '#94A3B8',
};

export const orderSourceColor: Record<OrderSource, string> = {
  POS: '#3B82F6',
  WhatsApp: '#22C55E',
  'Walk-in': '#8B5CF6',
  Online: '#EC4899',
};

/* ────────── Dashboard ────────── */

export const salesDashboard: SalesDashboard = {
  actualToday: 412300,
  targetToday: 480000,
  totalOrders: 142,
  totalProfit: 86400,
  profitMarginPct: 21,
  profitDeltaPct: 8.4,
  salesHealth: {
    score: 92,
    label: 'HEALTHY',
    deltaPts: 4,
    breakdown: [
      { label: 'Target Hit', score: 86, hint: '₹4.1L / ₹4.8L' },
      { label: 'Conversion', score: 94, hint: '142 of 151' },
      { label: 'Return Rate', score: 88, hint: '2.8% returns' },
      { label: 'Margin', score: 95, hint: '21% blended' },
    ],
  },
  revenueProfit: [
    { day: 'Mon', revenue: 285000, profit: 58000 },
    { day: 'Tue', revenue: 312000, profit: 64500 },
    { day: 'Wed', revenue: 298000, profit: 61200 },
    { day: 'Thu', revenue: 356000, profit: 72400 },
    { day: 'Fri', revenue: 421000, profit: 86000 },
    { day: 'Sat', revenue: 482000, profit: 98200 },
    { day: 'Sun', revenue: 412300, profit: 86400 },
  ],
  topProducts: [
    { name: 'Slim-fit Denim 32', units: 28, revenue: 67200 },
    { name: 'White Sneaker 9', units: 22, revenue: 92400 },
    { name: 'Linen Shirt L', units: 18, revenue: 32400 },
    { name: 'Cotton Tee — Pastel', units: 16, revenue: 19200 },
  ],
  source: [
    { name: 'POS', orders: 78, revenue: 226400 },
    { name: 'WhatsApp', orders: 38, revenue: 124000 },
    { name: 'Walk-in', orders: 18, revenue: 42800 },
    { name: 'Online', orders: 8, revenue: 19100 },
  ],
};

export const targetPrediction: TargetPrediction = {
  currentPct: 86,
  predictedEod: 458000,
  hourly: [
    { hour: '10', revenue: 18000, target: 20000 },
    { hour: '11', revenue: 32000, target: 40000 },
    { hour: '12', revenue: 64000, target: 80000 },
    { hour: '13', revenue: 122000, target: 140000 },
    { hour: '14', revenue: 184000, target: 200000 },
    { hour: '15', revenue: 248000, target: 280000 },
    { hour: '16', revenue: 312000, target: 340000 },
    { hour: '17', revenue: 412300, target: 400000 },
  ],
  suggestions: [
    'Push WhatsApp offer on Slim Denim to last-week buyers',
    'Suggest Linen Shirt bundle at counter — 4 of 6 walk-ins took it last week',
    'Whitefield store at 71% — call manager to push closing-hour conversions',
  ],
};

export const ordersNeedAttention: InsightOrder[] = [
  { orderId: 'O-9821', customer: 'Mr. Mehta', reason: 'Packed 2 days — not dispatched', urgency: 'high', age: '2 days' },
  { orderId: 'O-9819', customer: 'Anita Joshi', reason: 'Payment pending · ₹32K', urgency: 'high', age: '1 day' },
  { orderId: 'O-9815', customer: 'Pooja Iyer', reason: 'Out for delivery > 24h', urgency: 'medium', age: '1 day' },
];

export const customerReviewsNegative: InsightReview[] = [
  {
    customer: 'Rohit S.',
    rating: 2,
    text: 'Shirt was a size smaller than mentioned.',
    product: 'Linen Shirt L',
    age: '2h ago',
    tone: 'negative',
  },
  {
    customer: 'Karan P.',
    rating: 3,
    text: 'Delivery took 4 days, expected 2.',
    age: '1 day ago',
    tone: 'negative',
  },
];

export const customerReviewsPositive: InsightReview[] = [
  {
    customer: 'Neha R.',
    rating: 5,
    text: 'Loved the denim fit — sharing the store with friends!',
    product: 'Slim-fit Denim 32',
    age: '3h ago',
    tone: 'positive',
  },
  {
    customer: 'Anita J.',
    rating: 5,
    text: 'Saree quality was excellent. Will return for festive shopping.',
    age: '1 day ago',
    tone: 'positive',
  },
];

/* ────────── Reports ────────── */

export const reportsHistory: ReportSummary[] = [
  {
    id: 'r-today-daily',
    title: 'Daily Sales — Today',
    period: 'Wed, 14 May 2026',
    status: 'pending-review',
    generatedAt: 'Today, 7:30 PM',
    kpis: [
      { label: 'Revenue', value: '₹4.1L', delta: 8.9 },
      { label: 'Orders', value: '142', delta: 4.2 },
      { label: 'Profit', value: '₹86K', delta: 6.5 },
      { label: 'Returns', value: '4', delta: -12 },
    ],
    comments: [],
  },
  {
    id: 'r-may-monthly',
    title: 'Monthly Sales — May',
    period: '1–31 May 2026',
    status: 'scheduled',
    generatedAt: 'Will generate on 31/05/2026',
    kpis: [],
    comments: [],
  },
  {
    id: 'r-yest-daily',
    title: 'Daily Sales — Yesterday',
    period: 'Tue, 13 May 2026',
    status: 'sent',
    generatedAt: 'Yesterday, 7:31 PM',
    sentTo: 'Owner (Sachin)',
    sentChannel: 'WhatsApp',
    kpis: [
      { label: 'Revenue', value: '₹3.78L', delta: 5.1 },
      { label: 'Orders', value: '128', delta: 2.0 },
      { label: 'Profit', value: '₹78K', delta: 3.8 },
    ],
    comments: [
      { author: 'Owner', text: 'Why are returns up vs last week?', ts: 'Yest, 8:12 PM' },
      { author: 'Manager', text: 'Two sizing complaints on Linen Shirt. Switching size labels tomorrow.', ts: 'Yest, 8:24 PM' },
    ],
  },
  {
    id: 'r-week-19',
    title: 'Weekly Sales — Week 19',
    period: '5–11 May 2026',
    status: 'sent',
    generatedAt: 'Mon, 12 May 7:30 PM',
    sentTo: 'Owner (Sachin)',
    sentChannel: 'WhatsApp',
    kpis: [
      { label: 'Revenue', value: '₹24.8L', delta: 11.2 },
      { label: 'Orders', value: '824' },
      { label: 'Profit', value: '₹5.1L', delta: 7.4 },
    ],
    comments: [
      { author: 'Owner', text: 'Solid week. Let’s repeat the Saturday WhatsApp drop.', ts: 'Mon, 9:01 PM' },
    ],
  },
  {
    id: 'r-apr-monthly',
    title: 'Monthly Sales — April',
    period: '1–30 April 2026',
    status: 'sent',
    generatedAt: '30 Apr 2026',
    sentTo: 'Owner (Sachin)',
    sentChannel: 'WhatsApp',
    kpis: [
      { label: 'Revenue', value: '₹98.2L' },
      { label: 'Orders', value: '3,124' },
      { label: 'Profit', value: '₹21.4L' },
    ],
    comments: [],
  },
];

/* ────────── Orders (All Orders drawer) ────────── */

export const recentOrders: Order[] = [
  { orderId: 'O-9823', customer: 'Neha Reddy', customerPhone: '98XXXX1212', source: 'WhatsApp', status: 'Delivered', total: 4800, profit: 920, itemCount: 2, items: 'Slim Denim × 2', createdAt: '10m ago', paymentMode: 'UPI' },
  { orderId: 'O-9822', customer: 'Walk-in #42', source: 'POS', status: 'Delivered', total: 2400, profit: 480, itemCount: 1, items: 'Linen Shirt L', createdAt: '24m ago', paymentMode: 'Card' },
  { orderId: 'O-9821', customer: 'Mr. Mehta', customerPhone: '98XXXX8484', source: 'WhatsApp', status: 'Packed', total: 32000, profit: 6200, itemCount: 8, items: 'Bandhani Kurta × 3, Saree × 2…', createdAt: '2 days ago', paymentMode: 'UPI' },
  { orderId: 'O-9820', customer: 'Anita Joshi', customerPhone: '98XXXX2424', source: 'Walk-in', status: 'Confirmed', total: 18000, profit: 3400, itemCount: 4, items: 'Festive Saree × 2, Kurta × 2', createdAt: '4h ago', paymentMode: 'Cash' },
  { orderId: 'O-9819', customer: 'Vivek Sharma', source: 'POS', status: 'Out for delivery', total: 4200, profit: 720, itemCount: 1, items: 'White Sneaker 9', createdAt: '6h ago', paymentMode: 'UPI' },
  { orderId: 'O-9818', customer: 'Pooja Iyer', customerPhone: '98XXXX5151', source: 'Online', status: 'Out for delivery', total: 9600, profit: 1800, itemCount: 3, items: 'Crocs × 1, Tee × 2', createdAt: '1 day ago', paymentMode: 'Card' },
  { orderId: 'O-9817', customer: 'Karan Singh', source: 'WhatsApp', status: 'Returned', total: 2800, profit: 0, itemCount: 1, items: 'Linen Shirt L', createdAt: '1 day ago', paymentMode: 'UPI' },
  { orderId: 'O-9816', customer: 'Tina Verma', source: 'POS', status: 'Delivered', total: 6400, profit: 1280, itemCount: 2, items: 'Cotton Tee × 2', createdAt: '1 day ago', paymentMode: 'UPI' },
  { orderId: 'O-9815', customer: 'Rahul Mehta', source: 'WhatsApp', status: 'Delivered', total: 11200, profit: 2100, itemCount: 3, items: 'Slim Denim × 1, Belt × 1, Sneaker × 1', createdAt: '2 days ago', paymentMode: 'UPI' },
  { orderId: 'O-9814', customer: 'Raj Malhotra', source: 'Walk-in', status: 'Delivered', total: 5400, profit: 1080, itemCount: 1, items: 'White Sneaker 9', createdAt: '2 days ago', paymentMode: 'Cash' },
];

export const aiSalesPrompts: string[] = [
  'How can I hit today’s target?',
  'What’s pulling down conversions?',
  'Draft today’s end-of-day report',
  'Compare this week vs last week',
];
