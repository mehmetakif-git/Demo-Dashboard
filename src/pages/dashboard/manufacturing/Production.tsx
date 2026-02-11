import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Factory,
  Search,
  Pause,
  Users,
  Clock,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Wrench,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { productionLines, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Production = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'running': t('status.running'),
    'maintenance': t('status.maintenance'),
    'idle': t('status.idle'),
  };

  const departments = useMemo(() => {
    return ['all', ...new Set(productionLines.map(l => l.department))];
  }, []);

  const stats = useMemo(() => {
    const activeLines = productionLines.filter(l => l.status === 'running').length;
    const totalOutput = productionLines.reduce((acc, l) => acc + l.currentOutput, 0);
    const avgEfficiency = productionLines.filter(l => l.status === 'running').length > 0
      ? Math.round(productionLines.filter(l => l.status === 'running').reduce((acc, l) => acc + l.efficiency, 0) / productionLines.filter(l => l.status === 'running').length)
      : 0;
    const totalDowntime = productionLines.reduce((acc, l) => acc + l.downtime, 0);

    return { activeLines, totalOutput, avgEfficiency, totalDowntime };
  }, []);

  const filteredLines = useMemo(() => {
    return productionLines.filter(line => {
      const matchesSearch = line.lineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        line.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (line.productName && line.productName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || line.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || line.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchQuery, statusFilter, departmentFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'running': '#10b981',
      'maintenance': '#f59e0b',
      'idle': '#64748b',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return CheckCircle;
      case 'maintenance': return Wrench;
      case 'idle': return Pause;
      default: return Factory;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('production.title')}
        subtitle={t('production.subtitle')}
        icon={Factory}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('production.activeLines'), value: stats.activeLines, icon: Factory, color: '#10b981' },
          { label: t('production.totalOutputToday'), value: stats.totalOutput.toLocaleString(), icon: CheckCircle, color: MANUFACTURING_COLOR },
          { label: t('production.avgEfficiency'), value: `${stats.avgEfficiency}%`, icon: Gauge, color: stats.avgEfficiency >= 85 ? '#10b981' : '#f59e0b' },
          { label: t('production.totalDowntime'), value: `${stats.totalDowntime} min`, icon: Clock, color: stats.totalDowntime > 60 ? '#ef4444' : '#10b981' },
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
              placeholder={t('production.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'all' ? t('production.allDepartments') : dept}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {(['all', 'running', 'maintenance', 'idle'] as const).map((status) => (
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

      {/* Production Lines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLines.map((line, index) => {
          const StatusIcon = getStatusIcon(line.status);
          const progressPercent = line.targetOutput > 0 ? Math.round((line.currentOutput / line.targetOutput) * 100) : 0;

          return (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getStatusColor(line.status)}20` }}
                    >
                      <StatusIcon size={24} style={{ color: getStatusColor(line.status) }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{line.lineName}</h3>
                      <p className="text-sm text-text-muted">{line.department}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                        style={{ backgroundColor: `${getStatusColor(line.status)}20`, color: getStatusColor(line.status) }}
                      >
                        {statusMap[line.status]}
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
                      { id: 'view', label: t('production.viewDetails'), onClick: () => {} },
                      { id: 'monitor', label: t('production.monitor'), onClick: () => {} },
                      { id: 'stop', label: line.status === 'running' ? t('production.stopLine') : t('production.startLine'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Current Product */}
                {line.productName ? (
                  <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('production.currentlyProducing')}</p>
                    <p className="font-medium text-text-primary">{line.productName}</p>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                    <p className="text-sm text-text-muted">{t('production.noActiveProduction')}</p>
                  </div>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">{t('production.outputProgress')}</span>
                    <span className="font-medium text-text-primary">{line.currentOutput} / {line.targetOutput}</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%`, backgroundColor: getStatusColor(line.status) }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1 text-right">{progressPercent}{t('production.percentComplete')}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-background-tertiary rounded-lg">
                    <Gauge size={16} className="mx-auto text-text-muted mb-1" />
                    <p className="text-lg font-bold text-text-primary">{line.efficiency}%</p>
                    <p className="text-xs text-text-muted">{t('production.efficiency')}</p>
                  </div>
                  <div className="text-center p-2 bg-background-tertiary rounded-lg">
                    <Users size={16} className="mx-auto text-text-muted mb-1" />
                    <p className="text-lg font-bold text-text-primary">{line.workers}</p>
                    <p className="text-xs text-text-muted">{t('production.workers')}</p>
                  </div>
                  <div className="text-center p-2 bg-background-tertiary rounded-lg">
                    <AlertTriangle size={16} className="mx-auto text-text-muted mb-1" />
                    <p className="text-lg font-bold text-text-primary">{line.downtime}</p>
                    <p className="text-xs text-text-muted">{t('production.downtimeMin')}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border-default">
                  <div className="text-sm text-text-muted">
                    <span className="font-medium text-text-primary">{line.supervisor}</span>
                  </div>
                  {line.shift && (
                    <span className="text-xs text-text-muted">{line.shift}</span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredLines.length === 0 && (
        <Card className="p-12 text-center">
          <Factory size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('production.noProductionLinesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Production;
