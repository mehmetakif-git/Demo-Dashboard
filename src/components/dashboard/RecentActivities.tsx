import { motion } from 'framer-motion';
import { User, DollarSign, Check, Ticket, Calendar, FileText, ChevronRight } from 'lucide-react';
import { recentActivities } from '@/data/dashboardData';

const iconMap: Record<string, any> = {
  user: User,
  dollar: DollarSign,
  check: Check,
  ticket: Ticket,
  calendar: Calendar,
  file: FileText,
};

export const RecentActivities = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = iconMap[activity.icon] || FileText;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="flex items-start gap-3 group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm leading-relaxed truncate">
                  {activity.text}
                </p>
                <p className="text-white/40 text-xs mt-0.5">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All */}
      <button className="flex items-center gap-1 text-[#6366f1] text-sm font-medium mt-5 hover:text-[#8b5cf6] transition-colors group">
        View All
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};
