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
import { useTranslation } from 'react-i18next';

export const RoomService = () => {
  const { t } = useTranslation('hotel');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const active = roomServiceOrders.filter(o => ['confirmed', 'preparing', 'delivering'].includes(o.status)).length;
    const completed = roomServiceOrders.filter(o => o.status === 'delivered').length;
    const revenue = roomServiceOrders.reduce((acc, o) => acc + o.total, 0);
    const avgDelivery = 25;

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

  const statusMap: Record<string, string> = {
    'all': t('roomService.all'),
    'confirmed': t('status.confirmed'),
    'preparing': t('status.preparing'),
    'delivering': t('status.delivering'),
    'delivered': t('status.delivered'),
    'cancelled': t('status.cancelled'),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('roomService.title')}
        subtitle={t('roomService.subtitle')}
        icon={UtensilsCrossed}
        actions={
          <Button>
            <Plus size={18} />
            {t('roomService.newOrder')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('roomService.activeOrders'), value: stats.active, icon: Clock, color: '#f59e0b' },
          { label: t('roomService.completedToday'), value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: t('roomService.avgDeliveryTime'), value: `${stats.avgDelivery} min`, icon: Truck, color: '#3b82f6' },
          { label: t('roomService.todaysRevenue'), value: formatCurrency(stats.revenue), icon: UtensilsCrossed, color: HOTEL_COLOR },
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
              placeholder={t('roomService.searchPlaceholder')}
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
                {statusMap[status]}
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
                        {t('roomService.orderNumber', { id: order.id })} - {new Date(order.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-text-muted mb-2">{t('roomService.items')}</p>
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

                  <div className="text-right">
                    <p className="text-xs text-text-muted">{t('roomService.subtotal', { amount: formatCurrency(order.subtotal) })}</p>
                    <p className="text-xs text-text-muted">{t('roomService.service', { amount: formatCurrency(order.serviceCharge) })}</p>
                    <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                      {formatCurrency(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      <StatusIcon size={14} />
                      {statusMap[order.status] || order.status}
                    </span>
                  </div>

                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('roomService.viewDetails'), onClick: () => {} },
                      { id: 'update', label: t('roomService.updateStatus'), onClick: () => {} },
                      { id: 'assign', label: t('roomService.assignStaff'), onClick: () => {} },
                      { id: 'print', label: t('roomService.printOrder'), onClick: () => {} },
                      { id: 'cancel', label: t('roomService.cancelOrder'), onClick: () => {} },
                    ]}
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                  <span>
                    {order.assignedTo ? t('roomService.assignedTo', { name: order.assignedTo }) : t('roomService.notAssigned')}
                  </span>
                  {order.deliveryTime && (
                    <span className="text-success">
                      {t('roomService.deliveredAt', { time: new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })}
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
          <p className="text-text-secondary">{t('roomService.noOrdersFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default RoomService;
