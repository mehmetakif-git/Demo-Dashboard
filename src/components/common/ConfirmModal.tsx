import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2, Info } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const variantStyles = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    buttonBg: 'bg-red-500 hover:bg-red-600',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    icon: Info,
    iconBg: 'bg-[#547792]/20',
    iconColor: 'text-[#547792]',
    buttonBg: 'bg-[#547792] hover:bg-[#456a82]',
  },
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
  loading = false,
}: ConfirmModalProps) => {
  const { t } = useTranslation('common');
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-md rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-lg p-1 text-white/40 hover:bg-white/[0.05] hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 text-center">
                {/* Icon */}
                <div
                  className={cn(
                    'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full',
                    styles.iconBg
                  )}
                >
                  <Icon className={cn('h-8 w-8', styles.iconColor)} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

                {/* Message */}
                <p className="text-[#94a3b8] mb-6">{message}</p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {cancelText || t('buttons.cancel')}
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className={cn(
                      'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed',
                      styles.buttonBg
                    )}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('buttons.processing')}
                      </span>
                    ) : (
                      confirmText || t('buttons.confirm')
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
