import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChefHat,
  Clock,
  CheckCircle,
  AlertTriangle,
  Timer,
  Utensils,
  ShoppingBag,
  Bike,
  Bell,
} from 'lucide-react';
import { PageHeader, Card, Button, StatusBadge } from '@/components/common';
import { restaurantOrders } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const Kitchen = () => {
  const { t } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');

  // Get all order items that need kitchen attention
  const kitchenItems = useMemo(() => {
    const items: Array<{
      orderId: string;
      orderNumber: string;
      orderType: string;
      tableNumber?: number;
      item: typeof restaurantOrders[0]['items'][0];
      orderTime: string;
      waiter?: string;
    }> = [];

    restaurantOrders
      .filter(o => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status))
      .forEach(order => {
        order.items.forEach(item => {
          items.push({
            orderId: order.id,
            orderNumber: order.orderNumber,
            orderType: order.type,
            tableNumber: order.tableNumber,
            item,
            orderTime: order.createdAt,
            waiter: order.waiter,
          });
        });
      });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (viewMode === 'all') return kitchenItems;
    return kitchenItems.filter(k => k.item.status === viewMode);
  }, [kitchenItems, viewMode]);

  const stats = useMemo(() => ({
    pending: kitchenItems.filter(k => k.item.status === 'pending').length,
    preparing: kitchenItems.filter(k => k.item.status === 'preparing').length,
    ready: kitchenItems.filter(k => k.item.status === 'ready').length,
    served: kitchenItems.filter(k => k.item.status === 'served').length,
  }), [kitchenItems]);

  const getElapsedTime = (orderTime: string) => {
    const diff = Date.now() - new Date(orderTime).getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes;
  };

  const getTimeColor = (minutes: number) => {
    if (minutes < 10) return 'text-success';
    if (minutes < 20) return 'text-warning';
    return 'text-error';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dine-in': return Utensils;
      case 'takeaway': return ShoppingBag;
      case 'delivery': return Bike;
      default: return Utensils;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-warning bg-warning/10';
      case 'preparing': return 'border-accent-primary bg-accent-primary/10';
      case 'ready': return 'border-success bg-success/10';
      default: return 'border-border-default bg-background-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.kitchenDisplay', 'Kitchen Display')}
        subtitle="Real-time kitchen order management"
        icon={ChefHat}
        actions={
          <Button variant="secondary">
            <Bell size={18} />
            Sound Alerts
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b', filter: 'pending' as const },
          { label: 'Preparing', value: stats.preparing, icon: ChefHat, color: '#6366f1', filter: 'preparing' as const },
          { label: 'Ready', value: stats.ready, icon: CheckCircle, color: '#10b981', filter: 'ready' as const },
          { label: 'Served', value: stats.served, icon: Utensils, color: '#8b5cf6', filter: 'all' as const },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const isActive = viewMode === stat.filter;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-[#f97316]' : 'hover:bg-background-secondary'}`}
                onClick={() => setViewMode(stat.filter)}
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

      {/* View Mode Tabs */}
      <Card className="p-4">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Items' },
            { key: 'pending', label: 'Pending' },
            { key: 'preparing', label: 'Preparing' },
            { key: 'ready', label: 'Ready to Serve' },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={viewMode === tab.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode(tab.key as typeof viewMode)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Kitchen Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((kitchenItem, index) => {
          const TypeIcon = getTypeIcon(kitchenItem.orderType);
          const elapsedMinutes = getElapsedTime(kitchenItem.orderTime);

          return (
            <motion.div
              key={`${kitchenItem.orderId}-${kitchenItem.item.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className={`p-4 border-2 ${getStatusColor(kitchenItem.item.status)}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{kitchenItem.orderNumber}</span>
                    <TypeIcon size={16} className="text-text-muted" />
                  </div>
                  <div className={`flex items-center gap-1 ${getTimeColor(elapsedMinutes)}`}>
                    <Timer size={14} />
                    <span className="text-sm font-medium">{elapsedMinutes}m</span>
                  </div>
                </div>

                {/* Table/Order Type */}
                {kitchenItem.tableNumber ? (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#f97316]/20 text-[#f97316] rounded text-sm mb-3">
                    <Utensils size={14} />
                    Table {kitchenItem.tableNumber}
                  </div>
                ) : (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm mb-3 ${
                    kitchenItem.orderType === 'takeaway' ? 'bg-accent-primary/20 text-accent-primary' : 'bg-success/20 text-success'
                  }`}>
                    <TypeIcon size={14} />
                    {kitchenItem.orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}
                  </div>
                )}

                {/* Item Details */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-text-primary">{kitchenItem.item.quantity}x</span>
                    <span className="font-medium text-text-primary">{kitchenItem.item.name}</span>
                  </div>
                  {kitchenItem.item.notes && (
                    <p className="text-sm text-warning mt-1 flex items-center gap-1">
                      <AlertTriangle size={14} />
                      {kitchenItem.item.notes}
                    </p>
                  )}
                  {kitchenItem.item.modifiers && kitchenItem.item.modifiers.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {kitchenItem.item.modifiers.map((mod, i) => (
                        <span key={i} className="text-xs text-text-muted block">• {mod}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <StatusBadge status={kitchenItem.item.status} />
                </div>

                {/* Waiter */}
                {kitchenItem.waiter && (
                  <p className="text-xs text-text-muted mb-3">Waiter: {kitchenItem.waiter}</p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {kitchenItem.item.status === 'pending' && (
                    <Button variant="primary" size="sm" className="flex-1">
                      <ChefHat size={14} className="mr-1" />
                      Start
                    </Button>
                  )}
                  {kitchenItem.item.status === 'preparing' && (
                    <Button variant="primary" size="sm" className="flex-1 bg-success hover:bg-success/90">
                      <CheckCircle size={14} className="mr-1" />
                      Ready
                    </Button>
                  )}
                  {kitchenItem.item.status === 'ready' && (
                    <Button variant="secondary" size="sm" className="flex-1">
                      <Bell size={14} className="mr-1" />
                      Bump
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <ChefHat size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No items to display</p>
          <p className="text-sm text-text-muted mt-2">All caught up!</p>
        </Card>
      )}
    </div>
  );
};

export default Kitchen;
