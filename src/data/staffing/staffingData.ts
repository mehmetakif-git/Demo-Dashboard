import {
  Users,
  Briefcase,
  CheckCircle,
  Building2,
  Clock,
  DollarSign,
  FileCheck,
  UserPlus,
  Calendar,
} from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'available' | 'interviewing' | 'placed' | 'inactive' | 'onboarding';
  skills: string[];
  experience: number; // years
  currentTitle: string;
  desiredSalary: { min: number; max: number };
  location: string;
  willingToRelocate: boolean;
  availability: 'immediate' | '2-weeks' | '1-month' | 'negotiable';
  resume?: string;
  notes: string;
  source: 'job-board' | 'referral' | 'linkedin' | 'direct' | 'agency';
  createdAt: string;
  updatedAt: string;
  appliedJobs: string[];
  interviewHistory: InterviewHistory[];
  documents: CandidateDocument[];
}

export interface InterviewHistory {
  jobOrderId: string;
  date: string;
  type: 'phone' | 'video' | 'in-person' | 'technical';
  interviewer: string;
  feedback: string;
  rating: number;
  outcome: 'passed' | 'failed' | 'pending';
}

export interface CandidateDocument {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'certificate' | 'reference' | 'other';
  uploadedAt: string;
  url: string;
}

export interface JobOrder {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  department: string;
  description: string;
  requirements: string[];
  skills: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'temp-to-hire';
  salaryRange: { min: number; max: number };
  location: string;
  remote: 'onsite' | 'hybrid' | 'remote';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'filled' | 'on-hold' | 'cancelled';
  openings: number;
  filled: number;
  applicants: number;
  submissions: number;
  interviews: number;
  createdAt: string;
  deadline?: string;
  assignedRecruiter: string;
  notes: string;
}

export interface Placement {
  id: string;
  candidateId: string;
  candidateName: string;
  jobOrderId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  type: 'permanent' | 'contract' | 'temp-to-hire';
  status: 'active' | 'completed' | 'terminated' | 'extended';
  billRate: number;
  payRate: number;
  margin: number;
  recruiter: string;
  notes: string;
}

export interface Client {
  id: string;
  companyName: string;
  industry: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  billingContact?: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status: 'active' | 'inactive' | 'prospect';
  totalPlacements: number;
  activePositions: number;
  totalRevenue: number;
  paymentTerms: number; // days
  contractStart: string;
  contractEnd?: string;
  notes: string;
  tags: string[];
}

export interface Timesheet {
  id: string;
  candidateId: string;
  candidateName: string;
  placementId: string;
  clientId: string;
  clientName: string;
  weekEnding: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'processed';
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  billRate: number;
  payRate: number;
  totalBillable: number;
  totalPayable: number;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  notes: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobOrderId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  scheduledAt: string;
  duration: number; // minutes
  type: 'phone' | 'video' | 'in-person' | 'technical' | 'panel';
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  feedback?: string;
  rating?: number;
  outcome?: 'passed' | 'failed' | 'pending';
  notes: string;
}

export interface ComplianceDocument {
  id: string;
  candidateId: string;
  candidateName: string;
  type: 'background-check' | 'drug-test' | 'i9' | 'w4' | 'direct-deposit' | 'nda' | 'contract' | 'certification';
  status: 'pending' | 'in-progress' | 'completed' | 'expired' | 'failed';
  requiredBy?: string;
  completedAt?: string;
  expiresAt?: string;
  documentUrl?: string;
  notes: string;
}

export interface OnboardingTask {
  id: string;
  candidateId: string;
  candidateName: string;
  placementId: string;
  clientName: string;
  taskName: string;
  category: 'documentation' | 'training' | 'equipment' | 'access' | 'orientation';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate: string;
  completedAt?: string;
  assignedTo: string;
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

export interface StaffingStats {
  totalCandidates: number;
  activeCandidates: number;
  totalJobOrders: number;
  openJobOrders: number;
  totalPlacements: number;
  activePlacements: number;
  totalClients: number;
  activeClients: number;
  monthlyRevenue: number;
  monthlyPlacements: number;
  avgTimeToFill: number;
  fillRate: number;
}

// ============================================
// MOCK DATA
// ============================================

export const candidates: Candidate[] = [
  {
    id: 'cand-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    status: 'available',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
    experience: 5,
    currentTitle: 'Senior Frontend Developer',
    desiredSalary: { min: 120000, max: 150000 },
    location: 'San Francisco, CA',
    willingToRelocate: true,
    availability: 'immediate',
    notes: 'Strong React experience, looking for senior roles',
    source: 'linkedin',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-01',
    appliedJobs: ['job-001', 'job-003'],
    interviewHistory: [
      {
        jobOrderId: 'job-001',
        date: '2024-02-20',
        type: 'video',
        interviewer: 'Sarah Johnson',
        feedback: 'Strong technical skills, good communication',
        rating: 4,
        outcome: 'passed',
      },
    ],
    documents: [
      {
        id: 'doc-001',
        name: 'Resume_JohnSmith.pdf',
        type: 'resume',
        uploadedAt: '2024-01-15',
        url: '/documents/resume-001.pdf',
      },
    ],
  },
  {
    id: 'cand-002',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@email.com',
    phone: '(555) 234-5678',
    status: 'interviewing',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
    experience: 7,
    currentTitle: 'Backend Engineer',
    desiredSalary: { min: 140000, max: 170000 },
    location: 'Seattle, WA',
    willingToRelocate: false,
    availability: '2-weeks',
    notes: 'Currently interviewing with TechCorp',
    source: 'referral',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-05',
    appliedJobs: ['job-002'],
    interviewHistory: [],
    documents: [
      {
        id: 'doc-002',
        name: 'Resume_EmilyChen.pdf',
        type: 'resume',
        uploadedAt: '2024-02-01',
        url: '/documents/resume-002.pdf',
      },
    ],
  },
  {
    id: 'cand-003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@email.com',
    phone: '(555) 345-6789',
    status: 'placed',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'SQL'],
    experience: 10,
    currentTitle: 'Staff Software Engineer',
    desiredSalary: { min: 180000, max: 220000 },
    location: 'Austin, TX',
    willingToRelocate: true,
    availability: '1-month',
    notes: 'Placed at DataFlow Inc.',
    source: 'job-board',
    createdAt: '2023-11-15',
    updatedAt: '2024-01-20',
    appliedJobs: ['job-004'],
    interviewHistory: [
      {
        jobOrderId: 'job-004',
        date: '2023-12-10',
        type: 'in-person',
        interviewer: 'Mark Wilson',
        feedback: 'Excellent candidate, strong leadership skills',
        rating: 5,
        outcome: 'passed',
      },
    ],
    documents: [],
  },
  {
    id: 'cand-004',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@email.com',
    phone: '(555) 456-7890',
    status: 'available',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'CSS', 'HTML'],
    experience: 4,
    currentTitle: 'Senior UX Designer',
    desiredSalary: { min: 100000, max: 130000 },
    location: 'New York, NY',
    willingToRelocate: false,
    availability: 'immediate',
    notes: 'Portfolio available, strong design background',
    source: 'direct',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-01',
    appliedJobs: [],
    interviewHistory: [],
    documents: [],
  },
  {
    id: 'cand-005',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.b@email.com',
    phone: '(555) 567-8901',
    status: 'onboarding',
    skills: ['DevOps', 'Terraform', 'AWS', 'GCP', 'CI/CD'],
    experience: 6,
    currentTitle: 'DevOps Engineer',
    desiredSalary: { min: 130000, max: 160000 },
    location: 'Denver, CO',
    willingToRelocate: true,
    availability: 'negotiable',
    notes: 'Starting at CloudTech next week',
    source: 'agency',
    createdAt: '2024-01-10',
    updatedAt: '2024-03-08',
    appliedJobs: ['job-005'],
    interviewHistory: [],
    documents: [],
  },
  {
    id: 'cand-006',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.m@email.com',
    phone: '(555) 678-9012',
    status: 'available',
    skills: ['Data Science', 'Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    experience: 3,
    currentTitle: 'Data Scientist',
    desiredSalary: { min: 110000, max: 140000 },
    location: 'Boston, MA',
    willingToRelocate: true,
    availability: '2-weeks',
    notes: 'Strong ML background, PhD in Computer Science',
    source: 'linkedin',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10',
    appliedJobs: ['job-006'],
    interviewHistory: [],
    documents: [],
  },
  {
    id: 'cand-007',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.t@email.com',
    phone: '(555) 789-0123',
    status: 'inactive',
    skills: ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Confluence'],
    experience: 8,
    currentTitle: 'Senior Project Manager',
    desiredSalary: { min: 120000, max: 150000 },
    location: 'Chicago, IL',
    willingToRelocate: false,
    availability: '1-month',
    notes: 'Not currently looking, check back in 6 months',
    source: 'referral',
    createdAt: '2023-09-15',
    updatedAt: '2024-01-05',
    appliedJobs: [],
    interviewHistory: [],
    documents: [],
  },
  {
    id: 'cand-008',
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.g@email.com',
    phone: '(555) 890-1234',
    status: 'interviewing',
    skills: ['iOS Development', 'Swift', 'Objective-C', 'Xcode', 'SwiftUI'],
    experience: 5,
    currentTitle: 'iOS Developer',
    desiredSalary: { min: 125000, max: 155000 },
    location: 'Los Angeles, CA',
    willingToRelocate: false,
    availability: 'immediate',
    notes: 'Final round with MobileFirst Inc.',
    source: 'job-board',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-12',
    appliedJobs: ['job-007'],
    interviewHistory: [
      {
        jobOrderId: 'job-007',
        date: '2024-03-05',
        type: 'technical',
        interviewer: 'Chris Lee',
        feedback: 'Strong Swift skills, good problem solving',
        rating: 4,
        outcome: 'passed',
      },
    ],
    documents: [],
  },
];

export const jobOrders: JobOrder[] = [
  {
    id: 'job-001',
    title: 'Senior React Developer',
    clientId: 'client-001',
    clientName: 'TechCorp Solutions',
    department: 'Engineering',
    description: 'Looking for an experienced React developer to join our frontend team.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership experience'],
    skills: ['React', 'TypeScript', 'Redux', 'GraphQL'],
    employmentType: 'full-time',
    salaryRange: { min: 130000, max: 160000 },
    location: 'San Francisco, CA',
    remote: 'hybrid',
    urgency: 'high',
    status: 'open',
    openings: 2,
    filled: 0,
    applicants: 15,
    submissions: 5,
    interviews: 3,
    createdAt: '2024-02-01',
    deadline: '2024-04-01',
    assignedRecruiter: 'Sarah Johnson',
    notes: 'Client prefers candidates with fintech experience',
  },
  {
    id: 'job-002',
    title: 'Backend Python Engineer',
    clientId: 'client-002',
    clientName: 'DataFlow Inc.',
    department: 'Platform',
    description: 'Building scalable backend services for our data platform.',
    requirements: ['7+ years Python experience', 'Experience with distributed systems', 'Strong SQL skills'],
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Kubernetes'],
    employmentType: 'full-time',
    salaryRange: { min: 150000, max: 180000 },
    location: 'Seattle, WA',
    remote: 'remote',
    urgency: 'critical',
    status: 'open',
    openings: 3,
    filled: 1,
    applicants: 22,
    submissions: 8,
    interviews: 6,
    createdAt: '2024-01-15',
    deadline: '2024-03-15',
    assignedRecruiter: 'Mike Chen',
    notes: 'Urgent hire, team is understaffed',
  },
  {
    id: 'job-003',
    title: 'Full Stack Developer',
    clientId: 'client-003',
    clientName: 'StartupXYZ',
    department: 'Product',
    description: 'Join our small but mighty team building the next big thing.',
    requirements: ['3+ years full stack experience', 'Startup experience preferred', 'Self-motivated'],
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    employmentType: 'full-time',
    salaryRange: { min: 100000, max: 130000 },
    location: 'Austin, TX',
    remote: 'onsite',
    urgency: 'medium',
    status: 'open',
    openings: 1,
    filled: 0,
    applicants: 8,
    submissions: 3,
    interviews: 2,
    createdAt: '2024-02-20',
    assignedRecruiter: 'Sarah Johnson',
    notes: 'Equity compensation available',
  },
  {
    id: 'job-004',
    title: 'Staff Software Engineer',
    clientId: 'client-002',
    clientName: 'DataFlow Inc.',
    department: 'Core Engineering',
    description: 'Technical leadership role for our core platform team.',
    requirements: ['10+ years experience', 'Architecture experience', 'Mentorship skills'],
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    employmentType: 'full-time',
    salaryRange: { min: 200000, max: 250000 },
    location: 'Austin, TX',
    remote: 'hybrid',
    urgency: 'low',
    status: 'filled',
    openings: 1,
    filled: 1,
    applicants: 12,
    submissions: 4,
    interviews: 3,
    createdAt: '2023-11-01',
    assignedRecruiter: 'Mike Chen',
    notes: 'Position filled by Michael Johnson',
  },
  {
    id: 'job-005',
    title: 'DevOps Engineer',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    department: 'Infrastructure',
    description: 'Managing cloud infrastructure and CI/CD pipelines.',
    requirements: ['5+ years DevOps experience', 'AWS/GCP certification', 'Terraform expertise'],
    skills: ['Terraform', 'AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    employmentType: 'contract',
    salaryRange: { min: 80, max: 100 }, // hourly for contract
    location: 'Denver, CO',
    remote: 'remote',
    urgency: 'high',
    status: 'filled',
    openings: 1,
    filled: 1,
    applicants: 18,
    submissions: 6,
    interviews: 4,
    createdAt: '2024-01-20',
    assignedRecruiter: 'Lisa Park',
    notes: '6-month contract with extension possibility',
  },
  {
    id: 'job-006',
    title: 'Data Scientist',
    clientId: 'client-005',
    clientName: 'AI Innovations',
    department: 'Data Science',
    description: 'Building ML models for predictive analytics.',
    requirements: ['Masters or PhD preferred', '3+ years ML experience', 'Publication history a plus'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Statistics'],
    employmentType: 'full-time',
    salaryRange: { min: 130000, max: 160000 },
    location: 'Boston, MA',
    remote: 'hybrid',
    urgency: 'medium',
    status: 'open',
    openings: 2,
    filled: 0,
    applicants: 25,
    submissions: 10,
    interviews: 5,
    createdAt: '2024-02-28',
    deadline: '2024-04-30',
    assignedRecruiter: 'Sarah Johnson',
    notes: 'Strong preference for NLP experience',
  },
  {
    id: 'job-007',
    title: 'iOS Developer',
    clientId: 'client-006',
    clientName: 'MobileFirst Inc.',
    department: 'Mobile',
    description: 'Building next-generation iOS applications.',
    requirements: ['5+ years iOS experience', 'SwiftUI knowledge', 'App Store experience'],
    skills: ['Swift', 'SwiftUI', 'Objective-C', 'Core Data', 'Xcode'],
    employmentType: 'full-time',
    salaryRange: { min: 140000, max: 170000 },
    location: 'Los Angeles, CA',
    remote: 'onsite',
    urgency: 'high',
    status: 'open',
    openings: 1,
    filled: 0,
    applicants: 10,
    submissions: 4,
    interviews: 2,
    createdAt: '2024-02-15',
    deadline: '2024-03-31',
    assignedRecruiter: 'Mike Chen',
    notes: 'Looking to close quickly',
  },
  {
    id: 'job-008',
    title: 'QA Engineer',
    clientId: 'client-001',
    clientName: 'TechCorp Solutions',
    department: 'Quality',
    description: 'Ensuring quality across our product suite.',
    requirements: ['3+ years QA experience', 'Automation experience', 'SDET background preferred'],
    skills: ['Selenium', 'Cypress', 'JavaScript', 'API Testing', 'JIRA'],
    employmentType: 'temp-to-hire',
    salaryRange: { min: 90000, max: 110000 },
    location: 'San Francisco, CA',
    remote: 'hybrid',
    urgency: 'low',
    status: 'on-hold',
    openings: 1,
    filled: 0,
    applicants: 6,
    submissions: 2,
    interviews: 1,
    createdAt: '2024-03-01',
    assignedRecruiter: 'Lisa Park',
    notes: 'On hold pending budget approval',
  },
];

export const placements: Placement[] = [
  {
    id: 'place-001',
    candidateId: 'cand-003',
    candidateName: 'Michael Johnson',
    jobOrderId: 'job-004',
    jobTitle: 'Staff Software Engineer',
    clientId: 'client-002',
    clientName: 'DataFlow Inc.',
    startDate: '2024-01-15',
    type: 'permanent',
    status: 'active',
    billRate: 0, // permanent placement fee
    payRate: 200000,
    margin: 40000, // placement fee
    recruiter: 'Mike Chen',
    notes: 'Successful placement, client very satisfied',
  },
  {
    id: 'place-002',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    jobOrderId: 'job-005',
    jobTitle: 'DevOps Engineer',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    startDate: '2024-03-15',
    endDate: '2024-09-15',
    type: 'contract',
    status: 'active',
    billRate: 95,
    payRate: 75,
    margin: 20,
    recruiter: 'Lisa Park',
    notes: '6-month contract, W2',
  },
  {
    id: 'place-003',
    candidateId: 'cand-009',
    candidateName: 'James Wilson',
    jobOrderId: 'job-009',
    jobTitle: 'Project Manager',
    clientId: 'client-001',
    clientName: 'TechCorp Solutions',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    type: 'contract',
    status: 'completed',
    billRate: 85,
    payRate: 65,
    margin: 20,
    recruiter: 'Sarah Johnson',
    notes: 'Contract ended, not extended',
  },
  {
    id: 'place-004',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    jobOrderId: 'job-010',
    jobTitle: 'UX Designer',
    clientId: 'client-003',
    clientName: 'StartupXYZ',
    startDate: '2024-02-01',
    type: 'temp-to-hire',
    status: 'active',
    billRate: 75,
    payRate: 55,
    margin: 20,
    recruiter: 'Sarah Johnson',
    notes: 'Converting to permanent in April',
  },
  {
    id: 'place-005',
    candidateId: 'cand-011',
    candidateName: 'Kevin Thomas',
    jobOrderId: 'job-011',
    jobTitle: 'System Administrator',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    startDate: '2023-08-15',
    endDate: '2024-02-15',
    type: 'contract',
    status: 'extended',
    billRate: 70,
    payRate: 52,
    margin: 18,
    recruiter: 'Mike Chen',
    notes: 'Extended for additional 6 months',
  },
];

export const clients: Client[] = [
  {
    id: 'client-001',
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    tier: 'platinum',
    primaryContact: {
      name: 'Robert Martinez',
      title: 'VP of Engineering',
      email: 'rmartinez@techcorp.com',
      phone: '(555) 111-2222',
    },
    billingContact: {
      name: 'Janet Adams',
      email: 'jadams@techcorp.com',
      phone: '(555) 111-2223',
    },
    address: {
      street: '100 Tech Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
    },
    status: 'active',
    totalPlacements: 45,
    activePositions: 3,
    totalRevenue: 1250000,
    paymentTerms: 30,
    contractStart: '2021-01-15',
    notes: 'Long-term strategic partner, preferred vendor status',
    tags: ['enterprise', 'tech', 'fintech'],
  },
  {
    id: 'client-002',
    companyName: 'DataFlow Inc.',
    industry: 'Data Analytics',
    tier: 'gold',
    primaryContact: {
      name: 'Susan Lee',
      title: 'Director of Talent',
      email: 'slee@dataflow.com',
      phone: '(555) 222-3333',
    },
    address: {
      street: '250 Data Center Blvd',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
    status: 'active',
    totalPlacements: 28,
    activePositions: 4,
    totalRevenue: 890000,
    paymentTerms: 30,
    contractStart: '2022-03-01',
    notes: 'Growing rapidly, multiple open positions',
    tags: ['growth', 'data', 'cloud'],
  },
  {
    id: 'client-003',
    companyName: 'StartupXYZ',
    industry: 'Consumer Tech',
    tier: 'silver',
    primaryContact: {
      name: 'Alex Thompson',
      title: 'CEO',
      email: 'alex@startupxyz.com',
      phone: '(555) 333-4444',
    },
    address: {
      street: '50 Innovation Way',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    status: 'active',
    totalPlacements: 8,
    activePositions: 2,
    totalRevenue: 180000,
    paymentTerms: 45,
    contractStart: '2023-06-01',
    notes: 'Series A funded, building out team',
    tags: ['startup', 'mobile', 'consumer'],
  },
  {
    id: 'client-004',
    companyName: 'CloudTech Systems',
    industry: 'Cloud Infrastructure',
    tier: 'gold',
    primaryContact: {
      name: 'Maria Santos',
      title: 'Head of HR',
      email: 'msantos@cloudtech.com',
      phone: '(555) 444-5555',
    },
    address: {
      street: '500 Cloud Avenue',
      city: 'Denver',
      state: 'CO',
      zip: '80202',
    },
    status: 'active',
    totalPlacements: 22,
    activePositions: 2,
    totalRevenue: 650000,
    paymentTerms: 30,
    contractStart: '2022-09-01',
    notes: 'Primarily contract positions',
    tags: ['cloud', 'infrastructure', 'devops'],
  },
  {
    id: 'client-005',
    companyName: 'AI Innovations',
    industry: 'Artificial Intelligence',
    tier: 'silver',
    primaryContact: {
      name: 'Dr. James Park',
      title: 'CTO',
      email: 'jpark@aiinnovations.com',
      phone: '(555) 555-6666',
    },
    address: {
      street: '75 Research Park Drive',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
    },
    status: 'active',
    totalPlacements: 12,
    activePositions: 2,
    totalRevenue: 420000,
    paymentTerms: 30,
    contractStart: '2023-02-01',
    notes: 'Highly specialized roles, PhD preferred',
    tags: ['AI', 'ML', 'research'],
  },
  {
    id: 'client-006',
    companyName: 'MobileFirst Inc.',
    industry: 'Mobile Development',
    tier: 'bronze',
    primaryContact: {
      name: 'Chris Williams',
      title: 'Engineering Manager',
      email: 'cwilliams@mobilefirst.com',
      phone: '(555) 666-7777',
    },
    address: {
      street: '200 App Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
    },
    status: 'active',
    totalPlacements: 5,
    activePositions: 1,
    totalRevenue: 125000,
    paymentTerms: 45,
    contractStart: '2023-09-01',
    notes: 'New client, building relationship',
    tags: ['mobile', 'ios', 'android'],
  },
  {
    id: 'client-007',
    companyName: 'LegacySoft Corp',
    industry: 'Enterprise Software',
    tier: 'bronze',
    primaryContact: {
      name: 'Thomas Brown',
      title: 'IT Director',
      email: 'tbrown@legacysoft.com',
      phone: '(555) 777-8888',
    },
    address: {
      street: '1000 Corporate Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
    },
    status: 'inactive',
    totalPlacements: 3,
    activePositions: 0,
    totalRevenue: 75000,
    paymentTerms: 60,
    contractStart: '2023-01-01',
    contractEnd: '2024-01-01',
    notes: 'Contract not renewed, slow payment history',
    tags: ['enterprise', 'legacy'],
  },
];

export const timesheets: Timesheet[] = [
  {
    id: 'ts-001',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    weekEnding: '2024-03-22',
    status: 'submitted',
    regularHours: 40,
    overtimeHours: 5,
    totalHours: 45,
    billRate: 95,
    payRate: 75,
    totalBillable: 4512.50,
    totalPayable: 3562.50,
    submittedAt: '2024-03-22',
    notes: 'Infrastructure migration project',
  },
  {
    id: 'ts-002',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    weekEnding: '2024-03-15',
    status: 'approved',
    regularHours: 40,
    overtimeHours: 0,
    totalHours: 40,
    billRate: 95,
    payRate: 75,
    totalBillable: 3800,
    totalPayable: 3000,
    submittedAt: '2024-03-15',
    approvedAt: '2024-03-17',
    approvedBy: 'Maria Santos',
    notes: '',
  },
  {
    id: 'ts-003',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    placementId: 'place-004',
    clientId: 'client-003',
    clientName: 'StartupXYZ',
    weekEnding: '2024-03-22',
    status: 'draft',
    regularHours: 32,
    overtimeHours: 0,
    totalHours: 32,
    billRate: 75,
    payRate: 55,
    totalBillable: 2400,
    totalPayable: 1760,
    notes: 'Part-time this week due to training',
  },
  {
    id: 'ts-004',
    candidateId: 'cand-011',
    candidateName: 'Kevin Thomas',
    placementId: 'place-005',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    weekEnding: '2024-03-22',
    status: 'processed',
    regularHours: 40,
    overtimeHours: 8,
    totalHours: 48,
    billRate: 70,
    payRate: 52,
    totalBillable: 3640,
    totalPayable: 2704,
    submittedAt: '2024-03-22',
    approvedAt: '2024-03-23',
    approvedBy: 'Maria Santos',
    notes: 'Server upgrade project overtime approved',
  },
  {
    id: 'ts-005',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientId: 'client-004',
    clientName: 'CloudTech Systems',
    weekEnding: '2024-03-08',
    status: 'processed',
    regularHours: 40,
    overtimeHours: 0,
    totalHours: 40,
    billRate: 95,
    payRate: 75,
    totalBillable: 3800,
    totalPayable: 3000,
    submittedAt: '2024-03-08',
    approvedAt: '2024-03-10',
    approvedBy: 'Maria Santos',
    notes: '',
  },
  {
    id: 'ts-006',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    placementId: 'place-004',
    clientId: 'client-003',
    clientName: 'StartupXYZ',
    weekEnding: '2024-03-15',
    status: 'rejected',
    regularHours: 40,
    overtimeHours: 10,
    totalHours: 50,
    billRate: 75,
    payRate: 55,
    totalBillable: 4125,
    totalPayable: 3025,
    submittedAt: '2024-03-15',
    notes: 'Overtime not pre-approved, please resubmit',
  },
];

export const interviews: Interview[] = [
  {
    id: 'int-001',
    candidateId: 'cand-002',
    candidateName: 'Emily Chen',
    jobOrderId: 'job-002',
    jobTitle: 'Backend Python Engineer',
    clientId: 'client-002',
    clientName: 'DataFlow Inc.',
    scheduledAt: '2024-03-25T10:00:00',
    duration: 60,
    type: 'video',
    meetingLink: 'https://zoom.us/j/123456789',
    interviewers: ['Susan Lee', 'Mark Johnson'],
    status: 'scheduled',
    notes: 'Technical interview, focus on system design',
  },
  {
    id: 'int-002',
    candidateId: 'cand-008',
    candidateName: 'Amanda Garcia',
    jobOrderId: 'job-007',
    jobTitle: 'iOS Developer',
    clientId: 'client-006',
    clientName: 'MobileFirst Inc.',
    scheduledAt: '2024-03-26T14:00:00',
    duration: 90,
    type: 'in-person',
    location: '200 App Street, Los Angeles, CA',
    interviewers: ['Chris Williams', 'Dana Scott'],
    status: 'scheduled',
    notes: 'Final round, meet the team',
  },
  {
    id: 'int-003',
    candidateId: 'cand-001',
    candidateName: 'John Smith',
    jobOrderId: 'job-001',
    jobTitle: 'Senior React Developer',
    clientId: 'client-001',
    clientName: 'TechCorp Solutions',
    scheduledAt: '2024-03-20T09:00:00',
    duration: 45,
    type: 'phone',
    interviewers: ['Robert Martinez'],
    status: 'completed',
    feedback: 'Strong candidate, good cultural fit',
    rating: 4,
    outcome: 'passed',
    notes: 'Moving to onsite round',
  },
  {
    id: 'int-004',
    candidateId: 'cand-006',
    candidateName: 'Jennifer Martinez',
    jobOrderId: 'job-006',
    jobTitle: 'Data Scientist',
    clientId: 'client-005',
    clientName: 'AI Innovations',
    scheduledAt: '2024-03-27T11:00:00',
    duration: 60,
    type: 'technical',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewers: ['Dr. James Park'],
    status: 'scheduled',
    notes: 'ML coding challenge, focus on NLP',
  },
  {
    id: 'int-005',
    candidateId: 'cand-012',
    candidateName: 'Peter Kim',
    jobOrderId: 'job-001',
    jobTitle: 'Senior React Developer',
    clientId: 'client-001',
    clientName: 'TechCorp Solutions',
    scheduledAt: '2024-03-18T15:00:00',
    duration: 60,
    type: 'video',
    meetingLink: 'https://zoom.us/j/987654321',
    interviewers: ['Robert Martinez', 'Sarah Chen'],
    status: 'no-show',
    feedback: 'Candidate did not show up, no communication',
    notes: 'Follow up with candidate',
  },
  {
    id: 'int-006',
    candidateId: 'cand-013',
    candidateName: 'Rachel Green',
    jobOrderId: 'job-003',
    jobTitle: 'Full Stack Developer',
    clientId: 'client-003',
    clientName: 'StartupXYZ',
    scheduledAt: '2024-03-28T10:00:00',
    duration: 120,
    type: 'panel',
    meetingLink: 'https://zoom.us/j/111222333',
    interviewers: ['Alex Thompson', 'CTO', 'Lead Developer'],
    status: 'scheduled',
    notes: 'Full panel interview with leadership team',
  },
];

export const complianceDocuments: ComplianceDocument[] = [
  {
    id: 'comp-001',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    type: 'background-check',
    status: 'completed',
    completedAt: '2024-03-10',
    documentUrl: '/docs/bg-check-001.pdf',
    notes: 'Clear background check',
  },
  {
    id: 'comp-002',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    type: 'drug-test',
    status: 'completed',
    completedAt: '2024-03-10',
    documentUrl: '/docs/drug-test-001.pdf',
    notes: 'Negative result',
  },
  {
    id: 'comp-003',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    type: 'i9',
    status: 'completed',
    completedAt: '2024-03-12',
    documentUrl: '/docs/i9-001.pdf',
    notes: '',
  },
  {
    id: 'comp-004',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    type: 'w4',
    status: 'completed',
    completedAt: '2024-03-12',
    documentUrl: '/docs/w4-001.pdf',
    notes: '',
  },
  {
    id: 'comp-005',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    type: 'background-check',
    status: 'completed',
    completedAt: '2024-01-28',
    documentUrl: '/docs/bg-check-002.pdf',
    notes: 'Clear',
  },
  {
    id: 'comp-006',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    type: 'nda',
    status: 'completed',
    completedAt: '2024-01-30',
    documentUrl: '/docs/nda-001.pdf',
    notes: 'Client NDA signed',
  },
  {
    id: 'comp-007',
    candidateId: 'cand-008',
    candidateName: 'Amanda Garcia',
    type: 'background-check',
    status: 'in-progress',
    requiredBy: '2024-04-01',
    notes: 'Initiated 3/20, pending results',
  },
  {
    id: 'comp-008',
    candidateId: 'cand-011',
    candidateName: 'Kevin Thomas',
    type: 'certification',
    status: 'expired',
    completedAt: '2023-03-15',
    expiresAt: '2024-03-15',
    documentUrl: '/docs/cert-001.pdf',
    notes: 'AWS certification expired, renewal needed',
  },
  {
    id: 'comp-009',
    candidateId: 'cand-002',
    candidateName: 'Emily Chen',
    type: 'background-check',
    status: 'pending',
    requiredBy: '2024-04-05',
    notes: 'Pending offer acceptance',
  },
];

export const onboardingTasks: OnboardingTask[] = [
  {
    id: 'onb-001',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientName: 'CloudTech Systems',
    taskName: 'Complete I-9 verification',
    category: 'documentation',
    status: 'completed',
    dueDate: '2024-03-12',
    completedAt: '2024-03-12',
    assignedTo: 'HR Team',
    notes: '',
    priority: 'high',
  },
  {
    id: 'onb-002',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientName: 'CloudTech Systems',
    taskName: 'Set up direct deposit',
    category: 'documentation',
    status: 'completed',
    dueDate: '2024-03-12',
    completedAt: '2024-03-11',
    assignedTo: 'Payroll',
    notes: '',
    priority: 'high',
  },
  {
    id: 'onb-003',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientName: 'CloudTech Systems',
    taskName: 'AWS account setup',
    category: 'access',
    status: 'completed',
    dueDate: '2024-03-14',
    completedAt: '2024-03-13',
    assignedTo: 'IT Admin',
    notes: '',
    priority: 'medium',
  },
  {
    id: 'onb-004',
    candidateId: 'cand-005',
    candidateName: 'David Brown',
    placementId: 'place-002',
    clientName: 'CloudTech Systems',
    taskName: 'Security orientation',
    category: 'training',
    status: 'completed',
    dueDate: '2024-03-15',
    completedAt: '2024-03-14',
    assignedTo: 'Security Team',
    notes: '',
    priority: 'medium',
  },
  {
    id: 'onb-005',
    candidateId: 'cand-008',
    candidateName: 'Amanda Garcia',
    placementId: 'place-006',
    clientName: 'MobileFirst Inc.',
    taskName: 'Background check clearance',
    category: 'documentation',
    status: 'in-progress',
    dueDate: '2024-04-01',
    assignedTo: 'HR Team',
    notes: 'Pending results',
    priority: 'high',
  },
  {
    id: 'onb-006',
    candidateId: 'cand-008',
    candidateName: 'Amanda Garcia',
    placementId: 'place-006',
    clientName: 'MobileFirst Inc.',
    taskName: 'MacBook Pro provisioning',
    category: 'equipment',
    status: 'pending',
    dueDate: '2024-04-05',
    assignedTo: 'IT Admin',
    notes: 'Waiting for start date confirmation',
    priority: 'medium',
  },
  {
    id: 'onb-007',
    candidateId: 'cand-008',
    candidateName: 'Amanda Garcia',
    placementId: 'place-006',
    clientName: 'MobileFirst Inc.',
    taskName: 'Apple Developer account access',
    category: 'access',
    status: 'blocked',
    dueDate: '2024-04-05',
    assignedTo: 'IT Admin',
    notes: 'Blocked on background check completion',
    priority: 'high',
  },
  {
    id: 'onb-008',
    candidateId: 'cand-010',
    candidateName: 'Lisa Anderson',
    placementId: 'place-004',
    clientName: 'StartupXYZ',
    taskName: 'Design tool licenses',
    category: 'equipment',
    status: 'completed',
    dueDate: '2024-02-01',
    completedAt: '2024-01-31',
    assignedTo: 'IT Admin',
    notes: 'Figma and Adobe licenses activated',
    priority: 'medium',
  },
];

export const staffingStats: StaffingStats = {
  totalCandidates: 156,
  activeCandidates: 89,
  totalJobOrders: 52,
  openJobOrders: 18,
  totalPlacements: 87,
  activePlacements: 24,
  totalClients: 28,
  activeClients: 22,
  monthlyRevenue: 185000,
  monthlyPlacements: 8,
  avgTimeToFill: 21,
  fillRate: 72,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatSalaryRange = (range: { min: number; max: number }): string => {
  return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`;
};

export const getCandidateStatusColor = (status: Candidate['status']): string => {
  switch (status) {
    case 'available':
      return '#10b981'; // green
    case 'interviewing':
      return '#3b82f6'; // blue
    case 'placed':
      return '#8b5cf6'; // purple
    case 'onboarding':
      return '#f59e0b'; // amber
    case 'inactive':
      return '#6b7280'; // gray
    default:
      return '#6b7280';
  }
};

export const getCandidateStatusBgColor = (status: Candidate['status']): string => {
  switch (status) {
    case 'available':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'interviewing':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'placed':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'onboarding':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'inactive':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getJobUrgencyColor = (urgency: JobOrder['urgency']): string => {
  switch (urgency) {
    case 'critical':
      return '#ef4444'; // red
    case 'high':
      return '#f59e0b'; // amber
    case 'medium':
      return '#3b82f6'; // blue
    case 'low':
      return '#6b7280'; // gray
    default:
      return '#6b7280';
  }
};

export const getJobUrgencyBgColor = (urgency: JobOrder['urgency']): string => {
  switch (urgency) {
    case 'critical':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'medium':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'low':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getJobStatusColor = (status: JobOrder['status']): string => {
  switch (status) {
    case 'open':
      return '#10b981'; // green
    case 'filled':
      return '#8b5cf6'; // purple
    case 'on-hold':
      return '#f59e0b'; // amber
    case 'cancelled':
      return '#ef4444'; // red
    default:
      return '#6b7280';
  }
};

export const getJobStatusBgColor = (status: JobOrder['status']): string => {
  switch (status) {
    case 'open':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'filled':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'on-hold':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'cancelled':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getPlacementStatusColor = (status: Placement['status']): string => {
  switch (status) {
    case 'active':
      return '#10b981'; // green
    case 'completed':
      return '#3b82f6'; // blue
    case 'terminated':
      return '#ef4444'; // red
    case 'extended':
      return '#8b5cf6'; // purple
    default:
      return '#6b7280';
  }
};

export const getPlacementStatusBgColor = (status: Placement['status']): string => {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'completed':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'terminated':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'extended':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getClientTierColor = (tier: Client['tier']): string => {
  switch (tier) {
    case 'platinum':
      return '#a78bfa'; // violet
    case 'gold':
      return '#fbbf24'; // gold
    case 'silver':
      return '#9ca3af'; // silver/gray
    case 'bronze':
      return '#d97706'; // bronze
    default:
      return '#6b7280';
  }
};

export const getClientTierBgColor = (tier: Client['tier']): string => {
  switch (tier) {
    case 'platinum':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    case 'gold':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'silver':
      return 'bg-gray-400/10 text-gray-300 border-gray-400/30';
    case 'bronze':
      return 'bg-amber-600/10 text-amber-500 border-amber-600/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getTimesheetStatusColor = (status: Timesheet['status']): string => {
  switch (status) {
    case 'draft':
      return '#6b7280'; // gray
    case 'submitted':
      return '#3b82f6'; // blue
    case 'approved':
      return '#10b981'; // green
    case 'rejected':
      return '#ef4444'; // red
    case 'processed':
      return '#8b5cf6'; // purple
    default:
      return '#6b7280';
  }
};

export const getTimesheetStatusBgColor = (status: Timesheet['status']): string => {
  switch (status) {
    case 'draft':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    case 'submitted':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'approved':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'rejected':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'processed':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getInterviewStatusColor = (status: Interview['status']): string => {
  switch (status) {
    case 'scheduled':
      return '#3b82f6'; // blue
    case 'completed':
      return '#10b981'; // green
    case 'cancelled':
      return '#ef4444'; // red
    case 'no-show':
      return '#f59e0b'; // amber
    case 'rescheduled':
      return '#8b5cf6'; // purple
    default:
      return '#6b7280';
  }
};

export const getInterviewStatusBgColor = (status: Interview['status']): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'completed':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'cancelled':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'no-show':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'rescheduled':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getComplianceStatusColor = (status: ComplianceDocument['status']): string => {
  switch (status) {
    case 'completed':
      return '#10b981'; // green
    case 'in-progress':
      return '#3b82f6'; // blue
    case 'pending':
      return '#f59e0b'; // amber
    case 'expired':
      return '#ef4444'; // red
    case 'failed':
      return '#ef4444'; // red
    default:
      return '#6b7280';
  }
};

export const getComplianceStatusBgColor = (status: ComplianceDocument['status']): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'pending':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'expired':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'failed':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getOnboardingStatusColor = (status: OnboardingTask['status']): string => {
  switch (status) {
    case 'completed':
      return '#10b981'; // green
    case 'in-progress':
      return '#3b82f6'; // blue
    case 'pending':
      return '#6b7280'; // gray
    case 'blocked':
      return '#ef4444'; // red
    default:
      return '#6b7280';
  }
};

export const getOnboardingStatusBgColor = (status: OnboardingTask['status']): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'pending':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    case 'blocked':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const getOnboardingPriorityColor = (priority: OnboardingTask['priority']): string => {
  switch (priority) {
    case 'high':
      return '#ef4444'; // red
    case 'medium':
      return '#f59e0b'; // amber
    case 'low':
      return '#10b981'; // green
    default:
      return '#6b7280';
  }
};

// ============================================
// SIDEBAR MENU ITEMS
// ============================================

export const staffingMenuItems = [
  {
    id: 'staffing-candidates',
    label: 'Candidates',
    icon: Users,
    path: '/dashboard/staffing/candidates',
  },
  {
    id: 'staffing-jobs',
    label: 'Job Orders',
    icon: Briefcase,
    path: '/dashboard/staffing/jobs',
  },
  {
    id: 'staffing-placements',
    label: 'Placements',
    icon: CheckCircle,
    path: '/dashboard/staffing/placements',
  },
  {
    id: 'staffing-clients',
    label: 'Clients',
    icon: Building2,
    path: '/dashboard/staffing/clients',
  },
  {
    id: 'staffing-timesheets',
    label: 'Timesheets',
    icon: Clock,
    path: '/dashboard/staffing/timesheets',
  },
  {
    id: 'staffing-payroll',
    label: 'Payroll',
    icon: DollarSign,
    path: '/dashboard/staffing/payroll',
  },
  {
    id: 'staffing-compliance',
    label: 'Compliance',
    icon: FileCheck,
    path: '/dashboard/staffing/compliance',
  },
  {
    id: 'staffing-interviews',
    label: 'Interviews',
    icon: Calendar,
    path: '/dashboard/staffing/interviews',
  },
  {
    id: 'staffing-onboarding',
    label: 'Onboarding',
    icon: UserPlus,
    path: '/dashboard/staffing/onboarding',
  },
];
