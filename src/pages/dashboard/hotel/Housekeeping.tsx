import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { housekeepingTasks, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const Housekeeping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const uniqueTypes = useMemo(() => {
    const types = [...new Set(housekeepingTasks.map(t => t.taskType))];
    return types;
  }, []);

  const stats = useMemo(() => ({
    pending: housekeepingTasks.filter(t => t.status === 'pending').length,
    inProgress: housekeepingTasks.filter(t => t.status === 'in-progress').length,
    completed: housekeepingTasks.filter(t => t.status === 'completed').length,
    scheduled: housekeepingTasks.filter(t => t.status === 'scheduled').length,
  }), []);

  const filteredTasks = useMemo(() => {
    return housekeepingTasks.filter(task => {
      const matchesSearch = task.roomNo.includes(searchQuery) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || task.taskType === typeFilter;
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [searchQuery, typeFilter, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#f59e0b',
      'in-progress': '#3b82f6',
      'completed': '#10b981',
      'scheduled': '#6366f1',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': '#ef4444',
      'normal': '#3b82f6',
      'low': '#64748b',
    };
    return colors[priority] || HOTEL_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Housekeeping Management"
        subtitle="Manage cleaning tasks and schedules"
        icon={Sparkles}
        actions={
          <Button>
            <Plus size={18} />
            Create Task
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Tasks', value: stats.pending, icon: AlertCircle, color: '#f59e0b' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: '#3b82f6' },
          { label: 'Completed Today', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: '#6366f1' },
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
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by room number or staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={typeFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </Button>
            {uniqueTypes.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <div className="flex gap-2">
            {['all', 'pending', 'in-progress', 'completed', 'scheduled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
          <div className="border-l border-border-default pl-4 flex gap-2">
            {['all', 'high', 'normal', 'low'].map((priority) => (
              <Button
                key={priority}
                variant={priorityFilter === priority ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setPriorityFilter(priority)}
              >
                {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => {
          const statusColor = getStatusColor(task.status);
          const priorityColor = getPriorityColor(task.priority);

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Room & Task Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                    >
                      <span className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                        {task.roomNo}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{task.taskType}</p>
                      <p className="text-xs text-text-muted">
                        Est. {task.estimatedDuration} min
                      </p>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: HOTEL_COLOR }}
                    >
                      {task.assignedTo.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-text-primary">{task.assignedTo}</span>
                  </div>

                  {/* Scheduled Time */}
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Clock size={14} />
                    <span>{new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  {/* Priority */}
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                    style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}
                  >
                    {task.priority}
                  </span>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                  >
                    {task.status.replace('-', ' ')}
                  </span>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'assign', label: 'Reassign', onClick: () => {} },
                      { id: 'start', label: 'Start Task', onClick: () => {} },
                      { id: 'complete', label: 'Mark Complete', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Notes */}
                {task.notes && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted">{task.notes}</p>
                  </div>
                )}

                {/* Completed Time */}
                {task.completedTime && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-success">
                    <CheckCircle size={12} />
                    <span>Completed at {new Date(task.completedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-12 text-center">
          <Sparkles size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No housekeeping tasks found</p>
        </Card>
      )}
    </div>
  );
};

export default Housekeeping;
