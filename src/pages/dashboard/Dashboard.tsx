import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DollarSign, Users, Clock, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { getSectorById } from '@/data/sectors';
import { kpiData } from '@/data/dashboardData';
import {
  KPICard,
  RevenueChart,
  TasksChart,
  RecentActivities,
  UpcomingTasks,
  QuickActions,
} from '@/components/dashboard';

const getLocale = (): string => {
  const lang = localStorage.getItem('i18nextLng')?.substring(0, 2);
  return lang === 'tr' ? 'tr-TR' : 'en-US';
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString(getLocale(), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString(getLocale(), {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const user = useAuthStore((state) => state.user);
  const { selectedSector } = useAppStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  const sector = selectedSector ? getSectorById(selectedSector) : null;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-bold text-white">
            {t('welcomeBack', { name: user?.name || 'User' })}
          </h1>
          <p className="text-white/60 mt-1">
            {sector?.name || 'Business'} {t('title')}
          </p>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-right"
        >
          <p className="text-white font-medium">{formatTime(currentTime)}</p>
          <p className="text-white/40 text-sm">{formatDate(currentTime)}</p>
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title={t('kpis.totalRevenue')}
          value={kpiData.totalRevenue.value}
          prefix="$"
          change={kpiData.totalRevenue.change}
          changeType={kpiData.totalRevenue.changeType}
          changeLabel={t('kpis.fromLastMonth')}
          icon={DollarSign}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.1}
        />
        <KPICard
          title={t('kpis.activeMembers')}
          value={kpiData.activeClients.value}
          change={kpiData.activeClients.change}
          changeType={kpiData.activeClients.changeType}
          changeLabel={t('kpis.fromLastMonth')}
          icon={Users}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.15}
        />
        <KPICard
          title={t('kpis.pendingTasks')}
          value={kpiData.pendingTasks.value}
          change={t('kpis.urgent_other', { count: 5 })}
          changeType={kpiData.pendingTasks.changeType}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <KPICard
          title={t('kpis.monthlyGrowth')}
          value={kpiData.growthRate.value}
          prefix="+"
          suffix="%"
          decimals={1}
          change={t('kpis.onTrack')}
          changeType={kpiData.growthRate.changeType}
          icon={TrendingUp}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TasksChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivities />
        <UpcomingTasks />
        <QuickActions />
      </div>
    </div>
  );
};
