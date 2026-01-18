import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  List,
  BarChart3,
  Users,
  Plus,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { timelinePhases, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Timeline = () => {
  const [selectedProject, setSelectedProject] = useState<string>('PRJ001');
  const [viewMode, setViewMode] = useState<'gantt' | 'list'>('gantt');

  const projectPhases = useMemo(() => {
    return timelinePhases.filter(p => p.projectId === selectedProject);
  }, [selectedProject]);

  const stats = useMemo(() => {
    const total = projectPhases.length;
    const inProgress = projectPhases.filter(p => p.status === 'in-progress').length;
    const completed = projectPhases.filter(p => p.status === 'completed').length;
    const behind = projectPhases.filter(p => p.status === 'behind').length;

    return { total, inProgress, completed, behind };
  }, [projectPhases]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': '#10b981',
      'in-progress': '#3b82f6',
      'scheduled': '#64748b',
      'behind': '#ef4444',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'behind': return AlertCircle;
      default: return Calendar;
    }
  };

  // Calculate timeline bounds
  const timelineBounds = useMemo(() => {
    if (projectPhases.length === 0) return { start: new Date(), end: new Date(), months: [] };

    const startDates = projectPhases.map(p => new Date(p.startDate));
    const endDates = projectPhases.map(p => new Date(p.endDate));

    const minDate = new Date(Math.min(...startDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...endDates.map(d => d.getTime())));

    const months: { date: Date; label: string }[] = [];
    const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

    while (current <= maxDate) {
      months.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return { start: minDate, end: maxDate, months };
  }, [projectPhases]);

  const calculateBarPosition = (phase: typeof timelinePhases[0]) => {
    const startDate = new Date(phase.startDate);
    const endDate = new Date(phase.endDate);
    const totalDays = (timelineBounds.end.getTime() - timelineBounds.start.getTime()) / (1000 * 60 * 60 * 24);
    const startDays = (startDate.getTime() - timelineBounds.start.getTime()) / (1000 * 60 * 60 * 24);
    const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    return {
      left: `${(startDays / totalDays) * 100}%`,
      width: `${(durationDays / totalDays) * 100}%`,
    };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Timeline"
        subtitle="Visualize project phases and milestones"
        icon={Calendar}
        actions={
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'gantt' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('gantt')}
            >
              <BarChart3 size={18} />
              Gantt
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
              List
            </Button>
            <Button>
              <Plus size={18} />
              Add Phase
            </Button>
          </div>
        }
      />

      {/* Project Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-text-muted">Select Project:</span>
          <select
            className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary flex-1 max-w-md"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.projectNo} - {p.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Phases', value: stats.total, icon: Calendar, color: CONSTRUCTION_COLOR },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: '#3b82f6' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Behind Schedule', value: stats.behind, icon: AlertCircle, color: stats.behind > 0 ? '#ef4444' : '#10b981' },
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

      {/* Gantt Chart View */}
      {viewMode === 'gantt' && (
        <Card className="p-4 overflow-hidden">
          <h3 className="font-semibold text-text-primary mb-4">Gantt Chart</h3>

          {/* Timeline Header */}
          <div className="flex border-b border-border-default mb-4">
            <div className="w-64 flex-shrink-0 py-2 px-4 font-medium text-text-muted text-sm">
              Phase
            </div>
            <div className="flex-1 flex">
              {timelineBounds.months.map((month, i) => (
                <div
                  key={i}
                  className="flex-1 py-2 px-2 text-center text-xs text-text-muted border-l border-border-default"
                >
                  {month.label}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-2">
            {projectPhases.map((phase, index) => {
              const StatusIcon = getStatusIcon(phase.status);
              const barPosition = calculateBarPosition(phase);

              return (
                <motion.div
                  key={phase.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-64 flex-shrink-0 py-2 px-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon size={16} style={{ color: getStatusColor(phase.status) }} />
                      <span className="text-sm text-text-primary truncate">{phase.phaseName}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-8 relative bg-background-tertiary rounded">
                    <motion.div
                      className="absolute h-6 top-1 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: getStatusColor(phase.status),
                        left: barPosition.left,
                        width: barPosition.width,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                    >
                      {phase.completion > 0 && (
                        <span className="text-xs text-white font-medium">{phase.completion}%</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-border-default">
            {['completed', 'in-progress', 'scheduled', 'behind'].map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: getStatusColor(status) }}
                />
                <span className="text-xs text-text-muted capitalize">{status.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-tertiary">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Phase</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Start Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">End Date</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Duration</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Completion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Team</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Milestones</th>
                </tr>
              </thead>
              <tbody>
                {projectPhases.map((phase, index) => {
                  const StatusIcon = getStatusIcon(phase.status);

                  return (
                    <motion.tr
                      key={phase.id}
                      className="border-b border-border-default last:border-b-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} style={{ color: getStatusColor(phase.status) }} />
                          <span className="font-medium text-text-primary">{phase.phaseName}</span>
                        </div>
                        {phase.dependencies.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-text-muted">
                            <ChevronRight size={12} />
                            <span>Depends on: {phase.dependencies.join(', ')}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(phase.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(phase.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-center text-text-primary">
                        {phase.duration} days
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                          style={{ backgroundColor: `${getStatusColor(phase.status)}20`, color: getStatusColor(phase.status) }}
                        >
                          {phase.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-background-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${phase.completion}%`,
                                backgroundColor: getStatusColor(phase.status),
                              }}
                            />
                          </div>
                          <span className="text-sm text-text-primary">{phase.completion}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-text-secondary">
                          <Users size={14} />
                          <span>{phase.assignedTeam}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {phase.milestones.slice(0, 2).map((milestone, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-background-tertiary rounded text-xs text-text-muted"
                            >
                              {milestone}
                            </span>
                          ))}
                          {phase.milestones.length > 2 && (
                            <span className="text-xs text-text-muted">+{phase.milestones.length - 2}</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {projectPhases.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No phases defined for this project</p>
        </Card>
      )}
    </div>
  );
};

export default Timeline;
