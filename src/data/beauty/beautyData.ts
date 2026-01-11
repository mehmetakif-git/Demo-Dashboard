import {
  Calendar,
  Users,
  Scissors,
  Package,
  CreditCard,
  Gift,
  Star,
} from 'lucide-react';
import type { MenuItem } from '@/types';

// Types
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface BeautyService {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  description: string;
  popularityScore: number;
  status: 'active' | 'inactive';
  stylists: string[];
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specializations: string[];
  email: string;
  phone: string;
  image: string | null;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  bio: string;
  workingHours: {
    monday: WorkingHours | null;
    tuesday: WorkingHours | null;
    wednesday: WorkingHours | null;
    thursday: WorkingHours | null;
    friday: WorkingHours | null;
    saturday: WorkingHours | null;
    sunday: WorkingHours | null;
  };
  status: 'available' | 'busy' | 'off';
  commissionRate: number;
  monthlySales: number;
  appointmentsToday: number;
}

export interface BeautyClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  vipStatus: boolean;
  membershipId: string | null;
  preferredStylist: string | null;
  notes: string;
  allergies: string[];
  hairType: string;
  skinType: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: string;
  upcomingAppointment: string | null;
  createdAt: string;
  tags: string[];
}

export interface AppointmentService {
  serviceId: string;
  name: string;
  price: number;
  duration: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  stylistId: string;
  stylistName: string;
  services: AppointmentService[];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  totalPrice: number;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  reminderSent: boolean;
}

export interface AppointmentStatus {
  id: string;
  name: string;
  color: string;
}

export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  price: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  description: string;
  status: 'active' | 'low-stock' | 'out-of-stock';
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  regularPrice: number;
  packagePrice: number;
  savings: number;
  validityDays: number;
  popular: boolean;
  status: 'active' | 'inactive';
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  benefits: string[];
  color: string;
}

export interface Membership {
  id: string;
  clientId: string;
  clientName: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  totalSavings: number;
}

export interface GiftCardUsage {
  date: string;
  amount: number;
  service: string;
}

export interface GiftCard {
  id: string;
  code: string;
  initialValue: number;
  currentBalance: number;
  purchasedBy: string | null;
  purchasedByName: string;
  recipientName: string;
  recipientEmail: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'redeemed' | 'expired';
  usageHistory: GiftCardUsage[];
}

export interface Review {
  id: string;
  clientId: string;
  clientName: string;
  stylistId: string;
  stylistName: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  reply: string | null;
  replyDate: string | null;
  status: 'published' | 'pending-reply' | 'hidden';
}

export interface BeautyStats {
  todayAppointments: number;
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  newClientsThisMonth: number;
  averageRating: number;
  totalReviews: number;
  topServices: { name: string; bookings: number }[];
  topStylists: { name: string; revenue: number; rating: number }[];
}

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  { id: 'hair', name: 'Hair Services', icon: 'Scissors', color: '#8b5cf6' },
  { id: 'nails', name: 'Nail Services', icon: 'Hand', color: '#ec4899' },
  { id: 'skin', name: 'Skin Care', icon: 'Sparkles', color: '#10b981' },
  { id: 'makeup', name: 'Makeup', icon: 'Palette', color: '#f59e0b' },
  { id: 'massage', name: 'Massage & Spa', icon: 'Heart', color: '#0ea5e9' },
  { id: 'waxing', name: 'Waxing', icon: 'Zap', color: '#ef4444' },
];

// Services
export const services: BeautyService[] = [
  {
    id: 'SRV001',
    name: "Women's Haircut",
    category: 'hair',
    duration: 45,
    price: 150,
    description: 'Consultation, wash, cut, and blow dry',
    popularityScore: 95,
    status: 'active',
    stylists: ['STF001', 'STF002', 'STF003'],
  },
  {
    id: 'SRV002',
    name: "Men's Haircut",
    category: 'hair',
    duration: 30,
    price: 80,
    description: 'Classic cut with wash and styling',
    popularityScore: 88,
    status: 'active',
    stylists: ['STF001', 'STF004'],
  },
  {
    id: 'SRV003',
    name: 'Hair Coloring - Full',
    category: 'hair',
    duration: 120,
    price: 350,
    description: 'Full head color with premium products',
    popularityScore: 82,
    status: 'active',
    stylists: ['STF001', 'STF002'],
  },
  {
    id: 'SRV004',
    name: 'Highlights / Balayage',
    category: 'hair',
    duration: 150,
    price: 450,
    description: 'Hand-painted highlights for natural look',
    popularityScore: 90,
    status: 'active',
    stylists: ['STF001', 'STF002'],
  },
  {
    id: 'SRV005',
    name: 'Keratin Treatment',
    category: 'hair',
    duration: 180,
    price: 600,
    description: 'Smoothing treatment for frizz-free hair',
    popularityScore: 75,
    status: 'active',
    stylists: ['STF001', 'STF002'],
  },
  {
    id: 'SRV006',
    name: 'Manicure - Classic',
    category: 'nails',
    duration: 30,
    price: 60,
    description: 'Nail shaping, cuticle care, polish',
    popularityScore: 85,
    status: 'active',
    stylists: ['STF005'],
  },
  {
    id: 'SRV007',
    name: 'Pedicure - Spa',
    category: 'nails',
    duration: 45,
    price: 90,
    description: 'Foot soak, scrub, massage, polish',
    popularityScore: 80,
    status: 'active',
    stylists: ['STF005'],
  },
  {
    id: 'SRV008',
    name: 'Gel Nails - Full Set',
    category: 'nails',
    duration: 60,
    price: 120,
    description: 'Long-lasting gel polish application',
    popularityScore: 92,
    status: 'active',
    stylists: ['STF005'],
  },
  {
    id: 'SRV009',
    name: 'Facial - Deep Cleansing',
    category: 'skin',
    duration: 60,
    price: 180,
    description: 'Deep pore cleansing with extraction',
    popularityScore: 78,
    status: 'active',
    stylists: ['STF006'],
  },
  {
    id: 'SRV010',
    name: 'Facial - Anti-Aging',
    category: 'skin',
    duration: 75,
    price: 250,
    description: 'Premium anti-aging treatment with serum',
    popularityScore: 70,
    status: 'active',
    stylists: ['STF006'],
  },
  {
    id: 'SRV011',
    name: 'Bridal Makeup',
    category: 'makeup',
    duration: 90,
    price: 400,
    description: 'Full bridal makeup with trial session',
    popularityScore: 65,
    status: 'active',
    stylists: ['STF003'],
  },
  {
    id: 'SRV012',
    name: 'Evening Makeup',
    category: 'makeup',
    duration: 45,
    price: 200,
    description: 'Glamorous makeup for special occasions',
    popularityScore: 72,
    status: 'active',
    stylists: ['STF003'],
  },
  {
    id: 'SRV013',
    name: 'Swedish Massage',
    category: 'massage',
    duration: 60,
    price: 200,
    description: 'Relaxing full body massage',
    popularityScore: 85,
    status: 'active',
    stylists: ['STF006'],
  },
  {
    id: 'SRV014',
    name: 'Full Body Waxing',
    category: 'waxing',
    duration: 90,
    price: 300,
    description: 'Complete body hair removal',
    popularityScore: 60,
    status: 'active',
    stylists: ['STF005', 'STF006'],
  },
  {
    id: 'SRV015',
    name: 'Eyebrow Threading',
    category: 'waxing',
    duration: 15,
    price: 40,
    description: 'Precise eyebrow shaping',
    popularityScore: 95,
    status: 'active',
    stylists: ['STF003', 'STF005'],
  },
];

// Staff / Stylists
export const staff: StaffMember[] = [
  {
    id: 'STF001',
    name: 'Maria Santos',
    role: 'Senior Stylist',
    specializations: ['hair', 'coloring'],
    email: 'maria@salon.com',
    phone: '+974 5501 1001',
    image: null,
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 12,
    bio: 'Award-winning colorist with expertise in balayage and creative coloring techniques.',
    workingHours: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '20:00' },
      friday: { start: '09:00', end: '20:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: null,
    },
    status: 'available',
    commissionRate: 40,
    monthlySales: 12500,
    appointmentsToday: 5,
  },
  {
    id: 'STF002',
    name: 'Sophie Chen',
    role: 'Stylist',
    specializations: ['hair', 'treatments'],
    email: 'sophie@salon.com',
    phone: '+974 5501 1002',
    image: null,
    rating: 4.7,
    reviewCount: 89,
    yearsExperience: 6,
    bio: 'Specialized in keratin treatments and hair restoration.',
    workingHours: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: null,
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: null,
    },
    status: 'busy',
    commissionRate: 35,
    monthlySales: 9800,
    appointmentsToday: 4,
  },
  {
    id: 'STF003',
    name: 'Fatima Al-Hassan',
    role: 'Makeup Artist',
    specializations: ['makeup', 'hair'],
    email: 'fatima@salon.com',
    phone: '+974 5501 1003',
    image: null,
    rating: 4.8,
    reviewCount: 156,
    yearsExperience: 8,
    bio: 'Celebrity makeup artist specializing in bridal and editorial looks.',
    workingHours: {
      monday: { start: '11:00', end: '20:00' },
      tuesday: { start: '11:00', end: '20:00' },
      wednesday: { start: '11:00', end: '20:00' },
      thursday: { start: '11:00', end: '20:00' },
      friday: { start: '11:00', end: '20:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: { start: '12:00', end: '18:00' },
    },
    status: 'available',
    commissionRate: 45,
    monthlySales: 15200,
    appointmentsToday: 3,
  },
  {
    id: 'STF004',
    name: 'Ahmed Khalil',
    role: 'Barber',
    specializations: ['hair'],
    email: 'ahmed@salon.com',
    phone: '+974 5501 1004',
    image: null,
    rating: 4.6,
    reviewCount: 72,
    yearsExperience: 5,
    bio: "Expert in men's grooming and classic barbering techniques.",
    workingHours: {
      monday: { start: '09:00', end: '21:00' },
      tuesday: { start: '09:00', end: '21:00' },
      wednesday: { start: '09:00', end: '21:00' },
      thursday: { start: '09:00', end: '21:00' },
      friday: null,
      saturday: { start: '09:00', end: '21:00' },
      sunday: { start: '14:00', end: '21:00' },
    },
    status: 'available',
    commissionRate: 35,
    monthlySales: 7500,
    appointmentsToday: 6,
  },
  {
    id: 'STF005',
    name: 'Lisa Park',
    role: 'Nail Technician',
    specializations: ['nails', 'waxing'],
    email: 'lisa@salon.com',
    phone: '+974 5501 1005',
    image: null,
    rating: 4.9,
    reviewCount: 203,
    yearsExperience: 9,
    bio: 'Certified nail artist with expertise in nail art and gel extensions.',
    workingHours: {
      monday: { start: '10:00', end: '18:00' },
      tuesday: { start: '10:00', end: '18:00' },
      wednesday: { start: '10:00', end: '18:00' },
      thursday: { start: '10:00', end: '20:00' },
      friday: { start: '10:00', end: '20:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: null,
    },
    status: 'busy',
    commissionRate: 40,
    monthlySales: 8900,
    appointmentsToday: 7,
  },
  {
    id: 'STF006',
    name: 'Emma Wilson',
    role: 'Esthetician',
    specializations: ['skin', 'massage', 'waxing'],
    email: 'emma@salon.com',
    phone: '+974 5501 1006',
    image: null,
    rating: 4.8,
    reviewCount: 118,
    yearsExperience: 7,
    bio: 'Licensed esthetician specializing in advanced skincare treatments.',
    workingHours: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: null,
      sunday: null,
    },
    status: 'off',
    commissionRate: 38,
    monthlySales: 6800,
    appointmentsToday: 0,
  },
];

// Clients
export const clients: BeautyClient[] = [
  {
    id: 'CLT001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '+974 5511 0001',
    image: null,
    dateOfBirth: '1990-05-15',
    gender: 'female',
    vipStatus: true,
    membershipId: 'MEM001',
    preferredStylist: 'STF001',
    notes: 'Prefers organic products. Sensitive scalp.',
    allergies: ['sulfates'],
    hairType: 'Wavy, Medium thickness',
    skinType: 'Combination',
    totalSpent: 8750,
    visitCount: 24,
    lastVisit: '2024-12-15',
    upcomingAppointment: 'APT001',
    createdAt: '2023-01-10',
    tags: ['vip', 'regular'],
  },
  {
    id: 'CLT002',
    firstName: 'Maryam',
    lastName: 'Al-Thani',
    email: 'maryam.t@email.com',
    phone: '+974 5511 0002',
    image: null,
    dateOfBirth: '1985-08-22',
    gender: 'female',
    vipStatus: true,
    membershipId: 'MEM002',
    preferredStylist: 'STF003',
    notes: 'High-profile client. Requires privacy.',
    allergies: [],
    hairType: 'Straight, Thick',
    skinType: 'Dry',
    totalSpent: 15200,
    visitCount: 32,
    lastVisit: '2024-12-18',
    upcomingAppointment: null,
    createdAt: '2022-06-15',
    tags: ['vip', 'bridal'],
  },
  {
    id: 'CLT003',
    firstName: 'Jennifer',
    lastName: 'Smith',
    email: 'jen.smith@email.com',
    phone: '+974 5511 0003',
    image: null,
    dateOfBirth: '1995-03-10',
    gender: 'female',
    vipStatus: false,
    membershipId: null,
    preferredStylist: 'STF002',
    notes: '',
    allergies: ['fragrance'],
    hairType: 'Curly, Fine',
    skinType: 'Oily',
    totalSpent: 2400,
    visitCount: 8,
    lastVisit: '2024-12-10',
    upcomingAppointment: 'APT003',
    createdAt: '2024-03-20',
    tags: ['new'],
  },
  {
    id: 'CLT004',
    firstName: 'Noura',
    lastName: 'Hassan',
    email: 'noura.h@email.com',
    phone: '+974 5511 0004',
    image: null,
    dateOfBirth: '1988-11-28',
    gender: 'female',
    vipStatus: false,
    membershipId: 'MEM003',
    preferredStylist: 'STF005',
    notes: 'Loves nail art. Instagram: @noura_nails',
    allergies: [],
    hairType: 'Straight, Medium',
    skinType: 'Normal',
    totalSpent: 4600,
    visitCount: 18,
    lastVisit: '2024-12-20',
    upcomingAppointment: 'APT004',
    createdAt: '2023-08-05',
    tags: ['nail-lover', 'social-media'],
  },
  {
    id: 'CLT005',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'm.brown@email.com',
    phone: '+974 5511 0005',
    image: null,
    dateOfBirth: '1982-07-04',
    gender: 'male',
    vipStatus: false,
    membershipId: null,
    preferredStylist: 'STF004',
    notes: 'Prefers early morning appointments',
    allergies: [],
    hairType: 'Short, Thick',
    skinType: 'Normal',
    totalSpent: 1200,
    visitCount: 15,
    lastVisit: '2024-12-19',
    upcomingAppointment: null,
    createdAt: '2024-01-15',
    tags: ['regular'],
  },
  {
    id: 'CLT006',
    firstName: 'Aisha',
    lastName: 'Mahmoud',
    email: 'aisha.m@email.com',
    phone: '+974 5511 0006',
    image: null,
    dateOfBirth: '1992-02-14',
    gender: 'female',
    vipStatus: true,
    membershipId: 'MEM001',
    preferredStylist: 'STF001',
    notes: 'Getting married in March 2025. Bridal package.',
    allergies: ['parabens'],
    hairType: 'Wavy, Thick',
    skinType: 'Sensitive',
    totalSpent: 6800,
    visitCount: 12,
    lastVisit: '2024-12-17',
    upcomingAppointment: 'APT005',
    createdAt: '2024-06-01',
    tags: ['bride-to-be', 'vip'],
  },
];

// Appointments
export const appointments: Appointment[] = [
  {
    id: 'APT001',
    clientId: 'CLT001',
    clientName: 'Sarah Johnson',
    stylistId: 'STF001',
    stylistName: 'Maria Santos',
    services: [
      { serviceId: 'SRV001', name: "Women's Haircut", price: 150, duration: 45 },
      { serviceId: 'SRV004', name: 'Highlights / Balayage', price: 450, duration: 150 },
    ],
    date: '2024-12-28',
    startTime: '10:00',
    endTime: '13:15',
    totalDuration: 195,
    totalPrice: 600,
    status: 'confirmed',
    notes: 'Wants to go lighter for the new year',
    paymentStatus: 'pending',
    createdAt: '2024-12-20',
    reminderSent: true,
  },
  {
    id: 'APT002',
    clientId: 'CLT002',
    clientName: 'Maryam Al-Thani',
    stylistId: 'STF003',
    stylistName: 'Fatima Al-Hassan',
    services: [{ serviceId: 'SRV011', name: 'Bridal Makeup', price: 400, duration: 90 }],
    date: '2024-12-27',
    startTime: '14:00',
    endTime: '15:30',
    totalDuration: 90,
    totalPrice: 400,
    status: 'confirmed',
    notes: 'Trial session for wedding',
    paymentStatus: 'paid',
    createdAt: '2024-12-15',
    reminderSent: true,
  },
  {
    id: 'APT003',
    clientId: 'CLT003',
    clientName: 'Jennifer Smith',
    stylistId: 'STF002',
    stylistName: 'Sophie Chen',
    services: [{ serviceId: 'SRV005', name: 'Keratin Treatment', price: 600, duration: 180 }],
    date: '2024-12-29',
    startTime: '11:00',
    endTime: '14:00',
    totalDuration: 180,
    totalPrice: 600,
    status: 'scheduled',
    notes: '',
    paymentStatus: 'pending',
    createdAt: '2024-12-22',
    reminderSent: false,
  },
  {
    id: 'APT004',
    clientId: 'CLT004',
    clientName: 'Noura Hassan',
    stylistId: 'STF005',
    stylistName: 'Lisa Park',
    services: [
      { serviceId: 'SRV008', name: 'Gel Nails - Full Set', price: 120, duration: 60 },
      { serviceId: 'SRV007', name: 'Pedicure - Spa', price: 90, duration: 45 },
    ],
    date: '2024-12-27',
    startTime: '15:00',
    endTime: '16:45',
    totalDuration: 105,
    totalPrice: 210,
    status: 'in-progress',
    notes: 'Wants holiday-themed nail art',
    paymentStatus: 'pending',
    createdAt: '2024-12-25',
    reminderSent: true,
  },
  {
    id: 'APT005',
    clientId: 'CLT006',
    clientName: 'Aisha Mahmoud',
    stylistId: 'STF001',
    stylistName: 'Maria Santos',
    services: [
      { serviceId: 'SRV001', name: "Women's Haircut", price: 150, duration: 45 },
      { serviceId: 'SRV003', name: 'Hair Coloring - Full', price: 350, duration: 120 },
    ],
    date: '2024-12-30',
    startTime: '09:00',
    endTime: '11:45',
    totalDuration: 165,
    totalPrice: 500,
    status: 'scheduled',
    notes: 'Pre-wedding hair appointment',
    paymentStatus: 'pending',
    createdAt: '2024-12-20',
    reminderSent: false,
  },
  {
    id: 'APT006',
    clientId: 'CLT005',
    clientName: 'Michael Brown',
    stylistId: 'STF004',
    stylistName: 'Ahmed Khalil',
    services: [{ serviceId: 'SRV002', name: "Men's Haircut", price: 80, duration: 30 }],
    date: '2024-12-26',
    startTime: '09:00',
    endTime: '09:30',
    totalDuration: 30,
    totalPrice: 80,
    status: 'completed',
    notes: '',
    paymentStatus: 'paid',
    createdAt: '2024-12-20',
    reminderSent: true,
  },
];

export const appointmentStatuses: AppointmentStatus[] = [
  { id: 'scheduled', name: 'Scheduled', color: '#6366f1' },
  { id: 'confirmed', name: 'Confirmed', color: '#0ea5e9' },
  { id: 'in-progress', name: 'In Progress', color: '#f59e0b' },
  { id: 'completed', name: 'Completed', color: '#10b981' },
  { id: 'cancelled', name: 'Cancelled', color: '#ef4444' },
  { id: 'no-show', name: 'No Show', color: '#64748b' },
];

// Products
export const products: BeautyProduct[] = [
  {
    id: 'PRD001',
    name: 'Professional Shampoo 500ml',
    brand: 'Kerastase',
    category: 'Hair Care',
    sku: 'KER-SHP-500',
    price: 180,
    costPrice: 90,
    stock: 24,
    lowStockThreshold: 5,
    description: 'Moisturizing shampoo for all hair types',
    status: 'active',
  },
  {
    id: 'PRD002',
    name: 'Deep Conditioning Mask',
    brand: 'Olaplex',
    category: 'Hair Care',
    sku: 'OLA-MSK-250',
    price: 220,
    costPrice: 110,
    stock: 18,
    lowStockThreshold: 5,
    description: 'Intensive repair treatment',
    status: 'active',
  },
  {
    id: 'PRD003',
    name: 'Heat Protection Spray',
    brand: 'GHD',
    category: 'Styling',
    sku: 'GHD-HPS-200',
    price: 95,
    costPrice: 48,
    stock: 32,
    lowStockThreshold: 8,
    description: 'Thermal protection up to 230C',
    status: 'active',
  },
  {
    id: 'PRD004',
    name: 'Gel Polish Set',
    brand: 'OPI',
    category: 'Nails',
    sku: 'OPI-GPS-12',
    price: 150,
    costPrice: 75,
    stock: 8,
    lowStockThreshold: 3,
    description: '12 popular colors gel polish set',
    status: 'active',
  },
  {
    id: 'PRD005',
    name: 'Cuticle Oil',
    brand: 'CND',
    category: 'Nails',
    sku: 'CND-COL-15',
    price: 45,
    costPrice: 22,
    stock: 45,
    lowStockThreshold: 10,
    description: 'Nourishing solar oil',
    status: 'active',
  },
  {
    id: 'PRD006',
    name: 'Face Serum - Vitamin C',
    brand: 'SkinCeuticals',
    category: 'Skin Care',
    sku: 'SKC-SER-30',
    price: 350,
    costPrice: 175,
    stock: 12,
    lowStockThreshold: 3,
    description: 'Antioxidant brightening serum',
    status: 'active',
  },
  {
    id: 'PRD007',
    name: 'Moisturizer SPF 30',
    brand: 'La Roche-Posay',
    category: 'Skin Care',
    sku: 'LRP-MST-50',
    price: 165,
    costPrice: 82,
    stock: 3,
    lowStockThreshold: 5,
    description: 'Daily moisturizer with sun protection',
    status: 'low-stock',
  },
  {
    id: 'PRD008',
    name: 'Makeup Brush Set',
    brand: 'MAC',
    category: 'Makeup',
    sku: 'MAC-BRS-10',
    price: 280,
    costPrice: 140,
    stock: 6,
    lowStockThreshold: 2,
    description: 'Professional 10-piece brush set',
    status: 'active',
  },
];

// Packages
export const packages: ServicePackage[] = [
  {
    id: 'PKG001',
    name: 'Bridal Package',
    description: 'Complete bridal preparation including trial',
    services: ['SRV001', 'SRV003', 'SRV011', 'SRV006', 'SRV009'],
    regularPrice: 1140,
    packagePrice: 950,
    savings: 190,
    validityDays: 90,
    popular: true,
    status: 'active',
  },
  {
    id: 'PKG002',
    name: 'Pamper Day',
    description: 'Full day of relaxation and beauty',
    services: ['SRV001', 'SRV009', 'SRV013', 'SRV006', 'SRV007'],
    regularPrice: 680,
    packagePrice: 550,
    savings: 130,
    validityDays: 30,
    popular: true,
    status: 'active',
  },
  {
    id: 'PKG003',
    name: 'Hair Transformation',
    description: 'Complete hair makeover',
    services: ['SRV001', 'SRV004', 'SRV005'],
    regularPrice: 1200,
    packagePrice: 999,
    savings: 201,
    validityDays: 60,
    popular: false,
    status: 'active',
  },
  {
    id: 'PKG004',
    name: 'Nail Lover',
    description: 'Complete hand and foot care',
    services: ['SRV006', 'SRV007', 'SRV008'],
    regularPrice: 270,
    packagePrice: 220,
    savings: 50,
    validityDays: 30,
    popular: false,
    status: 'active',
  },
  {
    id: 'PKG005',
    name: 'Party Ready',
    description: 'Get ready for any special occasion',
    services: ['SRV001', 'SRV012', 'SRV008'],
    regularPrice: 470,
    packagePrice: 400,
    savings: 70,
    validityDays: 14,
    popular: true,
    status: 'active',
  },
];

// Memberships
export const membershipPlans: MembershipPlan[] = [
  {
    id: 'PLAN001',
    name: 'Bronze',
    price: 500,
    duration: 'monthly',
    benefits: ['10% off all services', '5% off products', 'Priority booking'],
    color: '#cd7f32',
  },
  {
    id: 'PLAN002',
    name: 'Silver',
    price: 900,
    duration: 'monthly',
    benefits: ['15% off all services', '10% off products', 'Priority booking', '1 free blowout/month'],
    color: '#c0c0c0',
  },
  {
    id: 'PLAN003',
    name: 'Gold',
    price: 1500,
    duration: 'monthly',
    benefits: [
      '20% off all services',
      '15% off products',
      'Priority booking',
      '2 free blowouts/month',
      'Free eyebrow threading',
    ],
    color: '#ffd700',
  },
  {
    id: 'PLAN004',
    name: 'Platinum',
    price: 2500,
    duration: 'monthly',
    benefits: [
      '25% off all services',
      '20% off products',
      'VIP priority booking',
      'Unlimited blowouts',
      'Free threading & waxing',
      'Exclusive events access',
    ],
    color: '#e5e4e2',
  },
];

export const memberships: Membership[] = [
  {
    id: 'MEM001',
    clientId: 'CLT001',
    clientName: 'Sarah Johnson',
    planId: 'PLAN003',
    planName: 'Gold',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    status: 'active',
    autoRenew: true,
    totalSavings: 2850,
  },
  {
    id: 'MEM002',
    clientId: 'CLT002',
    clientName: 'Maryam Al-Thani',
    planId: 'PLAN004',
    planName: 'Platinum',
    startDate: '2024-06-15',
    endDate: '2025-06-15',
    status: 'active',
    autoRenew: true,
    totalSavings: 5200,
  },
  {
    id: 'MEM003',
    clientId: 'CLT004',
    clientName: 'Noura Hassan',
    planId: 'PLAN002',
    planName: 'Silver',
    startDate: '2024-09-01',
    endDate: '2025-03-01',
    status: 'active',
    autoRenew: false,
    totalSavings: 890,
  },
];

// Gift Cards
export const giftCards: GiftCard[] = [
  {
    id: 'GFT001',
    code: 'GIFT-2024-001',
    initialValue: 500,
    currentBalance: 350,
    purchasedBy: 'CLT002',
    purchasedByName: 'Maryam Al-Thani',
    recipientName: 'Sara Ahmed',
    recipientEmail: 'sara.a@email.com',
    purchaseDate: '2024-11-15',
    expiryDate: '2025-11-15',
    status: 'active',
    usageHistory: [{ date: '2024-12-01', amount: 150, service: 'Manicure & Pedicure' }],
  },
  {
    id: 'GFT002',
    code: 'GIFT-2024-002',
    initialValue: 1000,
    currentBalance: 1000,
    purchasedBy: 'CLT001',
    purchasedByName: 'Sarah Johnson',
    recipientName: 'Emma Johnson',
    recipientEmail: 'emma.j@email.com',
    purchaseDate: '2024-12-20',
    expiryDate: '2025-12-20',
    status: 'active',
    usageHistory: [],
  },
  {
    id: 'GFT003',
    code: 'GIFT-2024-003',
    initialValue: 300,
    currentBalance: 0,
    purchasedBy: null,
    purchasedByName: 'Walk-in Customer',
    recipientName: 'Maria Lopez',
    recipientEmail: 'maria.l@email.com',
    purchaseDate: '2024-10-01',
    expiryDate: '2025-10-01',
    status: 'redeemed',
    usageHistory: [
      { date: '2024-10-15', amount: 150, service: 'Haircut' },
      { date: '2024-11-20', amount: 150, service: 'Facial' },
    ],
  },
  {
    id: 'GFT004',
    code: 'GIFT-2024-004',
    initialValue: 200,
    currentBalance: 200,
    purchasedBy: 'CLT006',
    purchasedByName: 'Aisha Mahmoud',
    recipientName: 'Layla Mahmoud',
    recipientEmail: 'layla.m@email.com',
    purchaseDate: '2024-12-25',
    expiryDate: '2025-12-25',
    status: 'active',
    usageHistory: [],
  },
];

// Reviews
export const reviews: Review[] = [
  {
    id: 'REV001',
    clientId: 'CLT001',
    clientName: 'Sarah Johnson',
    stylistId: 'STF001',
    stylistName: 'Maria Santos',
    serviceId: 'SRV004',
    serviceName: 'Highlights / Balayage',
    rating: 5,
    comment: 'Maria is absolutely amazing! My balayage turned out perfect. Will definitely be back!',
    date: '2024-12-15',
    reply: 'Thank you so much Sarah! It was a pleasure working with you. See you next time!',
    replyDate: '2024-12-16',
    status: 'published',
  },
  {
    id: 'REV002',
    clientId: 'CLT004',
    clientName: 'Noura Hassan',
    stylistId: 'STF005',
    stylistName: 'Lisa Park',
    serviceId: 'SRV008',
    serviceName: 'Gel Nails - Full Set',
    rating: 5,
    comment: 'Best nail artist in Doha! The nail art is stunning and lasts for weeks.',
    date: '2024-12-18',
    reply: null,
    replyDate: null,
    status: 'published',
  },
  {
    id: 'REV003',
    clientId: 'CLT003',
    clientName: 'Jennifer Smith',
    stylistId: 'STF002',
    stylistName: 'Sophie Chen',
    serviceId: 'SRV005',
    serviceName: 'Keratin Treatment',
    rating: 4,
    comment:
      'Great results! My hair is so smooth now. Only 4 stars because the wait time was a bit long.',
    date: '2024-12-10',
    reply:
      'Thank you for your feedback Jennifer! We apologize for the wait and will work on improving our scheduling.',
    replyDate: '2024-12-11',
    status: 'published',
  },
  {
    id: 'REV004',
    clientId: 'CLT002',
    clientName: 'Maryam Al-Thani',
    stylistId: 'STF003',
    stylistName: 'Fatima Al-Hassan',
    serviceId: 'SRV011',
    serviceName: 'Bridal Makeup',
    rating: 5,
    comment: 'Fatima understood exactly what I wanted for my wedding look. The trial was perfect!',
    date: '2024-12-20',
    reply: null,
    replyDate: null,
    status: 'pending-reply',
  },
  {
    id: 'REV005',
    clientId: 'CLT005',
    clientName: 'Michael Brown',
    stylistId: 'STF004',
    stylistName: 'Ahmed Khalil',
    serviceId: 'SRV002',
    serviceName: "Men's Haircut",
    rating: 5,
    comment:
      "Ahmed is the best barber I've found in Qatar. Quick, professional, and always a great cut.",
    date: '2024-12-19',
    reply: 'Thanks Michael! Always happy to have you in the chair.',
    replyDate: '2024-12-19',
    status: 'published',
  },
];

// Dashboard Stats
export const beautyStats: BeautyStats = {
  todayAppointments: 12,
  todayRevenue: 2850,
  weeklyRevenue: 18500,
  monthlyRevenue: 72000,
  totalClients: 248,
  newClientsThisMonth: 18,
  averageRating: 4.8,
  totalReviews: 765,
  topServices: [
    { name: "Women's Haircut", bookings: 145 },
    { name: 'Gel Nails', bookings: 128 },
    { name: 'Balayage', bookings: 89 },
    { name: 'Facial', bookings: 76 },
  ],
  topStylists: [
    { name: 'Maria Santos', revenue: 15200, rating: 4.9 },
    { name: 'Fatima Al-Hassan', revenue: 12800, rating: 4.8 },
    { name: 'Lisa Park', revenue: 11500, rating: 4.9 },
  ],
};

// Menu Items for Sidebar
export const beautyMenuItems: MenuItem[] = [
  {
    id: 'beauty-appointments',
    label: 'Appointments',
    icon: Calendar,
    path: '/dashboard/beauty/appointments',
    color: '#ec4899',
  },
  {
    id: 'beauty-clients',
    label: 'Clients',
    icon: Users,
    path: '/dashboard/beauty/clients',
    color: '#8b5cf6',
  },
  {
    id: 'beauty-services',
    label: 'Services',
    icon: Scissors,
    path: '/dashboard/beauty/services',
    color: '#f97316',
  },
  {
    id: 'beauty-staff',
    label: 'Staff',
    icon: Users,
    path: '/dashboard/beauty/staff',
    color: '#10b981',
  },
  {
    id: 'beauty-products',
    label: 'Products',
    icon: Package,
    path: '/dashboard/beauty/products',
    color: '#06b6d4',
  },
  {
    id: 'beauty-packages',
    label: 'Packages',
    icon: Gift,
    path: '/dashboard/beauty/packages',
    color: '#f59e0b',
  },
  {
    id: 'beauty-memberships',
    label: 'Memberships',
    icon: CreditCard,
    path: '/dashboard/beauty/memberships',
    color: '#6366f1',
  },
  {
    id: 'beauty-gift-cards',
    label: 'Gift Cards',
    icon: Gift,
    path: '/dashboard/beauty/gift-cards',
    color: '#ef4444',
  },
  {
    id: 'beauty-reviews',
    label: 'Reviews',
    icon: Star,
    path: '/dashboard/beauty/reviews',
    color: '#eab308',
  },
];

// Helper functions
export const getServiceById = (id: string): BeautyService | undefined => {
  return services.find((s) => s.id === id);
};

export const getStaffById = (id: string): StaffMember | undefined => {
  return staff.find((s) => s.id === id);
};

export const getClientById = (id: string): BeautyClient | undefined => {
  return clients.find((c) => c.id === id);
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return appointments.find((a) => a.id === id);
};

export const getAppointmentStatusColor = (status: Appointment['status']): string => {
  const statusObj = appointmentStatuses.find((s) => s.id === status);
  return statusObj?.color || '#64748b';
};

export const getStaffStatusColor = (status: StaffMember['status']): string => {
  const colors = {
    available: '#10b981',
    busy: '#f59e0b',
    off: '#64748b',
  };
  return colors[status];
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

export const formatCurrency = (amount: number): string => {
  return `QAR ${amount.toLocaleString()}`;
};
