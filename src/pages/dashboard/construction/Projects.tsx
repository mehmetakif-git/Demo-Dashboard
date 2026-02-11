import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  MoreVertical,
  Building,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Projects = () => {
  const { t } = useTranslation('construction');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('projects.allStatus'),
    'planning': t('status.planning'),
    'in-progress': t('status.inProgress'),
    'on-hold': t('status.onHold'),
    'completed': t('status.completed'),
  };

  const typeMap: Record<string, string> = {
    'all': t('projects.allTypes'),
    'Residential': t('projects.residential'),
    'Commercial': t('projects.commercial'),
    'Infrastructure': t('projects.infrastructure'),
    'Industrial': t('projects.industrial'),
  };

  const stats = useMemo(() => {
    const total = projects.length;
    const inProgress = projects.filter(p => p.status === 'in-progress').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
    const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);

    return { total, inProgress, completed, totalBudget, totalSpent };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesType = typeFilter === 'all' || project.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'planning': '#f59e0b',
      'in-progress': '#3b82f6',
      'on-hold': '#ef4444',
      'completed': '#10b981',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Residential': '#8b5cf6',
      'Commercial': '#3b82f6',
      'Infrastructure': '#10b981',
      'Industrial': '#f59e0b',
    };
    return colors[type] || CONSTRUCTION_COLOR;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M QAR`;
    }
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        icon={Briefcase}
        actions={
          <Button>
            <Plus size={18} />
            {t('projects.createNew')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('projects.totalProjects'), value: stats.total, icon: Briefcase, color: CONSTRUCTION_COLOR },
          { label: t('projects.inProgress'), value: stats.inProgress, icon: Clock, color: '#3b82f6' },
          { label: t('projects.completed'), value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: t('projects.totalBudget'), value: formatCurrency(stats.totalBudget), icon: DollarSign, color: '#f59e0b' },
          { label: t('projects.totalSpent'), value: formatCurrency(stats.totalSpent), icon: TrendingUp, color: '#8b5cf6' },
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
              placeholder={t('projects.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'planning', 'in-progress', 'on-hold', 'completed'].map((status) => (
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
          <div className="flex gap-2 flex-wrap">
            {['all', 'Residential', 'Commercial', 'Infrastructure', 'Industrial'].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {typeMap[type]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getTypeColor(project.type)}20` }}
                  >
                    <Building size={24} style={{ color: getTypeColor(project.type) }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted">{project.projectNo}</p>
                    <h3 className="font-semibold text-text-primary">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(project.status)}20`, color: getStatusColor(project.status) }}
                      >
                        {statusMap[project.status]}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ backgroundColor: `${getTypeColor(project.type)}20`, color: getTypeColor(project.type) }}
                      >
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'view', label: t('projects.viewDetails'), onClick: () => {} },
                    { id: 'edit', label: t('projects.editProject'), onClick: () => {} },
                    { id: 'timeline', label: t('projects.viewTimeline'), onClick: () => {} },
                    { id: 'reports', label: t('projects.viewReports'), onClick: () => {} },
                  ]}
                />
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Users size={14} />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Calendar size={14} />
                  <span>{new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock size={14} />
                  <span>{new Date(project.plannedEndDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">{t('projects.completion')}</span>
                  <span className="font-medium" style={{ color: CONSTRUCTION_COLOR }}>{project.completion}%</span>
                </div>
                <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: CONSTRUCTION_COLOR }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.completion}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div>
                  <p className="text-xs text-text-muted">{t('projects.budget')}</p>
                  <p className="font-semibold text-text-primary">{formatCurrency(project.budget)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">{t('projects.spent')}</p>
                  <p className="font-semibold" style={{ color: project.spent > project.budget * 0.9 ? '#ef4444' : '#10b981' }}>
                    {formatCurrency(project.spent)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">{t('projects.manager')}</p>
                  <p className="font-medium text-text-primary">{project.projectManager}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <Briefcase size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('projects.noProjectsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Projects;
