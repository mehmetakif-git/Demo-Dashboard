import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Route,
  Search,
  Plus,
  MapPin,
  Clock,
  Truck,
  MoreVertical,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { routes, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Routes = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'active': t('status.active'),
    'inactive': t('status.inactive'),
  };

  const stats = useMemo(() => {
    const total = routes.length;
    const active = routes.filter(r => r.status === 'active').length;
    const avgDistance = routes.length > 0 ? Math.round(routes.reduce((acc, r) => acc + r.distance, 0) / routes.length) : 0;
    const avgDuration = routes.length > 0 ? Math.round(routes.reduce((acc, r) => acc + r.duration, 0) / routes.length) : 0;

    return { total, active, avgDistance, avgDuration };
  }, []);

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || route.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getAssignedVehicleCount = (vehicleIds: string[]) => {
    return vehicleIds.length;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('routes.title')}
        subtitle={t('routes.subtitle')}
        icon={Route}
        actions={
          <Button>
            <Plus size={18} />
            {t('routes.createRoute')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('routes.totalRoutes'), value: stats.total, icon: Route, color: LOGISTICS_COLOR },
          { label: t('routes.activeRoutes'), value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: t('routes.avgDistance'), value: `${stats.avgDistance} ${t('routes.km')}`, icon: MapPin, color: '#3b82f6' },
          { label: t('routes.avgDuration'), value: `${stats.avgDuration} ${t('routes.min')}`, icon: Clock, color: '#f59e0b' },
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
              placeholder={t('routes.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
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

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoutes.map((route, index) => (
          <motion.div
            key={route.id}
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
                    <Route size={24} style={{ color: LOGISTICS_COLOR }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{route.routeName}</h3>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                      style={{
                        backgroundColor: route.status === 'active' ? '#10b98120' : '#64748b20',
                        color: route.status === 'active' ? '#10b981' : '#64748b'
                      }}
                    >
                      {route.status === 'active' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {statusMap[route.status]}
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
                    { id: 'view', label: t('routes.viewDetails'), onClick: () => {} },
                    { id: 'edit', label: t('routes.editRoute'), onClick: () => {} },
                    { id: 'assign', label: t('routes.assignVehicle'), onClick: () => {} },
                    { id: 'dispatch', label: t('routes.dispatch'), onClick: () => {} },
                  ]}
                />
              </div>

              {/* Origin to Destination */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-background-tertiary rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-text-muted mb-1">{t('routes.origin')}</p>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} style={{ color: LOGISTICS_COLOR }} />
                    <p className="text-sm font-medium text-text-primary">{route.origin}</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-text-muted" />
                <div className="flex-1">
                  <p className="text-xs text-text-muted mb-1">{t('routes.destination')}</p>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-success" />
                    <p className="text-sm font-medium text-text-primary">{route.destination}</p>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-background-tertiary rounded-lg">
                  <p className="text-lg font-bold" style={{ color: LOGISTICS_COLOR }}>{route.distance}</p>
                  <p className="text-xs text-text-muted">{t('routes.km')}</p>
                </div>
                <div className="text-center p-2 bg-background-tertiary rounded-lg">
                  <p className="text-lg font-bold text-text-primary">{route.duration}</p>
                  <p className="text-xs text-text-muted">{t('routes.min')}</p>
                </div>
                <div className="text-center p-2 bg-background-tertiary rounded-lg">
                  <p className="text-lg font-bold text-text-primary">{route.trafficZone}</p>
                  <p className="text-xs text-text-muted">{t('routes.zone')}</p>
                </div>
              </div>

              {/* Waypoints */}
              {route.waypoints.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-2">{t('routes.waypoints')}</p>
                  <div className="flex flex-wrap gap-2">
                    {route.waypoints.map((waypoint, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-background-tertiary rounded text-xs text-text-secondary"
                      >
                        {waypoint}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div>
                  <p className="text-xs text-text-muted">{t('routes.frequency')}</p>
                  <p className="text-sm font-medium text-text-primary">{route.frequency}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">{t('routes.assignedVehicles')}</p>
                  <div className="flex items-center gap-1">
                    <Truck size={14} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary">
                      {getAssignedVehicleCount(route.assignedVehicles)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-muted">{t('routes.preferredTime')}</p>
                  <p className="text-sm font-medium text-text-primary">{route.preferredTime}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <Card className="p-12 text-center">
          <Route size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('routes.noRoutesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Routes;
