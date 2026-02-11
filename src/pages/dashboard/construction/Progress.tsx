import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Plus,
  Calendar,
  User,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Download,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, Button, Dropdown } from '@/components/common';
import { progressReports, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Progress = () => {
  const { t } = useTranslation('construction');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  const scheduleMap: Record<string, string> = {
    'On Track': t('progress.onTrack'),
    'Behind': t('progress.behind'),
    'Ahead': t('progress.ahead'),
  };

  const budgetMap: Record<string, string> = {
    'Within Budget': t('progress.withinBudget'),
    'Over Budget': t('progress.overBudget'),
    'Under Budget': t('progress.underBudget'),
  };

  const filteredReports = useMemo(() => {
    if (projectFilter === 'all') return progressReports;
    return progressReports.filter(r => r.projectId === projectFilter);
  }, [projectFilter]);

  const getScheduleColor = (schedule: string) => {
    const colors: Record<string, string> = {
      'On Track': '#10b981',
      'Behind': '#ef4444',
      'Ahead': '#3b82f6',
    };
    return colors[schedule] || CONSTRUCTION_COLOR;
  };

  const getBudgetColor = (budget: string) => {
    const colors: Record<string, string> = {
      'Within Budget': '#10b981',
      'Over Budget': '#ef4444',
      'Under Budget': '#3b82f6',
    };
    return colors[budget] || CONSTRUCTION_COLOR;
  };

  const getScheduleIcon = (schedule: string) => {
    switch (schedule) {
      case 'On Track': return CheckCircle;
      case 'Behind': return TrendingDown;
      case 'Ahead': return TrendingUp;
      default: return Clock;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('progress.title')}
        subtitle={t('progress.subtitle')}
        icon={BarChart3}
        actions={
          <Button>
            <Plus size={18} />
            {t('progress.createReport')}
          </Button>
        }
      />

      {/* Project Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-text-muted">{t('progress.filterByProject')}</span>
          <select
            className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary flex-1 max-w-md"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">{t('progress.allProjects')}</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.projectNo} - {p.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report, index) => {
          const ScheduleIcon = getScheduleIcon(report.schedule);

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-text-muted">{report.reportPeriod}</p>
                    <h3 className="font-semibold text-text-primary">{getProjectName(report.projectId)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={12} className="text-text-muted" />
                      <span className="text-xs text-text-muted">
                        {new Date(report.reportDate).toLocaleDateString()}
                      </span>
                      <User size={12} className="text-text-muted ml-2" />
                      <span className="text-xs text-text-muted">{report.reportedBy}</span>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('progress.viewFullReport'), onClick: () => {} },
                      { id: 'edit', label: t('progress.editReport'), onClick: () => {} },
                      { id: 'print', label: t('progress.printReport'), onClick: () => {} },
                      { id: 'pdf', label: t('progress.downloadPdf'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Progress & Status */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-background-tertiary rounded-lg">
                    <p className="text-2xl font-bold" style={{ color: CONSTRUCTION_COLOR }}>
                      {report.overallCompletion}%
                    </p>
                    <p className="text-xs text-text-muted">{t('progress.completion')}</p>
                  </div>
                  <div className="text-center p-3 bg-background-tertiary rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <ScheduleIcon size={18} style={{ color: getScheduleColor(report.schedule) }} />
                      <p className="text-sm font-medium" style={{ color: getScheduleColor(report.schedule) }}>
                        {scheduleMap[report.schedule]}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted">{t('progress.schedule')}</p>
                  </div>
                  <div className="text-center p-3 bg-background-tertiary rounded-lg">
                    <p className="text-sm font-medium" style={{ color: getBudgetColor(report.budget) }}>
                      {budgetMap[report.budget]}
                    </p>
                    <p className="text-xs text-text-muted">{t('progress.budget')}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted mb-1">{t('progress.summary')}</p>
                  <p className="text-sm text-text-primary">{report.summary}</p>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-2">{t('progress.achievements')}</p>
                  <ul className="space-y-1">
                    {report.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-primary">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                {report.challenges.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-2">{t('progress.challenges')}</p>
                    <ul className="space-y-1">
                      {report.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle size={14} className="text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-text-primary">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Upcoming */}
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-2">{t('progress.upcomingActivities')}</p>
                  <ul className="space-y-1">
                    {report.upcomingActivities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Clock size={14} className="text-text-muted mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border-default">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <AlertTriangle size={14} className={report.safetyIncidents > 0 ? 'text-error' : 'text-success'} />
                      <span className={`text-sm ${report.safetyIncidents > 0 ? 'text-error' : 'text-text-muted'}`}>
                        {report.safetyIncidents} {t('progress.safety')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle size={14} className={report.qualityIssues > 0 ? 'text-warning' : 'text-success'} />
                      <span className={`text-sm ${report.qualityIssues > 0 ? 'text-warning' : 'text-text-muted'}`}>
                        {report.qualityIssues} {t('progress.quality')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card className="p-12 text-center">
          <BarChart3 size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('progress.noReportsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Progress;
