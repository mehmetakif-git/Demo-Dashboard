// Report Templates
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fields: string[];
  formats: string[];
  lastUsed: string;
  usageCount: number;
  estimatedTime: string;
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: "TPL001",
    name: "Sales Performance Report",
    description: "Comprehensive sales metrics including revenue, deals, and conversion rates",
    category: "Sales",
    icon: "TrendingUp",
    fields: ["Date Range", "Sales Rep", "Product Category", "Region"],
    formats: ["PDF", "Excel", "CSV"],
    lastUsed: "2024-12-18",
    usageCount: 45,
    estimatedTime: "~30 seconds"
  },
  {
    id: "TPL002",
    name: "Employee Attendance Report",
    description: "Daily attendance records, late arrivals, and leave summary",
    category: "HR",
    icon: "Users",
    fields: ["Date Range", "Department", "Employee", "Status"],
    formats: ["PDF", "Excel"],
    lastUsed: "2024-12-20",
    usageCount: 128,
    estimatedTime: "~15 seconds"
  },
  {
    id: "TPL003",
    name: "Financial Summary",
    description: "Income, expenses, profit margins, and cash flow overview",
    category: "Finance",
    icon: "DollarSign",
    fields: ["Date Range", "Account Type", "Category"],
    formats: ["PDF", "Excel", "CSV"],
    lastUsed: "2024-12-19",
    usageCount: 89,
    estimatedTime: "~45 seconds"
  },
  {
    id: "TPL004",
    name: "Inventory Status Report",
    description: "Current stock levels, low stock alerts, and reorder suggestions",
    category: "Operations",
    icon: "Package",
    fields: ["Category", "Warehouse", "Stock Level"],
    formats: ["PDF", "Excel"],
    lastUsed: "2024-12-17",
    usageCount: 34,
    estimatedTime: "~20 seconds"
  },
  {
    id: "TPL005",
    name: "Customer Analysis Report",
    description: "Customer demographics, purchase history, and engagement metrics",
    category: "CRM",
    icon: "UserCircle",
    fields: ["Date Range", "Segment", "Region", "Status"],
    formats: ["PDF", "Excel", "CSV"],
    lastUsed: "2024-12-16",
    usageCount: 56,
    estimatedTime: "~40 seconds"
  },
  {
    id: "TPL006",
    name: "Task Completion Report",
    description: "Task status, completion rates, and team productivity metrics",
    category: "Operations",
    icon: "CheckSquare",
    fields: ["Date Range", "Project", "Assignee", "Status"],
    formats: ["PDF", "Excel"],
    lastUsed: "2024-12-20",
    usageCount: 72,
    estimatedTime: "~15 seconds"
  },
  {
    id: "TPL007",
    name: "Access Control Log Report",
    description: "Door access events, security incidents, and visitor logs",
    category: "Security",
    icon: "Shield",
    fields: ["Date Range", "Door/Zone", "Person", "Event Type"],
    formats: ["PDF", "Excel", "CSV"],
    lastUsed: "2024-12-19",
    usageCount: 23,
    estimatedTime: "~25 seconds"
  },
  {
    id: "TPL008",
    name: "Payroll Summary Report",
    description: "Salary disbursements, deductions, bonuses, and tax summaries",
    category: "HR",
    icon: "Wallet",
    fields: ["Month", "Department", "Employee Type"],
    formats: ["PDF", "Excel"],
    lastUsed: "2024-12-15",
    usageCount: 24,
    estimatedTime: "~35 seconds"
  }
];

// Report Categories
export interface ReportCategory {
  id: string;
  name: string;
  count: number;
  color?: string;
}

export const reportCategories: ReportCategory[] = [
  { id: "all", name: "All Reports", count: 8 },
  { id: "sales", name: "Sales", count: 1, color: "#10b981" },
  { id: "hr", name: "HR", count: 2, color: "#6366f1" },
  { id: "finance", name: "Finance", count: 1, color: "#f59e0b" },
  { id: "operations", name: "Operations", count: 2, color: "#8b5cf6" },
  { id: "crm", name: "CRM", count: 1, color: "#ec4899" },
  { id: "security", name: "Security", count: 1, color: "#ef4444" }
];

// Saved Reports
export interface SavedReport {
  id: string;
  name: string;
  template: string;
  createdBy: string;
  createdAt: string;
  lastRun: string;
  schedule: string;
  parameters: Record<string, string>;
  format: string;
  status: 'active' | 'paused';
  recipients: string[];
}

export const savedReports: SavedReport[] = [
  {
    id: "RPT001",
    name: "Monthly Sales Report - December",
    template: "Sales Performance Report",
    createdBy: "John Anderson",
    createdAt: "2024-12-01 09:00:00",
    lastRun: "2024-12-20 08:00:00",
    schedule: "Daily at 8:00 AM",
    parameters: { dateRange: "This Month", salesRep: "All", region: "All" },
    format: "PDF",
    status: "active",
    recipients: ["john.anderson@company.com", "sarah.wilson@company.com"]
  },
  {
    id: "RPT002",
    name: "Weekly Attendance Summary",
    template: "Employee Attendance Report",
    createdBy: "Amanda Lee",
    createdAt: "2024-11-15 14:00:00",
    lastRun: "2024-12-20 07:00:00",
    schedule: "Weekly on Monday",
    parameters: { dateRange: "Last Week", department: "All" },
    format: "Excel",
    status: "active",
    recipients: ["amanda.lee@company.com", "hr-team@company.com"]
  },
  {
    id: "RPT003",
    name: "Q4 Financial Overview",
    template: "Financial Summary",
    createdBy: "Lisa Park",
    createdAt: "2024-10-01 10:00:00",
    lastRun: "2024-12-19 18:00:00",
    schedule: "Monthly on 1st",
    parameters: { dateRange: "Q4 2024", accountType: "All" },
    format: "PDF",
    status: "active",
    recipients: ["lisa.park@company.com", "executives@company.com"]
  },
  {
    id: "RPT004",
    name: "Daily Security Log",
    template: "Access Control Log Report",
    createdBy: "Chris Johnson",
    createdAt: "2024-09-01 08:00:00",
    lastRun: "2024-12-20 06:00:00",
    schedule: "Daily at 6:00 AM",
    parameters: { dateRange: "Yesterday", eventType: "All" },
    format: "PDF",
    status: "active",
    recipients: ["security@company.com"]
  },
  {
    id: "RPT005",
    name: "Project Task Status",
    template: "Task Completion Report",
    createdBy: "Sarah Wilson",
    createdAt: "2024-12-10 11:00:00",
    lastRun: "2024-12-18 17:00:00",
    schedule: "None (Manual)",
    parameters: { project: "Platform Development", status: "All" },
    format: "Excel",
    status: "paused",
    recipients: ["sarah.wilson@company.com"]
  }
];

// Exportable Data
export interface ExportableData {
  id: string;
  name: string;
  description: string;
  category: string;
  recordCount: number;
  fields: string[];
  formats: string[];
  lastExported: string;
}

export const exportableData: ExportableData[] = [
  {
    id: "EXP001",
    name: "Employees",
    description: "Employee directory with contact information and department details",
    category: "HR",
    recordCount: 52,
    fields: ["ID", "Name", "Email", "Phone", "Department", "Position", "Start Date", "Status"],
    formats: ["Excel", "CSV", "JSON"],
    lastExported: "2024-12-18 14:30:00"
  },
  {
    id: "EXP002",
    name: "Customers",
    description: "Customer database with contact and purchase information",
    category: "CRM",
    recordCount: 1248,
    fields: ["ID", "Name", "Email", "Phone", "Company", "Industry", "Total Revenue", "Last Contact"],
    formats: ["Excel", "CSV", "JSON"],
    lastExported: "2024-12-19 10:00:00"
  },
  {
    id: "EXP003",
    name: "Invoices",
    description: "All invoices with line items and payment status",
    category: "Finance",
    recordCount: 3456,
    fields: ["Invoice #", "Customer", "Date", "Due Date", "Amount", "Status", "Items"],
    formats: ["Excel", "CSV", "PDF"],
    lastExported: "2024-12-20 09:15:00"
  },
  {
    id: "EXP004",
    name: "Products",
    description: "Product catalog with pricing and inventory levels",
    category: "Operations",
    recordCount: 856,
    fields: ["SKU", "Name", "Category", "Price", "Stock", "Status"],
    formats: ["Excel", "CSV", "JSON"],
    lastExported: "2024-12-15 16:00:00"
  },
  {
    id: "EXP005",
    name: "Tasks",
    description: "All tasks with assignments and status",
    category: "Operations",
    recordCount: 2134,
    fields: ["ID", "Title", "Project", "Assignee", "Priority", "Status", "Due Date", "Created"],
    formats: ["Excel", "CSV", "JSON"],
    lastExported: "2024-12-17 11:30:00"
  },
  {
    id: "EXP006",
    name: "Access Logs",
    description: "Door access and security event logs",
    category: "Security",
    recordCount: 45678,
    fields: ["Timestamp", "Person", "Card #", "Door", "Action", "Method"],
    formats: ["Excel", "CSV"],
    lastExported: "2024-12-20 06:00:00"
  },
  {
    id: "EXP007",
    name: "Transactions",
    description: "Financial transactions and payment records",
    category: "Finance",
    recordCount: 8923,
    fields: ["Date", "Description", "Account", "Type", "Amount", "Balance"],
    formats: ["Excel", "CSV", "PDF"],
    lastExported: "2024-12-19 17:00:00"
  },
  {
    id: "EXP008",
    name: "Leads",
    description: "Sales leads with source and status tracking",
    category: "CRM",
    recordCount: 567,
    fields: ["ID", "Name", "Company", "Email", "Source", "Score", "Status", "Assigned To"],
    formats: ["Excel", "CSV", "JSON"],
    lastExported: "2024-12-16 14:00:00"
  }
];

// Import Templates
export interface ImportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  requiredFields: string[];
  optionalFields: string[];
  sampleFile: string;
  lastImport: string;
  lastImportCount: number;
}

export const importTemplates: ImportTemplate[] = [
  {
    id: "IMP001",
    name: "Employees Import",
    description: "Import employee records from Excel or CSV",
    category: "HR",
    requiredFields: ["Name", "Email", "Department", "Position"],
    optionalFields: ["Phone", "Start Date", "Manager"],
    sampleFile: "employees_template.xlsx",
    lastImport: "2024-12-10 09:00:00",
    lastImportCount: 15
  },
  {
    id: "IMP002",
    name: "Customers Import",
    description: "Bulk import customer records",
    category: "CRM",
    requiredFields: ["Name", "Email"],
    optionalFields: ["Phone", "Company", "Industry", "Address"],
    sampleFile: "customers_template.xlsx",
    lastImport: "2024-12-05 14:30:00",
    lastImportCount: 250
  },
  {
    id: "IMP003",
    name: "Products Import",
    description: "Import product catalog data",
    category: "Operations",
    requiredFields: ["SKU", "Name", "Price"],
    optionalFields: ["Category", "Description", "Stock", "Status"],
    sampleFile: "products_template.xlsx",
    lastImport: "2024-11-28 10:00:00",
    lastImportCount: 120
  },
  {
    id: "IMP004",
    name: "Invoices Import",
    description: "Import historical invoice data",
    category: "Finance",
    requiredFields: ["Invoice #", "Customer", "Date", "Amount"],
    optionalFields: ["Due Date", "Status", "Line Items"],
    sampleFile: "invoices_template.xlsx",
    lastImport: "2024-10-15 11:00:00",
    lastImportCount: 500
  },
  {
    id: "IMP005",
    name: "Tasks Import",
    description: "Bulk import tasks and assignments",
    category: "Operations",
    requiredFields: ["Title", "Project"],
    optionalFields: ["Description", "Assignee", "Priority", "Due Date", "Status"],
    sampleFile: "tasks_template.xlsx",
    lastImport: "2024-12-01 15:00:00",
    lastImportCount: 45
  }
];

// Export History
export interface ExportHistoryItem {
  id: string;
  name: string;
  type: 'export' | 'import' | 'report';
  format: string;
  records: number | null;
  size: string;
  status: 'completed' | 'failed' | 'processing';
  createdBy: string;
  createdAt: string;
  downloadUrl: string | null;
  error?: string;
}

export const exportHistory: ExportHistoryItem[] = [
  { id: "HIS001", name: "Employees Export", type: "export", format: "Excel", records: 52, size: "245 KB", status: "completed", createdBy: "Amanda Lee", createdAt: "2024-12-20 09:30:00", downloadUrl: "#" },
  { id: "HIS002", name: "Monthly Sales Report", type: "report", format: "PDF", records: null, size: "1.2 MB", status: "completed", createdBy: "John Anderson", createdAt: "2024-12-20 08:00:00", downloadUrl: "#" },
  { id: "HIS003", name: "Customer Database", type: "export", format: "CSV", records: 1248, size: "890 KB", status: "completed", createdBy: "Emily Chen", createdAt: "2024-12-19 16:45:00", downloadUrl: "#" },
  { id: "HIS004", name: "Access Logs - December", type: "export", format: "Excel", records: 15678, size: "4.5 MB", status: "completed", createdBy: "Chris Johnson", createdAt: "2024-12-19 14:30:00", downloadUrl: "#" },
  { id: "HIS005", name: "Financial Summary Q4", type: "report", format: "PDF", records: null, size: "2.8 MB", status: "completed", createdBy: "Lisa Park", createdAt: "2024-12-19 10:00:00", downloadUrl: "#" },
  { id: "HIS006", name: "Products Catalog", type: "export", format: "JSON", records: 856, size: "1.5 MB", status: "completed", createdBy: "Michael Roberts", createdAt: "2024-12-18 15:20:00", downloadUrl: "#" },
  { id: "HIS007", name: "Invoices Export", type: "export", format: "Excel", records: 3456, size: "5.2 MB", status: "failed", createdBy: "Lisa Park", createdAt: "2024-12-18 11:00:00", downloadUrl: null, error: "Timeout - too many records" },
  { id: "HIS008", name: "Weekly Attendance", type: "report", format: "Excel", records: null, size: "456 KB", status: "completed", createdBy: "Amanda Lee", createdAt: "2024-12-18 07:00:00", downloadUrl: "#" },
  { id: "HIS009", name: "Leads Import", type: "import", format: "CSV", records: 125, size: "89 KB", status: "completed", createdBy: "Emily Chen", createdAt: "2024-12-17 14:30:00", downloadUrl: null },
  { id: "HIS010", name: "Tasks Bulk Import", type: "import", format: "Excel", records: 45, size: "156 KB", status: "completed", createdBy: "Sarah Wilson", createdAt: "2024-12-17 10:00:00", downloadUrl: null }
];

// Schedule Options
export interface ScheduleOption {
  id: string;
  label: string;
}

export const scheduleOptions: ScheduleOption[] = [
  { id: "none", label: "No Schedule (Manual)" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" }
];

// Helper functions
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Sales: '#10b981',
    HR: '#6366f1',
    Finance: '#f59e0b',
    Operations: '#8b5cf6',
    CRM: '#ec4899',
    Security: '#ef4444',
  };
  return colors[category] || '#6b7280';
};

export const getFormatColor = (format: string): string => {
  const colors: Record<string, string> = {
    PDF: '#ef4444',
    Excel: '#10b981',
    CSV: '#3b82f6',
    JSON: '#8b5cf6',
  };
  return colors[format] || '#6b7280';
};
