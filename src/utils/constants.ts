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
  communication: {
    root: '/dashboard/communication',
    chat: '/dashboard/communication/chat',
    groups: '/dashboard/communication/groups',
    announcements: '/dashboard/communication/announcements',
    directory: '/dashboard/communication/directory',
  },
  files: {
    root: '/dashboard/files',
    myFiles: '/dashboard/files/my-files',
    shared: '/dashboard/files/shared',
    projects: '/dashboard/files/projects',
    recent: '/dashboard/files/recent',
    trash: '/dashboard/files/trash',
  },
  reports: {
    root: '/dashboard/reports',
    builder: '/dashboard/reports/builder',
    saved: '/dashboard/reports/saved',
    export: '/dashboard/reports/export',
    import: '/dashboard/reports/import',
    history: '/dashboard/reports/history',
  },
  maintenance: {
    root: '/dashboard/maintenance',
    assets: '/dashboard/maintenance/assets',
    assetDetail: '/dashboard/maintenance/assets/:id',
    workOrders: '/dashboard/maintenance/work-orders',
    preventive: '/dashboard/maintenance/preventive',
    requests: '/dashboard/maintenance/requests',
    vendors: '/dashboard/maintenance/vendors',
    inventory: '/dashboard/maintenance/inventory',
    reports: '/dashboard/maintenance/reports',
  },
  qrCodes: {
    root: '/dashboard/qr-codes',
    list: '/dashboard/qr-codes/list',
    create: '/dashboard/qr-codes/create',
    detail: '/dashboard/qr-codes/:id',
    templates: '/dashboard/qr-codes/templates',
    analytics: '/dashboard/qr-codes/analytics',
    bulk: '/dashboard/qr-codes/bulk',
    dynamic: '/dashboard/qr-codes/dynamic',
    folders: '/dashboard/qr-codes/folders',
  },
  settings: {
    root: '/dashboard/settings',
    company: '/dashboard/settings/company',
    users: '/dashboard/settings/users',
    roles: '/dashboard/settings/roles',
    modules: '/dashboard/settings/modules',
    api: '/dashboard/settings/api',
    integrations: '/dashboard/settings/integrations',
    logs: '/dashboard/settings/logs',
    backup: '/dashboard/settings/backup',
    notifications: '/dashboard/settings/notifications',
  },
  // Sector-specific routes
  gym: {
    root: '/dashboard/gym',
    members: '/dashboard/gym/members',
    memberDetail: '/dashboard/gym/members/:id',
    memberships: '/dashboard/gym/memberships',
    classes: '/dashboard/gym/classes',
    trainers: '/dashboard/gym/trainers',
    trainerDetail: '/dashboard/gym/trainers/:id',
    equipment: '/dashboard/gym/equipment',
    attendance: '/dashboard/gym/attendance',
    ptSessions: '/dashboard/gym/pt-sessions',
    assessments: '/dashboard/gym/assessments',
  },
  staffing: {
    root: '/dashboard/staffing',
    candidates: '/dashboard/staffing/candidates',
    candidateDetail: '/dashboard/staffing/candidates/:id',
    jobs: '/dashboard/staffing/jobs',
    jobDetail: '/dashboard/staffing/jobs/:id',
    placements: '/dashboard/staffing/placements',
    clients: '/dashboard/staffing/clients',
    clientDetail: '/dashboard/staffing/clients/:id',
    timesheets: '/dashboard/staffing/timesheets',
    payroll: '/dashboard/staffing/payroll',
    compliance: '/dashboard/staffing/compliance',
    interviews: '/dashboard/staffing/interviews',
    onboarding: '/dashboard/staffing/onboarding',
  },
} as const;

// Toast duration
export const TOAST_DURATION = 4000;

// Storage keys
export const STORAGE_KEYS = {
  auth: 'enterprise-panel-auth',
  app: 'enterprise-panel-app',
} as const;
