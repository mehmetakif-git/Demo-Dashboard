import {
  ClipboardList,
  Plus,
  Users,
  Shirt,
  Truck,
  Package,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import type { MenuItem } from '@/types';

// Types
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface LaundryService {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  expressPrice: number;
  turnaroundDays: number;
  expressTurnaroundHours: number;
  description: string;
  status: 'active' | 'inactive';
}

export interface GarmentType {
  id: string;
  name: string;
  category: string;
  defaultPrice: number;
  icon: string;
}

export interface OrderStatus {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface LaundryCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  preferredPickupTime: string;
  preferredDeliveryTime: string;
  notes: string;
  vipStatus: boolean;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string | null;
  createdAt: string;
  tags: string[];
}

export interface OrderItem {
  garmentTypeId: string;
  garmentName: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  specialInstructions: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: 'pending' | 'picked-up' | 'processing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'online';
  isExpress: boolean;
  pickupDate: string;
  pickupTime: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string | null;
  driverId: string | null;
  driverName: string | null;
  notes: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehiclePlate: string;
  status: 'available' | 'on-route' | 'off-duty';
  currentLocation: string;
  todayDeliveries: number;
  todayPickups: number;
  rating: number;
  image: string | null;
}

export interface DeliverySchedule {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  type: 'pickup' | 'delivery';
  scheduledDate: string;
  scheduledTime: string;
  driverId: string | null;
  driverName: string | null;
  status: 'scheduled' | 'in-progress' | 'completed' | 'failed';
  notes: string;
}

export interface GarmentTracking {
  id: string;
  orderId: string;
  orderNumber: string;
  garmentTypeId: string;
  garmentName: string;
  barcode: string;
  status: 'received' | 'sorting' | 'washing' | 'drying' | 'ironing' | 'folding' | 'packaging' | 'ready';
  location: string;
  lastUpdated: string;
  notes: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'detergent' | 'softener' | 'stain-remover' | 'packaging' | 'supplies' | 'equipment';
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitCost: number;
  lastRestocked: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Complaint {
  id: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  type: 'damage' | 'lost' | 'delay' | 'quality' | 'billing' | 'service' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  description: string;
  resolution: string | null;
  compensationAmount: number;
  createdAt: string;
  resolvedAt: string | null;
  assignedTo: string | null;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  inProcessOrders: number;
  completedToday: number;
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  activeCustomers: number;
  pendingPickups: number;
  pendingDeliveries: number;
  openComplaints: number;
  avgTurnaroundHours: number;
}

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  { id: 'cat-wash-fold', name: 'Wash & Fold', icon: 'shirt', color: '#0ea5e9', description: 'Regular laundry service' },
  { id: 'cat-dry-clean', name: 'Dry Cleaning', icon: 'sparkles', color: '#8b5cf6', description: 'Professional dry cleaning' },
  { id: 'cat-press', name: 'Ironing & Press', icon: 'iron', color: '#f59e0b', description: 'Steam press and ironing' },
  { id: 'cat-specialty', name: 'Specialty Items', icon: 'star', color: '#ec4899', description: 'Special care items' },
  { id: 'cat-alterations', name: 'Alterations', icon: 'scissors', color: '#10b981', description: 'Repairs and alterations' },
];

// Services
export const services: LaundryService[] = [
  // Wash & Fold
  { id: 'srv-wash-regular', name: 'Regular Wash', categoryId: 'cat-wash-fold', price: 3.99, expressPrice: 6.99, turnaroundDays: 2, expressTurnaroundHours: 24, description: 'Standard washing service', status: 'active' },
  { id: 'srv-wash-delicate', name: 'Delicate Wash', categoryId: 'cat-wash-fold', price: 5.99, expressPrice: 9.99, turnaroundDays: 2, expressTurnaroundHours: 24, description: 'Gentle cycle for delicate fabrics', status: 'active' },
  { id: 'srv-wash-heavy', name: 'Heavy Duty Wash', categoryId: 'cat-wash-fold', price: 4.99, expressPrice: 7.99, turnaroundDays: 2, expressTurnaroundHours: 24, description: 'For heavily soiled items', status: 'active' },
  // Dry Cleaning
  { id: 'srv-dry-standard', name: 'Standard Dry Clean', categoryId: 'cat-dry-clean', price: 8.99, expressPrice: 14.99, turnaroundDays: 3, expressTurnaroundHours: 24, description: 'Professional dry cleaning', status: 'active' },
  { id: 'srv-dry-premium', name: 'Premium Dry Clean', categoryId: 'cat-dry-clean', price: 14.99, expressPrice: 24.99, turnaroundDays: 3, expressTurnaroundHours: 24, description: 'Premium care for luxury fabrics', status: 'active' },
  { id: 'srv-dry-leather', name: 'Leather & Suede', categoryId: 'cat-dry-clean', price: 29.99, expressPrice: 49.99, turnaroundDays: 5, expressTurnaroundHours: 48, description: 'Specialized leather cleaning', status: 'active' },
  // Ironing & Press
  { id: 'srv-iron-standard', name: 'Standard Press', categoryId: 'cat-press', price: 2.99, expressPrice: 4.99, turnaroundDays: 1, expressTurnaroundHours: 4, description: 'Standard steam press', status: 'active' },
  { id: 'srv-iron-deluxe', name: 'Deluxe Press', categoryId: 'cat-press', price: 4.99, expressPrice: 7.99, turnaroundDays: 1, expressTurnaroundHours: 4, description: 'Hand-finished pressing', status: 'active' },
  // Specialty Items
  { id: 'srv-spec-wedding', name: 'Wedding Dress', categoryId: 'cat-specialty', price: 149.99, expressPrice: 249.99, turnaroundDays: 7, expressTurnaroundHours: 72, description: 'Wedding dress cleaning and preservation', status: 'active' },
  { id: 'srv-spec-comforter', name: 'Comforter/Duvet', categoryId: 'cat-specialty', price: 24.99, expressPrice: 39.99, turnaroundDays: 3, expressTurnaroundHours: 48, description: 'Large bedding items', status: 'active' },
  { id: 'srv-spec-curtains', name: 'Curtains', categoryId: 'cat-specialty', price: 19.99, expressPrice: 34.99, turnaroundDays: 4, expressTurnaroundHours: 48, description: 'Curtain and drape cleaning', status: 'active' },
  // Alterations
  { id: 'srv-alt-hem', name: 'Hemming', categoryId: 'cat-alterations', price: 12.99, expressPrice: 19.99, turnaroundDays: 3, expressTurnaroundHours: 24, description: 'Pant and skirt hemming', status: 'active' },
  { id: 'srv-alt-button', name: 'Button Repair', categoryId: 'cat-alterations', price: 4.99, expressPrice: 7.99, turnaroundDays: 2, expressTurnaroundHours: 12, description: 'Button replacement', status: 'active' },
  { id: 'srv-alt-zipper', name: 'Zipper Repair', categoryId: 'cat-alterations', price: 14.99, expressPrice: 24.99, turnaroundDays: 3, expressTurnaroundHours: 24, description: 'Zipper replacement', status: 'active' },
];

// Garment Types
export const garmentTypes: GarmentType[] = [
  { id: 'gar-shirt', name: 'Shirt', category: 'tops', defaultPrice: 3.99, icon: 'shirt' },
  { id: 'gar-blouse', name: 'Blouse', category: 'tops', defaultPrice: 4.99, icon: 'shirt' },
  { id: 'gar-tshirt', name: 'T-Shirt', category: 'tops', defaultPrice: 2.99, icon: 'shirt' },
  { id: 'gar-sweater', name: 'Sweater', category: 'tops', defaultPrice: 6.99, icon: 'shirt' },
  { id: 'gar-pants', name: 'Pants', category: 'bottoms', defaultPrice: 5.99, icon: 'pants' },
  { id: 'gar-jeans', name: 'Jeans', category: 'bottoms', defaultPrice: 5.99, icon: 'pants' },
  { id: 'gar-skirt', name: 'Skirt', category: 'bottoms', defaultPrice: 5.99, icon: 'skirt' },
  { id: 'gar-dress', name: 'Dress', category: 'full', defaultPrice: 9.99, icon: 'dress' },
  { id: 'gar-suit', name: 'Suit (2-piece)', category: 'full', defaultPrice: 19.99, icon: 'suit' },
  { id: 'gar-jacket', name: 'Jacket', category: 'outerwear', defaultPrice: 12.99, icon: 'jacket' },
  { id: 'gar-coat', name: 'Coat', category: 'outerwear', defaultPrice: 19.99, icon: 'coat' },
  { id: 'gar-tie', name: 'Tie', category: 'accessories', defaultPrice: 4.99, icon: 'tie' },
  { id: 'gar-scarf', name: 'Scarf', category: 'accessories', defaultPrice: 6.99, icon: 'scarf' },
  { id: 'gar-bedsheet', name: 'Bed Sheet', category: 'linens', defaultPrice: 7.99, icon: 'bed' },
  { id: 'gar-towel', name: 'Towel', category: 'linens', defaultPrice: 3.99, icon: 'towel' },
];

// Order Statuses
export const orderStatuses: OrderStatus[] = [
  { id: 'status-pending', name: 'Pending', color: '#f59e0b', order: 1 },
  { id: 'status-picked-up', name: 'Picked Up', color: '#8b5cf6', order: 2 },
  { id: 'status-processing', name: 'Processing', color: '#3b82f6', order: 3 },
  { id: 'status-ready', name: 'Ready', color: '#10b981', order: 4 },
  { id: 'status-out-for-delivery', name: 'Out for Delivery', color: '#06b6d4', order: 5 },
  { id: 'status-delivered', name: 'Delivered', color: '#22c55e', order: 6 },
  { id: 'status-cancelled', name: 'Cancelled', color: '#ef4444', order: 7 },
];

// Customers
export const customers: LaundryCustomer[] = [
  {
    id: 'cust-001',
    firstName: 'John',
    lastName: 'Mitchell',
    email: 'john.mitchell@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Oak Street, Apt 4B',
    city: 'New York',
    postalCode: '10001',
    preferredPickupTime: '09:00 AM - 11:00 AM',
    preferredDeliveryTime: '05:00 PM - 07:00 PM',
    notes: 'Prefers eco-friendly detergents',
    vipStatus: true,
    totalOrders: 47,
    totalSpent: 2340.50,
    lastOrderDate: '2025-01-10',
    createdAt: '2024-03-15',
    tags: ['VIP', 'Eco-Friendly', 'Business Attire'],
  },
  {
    id: 'cust-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Maple Avenue',
    city: 'Brooklyn',
    postalCode: '11201',
    preferredPickupTime: '02:00 PM - 04:00 PM',
    preferredDeliveryTime: '10:00 AM - 12:00 PM',
    notes: 'Has allergies to certain fragrances',
    vipStatus: false,
    totalOrders: 23,
    totalSpent: 890.25,
    lastOrderDate: '2025-01-08',
    createdAt: '2024-06-20',
    tags: ['Fragrance-Free', 'Delicates'],
  },
  {
    id: 'cust-003',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Road, Suite 100',
    city: 'Manhattan',
    postalCode: '10022',
    preferredPickupTime: '08:00 AM - 10:00 AM',
    preferredDeliveryTime: '06:00 PM - 08:00 PM',
    notes: 'Corporate account - bill monthly',
    vipStatus: true,
    totalOrders: 156,
    totalSpent: 8920.00,
    lastOrderDate: '2025-01-11',
    createdAt: '2023-11-10',
    tags: ['Corporate', 'VIP', 'Monthly Billing'],
  },
  {
    id: 'cust-004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm Street',
    city: 'Queens',
    postalCode: '11375',
    preferredPickupTime: '11:00 AM - 01:00 PM',
    preferredDeliveryTime: '03:00 PM - 05:00 PM',
    notes: '',
    vipStatus: false,
    totalOrders: 8,
    totalSpent: 245.80,
    lastOrderDate: '2025-01-05',
    createdAt: '2024-10-05',
    tags: ['New Customer'],
  },
  {
    id: 'cust-005',
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'rwilliams@email.com',
    phone: '+1 (555) 567-8901',
    address: '567 Cedar Lane',
    city: 'Bronx',
    postalCode: '10451',
    preferredPickupTime: '04:00 PM - 06:00 PM',
    preferredDeliveryTime: '09:00 AM - 11:00 AM',
    notes: 'Works from home, flexible times',
    vipStatus: false,
    totalOrders: 31,
    totalSpent: 1120.45,
    lastOrderDate: '2025-01-09',
    createdAt: '2024-04-22',
    tags: ['Flexible Schedule'],
  },
];

// Orders
export const orders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'ORD-2025-0001',
    customerId: 'cust-001',
    customerName: 'John Mitchell',
    customerPhone: '+1 (555) 123-4567',
    items: [
      { garmentTypeId: 'gar-shirt', garmentName: 'Shirt', serviceId: 'srv-dry-standard', serviceName: 'Standard Dry Clean', quantity: 5, unitPrice: 8.99, total: 44.95, specialInstructions: '' },
      { garmentTypeId: 'gar-pants', garmentName: 'Pants', serviceId: 'srv-dry-standard', serviceName: 'Standard Dry Clean', quantity: 3, unitPrice: 8.99, total: 26.97, specialInstructions: 'Light starch' },
      { garmentTypeId: 'gar-suit', garmentName: 'Suit (2-piece)', serviceId: 'srv-dry-premium', serviceName: 'Premium Dry Clean', quantity: 1, unitPrice: 19.99, total: 19.99, specialInstructions: '' },
    ],
    subtotal: 91.91,
    taxAmount: 8.27,
    deliveryFee: 0,
    discount: 10,
    totalAmount: 90.18,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    isExpress: false,
    pickupDate: '2025-01-10',
    pickupTime: '10:00 AM',
    expectedDeliveryDate: '2025-01-13',
    actualDeliveryDate: null,
    driverId: 'drv-001',
    driverName: 'Marcus Johnson',
    notes: 'Regular customer - VIP treatment',
    createdAt: '2025-01-10T08:30:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'ORD-2025-0002',
    customerId: 'cust-002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 (555) 234-5678',
    items: [
      { garmentTypeId: 'gar-dress', garmentName: 'Dress', serviceId: 'srv-dry-standard', serviceName: 'Standard Dry Clean', quantity: 2, unitPrice: 12.99, total: 25.98, specialInstructions: 'Fragrance-free detergent' },
      { garmentTypeId: 'gar-blouse', garmentName: 'Blouse', serviceId: 'srv-wash-delicate', serviceName: 'Delicate Wash', quantity: 4, unitPrice: 5.99, total: 23.96, specialInstructions: '' },
    ],
    subtotal: 49.94,
    taxAmount: 4.49,
    deliveryFee: 5.99,
    discount: 0,
    totalAmount: 60.42,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    isExpress: false,
    pickupDate: '2025-01-08',
    pickupTime: '03:00 PM',
    expectedDeliveryDate: '2025-01-11',
    actualDeliveryDate: null,
    driverId: 'drv-002',
    driverName: 'Lisa Chen',
    notes: 'Use fragrance-free products only',
    createdAt: '2025-01-08T14:15:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'ORD-2025-0003',
    customerId: 'cust-003',
    customerName: 'Michael Chen',
    customerPhone: '+1 (555) 345-6789',
    items: [
      { garmentTypeId: 'gar-shirt', garmentName: 'Shirt', serviceId: 'srv-iron-deluxe', serviceName: 'Deluxe Press', quantity: 10, unitPrice: 4.99, total: 49.90, specialInstructions: 'Extra crisp collars' },
      { garmentTypeId: 'gar-suit', garmentName: 'Suit (2-piece)', serviceId: 'srv-dry-premium', serviceName: 'Premium Dry Clean', quantity: 2, unitPrice: 24.99, total: 49.98, specialInstructions: '' },
    ],
    subtotal: 99.88,
    taxAmount: 8.99,
    deliveryFee: 0,
    discount: 15,
    totalAmount: 93.87,
    status: 'out-for-delivery',
    paymentStatus: 'pending',
    paymentMethod: 'card',
    isExpress: true,
    pickupDate: '2025-01-11',
    pickupTime: '09:00 AM',
    expectedDeliveryDate: '2025-01-11',
    actualDeliveryDate: null,
    driverId: 'drv-001',
    driverName: 'Marcus Johnson',
    notes: 'Express order - corporate account',
    createdAt: '2025-01-11T07:45:00Z',
  },
  {
    id: 'ord-004',
    orderNumber: 'ORD-2025-0004',
    customerId: 'cust-004',
    customerName: 'Emily Davis',
    customerPhone: '+1 (555) 456-7890',
    items: [
      { garmentTypeId: 'gar-coat', garmentName: 'Coat', serviceId: 'srv-dry-standard', serviceName: 'Standard Dry Clean', quantity: 1, unitPrice: 19.99, total: 19.99, specialInstructions: '' },
      { garmentTypeId: 'gar-sweater', garmentName: 'Sweater', serviceId: 'srv-wash-delicate', serviceName: 'Delicate Wash', quantity: 3, unitPrice: 6.99, total: 20.97, specialInstructions: 'Lay flat to dry' },
    ],
    subtotal: 40.96,
    taxAmount: 3.69,
    deliveryFee: 5.99,
    discount: 0,
    totalAmount: 50.64,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    isExpress: false,
    pickupDate: '2025-01-12',
    pickupTime: '12:00 PM',
    expectedDeliveryDate: '2025-01-15',
    actualDeliveryDate: null,
    driverId: null,
    driverName: null,
    notes: '',
    createdAt: '2025-01-11T10:20:00Z',
  },
  {
    id: 'ord-005',
    orderNumber: 'ORD-2025-0005',
    customerId: 'cust-005',
    customerName: 'Robert Williams',
    customerPhone: '+1 (555) 567-8901',
    items: [
      { garmentTypeId: 'gar-bedsheet', garmentName: 'Bed Sheet', serviceId: 'srv-wash-regular', serviceName: 'Regular Wash', quantity: 4, unitPrice: 7.99, total: 31.96, specialInstructions: '' },
      { garmentTypeId: 'gar-towel', garmentName: 'Towel', serviceId: 'srv-wash-regular', serviceName: 'Regular Wash', quantity: 6, unitPrice: 3.99, total: 23.94, specialInstructions: '' },
      { garmentTypeId: 'gar-spec-comforter', garmentName: 'Comforter/Duvet', serviceId: 'srv-spec-comforter', serviceName: 'Comforter/Duvet', quantity: 1, unitPrice: 24.99, total: 24.99, specialInstructions: 'King size' },
    ],
    subtotal: 80.89,
    taxAmount: 7.28,
    deliveryFee: 5.99,
    discount: 5,
    totalAmount: 89.16,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    isExpress: false,
    pickupDate: '2025-01-05',
    pickupTime: '05:00 PM',
    expectedDeliveryDate: '2025-01-08',
    actualDeliveryDate: '2025-01-08',
    driverId: 'drv-003',
    driverName: 'David Park',
    notes: '',
    createdAt: '2025-01-05T16:30:00Z',
  },
];

// Drivers
export const drivers: Driver[] = [
  {
    id: 'drv-001',
    name: 'Marcus Johnson',
    phone: '+1 (555) 111-2222',
    email: 'marcus.j@cleanexpress.com',
    vehicleType: 'Van',
    vehiclePlate: 'NYC-1234',
    status: 'on-route',
    currentLocation: 'Manhattan - Upper East Side',
    todayDeliveries: 8,
    todayPickups: 5,
    rating: 4.9,
    image: null,
  },
  {
    id: 'drv-002',
    name: 'Lisa Chen',
    phone: '+1 (555) 222-3333',
    email: 'lisa.c@cleanexpress.com',
    vehicleType: 'Sedan',
    vehiclePlate: 'NYC-5678',
    status: 'available',
    currentLocation: 'Brooklyn - Downtown',
    todayDeliveries: 12,
    todayPickups: 8,
    rating: 4.8,
    image: null,
  },
  {
    id: 'drv-003',
    name: 'David Park',
    phone: '+1 (555) 333-4444',
    email: 'david.p@cleanexpress.com',
    vehicleType: 'Van',
    vehiclePlate: 'NYC-9012',
    status: 'on-route',
    currentLocation: 'Queens - Astoria',
    todayDeliveries: 6,
    todayPickups: 10,
    rating: 4.7,
    image: null,
  },
  {
    id: 'drv-004',
    name: 'Amanda Wilson',
    phone: '+1 (555) 444-5555',
    email: 'amanda.w@cleanexpress.com',
    vehicleType: 'Sedan',
    vehiclePlate: 'NYC-3456',
    status: 'off-duty',
    currentLocation: 'N/A',
    todayDeliveries: 0,
    todayPickups: 0,
    rating: 4.9,
    image: null,
  },
];

// Delivery Schedule
export const deliverySchedule: DeliverySchedule[] = [
  { id: 'del-001', orderId: 'ord-001', orderNumber: 'ORD-2025-0001', customerName: 'John Mitchell', customerAddress: '123 Oak Street, Apt 4B, New York, NY 10001', customerPhone: '+1 (555) 123-4567', type: 'delivery', scheduledDate: '2025-01-13', scheduledTime: '06:00 PM', driverId: 'drv-001', driverName: 'Marcus Johnson', status: 'scheduled', notes: '' },
  { id: 'del-002', orderId: 'ord-002', orderNumber: 'ORD-2025-0002', customerName: 'Sarah Johnson', customerAddress: '456 Maple Avenue, Brooklyn, NY 11201', customerPhone: '+1 (555) 234-5678', type: 'delivery', scheduledDate: '2025-01-11', scheduledTime: '11:00 AM', driverId: 'drv-002', driverName: 'Lisa Chen', status: 'scheduled', notes: '' },
  { id: 'del-003', orderId: 'ord-003', orderNumber: 'ORD-2025-0003', customerName: 'Michael Chen', customerAddress: '789 Pine Road, Suite 100, Manhattan, NY 10022', customerPhone: '+1 (555) 345-6789', type: 'delivery', scheduledDate: '2025-01-11', scheduledTime: '07:00 PM', driverId: 'drv-001', driverName: 'Marcus Johnson', status: 'in-progress', notes: 'Express delivery' },
  { id: 'del-004', orderId: 'ord-004', orderNumber: 'ORD-2025-0004', customerName: 'Emily Davis', customerAddress: '321 Elm Street, Queens, NY 11375', customerPhone: '+1 (555) 456-7890', type: 'pickup', scheduledDate: '2025-01-12', scheduledTime: '12:00 PM', driverId: null, driverName: null, status: 'scheduled', notes: '' },
];

// Garment Tracking
export const garmentTracking: GarmentTracking[] = [
  { id: 'trk-001', orderId: 'ord-001', orderNumber: 'ORD-2025-0001', garmentTypeId: 'gar-shirt', garmentName: 'Shirt (1/5)', barcode: 'GRM-001-001', status: 'ironing', location: 'Press Station 2', lastUpdated: '2025-01-11T14:30:00Z', notes: '' },
  { id: 'trk-002', orderId: 'ord-001', orderNumber: 'ORD-2025-0001', garmentTypeId: 'gar-shirt', garmentName: 'Shirt (2/5)', barcode: 'GRM-001-002', status: 'ironing', location: 'Press Station 2', lastUpdated: '2025-01-11T14:30:00Z', notes: '' },
  { id: 'trk-003', orderId: 'ord-001', orderNumber: 'ORD-2025-0001', garmentTypeId: 'gar-shirt', garmentName: 'Shirt (3/5)', barcode: 'GRM-001-003', status: 'drying', location: 'Dry Clean Area', lastUpdated: '2025-01-11T13:45:00Z', notes: '' },
  { id: 'trk-004', orderId: 'ord-001', orderNumber: 'ORD-2025-0001', garmentTypeId: 'gar-pants', garmentName: 'Pants (1/3)', barcode: 'GRM-001-004', status: 'packaging', location: 'Finishing Area', lastUpdated: '2025-01-11T15:00:00Z', notes: '' },
  { id: 'trk-005', orderId: 'ord-002', orderNumber: 'ORD-2025-0002', garmentTypeId: 'gar-dress', garmentName: 'Dress (1/2)', barcode: 'GRM-002-001', status: 'ready', location: 'Ready Rack A-12', lastUpdated: '2025-01-11T10:00:00Z', notes: '' },
  { id: 'trk-006', orderId: 'ord-002', orderNumber: 'ORD-2025-0002', garmentTypeId: 'gar-dress', garmentName: 'Dress (2/2)', barcode: 'GRM-002-002', status: 'ready', location: 'Ready Rack A-12', lastUpdated: '2025-01-11T10:00:00Z', notes: '' },
  { id: 'trk-007', orderId: 'ord-003', orderNumber: 'ORD-2025-0003', garmentTypeId: 'gar-shirt', garmentName: 'Shirt (1/10)', barcode: 'GRM-003-001', status: 'ready', location: 'Express Rack', lastUpdated: '2025-01-11T16:00:00Z', notes: 'Express order' },
];

// Inventory
export const inventory: InventoryItem[] = [
  { id: 'inv-001', name: 'Premium Detergent', category: 'detergent', sku: 'DET-001', currentStock: 45, minStock: 20, maxStock: 100, unit: 'gallon', unitCost: 24.99, lastRestocked: '2025-01-05', supplier: 'CleanPro Supplies', status: 'in-stock' },
  { id: 'inv-002', name: 'Eco-Friendly Detergent', category: 'detergent', sku: 'DET-002', currentStock: 18, minStock: 15, maxStock: 80, unit: 'gallon', unitCost: 32.99, lastRestocked: '2025-01-03', supplier: 'GreenClean Co', status: 'low-stock' },
  { id: 'inv-003', name: 'Fabric Softener', category: 'softener', sku: 'SOF-001', currentStock: 32, minStock: 15, maxStock: 60, unit: 'gallon', unitCost: 18.99, lastRestocked: '2025-01-07', supplier: 'CleanPro Supplies', status: 'in-stock' },
  { id: 'inv-004', name: 'Stain Remover Pro', category: 'stain-remover', sku: 'STN-001', currentStock: 25, minStock: 10, maxStock: 50, unit: 'bottle', unitCost: 12.99, lastRestocked: '2025-01-08', supplier: 'StainAway Inc', status: 'in-stock' },
  { id: 'inv-005', name: 'Garment Bags (Large)', category: 'packaging', sku: 'PKG-001', currentStock: 500, minStock: 200, maxStock: 1000, unit: 'piece', unitCost: 0.35, lastRestocked: '2025-01-02', supplier: 'PackRight Ltd', status: 'in-stock' },
  { id: 'inv-006', name: 'Garment Bags (Small)', category: 'packaging', sku: 'PKG-002', currentStock: 150, minStock: 200, maxStock: 1000, unit: 'piece', unitCost: 0.25, lastRestocked: '2024-12-28', supplier: 'PackRight Ltd', status: 'low-stock' },
  { id: 'inv-007', name: 'Hangers (Plastic)', category: 'supplies', sku: 'SUP-001', currentStock: 800, minStock: 300, maxStock: 2000, unit: 'piece', unitCost: 0.15, lastRestocked: '2025-01-06', supplier: 'HangerWorld', status: 'in-stock' },
  { id: 'inv-008', name: 'Dry Cleaning Solvent', category: 'supplies', sku: 'SUP-002', currentStock: 8, minStock: 10, maxStock: 40, unit: 'drum', unitCost: 189.99, lastRestocked: '2024-12-20', supplier: 'ChemClean Corp', status: 'low-stock' },
  { id: 'inv-009', name: 'Steam Iron Filters', category: 'equipment', sku: 'EQP-001', currentStock: 0, minStock: 5, maxStock: 20, unit: 'piece', unitCost: 45.99, lastRestocked: '2024-11-15', supplier: 'IronMaster Inc', status: 'out-of-stock' },
];

// Complaints
export const complaints: Complaint[] = [
  {
    id: 'cmp-001',
    orderId: 'ord-105',
    orderNumber: 'ORD-2025-0105',
    customerId: 'cust-002',
    customerName: 'Sarah Johnson',
    type: 'quality',
    priority: 'medium',
    status: 'investigating',
    description: 'Stain was not fully removed from silk blouse. Customer expected better results.',
    resolution: null,
    compensationAmount: 0,
    createdAt: '2025-01-10T11:30:00Z',
    resolvedAt: null,
    assignedTo: 'Quality Manager',
  },
  {
    id: 'cmp-002',
    orderId: 'ord-098',
    orderNumber: 'ORD-2025-0098',
    customerId: 'cust-007',
    customerName: 'Jennifer Brown',
    type: 'delay',
    priority: 'high',
    status: 'resolved',
    description: 'Order was delivered 2 days late due to driver shortage.',
    resolution: 'Apologized to customer and provided 20% discount on next order. Implemented backup driver system.',
    compensationAmount: 15.50,
    createdAt: '2025-01-08T09:15:00Z',
    resolvedAt: '2025-01-09T14:20:00Z',
    assignedTo: 'Operations Manager',
  },
  {
    id: 'cmp-003',
    orderId: 'ord-112',
    orderNumber: 'ORD-2025-0112',
    customerId: 'cust-011',
    customerName: 'Thomas Anderson',
    type: 'damage',
    priority: 'urgent',
    status: 'open',
    description: 'Button missing from expensive suit jacket after dry cleaning.',
    resolution: null,
    compensationAmount: 0,
    createdAt: '2025-01-11T08:45:00Z',
    resolvedAt: null,
    assignedTo: null,
  },
  {
    id: 'cmp-004',
    orderId: 'ord-089',
    orderNumber: 'ORD-2025-0089',
    customerId: 'cust-004',
    customerName: 'Emily Davis',
    type: 'billing',
    priority: 'low',
    status: 'closed',
    description: 'Customer was charged twice for the same order.',
    resolution: 'Refunded duplicate charge and added $10 credit to account.',
    compensationAmount: 10.00,
    createdAt: '2025-01-06T16:00:00Z',
    resolvedAt: '2025-01-07T10:30:00Z',
    assignedTo: 'Billing Department',
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalOrders: 1247,
  pendingOrders: 23,
  inProcessOrders: 45,
  completedToday: 38,
  todayRevenue: 2840.50,
  weeklyRevenue: 18520.75,
  monthlyRevenue: 67890.00,
  activeCustomers: 892,
  pendingPickups: 12,
  pendingDeliveries: 18,
  openComplaints: 3,
  avgTurnaroundHours: 52,
};

// Menu Items for Sidebar
export const laundryMenuItems: MenuItem[] = [
  {
    id: 'laundry',
    label: 'Orders',
    icon: ClipboardList,
    path: '/dashboard/laundry/orders',
    color: '#0ea5e9',
  },
  {
    id: 'laundry-new-order',
    label: 'New Order',
    icon: Plus,
    path: '/dashboard/laundry/orders/new',
    color: '#22c55e',
  },
  {
    id: 'laundry-customers',
    label: 'Customers',
    icon: Users,
    path: '/dashboard/laundry/customers',
    color: '#8b5cf6',
  },
  {
    id: 'laundry-services',
    label: 'Services & Pricing',
    icon: Shirt,
    path: '/dashboard/laundry/services',
    color: '#f97316',
  },
  {
    id: 'laundry-delivery',
    label: 'Pickup & Delivery',
    icon: Truck,
    path: '/dashboard/laundry/delivery',
    color: '#06b6d4',
  },
  {
    id: 'laundry-garments',
    label: 'Garment Tracking',
    icon: Package,
    path: '/dashboard/laundry/garments',
    color: '#ec4899',
  },
  {
    id: 'laundry-inventory',
    label: 'Inventory',
    icon: Package,
    path: '/dashboard/laundry/inventory',
    color: '#10b981',
  },
  {
    id: 'laundry-complaints',
    label: 'Complaints',
    icon: AlertTriangle,
    path: '/dashboard/laundry/complaints',
    color: '#ef4444',
  },
  {
    id: 'laundry-reports',
    label: 'Reports',
    icon: BarChart3,
    path: '/dashboard/laundry/reports',
    color: '#6366f1',
  },
];

// Helper functions
export const getCustomerById = (id: string): LaundryCustomer | undefined => {
  return customers.find((c) => c.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((o) => o.id === id);
};

export const getDriverById = (id: string): Driver | undefined => {
  return drivers.find((d) => d.id === id);
};

export const getServiceById = (id: string): LaundryService | undefined => {
  return services.find((s) => s.id === id);
};

export const getCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find((c) => c.id === id);
};

export const getGarmentTypeById = (id: string): GarmentType | undefined => {
  return garmentTypes.find((g) => g.id === id);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: Order['status']): string => {
  const statusObj = orderStatuses.find((s) => s.id === `status-${status}`);
  return statusObj?.color || '#64748b';
};
