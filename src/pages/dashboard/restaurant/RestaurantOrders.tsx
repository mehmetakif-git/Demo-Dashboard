import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Search,
  Clock,
  ChefHat,
  CheckCircle,
  Utensils,
  ShoppingBag,
  Bike,
  Eye,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { restaurantOrders } from '@/data/restaurant/restaurantData';

export const RestaurantOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: restaurantOrders.length,
    pending: restaurantOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length,
    preparing: restaurantOrders.filter(o => o.status === 'preparing').length,
    ready: restaurantOrders.filter(o => o.status === 'ready').length,
    completed: restaurantOrders.filter(o => o.status === 'completed' || o.status === 'served').length,
  }), []);

  const filteredOrders = useMemo(() => {
    return restaurantOrders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || order.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dine-in': return Utensils;
      case 'takeaway': return ShoppingBag;
      case 'delivery': return Bike;
      default: return ClipboardList;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        subtitle="Manage restaurant orders"
        icon={ClipboardList}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: ClipboardList, color: '#f97316', filter: 'all' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b', filter: 'pending' },
          { label: 'Preparing', value: stats.preparing, icon: ChefHat, color: '#0ea5e9', filter: 'preparing' },
          { label: 'Ready', value: stats.ready, icon: CheckCircle, color: '#10b981', filter: 'ready' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#8b5cf6', filter: 'completed' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const isActive = statusFilter === stat.filter;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-[#f97316]' : 'hover:bg-background-secondary'}`}
                onClick={() => setStatusFilter(stat.filter)}
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
              placeholder="Search by order # or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'dine-in', 'takeaway', 'delivery'].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const TypeIcon = getTypeIcon(order.type);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Order Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      order.type === 'dine-in' ? 'bg-[#f97316]/20' :
                      order.type === 'takeaway' ? 'bg-accent-primary/20' : 'bg-success/20'
                    }`}>
                      <TypeIcon size={24} className={
                        order.type === 'dine-in' ? 'text-[#f97316]' :
                        order.type === 'takeaway' ? 'text-accent-primary' : 'text-success'
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-text-primary">{order.orderNumber}</span>
                        <StatusBadge status={order.status} />
                        <StatusBadge status={order.paymentStatus} />
                      </div>
                      <p className="text-sm text-text-secondary">{order.customerName}</p>
                      <p className="text-xs text-text-muted">{order.customerPhone}</p>
                      {order.tableNumber && (
                        <p className="text-xs text-[#f97316] mt-1">Table {order.tableNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary mb-2">
                      {order.items.length} items
                    </p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <span className="text-text-muted">
                            {item.quantity}x {item.name}
                          </span>
                          <StatusBadge status={item.status} />
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-text-muted">
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time & Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-primary">{order.total.toFixed(2)} QAR</p>
                    <p className="text-xs text-text-muted">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {order.waiter && (
                      <p className="text-xs text-text-secondary mt-1">Waiter: {order.waiter}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'print', label: 'Print Receipt', onClick: () => {} },
                        { id: 'status', label: 'Update Status', onClick: () => {} },
                        { id: 'cancel', label: 'Cancel Order', onClick: () => {} },
                      ]}
                    />
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted">
                      <span className="font-medium">Note:</span> {order.notes}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <ClipboardList size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No orders found</p>
        </Card>
      )}
    </div>
  );
};

export default RestaurantOrders;
