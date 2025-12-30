import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit2,
  Archive,
  Plus,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Upload,
  FileText,
  Image,
  File,
  Trash2,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import { Card, Button, DataTable } from '@/components/common';
import {
  taskStatuses,
  getPriorityColor,
  getStatusColor,
  getStatusName,
  getProjectById,
  getTasksByProject,
  type Task,
} from '@/data/taskData';

type TabType = 'tasks' | 'timeline' | 'team' | 'files';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [taskStatusFilter, setTaskStatusFilter] = useState<string>('all');

  const project = useMemo(() => getProjectById(id || ''), [id]);
  const projectTasks = useMemo(() => getTasksByProject(id || ''), [id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Project not found</p>
          <Button onClick={() => navigate('/dashboard/tasks/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const filteredTasks = taskStatusFilter === 'all'
    ? projectTasks
    : projectTasks.filter(t => t.status === taskStatusFilter);

  const tabs = [
    { id: 'tasks' as TabType, label: 'Tasks', count: projectTasks.length },
    { id: 'timeline' as TabType, label: 'Timeline' },
    { id: 'team' as TabType, label: 'Team', count: project.team.length },
    { id: 'files' as TabType, label: 'Files', count: 5 },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDueDateClass = (dueDate: string, status: string) => {
    if (status === 'done') return 'text-text-secondary';
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'text-red-400';
    if (dueDate === today) return 'text-orange-400';
    return 'text-text-secondary';
  };

  // Mock files for demo
  const mockFiles = [
    { id: 1, name: 'Project Brief.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: project.owner, date: '2024-12-15' },
    { id: 2, name: 'Design Mockups.fig', type: 'figma', size: '15.8 MB', uploadedBy: 'Emily Chen', date: '2024-12-18' },
    { id: 3, name: 'Meeting Notes.docx', type: 'doc', size: '156 KB', uploadedBy: project.owner, date: '2024-12-19' },
    { id: 4, name: 'Screenshot 2024-12-20.png', type: 'image', size: '892 KB', uploadedBy: 'Robert Taylor', date: '2024-12-20' },
    { id: 5, name: 'Requirements.xlsx', type: 'excel', size: '340 KB', uploadedBy: project.owner, date: '2024-12-10' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return <FileText size={16} className="text-red-400" />;
      case 'image':
        return <Image size={16} className="text-green-400" />;
      default:
        return <File size={16} className="text-blue-400" />;
    }
  };

  // Mock milestones for timeline
  const milestones = [
    { id: 1, title: 'Project Kickoff', date: project.startDate, completed: true },
    { id: 2, title: 'Requirements Finalized', date: '2024-12-15', completed: true },
    { id: 3, title: 'Design Phase Complete', date: '2024-12-31', completed: false },
    { id: 4, title: 'Development Complete', date: '2025-02-15', completed: false },
    { id: 5, title: 'Testing & QA', date: '2025-02-28', completed: false },
    { id: 6, title: 'Project Launch', date: project.endDate, completed: false },
  ];

  const taskColumns = [
    {
      key: 'title' as keyof Task,
      header: 'Task',
      sortable: true,
      render: (task: Task) => (
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-8 rounded-full flex-shrink-0"
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
      key: 'assignee' as keyof Task,
      header: 'Assignee',
      render: (task: Task) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-medium text-accent-primary">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-sm text-text-primary">{task.assignee}</span>
        </div>
      ),
    },
    {
      key: 'status' as keyof Task,
      header: 'Status',
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
      key: 'dueDate' as keyof Task,
      header: 'Due Date',
      render: (task: Task) => (
        <span className={`text-sm ${getDueDateClass(task.dueDate, task.status)}`}>
          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/tasks/projects')}
          className="p-2 hover:bg-background-tertiary rounded-lg text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h1 className="text-2xl font-bold text-text-primary">{project.name}</h1>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                project.status === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : project.status === 'planning'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {project.status}
            </span>
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
          <p className="text-text-secondary mt-1">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<Edit2 size={16} />}>Edit</Button>
          <Button variant="secondary" leftIcon={<Archive size={16} />}>Archive</Button>
          <Button leftIcon={<Plus size={16} />}>Add Task</Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Overall Progress</span>
          <span className="text-lg font-semibold text-text-primary">{project.progress}%</span>
        </div>
        <div className="w-full h-3 bg-background-tertiary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background-tertiary rounded-lg">
              <Calendar size={20} className="text-accent-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Date Range</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-accent-primary">
                {project.owner.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Owner</p>
              <p className="text-sm font-medium text-text-primary">{project.owner}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background-tertiary rounded-lg">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Tasks</p>
              <p className="text-sm font-medium text-text-primary">
                {project.completedTasks}/{project.totalTasks} completed
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background-tertiary rounded-lg">
              <Users size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Team</p>
              <p className="text-sm font-medium text-text-primary">{project.team.length} members</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-background-secondary rounded-lg w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-background-tertiary'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <Card>
          <div className="p-4 border-b border-border-default">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['all', ...taskStatuses.map(s => s.id)].map(status => (
                  <button
                    key={status}
                    onClick={() => setTaskStatusFilter(status)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                      taskStatusFilter === status
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:bg-background-tertiary'
                    }`}
                  >
                    {status === 'all' ? 'All' : getStatusName(status)}
                  </button>
                ))}
              </div>
              <Button size="sm" leftIcon={<Plus size={14} />}>Add Task</Button>
            </div>
          </div>
          <DataTable
            data={filteredTasks}
            columns={taskColumns}
            keyExtractor={(task) => task.id}
            emptyMessage="No tasks in this project"
          />
        </Card>
      )}

      {activeTab === 'timeline' && (
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-6">Project Timeline</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border-default" />

            {/* Milestones */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 relative"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      milestone.completed
                        ? 'bg-green-500'
                        : 'bg-background-tertiary border-2 border-border-default'
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : (
                      <Clock size={14} className="text-text-muted" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-medium ${
                          milestone.completed ? 'text-text-primary' : 'text-text-secondary'
                        }`}
                      >
                        {milestone.title}
                      </h4>
                      <span className="text-sm text-text-muted">
                        {formatDate(milestone.date)}
                      </span>
                    </div>
                    {milestone.completed && (
                      <span className="text-xs text-green-400 mt-1 inline-block">
                        Completed
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'team' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-primary">Team Members</h3>
            <Button size="sm" leftIcon={<UserPlus size={14} />}>Add Member</Button>
          </div>
          <div className="space-y-4">
            {project.team.map((member, index) => {
              const memberTasks = projectTasks.filter(t => t.assignee === member);
              const isOwner = member === project.owner;

              return (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent-primary">
                        {member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-text-primary">{member}</p>
                        {isOwner && (
                          <span className="px-2 py-0.5 bg-accent-primary/20 rounded text-xs text-accent-primary">
                            Owner
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {memberTasks.length} tasks assigned
                      </p>
                    </div>
                  </div>
                  {!isOwner && (
                    <button className="p-2 hover:bg-background-secondary rounded-lg text-text-secondary hover:text-red-400">
                      <UserMinus size={16} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}

      {activeTab === 'files' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-primary">Project Files</h3>
            <Button size="sm" leftIcon={<Upload size={14} />}>Upload File</Button>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-border-default rounded-lg p-8 mb-6 text-center hover:border-accent-primary transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-text-muted mb-2" />
            <p className="text-sm text-text-secondary">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-text-muted mt-1">
              Max file size: 50MB
            </p>
          </div>

          {/* File List */}
          <div className="space-y-2">
            {mockFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg hover:bg-background-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-muted">
                      {file.size} • Uploaded by {file.uploadedBy} • {formatDate(file.date)}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-background-tertiary rounded text-text-secondary hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
