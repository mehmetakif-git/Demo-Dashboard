import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  title,
  message,
  onRetry,
  showSupport = false,
}: ErrorStateProps) => {
  const { t } = useTranslation('common');
  const displayTitle = title || t('error.general');
  const displayMessage = message || t('error.tryAgain');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{displayTitle}</h3>
      <p className="text-text-secondary text-sm text-center max-w-sm mb-6">
        {displayMessage}
      </p>
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:opacity-90 text-background-primary text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {t('buttons.retry')}
          </button>
        )}
        {showSupport && (
          <button className="flex items-center gap-2 px-4 py-2 border border-white/[0.08] bg-white/[0.05] hover:bg-border-hover text-white text-sm font-medium rounded-lg transition-colors">
            <MessageCircle className="h-4 w-4" />
            {t('buttons.contactSupport', 'Contact Support')}
          </button>
        )}
      </div>
    </motion.div>
  );
};
