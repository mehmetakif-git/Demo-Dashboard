import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Handshake,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  FileText,
  User,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { settlements, LAW_COLOR } from '@/data/law/lawData';

export const Settlements = () => {
  const { t } = useTranslation('law');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('settlements.all'),
    'pending-approval': t('status.pendingApproval'),
    'approved': t('status.approved'),
    'rejected': t('status.rejected'),
  };

  const settlementTypes = useMemo(() => {
    return ['all', ...new Set(settlements.map(s => s.settlementType))];
  }, []);

  const stats = useMemo(() => {
    const total = settlements.length;
    const pendingApproval = settlements.filter(s => s.status === 'pending-approval').length;
    const approved = settlements.filter(s => s.status === 'approved').length;
    const totalValue = settlements.filter(s => s.status === 'approved').reduce((acc, s) => acc + s.amount, 0);

    return { total, pendingApproval, approved, totalValue };
  }, []);

  const filteredSettlements = useMemo(() => {
    return settlements.filter(settlement => {
      const matchesSearch = settlement.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        settlement.caseTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || settlement.status === statusFilter;
      const matchesType = typeFilter === 'all' || settlement.settlementType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending-approval': '#f59e0b',
      'approved': '#10b981',
      'rejected': '#ef4444',
    };
    return colors[status] || LAW_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending-approval': return Clock;
      case 'approved': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('settlements.title')}
        subtitle={t('settlements.subtitle')}
        icon={Handshake}
        actions={
          <Button>
            <Plus size={18} />
            {t('settlements.newSettlement')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('settlements.totalSettlements'), value: stats.total, icon: Handshake, color: LAW_COLOR },
          { label: t('settlements.pendingApproval'), value: stats.pendingApproval, icon: Clock, color: '#f59e0b' },
          { label: t('settlements.approved'), value: stats.approved, icon: CheckCircle, color: '#10b981' },
          { label: t('settlements.totalValue'), value: `QAR ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: '#3b82f6' },
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
              placeholder={t('settlements.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {settlementTypes.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? t('settlements.allTypes') : type}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'pending-approval', 'approved', 'rejected'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status] || status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Settlements List */}
      <div className="space-y-4">
        {filteredSettlements.map((settlement, index) => {
          const StatusIcon = getStatusIcon(settlement.status);

          return (
            <motion.div
              key={settlement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getStatusColor(settlement.status)}20` }}
                    >
                      <StatusIcon size={18} style={{ color: getStatusColor(settlement.status) }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-medium text-text-primary">{settlement.caseNo}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${getStatusColor(settlement.status)}20`, color: getStatusColor(settlement.status) }}
                        >
                          {statusMap[settlement.status] || settlement.status}
                        </span>
                      </div>
                      <p className="text-text-secondary">{settlement.caseTitle}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('settlements.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('settlements.edit'), onClick: () => {} },
                      { id: 'approve', label: t('settlements.approve'), onClick: () => {} },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">{t('settlements.settlementDate')}</p>
                      <p className="text-sm text-text-primary">{settlement.settlementDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">{t('settlements.type')}</p>
                      <p className="text-sm text-text-primary">{settlement.settlementType}</p>
                    </div>
                  </div>
                  {settlement.amount > 0 && (
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-text-muted" />
                      <div>
                        <p className="text-xs text-text-muted">{t('settlements.amount')}</p>
                        <p className="text-sm font-medium text-text-primary">
                          QAR {settlement.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-background-tertiary rounded-lg mb-4">
                  <p className="text-xs text-text-muted mb-1">{t('settlements.terms')}</p>
                  <p className="text-sm text-text-secondary">{settlement.terms}</p>
                </div>

                {settlement.status === 'approved' && settlement.approvedBy && (
                  <div className="flex items-center gap-4 pt-3 border-t border-border-default">
                    <div className="flex items-center gap-2 text-sm">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-muted">{t('settlements.approvedBy')}</span>
                      <span className="text-text-primary">{settlement.approvedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{settlement.approvalDate}</span>
                    </div>
                  </div>
                )}

                {settlement.notes && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted mb-1">{t('settlements.notes')}</p>
                    <p className="text-sm text-text-secondary">{settlement.notes}</p>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredSettlements.length === 0 && (
        <Card className="p-12 text-center">
          <Handshake size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('settlements.noSettlementsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Settlements;
