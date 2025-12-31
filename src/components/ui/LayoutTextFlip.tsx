import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LayoutTextFlipProps {
  text?: string;
  words?: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  wordClassName?: string;
}

export const LayoutTextFlip = ({
  text = 'Build Amazing',
  words = ['Landing Pages', 'Component Blocks', 'Page Sections'],
  duration = 3000,
  className,
  textClassName,
  wordClassName,
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-3', className)}>
      <motion.span
        layoutId="subtext"
        className={cn(
          'text-2xl font-bold tracking-tight text-white drop-shadow-lg md:text-3xl lg:text-4xl',
          textClassName
        )}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={cn(
          'relative overflow-hidden rounded-xl px-4 py-2 font-sans text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl',
          'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-[length:200%_100%]',
          'shadow-lg shadow-purple-500/20',
          'border border-white/10',
          wordClassName
        )}
        style={{ color: '#ffffff' }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          backgroundPosition: {
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: 'blur(10px)', opacity: 0 }}
            animate={{
              y: 0,
              filter: 'blur(0px)',
              opacity: 1,
            }}
            exit={{ y: 50, filter: 'blur(10px)', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};

export default LayoutTextFlip;
