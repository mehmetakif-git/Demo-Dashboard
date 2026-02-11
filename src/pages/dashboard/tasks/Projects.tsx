import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  LayoutGrid,
  List,
  ArrowRight,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { projects, tasks, getPriorityColor } from '@/data/taskData';
import { useTranslation } from 'react-i18next';

export const Projects = () => {
  const { t } = useTranslation('tasks');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const overdueTasksCount = tasks.filter(t => t.dueDate < today && t.status !== 'done').length;
    const teamMembers = new Set(projects.flatMap(p => p.team)).size;

    return {
      active: projects.filter(p => p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      overdueTasks: overdueTasksCount,
      teamMembers,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.owner.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(p => p.priority === selectedPriority);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedPriority]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('projects.active') },
      planning: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: t('projects.planning') },
      completed: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: t('projects.completed') },
      'on-hold': { bg: 'bg-orange-500/20', text: 'text-orange-400', label: t('projects.onHold') },
    };
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/tasks/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('projects.createProject')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('projects.activeProjects')}
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('projects.completedThisMonth')}
          value={stats.completed.toString()}
          icon={Clock}
          iconColor="#547792"
        />
        <StatsCard
          title={t('projects.overdueTasks')}
          value={stats.overdueTasks.toString()}
          icon={AlertTriangle}
          iconColor={stats.overdueTasks > 0 ? '#ef4444' : '#10b981'}
        />
        <StatsCard
          title={t('projects.teamMembers')}
          value={stats.teamMembers.toString()}
          icon={Users}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('projects.allStatus')}</option>
              <option value="active">{t('projects.active')}</option>
              <option value="planning">{t('projects.planning')}</option>
              <option value="completed">{t('projects.completed')}</option>
              <option value="on-hold">{t('projects.onHold')}</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('projects.allPriorities')}</option>
              <option value="urgent">{t('projects.urgent')}</option>
              <option value="high">{t('projects.high')}</option>
              <option value="medium">{t('projects.medium')}</option>
              <option value="low">{t('projects.low')}</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-5 cursor-pointer hover:shadow-lg transition-all group"
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Color Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: project.color }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                    />
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">{t('projects.progress')}</span>
                      <span className="font-medium text-text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: project.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Task Count */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <CheckCircle size={14} className="text-text-muted" />
                    <span className="text-text-secondary">
                      {t('projects.tasksCompleted', { completed: project.completedTasks, total: project.totalTasks })}
                    </span>
                  </div>

                  {/* Meta Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      {/* Owner Avatar */}
                      <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-accent-primary">
                          {project.owner.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {/* Team Avatars */}
                      <div className="flex -space-x-2">
                        {project.team.slice(1, 4).map((member, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-white/[0.05] border-2 border-white/[0.08] flex items-center justify-center"
                          >
                            <span className="text-[10px] font-medium text-text-secondary">
                              {member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        ))}
                        {project.team.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-white/[0.05] border-2 border-white/[0.08] flex items-center justify-center">
                            <span className="text-[10px] font-medium text-text-secondary">
                              +{project.team.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(project.status)}
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${getPriorityColor(project.priority)}20`,
                          color: getPriorityColor(project.priority),
                        }}
                      >
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-1 mt-3 text-xs text-text-muted">
                    <Calendar size={12} />
                    {formatDateRange(project.startDate, project.endDate)}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="divide-y divide-border-default">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleProjectClick(project.id)}
                className="p-4 hover:bg-white/[0.05] cursor-pointer transition-colors flex items-center gap-6"
              >
                {/* Color Indicator */}
                <div
                  className="w-1 h-12 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-text-primary truncate">
                      {project.name}
                    </h3>
                    {getStatusBadge(project.status)}
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getPriorityColor(project.priority)}20`,
                        color: getPriorityColor(project.priority),
                      }}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary truncate mt-1">
                    {project.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="w-32 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary">{t('projects.progress')}</span>
                    <span className="font-medium text-text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.color,
                      }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="text-sm text-text-secondary flex-shrink-0 w-28">
                  {t('projects.tasks', { completed: project.completedTasks, total: project.totalTasks })}
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 flex-shrink-0 w-36">
                  <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-accent-primary">
                      {project.owner.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-text-primary truncate">{project.owner}</span>
                </div>

                {/* Date */}
                <div className="text-xs text-text-muted flex-shrink-0 w-40">
                  {formatDateRange(project.startDate, project.endDate)}
                </div>

                <ArrowRight size={16} className="text-text-muted flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-text-secondary">{t('projects.noProjectsFound')}</p>
        </Card>
      )}
    </div>
  );
};
