import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Clock,
  Search,
  Plus,
  Calendar,
  MoreVertical,
  CheckCircle,
  Users,
  Factory,
  User,
  PlayCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { shifts, shiftAssignments, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Shifts = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'active': t('status.active'),
    'inactive': t('status.inactive'),
    'scheduled': t('status.scheduled'),
    'completed': t('status.completed'),
  };

  const stats = useMemo(() => {
    const totalShifts = shifts.length;
    const activeShifts = shifts.filter(s => s.status === 'active').length;
    const todayAssignments = shiftAssignments.filter(a => a.date === selectedDate).length;
    const totalWorkers = shiftAssignments.filter(a => a.date === selectedDate).reduce((acc, a) => acc + a.workers, 0);

    return { totalShifts, activeShifts, todayAssignments, totalWorkers };
  }, [selectedDate]);

  const filteredAssignments = useMemo(() => {
    return shiftAssignments.filter(assignment => {
      const matchesSearch = assignment.lineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.shiftName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = assignment.date === selectedDate;
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [searchQuery, selectedDate, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'scheduled': '#3b82f6',
      'completed': '#64748b',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return PlayCircle;
      case 'scheduled': return Clock;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('shifts.title')}
        subtitle={t('shifts.subtitle')}
        icon={Clock}
        actions={
          <Button>
            <Plus size={18} />
            {t('shifts.createShift')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('shifts.totalShifts'), value: stats.totalShifts, icon: Clock, color: MANUFACTURING_COLOR },
          { label: t('shifts.activeShifts'), value: stats.activeShifts, icon: CheckCircle, color: '#10b981' },
          { label: t('shifts.todaysAssignments'), value: stats.todayAssignments, icon: Calendar, color: '#3b82f6' },
          { label: t('shifts.totalWorkers'), value: stats.totalWorkers, icon: Users, color: '#f59e0b' },
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

      {/* Shifts Overview */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('shifts.shiftSchedule')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shifts.map((shift, index) => (
            <motion.div
              key={shift.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-background-tertiary rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: MANUFACTURING_COLOR }} />
                  <span className="font-medium text-text-primary">{shift.shiftName}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    shift.status === 'active' ? 'bg-success/20 text-success' : 'bg-text-muted/20 text-text-muted'
                  }`}
                >
                  {statusMap[shift.status] || shift.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('shifts.time')}</span>
                  <span className="text-text-primary">{shift.startTime} - {shift.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('shifts.duration')}</span>
                  <span className="text-text-primary">{shift.duration} {t('shifts.hours')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('shifts.days')}</span>
                  <span className="text-text-primary text-right">{shift.days.slice(0, 3).join(', ')}{shift.days.length > 3 ? '...' : ''}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border-default">
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm" className="w-full">
                      <MoreVertical size={16} className="mr-1" />
                      {t('shifts.actions')}
                    </Button>
                  }
                  items={[
                    { id: 'view', label: t('shifts.viewDetails'), onClick: () => {} },
                    { id: 'edit', label: t('shifts.edit'), onClick: () => {} },
                    { id: 'delete', label: t('shifts.delete'), onClick: () => {} },
                  ]}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Shift Assignments */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <h3 className="font-semibold text-text-primary">{t('shifts.shiftAssignments')}</h3>
          <div className="flex-1" />
          <div className="flex gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('shifts.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            />
            <div className="flex gap-2">
              {['all', 'active', 'scheduled', 'completed'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {statusMap[status] || status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button size="sm" className="mb-4">
          <Plus size={16} className="mr-1" />
          {t('shifts.createAssignment')}
        </Button>

        {/* Assignments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.shift')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.productionLine')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.supervisor')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.workers')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('shifts.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment, index) => {
                const StatusIcon = getStatusIcon(assignment.status);

                return (
                  <motion.tr
                    key={assignment.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-text-muted" />
                        <span className="text-text-primary">{assignment.shiftName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Factory size={14} className="text-text-muted" />
                        <span className="text-text-secondary">{assignment.lineName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-text-muted" />
                        <span className="text-text-secondary">{assignment.supervisor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users size={14} className="text-text-muted" />
                        <span className="font-medium text-text-primary">{assignment.workers}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(assignment.status)}20`, color: getStatusColor(assignment.status) }}
                      >
                        <StatusIcon size={10} />
                        {statusMap[assignment.status] || assignment.status}
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
                          { id: 'view', label: t('shifts.viewWorkers'), onClick: () => {} },
                          { id: 'edit', label: t('shifts.edit'), onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAssignments.length === 0 && (
          <div className="py-8 text-center text-text-muted">
            {t('shifts.noAssignmentsFound')}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Shifts;
