import { initialLeads, type Lead, type LeadSource, type LeadStatus } from '../mock/data/leadManagement';
import { salesDashboard, targetPrediction } from '../mock/data/salesOrders';

export type IntentKind =
  | 'add-lead'
  | 'leads-today'
  | 'leads-list'
  | 'sales-target-today'
  | 'monthly-target-advice'
  | 'unknown';

export interface ParsedLeadDraft {
  customerName: string;
  customerPhone: string;
  budget: number;
  leadSource: LeadSource;
  leadStatus: LeadStatus;
  notes?: string;
}

export interface IntentMatch {
  kind: IntentKind;
  text: string;
  /** Fields parsed from utterance, only present for some intents. */
  draft?: ParsedLeadDraft;
}

const todayDdMmYyyy = (): string => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
};

const PHONE_RE = /(\+?\d[\d\s\-]{8,14}\d)/;
const BUDGET_RE = /(?:budget|worth|₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)\s*(k|l|lakh|lac|cr|crore)?/i;
const SOURCE_HINTS: Array<{ kw: RegExp; src: LeadSource }> = [
  { kw: /whats\s*app|whatsapp|\bwa\b/i, src: 'WhatsApp' },
  { kw: /insta|instagram/i, src: 'Instagram' },
  { kw: /face\s*book|\bfb\b/i, src: 'Facebook' },
  { kw: /referr?al|referred|friend/i, src: 'Referral' },
  { kw: /walk[\s-]?in|offline|in[\s-]?store/i, src: 'Walk-in/Offline' },
];

/** Words that mark the end of a name when scanning. */
const NAME_STOPS = /\b(number|no\.?|phone|ph|mobile|mob|contact|budget|worth|via|from|source|email|address|notes?|status|whats?\s*app|insta|instagram|facebook|fb|referr?al|walk|offline|and|with|at|is|are|for|lead|customer)\b/i;

function titleCase(s: string): string {
  return s
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function parseBudget(t: string): number | undefined {
  const m = t.match(BUDGET_RE);
  if (!m) return undefined;
  const num = parseFloat(m[1].replace(/,/g, ''));
  const unit = (m[2] ?? '').toLowerCase();
  if (unit === 'k') return Math.round(num * 1000);
  if (unit === 'l' || unit === 'lakh' || unit === 'lac') return Math.round(num * 100000);
  if (unit === 'cr' || unit === 'crore') return Math.round(num * 10000000);
  return Math.round(num);
}

function parseSource(t: string): LeadSource {
  for (const h of SOURCE_HINTS) if (h.kw.test(t)) return h.src;
  return 'Walk-in/Offline';
}

/** Attempt to pull a person's name out of an "add lead" command (case-insensitive, voice-friendly). */
function parseName(t: string): string | undefined {
  // Look for an explicit marker first: "for/named/name is/customer <name>"
  const marker = t.match(/(?:for|name(?:d)?(?:\s+is)?|customer)\s+(?:mr\.?|mrs\.?|ms\.?|miss\.?)?\s*([a-zA-Z][a-zA-Z\s.]{1,60})/i);
  if (marker) {
    let raw = marker[1].trim();
    const stop = raw.search(NAME_STOPS);
    if (stop > 0) raw = raw.slice(0, stop).trim();
    raw = raw.replace(/[.,]+$/, '').trim();
    const words = raw.split(/\s+/).filter(Boolean).slice(0, 3);
    if (words.length) return titleCase(words.join(' '));
  }
  // Fallback: "Mr./Mrs./Ms. <name>"
  const honor = t.match(/(?:mr\.?|mrs\.?|ms\.?|miss\.?)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i);
  if (honor) return titleCase(honor[1]);
  return undefined;
}

export function parseIntent(raw: string): IntentMatch {
  const t = raw.trim();
  const low = t.toLowerCase();

  // Loose add-lead detection: any preamble ("please", "can you", "hey", etc.) is fine.
  // Trigger = (add/create/register/new/log/save/note) + (lead/customer/contact/client),
  // and not a "show/list/view" request.
  const hasAddVerb = /\b(add|create|register|new|log|save|note|put\s+down)\b/i.test(t);
  const hasLeadNoun = /\b(lead|customer|contact|client)s?\b/i.test(t);
  const isShowing = /\b(show|list|view|find|see|display|get|fetch|open|which)\b/i.test(t);
  if (hasAddVerb && hasLeadNoun && !isShowing) {
    const phone = (t.match(PHONE_RE)?.[1] ?? '').replace(/[\s\-]+/g, '');
    const budget = parseBudget(t);
    const name = parseName(t);
    return {
      kind: 'add-lead',
      text: t,
      draft: {
        customerName: name ?? 'New Customer',
        customerPhone: phone || '',
        budget: budget ?? 0,
        leadSource: parseSource(t),
        leadStatus: 'New Lead',
      },
    };
  }

  if (low.includes('contact') && (low.includes('today') || low.includes('now'))) {
    return { kind: 'leads-today', text: t };
  }
  if (
    /^(show|list|view).*(lead|leads)$/i.test(low) ||
    low.includes('all leads') ||
    low.includes('follow ?up')
  ) {
    return { kind: 'leads-list', text: t };
  }
  if (
    (low.includes('sales') || low.includes('target')) &&
    (low.includes('today') || low.includes('now') || low.includes('status'))
  ) {
    return { kind: 'sales-target-today', text: t };
  }
  if (
    low.includes('monthly') ||
    (low.includes('month') && (low.includes('target') || low.includes('achieve'))) ||
    low.includes('hit') && low.includes('target')
  ) {
    return { kind: 'monthly-target-advice', text: t };
  }
  return { kind: 'unknown', text: t };
}

export interface LeadsToday {
  count: number;
  leads: Lead[];
}

export function leadsToContactToday(leads: Lead[]): LeadsToday {
  const today = todayDdMmYyyy();
  const filtered = leads.filter(
    l => l.followUpDate === today && l.leadStatus !== 'Converted' && l.leadStatus !== 'Lost',
  );
  return { count: filtered.length, leads: filtered };
}

export function buildLead(draft: ParsedLeadDraft): Lead {
  const id = `L-${Math.floor(Math.random() * 9000 + 1000)}`;
  return {
    leadId: id,
    customerName: draft.customerName || 'New Customer',
    customerPhone: draft.customerPhone || '',
    leadSource: draft.leadSource,
    leadStatus: draft.leadStatus,
    intent: 'warm',
    budget: draft.budget || 0,
    productLines: [],
    productsInterested: '',
    lastTouch: 'Just added via Shop Assistant',
    daysSinceTouch: 0,
    followUpDate: todayDdMmYyyy(),
    notes: draft.notes,
  };
}

export function salesTargetSnapshot() {
  const { actualToday, targetToday, totalOrders } = salesDashboard;
  const pct = Math.round((actualToday / targetToday) * 100);
  const remaining = Math.max(targetToday - actualToday, 0);
  const status: 'on-track' | 'behind' | 'ahead' =
    pct >= 100 ? 'ahead' : pct >= 80 ? 'on-track' : 'behind';
  return {
    actualToday,
    targetToday,
    pct,
    remaining,
    status,
    orders: totalOrders,
    predictedEod: targetPrediction.predictedEod,
  };
}

export function monthlyTargetSuggestions(): string[] {
  return [
    'Push WhatsApp campaign on Slim-fit Denim — top seller, 32% of orders.',
    'Schedule a 10% Saturday flash drop — Sat consistently your highest revenue day.',
    'Re-engage 12 leads with status "Interested" — 3 are following up today.',
    'Restock Linen Shirt L — out-of-stock since Tuesday, currently lost ~₹18K/day.',
    'Bundle Cotton Tee + Belt at counter — 4 of 6 walk-ins took it last week.',
  ];
}

/** Used to preview "would you like to add this lead?" before persisting. */
export function previewDraft(draft: ParsedLeadDraft): string {
  const parts: string[] = [];
  parts.push(draft.customerName);
  if (draft.customerPhone) parts.push(`📞 ${draft.customerPhone}`);
  if (draft.budget) parts.push(`Budget ₹${draft.budget.toLocaleString('en-IN')}`);
  parts.push(`via ${draft.leadSource}`);
  return parts.join(' · ');
}

export const ASSISTANT_PROMPTS: string[] = [
  'Add lead for Mr. Sharma 9876543210 budget 25000 via WhatsApp',
  'Show me leads to be contacted today',
  'What is the status of my sales target for today?',
  'What can I do to achieve my monthly target this month?',
];

export type IntentResult =
  | { kind: 'text'; body: string }
  | { kind: 'lead-preview'; draft: ParsedLeadDraft; body: string }
  | { kind: 'lead-added'; lead: Lead; body: string }
  | { kind: 'leads-today'; data: LeadsToday; body: string }
  | { kind: 'sales-target'; data: ReturnType<typeof salesTargetSnapshot>; body: string }
  | { kind: 'monthly-advice'; tips: string[]; body: string };

export function unknownReply(raw: string): IntentResult {
  return {
    kind: 'text',
    body:
      raw.length < 4
        ? "Try asking me to add a lead, show today's follow-ups, or check your sales target."
        : "I'm not sure how to handle that yet. Try: 'add lead', 'leads to contact today', 'sales target today', or 'how to hit monthly target'.",
  };
}

// Keep a reference so we can demonstrate empty-state behavior consistently
export const SEED_LEADS = initialLeads;
