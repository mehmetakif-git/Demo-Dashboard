import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  MoreVertical,
  Building,
  User,
  Calendar,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { maintenanceRequests, REALESTATE_COLOR, getStatusColor, getPriorityColor } from '@/data/realestate/realestateData';

export const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = maintenanceRequests.length;
    const pending = maintenanceRequests.filter(m => m.status === 'pending').length;
    const inProgress = maintenanceRequests.filter(m => m.status === 'in-progress' || m.status === 'assigned').length;
    const urgent = maintenanceRequests.filter(m => m.priority === 'urgent').length;

    return { total, pending, inProgress, urgent };
  }, []);

  const filteredRequests = useMemo(() => {
    return maintenanceRequests.filter(request => {
      const matchesSearch = request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.tenantName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const statuses = ['all', 'pending', 'assigned', 'in-progress', 'completed', 'cancelled'];
  const priorities = ['all', 'urgent', 'high', 'normal', 'low'];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Plumbing': '#3b82f6',
      'Electrical': '#f59e0b',
      'AC/HVAC': '#0ea5e9',
      'General': '#64748b',
      'Carpentry': '#a16207',
      'Painting': '#8b5cf6',
    };
    return colors[category] || REALESTATE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance"
        subtitle="Manage maintenance requests and repairs"
        icon={Wrench}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Pending', value: stats.pending, color: '#f59e0b' },
          { label: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
          { label: 'Urgent', value: stats.urgent, color: '#ef4444' },
        ].map((stat, index) => (
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
                  <Wrench size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search maintenance requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Maintenance Requests Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Request</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Tenant</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Category</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Priority</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Est. Cost</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getCategoryColor(request.category)}20` }}
                      >
                        <Wrench size={18} style={{ color: getCategoryColor(request.category) }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{request.subject}</p>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Calendar size={10} />
                          <span>{request.reportedDate}</span>
                          <span className="font-mono ml-2">{request.requestNo}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building size={14} className="text-text-muted" />
                      <div>
                        <p className="text-text-secondary text-sm truncate max-w-[150px]">{request.propertyTitle}</p>
                        <p className="text-xs text-text-muted font-mono">{request.propertyCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{request.tenantName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getCategoryColor(request.category)}20`, color: getCategoryColor(request.category) }}
                    >
                      {request.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {request.priority === 'urgent' && <AlertTriangle size={12} className="text-red-500" />}
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getPriorityColor(request.priority)}20`, color: getPriorityColor(request.priority) }}
                      >
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {request.estimatedCost > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={12} className="text-text-muted" />
                        <span className="text-text-secondary">QAR {request.estimatedCost.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(request.status)}20`, color: getStatusColor(request.status) }}
                    >
                      {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'assign', label: 'Assign Technician', onClick: () => {} },
                        { id: 'complete', label: 'Mark Complete', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Wrench size={48} className="mx-auto mb-4 opacity-50" />
            <p>No maintenance requests found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Maintenance;
