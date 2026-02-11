import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  Plus,
  Truck,
  Calendar,
  MoreVertical,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { maintenanceRecords, vehicles, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Maintenance = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');

  const statusFilterMap: Record<string, string> = {
    'all': t('status.all'),
    'scheduled': t('status.scheduled'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
  };

  const maintenanceStatusMap: Record<string, string> = {
    'scheduled': t('status.scheduled'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
  };

  const typeFilterMap: Record<string, string> = {
    'all': t('maintenance.allTypes'),
    'Routine Service': t('maintenance.routineService'),
    'Repair': t('maintenance.repair'),
    'Inspection': t('maintenance.inspection'),
  };

  const stats = useMemo(() => {
    const totalCost = maintenanceRecords.filter(m => m.status === 'completed').reduce((acc, m) => acc + m.cost, 0);
    const inProgress = maintenanceRecords.filter(m => m.status === 'in-progress').length;
    const scheduled = maintenanceRecords.filter(m => m.status === 'scheduled').length;
    const totalDowntime = maintenanceRecords.filter(m => m.downtime).reduce((acc, m) => acc + (m.downtime || 0), 0);

    return { totalCost, inProgress, scheduled, totalDowntime };
  }, []);

  const filteredRecords = useMemo(() => {
    return maintenanceRecords.filter(record => {
      const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.serviceProvider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || record.maintenanceType === typeFilter;
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesVehicle = vehicleFilter === 'all' || record.vehicleId === vehicleFilter;

      return matchesSearch && matchesType && matchesStatus && matchesVehicle;
    });
  }, [searchQuery, typeFilter, statusFilter, vehicleFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': '#3b82f6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'in-progress': return Clock;
      case 'completed': return CheckCircle;
      default: return Wrench;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('maintenance.title')}
        subtitle={t('maintenance.subtitle')}
        icon={Wrench}
        actions={
          <Button>
            <Plus size={18} />
            {t('maintenance.scheduleMaintenance')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('maintenance.totalCostMonth'), value: `QAR ${stats.totalCost.toLocaleString()}`, icon: DollarSign, color: '#ef4444' },
          { label: t('maintenance.inProgress'), value: stats.inProgress, icon: Clock, color: '#f59e0b' },
          { label: t('maintenance.scheduled'), value: stats.scheduled, icon: Calendar, color: '#3b82f6' },
          { label: t('maintenance.totalDowntime'), value: `${stats.totalDowntime}${t('maintenance.h')}`, icon: AlertTriangle, color: '#64748b' },
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
              placeholder={t('maintenance.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="all">{t('maintenance.allVehicles')}</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.plateNo}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {Object.entries(typeFilterMap).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'scheduled', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusFilterMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Maintenance Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record, index) => {
          const StatusIcon = getStatusIcon(record.status);

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getStatusColor(record.status)}20` }}
                    >
                      <StatusIcon size={24} style={{ color: getStatusColor(record.status) }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-text-muted" />
                        <h3 className="font-semibold text-text-primary">{record.vehiclePlate}</h3>
                      </div>
                      <p className="text-sm text-text-muted">{record.maintenanceType}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                        style={{ backgroundColor: `${getStatusColor(record.status)}20`, color: getStatusColor(record.status) }}
                      >
                        {maintenanceStatusMap[record.status] || record.status}
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
                      { id: 'view', label: t('maintenance.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('maintenance.edit'), onClick: () => {} },
                      { id: 'complete', label: t('maintenance.markComplete'), onClick: () => {} },
                      { id: 'invoice', label: t('maintenance.viewInvoice'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Description */}
                <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-sm text-text-primary">{record.description}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-muted">{t('maintenance.date')}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={12} className="text-text-muted" />
                      <span className="text-sm text-text-primary">{new Date(record.maintenanceDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{t('maintenance.serviceProvider')}</p>
                    <p className="text-sm text-text-primary mt-1">{record.serviceProvider}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{t('maintenance.mileageLabel')}</p>
                    <p className="text-sm text-text-primary mt-1">{record.mileage.toLocaleString()} {t('maintenance.km')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{t('maintenance.laborHours')}</p>
                    <p className="text-sm text-text-primary mt-1">{record.laborHours}{t('maintenance.h')}</p>
                  </div>
                </div>

                {/* Parts */}
                {record.parts.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-2">{t('maintenance.partsUsed')}</p>
                    <div className="flex flex-wrap gap-2">
                      {record.parts.map((part, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-background-tertiary rounded text-xs text-text-secondary"
                        >
                          <Settings size={10} />
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border-default">
                  <div>
                    <p className="text-xs text-text-muted">{t('maintenance.cost')}</p>
                    <p className="text-lg font-bold" style={{ color: LOGISTICS_COLOR }}>
                      QAR {record.cost.toLocaleString()}
                    </p>
                  </div>
                  {record.downtime && (
                    <div className="text-right">
                      <p className="text-xs text-text-muted">{t('maintenance.downtime')}</p>
                      <p className="text-sm font-medium text-warning">{record.downtime} {t('maintenance.hours')}</p>
                    </div>
                  )}
                  {record.nextServiceMileage && (
                    <div className="text-right">
                      <p className="text-xs text-text-muted">{t('maintenance.nextService')}</p>
                      <p className="text-sm font-medium text-text-primary">{record.nextServiceMileage.toLocaleString()} {t('maintenance.km')}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="p-12 text-center">
          <Wrench size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('maintenance.noMaintenanceFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Maintenance;
