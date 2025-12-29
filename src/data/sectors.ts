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
} from 'lucide-react';
import type { Sector } from '@/types';

export const sectors: Sector[] = [
  // Active sectors
  {
    id: 'gym-fitness',
    name: 'Gym & Fitness',
    description: 'Gym and fitness center management',
    icon: Dumbbell,
    isActive: true,
  },
  {
    id: 'manpower-staffing',
    name: 'Manpower & Staffing',
    description: 'Recruitment and staffing solutions',
    icon: Users,
    isActive: true,
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property and real estate management',
    icon: Building,
    isActive: true,
  },
  {
    id: 'advertising-agency',
    name: 'Advertising Agency',
    description: 'Creative and media agency operations',
    icon: Megaphone,
    isActive: true,
  },
  {
    id: 'event-company',
    name: 'Event Company',
    description: 'Event planning and management',
    icon: Calendar,
    isActive: true,
  },
  // Coming soon sectors
  {
    id: 'e-commerce',
    name: 'E-Commerce',
    description: 'Online retail management',
    icon: ShoppingCart,
    isActive: false,
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Restaurant and cafe operations',
    icon: Utensils,
    isActive: false,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinic and hospital management',
    icon: Heart,
    isActive: false,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'School and course management',
    icon: GraduationCap,
    isActive: false,
  },
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'Hospitality management',
    icon: Hotel,
    isActive: false,
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'Construction project tracking',
    icon: HardHat,
    isActive: false,
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Fleet and shipment management',
    icon: Truck,
    isActive: false,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production operations',
    icon: Factory,
    isActive: false,
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Law firm management',
    icon: Scale,
    isActive: false,
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Retail store operations',
    icon: Store,
    isActive: false,
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial services',
    icon: TrendingUp,
    isActive: false,
  },
  {
    id: 'beauty-salon',
    name: 'Beauty Salon',
    description: 'Salon and spa management',
    icon: Scissors,
    isActive: false,
  },
  {
    id: 'print-shop',
    name: 'Print Shop',
    description: 'Print production management',
    icon: Printer,
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
