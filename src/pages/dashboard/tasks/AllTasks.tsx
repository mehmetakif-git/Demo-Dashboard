import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit2,
  Trash2,
  UserPlus,
  ArrowUpDown,
  MoreHorizontal,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button, DataTable } from '@/components/common';
import { tasks, projects, taskStatuses, taskPriorities, getPriorityColor, getStatusColor, getStatusName, getPriorityName, type Task } from '@/data/taskData';
import { useTranslation } from 'react-i18next';

export const AllTasks = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  // Get unique assignees
  const assignees = useMemo(() => {
    const unique = [...new Set(tasks.map(t => t.assignee))];
    return unique.sort();
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: tasks.length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'done').length,
      overdue: tasks.filter(t => t.dueDate < today && t.status !== 'done').length,
    };
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.assignee.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.projectId === selectedProject);
    }

    if (selectedAssignee !== 'all') {
      filtered = filtered.filter(task => task.assignee === selectedAssignee);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedPriority, selectedProject, selectedAssignee]);

  const getDueDateClass = (dueDate: string, status: string) => {
    if (status === 'done') return 'text-text-secondary';
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'text-red-400';
    if (dueDate === today) return 'text-orange-400';
    return 'text-text-secondary';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns = [
    {
      key: 'title',
      header: 'Task',
      sortable: true,
      render: (task: Task) => (
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-8 rounded-full shrink-0"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          />
          <div>
            <p className={`font-medium ${task.status === 'done' ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {task.title}
            </p>
            <p className="text-xs text-text-muted">{task.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'project',
      header: 'Project',
      sortable: true,
      render: (task: Task) => (
        <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-text-secondary">
          {task.project}
        </span>
      ),
    },
    {
      key: 'assignee',
      header: 'Assignee',
      sortable: true,
      render: (task: Task) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-xs font-medium text-accent-primary">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-sm text-text-primary">{task.assignee}</span>
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (task: Task) => (
        <span
          className="px-2 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: `${getPriorityColor(task.priority)}20`,
            color: getPriorityColor(task.priority),
          }}
        >
          {getPriorityName(task.priority)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (task: Task) => (
        <span
          className="px-2 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: `${getStatusColor(task.status)}20`,
            color: getStatusColor(task.status),
          }}
        >
          {getStatusName(task.status)}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (task: Task) => (
        <span className={`text-sm ${getDueDateClass(task.dueDate, task.status)}`}>
          {formatDate(task.dueDate)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-text-primary">
            <Edit2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400">
            <Trash2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-text-primary">
            <MoreHorizontal size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tasks.allTasks', 'All Tasks')}
        subtitle="View and manage all tasks across the organization"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Create Task
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total.toString()}
          icon={CheckCircle}
          iconColor="#547792"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Completed"
          value={stats.completed.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Overdue"
          value={stats.overdue.toString()}
          icon={AlertTriangle}
          iconColor={stats.overdue > 0 ? '#ef4444' : '#10b981'}
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search tasks, assignees..."
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
              <option value="all">All Status</option>
              {taskStatuses.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Priorities</option>
              {taskPriorities.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Assignees</option>
              {assignees.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {selectedTasks.length} selected
              </span>
              <Button variant="secondary" size="sm" leftIcon={<UserPlus size={14} />}>
                Assign
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<ArrowUpDown size={14} />}>
                Change Status
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<Trash2 size={14} />}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Task Table */}
      <Card>
        <DataTable
          data={filteredTasks}
          columns={columns}
          keyExtractor={(task) => task.id}
          selectable
          selectedItems={selectedTasks}
          onSelectionChange={setSelectedTasks}
          emptyMessage="No tasks found"
        />
      </Card>
    </div>
  );
};
