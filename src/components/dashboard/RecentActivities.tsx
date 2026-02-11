import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, DollarSign, Check, Ticket, Calendar, FileText, ChevronRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  user: User,
  dollar: DollarSign,
  check: Check,
  ticket: Ticket,
  calendar: Calendar,
  file: FileText,
};

const activities = [
  { id: 1, icon: "user", color: "#10b981", textKey: "newMember", textParams: { name: "John Smith" }, timeKey: "hoursAgo", timeParams: { count: 2 } },
  { id: 2, icon: "dollar", color: "#6366f1", textKey: "invoicePaid", textParams: { id: "1234" }, timeKey: "hoursAgo", timeParams: { count: 3 } },
  { id: 3, icon: "check", color: "#10b981", textKey: "taskCompleted", textParams: { task: "Website redesign" }, timeKey: "hoursAgo", timeParams: { count: 5 } },
  { id: 4, icon: "ticket", color: "#f59e0b", textKey: "newTicket", textParams: {}, timeKey: "hoursAgo", timeParams: { count: 6 } },
  { id: 5, icon: "calendar", color: "#8b5cf6", textKey: "leaveApproved", textParams: {}, timeKey: "hoursAgo", timeParams: { count: 8 } },
  { id: 6, icon: "file", color: "#6366f1", textKey: "reportGenerated", textParams: {}, timeKey: "dayAgo", timeParams: { count: 1 } },
];

export const RecentActivities = () => {
  const { t } = useTranslation('dashboard');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 overflow-hidden"
    >
      {/* Glass shimmer overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">{t('recentActivities.title')}</h3>
      </div>

      {/* Activities List */}
      <div className="relative z-10 space-y-4">
        {activities.map((activity, index) => {
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
                  {t(`recentActivities.${activity.textKey}`, activity.textParams)}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  {t(`recentActivities.${activity.timeKey}`, activity.timeParams)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All */}
      <button className="relative z-10 flex items-center gap-1 text-[#547792] text-sm font-medium mt-5 hover:text-[#94B4C1] transition-colors group">
        {t('recentActivities.viewAll')}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};
