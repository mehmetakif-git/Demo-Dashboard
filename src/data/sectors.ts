import {
  Dumbbell,
  Users,
  Building,
  Megaphone,
  Calendar,
  ShoppingCart,
  Utensils,
  Heart,
  GraduationCap,
  Hotel,
  HardHat,
  Truck,
  Factory,
  Scale,
  Store,
  TrendingUp,
  Scissors,
  Printer,
  Shirt,
  Wrench,
} from 'lucide-react';
import type { Sector } from '@/types';

export const sectors: Sector[] = [
  // Active sectors
  {
    id: 'gym-fitness',
    name: 'Gym & Fitness',
    description: 'Gym and fitness center management',
    icon: Dumbbell,
    color: '#ef4444', // Red - energy, power
    isActive: true,
  },
  {
    id: 'manpower-staffing',
    name: 'Manpower & Staffing',
    description: 'Recruitment and staffing solutions',
    icon: Users,
    color: '#3b82f6', // Blue - trust, professionalism
    isActive: true,
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property and real estate management',
    icon: Building,
    color: '#8b5cf6', // Purple - luxury, premium
    isActive: true,
  },
  {
    id: 'advertising-agency',
    name: 'Advertising Agency',
    description: 'Creative and media agency operations',
    icon: Megaphone,
    color: '#f97316', // Orange - creativity, energy
    isActive: true,
  },
  {
    id: 'event-company',
    name: 'Event Company',
    description: 'Event planning and management',
    icon: Calendar,
    color: '#ec4899', // Pink - celebration, events
    isActive: true,
  },
  // Coming soon sectors
  {
    id: 'e-commerce',
    name: 'E-Commerce',
    description: 'Online retail management',
    icon: ShoppingCart,
    color: '#10b981', // Emerald - commerce, growth
    isActive: false,
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Restaurant and cafe operations',
    icon: Utensils,
    color: '#f59e0b', // Amber - food, warmth
    isActive: false,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinic and hospital management',
    icon: Heart,
    color: '#ef4444', // Red - health, care
    isActive: false,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'School and course management',
    icon: GraduationCap,
    color: '#6366f1', // Indigo - knowledge, wisdom
    isActive: false,
  },
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'Hospitality management',
    icon: Hotel,
    color: '#14b8a6', // Teal - hospitality, calm
    isActive: false,
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'Construction project tracking',
    icon: HardHat,
    color: '#f59e0b', // Amber - construction, safety
    isActive: false,
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Fleet and shipment management',
    icon: Truck,
    color: '#06b6d4', // Cyan - transport, movement
    isActive: false,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production operations',
    icon: Factory,
    color: '#64748b', // Slate - industrial
    isActive: false,
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Law firm management',
    icon: Scale,
    color: '#8b5cf6', // Purple - authority, justice
    isActive: false,
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Retail store operations',
    icon: Store,
    color: '#22c55e', // Green - retail, fresh
    isActive: false,
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial services',
    icon: TrendingUp,
    color: '#10b981', // Emerald - money, growth
    isActive: false,
  },
  {
    id: 'beauty-salon',
    name: 'Beauty Salon',
    description: 'Salon and spa management',
    icon: Scissors,
    color: '#ec4899', // Pink - beauty, elegance
    isActive: true,
  },
  {
    id: 'laundry',
    name: 'Laundry & Dry Cleaning',
    description: 'Laundry and dry cleaning operations',
    icon: Shirt,
    color: '#0ea5e9', // Sky blue - clean, fresh
    isActive: true,
  },
  {
    id: 'hardware',
    name: 'Hardware & Inventory',
    description: 'Hardware store and inventory management',
    icon: Wrench,
    color: '#f59e0b', // Amber - tools, industrial
    isActive: true,
  },
  {
    id: 'print-shop',
    name: 'Print Shop',
    description: 'Print production management',
    icon: Printer,
    color: '#64748b', // Slate - print, ink
    isActive: false,
  },
];

// Get active sectors only
export const getActiveSectors = (): Sector[] => {
  return sectors.filter((sector) => sector.isActive);
};

// Get coming soon sectors only
export const getComingSoonSectors = (): Sector[] => {
  return sectors.filter((sector) => !sector.isActive);
};

// Find sector by ID
export const getSectorById = (id: string): Sector | undefined => {
  return sectors.find((sector) => sector.id === id);
};
