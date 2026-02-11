import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Clock,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  DollarSign,
  Briefcase,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { timeEntries, LAW_COLOR } from '@/data/law/lawData';

export const TimeTracking = () => {
  const { t } = useTranslation('law');
  const [searchQuery, setSearchQuery] = useState('');
  const [billableFilter, setBillableFilter] = useState<string>('all');
  const [billedFilter, setBilledFilter] = useState<string>('all');

  const billableMap: Record<string, string> = {
    'all': t('timeTracking.all'),
    'billable': t('timeTracking.billable'),
    'non-billable': t('timeTracking.nonBillable'),
  };

  const billedMap: Record<string, string> = {
    'all': t('timeTracking.all'),
    'billed': t('timeTracking.billed'),
    'unbilled': t('timeTracking.unbilled'),
  };

  const stats = useMemo(() => {
    const totalHours = timeEntries.reduce((acc, te) => acc + te.duration, 0);
    const billableHours = timeEntries.filter(te => te.billable).reduce((acc, te) => acc + te.billableHours, 0);
    const billedHours = timeEntries.filter(te => te.billed).reduce((acc, te) => acc + te.billableHours, 0);
    const unbilledHours = billableHours - billedHours;
    const unbilledAmount = timeEntries.filter(te => te.billable && !te.billed).reduce((acc, te) => acc + te.amount, 0);

    return { totalHours, billableHours, billedHours, unbilledHours, unbilledAmount };
  }, []);

  const filteredEntries = useMemo(() => {
    return timeEntries.filter(entry => {
      const matchesSearch = entry.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.activity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBillable = billableFilter === 'all' ||
        (billableFilter === 'billable' && entry.billable) ||
        (billableFilter === 'non-billable' && !entry.billable);

      const matchesBilled = billedFilter === 'all' ||
        (billedFilter === 'billed' && entry.billed) ||
        (billedFilter === 'unbilled' && !entry.billed);

      return matchesSearch && matchesBillable && matchesBilled;
    });
  }, [searchQuery, billableFilter, billedFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('timeTracking.title')}
        subtitle={t('timeTracking.subtitle')}
        icon={Clock}
        actions={
          <Button>
            <Plus size={18} />
            {t('timeTracking.newTimeEntry')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('timeTracking.totalHours'), value: `${stats.totalHours.toFixed(1)}h`, icon: Clock, color: LAW_COLOR },
          { label: t('timeTracking.billableHours'), value: `${stats.billableHours.toFixed(1)}h`, icon: DollarSign, color: '#3b82f6' },
          { label: t('timeTracking.billedHours'), value: `${stats.billedHours.toFixed(1)}h`, icon: CheckCircle, color: '#10b981' },
          { label: t('timeTracking.unbilledAmount'), value: `QAR ${stats.unbilledAmount.toLocaleString()}`, icon: FileText, color: '#f59e0b' },
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
              placeholder={t('timeTracking.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'billable', 'non-billable'].map((filter) => (
              <Button
                key={filter}
                variant={billableFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setBillableFilter(filter)}
              >
                {billableMap[filter] || filter}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'billed', 'unbilled'].map((filter) => (
              <Button
                key={filter}
                variant={billedFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setBilledFilter(filter)}
              >
                {billedMap[filter] || filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Time Entries Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.dateCol')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.case')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.lawyer')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.time')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.duration')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.activity')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.billableCol')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.rate')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.amount')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.billedCol')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('timeTracking.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{entry.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-text-muted" />
                      <span className="font-mono text-sm text-text-primary">{entry.caseNo}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{entry.lawyerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">
                      {entry.startTime} - {entry.endTime}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-medium text-text-primary">{entry.duration}{t('timeTracking.hourUnit')}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm max-w-[200px] truncate block">
                      {entry.activity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {entry.billable ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        {t('timeTracking.yes')}
                      </span>
                    ) : (
                      <span className="text-text-muted text-sm">{t('timeTracking.no')}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {entry.billable ? (
                      <span className="text-text-secondary">QAR {entry.hourlyRate}</span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {entry.billable ? (
                      <span className="font-medium text-text-primary">
                        QAR {entry.amount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {entry.billed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        <CheckCircle size={10} />
                        {t('timeTracking.billedBadge')}
                      </span>
                    ) : entry.billable ? (
                      <Button variant="ghost" size="sm" className="text-xs">
                        {t('timeTracking.billButton')}
                      </Button>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
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
                        { id: 'view', label: t('timeTracking.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('timeTracking.edit'), onClick: () => {} },
                        { id: 'delete', label: t('timeTracking.delete'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Clock size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('timeTracking.noEntriesFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TimeTracking;
