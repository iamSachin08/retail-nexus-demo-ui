export type CustomerSummary = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email?: string;
  tier: 'New' | 'Regular' | 'VIP' | 'Lapsed';
  tierColor: string;
  verified?: boolean;
  lastVisit: string;
};

export type LifetimeStats = {
  totalSpend: number;
  visits: number;
  avgBasket: number;
  firstSeen: string;
  preferredStore: string;
};

export type BehaviorTrait = {
  id: string;
  label: string;
  value: string;
  hint: string;
  color: string;
};

export type PurchaseRow = {
  id: string;
  date: string;
  items: number;
  amount: number;
  topItem: string;
  channel: 'In-store' | 'WhatsApp' | 'Hyperlocal' | 'Online';
};

export type Interest = {
  id: string;
  label: string;
  affinity: number;
  color: string;
};

export type Customer = CustomerSummary & {
  lifetime: LifetimeStats;
  behavior: BehaviorTrait[];
  purchases: PurchaseRow[];
  interests: Interest[];
  preferredBrands: { id: string; name: string; share: number }[];
  nextBest: { id: string; title: string; reason: string; priceInr: number }[];
  notes: string;
};

const TIER_COLOR: Record<CustomerSummary['tier'], string> = {
  New: '#2563EB',
  Regular: '#16A34A',
  VIP: '#A855F7',
  Lapsed: '#F97316',
};

function makeCustomer(partial: Omit<Customer, 'tierColor' | 'initials'>): Customer {
  const initials = partial.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
  return { ...partial, initials, tierColor: TIER_COLOR[partial.tier] };
}

const CUSTOMERS: Customer[] = [
  makeCustomer({
    id: 'CUST-10421',
    name: 'Aanya Kapoor',
    phone: '9876543210',
    email: 'aanya.kapoor@gmail.com',
    tier: 'VIP',
    verified: true,
    lastVisit: '3 days ago',
    lifetime: {
      totalSpend: 184250,
      visits: 27,
      avgBasket: 6824,
      firstSeen: 'Jan 2023',
      preferredStore: 'Sector 22',
    },
    behavior: [
      { id: 'time', label: 'Best time to engage', value: 'Sat · 11am – 2pm', hint: 'Visits cluster on weekends', color: '#2563EB' },
      { id: 'cycle', label: 'Repeat cycle', value: 'Every 38 days', hint: 'Stable refill rhythm', color: '#16A34A' },
      { id: 'price', label: 'Price tier', value: 'Premium · ₹5k–₹15k', hint: 'Avoids budget SKUs', color: '#A855F7' },
      { id: 'channel', label: 'Preferred channel', value: 'In-store + WhatsApp', hint: 'Confirms on WhatsApp before visit', color: '#16A34A' },
    ],
    purchases: [
      { id: 'O-90142', date: '12 May 2026', items: 4, amount: 8420, topItem: 'Pureit Mineral Classic', channel: 'In-store' },
      { id: 'O-89211', date: '02 Apr 2026', items: 2, amount: 12599, topItem: 'Aquaguard Glory NXT', channel: 'WhatsApp' },
      { id: 'O-87650', date: '21 Feb 2026', items: 6, amount: 5240, topItem: 'Skincare bundle', channel: 'In-store' },
      { id: 'O-85002', date: '08 Jan 2026', items: 3, amount: 9990, topItem: 'Kent Grand Plus', channel: 'In-store' },
      { id: 'O-82211', date: '14 Dec 2025', items: 5, amount: 4180, topItem: 'Festive hamper', channel: 'Hyperlocal' },
    ],
    interests: [
      { id: 'water', label: 'Water purifiers', affinity: 92, color: '#2563EB' },
      { id: 'beauty', label: 'Beauty & skincare', affinity: 78, color: '#E5345C' },
      { id: 'kitchen', label: 'Kitchen appliances', affinity: 64, color: '#F97316' },
      { id: 'gifting', label: 'Festive gifting', affinity: 52, color: '#A855F7' },
    ],
    preferredBrands: [
      { id: 'pureit', name: 'Pureit', share: 38 },
      { id: 'lakme', name: 'Lakmé', share: 24 },
      { id: 'philips', name: 'Philips', share: 18 },
      { id: 'havells', name: 'Havells', share: 12 },
    ],
    nextBest: [
      {
        id: 'nbo-1',
        title: 'Pureit Filter Replacement Kit',
        reason: 'Last purifier sold 14 months ago — filter cycle due now.',
        priceInr: 2199,
      },
      {
        id: 'nbo-2',
        title: 'Lakmé Salon Pack — Monsoon',
        reason: 'Buys skincare every ~45 days. Monsoon range matches her tier.',
        priceInr: 3499,
      },
    ],
    notes: 'Prefers messages over calls. Always asks about extended warranty.',
  }),
  makeCustomer({
    id: 'CUST-10387',
    name: 'Rohan Mehta',
    phone: '9123456780',
    tier: 'Regular',
    verified: true,
    lastVisit: '11 days ago',
    lifetime: {
      totalSpend: 64580,
      visits: 14,
      avgBasket: 4612,
      firstSeen: 'Aug 2024',
      preferredStore: 'Sector 35',
    },
    behavior: [
      { id: 'time', label: 'Best time to engage', value: 'Wed eve · 7pm – 9pm', hint: 'Walks in after work', color: '#2563EB' },
      { id: 'cycle', label: 'Repeat cycle', value: 'Every 22 days', hint: 'Frequent grocery refills', color: '#16A34A' },
      { id: 'price', label: 'Price tier', value: 'Mid · ₹1k–₹5k', hint: 'Compares before buying', color: '#F97316' },
      { id: 'channel', label: 'Preferred channel', value: 'In-store', hint: 'Rarely uses WhatsApp', color: '#A855F7' },
    ],
    purchases: [
      { id: 'O-90011', date: '04 May 2026', items: 7, amount: 3210, topItem: 'Daily essentials', channel: 'In-store' },
      { id: 'O-88742', date: '12 Apr 2026', items: 3, amount: 1980, topItem: 'Phone case + charger', channel: 'In-store' },
      { id: 'O-86300', date: '21 Mar 2026', items: 4, amount: 2450, topItem: 'Snacks combo', channel: 'In-store' },
    ],
    interests: [
      { id: 'mobile', label: 'Mobile accessories', affinity: 81, color: '#2563EB' },
      { id: 'snacks', label: 'Snacks & beverages', affinity: 72, color: '#F97316' },
      { id: 'fitness', label: 'Fitness essentials', affinity: 48, color: '#16A34A' },
    ],
    preferredBrands: [
      { id: 'boat', name: 'boAt', share: 31 },
      { id: 'parle', name: 'Parle', share: 22 },
      { id: 'mi', name: 'Mi', share: 16 },
    ],
    nextBest: [
      {
        id: 'nbo-1',
        title: 'boAt Rockerz 255 Pro+',
        reason: 'Two charger purchases in 60 days — likely upgrade target.',
        priceInr: 1499,
      },
    ],
    notes: 'Negotiates on price. Responds well to bundle offers.',
  }),
  makeCustomer({
    id: 'CUST-10198',
    name: 'Priya Sharma',
    phone: '7011223344',
    tier: 'Lapsed',
    verified: false,
    lastVisit: '4 months ago',
    lifetime: {
      totalSpend: 28100,
      visits: 6,
      avgBasket: 4683,
      firstSeen: 'Mar 2024',
      preferredStore: 'Manimajra',
    },
    behavior: [
      { id: 'time', label: 'Best time to engage', value: 'Sun · 4pm – 6pm', hint: 'Weekend-only shopper', color: '#2563EB' },
      { id: 'cycle', label: 'Repeat cycle', value: 'Sparse · 70+ days', hint: 'Risk of churn', color: '#F97316' },
      { id: 'price', label: 'Price tier', value: 'Mid–Premium', hint: 'Open to upsell on quality', color: '#A855F7' },
      { id: 'channel', label: 'Preferred channel', value: 'Hyperlocal', hint: 'Last 3 orders delivered', color: '#16A34A' },
    ],
    purchases: [
      { id: 'O-79410', date: '18 Jan 2026', items: 4, amount: 6240, topItem: 'Baby care bundle', channel: 'Hyperlocal' },
      { id: 'O-77512', date: '02 Dec 2025', items: 3, amount: 4180, topItem: 'Kitchen organisers', channel: 'Hyperlocal' },
    ],
    interests: [
      { id: 'baby', label: 'Baby care', affinity: 88, color: '#E5345C' },
      { id: 'home', label: 'Home & kitchen', affinity: 71, color: '#F97316' },
      { id: 'wellness', label: 'Wellness', affinity: 55, color: '#16A34A' },
    ],
    preferredBrands: [
      { id: 'pampers', name: 'Pampers', share: 35 },
      { id: 'tupperware', name: 'Tupperware', share: 22 },
      { id: 'himalaya', name: 'Himalaya', share: 18 },
    ],
    nextBest: [
      {
        id: 'nbo-1',
        title: 'Win-back voucher · ₹250 off ₹1500+',
        reason: 'Inactive 4 months. Strong baby-care loyalty in past.',
        priceInr: 0,
      },
    ],
    notes: 'Stopped shopping after move. Worth a re-activation push.',
  }),
];

export const recentCustomers: CustomerSummary[] = CUSTOMERS.map(c => ({
  id: c.id,
  name: c.name,
  initials: c.initials,
  phone: c.phone,
  tier: c.tier,
  tierColor: c.tierColor,
  verified: c.verified,
  lastVisit: c.lastVisit,
}));

export function findCustomerByPhone(phone: string): CustomerSummary | null {
  const hit = CUSTOMERS.find(c => c.phone === phone);
  if (!hit) return null;
  return {
    id: hit.id,
    name: hit.name,
    initials: hit.initials,
    phone: hit.phone,
    tier: hit.tier,
    tierColor: hit.tierColor,
    verified: hit.verified,
    lastVisit: hit.lastVisit,
  };
}

export function getCustomerById(id: string): Customer | null {
  return CUSTOMERS.find(c => c.id === id) ?? null;
}
