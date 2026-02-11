import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  Paperclip,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Check,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { tasks, projects, taskPriorities, getPriorityColor } from '@/data/taskData';
import { useTranslation } from 'react-i18next';

const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };

export const MyTasks = () => {
  const { t } = useTranslation('tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [dueDateFilter, setDueDateFilter] = useState<string>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');

  // Assume current user is John Anderson (EMP001) for demo
  const currentUserId = 'EMP001';
  const myTasks = tasks.filter(task => task.assigneeId === currentUserId);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: myTasks.length,
      inProgress: myTasks.filter(t => t.status === 'in-progress').length,
      dueToday: myTasks.filter(t => t.dueDate === today && t.status !== 'done').length,
      overdue: myTasks.filter(t => t.dueDate < today && t.status !== 'done').length,
    };
  }, [myTasks]);

  const filteredTasks = useMemo(() => {
    let filtered = [...myTasks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }

    // Priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    // Project filter
    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.projectId === selectedProject);
    }

    // Due date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    if (dueDateFilter === 'today') {
      filtered = filtered.filter(task => task.dueDate === todayStr);
    } else if (dueDateFilter === 'week') {
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= weekEnd;
      });
    } else if (dueDateFilter === 'month') {
      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= monthEnd;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [myTasks, searchQuery, selectedStatus, selectedPriority, selectedProject, dueDateFilter, sortBy]);

  const getDueDateStatus = (dueDate: string, status: string) => {
    if (status === 'done') return 'completed';
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'overdue';
    if (dueDate === today) return 'today';
    return 'upcoming';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) return t('myTasks.today');
    if (dateStr === tomorrow.toISOString().split('T')[0]) return t('myTasks.tomorrow');

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const statusTabs = [
    { id: 'all', label: t('myTasks.all') },
    { id: 'todo', label: t('myTasks.toDo') },
    { id: 'in-progress', label: t('myTasks.inProgress') },
    { id: 'review', label: t('myTasks.inReview') },
    { id: 'done', label: t('myTasks.completed') },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('myTasks.title')}
        subtitle={t('myTasks.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('myTasks.createTask')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('myTasks.totalTasks')}
          value={stats.total.toString()}
          icon={CheckCircle}
          iconColor="#547792"
        />
        <StatsCard
          title={t('myTasks.inProgress')}
          value={stats.inProgress.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('myTasks.dueToday')}
          value={stats.dueToday.toString()}
          icon={Calendar}
          iconColor={stats.dueToday > 0 ? '#f59e0b' : '#10b981'}
          trend={stats.dueToday > 0 ? { value: t('myTasks.needsAttention'), type: 'neutral' } : undefined}
        />
        <StatsCard
          title={t('myTasks.overdue')}
          value={stats.overdue.toString()}
          icon={AlertTriangle}
          iconColor={stats.overdue > 0 ? '#ef4444' : '#10b981'}
          trend={stats.overdue > 0 ? { value: t('myTasks.actionRequired'), type: 'down' } : undefined}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg w-fit">
        {statusTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedStatus === tab.id
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('myTasks.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('myTasks.allPriorities')}</option>
              {taskPriorities.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('myTasks.allProjects')}</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('myTasks.allDates')}</option>
              <option value="today">{t('myTasks.today')}</option>
              <option value="week">{t('myTasks.thisWeek')}</option>
              <option value="month">{t('myTasks.thisMonth')}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="dueDate">{t('myTasks.sortDueDate')}</option>
              <option value="priority">{t('myTasks.sortPriority')}</option>
              <option value="createdAt">{t('myTasks.sortCreated')}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-text-secondary">{t('myTasks.noTasksFound')}</p>
          </Card>
        ) : (
          filteredTasks.map((task, index) => {
            const dueDateStatus = getDueDateStatus(task.dueDate, task.status);
            const isExpanded = expandedTask === task.id;
            const completedSubtasks = task.subtasks.filter(s => s.completed).length;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`overflow-hidden transition-all ${
                    task.status === 'done' ? 'opacity-60' : ''
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle complete logic would go here
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
                          task.status === 'done'
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/[0.08] hover:border-accent-primary'
                        }`}
                      >
                        {task.status === 'done' && <Check size={12} className="text-white" />}
                      </button>

                      {/* Priority Indicator */}
                      <div
                        className="w-1 h-12 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium text-text-primary ${
                                task.status === 'done' ? 'line-through text-text-secondary' : ''
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                              {/* Project Badge */}
                              <span className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary">
                                {task.project}
                              </span>

                              {/* Due Date */}
                              <span
                                className={`flex items-center gap-1 text-xs ${
                                  dueDateStatus === 'overdue'
                                    ? 'text-red-400'
                                    : dueDateStatus === 'today'
                                    ? 'text-orange-400'
                                    : 'text-text-secondary'
                                }`}
                              >
                                <Calendar size={12} />
                                {formatDate(task.dueDate)}
                              </span>

                              {/* Tags */}
                              {task.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-accent-primary/10 rounded text-xs text-accent-primary"
                                >
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length > 2 && (
                                <span className="text-xs text-text-muted">
                                  +{task.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right Side Info */}
                          <div className="flex items-center gap-4 flex-shrink-0">
                            {/* Subtask Progress */}
                            {task.subtasks.length > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-accent-primary rounded-full transition-all"
                                    style={{
                                      width: `${(completedSubtasks / task.subtasks.length) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-text-secondary">
                                  {completedSubtasks}/{task.subtasks.length}
                                </span>
                              </div>
                            )}

                            {/* Comments */}
                            {task.comments > 0 && (
                              <span className="flex items-center gap-1 text-xs text-text-secondary">
                                <MessageSquare size={12} />
                                {task.comments}
                              </span>
                            )}

                            {/* Attachments */}
                            {task.attachments > 0 && (
                              <span className="flex items-center gap-1 text-xs text-text-secondary">
                                <Paperclip size={12} />
                                {task.attachments}
                              </span>
                            )}

                            {/* Expand Icon */}
                            {isExpanded ? (
                              <ChevronDown size={16} className="text-text-secondary" />
                            ) : (
                              <ChevronRight size={16} className="text-text-secondary" />
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-text-primary">
                                <Edit2 size={14} />
                              </button>
                              <button className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/[0.08]"
                    >
                      <div className="p-4 pl-14 space-y-4">
                        <p className="text-sm text-text-secondary">{task.description}</p>

                        {/* Subtasks */}
                        {task.subtasks.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-text-primary">{t('myTasks.subtasks')}</h4>
                            {task.subtasks.map(subtask => (
                              <div key={subtask.id} className="flex items-center gap-3">
                                <button
                                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                                    subtask.completed
                                      ? 'bg-green-500 border-green-500'
                                      : 'border-white/[0.08]'
                                  }`}
                                >
                                  {subtask.completed && <Check size={10} className="text-white" />}
                                </button>
                                <span
                                  className={`text-sm ${
                                    subtask.completed ? 'text-text-secondary line-through' : 'text-text-primary'
                                  }`}
                                >
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center gap-6 text-xs text-text-secondary pt-2 border-t border-white/[0.08]">
                          <span>{t('myTasks.reporter')}: {task.reporter}</span>
                          <span>{t('myTasks.created')}: {new Date(task.createdAt).toLocaleDateString()}</span>
                          <span>{t('myTasks.updated')}: {new Date(task.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
