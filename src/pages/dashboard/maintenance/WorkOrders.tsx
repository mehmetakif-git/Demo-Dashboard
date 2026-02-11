import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  ClipboardList,
  Calendar,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Wrench,
  Package,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  workOrders,
  workOrderStatuses,
  formatDate,
  formatDateTime,
  formatCurrency,
  getStatusColor,
  type WorkOrder,
} from '@/data/maintenanceData';
import { useTranslation } from 'react-i18next';

export const WorkOrders = () => {
  const { t } = useTranslation('maintenance');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const stats = useMemo(() => ({
    total: workOrders.length,
    inProgress: workOrders.filter(wo => wo.status === 'in-progress').length,
    scheduled: workOrders.filter(wo => wo.status === 'scheduled').length,
    completed: workOrders.filter(wo => wo.status === 'completed').length,
  }), []);

  const filteredWorkOrders = useMemo(() => {
    let filtered = [...workOrders];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        wo =>
          wo.title.toLowerCase().includes(query) ||
          wo.asset.toLowerCase().includes(query) ||
          wo.id.toLowerCase().includes(query) ||
          wo.assignedTo.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(wo => wo.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(wo => wo.type === selectedType);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(wo => wo.priority === selectedPriority);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchQuery, selectedStatus, selectedType, selectedPriority]);

  const getStatusBadge = (status: WorkOrder['status']) => {
    const config = {
      scheduled: { bg: 'bg-[#547792]/20', text: 'text-[#547792]', label: t('workOrders.scheduled') },
      'in-progress': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: t('workOrders.inProgress') },
      'pending-parts': { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]', label: t('workOrders.pendingParts') },
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('workOrders.completed') },
      cancelled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: t('workOrders.cancelled') },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: WorkOrder['type']) => {
    const config = {
      preventive: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      corrective: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
      inspection: { bg: 'bg-green-500/20', text: 'text-green-400' },
    };
    const c = config[type];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {type}
      </span>
    );
  };

  const getPriorityBadge = (priority: WorkOrder['priority']) => {
    const config = {
      critical: { bg: 'bg-red-500/20', text: 'text-red-400' },
      high: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      medium: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      low: { bg: 'bg-slate-500/20', text: 'text-slate-400' },
    };
    const c = config[priority];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {priority}
      </span>
    );
  };

  const calculateTotalCost = (wo: WorkOrder) => {
    const partsCost = wo.parts.reduce((sum, part) => sum + part.cost, 0);
    return partsCost + wo.laborCost;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('workOrders.title')}
        subtitle={t('workOrders.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('workOrders.createWorkOrder')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('workOrders.totalWorkOrders')}
          value={stats.total.toString()}
          icon={ClipboardList}
          iconColor="#547792"
        />
        <StatsCard
          title={t('workOrders.inProgress')}
          value={stats.inProgress.toString()}
          icon={Wrench}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('workOrders.scheduled')}
          value={stats.scheduled.toString()}
          icon={Calendar}
          iconColor="#3b82f6"
        />
        <StatsCard
          title={t('workOrders.completed')}
          value={stats.completed.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder={t('workOrders.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('workOrders.allStatus')}</option>
            {workOrderStatuses.map(status => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('workOrders.allTypes')}</option>
            <option value="preventive">{t('workOrders.preventive')}</option>
            <option value="corrective">{t('workOrders.corrective')}</option>
            <option value="inspection">{t('workOrders.inspection')}</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('workOrders.allPriorities')}</option>
            <option value="critical">{t('workOrders.critical')}</option>
            <option value="high">{t('workOrders.high')}</option>
            <option value="medium">{t('workOrders.medium')}</option>
            <option value="low">{t('workOrders.low')}</option>
          </select>
        </div>
      </Card>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredWorkOrders.map((wo, index) => (
          <motion.div
            key={wo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all">
              {/* Status Indicator */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1 rounded-l-lg"
                style={{ backgroundColor: getStatusColor(wo.status) }}
              />

              <div className="pl-2">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-text-primary text-lg">{wo.title}</h3>
                      {getStatusBadge(wo.status)}
                      {getTypeBadge(wo.type)}
                      {getPriorityBadge(wo.priority)}
                    </div>
                    <p className="text-sm text-text-secondary">{wo.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-accent-primary">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-blue-400">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.workOrderId')}</p>
                    <p className="text-sm font-medium text-text-primary font-mono">{wo.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.asset')}</p>
                    <p className="text-sm font-medium text-text-primary">{wo.asset}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.assignedTo')}</p>
                    <p className="text-sm font-medium text-text-primary">{wo.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.dueDate')}</p>
                    <p className="text-sm font-medium text-text-primary">{formatDate(wo.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.estHours')}</p>
                    <p className="text-sm font-medium text-text-primary">{wo.estimatedHours}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('workOrders.totalCost')}</p>
                    <p className="text-sm font-medium text-text-primary">{formatCurrency(calculateTotalCost(wo))}</p>
                  </div>
                </div>

                {/* Parts */}
                {wo.parts.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">
                      {t('workOrders.parts')}: {wo.parts.map(p => `${p.name} (${p.quantity})`).join(', ')}
                    </span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{t('workOrders.created')} {formatDateTime(wo.createdAt)}</span>
                    {wo.startedAt && <span>{t('workOrders.started')} {formatDateTime(wo.startedAt)}</span>}
                    {wo.completedAt && <span>{t('workOrders.completedAt')} {formatDateTime(wo.completedAt)}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">{t('workOrders.requestedBy')}</span>
                    <span className="text-sm text-text-secondary">{wo.requestedBy}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredWorkOrders.length === 0 && (
        <Card className="p-12 text-center">
          <ClipboardList size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('workOrders.noWorkOrdersFound')}</p>
        </Card>
      )}
    </div>
  );
};
