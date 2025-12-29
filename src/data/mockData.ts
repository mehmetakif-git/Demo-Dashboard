import {
  LayoutDashboard,
  Users,
  Calculator,
  UserCircle,
  CheckSquare,
  Wrench,
  BarChart3,
  QrCode,
  Shield,
  Monitor,
  MessageSquare,
  FolderOpen,
  Settings,
  DollarSign,
  Clock,
  TrendingUp,
  Building2,
  CalendarOff,
  CalendarCheck,
  Wallet,
  UserSearch,
  Star,
  PieChart,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  Landmark,
  Activity,
  Receipt,
  ClipboardList,
  Target,
  FileSignature,
  Phone,
} from 'lucide-react';
import type { MenuGroup, KPICard } from '@/types';

// Demo user data
export const demoUser = {
  email: 'demo@panel.com',
  name: 'Demo User',
  role: 'admin' as const,
  avatar: null,
};

// Sidebar menu structure
export const menuGroups: MenuGroup[] = [
  {
    id: 'main',
    label: 'MAIN',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
    ],
  },
  {
    id: 'management',
    label: 'MANAGEMENT',
    items: [
      {
        id: 'hr',
        label: 'HR',
        icon: Users,
        path: '/dashboard/hr',
        children: [
          { id: 'employees', label: 'Employees', icon: Users, path: '/dashboard/hr/employees' },
          { id: 'departments', label: 'Departments', icon: Building2, path: '/dashboard/hr/departments' },
          { id: 'leave', label: 'Leave Management', icon: CalendarOff, path: '/dashboard/hr/leave' },
          { id: 'attendance', label: 'Attendance', icon: CalendarCheck, path: '/dashboard/hr/attendance' },
          { id: 'payroll', label: 'Payroll', icon: Wallet, path: '/dashboard/hr/payroll' },
          { id: 'recruitment', label: 'Recruitment', icon: UserSearch, path: '/dashboard/hr/recruitment' },
          { id: 'performance', label: 'Performance', icon: Star, path: '/dashboard/hr/performance' },
        ],
      },
      {
        id: 'accounting',
        label: 'Accounting',
        icon: Calculator,
        path: '/dashboard/accounting',
        children: [
          { id: 'accounting-overview', label: 'Overview', icon: PieChart, path: '/dashboard/accounting/overview' },
          { id: 'income', label: 'Income', icon: ArrowUpCircle, path: '/dashboard/accounting/income' },
          { id: 'expenses', label: 'Expenses', icon: ArrowDownCircle, path: '/dashboard/accounting/expenses' },
          { id: 'invoices', label: 'Invoices', icon: FileText, path: '/dashboard/accounting/invoices' },
          { id: 'bank-accounts', label: 'Bank Accounts', icon: Landmark, path: '/dashboard/accounting/bank-accounts' },
          { id: 'cash-flow', label: 'Cash Flow', icon: Activity, path: '/dashboard/accounting/cash-flow' },
          { id: 'tax', label: 'Tax', icon: Receipt, path: '/dashboard/accounting/tax' },
          { id: 'accounting-reports', label: 'Reports', icon: ClipboardList, path: '/dashboard/accounting/reports' },
        ],
      },
      {
        id: 'crm',
        label: 'CRM',
        icon: UserCircle,
        path: '/dashboard/crm',
        children: [
          { id: 'customers', label: 'Customers', icon: Building2, path: '/dashboard/crm/customers' },
          { id: 'leads', label: 'Leads', icon: Target, path: '/dashboard/crm/leads' },
          { id: 'opportunities', label: 'Opportunities', icon: TrendingUp, path: '/dashboard/crm/opportunities' },
          { id: 'quotes', label: 'Quotes', icon: FileText, path: '/dashboard/crm/quotes' },
          { id: 'contracts', label: 'Contracts', icon: FileSignature, path: '/dashboard/crm/contracts' },
          { id: 'crm-activities', label: 'Activities', icon: Phone, path: '/dashboard/crm/activities' },
          { id: 'crm-reports', label: 'Reports', icon: BarChart3, path: '/dashboard/crm/reports' },
        ],
      },
      {
        id: 'tasks',
        label: 'Tasks',
        icon: CheckSquare,
        children: [],
      },
    ],
  },
  {
    id: 'operations',
    label: 'OPERATIONS',
    items: [
      {
        id: 'maintenance',
        label: 'Maintenance',
        icon: Wrench,
        children: [],
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: BarChart3,
        children: [],
      },
      {
        id: 'qr-codes',
        label: 'QR Codes',
        icon: QrCode,
        children: [],
      },
    ],
  },
  {
    id: 'security',
    label: 'SECURITY',
    items: [
      {
        id: 'access-control',
        label: 'Access Control',
        icon: Shield,
        children: [],
      },
      {
        id: 'digital-signage',
        label: 'Digital Signage',
        icon: Monitor,
        children: [],
      },
    ],
  },
  {
    id: 'communication',
    label: 'COMMUNICATION',
    items: [
      {
        id: 'chat',
        label: 'Chat',
        icon: MessageSquare,
        children: [],
      },
      {
        id: 'files',
        label: 'Files',
        icon: FolderOpen,
        children: [],
      },
    ],
  },
  {
    id: 'system',
    label: 'SYSTEM',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        children: [],
      },
    ],
  },
];

// Dashboard KPI data
export const dashboardKPIs: KPICard[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$124,500',
    change: '+12.5% from last month',
    changeType: 'positive',
    icon: DollarSign,
    iconColor: '#10b981', // success green
  },
  {
    id: 'members',
    title: 'Active Members',
    value: '1,248',
    change: '+3.2% from last month',
    changeType: 'positive',
    icon: Users,
    iconColor: '#6366f1', // primary indigo
  },
  {
    id: 'tasks',
    title: 'Pending Tasks',
    value: '23',
    change: '5 urgent',
    changeType: 'neutral',
    icon: Clock,
    iconColor: '#f59e0b', // warning amber
  },
  {
    id: 'growth',
    title: "This Month's Growth",
    value: '+18.2%',
    change: 'On track',
    changeType: 'positive',
    icon: TrendingUp,
    iconColor: '#8b5cf6', // secondary purple
  },
];
