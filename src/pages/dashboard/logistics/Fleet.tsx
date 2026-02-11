import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Truck,
  Search,
  Plus,
  CheckCircle,
  Wrench,
  MapPin,
  User,
  MoreVertical,
  Gauge,
  Calendar,
  Fuel,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { vehicles, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Fleet = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ownershipFilter, setOwnershipFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'active': t('status.active'),
    'on-route': t('status.onRoute'),
    'maintenance': t('status.maintenance'),
    'out-of-service': t('status.outOfService'),
  };

  const stats = useMemo(() => {
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === 'active').length;
    const onRoute = vehicles.filter(v => v.status === 'on-route').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
    const utilizationRate = total > 0 ? Math.round(((active + onRoute) / total) * 100) : 0;

    return { total, active, onRoute, maintenance, utilizationRate };
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.plateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vehicle.driverName && vehicle.driverName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = typeFilter === 'all' || vehicle.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
      const matchesOwnership = ownershipFilter === 'all' || vehicle.ownership === ownershipFilter;

      return matchesSearch && matchesType && matchesStatus && matchesOwnership;
    });
  }, [searchQuery, typeFilter, statusFilter, ownershipFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'on-route': '#3b82f6',
      'maintenance': '#f59e0b',
      'out-of-service': '#ef4444',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('fleet.title')}
        subtitle={t('fleet.subtitle')}
        icon={Truck}
        actions={
          <Button>
            <Plus size={18} />
            {t('fleet.addVehicle')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('fleet.totalVehicles'), value: stats.total, icon: Truck, color: LOGISTICS_COLOR },
          { label: t('fleet.active'), value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: t('fleet.onRoute'), value: stats.onRoute, icon: MapPin, color: '#3b82f6' },
          { label: t('fleet.inMaintenance'), value: stats.maintenance, icon: Wrench, color: '#f59e0b' },
          { label: t('fleet.utilizationRate'), value: `${stats.utilizationRate}%`, icon: Gauge, color: stats.utilizationRate >= 70 ? '#10b981' : '#f59e0b' },
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
              placeholder={t('fleet.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t('fleet.allTypes')}</option>
            <option value="Truck">{t('fleet.truck')}</option>
            <option value="Van">{t('fleet.van')}</option>
            <option value="Pickup">{t('fleet.pickup')}</option>
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={ownershipFilter}
            onChange={(e) => setOwnershipFilter(e.target.value)}
          >
            <option value="all">{t('fleet.allOwnership')}</option>
            <option value="owned">{t('fleet.owned')}</option>
            <option value="leased">{t('fleet.leased')}</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'active', 'on-route', 'maintenance', 'out-of-service'].map((status) => (
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

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                    >
                      <Truck size={24} style={{ color: LOGISTICS_COLOR }} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-text-primary">{vehicle.plateNo}</p>
                      <p className="text-sm text-text-muted">{vehicle.make} {vehicle.model}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                        style={{ backgroundColor: `${getStatusColor(vehicle.status)}20`, color: getStatusColor(vehicle.status) }}
                      >
                        {statusMap[vehicle.status]}
                      </span>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('fleet.viewDetails'), onClick: () => {} },
                      { id: 'assign', label: t('fleet.assignDriver'), onClick: () => {} },
                      { id: 'maintenance', label: t('fleet.scheduleMaintenance'), onClick: () => {} },
                      { id: 'track', label: t('fleet.trackVehicle'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Vehicle Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{t('fleet.type')}</span>
                    <span className="text-text-primary font-medium">{vehicle.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{t('fleet.capacity')}</span>
                    <span className="text-text-primary font-medium">{vehicle.capacity.toLocaleString()} {vehicle.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{t('fleet.ownership')}</span>
                    <span className="text-text-primary font-medium">{vehicle.ownership}</span>
                  </div>
                </div>

                {/* Driver & Location */}
                <div className="space-y-2 mb-4 p-3 bg-background-tertiary rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} className="text-text-muted" />
                    <span className="text-text-primary">{vehicle.driverName || t('fleet.unassigned')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-text-muted" />
                    <span className="text-text-secondary">{vehicle.currentLocation}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-default">
                  <div>
                    <div className="flex items-center gap-1">
                      <Gauge size={14} className="text-text-muted" />
                      <p className="text-lg font-bold" style={{ color: LOGISTICS_COLOR }}>{vehicle.mileage.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-text-muted">{t('fleet.mileage')}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Fuel size={14} className="text-text-muted" />
                      <p className="text-lg font-bold text-text-primary">{vehicle.fuelType}</p>
                    </div>
                    <p className="text-xs text-text-muted">{t('fleet.fuelType')}</p>
                  </div>
                </div>

                {/* Next Maintenance */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Calendar size={12} />
                    <span>{t('fleet.nextMaintenance')} {new Date(vehicle.nextMaintenance).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card className="p-12 text-center">
          <Truck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('fleet.noVehiclesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Fleet;
