import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface CardProps {
  className?: string;
  variant?: 'default' | 'glass' | 'solid' | 'gradient-border';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onClick?: () => void;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hover = false,
      padding = 'md',
      children,
      onClick,
    },
    ref
  ) => {
    const baseStyles = cn(
      'rounded-xl relative overflow-hidden',
      paddings[padding],
      // Default is now glass
      (variant === 'default' || variant === 'glass') &&
        'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]',
      variant === 'solid' && 'bg-[#12121a] border border-[#1e1e2e]',
      variant === 'gradient-border' && 'gradient-border rounded-xl'
    );

    const hoverStyles = hover
      ? 'hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300'
      : '';

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, hoverStyles, className)}
        whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={onClick}
      >
        {/* Glass shimmer overlay */}
        {(variant === 'default' || variant === 'glass') && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
        )}

        {variant === 'gradient-border' ? (
          <div className="relative z-10">{children}</div>
        ) : (
          <div className="relative z-10">{children}</div>
        )}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
