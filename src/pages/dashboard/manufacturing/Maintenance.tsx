import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  Plus,
  Calendar,
  Clock,
  MoreVertical,
  CheckCircle,
  PlayCircle,
  User,
  DollarSign,
  Cog,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { maintenanceSchedule, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const MaintenancePage = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'scheduled': t('status.scheduled'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
  };

  const maintenanceTypes = useMemo(() => {
    return ['all', ...new Set(maintenanceSchedule.map(m => m.maintenanceType))];
  }, []);

  const stats = useMemo(() => {
    const scheduled = maintenanceSchedule.filter(m => m.status === 'scheduled').length;
    const inProgress = maintenanceSchedule.filter(m => m.status === 'in-progress').length;
    const completed = maintenanceSchedule.filter(m => m.status === 'completed').length;
    const totalCost = maintenanceSchedule.reduce((acc, m) => acc + m.cost, 0);

    return { scheduled, inProgress, completed, totalCost };
  }, []);

  const filteredMaintenance = useMemo(() => {
    return maintenanceSchedule.filter(record => {
      const matchesSearch = record.machineNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.machineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.technician.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || record.maintenanceType === typeFilter;
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': '#3b82f6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'in-progress': return PlayCircle;
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
          { label: t('maintenance.scheduled'), value: stats.scheduled, icon: Clock, color: '#3b82f6' },
          { label: t('maintenance.inProgress'), value: stats.inProgress, icon: PlayCircle, color: '#f59e0b' },
          { label: t('maintenance.completed'), value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: t('maintenance.totalCost'), value: `QAR ${stats.totalCost.toLocaleString()}`, icon: DollarSign, color: MANUFACTURING_COLOR },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {maintenanceTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? t('maintenance.allTypes') : type}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {(['all', 'scheduled', 'in-progress', 'completed'] as const).map((status) => (
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

      {/* Maintenance Schedule Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.machine')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.maintenanceType')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.scheduledDate')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.technician')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.duration')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.cost')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.nextMaintenance')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('maintenance.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaintenance.map((record, index) => {
                const StatusIcon = getStatusIcon(record.status);

                return (
                  <motion.tr
                    key={record.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${MANUFACTURING_COLOR}20` }}
                        >
                          <Cog size={20} style={{ color: MANUFACTURING_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{record.machineName}</p>
                          <p className="text-xs text-text-muted">{record.machineNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${record.maintenanceType === 'Breakdown Repair' ? 'text-error' : 'text-text-secondary'}`}>
                        {record.maintenanceType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(record.scheduledDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(record.status)}20`, color: getStatusColor(record.status) }}
                      >
                        <StatusIcon size={10} />
                        {statusMap[record.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <User size={12} />
                        <span>{record.technician}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
                        <Clock size={12} />
                        <span>{record.duration ? `${record.duration} ${t('maintenance.min')}` : '-'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-text-primary">
                        {record.cost > 0 ? `QAR ${record.cost.toLocaleString()}` : '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(record.nextMaintenance).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'view', label: t('maintenance.viewDetails'), onClick: () => {} },
                          { id: 'edit', label: t('maintenance.edit'), onClick: () => {} },
                          { id: 'start', label: record.status === 'scheduled' ? t('maintenance.start') : t('maintenance.complete'), onClick: () => {} },
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

      {/* Parts Used Summary */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('maintenance.partsUsed')}</h3>
        <div className="flex flex-wrap gap-2">
          {maintenanceSchedule
            .filter(m => m.status === 'completed')
            .flatMap(m => m.parts)
            .filter((part, index, self) => self.indexOf(part) === index)
            .map((part, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-background-tertiary rounded-full text-sm text-text-secondary"
              >
                {part}
              </span>
            ))}
        </div>
      </Card>

      {filteredMaintenance.length === 0 && (
        <Card className="p-12 text-center">
          <Wrench size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('maintenance.noMaintenanceFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default MaintenancePage;
