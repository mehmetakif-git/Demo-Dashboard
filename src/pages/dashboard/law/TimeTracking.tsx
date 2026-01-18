import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  DollarSign,
  Briefcase,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { timeEntries, LAW_COLOR } from '@/data/law/lawData';

export const TimeTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [billableFilter, setBillableFilter] = useState<string>('all');
  const [billedFilter, setBilledFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalHours = timeEntries.reduce((acc, t) => acc + t.duration, 0);
    const billableHours = timeEntries.filter(t => t.billable).reduce((acc, t) => acc + t.billableHours, 0);
    const billedHours = timeEntries.filter(t => t.billed).reduce((acc, t) => acc + t.billableHours, 0);
    const unbilledHours = billableHours - billedHours;
    const unbilledAmount = timeEntries.filter(t => t.billable && !t.billed).reduce((acc, t) => acc + t.amount, 0);

    return { totalHours, billableHours, billedHours, unbilledHours, unbilledAmount };
  }, []);

  const filteredEntries = useMemo(() => {
    return timeEntries.filter(entry => {
      const matchesSearch = entry.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.activity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBillable = billableFilter === 'all' ||
        (billableFilter === 'billable' && entry.billable) ||
        (billableFilter === 'non-billable' && !entry.billable);

      const matchesBilled = billedFilter === 'all' ||
        (billedFilter === 'billed' && entry.billed) ||
        (billedFilter === 'unbilled' && !entry.billed);

      return matchesSearch && matchesBillable && matchesBilled;
    });
  }, [searchQuery, billableFilter, billedFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Time Tracking"
        subtitle="Track billable hours and activities"
        icon={Clock}
        actions={
          <Button>
            <Plus size={18} />
            New Time Entry
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Hours', value: `${stats.totalHours.toFixed(1)}h`, icon: Clock, color: LAW_COLOR },
          { label: 'Billable Hours', value: `${stats.billableHours.toFixed(1)}h`, icon: DollarSign, color: '#3b82f6' },
          { label: 'Billed Hours', value: `${stats.billedHours.toFixed(1)}h`, icon: CheckCircle, color: '#10b981' },
          { label: 'Unbilled Amount', value: `QAR ${stats.unbilledAmount.toLocaleString()}`, icon: FileText, color: '#f59e0b' },
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
              placeholder="Search time entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'billable', 'non-billable'].map((filter) => (
              <Button
                key={filter}
                variant={billableFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setBillableFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'billed', 'unbilled'].map((filter) => (
              <Button
                key={filter}
                variant={billedFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setBilledFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Time Entries Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Case</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Lawyer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Time</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Activity</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Billable</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Rate</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Billed</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{entry.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-text-muted" />
                      <span className="font-mono text-sm text-text-primary">{entry.caseNo}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{entry.lawyerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">
                      {entry.startTime} - {entry.endTime}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-medium text-text-primary">{entry.duration}h</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm max-w-[200px] truncate block">
                      {entry.activity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {entry.billable ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        Yes
                      </span>
                    ) : (
                      <span className="text-text-muted text-sm">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {entry.billable ? (
                      <span className="text-text-secondary">QAR {entry.hourlyRate}</span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {entry.billable ? (
                      <span className="font-medium text-text-primary">
                        QAR {entry.amount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {entry.billed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        <CheckCircle size={10} />
                        Billed
                      </span>
                    ) : entry.billable ? (
                      <Button variant="ghost" size="sm" className="text-xs">
                        Bill
                      </Button>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
                    )}
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
                        { id: 'delete', label: 'Delete', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Clock size={48} className="mx-auto mb-4 opacity-50" />
            <p>No time entries found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TimeTracking;
