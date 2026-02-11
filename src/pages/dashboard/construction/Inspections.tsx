import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
  User,
  MoreVertical,
  FileText,
  Upload,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { inspectionApprovals, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Inspections = () => {
  const { t } = useTranslation('construction');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('inspections.all'),
    'pending': t('status.pending'),
    'approved': t('status.approved'),
    'approved-with-conditions': t('inspections.approvedWithConditions'),
    'rejected': t('status.rejected'),
  };

  const stats = useMemo(() => {
    const pending = inspectionApprovals.filter(i => i.status === 'pending').length;
    const approvedThisMonth = inspectionApprovals.filter(i => {
      if (!i.approvalDate) return false;
      const date = new Date(i.approvalDate);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    const upcoming = inspectionApprovals.filter(i => {
      if (!i.nextInspection) return false;
      const nextDate = new Date(i.inspectionDate);
      const twoWeeks = new Date();
      twoWeeks.setDate(twoWeeks.getDate() + 14);
      return nextDate <= twoWeeks;
    }).length;

    return { pending, approvedThisMonth, upcoming };
  }, []);

  const filteredInspections = useMemo(() => {
    return inspectionApprovals.filter(inspection => {
      const matchesSearch = inspection.inspectionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.inspector.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
      const matchesProject = projectFilter === 'all' || inspection.projectId === projectFilter;

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [searchQuery, statusFilter, projectFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#f59e0b',
      'approved': '#10b981',
      'approved-with-conditions': '#3b82f6',
      'rejected': '#ef4444',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'approved-with-conditions': return AlertTriangle;
      case 'rejected': return XCircle;
      default: return ClipboardCheck;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('inspections.title')}
        subtitle={t('inspections.subtitle')}
        icon={ClipboardCheck}
        actions={
          <Button>
            <Plus size={18} />
            {t('inspections.scheduleInspection')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: t('inspections.pendingApprovals'), value: stats.pending, icon: Clock, color: '#f59e0b' },
          { label: t('inspections.approvedThisMonth'), value: stats.approvedThisMonth, icon: CheckCircle, color: '#10b981' },
          { label: t('inspections.upcomingInspections'), value: stats.upcoming, icon: Calendar, color: '#3b82f6' },
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
              placeholder={t('inspections.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">{t('inspections.allProjects')}</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'approved-with-conditions', 'rejected'].map((status) => (
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

      {/* Inspections Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.inspectionType')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.project')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.inspector')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.date')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.findings')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('inspections.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.map((inspection, index) => {
                const StatusIcon = getStatusIcon(inspection.status);

                return (
                  <motion.tr
                    key={inspection.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(inspection.status)}20` }}
                        >
                          <StatusIcon size={20} style={{ color: getStatusColor(inspection.status) }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{inspection.inspectionType}</p>
                          {inspection.nextInspection && (
                            <p className="text-xs text-text-muted">{t('inspections.next')} {inspection.nextInspection}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-primary truncate block max-w-[150px]">
                        {getProjectName(inspection.projectId)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-text-primary">
                        <User size={14} />
                        <span>{inspection.inspector}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-text-primary">
                        <Calendar size={14} />
                        <span>{new Date(inspection.inspectionDate).toLocaleDateString()}</span>
                      </div>
                      {inspection.approvalDate && (
                        <p className="text-xs text-text-muted mt-0.5">
                          {t('inspections.approvedDate')} {new Date(inspection.approvalDate).toLocaleDateString()}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(inspection.status)}20`, color: getStatusColor(inspection.status) }}
                      >
                        {statusMap[inspection.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-text-primary truncate max-w-[200px]">{inspection.findings}</p>
                      {inspection.conditions.length > 0 && (
                        <p className="text-xs text-warning mt-0.5">
                          {inspection.conditions.length} {t('inspections.conditions')}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {inspection.documents.length > 0 && (
                          <Button variant="ghost" size="sm" title="View Documents">
                            <FileText size={16} />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" title="Upload Documents">
                          <Upload size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: t('inspections.viewDetails'), onClick: () => {} },
                            { id: 'edit', label: t('inspections.editInspection'), onClick: () => {} },
                            { id: 'upload', label: t('inspections.uploadDocuments'), onClick: () => {} },
                          ]}
                        />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredInspections.length === 0 && (
        <Card className="p-12 text-center">
          <ClipboardCheck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('inspections.noInspectionsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Inspections;
