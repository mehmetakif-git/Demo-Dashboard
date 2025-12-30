// Access Control Module - Mock Data

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  type: 'indoor' | 'outdoor' | 'ptz';
  resolution: string;
  recording: boolean;
  ipAddress: string;
  lastMaintenance: string;
  installDate: string;
}

export interface Door {
  id: string;
  name: string;
  location: string;
  status: 'locked' | 'unlocked' | 'alarm';
  accessLevel: string;
  lastAccess: string;
  lastAccessBy: string;
  type: 'main' | 'interior' | 'emergency' | 'restricted';
}

export interface AccessCard {
  id: string;
  cardNumber: string;
  holderName: string;
  department: string;
  accessLevel: string;
  status: 'active' | 'inactive' | 'lost' | 'expired';
  issueDate: string;
  expiryDate: string;
  photo: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  cardNumber: string;
  holderName: string;
  door: string;
  action: 'entry' | 'exit' | 'denied' | 'alarm';
  method: 'card' | 'pin' | 'biometric' | 'manual';
  status: 'success' | 'failed';
}

export interface ParkingSpot {
  id: string;
  spotNumber: string;
  zone: string;
  type: 'regular' | 'handicap' | 'ev' | 'reserved' | 'visitor';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  assignedTo?: string;
  vehiclePlate?: string;
  entryTime?: string;
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  hostName: string;
  hostDepartment: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'checked-in' | 'checked-out' | 'expected' | 'cancelled';
  badgeNumber?: string;
  photo: string;
}

export interface AccessLevel {
  id: string;
  name: string;
  description: string;
  doors: string[];
  timeRestriction?: string;
  color: string;
}

export interface Recording {
  id: string;
  cameraId: string;
  cameraName: string;
  startTime: string;
  endTime: string;
  duration: string;
  size: string;
  type: 'continuous' | 'motion' | 'scheduled' | 'manual';
  status: 'available' | 'archived' | 'processing';
}

// Mock Data
export const cameras: Camera[] = [
  {
    id: 'cam-001',
    name: 'Main Entrance',
    location: 'Building A - Ground Floor',
    status: 'online',
    type: 'outdoor',
    resolution: '4K',
    recording: true,
    ipAddress: '192.168.1.101',
    lastMaintenance: '2024-11-15',
    installDate: '2024-01-10',
  },
  {
    id: 'cam-002',
    name: 'Lobby Area',
    location: 'Building A - Ground Floor',
    status: 'online',
    type: 'indoor',
    resolution: '1080p',
    recording: true,
    ipAddress: '192.168.1.102',
    lastMaintenance: '2024-11-20',
    installDate: '2024-01-10',
  },
  {
    id: 'cam-003',
    name: 'Parking Lot A',
    location: 'Outdoor - North',
    status: 'online',
    type: 'ptz',
    resolution: '4K',
    recording: true,
    ipAddress: '192.168.1.103',
    lastMaintenance: '2024-11-18',
    installDate: '2024-02-15',
  },
  {
    id: 'cam-004',
    name: 'Server Room',
    location: 'Building B - Basement',
    status: 'online',
    type: 'indoor',
    resolution: '1080p',
    recording: true,
    ipAddress: '192.168.1.104',
    lastMaintenance: '2024-11-22',
    installDate: '2024-01-10',
  },
  {
    id: 'cam-005',
    name: 'Back Entrance',
    location: 'Building A - Ground Floor',
    status: 'offline',
    type: 'outdoor',
    resolution: '1080p',
    recording: false,
    ipAddress: '192.168.1.105',
    lastMaintenance: '2024-10-05',
    installDate: '2024-01-10',
  },
  {
    id: 'cam-006',
    name: 'Executive Floor',
    location: 'Building A - 5th Floor',
    status: 'online',
    type: 'indoor',
    resolution: '4K',
    recording: true,
    ipAddress: '192.168.1.106',
    lastMaintenance: '2024-11-25',
    installDate: '2024-03-01',
  },
  {
    id: 'cam-007',
    name: 'Warehouse Entry',
    location: 'Building C - Ground Floor',
    status: 'online',
    type: 'outdoor',
    resolution: '1080p',
    recording: true,
    ipAddress: '192.168.1.107',
    lastMaintenance: '2024-11-10',
    installDate: '2024-02-20',
  },
  {
    id: 'cam-008',
    name: 'Conference Room A',
    location: 'Building A - 3rd Floor',
    status: 'maintenance',
    type: 'indoor',
    resolution: '1080p',
    recording: false,
    ipAddress: '192.168.1.108',
    lastMaintenance: '2024-11-28',
    installDate: '2024-01-15',
  },
  {
    id: 'cam-009',
    name: 'Parking Lot B',
    location: 'Outdoor - South',
    status: 'online',
    type: 'ptz',
    resolution: '4K',
    recording: true,
    ipAddress: '192.168.1.109',
    lastMaintenance: '2024-11-12',
    installDate: '2024-02-15',
  },
  {
    id: 'cam-010',
    name: 'Loading Dock',
    location: 'Building C - Rear',
    status: 'online',
    type: 'outdoor',
    resolution: '1080p',
    recording: true,
    ipAddress: '192.168.1.110',
    lastMaintenance: '2024-11-08',
    installDate: '2024-04-01',
  },
  {
    id: 'cam-011',
    name: 'HR Department',
    location: 'Building A - 2nd Floor',
    status: 'online',
    type: 'indoor',
    resolution: '1080p',
    recording: true,
    ipAddress: '192.168.1.111',
    lastMaintenance: '2024-11-14',
    installDate: '2024-01-10',
  },
  {
    id: 'cam-012',
    name: 'Emergency Exit B',
    location: 'Building A - Ground Floor',
    status: 'online',
    type: 'indoor',
    resolution: '720p',
    recording: true,
    ipAddress: '192.168.1.112',
    lastMaintenance: '2024-11-20',
    installDate: '2024-01-10',
  },
];

export const doors: Door[] = [
  {
    id: 'door-001',
    name: 'Main Entrance',
    location: 'Building A - Ground Floor',
    status: 'locked',
    accessLevel: 'All Employees',
    lastAccess: '2024-12-01T08:45:00',
    lastAccessBy: 'John Smith',
    type: 'main',
  },
  {
    id: 'door-002',
    name: 'Server Room',
    location: 'Building B - Basement',
    status: 'locked',
    accessLevel: 'IT Only',
    lastAccess: '2024-12-01T07:30:00',
    lastAccessBy: 'Mike Johnson',
    type: 'restricted',
  },
  {
    id: 'door-003',
    name: 'Executive Suite',
    location: 'Building A - 5th Floor',
    status: 'locked',
    accessLevel: 'Executives',
    lastAccess: '2024-12-01T09:15:00',
    lastAccessBy: 'Sarah Wilson',
    type: 'restricted',
  },
  {
    id: 'door-004',
    name: 'Emergency Exit A',
    location: 'Building A - Ground Floor',
    status: 'locked',
    accessLevel: 'All Employees',
    lastAccess: '2024-11-30T18:00:00',
    lastAccessBy: 'System',
    type: 'emergency',
  },
  {
    id: 'door-005',
    name: 'Warehouse Main',
    location: 'Building C - Ground Floor',
    status: 'unlocked',
    accessLevel: 'Warehouse Staff',
    lastAccess: '2024-12-01T06:00:00',
    lastAccessBy: 'David Brown',
    type: 'main',
  },
  {
    id: 'door-006',
    name: 'HR Office',
    location: 'Building A - 2nd Floor',
    status: 'locked',
    accessLevel: 'HR Department',
    lastAccess: '2024-12-01T08:30:00',
    lastAccessBy: 'Emily Davis',
    type: 'interior',
  },
  {
    id: 'door-007',
    name: 'Finance Department',
    location: 'Building A - 3rd Floor',
    status: 'locked',
    accessLevel: 'Finance Team',
    lastAccess: '2024-12-01T08:50:00',
    lastAccessBy: 'Robert Taylor',
    type: 'interior',
  },
  {
    id: 'door-008',
    name: 'Back Entrance',
    location: 'Building A - Ground Floor',
    status: 'alarm',
    accessLevel: 'Security Only',
    lastAccess: '2024-12-01T02:30:00',
    lastAccessBy: 'Unknown',
    type: 'main',
  },
  {
    id: 'door-009',
    name: 'Research Lab',
    location: 'Building B - 2nd Floor',
    status: 'locked',
    accessLevel: 'R&D Team',
    lastAccess: '2024-12-01T09:00:00',
    lastAccessBy: 'Lisa Anderson',
    type: 'restricted',
  },
  {
    id: 'door-010',
    name: 'Parking Garage',
    location: 'Building A - Basement',
    status: 'unlocked',
    accessLevel: 'All Employees',
    lastAccess: '2024-12-01T08:55:00',
    lastAccessBy: 'James Wilson',
    type: 'main',
  },
];

export const accessCards: AccessCard[] = [
  {
    id: 'card-001',
    cardNumber: 'EMP-2024-001',
    holderName: 'John Smith',
    department: 'Engineering',
    accessLevel: 'Level 3',
    status: 'active',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    photo: '',
  },
  {
    id: 'card-002',
    cardNumber: 'EMP-2024-002',
    holderName: 'Sarah Wilson',
    department: 'Executive',
    accessLevel: 'Level 5',
    status: 'active',
    issueDate: '2024-01-10',
    expiryDate: '2025-01-10',
    photo: '',
  },
  {
    id: 'card-003',
    cardNumber: 'EMP-2024-003',
    holderName: 'Mike Johnson',
    department: 'IT',
    accessLevel: 'Level 4',
    status: 'active',
    issueDate: '2024-02-01',
    expiryDate: '2025-02-01',
    photo: '',
  },
  {
    id: 'card-004',
    cardNumber: 'EMP-2024-004',
    holderName: 'Emily Davis',
    department: 'HR',
    accessLevel: 'Level 3',
    status: 'active',
    issueDate: '2024-01-20',
    expiryDate: '2025-01-20',
    photo: '',
  },
  {
    id: 'card-005',
    cardNumber: 'EMP-2024-005',
    holderName: 'David Brown',
    department: 'Warehouse',
    accessLevel: 'Level 2',
    status: 'active',
    issueDate: '2024-03-01',
    expiryDate: '2025-03-01',
    photo: '',
  },
  {
    id: 'card-006',
    cardNumber: 'EMP-2024-006',
    holderName: 'Robert Taylor',
    department: 'Finance',
    accessLevel: 'Level 3',
    status: 'active',
    issueDate: '2024-02-15',
    expiryDate: '2025-02-15',
    photo: '',
  },
  {
    id: 'card-007',
    cardNumber: 'EMP-2024-007',
    holderName: 'Lisa Anderson',
    department: 'R&D',
    accessLevel: 'Level 4',
    status: 'active',
    issueDate: '2024-01-25',
    expiryDate: '2025-01-25',
    photo: '',
  },
  {
    id: 'card-008',
    cardNumber: 'EMP-2023-015',
    holderName: 'James Wilson',
    department: 'Sales',
    accessLevel: 'Level 2',
    status: 'expired',
    issueDate: '2023-06-01',
    expiryDate: '2024-06-01',
    photo: '',
  },
  {
    id: 'card-009',
    cardNumber: 'EMP-2024-008',
    holderName: 'Jennifer Martinez',
    department: 'Marketing',
    accessLevel: 'Level 2',
    status: 'active',
    issueDate: '2024-04-01',
    expiryDate: '2025-04-01',
    photo: '',
  },
  {
    id: 'card-010',
    cardNumber: 'EMP-2024-009',
    holderName: 'Thomas Lee',
    department: 'Security',
    accessLevel: 'Level 5',
    status: 'active',
    issueDate: '2024-01-05',
    expiryDate: '2025-01-05',
    photo: '',
  },
  {
    id: 'card-011',
    cardNumber: 'EMP-2024-010',
    holderName: 'Amanda White',
    department: 'Legal',
    accessLevel: 'Level 3',
    status: 'lost',
    issueDate: '2024-02-20',
    expiryDate: '2025-02-20',
    photo: '',
  },
  {
    id: 'card-012',
    cardNumber: 'EMP-2024-011',
    holderName: 'Christopher Garcia',
    department: 'Operations',
    accessLevel: 'Level 2',
    status: 'inactive',
    issueDate: '2024-03-15',
    expiryDate: '2025-03-15',
    photo: '',
  },
];

export const accessLogs: AccessLog[] = [
  {
    id: 'log-001',
    timestamp: '2024-12-01T09:15:00',
    cardNumber: 'EMP-2024-002',
    holderName: 'Sarah Wilson',
    door: 'Executive Suite',
    action: 'entry',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-002',
    timestamp: '2024-12-01T09:00:00',
    cardNumber: 'EMP-2024-007',
    holderName: 'Lisa Anderson',
    door: 'Research Lab',
    action: 'entry',
    method: 'biometric',
    status: 'success',
  },
  {
    id: 'log-003',
    timestamp: '2024-12-01T08:55:00',
    cardNumber: 'EMP-2023-015',
    holderName: 'James Wilson',
    door: 'Parking Garage',
    action: 'entry',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-004',
    timestamp: '2024-12-01T08:50:00',
    cardNumber: 'EMP-2024-006',
    holderName: 'Robert Taylor',
    door: 'Finance Department',
    action: 'entry',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-005',
    timestamp: '2024-12-01T08:45:00',
    cardNumber: 'EMP-2024-001',
    holderName: 'John Smith',
    door: 'Main Entrance',
    action: 'entry',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-006',
    timestamp: '2024-12-01T08:30:00',
    cardNumber: 'EMP-2024-004',
    holderName: 'Emily Davis',
    door: 'HR Office',
    action: 'entry',
    method: 'pin',
    status: 'success',
  },
  {
    id: 'log-007',
    timestamp: '2024-12-01T07:30:00',
    cardNumber: 'EMP-2024-003',
    holderName: 'Mike Johnson',
    door: 'Server Room',
    action: 'entry',
    method: 'biometric',
    status: 'success',
  },
  {
    id: 'log-008',
    timestamp: '2024-12-01T06:00:00',
    cardNumber: 'EMP-2024-005',
    holderName: 'David Brown',
    door: 'Warehouse Main',
    action: 'entry',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-009',
    timestamp: '2024-12-01T02:30:00',
    cardNumber: 'UNKNOWN',
    holderName: 'Unknown',
    door: 'Back Entrance',
    action: 'alarm',
    method: 'manual',
    status: 'failed',
  },
  {
    id: 'log-010',
    timestamp: '2024-11-30T23:45:00',
    cardNumber: 'EMP-2024-010',
    holderName: 'Thomas Lee',
    door: 'Main Entrance',
    action: 'exit',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-011',
    timestamp: '2024-11-30T22:00:00',
    cardNumber: 'EMP-2024-003',
    holderName: 'Mike Johnson',
    door: 'Server Room',
    action: 'exit',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-012',
    timestamp: '2024-11-30T19:30:00',
    cardNumber: 'EMP-2024-011',
    holderName: 'Amanda White',
    door: 'Executive Suite',
    action: 'denied',
    method: 'card',
    status: 'failed',
  },
  {
    id: 'log-013',
    timestamp: '2024-11-30T18:15:00',
    cardNumber: 'EMP-2024-002',
    holderName: 'Sarah Wilson',
    door: 'Executive Suite',
    action: 'exit',
    method: 'card',
    status: 'success',
  },
  {
    id: 'log-014',
    timestamp: '2024-11-30T18:00:00',
    cardNumber: 'SYSTEM',
    holderName: 'System',
    door: 'Emergency Exit A',
    action: 'entry',
    method: 'manual',
    status: 'success',
  },
  {
    id: 'log-015',
    timestamp: '2024-11-30T17:45:00',
    cardNumber: 'EMP-2024-001',
    holderName: 'John Smith',
    door: 'Main Entrance',
    action: 'exit',
    method: 'card',
    status: 'success',
  },
];

export const parkingSpots: ParkingSpot[] = [
  {
    id: 'park-001',
    spotNumber: 'A-001',
    zone: 'Zone A - Executive',
    type: 'reserved',
    status: 'occupied',
    assignedTo: 'Sarah Wilson',
    vehiclePlate: 'ABC 1234',
    entryTime: '2024-12-01T07:30:00',
  },
  {
    id: 'park-002',
    spotNumber: 'A-002',
    zone: 'Zone A - Executive',
    type: 'reserved',
    status: 'available',
    assignedTo: 'CEO Office',
  },
  {
    id: 'park-003',
    spotNumber: 'A-003',
    zone: 'Zone A - Executive',
    type: 'reserved',
    status: 'occupied',
    assignedTo: 'CFO Office',
    vehiclePlate: 'XYZ 5678',
    entryTime: '2024-12-01T08:00:00',
  },
  {
    id: 'park-004',
    spotNumber: 'B-001',
    zone: 'Zone B - Employee',
    type: 'regular',
    status: 'occupied',
    vehiclePlate: 'DEF 9012',
    entryTime: '2024-12-01T08:15:00',
  },
  {
    id: 'park-005',
    spotNumber: 'B-002',
    zone: 'Zone B - Employee',
    type: 'regular',
    status: 'available',
  },
  {
    id: 'park-006',
    spotNumber: 'B-003',
    zone: 'Zone B - Employee',
    type: 'regular',
    status: 'occupied',
    vehiclePlate: 'GHI 3456',
    entryTime: '2024-12-01T08:30:00',
  },
  {
    id: 'park-007',
    spotNumber: 'B-004',
    zone: 'Zone B - Employee',
    type: 'ev',
    status: 'occupied',
    vehiclePlate: 'JKL 7890',
    entryTime: '2024-12-01T07:45:00',
  },
  {
    id: 'park-008',
    spotNumber: 'B-005',
    zone: 'Zone B - Employee',
    type: 'handicap',
    status: 'available',
  },
  {
    id: 'park-009',
    spotNumber: 'C-001',
    zone: 'Zone C - Visitor',
    type: 'visitor',
    status: 'occupied',
    vehiclePlate: 'MNO 1234',
    entryTime: '2024-12-01T09:00:00',
  },
  {
    id: 'park-010',
    spotNumber: 'C-002',
    zone: 'Zone C - Visitor',
    type: 'visitor',
    status: 'available',
  },
  {
    id: 'park-011',
    spotNumber: 'C-003',
    zone: 'Zone C - Visitor',
    type: 'visitor',
    status: 'available',
  },
  {
    id: 'park-012',
    spotNumber: 'C-004',
    zone: 'Zone C - Visitor',
    type: 'visitor',
    status: 'maintenance',
  },
  {
    id: 'park-013',
    spotNumber: 'B-006',
    zone: 'Zone B - Employee',
    type: 'ev',
    status: 'available',
  },
  {
    id: 'park-014',
    spotNumber: 'B-007',
    zone: 'Zone B - Employee',
    type: 'regular',
    status: 'occupied',
    vehiclePlate: 'PQR 5678',
    entryTime: '2024-12-01T08:45:00',
  },
  {
    id: 'park-015',
    spotNumber: 'B-008',
    zone: 'Zone B - Employee',
    type: 'regular',
    status: 'reserved',
    assignedTo: 'IT Department',
  },
  {
    id: 'park-016',
    spotNumber: 'A-004',
    zone: 'Zone A - Executive',
    type: 'handicap',
    status: 'available',
  },
];

export const visitors: Visitor[] = [
  {
    id: 'vis-001',
    name: 'Michael Roberts',
    company: 'Tech Solutions Inc.',
    hostName: 'John Smith',
    hostDepartment: 'Engineering',
    purpose: 'Technical Meeting',
    checkInTime: '2024-12-01T09:00:00',
    status: 'checked-in',
    badgeNumber: 'V-001',
    photo: '',
  },
  {
    id: 'vis-002',
    name: 'Jessica Thompson',
    company: 'Marketing Pro',
    hostName: 'Jennifer Martinez',
    hostDepartment: 'Marketing',
    purpose: 'Campaign Presentation',
    checkInTime: '2024-12-01T10:00:00',
    status: 'expected',
    photo: '',
  },
  {
    id: 'vis-003',
    name: 'David Chen',
    company: 'Legal Associates',
    hostName: 'Amanda White',
    hostDepartment: 'Legal',
    purpose: 'Contract Review',
    checkInTime: '2024-12-01T08:30:00',
    checkOutTime: '2024-12-01T11:30:00',
    status: 'checked-out',
    badgeNumber: 'V-002',
    photo: '',
  },
  {
    id: 'vis-004',
    name: 'Emma Williams',
    company: 'HR Consulting Group',
    hostName: 'Emily Davis',
    hostDepartment: 'HR',
    purpose: 'Training Session',
    checkInTime: '2024-12-01T09:30:00',
    status: 'checked-in',
    badgeNumber: 'V-003',
    photo: '',
  },
  {
    id: 'vis-005',
    name: 'James Anderson',
    company: 'Financial Advisors Ltd.',
    hostName: 'Robert Taylor',
    hostDepartment: 'Finance',
    purpose: 'Quarterly Review',
    checkInTime: '2024-12-01T14:00:00',
    status: 'expected',
    photo: '',
  },
  {
    id: 'vis-006',
    name: 'Sophia Garcia',
    company: 'Innovation Labs',
    hostName: 'Lisa Anderson',
    hostDepartment: 'R&D',
    purpose: 'Partnership Discussion',
    checkInTime: '2024-11-30T10:00:00',
    checkOutTime: '2024-11-30T16:00:00',
    status: 'checked-out',
    badgeNumber: 'V-098',
    photo: '',
  },
  {
    id: 'vis-007',
    name: 'Oliver Martinez',
    company: 'Security Systems Co.',
    hostName: 'Thomas Lee',
    hostDepartment: 'Security',
    purpose: 'System Maintenance',
    checkInTime: '2024-12-01T07:00:00',
    status: 'checked-in',
    badgeNumber: 'V-004',
    photo: '',
  },
];

export const accessLevels: AccessLevel[] = [
  {
    id: 'level-1',
    name: 'Level 1 - Basic',
    description: 'Main entrance and common areas only',
    doors: ['Main Entrance', 'Parking Garage', 'Cafeteria'],
    color: '#6b7280',
  },
  {
    id: 'level-2',
    name: 'Level 2 - Standard',
    description: 'Basic access plus department floors',
    doors: ['Main Entrance', 'Parking Garage', 'Cafeteria', 'Department Floors'],
    color: '#3b82f6',
  },
  {
    id: 'level-3',
    name: 'Level 3 - Enhanced',
    description: 'Standard access plus meeting rooms',
    doors: ['Main Entrance', 'Parking Garage', 'Cafeteria', 'Department Floors', 'Meeting Rooms'],
    color: '#10b981',
  },
  {
    id: 'level-4',
    name: 'Level 4 - Restricted',
    description: 'Enhanced access plus restricted areas',
    doors: ['All Standard Areas', 'Server Room', 'Research Lab'],
    color: '#f59e0b',
  },
  {
    id: 'level-5',
    name: 'Level 5 - Full Access',
    description: 'Complete access to all areas',
    doors: ['All Areas'],
    timeRestriction: '24/7',
    color: '#ef4444',
  },
];

export const recordings: Recording[] = [
  {
    id: 'rec-001',
    cameraId: 'cam-001',
    cameraName: 'Main Entrance',
    startTime: '2024-12-01T00:00:00',
    endTime: '2024-12-01T06:00:00',
    duration: '6h 00m',
    size: '12.5 GB',
    type: 'continuous',
    status: 'available',
  },
  {
    id: 'rec-002',
    cameraId: 'cam-001',
    cameraName: 'Main Entrance',
    startTime: '2024-12-01T06:00:00',
    endTime: '2024-12-01T12:00:00',
    duration: '6h 00m',
    size: '13.2 GB',
    type: 'continuous',
    status: 'available',
  },
  {
    id: 'rec-003',
    cameraId: 'cam-003',
    cameraName: 'Parking Lot A',
    startTime: '2024-12-01T02:30:00',
    endTime: '2024-12-01T02:45:00',
    duration: '15m',
    size: '520 MB',
    type: 'motion',
    status: 'available',
  },
  {
    id: 'rec-004',
    cameraId: 'cam-004',
    cameraName: 'Server Room',
    startTime: '2024-12-01T07:30:00',
    endTime: '2024-12-01T08:00:00',
    duration: '30m',
    size: '980 MB',
    type: 'motion',
    status: 'available',
  },
  {
    id: 'rec-005',
    cameraId: 'cam-006',
    cameraName: 'Executive Floor',
    startTime: '2024-11-30T00:00:00',
    endTime: '2024-11-30T23:59:59',
    duration: '24h 00m',
    size: '48.5 GB',
    type: 'continuous',
    status: 'archived',
  },
  {
    id: 'rec-006',
    cameraId: 'cam-008',
    cameraName: 'Conference Room A',
    startTime: '2024-11-30T14:00:00',
    endTime: '2024-11-30T16:00:00',
    duration: '2h 00m',
    size: '4.2 GB',
    type: 'scheduled',
    status: 'available',
  },
  {
    id: 'rec-007',
    cameraId: 'cam-002',
    cameraName: 'Lobby Area',
    startTime: '2024-12-01T08:00:00',
    endTime: '2024-12-01T09:00:00',
    duration: '1h 00m',
    size: '2.1 GB',
    type: 'manual',
    status: 'processing',
  },
  {
    id: 'rec-008',
    cameraId: 'cam-005',
    cameraName: 'Back Entrance',
    startTime: '2024-12-01T02:25:00',
    endTime: '2024-12-01T02:35:00',
    duration: '10m',
    size: '350 MB',
    type: 'motion',
    status: 'available',
  },
];

// Helper Functions
export const getCamerasByStatus = (status: Camera['status']) =>
  cameras.filter(c => c.status === status);

export const getDoorsByStatus = (status: Door['status']) =>
  doors.filter(d => d.status === status);

export const getCardsByStatus = (status: AccessCard['status']) =>
  accessCards.filter(c => c.status === status);

export const getParkingByZone = (zone: string) =>
  parkingSpots.filter(p => p.zone.includes(zone));

export const getParkingByStatus = (status: ParkingSpot['status']) =>
  parkingSpots.filter(p => p.status === status);

export const getVisitorsByStatus = (status: Visitor['status']) =>
  visitors.filter(v => v.status === status);

export const getRecentLogs = (count: number = 10) =>
  [...accessLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, count);

export const getRecordingsByCamera = (cameraId: string) =>
  recordings.filter(r => r.cameraId === cameraId);

export const getCameraStatusColor = (status: Camera['status']) => {
  switch (status) {
    case 'online': return '#10b981';
    case 'offline': return '#ef4444';
    case 'maintenance': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getDoorStatusColor = (status: Door['status']) => {
  switch (status) {
    case 'locked': return '#10b981';
    case 'unlocked': return '#3b82f6';
    case 'alarm': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getCardStatusColor = (status: AccessCard['status']) => {
  switch (status) {
    case 'active': return '#10b981';
    case 'inactive': return '#6b7280';
    case 'lost': return '#ef4444';
    case 'expired': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getParkingStatusColor = (status: ParkingSpot['status']) => {
  switch (status) {
    case 'available': return '#10b981';
    case 'occupied': return '#ef4444';
    case 'reserved': return '#3b82f6';
    case 'maintenance': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getVisitorStatusColor = (status: Visitor['status']) => {
  switch (status) {
    case 'checked-in': return '#10b981';
    case 'checked-out': return '#6b7280';
    case 'expected': return '#3b82f6';
    case 'cancelled': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getLogActionColor = (action: AccessLog['action']) => {
  switch (action) {
    case 'entry': return '#10b981';
    case 'exit': return '#3b82f6';
    case 'denied': return '#f59e0b';
    case 'alarm': return '#ef4444';
    default: return '#6b7280';
  }
};
