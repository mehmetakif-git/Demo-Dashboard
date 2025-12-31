import {
  Megaphone,
  Users,
  FolderKanban,
  LayoutGrid,
  Image,
  UserCircle,
  BarChart3,
  Receipt,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Types
export interface Campaign {
  id: string;
  campaignId: string;
  name: string;
  client: string;
  clientId: string;
  brand: string;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  type: 'integrated' | 'brand' | 'performance' | 'influencer' | 'digital';
  objective: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: {
    total: number;
    spent: number;
    remaining: number;
    breakdown: {
      media: number;
      production: number;
      talent: number;
      other: number;
    };
  };
  channels: string[];
  targetAudience: {
    demographics: string;
    interests: string[];
    locations: string[];
  };
  kpis: Record<string, { target: number; actual: number }>;
  team: { id: string; name: string; role: string }[];
  accountDirector: string;
  creativeDirector: string;
  projects: string[];
  mediaPlans: string[];
  assets: number;
  talentCount?: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgencyClient {
  id: string;
  clientId: string;
  name: string;
  industry: string;
  website: string;
  logo: string | null;
  status: 'active' | 'inactive' | 'prospect';
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  contractType: 'retainer' | 'project';
  retainerAmount: number | null;
  contractStart: string;
  contractEnd: string;
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  billingContact: {
    name: string;
    email: string;
    phone: string;
  };
  accountTeam: {
    accountDirector: string;
    accountManager: string | null;
    creativeDirector: string;
  };
  activeCampaigns: number;
  totalCampaigns: number;
  lifetimeValue: number;
  ytdRevenue: number;
  brands: string[];
  services: string[];
  paymentTerms: string;
  rating: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  projectId: string;
  name: string;
  client: string;
  clientId: string;
  campaignId: string;
  campaignName: string;
  type: 'video' | 'digital' | 'print' | 'ooh' | 'social' | 'audio';
  category: string;
  status: 'briefing' | 'concept' | 'in-production' | 'review' | 'active' | 'completed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  description: string;
  deliverables: { name: string; status: string; dueDate: string }[];
  budget: number;
  spent: number;
  startDate: string;
  dueDate: string;
  team: { id: string; name: string; role: string }[];
  creativeDirector: string;
  projectManager: string;
  timeline?: { phase: string; startDate: string; endDate: string; status: string }[];
  assets: number;
  approvals: Record<string, { status: string; date: string | null; approvedBy: string | null }>;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaPlan {
  id: string;
  name: string;
  campaignId: string;
  campaignName: string;
  client: string;
  clientId: string;
  status: 'draft' | 'active' | 'completed';
  flightDates: {
    start: string;
    end: string;
  };
  totalBudget: number;
  spent: number;
  channels: {
    channel: string;
    budget: number;
    spent: number;
    impressions?: number;
    clicks?: number;
    cpm?: number;
    cpc?: number;
    placements: string[];
  }[];
  kpis: Record<string, { target: number; actual: number }>;
  mediaDirector: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreativeAsset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio' | 'document';
  format: string;
  resolution: string;
  duration: number | null;
  fileSize: string;
  projectId: string;
  projectName: string;
  campaignId: string;
  client: string;
  status: 'draft' | 'in-review' | 'approved' | 'live' | 'archived';
  version: string;
  thumbnail: string | null;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  approvals: { reviewer: string; status: string; date: string | null }[];
}

export interface Talent {
  id: string;
  name: string;
  type: 'influencer' | 'celebrity' | 'model' | 'actor';
  category: string;
  tier: 'nano' | 'micro' | 'mid' | 'macro' | 'mega' | 'celebrity';
  platforms: {
    platform: string;
    handle: string;
    followers: number;
    engagement: number;
  }[];
  totalFollowers: number;
  avgEngagement: number;
  demographics: {
    age: string;
    gender: string;
    location: string;
  };
  categories: string[];
  rate: Record<string, number | string>;
  pastCollaborations: string[];
  currentContracts: { client: string; campaign: string; status: string }[];
  contact: {
    email: string;
    agency: string | null;
    agentName: string | null;
  };
  rating: number | null;
  notes: string;
  status: 'active' | 'prospect' | 'inactive';
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  campaignId: string;
  campaignName: string;
  type: 'retainer' | 'project' | 'media';
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate: string | null;
  subtotal: number;
  tax: number;
  total: number;
  lineItems: { description: string; quantity: number; rate: number; amount: number }[];
  notes: string;
  paymentMethod: string | null;
  createdAt: string;
}

// Menu Items
export const agencyMenuItems = [
  { id: 'agency-campaigns', label: 'Campaigns', icon: Megaphone, color: '#f97316', path: ROUTES.agency.campaigns },
  { id: 'agency-clients', label: 'Clients', icon: Users, color: '#8b5cf6', path: ROUTES.agency.clients },
  { id: 'agency-projects', label: 'Projects', icon: FolderKanban, color: '#3b82f6', path: ROUTES.agency.projects },
  { id: 'agency-media', label: 'Media Planning', icon: LayoutGrid, color: '#06b6d4', path: ROUTES.agency.media },
  { id: 'agency-creatives', label: 'Creatives', icon: Image, color: '#ec4899', path: ROUTES.agency.creatives },
  { id: 'agency-talent', label: 'Talent', icon: UserCircle, color: '#f59e0b', path: ROUTES.agency.talent },
  { id: 'agency-analytics', label: 'Analytics', icon: BarChart3, color: '#10b981', path: ROUTES.agency.analytics },
  { id: 'agency-invoicing', label: 'Invoicing', icon: Receipt, color: '#22c55e', path: ROUTES.agency.invoicing },
];

// Campaign Statuses
export const campaignStatuses = [
  { id: 'planning', name: 'Planning', color: '#6366f1' },
  { id: 'active', name: 'Active', color: '#10b981' },
  { id: 'paused', name: 'Paused', color: '#f59e0b' },
  { id: 'completed', name: 'Completed', color: '#8b5cf6' },
  { id: 'cancelled', name: 'Cancelled', color: '#ef4444' },
];

// Project Statuses
export const projectStatuses = [
  { id: 'briefing', name: 'Briefing', color: '#0ea5e9' },
  { id: 'concept', name: 'Concept', color: '#6366f1' },
  { id: 'in-production', name: 'In Production', color: '#f59e0b' },
  { id: 'review', name: 'Client Review', color: '#8b5cf6' },
  { id: 'active', name: 'Active/Live', color: '#10b981' },
  { id: 'completed', name: 'Completed', color: '#64748b' },
  { id: 'on-hold', name: 'On Hold', color: '#ef4444' },
];

// Talent Tiers
export const talentTiers = [
  { id: 'nano', name: 'Nano', range: '1K-10K', color: '#64748b' },
  { id: 'micro', name: 'Micro', range: '10K-100K', color: '#10b981' },
  { id: 'mid', name: 'Mid-Tier', range: '100K-500K', color: '#6366f1' },
  { id: 'macro', name: 'Macro', range: '500K-1M', color: '#8b5cf6' },
  { id: 'mega', name: 'Mega', range: '1M+', color: '#f59e0b' },
  { id: 'celebrity', name: 'Celebrity', range: 'N/A', color: '#ef4444' },
];

// Mock Data
export const campaigns: Campaign[] = [
  {
    id: 'CMP001',
    campaignId: 'CAMP-2024-001',
    name: 'Summer Product Launch 2024',
    client: 'TechGiant Inc',
    clientId: 'ACLT001',
    brand: 'TechGiant Pro',
    status: 'active',
    type: 'integrated',
    objective: 'Product Launch',
    description: 'Multi-channel campaign for the launch of TechGiant Pro flagship smartphone. Focus on innovation, camera capabilities, and lifestyle integration.',
    startDate: '2024-11-01',
    endDate: '2025-01-31',
    budget: {
      total: 2500000,
      spent: 1450000,
      remaining: 1050000,
      breakdown: {
        media: 1500000,
        production: 600000,
        talent: 250000,
        other: 150000,
      },
    },
    channels: ['TV', 'Digital', 'Social', 'OOH', 'Print'],
    targetAudience: {
      demographics: 'Adults 25-45',
      interests: ['Technology', 'Photography', 'Lifestyle'],
      locations: ['USA', 'Canada', 'UK'],
    },
    kpis: {
      impressions: { target: 500000000, actual: 342000000 },
      reach: { target: 75000000, actual: 52000000 },
      engagement: { target: 2500000, actual: 1890000 },
      conversions: { target: 150000, actual: 98000 },
      brandLift: { target: 15, actual: 12 },
    },
    team: [
      { id: 'EMP001', name: 'Sarah Mitchell', role: 'Account Director' },
      { id: 'EMP002', name: 'James Chen', role: 'Creative Director' },
      { id: 'EMP003', name: 'Maria Garcia', role: 'Media Director' },
      { id: 'EMP004', name: 'Alex Thompson', role: 'Project Manager' },
    ],
    accountDirector: 'Sarah Mitchell',
    creativeDirector: 'James Chen',
    projects: ['PRJ001', 'PRJ002', 'PRJ003'],
    mediaPlans: ['MED001'],
    assets: 45,
    notes: 'High priority client. CEO personally involved.',
    createdAt: '2024-10-15',
    updatedAt: '2024-12-20',
  },
  {
    id: 'CMP002',
    campaignId: 'CAMP-2024-002',
    name: 'Holiday Season Brand Campaign',
    client: 'Fashion Forward',
    clientId: 'ACLT002',
    brand: 'Fashion Forward',
    status: 'active',
    type: 'brand',
    objective: 'Brand Awareness',
    description: 'Emotional holiday campaign focused on family, togetherness, and fashion as self-expression.',
    startDate: '2024-11-15',
    endDate: '2024-12-31',
    budget: {
      total: 1200000,
      spent: 980000,
      remaining: 220000,
      breakdown: {
        media: 750000,
        production: 300000,
        talent: 100000,
        other: 50000,
      },
    },
    channels: ['TV', 'Digital', 'Social', 'Influencer'],
    targetAudience: {
      demographics: 'Women 25-54',
      interests: ['Fashion', 'Family', 'Lifestyle'],
      locations: ['USA'],
    },
    kpis: {
      impressions: { target: 200000000, actual: 178000000 },
      reach: { target: 40000000, actual: 35000000 },
      engagement: { target: 1500000, actual: 1650000 },
      conversions: { target: 50000, actual: 62000 },
      brandLift: { target: 10, actual: 11 },
    },
    team: [
      { id: 'EMP005', name: 'Jennifer Wilson', role: 'Account Director' },
      { id: 'EMP006', name: 'David Park', role: 'Creative Director' },
      { id: 'EMP003', name: 'Maria Garcia', role: 'Media Director' },
    ],
    accountDirector: 'Jennifer Wilson',
    creativeDirector: 'David Park',
    projects: ['PRJ004', 'PRJ005'],
    mediaPlans: ['MED002'],
    assets: 32,
    notes: 'Exceeding engagement targets. Client very happy.',
    createdAt: '2024-10-01',
    updatedAt: '2024-12-19',
  },
  {
    id: 'CMP003',
    campaignId: 'CAMP-2024-003',
    name: 'Q1 Performance Marketing',
    client: 'QuickShop',
    clientId: 'ACLT003',
    brand: 'QuickShop',
    status: 'planning',
    type: 'performance',
    objective: 'Lead Generation',
    description: 'Performance-focused digital campaign to drive app downloads and first purchases.',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    budget: {
      total: 800000,
      spent: 0,
      remaining: 800000,
      breakdown: {
        media: 650000,
        production: 100000,
        talent: 0,
        other: 50000,
      },
    },
    channels: ['Digital', 'Social', 'Search', 'Programmatic'],
    targetAudience: {
      demographics: 'Adults 18-35',
      interests: ['Shopping', 'Deals', 'Convenience'],
      locations: ['USA'],
    },
    kpis: {
      impressions: { target: 150000000, actual: 0 },
      clicks: { target: 2000000, actual: 0 },
      appDownloads: { target: 250000, actual: 0 },
      purchases: { target: 75000, actual: 0 },
      cpa: { target: 10.67, actual: 0 },
    },
    team: [
      { id: 'EMP007', name: 'Michael Brown', role: 'Account Manager' },
      { id: 'EMP008', name: 'Lisa Zhang', role: 'Digital Strategist' },
      { id: 'EMP009', name: 'Kevin Lee', role: 'Performance Lead' },
    ],
    accountDirector: 'Michael Brown',
    creativeDirector: 'Lisa Zhang',
    projects: ['PRJ006'],
    mediaPlans: ['MED003'],
    assets: 0,
    notes: 'Focus on CPA optimization. A/B testing critical.',
    createdAt: '2024-12-10',
    updatedAt: '2024-12-18',
  },
  {
    id: 'CMP004',
    campaignId: 'CAMP-2024-004',
    name: 'Corporate Rebrand Campaign',
    client: 'Legacy Financial',
    clientId: 'ACLT004',
    brand: 'Legacy Financial',
    status: 'completed',
    type: 'brand',
    objective: 'Rebrand',
    description: 'Complete brand refresh including new visual identity, messaging platform, and launch campaign.',
    startDate: '2024-06-01',
    endDate: '2024-10-31',
    budget: {
      total: 3500000,
      spent: 3420000,
      remaining: 80000,
      breakdown: {
        media: 1800000,
        production: 1200000,
        talent: 300000,
        other: 200000,
      },
    },
    channels: ['TV', 'Digital', 'Social', 'OOH', 'Print', 'Radio'],
    targetAudience: {
      demographics: 'Adults 35-65',
      interests: ['Finance', 'Investing', 'Retirement'],
      locations: ['USA'],
    },
    kpis: {
      impressions: { target: 400000000, actual: 425000000 },
      reach: { target: 80000000, actual: 85000000 },
      brandAwareness: { target: 45, actual: 52 },
      brandFavorability: { target: 35, actual: 38 },
      leads: { target: 25000, actual: 31000 },
    },
    team: [
      { id: 'EMP001', name: 'Sarah Mitchell', role: 'Account Director' },
      { id: 'EMP010', name: 'Robert Taylor', role: 'Creative Director' },
      { id: 'EMP003', name: 'Maria Garcia', role: 'Media Director' },
    ],
    accountDirector: 'Sarah Mitchell',
    creativeDirector: 'Robert Taylor',
    projects: ['PRJ007', 'PRJ008', 'PRJ009'],
    mediaPlans: ['MED004'],
    assets: 128,
    notes: 'Award-winning campaign. Submitted to Effies.',
    createdAt: '2024-04-15',
    updatedAt: '2024-11-15',
  },
  {
    id: 'CMP005',
    campaignId: 'CAMP-2024-005',
    name: 'Influencer Partnership Program',
    client: 'BeautyGlow',
    clientId: 'ACLT005',
    brand: 'BeautyGlow',
    status: 'active',
    type: 'influencer',
    objective: 'Engagement',
    description: 'Year-long influencer partnership program featuring beauty influencers across TikTok, Instagram, and YouTube.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: {
      total: 1500000,
      spent: 1380000,
      remaining: 120000,
      breakdown: {
        media: 200000,
        production: 300000,
        talent: 900000,
        other: 100000,
      },
    },
    channels: ['Social', 'Influencer', 'Digital'],
    targetAudience: {
      demographics: 'Women 16-35',
      interests: ['Beauty', 'Skincare', 'Makeup'],
      locations: ['USA', 'Canada'],
    },
    kpis: {
      impressions: { target: 300000000, actual: 345000000 },
      engagement: { target: 15000000, actual: 18500000 },
      ugc: { target: 5000, actual: 7200 },
      sales: { target: 2000000, actual: 2450000 },
      roas: { target: 3.5, actual: 4.1 },
    },
    team: [
      { id: 'EMP011', name: 'Amanda Lee', role: 'Account Manager' },
      { id: 'EMP012', name: 'Chris Martinez', role: 'Influencer Lead' },
      { id: 'EMP013', name: 'Nicole Wang', role: 'Social Strategist' },
    ],
    accountDirector: 'Amanda Lee',
    creativeDirector: 'Nicole Wang',
    projects: ['PRJ010'],
    mediaPlans: ['MED005'],
    assets: 250,
    talentCount: 45,
    notes: 'Top performing influencer campaign. Expanding for 2025.',
    createdAt: '2023-11-01',
    updatedAt: '2024-12-20',
  },
];

export const agencyClients: AgencyClient[] = [
  {
    id: 'ACLT001',
    clientId: 'AC-2024-001',
    name: 'TechGiant Inc',
    industry: 'Technology',
    website: 'www.techgiant.com',
    logo: null,
    status: 'active',
    tier: 'platinum',
    contractType: 'retainer',
    retainerAmount: 150000,
    contractStart: '2023-01-01',
    contractEnd: '2025-12-31',
    primaryContact: {
      name: 'Jennifer Roberts',
      title: 'VP Marketing',
      email: 'jroberts@techgiant.com',
      phone: '+1 (555) 901-1001',
    },
    billingContact: {
      name: 'Finance Department',
      email: 'ap@techgiant.com',
      phone: '+1 (555) 901-1002',
    },
    accountTeam: {
      accountDirector: 'Sarah Mitchell',
      accountManager: 'Alex Thompson',
      creativeDirector: 'James Chen',
    },
    activeCampaigns: 1,
    totalCampaigns: 8,
    lifetimeValue: 12500000,
    ytdRevenue: 3200000,
    brands: ['TechGiant', 'TechGiant Pro', 'TechGiant Home'],
    services: ['Full Service', 'Media', 'Creative', 'Strategy'],
    paymentTerms: 'Net 30',
    rating: 5,
    notes: 'Flagship client. Strong relationship with CMO.',
    createdAt: '2020-06-15',
    updatedAt: '2024-12-15',
  },
  {
    id: 'ACLT002',
    clientId: 'AC-2024-002',
    name: 'Fashion Forward',
    industry: 'Retail / Fashion',
    website: 'www.fashionforward.com',
    logo: null,
    status: 'active',
    tier: 'gold',
    contractType: 'project',
    retainerAmount: null,
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    primaryContact: {
      name: 'Michelle Kim',
      title: 'Marketing Director',
      email: 'mkim@fashionforward.com',
      phone: '+1 (555) 902-2001',
    },
    billingContact: {
      name: 'Accounts Payable',
      email: 'billing@fashionforward.com',
      phone: '+1 (555) 902-2002',
    },
    accountTeam: {
      accountDirector: 'Jennifer Wilson',
      accountManager: null,
      creativeDirector: 'David Park',
    },
    activeCampaigns: 1,
    totalCampaigns: 4,
    lifetimeValue: 4800000,
    ytdRevenue: 1800000,
    brands: ['Fashion Forward', 'FF Sport', 'FF Kids'],
    services: ['Creative', 'Media', 'Social'],
    paymentTerms: 'Net 45',
    rating: 4,
    notes: 'Seasonal campaign work. Expanding scope for 2025.',
    createdAt: '2022-03-01',
    updatedAt: '2024-12-10',
  },
  {
    id: 'ACLT003',
    clientId: 'AC-2024-003',
    name: 'QuickShop',
    industry: 'E-commerce',
    website: 'www.quickshop.com',
    logo: null,
    status: 'active',
    tier: 'silver',
    contractType: 'retainer',
    retainerAmount: 50000,
    contractStart: '2024-06-01',
    contractEnd: '2025-05-31',
    primaryContact: {
      name: 'David Chen',
      title: 'Head of Growth',
      email: 'dchen@quickshop.com',
      phone: '+1 (555) 903-3001',
    },
    billingContact: {
      name: 'Finance Team',
      email: 'finance@quickshop.com',
      phone: '+1 (555) 903-3002',
    },
    accountTeam: {
      accountDirector: 'Michael Brown',
      accountManager: null,
      creativeDirector: 'Lisa Zhang',
    },
    activeCampaigns: 1,
    totalCampaigns: 2,
    lifetimeValue: 850000,
    ytdRevenue: 600000,
    brands: ['QuickShop'],
    services: ['Performance Marketing', 'Digital', 'Creative'],
    paymentTerms: 'Net 30',
    rating: 4,
    notes: 'Performance-focused. Heavy data requirements.',
    createdAt: '2024-06-01',
    updatedAt: '2024-12-18',
  },
  {
    id: 'ACLT004',
    clientId: 'AC-2024-004',
    name: 'Legacy Financial',
    industry: 'Financial Services',
    website: 'www.legacyfinancial.com',
    logo: null,
    status: 'active',
    tier: 'platinum',
    contractType: 'retainer',
    retainerAmount: 200000,
    contractStart: '2024-01-01',
    contractEnd: '2026-12-31',
    primaryContact: {
      name: 'Robert Anderson',
      title: 'CMO',
      email: 'randerson@legacyfinancial.com',
      phone: '+1 (555) 904-4001',
    },
    billingContact: {
      name: 'Corporate Finance',
      email: 'corpfinance@legacyfinancial.com',
      phone: '+1 (555) 904-4002',
    },
    accountTeam: {
      accountDirector: 'Sarah Mitchell',
      accountManager: 'Tom Williams',
      creativeDirector: 'Robert Taylor',
    },
    activeCampaigns: 0,
    totalCampaigns: 3,
    lifetimeValue: 8500000,
    ytdRevenue: 4200000,
    brands: ['Legacy Financial', 'Legacy Wealth', 'Legacy Insurance'],
    services: ['Full Service', 'Brand Strategy', 'Media', 'Creative'],
    paymentTerms: 'Net 30',
    rating: 5,
    notes: 'Major rebrand completed. Moving to BAU work.',
    createdAt: '2023-09-01',
    updatedAt: '2024-11-30',
  },
  {
    id: 'ACLT005',
    clientId: 'AC-2024-005',
    name: 'BeautyGlow',
    industry: 'Beauty / Cosmetics',
    website: 'www.beautyglow.com',
    logo: null,
    status: 'active',
    tier: 'gold',
    contractType: 'retainer',
    retainerAmount: 75000,
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    primaryContact: {
      name: 'Sophia Martinez',
      title: 'Brand Director',
      email: 'smartinez@beautyglow.com',
      phone: '+1 (555) 905-5001',
    },
    billingContact: {
      name: 'Accounting',
      email: 'accounting@beautyglow.com',
      phone: '+1 (555) 905-5002',
    },
    accountTeam: {
      accountDirector: 'Amanda Lee',
      accountManager: null,
      creativeDirector: 'Nicole Wang',
    },
    activeCampaigns: 1,
    totalCampaigns: 3,
    lifetimeValue: 3200000,
    ytdRevenue: 1800000,
    brands: ['BeautyGlow', 'GlowSkin', 'GlowHair'],
    services: ['Influencer Marketing', 'Social Media', 'Creative'],
    paymentTerms: 'Net 30',
    rating: 5,
    notes: 'Influencer-focused. Great results.',
    createdAt: '2023-01-15',
    updatedAt: '2024-12-20',
  },
];

export const projects: Project[] = [
  {
    id: 'PRJ001',
    projectId: 'PJ-2024-001',
    name: 'TechGiant Pro TV Spot - 60s',
    client: 'TechGiant Inc',
    clientId: 'ACLT001',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    type: 'video',
    category: 'TV Commercial',
    status: 'in-production',
    priority: 'high',
    description: 'Hero 60-second TV commercial showcasing TechGiant Pro smartphone features.',
    deliverables: [
      { name: '60s Hero Spot', status: 'in-progress', dueDate: '2024-12-28' },
      { name: '30s Cutdown', status: 'pending', dueDate: '2024-12-30' },
      { name: '15s Cutdown', status: 'pending', dueDate: '2024-12-30' },
      { name: '6s Bumper', status: 'pending', dueDate: '2024-12-30' },
    ],
    budget: 450000,
    spent: 380000,
    startDate: '2024-11-01',
    dueDate: '2024-12-30',
    team: [
      { id: 'EMP002', name: 'James Chen', role: 'Creative Director' },
      { id: 'EMP014', name: 'Amy Wilson', role: 'Art Director' },
      { id: 'EMP015', name: 'Mark Johnson', role: 'Copywriter' },
    ],
    creativeDirector: 'James Chen',
    projectManager: 'Alex Thompson',
    timeline: [
      { phase: 'Brief', startDate: '2024-11-01', endDate: '2024-11-05', status: 'completed' },
      { phase: 'Concept', startDate: '2024-11-06', endDate: '2024-11-15', status: 'completed' },
      { phase: 'Script', startDate: '2024-11-16', endDate: '2024-11-25', status: 'completed' },
      { phase: 'Pre-Production', startDate: '2024-11-26', endDate: '2024-12-10', status: 'completed' },
      { phase: 'Production', startDate: '2024-12-11', endDate: '2024-12-15', status: 'completed' },
      { phase: 'Post-Production', startDate: '2024-12-16', endDate: '2024-12-28', status: 'in-progress' },
      { phase: 'Delivery', startDate: '2024-12-29', endDate: '2024-12-30', status: 'pending' },
    ],
    assets: 15,
    approvals: {
      concept: { status: 'approved', date: '2024-11-15', approvedBy: 'Jennifer Roberts' },
      script: { status: 'approved', date: '2024-11-25', approvedBy: 'Jennifer Roberts' },
      roughCut: { status: 'approved', date: '2024-12-20', approvedBy: 'Jennifer Roberts' },
      finalCut: { status: 'pending', date: null, approvedBy: null },
    },
    notes: 'Shoot completed in LA. Post-production on track.',
    createdAt: '2024-11-01',
    updatedAt: '2024-12-20',
  },
  {
    id: 'PRJ002',
    projectId: 'PJ-2024-002',
    name: 'TechGiant Pro Digital Campaign',
    client: 'TechGiant Inc',
    clientId: 'ACLT001',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    type: 'digital',
    category: 'Digital Advertising',
    status: 'active',
    priority: 'high',
    description: 'Comprehensive digital campaign including display, video, social, and programmatic assets.',
    deliverables: [
      { name: 'Display Banners (15 sizes)', status: 'completed', dueDate: '2024-11-15' },
      { name: 'Social Video (5 versions)', status: 'completed', dueDate: '2024-11-20' },
      { name: 'YouTube Pre-roll', status: 'completed', dueDate: '2024-11-20' },
      { name: 'Rich Media Units', status: 'completed', dueDate: '2024-11-25' },
    ],
    budget: 120000,
    spent: 115000,
    startDate: '2024-10-20',
    dueDate: '2024-11-25',
    team: [
      { id: 'EMP002', name: 'James Chen', role: 'Creative Director' },
      { id: 'EMP017', name: 'Digital Team', role: 'Digital Designers' },
    ],
    creativeDirector: 'James Chen',
    projectManager: 'Alex Thompson',
    assets: 45,
    approvals: {
      concept: { status: 'approved', date: '2024-10-30', approvedBy: 'Jennifer Roberts' },
      design: { status: 'approved', date: '2024-11-10', approvedBy: 'Jennifer Roberts' },
      final: { status: 'approved', date: '2024-11-25', approvedBy: 'Jennifer Roberts' },
    },
    notes: 'All assets live and performing well.',
    createdAt: '2024-10-20',
    updatedAt: '2024-11-25',
  },
  {
    id: 'PRJ003',
    projectId: 'PJ-2024-003',
    name: 'TechGiant Pro OOH Campaign',
    client: 'TechGiant Inc',
    clientId: 'ACLT001',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    type: 'ooh',
    category: 'Out of Home',
    status: 'active',
    priority: 'medium',
    description: 'High-impact OOH campaign including billboards, transit, and digital spectaculars.',
    deliverables: [
      { name: 'Billboard Creative (5 executions)', status: 'completed', dueDate: '2024-11-10' },
      { name: 'Transit Wraps', status: 'completed', dueDate: '2024-11-10' },
      { name: 'Digital Spectacular - Times Square', status: 'completed', dueDate: '2024-11-15' },
    ],
    budget: 80000,
    spent: 75000,
    startDate: '2024-10-15',
    dueDate: '2024-11-15',
    team: [
      { id: 'EMP014', name: 'Amy Wilson', role: 'Art Director' },
    ],
    creativeDirector: 'James Chen',
    projectManager: 'Alex Thompson',
    assets: 18,
    approvals: {
      concept: { status: 'approved', date: '2024-10-25', approvedBy: 'Jennifer Roberts' },
      final: { status: 'approved', date: '2024-11-10', approvedBy: 'Jennifer Roberts' },
    },
    notes: 'Times Square spectacular getting great social attention.',
    createdAt: '2024-10-15',
    updatedAt: '2024-11-15',
  },
  {
    id: 'PRJ004',
    projectId: 'PJ-2024-004',
    name: 'Fashion Forward Holiday TVC',
    client: 'Fashion Forward',
    clientId: 'ACLT002',
    campaignId: 'CMP002',
    campaignName: 'Holiday Season Brand Campaign',
    type: 'video',
    category: 'TV Commercial',
    status: 'completed',
    priority: 'high',
    description: 'Emotional 60-second holiday spot featuring diverse families celebrating together.',
    deliverables: [
      { name: '60s Hero Spot', status: 'completed', dueDate: '2024-11-10' },
      { name: '30s Cutdown', status: 'completed', dueDate: '2024-11-12' },
      { name: '15s Cutdown', status: 'completed', dueDate: '2024-11-12' },
    ],
    budget: 350000,
    spent: 342000,
    startDate: '2024-09-15',
    dueDate: '2024-11-12',
    team: [
      { id: 'EMP006', name: 'David Park', role: 'Creative Director' },
      { id: 'EMP019', name: 'Rachel Green', role: 'Art Director' },
      { id: 'EMP020', name: 'Tom Harris', role: 'Copywriter' },
    ],
    creativeDirector: 'David Park',
    projectManager: 'Jennifer Wilson',
    assets: 12,
    approvals: {
      concept: { status: 'approved', date: '2024-09-25', approvedBy: 'Michelle Kim' },
      script: { status: 'approved', date: '2024-10-05', approvedBy: 'Michelle Kim' },
      final: { status: 'approved', date: '2024-11-12', approvedBy: 'Michelle Kim' },
    },
    notes: 'On air since Nov 15. Strong initial response.',
    createdAt: '2024-09-15',
    updatedAt: '2024-11-15',
  },
  {
    id: 'PRJ005',
    projectId: 'PJ-2024-005',
    name: 'Fashion Forward Social Content',
    client: 'Fashion Forward',
    clientId: 'ACLT002',
    campaignId: 'CMP002',
    campaignName: 'Holiday Season Brand Campaign',
    type: 'social',
    category: 'Social Media',
    status: 'active',
    priority: 'medium',
    description: 'Holiday social content calendar including Instagram, TikTok, and Pinterest assets.',
    deliverables: [
      { name: 'Instagram Posts (30)', status: 'in-progress', dueDate: '2024-12-31' },
      { name: 'Instagram Stories (45)', status: 'in-progress', dueDate: '2024-12-31' },
      { name: 'TikTok Videos (15)', status: 'in-progress', dueDate: '2024-12-31' },
      { name: 'Pinterest Pins (20)', status: 'completed', dueDate: '2024-11-30' },
    ],
    budget: 65000,
    spent: 52000,
    startDate: '2024-10-15',
    dueDate: '2024-12-31',
    team: [
      { id: 'EMP013', name: 'Nicole Wang', role: 'Social Lead' },
    ],
    creativeDirector: 'David Park',
    projectManager: 'Jennifer Wilson',
    assets: 78,
    approvals: {
      contentCalendar: { status: 'approved', date: '2024-10-20', approvedBy: 'Michelle Kim' },
    },
    notes: 'High engagement. TikTok content performing exceptionally.',
    createdAt: '2024-10-15',
    updatedAt: '2024-12-20',
  },
];

export const mediaPlans: MediaPlan[] = [
  {
    id: 'MED001',
    name: 'TechGiant Pro Launch Media Plan',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    client: 'TechGiant Inc',
    clientId: 'ACLT001',
    status: 'active',
    flightDates: {
      start: '2024-11-01',
      end: '2025-01-31',
    },
    totalBudget: 1500000,
    spent: 890000,
    channels: [
      {
        channel: 'TV',
        budget: 600000,
        spent: 380000,
        impressions: 150000000,
        cpm: 4.0,
        placements: ['Prime Time', 'Sports', 'News'],
      },
      {
        channel: 'Digital Display',
        budget: 300000,
        spent: 180000,
        impressions: 120000000,
        cpm: 2.5,
        placements: ['Programmatic', 'Premium Publishers'],
      },
      {
        channel: 'Social',
        budget: 250000,
        spent: 150000,
        impressions: 80000000,
        cpm: 3.13,
        placements: ['Facebook', 'Instagram', 'TikTok'],
      },
      {
        channel: 'OOH',
        budget: 200000,
        spent: 120000,
        impressions: 50000000,
        cpm: 4.0,
        placements: ['Billboards', 'Transit', 'Digital Spectacular'],
      },
      {
        channel: 'Search',
        budget: 150000,
        spent: 60000,
        clicks: 500000,
        cpc: 0.3,
        placements: ['Google', 'Bing'],
      },
    ],
    kpis: {
      totalImpressions: { target: 500000000, actual: 342000000 },
      reach: { target: 75000000, actual: 52000000 },
      frequency: { target: 6.7, actual: 6.6 },
    },
    mediaDirector: 'Maria Garcia',
    notes: 'Pacing slightly ahead of plan. Strong TV performance.',
    createdAt: '2024-10-20',
    updatedAt: '2024-12-20',
  },
  {
    id: 'MED002',
    name: 'Fashion Forward Holiday Media',
    campaignId: 'CMP002',
    campaignName: 'Holiday Season Brand Campaign',
    client: 'Fashion Forward',
    clientId: 'ACLT002',
    status: 'active',
    flightDates: {
      start: '2024-11-15',
      end: '2024-12-31',
    },
    totalBudget: 750000,
    spent: 620000,
    channels: [
      {
        channel: 'TV',
        budget: 350000,
        spent: 290000,
        impressions: 87500000,
        cpm: 4.0,
        placements: ['Prime Time', 'Daytime', 'Cable'],
      },
      {
        channel: 'Digital Video',
        budget: 150000,
        spent: 125000,
        impressions: 50000000,
        cpm: 3.0,
        placements: ['YouTube', 'Connected TV'],
      },
      {
        channel: 'Social',
        budget: 150000,
        spent: 130000,
        impressions: 65000000,
        cpm: 2.31,
        placements: ['Instagram', 'Pinterest', 'TikTok'],
      },
      {
        channel: 'Influencer',
        budget: 100000,
        spent: 75000,
        impressions: 25000000,
        cpm: 4.0,
        placements: ['Micro-Influencers', 'Mid-Tier'],
      },
    ],
    kpis: {
      totalImpressions: { target: 200000000, actual: 178000000 },
      reach: { target: 40000000, actual: 35000000 },
      frequency: { target: 5.0, actual: 5.1 },
    },
    mediaDirector: 'Maria Garcia',
    notes: 'Strong social performance. Reallocating some TV to digital.',
    createdAt: '2024-10-01',
    updatedAt: '2024-12-19',
  },
];

export const creativeAssets: CreativeAsset[] = [
  {
    id: 'AST001',
    name: 'TechGiant Pro Hero Video 60s',
    type: 'video',
    format: 'MP4',
    resolution: '4K',
    duration: 60,
    fileSize: '850 MB',
    projectId: 'PRJ001',
    projectName: 'TechGiant Pro TV Spot - 60s',
    campaignId: 'CMP001',
    client: 'TechGiant Inc',
    status: 'in-review',
    version: 'v3',
    thumbnail: null,
    tags: ['hero', 'tv', 'product-launch'],
    createdBy: 'James Chen',
    createdAt: '2024-12-18',
    updatedAt: '2024-12-20',
    approvals: [
      { reviewer: 'Internal', status: 'approved', date: '2024-12-19' },
      { reviewer: 'Client', status: 'pending', date: null },
    ],
  },
  {
    id: 'AST002',
    name: 'TechGiant Pro Banner 300x250',
    type: 'image',
    format: 'HTML5',
    resolution: '300x250',
    duration: null,
    fileSize: '150 KB',
    projectId: 'PRJ002',
    projectName: 'TechGiant Pro Digital Campaign',
    campaignId: 'CMP001',
    client: 'TechGiant Inc',
    status: 'approved',
    version: 'v2',
    thumbnail: null,
    tags: ['display', 'banner', 'digital'],
    createdBy: 'Digital Team',
    createdAt: '2024-11-10',
    updatedAt: '2024-11-15',
    approvals: [
      { reviewer: 'Internal', status: 'approved', date: '2024-11-12' },
      { reviewer: 'Client', status: 'approved', date: '2024-11-15' },
    ],
  },
  {
    id: 'AST003',
    name: 'Fashion Forward Holiday TVC 60s',
    type: 'video',
    format: 'MP4',
    resolution: '4K',
    duration: 60,
    fileSize: '920 MB',
    projectId: 'PRJ004',
    projectName: 'Fashion Forward Holiday TVC',
    campaignId: 'CMP002',
    client: 'Fashion Forward',
    status: 'approved',
    version: 'Final',
    thumbnail: null,
    tags: ['hero', 'tv', 'holiday'],
    createdBy: 'David Park',
    createdAt: '2024-11-08',
    updatedAt: '2024-11-12',
    approvals: [
      { reviewer: 'Internal', status: 'approved', date: '2024-11-10' },
      { reviewer: 'Client', status: 'approved', date: '2024-11-12' },
    ],
  },
  {
    id: 'AST004',
    name: 'BeautyGlow Instagram Post - Skincare Routine',
    type: 'image',
    format: 'JPG',
    resolution: '1080x1080',
    duration: null,
    fileSize: '2.4 MB',
    projectId: 'PRJ010',
    projectName: 'BeautyGlow Influencer Content',
    campaignId: 'CMP005',
    client: 'BeautyGlow',
    status: 'approved',
    version: 'v1',
    thumbnail: null,
    tags: ['social', 'instagram', 'skincare'],
    createdBy: 'Nicole Wang',
    createdAt: '2024-12-15',
    updatedAt: '2024-12-16',
    approvals: [
      { reviewer: 'Internal', status: 'approved', date: '2024-12-15' },
      { reviewer: 'Client', status: 'approved', date: '2024-12-16' },
    ],
  },
  {
    id: 'AST005',
    name: 'TechGiant Pro Times Square Spectacular',
    type: 'video',
    format: 'MP4',
    resolution: 'Custom',
    duration: 15,
    fileSize: '450 MB',
    projectId: 'PRJ003',
    projectName: 'TechGiant Pro OOH Campaign',
    campaignId: 'CMP001',
    client: 'TechGiant Inc',
    status: 'live',
    version: 'Final',
    thumbnail: null,
    tags: ['ooh', 'spectacular', 'digital'],
    createdBy: 'Amy Wilson',
    createdAt: '2024-11-12',
    updatedAt: '2024-11-15',
    approvals: [
      { reviewer: 'Internal', status: 'approved', date: '2024-11-13' },
      { reviewer: 'Client', status: 'approved', date: '2024-11-14' },
    ],
  },
];

export const talent: Talent[] = [
  {
    id: 'TLT001',
    name: 'Emma Roberts',
    type: 'influencer',
    category: 'Beauty',
    tier: 'mega',
    platforms: [
      { platform: 'Instagram', handle: '@emmaroberts', followers: 2500000, engagement: 3.2 },
      { platform: 'TikTok', handle: '@emmaroberts', followers: 1800000, engagement: 5.8 },
      { platform: 'YouTube', handle: 'Emma Roberts Beauty', followers: 950000, engagement: 4.1 },
    ],
    totalFollowers: 5250000,
    avgEngagement: 4.4,
    demographics: {
      age: '18-34',
      gender: '85% Female',
      location: 'USA 70%, UK 15%, Other 15%',
    },
    categories: ['Beauty', 'Skincare', 'Lifestyle'],
    rate: {
      instagramPost: 15000,
      instagramStory: 5000,
      tiktokVideo: 12000,
      youtubeVideo: 25000,
    },
    pastCollaborations: ['BeautyGlow', 'Fashion Forward'],
    currentContracts: [{ client: 'BeautyGlow', campaign: 'CMP005', status: 'active' }],
    contact: {
      email: 'management@emmaroberts.com',
      agency: 'Talent Agency Inc',
      agentName: 'Sarah Wilson',
    },
    rating: 5,
    notes: 'Top performer for BeautyGlow. Authentic content style.',
    status: 'active',
    createdAt: '2023-06-15',
  },
  {
    id: 'TLT002',
    name: 'Jason Lee',
    type: 'influencer',
    category: 'Tech',
    tier: 'macro',
    platforms: [
      { platform: 'YouTube', handle: 'Tech with Jason', followers: 850000, engagement: 6.2 },
      { platform: 'Instagram', handle: '@techwjason', followers: 320000, engagement: 4.5 },
      { platform: 'Twitter', handle: '@techwjason', followers: 180000, engagement: 2.8 },
    ],
    totalFollowers: 1350000,
    avgEngagement: 4.5,
    demographics: {
      age: '25-44',
      gender: '75% Male',
      location: 'USA 60%, Canada 15%, Other 25%',
    },
    categories: ['Technology', 'Gadgets', 'Reviews'],
    rate: {
      instagramPost: 5000,
      instagramStory: 2000,
      youtubeVideo: 18000,
      youtubeShort: 8000,
    },
    pastCollaborations: ['TechGiant Inc'],
    currentContracts: [{ client: 'TechGiant Inc', campaign: 'CMP001', status: 'active' }],
    contact: {
      email: 'jason@techwjason.com',
      agency: null,
      agentName: null,
    },
    rating: 4,
    notes: 'Detailed tech reviews. Strong audience trust.',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: 'TLT003',
    name: 'Sophia Chen',
    type: 'influencer',
    category: 'Fashion',
    tier: 'mid',
    platforms: [
      { platform: 'Instagram', handle: '@sophiastyle', followers: 180000, engagement: 5.8 },
      { platform: 'TikTok', handle: '@sophiastyle', followers: 220000, engagement: 7.2 },
      { platform: 'Pinterest', handle: 'Sophia Style', followers: 95000, engagement: 3.5 },
    ],
    totalFollowers: 495000,
    avgEngagement: 5.5,
    demographics: {
      age: '18-28',
      gender: '90% Female',
      location: 'USA 55%, UK 20%, Australia 10%, Other 15%',
    },
    categories: ['Fashion', 'Lifestyle', 'Travel'],
    rate: {
      instagramPost: 2500,
      instagramStory: 800,
      tiktokVideo: 3000,
    },
    pastCollaborations: ['Fashion Forward'],
    currentContracts: [{ client: 'Fashion Forward', campaign: 'CMP002', status: 'active' }],
    contact: {
      email: 'sophia@sophiastyle.com',
      agency: 'Influencer Co',
      agentName: 'Mike Johnson',
    },
    rating: 5,
    notes: 'Rising star. Great aesthetic match for fashion brands.',
    status: 'active',
    createdAt: '2024-05-10',
  },
  {
    id: 'TLT004',
    name: 'Marcus Thompson',
    type: 'celebrity',
    category: 'Sports',
    tier: 'celebrity',
    platforms: [
      { platform: 'Instagram', handle: '@marcusthompson', followers: 8500000, engagement: 2.1 },
      { platform: 'Twitter', handle: '@marcust', followers: 3200000, engagement: 1.5 },
    ],
    totalFollowers: 11700000,
    avgEngagement: 1.8,
    demographics: {
      age: '18-45',
      gender: '65% Male',
      location: 'USA 80%, Other 20%',
    },
    categories: ['Sports', 'Fitness', 'Lifestyle'],
    rate: {
      instagramPost: 75000,
      appearance: 150000,
      endorsement: 'Negotiable',
    },
    pastCollaborations: [],
    currentContracts: [],
    contact: {
      email: 'inquiries@marcusthompson.com',
      agency: 'CAA Sports',
      agentName: 'Robert Williams',
    },
    rating: null,
    notes: 'Professional athlete. High-profile endorsement opportunity.',
    status: 'prospect',
    createdAt: '2024-12-01',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'INV-2024-001',
    clientId: 'ACLT001',
    clientName: 'TechGiant Inc',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    type: 'retainer',
    status: 'paid',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    paidDate: '2024-12-15',
    subtotal: 150000,
    tax: 0,
    total: 150000,
    lineItems: [
      { description: 'Monthly Retainer - December 2024', quantity: 1, rate: 150000, amount: 150000 },
    ],
    notes: 'December retainer payment',
    paymentMethod: 'Wire Transfer',
    createdAt: '2024-12-01',
  },
  {
    id: 'INV002',
    invoiceNumber: 'INV-2024-002',
    clientId: 'ACLT001',
    clientName: 'TechGiant Inc',
    campaignId: 'CMP001',
    campaignName: 'Summer Product Launch 2024',
    type: 'project',
    status: 'pending',
    issueDate: '2024-12-15',
    dueDate: '2025-01-15',
    paidDate: null,
    subtotal: 450000,
    tax: 0,
    total: 450000,
    lineItems: [
      { description: 'TV Commercial Production - 60s Hero Spot', quantity: 1, rate: 350000, amount: 350000 },
      { description: 'Post-Production & Editing', quantity: 1, rate: 75000, amount: 75000 },
      { description: 'Music Licensing', quantity: 1, rate: 25000, amount: 25000 },
    ],
    notes: 'Production costs for TechGiant Pro TV spot',
    paymentMethod: null,
    createdAt: '2024-12-15',
  },
  {
    id: 'INV003',
    invoiceNumber: 'INV-2024-003',
    clientId: 'ACLT002',
    clientName: 'Fashion Forward',
    campaignId: 'CMP002',
    campaignName: 'Holiday Season Brand Campaign',
    type: 'project',
    status: 'paid',
    issueDate: '2024-11-15',
    dueDate: '2024-12-30',
    paidDate: '2024-12-10',
    subtotal: 415000,
    tax: 0,
    total: 415000,
    lineItems: [
      { description: 'Holiday TV Commercial Production', quantity: 1, rate: 300000, amount: 300000 },
      { description: 'Digital Asset Production', quantity: 1, rate: 65000, amount: 65000 },
      { description: 'Social Content Package', quantity: 1, rate: 50000, amount: 50000 },
    ],
    notes: 'Holiday campaign creative production',
    paymentMethod: 'Check',
    createdAt: '2024-11-15',
  },
  {
    id: 'INV004',
    invoiceNumber: 'INV-2024-004',
    clientId: 'ACLT005',
    clientName: 'BeautyGlow',
    campaignId: 'CMP005',
    campaignName: 'Influencer Partnership Program',
    type: 'retainer',
    status: 'overdue',
    issueDate: '2024-11-01',
    dueDate: '2024-11-30',
    paidDate: null,
    subtotal: 75000,
    tax: 0,
    total: 75000,
    lineItems: [
      { description: 'Monthly Retainer - November 2024', quantity: 1, rate: 75000, amount: 75000 },
    ],
    notes: 'November retainer - OVERDUE',
    paymentMethod: null,
    createdAt: '2024-11-01',
  },
  {
    id: 'INV005',
    invoiceNumber: 'INV-2024-005',
    clientId: 'ACLT004',
    clientName: 'Legacy Financial',
    campaignId: 'CMP004',
    campaignName: 'Corporate Rebrand Campaign',
    type: 'project',
    status: 'paid',
    issueDate: '2024-11-01',
    dueDate: '2024-11-30',
    paidDate: '2024-11-25',
    subtotal: 1200000,
    tax: 0,
    total: 1200000,
    lineItems: [
      { description: 'Brand Strategy & Identity Development', quantity: 1, rate: 400000, amount: 400000 },
      { description: 'TV Campaign Production (3 spots)', quantity: 1, rate: 550000, amount: 550000 },
      { description: 'Digital & Print Asset Production', quantity: 1, rate: 250000, amount: 250000 },
    ],
    notes: 'Final production invoice for rebrand campaign',
    paymentMethod: 'Wire Transfer',
    createdAt: '2024-11-01',
  },
];

export const agencyStats = {
  activeCampaigns: 4,
  activeProjects: 8,
  activeClients: 5,
  totalRevenue: {
    ytd: 12500000,
    thisMonth: 1250000,
    lastMonth: 1180000,
  },
  pendingInvoices: 525000,
  overdueInvoices: 75000,
  teamUtilization: 78,
  projectsOnTrack: 85,
  clientSatisfaction: 4.6,
  mediaSpend: {
    managed: 8500000,
    thisMonth: 890000,
  },
};

// Helper Functions
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
};

export const getCampaignStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'planning':
      return 'bg-indigo-500/20 text-indigo-400';
    case 'paused':
      return 'bg-amber-500/20 text-amber-400';
    case 'completed':
      return 'bg-purple-500/20 text-purple-400';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export const getProjectStatusColor = (status: string): string => {
  switch (status) {
    case 'briefing':
      return 'bg-sky-500/20 text-sky-400';
    case 'concept':
      return 'bg-indigo-500/20 text-indigo-400';
    case 'in-production':
      return 'bg-amber-500/20 text-amber-400';
    case 'review':
      return 'bg-purple-500/20 text-purple-400';
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'completed':
      return 'bg-slate-500/20 text-slate-400';
    case 'on-hold':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export const getClientTierColor = (tier: string): string => {
  switch (tier) {
    case 'platinum':
      return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
    case 'gold':
      return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white';
    case 'silver':
      return 'bg-gradient-to-r from-slate-400 to-slate-500 text-white';
    case 'bronze':
      return 'bg-gradient-to-r from-orange-600 to-orange-700 text-white';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export const getInvoiceStatusColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'pending':
      return 'bg-amber-500/20 text-amber-400';
    case 'overdue':
      return 'bg-red-500/20 text-red-400';
    case 'draft':
      return 'bg-slate-500/20 text-slate-400';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export const getTalentTierColor = (tier: string): string => {
  const tierData = talentTiers.find((t) => t.id === tier);
  return tierData ? `bg-[${tierData.color}]/20 text-[${tierData.color}]` : 'bg-slate-500/20 text-slate-400';
};

export const getAssetStatusColor = (status: string): string => {
  switch (status) {
    case 'draft':
      return 'bg-slate-500/20 text-slate-400';
    case 'in-review':
      return 'bg-amber-500/20 text-amber-400';
    case 'approved':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'live':
      return 'bg-indigo-500/20 text-indigo-400';
    case 'archived':
      return 'bg-slate-500/20 text-slate-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};
