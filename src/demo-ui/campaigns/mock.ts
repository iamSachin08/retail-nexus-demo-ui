export type Channel = 'WhatsApp' | 'SMS' | 'Push';

export type CampaignStatus =
  | 'Live'
  | 'Scheduled'
  | 'Draft'
  | 'Paused'
  | 'Ended';

export type CampaignType =
  | 'Welcome'
  | 'Birthday'
  | 'Festival'
  | 'Win-back'
  | 'Bestseller drop'
  | 'Promo'
  | 'Loyalty reward'
  | 'Cart abandonment'
  | 'Restock alert';

export interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  tags: string[];
}

export interface CampaignMetrics {
  reach: number;
  sent: number;
  delivered: number;
  opens: number;
  clicks: number;
  conversions: number;
  revenue: number;
  spend: number;
}

export interface MessageVariant {
  id: string;
  channel: Channel;
  subject?: string;
  body: string;
  imageUrl?: string;
}

export interface CampaignTimelineEvent {
  id: string;
  at: string;
  text: string;
  type: 'created' | 'edited' | 'sent' | 'milestone' | 'paused' | 'ended' | 'system';
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  channels: Channel[];
  primaryChannel: Channel;
  segment: AudienceSegment;
  scheduledFor?: string;
  startedAt?: string;
  endedAt?: string;
  metrics: CampaignMetrics;
  goal: string;
  variants: MessageVariant[];
  timeline: CampaignTimelineEvent[];
  budgetInr: number;
  createdBy: string;
  aiGenerated: boolean;
}

export const channelColor: Record<Channel, string> = {
  WhatsApp: '#25D366',
  SMS: '#3B82F6',
  Push: '#A855F7',
};

export const statusColor: Record<CampaignStatus, string> = {
  Live: '#22C55E',
  Scheduled: '#3B82F6',
  Draft: '#94A3B8',
  Paused: '#F59E0B',
  Ended: '#64748B',
};

export const segments: AudienceSegment[] = [
  {
    id: 'seg-vip',
    name: 'VIP loyal customers',
    size: 248,
    tags: ['Tier: VIP', 'Spend > ₹25k', 'Visits > 6'],
  },
  {
    id: 'seg-lapsed',
    name: 'Lapsed shoppers',
    size: 612,
    tags: ['Last visit > 60d', 'Spent before'],
  },
  {
    id: 'seg-newcomers',
    name: 'New & curious',
    size: 184,
    tags: ['First visit < 30d', 'No purchase yet'],
  },
  {
    id: 'seg-birthday',
    name: 'Birthday this month',
    size: 87,
    tags: ['DOB May 2026', 'Regular+'],
  },
  {
    id: 'seg-festive',
    name: 'Festive high spenders',
    size: 324,
    tags: ['High AOV', 'Festive history'],
  },
  {
    id: 'seg-cart',
    name: 'Cart abandoners',
    size: 96,
    tags: ['Cart > ₹2k', '< 72h ago'],
  },
];

export const campaigns: Campaign[] = [
  {
    id: 'cmp-001',
    name: 'Summer Edit · 30% off',
    type: 'Promo',
    status: 'Live',
    channels: ['WhatsApp', 'SMS'],
    primaryChannel: 'WhatsApp',
    segment: segments[0],
    startedAt: '2 days ago',
    metrics: {
      reach: 248,
      sent: 248,
      delivered: 244,
      opens: 198,
      clicks: 86,
      conversions: 31,
      revenue: 142000,
      spend: 1850,
    },
    goal: 'Drive 25 conversions from VIP shoppers',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: 'Hi {{first_name}} 👋 Our Summer Edit is here — pick anything at 30% off (VIP only). Shop today: jio.in/summer',
        imageUrl: 'summer-edit.jpg',
      },
      {
        id: 'v2',
        channel: 'SMS',
        body: 'Jio Mart: {{first_name}}, 30% off VIP Summer Edit. Ends Sun. Reply YES.',
      },
    ],
    timeline: [
      { id: 't1', at: '2d ago · 10:14', text: 'Created by Priya', type: 'created' },
      { id: 't2', at: '2d ago · 10:32', text: 'Approved & sent to 248 customers', type: 'sent' },
      { id: 't3', at: '1d ago', text: '20% open rate milestone reached', type: 'milestone' },
      { id: 't4', at: '2h ago', text: 'AI suggests follow-up to 38 non-openers', type: 'system' },
    ],
    budgetInr: 5000,
    createdBy: 'Priya',
    aiGenerated: true,
  },
  {
    id: 'cmp-002',
    name: 'We miss you — back with 15% off',
    type: 'Win-back',
    status: 'Live',
    channels: ['WhatsApp', 'SMS'],
    primaryChannel: 'WhatsApp',
    segment: segments[1],
    startedAt: '5 days ago',
    metrics: {
      reach: 612,
      sent: 612,
      delivered: 598,
      opens: 322,
      clicks: 118,
      conversions: 42,
      revenue: 86400,
      spend: 3200,
    },
    goal: 'Reactivate 40+ lapsed shoppers',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: "{{first_name}}, we've missed you! Come back with 15% off your next visit. Code: COMEBACK15",
      },
    ],
    timeline: [
      { id: 't1', at: '5d ago', text: 'Created by AI Copilot', type: 'created' },
      { id: 't2', at: '5d ago', text: 'Sent to 612 lapsed shoppers', type: 'sent' },
      { id: 't3', at: '3d ago', text: '40 conversions hit · goal reached', type: 'milestone' },
    ],
    budgetInr: 8000,
    createdBy: 'AI Copilot',
    aiGenerated: true,
  },
  {
    id: 'cmp-003',
    name: 'Birthday gift · ₹500 voucher',
    type: 'Birthday',
    status: 'Live',
    channels: ['WhatsApp'],
    primaryChannel: 'WhatsApp',
    segment: segments[3],
    startedAt: 'today',
    metrics: {
      reach: 87,
      sent: 87,
      delivered: 87,
      opens: 64,
      clicks: 22,
      conversions: 8,
      revenue: 24600,
      spend: 0,
    },
    goal: 'Wish & convert birthday customers',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: '🎂 Happy birthday {{first_name}}! Use BDAY500 for ₹500 off any order this week. From Jio Mart 💜',
      },
    ],
    timeline: [
      { id: 't1', at: 'today · 9:00', text: 'Auto-triggered by Birthday Journey', type: 'created' },
      { id: 't2', at: 'today · 9:01', text: 'Sent to 87 customers', type: 'sent' },
    ],
    budgetInr: 0,
    createdBy: 'Journey',
    aiGenerated: false,
  },
  {
    id: 'cmp-004',
    name: 'Diwali Big Bash · Save ₹1500',
    type: 'Festival',
    status: 'Scheduled',
    channels: ['WhatsApp', 'SMS', 'Push'],
    primaryChannel: 'WhatsApp',
    segment: segments[4],
    scheduledFor: 'May 20 · 10:00 AM',
    metrics: {
      reach: 324,
      sent: 0,
      delivered: 0,
      opens: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      spend: 0,
    },
    goal: 'Drive ₹3L+ pre-festival revenue',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: 'Diwali Big Bash 🪔 {{first_name}}, save ₹1500 on orders above ₹5000. Early-access for festive shoppers.',
      },
    ],
    timeline: [
      { id: 't1', at: 'yesterday', text: 'Drafted by AI from Festive playbook', type: 'created' },
      { id: 't2', at: 'today', text: 'Scheduled for May 20 · 10:00 AM', type: 'edited' },
    ],
    budgetInr: 12000,
    createdBy: 'AI Copilot',
    aiGenerated: true,
  },
  {
    id: 'cmp-005',
    name: 'New denim drop · Tap to shop',
    type: 'Bestseller drop',
    status: 'Scheduled',
    channels: ['Push', 'WhatsApp'],
    primaryChannel: 'Push',
    segment: segments[2],
    scheduledFor: 'May 18 · 6:30 PM',
    metrics: {
      reach: 184,
      sent: 0,
      delivered: 0,
      opens: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      spend: 0,
    },
    goal: 'Drive first purchase for new visitors',
    variants: [
      {
        id: 'v1',
        channel: 'Push',
        body: 'Just dropped 👖 Slim denim, in your size. Tap to peek.',
      },
    ],
    timeline: [{ id: 't1', at: '3h ago', text: 'Created from template', type: 'created' }],
    budgetInr: 2500,
    createdBy: 'Rohit',
    aiGenerated: false,
  },
  {
    id: 'cmp-006',
    name: 'Cart waiting · Free shipping',
    type: 'Cart abandonment',
    status: 'Live',
    channels: ['WhatsApp'],
    primaryChannel: 'WhatsApp',
    segment: segments[5],
    startedAt: 'always-on',
    metrics: {
      reach: 96,
      sent: 96,
      delivered: 95,
      opens: 72,
      clicks: 38,
      conversions: 14,
      revenue: 41200,
      spend: 480,
    },
    goal: 'Recover 30%+ abandoned carts',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: '{{first_name}}, your cart is waiting 🛒 Free delivery if you check out in the next 24h.',
      },
    ],
    timeline: [
      { id: 't1', at: '7d ago', text: 'Journey enabled', type: 'created' },
      { id: 't2', at: 'continuous', text: 'Triggers when cart sits 6h+', type: 'system' },
    ],
    budgetInr: 3000,
    createdBy: 'Journey',
    aiGenerated: false,
  },
  {
    id: 'cmp-007',
    name: 'Old SMS push (legacy)',
    type: 'Promo',
    status: 'Ended',
    channels: ['SMS'],
    primaryChannel: 'SMS',
    segment: segments[1],
    startedAt: '24 days ago',
    endedAt: '10 days ago',
    metrics: {
      reach: 540,
      sent: 540,
      delivered: 522,
      opens: 142,
      clicks: 38,
      conversions: 11,
      revenue: 18900,
      spend: 2100,
    },
    goal: 'Test SMS reach',
    variants: [{ id: 'v1', channel: 'SMS', body: 'Jio Mart: Flat 10% off this weekend.' }],
    timeline: [{ id: 't1', at: '24d ago', text: 'Sent', type: 'sent' }],
    budgetInr: 4000,
    createdBy: 'Rohit',
    aiGenerated: false,
  },
  {
    id: 'cmp-008',
    name: 'Diwali · loyalty bonus',
    type: 'Loyalty reward',
    status: 'Draft',
    channels: ['WhatsApp'],
    primaryChannel: 'WhatsApp',
    segment: segments[0],
    metrics: {
      reach: 248,
      sent: 0,
      delivered: 0,
      opens: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      spend: 0,
    },
    goal: 'Reward 2x points to VIPs',
    variants: [
      {
        id: 'v1',
        channel: 'WhatsApp',
        body: 'VIP-only: Earn 2x loyalty points this Diwali. {{first_name}}, your status is showing 💜',
      },
    ],
    timeline: [{ id: 't1', at: 'today', text: 'Draft saved', type: 'created' }],
    budgetInr: 6000,
    createdBy: 'Priya',
    aiGenerated: true,
  },
];

export interface CampaignTemplate {
  id: string;
  name: string;
  type: CampaignType;
  channels: Channel[];
  description: string;
  defaultBody: string;
  popular: boolean;
}

export const templates: CampaignTemplate[] = [
  {
    id: 'tpl-welcome',
    name: 'Welcome new shopper',
    type: 'Welcome',
    channels: ['WhatsApp'],
    description: 'Greet first-time visitors with a small first-order offer.',
    defaultBody: 'Welcome to Jio Mart, {{first_name}} 🎉 Use WELCOME10 for 10% off your first order.',
    popular: true,
  },
  {
    id: 'tpl-birthday',
    name: 'Birthday gift',
    type: 'Birthday',
    channels: ['WhatsApp'],
    description: 'Auto-fire on birthdays with a personalised voucher.',
    defaultBody: '🎂 Happy birthday {{first_name}}! A small gift from us · code BDAY500.',
    popular: true,
  },
  {
    id: 'tpl-winback',
    name: 'Win-back lapsed',
    type: 'Win-back',
    channels: ['WhatsApp', 'SMS'],
    description: 'Re-engage customers who haven\'t visited in 60+ days.',
    defaultBody: 'We miss you {{first_name}}. Here\'s 15% off to bring you back.',
    popular: true,
  },
  {
    id: 'tpl-festive',
    name: 'Festival big bash',
    type: 'Festival',
    channels: ['WhatsApp', 'SMS', 'Push'],
    description: 'Multi-channel festive push with phased offers.',
    defaultBody: 'Festive sale starts now · save up to ₹{{amount}} on orders above ₹{{min}}.',
    popular: true,
  },
  {
    id: 'tpl-cart',
    name: 'Abandoned cart',
    type: 'Cart abandonment',
    channels: ['WhatsApp'],
    description: 'Recover carts that have been sitting > 6h.',
    defaultBody: 'Your cart is waiting 🛒 Free delivery if you check out in 24h.',
    popular: false,
  },
  {
    id: 'tpl-drop',
    name: 'New product drop',
    type: 'Bestseller drop',
    channels: ['Push', 'WhatsApp'],
    description: 'Hype a new launch to engaged followers.',
    defaultBody: 'Just dropped · {{product_name}}. Tap to peek before it sells out.',
    popular: false,
  },
  {
    id: 'tpl-restock',
    name: 'Back in stock alert',
    type: 'Restock alert',
    channels: ['WhatsApp', 'Push'],
    description: 'Notify customers who asked for restocks.',
    defaultBody: 'Good news {{first_name}} · {{product_name}} is back in stock 🎯',
    popular: false,
  },
  {
    id: 'tpl-loyalty',
    name: 'Loyalty point boost',
    type: 'Loyalty reward',
    channels: ['WhatsApp'],
    description: '2x points window for top tier customers.',
    defaultBody: 'VIP perk · Earn 2x points this weekend. Yours to claim, {{first_name}}.',
    popular: false,
  },
];

export const getCampaignById = (id: string): Campaign | null =>
  campaigns.find(c => c.id === id) ?? null;

export const summarizeMetrics = (m: CampaignMetrics) => {
  const deliveryRate = m.sent ? Math.round((m.delivered / m.sent) * 100) : 0;
  const openRate = m.delivered ? Math.round((m.opens / m.delivered) * 100) : 0;
  const clickRate = m.opens ? Math.round((m.clicks / m.opens) * 100) : 0;
  const conversionRate = m.delivered ? Math.round((m.conversions / m.delivered) * 100) : 0;
  const roi = m.spend ? Math.round((m.revenue / m.spend) * 100) / 100 : 0;
  return { deliveryRate, openRate, clickRate, conversionRate, roi };
};

export const formatInr = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

export interface AiSuggestion {
  id: string;
  title: string;
  body: string;
  segmentId?: string;
  templateId?: string;
  expectedReach?: number;
  expectedConversions?: number;
  confidence: 'high' | 'medium' | 'low';
}

export const aiSuggestions: AiSuggestion[] = [
  {
    id: 'ai-1',
    title: 'Re-engage 38 non-openers from Summer Edit',
    body: 'Send a softer follow-up via SMS to VIPs who haven\'t opened the WhatsApp message yet.',
    segmentId: 'seg-vip',
    expectedReach: 38,
    expectedConversions: 6,
    confidence: 'high',
  },
  {
    id: 'ai-2',
    title: 'Birthday voucher for 87 customers · this month',
    body: 'Trigger automatic birthday journey for 87 customers with DOB in May.',
    templateId: 'tpl-birthday',
    segmentId: 'seg-birthday',
    expectedReach: 87,
    expectedConversions: 14,
    confidence: 'high',
  },
  {
    id: 'ai-3',
    title: 'Push festive teaser to 324 high-AOV shoppers',
    body: 'Diwali is 14 days away — soft-launch festive offer to your highest spenders.',
    templateId: 'tpl-festive',
    segmentId: 'seg-festive',
    expectedReach: 324,
    expectedConversions: 48,
    confidence: 'medium',
  },
  {
    id: 'ai-4',
    title: 'Win-back 612 lapsed customers',
    body: 'A discount-led WhatsApp + SMS combo lifts return rate by ~8% on similar cohorts.',
    templateId: 'tpl-winback',
    segmentId: 'seg-lapsed',
    expectedReach: 612,
    expectedConversions: 42,
    confidence: 'high',
  },
];

export interface ChannelMix {
  channel: Channel;
  reach: number;
  conversions: number;
}

export const channelMix: ChannelMix[] = [
  { channel: 'WhatsApp', reach: 1287, conversions: 84 },
  { channel: 'SMS', reach: 540, conversions: 21 },
  { channel: 'Push', reach: 184, conversions: 8 },
];

export interface DailyPoint {
  day: string;
  reach: number;
  conversions: number;
  revenue: number;
}

export const last14Days: DailyPoint[] = [
  { day: 'Mon', reach: 120, conversions: 8, revenue: 12000 },
  { day: 'Tue', reach: 180, conversions: 10, revenue: 18900 },
  { day: 'Wed', reach: 220, conversions: 15, revenue: 24800 },
  { day: 'Thu', reach: 310, conversions: 22, revenue: 36400 },
  { day: 'Fri', reach: 280, conversions: 18, revenue: 31200 },
  { day: 'Sat', reach: 420, conversions: 28, revenue: 49600 },
  { day: 'Sun', reach: 360, conversions: 24, revenue: 41200 },
  { day: 'Mon', reach: 290, conversions: 19, revenue: 33400 },
  { day: 'Tue', reach: 340, conversions: 23, revenue: 38200 },
  { day: 'Wed', reach: 412, conversions: 30, revenue: 47200 },
  { day: 'Thu', reach: 482, conversions: 34, revenue: 52600 },
  { day: 'Fri', reach: 520, conversions: 38, revenue: 61400 },
  { day: 'Sat', reach: 612, conversions: 44, revenue: 72800 },
  { day: 'Sun', reach: 580, conversions: 42, revenue: 68400 },
];
