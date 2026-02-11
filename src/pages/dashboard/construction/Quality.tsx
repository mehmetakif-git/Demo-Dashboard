import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  MoreVertical,
  FileText,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { qualityInspections, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Quality = () => {
  const { t } = useTranslation('construction');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('quality.all'),
    'passed': t('status.passed'),
    'failed': t('status.failed'),
    'passed-with-comments': t('quality.passedWithComments'),
  };

  const inspectionTypes = useMemo(() => {
    return ['all', ...new Set(qualityInspections.map(i => i.inspectionType))];
  }, []);

  const stats = useMemo(() => {
    const total = qualityInspections.length;
    const passed = qualityInspections.filter(i => i.status === 'passed').length;
    const failed = qualityInspections.filter(i => i.status === 'failed').length;
    const withComments = qualityInspections.filter(i => i.status === 'passed-with-comments').length;
    const passRate = total > 0 ? Math.round(((passed + withComments) / total) * 100) : 0;

    return { total, passed, failed, withComments, passRate };
  }, []);

  const filteredInspections = useMemo(() => {
    return qualityInspections.filter(inspection => {
      const matchesSearch = inspection.inspectionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.phase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.inspector.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || inspection.inspectionType === typeFilter;
      const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'passed': '#10b981',
      'failed': '#ef4444',
      'passed-with-comments': '#f59e0b',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return CheckCircle;
      case 'failed': return XCircle;
      case 'passed-with-comments': return AlertCircle;
      default: return CheckSquare;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Low': '#10b981',
      'Medium': '#f59e0b',
      'High': '#ef4444',
    };
    return colors[severity] || CONSTRUCTION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('quality.title')}
        subtitle={t('quality.subtitle')}
        icon={CheckSquare}
        actions={
          <Button>
            <Plus size={18} />
            {t('quality.newInspection')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('quality.totalInspections'), value: stats.total, icon: CheckSquare, color: CONSTRUCTION_COLOR },
          { label: t('quality.passed'), value: stats.passed, icon: CheckCircle, color: '#10b981' },
          { label: t('quality.failed'), value: stats.failed, icon: XCircle, color: '#ef4444' },
          { label: t('quality.withComments'), value: stats.withComments, icon: AlertCircle, color: '#f59e0b' },
          { label: t('quality.passRate'), value: `${stats.passRate}%`, icon: FileText, color: stats.passRate >= 80 ? '#10b981' : '#f59e0b' },
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
              placeholder={t('quality.searchPlaceholder')}
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
            {inspectionTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? t('quality.allTypes') : type}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'passed', 'failed', 'passed-with-comments'].map((status) => (
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

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInspections.map((inspection, index) => {
          const StatusIcon = getStatusIcon(inspection.status);

          return (
            <motion.div
              key={inspection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getStatusColor(inspection.status)}20` }}
                    >
                      <StatusIcon size={24} style={{ color: getStatusColor(inspection.status) }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{inspection.inspectionType}</h3>
                      <p className="text-sm text-text-muted">{inspection.phase}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                        style={{ backgroundColor: `${getStatusColor(inspection.status)}20`, color: getStatusColor(inspection.status) }}
                      >
                        {statusMap[inspection.status]}
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
                      { id: 'view', label: t('quality.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('quality.editInspection'), onClick: () => {} },
                      { id: 'reinspect', label: t('quality.scheduleReinspection'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Project & Inspector Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <FileText size={14} />
                    <span className="truncate">{getProjectName(inspection.projectId)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <User size={14} />
                    <span>{inspection.inspector}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar size={14} />
                    <span>{new Date(inspection.inspectionDate).toLocaleDateString()}</span>
                  </div>
                  {inspection.nextInspection && (
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Calendar size={14} />
                      <span>{t('quality.next')} {new Date(inspection.nextInspection).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Findings */}
                <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted mb-1">{t('quality.findings')}</p>
                  <p className="text-sm text-text-primary">{inspection.findings}</p>
                </div>

                {/* Defects */}
                {inspection.defects.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-2">{t('quality.defects')} ({inspection.defects.length})</p>
                    <div className="space-y-2">
                      {inspection.defects.map((defect, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2 bg-background-tertiary rounded"
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: getSeverityColor(defect.severity) }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary">{defect.description}</p>
                            <p className="text-xs text-text-muted">{defect.location}</p>
                          </div>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${getSeverityColor(defect.severity)}20`, color: getSeverityColor(defect.severity) }}
                          >
                            {defect.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Corrective Actions */}
                {inspection.correctiveActions.length > 0 && (
                  <div className="pt-4 border-t border-border-default">
                    <p className="text-xs text-text-muted mb-2">{t('quality.correctiveActions')}</p>
                    <div className="space-y-2">
                      {inspection.correctiveActions.map((action, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            {action.status === 'completed' ? (
                              <CheckCircle size={14} className="text-success" />
                            ) : (
                              <AlertCircle size={14} className="text-warning" />
                            )}
                            <span className="text-text-primary">{action.action}</span>
                          </div>
                          <span className="text-xs text-text-muted">{action.responsible}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredInspections.length === 0 && (
        <Card className="p-12 text-center">
          <CheckSquare size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('quality.noInspectionsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Quality;
