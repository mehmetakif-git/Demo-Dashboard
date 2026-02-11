import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Download,
  Factory,
  Package,
  CheckCircle,
  Trash2,
  Clock,
  DollarSign,
  TrendingUp,
  Gauge,
  Users,
  Wrench,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  productionLines,
  workOrders,
  qualityChecks,
  machines,
  wasteRecords,
  finishedGoods,
  shifts,
  MANUFACTURING_COLOR,
} from '@/data/manufacturing/manufacturingData';

export const Reports = () => {
  const { t } = useTranslation('manufacturing');
  const [dateRange, setDateRange] = useState('month');

  const statusMap: Record<string, string> = {
    'pending': t('status.pending'),
    'in-progress': t('status.inProgress'),
    'completed': t('status.completed'),
    'on-hold': t('status.planned'),
    'cancelled': t('status.cancelled'),
    'scheduled': t('status.scheduled'),
    'passed': t('status.passed'),
    'failed': t('status.failed'),
    'running': t('status.running'),
    'idle': t('status.idle'),
    'maintenance': t('status.maintenance'),
    'offline': t('status.outOfService'),
  };

  const stats = useMemo(() => {
    const totalProduction = productionLines.reduce((acc, p) => acc + p.currentOutput, 0);
    const totalWorkOrders = workOrders.length;
    const completedWorkOrders = workOrders.filter(w => w.status === 'completed').length;
    const avgEfficiency = Math.round(productionLines.reduce((acc, p) => acc + p.efficiency, 0) / productionLines.length);
    const qualityRate = Math.round((qualityChecks.filter(q => q.status === 'passed').length / qualityChecks.length) * 100);
    const totalWaste = wasteRecords.reduce((acc, w) => acc + w.quantity, 0);
    const recycledWaste = wasteRecords.filter(w => w.disposalMethod === 'Recycling').reduce((acc, w) => acc + w.quantity, 0);
    const machineUtilization = Math.round((machines.filter(m => m.status === 'running').length / machines.length) * 100);
    const finishedGoodsValue = finishedGoods.reduce((acc, f) => acc + (f.costPerUnit * f.quantity), 0);
    const activeShifts = shifts.filter(s => s.status === 'active').length;

    return {
      totalProduction,
      totalWorkOrders,
      completedWorkOrders,
      avgEfficiency,
      qualityRate,
      totalWaste,
      recycledWaste,
      machineUtilization,
      finishedGoodsValue,
      activeShifts,
    };
  }, []);

  const workOrdersByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    workOrders.forEach(w => {
      statusCounts[w.status] = (statusCounts[w.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, []);

  const qualityByResult = useMemo(() => {
    const resultCounts: Record<string, number> = {};
    qualityChecks.forEach(q => {
      resultCounts[q.status] = (resultCounts[q.status] || 0) + 1;
    });
    return Object.entries(resultCounts).map(([result, count]) => ({ result, count }));
  }, []);

  const topProductionLines = useMemo(() => {
    return [...productionLines].sort((a, b) => b.efficiency - a.efficiency).slice(0, 5);
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#64748b',
      'in-progress': '#3b82f6',
      'completed': '#10b981',
      'on-hold': '#f59e0b',
      'cancelled': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getQualityColor = (result: string) => {
    const colors: Record<string, string> = {
      'passed': '#10b981',
      'failed': '#ef4444',
    };
    return colors[result] || MANUFACTURING_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.title')}
        subtitle={t('reports.subtitle')}
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            <select
              className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">{t('reports.thisWeek')}</option>
              <option value="month">{t('reports.thisMonth')}</option>
              <option value="quarter">{t('reports.thisQuarter')}</option>
              <option value="year">{t('reports.thisYear')}</option>
            </select>
            <Button>
              <Download size={18} />
              {t('reports.exportReport')}
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('reports.totalProduction'), value: stats.totalProduction.toLocaleString(), icon: Factory, color: MANUFACTURING_COLOR },
          { label: t('reports.workOrders'), value: `${stats.completedWorkOrders}/${stats.totalWorkOrders}`, icon: Package, color: '#3b82f6' },
          { label: t('reports.qualityRate'), value: `${stats.qualityRate}%`, icon: CheckCircle, color: stats.qualityRate >= 90 ? '#10b981' : '#f59e0b' },
          { label: t('reports.avgEfficiency'), value: `${stats.avgEfficiency}%`, icon: Gauge, color: stats.avgEfficiency >= 80 ? '#10b981' : '#f59e0b' },
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

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('reports.machineUtilization'), value: `${stats.machineUtilization}%`, icon: Wrench, color: stats.machineUtilization >= 70 ? '#10b981' : '#f59e0b' },
          { label: t('reports.activeShifts'), value: stats.activeShifts, icon: Clock, color: '#3b82f6' },
          { label: t('reports.finishedGoodsValue'), value: `QAR ${stats.finishedGoodsValue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: t('reports.totalWaste'), value: `${stats.totalWaste.toLocaleString()} kg`, icon: Trash2, color: '#ef4444' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.05 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Orders by Status */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.workOrdersByStatus')}</h3>
          <div className="space-y-3">
            {workOrdersByStatus.map((item, index) => {
              const percentage = Math.round((item.count / workOrders.length) * 100);
              return (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">{statusMap[item.status] || item.status}</span>
                    <span className="text-sm font-medium text-text-primary">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: getStatusColor(item.status) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Quality Results */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.qualityCheckResults')}</h3>
          <div className="space-y-3">
            {qualityByResult.map((item, index) => {
              const percentage = Math.round((item.count / qualityChecks.length) * 100);
              return (
                <motion.div
                  key={item.result}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">{statusMap[item.result] || item.result}</span>
                    <span className="text-sm font-medium text-text-primary">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: getQualityColor(item.result) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Top Production Lines */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.topProductionLines')}</h3>
          <div className="space-y-3">
            {topProductionLines.map((line, index) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${MANUFACTURING_COLOR}20` }}
                  >
                    <span className="text-sm font-bold" style={{ color: MANUFACTURING_COLOR }}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{line.lineName}</p>
                    <p className="text-xs text-text-muted">{line.supervisor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">{line.efficiency}%</p>
                  <p className="text-xs text-text-muted">{t('production.efficiency')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Production Trend Placeholder */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.productionTrend')}</h3>
          <div className="h-64 flex items-center justify-center bg-background-tertiary rounded-lg">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto text-text-muted mb-2" />
              <p className="text-text-muted">{t('reports.chartPlaceholder')}</p>
              <p className="text-xs text-text-muted mt-1">{t('reports.chartDescription')}</p>
            </div>
          </div>
        </Card>

        {/* Waste Analysis */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.wasteAnalysis')}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-background-tertiary rounded-lg text-center">
              <Trash2 size={24} className="mx-auto text-error mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.totalWaste.toLocaleString()}</p>
              <p className="text-xs text-text-muted">{t('reports.totalWasteKg')}</p>
            </div>
            <div className="p-4 bg-background-tertiary rounded-lg text-center">
              <CheckCircle size={24} className="mx-auto text-success mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.recycledWaste.toLocaleString()}</p>
              <p className="text-xs text-text-muted">{t('reports.recycledKg')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg">
            <span className="text-sm text-text-secondary">{t('reports.recyclingRate')}</span>
            <span className="font-medium text-success">
              {Math.round((stats.recycledWaste / stats.totalWaste) * 100)}%
            </span>
          </div>
        </Card>

        {/* Machine Status Overview */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.machineStatusOverview')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-2 text-sm font-medium text-text-muted">{t('reports.status')}</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">{t('reports.count')}</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">{t('reports.percentage')}</th>
                </tr>
              </thead>
              <tbody>
                {['running', 'idle', 'maintenance', 'offline'].map((status, index) => {
                  const count = machines.filter(m => m.status === status).length;
                  const percentage = Math.round((count / machines.length) * 100);
                  return (
                    <motion.tr
                      key={status}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border-default last:border-b-0"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: status === 'running' ? '#10b981' : status === 'idle' ? '#64748b' : status === 'maintenance' ? '#f59e0b' : '#ef4444' }}
                          />
                          <span className="text-text-primary">{statusMap[status] || status}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        <span className="font-medium text-text-primary">{count}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-text-secondary">{percentage}%</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('reports.exportReports')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: t('reports.productionReport'), icon: Factory },
            { label: t('reports.qualityReport'), icon: CheckCircle },
            { label: t('reports.machineReport'), icon: Wrench },
            { label: t('reports.wasteReport'), icon: Trash2 },
            { label: t('reports.shiftReport'), icon: Users },
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <motion.div
                key={report.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button variant="ghost" className="w-full flex flex-col items-center gap-2 h-auto py-4">
                  <Icon size={24} style={{ color: MANUFACTURING_COLOR }} />
                  <span className="text-xs">{report.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
