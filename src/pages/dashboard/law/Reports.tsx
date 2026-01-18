import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Download,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Scale,
  FileText,
  Gavel,
  Handshake,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  cases,
  clients,
  hearings,
  documents,
  invoices,
  timeEntries,
  settlements,
  LAW_COLOR,
} from '@/data/law/lawData';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('month');

  const stats = useMemo(() => {
    const totalCases = cases.length;
    const activeCases = cases.filter(c => c.status === 'active' || c.status === 'settlement').length;
    const wonCases = cases.filter(c => c.status === 'won').length;
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.total, 0);
    const pendingRevenue = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((acc, i) => acc + i.total, 0);
    const totalBillableHours = timeEntries.reduce((acc, t) => acc + t.billableHours, 0);
    const billableAmount = timeEntries.reduce((acc, t) => acc + t.amount, 0);
    const upcomingHearings = hearings.filter(h => h.status === 'scheduled').length;
    const totalDocuments = documents.length;
    const approvedSettlements = settlements.filter(s => s.status === 'approved').length;
    const settlementValue = settlements.filter(s => s.status === 'approved').reduce((acc, s) => acc + s.amount, 0);

    return {
      totalCases,
      activeCases,
      wonCases,
      totalClients,
      activeClients,
      totalRevenue,
      pendingRevenue,
      totalBillableHours,
      billableAmount,
      upcomingHearings,
      totalDocuments,
      approvedSettlements,
      settlementValue,
    };
  }, []);

  const casesByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    cases.forEach(c => {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, []);

  const casesByType = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    cases.forEach(c => {
      typeCounts[c.caseType] = (typeCounts[c.caseType] || 0) + 1;
    });
    return Object.entries(typeCounts).map(([type, count]) => ({ type, count }));
  }, []);

  const invoicesByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    invoices.forEach(i => {
      statusCounts[i.status] = (statusCounts[i.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, []);

  const topAttorneys = useMemo(() => {
    const attorneyHours: Record<string, number> = {};
    timeEntries.forEach(t => {
      attorneyHours[t.lawyerName] = (attorneyHours[t.lawyerName] || 0) + t.billableHours;
    });
    return Object.entries(attorneyHours)
      .map(([attorney, hours]) => ({ attorney, hours }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 5);
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#3b82f6',
      'pending': '#f59e0b',
      'closed': '#10b981',
      'on-hold': '#64748b',
    };
    return colors[status] || LAW_COLOR;
  };

  const getInvoiceStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'pending': '#f59e0b',
      'overdue': '#ef4444',
      'draft': '#64748b',
    };
    return colors[status] || LAW_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="View firm performance metrics and generate reports"
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            <select
              className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button>
              <Download size={18} />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Cases', value: stats.totalCases, icon: Briefcase, color: LAW_COLOR },
          { label: 'Active Cases', value: stats.activeCases, icon: Scale, color: '#3b82f6' },
          { label: 'Active Clients', value: `${stats.activeClients}/${stats.totalClients}`, icon: Users, color: '#10b981' },
          { label: 'Total Revenue', value: `QAR ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
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

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Billable Hours', value: `${stats.totalBillableHours.toFixed(1)} hrs`, icon: Clock, color: '#3b82f6' },
          { label: 'Pending Revenue', value: `QAR ${stats.pendingRevenue.toLocaleString()}`, icon: DollarSign, color: '#f59e0b' },
          { label: 'Upcoming Hearings', value: stats.upcomingHearings, icon: Gavel, color: '#ef4444' },
          { label: 'Settlement Value', value: `QAR ${stats.settlementValue.toLocaleString()}`, icon: Handshake, color: '#10b981' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.05 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by Status */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Cases by Status</h3>
          <div className="space-y-3">
            {casesByStatus.map((item, index) => {
              const percentage = Math.round((item.count / cases.length) * 100);
              return (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary capitalize">{item.status.replace(/-/g, ' ')}</span>
                    <span className="text-sm font-medium text-text-primary">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: getStatusColor(item.status) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Cases by Type */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Cases by Type</h3>
          <div className="space-y-3">
            {casesByType.map((item, index) => {
              const percentage = Math.round((item.count / cases.length) * 100);
              return (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">{item.type}</span>
                    <span className="text-sm font-medium text-text-primary">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: LAW_COLOR }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Top Attorneys */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Top Attorneys by Billable Hours</h3>
          <div className="space-y-3">
            {topAttorneys.map((item, index) => (
              <motion.div
                key={item.attorney}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${LAW_COLOR}20` }}
                  >
                    <span className="text-sm font-bold" style={{ color: LAW_COLOR }}>
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-medium text-text-primary">{item.attorney}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">{item.hours.toFixed(1)} hrs</p>
                  <p className="text-xs text-text-muted">billable</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Revenue Trend Placeholder */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-background-tertiary rounded-lg">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto text-text-muted mb-2" />
              <p className="text-text-muted">Chart placeholder</p>
              <p className="text-xs text-text-muted mt-1">Revenue trend visualization would appear here</p>
            </div>
          </div>
        </Card>

        {/* Invoice Status */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Invoice Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-2 text-sm font-medium text-text-muted">Status</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">Count</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {invoicesByStatus.map((item, index) => {
                  const percentage = Math.round((item.count / invoices.length) * 100);
                  return (
                    <motion.tr
                      key={item.status}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border-default last:border-b-0"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getInvoiceStatusColor(item.status) }}
                          />
                          <span className="text-text-primary capitalize">{item.status}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        <span className="font-medium text-text-primary">{item.count}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-text-secondary">{percentage}%</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Document Overview */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Document Overview</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-background-tertiary rounded-lg text-center">
              <FileText size={24} className="mx-auto mb-2" style={{ color: LAW_COLOR }} />
              <p className="text-2xl font-bold text-text-primary">{stats.totalDocuments}</p>
              <p className="text-xs text-text-muted">Total Documents</p>
            </div>
            <div className="p-4 bg-background-tertiary rounded-lg text-center">
              <Handshake size={24} className="mx-auto text-success mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.approvedSettlements}</p>
              <p className="text-xs text-text-muted">Approved Settlements</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg">
            <span className="text-sm text-text-secondary">Billable Amount</span>
            <span className="font-medium" style={{ color: LAW_COLOR }}>
              QAR {stats.billableAmount.toLocaleString()}
            </span>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Export Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: 'Case Report', icon: Briefcase },
            { label: 'Client Report', icon: Users },
            { label: 'Billing Report', icon: DollarSign },
            { label: 'Time Report', icon: Clock },
            { label: 'Document Report', icon: FileText },
            { label: 'Settlement Report', icon: Handshake },
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <motion.div
                key={report.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button variant="ghost" className="w-full flex flex-col items-center gap-2 h-auto py-4">
                  <Icon size={24} style={{ color: LAW_COLOR }} />
                  <span className="text-xs">{report.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
