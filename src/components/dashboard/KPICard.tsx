import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { AnimatedCounter } from './AnimatedCounter';

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  changeType: 'positive' | 'negative' | 'warning' | 'neutral';
  changeLabel?: string;
  icon: ElementType;
  iconColor: string;
  iconBg: string;
  delay?: number;
}

export const KPICard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  change,
  changeType,
  changeLabel = '',
  icon: Icon,
  iconColor,
  iconBg,
  delay = 0,
}: KPICardProps) => {
  const changeColors = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    warning: 'text-orange-400',
    neutral: 'text-white/60',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6 hover:border-[#2e2e3e] hover:shadow-lg hover:shadow-[#6366f1]/5 transition-all duration-300 group overflow-hidden"
    >
      {/* Background sparkline effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#6366f1]/5 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
        </div>

        {/* Value */}
        <div className="mb-1">
          <span className="text-3xl font-bold text-white">
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          </span>
        </div>

        {/* Title */}
        <p className="text-white/60 text-sm mb-3">{title}</p>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
          {changeLabel && (
            <span className="text-white/40 text-sm">{changeLabel}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
