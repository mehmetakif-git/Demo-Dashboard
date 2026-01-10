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
  iconColor = '#547792',
  iconBg = 'rgba(84, 119, 146, 0.15)',
  subtitle,
  trend,
  delay = 0,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 overflow-hidden group"
    >
      {/* Glass shimmer overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
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
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/[0.08]"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};
