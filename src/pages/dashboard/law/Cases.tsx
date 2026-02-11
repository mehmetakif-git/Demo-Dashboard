import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { cases, LAW_COLOR } from '@/data/law/lawData';

export const Cases = () => {
  const { t } = useTranslation('law');

  const statusMap: Record<string, string> = {
    'all': t('cases.all'),
    'active': t('status.active'),
    'won': t('status.won'),
    'lost': t('status.lost'),
    'settlement': t('status.settlement'),
    'closed': t('status.closed'),
  };

  const priorityMap: Record<string, string> = {
    'all': t('cases.all'),
    'urgent': t('status.urgent'),
    'high': t('status.high'),
    'normal': t('status.normal'),
    'low': t('status.low'),
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [caseTypeFilter, setCaseTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const caseTypes = useMemo(() => {
    return ['all', ...new Set(cases.map(c => c.caseType))];
  }, []);

  const stats = useMemo(() => {
    const totalCases = cases.length;
    const activeCases = cases.filter(c => c.status === 'active').length;
    const wonCases = cases.filter(c => c.status === 'won').length;
    const settlementCases = cases.filter(c => c.status === 'settlement').length;

    return { totalCases, activeCases, wonCases, settlementCases };
  }, []);

  const filteredCases = useMemo(() => {
    return cases.filter(caseItem => {
      const matchesSearch = caseItem.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCaseType = caseTypeFilter === 'all' || caseItem.caseType === caseTypeFilter;
      const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || caseItem.priority === priorityFilter;

      return matchesSearch && matchesCaseType && matchesStatus && matchesPriority;
    });
  }, [searchQuery, caseTypeFilter, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#3b82f6',
      'won': '#10b981',
      'lost': '#ef4444',
      'settlement': '#f59e0b',
      'closed': '#64748b',
    };
    return colors[status] || LAW_COLOR;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'urgent': '#ef4444',
      'high': '#f97316',
      'normal': '#3b82f6',
      'low': '#64748b',
    };
    return colors[priority] || LAW_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('cases.title')}
        subtitle={t('cases.subtitle')}
        icon={Briefcase}
        actions={
          <Button>
            <Plus size={18} />
            {t('cases.newCase')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('cases.totalCases'), value: stats.totalCases, icon: Briefcase, color: LAW_COLOR },
          { label: t('cases.activeCases'), value: stats.activeCases, icon: Clock, color: '#3b82f6' },
          { label: t('cases.wonCases'), value: stats.wonCases, icon: CheckCircle, color: '#10b981' },
          { label: t('cases.settlement'), value: stats.settlementCases, icon: Scale, color: '#f59e0b' },
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
              placeholder={t('cases.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {caseTypes.map((type) => (
              <Button
                key={type}
                variant={caseTypeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCaseTypeFilter(type)}
              >
                {type === 'all' ? t('cases.allTypes') : type}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="text-sm text-text-muted mr-2">{t('cases.statusLabel')}</span>
          {['all', 'active', 'settlement', 'won', 'lost', 'closed'].map((status) => (
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
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-sm text-text-muted mr-2">{t('cases.priorityLabel')}</span>
          {['all', 'urgent', 'high', 'normal', 'low'].map((priority) => (
            <Button
              key={priority}
              variant={priorityFilter === priority ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPriorityFilter(priority)}
            >
              {priorityMap[priority] || priority}
            </Button>
          ))}
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.caseNo')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.caseTitle')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.type')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.client')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('clients.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('cases.priority')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.nextHearing')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('cases.lawyer')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('cases.value')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('cases.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem, index) => (
                <motion.tr
                  key={caseItem.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-text-primary">{caseItem.caseNo}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-[200px]">
                      <p className="text-text-primary font-medium truncate">{caseItem.caseTitle}</p>
                      <p className="text-xs text-text-muted">{caseItem.practiceArea}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary">{caseItem.caseType}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{caseItem.clientName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(caseItem.status)}20`, color: getStatusColor(caseItem.status) }}
                    >
                      {statusMap[caseItem.status] || caseItem.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getPriorityColor(caseItem.priority)}20`, color: getPriorityColor(caseItem.priority) }}
                    >
                      {caseItem.priority === 'urgent' && <AlertTriangle size={10} />}
                      {priorityMap[caseItem.priority] || caseItem.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {caseItem.nextHearing ? (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <span className="text-text-secondary text-sm">{caseItem.nextHearing}</span>
                      </div>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">{caseItem.assignedLawyer}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {caseItem.estimatedValue > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={14} className="text-text-muted" />
                        <span className="font-medium text-text-primary">
                          {(caseItem.estimatedValue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('cases.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('cases.edit'), onClick: () => {} },
                        { id: 'documents', label: t('cases.documents'), onClick: () => {} },
                        { id: 'billing', label: t('cases.billing'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('cases.noCasesFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cases;
