import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const GlowInput = React.forwardRef<HTMLInputElement, GlowInputProps>(
  ({ className, type, icon, rightElement, onChange, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Trigger typing animation
      setIsTyping(true);

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Stop typing animation after 150ms of no input
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 150);

      // Call original onChange if provided
      onChange?.(e);
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div className="group/input relative">
        {/* Glass container */}
        <motion.div
          className={cn(
            'relative rounded-xl border transition-all duration-300',
            'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]',
            focused
              ? 'bg-white/[0.08] backdrop-blur-xl border-white/[0.15]'
              : 'bg-white/[0.03] backdrop-blur-sm border-white/[0.08] hover:border-white/[0.12] hover:bg-white/[0.05]'
          )}
        >
          {/* Glass shimmer overlay */}
          <div className={cn(
            'absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none transition-opacity duration-300',
            focused ? 'opacity-100' : 'opacity-50'
          )} />

          {icon && (
            <motion.div
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              initial={false}
              animate={{
                scale: isTyping ? [1, 1.15, 1] : focused ? [1, 1.2, 1] : 1,
                rotate: isTyping ? [0, -5, 5, 0] : focused ? [0, -10, 10, 0] : 0,
                y: isTyping ? [0, -2, 0] : 0,
                color: isTyping
                  ? ['#06b6d4', '#94B4C1', '#ec4899', '#f97316', '#10b981', '#06b6d4']
                  : focused
                    ? 'rgba(255,255,255,0.8)'
                    : 'rgba(255,255,255,0.4)',
                filter: isTyping
                  ? [
                      'drop-shadow(0 0 4px #06b6d4)',
                      'drop-shadow(0 0 6px #94B4C1)',
                      'drop-shadow(0 0 4px #ec4899)',
                      'drop-shadow(0 0 6px #f97316)',
                      'drop-shadow(0 0 4px #10b981)',
                      'drop-shadow(0 0 4px #06b6d4)',
                    ]
                  : 'drop-shadow(0 0 0px transparent)',
              }}
              transition={{
                scale: {
                  duration: isTyping ? 0.15 : 0.4,
                  ease: 'easeOut',
                  repeat: isTyping ? Infinity : 0,
                },
                rotate: {
                  duration: isTyping ? 0.15 : 0.4,
                  ease: 'easeOut',
                  repeat: isTyping ? Infinity : 0,
                },
                y: {
                  duration: 0.15,
                  ease: 'easeOut',
                  repeat: isTyping ? Infinity : 0,
                },
                color: {
                  duration: isTyping ? 1.5 : 0.3,
                  ease: 'linear',
                  repeat: isTyping ? Infinity : 0,
                },
                filter: {
                  duration: isTyping ? 1.5 : 0.3,
                  ease: 'linear',
                  repeat: isTyping ? Infinity : 0,
                },
              }}
            >
              {icon}
            </motion.div>
          )}
          <input
            type={type}
            className={cn(
              'relative flex h-12 w-full rounded-xl border-none px-4 py-3 text-sm text-white',
              'bg-transparent',
              'placeholder:text-white/40',
              'transition duration-300',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-12',
              rightElement && 'pr-12',
              className
            )}
            ref={ref}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {rightElement && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {rightElement}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }
);

GlowInput.displayName = 'GlowInput';

export { GlowInput };
