import {
  Phone,
  Mail,
  Calendar,
  CheckSquare,
} from 'lucide-react';

// Customer Types
export interface Customer {
  id: string;
  name: string;
  type: 'company' | 'individual';
  industry: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  status: 'active' | 'inactive';
  segment: 'Enterprise' | 'Mid-Market' | 'SMB';
  accountManager: string;
  totalRevenue: number;
  totalOrders: number;
  lastContact: string;
  createdAt: string;
  notes: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  score: number;
  assignedTo: string;
  value: number;
  createdAt: string;
  lastActivity: string;
}

export interface Opportunity {
  id: string;
  name: string;
  customer: string;
  value: number;
  stage: 'discovery' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedClose: string;
  owner: string;
  createdAt: string;
  lastActivity: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface Quote {
  id: string;
  customer: string;
  opportunity: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: string;
  createdAt: string;
  createdBy: string;
}

export interface Contract {
  id: string;
  customer: string;
  title: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expiring' | 'expired';
  type: string;
  autoRenew: boolean;
}

export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  customer: string;
  contact: string | null;
  date: string;
  time: string | null;
  duration: string | null;
  outcome: string;
  assignedTo: string;
}

export interface LeadSource {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

// Mock Data
export const customers: Customer[] = [
  {
    id: "CUS001",
    name: "Acme Corporation",
    type: "company",
    industry: "Technology",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 100-2000",
    website: "www.acmecorp.com",
    address: "123 Tech Boulevard, San Francisco, CA 94105",
    status: "active",
    segment: "Enterprise",
    accountManager: "John Anderson",
    totalRevenue: 125000,
    totalOrders: 15,
    lastContact: "2024-12-18",
    createdAt: "2022-03-15",
    notes: "Key strategic partner. Interested in expanding services."
  },
  {
    id: "CUS002",
    name: "Tech Solutions Ltd",
    type: "company",
    industry: "Software",
    email: "info@techsolutions.com",
    phone: "+1 (555) 200-3000",
    website: "www.techsolutions.com",
    address: "456 Innovation Drive, Austin, TX 78701",
    status: "active",
    segment: "Mid-Market",
    accountManager: "Emily Chen",
    totalRevenue: 78500,
    totalOrders: 8,
    lastContact: "2024-12-19",
    createdAt: "2022-06-20",
    notes: "Growing account with potential for upsell."
  },
  {
    id: "CUS003",
    name: "Global Industries",
    type: "company",
    industry: "Manufacturing",
    email: "procurement@globalind.com",
    phone: "+1 (555) 300-4000",
    website: "www.globalindustries.com",
    address: "789 Industrial Park, Detroit, MI 48201",
    status: "active",
    segment: "Enterprise",
    accountManager: "Michael Roberts",
    totalRevenue: 215000,
    totalOrders: 22,
    lastContact: "2024-12-15",
    createdAt: "2021-11-10",
    notes: "Long-term customer. Annual contract renewal in Q1."
  },
  {
    id: "CUS004",
    name: "StartUp Inc",
    type: "company",
    industry: "Fintech",
    email: "hello@startupinc.io",
    phone: "+1 (555) 400-5000",
    website: "www.startupinc.io",
    address: "321 Venture Lane, New York, NY 10001",
    status: "active",
    segment: "SMB",
    accountManager: "Sarah Wilson",
    totalRevenue: 35000,
    totalOrders: 5,
    lastContact: "2024-12-20",
    createdAt: "2023-08-01",
    notes: "Fast-growing startup. Monitor for expansion opportunities."
  },
  {
    id: "CUS005",
    name: "Enterprise Co",
    type: "company",
    industry: "Finance",
    email: "partnerships@enterpriseco.com",
    phone: "+1 (555) 500-6000",
    website: "www.enterpriseco.com",
    address: "555 Wall Street, New York, NY 10005",
    status: "active",
    segment: "Enterprise",
    accountManager: "John Anderson",
    totalRevenue: 450000,
    totalOrders: 35,
    lastContact: "2024-12-17",
    createdAt: "2020-05-15",
    notes: "Top-tier customer. Executive relationship established."
  },
  {
    id: "CUS006",
    name: "Digital Agency",
    type: "company",
    industry: "Marketing",
    email: "projects@digitalagency.com",
    phone: "+1 (555) 600-7000",
    website: "www.digitalagency.com",
    address: "888 Creative Ave, Los Angeles, CA 90028",
    status: "inactive",
    segment: "Mid-Market",
    accountManager: "Emily Chen",
    totalRevenue: 42000,
    totalOrders: 6,
    lastContact: "2024-10-05",
    createdAt: "2023-02-20",
    notes: "Account on hold. Follow up in January."
  },
  {
    id: "CUS007",
    name: "Healthcare Plus",
    type: "company",
    industry: "Healthcare",
    email: "admin@healthcareplus.org",
    phone: "+1 (555) 700-8000",
    website: "www.healthcareplus.org",
    address: "999 Medical Center Dr, Boston, MA 02115",
    status: "active",
    segment: "Enterprise",
    accountManager: "Michael Roberts",
    totalRevenue: 185000,
    totalOrders: 18,
    lastContact: "2024-12-16",
    createdAt: "2021-09-01",
    notes: "Strict compliance requirements. Dedicated support needed."
  },
  {
    id: "CUS008",
    name: "Retail Chain",
    type: "company",
    industry: "Retail",
    email: "vendors@retailchain.com",
    phone: "+1 (555) 800-9000",
    website: "www.retailchain.com",
    address: "100 Commerce Way, Chicago, IL 60601",
    status: "active",
    segment: "Enterprise",
    accountManager: "Sarah Wilson",
    totalRevenue: 320000,
    totalOrders: 28,
    lastContact: "2024-12-14",
    createdAt: "2020-12-01",
    notes: "Seasonal peaks in Q4. Plan resources accordingly."
  }
];

export const leads: Lead[] = [
  { id: "LED001", name: "James Wilson", company: "NewTech Startup", email: "james@newtech.io", phone: "+1 (555) 111-2222", source: "Website", status: "new", score: 85, assignedTo: "John Anderson", value: 50000, createdAt: "2024-12-18", lastActivity: "2024-12-20" },
  { id: "LED002", name: "Maria Garcia", company: "Innovate Labs", email: "maria@innovatelabs.com", phone: "+1 (555) 222-3333", source: "Referral", status: "contacted", score: 72, assignedTo: "Emily Chen", value: 35000, createdAt: "2024-12-15", lastActivity: "2024-12-19" },
  { id: "LED003", name: "Robert Brown", company: "Metro Services", email: "robert@metroservices.com", phone: "+1 (555) 333-4444", source: "Trade Show", status: "qualified", score: 90, assignedTo: "Michael Roberts", value: 120000, createdAt: "2024-12-10", lastActivity: "2024-12-18" },
  { id: "LED004", name: "Jennifer Lee", company: "Cloud Systems", email: "jennifer@cloudsystems.net", phone: "+1 (555) 444-5555", source: "LinkedIn", status: "new", score: 65, assignedTo: "Sarah Wilson", value: 25000, createdAt: "2024-12-19", lastActivity: "2024-12-19" },
  { id: "LED005", name: "David Miller", company: "Alpha Dynamics", email: "david@alphadynamics.com", phone: "+1 (555) 555-6666", source: "Cold Call", status: "contacted", score: 58, assignedTo: "John Anderson", value: 45000, createdAt: "2024-12-12", lastActivity: "2024-12-17" },
  { id: "LED006", name: "Sarah Johnson", company: "Prime Solutions", email: "sarah@primesolutions.io", phone: "+1 (555) 666-7777", source: "Website", status: "qualified", score: 88, assignedTo: "Emily Chen", value: 85000, createdAt: "2024-12-08", lastActivity: "2024-12-20" },
  { id: "LED007", name: "Michael Chang", company: "Future Corp", email: "michael@futurecorp.com", phone: "+1 (555) 777-8888", source: "Referral", status: "unqualified", score: 25, assignedTo: "Michael Roberts", value: 15000, createdAt: "2024-12-05", lastActivity: "2024-12-10" },
  { id: "LED008", name: "Lisa Taylor", company: "Bright Ideas Inc", email: "lisa@brightideas.com", phone: "+1 (555) 888-9999", source: "Webinar", status: "new", score: 78, assignedTo: "Sarah Wilson", value: 62000, createdAt: "2024-12-20", lastActivity: "2024-12-20" }
];

export const opportunities: Opportunity[] = [
  { id: "OPP001", name: "Enterprise Software License", customer: "Acme Corporation", value: 75000, stage: "proposal", probability: 70, expectedClose: "2025-01-15", owner: "John Anderson", createdAt: "2024-11-01", lastActivity: "2024-12-18" },
  { id: "OPP002", name: "Annual Service Contract", customer: "Global Industries", value: 120000, stage: "negotiation", probability: 85, expectedClose: "2024-12-30", owner: "Michael Roberts", createdAt: "2024-10-15", lastActivity: "2024-12-20" },
  { id: "OPP003", name: "Platform Implementation", customer: "Healthcare Plus", value: 95000, stage: "qualification", probability: 40, expectedClose: "2025-02-28", owner: "Emily Chen", createdAt: "2024-12-01", lastActivity: "2024-12-17" },
  { id: "OPP004", name: "Consulting Package", customer: "StartUp Inc", value: 35000, stage: "proposal", probability: 60, expectedClose: "2025-01-20", owner: "Sarah Wilson", createdAt: "2024-11-20", lastActivity: "2024-12-19" },
  { id: "OPP005", name: "Multi-Year Agreement", customer: "Enterprise Co", value: 250000, stage: "closed-won", probability: 100, expectedClose: "2024-12-15", owner: "John Anderson", createdAt: "2024-09-01", lastActivity: "2024-12-15" },
  { id: "OPP006", name: "Product Expansion", customer: "Tech Solutions Ltd", value: 45000, stage: "discovery", probability: 25, expectedClose: "2025-03-15", owner: "Emily Chen", createdAt: "2024-12-10", lastActivity: "2024-12-16" },
  { id: "OPP007", name: "Support Upgrade", customer: "Retail Chain", value: 28000, stage: "proposal", probability: 75, expectedClose: "2025-01-10", owner: "Michael Roberts", createdAt: "2024-11-15", lastActivity: "2024-12-14" },
  { id: "OPP008", name: "New Division Onboarding", customer: "Global Industries", value: 180000, stage: "negotiation", probability: 80, expectedClose: "2025-01-31", owner: "Michael Roberts", createdAt: "2024-11-01", lastActivity: "2024-12-20" },
  { id: "OPP009", name: "Pilot Program", customer: "Digital Agency", value: 15000, stage: "closed-lost", probability: 0, expectedClose: "2024-11-30", owner: "Emily Chen", createdAt: "2024-10-01", lastActivity: "2024-11-28" }
];

export const pipelineStages: PipelineStage[] = [
  { id: "discovery", name: "Discovery", color: "#64748b", order: 1 },
  { id: "qualification", name: "Qualification", color: "#6366f1", order: 2 },
  { id: "proposal", name: "Proposal", color: "#8b5cf6", order: 3 },
  { id: "negotiation", name: "Negotiation", color: "#f59e0b", order: 4 },
  { id: "closed-won", name: "Closed Won", color: "#10b981", order: 5 },
  { id: "closed-lost", name: "Closed Lost", color: "#ef4444", order: 6 }
];

export const quotes: Quote[] = [
  { id: "QUO-2024-001", customer: "Acme Corporation", opportunity: "Enterprise Software License", amount: 75000, status: "sent", validUntil: "2025-01-15", createdAt: "2024-12-10", createdBy: "John Anderson" },
  { id: "QUO-2024-002", customer: "Global Industries", opportunity: "Annual Service Contract", amount: 120000, status: "accepted", validUntil: "2024-12-31", createdAt: "2024-12-05", createdBy: "Michael Roberts" },
  { id: "QUO-2024-003", customer: "Healthcare Plus", opportunity: "Platform Implementation", amount: 95000, status: "draft", validUntil: "2025-02-28", createdAt: "2024-12-18", createdBy: "Emily Chen" },
  { id: "QUO-2024-004", customer: "StartUp Inc", opportunity: "Consulting Package", amount: 35000, status: "sent", validUntil: "2025-01-25", createdAt: "2024-12-12", createdBy: "Sarah Wilson" },
  { id: "QUO-2024-005", customer: "Retail Chain", opportunity: "Support Upgrade", amount: 28000, status: "sent", validUntil: "2025-01-20", createdAt: "2024-12-08", createdBy: "Michael Roberts" },
  { id: "QUO-2024-006", customer: "Tech Solutions Ltd", opportunity: "Product Expansion", amount: 45000, status: "draft", validUntil: "2025-03-01", createdAt: "2024-12-19", createdBy: "Emily Chen" },
  { id: "QUO-2024-007", customer: "Digital Agency", opportunity: "Pilot Program", amount: 15000, status: "rejected", validUntil: "2024-11-30", createdAt: "2024-11-15", createdBy: "Emily Chen" }
];

export const contracts: Contract[] = [
  { id: "CON-2024-001", customer: "Enterprise Co", title: "Multi-Year Service Agreement", value: 250000, startDate: "2024-12-15", endDate: "2026-12-14", status: "active", type: "Service Agreement", autoRenew: true },
  { id: "CON-2024-002", customer: "Global Industries", title: "Annual Support Contract", value: 120000, startDate: "2025-01-01", endDate: "2025-12-31", status: "pending", type: "Support Contract", autoRenew: true },
  { id: "CON-2023-015", customer: "Acme Corporation", title: "Software License Agreement", value: 85000, startDate: "2024-01-01", endDate: "2024-12-31", status: "expiring", type: "License Agreement", autoRenew: false },
  { id: "CON-2023-012", customer: "Healthcare Plus", title: "Managed Services Contract", value: 150000, startDate: "2024-03-01", endDate: "2025-02-28", status: "active", type: "Managed Services", autoRenew: true },
  { id: "CON-2024-003", customer: "Retail Chain", title: "Implementation Services", value: 75000, startDate: "2024-06-01", endDate: "2024-12-31", status: "expiring", type: "Professional Services", autoRenew: false },
  { id: "CON-2022-008", customer: "Tech Solutions Ltd", title: "Partnership Agreement", value: 50000, startDate: "2023-01-01", endDate: "2024-12-31", status: "expired", type: "Partnership", autoRenew: false }
];

export const activities: Activity[] = [
  { id: 1, type: "call", subject: "Follow-up call", customer: "Acme Corporation", contact: "John Smith", date: "2024-12-20", time: "10:00", duration: "25 min", outcome: "Positive - Moving to proposal", assignedTo: "John Anderson" },
  { id: 2, type: "email", subject: "Proposal sent", customer: "Global Industries", contact: "Sarah Davis", date: "2024-12-20", time: "09:30", duration: null, outcome: "Awaiting response", assignedTo: "Michael Roberts" },
  { id: 3, type: "meeting", subject: "Quarterly Business Review", customer: "Enterprise Co", contact: "Mike Johnson", date: "2024-12-19", time: "14:00", duration: "1 hr", outcome: "Discussed expansion", assignedTo: "John Anderson" },
  { id: 4, type: "call", subject: "Discovery call", customer: "StartUp Inc", contact: "Lisa Wong", date: "2024-12-19", time: "11:00", duration: "30 min", outcome: "Qualified - Good fit", assignedTo: "Sarah Wilson" },
  { id: 5, type: "email", subject: "Contract renewal reminder", customer: "Acme Corporation", contact: "John Smith", date: "2024-12-18", time: "16:00", duration: null, outcome: "Read - No reply yet", assignedTo: "John Anderson" },
  { id: 6, type: "meeting", subject: "Product demo", customer: "Healthcare Plus", contact: "Dr. Emily Clark", date: "2024-12-18", time: "10:30", duration: "45 min", outcome: "Interested in Phase 2", assignedTo: "Emily Chen" },
  { id: 7, type: "task", subject: "Prepare proposal", customer: "Tech Solutions Ltd", contact: null, date: "2024-12-17", time: null, duration: null, outcome: "Completed", assignedTo: "Emily Chen" },
  { id: 8, type: "call", subject: "Pricing discussion", customer: "Retail Chain", contact: "Tom Richards", date: "2024-12-17", time: "15:30", duration: "20 min", outcome: "Need revised quote", assignedTo: "Michael Roberts" }
];

export const leadSources: LeadSource[] = [
  { name: "Website", count: 45, percentage: 35, color: "#6366f1" },
  { name: "Referral", count: 32, percentage: 25, color: "#8b5cf6" },
  { name: "LinkedIn", count: 25, percentage: 19, color: "#10b981" },
  { name: "Trade Show", count: 15, percentage: 12, color: "#f59e0b" },
  { name: "Other", count: 12, percentage: 9, color: "#64748b" }
];

// Activity type icons mapping
export const activityTypeIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckSquare,
};

// Segment colors
export const segmentColors = {
  Enterprise: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Mid-Market': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  SMB: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
};

// Lead status colors
export const leadStatusColors = {
  new: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  contacted: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  qualified: { bg: 'bg-green-500/10', text: 'text-green-400' },
  unqualified: { bg: 'bg-red-500/10', text: 'text-red-400' },
};

// Quote status colors
export const quoteStatusColors = {
  draft: { bg: 'bg-gray-500/10', text: 'text-gray-400' },
  sent: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  accepted: { bg: 'bg-green-500/10', text: 'text-green-400' },
  rejected: { bg: 'bg-red-500/10', text: 'text-red-400' },
  expired: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
};

// Contract status colors
export const contractStatusColors = {
  active: { bg: 'bg-green-500/10', text: 'text-green-400' },
  pending: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  expiring: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  expired: { bg: 'bg-red-500/10', text: 'text-red-400' },
};

// Helper functions
export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(c => c.id === id);
};

export const getOpportunitiesByCustomer = (customerName: string): Opportunity[] => {
  return opportunities.filter(o => o.customer === customerName);
};

export const getActivitiesByCustomer = (customerName: string): Activity[] => {
  return activities.filter(a => a.customer === customerName);
};

export const getContractsByCustomer = (customerName: string): Contract[] => {
  return contracts.filter(c => c.customer === customerName);
};

export const getQuotesByCustomer = (customerName: string): Quote[] => {
  return quotes.filter(q => q.customer === customerName);
};
