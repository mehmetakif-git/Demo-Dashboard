import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  DollarSign,
  TrendingUp,
  FileText,
  Download,
  Building2,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  timesheets,
  placements,
  formatCurrency,
} from '@/data/staffing/staffingData';
import { getProfileImage } from '@/utils/profileImages';

export const Payroll = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState<string>('current');

  // Calculate payroll data from timesheets
  const payrollData = useMemo(() => {
    const processedTimesheets = timesheets.filter(
      (ts) => ts.status === 'approved' || ts.status === 'processed'
    );

    // Group by candidate
    const byCandidate = processedTimesheets.reduce((acc, ts) => {
      if (!acc[ts.candidateId]) {
        acc[ts.candidateId] = {
          candidateId: ts.candidateId,
          candidateName: ts.candidateName,
          clientName: ts.clientName,
          totalHours: 0,
          totalPayable: 0,
          totalBillable: 0,
          timesheets: [],
        };
      }
      acc[ts.candidateId].totalHours += ts.totalHours;
      acc[ts.candidateId].totalPayable += ts.totalPayable;
      acc[ts.candidateId].totalBillable += ts.totalBillable;
      acc[ts.candidateId].timesheets.push(ts);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(byCandidate);
  }, []);

  // Filter payroll data
  const filteredPayroll = useMemo(() => {
    return payrollData.filter((item: any) => {
      const matchesSearch =
        searchQuery === '' ||
        item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [payrollData, searchQuery]);

  // Calculate stats
  const totalPayroll = payrollData.reduce((sum: number, item: any) => sum + item.totalPayable, 0);
  const totalBillable = payrollData.reduce((sum: number, item: any) => sum + item.totalBillable, 0);
  const margin = totalBillable > 0 ? ((totalBillable - totalPayroll) / totalBillable) * 100 : 0;
  const activeContractors = placements.filter((p) => p.status === 'active' && p.type !== 'permanent').length;

  const stats = [
    {
      title: 'Total Payroll',
      value: formatCurrency(totalPayroll),
      icon: DollarSign,
      iconColor: '#ef4444',
    },
    {
      title: 'Total Billable',
      value: formatCurrency(totalBillable),
      icon: DollarSign,
      iconColor: '#10b981',
    },
    {
      title: 'Gross Margin',
      value: `${margin.toFixed(1)}%`,
      icon: TrendingUp,
      iconColor: '#547792',
    },
    {
      title: 'Active Contractors',
      value: activeContractors.toString(),
      icon: FileText,
      iconColor: '#f59e0b',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Payroll"
        subtitle="Manage contractor payroll and billing"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => console.log('Export payroll')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => console.log('Run payroll')}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Run Payroll
            </Button>
          </div>
        }
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
              placeholder="Search contractors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="current">Current Period</option>
            <option value="last">Last Period</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </Card>

      {/* Payroll Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Period Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.05] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary">Total Billable</span>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(totalBillable)}</p>
            <p className="text-sm text-text-muted mt-1">Gross client billing</p>
          </div>
          <div className="bg-white/[0.05] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary">Total Payroll</span>
              <DollarSign className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(totalPayroll)}</p>
            <p className="text-sm text-text-muted mt-1">Contractor payments</p>
          </div>
          <div className="bg-white/[0.05] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary">Gross Profit</span>
              <TrendingUp className="h-5 w-5 text-accent-primary" />
            </div>
            <p className="text-2xl font-bold text-accent-primary">
              {formatCurrency(totalBillable - totalPayroll)}
            </p>
            <p className="text-sm text-text-muted mt-1">{margin.toFixed(1)}% margin</p>
          </div>
        </div>
      </Card>

      {/* Payroll Table */}
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
                  Hours
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Billable
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Payable
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Margin
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((item: any) => {
                const itemMargin =
                  item.totalBillable > 0
                    ? ((item.totalBillable - item.totalPayable) / item.totalBillable) * 100
                    : 0;
                return (
                  <tr
                    key={item.candidateId}
                    className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(item.candidateName) ? (
                          <img
                            src={getProfileImage(item.candidateName)}
                            alt={item.candidateName}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                            {item.candidateName
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </div>
                        )}
                        <p className="font-medium text-text-primary">{item.candidateName}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-text-muted" />
                        <span className="text-text-secondary">{item.clientName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">{item.totalHours}h</td>
                    <td className="py-3 px-4 text-green-400 font-medium">
                      {formatCurrency(item.totalBillable)}
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {formatCurrency(item.totalPayable)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${
                          itemMargin >= 20 ? 'text-green-400' : itemMargin >= 10 ? 'text-amber-400' : 'text-red-400'
                        }`}
                      >
                        {itemMargin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" onClick={() => console.log('View details', item.candidateId)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredPayroll.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No payroll data</h3>
          <p className="text-text-secondary">No approved timesheets found for this period</p>
        </Card>
      )}
    </motion.div>
  );
};
