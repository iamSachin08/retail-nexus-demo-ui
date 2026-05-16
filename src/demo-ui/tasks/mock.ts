export type TaskFrequency = 'daily' | 'weekly';
export type TaskCategory =
  | 'Sales'
  | 'Inventory'
  | 'Customer'
  | 'Visual'
  | 'Hygiene'
  | 'Reporting'
  | 'Staff';
export type TaskPriority = 'high' | 'medium' | 'low';
export type ReportStatus = 'submitted' | 'overdue' | 'awaiting';

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
  Sales: '#10B981',
  Inventory: '#3B82F6',
  Customer: '#F472B6',
  Visual: '#A855F7',
  Hygiene: '#14B8A6',
  Reporting: '#F59E0B',
  Staff: '#FB923C',
};

export const taskCategoryGradient: Record<TaskCategory, string> = {
  Sales: 'linear-gradient(135deg, #16D9A4 0%, #0EA47A 100%)',
  Inventory: 'linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)',
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

export const dailyTasks: TaskDefinition[] = [
  {
    id: 't-001',
    title: 'Morning store walk-through',
    description:
      'Walk the store before opening. Verify lights, AC, music, shutter, signage. Note anything broken.',
    frequency: 'daily',
    category: 'Hygiene',
    priority: 'high',
    expectedMins: 10,
    dueLabel: 'Today · before 10:00 AM',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
  },
  {
    id: 't-002',
    title: 'Cash drawer & POS reconciliation',
    description:
      'Confirm opening float matches last evening close. Run POS test transaction. Capture POS day-open photo.',
    frequency: 'daily',
    category: 'Reporting',
    priority: 'high',
    expectedMins: 8,
    dueLabel: 'Today · before 10:30 AM',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
  },
  {
    id: 't-003',
    title: 'Refill fast-moving SKUs from back-store',
    description:
      'Top up the front-of-store racks for the morning rush. Focus on listed bestsellers and yesterday’s stockouts.',
    frequency: 'daily',
    category: 'Inventory',
    priority: 'medium',
    expectedMins: 25,
    dueLabel: 'Today · before 11:00 AM',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-05-03',
    active: true,
  },
  {
    id: 't-004',
    title: 'Evening EOD report',
    description:
      'Submit end-of-day totals: revenue, footfall, top sellers, abandoned baskets, returns, cash variance.',
    frequency: 'daily',
    category: 'Reporting',
    priority: 'high',
    expectedMins: 12,
    dueLabel: 'Today · before 9:30 PM',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-05-01',
    active: true,
  },
  {
    id: 't-005',
    title: 'Greet & log every walk-in customer',
    description:
      'Tag every walk-in into the lead app with mobile + intent. Goal ≥ 80% capture rate.',
    frequency: 'daily',
    category: 'Customer',
    priority: 'medium',
    expectedMins: 0,
    dueLabel: 'All day',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-05-05',
    active: true,
  },
];

export const weeklyTasks: TaskDefinition[] = [
  {
    id: 't-101',
    title: 'Visual merchandising refresh',
    description:
      'Rotate window display and mannequins. Match this week’s campaign theme. Submit 4 photos.',
    frequency: 'weekly',
    category: 'Visual',
    priority: 'high',
    expectedMins: 90,
    dueLabel: 'This week · before Sat 8 PM',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
  },
  {
    id: 't-102',
    title: 'Stock audit — top 50 SKUs',
    description:
      'Physical count of top-50 SKUs. Reconcile against POS. Submit variance summary.',
    frequency: 'weekly',
    category: 'Inventory',
    priority: 'high',
    expectedMins: 120,
    dueLabel: 'This week · before Fri',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
  },
  {
    id: 't-103',
    title: 'Weekly footfall + revenue review',
    description:
      'Compile day-by-day footfall, revenue, AOV, conversion. Compare against last week and target.',
    frequency: 'weekly',
    category: 'Reporting',
    priority: 'medium',
    expectedMins: 45,
    dueLabel: 'Every Sunday',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
  },
  {
    id: 't-104',
    title: 'Deep cleaning + back-store hygiene',
    description:
      'Full deep clean of floor, racks, washroom, back-store. Submit before/after photos.',
    frequency: 'weekly',
    category: 'Hygiene',
    priority: 'medium',
    expectedMins: 75,
    dueLabel: 'Every Monday morning',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-04-10',
    active: true,
  },
  {
    id: 't-105',
    title: 'Staff 1-on-1 + sales coaching',
    description:
      'Spend 20 mins per associate. Review individual numbers, blockers, training needs.',
    frequency: 'weekly',
    category: 'Staff',
    priority: 'low',
    expectedMins: 60,
    dueLabel: 'Every Wednesday',
    assignee: 'Rohit (Manager)',
    createdBy: 'Owner',
    createdAt: '2026-04-15',
    active: true,
  },
];

export const allTasks: TaskDefinition[] = [...dailyTasks, ...weeklyTasks];

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
