import {
  Briefcase,
  MapPin,
  Package,
  Users,
  Truck,
  DollarSign,
  Calendar,
  Shield,
  CheckSquare,
  FileText,
  BarChart3,
  ClipboardCheck,
} from 'lucide-react';

// Construction Color Theme
export const CONSTRUCTION_COLOR = '#f97316';
export const CONSTRUCTION_COLOR_LIGHT = '#fb923c';
export const CONSTRUCTION_COLOR_DARK = '#ea580c';

// Types
export interface Project {
  id: string;
  projectNo: string;
  name: string;
  client: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Infrastructure' | 'Industrial';
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  startDate: string;
  plannedEndDate: string;
  actualEndDate: string | null;
  budget: number;
  spent: number;
  completion: number;
  projectManager: string;
  contractor: string;
  area: number | null;
  units: number | null;
  floors: number | null;
}

export interface Site {
  id: string;
  projectId: string;
  projectName: string;
  siteNo: string;
  location: string;
  address: string;
  supervisor: string;
  phone: string;
  activeWorkers: number;
  status: 'preparation' | 'active' | 'suspended' | 'closed';
  safetyIncidents: number;
  lastInspection: string | null;
  nextInspection: string | null;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  projectAllocations: {
    projectId: string;
    projectName: string;
    allocated: number;
  }[];
}

export interface Subcontractor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  activeProjects: number;
  completedProjects: number;
  specialization: string[];
  certifications: string[];
  status: 'active' | 'inactive';
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  model: string;
  serialNo: string;
  status: 'in-use' | 'available' | 'maintenance' | 'out-of-service';
  currentProject: string | null;
  currentSite: string | null;
  operator: string | null;
  lastMaintenance: string;
  nextMaintenance: string;
  purchaseDate: string;
  purchaseCost: number;
  dailyRentalRate: number;
}

export interface BudgetCategory {
  id: string;
  projectId: string;
  category: string;
  budgeted: number;
  spent: number;
  committed: number;
  remaining: number;
  variance: number;
  percentSpent: number;
}

export interface TimelinePhase {
  id: string;
  projectId: string;
  phaseName: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'behind';
  completion: number;
  dependencies: string[];
  assignedTeam: string;
  milestones: string[];
}

export interface SafetyIncident {
  id: string;
  projectId: string;
  siteId: string;
  incidentDate: string;
  incidentTime: string;
  type: 'Minor Injury' | 'Major Injury' | 'Near Miss' | 'Property Damage';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  location: string;
  injuredPerson: string | null;
  reportedBy: string;
  immediateAction: string;
  rootCause: string;
  correctiveAction: string;
  status: 'open' | 'under-investigation' | 'closed';
  closedDate: string | null;
}

export interface QualityInspection {
  id: string;
  projectId: string;
  siteId: string;
  inspectionDate: string;
  inspectionType: string;
  phase: string;
  inspector: string;
  status: 'passed' | 'failed' | 'passed-with-comments';
  findings: string;
  defects: {
    location: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }[];
  correctiveActions: {
    action: string;
    responsible: string;
    deadline: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
  nextInspection: string | null;
}

export interface Document {
  id: string;
  projectId: string;
  category: string;
  subCategory: string;
  name: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  version: string;
  status: 'draft' | 'under-review' | 'approved';
  tags: string[];
}

export interface ProgressReport {
  id: string;
  projectId: string;
  reportDate: string;
  reportPeriod: string;
  overallCompletion: number;
  schedule: 'On Track' | 'Behind' | 'Ahead';
  budget: 'Within Budget' | 'Over Budget' | 'Under Budget';
  reportedBy: string;
  summary: string;
  achievements: string[];
  challenges: string[];
  upcomingActivities: string[];
  safetyIncidents: number;
  qualityIssues: number;
  photos: string[];
}

export interface InspectionApproval {
  id: string;
  projectId: string;
  inspectionType: string;
  inspectionDate: string;
  inspector: string;
  status: 'pending' | 'approved' | 'approved-with-conditions' | 'rejected';
  approvalDate: string | null;
  findings: string;
  conditions: string[];
  nextInspection: string | null;
  documents: string[];
}

// Mock Data
export const projects: Project[] = [
  {
    id: 'PRJ001',
    projectNo: '2024-001',
    name: 'Pearl Towers Residential Complex',
    client: 'Qatar Real Estate Co.',
    location: 'West Bay, Doha',
    type: 'Residential',
    status: 'in-progress',
    startDate: '2024-01-01',
    plannedEndDate: '2025-06-30',
    actualEndDate: null,
    budget: 45000000,
    spent: 12500000,
    completion: 28,
    projectManager: 'Ahmet Yilmaz',
    contractor: 'ABC Construction',
    area: 15000,
    units: 120,
    floors: 25,
  },
  {
    id: 'PRJ002',
    projectNo: '2024-002',
    name: 'Corniche Shopping Mall',
    client: 'Doha Retail Group',
    location: 'Corniche, Doha',
    type: 'Commercial',
    status: 'in-progress',
    startDate: '2023-09-01',
    plannedEndDate: '2024-12-31',
    actualEndDate: null,
    budget: 68000000,
    spent: 48000000,
    completion: 65,
    projectManager: 'Fatma Demir',
    contractor: 'XYZ Builders',
    area: 25000,
    units: null,
    floors: 4,
  },
  {
    id: 'PRJ003',
    projectNo: '2023-045',
    name: 'Al Khor Highway Extension',
    client: 'Qatar Ministry of Transport',
    location: 'Al Khor - Doha',
    type: 'Infrastructure',
    status: 'completed',
    startDate: '2023-01-15',
    plannedEndDate: '2023-12-15',
    actualEndDate: '2023-12-10',
    budget: 95000000,
    spent: 93500000,
    completion: 100,
    projectManager: 'Can Arslan',
    contractor: 'ABC Construction',
    area: null,
    units: null,
    floors: null,
  },
  {
    id: 'PRJ004',
    projectNo: '2024-003',
    name: 'Lusail Villa Project',
    client: 'Private Developer',
    location: 'Lusail City',
    type: 'Residential',
    status: 'planning',
    startDate: '2024-03-01',
    plannedEndDate: '2025-09-01',
    actualEndDate: null,
    budget: 28000000,
    spent: 500000,
    completion: 2,
    projectManager: 'Zeynep Kaya',
    contractor: 'TBD',
    area: 8000,
    units: 20,
    floors: 2,
  },
  {
    id: 'PRJ005',
    projectNo: '2024-004',
    name: 'Industrial Warehouse Complex',
    client: 'Qatar Logistics',
    location: 'Industrial Area',
    type: 'Industrial',
    status: 'on-hold',
    startDate: '2024-02-01',
    plannedEndDate: '2024-11-30',
    actualEndDate: null,
    budget: 18000000,
    spent: 3200000,
    completion: 15,
    projectManager: 'Mehmet Oz',
    contractor: 'XYZ Builders',
    area: 12000,
    units: null,
    floors: 1,
  },
];

export const sites: Site[] = [
  {
    id: 'SITE001',
    projectId: 'PRJ001',
    projectName: 'Pearl Towers Residential Complex',
    siteNo: 'SITE-PT-001',
    location: 'West Bay, Doha',
    address: 'Plot 45, West Bay District',
    supervisor: 'Hasan Yurt',
    phone: '+974 5555 2001',
    activeWorkers: 85,
    status: 'active',
    safetyIncidents: 0,
    lastInspection: '2024-01-15',
    nextInspection: '2024-01-22',
  },
  {
    id: 'SITE002',
    projectId: 'PRJ002',
    projectName: 'Corniche Shopping Mall',
    siteNo: 'SITE-CM-001',
    location: 'Corniche, Doha',
    address: 'Corniche Road, Block 12',
    supervisor: 'Ali Demir',
    phone: '+974 5555 2002',
    activeWorkers: 120,
    status: 'active',
    safetyIncidents: 1,
    lastInspection: '2024-01-16',
    nextInspection: '2024-01-23',
  },
  {
    id: 'SITE003',
    projectId: 'PRJ004',
    projectName: 'Lusail Villa Project',
    siteNo: 'SITE-LV-001',
    location: 'Lusail City',
    address: 'Zone 15, Lusail',
    supervisor: 'Kemal Ak',
    phone: '+974 5555 2003',
    activeWorkers: 0,
    status: 'preparation',
    safetyIncidents: 0,
    lastInspection: null,
    nextInspection: '2024-02-01',
  },
];

export const materials: Material[] = [
  {
    id: 'MAT001',
    name: 'Cement (Type I)',
    category: 'Concrete',
    unit: 'Bag (50kg)',
    currentStock: 2500,
    minStock: 1000,
    maxStock: 5000,
    unitCost: 25,
    supplier: 'Qatar Cement Company',
    location: 'Warehouse A',
    lastRestocked: '2024-01-15',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 1500 },
      { projectId: 'PRJ002', projectName: 'Corniche Mall', allocated: 800 },
    ],
  },
  {
    id: 'MAT002',
    name: 'Steel Rebar (12mm)',
    category: 'Steel',
    unit: 'Ton',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitCost: 2800,
    supplier: 'Gulf Steel Industries',
    location: 'Yard B',
    lastRestocked: '2024-01-12',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 30 },
      { projectId: 'PRJ002', projectName: 'Corniche Mall', allocated: 10 },
    ],
  },
  {
    id: 'MAT003',
    name: 'Sand (Construction Grade)',
    category: 'Aggregate',
    unit: 'Cubic Meter',
    currentStock: 850,
    minStock: 300,
    maxStock: 2000,
    unitCost: 45,
    supplier: 'Al Khor Quarries',
    location: 'Yard A',
    lastRestocked: '2024-01-14',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 500 },
    ],
  },
  {
    id: 'MAT004',
    name: 'Gravel (20mm)',
    category: 'Aggregate',
    unit: 'Cubic Meter',
    currentStock: 620,
    minStock: 250,
    maxStock: 1500,
    unitCost: 55,
    supplier: 'Al Khor Quarries',
    location: 'Yard A',
    lastRestocked: '2024-01-14',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 400 },
    ],
  },
  {
    id: 'MAT005',
    name: 'Concrete Blocks (200mm)',
    category: 'Masonry',
    unit: 'Piece',
    currentStock: 8500,
    minStock: 3000,
    maxStock: 15000,
    unitCost: 8,
    supplier: 'Doha Block Factory',
    location: 'Warehouse C',
    lastRestocked: '2024-01-10',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 5000 },
      { projectId: 'PRJ002', projectName: 'Corniche Mall', allocated: 2500 },
    ],
  },
  {
    id: 'MAT006',
    name: 'Paint (White - Exterior)',
    category: 'Finishing',
    unit: 'Gallon',
    currentStock: 180,
    minStock: 50,
    maxStock: 500,
    unitCost: 95,
    supplier: 'Qatar Paints',
    location: 'Warehouse B',
    lastRestocked: '2024-01-08',
    projectAllocations: [
      { projectId: 'PRJ002', projectName: 'Corniche Mall', allocated: 120 },
    ],
  },
  {
    id: 'MAT007',
    name: 'Electrical Cables (2.5mm)',
    category: 'Electrical',
    unit: 'Meter',
    currentStock: 1500,
    minStock: 500,
    maxStock: 3000,
    unitCost: 12,
    supplier: 'Gulf Electrical Supplies',
    location: 'Warehouse D',
    lastRestocked: '2024-01-16',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 800 },
      { projectId: 'PRJ002', projectName: 'Corniche Mall', allocated: 500 },
    ],
  },
  {
    id: 'MAT008',
    name: 'PVC Pipes (110mm)',
    category: 'Plumbing',
    unit: 'Meter',
    currentStock: 950,
    minStock: 300,
    maxStock: 2000,
    unitCost: 18,
    supplier: 'Plumbing Solutions Qatar',
    location: 'Warehouse D',
    lastRestocked: '2024-01-13',
    projectAllocations: [
      { projectId: 'PRJ001', projectName: 'Pearl Towers', allocated: 600 },
    ],
  },
];

export const subcontractors: Subcontractor[] = [
  {
    id: 'SUB001',
    name: 'Elite Electrical Works',
    category: 'Electrical',
    contactPerson: 'Ahmed Hassan',
    phone: '+974 5555 3001',
    email: 'ahmed@eliteelectric.qa',
    address: 'Industrial Area, Doha',
    rating: 4.5,
    activeProjects: 2,
    completedProjects: 15,
    specialization: ['Electrical Installation', 'Lighting', 'Power Distribution'],
    certifications: ['ISO 9001', 'Qatar Electrical License'],
    status: 'active',
  },
  {
    id: 'SUB002',
    name: 'Premium Plumbing Services',
    category: 'Plumbing',
    contactPerson: 'Mohammed Ali',
    phone: '+974 5555 3002',
    email: 'info@premiumplumbing.qa',
    address: 'Al Sadd, Doha',
    rating: 4.8,
    activeProjects: 3,
    completedProjects: 28,
    specialization: ['Plumbing Installation', 'HVAC', 'Fire Protection'],
    certifications: ['ISO 9001', 'Qatar Plumbing License'],
    status: 'active',
  },
  {
    id: 'SUB003',
    name: 'Gulf Steel Fabrication',
    category: 'Steel Work',
    contactPerson: 'Youssef Ibrahim',
    phone: '+974 5555 3003',
    email: 'youssef@gulfsteel.qa',
    address: 'Industrial Area, Doha',
    rating: 4.3,
    activeProjects: 1,
    completedProjects: 12,
    specialization: ['Steel Fabrication', 'Structural Steel', 'Welding'],
    certifications: ['ISO 9001', 'AWS Welding Cert'],
    status: 'active',
  },
  {
    id: 'SUB004',
    name: 'Modern Painting & Finishing',
    category: 'Painting',
    contactPerson: 'Khalid Rahman',
    phone: '+974 5555 3004',
    email: 'khalid@modernpainting.qa',
    address: 'West Bay, Doha',
    rating: 4.6,
    activeProjects: 2,
    completedProjects: 35,
    specialization: ['Interior Painting', 'Exterior Painting', 'Texture Coating'],
    certifications: ['Qatar Painting License'],
    status: 'active',
  },
  {
    id: 'SUB005',
    name: 'Safe Scaffolding Systems',
    category: 'Scaffolding',
    contactPerson: 'Rashid Ahmed',
    phone: '+974 5555 3005',
    email: 'rashid@safescaff.qa',
    address: 'Industrial Area, Doha',
    rating: 4.7,
    activeProjects: 4,
    completedProjects: 42,
    specialization: ['Scaffolding Erection', 'Safety Systems', 'Access Solutions'],
    certifications: ['ISO 9001', 'Safety Certification'],
    status: 'active',
  },
];

export const equipment: Equipment[] = [
  {
    id: 'EQP001',
    name: 'Tower Crane TC5610',
    category: 'Crane',
    model: 'Liebherr TC5610',
    serialNo: 'TC-2023-001',
    status: 'in-use',
    currentProject: 'PRJ001',
    currentSite: 'SITE001',
    operator: 'Hasan Crane Operator',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-02-05',
    purchaseDate: '2023-06-15',
    purchaseCost: 850000,
    dailyRentalRate: 1500,
  },
  {
    id: 'EQP002',
    name: 'Excavator CAT 320',
    category: 'Excavator',
    model: 'Caterpillar 320',
    serialNo: 'EX-2022-015',
    status: 'in-use',
    currentProject: 'PRJ002',
    currentSite: 'SITE002',
    operator: 'Ali Excavator Op',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    purchaseDate: '2022-11-20',
    purchaseCost: 420000,
    dailyRentalRate: 800,
  },
  {
    id: 'EQP003',
    name: 'Concrete Mixer Truck',
    category: 'Concrete',
    model: 'Mercedes Actros',
    serialNo: 'CM-2023-008',
    status: 'available',
    currentProject: null,
    currentSite: null,
    operator: null,
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-02-12',
    purchaseDate: '2023-03-10',
    purchaseCost: 280000,
    dailyRentalRate: 600,
  },
  {
    id: 'EQP004',
    name: 'Bulldozer CAT D6',
    category: 'Bulldozer',
    model: 'Caterpillar D6',
    serialNo: 'BD-2021-003',
    status: 'maintenance',
    currentProject: null,
    currentSite: null,
    operator: null,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    purchaseDate: '2021-08-05',
    purchaseCost: 520000,
    dailyRentalRate: 900,
  },
  {
    id: 'EQP005',
    name: 'Generator 500 KVA',
    category: 'Generator',
    model: 'Cummins C500',
    serialNo: 'GN-2023-012',
    status: 'in-use',
    currentProject: 'PRJ001',
    currentSite: 'SITE001',
    operator: null,
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-02-08',
    purchaseDate: '2023-05-20',
    purchaseCost: 95000,
    dailyRentalRate: 250,
  },
];

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'BUDG001',
    projectId: 'PRJ001',
    category: 'Labor',
    budgeted: 8500000,
    spent: 2400000,
    committed: 1200000,
    remaining: 4900000,
    variance: -3600000,
    percentSpent: 28.2,
  },
  {
    id: 'BUDG002',
    projectId: 'PRJ001',
    category: 'Materials',
    budgeted: 18000000,
    spent: 5200000,
    committed: 3800000,
    remaining: 9000000,
    variance: -9000000,
    percentSpent: 28.9,
  },
  {
    id: 'BUDG003',
    projectId: 'PRJ001',
    category: 'Equipment',
    budgeted: 6500000,
    spent: 1800000,
    committed: 900000,
    remaining: 3800000,
    variance: -4700000,
    percentSpent: 27.7,
  },
  {
    id: 'BUDG004',
    projectId: 'PRJ001',
    category: 'Subcontractors',
    budgeted: 9000000,
    spent: 2500000,
    committed: 1500000,
    remaining: 5000000,
    variance: -6500000,
    percentSpent: 27.8,
  },
  {
    id: 'BUDG005',
    projectId: 'PRJ001',
    category: 'Overheads',
    budgeted: 3000000,
    spent: 600000,
    committed: 200000,
    remaining: 2200000,
    variance: -2400000,
    percentSpent: 20,
  },
];

export const timelinePhases: TimelinePhase[] = [
  {
    id: 'PHS001',
    projectId: 'PRJ001',
    phaseName: 'Site Preparation & Foundation',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    duration: 90,
    status: 'in-progress',
    completion: 75,
    dependencies: [],
    assignedTeam: 'Foundation Team',
    milestones: ['Site Clearance', 'Excavation', 'Foundation Concrete'],
  },
  {
    id: 'PHS002',
    projectId: 'PRJ001',
    phaseName: 'Structural Work (Floors 1-10)',
    startDate: '2024-03-15',
    endDate: '2024-07-31',
    duration: 138,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS001'],
    assignedTeam: 'Structure Team A',
    milestones: ['Column Erection', 'Slab Casting', 'Curing'],
  },
  {
    id: 'PHS003',
    projectId: 'PRJ001',
    phaseName: 'Structural Work (Floors 11-20)',
    startDate: '2024-06-01',
    endDate: '2024-10-31',
    duration: 152,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS002'],
    assignedTeam: 'Structure Team B',
    milestones: ['Column Erection', 'Slab Casting', 'Curing'],
  },
  {
    id: 'PHS004',
    projectId: 'PRJ001',
    phaseName: 'Structural Work (Floors 21-25)',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    duration: 122,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS003'],
    assignedTeam: 'Structure Team C',
    milestones: ['Column Erection', 'Slab Casting', 'Roof'],
  },
  {
    id: 'PHS005',
    projectId: 'PRJ001',
    phaseName: 'MEP Installation',
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    duration: 182,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS004'],
    assignedTeam: 'MEP Team',
    milestones: ['Electrical Rough-in', 'Plumbing', 'HVAC'],
  },
  {
    id: 'PHS006',
    projectId: 'PRJ001',
    phaseName: 'Interior Finishing',
    startDate: '2025-01-01',
    endDate: '2025-05-31',
    duration: 151,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS005'],
    assignedTeam: 'Finishing Team',
    milestones: ['Plastering', 'Painting', 'Flooring', 'Fixtures'],
  },
  {
    id: 'PHS007',
    projectId: 'PRJ001',
    phaseName: 'External Works & Landscaping',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    duration: 91,
    status: 'scheduled',
    completion: 0,
    dependencies: ['PHS006'],
    assignedTeam: 'External Works Team',
    milestones: ['Paving', 'Landscaping', 'Parking'],
  },
];

export const safetyIncidents: SafetyIncident[] = [
  {
    id: 'INC001',
    projectId: 'PRJ002',
    siteId: 'SITE002',
    incidentDate: '2024-01-14',
    incidentTime: '14:30',
    type: 'Minor Injury',
    severity: 'Low',
    description: 'Worker suffered minor cut on hand while handling steel rebar',
    location: 'Level 3, Column Grid C-5',
    injuredPerson: 'Ahmed Worker',
    reportedBy: 'Site Supervisor',
    immediateAction: 'First aid provided, wound cleaned and bandaged',
    rootCause: 'Not wearing safety gloves',
    correctiveAction: 'Mandatory glove usage enforced, safety briefing conducted',
    status: 'closed',
    closedDate: '2024-01-15',
  },
  {
    id: 'INC002',
    projectId: 'PRJ001',
    siteId: 'SITE001',
    incidentDate: '2024-01-08',
    incidentTime: '10:15',
    type: 'Near Miss',
    severity: 'Medium',
    description: 'Falling debris near worker area',
    location: 'Level 8, East Wing',
    injuredPerson: null,
    reportedBy: 'Safety Officer',
    immediateAction: 'Area cordoned off, debris cleared',
    rootCause: 'Inadequate edge protection',
    correctiveAction: 'Additional safety barriers installed, toolbox talk conducted',
    status: 'closed',
    closedDate: '2024-01-09',
  },
];

export const qualityInspections: QualityInspection[] = [
  {
    id: 'QI001',
    projectId: 'PRJ001',
    siteId: 'SITE001',
    inspectionDate: '2024-01-15',
    inspectionType: 'Concrete Strength Test',
    phase: 'Foundation',
    inspector: 'Eng. Khalid Quality',
    status: 'passed',
    findings: 'Concrete strength meets design requirements (35 MPa achieved)',
    defects: [],
    correctiveActions: [],
    nextInspection: '2024-01-22',
  },
  {
    id: 'QI002',
    projectId: 'PRJ001',
    siteId: 'SITE001',
    inspectionDate: '2024-01-12',
    inspectionType: 'Steel Reinforcement',
    phase: 'Foundation',
    inspector: 'Eng. Khalid Quality',
    status: 'failed',
    findings: 'Rebar spacing not as per drawing in 3 locations',
    defects: [
      { location: 'Grid A-3', description: 'Rebar spacing 250mm instead of 200mm', severity: 'Medium' },
      { location: 'Grid B-5', description: 'Missing corner bars', severity: 'High' },
    ],
    correctiveActions: [
      { action: 'Additional rebars to be installed', responsible: 'Steel Team', deadline: '2024-01-14', status: 'completed' },
    ],
    nextInspection: '2024-01-16',
  },
  {
    id: 'QI003',
    projectId: 'PRJ002',
    siteId: 'SITE002',
    inspectionDate: '2024-01-16',
    inspectionType: 'Masonry Work',
    phase: 'Walls',
    inspector: 'Eng. Fatma Quality',
    status: 'passed-with-comments',
    findings: 'Overall quality acceptable, minor deviations noted',
    defects: [
      { location: 'Level 2, Room 204', description: 'Block alignment slightly off (5mm)', severity: 'Low' },
    ],
    correctiveActions: [
      { action: 'Apply additional plaster to correct alignment', responsible: 'Masonry Team', deadline: '2024-01-18', status: 'pending' },
    ],
    nextInspection: '2024-01-23',
  },
];

export const documents: Document[] = [
  {
    id: 'DOC001',
    projectId: 'PRJ001',
    category: 'Drawings',
    subCategory: 'Architectural',
    name: 'Ground Floor Plan - Rev 3',
    fileName: 'GF-PLAN-REV3.pdf',
    uploadedBy: 'Ahmet Yilmaz',
    uploadDate: '2024-01-10',
    size: '4.2 MB',
    version: 'Rev 3',
    status: 'approved',
    tags: ['Floor Plan', 'Architectural'],
  },
  {
    id: 'DOC002',
    projectId: 'PRJ001',
    category: 'Drawings',
    subCategory: 'Structural',
    name: 'Foundation Details',
    fileName: 'FOUNDATION-DETAILS.pdf',
    uploadedBy: 'Can Arslan',
    uploadDate: '2024-01-05',
    size: '6.8 MB',
    version: 'Rev 2',
    status: 'approved',
    tags: ['Foundation', 'Structural'],
  },
  {
    id: 'DOC003',
    projectId: 'PRJ001',
    category: 'Specifications',
    subCategory: 'Materials',
    name: 'Concrete Specifications',
    fileName: 'CONCRETE-SPECS.pdf',
    uploadedBy: 'Zeynep Kaya',
    uploadDate: '2024-01-08',
    size: '1.5 MB',
    version: 'Rev 1',
    status: 'approved',
    tags: ['Concrete', 'Specifications'],
  },
  {
    id: 'DOC004',
    projectId: 'PRJ001',
    category: 'Reports',
    subCategory: 'Progress',
    name: 'Monthly Progress Report - December 2023',
    fileName: 'PROGRESS-DEC-2023.pdf',
    uploadedBy: 'Ahmet Yilmaz',
    uploadDate: '2024-01-03',
    size: '3.2 MB',
    version: 'Final',
    status: 'approved',
    tags: ['Progress', 'Monthly Report'],
  },
  {
    id: 'DOC005',
    projectId: 'PRJ002',
    category: 'Contracts',
    subCategory: 'Subcontractor',
    name: 'Electrical Works Contract',
    fileName: 'ELEC-CONTRACT.pdf',
    uploadedBy: 'Fatma Demir',
    uploadDate: '2023-12-15',
    size: '2.1 MB',
    version: 'Final',
    status: 'approved',
    tags: ['Contract', 'Electrical'],
  },
  {
    id: 'DOC006',
    projectId: 'PRJ001',
    category: 'Permits',
    subCategory: 'Building Permit',
    name: 'Building Permit - Pearl Towers',
    fileName: 'BUILDING-PERMIT.pdf',
    uploadedBy: 'Ahmet Yilmaz',
    uploadDate: '2023-12-20',
    size: '0.8 MB',
    version: 'Final',
    status: 'approved',
    tags: ['Permit', 'Legal'],
  },
];

export const progressReports: ProgressReport[] = [
  {
    id: 'REP001',
    projectId: 'PRJ001',
    reportDate: '2024-01-15',
    reportPeriod: 'Week 3 - January 2024',
    overallCompletion: 28,
    schedule: 'On Track',
    budget: 'Within Budget',
    reportedBy: 'Ahmet Yilmaz',
    summary: 'Foundation work progressing well. Level 1 slab casting completed.',
    achievements: [
      'Foundation concrete poured for Blocks A & B',
      'Level 1 column formwork installed',
      'Steel reinforcement for Level 1 slab completed',
    ],
    challenges: [
      'Delay in cement delivery (2 days)',
      'Weather conditions affected outdoor work (1 day)',
    ],
    upcomingActivities: [
      'Level 1 slab concrete pour',
      'Level 2 column steel work',
      'MEP rough-in coordination',
    ],
    safetyIncidents: 0,
    qualityIssues: 0,
    photos: [],
  },
  {
    id: 'REP002',
    projectId: 'PRJ002',
    reportDate: '2024-01-16',
    reportPeriod: 'Week 3 - January 2024',
    overallCompletion: 65,
    schedule: 'Behind',
    budget: 'Within Budget',
    reportedBy: 'Fatma Demir',
    summary: 'Interior finishing progressing. External facade work ongoing.',
    achievements: [
      'Level 3 & 4 painting completed',
      'Electrical installation 80% complete',
      'Facade panels installed on East elevation',
    ],
    challenges: [
      'Subcontractor delay for HVAC ductwork',
      'Material shortage - ceramic tiles',
    ],
    upcomingActivities: [
      'Complete facade work',
      'Start flooring installation',
      'MEP final connections',
    ],
    safetyIncidents: 1,
    qualityIssues: 1,
    photos: [],
  },
];

export const inspectionApprovals: InspectionApproval[] = [
  {
    id: 'APPR001',
    projectId: 'PRJ001',
    inspectionType: 'Foundation Inspection',
    inspectionDate: '2024-01-12',
    inspector: 'Qatar Civil Defense',
    status: 'approved',
    approvalDate: '2024-01-13',
    findings: 'Foundation meets all safety and design requirements',
    conditions: [],
    nextInspection: 'Structural Frame - Level 5',
    documents: ['DOC002'],
  },
  {
    id: 'APPR002',
    projectId: 'PRJ001',
    inspectionType: 'Electrical Rough-in',
    inspectionDate: '2024-01-10',
    inspector: 'Kahramaa',
    status: 'approved-with-conditions',
    approvalDate: '2024-01-11',
    findings: 'Overall compliant, minor corrections needed',
    conditions: [
      'Bonding required at 3 locations',
      'Cable tray labels to be installed',
    ],
    nextInspection: 'Electrical Final Inspection',
    documents: [],
  },
  {
    id: 'APPR003',
    projectId: 'PRJ002',
    inspectionType: 'Fire Safety Systems',
    inspectionDate: '2024-01-15',
    inspector: 'Qatar Civil Defense',
    status: 'pending',
    approvalDate: null,
    findings: 'Inspection scheduled, awaiting visit',
    conditions: [],
    nextInspection: null,
    documents: [],
  },
];

// Menu Items for Sidebar
export const constructionMenuItems = [
  { id: 'projects', label: 'Projects', icon: Briefcase, path: '/dashboard/construction/projects' },
  { id: 'sites', label: 'Sites', icon: MapPin, path: '/dashboard/construction/sites' },
  { id: 'materials', label: 'Materials', icon: Package, path: '/dashboard/construction/materials' },
  { id: 'subcontractors', label: 'Subcontractors', icon: Users, path: '/dashboard/construction/subcontractors' },
  { id: 'equipment', label: 'Equipment', icon: Truck, path: '/dashboard/construction/equipment' },
  { id: 'budget', label: 'Budget & Cost', icon: DollarSign, path: '/dashboard/construction/budget' },
  { id: 'timeline', label: 'Timeline', icon: Calendar, path: '/dashboard/construction/timeline' },
  { id: 'safety', label: 'Safety', icon: Shield, path: '/dashboard/construction/safety' },
  { id: 'quality', label: 'Quality Control', icon: CheckSquare, path: '/dashboard/construction/quality' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/dashboard/construction/documents' },
  { id: 'progress', label: 'Progress Reports', icon: BarChart3, path: '/dashboard/construction/progress' },
  { id: 'inspections', label: 'Inspections', icon: ClipboardCheck, path: '/dashboard/construction/inspections' },
];
