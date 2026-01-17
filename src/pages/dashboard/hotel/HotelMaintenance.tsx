import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Calendar,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { maintenanceRequests, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const HotelMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const uniqueIssueTypes = useMemo(() => {
    const types = [...new Set(maintenanceRequests.map(r => r.issueType))];
    return types;
  }, []);

  const stats = useMemo(() => ({
    pending: maintenanceRequests.filter(r => r.status === 'pending').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'in-progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'completed').length,
    urgent: maintenanceRequests.filter(r => r.priority === 'urgent').length,
  }), []);

  const filteredRequests = useMemo(() => {
    return maintenanceRequests.filter(request => {
      const matchesSearch = request.roomNo.includes(searchQuery) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || request.issueType === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#ef4444',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
      'scheduled': '#3b82f6',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'urgent': '#ef4444',
      'high': '#f59e0b',
      'normal': '#3b82f6',
      'low': '#64748b',
    };
    return colors[priority] || HOTEL_COLOR;
  };

  const getIssueTypeColor = (issueType: string) => {
    const colors: Record<string, string> = {
      'Plumbing': '#3b82f6',
      'Electrical': '#f59e0b',
      'AC': '#06b6d4',
      'TV': '#8b5cf6',
      'General': '#64748b',
    };
    return colors[issueType] || HOTEL_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Management"
        subtitle="Track and manage maintenance requests"
        icon={Wrench}
        actions={
          <Button>
            <Plus size={18} />
            New Request
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Requests', value: stats.pending, icon: AlertTriangle, color: '#ef4444' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: '#f59e0b' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Urgent Issues', value: stats.urgent, icon: AlertTriangle, color: '#ef4444' },
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
              placeholder="Search by room, issue, or technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={categoryFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
            >
              All Categories
            </Button>
            {uniqueIssueTypes.map((issueType) => (
              <Button
                key={issueType}
                variant={categoryFilter === issueType ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(issueType)}
              >
                {issueType}
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
            {['all', 'urgent', 'high', 'normal', 'low'].map((priority) => (
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => {
          const statusColor = getStatusColor(request.status);
          const priorityColor = getPriorityColor(request.priority);
          const issueTypeColor = getIssueTypeColor(request.issueType);

          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Room & Issue Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                    >
                      <span className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                        {request.roomNo}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{request.issueType}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: `${issueTypeColor}20`, color: issueTypeColor }}
                        >
                          {request.issueType}
                        </span>
                      </div>
                      {request.description && (
                        <p className="text-xs text-text-muted mt-1">{request.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="flex items-center gap-2">
                    {request.assignedTo ? (
                      <>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: HOTEL_COLOR }}
                        >
                          {request.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-text-primary">{request.assignedTo}</span>
                      </>
                    ) : (
                      <span className="text-sm text-text-muted">Unassigned</span>
                    )}
                  </div>

                  {/* Reported Date */}
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar size={14} />
                    <span>{new Date(request.reportedAt).toLocaleDateString()}</span>
                  </div>

                  {/* Priority */}
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                    style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}
                  >
                    {request.priority}
                  </span>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                  >
                    {request.status.replace('-', ' ')}
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
                      { id: 'assign', label: 'Assign Technician', onClick: () => {} },
                      { id: 'start', label: 'Start Work', onClick: () => {} },
                      { id: 'complete', label: 'Mark Complete', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Cost & Completion */}
                <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                  <span>
                    Cost: {request.cost ? `${request.cost.toLocaleString()} QAR` : 'TBD'}
                  </span>
                  {request.completedAt && (
                    <span className="text-success flex items-center gap-1">
                      <CheckCircle size={12} />
                      Completed {new Date(request.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <Wrench size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No maintenance requests found</p>
        </Card>
      )}
    </div>
  );
};

export default HotelMaintenance;
