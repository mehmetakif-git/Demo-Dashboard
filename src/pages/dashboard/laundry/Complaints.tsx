import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  Package,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  complaints,
  formatCurrency,
  formatDate,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Complaints = () => {
  const { t } = useTranslation('laundry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const stats = useMemo(() => ({
    total: complaints.length,
    open: complaints.filter((c) => c.status === 'open').length,
    investigating: complaints.filter((c) => c.status === 'investigating').length,
    resolved: complaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length,
    totalCompensation: complaints.reduce((sum, c) => sum + c.compensationAmount, 0),
  }), []);

  const filteredComplaints = useMemo(() => {
    let filtered = [...complaints];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.orderNumber.toLowerCase().includes(query) ||
          c.customerName.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter((c) => c.priority === selectedPriority);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((c) => c.type === selectedType);
    }

    // Sort by priority (urgent first) then by date
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [searchQuery, selectedStatus, selectedPriority, selectedType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/20 text-red-400';
      case 'investigating':
        return 'bg-amber-500/20 text-amber-400';
      case 'resolved':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'damage':
        return AlertTriangle;
      case 'lost':
        return Package;
      case 'delay':
        return Clock;
      case 'billing':
        return DollarSign;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('complaints.title')}
        subtitle={t('complaints.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('complaints.newComplaint')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('complaints.totalComplaints')}
          value={stats.total.toString()}
          icon={MessageSquare}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('complaints.open')}
          value={stats.open.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
        <StatsCard
          title={t('complaints.investigating')}
          value={stats.investigating.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('complaints.compensationPaid')}
          value={formatCurrency(stats.totalCompensation)}
          icon={DollarSign}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('complaints.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('complaints.allStatus')}</option>
            <option value="open">{t('complaints.statusOpen')}</option>
            <option value="investigating">{t('complaints.statusInvestigating')}</option>
            <option value="resolved">{t('complaints.statusResolved')}</option>
            <option value="closed">{t('complaints.statusClosed')}</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('complaints.allPriority')}</option>
            <option value="urgent">{t('complaints.priorityUrgent')}</option>
            <option value="high">{t('complaints.priorityHigh')}</option>
            <option value="medium">{t('complaints.priorityMedium')}</option>
            <option value="low">{t('complaints.priorityLow')}</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('complaints.allTypes')}</option>
            <option value="damage">{t('complaints.typeDamage')}</option>
            <option value="lost">{t('complaints.typeLostItem')}</option>
            <option value="delay">{t('complaints.typeDelay')}</option>
            <option value="quality">{t('complaints.typeQuality')}</option>
            <option value="billing">{t('complaints.typeBilling')}</option>
            <option value="service">{t('complaints.typeService')}</option>
            <option value="other">{t('complaints.typeOther')}</option>
          </select>
        </div>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint, index) => {
          const TypeIcon = getTypeIcon(complaint.type);

          return (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:border-white/[0.15] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      complaint.priority === 'urgent' ? 'bg-red-500/20' :
                      complaint.priority === 'high' ? 'bg-orange-500/20' :
                      complaint.priority === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                    }`}>
                      <TypeIcon size={24} className={
                        complaint.priority === 'urgent' ? 'text-red-400' :
                        complaint.priority === 'high' ? 'text-orange-400' :
                        complaint.priority === 'medium' ? 'text-amber-400' : 'text-blue-400'
                      } />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-text-primary">
                          {t('complaints.issue', { type: complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1) })}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(complaint.status)}`}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Package size={14} />
                          {complaint.orderNumber}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {complaint.customerName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(complaint.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {complaint.compensationAmount > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-text-muted">{t('complaints.compensation')}</p>
                        <p className="font-medium text-emerald-400">{formatCurrency(complaint.compensationAmount)}</p>
                      </div>
                    )}
                    <Button variant="secondary" size="sm">
                      {t('complaints.viewDetails')}
                    </Button>
                  </div>
                </div>

                <p className="text-text-secondary mb-4">{complaint.description}</p>

                {complaint.resolution && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">{t('complaints.resolution')}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{complaint.resolution}</p>
                    {complaint.resolvedAt && (
                      <p className="text-xs text-text-muted mt-2">{t('complaints.resolvedOn', { date: formatDate(complaint.resolvedAt) })}</p>
                    )}
                  </div>
                )}

                {complaint.assignedTo && (
                  <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-sm text-text-muted">
                    <User size={14} />
                    {t('complaints.assignedTo')} <span className="text-text-secondary">{complaint.assignedTo}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredComplaints.length === 0 && (
        <Card className="p-12 text-center">
          <CheckCircle size={48} className="mx-auto mb-4 text-emerald-400" />
          <p className="text-text-secondary">{t('complaints.noComplaintsFound')}</p>
        </Card>
      )}
    </div>
  );
};
