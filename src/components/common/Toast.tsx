import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '@/hooks/useToast';
import type { ToastType } from '@/types';
import { cn } from '@/utils/helpers';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const colors: Record<ToastType, string> = {
  success: 'text-success border-success/20 bg-success/10',
  error: 'text-error border-error/20 bg-error/10',
  warning: 'text-warning border-warning/20 bg-warning/10',
  info: 'text-accent-primary border-accent-primary/20 bg-accent-primary/10',
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm',
              'bg-white/[0.03] backdrop-blur-xl/90',
              colors[toast.type]
            )}
          >
            <span className={cn(colors[toast.type].split(' ')[0])}>
              {icons[toast.type]}
            </span>
            <span className="text-sm font-medium text-text-primary">
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
