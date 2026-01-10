import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileText,
  Building2,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  timesheets,
  formatCurrency,
  getTimesheetStatusBgColor,
  type Timesheet,
} from '@/data/staffing/staffingData';
import { getProfileImage } from '@/utils/profileImages';

export const Timesheets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);

  // Filter timesheets
  const filteredTimesheets = useMemo(() => {
    return timesheets.filter((ts) => {
      const matchesSearch =
        searchQuery === '' ||
        ts.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ts.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || ts.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Calculate stats
  const pendingApproval = timesheets.filter((ts) => ts.status === 'submitted').length;
  const totalBillable = timesheets
    .filter((ts) => ts.status === 'approved' || ts.status === 'processed')
    .reduce((sum, ts) => sum + ts.totalBillable, 0);
  const totalHours = timesheets.reduce((sum, ts) => sum + ts.totalHours, 0);

  const stats = [
    {
      title: 'Pending Approval',
      value: pendingApproval.toString(),
      icon: AlertCircle,
      iconColor: '#f59e0b',
    },
    {
      title: 'Total Hours',
      value: totalHours.toString(),
      icon: Clock,
      iconColor: '#547792',
    },
    {
      title: 'Total Billable',
      value: formatCurrency(totalBillable),
      icon: DollarSign,
      iconColor: '#10b981',
    },
    {
      title: 'Timesheets',
      value: timesheets.length.toString(),
      icon: FileText,
      iconColor: '#94B4C1',
    },
  ];

  const handleApprove = (ts: Timesheet) => {
    console.log('Approve timesheet', ts.id);
  };

  const handleReject = (ts: Timesheet) => {
    console.log('Reject timesheet', ts.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Timesheets"
        subtitle="Review and approve contractor timesheets"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search timesheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="processed">Processed</option>
          </select>
        </div>
      </Card>

      {/* Timesheets Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Contractor
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Client
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Week Ending
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Hours
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Billable
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTimesheets.map((ts) => (
                <tr
                  key={ts.id}
                  className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {getProfileImage(ts.candidateName) ? (
                        <img
                          src={getProfileImage(ts.candidateName)}
                          alt={ts.candidateName}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                          {ts.candidateName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                      <p className="font-medium text-text-primary">{ts.candidateName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-text-muted" />
                      <span className="text-text-secondary">{ts.clientName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {new Date(ts.weekEnding).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p className="text-text-primary font-medium">{ts.totalHours}h</p>
                      {ts.overtimeHours > 0 && (
                        <p className="text-text-muted text-xs">+{ts.overtimeHours}h OT</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p className="text-text-primary font-medium">{formatCurrency(ts.totalBillable)}</p>
                      <p className="text-text-muted text-xs">${ts.billRate}/hr</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getTimesheetStatusBgColor(
                        ts.status
                      )}`}
                    >
                      {ts.status.charAt(0).toUpperCase() + ts.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTimesheet(ts)}
                      >
                        View
                      </Button>
                      {ts.status === 'submitted' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-green-300"
                            onClick={() => handleApprove(ts)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredTimesheets.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No timesheets found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}

      {/* Timesheet Detail Modal */}
      {selectedTimesheet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Timesheet Details</h2>
                  <p className="text-text-secondary">
                    Week ending {new Date(selectedTimesheet.weekEnding).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTimesheet(null)}
                  className="text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                {getProfileImage(selectedTimesheet.candidateName) ? (
                  <img
                    src={getProfileImage(selectedTimesheet.candidateName)}
                    alt={selectedTimesheet.candidateName}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                    {selectedTimesheet.candidateName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div>
                  <p className="font-medium text-text-primary">{selectedTimesheet.candidateName}</p>
                  <p className="text-sm text-text-secondary">{selectedTimesheet.clientName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.05] rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-1">Regular Hours</p>
                  <p className="text-xl font-bold text-text-primary">{selectedTimesheet.regularHours}h</p>
                </div>
                <div className="bg-white/[0.05] rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-1">Overtime Hours</p>
                  <p className="text-xl font-bold text-text-primary">{selectedTimesheet.overtimeHours}h</p>
                </div>
                <div className="bg-white/[0.05] rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-1">Bill Rate</p>
                  <p className="text-xl font-bold text-text-primary">${selectedTimesheet.billRate}/hr</p>
                </div>
                <div className="bg-white/[0.05] rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-1">Pay Rate</p>
                  <p className="text-xl font-bold text-text-primary">${selectedTimesheet.payRate}/hr</p>
                </div>
              </div>

              <div className="bg-white/[0.05] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary">Total Billable</p>
                  <p className="text-xl font-bold text-green-400">
                    {formatCurrency(selectedTimesheet.totalBillable)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-text-secondary">Total Payable</p>
                  <p className="text-lg font-medium text-text-primary">
                    {formatCurrency(selectedTimesheet.totalPayable)}
                  </p>
                </div>
              </div>

              {selectedTimesheet.notes && (
                <div>
                  <p className="text-sm text-text-muted mb-1">Notes</p>
                  <p className="text-text-secondary">{selectedTimesheet.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getTimesheetStatusBgColor(
                    selectedTimesheet.status
                  )}`}
                >
                  {selectedTimesheet.status.charAt(0).toUpperCase() + selectedTimesheet.status.slice(1)}
                </span>
                {selectedTimesheet.approvedBy && (
                  <p className="text-sm text-text-secondary">
                    Approved by {selectedTimesheet.approvedBy}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.08] flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedTimesheet(null)}>
                Close
              </Button>
              {selectedTimesheet.status === 'submitted' && (
                <>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-400 border-red-400/30 hover:bg-red-400/10"
                    onClick={() => {
                      handleReject(selectedTimesheet);
                      setSelectedTimesheet(null);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleApprove(selectedTimesheet);
                      setSelectedTimesheet(null);
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
