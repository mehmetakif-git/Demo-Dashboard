import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface CardProps {
  className?: string;
  variant?: 'default' | 'glass' | 'gradient-border';
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
      'rounded-xl',
      paddings[padding],
      variant === 'default' && 'bg-background-secondary border border-border-default',
      variant === 'glass' && 'glass-card',
      variant === 'gradient-border' && 'gradient-border rounded-xl'
    );

    const hoverStyles = hover
      ? 'hover:border-border-hover hover:shadow-lg transition-all duration-200'
      : '';

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, hoverStyles, className)}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={onClick}
      >
        {variant === 'gradient-border' ? (
          <div className="relative z-10">{children}</div>
        ) : (
          children
        )}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
