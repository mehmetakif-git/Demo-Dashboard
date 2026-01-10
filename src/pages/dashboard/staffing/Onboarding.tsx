import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  UserPlus,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Settings,
  Key,
  GraduationCap,
  Laptop,
  Building2,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  onboardingTasks,
  getOnboardingStatusBgColor,
  getOnboardingPriorityColor,
  type OnboardingTask,
} from '@/data/staffing/staffingData';
import { getProfileImage } from '@/utils/profileImages';

export const Onboarding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return onboardingTasks.filter((task) => {
      const matchesSearch =
        searchQuery === '' ||
        task.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [searchQuery, statusFilter, categoryFilter, priorityFilter]);

  // Group tasks by candidate
  const tasksByCandidate = useMemo(() => {
    const grouped: Record<string, OnboardingTask[]> = {};
    filteredTasks.forEach((task) => {
      if (!grouped[task.candidateId]) {
        grouped[task.candidateId] = [];
      }
      grouped[task.candidateId].push(task);
    });
    return grouped;
  }, [filteredTasks]);

  // Calculate stats
  const pendingTasks = onboardingTasks.filter((t) => t.status === 'pending').length;
  const inProgressTasks = onboardingTasks.filter((t) => t.status === 'in-progress').length;
  const completedTasks = onboardingTasks.filter((t) => t.status === 'completed').length;
  const blockedTasks = onboardingTasks.filter((t) => t.status === 'blocked').length;

  const stats = [
    {
      title: 'Pending',
      value: pendingTasks.toString(),
      icon: Clock,
      iconColor: '#6b7280',
    },
    {
      title: 'In Progress',
      value: inProgressTasks.toString(),
      icon: UserPlus,
      iconColor: '#3b82f6',
    },
    {
      title: 'Completed',
      value: completedTasks.toString(),
      icon: CheckCircle,
      iconColor: '#10b981',
    },
    {
      title: 'Blocked',
      value: blockedTasks.toString(),
      icon: AlertTriangle,
      iconColor: '#ef4444',
    },
  ];

  const getCategoryIcon = (category: OnboardingTask['category']) => {
    switch (category) {
      case 'documentation':
        return <FileText className="h-4 w-4" />;
      case 'training':
        return <GraduationCap className="h-4 w-4" />;
      case 'equipment':
        return <Laptop className="h-4 w-4" />;
      case 'access':
        return <Key className="h-4 w-4" />;
      case 'orientation':
        return <Settings className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: OnboardingTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Complete task', taskId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Onboarding"
        subtitle="Track new hire onboarding progress"
        actions={
          <Button onClick={() => console.log('Add task')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Alerts for blocked tasks */}
      {blockedTasks > 0 && (
        <Card className="p-4 border-red-500/30 bg-red-500/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div>
              <p className="font-medium text-text-primary">Blocked Tasks</p>
              <p className="text-sm text-text-secondary">
                {blockedTasks} task(s) are blocked and require attention.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Categories</option>
            <option value="documentation">Documentation</option>
            <option value="training">Training</option>
            <option value="equipment">Equipment</option>
            <option value="access">Access</option>
            <option value="orientation">Orientation</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </Card>

      {/* Onboarding by Candidate */}
      <div className="space-y-6">
        {Object.entries(tasksByCandidate).map(([candidateId, tasks]) => {
          const firstTask = tasks[0];
          const completedCount = tasks.filter((t) => t.status === 'completed').length;
          const progress = Math.round((completedCount / tasks.length) * 100);

          return (
            <Card key={candidateId} className="p-6">
              {/* Candidate Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {getProfileImage(firstTask.candidateName) ? (
                    <img
                      src={getProfileImage(firstTask.candidateName)}
                      alt={firstTask.candidateName}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                      {firstTask.candidateName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-text-primary text-lg">{firstTask.candidateName}</h3>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Building2 className="h-4 w-4" />
                      <span>{firstTask.clientName}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{progress}%</span>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg bg-white/[0.05] ${
                      task.status === 'blocked' ? 'border border-red-500/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div className="flex items-center gap-2 text-text-muted">
                        {getCategoryIcon(task.category)}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            task.status === 'completed' ? 'text-text-muted line-through' : 'text-text-primary'
                          }`}
                        >
                          {task.taskName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <span className="capitalize">{task.category}</span>
                          <span>•</span>
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Assigned to: {task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getOnboardingPriorityColor(task.priority) }}
                        title={`${task.priority} priority`}
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getOnboardingStatusBgColor(
                          task.status
                        )}`}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                      </span>
                      {task.status !== 'completed' && task.status !== 'blocked' && (
                        <Button variant="ghost" size="sm" onClick={() => handleCompleteTask(task.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {Object.keys(tasksByCandidate).length === 0 && (
        <Card className="p-12 text-center">
          <UserPlus className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No onboarding tasks found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </motion.div>
  );
};
