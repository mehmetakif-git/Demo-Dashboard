import { motion } from 'framer-motion';
import { UserPlus, FileText, Plus, BarChart3, Send, Calendar } from 'lucide-react';

const actions = [
  { id: 1, label: 'Add Member', icon: UserPlus, color: '#10b981' },
  { id: 2, label: 'Create Invoice', icon: FileText, color: '#6366f1' },
  { id: 3, label: 'New Task', icon: Plus, color: '#f59e0b' },
  { id: 4, label: 'Generate Report', icon: BarChart3, color: '#8b5cf6' },
  { id: 5, label: 'Send Message', icon: Send, color: '#06b6d4' },
  { id: 6, label: 'Schedule Meeting', icon: Calendar, color: '#ec4899' },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
