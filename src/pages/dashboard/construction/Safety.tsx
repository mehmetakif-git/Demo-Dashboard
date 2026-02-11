import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  MoreVertical,
  TrendingDown,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { safetyIncidents, projects, sites, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Safety = () => {
  const { t } = useTranslation('construction');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('safety.all'),
    'open': t('status.open'),
    'under-investigation': t('status.underInvestigation'),
    'closed': t('status.closed'),
  };

  const stats = useMemo(() => {
    const total = safetyIncidents.length;
    const thisMonth = safetyIncidents.filter(i => {
      const date = new Date(i.incidentDate);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
    const lostTimeInjuries = safetyIncidents.filter(i => i.type === 'Major Injury').length;

    // Calculate days since last incident
    const sortedIncidents = [...safetyIncidents].sort(
      (a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime()
    );
    const lastIncident = sortedIncidents[0];
    const daysSinceLast = lastIncident
      ? Math.floor((new Date().getTime() - new Date(lastIncident.incidentDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return { total, thisMonth, lostTimeInjuries, daysSinceLast };
  }, []);

  const filteredIncidents = useMemo(() => {
    return safetyIncidents.filter(incident => {
      const matchesSearch = incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || incident.type === typeFilter;
      const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;

      return matchesSearch && matchesType && matchesSeverity && matchesStatus;
    });
  }, [searchQuery, typeFilter, severityFilter, statusFilter]);

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Low': '#10b981',
      'Medium': '#f59e0b',
      'High': '#f97316',
      'Critical': '#ef4444',
    };
    return colors[severity] || CONSTRUCTION_COLOR;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'open': '#ef4444',
      'under-investigation': '#f59e0b',
      'closed': '#10b981',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  const getSiteName = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    return site ? site.siteNo : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('safety.title')}
        subtitle={t('safety.subtitle')}
        icon={Shield}
        actions={
          <Button>
            <Plus size={18} />
            {t('safety.reportIncident')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('safety.totalIncidents'), value: stats.total, icon: AlertTriangle, color: CONSTRUCTION_COLOR },
          { label: t('safety.thisMonth'), value: stats.thisMonth, icon: Calendar, color: '#3b82f6' },
          { label: t('safety.lostTimeInjuries'), value: stats.lostTimeInjuries, icon: TrendingDown, color: stats.lostTimeInjuries > 0 ? '#ef4444' : '#10b981' },
          { label: t('safety.daysSinceLast'), value: stats.daysSinceLast, icon: CheckCircle, color: stats.daysSinceLast > 30 ? '#10b981' : '#f59e0b' },
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
              placeholder={t('safety.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t('safety.allTypes')}</option>
            <option value="Minor Injury">{t('safety.minorInjury')}</option>
            <option value="Major Injury">{t('safety.majorInjury')}</option>
            <option value="Near Miss">{t('safety.nearMiss')}</option>
            <option value="Property Damage">{t('safety.propertyDamage')}</option>
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">{t('safety.allSeverity')}</option>
            <option value="Low">{t('safety.low')}</option>
            <option value="Medium">{t('safety.medium')}</option>
            <option value="High">{t('safety.high')}</option>
            <option value="Critical">{t('safety.critical')}</option>
          </select>
          <div className="flex gap-2">
            {['all', 'open', 'under-investigation', 'closed'].map((status) => (
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

      {/* Incidents Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('safety.id')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('safety.dateTime')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('safety.projectSite')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('safety.type')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('safety.severity')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('safety.description')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('safety.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('safety.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident, index) => (
                <motion.tr
                  key={incident.id}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-text-primary">{incident.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Calendar size={12} />
                      <span>{new Date(incident.incidentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                      <Clock size={10} />
                      <span>{incident.incidentTime}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-text-primary text-sm truncate max-w-[150px]">{getProjectName(incident.projectId)}</p>
                    <p className="text-xs text-text-muted">{getSiteName(incident.siteId)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-primary">{incident.type}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getSeverityColor(incident.severity)}20`, color: getSeverityColor(incident.severity) }}
                    >
                      <AlertTriangle size={12} />
                      {incident.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-text-primary truncate max-w-[200px]">{incident.description}</p>
                    <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                      <MapPin size={10} />
                      <span>{incident.location}</span>
                    </div>
                    {incident.injuredPerson && (
                      <div className="flex items-center gap-1 text-xs text-error mt-0.5">
                        <User size={10} />
                        <span>{incident.injuredPerson}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(incident.status)}20`, color: getStatusColor(incident.status) }}
                    >
                      {statusMap[incident.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('safety.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('safety.editIncident'), onClick: () => {} },
                        { id: 'close', label: t('safety.closeIncident'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredIncidents.length === 0 && (
        <Card className="p-12 text-center">
          <Shield size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('safety.noIncidentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Safety;
