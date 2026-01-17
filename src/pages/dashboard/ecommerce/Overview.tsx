import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  Package,
  AlertTriangle,
  Plus,
  Eye,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { PageHeader, Card, Button, StatusBadge } from '@/components/common';
import { ecommerceStats, orders, products } from '@/data/ecommerce/ecommerceData';
import { ROUTES } from '@/utils/constants';

// Revenue data for chart (last 30 days)
const revenueData = [
  { date: 'Dec 1', revenue: 3200 },
  { date: 'Dec 5', revenue: 4100 },
  { date: 'Dec 10', revenue: 3800 },
  { date: 'Dec 15', revenue: 5200 },
  { date: 'Dec 18', revenue: 4800 },
  { date: 'Dec 20', revenue: 6100 },
  { date: 'Dec 22', revenue: 5500 },
  { date: 'Dec 23', revenue: 4250 },
];

const CHART_COLORS = ['#f59e0b', '#6366f1', '#0ea5e9', '#8b5cf6', '#10b981', '#ef4444', '#64748b'];

export const Overview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Today's Revenue",
      value: `${ecommerceStats.todayRevenue.toLocaleString()} QAR`,
      icon: DollarSign,
      change: ((ecommerceStats.todayRevenue - ecommerceStats.yesterdayRevenue) / ecommerceStats.yesterdayRevenue * 100).toFixed(1),
      trend: ecommerceStats.todayRevenue > ecommerceStats.yesterdayRevenue ? 'up' : 'down',
      color: '#10b981',
    },
    {
      label: "Today's Orders",
      value: ecommerceStats.todayOrders.toString(),
      icon: ShoppingCart,
      change: '+12.5',
      trend: 'up',
      color: '#6366f1',
    },
    {
      label: 'Pending Orders',
      value: ecommerceStats.pendingOrders.toString(),
      icon: Clock,
      change: null,
      trend: null,
      color: '#f59e0b',
    },
    {
      label: 'Avg Order Value',
      value: `${ecommerceStats.averageOrderValue.toLocaleString()} QAR`,
      icon: TrendingUp,
      change: '+5.2',
      trend: 'up',
      color: '#8b5cf6',
    },
  ];

  const ordersByStatusData = Object.entries(ecommerceStats.ordersByStatus).map(([status, count], index) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="E-Commerce Dashboard"
        subtitle="Overview of your online store performance"
        icon={ShoppingCart}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate(ROUTES.ecommerce.orders)}>
              <Eye size={18} />
              View Orders
            </Button>
            <Button variant="secondary" onClick={() => navigate(ROUTES.ecommerce.discounts)}>
              <Percent size={18} />
              Discounts
            </Button>
            <Button onClick={() => navigate(ROUTES.ecommerce.products)}>
              <Plus size={18} />
              New Product
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    {stat.change && (
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight size={16} className="text-success" />
                        ) : (
                          <ArrowDownRight size={16} className="text-error" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                          {stat.change}%
                        </span>
                        <span className="text-xs text-text-muted">vs yesterday</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
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
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Revenue Overview</h3>
            <div className="text-sm text-text-secondary">Last 30 days</div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3d5a6e" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94B4C1" fontSize={12} />
                <YAxis stroke="#94B4C1" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a4259',
                    border: '1px solid #3d5a6e',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${(value as number).toLocaleString()} QAR`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders by Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Orders by Status</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ordersByStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ordersByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a4259',
                    border: '1px solid #3d5a6e',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {ordersByStatusData.slice(0, 6).map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-text-secondary">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {ecommerceStats.topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary truncate max-w-[180px]">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.sold} sold</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-success">{(product.revenue / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue by Category</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ecommerceStats.revenueByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#3d5a6e" opacity={0.3} />
                <XAxis type="number" stroke="#94B4C1" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis type="category" dataKey="name" stroke="#94B4C1" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a4259',
                    border: '1px solid #3d5a6e',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${(value as number).toLocaleString()} QAR`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Low Stock Alerts</h3>
            <AlertTriangle size={20} className="text-warning" />
          </div>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                  <div>
                    <p className="text-sm font-medium text-text-primary truncate max-w-[180px]">{product.name}</p>
                    <p className="text-xs text-text-muted">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${product.stock === 0 ? 'text-error' : 'text-warning'}`}>
                      {product.stock} left
                    </p>
                    <p className="text-xs text-text-muted">Min: {product.lowStockThreshold}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-muted">
              <Package size={32} className="mx-auto mb-2 opacity-50" />
              <p>All products well stocked</p>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ecommerce.orders)}>
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Items</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                return (
                  <tr
                    key={order.id}
                    className="border-b border-border-default hover:bg-background-secondary/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/ecommerce/orders/${order.id}`)}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-accent-primary">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{order.customerName}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{order.items.length} items</td>
                    <td className="py-3 px-4 text-sm font-medium text-text-primary">{order.total.toLocaleString()} QAR</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-4 text-sm text-text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
