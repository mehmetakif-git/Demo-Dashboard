import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, RefreshCw, MessageCircle, ServerCrash, AlertTriangle } from 'lucide-react';

export const ServerError = () => {
  const { t } = useTranslation('errors');
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        {/* 500 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-[150px] font-bold text-background-tertiary leading-none select-none">
              500
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <ServerCrash className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Warning icon */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span className="text-amber-400 text-sm font-medium">{t('serverError.title')}</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-3">{t('serverError.title')}</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          {t('serverError.description')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-6 py-3 text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {t('serverError.retry')}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" />
            {t('serverError.goHome')}
          </button>
        </div>

        {/* Support contact */}
        <div className="mt-12 p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageCircle className="h-5 w-5 text-accent-primary" />
            <p className="text-white font-medium">Need immediate help?</p>
          </div>
          <p className="text-text-muted text-sm mb-4">
            Contact our support team for assistance.
          </p>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent-primary px-4 py-2 text-sm font-medium text-accent-primary hover:bg-accent-primary/10 transition-colors">
            Contact Support
          </button>
        </div>

        {/* Technical info */}
        <p className="mt-6 text-xs text-text-muted">
          Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </p>
      </motion.div>
    </div>
  );
};
