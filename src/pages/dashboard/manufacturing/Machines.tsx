import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Cog,
  Search,
  Plus,
  Factory,
  Clock,
  Calendar,
  MoreVertical,
  CheckCircle,
  Wrench,
  Pause,
  AlertTriangle,
  Gauge,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { machines, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Machines = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'running': t('status.running'),
    'idle': t('status.idle'),
    'maintenance': t('status.maintenance'),
    'out-of-service': t('status.outOfService'),
  };

  const categories = useMemo(() => {
    return ['all', ...new Set(machines.map(m => m.category))];
  }, []);

  const stats = useMemo(() => {
    const totalMachines = machines.length;
    const running = machines.filter(m => m.status === 'running').length;
    const idle = machines.filter(m => m.status === 'idle').length;
    const maintenance = machines.filter(m => m.status === 'maintenance').length;
    const avgEfficiency = machines.filter(m => m.status === 'running').length > 0
      ? Math.round(machines.filter(m => m.status === 'running').reduce((acc, m) => acc + m.efficiency, 0) / machines.filter(m => m.status === 'running').length)
      : 0;

    return { totalMachines, running, idle, maintenance, avgEfficiency };
  }, []);

  const filteredMachines = useMemo(() => {
    return machines.filter(machine => {
      const matchesSearch = machine.machineNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.machineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || machine.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || machine.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'running': '#10b981',
      'idle': '#64748b',
      'maintenance': '#f59e0b',
      'out-of-service': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return CheckCircle;
      case 'idle': return Pause;
      case 'maintenance': return Wrench;
      case 'out-of-service': return AlertTriangle;
      default: return Cog;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('machines.title')}
        subtitle={t('machines.subtitle')}
        icon={Cog}
        actions={
          <Button>
            <Plus size={18} />
            {t('machines.addMachine')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('machines.totalMachines'), value: stats.totalMachines, icon: Cog, color: MANUFACTURING_COLOR },
          { label: t('machines.running'), value: stats.running, icon: CheckCircle, color: '#10b981' },
          { label: t('machines.idle'), value: stats.idle, icon: Pause, color: '#64748b' },
          { label: t('machines.maintenance'), value: stats.maintenance, icon: Wrench, color: '#f59e0b' },
          { label: t('machines.avgEfficiency'), value: `${stats.avgEfficiency}%`, icon: Gauge, color: stats.avgEfficiency >= 85 ? '#10b981' : '#f59e0b' },
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
              placeholder={t('machines.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? t('machines.allCategories') : cat}</option>
            ))}
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'running', 'idle', 'maintenance', 'out-of-service'].map((status) => (
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

      {/* Machines Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('machines.machine')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('machines.category')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('machines.productionLine')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('machines.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('machines.efficiency')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('machines.operatingHours')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('machines.nextMaintenance')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('machines.maintenanceCost')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('machines.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((machine, index) => {
                const StatusIcon = getStatusIcon(machine.status);

                return (
                  <motion.tr
                    key={machine.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(machine.status)}20` }}
                        >
                          <StatusIcon size={20} style={{ color: getStatusColor(machine.status) }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{machine.machineName}</p>
                          <p className="text-xs text-text-muted">{machine.machineNo} - {machine.manufacturer} {machine.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{machine.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Factory size={12} />
                        <span>{machine.lineName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(machine.status)}20`, color: getStatusColor(machine.status) }}
                      >
                        <StatusIcon size={10} />
                        {statusMap[machine.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Gauge size={14} className="text-text-muted" />
                        <span className={`font-medium ${machine.efficiency >= 85 ? 'text-success' : machine.efficiency > 0 ? 'text-warning' : 'text-text-muted'}`}>
                          {machine.efficiency}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-text-secondary">
                        <Clock size={12} />
                        <span>{machine.operatingHours.toLocaleString()} {t('machines.hrs')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(machine.nextMaintenance).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={12} className="text-text-muted" />
                        <span className="font-medium text-text-primary">QAR {machine.maintenanceCost.toLocaleString()}</span>
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
                          { id: 'view', label: t('machines.viewDetails'), onClick: () => {} },
                          { id: 'edit', label: t('machines.edit'), onClick: () => {} },
                          { id: 'maintenance', label: t('machines.scheduleMaintenance'), onClick: () => {} },
                          { id: 'monitor', label: t('machines.monitor'), onClick: () => {} },
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

      {filteredMachines.length === 0 && (
        <Card className="p-12 text-center">
          <Cog size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('machines.noMachinesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Machines;
