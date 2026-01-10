import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  CalendarClock,
  ListChecks,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  preventiveSchedules,
  formatDate,
  type PreventiveSchedule,
} from '@/data/maintenanceData';

export const Preventive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => ({
    total: preventiveSchedules.length,
    active: preventiveSchedules.filter(s => s.status === 'active').length,
    dueSoon: preventiveSchedules.filter(s => {
      const dueDate = new Date(s.nextDue);
      const now = new Date();
      const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length,
    overdue: preventiveSchedules.filter(s => new Date(s.nextDue) < new Date()).length,
  }), []);

  const filteredSchedules = useMemo(() => {
    let filtered = [...preventiveSchedules];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.asset.toLowerCase().includes(query) ||
          s.assignedTo.toLowerCase().includes(query)
      );
    }

    if (selectedFrequency !== 'all') {
      filtered = filtered.filter(s => s.frequency === selectedFrequency);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(s => s.status === selectedStatus);
    }

    return filtered.sort((a, b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime());
  }, [searchQuery, selectedFrequency, selectedStatus]);

  const getFrequencyBadge = (frequency: PreventiveSchedule['frequency']) => {
    const config = {
      daily: { bg: 'bg-red-500/20', text: 'text-red-400' },
      weekly: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
      monthly: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      quarterly: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      'semi-annual': { bg: 'bg-[#547792]/20', text: 'text-[#547792]' },
      annual: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]' },
    };
    const c = config[frequency];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {frequency.replace('-', ' ')}
      </span>
    );
  };

  const getStatusBadge = (status: PreventiveSchedule['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active' },
      paused: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Paused' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getDueStatus = (nextDue: string) => {
    const dueDate = new Date(nextDue);
    const now = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-red-400', bg: 'bg-red-500/20' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    } else if (diffDays <= 30) {
      return { text: `Due in ${diffDays} days`, color: 'text-blue-400', bg: 'bg-blue-500/20' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-green-400', bg: 'bg-green-500/20' };
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Preventive Maintenance"
        subtitle="Schedule and manage preventive maintenance tasks"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Create Schedule
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Schedules"
          value={stats.total.toString()}
          icon={CalendarClock}
          iconColor="#547792"
        />
        <StatsCard
          title="Active Schedules"
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Due This Week"
          value={stats.dueSoon.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Overdue"
          value={stats.overdue.toString()}
          icon={AlertCircle}
          iconColor="#ef4444"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder="Search schedules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Frequencies</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="semi-annual">Semi-Annual</option>
            <option value="annual">Annual</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </Card>

      {/* Schedules List */}
      <div className="space-y-4">
        {filteredSchedules.map((schedule, index) => {
          const dueStatus = getDueStatus(schedule.nextDue);
          return (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all">
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1 rounded-l-lg"
                  style={{ backgroundColor: schedule.status === 'active' ? '#10b981' : '#f59e0b' }}
                />

                <div className="pl-2">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-text-primary text-lg">{schedule.name}</h3>
                        {getStatusBadge(schedule.status)}
                        {getFrequencyBadge(schedule.frequency)}
                      </div>
                      <p className="text-sm text-text-secondary">Asset: {schedule.asset}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-accent-primary">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-blue-400">
                        <Edit size={16} />
                      </button>
                      {schedule.status === 'active' ? (
                        <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-yellow-400">
                          <Pause size={16} />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-green-400">
                          <Play size={16} />
                        </button>
                      )}
                      <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-text-muted mb-1">Schedule ID</p>
                      <p className="text-sm font-medium text-text-primary font-mono">{schedule.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Assigned To</p>
                      <p className="text-sm font-medium text-text-primary">{schedule.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Estimated Hours</p>
                      <p className="text-sm font-medium text-text-primary">{schedule.estimatedHours}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Next Due</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${dueStatus.bg} ${dueStatus.color}`}>
                        {dueStatus.text}
                      </span>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">Checklist ({schedule.checklist.length} items)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {schedule.checklist.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/[0.03] backdrop-blur-xl rounded text-xs text-text-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>Last Completed: {formatDate(schedule.lastCompleted)}</span>
                      <span>Next Due: {formatDate(schedule.nextDue)}</span>
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />}>
                      Generate Work Order
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredSchedules.length === 0 && (
        <Card className="p-12 text-center">
          <CalendarClock size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No preventive schedules found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
