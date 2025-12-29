import type { LucideIcon } from 'lucide-react';

// User types
export interface User {
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

// Sector types
export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
}

// Account type
export type AccountType = 'admin' | 'staff';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Menu item types
export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  badge?: string | number;
  children?: MenuItem[];
}

export interface MenuGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

// KPI Card types
export interface KPICard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
}

// Route guard types
export interface RouteGuardProps {
  children: React.ReactNode;
}
