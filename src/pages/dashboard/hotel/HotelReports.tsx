import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Bed,
  Download,
  Filter,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { rooms, reservations, billings, guests, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const HotelReports = () => {
  const { t } = useTranslation('hotel');
  const [dateRange, setDateRange] = useState<string>('month');

  const stats = useMemo(() => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
    const totalRevenue = billings.reduce((acc, b) => acc + b.total, 0);
    const avgDailyRate = Math.round(totalRevenue / (reservations.length || 1));
    const totalGuests = guests.length;

    return {
      occupancyRate,
      totalRevenue,
      avgDailyRate,
      totalGuests,
      revPAR: Math.round((totalRevenue / totalRooms) / 30), // Revenue per available room
    };
  }, []);

  const roomTypeStats = useMemo(() => {
    const typeGroups: Record<string, { count: number; occupied: number; revenue: number }> = {};

    rooms.forEach(room => {
      if (!typeGroups[room.type]) {
        typeGroups[room.type] = { count: 0, occupied: 0, revenue: 0 };
      }
      typeGroups[room.type].count++;
      if (room.status === 'occupied') {
        typeGroups[room.type].occupied++;
      }
    });

    // Add revenue from billings
    billings.forEach(billing => {
      const reservation = reservations.find(r => r.id === billing.reservationId);
      if (reservation && typeGroups[reservation.roomType]) {
        typeGroups[reservation.roomType].revenue += billing.total;
      }
    });

    return Object.entries(typeGroups).map(([type, data]) => ({
      type,
      ...data,
      occupancyRate: Math.round((data.occupied / data.count) * 100),
    }));
  }, []);

  const revenueByCategory = useMemo(() => {
    // Compute revenue by category from billing items
    let roomCharges = 0;
    let foodBeverage = 0;
    let serviceCharges = 0;
    let otherCharges = 0;

    billings.forEach(b => {
      b.items.forEach(item => {
        if (item.category === 'Room Charge') {
          roomCharges += item.total;
        } else if (item.category === 'Food & Beverage' || item.category === 'Mini Bar') {
          foodBeverage += item.total;
        } else if (item.category === 'Service') {
          serviceCharges += item.total;
        } else {
          otherCharges += item.total;
        }
      });
    });

    const total = roomCharges + foodBeverage + serviceCharges + otherCharges || 1;

    return [
      { category: t('reports.roomRevenue'), amount: roomCharges, percentage: Math.round((roomCharges / total) * 100), color: HOTEL_COLOR },
      { category: t('reports.foodAndBeverage'), amount: foodBeverage, percentage: Math.round((foodBeverage / total) * 100), color: '#f59e0b' },
      { category: t('reports.serviceCharges'), amount: serviceCharges, percentage: Math.round((serviceCharges / total) * 100), color: '#3b82f6' },
      { category: t('reports.otherRevenue'), amount: otherCharges, percentage: Math.round((otherCharges / total) * 100), color: '#8b5cf6' },
    ];
  }, [t]);

  const monthlyOccupancy = [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 72 },
    { month: 'Mar', rate: 78 },
    { month: 'Apr', rate: 82 },
    { month: 'May', rate: 75 },
    { month: 'Jun', rate: 88 },
    { month: 'Jul', rate: 92 },
    { month: 'Aug', rate: 95 },
    { month: 'Sep', rate: 85 },
    { month: 'Oct', rate: 80 },
    { month: 'Nov', rate: 70 },
    { month: 'Dec', rate: 85 },
  ];

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.title')}
        subtitle={t('reports.subtitle')}
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            <Button variant="ghost">
              <Filter size={18} />
              {t('reports.filter')}
            </Button>
            <Button>
              <Download size={18} />
              {t('reports.export')}
            </Button>
          </div>
        }
      />

      {/* Date Range Selector */}
      <Card className="p-4">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'today', label: t('reports.today') },
            { id: 'week', label: t('reports.thisWeek') },
            { id: 'month', label: t('reports.thisMonth') },
            { id: 'quarter', label: t('reports.thisQuarter') },
            { id: 'year', label: t('reports.thisYear') },
          ].map((range) => (
            <Button
              key={range.id}
              variant={dateRange === range.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setDateRange(range.id)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('reports.occupancyRate'), value: `${stats.occupancyRate}%`, icon: Bed, color: HOTEL_COLOR, trend: '+5%' },
          { label: t('reports.totalRevenue'), value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: '#10b981', trend: '+12%' },
          { label: t('reports.adr'), value: formatCurrency(stats.avgDailyRate), icon: TrendingUp, color: '#f59e0b', trend: '+8%' },
          { label: t('reports.revpar'), value: formatCurrency(stats.revPAR), icon: BarChart3, color: '#3b82f6', trend: '+15%' },
          { label: t('reports.totalGuests'), value: stats.totalGuests, icon: Users, color: '#8b5cf6', trend: '+10%' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                  <span className="text-xs text-success font-medium">{stat.trend}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend Chart */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.monthlyOccupancyRate')}</h3>
          <div className="h-64 flex items-end gap-2">
            {monthlyOccupancy.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full rounded-t"
                  style={{ backgroundColor: HOTEL_COLOR }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(month.rate / 100) * 200}px` }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                />
                <span className="text-xs text-text-muted">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-text-muted">
            <span>0%</span>
            <span>{t('reports.average', { value: Math.round(monthlyOccupancy.reduce((a, b) => a + b.rate, 0) / 12) })}</span>
            <span>100%</span>
          </div>
        </Card>

        {/* Revenue by Category */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.revenueByCategory')}</h3>
          <div className="space-y-4">
            {revenueByCategory.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-primary">{category.category}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(category.amount)} ({category.percentage}%)
                  </span>
                </div>
                <div className="h-3 bg-background-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border-default">
            <div className="flex justify-between">
              <span className="font-medium text-text-primary">{t('reports.totalRevenue')}</span>
              <span className="font-bold" style={{ color: HOTEL_COLOR }}>
                {formatCurrency(revenueByCategory.reduce((a, b) => a + b.amount, 0))}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Room Type Performance */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('reports.roomTypePerformance')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('reports.roomType')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.totalRooms')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.occupied')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.occupancyRate')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('reports.revenue')}</th>
              </tr>
            </thead>
            <tbody>
              {roomTypeStats.map((stat, index) => (
                <motion.tr
                  key={stat.type}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-text-primary">{stat.type}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-text-secondary">{stat.count}</td>
                  <td className="py-3 px-4 text-center text-text-secondary">{stat.occupied}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 bg-background-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${stat.occupancyRate}%`,
                            backgroundColor: stat.occupancyRate >= 80 ? '#10b981' : stat.occupancyRate >= 50 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <span className="text-sm text-text-secondary">{stat.occupancyRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium" style={{ color: HOTEL_COLOR }}>
                    {formatCurrency(stat.revenue)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: t('reports.dailyOperationsReport'), description: t('reports.dailyOperationsDesc'), icon: Calendar },
          { title: t('reports.financialSummary'), description: t('reports.financialSummaryDesc'), icon: DollarSign },
          { title: t('reports.guestAnalytics'), description: t('reports.guestAnalyticsDesc'), icon: Users },
        ].map((report, index) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                  >
                    <Icon size={20} style={{ color: HOTEL_COLOR }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{report.title}</h4>
                    <p className="text-xs text-text-muted mt-1">{report.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelReports;
