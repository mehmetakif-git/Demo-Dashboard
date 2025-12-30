// Settings Data Types and Mock Data

// Company Profile
export interface CompanyAddress {
  street: string;
  suite: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  legalName: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  fax: string;
  address: CompanyAddress;
  taxId: string;
  registrationNumber: string;
  founded: string;
  employeeCount: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  language: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
}

export const companyProfile: CompanyProfile = {
  id: "COMP001",
  name: "Acme Corporation",
  legalName: "Acme Corporation Inc.",
  industry: "Technology",
  website: "https://www.acmecorp.com",
  email: "contact@acmecorp.com",
  phone: "+1 (555) 123-4567",
  fax: "+1 (555) 123-4568",
  address: {
    street: "123 Business Avenue",
    suite: "Suite 500",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  },
  taxId: "12-3456789",
  registrationNumber: "NYC-2020-12345",
  founded: "2015",
  employeeCount: "50-100",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  currency: "USD",
  language: "en-US",
  logo: null,
  favicon: null,
  primaryColor: "#6366f1",
  secondaryColor: "#8b5cf6"
};

// Users
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar: string | null;
  twoFactorEnabled: boolean;
  permissions: string[];
}

export const users: User[] = [
  {
    id: "USR001",
    name: "John Anderson",
    email: "john.anderson@acmecorp.com",
    role: "Admin",
    roleId: "ROLE001",
    department: "Engineering",
    status: "active",
    lastLogin: "2024-12-20 09:45:00",
    createdAt: "2022-03-15",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["all"]
  },
  {
    id: "USR002",
    name: "Emily Chen",
    email: "emily.chen@acmecorp.com",
    role: "Manager",
    roleId: "ROLE002",
    department: "Marketing",
    status: "active",
    lastLogin: "2024-12-20 10:15:00",
    createdAt: "2022-06-20",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["read", "write", "manage_team"]
  },
  {
    id: "USR003",
    name: "Michael Roberts",
    email: "michael.roberts@acmecorp.com",
    role: "User",
    roleId: "ROLE003",
    department: "Sales",
    status: "active",
    lastLogin: "2024-12-20 08:30:00",
    createdAt: "2023-01-10",
    avatar: null,
    twoFactorEnabled: false,
    permissions: ["read", "write"]
  },
  {
    id: "USR004",
    name: "Sarah Wilson",
    email: "sarah.wilson@acmecorp.com",
    role: "Admin",
    roleId: "ROLE001",
    department: "Engineering",
    status: "active",
    lastLogin: "2024-12-20 07:00:00",
    createdAt: "2021-11-01",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["all"]
  },
  {
    id: "USR005",
    name: "David Kim",
    email: "david.kim@acmecorp.com",
    role: "User",
    roleId: "ROLE003",
    department: "Finance",
    status: "inactive",
    lastLogin: "2024-12-15 17:30:00",
    createdAt: "2023-03-01",
    avatar: null,
    twoFactorEnabled: false,
    permissions: ["read", "write"]
  },
  {
    id: "USR006",
    name: "Jessica Martinez",
    email: "jessica.martinez@acmecorp.com",
    role: "Manager",
    roleId: "ROLE002",
    department: "HR",
    status: "active",
    lastLogin: "2024-12-20 09:00:00",
    createdAt: "2022-08-15",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["read", "write", "manage_team"]
  },
  {
    id: "USR007",
    name: "Robert Taylor",
    email: "robert.taylor@acmecorp.com",
    role: "User",
    roleId: "ROLE003",
    department: "Engineering",
    status: "active",
    lastLogin: "2024-12-19 18:00:00",
    createdAt: "2024-06-01",
    avatar: null,
    twoFactorEnabled: false,
    permissions: ["read", "write"]
  },
  {
    id: "USR008",
    name: "Amanda Lee",
    email: "amanda.lee@acmecorp.com",
    role: "Manager",
    roleId: "ROLE002",
    department: "HR",
    status: "active",
    lastLogin: "2024-12-20 08:45:00",
    createdAt: "2021-05-20",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["read", "write", "manage_team", "manage_hr"]
  },
  {
    id: "USR009",
    name: "Chris Johnson",
    email: "chris.johnson@acmecorp.com",
    role: "Manager",
    roleId: "ROLE002",
    department: "Operations",
    status: "active",
    lastLogin: "2024-12-20 06:30:00",
    createdAt: "2022-02-01",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["read", "write", "manage_team", "manage_facilities"]
  },
  {
    id: "USR010",
    name: "Lisa Park",
    email: "lisa.park@acmecorp.com",
    role: "Manager",
    roleId: "ROLE002",
    department: "Finance",
    status: "active",
    lastLogin: "2024-12-19 17:00:00",
    createdAt: "2021-09-15",
    avatar: null,
    twoFactorEnabled: true,
    permissions: ["read", "write", "manage_team", "manage_finance"]
  }
];

// Roles
export interface RolePermissions {
  [module: string]: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: RolePermissions;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export const roles: Role[] = [
  {
    id: "ROLE001",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: {
      dashboard: ["view", "edit"],
      users: ["view", "create", "edit", "delete"],
      roles: ["view", "create", "edit", "delete"],
      settings: ["view", "edit"],
      hr: ["view", "create", "edit", "delete"],
      accounting: ["view", "create", "edit", "delete"],
      crm: ["view", "create", "edit", "delete"],
      tasks: ["view", "create", "edit", "delete"],
      maintenance: ["view", "create", "edit", "delete"],
      reports: ["view", "create", "export"],
      accessControl: ["view", "create", "edit", "delete"],
      files: ["view", "upload", "download", "delete"],
      api: ["view", "create", "revoke"]
    },
    isSystem: true,
    createdAt: "2021-01-01",
    updatedAt: "2024-06-15"
  },
  {
    id: "ROLE002",
    name: "Manager",
    description: "Department management with team oversight",
    userCount: 5,
    permissions: {
      dashboard: ["view"],
      users: ["view"],
      roles: ["view"],
      settings: ["view"],
      hr: ["view", "create", "edit"],
      accounting: ["view"],
      crm: ["view", "create", "edit"],
      tasks: ["view", "create", "edit", "delete"],
      maintenance: ["view", "create"],
      reports: ["view", "create", "export"],
      accessControl: ["view"],
      files: ["view", "upload", "download"],
      api: ["view"]
    },
    isSystem: true,
    createdAt: "2021-01-01",
    updatedAt: "2024-03-20"
  },
  {
    id: "ROLE003",
    name: "User",
    description: "Standard user with basic access",
    userCount: 3,
    permissions: {
      dashboard: ["view"],
      users: [],
      roles: [],
      settings: [],
      hr: ["view"],
      accounting: ["view"],
      crm: ["view", "create"],
      tasks: ["view", "create", "edit"],
      maintenance: ["view"],
      reports: ["view"],
      accessControl: ["view"],
      files: ["view", "upload", "download"],
      api: []
    },
    isSystem: true,
    createdAt: "2021-01-01",
    updatedAt: "2024-01-10"
  },
  {
    id: "ROLE004",
    name: "HR Specialist",
    description: "HR-focused role with employee management",
    userCount: 0,
    permissions: {
      dashboard: ["view"],
      users: ["view"],
      roles: [],
      settings: [],
      hr: ["view", "create", "edit", "delete"],
      accounting: ["view"],
      crm: [],
      tasks: ["view", "create", "edit"],
      maintenance: [],
      reports: ["view", "create"],
      accessControl: ["view", "create"],
      files: ["view", "upload", "download"],
      api: []
    },
    isSystem: false,
    createdAt: "2023-06-15",
    updatedAt: "2024-02-28"
  },
  {
    id: "ROLE005",
    name: "Finance Analyst",
    description: "Finance-focused role with reporting access",
    userCount: 0,
    permissions: {
      dashboard: ["view"],
      users: [],
      roles: [],
      settings: [],
      hr: ["view"],
      accounting: ["view", "create", "edit"],
      crm: ["view"],
      tasks: ["view", "create"],
      maintenance: [],
      reports: ["view", "create", "export"],
      accessControl: [],
      files: ["view", "upload", "download"],
      api: []
    },
    isSystem: false,
    createdAt: "2023-08-20",
    updatedAt: "2024-04-15"
  }
];

// Permission Modules
export interface PermissionModule {
  id: string;
  name: string;
  actions: string[];
}

export const permissionModules: PermissionModule[] = [
  { id: "dashboard", name: "Dashboard", actions: ["view", "edit"] },
  { id: "users", name: "User Management", actions: ["view", "create", "edit", "delete"] },
  { id: "roles", name: "Roles & Permissions", actions: ["view", "create", "edit", "delete"] },
  { id: "settings", name: "Settings", actions: ["view", "edit"] },
  { id: "hr", name: "HR Module", actions: ["view", "create", "edit", "delete"] },
  { id: "accounting", name: "Accounting", actions: ["view", "create", "edit", "delete"] },
  { id: "crm", name: "CRM", actions: ["view", "create", "edit", "delete"] },
  { id: "tasks", name: "Task Management", actions: ["view", "create", "edit", "delete"] },
  { id: "maintenance", name: "Maintenance", actions: ["view", "create", "edit", "delete"] },
  { id: "reports", name: "Reports & Export", actions: ["view", "create", "export"] },
  { id: "accessControl", name: "Access Control", actions: ["view", "create", "edit", "delete"] },
  { id: "files", name: "File Management", actions: ["view", "upload", "download", "delete"] },
  { id: "api", name: "API Management", actions: ["view", "create", "revoke"] }
];

// Module Settings
export interface HRSettings {
  enabled: boolean;
  leaveTypes: string[];
  workingDays: string[];
  workingHours: { start: string; end: string };
  overtimeEnabled: boolean;
  probationPeriod: number;
}

export interface AccountingSettings {
  enabled: boolean;
  fiscalYearStart: string;
  currency: string;
  taxRate: number;
  invoicePrefix: string;
  invoiceStartNumber: number;
  paymentTerms: number;
  autoReminders: boolean;
}

export interface CRMSettings {
  enabled: boolean;
  leadSources: string[];
  dealStages: string[];
  autoAssignment: boolean;
  leadScoring: boolean;
}

export interface TaskSettings {
  enabled: boolean;
  priorities: string[];
  defaultView: string;
  allowSubtasks: boolean;
  timeTracking: boolean;
}

export interface AccessControlSettings {
  enabled: boolean;
  defaultAccessLevel: string;
  visitorBadgeExpiry: number;
  autoLockTime: string;
  autoUnlockTime: string;
}

export interface NotificationModuleSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  digestFrequency: string;
}

export interface ModuleSettings {
  hr: HRSettings;
  accounting: AccountingSettings;
  crm: CRMSettings;
  tasks: TaskSettings;
  accessControl: AccessControlSettings;
  notifications: NotificationModuleSettings;
}

export const moduleSettings: ModuleSettings = {
  hr: {
    enabled: true,
    leaveTypes: ["Annual Leave", "Sick Leave", "Personal Leave", "Maternity Leave", "Paternity Leave"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "09:00", end: "18:00" },
    overtimeEnabled: true,
    probationPeriod: 90
  },
  accounting: {
    enabled: true,
    fiscalYearStart: "January",
    currency: "USD",
    taxRate: 21,
    invoicePrefix: "INV-",
    invoiceStartNumber: 1001,
    paymentTerms: 30,
    autoReminders: true
  },
  crm: {
    enabled: true,
    leadSources: ["Website", "Referral", "LinkedIn", "Trade Show", "Cold Call", "Other"],
    dealStages: ["Discovery", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"],
    autoAssignment: false,
    leadScoring: true
  },
  tasks: {
    enabled: true,
    priorities: ["Urgent", "High", "Medium", "Low"],
    defaultView: "kanban",
    allowSubtasks: true,
    timeTracking: true
  },
  accessControl: {
    enabled: true,
    defaultAccessLevel: "Standard Employee",
    visitorBadgeExpiry: 24,
    autoLockTime: "22:00",
    autoUnlockTime: "06:00"
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    digestFrequency: "daily"
  }
};

// API Keys
export interface APIKey {
  id: string;
  name: string;
  key: string;
  keyFull: string;
  type: 'production' | 'development';
  permissions: string[];
  createdBy: string;
  createdAt: string;
  lastUsed: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
  usageCount: number;
}

export const apiKeys: APIKey[] = [
  {
    id: "API001",
    name: "Production API Key",
    key: "pk_live_*****************************a1b2",
    keyFull: "pk_live_1234567890abcdefghijklmnopqrstuv",
    type: "production",
    permissions: ["read", "write"],
    createdBy: "John Anderson",
    createdAt: "2024-01-15 10:00:00",
    lastUsed: "2024-12-20 10:30:00",
    expiresAt: "2025-01-15",
    status: "active",
    usageCount: 15678
  },
  {
    id: "API002",
    name: "Development API Key",
    key: "pk_test_*****************************c3d4",
    keyFull: "pk_test_abcdefghijklmnopqrstuvwxyz123456",
    type: "development",
    permissions: ["read", "write"],
    createdBy: "Sarah Wilson",
    createdAt: "2024-03-20 14:00:00",
    lastUsed: "2024-12-19 16:45:00",
    expiresAt: "2025-03-20",
    status: "active",
    usageCount: 8934
  },
  {
    id: "API003",
    name: "Mobile App Key",
    key: "pk_live_*****************************e5f6",
    keyFull: "pk_live_mobile1234567890abcdefghijk",
    type: "production",
    permissions: ["read"],
    createdBy: "John Anderson",
    createdAt: "2024-06-01 09:00:00",
    lastUsed: "2024-12-20 09:15:00",
    expiresAt: "2025-06-01",
    status: "active",
    usageCount: 45231
  },
  {
    id: "API004",
    name: "Legacy Integration Key",
    key: "pk_live_*****************************g7h8",
    keyFull: "pk_live_legacy9876543210zyxwvutsrqp",
    type: "production",
    permissions: ["read"],
    createdBy: "Admin",
    createdAt: "2023-02-10 11:00:00",
    lastUsed: "2024-11-30 12:00:00",
    expiresAt: "2024-02-10",
    status: "expired",
    usageCount: 2341
  }
];

// Integrations
export interface IntegrationSettings {
  [key: string]: boolean | string | number | undefined;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Communication' | 'Productivity' | 'Payments' | 'CRM' | 'Finance' | 'Automation';
  status: 'connected' | 'disconnected';
  connectedAt: string | null;
  connectedBy: string | null;
  settings: IntegrationSettings | null;
}

export const integrations: Integration[] = [
  {
    id: "INT001",
    name: "Slack",
    description: "Team communication and notifications",
    icon: "MessageSquare",
    category: "Communication",
    status: "connected",
    connectedAt: "2024-03-15 10:00:00",
    connectedBy: "John Anderson",
    settings: {
      channel: "#general",
      taskNotifications: true,
      mentionNotifications: true
    }
  },
  {
    id: "INT002",
    name: "Google Workspace",
    description: "Calendar, Drive, and email integration",
    icon: "Mail",
    category: "Productivity",
    status: "connected",
    connectedAt: "2024-01-20 14:00:00",
    connectedBy: "Admin",
    settings: {
      syncCalendar: true,
      syncContacts: true,
      syncDrive: false
    }
  },
  {
    id: "INT003",
    name: "Stripe",
    description: "Payment processing",
    icon: "CreditCard",
    category: "Payments",
    status: "connected",
    connectedAt: "2024-02-01 09:00:00",
    connectedBy: "Lisa Park",
    settings: {
      mode: "live",
      webhooksEnabled: true
    }
  },
  {
    id: "INT004",
    name: "Salesforce",
    description: "CRM data synchronization",
    icon: "Cloud",
    category: "CRM",
    status: "disconnected",
    connectedAt: null,
    connectedBy: null,
    settings: null
  },
  {
    id: "INT005",
    name: "Twilio",
    description: "SMS and voice communications",
    icon: "Phone",
    category: "Communication",
    status: "disconnected",
    connectedAt: null,
    connectedBy: null,
    settings: null
  },
  {
    id: "INT006",
    name: "QuickBooks",
    description: "Accounting software integration",
    icon: "Calculator",
    category: "Finance",
    status: "connected",
    connectedAt: "2024-04-10 11:00:00",
    connectedBy: "Lisa Park",
    settings: {
      syncInvoices: true,
      syncExpenses: true,
      autoSync: true
    }
  },
  {
    id: "INT007",
    name: "Microsoft 365",
    description: "Office apps and Teams integration",
    icon: "FileText",
    category: "Productivity",
    status: "disconnected",
    connectedAt: null,
    connectedBy: null,
    settings: null
  },
  {
    id: "INT008",
    name: "Zapier",
    description: "Workflow automation",
    icon: "Zap",
    category: "Automation",
    status: "connected",
    connectedAt: "2024-05-20 16:00:00",
    connectedBy: "Sarah Wilson",
    settings: {
      activeZaps: 12
    }
  }
];

// System Logs
export interface SystemLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
  status: 'success' | 'failed' | 'warning';
  ip: string;
}

export const systemLogs: SystemLog[] = [
  { id: 1, timestamp: "2024-12-20 10:45:00", user: "John Anderson", action: "login", module: "Auth", details: "Successful login from 192.168.1.100", status: "success", ip: "192.168.1.100" },
  { id: 2, timestamp: "2024-12-20 10:42:00", user: "Emily Chen", action: "create", module: "CRM", details: "Created new customer: Tech Solutions Ltd", status: "success", ip: "192.168.1.105" },
  { id: 3, timestamp: "2024-12-20 10:38:00", user: "System", action: "backup", module: "System", details: "Automated daily backup completed", status: "success", ip: "localhost" },
  { id: 4, timestamp: "2024-12-20 10:30:00", user: "Michael Roberts", action: "export", module: "Reports", details: "Exported sales report to PDF", status: "success", ip: "192.168.1.110" },
  { id: 5, timestamp: "2024-12-20 10:25:00", user: "Sarah Wilson", action: "update", module: "Settings", details: "Updated company profile information", status: "success", ip: "192.168.1.102" },
  { id: 6, timestamp: "2024-12-20 10:20:00", user: "Unknown", action: "login", module: "Auth", details: "Failed login attempt for admin@acmecorp.com", status: "failed", ip: "45.67.89.123" },
  { id: 7, timestamp: "2024-12-20 10:15:00", user: "Jessica Martinez", action: "create", module: "HR", details: "Added new employee: Robert Taylor", status: "success", ip: "192.168.1.108" },
  { id: 8, timestamp: "2024-12-20 10:10:00", user: "Chris Johnson", action: "delete", module: "Maintenance", details: "Deleted work order WO-2024-089", status: "success", ip: "192.168.1.115" },
  { id: 9, timestamp: "2024-12-20 10:05:00", user: "API", action: "sync", module: "Integration", details: "QuickBooks sync completed - 15 invoices synced", status: "success", ip: "api.quickbooks.com" },
  { id: 10, timestamp: "2024-12-20 10:00:00", user: "System", action: "notification", module: "System", details: "Sent 45 email notifications", status: "success", ip: "localhost" },
  { id: 11, timestamp: "2024-12-20 09:55:00", user: "Lisa Park", action: "create", module: "Accounting", details: "Created invoice INV-2024-156", status: "success", ip: "192.168.1.112" },
  { id: 12, timestamp: "2024-12-20 09:50:00", user: "Amanda Lee", action: "update", module: "HR", details: "Updated leave request #LR-2024-089", status: "success", ip: "192.168.1.109" },
  { id: 13, timestamp: "2024-12-20 09:45:00", user: "John Anderson", action: "api_call", module: "API", details: "API key pk_live_***a1b2 used - GET /api/customers", status: "success", ip: "203.45.67.89" },
  { id: 14, timestamp: "2024-12-20 09:40:00", user: "System", action: "alert", module: "Access Control", details: "Access denied at Server Room - Invalid card", status: "warning", ip: "192.168.2.50" },
  { id: 15, timestamp: "2024-12-20 09:35:00", user: "Emily Chen", action: "upload", module: "Files", details: "Uploaded Marketing_Plan_Q1_2025.pdf (4.2 MB)", status: "success", ip: "192.168.1.105" }
];

// Backups
export interface Backup {
  id: string;
  name: string;
  type: 'automatic' | 'manual';
  size: string;
  createdAt: string;
  status: 'completed' | 'failed' | 'in_progress';
  retention: string;
  downloadUrl: string;
}

export const backups: Backup[] = [
  { id: "BKP001", name: "Daily Backup - Dec 20", type: "automatic", size: "2.4 GB", createdAt: "2024-12-20 03:00:00", status: "completed", retention: "30 days", downloadUrl: "#" },
  { id: "BKP002", name: "Daily Backup - Dec 19", type: "automatic", size: "2.3 GB", createdAt: "2024-12-19 03:00:00", status: "completed", retention: "30 days", downloadUrl: "#" },
  { id: "BKP003", name: "Weekly Backup - Dec 15", type: "automatic", size: "2.4 GB", createdAt: "2024-12-15 03:00:00", status: "completed", retention: "90 days", downloadUrl: "#" },
  { id: "BKP004", name: "Manual Backup - Pre-Update", type: "manual", size: "2.2 GB", createdAt: "2024-12-10 14:30:00", status: "completed", retention: "365 days", downloadUrl: "#" },
  { id: "BKP005", name: "Monthly Backup - Nov 2024", type: "automatic", size: "2.1 GB", createdAt: "2024-11-01 03:00:00", status: "completed", retention: "365 days", downloadUrl: "#" },
  { id: "BKP006", name: "Daily Backup - Dec 18", type: "automatic", size: "2.3 GB", createdAt: "2024-12-18 03:00:00", status: "completed", retention: "30 days", downloadUrl: "#" }
];

// Backup Settings
export interface BackupSettings {
  autoBackupEnabled: boolean;
  dailyBackupTime: string;
  weeklyBackupDay: string;
  monthlyBackupDay: number;
  dailyRetention: number;
  weeklyRetention: number;
  monthlyRetention: number;
  backupLocation: string;
  encryptionEnabled: boolean;
  includeFiles: boolean;
  includeDatabase: boolean;
  notifyOnComplete: boolean;
  notifyOnFailure: boolean;
}

export const backupSettings: BackupSettings = {
  autoBackupEnabled: true,
  dailyBackupTime: "03:00",
  weeklyBackupDay: "Sunday",
  monthlyBackupDay: 1,
  dailyRetention: 30,
  weeklyRetention: 90,
  monthlyRetention: 365,
  backupLocation: "cloud",
  encryptionEnabled: true,
  includeFiles: true,
  includeDatabase: true,
  notifyOnComplete: true,
  notifyOnFailure: true
};

// Notification Settings
export interface NotificationChannel {
  enabled: boolean;
  address?: string;
  phone?: string;
  channel?: string;
  browser?: boolean;
  mobile?: boolean;
}

export interface NotificationPreference {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface QuietHours {
  enabled: boolean;
  start: string;
  end: string;
}

export interface NotificationSettings {
  channels: {
    email: NotificationChannel;
    push: NotificationChannel;
    sms: NotificationChannel;
    slack: NotificationChannel;
  };
  preferences: {
    taskAssigned: NotificationPreference;
    taskCompleted: NotificationPreference;
    taskOverdue: NotificationPreference;
    newMessage: NotificationPreference;
    newAnnouncement: NotificationPreference;
    systemAlert: NotificationPreference;
    loginAlert: NotificationPreference;
    reportReady: NotificationPreference;
    backupComplete: NotificationPreference;
    integrationError: NotificationPreference;
  };
  quietHours: QuietHours;
  digestEnabled: boolean;
  digestFrequency: string;
  digestTime: string;
}

export const notificationSettings: NotificationSettings = {
  channels: {
    email: {
      enabled: true,
      address: "admin@acmecorp.com"
    },
    push: {
      enabled: true,
      browser: true,
      mobile: false
    },
    sms: {
      enabled: false,
      phone: ""
    },
    slack: {
      enabled: true,
      channel: "#notifications"
    }
  },
  preferences: {
    taskAssigned: { email: true, push: true, sms: false },
    taskCompleted: { email: false, push: true, sms: false },
    taskOverdue: { email: true, push: true, sms: false },
    newMessage: { email: false, push: true, sms: false },
    newAnnouncement: { email: true, push: true, sms: false },
    systemAlert: { email: true, push: true, sms: true },
    loginAlert: { email: true, push: false, sms: false },
    reportReady: { email: true, push: true, sms: false },
    backupComplete: { email: true, push: false, sms: false },
    integrationError: { email: true, push: true, sms: false }
  },
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "08:00"
  },
  digestEnabled: true,
  digestFrequency: "daily",
  digestTime: "09:00"
};

// Dropdown Options
export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Consulting",
  "Media & Entertainment",
  "Transportation",
  "Other"
];

export const employeeCounts = [
  "1-10",
  "11-50",
  "50-100",
  "100-250",
  "250-500",
  "500-1000",
  "1000+"
];

export const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "GMT/UTC" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
];

export const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (12/31/2024)" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (31/12/2024)" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2024-12-31)" },
  { value: "DD.MM.YYYY", label: "DD.MM.YYYY (31.12.2024)" }
];

export const currencies = [
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
  { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
  { value: "CAD", label: "Canadian Dollar (C$)", symbol: "C$" },
  { value: "AUD", label: "Australian Dollar (A$)", symbol: "A$" },
  { value: "CHF", label: "Swiss Franc (CHF)", symbol: "CHF" }
];

export const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "zh-CN", label: "Chinese (Simplified)" }
];

export const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "China",
  "Brazil",
  "India",
  "Mexico",
  "Spain",
  "Italy",
  "Netherlands",
  "Switzerland"
];

export const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Customer Support",
  "Product",
  "Legal",
  "IT"
];

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const weekDays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// Helper functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: '#10b981',
    connected: '#10b981',
    success: '#10b981',
    completed: '#10b981',
    inactive: '#64748b',
    disconnected: '#64748b',
    pending: '#f59e0b',
    warning: '#f59e0b',
    in_progress: '#f59e0b',
    expired: '#ef4444',
    failed: '#ef4444',
    revoked: '#ef4444'
  };
  return colors[status] || '#64748b';
};

export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const getActionIcon = (action: string): string => {
  const icons: Record<string, string> = {
    login: 'LogIn',
    logout: 'LogOut',
    create: 'Plus',
    update: 'Edit',
    delete: 'Trash2',
    export: 'Download',
    upload: 'Upload',
    backup: 'Database',
    sync: 'RefreshCw',
    notification: 'Bell',
    api_call: 'Code',
    alert: 'AlertTriangle'
  };
  return icons[action] || 'Activity';
};

export const getModuleIcon = (module: string): string => {
  const icons: Record<string, string> = {
    Auth: 'Shield',
    CRM: 'Users',
    HR: 'UserCog',
    Accounting: 'Calculator',
    Settings: 'Settings',
    Reports: 'BarChart',
    Files: 'Folder',
    System: 'Server',
    Integration: 'Link',
    API: 'Code',
    'Access Control': 'Lock',
    Maintenance: 'Wrench'
  };
  return icons[module] || 'Box';
};
