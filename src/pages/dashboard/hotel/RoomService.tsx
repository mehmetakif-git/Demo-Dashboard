import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Clock,
  CheckCircle,
  ChefHat,
  Truck,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { roomServiceOrders, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const RoomService = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const active = roomServiceOrders.filter(o => ['confirmed', 'preparing', 'delivering'].includes(o.status)).length;
    const completed = roomServiceOrders.filter(o => o.status === 'delivered').length;
    const revenue = roomServiceOrders.reduce((acc, o) => acc + o.total, 0);
    const avgDelivery = 25; // Mock avg delivery time

    return { active, completed, revenue, avgDelivery };
  }, []);

  const filteredOrders = useMemo(() => {
    return roomServiceOrders.filter(order => {
      const matchesSearch = order.roomNo.includes(searchQuery) ||
        order.guestName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'confirmed': '#3b82f6',
      'preparing': '#f59e0b',
      'delivering': '#6366f1',
      'delivered': '#10b981',
      'cancelled': '#ef4444',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, typeof Clock> = {
      'confirmed': Clock,
      'preparing': ChefHat,
      'delivering': Truck,
      'delivered': CheckCircle,
    };
    return icons[status] || Clock;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Room Service Orders"
        subtitle="Manage food and beverage orders"
        icon={UtensilsCrossed}
        actions={
          <Button>
            <Plus size={18} />
            New Order
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: stats.active, icon: Clock, color: '#f59e0b' },
          { label: 'Completed Today', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Avg Delivery Time', value: `${stats.avgDelivery} min`, icon: Truck, color: '#3b82f6' },
          { label: "Today's Revenue", value: formatCurrency(stats.revenue), icon: UtensilsCrossed, color: HOTEL_COLOR },
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
                    <p className="text-xl font-bold text-text-primary">{stat.value}</p>
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
              placeholder="Search by room number or guest name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const statusColor = getStatusColor(order.status);
          const StatusIcon = getStatusIcon(order.status);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Room & Guest Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                    >
                      <span className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                        {order.roomNo}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{order.guestName}</p>
                      <p className="text-xs text-text-muted">
                        Order #{order.id} - {new Date(order.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex-1">
                    <p className="text-xs text-text-muted mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-text-primary">
                            {item.quantity}x {item.name}
                            {item.notes && <span className="text-text-muted text-xs ml-1">({item.notes})</span>}
                          </span>
                          <span className="text-text-muted">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Subtotal: {formatCurrency(order.subtotal)}</p>
                    <p className="text-xs text-text-muted">Service: {formatCurrency(order.serviceCharge)}</p>
                    <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                      {formatCurrency(order.total)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      <StatusIcon size={14} />
                      {order.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'update', label: 'Update Status', onClick: () => {} },
                      { id: 'assign', label: 'Assign Staff', onClick: () => {} },
                      { id: 'print', label: 'Print Order', onClick: () => {} },
                      { id: 'cancel', label: 'Cancel Order', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Assigned To & Delivery Time */}
                <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                  <span>
                    {order.assignedTo ? `Assigned to: ${order.assignedTo}` : 'Not assigned'}
                  </span>
                  {order.deliveryTime && (
                    <span className="text-success">
                      Delivered at {new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <UtensilsCrossed size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No orders found</p>
        </Card>
      )}
    </div>
  );
};

export default RoomService;
