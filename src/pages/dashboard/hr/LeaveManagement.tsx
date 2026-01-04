import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarOff, Clock, CheckCircle, XCircle, Calendar, Check, X } from 'lucide-react';
import { PageHeader, StatsCard, Tabs, StatusBadge, Avatar, DataTable } from '@/components/common';
import { leaveRequests } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';
import type { LeaveRequest } from '@/data/hrData';

const tabs = [
  { id: 'pending', label: 'Pending Requests', count: 0 },
  { id: 'all', label: 'All Requests' },
  { id: 'calendar', label: 'Leave Calendar' },
];

export const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const stats = useMemo(() => ({
    pending: leaveRequests.filter((r) => r.status === 'pending').length,
    approved: leaveRequests.filter((r) => r.status === 'approved').length,
    rejected: leaveRequests.filter((r) => r.status === 'rejected').length,
    totalDays: leaveRequests.reduce((acc, r) => acc + r.days, 0),
  }), []);

  // Update tab counts
  tabs[0].count = stats.pending;

  const filteredRequests = useMemo(() => {
    if (activeTab === 'pending') {
      return leaveRequests.filter((r) => r.status === 'pending');
    }
    return leaveRequests;
  }, [activeTab]);

  const columns = [
    {
      key: 'employee',
      header: 'Employee',
      render: (request: LeaveRequest) => (
        <div className="flex items-center gap-3">
          <Avatar name={request.employee} src={profileImages[request.employee]} size="sm" />
          <span className="text-white">{request.employee}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Leave Type',
      render: (request: LeaveRequest) => (
        <span className="text-white/80">{request.type}</span>
      ),
    },
    {
      key: 'startDate',
      header: 'Start Date',
      render: (request: LeaveRequest) => (
        <span className="text-white/60">{request.startDate}</span>
      ),
    },
    {
      key: 'endDate',
      header: 'End Date',
      render: (request: LeaveRequest) => (
        <span className="text-white/60">{request.endDate}</span>
      ),
    },
    {
      key: 'days',
      header: 'Days',
      render: (request: LeaveRequest) => (
        <span className="text-white font-medium">{request.days}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (request: LeaveRequest) => <StatusBadge status={request.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (request: LeaveRequest) => (
        request.status === 'pending' ? (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
              <Check className="w-3 h-3" />
              Approve
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
              <X className="w-3 h-3" />
              Reject
            </button>
          </div>
        ) : (
          <span className="text-white/40">-</span>
        )
      ),
    },
  ];

  // Simple calendar view
  const renderCalendar = () => {
    const approvedLeaves = leaveRequests.filter((r) => r.status === 'approved' || r.status === 'pending');
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-xs text-white/40 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const leavesOnDay = approvedLeaves.filter(
              (l) => l.startDate <= dateStr && l.endDate >= dateStr
            );

            return (
              <div
                key={day}
                className={`p-2 min-h-[60px] rounded-lg border ${
                  day === today.getDate()
                    ? 'border-[#6366f1] bg-[#6366f1]/10'
                    : 'border-[#1e1e2e] hover:bg-[#1a1a24]'
                } transition-colors`}
              >
                <span className={`text-sm ${day === today.getDate() ? 'text-[#6366f1] font-medium' : 'text-white/60'}`}>
                  {day}
                </span>
                <div className="mt-1 space-y-0.5">
                  {leavesOnDay.slice(0, 2).map((leave) => (
                    <div
                      key={leave.id}
                      className={`text-[10px] px-1 py-0.5 rounded truncate ${
                        leave.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {leave.employee.split(' ')[0]}
                    </div>
                  ))}
                  {leavesOnDay.length > 2 && (
                    <div className="text-[10px] text-white/40">+{leavesOnDay.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#1e1e2e]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
            <span className="text-xs text-white/60">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500/20 border border-orange-500/30" />
            <span className="text-xs text-white/60">Pending</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Leave Management"
        subtitle="Manage employee leave requests"
        icon={CalendarOff}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pending Requests"
          value={stats.pending}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Approved This Month"
          value={stats.approved}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Total Leave Days Used"
          value={stats.totalDays}
          icon={Calendar}
          iconColor="#6366f1"
          iconBg="rgba(99, 102, 241, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content */}
      {activeTab === 'calendar' ? (
        renderCalendar()
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden"
        >
          <DataTable
            columns={columns}
            data={filteredRequests}
            keyExtractor={(r) => String(r.id)}
            emptyMessage="No leave requests found"
          />
        </motion.div>
      )}
    </div>
  );
};
