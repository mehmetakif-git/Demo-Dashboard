import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  MessageSquareText,
  Clock,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  Edit,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  maintenanceRequests,
  formatDateTime,
  getPriorityColor,
  type MaintenanceRequest,
} from '@/data/maintenanceData';
import { useTranslation } from 'react-i18next';

export const Requests = () => {
  const { t } = useTranslation('maintenance');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stats = useMemo(() => ({
    total: maintenanceRequests.length,
    open: maintenanceRequests.filter(r => r.status === 'open').length,
    assigned: maintenanceRequests.filter(r => r.status === 'assigned').length,
    converted: maintenanceRequests.filter(r => r.status === 'converted').length,
  }), []);

  const categories = useMemo(() => {
    const cats = [...new Set(maintenanceRequests.map(r => r.category))];
    return cats;
  }, []);

  const filteredRequests = useMemo(() => {
    let filtered = [...maintenanceRequests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.location.toLowerCase().includes(query) ||
          r.requestedBy.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(r => r.priority === selectedPriority);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    return filtered.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [searchQuery, selectedStatus, selectedPriority, selectedCategory]);

  const getStatusBadge = (status: MaintenanceRequest['status']) => {
    const config = {
      open: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: t('requests.open') },
      assigned: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: t('requests.assigned') },
      converted: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('requests.converted') },
      closed: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: t('requests.closed') },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: MaintenanceRequest['priority']) => {
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

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('requests.title')}
        subtitle={t('requests.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('requests.newRequest')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('requests.totalRequests')}
          value={stats.total.toString()}
          icon={MessageSquareText}
          iconColor="#547792"
        />
        <StatsCard
          title={t('requests.open')}
          value={stats.open.toString()}
          icon={AlertCircle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('requests.assigned')}
          value={stats.assigned.toString()}
          icon={UserCheck}
          iconColor="#3b82f6"
        />
        <StatsCard
          title={t('requests.convertedToWO')}
          value={stats.converted.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder={t('requests.searchPlaceholder')}
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
            <option value="all">{t('requests.allStatus')}</option>
            <option value="open">{t('requests.open')}</option>
            <option value="assigned">{t('requests.assigned')}</option>
            <option value="converted">{t('requests.converted')}</option>
            <option value="closed">{t('requests.closed')}</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('requests.allPriorities')}</option>
            <option value="critical">{t('requests.critical')}</option>
            <option value="high">{t('requests.high')}</option>
            <option value="medium">{t('requests.medium')}</option>
            <option value="low">{t('requests.low')}</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('requests.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all">
              {/* Priority Indicator */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1 rounded-l-lg"
                style={{ backgroundColor: getPriorityColor(request.priority) }}
              />

              <div className="pl-2">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-text-primary">{request.title}</h3>
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                      <span className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary">
                        {request.category}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{request.description}</p>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t('requests.requestId')}</p>
                    <p className="text-sm font-medium text-text-primary font-mono">{request.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">{t('requests.location')}</p>
                      <p className="text-sm text-text-primary">{request.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">{t('requests.requestedBy')}</p>
                      <p className="text-sm text-text-primary">{request.requestedBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">{t('requests.requestedAt')}</p>
                      <p className="text-sm text-text-primary">{formatDateTime(request.requestedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    {request.assignedTo && (
                      <div className="flex items-center gap-2">
                        <UserCheck size={14} className="text-blue-400" />
                        <span>{t('requests.assignedTo', { name: request.assignedTo })}</span>
                      </div>
                    )}
                    {request.workOrderId && (
                      <div className="flex items-center gap-2">
                        <ArrowRight size={14} className="text-green-400" />
                        <span>{t('requests.workOrder', { id: request.workOrderId })}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === 'open' && (
                      <Button variant="outline" size="sm" leftIcon={<UserCheck size={14} />}>
                        {t('requests.assign')}
                      </Button>
                    )}
                    {(request.status === 'open' || request.status === 'assigned') && (
                      <Button variant="primary" size="sm" leftIcon={<ArrowRight size={14} />}>
                        {t('requests.convertToWO')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquareText size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('requests.noRequestsFound')}</p>
        </Card>
      )}
    </div>
  );
};
