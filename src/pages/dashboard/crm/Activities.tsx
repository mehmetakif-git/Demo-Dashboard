import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  Search,
  Clock,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import { activities, type Activity } from '@/data/crmData';
import { useTranslation } from 'react-i18next';

export const Activities = () => {
  const { t } = useTranslation('crm');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [customerFilter, setCustomerFilter] = useState<string>('all');
  const [assignedFilter, setAssignedFilter] = useState<string>('all');

  // Get unique values for filters
  const customers = useMemo(() => [...new Set(activities.map(a => a.customer))], []);
  const assignees = useMemo(() => [...new Set(activities.map(a => a.assignedTo))], []);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch =
        activity.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activity.contact?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesType = typeFilter === 'all' || activity.type === typeFilter;
      const matchesCustomer = customerFilter === 'all' || activity.customer === customerFilter;
      const matchesAssigned = assignedFilter === 'all' || activity.assignedTo === assignedFilter;
      return matchesSearch && matchesType && matchesCustomer && matchesAssigned;
    });
  }, [searchQuery, typeFilter, customerFilter, assignedFilter]);

  // Group activities by date
  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    filteredActivities.forEach(activity => {
      const activityDate = new Date(activity.date).toDateString();
      let groupKey: string;

      if (activityDate === today) {
        groupKey = t('activities.today');
      } else if (activityDate === yesterday) {
        groupKey = t('activities.yesterday');
      } else {
        groupKey = new Date(activity.date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(activity);
    });

    return groups;
  }, [filteredActivities, t]);

  // Calculate stats
  const stats = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const thisWeek = activities.filter(a => new Date(a.date) >= weekAgo);
    const total = thisWeek.length;
    const calls = thisWeek.filter(a => a.type === 'call').length;
    const emails = thisWeek.filter(a => a.type === 'email').length;
    const meetings = thisWeek.filter(a => a.type === 'meeting').length;

    return { total, calls, emails, meetings };
  }, []);

  const getActivityTypeIcon = (type: Activity['type']) => {
    const icons = {
      call: Phone,
      email: Mail,
      meeting: Calendar,
      task: CheckSquare,
    };
    return icons[type];
  };

  const getActivityTypeColor = (type: Activity['type']) => {
    const colors = {
      call: '#10b981',
      email: '#547792',
      meeting: '#f59e0b',
      task: '#94B4C1',
    };
    return colors[type];
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('activities.title')}
        subtitle={t('activities.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
            <Plus className="h-4 w-4" />
            {t('activities.logActivity')}
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('activities.totalActivities')}
          value={stats.total.toString()}
          subtitle={t('activities.thisWeek')}
          icon={Clock}
          iconColor="#547792"
        />
        <StatsCard
          title={t('activities.callsMade')}
          value={stats.calls.toString()}
          icon={Phone}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('activities.emailsSent')}
          value={stats.emails.toString()}
          icon={Mail}
          iconColor="#94B4C1"
        />
        <StatsCard
          title={t('activities.meetingsHeld')}
          value={stats.meetings.toString()}
          icon={Calendar}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filters */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
            <input
              type="text"
              placeholder={t('activities.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#547792]"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
          >
            <option value="all">{t('activities.allTypes')}</option>
            <option value="call">{t('activities.calls')}</option>
            <option value="email">{t('activities.emails')}</option>
            <option value="meeting">{t('activities.meetings')}</option>
            <option value="task">{t('activities.tasks')}</option>
          </select>

          {/* Customer Filter */}
          <select
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
          >
            <option value="all">{t('activities.allCustomers')}</option>
            {customers.map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>

          {/* Assigned Filter */}
          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
          >
            <option value="all">{t('activities.allAssignees')}</option>
            {assignees.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-[#64748b] mb-4">{date}</h3>
            <div className="space-y-3">
              {dateActivities.map((activity) => {
                const Icon = getActivityTypeIcon(activity.type);
                const color = getActivityTypeColor(activity.type);

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 hover:border-[#547792]/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-white">{activity.subject}</h4>
                            <p className="text-sm text-[#94a3b8] mt-1">
                              {activity.customer}
                              {activity.contact && ` • ${activity.contact}`}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm text-[#64748b]">
                              {activity.time || t('activities.allDay')}
                            </p>
                            {activity.duration && (
                              <p className="text-xs text-[#64748b] mt-1">{activity.duration}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.08]">
                          <p className="text-sm text-[#94a3b8]">{activity.outcome}</p>
                          <span className="text-xs text-[#64748b]">{activity.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(groupedActivities).length === 0 && (
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-[#64748b] opacity-50" />
            <p className="text-[#64748b]">{t('activities.noActivitiesFound')}</p>
            <p className="text-sm text-[#64748b] mt-1">{t('activities.tryAdjustingFilters')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
