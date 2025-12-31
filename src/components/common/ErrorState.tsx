import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import type { ElementType } from 'react';

interface ErrorStateProps {
  icon?: ElementType;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showSupport?: boolean;
}

export const ErrorState = ({
  icon: Icon = AlertCircle,
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
  showSupport = false,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <p className="text-[#94a3b8] text-sm text-center max-w-sm mb-6">
        {message}
      </p>
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-[#6366f1] hover:bg-[#5558e3] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
        {showSupport && (
          <button className="flex items-center gap-2 px-4 py-2 border border-[#1e1e2e] bg-[#1a1a24] hover:bg-[#252532] text-white text-sm font-medium rounded-lg transition-colors">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </button>
        )}
      </div>
    </motion.div>
  );
};
