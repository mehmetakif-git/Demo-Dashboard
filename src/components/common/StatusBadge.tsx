import { cn } from '@/utils/helpers';

type StatusVariant =
  | 'active' | 'inactive' | 'on-leave'
  | 'pending' | 'approved' | 'rejected'
  | 'present' | 'late' | 'absent'
  | 'paid' | 'completed' | 'in-progress'
  | 'closed' | 'on-hold'
  | 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  size?: 'sm' | 'md';
  className?: string;
}

const getVariantStyles = (status: string): string => {
  const normalizedStatus = status.toLowerCase().replace(/[_\s]/g, '-');

  const styles: Record<string, string> = {
    // Employee/General status
    'active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'inactive': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'on-leave': 'bg-orange-500/20 text-orange-400 border-orange-500/30',

    // Leave/Approval status
    'pending': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'approved': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'rejected': 'bg-red-500/20 text-red-400 border-red-500/30',

    // Attendance status
    'present': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'late': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'absent': 'bg-red-500/20 text-red-400 border-red-500/30',

    // Payment/Progress status
    'paid': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',

    // Job posting status
    'closed': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'on-hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',

    // Generic variants
    'success': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'warning': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'error': 'bg-red-500/20 text-red-400 border-red-500/30',
    'info': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'default': 'bg-gray-500/20 text-gray-400 border-gray-500/30',

    // Employment type
    'full-time': 'bg-[#547792]/20 text-[#94B4C1] border-[#547792]/30',
    'part-time': 'bg-[#94B4C1]/20 text-[#94B4C1] border-[#94B4C1]/30',
    'contract': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };

  return styles[normalizedStatus] || styles['default'];
};

const formatStatus = (status: string): string => {
  return status
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const StatusBadge = ({
  status,
  size = 'md',
  className,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium border',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        getVariantStyles(status),
        className
      )}
    >
      {formatStatus(status)}
    </span>
  );
};
