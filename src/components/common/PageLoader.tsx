import { motion } from 'framer-motion';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated Logo/Spinner */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-[#1e1e2e]"
            style={{ borderTopColor: '#6366f1' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-[#1e1e2e]"
            style={{ borderTopColor: '#8b5cf6' }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="text-[#94a3b8] text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

// Full page version for route transitions
export const FullPageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <PageLoader message={message} />
    </div>
  );
};

// Inline loader for smaller areas
export const InlineLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <motion.div
      className={`${sizes[size]} rounded-full border-[#1e1e2e]`}
      style={{ borderTopColor: '#6366f1' }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};
