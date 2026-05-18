export type TaskFrequency = 'daily' | 'weekly' | 'monthly' | 'adhoc';
export type TaskCategory =
  | 'Sales'
  | 'Inventory'
  | 'Leads'
  | 'Customer'
  | 'Visual'
  | 'Hygiene'
  | 'Reporting'
  | 'Staff';
export type TaskPriority = 'high' | 'medium' | 'low';
export type ReportStatus = 'submitted' | 'overdue' | 'awaiting';

export type TaskStatus = 'PENDING' | 'PARTIAL' | 'COMPLETE' | 'OVERDUE';
export type TaskStepStatus = 'DONE' | 'ACTIVE' | 'PENDING';
export type TaskStepAction = 'confirm' | 'goto' | 'upload';

export interface TaskStep {
  label: string;
  status: TaskStepStatus;
  action: { kind: TaskStepAction; label: string };
}

export interface TaskHistoryEvent {
  when: string;
  by: string;
  event: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  frequency: TaskFrequency;
  category: TaskCategory;
  priority: TaskPriority;
  expectedMins: number;
  dueLabel: string;
  assignee: string;
  createdBy: string;
  createdAt: string;
  active: boolean;
  /** Day-of execution status — derived from the latest report. */
  status?: TaskStatus;
  /** True when the task missed its due time today. */
  overdue?: boolean;
  /** Short due-time string shown in the list ("before 10:00 AM"). */
  dueShort?: string;
  /** Day label shown alongside the time ("Today", "Fri", "Mon"). */
  dueDay?: string;
  /** Role string used in list meta ("Store Manager"). */
  assigneeRole?: string;
  /** Human-readable duration ("10 min", "1 hr 30 min"). */
  duration?: string;
  /** AI-generated narrative explaining why the task matters. */
  aiImpact?: string;
  /** Ordered step list shown in the detail sheet. */
  steps?: TaskStep[];
  /** Audit-trail events shown in the detail sheet. */
  history?: TaskHistoryEvent[];
}

export interface TaskComment {
  id: string;
  author: string;
  role: 'Owner' | 'Manager';
  at: string;
  text: string;
}

export interface TaskReport {
  id: string;
  taskId: string;
  taskTitle: string;
  frequency: TaskFrequency;
  category: TaskCategory;
  periodLabel: string;
  submittedAt?: string;
  status: ReportStatus;
  completionPct: number;
  summary: string;
  metrics: { label: string; value: string }[];
  photos?: string[];
  comments: TaskComment[];
  ownerSeen: boolean;
}

export const taskCategoryColor: Record<TaskCategory, string> = {
  Sales: '#4FCB7C',
  Inventory: '#2F6FED',
  Leads: '#E8743F',
  Customer: '#A77BEB',
  Visual: '#A855F7',
  Hygiene: '#26C5A8',
  Reporting: '#F4A93E',
  Staff: '#FB923C',
};

/** Soft / text tints for category chips. Mirrors the ShopOS design. */
export const taskCategorySoft: Record<TaskCategory, string> = {
  Sales: 'rgba(79,203,124,0.16)',
  Inventory: 'rgba(47,111,237,0.20)',
  Leads: 'rgba(232,116,63,0.20)',
  Customer: 'rgba(167,123,235,0.18)',
  Visual: 'rgba(168,85,247,0.18)',
  Hygiene: 'rgba(38,197,168,0.16)',
  Reporting: 'rgba(244,169,62,0.18)',
  Staff: 'rgba(251,146,60,0.18)',
};

export const taskCategoryText: Record<TaskCategory, string> = {
  Sales: '#4FCB7C',
  Inventory: '#86A6FF',
  Leads: '#FF9966',
  Customer: '#C7A8FF',
  Visual: '#C7A8FF',
  Hygiene: '#3FE0C2',
  Reporting: '#F4A93E',
  Staff: '#FFB28A',
};

/** Frequency → muted accent used on tag pills. */
export const frequencyColor: Record<TaskFrequency, string> = {
  daily: '#9CA8FF',
  weekly: '#C7A8FF',
  monthly: '#F4A93E',
  adhoc: '#cfcfd2',
};

export const taskCategoryGradient: Record<TaskCategory, string> = {
  Sales: 'linear-gradient(135deg, #16D9A4 0%, #0EA47A 100%)',
  Inventory: 'linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)',
  Leads: 'linear-gradient(135deg, #FF8A4C 0%, #E8743F 100%)',
  Customer: 'linear-gradient(135deg, #FF8AB1 0%, #E5345C 100%)',
  Visual: 'linear-gradient(135deg, #B47CFF 0%, #7C5CFF 100%)',
  Hygiene: 'linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)',
  Reporting: 'linear-gradient(135deg, #FFD166 0%, #F2994A 100%)',
  Staff: 'linear-gradient(135deg, #FF8A4C 0%, #FF5470 100%)',
};

export const priorityColor: Record<TaskPriority, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#3B82F6',
};

/* ─────────────────────────────────────────────────────────────
 * Full task set lifted from the ShopOS design (task-data.jsx).
 * 20 tasks across all categories, with steps/history/aiImpact —
 * enables the detail sheet, insights, dashboard, and list views.
 * ───────────────────────────────────────────────────────────── */
export const allTasks: TaskDefinition[] = [
  {
    id: 't01',
    title: 'Morning store walk-through',
    description:
      'Walk the store before opening. Verify lights, AC, music, shutter, signage. Note anything broken.',
    frequency: 'daily',
    category: 'Hygiene',
    priority: 'high',
    expectedMins: 10,
    duration: '10 min',
    dueLabel: 'Today · before 10:00 AM',
    dueShort: 'before 10:00 AM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'A clean opening floor lifts walk-in conversion by ~6% versus a delayed open. Critical for the 10–11 AM rush.',
    steps: [
      { label: 'Check shutter, signage & lights', status: 'DONE', action: { kind: 'confirm', label: 'Mark verified' } },
      { label: 'Test POS, music, AC zones', status: 'ACTIVE', action: { kind: 'goto', label: 'Open hardware panel →' } },
      { label: 'Photo of clean floor for audit log', status: 'PENDING', action: { kind: 'upload', label: 'Upload floor photo' } },
    ],
    history: [
      { when: 'Today · 8:42 AM', by: 'System', event: 'Task auto-generated for daily routine' },
      { when: 'Today · 9:04 AM', by: 'Rohit', event: 'Marked Step 1 as verified' },
      { when: 'Today · 9:11 AM', by: 'Rohit', event: 'Started Step 2 — Hardware panel' },
    ],
  },
  {
    id: 't02',
    title: 'Cash drawer & POS reconciliation',
    description:
      'Confirm opening float matches last evening close. Run POS test transaction. Capture POS day-open photo.',
    frequency: 'daily',
    category: 'Reporting',
    priority: 'high',
    expectedMins: 8,
    duration: '8 min',
    dueLabel: 'Today · before 10:30 AM',
    dueShort: 'before 10:30 AM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
    status: 'OVERDUE',
    overdue: true,
    aiImpact:
      'A 15-minute reconciliation delay correlates with a ₹2.4K average cash variance by EOD. Highest-value 8 minutes of your morning.',
    steps: [
      { label: 'Count opening cash float', status: 'PENDING', action: { kind: 'confirm', label: 'Enter opening float' } },
      { label: 'Run ₹1 POS test transaction', status: 'PENDING', action: { kind: 'goto', label: 'Open POS →' } },
      { label: 'Photo of drawer for audit', status: 'PENDING', action: { kind: 'upload', label: 'Upload drawer photo' } },
    ],
    history: [
      { when: 'Today · 8:00 AM', by: 'System', event: 'Daily task generated' },
      { when: 'Today · 10:30 AM', by: 'System', event: 'Auto-flagged as Overdue' },
    ],
  },
  {
    id: 't03',
    title: 'Refill fast-moving SKUs from back-store',
    description:
      'Top up the front-of-store racks for the morning rush. Focus on listed bestsellers and yesterday’s stockouts.',
    frequency: 'daily',
    category: 'Inventory',
    priority: 'medium',
    expectedMins: 25,
    duration: '25 min',
    dueLabel: 'Today · before 11:00 AM',
    dueShort: 'before 11:00 AM',
    dueDay: 'Today',
    assignee: 'Suresh',
    assigneeRole: 'Floor Staff',
    createdBy: 'Owner',
    createdAt: '2026-05-03',
    active: true,
    status: 'PARTIAL',
    overdue: false,
    aiImpact:
      'Refilling 12 bestseller SKUs before 11 AM protects roughly ₹38K in expected morning revenue (3 out-of-stocks yesterday).',
    steps: [
      { label: 'Pick listed bestsellers (12 SKUs)', status: 'DONE', action: { kind: 'goto', label: 'View bestseller list →' } },
      { label: 'Restock front racks', status: 'ACTIVE', action: { kind: 'goto', label: 'Open inventory →' } },
      { label: 'Update visible stock in app', status: 'PENDING', action: { kind: 'confirm', label: 'Mark restocked' } },
    ],
    history: [
      { when: 'Today · 8:00 AM', by: 'System', event: 'Daily task generated' },
      { when: 'Today · 10:14 AM', by: 'Suresh', event: 'Started picking from back-store' },
      { when: 'Today · 10:42 AM', by: 'Suresh', event: 'Completed Step 1 — picked 12 SKUs' },
    ],
  },
  {
    id: 't04',
    title: 'Evening EOD report',
    description:
      'Submit end-of-day totals: revenue, footfall, top sellers, abandoned baskets, returns, cash variance.',
    frequency: 'daily',
    category: 'Reporting',
    priority: 'high',
    expectedMins: 12,
    duration: '12 min',
    dueLabel: 'Today · before 9:30 PM',
    dueShort: 'before 9:30 PM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'EOD submitted by 9:30 PM unlocks tomorrow’s replenishment + AI demand forecast. Every 30-min delay pushes morning restock by the same.',
    steps: [
      { label: 'Close all open tabs in POS', status: 'PENDING', action: { kind: 'goto', label: 'Open POS →' } },
      { label: 'Reconcile cash & card', status: 'PENDING', action: { kind: 'confirm', label: 'Enter totals' } },
      { label: 'Submit report', status: 'PENDING', action: { kind: 'confirm', label: 'Submit EOD' } },
    ],
    history: [{ when: 'Today · 6:00 PM', by: 'System', event: 'Daily task generated' }],
  },
  {
    id: 't05',
    title: 'Call back 6 hot leads from yesterday',
    description:
      'Priya, Arjun, Rohit, Anita — high AI win-score, no contact in last 24 h. Use today’s 10% off voucher.',
    frequency: 'daily',
    category: 'Leads',
    priority: 'high',
    expectedMins: 40,
    duration: '40 min',
    dueLabel: 'Today · before 1:00 PM',
    dueShort: 'before 1:00 PM',
    dueDay: 'Today',
    assignee: 'Ashish',
    assigneeRole: 'Sales Associate',
    createdBy: 'Owner',
    createdAt: '2026-05-05',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Hot leads called back the next day convert 2.3× more often than 48-hour callbacks. Closing all 6 ≈ ₹1.4L pipeline.',
    steps: [
      { label: 'Open leads queue (6 hot)', status: 'PENDING', action: { kind: 'goto', label: 'Open leads →' } },
      { label: 'Call & log outcome each', status: 'PENDING', action: { kind: 'confirm', label: 'Log call outcome' } },
      { label: 'Schedule store visits', status: 'PENDING', action: { kind: 'confirm', label: 'Book visits' } },
    ],
    history: [{ when: 'Today · 9:00 AM', by: 'AI Coach', event: 'Suggested 6 high-priority callbacks' }],
  },
  {
    id: 't06',
    title: 'Send abandoned-cart WhatsApp nudge',
    description:
      'Yesterday 18 carts >₹2K abandoned. Auto-template ready — send before 11 AM for best read rate.',
    frequency: 'daily',
    category: 'Customer',
    priority: 'medium',
    expectedMins: 6,
    duration: '6 min',
    dueLabel: 'Today · before 11:00 AM',
    dueShort: 'before 11:00 AM',
    dueDay: 'Today',
    assignee: 'Ashish',
    assigneeRole: 'Sales Associate',
    createdBy: 'Owner',
    createdAt: '2026-05-05',
    active: true,
    status: 'COMPLETE',
    overdue: false,
    aiImpact:
      'Recoveries average ₹620 per cart at 11% reply rate. ~₹12K expected today.',
    steps: [
      { label: 'Review 18 abandoned carts', status: 'DONE', action: { kind: 'goto', label: 'View carts →' } },
      { label: 'Send WhatsApp template', status: 'DONE', action: { kind: 'confirm', label: 'Send blast' } },
      { label: 'Log outcomes by 6 PM', status: 'DONE', action: { kind: 'confirm', label: 'Log outcomes' } },
    ],
    history: [
      { when: 'Today · 9:14 AM', by: 'Ashish', event: 'Sent template to 18 contacts' },
      { when: 'Today · 9:32 AM', by: 'Ashish', event: 'Marked task complete' },
    ],
  },
  {
    id: 't07',
    title: 'Restroom & changing room deep-clean',
    description:
      'Daily sanitisation + mirror polish + restock soap and tissue. Photo for audit.',
    frequency: 'daily',
    category: 'Hygiene',
    priority: 'medium',
    expectedMins: 15,
    duration: '15 min',
    dueLabel: 'Today · before 12:00 PM',
    dueShort: 'before 12:00 PM',
    dueDay: 'Today',
    assignee: 'Lakshmi',
    assigneeRole: 'Housekeeping',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'COMPLETE',
    overdue: false,
    aiImpact:
      'Hygiene audit score directly affects Google reviews. A 4.7+ rating drives ~14% more local search traffic.',
    steps: [
      { label: 'Sanitise surfaces', status: 'DONE', action: { kind: 'confirm', label: 'Mark clean' } },
      { label: 'Restock consumables', status: 'DONE', action: { kind: 'confirm', label: 'Mark restocked' } },
      { label: 'Upload audit photo', status: 'DONE', action: { kind: 'upload', label: 'Photo uploaded' } },
    ],
    history: [{ when: 'Today · 11:42 AM', by: 'Lakshmi', event: 'Marked task complete' }],
  },
  {
    id: 't08',
    title: 'AC compressor service check',
    description:
      'Vendor visit pre-booked. Note compressor noise, gas pressure, drain line clear. Sign off vendor sheet.',
    frequency: 'monthly',
    category: 'Hygiene',
    priority: 'high',
    expectedMins: 30,
    duration: '30 min',
    dueLabel: 'Today · before 4:00 PM',
    dueShort: 'before 4:00 PM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-30',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'A 2°C cooler floor in summer correlates with 9% longer dwell time per shopper. Compliance also extends compressor life ~14 months.',
    steps: [
      { label: 'Meet vendor at 3:30 PM', status: 'PENDING', action: { kind: 'confirm', label: 'Vendor arrived' } },
      { label: 'Note readings on checklist', status: 'PENDING', action: { kind: 'upload', label: 'Upload checklist' } },
      { label: 'Sign-off vendor sheet', status: 'PENDING', action: { kind: 'confirm', label: 'Sign sheet' } },
    ],
    history: [{ when: 'Yesterday · 6:30 PM', by: 'Rohit', event: 'Booked vendor for today 3:30 PM' }],
  },
  {
    id: 't09',
    title: 'Reconfirm 4 store-visit appointments',
    description:
      'Customers booked for AC demos today. Re-confirm slot via WhatsApp; share parking + offer details.',
    frequency: 'daily',
    category: 'Customer',
    priority: 'high',
    expectedMins: 8,
    duration: '8 min',
    dueLabel: 'Today · before 10:30 AM',
    dueShort: 'before 10:30 AM',
    dueDay: 'Today',
    assignee: 'Ashish',
    assigneeRole: 'Sales Associate',
    createdBy: 'Owner',
    createdAt: '2026-05-05',
    active: true,
    status: 'OVERDUE',
    overdue: true,
    aiImpact:
      'Confirmed store visits show up 78% of the time vs. 41% unconfirmed. Expected impact today: 2.5 extra walk-ins.',
    steps: [
      { label: 'Review 4 booked slots', status: 'PENDING', action: { kind: 'goto', label: 'Open calendar →' } },
      { label: 'Send confirmation WA', status: 'PENDING', action: { kind: 'confirm', label: 'Send messages' } },
      { label: 'Log reply outcomes', status: 'PENDING', action: { kind: 'confirm', label: 'Log replies' } },
    ],
    history: [
      { when: 'Today · 8:00 AM', by: 'System', event: 'Daily task generated' },
      { when: 'Today · 10:30 AM', by: 'System', event: 'Auto-flagged as Overdue' },
    ],
  },
  {
    id: 't10',
    title: 'Cycle count: Refrigerators row',
    description:
      'Spot-count Row R3. Confirm physical = system. Flag any variance >2 units.',
    frequency: 'weekly',
    category: 'Inventory',
    priority: 'medium',
    expectedMins: 20,
    duration: '20 min',
    dueLabel: 'Today · before EOD',
    dueShort: 'before EOD',
    dueDay: 'Today',
    assignee: 'Suresh',
    assigneeRole: 'Floor Staff',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Weekly cycle counts on top 5 categories reduce shrinkage by ~0.6 percentage points — about ₹38K/quarter at current revenue.',
    steps: [
      { label: 'Open inventory · Row R3', status: 'PENDING', action: { kind: 'goto', label: 'Open R3 →' } },
      { label: 'Count each SKU', status: 'PENDING', action: { kind: 'confirm', label: 'Enter counts' } },
      { label: 'Submit variance report', status: 'PENDING', action: { kind: 'confirm', label: 'Submit' } },
    ],
    history: [{ when: 'Today · 8:00 AM', by: 'System', event: 'Weekly cycle-count task generated' }],
  },
  {
    id: 't11',
    title: 'Verify vendor PO #4451 received',
    description:
      '12 SKUs from Voltbox vendor arrived this morning. Match invoice, verify quality, accept or flag.',
    frequency: 'adhoc',
    category: 'Inventory',
    priority: 'high',
    expectedMins: 18,
    duration: '18 min',
    dueLabel: 'Today · before 2:00 PM',
    dueShort: 'before 2:00 PM',
    dueDay: 'Today',
    assignee: 'Suresh',
    assigneeRole: 'Floor Staff',
    createdBy: 'Owner',
    createdAt: '2026-05-15',
    active: true,
    status: 'PARTIAL',
    overdue: false,
    aiImpact:
      'Same-day GRN keeps the SKU sale-ready and prevents ~₹14K weekend revenue loss on these fast-moving items.',
    steps: [
      { label: 'Match items vs invoice', status: 'DONE', action: { kind: 'confirm', label: 'Match complete' } },
      { label: 'Quality + damage check', status: 'ACTIVE', action: { kind: 'upload', label: 'Upload damage photos' } },
      { label: 'Accept / flag PO', status: 'PENDING', action: { kind: 'confirm', label: 'Submit GRN' } },
    ],
    history: [
      { when: 'Today · 10:00 AM', by: 'Voltbox', event: 'PO #4451 marked Delivered' },
      { when: 'Today · 11:08 AM', by: 'Suresh', event: 'Started receipt check' },
    ],
  },
  {
    id: 't12',
    title: 'Birthday outreach — 9 customers this week',
    description:
      'Send personalised WhatsApp + ₹500 voucher. AI has drafted messages — review & approve.',
    frequency: 'weekly',
    category: 'Customer',
    priority: 'low',
    expectedMins: 10,
    duration: '10 min',
    dueLabel: 'This week · before Fri',
    dueShort: 'before EOD',
    dueDay: 'Fri',
    assignee: 'Ashish',
    assigneeRole: 'Sales Associate',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Birthday vouchers convert at 22% within 14 days, ~₹2.1K average ticket. Expected: ₹4.2K of revenue.',
    steps: [
      { label: 'Review 9 AI-drafted messages', status: 'PENDING', action: { kind: 'goto', label: 'Open drafts →' } },
      { label: 'Send batch', status: 'PENDING', action: { kind: 'confirm', label: 'Send all' } },
    ],
    history: [{ when: 'Mon · 9:00 AM', by: 'AI Coach', event: 'Drafted messages for 9 birthdays' }],
  },
  {
    id: 't13',
    title: 'POS day-close photo',
    description:
      'Capture final POS screen showing day totals and submit as part of EOD packet.',
    frequency: 'daily',
    category: 'Reporting',
    priority: 'low',
    expectedMins: 3,
    duration: '3 min',
    dueLabel: 'Today · before 10:00 PM',
    dueShort: 'before 10:00 PM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact: 'Reduces month-end audit time by ~40 minutes per store.',
    steps: [
      { label: 'Open POS day totals', status: 'PENDING', action: { kind: 'goto', label: 'Open POS →' } },
      { label: 'Upload screen photo', status: 'PENDING', action: { kind: 'upload', label: 'Upload photo' } },
    ],
    history: [{ when: 'Today · 6:00 PM', by: 'System', event: 'Daily task generated' }],
  },
  {
    id: 't14',
    title: 'Approve weekly marketing creatives',
    description:
      'AI has produced 4 creative variants for the weekend AC sale. Pick winner, approve copy.',
    frequency: 'weekly',
    category: 'Sales',
    priority: 'medium',
    expectedMins: 8,
    duration: '8 min',
    dueLabel: 'This week · before EOD Thu',
    dueShort: 'before EOD',
    dueDay: 'Thu',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Approved on time, Friday-launch reach is 1.6× higher than Sat-morning launches. ~₹68K incremental weekend sales.',
    steps: [
      { label: 'Review 4 creatives', status: 'PENDING', action: { kind: 'goto', label: 'Open campaign studio →' } },
      { label: 'Pick winner + sign-off', status: 'PENDING', action: { kind: 'confirm', label: 'Approve' } },
    ],
    history: [{ when: 'Mon · 11:00 AM', by: 'AI Coach', event: 'Generated 4 creative variants' }],
  },
  {
    id: 't15',
    title: 'Run morning huddle — 5 min stand-up',
    description:
      'Daily targets, top SKUs to push, any customer escalations from yesterday.',
    frequency: 'daily',
    category: 'Sales',
    priority: 'high',
    expectedMins: 5,
    duration: '5 min',
    dueLabel: 'Today · before 10:00 AM',
    dueShort: 'before 10:00 AM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
    status: 'COMPLETE',
    overdue: false,
    aiImpact:
      'Stores with a morning huddle hit daily target 11% more often. Direct lift on revenue predictability.',
    steps: [
      { label: 'Share today’s target', status: 'DONE', action: { kind: 'confirm', label: 'Target shared' } },
      { label: 'Run through top 5 SKUs', status: 'DONE', action: { kind: 'confirm', label: 'Reviewed' } },
      { label: 'Log attendance', status: 'DONE', action: { kind: 'confirm', label: 'Logged' } },
    ],
    history: [{ when: 'Today · 9:55 AM', by: 'Rohit', event: 'Marked huddle complete' }],
  },
  {
    id: 't16',
    title: 'Follow up on 3 cold leads >14 days',
    description:
      'AI-flagged ‘silent’ leads with mid win-score. Send re-engagement WA with new arrivals.',
    frequency: 'weekly',
    category: 'Leads',
    priority: 'low',
    expectedMins: 15,
    duration: '15 min',
    dueLabel: 'This week · before Fri',
    dueShort: 'before EOD',
    dueDay: 'Fri',
    assignee: 'Ashish',
    assigneeRole: 'Sales Associate',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Re-engaging cold leads recovers ~9% of pipeline that would otherwise time out.',
    steps: [
      { label: 'Open 3 cold leads', status: 'PENDING', action: { kind: 'goto', label: 'Open leads →' } },
      { label: 'Send re-engage WA', status: 'PENDING', action: { kind: 'confirm', label: 'Send' } },
    ],
    history: [{ when: 'Mon · 8:30 AM', by: 'AI Coach', event: 'Flagged 3 cold leads for re-engagement' }],
  },
  {
    id: 't17',
    title: 'Customer feedback responses (8 pending)',
    description:
      '4 Google reviews + 4 in-app reviews. Reply within 24 h to maintain rating score.',
    frequency: 'daily',
    category: 'Customer',
    priority: 'medium',
    expectedMins: 12,
    duration: '12 min',
    dueLabel: 'Today · before 6:00 PM',
    dueShort: 'before 6:00 PM',
    dueDay: 'Today',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'Stores responding to all reviews <24 h carry a 0.3-star higher rating on average.',
    steps: [
      { label: 'Open reviews queue', status: 'PENDING', action: { kind: 'goto', label: 'Open reviews →' } },
      { label: 'Reply each', status: 'PENDING', action: { kind: 'confirm', label: 'Mark replied' } },
    ],
    history: [{ when: 'Today · 8:00 AM', by: 'System', event: 'Pulled 8 unanswered reviews' }],
  },
  {
    id: 't18',
    title: 'Audit price tags vs system — Aisle 4',
    description:
      'Quick spot-audit. Rotating zone this week is Aisle 4. Flag any mismatch >5%.',
    frequency: 'weekly',
    category: 'Hygiene',
    priority: 'low',
    expectedMins: 20,
    duration: '20 min',
    dueLabel: 'This week · before Fri EOD',
    dueShort: 'before EOD',
    dueDay: 'Fri',
    assignee: 'Suresh',
    assigneeRole: 'Floor Staff',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PARTIAL',
    overdue: false,
    aiImpact:
      'Catching tag mismatches saves an average ₹4.6K/week in incorrect-pricing claims.',
    steps: [
      { label: 'Print Aisle 4 SKU list', status: 'DONE', action: { kind: 'goto', label: 'View list →' } },
      { label: 'Walk + check tags', status: 'ACTIVE', action: { kind: 'confirm', label: 'Log mismatches' } },
      { label: 'Submit audit', status: 'PENDING', action: { kind: 'confirm', label: 'Submit' } },
    ],
    history: [{ when: 'Mon · 9:00 AM', by: 'System', event: 'Weekly audit scheduled — Aisle 4' }],
  },
  {
    id: 't19',
    title: 'Send weekly sales report to Owner',
    description:
      'AI-generated summary ready. Review and add a 2-line context note before sending.',
    frequency: 'weekly',
    category: 'Reporting',
    priority: 'high',
    expectedMins: 6,
    duration: '6 min',
    dueLabel: 'This week · before Fri 7 PM',
    dueShort: 'before 7 PM',
    dueDay: 'Fri',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'On-time weekly visibility lets the Owner approve next-week’s ad budget 2 days sooner — direct top-of-funnel impact.',
    steps: [
      { label: 'Review AI summary', status: 'PENDING', action: { kind: 'goto', label: 'Open report →' } },
      { label: 'Add context note', status: 'PENDING', action: { kind: 'confirm', label: 'Add note' } },
      { label: 'Send to Owner', status: 'PENDING', action: { kind: 'confirm', label: 'Send report' } },
    ],
    history: [{ when: 'Today · 8:00 AM', by: 'AI Coach', event: 'Generated weekly sales summary' }],
  },
  {
    id: 't20',
    title: 'Negotiate vendor rate — Voltbox refrigerators',
    description:
      'AI flagged Voltbox prices are 8% above benchmark. Call vendor; target 5% reduction.',
    frequency: 'adhoc',
    category: 'Sales',
    priority: 'medium',
    expectedMins: 20,
    duration: '20 min',
    dueLabel: 'Next Monday',
    dueShort: 'before EOD',
    dueDay: 'Mon',
    assignee: 'Rohit',
    assigneeRole: 'Store Manager',
    createdBy: 'Owner',
    createdAt: '2026-05-10',
    active: true,
    status: 'PENDING',
    overdue: false,
    aiImpact:
      'A 5% rate cut on Voltbox saves ~₹62K/quarter on current run-rate.',
    steps: [
      { label: 'Review benchmark sheet', status: 'PENDING', action: { kind: 'goto', label: 'Open benchmark →' } },
      { label: 'Call Voltbox rep', status: 'PENDING', action: { kind: 'confirm', label: 'Log call' } },
      { label: 'Capture revised rate', status: 'PENDING', action: { kind: 'confirm', label: 'Save rate' } },
    ],
    history: [{ when: 'Mon · 10:00 AM', by: 'AI Coach', event: 'Flagged Voltbox pricing variance' }],
  },
];

/** Legacy splits kept for any callers that still segment by cadence. */
export const dailyTasks: TaskDefinition[] = allTasks.filter(t => t.frequency === 'daily');
export const weeklyTasks: TaskDefinition[] = allTasks.filter(t => t.frequency === 'weekly');

/** Past-week completed history shown on the Insights tab. */
export interface CompletedTaskEvent {
  id: string;
  title: string;
  category: TaskCategory;
  when: string;
  by: string;
  duration: string;
  impact: string;
}

export const completedHistory: CompletedTaskEvent[] = [
  { id: 'h1', title: 'Send abandoned-cart WhatsApp nudge', category: 'Customer', when: 'Today · 9:32 AM', by: 'Ashish', duration: '6 min', impact: '+₹11.8K recovered' },
  { id: 'h2', title: 'Restroom & changing room deep-clean', category: 'Hygiene', when: 'Today · 11:42 AM', by: 'Lakshmi', duration: '15 min', impact: 'Audit score 96/100' },
  { id: 'h3', title: 'Run morning huddle — 5 min stand-up', category: 'Sales', when: 'Today · 9:55 AM', by: 'Rohit', duration: '5 min', impact: 'Team aligned on 4 SKUs' },
  { id: 'h4', title: 'EOD report submitted', category: 'Reporting', when: 'Yesterday · 9:18 PM', by: 'Rohit', duration: '12 min', impact: '12 min ahead of cut-off' },
  { id: 'h5', title: 'Cycle count: Microwave row', category: 'Inventory', when: 'Yesterday · 6:04 PM', by: 'Suresh', duration: '22 min', impact: '0 variance' },
  { id: 'h6', title: 'Reconfirm appointments (5)', category: 'Customer', when: 'Yesterday · 10:11 AM', by: 'Ashish', duration: '8 min', impact: '4 of 5 showed up' },
  { id: 'h7', title: 'AC compressor check (vendor visit)', category: 'Hygiene', when: 'Wed · 4:00 PM', by: 'Rohit', duration: '34 min', impact: 'Compressor healthy' },
  { id: 'h8', title: 'Birthday outreach — 7 customers', category: 'Customer', when: 'Tue · 11:20 AM', by: 'Ashish', duration: '12 min', impact: '2 store visits booked' },
  { id: 'h9', title: 'Vendor PO #4429 GRN', category: 'Inventory', when: 'Tue · 2:48 PM', by: 'Suresh', duration: '16 min', impact: 'Same-day stocked' },
];

export const taskReports: TaskReport[] = [
  {
    id: 'r-9012',
    taskId: 't-004',
    taskTitle: 'Evening EOD report',
    frequency: 'daily',
    category: 'Reporting',
    periodLabel: 'Yesterday — May 15',
    submittedAt: 'Yesterday · 9:22 PM',
    status: 'submitted',
    completionPct: 100,
    summary:
      'Hit ₹78.4K against ₹85K target (92%). Footfall 142, conversion 24%. Two returns — both size issues on the new kurti drop. Cash variance ₹0.',
    metrics: [
      { label: 'Revenue', value: '₹78.4K' },
      { label: 'Target', value: '₹85K' },
      { label: 'Footfall', value: '142' },
      { label: 'Conversion', value: '24%' },
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Owner',
        role: 'Owner',
        at: 'Yesterday · 9:55 PM',
        text: 'Why did we miss target by ₹6K? Was it the festival rack we hadn’t refreshed yet?',
      },
      {
        id: 'c-2',
        author: 'Rohit',
        role: 'Manager',
        at: 'Yesterday · 10:08 PM',
        text:
          'Yes — festival kurtis arrived only at 4 PM. Couldn’t merchandise till 6. Will keep them on the front rack from morning today.',
      },
      {
        id: 'c-3',
        author: 'Owner',
        role: 'Owner',
        at: 'Today · 8:10 AM',
        text: 'Good. Let’s also push WhatsApp to the top-100 customers about the festival drop today.',
      },
    ],
    ownerSeen: true,
  },
  {
    id: 'r-9011',
    taskId: 't-001',
    taskTitle: 'Morning store walk-through',
    frequency: 'daily',
    category: 'Hygiene',
    periodLabel: 'Today',
    submittedAt: 'Today · 9:48 AM',
    status: 'submitted',
    completionPct: 100,
    summary:
      'Everything operational. Window AC making rattling sound — will get technician at 7 PM. One bulb in trial room out, replaced.',
    metrics: [
      { label: 'Checklist', value: '12 / 12' },
      { label: 'Issues raised', value: '1' },
    ],
    comments: [
      {
        id: 'c-4',
        author: 'Owner',
        role: 'Owner',
        at: 'Today · 10:02 AM',
        text: 'Ok on the AC. Make sure the technician comes after close, not during peak.',
      },
    ],
    ownerSeen: true,
  },
  {
    id: 'r-9010',
    taskId: 't-003',
    taskTitle: 'Refill fast-moving SKUs from back-store',
    frequency: 'daily',
    category: 'Inventory',
    periodLabel: 'Today',
    submittedAt: 'Today · 11:14 AM',
    status: 'submitted',
    completionPct: 80,
    summary:
      'Refilled 18 of 22 listed bestsellers. 4 SKUs are out of back-stock too — flagged for procurement.',
    metrics: [
      { label: 'SKUs refilled', value: '18 / 22' },
      { label: 'Out of back-stock', value: '4' },
    ],
    comments: [
      {
        id: 'c-5',
        author: 'Owner',
        role: 'Owner',
        at: 'Today · 11:30 AM',
        text: 'Send the 4 SKU list, I will raise a PO today itself.',
      },
    ],
    ownerSeen: false,
  },
  {
    id: 'r-9009',
    taskId: 't-101',
    taskTitle: 'Visual merchandising refresh',
    frequency: 'weekly',
    category: 'Visual',
    periodLabel: 'Week of May 5 – May 11',
    submittedAt: 'Sat May 10 · 7:48 PM',
    status: 'submitted',
    completionPct: 100,
    summary:
      'Refreshed window with festival theme. 4 photos attached. Mannequins now wearing the new kurti + dupatta combo — already had 3 enquiries on Sunday.',
    metrics: [
      { label: 'Photos', value: '4' },
      { label: 'Enquiries since', value: '3' },
    ],
    photos: ['vm-1', 'vm-2', 'vm-3', 'vm-4'],
    comments: [
      {
        id: 'c-6',
        author: 'Owner',
        role: 'Owner',
        at: 'Sun May 11 · 9:10 AM',
        text: 'Looks sharp. Can we put a small price-card on the kurti? Customers ask before walking in.',
      },
      {
        id: 'c-7',
        author: 'Rohit',
        role: 'Manager',
        at: 'Sun May 11 · 11:24 AM',
        text: 'Done. Added a printed price strip on the mannequin and one on the window glass.',
      },
    ],
    ownerSeen: true,
  },
  {
    id: 'r-9008',
    taskId: 't-102',
    taskTitle: 'Stock audit — top 50 SKUs',
    frequency: 'weekly',
    category: 'Inventory',
    periodLabel: 'Week of May 5 – May 11',
    status: 'overdue',
    completionPct: 0,
    summary: 'Not yet submitted. Due Friday.',
    metrics: [],
    comments: [
      {
        id: 'c-8',
        author: 'Owner',
        role: 'Owner',
        at: 'Today · 8:20 AM',
        text: 'Rohit, this is 4 days overdue. Please close by EOD today.',
      },
    ],
    ownerSeen: true,
  },
  {
    id: 'r-9007',
    taskId: 't-005',
    taskTitle: 'Greet & log every walk-in customer',
    frequency: 'daily',
    category: 'Customer',
    periodLabel: 'Yesterday — May 15',
    submittedAt: 'Yesterday · 9:24 PM',
    status: 'submitted',
    completionPct: 65,
    summary:
      'Logged 92 of 142 walk-ins (65%). Missed mostly between 6–8 PM when only 1 associate on floor.',
    metrics: [
      { label: 'Logged', value: '92 / 142' },
      { label: 'Capture rate', value: '65%' },
      { label: 'Target', value: '80%' },
    ],
    comments: [],
    ownerSeen: false,
  },
  {
    id: 'r-9006',
    taskId: 't-002',
    taskTitle: 'Cash drawer & POS reconciliation',
    frequency: 'daily',
    category: 'Reporting',
    periodLabel: 'Today',
    status: 'awaiting',
    completionPct: 0,
    summary: 'Awaiting submission. Due before 10:30 AM.',
    metrics: [],
    comments: [],
    ownerSeen: true,
  },
];

export const completionTrend7Days = [
  { day: 'Mon', pct: 78 },
  { day: 'Tue', pct: 85 },
  { day: 'Wed', pct: 72 },
  { day: 'Thu', pct: 90 },
  { day: 'Fri', pct: 82 },
  { day: 'Sat', pct: 88 },
  { day: 'Sun', pct: 80 },
];

export const aiTaskNudges = [
  {
    id: 'n-1',
    title: 'Stock audit is 4 days overdue',
    body: 'Weekly stock audit hasn’t been submitted for the May 5–11 week. Last 3 weeks averaged 96% completion — this is a clear miss.',
    action: 'Nudge Rohit',
    confidence: 'high' as const,
    reportId: 'r-9008',
  },
  {
    id: 'n-2',
    title: 'Walk-in capture dropped below 70% for 3 days',
    body: 'Customer-logging task ran at 65%, 68%, 64% on May 13–15. Pattern is the 6–8 PM single-staffing window.',
    action: 'Review staffing',
    confidence: 'high' as const,
  },
  {
    id: 'n-3',
    title: 'EOD report consistently 92–95% of target',
    body: 'Daily EOD has met target 5 of 7 days. Festival drop is now merchandised — push WhatsApp to top-100 to close the gap.',
    action: 'Send WhatsApp',
    confidence: 'medium' as const,
  },
];

export function taskCounts() {
  const totalDaily = dailyTasks.filter(t => t.active).length;
  const totalWeekly = weeklyTasks.filter(t => t.active).length;
  const overdue = taskReports.filter(r => r.status === 'overdue').length;
  const awaiting = taskReports.filter(r => r.status === 'awaiting').length;
  const submittedToday = taskReports.filter(
    r => r.status === 'submitted' && r.periodLabel === 'Today',
  ).length;
  return { totalDaily, totalWeekly, overdue, awaiting, submittedToday };
}

/* ─────────────────────────────────────────────
 * Aggregators used by the ShopOS-style Dashboard
 * ───────────────────────────────────────────── */
export interface CategoryStats {
  total: number;
  pending: number;
  partial: number;
  complete: number;
  overdue: number;
}

export function tasksTotalStats() {
  let total = 0,
    complete = 0,
    pending = 0,
    partial = 0,
    overdue = 0;
  allTasks.forEach(t => {
    total += 1;
    if (t.status === 'COMPLETE') complete += 1;
    if (t.status === 'PENDING') pending += 1;
    if (t.status === 'PARTIAL') partial += 1;
    if (t.overdue) overdue += 1;
  });
  return { total, complete, pending, partial, overdue };
}

export function tasksByCategory(): Record<TaskCategory, CategoryStats> {
  const cats: TaskCategory[] = [
    'Sales',
    'Inventory',
    'Leads',
    'Customer',
    'Visual',
    'Hygiene',
    'Reporting',
    'Staff',
  ];
  const map = {} as Record<TaskCategory, CategoryStats>;
  cats.forEach(c => {
    map[c] = { total: 0, pending: 0, partial: 0, complete: 0, overdue: 0 };
  });
  allTasks.forEach(t => {
    const c = map[t.category];
    if (!c) return;
    c.total += 1;
    if (t.status === 'PENDING') c.pending += 1;
    if (t.status === 'PARTIAL') c.partial += 1;
    if (t.status === 'COMPLETE') c.complete += 1;
    if (t.overdue) c.overdue += 1;
  });
  return map;
}
