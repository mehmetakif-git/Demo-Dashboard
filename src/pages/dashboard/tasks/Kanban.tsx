import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import { tasks, projects, taskStatuses, taskPriorities, getPriorityColor, type Task } from '@/data/taskData';

interface KanbanColumnProps {
  status: typeof taskStatuses[0];
  tasks: Task[];
  onAddTask?: () => void;
}

const KanbanColumn = ({ status, tasks: columnTasks, onAddTask }: KanbanColumnProps) => {
  return (
    <div className="flex-1 min-w-[300px] max-w-[350px]">
      <div
        className="flex items-center justify-between px-3 py-2 rounded-t-lg"
        style={{ backgroundColor: `${status.color}20` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: status.color }}
          />
          <span className="font-medium text-text-primary">{status.name}</span>
          <span className="px-2 py-0.5 bg-background-primary/50 rounded-full text-xs text-text-secondary">
            {columnTasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-white/[0.05] rounded text-text-secondary hover:text-text-primary">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-xl/50 rounded-b-lg p-2 min-h-[500px] max-h-[calc(100vh-350px)] overflow-y-auto">
        <div className="space-y-2">
          {columnTasks.map((task, index) => (
            <KanbanCard key={task.id} task={task} index={index} />
          ))}
        </div>

        <button
          onClick={onAddTask}
          className="w-full mt-2 p-3 border border-dashed border-white/[0.08] rounded-lg text-text-secondary hover:text-text-primary hover:border-accent-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          <span className="text-sm">Add Task</span>
        </button>
      </div>
    </div>
  );
};

interface KanbanCardProps {
  task: Task;
  index: number;
}

const KanbanCard = ({ task, index }: KanbanCardProps) => {
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate < today && task.status !== 'done';
  const isDueToday = task.dueDate === today;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="p-3 hover:shadow-lg transition-shadow group">
        {/* Priority Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        />

        <div className="pt-1">
          {/* Title */}
          <h4 className="font-medium text-sm text-text-primary mb-2 line-clamp-2">
            {task.title}
          </h4>

          {/* Project Badge */}
          <span className="inline-block px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary mb-2">
            {task.project}
          </span>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-accent-primary/10 rounded text-xs text-accent-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Subtask Progress */}
          {task.subtasks.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                <span>Subtasks</span>
                <span>{completedSubtasks}/{task.subtasks.length}</span>
              </div>
              <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-primary rounded-full transition-all"
                  style={{ width: `${(completedSubtasks / task.subtasks.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
            {/* Due Date */}
            <span
              className={`flex items-center gap-1 text-xs ${
                isOverdue ? 'text-red-400' : isDueToday ? 'text-orange-400' : 'text-text-secondary'
              }`}
            >
              <Calendar size={12} />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>

            <div className="flex items-center gap-3">
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

              {/* Assignee Avatar */}
              <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-medium text-accent-primary">
                  {task.assignee.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const Kanban = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const assignees = useMemo(() => {
    const unique = [...new Set(tasks.map(t => t.assignee))];
    return unique.sort();
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.projectId === selectedProject);
    }

    if (selectedAssignee !== 'all') {
      filtered = filtered.filter(task => task.assignee === selectedAssignee);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    return filtered;
  }, [searchQuery, selectedProject, selectedAssignee, selectedPriority]);

  const tasksByStatus = useMemo(() => {
    return taskStatuses.reduce((acc, status) => {
      acc[status.id] = filteredTasks.filter(task => task.status === status.id);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [filteredTasks]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kanban Board"
        subtitle="Visualize and manage tasks with drag-and-drop"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Create Task
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

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
        </div>
      </Card>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {taskStatuses.map(status => (
          <KanbanColumn
            key={status.id}
            status={status}
            tasks={tasksByStatus[status.id] || []}
          />
        ))}
      </div>

      {/* Info Note */}
      <p className="text-xs text-text-muted text-center">
        Tip: Drag and drop tasks between columns to change their status (visual demo only)
      </p>
    </div>
  );
};
