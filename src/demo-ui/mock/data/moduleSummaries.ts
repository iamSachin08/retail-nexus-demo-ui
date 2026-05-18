import type { ModuleSummary } from '../../types/module';

export const moduleSummaries: Record<string, ModuleSummary> = {
  'sales-orders': {
    primary: '₹4.1L',
    primaryLabel: 'TODAY',
    target: '₹4.5L',
    vsYesterday: '12% vs. yesterday',
    vsYesterdayDelta: 12,
    health: { score: 92, label: 'HEALTHY', tone: 'positive' },
    deltaPct: 8.9,
    needsAttention: false,
    context: 'Whitefield is 16% below target',
  },
  lead: {
    badge: 12,
    primary: '8',
    primaryLabel: 'CONVERTED / 12 TOTAL',
    conversion: { converted: 8, total: 12, pct: 67 },
    topSource: { label: 'TOP SOURCE', meta: 'Instagram (5 conv)' },
    maxLeads: { label: 'MAX LEADS', meta: 'Google (8 total)' },
    cta: { text: '2 Task Pending', tone: 'red' },
    needsAttention: false,
  },
  inventory: {
    demand: '450',
    statusBreakdown: [
      { label: 'Low Stock', value: '12', tone: 'warning' },
      { label: 'Out of Stock', value: '8', tone: 'critical' },
    ],
    prediction: {
      headline: '15 SKUs to purchase now',
      sub: 'Projected demand: 85 new SKUs likely next month',
    },
    health: { score: 78, label: 'HEALTH SCORE', tone: 'positive' },
    deltaPct: -3.1,
    needsAttention: false,
  },
  'know-product': {
    primary: 'Slim Denim',
    primaryLabel: 'top mover',
    needsAttention: false,
  },
  'know-customer': {
    primary: '184',
    primaryLabel: 'footfall today',
    needsAttention: false,
  },
  'ask-owner': {
    primary: '3 msgs',
    primaryLabel: 'pending',
    needsAttention: false,
  },
  procurement: {
    badge: 4,
    cta: { text: '4 task need attention', tone: 'red' },
    needsAttention: false,
  },
  campaigns: {
    liveCount: 3,
    primaryLabel: 'LIVE',
    performance: { value: '124', label: 'LEADS' },
    reachDelta: 15,
    needsAttention: false,
  },
  'task-management': {
    pending: 14,
    primaryLabel: 'PENDING / 28 TODAY',
    pendingBreakdown: [
      { label: 'SALES', value: '4', total: '8' },
      { label: 'LEADS', value: '3', total: '7' },
      { label: 'INVENTORY', value: '5', total: '9' },
      { label: 'CUSTOMERS', value: '2', total: '4' },
    ],
    cta: { text: '2 tasks need attention', tone: 'red' },
    needsAttention: true,
  },
};
