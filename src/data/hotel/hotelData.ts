import {
  Bed,
  Calendar,
  LogIn,
  Users,
  Sparkles,
  ConciergeBell,
  UtensilsCrossed,
  Wrench,
  CreditCard,
  Gift,
  Coffee,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Hotel sector color
export const HOTEL_COLOR = '#14b8a6';

// Types
export interface Room {
  id: string;
  roomNo: string;
  floor: number;
  type: string;
  category: string;
  bedType: string;
  capacity: number;
  view: string;
  size: number;
  amenities: string[];
  basePrice: number;
  currentPrice: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  lastCleaned: string;
  cleaningStatus: 'clean' | 'dirty' | 'in-progress';
  maintenanceStatus: 'ok' | 'under-repair';
  maintenanceIssue?: string;
  currentGuest?: string;
  checkIn?: string;
  checkOut?: string;
  reservation?: string;
  reservationGuest?: string;
}

export interface Reservation {
  id: string;
  confirmationNo: string;
  guestId: string;
  guestName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomType: string;
  roomId: string | null;
  roomNo: string | null;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  specialRequests: string;
  source: string;
  createdAt: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  idType: string;
  idNo: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  membershipTier: string | null;
  totalStays: number;
  totalSpent: number;
  lastStay: string | null;
  preferences: string[];
  vip: boolean;
  notes: string;
}

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNo: string;
  taskType: string;
  assignedTo: string;
  priority: 'high' | 'normal' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'scheduled';
  scheduledTime: string;
  completedTime: string | null;
  notes: string;
  estimatedDuration: number;
}

export interface RoomServiceOrder {
  id: string;
  roomId: string;
  roomNo: string;
  guestName: string;
  orderTime: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    notes: string;
  }[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  status: 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  deliveryTime: string | null;
  assignedTo: string | null;
}

export interface MaintenanceRequest {
  id: string;
  roomId: string;
  roomNo: string;
  issueType: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  description: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed';
  scheduledDate: string | null;
  estimatedCompletion: string | null;
  completedAt: string | null;
  cost: number;
  notes: string;
}

export interface HotelBilling {
  id: string;
  reservationId: string;
  guestId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomNo: string;
  items: {
    date: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    category: string;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balance: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  paymentMethod: string | null;
}

export interface HotelPackage {
  id: string;
  name: string;
  description: string;
  category: string;
  roomTypes: string[];
  inclusions: string[];
  price: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'scheduled';
  bookings: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  openingHours: string;
  priceRange: string;
  bookable: boolean;
  capacity: number | null;
  status: 'operational' | 'maintenance' | 'closed';
}

// Mock Data
export const rooms: Room[] = [
  {
    id: 'ROOM101',
    roomNo: '101',
    floor: 1,
    type: 'Standard Single',
    category: 'Standard',
    bedType: 'Single',
    capacity: 1,
    view: 'City View',
    size: 25,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar'],
    basePrice: 450,
    currentPrice: 450,
    status: 'available',
    lastCleaned: '2024-01-17 10:00:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'ok',
  },
  {
    id: 'ROOM102',
    roomNo: '102',
    floor: 1,
    type: 'Standard Double',
    category: 'Standard',
    bedType: 'Double',
    capacity: 2,
    view: 'City View',
    size: 30,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe'],
    basePrice: 550,
    currentPrice: 550,
    status: 'occupied',
    lastCleaned: '2024-01-16 11:00:00',
    cleaningStatus: 'dirty',
    maintenanceStatus: 'ok',
    currentGuest: 'Ahmet Yilmaz',
    checkIn: '2024-01-16',
    checkOut: '2024-01-19',
  },
  {
    id: 'ROOM201',
    roomNo: '201',
    floor: 2,
    type: 'Deluxe Double',
    category: 'Deluxe',
    bedType: 'Queen',
    capacity: 2,
    view: 'Sea View',
    size: 35,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe', 'Balcony'],
    basePrice: 750,
    currentPrice: 750,
    status: 'occupied',
    lastCleaned: '2024-01-17 09:00:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'ok',
    currentGuest: 'Fatma Demir',
    checkIn: '2024-01-17',
    checkOut: '2024-01-20',
  },
  {
    id: 'ROOM202',
    roomNo: '202',
    floor: 2,
    type: 'Deluxe Twin',
    category: 'Deluxe',
    bedType: 'Twin',
    capacity: 2,
    view: 'Sea View',
    size: 35,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe', 'Balcony'],
    basePrice: 750,
    currentPrice: 750,
    status: 'reserved',
    lastCleaned: '2024-01-16 14:00:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'ok',
    reservation: 'RES003',
    reservationGuest: 'Can Arslan',
    checkIn: '2024-01-18',
    checkOut: '2024-01-21',
  },
  {
    id: 'ROOM301',
    roomNo: '301',
    floor: 3,
    type: 'Suite',
    category: 'Suite',
    bedType: 'King',
    capacity: 3,
    view: 'Sea View',
    size: 55,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe', 'Balcony', 'Living Room', 'Jacuzzi'],
    basePrice: 1200,
    currentPrice: 1200,
    status: 'maintenance',
    lastCleaned: '2024-01-15 10:00:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'under-repair',
    maintenanceIssue: 'AC repair',
  },
  {
    id: 'ROOM302',
    roomNo: '302',
    floor: 3,
    type: 'Suite',
    category: 'Suite',
    bedType: 'King',
    capacity: 3,
    view: 'Sea View',
    size: 55,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe', 'Balcony', 'Living Room', 'Jacuzzi'],
    basePrice: 1200,
    currentPrice: 1200,
    status: 'available',
    lastCleaned: '2024-01-17 08:00:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'ok',
  },
  {
    id: 'ROOM103',
    roomNo: '103',
    floor: 1,
    type: 'Standard Double',
    category: 'Standard',
    bedType: 'Double',
    capacity: 2,
    view: 'Garden View',
    size: 30,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar'],
    basePrice: 500,
    currentPrice: 500,
    status: 'available',
    lastCleaned: '2024-01-17 11:30:00',
    cleaningStatus: 'clean',
    maintenanceStatus: 'ok',
  },
  {
    id: 'ROOM203',
    roomNo: '203',
    floor: 2,
    type: 'Family Room',
    category: 'Family',
    bedType: 'Double + Twin',
    capacity: 4,
    view: 'Garden View',
    size: 45,
    amenities: ['Wi-Fi', 'TV', 'AC', 'Minibar', 'Safe', 'Extra Bed'],
    basePrice: 900,
    currentPrice: 900,
    status: 'occupied',
    lastCleaned: '2024-01-16 10:00:00',
    cleaningStatus: 'dirty',
    maintenanceStatus: 'ok',
    currentGuest: 'Zeynep Kaya',
    checkIn: '2024-01-16',
    checkOut: '2024-01-20',
  },
];

export const reservations: Reservation[] = [
  {
    id: 'RES001',
    confirmationNo: 'CNF-2024-001',
    guestId: 'GUEST001',
    guestName: 'Ahmet Yilmaz',
    email: 'ahmet@email.com',
    phone: '+974 5555 1111',
    checkInDate: '2024-01-16',
    checkOutDate: '2024-01-19',
    nights: 3,
    adults: 1,
    children: 0,
    roomType: 'Standard Double',
    roomId: 'ROOM102',
    roomNo: '102',
    status: 'checked-in',
    totalAmount: 1650,
    paidAmount: 0,
    paymentStatus: 'pending',
    specialRequests: 'Late check-in',
    source: 'Website',
    createdAt: '2024-01-10 14:30:00',
  },
  {
    id: 'RES002',
    confirmationNo: 'CNF-2024-002',
    guestId: 'GUEST002',
    guestName: 'Fatma Demir',
    email: 'fatma@email.com',
    phone: '+974 5555 2222',
    checkInDate: '2024-01-17',
    checkOutDate: '2024-01-20',
    nights: 3,
    adults: 2,
    children: 0,
    roomType: 'Deluxe Double',
    roomId: 'ROOM201',
    roomNo: '201',
    status: 'checked-in',
    totalAmount: 2250,
    paidAmount: 2250,
    paymentStatus: 'paid',
    specialRequests: 'Sea view room',
    source: 'Phone',
    createdAt: '2024-01-12 10:15:00',
  },
  {
    id: 'RES003',
    confirmationNo: 'CNF-2024-003',
    guestId: 'GUEST003',
    guestName: 'Can Arslan',
    email: 'can@email.com',
    phone: '+974 5555 3333',
    checkInDate: '2024-01-18',
    checkOutDate: '2024-01-21',
    nights: 3,
    adults: 2,
    children: 0,
    roomType: 'Deluxe Twin',
    roomId: 'ROOM202',
    roomNo: '202',
    status: 'confirmed',
    totalAmount: 2250,
    paidAmount: 500,
    paymentStatus: 'partial',
    specialRequests: '',
    source: 'Booking.com',
    createdAt: '2024-01-14 16:45:00',
  },
  {
    id: 'RES004',
    confirmationNo: 'CNF-2024-004',
    guestId: 'GUEST004',
    guestName: 'Zeynep Kaya',
    email: 'zeynep@email.com',
    phone: '+974 5555 4444',
    checkInDate: '2024-01-16',
    checkOutDate: '2024-01-20',
    nights: 4,
    adults: 2,
    children: 2,
    roomType: 'Family Room',
    roomId: 'ROOM203',
    roomNo: '203',
    status: 'checked-in',
    totalAmount: 3600,
    paidAmount: 0,
    paymentStatus: 'pending',
    specialRequests: 'Extra bed for children',
    source: 'Walk-in',
    createdAt: '2024-01-16 08:00:00',
  },
  {
    id: 'RES005',
    confirmationNo: 'CNF-2024-005',
    guestId: 'GUEST005',
    guestName: 'Mehmet Oz',
    email: 'mehmet@email.com',
    phone: '+974 5555 5555',
    checkInDate: '2024-01-20',
    checkOutDate: '2024-01-23',
    nights: 3,
    adults: 2,
    children: 1,
    roomType: 'Suite',
    roomId: null,
    roomNo: null,
    status: 'confirmed',
    totalAmount: 3600,
    paidAmount: 0,
    paymentStatus: 'pending',
    specialRequests: 'Honeymoon package',
    source: 'Email',
    createdAt: '2024-01-15 12:00:00',
  },
];

export const guests: Guest[] = [
  {
    id: 'GUEST001',
    name: 'Ahmet Yilmaz',
    email: 'ahmet@email.com',
    phone: '+974 5555 1111',
    nationality: 'Turkish',
    idType: 'Passport',
    idNo: 'T12345678',
    address: 'Ataturk Cad. No:45 Doha',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    membershipTier: 'Gold',
    totalStays: 8,
    totalSpent: 12500,
    lastStay: '2024-01-16',
    preferences: ['Late check-out', 'Sea view'],
    vip: true,
    notes: 'Regular business traveler',
  },
  {
    id: 'GUEST002',
    name: 'Fatma Demir',
    email: 'fatma@email.com',
    phone: '+974 5555 2222',
    nationality: 'Turkish',
    idType: 'ID Card',
    idNo: '12345678901',
    address: 'Merkez Mah. 12. Sok. Doha',
    dateOfBirth: '1992-07-22',
    gender: 'Female',
    membershipTier: 'Silver',
    totalStays: 3,
    totalSpent: 4800,
    lastStay: '2024-01-17',
    preferences: ['Quiet room'],
    vip: false,
    notes: '',
  },
  {
    id: 'GUEST003',
    name: 'Can Arslan',
    email: 'can@email.com',
    phone: '+974 5555 3333',
    nationality: 'Turkish',
    idType: 'Passport',
    idNo: 'T98765432',
    address: 'Yeni Mah. 25. Cad. Doha',
    dateOfBirth: '1988-11-08',
    gender: 'Male',
    membershipTier: 'Bronze',
    totalStays: 1,
    totalSpent: 0,
    lastStay: null,
    preferences: [],
    vip: false,
    notes: 'First time guest',
  },
  {
    id: 'GUEST004',
    name: 'Zeynep Kaya',
    email: 'zeynep@email.com',
    phone: '+974 5555 4444',
    nationality: 'Turkish',
    idType: 'ID Card',
    idNo: '55566677788',
    address: 'Sahil Cad. 8. Sk. Doha',
    dateOfBirth: '1990-05-30',
    gender: 'Female',
    membershipTier: null,
    totalStays: 1,
    totalSpent: 0,
    lastStay: '2024-01-16',
    preferences: [],
    vip: false,
    notes: '',
  },
  {
    id: 'GUEST005',
    name: 'Mehmet Oz',
    email: 'mehmet@email.com',
    phone: '+974 5555 5555',
    nationality: 'Turkish',
    idType: 'Passport',
    idNo: 'T11223344',
    address: 'Kultur Mah. 3. Cad. Doha',
    dateOfBirth: '1995-09-18',
    gender: 'Male',
    membershipTier: null,
    totalStays: 0,
    totalSpent: 0,
    lastStay: null,
    preferences: [],
    vip: false,
    notes: 'Honeymoon',
  },
];

export const housekeepingTasks: HousekeepingTask[] = [
  {
    id: 'HK001',
    roomId: 'ROOM102',
    roomNo: '102',
    taskType: 'Daily Cleaning',
    assignedTo: 'Ayse Temizlik',
    priority: 'high',
    status: 'pending',
    scheduledTime: '2024-01-17 14:00:00',
    completedTime: null,
    notes: 'Guest checkout at 12:00',
    estimatedDuration: 45,
  },
  {
    id: 'HK002',
    roomId: 'ROOM201',
    roomNo: '201',
    taskType: 'Turn Down Service',
    assignedTo: 'Fatma Servis',
    priority: 'normal',
    status: 'completed',
    scheduledTime: '2024-01-17 19:00:00',
    completedTime: '2024-01-17 19:15:00',
    notes: '',
    estimatedDuration: 15,
  },
  {
    id: 'HK003',
    roomId: 'ROOM203',
    roomNo: '203',
    taskType: 'Daily Cleaning',
    assignedTo: 'Ayse Temizlik',
    priority: 'high',
    status: 'in-progress',
    scheduledTime: '2024-01-17 10:00:00',
    completedTime: null,
    notes: 'Extra towels needed',
    estimatedDuration: 45,
  },
  {
    id: 'HK004',
    roomId: 'ROOM101',
    roomNo: '101',
    taskType: 'Inspection',
    assignedTo: 'Zeynep Supervisor',
    priority: 'normal',
    status: 'completed',
    scheduledTime: '2024-01-17 11:00:00',
    completedTime: '2024-01-17 11:20:00',
    notes: 'All good',
    estimatedDuration: 20,
  },
  {
    id: 'HK005',
    roomId: 'ROOM302',
    roomNo: '302',
    taskType: 'Deep Cleaning',
    assignedTo: 'Ayse Temizlik',
    priority: 'normal',
    status: 'scheduled',
    scheduledTime: '2024-01-18 09:00:00',
    completedTime: null,
    notes: 'Full deep clean required',
    estimatedDuration: 120,
  },
];

export const roomServiceOrders: RoomServiceOrder[] = [
  {
    id: 'RS001',
    roomId: 'ROOM102',
    roomNo: '102',
    guestName: 'Ahmet Yilmaz',
    orderTime: '2024-01-17 08:30:00',
    items: [
      { name: 'Breakfast Platter', quantity: 1, price: 85, notes: '' },
      { name: 'Turkish Coffee', quantity: 2, price: 25, notes: 'With sugar' },
    ],
    subtotal: 135,
    serviceCharge: 13.5,
    total: 148.5,
    status: 'delivered',
    deliveryTime: '2024-01-17 08:55:00',
    assignedTo: 'Hasan Servis',
  },
  {
    id: 'RS002',
    roomId: 'ROOM201',
    roomNo: '201',
    guestName: 'Fatma Demir',
    orderTime: '2024-01-17 13:15:00',
    items: [
      { name: 'Club Sandwich', quantity: 2, price: 65, notes: '' },
      { name: 'French Fries', quantity: 2, price: 35, notes: '' },
      { name: 'Cola', quantity: 2, price: 20, notes: 'With ice' },
    ],
    subtotal: 240,
    serviceCharge: 24,
    total: 264,
    status: 'preparing',
    deliveryTime: null,
    assignedTo: 'Can Mutfak',
  },
  {
    id: 'RS003',
    roomId: 'ROOM203',
    roomNo: '203',
    guestName: 'Zeynep Kaya',
    orderTime: '2024-01-17 19:00:00',
    items: [
      { name: 'Grilled Meatballs', quantity: 2, price: 95, notes: '' },
      { name: 'Rice Pilaf', quantity: 2, price: 25, notes: '' },
      { name: 'Shepherd Salad', quantity: 1, price: 45, notes: '' },
    ],
    subtotal: 285,
    serviceCharge: 28.5,
    total: 313.5,
    status: 'confirmed',
    deliveryTime: null,
    assignedTo: null,
  },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'MAINT001',
    roomId: 'ROOM301',
    roomNo: '301',
    issueType: 'AC',
    priority: 'urgent',
    description: 'AC not cooling properly',
    reportedBy: 'Housekeeping',
    reportedAt: '2024-01-15 14:00:00',
    assignedTo: 'Mehmet Teknisyen',
    status: 'in-progress',
    scheduledDate: '2024-01-16',
    estimatedCompletion: '2024-01-18',
    completedAt: null,
    cost: 0,
    notes: 'Spare parts ordered',
  },
  {
    id: 'MAINT002',
    roomId: 'ROOM102',
    roomNo: '102',
    issueType: 'Plumbing',
    priority: 'high',
    description: 'Leaking faucet in bathroom',
    reportedBy: 'Guest',
    reportedAt: '2024-01-17 10:30:00',
    assignedTo: 'Ali Tesisatci',
    status: 'scheduled',
    scheduledDate: '2024-01-17',
    estimatedCompletion: '2024-01-17',
    completedAt: null,
    cost: 0,
    notes: '',
  },
  {
    id: 'MAINT003',
    roomId: 'ROOM203',
    roomNo: '203',
    issueType: 'Electrical',
    priority: 'normal',
    description: 'Bedside lamp not working',
    reportedBy: 'Housekeeping',
    reportedAt: '2024-01-16 16:00:00',
    assignedTo: 'Hasan Elektrikci',
    status: 'completed',
    scheduledDate: '2024-01-16',
    estimatedCompletion: '2024-01-16',
    completedAt: '2024-01-16 17:30:00',
    cost: 25,
    notes: 'Bulb replaced',
  },
  {
    id: 'MAINT004',
    roomId: 'ROOM201',
    roomNo: '201',
    issueType: 'TV',
    priority: 'low',
    description: 'Remote control missing',
    reportedBy: 'Guest',
    reportedAt: '2024-01-17 11:00:00',
    assignedTo: 'Reception',
    status: 'pending',
    scheduledDate: null,
    estimatedCompletion: null,
    completedAt: null,
    cost: 0,
    notes: 'New remote to be provided',
  },
];

export const billings: HotelBilling[] = [
  {
    id: 'BILL001',
    reservationId: 'RES001',
    guestId: 'GUEST001',
    guestName: 'Ahmet Yilmaz',
    checkIn: '2024-01-16',
    checkOut: '2024-01-19',
    roomNo: '102',
    items: [
      { date: '2024-01-16', description: 'Room Charge - Standard Double', quantity: 1, unitPrice: 550, total: 550, category: 'accommodation' },
      { date: '2024-01-17', description: 'Room Charge - Standard Double', quantity: 1, unitPrice: 550, total: 550, category: 'accommodation' },
      { date: '2024-01-18', description: 'Room Charge - Standard Double', quantity: 1, unitPrice: 550, total: 550, category: 'accommodation' },
      { date: '2024-01-17', description: 'Room Service - Breakfast', quantity: 1, unitPrice: 148.5, total: 148.5, category: 'room-service' },
    ],
    subtotal: 1798.5,
    tax: 179.85,
    discount: 0,
    total: 1978.35,
    paidAmount: 0,
    balance: 1978.35,
    paymentStatus: 'pending',
    paymentMethod: null,
  },
  {
    id: 'BILL002',
    reservationId: 'RES002',
    guestId: 'GUEST002',
    guestName: 'Fatma Demir',
    checkIn: '2024-01-17',
    checkOut: '2024-01-20',
    roomNo: '201',
    items: [
      { date: '2024-01-17', description: 'Room Charge - Deluxe Double', quantity: 1, unitPrice: 750, total: 750, category: 'accommodation' },
      { date: '2024-01-18', description: 'Room Charge - Deluxe Double', quantity: 1, unitPrice: 750, total: 750, category: 'accommodation' },
      { date: '2024-01-19', description: 'Room Charge - Deluxe Double', quantity: 1, unitPrice: 750, total: 750, category: 'accommodation' },
    ],
    subtotal: 2250,
    tax: 225,
    discount: 0,
    total: 2475,
    paidAmount: 2475,
    balance: 0,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
  },
];

export const packages: HotelPackage[] = [
  {
    id: 'PKG001',
    name: 'Romantic Getaway',
    description: 'Perfect for couples - includes sea view room, champagne, rose petals, and breakfast',
    category: 'Romance',
    roomTypes: ['Deluxe Double', 'Suite'],
    inclusions: ['Sea view upgrade', 'Champagne on arrival', 'Rose petals decoration', 'Breakfast for 2', 'Late checkout'],
    price: 350,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    bookings: 15,
  },
  {
    id: 'PKG002',
    name: 'Business Traveler',
    description: 'Designed for business guests',
    category: 'Business',
    roomTypes: ['Standard Single', 'Standard Double'],
    inclusions: ['Free Wi-Fi', 'Airport transfer', 'Business center access', 'Express laundry'],
    price: 150,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    bookings: 42,
  },
  {
    id: 'PKG003',
    name: 'Family Fun',
    description: 'Great for families with kids',
    category: 'Family',
    roomTypes: ['Family Room'],
    inclusions: ['Free breakfast for children under 12', 'Welcome gift for kids', 'Pool access', 'Extra bed free'],
    price: 200,
    validFrom: '2024-01-01',
    validTo: '2024-08-31',
    status: 'active',
    bookings: 8,
  },
  {
    id: 'PKG004',
    name: 'Extended Stay',
    description: 'Special rates for long stays (7+ nights)',
    category: 'Long Stay',
    roomTypes: ['All'],
    inclusions: ['15% discount on room rate', 'Free laundry service (2x per week)', 'Complimentary minibar refresh'],
    price: 0,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    bookings: 5,
  },
];

export const amenities: Amenity[] = [
  {
    id: 'AMN001',
    name: 'Spa & Wellness',
    category: 'Wellness',
    description: 'Full-service spa with massage, sauna, and beauty treatments',
    location: 'Ground Floor',
    openingHours: '09:00 - 22:00',
    priceRange: '150 - 500 QAR',
    bookable: true,
    capacity: 8,
    status: 'operational',
  },
  {
    id: 'AMN002',
    name: 'Fitness Center',
    category: 'Fitness',
    description: '24/7 gym with modern equipment',
    location: '2nd Floor',
    openingHours: '24/7',
    priceRange: 'Free for guests',
    bookable: false,
    capacity: null,
    status: 'operational',
  },
  {
    id: 'AMN003',
    name: 'Swimming Pool',
    category: 'Recreation',
    description: 'Outdoor pool with sea view',
    location: 'Rooftop',
    openingHours: '06:00 - 20:00',
    priceRange: 'Free for guests',
    bookable: false,
    capacity: null,
    status: 'operational',
  },
  {
    id: 'AMN004',
    name: 'Restaurant - The Terrace',
    category: 'Dining',
    description: 'Fine dining with international cuisine',
    location: 'Ground Floor',
    openingHours: '07:00 - 23:00',
    priceRange: '50 - 300 QAR',
    bookable: true,
    capacity: 80,
    status: 'operational',
  },
  {
    id: 'AMN005',
    name: 'Meeting Room Alpha',
    category: 'Business',
    description: 'Meeting room for 20 people with AV equipment',
    location: '1st Floor',
    openingHours: '08:00 - 20:00',
    priceRange: '500 QAR/day',
    bookable: true,
    capacity: 20,
    status: 'operational',
  },
  {
    id: 'AMN006',
    name: 'Business Center',
    category: 'Business',
    description: 'Printing, scanning, and internet services',
    location: 'Lobby',
    openingHours: '24/7',
    priceRange: 'Varies',
    bookable: false,
    capacity: null,
    status: 'operational',
  },
];

// Menu items for sidebar
export const hotelMenuItems = [
  {
    id: 'hotel',
    label: 'Rooms',
    icon: Bed,
    path: ROUTES.hotel.rooms,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Reservations',
    icon: Calendar,
    path: ROUTES.hotel.reservations,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Check-in/Check-out',
    icon: LogIn,
    path: ROUTES.hotel.checkin,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Guests',
    icon: Users,
    path: ROUTES.hotel.guests,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Housekeeping',
    icon: Sparkles,
    path: ROUTES.hotel.housekeeping,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Front Desk',
    icon: ConciergeBell,
    path: ROUTES.hotel.frontdesk,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Room Service',
    icon: UtensilsCrossed,
    path: ROUTES.hotel.roomService,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Maintenance',
    icon: Wrench,
    path: ROUTES.hotel.maintenance,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Billing',
    icon: CreditCard,
    path: ROUTES.hotel.billing,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Packages',
    icon: Gift,
    path: ROUTES.hotel.packages,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Amenities',
    icon: Coffee,
    path: ROUTES.hotel.amenities,
    color: HOTEL_COLOR,
  },
  {
    id: 'hotel',
    label: 'Reports',
    icon: BarChart3,
    path: ROUTES.hotel.reports,
    color: HOTEL_COLOR,
  },
];
