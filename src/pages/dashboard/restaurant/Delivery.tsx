import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bike,
  Search,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  Truck,
  User,
  Navigation,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { deliveryOrders, staffMembers } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const Delivery = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const drivers = useMemo(() => {
    return staffMembers.filter(s => s.role === 'delivery' && s.isActive);
  }, []);

  const stats = useMemo(() => ({
    total: deliveryOrders.length,
    pending: deliveryOrders.filter(d => d.status === 'pending').length,
    inTransit: deliveryOrders.filter(d => d.status === 'in-transit' || d.status === 'picked-up').length,
    delivered: deliveryOrders.filter(d => d.status === 'delivered').length,
  }), []);

  const filteredOrders = useMemo(() => {
    return deliveryOrders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-warning bg-warning/10';
      case 'assigned': return 'border-accent-primary bg-accent-primary/10';
      case 'picked-up': return 'border-accent-secondary bg-accent-secondary/10';
      case 'in-transit': return 'border-[#f97316] bg-[#f97316]/10';
      case 'delivered': return 'border-success bg-success/10';
      case 'failed': return 'border-error bg-error/10';
      default: return 'border-border-default bg-background-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.deliveryManagement', 'Delivery Management')}
        subtitle="Track and manage delivery orders"
        icon={Bike}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Deliveries', value: stats.total, icon: Bike, color: '#f97316', filter: 'all' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b', filter: 'pending' },
          { label: 'In Transit', value: stats.inTransit, icon: Truck, color: '#6366f1', filter: 'in-transit' },
          { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: '#10b981', filter: 'delivered' },
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

      {/* Active Drivers */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-3">Active Drivers</h3>
        <div className="flex flex-wrap gap-3">
          {drivers.map((driver) => {
            const activeDeliveries = deliveryOrders.filter(d =>
              d.driverId === driver.id && ['assigned', 'picked-up', 'in-transit'].includes(d.status)
            ).length;
            return (
              <div
                key={driver.id}
                className="flex items-center gap-3 px-4 py-2 bg-background-secondary rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                  <User size={16} className="text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{driver.name}</p>
                  <p className="text-xs text-text-muted">
                    {activeDeliveries > 0 ? `${activeDeliveries} active` : 'Available'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input
            placeholder="Search by order #, customer, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Delivery Orders */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className={`p-4 border-2 ${getStatusColor(order.status)}`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-text-primary">{order.orderNumber}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-primary flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      {order.customerName}
                    </p>
                    <p className="text-sm text-text-muted flex items-center gap-2">
                      <Phone size={14} />
                      {order.customerPhone}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#f97316] mt-0.5" />
                    <div>
                      <p className="text-sm text-text-primary">{order.deliveryAddress}</p>
                      <span className="text-xs px-2 py-0.5 bg-[#f97316]/20 text-[#f97316] rounded mt-1 inline-block">
                        {order.deliveryArea}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Driver & Time */}
                <div className="text-center">
                  {order.driverName ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                        <Bike size={16} className="text-success" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">{order.driverName}</p>
                        <p className="text-xs text-text-muted">Driver</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-warning">Unassigned</span>
                  )}
                </div>

                {/* ETA */}
                <div className="text-center">
                  <div className="flex items-center gap-1 text-text-primary">
                    <Clock size={14} />
                    <span className="text-sm">
                      {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">Est. Delivery</p>
                  {order.actualDelivery && (
                    <p className="text-xs text-success mt-1">
                      Delivered: {new Date(order.actualDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>

                {/* Fee */}
                <div className="text-center">
                  <p className="text-lg font-bold text-[#f97316]">{order.deliveryFee} QAR</p>
                  <p className="text-xs text-text-muted">Delivery Fee</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Navigation size={16} />
                  </Button>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'assign', label: 'Assign Driver', onClick: () => {} },
                      { id: 'track', label: 'Track Order', onClick: () => {} },
                      { id: 'contact', label: 'Contact Customer', onClick: () => {} },
                      { id: 'mark', label: 'Mark Delivered', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {order.notes && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-xs text-text-muted">Note: {order.notes}</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <Bike size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No delivery orders found</p>
        </Card>
      )}
    </div>
  );
};

export default Delivery;
