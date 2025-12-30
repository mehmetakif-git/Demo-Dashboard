// Asset Types
export interface Asset {
  id: string;
  name: string;
  category: string;
  type: string;
  location: string;
  status: 'operational' | 'needs-repair' | 'under-maintenance' | 'out-of-service';
  condition: 'good' | 'fair' | 'poor';
  manufacturer: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry: string;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  documents: string[];
  maintenanceHistory: number;
}

export const assets: Asset[] = [
  {
    id: "AST001",
    name: "HVAC System - Building A",
    category: "HVAC",
    type: "Central Air Conditioning",
    location: "Building A - Rooftop",
    status: "operational",
    condition: "good",
    manufacturer: "Carrier",
    model: "50XC",
    serialNumber: "CAR-2021-78452",
    purchaseDate: "2021-03-15",
    purchasePrice: 45000,
    warrantyExpiry: "2026-03-15",
    lastMaintenance: "2024-11-15",
    nextMaintenance: "2025-02-15",
    assignedTo: "Chris Johnson",
    criticality: "high",
    documents: ["Installation Manual", "Warranty Certificate"],
    maintenanceHistory: 12
  },
  {
    id: "AST002",
    name: "Elevator #1",
    category: "Elevator",
    type: "Passenger Elevator",
    location: "Building A - Main",
    status: "operational",
    condition: "good",
    manufacturer: "Otis",
    model: "Gen2",
    serialNumber: "OTIS-2019-34521",
    purchaseDate: "2019-06-20",
    purchasePrice: 125000,
    warrantyExpiry: "2024-06-20",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-01-01",
    assignedTo: "Otis Maintenance Co.",
    criticality: "critical",
    documents: ["Inspection Certificate", "Maintenance Contract"],
    maintenanceHistory: 24
  },
  {
    id: "AST003",
    name: "Backup Generator",
    category: "Electrical",
    type: "Diesel Generator",
    location: "Building A - Basement",
    status: "operational",
    condition: "fair",
    manufacturer: "Caterpillar",
    model: "C15",
    serialNumber: "CAT-2020-56789",
    purchaseDate: "2020-01-10",
    purchasePrice: 85000,
    warrantyExpiry: "2025-01-10",
    lastMaintenance: "2024-10-20",
    nextMaintenance: "2025-01-20",
    assignedTo: "Chris Johnson",
    criticality: "critical",
    documents: ["Operation Manual", "Fuel Log"],
    maintenanceHistory: 8
  },
  {
    id: "AST004",
    name: "Fire Suppression System",
    category: "Safety",
    type: "Sprinkler System",
    location: "Building A - All Floors",
    status: "operational",
    condition: "good",
    manufacturer: "Tyco",
    model: "TY-FRB",
    serialNumber: "TYCO-2018-12345",
    purchaseDate: "2018-09-01",
    purchasePrice: 65000,
    warrantyExpiry: "2023-09-01",
    lastMaintenance: "2024-09-01",
    nextMaintenance: "2025-03-01",
    assignedTo: "FireSafe Services",
    criticality: "critical",
    documents: ["Inspection Report", "Compliance Certificate"],
    maintenanceHistory: 12
  },
  {
    id: "AST005",
    name: "Server Rack #1",
    category: "IT Equipment",
    type: "Server Infrastructure",
    location: "Building A - Server Room",
    status: "operational",
    condition: "good",
    manufacturer: "Dell",
    model: "PowerEdge R740",
    serialNumber: "DELL-2022-98765",
    purchaseDate: "2022-05-15",
    purchasePrice: 35000,
    warrantyExpiry: "2027-05-15",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-02-01",
    assignedTo: "IT Department",
    criticality: "critical",
    documents: ["Hardware Specs", "Network Diagram"],
    maintenanceHistory: 4
  },
  {
    id: "AST006",
    name: "Company Vehicle - Van #1",
    category: "Vehicle",
    type: "Delivery Van",
    location: "Parking Lot B",
    status: "operational",
    condition: "good",
    manufacturer: "Ford",
    model: "Transit 250",
    serialNumber: "1FTYR2CM5KKA12345",
    purchaseDate: "2020-08-10",
    purchasePrice: 38000,
    warrantyExpiry: "2023-08-10",
    lastMaintenance: "2024-11-25",
    nextMaintenance: "2025-02-25",
    assignedTo: "Operations",
    criticality: "medium",
    documents: ["Registration", "Insurance", "Service Records"],
    maintenanceHistory: 15
  },
  {
    id: "AST007",
    name: "Conference Room AV System",
    category: "AV Equipment",
    type: "Audio/Video System",
    location: "Building A - Conference Room A",
    status: "needs-repair",
    condition: "poor",
    manufacturer: "Crestron",
    model: "Flex UC-B160",
    serialNumber: "CRES-2021-45678",
    purchaseDate: "2021-07-20",
    purchasePrice: 12000,
    warrantyExpiry: "2024-07-20",
    lastMaintenance: "2024-08-15",
    nextMaintenance: "2024-12-15",
    assignedTo: "IT Department",
    criticality: "low",
    documents: ["User Manual"],
    maintenanceHistory: 3
  },
  {
    id: "AST008",
    name: "Industrial Printer",
    category: "Office Equipment",
    type: "Production Printer",
    location: "Building B - Print Room",
    status: "operational",
    condition: "good",
    manufacturer: "Xerox",
    model: "PrimeLink C9070",
    serialNumber: "XRX-2022-67890",
    purchaseDate: "2022-02-28",
    purchasePrice: 28000,
    warrantyExpiry: "2025-02-28",
    lastMaintenance: "2024-12-10",
    nextMaintenance: "2025-03-10",
    assignedTo: "Xerox Support",
    criticality: "medium",
    documents: ["Service Agreement", "Toner Specs"],
    maintenanceHistory: 6
  },
  {
    id: "AST009",
    name: "Security Camera System",
    category: "Security",
    type: "CCTV System",
    location: "Building A - All Areas",
    status: "operational",
    condition: "good",
    manufacturer: "Hikvision",
    model: "DS-7600NI-K2",
    serialNumber: "HIK-2021-11223",
    purchaseDate: "2021-04-15",
    purchasePrice: 15000,
    warrantyExpiry: "2024-04-15",
    lastMaintenance: "2024-10-15",
    nextMaintenance: "2025-01-15",
    assignedTo: "Security Team",
    criticality: "high",
    documents: ["Camera Map", "NVR Manual"],
    maintenanceHistory: 7
  },
  {
    id: "AST010",
    name: "Water Heater - Building A",
    category: "Plumbing",
    type: "Commercial Water Heater",
    location: "Building A - Basement",
    status: "under-maintenance",
    condition: "fair",
    manufacturer: "Rheem",
    model: "G100-200",
    serialNumber: "RHM-2019-33445",
    purchaseDate: "2019-11-20",
    purchasePrice: 8500,
    warrantyExpiry: "2024-11-20",
    lastMaintenance: "2024-12-18",
    nextMaintenance: "2025-06-18",
    assignedTo: "ABC Plumbing",
    criticality: "medium",
    documents: ["Installation Guide"],
    maintenanceHistory: 10
  }
];

// Asset Categories
export interface AssetCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: string;
}

export const assetCategories: AssetCategory[] = [
  { id: "hvac", name: "HVAC", count: 1, icon: "Wind", color: "#6366f1" },
  { id: "elevator", name: "Elevator", count: 1, icon: "ArrowUpDown", color: "#8b5cf6" },
  { id: "electrical", name: "Electrical", count: 1, icon: "Zap", color: "#f59e0b" },
  { id: "safety", name: "Safety", count: 1, icon: "ShieldCheck", color: "#ef4444" },
  { id: "it", name: "IT Equipment", count: 1, icon: "Server", color: "#10b981" },
  { id: "vehicle", name: "Vehicle", count: 1, icon: "Truck", color: "#3b82f6" },
  { id: "av", name: "AV Equipment", count: 1, icon: "Monitor", color: "#ec4899" },
  { id: "office", name: "Office Equipment", count: 1, icon: "Printer", color: "#64748b" },
  { id: "security", name: "Security", count: 1, icon: "Camera", color: "#14b8a6" },
  { id: "plumbing", name: "Plumbing", count: 1, icon: "Droplet", color: "#0ea5e9" }
];

// Work Order Types
export interface WorkOrderPart {
  name: string;
  quantity: number;
  cost: number;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  asset: string;
  assetId: string;
  type: 'preventive' | 'corrective' | 'inspection';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'pending-parts' | 'completed' | 'cancelled';
  assignedTo: string;
  requestedBy: string;
  createdAt: string;
  dueDate: string;
  startedAt: string | null;
  completedAt: string | null;
  estimatedHours: number;
  actualHours: number | null;
  parts: WorkOrderPart[];
  laborCost: number;
  notes: string;
}

export const workOrders: WorkOrder[] = [
  {
    id: "WO001",
    title: "HVAC Filter Replacement",
    description: "Replace all air filters in Building A HVAC system. Quarterly maintenance.",
    asset: "HVAC System - Building A",
    assetId: "AST001",
    type: "preventive",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Chris Johnson",
    requestedBy: "System (Scheduled)",
    createdAt: "2024-12-18 08:00:00",
    dueDate: "2024-12-22",
    startedAt: "2024-12-19 09:00:00",
    completedAt: null,
    estimatedHours: 4,
    actualHours: null,
    parts: [
      { name: "Air Filter 20x25", quantity: 12, cost: 180 }
    ],
    laborCost: 200,
    notes: "Check belt tension while replacing filters"
  },
  {
    id: "WO002",
    title: "Elevator Annual Inspection",
    description: "Annual safety inspection and certification for Elevator #1.",
    asset: "Elevator #1",
    assetId: "AST002",
    type: "inspection",
    priority: "high",
    status: "scheduled",
    assignedTo: "Otis Maintenance Co.",
    requestedBy: "System (Scheduled)",
    createdAt: "2024-12-15 10:00:00",
    dueDate: "2024-12-28",
    startedAt: null,
    completedAt: null,
    estimatedHours: 8,
    actualHours: null,
    parts: [],
    laborCost: 1500,
    notes: "Coordinate with building management for elevator shutdown"
  },
  {
    id: "WO003",
    title: "AV System Repair - Conference Room A",
    description: "Diagnose and repair audio issues in conference room AV system. Users reporting no sound from speakers.",
    asset: "Conference Room AV System",
    assetId: "AST007",
    type: "corrective",
    priority: "high",
    status: "in-progress",
    assignedTo: "IT Department",
    requestedBy: "Emily Chen",
    createdAt: "2024-12-19 14:30:00",
    dueDate: "2024-12-21",
    startedAt: "2024-12-20 09:00:00",
    completedAt: null,
    estimatedHours: 3,
    actualHours: null,
    parts: [
      { name: "Audio Cable HDMI", quantity: 2, cost: 45 }
    ],
    laborCost: 150,
    notes: "May need to replace amplifier if cables are not the issue"
  },
  {
    id: "WO004",
    title: "Generator Load Test",
    description: "Monthly load test for backup generator. Ensure proper operation under load.",
    asset: "Backup Generator",
    assetId: "AST003",
    type: "preventive",
    priority: "medium",
    status: "completed",
    assignedTo: "Chris Johnson",
    requestedBy: "System (Scheduled)",
    createdAt: "2024-12-10 08:00:00",
    dueDate: "2024-12-15",
    startedAt: "2024-12-12 07:00:00",
    completedAt: "2024-12-12 10:30:00",
    estimatedHours: 4,
    actualHours: 3.5,
    parts: [
      { name: "Diesel Fuel", quantity: 50, cost: 175 }
    ],
    laborCost: 175,
    notes: "Generator performed well. Fuel consumption within normal range."
  },
  {
    id: "WO005",
    title: "Water Heater Repair",
    description: "Investigate and repair water heater. Building A reporting lukewarm water.",
    asset: "Water Heater - Building A",
    assetId: "AST010",
    type: "corrective",
    priority: "high",
    status: "in-progress",
    assignedTo: "ABC Plumbing",
    requestedBy: "Facilities",
    createdAt: "2024-12-17 11:00:00",
    dueDate: "2024-12-20",
    startedAt: "2024-12-18 08:00:00",
    completedAt: null,
    estimatedHours: 6,
    actualHours: null,
    parts: [
      { name: "Heating Element", quantity: 1, cost: 350 },
      { name: "Thermostat", quantity: 1, cost: 125 }
    ],
    laborCost: 400,
    notes: "Heating element showing signs of failure. Replacing as preventive measure."
  },
  {
    id: "WO006",
    title: "Vehicle #1 Oil Change",
    description: "Regular oil change and fluid check for company van.",
    asset: "Company Vehicle - Van #1",
    assetId: "AST006",
    type: "preventive",
    priority: "low",
    status: "completed",
    assignedTo: "Fleet Services",
    requestedBy: "System (Scheduled)",
    createdAt: "2024-12-05 09:00:00",
    dueDate: "2024-12-10",
    startedAt: "2024-12-08 10:00:00",
    completedAt: "2024-12-08 11:30:00",
    estimatedHours: 2,
    actualHours: 1.5,
    parts: [
      { name: "Motor Oil 5W-30", quantity: 6, cost: 48 },
      { name: "Oil Filter", quantity: 1, cost: 12 }
    ],
    laborCost: 45,
    notes: "All fluids topped off. Tire pressure adjusted."
  },
  {
    id: "WO007",
    title: "Fire System Annual Test",
    description: "Annual fire suppression system testing and inspection.",
    asset: "Fire Suppression System",
    assetId: "AST004",
    type: "inspection",
    priority: "critical",
    status: "scheduled",
    assignedTo: "FireSafe Services",
    requestedBy: "System (Scheduled)",
    createdAt: "2024-12-20 08:00:00",
    dueDate: "2025-01-15",
    startedAt: null,
    completedAt: null,
    estimatedHours: 12,
    actualHours: null,
    parts: [],
    laborCost: 2500,
    notes: "Coordinate with fire department for inspection certificate"
  },
  {
    id: "WO008",
    title: "Server Room UPS Battery Replacement",
    description: "Replace UPS batteries in server room. Batteries showing low capacity.",
    asset: "Server Rack #1",
    assetId: "AST005",
    type: "preventive",
    priority: "high",
    status: "pending-parts",
    assignedTo: "IT Department",
    requestedBy: "Robert Taylor",
    createdAt: "2024-12-16 15:00:00",
    dueDate: "2024-12-27",
    startedAt: null,
    completedAt: null,
    estimatedHours: 3,
    actualHours: null,
    parts: [
      { name: "UPS Battery Pack", quantity: 4, cost: 800 }
    ],
    laborCost: 150,
    notes: "Batteries on order. Expected delivery Dec 24."
  }
];

// Work Order Statuses
export interface WorkOrderStatus {
  id: string;
  name: string;
  color: string;
}

export const workOrderStatuses: WorkOrderStatus[] = [
  { id: "scheduled", name: "Scheduled", color: "#6366f1" },
  { id: "in-progress", name: "In Progress", color: "#f59e0b" },
  { id: "pending-parts", name: "Pending Parts", color: "#8b5cf6" },
  { id: "completed", name: "Completed", color: "#10b981" },
  { id: "cancelled", name: "Cancelled", color: "#64748b" }
];

// Preventive Maintenance Schedules
export interface PreventiveSchedule {
  id: string;
  name: string;
  asset: string;
  assetId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  lastCompleted: string;
  nextDue: string;
  assignedTo: string;
  estimatedHours: number;
  checklist: string[];
  status: 'active' | 'paused';
}

export const preventiveSchedules: PreventiveSchedule[] = [
  {
    id: "PM001",
    name: "HVAC Quarterly Maintenance",
    asset: "HVAC System - Building A",
    assetId: "AST001",
    frequency: "quarterly",
    lastCompleted: "2024-11-15",
    nextDue: "2025-02-15",
    assignedTo: "Chris Johnson",
    estimatedHours: 4,
    checklist: ["Replace filters", "Check refrigerant levels", "Clean coils", "Test thermostat", "Inspect belts"],
    status: "active"
  },
  {
    id: "PM002",
    name: "Elevator Monthly Inspection",
    asset: "Elevator #1",
    assetId: "AST002",
    frequency: "monthly",
    lastCompleted: "2024-12-01",
    nextDue: "2025-01-01",
    assignedTo: "Otis Maintenance Co.",
    estimatedHours: 2,
    checklist: ["Test emergency phone", "Check door operation", "Inspect cables", "Test safety features"],
    status: "active"
  },
  {
    id: "PM003",
    name: "Generator Monthly Test",
    asset: "Backup Generator",
    assetId: "AST003",
    frequency: "monthly",
    lastCompleted: "2024-12-12",
    nextDue: "2025-01-12",
    assignedTo: "Chris Johnson",
    estimatedHours: 4,
    checklist: ["Load test", "Check fuel level", "Inspect batteries", "Test transfer switch", "Check oil level"],
    status: "active"
  },
  {
    id: "PM004",
    name: "Fire System Semi-Annual Test",
    asset: "Fire Suppression System",
    assetId: "AST004",
    frequency: "semi-annual",
    lastCompleted: "2024-09-01",
    nextDue: "2025-03-01",
    assignedTo: "FireSafe Services",
    estimatedHours: 6,
    checklist: ["Flow test", "Alarm test", "Inspect sprinkler heads", "Check water pressure", "Verify signage"],
    status: "active"
  },
  {
    id: "PM005",
    name: "Vehicle Quarterly Service",
    asset: "Company Vehicle - Van #1",
    assetId: "AST006",
    frequency: "quarterly",
    lastCompleted: "2024-11-25",
    nextDue: "2025-02-25",
    assignedTo: "Fleet Services",
    estimatedHours: 3,
    checklist: ["Oil change", "Tire rotation", "Brake inspection", "Fluid check", "Filter replacement"],
    status: "active"
  },
  {
    id: "PM006",
    name: "Server Room Quarterly Check",
    asset: "Server Rack #1",
    assetId: "AST005",
    frequency: "quarterly",
    lastCompleted: "2024-11-01",
    nextDue: "2025-02-01",
    assignedTo: "IT Department",
    estimatedHours: 4,
    checklist: ["UPS battery test", "Clean air filters", "Check temperatures", "Verify backups", "Cable management"],
    status: "active"
  }
];

// Maintenance Requests
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'assigned' | 'converted' | 'closed';
  requestedBy: string;
  requestedAt: string;
  assignedTo: string | null;
  workOrderId: string | null;
}

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "REQ001",
    title: "Office AC not cooling properly",
    description: "The air conditioning in the 2nd floor east wing is not cooling effectively. Temperature is consistently 5 degrees above setpoint.",
    location: "Building A - 2nd Floor East",
    category: "HVAC",
    priority: "medium",
    status: "open",
    requestedBy: "Emily Chen",
    requestedAt: "2024-12-20 09:15:00",
    assignedTo: null,
    workOrderId: null
  },
  {
    id: "REQ002",
    title: "Bathroom faucet leaking",
    description: "Men's bathroom on 1st floor has a leaking faucet. Water continuously dripping.",
    location: "Building A - 1st Floor Restroom",
    category: "Plumbing",
    priority: "low",
    status: "assigned",
    requestedBy: "Michael Roberts",
    requestedAt: "2024-12-19 14:30:00",
    assignedTo: "ABC Plumbing",
    workOrderId: null
  },
  {
    id: "REQ003",
    title: "Parking lot light out",
    description: "Light pole #7 in parking lot Zone A is not working. Safety concern for evening hours.",
    location: "Parking Lot - Zone A",
    category: "Electrical",
    priority: "high",
    status: "converted",
    requestedBy: "Security Team",
    requestedAt: "2024-12-18 17:00:00",
    assignedTo: "Chris Johnson",
    workOrderId: "WO009"
  },
  {
    id: "REQ004",
    title: "Elevator making strange noise",
    description: "Elevator #1 making grinding noise during descent. Passengers have reported this.",
    location: "Building A - Main Elevator",
    category: "Elevator",
    priority: "high",
    status: "open",
    requestedBy: "Reception",
    requestedAt: "2024-12-20 10:45:00",
    assignedTo: null,
    workOrderId: null
  },
  {
    id: "REQ005",
    title: "Printer paper jam frequent",
    description: "Industrial printer in print room is jamming frequently. Needs service.",
    location: "Building B - Print Room",
    category: "Office Equipment",
    priority: "medium",
    status: "assigned",
    requestedBy: "Admin Team",
    requestedAt: "2024-12-19 11:00:00",
    assignedTo: "Xerox Support",
    workOrderId: null
  }
];

// Vendors
export interface Vendor {
  id: string;
  name: string;
  type: 'Service Provider' | 'Supplier';
  specialty: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string | null;
  contractEnd: string | null;
  contractValue: number | null;
  rating: number;
  status: 'active' | 'expiring' | 'expired';
  servicesProvided: string[];
  responseTime: string;
  assetsServiced: number | null;
}

export const vendors: Vendor[] = [
  {
    id: "VND001",
    name: "Otis Maintenance Co.",
    type: "Service Provider",
    specialty: "Elevator Maintenance",
    contact: "Robert Mills",
    email: "rmills@otis.com",
    phone: "+1 (555) 100-1001",
    address: "456 Industrial Ave, New York, NY",
    contractStart: "2024-01-01",
    contractEnd: "2025-12-31",
    contractValue: 48000,
    rating: 4.8,
    status: "active",
    servicesProvided: ["Monthly inspections", "Emergency repairs", "Annual certification"],
    responseTime: "4 hours",
    assetsServiced: 1
  },
  {
    id: "VND002",
    name: "ABC Plumbing",
    type: "Service Provider",
    specialty: "Plumbing Services",
    contact: "Maria Santos",
    email: "maria@abcplumbing.com",
    phone: "+1 (555) 200-2002",
    address: "789 Trade St, New York, NY",
    contractStart: "2024-06-01",
    contractEnd: "2025-05-31",
    contractValue: 24000,
    rating: 4.5,
    status: "active",
    servicesProvided: ["Repairs", "Installations", "Emergency services"],
    responseTime: "2 hours",
    assetsServiced: 2
  },
  {
    id: "VND003",
    name: "FireSafe Services",
    type: "Service Provider",
    specialty: "Fire Safety Systems",
    contact: "James Wilson",
    email: "jwilson@firesafe.com",
    phone: "+1 (555) 300-3003",
    address: "321 Safety Blvd, New York, NY",
    contractStart: "2024-03-01",
    contractEnd: "2026-02-28",
    contractValue: 36000,
    rating: 4.9,
    status: "active",
    servicesProvided: ["Inspections", "Testing", "Certification", "Repairs"],
    responseTime: "24 hours",
    assetsServiced: 1
  },
  {
    id: "VND004",
    name: "Xerox Support",
    type: "Service Provider",
    specialty: "Office Equipment",
    contact: "Tech Support",
    email: "support@xerox.com",
    phone: "+1 (800) 275-9376",
    address: "Corporate Service Center",
    contractStart: "2022-02-28",
    contractEnd: "2025-02-28",
    contractValue: 8400,
    rating: 4.2,
    status: "active",
    servicesProvided: ["Maintenance", "Repairs", "Toner supply"],
    responseTime: "8 hours",
    assetsServiced: 1
  },
  {
    id: "VND005",
    name: "Fleet Services Inc.",
    type: "Service Provider",
    specialty: "Vehicle Maintenance",
    contact: "Tom Bradley",
    email: "service@fleetservices.com",
    phone: "+1 (555) 400-4004",
    address: "555 Auto Row, New York, NY",
    contractStart: "2024-01-01",
    contractEnd: "2024-12-31",
    contractValue: 12000,
    rating: 4.6,
    status: "expiring",
    servicesProvided: ["Oil changes", "Repairs", "Inspections", "Tire services"],
    responseTime: "Same day",
    assetsServiced: 1
  },
  {
    id: "VND006",
    name: "Industrial Parts Supply",
    type: "Supplier",
    specialty: "HVAC & Mechanical Parts",
    contact: "Linda Chen",
    email: "orders@indparts.com",
    phone: "+1 (555) 500-5005",
    address: "999 Warehouse Dr, New Jersey",
    contractStart: null,
    contractEnd: null,
    contractValue: null,
    rating: 4.4,
    status: "active",
    servicesProvided: ["Parts supply", "Same-day delivery"],
    responseTime: "Same day",
    assetsServiced: null
  }
];

// Spare Parts Inventory
export interface SparePart {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  unitCost: number;
  location: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export const sparePartsInventory: SparePart[] = [
  { id: "PRT001", name: "Air Filter 20x25", category: "HVAC", sku: "AF-20-25", quantity: 24, minQuantity: 12, unitCost: 15, location: "Storage Room A", lastRestocked: "2024-12-01", status: "in-stock" },
  { id: "PRT002", name: "Air Filter 16x20", category: "HVAC", sku: "AF-16-20", quantity: 18, minQuantity: 10, unitCost: 12, location: "Storage Room A", lastRestocked: "2024-12-01", status: "in-stock" },
  { id: "PRT003", name: "Motor Oil 5W-30 (Quart)", category: "Vehicle", sku: "OIL-5W30-QT", quantity: 24, minQuantity: 12, unitCost: 8, location: "Garage", lastRestocked: "2024-11-15", status: "in-stock" },
  { id: "PRT004", name: "Oil Filter - Ford Transit", category: "Vehicle", sku: "OF-FORD-TR", quantity: 4, minQuantity: 4, unitCost: 12, location: "Garage", lastRestocked: "2024-11-15", status: "low-stock" },
  { id: "PRT005", name: "UPS Battery Pack 12V", category: "IT Equipment", sku: "UPS-BAT-12V", quantity: 0, minQuantity: 4, unitCost: 200, location: "IT Storage", lastRestocked: "2024-06-01", status: "out-of-stock" },
  { id: "PRT006", name: "Fluorescent Tube 4ft", category: "Electrical", sku: "FLUO-4FT", quantity: 36, minQuantity: 20, unitCost: 8, location: "Storage Room B", lastRestocked: "2024-10-15", status: "in-stock" },
  { id: "PRT007", name: "LED Bulb 60W Equivalent", category: "Electrical", sku: "LED-60W", quantity: 48, minQuantity: 24, unitCost: 6, location: "Storage Room B", lastRestocked: "2024-11-01", status: "in-stock" },
  { id: "PRT008", name: "HDMI Cable 6ft", category: "AV Equipment", sku: "HDMI-6FT", quantity: 8, minQuantity: 5, unitCost: 15, location: "IT Storage", lastRestocked: "2024-09-15", status: "in-stock" },
  { id: "PRT009", name: "Faucet Cartridge Universal", category: "Plumbing", sku: "FAU-CART-UN", quantity: 6, minQuantity: 4, unitCost: 25, location: "Storage Room A", lastRestocked: "2024-08-20", status: "in-stock" },
  { id: "PRT010", name: "Thermostat - Honeywell", category: "HVAC", sku: "THERM-HON", quantity: 2, minQuantity: 2, unitCost: 85, location: "Storage Room A", lastRestocked: "2024-07-10", status: "low-stock" }
];

// Maintenance Stats
export interface MaintenanceStats {
  totalAssets: number;
  operationalAssets: number;
  openWorkOrders: number;
  completedThisMonth: number;
  upcomingPM: number;
  overdueRequests: number;
  totalMaintenanceCost: number;
  averageResponseTime: string;
}

export const maintenanceStats: MaintenanceStats = {
  totalAssets: 10,
  operationalAssets: 8,
  openWorkOrders: 5,
  completedThisMonth: 12,
  upcomingPM: 6,
  overdueRequests: 2,
  totalMaintenanceCost: 45600,
  averageResponseTime: "4.2 hours"
};

// Helper functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

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

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    operational: '#10b981',
    'needs-repair': '#f59e0b',
    'under-maintenance': '#6366f1',
    'out-of-service': '#ef4444',
    scheduled: '#6366f1',
    'in-progress': '#f59e0b',
    'pending-parts': '#8b5cf6',
    completed: '#10b981',
    cancelled: '#64748b',
    open: '#f59e0b',
    assigned: '#6366f1',
    converted: '#10b981',
    closed: '#64748b',
    active: '#10b981',
    expiring: '#f59e0b',
    expired: '#ef4444',
    'in-stock': '#10b981',
    'low-stock': '#f59e0b',
    'out-of-stock': '#ef4444',
  };
  return colors[status] || '#64748b';
};

export const getConditionColor = (condition: string): string => {
  const colors: Record<string, string> = {
    good: '#10b981',
    fair: '#f59e0b',
    poor: '#ef4444',
  };
  return colors[condition] || '#64748b';
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    critical: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#64748b',
  };
  return colors[priority] || '#64748b';
};

export const getCategoryColor = (category: string): string => {
  const cat = assetCategories.find(c => c.name === category || c.id === category.toLowerCase());
  return cat?.color || '#64748b';
};
