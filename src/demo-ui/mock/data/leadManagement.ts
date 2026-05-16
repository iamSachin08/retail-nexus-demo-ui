export type LeadSource = 'WhatsApp' | 'Instagram' | 'Facebook' | 'Referral' | 'Walk-in/Offline';
export type LeadStatus = 'New Lead' | 'Contacted' | 'Interested' | 'Converted' | 'Lost';
export type LeadIntent = 'hot' | 'warm' | 'cold';

export const LEAD_STATUSES: LeadStatus[] = [
  'New Lead',
  'Contacted',
  'Interested',
  'Converted',
  'Lost',
];

export const LEAD_SOURCES: LeadSource[] = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'Referral',
  'Walk-in/Offline',
];

export interface LeadProductLine {
  name: string;
  qty: number;
  price?: number;
}

export interface Lead {
  leadId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  leadSource: LeadSource;
  leadStatus: LeadStatus;
  intent: LeadIntent;
  budget: number;
  notes?: string;
  productLines: LeadProductLine[];
  productsInterested: string;
  followUpDate?: string;
  /** Human-readable last interaction summary. */
  lastTouch: string;
  /** Days since last touch, used for "needs attention" calculations. */
  daysSinceTouch: number;
  /** Suggested next action from AI / manager notes. */
  nextAction?: string;
  /** Optional close reason for Lost leads. */
  reason?: string;
}

export interface LeadKpis {
  total: number;
  converted: number;
  lost: number;
  revenueGenerated: number;
  profitGain: number;
  pipelineValue: number;
  pipelineRate: number;
}

export interface LeadDashboardData {
  kpis: LeadKpis;
  monthly: { month: string; leads: number; conversions: number }[];
  status: { name: LeadStatus; count: number; value: number }[];
  sources: { source: LeadSource; leadCount: number; conversion: number; revenue: number }[];
}

export const sourceColor: Record<LeadSource, string> = {
  WhatsApp: '#22C55E',
  Instagram: '#EC4899',
  Facebook: '#3B82F6',
  Referral: '#F59E0B',
  'Walk-in/Offline': '#8B5CF6',
};

export const intentColor: Record<LeadIntent, string> = {
  hot: '#EF4444',
  warm: '#F59E0B',
  cold: '#94A3B8',
};

export const statusColor: Record<LeadStatus, string> = {
  'New Lead': '#94A3B8',
  Contacted: '#3B82F6',
  Interested: '#6366F1',
  Converted: '#22C55E',
  Lost: '#EF4444',
};

/* ─────────────  Dashboard  ───────────── */

export const leadDashboard: LeadDashboardData = {
  kpis: {
    total: 64,
    converted: 28,
    lost: 12,
    revenueGenerated: 420000,
    profitGain: 86000,
    pipelineValue: 380000,
    pipelineRate: 34,
  },
  monthly: [
    { month: 'Jul', leads: 22, conversions: 7 },
    { month: 'Aug', leads: 26, conversions: 9 },
    { month: 'Sep', leads: 24, conversions: 8 },
    { month: 'Oct', leads: 30, conversions: 12 },
    { month: 'Nov', leads: 35, conversions: 13 },
    { month: 'Dec', leads: 42, conversions: 18 },
    { month: 'Jan', leads: 32, conversions: 11 },
    { month: 'Feb', leads: 38, conversions: 14 },
    { month: 'Mar', leads: 41, conversions: 16 },
    { month: 'Apr', leads: 48, conversions: 19 },
    { month: 'May', leads: 56, conversions: 22 },
    { month: 'Jun', leads: 64, conversions: 28 },
  ],
  status: [
    { name: 'New Lead', count: 12, value: 86000 },
    { name: 'Contacted', count: 10, value: 124000 },
    { name: 'Interested', count: 8, value: 142000 },
    { name: 'Converted', count: 28, value: 420000 },
    { name: 'Lost', count: 12, value: 0 },
  ],
  sources: [
    { source: 'WhatsApp', leadCount: 24, conversion: 42, revenue: 168000 },
    { source: 'Instagram', leadCount: 16, conversion: 31, revenue: 104000 },
    { source: 'Walk-in/Offline', leadCount: 12, conversion: 58, revenue: 96000 },
    { source: 'Referral', leadCount: 8, conversion: 62, revenue: 52000 },
    { source: 'Facebook', leadCount: 4, conversion: 18, revenue: 0 },
  ],
};

/* ─────────────  Mock Leads  ───────────── */

const lead = (l: Partial<Lead> & Pick<Lead, 'leadId' | 'customerName' | 'customerPhone' | 'leadSource' | 'leadStatus' | 'intent' | 'budget' | 'lastTouch' | 'daysSinceTouch'>): Lead => ({
  productLines: [],
  productsInterested: '',
  ...l,
});

export const initialLeads: Lead[] = [
  lead({
    leadId: 'L-2401',
    customerName: 'Neha Reddy',
    customerPhone: '+91 98XXXX1212',
    customerEmail: 'neha.r@example.com',
    leadSource: 'WhatsApp',
    leadStatus: 'Interested',
    intent: 'hot',
    budget: 24000,
    lastTouch: '12m ago',
    daysSinceTouch: 0,
    followUpDate: '15/05/2026',
    nextAction: 'Send Levi’s catalog and offer 5% off',
    notes: 'Looking for denim and casual shirts. Wedding shopping for brother next month.',
    productLines: [
      { name: 'Slim-fit Denim 32', qty: 2, price: 2400 },
      { name: 'Linen Shirt L', qty: 3, price: 1800 },
    ],
    productsInterested: 'Slim-fit Denim 32, Linen Shirt L',
  }),
  lead({
    leadId: 'L-2402',
    customerName: 'Anita Joshi',
    customerPhone: '+91 98XXXX2424',
    leadSource: 'Referral',
    leadStatus: 'Interested',
    intent: 'hot',
    budget: 32000,
    lastTouch: '2h ago',
    daysSinceTouch: 0,
    followUpDate: '14/05/2026',
    nextAction: 'Close — final discount approval needed',
    notes: 'Referred by Mrs. Mehta. Bulk order for family function.',
    productLines: [
      { name: 'Festive Saree — Blue', qty: 2, price: 5500 },
      { name: 'Bandhani Kurta — M', qty: 3, price: 2200 },
    ],
    productsInterested: 'Festive Saree — Blue, Bandhani Kurta — M',
  }),
  lead({
    leadId: 'L-2403',
    customerName: 'Vivek Sharma',
    customerPhone: '+91 98XXXX3636',
    leadSource: 'Walk-in/Offline',
    leadStatus: 'Contacted',
    intent: 'warm',
    budget: 8500,
    lastTouch: '1h ago',
    daysSinceTouch: 0,
    followUpDate: '16/05/2026',
    productsInterested: 'White Sneaker 9',
    productLines: [{ name: 'White Sneaker 9', qty: 1, price: 4200 }],
  }),
  lead({
    leadId: 'L-2404',
    customerName: 'Sunil Kumar',
    customerPhone: '+91 98XXXX4848',
    leadSource: 'Instagram',
    leadStatus: 'New Lead',
    intent: 'warm',
    budget: 6200,
    lastTouch: '4h ago',
    daysSinceTouch: 0,
    productsInterested: 'Cotton Tee — Pastel',
  }),
  lead({
    leadId: 'L-2405',
    customerName: 'Pooja Iyer',
    customerPhone: '+91 98XXXX5151',
    leadSource: 'Instagram',
    leadStatus: 'Interested',
    intent: 'warm',
    budget: 14000,
    lastTouch: 'yesterday',
    daysSinceTouch: 1,
    followUpDate: '14/05/2026',
    nextAction: 'Today, 5 PM call',
    productsInterested: 'Crocs Slide 8, Linen Shirt L',
  }),
  lead({
    leadId: 'L-2406',
    customerName: 'Rahul Mehta',
    customerPhone: '+91 98XXXX6262',
    leadSource: 'WhatsApp',
    leadStatus: 'Interested',
    intent: 'hot',
    budget: 22000,
    lastTouch: '2 days ago',
    daysSinceTouch: 2,
    followUpDate: '15/05/2026',
    nextAction: 'Tomorrow, 11 AM follow-up',
    productsInterested: 'Slim-fit Denim 32, Black Belt M',
  }),
  lead({
    leadId: 'L-2407',
    customerName: 'Mr. Mehta (Bulk)',
    customerPhone: '+91 98XXXX8484',
    leadSource: 'Walk-in/Offline',
    leadStatus: 'Interested',
    intent: 'hot',
    budget: 84000,
    lastTouch: '5 days ago',
    daysSinceTouch: 5,
    nextAction: 'Reach out — pipeline cold',
    notes: 'High-value B2B lead. No follow-up in 5 days.',
    productsInterested: 'Bulk apparel order',
  }),
  lead({
    leadId: 'L-2408',
    customerName: 'Tina Verma',
    customerPhone: '+91 98XXXX1717',
    leadSource: 'WhatsApp',
    leadStatus: 'Contacted',
    intent: 'warm',
    budget: 11200,
    lastTouch: '6h ago',
    daysSinceTouch: 0,
    productsInterested: 'Linen Shirt L',
  }),
  lead({
    leadId: 'L-2409',
    customerName: 'Raj Malhotra',
    customerPhone: '+91 98XXXX1818',
    leadSource: 'Walk-in/Offline',
    leadStatus: 'Interested',
    intent: 'hot',
    budget: 28000,
    lastTouch: '1d ago',
    daysSinceTouch: 1,
    productsInterested: 'Slim-fit Denim 32, White Sneaker 9',
  }),
  lead({
    leadId: 'L-2410',
    customerName: 'Meera Singh',
    customerPhone: '+91 98XXXX1919',
    leadSource: 'Instagram',
    leadStatus: 'New Lead',
    intent: 'cold',
    budget: 4200,
    lastTouch: '2d ago',
    daysSinceTouch: 2,
    productsInterested: 'Cotton Tee — Pastel',
  }),
  lead({
    leadId: 'L-2411',
    customerName: 'Arjun Kapoor',
    customerPhone: '+91 98XXXX2020',
    leadSource: 'Facebook',
    leadStatus: 'Contacted',
    intent: 'warm',
    budget: 9600,
    lastTouch: '3d ago',
    daysSinceTouch: 3,
    productsInterested: 'Travel Bag 60L',
  }),
  lead({
    leadId: 'L-2412',
    customerName: 'Karan Singh',
    customerPhone: '+91 98XXXX9595',
    leadSource: 'Instagram',
    leadStatus: 'Lost',
    intent: 'warm',
    budget: 12000,
    lastTouch: '4 days ago',
    daysSinceTouch: 4,
    reason: 'Price too high — consider 10% offer',
    productsInterested: 'White Sneaker 9',
  }),
  lead({
    leadId: 'L-2413',
    customerName: 'Deepa Nair',
    customerPhone: '+91 98XXXX1010',
    leadSource: 'WhatsApp',
    leadStatus: 'Lost',
    intent: 'warm',
    budget: 7500,
    lastTouch: '1 week ago',
    daysSinceTouch: 7,
    reason: 'Out of stock at time of inquiry',
    productsInterested: 'Bandhani Kurta — M',
  }),
];

/* Insights derived from the canonical lead list */
export const insightsHotWarm = (leads: Lead[]) =>
  leads.filter(l => (l.intent === 'hot' || l.intent === 'warm') && l.leadStatus !== 'Lost' && l.leadStatus !== 'Converted').slice(0, 3);

export const insightsFollowUp = (leads: Lead[]) =>
  leads.filter(l => !!l.followUpDate && l.leadStatus !== 'Converted' && l.leadStatus !== 'Lost').slice(0, 4);

export const insightsHighValueAttention = (leads: Lead[]) =>
  leads.filter(l => l.intent === 'hot' && l.budget >= 20000 && l.daysSinceTouch >= 2 && l.leadStatus !== 'Converted' && l.leadStatus !== 'Lost').slice(0, 4);

export const insightsRecentLost = (leads: Lead[]) =>
  leads.filter(l => l.leadStatus === 'Lost').slice(0, 4);

export const aiLeadPrompts: string[] = [
  'Which leads should I follow up today?',
  'Why are we losing high-value leads?',
  'Which source is converting best?',
  'Draft a WhatsApp reply for a hot lead',
];
