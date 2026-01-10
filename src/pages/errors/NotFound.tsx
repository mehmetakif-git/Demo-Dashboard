import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-[150px] font-bold text-background-tertiary leading-none select-none">
              404
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#94B4C1] to-[#547792] flex items-center justify-center shadow-lg shadow-[#94B4C1]/20">
                <FileQuestion className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Check the URL or navigate back to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-6 py-3 text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-12 p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
          <p className="text-text-muted text-sm mb-3">Looking for something?</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search for pages..."
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.05] py-3 pl-12 pr-4 text-white placeholder-text-muted focus:border-accent-primary focus:outline-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
