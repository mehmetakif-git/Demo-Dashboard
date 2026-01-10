import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ElementType;
  actions?: ReactNode;
}

export const PageHeader = ({ title, subtitle, icon: Icon, actions }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-[#547792]/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#547792]" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-white/60 text-sm mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </motion.div>
  );
};
