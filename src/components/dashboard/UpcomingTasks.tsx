import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { upcomingTasks } from '@/data/dashboardData';

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-blue-500',
};

export const UpcomingTasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4 }}
      className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 overflow-hidden"
    >
      {/* Glass shimmer overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">Upcoming Tasks</h3>
      </div>

      {/* Tasks List */}
      <div className="relative z-10 space-y-3">
        {upcomingTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer"
          >
            {/* Priority indicator */}
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColors[task.priority]}`} />

            {/* Task info */}
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm font-medium truncate">{task.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{task.dueDate}</p>
            </div>

            {/* Assignee avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">{task.assignee}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <button className="relative z-10 flex items-center gap-1 text-[#6366f1] text-sm font-medium mt-5 hover:text-[#8b5cf6] transition-colors group">
        View All
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};
