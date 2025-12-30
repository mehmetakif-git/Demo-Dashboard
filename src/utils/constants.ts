// Color constants matching our theme
export const COLORS = {
  background: {
    primary: '#0a0a0f',
    secondary: '#12121a',
    tertiary: '#1a1a24',
  },
  border: {
    default: '#1e1e2e',
    hover: '#2e2e3e',
  },
  accent: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  text: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    muted: '#64748b',
  },
} as const;

// Layout dimensions
export const LAYOUT = {
  sidebarWidth: 280,
  sidebarCollapsedWidth: 80,
  headerHeight: 64,
  contentPadding: 24,
} as const;

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  // Page transition
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  // Scale up
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  // Stagger children
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

// Spring animation config
export const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
} as const;

// Demo credentials
export const DEMO_CREDENTIALS = {
  email: 'demo@panel.com',
  password: 'demo123',
  user: {
    email: 'demo@panel.com',
    name: 'Demo User',
    role: 'admin' as const,
  },
} as const;

// Routes
export const ROUTES = {
  login: '/login',
  selectSector: '/select-sector',
  selectAccount: '/select-account',
  dashboard: '/dashboard',
  hr: {
    root: '/dashboard/hr',
    employees: '/dashboard/hr/employees',
    employeeDetail: '/dashboard/hr/employees/:id',
    departments: '/dashboard/hr/departments',
    leave: '/dashboard/hr/leave',
    attendance: '/dashboard/hr/attendance',
    payroll: '/dashboard/hr/payroll',
    recruitment: '/dashboard/hr/recruitment',
    performance: '/dashboard/hr/performance',
  },
  accounting: {
    root: '/dashboard/accounting',
    overview: '/dashboard/accounting/overview',
    income: '/dashboard/accounting/income',
    expenses: '/dashboard/accounting/expenses',
    invoices: '/dashboard/accounting/invoices',
    bankAccounts: '/dashboard/accounting/bank-accounts',
    cashFlow: '/dashboard/accounting/cash-flow',
    tax: '/dashboard/accounting/tax',
    reports: '/dashboard/accounting/reports',
  },
  crm: {
    root: '/dashboard/crm',
    customers: '/dashboard/crm/customers',
    customerDetail: '/dashboard/crm/customers/:id',
    leads: '/dashboard/crm/leads',
    opportunities: '/dashboard/crm/opportunities',
    quotes: '/dashboard/crm/quotes',
    contracts: '/dashboard/crm/contracts',
    activities: '/dashboard/crm/activities',
    reports: '/dashboard/crm/reports',
  },
  tasks: {
    root: '/dashboard/tasks',
    myTasks: '/dashboard/tasks/my-tasks',
    allTasks: '/dashboard/tasks/all-tasks',
    kanban: '/dashboard/tasks/kanban',
    calendar: '/dashboard/tasks/calendar',
    projects: '/dashboard/tasks/projects',
    projectDetail: '/dashboard/tasks/projects/:id',
  },
  accessControl: {
    root: '/dashboard/access-control',
    cctv: '/dashboard/access-control/cctv',
    cameras: '/dashboard/access-control/cameras',
    recordings: '/dashboard/access-control/recordings',
    doors: '/dashboard/access-control/doors',
    cards: '/dashboard/access-control/cards',
    logs: '/dashboard/access-control/logs',
    parking: '/dashboard/access-control/parking',
    visitors: '/dashboard/access-control/visitors',
  },
  signage: {
    root: '/dashboard/signage',
    displays: '/dashboard/signage/displays',
    content: '/dashboard/signage/content',
    playlists: '/dashboard/signage/playlists',
    schedule: '/dashboard/signage/schedule',
    broadcast: '/dashboard/signage/broadcast',
  },
} as const;

// Toast duration
export const TOAST_DURATION = 4000;

// Storage keys
export const STORAGE_KEYS = {
  auth: 'enterprise-panel-auth',
  app: 'enterprise-panel-app',
} as const;
