import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  Truck,
  User,
  MapPin,
  Calendar,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { shipments, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Shipments = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'pending': t('status.pending'),
    'scheduled': t('status.scheduled'),
    'in-transit': t('status.inTransit'),
    'delivered': t('status.delivered'),
    'cancelled': t('status.cancelled'),
  };

  const stats = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter(s => s.status === 'in-transit').length;
    const delivered = shipments.filter(s => s.status === 'delivered').length;
    const pending = shipments.filter(s => s.status === 'pending').length;

    return { total, inTransit, delivered, pending };
  }, []);

  const filteredShipments = useMemo(() => {
    return shipments.filter(shipment => {
      const matchesSearch = shipment.trackingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || shipment.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#64748b',
      'scheduled': '#3b82f6',
      'in-transit': '#f59e0b',
      'delivered': '#10b981',
      'cancelled': '#ef4444',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'scheduled': return Calendar;
      case 'in-transit': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('shipments.title')}
        subtitle={t('shipments.subtitle')}
        icon={Package}
        actions={
          <Button>
            <Plus size={18} />
            {t('shipments.createShipment')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('shipments.totalShipments'), value: stats.total, icon: Package, color: LOGISTICS_COLOR },
          { label: t('shipments.inTransit'), value: stats.inTransit, icon: Truck, color: '#f59e0b' },
          { label: t('shipments.delivered'), value: stats.delivered, icon: CheckCircle, color: '#10b981' },
          { label: t('shipments.pending'), value: stats.pending, icon: Clock, color: '#64748b' },
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
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
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
              placeholder={t('shipments.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">{t('shipments.allPriority')}</option>
            <option value="standard">{t('shipments.standard')}</option>
            <option value="express">{t('shipments.express')}</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'scheduled', 'in-transit', 'delivered', 'cancelled'].map((status) => (
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

      {/* Shipments Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.trackingNo')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.client')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.route')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.vehicleDriver')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.pickup')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.estDelivery')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('shipments.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment, index) => {
                const StatusIcon = getStatusIcon(shipment.status);

                return (
                  <motion.tr
                    key={shipment.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(shipment.status)}20` }}
                        >
                          <StatusIcon size={20} style={{ color: getStatusColor(shipment.status) }} />
                        </div>
                        <div>
                          <p className="font-mono font-medium text-text-primary">{shipment.trackingNo}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                shipment.priority === 'express' ? 'bg-warning/20 text-warning' : 'bg-background-tertiary text-text-muted'
                              }`}
                            >
                              {shipment.priority}
                            </span>
                            <span className="text-xs text-text-muted">{shipment.packageCount} pkg</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text-primary">{shipment.clientName}</p>
                      <p className="text-xs text-text-muted">Value: QAR {shipment.value.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin size={12} className="text-text-muted" />
                        <span className="text-text-secondary truncate max-w-[150px]">{shipment.origin}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <MapPin size={12} className="text-success" />
                        <span className="text-text-primary truncate max-w-[150px]">{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(shipment.status)}20`, color: getStatusColor(shipment.status) }}
                      >
                        {statusMap[shipment.status]}
                      </span>
                      {shipment.currentLocation && shipment.status === 'in-transit' && (
                        <p className="text-xs text-text-muted mt-1">{shipment.currentLocation}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {shipment.vehiclePlate ? (
                        <div>
                          <div className="flex items-center gap-1 text-sm">
                            <Truck size={12} className="text-text-muted" />
                            <span className="text-text-primary">{shipment.vehiclePlate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm mt-1">
                            <User size={12} className="text-text-muted" />
                            <span className="text-text-secondary">{shipment.driverName}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted">{t('shipments.unassigned')}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-primary">
                        <Calendar size={12} />
                        <span>{shipment.pickupDate}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{shipment.pickupTime}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-text-primary">{shipment.estimatedDelivery}</p>
                      {shipment.actualDelivery && (
                        <p className="text-xs text-success mt-1">{t('shipments.deliveredDate')} {shipment.actualDelivery}</p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'view', label: t('shipments.viewDetails'), onClick: () => {} },
                          { id: 'track', label: t('shipments.trackShipment'), onClick: () => {} },
                          { id: 'pod', label: t('shipments.viewPOD'), onClick: () => {} },
                          { id: 'edit', label: t('shipments.edit'), onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredShipments.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('shipments.noShipmentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Shipments;
