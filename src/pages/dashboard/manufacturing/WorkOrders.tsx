import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Search,
  Plus,
  Calendar,
  MoreVertical,
  Clock,
  CheckCircle,
  PlayCircle,
  XCircle,
  Factory,
  CheckSquare,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { workOrders, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const WorkOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = workOrders.length;
    const inProgress = workOrders.filter(w => w.status === 'in-progress').length;
    const completed = workOrders.filter(w => w.status === 'completed').length;
    const scheduled = workOrders.filter(w => w.status === 'scheduled').length;

    return { total, inProgress, completed, scheduled };
  }, []);

  const filteredOrders = useMemo(() => {
    return workOrders.filter(order => {
      const matchesSearch = order.workOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.batchNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': '#3b82f6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
      'cancelled': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'in-progress': return PlayCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return ClipboardList;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': '#ef4444',
      'normal': '#3b82f6',
      'low': '#64748b',
    };
    return colors[priority] || MANUFACTURING_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Work Orders"
        subtitle="Manage production work orders"
        icon={ClipboardList}
        actions={
          <Button>
            <Plus size={18} />
            Create Work Order
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: ClipboardList, color: MANUFACTURING_COLOR },
          { label: 'In Progress', value: stats.inProgress, icon: PlayCircle, color: '#f59e0b' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: '#3b82f6' },
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by order no, product, or batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'scheduled', 'in-progress', 'completed', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Work Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Work Order</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Line</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Priority</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Quality</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                const progressPercent = order.quantity > 0 ? Math.round((order.completedQty / order.quantity) * 100) : 0;

                return (
                  <motion.tr
                    key={order.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(order.status)}20` }}
                        >
                          <StatusIcon size={20} style={{ color: getStatusColor(order.status) }} />
                        </div>
                        <div>
                          <p className="font-mono font-medium text-text-primary">{order.workOrderNo}</p>
                          <p className="text-xs text-text-muted">{order.batchNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text-primary">{order.productName}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-text-primary">{order.completedQty} / {order.quantity}</p>
                        <div className="w-20 bg-background-tertiary rounded-full h-1.5 mt-1">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${progressPercent}%`, backgroundColor: getStatusColor(order.status) }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(order.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Factory size={12} />
                        <span>{order.lineName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${getPriorityColor(order.priority)}20`, color: getPriorityColor(order.priority) }}
                      >
                        {order.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <CheckSquare size={14} className="text-success" />
                        <span className="text-sm text-text-primary">{order.passedChecks}/{order.qualityChecks}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status) }}
                      >
                        {order.status.replace(/-/g, ' ')}
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
                          { id: 'edit', label: 'Edit', onClick: () => {} },
                          { id: 'start', label: order.status === 'scheduled' ? 'Start Production' : 'Complete', onClick: () => {} },
                          { id: 'cancel', label: 'Cancel', onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <ClipboardList size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No work orders found</p>
        </Card>
      )}
    </div>
  );
};

export default WorkOrders;
