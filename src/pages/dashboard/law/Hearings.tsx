import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Plus,
  MoreVertical,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { hearings, LAW_COLOR } from '@/data/law/lawData';

export const Hearings = () => {
  const { t } = useTranslation('law');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const hearingTypes = useMemo(() => {
    return ['all', ...new Set(hearings.map(h => h.hearingType))];
  }, []);

  const stats = useMemo(() => {
    const upcoming = hearings.filter(h => h.status === 'scheduled').length;
    const thisWeek = hearings.filter(h => {
      const hearingDate = new Date(h.hearingDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return h.status === 'scheduled' && hearingDate >= today && hearingDate <= weekFromNow;
    }).length;
    const thisMonth = hearings.filter(h => {
      const hearingDate = new Date(h.hearingDate);
      const today = new Date();
      return h.status === 'scheduled' && hearingDate.getMonth() === today.getMonth();
    }).length;
    const completed = hearings.filter(h => h.status === 'completed').length;

    return { upcoming, thisWeek, thisMonth, completed };
  }, []);

  const filteredHearings = useMemo(() => {
    return hearings.filter(hearing => {
      const matchesSearch = hearing.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hearing.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hearing.court.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || hearing.status === statusFilter;
      const matchesType = typeFilter === 'all' || hearing.hearingType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': '#3b82f6',
      'completed': '#10b981',
      'postponed': '#f59e0b',
      'cancelled': '#ef4444',
    };
    return colors[status] || LAW_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'completed': return CheckCircle;
      case 'postponed': return AlertCircle;
      default: return Clock;
    }
  };

  const statusMap: Record<string, string> = {
    'all': t('hearings.allStatus'),
    'scheduled': t('status.scheduled'),
    'completed': t('status.completed'),
    'postponed': t('status.postponed'),
    'cancelled': t('status.cancelled'),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('hearings.title')}
        subtitle={t('hearings.subtitle')}
        icon={Calendar}
        actions={
          <Button>
            <Plus size={18} />
            {t('hearings.scheduleHearing')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('hearings.upcoming'), value: stats.upcoming, icon: Calendar, color: LAW_COLOR },
          { label: t('hearings.thisWeek'), value: stats.thisWeek, icon: Clock, color: '#ef4444' },
          { label: t('hearings.thisMonth'), value: stats.thisMonth, icon: Calendar, color: '#3b82f6' },
          { label: t('hearings.completed'), value: stats.completed, icon: CheckCircle, color: '#10b981' },
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
              placeholder={t('hearings.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'scheduled', 'completed', 'postponed', 'cancelled'].map((status) => (
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
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-sm text-text-muted mr-2">{t('hearings.typeLabel')}</span>
          {hearingTypes.slice(0, 5).map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTypeFilter(type)}
            >
              {type === 'all' ? t('hearings.allTypes') : type}
            </Button>
          ))}
        </div>
      </Card>

      {/* Hearings List */}
      <div className="space-y-4">
        {filteredHearings.map((hearing, index) => {
          const StatusIcon = getStatusIcon(hearing.status);

          return (
            <motion.div
              key={hearing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getStatusColor(hearing.status)}20` }}
                      >
                        <StatusIcon size={20} style={{ color: getStatusColor(hearing.status) }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-text-primary">{hearing.caseNo}</span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: `${getStatusColor(hearing.status)}20`, color: getStatusColor(hearing.status) }}
                          >
                            {statusMap[hearing.status] || hearing.status}
                          </span>
                        </div>
                        <p className="text-text-secondary font-medium">{hearing.caseTitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{hearing.hearingDate}</p>
                          <p className="text-xs text-text-muted">{hearing.hearingTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-text-muted" />
                        <div>
                          <p className="text-sm text-text-primary">{hearing.court}</p>
                          <p className="text-xs text-text-muted">{hearing.judge}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-text-muted" />
                        <p className="text-sm text-text-secondary">{hearing.hearingType}</p>
                      </div>
                    </div>

                    {hearing.attendees.length > 0 && (
                      <div className="flex items-center gap-2 mt-3">
                        <Users size={14} className="text-text-muted" />
                        <div className="flex flex-wrap gap-1">
                          {hearing.attendees.map((attendee, i) => (
                            <span key={i} className="text-xs bg-background-tertiary px-2 py-1 rounded text-text-secondary">
                              {attendee}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {hearing.preparation && (
                      <div className="mt-3 p-3 bg-background-tertiary rounded-lg">
                        <p className="text-xs text-text-muted mb-1">{t('hearings.preparation')}</p>
                        <p className="text-sm text-text-secondary">{hearing.preparation}</p>
                      </div>
                    )}

                    {hearing.outcome && (
                      <div className="mt-3 p-3 bg-success/10 rounded-lg border border-success/20">
                        <p className="text-xs text-success mb-1">{t('hearings.outcome')}</p>
                        <p className="text-sm text-text-primary">{hearing.outcome}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('hearings.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('hearings.edit'), onClick: () => {} },
                        { id: 'complete', label: t('hearings.markCompleted'), onClick: () => {} },
                        { id: 'postpone', label: t('hearings.postpone'), onClick: () => {} },
                      ]}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredHearings.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('hearings.noHearingsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Hearings;
