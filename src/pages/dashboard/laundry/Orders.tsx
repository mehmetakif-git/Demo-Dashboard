import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Package,
  Clock,
  DollarSign,
  Truck,
  Filter,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  orders,
  dashboardStats,
  formatCurrency,
  formatDate,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Orders = () => {
  const { t } = useTranslation('laundry');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = dashboardStats;

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(query) ||
          o.customerName.toLowerCase().includes(query) ||
          o.customerPhone.includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((o) => o.status === selectedStatus);
    }

    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered;
  }, [searchQuery, selectedStatus]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'picked-up':
        return 'bg-purple-500/20 text-purple-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'ready':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'out-for-delivery':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('orders.title')}
        subtitle={t('orders.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => navigate('/dashboard/laundry/orders/new')}>
            {t('orders.newOrder')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('orders.totalOrders')}
          value={stats.totalOrders.toString()}
          icon={Package}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title={t('orders.pending')}
          value={stats.pendingOrders.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('orders.inProcess')}
          value={stats.inProcessOrders.toString()}
          icon={Truck}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('orders.todaysRevenue')}
          value={formatCurrency(stats.todayRevenue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('orders.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('orders.allStatus')}</option>
            <option value="pending">{t('orders.statusPending')}</option>
            <option value="picked-up">{t('orders.statusPickedUp')}</option>
            <option value="processing">{t('orders.statusProcessing')}</option>
            <option value="ready">{t('orders.statusReady')}</option>
            <option value="out-for-delivery">{t('orders.statusOutForDelivery')}</option>
            <option value="delivered">{t('orders.statusDelivered')}</option>
            <option value="cancelled">{t('orders.statusCancelled')}</option>
          </select>

          <Button variant="secondary" leftIcon={<Filter size={16} />}>
            {t('orders.moreFilters')}
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.orderNumber')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.customer')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.items')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.total')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.pickup')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.delivery')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('orders.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">{order.orderNumber}</span>
                      {order.isExpress && (
                        <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                          {t('orders.express')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-text-primary">{order.customerName}</p>
                      <p className="text-sm text-text-muted">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {t('orders.itemsCount', { count: order.items.reduce((sum, item) => sum + item.quantity, 0) })}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-text-primary">{formatCurrency(order.totalAmount)}</p>
                      <p className={`text-xs ${order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    <div>
                      <p>{formatDate(order.pickupDate)}</p>
                      <p className="text-xs text-text-muted">{order.pickupTime}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {formatDate(order.expectedDeliveryDate)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeColor(order.status)}`}>
                      {order.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye size={14} />}
                      onClick={() => navigate(`/dashboard/laundry/orders/${order.id}`)}
                    >
                      {t('orders.view')}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('orders.noOrdersFound')}</p>
        </Card>
      )}
    </div>
  );
};
