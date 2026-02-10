import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Download,
  Clock,
  Package,
  Truck,
  CheckCircle,
  Eye,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { orders, orderStatuses } from '@/data/ecommerce/ecommerceData';
import { useTranslation } from 'react-i18next';

export const Orders = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = [
    { label: 'All Orders', value: orders.length, icon: ShoppingCart, color: '#6366f1' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: '#f59e0b' },
    { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, icon: Package, color: '#0ea5e9' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, icon: Truck, color: '#8b5cf6' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: '#10b981' },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('ecommerce.orders', 'Orders')}
        subtitle="Manage and track customer orders"
        icon={ShoppingCart}
        actions={
          <Button variant="secondary">
            <Download size={18} />
            Export
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isActive = statusFilter === (stat.label === 'All Orders' ? 'all' : stat.label.toLowerCase());
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-accent-primary' : 'hover:bg-background-secondary'}`}
                onClick={() => setStatusFilter(stat.label === 'All Orders' ? 'all' : stat.label.toLowerCase())}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by order #, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              <option value="all">All Statuses</option>
              {orderStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-secondary">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Order #</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Items</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Total</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Payment</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border-default hover:bg-background-secondary/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/ecommerce/orders/${order.id}`)}
                  >
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-accent-primary">{order.orderNumber}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-secondary">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{order.customerName}</p>
                        <p className="text-xs text-text-muted">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-secondary">{order.items.length} items</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-text-primary">
                        {order.total.toLocaleString()} {order.currency}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/ecommerce/orders/${order.id}`)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: 'View Details', onClick: () => navigate(`/dashboard/ecommerce/orders/${order.id}`) },
                            { id: 'print', label: 'Print Invoice', onClick: () => {} },
                            { id: 'update', label: 'Update Status', onClick: () => {} },
                          ]}
                        />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">No orders found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Orders;
