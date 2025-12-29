import { motion } from 'framer-motion';
import type { ElementType } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ElementType;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
  trend?: {
    value: string;
    type: 'up' | 'down' | 'neutral';
  };
  delay?: number;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = '#6366f1',
  iconBg = 'rgba(99, 102, 241, 0.2)',
  subtitle,
  trend,
  delay = 0,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/60 text-xs font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-white/40 text-xs mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-xs mt-1 ${
              trend.type === 'up' ? 'text-emerald-400' :
              trend.type === 'down' ? 'text-red-400' :
              'text-white/40'
            }`}>
              {trend.type === 'up' && '+'}{trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};
