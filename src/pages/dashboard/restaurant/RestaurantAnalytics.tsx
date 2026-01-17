import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Star,
  Utensils,
  Bike,
  Calendar,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PageHeader, Card, Button } from '@/components/common';
import { restaurantOrders, menuItems, customerFeedback } from '@/data/restaurant/restaurantData';

export const RestaurantAnalytics = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  // Calculate stats from mock data
  const stats = useMemo(() => {
    const totalRevenue = restaurantOrders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((acc, o) => acc + o.total, 0);

    const avgOrderValue = totalRevenue / restaurantOrders.filter(o => o.paymentStatus === 'paid').length;

    const avgRating = customerFeedback.reduce((acc, f) => acc + f.rating, 0) / customerFeedback.length;

    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders: restaurantOrders.length,
      avgOrderValue: avgOrderValue.toFixed(2),
      avgRating: avgRating.toFixed(1),
    };
  }, []);

  // Revenue chart data
  const revenueData = [
    { name: 'Mon', revenue: 4500, orders: 42 },
    { name: 'Tue', revenue: 5200, orders: 48 },
    { name: 'Wed', revenue: 4800, orders: 45 },
    { name: 'Thu', revenue: 6100, orders: 55 },
    { name: 'Fri', revenue: 7800, orders: 72 },
    { name: 'Sat', revenue: 9200, orders: 85 },
    { name: 'Sun', revenue: 8500, orders: 78 },
  ];

  // Order type distribution
  const orderTypeData = [
    { name: 'Dine-in', value: restaurantOrders.filter(o => o.type === 'dine-in').length, color: '#f97316' },
    { name: 'Takeaway', value: restaurantOrders.filter(o => o.type === 'takeaway').length, color: '#6366f1' },
    { name: 'Delivery', value: restaurantOrders.filter(o => o.type === 'delivery').length, color: '#10b981' },
  ];

  // Popular items
  const popularItems = menuItems.filter(m => m.isPopular).slice(0, 5);

  // Hourly orders distribution
  const hourlyData = [
    { hour: '11AM', orders: 5 },
    { hour: '12PM', orders: 18 },
    { hour: '1PM', orders: 25 },
    { hour: '2PM', orders: 15 },
    { hour: '3PM', orders: 8 },
    { hour: '4PM', orders: 6 },
    { hour: '5PM', orders: 10 },
    { hour: '6PM', orders: 22 },
    { hour: '7PM', orders: 35 },
    { hour: '8PM', orders: 42 },
    { hour: '9PM', orders: 38 },
    { hour: '10PM', orders: 20 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Restaurant performance insights"
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            {(['today', 'week', 'month'] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Button>
            ))}
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `${stats.totalRevenue} QAR`, icon: DollarSign, color: '#10b981', change: '+12.5%' },
          { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: '#f97316', change: '+8.2%' },
          { label: 'Avg Order Value', value: `${stats.avgOrderValue} QAR`, icon: TrendingUp, color: '#6366f1', change: '+5.1%' },
          { label: 'Avg Rating', value: stats.avgRating, icon: Star, color: '#f59e0b', change: '+0.2' },
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
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-text-muted">{stat.label}</p>
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="p-4 lg:col-span-2">
          <h3 className="font-semibold text-text-primary mb-4">Revenue & Orders</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  fill="url(#revenueGradient)"
                  name="Revenue (QAR)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Type Distribution */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Order Types</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {orderTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {orderTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Peak Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Popular Items */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Top Selling Items</h3>
          <div className="space-y-4">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4"
              >
                <span className="text-2xl font-bold text-text-muted w-8">#{index + 1}</span>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#f97316]">{item.price} QAR</p>
                  <p className="text-xs text-text-muted">{Math.floor(Math.random() * 50) + 20} sold</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tables Served', value: 45, icon: Utensils, color: '#f97316' },
          { label: 'Deliveries', value: 28, icon: Bike, color: '#10b981' },
          { label: 'Avg Wait Time', value: '12 min', icon: Clock, color: '#6366f1' },
          { label: 'Reservations', value: 18, icon: Calendar, color: '#8b5cf6' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 text-center">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantAnalytics;
