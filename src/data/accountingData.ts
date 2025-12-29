// Accounting Mock Data

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingInvoices: number;
  overdueInvoices: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
}

export interface IncomeRecord {
  id: number;
  date: string;
  description: string;
  category: string;
  client: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'cash' | 'check';
  status: 'received' | 'pending' | 'cancelled';
  invoiceId?: string;
}

export interface ExpenseRecord {
  id: number;
  date: string;
  description: string;
  category: string;
  vendor: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'cash' | 'check';
  status: 'paid' | 'pending' | 'cancelled';
  receipt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';
  paidDate?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BankAccount {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'business';
  balance: number;
  currency: string;
  lastSync: string;
  isActive: boolean;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  accountId: number;
  balance: number;
  reference?: string;
}

export interface CashFlowData {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface TaxRecord {
  id: number;
  type: string;
  period: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  reference?: string;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

// Financial Summary
export const financialSummary: FinancialSummary = {
  totalRevenue: 2450000,
  totalExpenses: 1680000,
  netProfit: 770000,
  pendingInvoices: 12,
  overdueInvoices: 3,
  cashBalance: 485000,
  accountsReceivable: 320000,
  accountsPayable: 145000,
};

// Income Records
export const incomeRecords: IncomeRecord[] = [
  {
    id: 1,
    date: '2024-12-28',
    description: 'Enterprise Software License - Annual',
    category: 'Software Sales',
    client: 'Acme Corporation',
    amount: 125000,
    paymentMethod: 'bank_transfer',
    status: 'received',
    invoiceId: 'INV-2024-001',
  },
  {
    id: 2,
    date: '2024-12-27',
    description: 'Consulting Services - Q4',
    category: 'Consulting',
    client: 'TechStart Inc',
    amount: 45000,
    paymentMethod: 'bank_transfer',
    status: 'received',
    invoiceId: 'INV-2024-002',
  },
  {
    id: 3,
    date: '2024-12-26',
    description: 'Cloud Hosting Services - December',
    category: 'Cloud Services',
    client: 'Global Retail Ltd',
    amount: 18500,
    paymentMethod: 'credit_card',
    status: 'received',
    invoiceId: 'INV-2024-003',
  },
  {
    id: 4,
    date: '2024-12-25',
    description: 'Custom Development Project',
    category: 'Development',
    client: 'FinanceHub Co',
    amount: 85000,
    paymentMethod: 'bank_transfer',
    status: 'pending',
    invoiceId: 'INV-2024-004',
  },
  {
    id: 5,
    date: '2024-12-24',
    description: 'Support & Maintenance Contract',
    category: 'Support',
    client: 'MediCare Systems',
    amount: 32000,
    paymentMethod: 'bank_transfer',
    status: 'received',
    invoiceId: 'INV-2024-005',
  },
  {
    id: 6,
    date: '2024-12-23',
    description: 'API Integration Services',
    category: 'Development',
    client: 'LogiTrans Inc',
    amount: 28000,
    paymentMethod: 'check',
    status: 'received',
    invoiceId: 'INV-2024-006',
  },
  {
    id: 7,
    date: '2024-12-22',
    description: 'Training Workshop - 3 Days',
    category: 'Training',
    client: 'EduTech Solutions',
    amount: 15000,
    paymentMethod: 'credit_card',
    status: 'received',
    invoiceId: 'INV-2024-007',
  },
  {
    id: 8,
    date: '2024-12-21',
    description: 'Data Analytics Platform License',
    category: 'Software Sales',
    client: 'DataDriven Corp',
    amount: 95000,
    paymentMethod: 'bank_transfer',
    status: 'pending',
    invoiceId: 'INV-2024-008',
  },
  {
    id: 9,
    date: '2024-12-20',
    description: 'Security Audit Services',
    category: 'Consulting',
    client: 'SecureBank Ltd',
    amount: 42000,
    paymentMethod: 'bank_transfer',
    status: 'received',
    invoiceId: 'INV-2024-009',
  },
  {
    id: 10,
    date: '2024-12-19',
    description: 'Mobile App Development - Phase 1',
    category: 'Development',
    client: 'RetailMax Inc',
    amount: 68000,
    paymentMethod: 'bank_transfer',
    status: 'received',
    invoiceId: 'INV-2024-010',
  },
];

// Expense Records
export const expenseRecords: ExpenseRecord[] = [
  {
    id: 1,
    date: '2024-12-28',
    description: 'Office Rent - December',
    category: 'Rent',
    vendor: 'Premium Properties',
    amount: 25000,
    paymentMethod: 'bank_transfer',
    status: 'paid',
  },
  {
    id: 2,
    date: '2024-12-27',
    description: 'Cloud Infrastructure - AWS',
    category: 'Technology',
    vendor: 'Amazon Web Services',
    amount: 18500,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
  {
    id: 3,
    date: '2024-12-26',
    description: 'Employee Salaries - December',
    category: 'Payroll',
    vendor: 'Internal',
    amount: 285000,
    paymentMethod: 'bank_transfer',
    status: 'paid',
  },
  {
    id: 4,
    date: '2024-12-25',
    description: 'Marketing Campaign - Q4',
    category: 'Marketing',
    vendor: 'Digital Marketing Agency',
    amount: 45000,
    paymentMethod: 'bank_transfer',
    status: 'paid',
  },
  {
    id: 5,
    date: '2024-12-24',
    description: 'Office Supplies',
    category: 'Operations',
    vendor: 'Office Depot',
    amount: 3200,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
  {
    id: 6,
    date: '2024-12-23',
    description: 'Software Licenses - Annual',
    category: 'Technology',
    vendor: 'Microsoft',
    amount: 28000,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
  {
    id: 7,
    date: '2024-12-22',
    description: 'Legal Services',
    category: 'Professional Services',
    vendor: 'Smith & Associates Law',
    amount: 12000,
    paymentMethod: 'bank_transfer',
    status: 'pending',
  },
  {
    id: 8,
    date: '2024-12-21',
    description: 'Insurance Premium - Q1',
    category: 'Insurance',
    vendor: 'Corporate Insurance Inc',
    amount: 15000,
    paymentMethod: 'bank_transfer',
    status: 'paid',
  },
  {
    id: 9,
    date: '2024-12-20',
    description: 'Travel Expenses - Client Meetings',
    category: 'Travel',
    vendor: 'Various',
    amount: 8500,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
  {
    id: 10,
    date: '2024-12-19',
    description: 'Equipment Purchase - Laptops',
    category: 'Equipment',
    vendor: 'Dell Technologies',
    amount: 35000,
    paymentMethod: 'bank_transfer',
    status: 'paid',
  },
  {
    id: 11,
    date: '2024-12-18',
    description: 'Utilities - December',
    category: 'Utilities',
    vendor: 'City Utilities',
    amount: 4500,
    paymentMethod: 'bank_transfer',
    status: 'pending',
  },
  {
    id: 12,
    date: '2024-12-17',
    description: 'Professional Development Training',
    category: 'Training',
    vendor: 'Tech Academy',
    amount: 8000,
    paymentMethod: 'credit_card',
    status: 'paid',
  },
];

// Invoices
export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2024-001',
    client: 'Acme Corporation',
    clientEmail: 'billing@acme.com',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    items: [
      { description: 'Enterprise Software License - Annual', quantity: 1, unitPrice: 100000, total: 100000 },
      { description: 'Premium Support Package', quantity: 1, unitPrice: 25000, total: 25000 },
    ],
    subtotal: 125000,
    tax: 0,
    total: 125000,
    status: 'paid',
    paidDate: '2024-12-28',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2024-002',
    client: 'TechStart Inc',
    clientEmail: 'accounts@techstart.io',
    issueDate: '2024-12-05',
    dueDate: '2025-01-04',
    items: [
      { description: 'Consulting Services - Strategic Planning', quantity: 40, unitPrice: 500, total: 20000 },
      { description: 'Consulting Services - Implementation', quantity: 50, unitPrice: 500, total: 25000 },
    ],
    subtotal: 45000,
    tax: 0,
    total: 45000,
    status: 'paid',
    paidDate: '2024-12-27',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2024-003',
    client: 'Global Retail Ltd',
    clientEmail: 'finance@globalretail.com',
    issueDate: '2024-12-10',
    dueDate: '2025-01-09',
    items: [
      { description: 'Cloud Hosting - December', quantity: 1, unitPrice: 18500, total: 18500 },
    ],
    subtotal: 18500,
    tax: 0,
    total: 18500,
    status: 'paid',
    paidDate: '2024-12-26',
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2024-004',
    client: 'FinanceHub Co',
    clientEmail: 'ap@financehub.com',
    issueDate: '2024-12-15',
    dueDate: '2025-01-14',
    items: [
      { description: 'Custom Development - Phase 1', quantity: 1, unitPrice: 50000, total: 50000 },
      { description: 'Custom Development - Phase 2', quantity: 1, unitPrice: 35000, total: 35000 },
    ],
    subtotal: 85000,
    tax: 0,
    total: 85000,
    status: 'pending',
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-2024-005',
    client: 'MediCare Systems',
    clientEmail: 'billing@medicare-sys.com',
    issueDate: '2024-12-08',
    dueDate: '2025-01-07',
    items: [
      { description: 'Support & Maintenance - Annual', quantity: 1, unitPrice: 32000, total: 32000 },
    ],
    subtotal: 32000,
    tax: 0,
    total: 32000,
    status: 'paid',
    paidDate: '2024-12-24',
  },
  {
    id: 'inv-6',
    invoiceNumber: 'INV-2024-006',
    client: 'LogiTrans Inc',
    clientEmail: 'accounts@logitrans.com',
    issueDate: '2024-11-20',
    dueDate: '2024-12-20',
    items: [
      { description: 'API Integration Services', quantity: 1, unitPrice: 28000, total: 28000 },
    ],
    subtotal: 28000,
    tax: 0,
    total: 28000,
    status: 'overdue',
  },
  {
    id: 'inv-7',
    invoiceNumber: 'INV-2024-007',
    client: 'EduTech Solutions',
    clientEmail: 'finance@edutech.org',
    issueDate: '2024-12-18',
    dueDate: '2025-01-17',
    items: [
      { description: 'Training Workshop - 3 Days', quantity: 1, unitPrice: 15000, total: 15000 },
    ],
    subtotal: 15000,
    tax: 0,
    total: 15000,
    status: 'paid',
    paidDate: '2024-12-22',
  },
  {
    id: 'inv-8',
    invoiceNumber: 'INV-2024-008',
    client: 'DataDriven Corp',
    clientEmail: 'ap@datadriven.io',
    issueDate: '2024-12-20',
    dueDate: '2025-01-19',
    items: [
      { description: 'Data Analytics Platform License', quantity: 1, unitPrice: 95000, total: 95000 },
    ],
    subtotal: 95000,
    tax: 0,
    total: 95000,
    status: 'pending',
  },
  {
    id: 'inv-9',
    invoiceNumber: 'INV-2024-009',
    client: 'SecureBank Ltd',
    clientEmail: 'accounts@securebank.com',
    issueDate: '2024-11-15',
    dueDate: '2024-12-15',
    items: [
      { description: 'Security Audit Services', quantity: 1, unitPrice: 42000, total: 42000 },
    ],
    subtotal: 42000,
    tax: 0,
    total: 42000,
    status: 'overdue',
  },
  {
    id: 'inv-10',
    invoiceNumber: 'INV-2024-010',
    client: 'RetailMax Inc',
    clientEmail: 'billing@retailmax.com',
    issueDate: '2024-12-12',
    dueDate: '2025-01-11',
    items: [
      { description: 'Mobile App Development - Phase 1', quantity: 1, unitPrice: 68000, total: 68000 },
    ],
    subtotal: 68000,
    tax: 0,
    total: 68000,
    status: 'paid',
    paidDate: '2024-12-19',
  },
  {
    id: 'inv-11',
    invoiceNumber: 'INV-2024-011',
    client: 'StartupXYZ',
    clientEmail: 'cfo@startupxyz.com',
    issueDate: '2024-12-22',
    dueDate: '2025-01-21',
    items: [
      { description: 'MVP Development', quantity: 1, unitPrice: 55000, total: 55000 },
    ],
    subtotal: 55000,
    tax: 0,
    total: 55000,
    status: 'draft',
  },
  {
    id: 'inv-12',
    invoiceNumber: 'INV-2024-012',
    client: 'HealthTech Pro',
    clientEmail: 'finance@healthtech.com',
    issueDate: '2024-11-01',
    dueDate: '2024-12-01',
    items: [
      { description: 'System Integration', quantity: 1, unitPrice: 38000, total: 38000 },
    ],
    subtotal: 38000,
    tax: 0,
    total: 38000,
    status: 'overdue',
  },
];

// Bank Accounts
export const bankAccounts: BankAccount[] = [
  {
    id: 1,
    bankName: 'Chase Business',
    accountName: 'Primary Operating Account',
    accountNumber: '****4521',
    accountType: 'checking',
    balance: 285000,
    currency: 'USD',
    lastSync: '2024-12-28T14:30:00',
    isActive: true,
  },
  {
    id: 2,
    bankName: 'Bank of America',
    accountName: 'Payroll Account',
    accountNumber: '****8734',
    accountType: 'checking',
    balance: 125000,
    currency: 'USD',
    lastSync: '2024-12-28T14:30:00',
    isActive: true,
  },
  {
    id: 3,
    bankName: 'Wells Fargo',
    accountName: 'Savings Reserve',
    accountNumber: '****2156',
    accountType: 'savings',
    balance: 450000,
    currency: 'USD',
    lastSync: '2024-12-28T10:15:00',
    isActive: true,
  },
  {
    id: 4,
    bankName: 'Silicon Valley Bank',
    accountName: 'Investment Account',
    accountNumber: '****9087',
    accountType: 'business',
    balance: 180000,
    currency: 'USD',
    lastSync: '2024-12-27T16:45:00',
    isActive: true,
  },
  {
    id: 5,
    bankName: 'First National',
    accountName: 'Tax Reserve',
    accountNumber: '****3342',
    accountType: 'savings',
    balance: 95000,
    currency: 'USD',
    lastSync: '2024-12-28T09:00:00',
    isActive: true,
  },
];

// Transactions
export const transactions: Transaction[] = [
  {
    id: 1,
    date: '2024-12-28',
    description: 'Payment from Acme Corporation',
    amount: 125000,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 285000,
    reference: 'INV-2024-001',
  },
  {
    id: 2,
    date: '2024-12-28',
    description: 'Office Rent Payment',
    amount: 25000,
    type: 'debit',
    category: 'Rent',
    accountId: 1,
    balance: 160000,
    reference: 'RENT-DEC-24',
  },
  {
    id: 3,
    date: '2024-12-27',
    description: 'Payment from TechStart Inc',
    amount: 45000,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 185000,
    reference: 'INV-2024-002',
  },
  {
    id: 4,
    date: '2024-12-27',
    description: 'AWS Cloud Services',
    amount: 18500,
    type: 'debit',
    category: 'Technology',
    accountId: 1,
    balance: 140000,
    reference: 'AWS-DEC-24',
  },
  {
    id: 5,
    date: '2024-12-26',
    description: 'Employee Salary Transfer',
    amount: 285000,
    type: 'debit',
    category: 'Payroll',
    accountId: 2,
    balance: 125000,
    reference: 'PAY-DEC-24',
  },
  {
    id: 6,
    date: '2024-12-26',
    description: 'Payment from Global Retail Ltd',
    amount: 18500,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 158500,
    reference: 'INV-2024-003',
  },
  {
    id: 7,
    date: '2024-12-25',
    description: 'Marketing Campaign Payment',
    amount: 45000,
    type: 'debit',
    category: 'Marketing',
    accountId: 1,
    balance: 113500,
    reference: 'MKT-Q4-24',
  },
  {
    id: 8,
    date: '2024-12-24',
    description: 'Payment from MediCare Systems',
    amount: 32000,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 145500,
    reference: 'INV-2024-005',
  },
  {
    id: 9,
    date: '2024-12-23',
    description: 'Software Licenses',
    amount: 28000,
    type: 'debit',
    category: 'Technology',
    accountId: 1,
    balance: 117500,
    reference: 'MS-LIC-24',
  },
  {
    id: 10,
    date: '2024-12-22',
    description: 'Payment from EduTech Solutions',
    amount: 15000,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 132500,
    reference: 'INV-2024-007',
  },
  {
    id: 11,
    date: '2024-12-21',
    description: 'Insurance Premium',
    amount: 15000,
    type: 'debit',
    category: 'Insurance',
    accountId: 1,
    balance: 117500,
    reference: 'INS-Q1-25',
  },
  {
    id: 12,
    date: '2024-12-20',
    description: 'Equipment Purchase',
    amount: 35000,
    type: 'debit',
    category: 'Equipment',
    accountId: 1,
    balance: 82500,
    reference: 'EQP-DEC-24',
  },
  {
    id: 13,
    date: '2024-12-19',
    description: 'Payment from RetailMax Inc',
    amount: 68000,
    type: 'credit',
    category: 'Invoice Payment',
    accountId: 1,
    balance: 150500,
    reference: 'INV-2024-010',
  },
  {
    id: 14,
    date: '2024-12-18',
    description: 'Transfer to Savings',
    amount: 50000,
    type: 'debit',
    category: 'Transfer',
    accountId: 1,
    balance: 100500,
    reference: 'TRF-SAV-24',
  },
  {
    id: 15,
    date: '2024-12-18',
    description: 'Transfer from Operating',
    amount: 50000,
    type: 'credit',
    category: 'Transfer',
    accountId: 3,
    balance: 450000,
    reference: 'TRF-SAV-24',
  },
];

// Cash Flow Data (Monthly)
export const cashFlowData: CashFlowData[] = [
  { month: 'Jan', inflow: 420000, outflow: 320000, net: 100000 },
  { month: 'Feb', inflow: 380000, outflow: 290000, net: 90000 },
  { month: 'Mar', inflow: 450000, outflow: 340000, net: 110000 },
  { month: 'Apr', inflow: 520000, outflow: 380000, net: 140000 },
  { month: 'May', inflow: 480000, outflow: 350000, net: 130000 },
  { month: 'Jun', inflow: 550000, outflow: 400000, net: 150000 },
  { month: 'Jul', inflow: 490000, outflow: 370000, net: 120000 },
  { month: 'Aug', inflow: 530000, outflow: 390000, net: 140000 },
  { month: 'Sep', inflow: 580000, outflow: 420000, net: 160000 },
  { month: 'Oct', inflow: 620000, outflow: 450000, net: 170000 },
  { month: 'Nov', inflow: 590000, outflow: 430000, net: 160000 },
  { month: 'Dec', inflow: 650000, outflow: 480000, net: 170000 },
];

// Tax Records
export const taxRecords: TaxRecord[] = [
  {
    id: 1,
    type: 'Corporate Income Tax',
    period: 'Q4 2024',
    dueDate: '2025-01-15',
    amount: 85000,
    status: 'pending',
  },
  {
    id: 2,
    type: 'Payroll Tax',
    period: 'December 2024',
    dueDate: '2025-01-10',
    amount: 42500,
    status: 'pending',
  },
  {
    id: 3,
    type: 'Sales Tax',
    period: 'Q4 2024',
    dueDate: '2025-01-20',
    amount: 28000,
    status: 'pending',
  },
  {
    id: 4,
    type: 'Corporate Income Tax',
    period: 'Q3 2024',
    dueDate: '2024-10-15',
    amount: 78000,
    status: 'paid',
    paidDate: '2024-10-12',
    reference: 'TAX-Q3-2024-001',
  },
  {
    id: 5,
    type: 'Payroll Tax',
    period: 'November 2024',
    dueDate: '2024-12-10',
    amount: 41000,
    status: 'paid',
    paidDate: '2024-12-08',
    reference: 'TAX-NOV-2024-001',
  },
  {
    id: 6,
    type: 'Sales Tax',
    period: 'Q3 2024',
    dueDate: '2024-10-20',
    amount: 25000,
    status: 'paid',
    paidDate: '2024-10-18',
    reference: 'TAX-Q3-2024-002',
  },
  {
    id: 7,
    type: 'Property Tax',
    period: 'Annual 2024',
    dueDate: '2024-11-30',
    amount: 18000,
    status: 'paid',
    paidDate: '2024-11-25',
    reference: 'TAX-PROP-2024',
  },
  {
    id: 8,
    type: 'State Business Tax',
    period: 'Q4 2024',
    dueDate: '2025-01-31',
    amount: 15000,
    status: 'pending',
  },
];

// Expense Categories (for pie chart)
export const expenseCategories: ExpenseCategory[] = [
  { name: 'Payroll', amount: 855000, percentage: 51, color: '#6366f1' },
  { name: 'Technology', amount: 185000, percentage: 11, color: '#8b5cf6' },
  { name: 'Rent & Utilities', amount: 150000, percentage: 9, color: '#10b981' },
  { name: 'Marketing', amount: 135000, percentage: 8, color: '#f59e0b' },
  { name: 'Professional Services', amount: 120000, percentage: 7, color: '#ef4444' },
  { name: 'Travel & Entertainment', amount: 85000, percentage: 5, color: '#ec4899' },
  { name: 'Insurance', amount: 60000, percentage: 4, color: '#14b8a6' },
  { name: 'Other', amount: 90000, percentage: 5, color: '#64748b' },
];

// Helper functions
export const getAccountById = (id: number): BankAccount | undefined => {
  return bankAccounts.find((account) => account.id === id);
};

export const getTransactionsByAccount = (accountId: number): Transaction[] => {
  return transactions.filter((t) => t.accountId === accountId);
};

export const getInvoicesByStatus = (status: Invoice['status']): Invoice[] => {
  return invoices.filter((inv) => inv.status === status);
};

export const getTotalByCategory = (records: ExpenseRecord[], category: string): number => {
  return records
    .filter((r) => r.category === category)
    .reduce((acc, r) => acc + r.amount, 0);
};

export const getMonthlyTotals = (records: (IncomeRecord | ExpenseRecord)[]): { month: string; total: number }[] => {
  const monthlyMap = new Map<string, number>();

  records.forEach((record) => {
    const month = new Date(record.date).toLocaleString('default', { month: 'short' });
    const current = monthlyMap.get(month) || 0;
    monthlyMap.set(month, current + record.amount);
  });

  return Array.from(monthlyMap.entries()).map(([month, total]) => ({ month, total }));
};
