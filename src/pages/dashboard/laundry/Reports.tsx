import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  DollarSign,
  Package,
  Users,
  Truck,
  Download,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  dashboardStats,
  orders,
  customers,
  formatCurrency,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Reports = () => {
  const { t } = useTranslation('laundry');
  const [dateRange, setDateRange] = useState('month');
  const stats = dashboardStats;

  // Calculate some metrics
  const avgOrderValue = stats.monthlyRevenue / stats.totalOrders;
  const customerRetentionRate = Math.round((customers.filter(c => c.totalOrders > 1).length / customers.length) * 100);
  const deliverySuccessRate = Math.round(
    (orders.filter(o => o.status === 'delivered').length / orders.filter(o => o.status !== 'pending').length) * 100
  );

  const reportCards = [
    {
      title: t('reports.revenueReport'),
      description: t('reports.revenueReportDesc'),
      icon: DollarSign,
      color: '#10b981',
      metrics: [
        { label: t('reports.todayLabel'), value: formatCurrency(stats.todayRevenue), change: '+12%', positive: true },
        { label: t('reports.thisWeekLabel'), value: formatCurrency(stats.weeklyRevenue), change: '+8%', positive: true },
        { label: t('reports.thisMonthLabel'), value: formatCurrency(stats.monthlyRevenue), change: '+15%', positive: true },
      ],
    },
    {
      title: t('reports.orderAnalytics'),
      description: t('reports.orderAnalyticsDesc'),
      icon: Package,
      color: '#0ea5e9',
      metrics: [
        { label: t('reports.totalOrdersLabel'), value: stats.totalOrders.toString(), change: '+23%', positive: true },
        { label: t('reports.completedToday'), value: stats.completedToday.toString(), change: '+5%', positive: true },
        { label: t('reports.avgOrderValue'), value: formatCurrency(avgOrderValue), change: '+3%', positive: true },
      ],
    },
    {
      title: t('reports.customerInsights'),
      description: t('reports.customerInsightsDesc'),
      icon: Users,
      color: '#8b5cf6',
      metrics: [
        { label: t('reports.activeCustomersLabel'), value: stats.activeCustomers.toString(), change: '+18%', positive: true },
        { label: t('reports.retentionRate'), value: `${customerRetentionRate}%`, change: '+2%', positive: true },
        { label: t('reports.vipCustomers'), value: customers.filter(c => c.vipStatus).length.toString(), change: '+5%', positive: true },
      ],
    },
    {
      title: t('reports.operationsReport'),
      description: t('reports.operationsReportDesc'),
      icon: Truck,
      color: '#f59e0b',
      metrics: [
        { label: t('reports.avgTurnaround'), value: `${stats.avgTurnaroundHours}h`, change: '-4h', positive: true },
        { label: t('reports.deliverySuccess'), value: `${deliverySuccessRate}%`, change: '+2%', positive: true },
        { label: t('reports.pendingDeliveries'), value: stats.pendingDeliveries.toString(), change: '-3', positive: true },
      ],
    },
  ];

  // Mock chart data for revenue
  const revenueData = [
    { day: 'Mon', value: 2450 },
    { day: 'Tue', value: 3200 },
    { day: 'Wed', value: 2890 },
    { day: 'Thu', value: 3450 },
    { day: 'Fri', value: 4100 },
    { day: 'Sat', value: 4800 },
    { day: 'Sun', value: 2100 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  // Service breakdown mock data
  const serviceBreakdown = [
    { name: 'Wash & Fold', percentage: 35, color: '#0ea5e9' },
    { name: 'Dry Cleaning', percentage: 30, color: '#8b5cf6' },
    { name: 'Ironing & Press', percentage: 20, color: '#f59e0b' },
    { name: 'Specialty Items', percentage: 10, color: '#ec4899' },
    { name: 'Alterations', percentage: 5, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.title')}
        subtitle={t('reports.subtitle')}
        actions={
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="today">{t('reports.today')}</option>
              <option value="week">{t('reports.thisWeek')}</option>
              <option value="month">{t('reports.thisMonth')}</option>
              <option value="quarter">{t('reports.thisQuarter')}</option>
              <option value="year">{t('reports.thisYear')}</option>
            </select>
            <Button variant="secondary" leftIcon={<Download size={16} />}>
              {t('reports.export')}
            </Button>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('reports.monthlyRevenue')}
          value={formatCurrency(stats.monthlyRevenue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('reports.totalOrders')}
          value={stats.totalOrders.toString()}
          icon={Package}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title={t('reports.activeCustomers')}
          value={stats.activeCustomers.toString()}
          icon={Users}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('reports.complaints')}
          value={stats.openComplaints.toString()}
          icon={BarChart3}
          iconColor="#ef4444"
        />
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((report, index) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${report.color}20`, color: report.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{report.title}</h3>
                    <p className="text-sm text-text-muted">{report.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {report.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-text-secondary">{metric.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-text-primary">{metric.value}</span>
                        <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded ${
                          metric.positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {metric.positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="secondary" className="w-full mt-6" leftIcon={<BarChart3 size={16} />}>
                  {t('reports.viewFullReport')}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">{t('reports.weeklyRevenue')}</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {revenueData.map((data, index) => (
              <motion.div
                key={data.day}
                className="flex-1 flex flex-col items-center"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="w-full bg-sky-500/80 rounded-t-lg relative group cursor-pointer hover:bg-sky-500 transition-colors"
                  style={{ height: `${(data.value / maxRevenue) * 100}%`, minHeight: '20px' }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 rounded text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatCurrency(data.value)}
                  </div>
                </div>
                <span className="text-xs text-text-muted mt-2">{data.day}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Service Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">{t('reports.serviceBreakdown')}</h3>
          <div className="space-y-4">
            {serviceBreakdown.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">{service.name}</span>
                  <span className="font-medium text-text-primary">{service.percentage}%</span>
                </div>
                <div className="h-2 bg-white/[0.1] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: service.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{t('reports.generateReports')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: t('reports.revenueReportBtn'), icon: DollarSign },
            { name: t('reports.orderSummary'), icon: Package },
            { name: t('reports.customerAnalysis'), icon: Users },
            { name: t('reports.operationsReportBtn'), icon: Truck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Button key={item.name} variant="secondary" className="justify-start" leftIcon={<Icon size={16} />}>
                {item.name}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
