import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, DollarSign, CheckCircle, Clock, Download, Eye, Play } from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Avatar, DataTable } from '@/components/common';
import { payrollRecords } from '@/data/hrData';
import type { PayrollRecord } from '@/data/hrData';

export const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const stats = useMemo(() => {
    const filtered = payrollRecords.filter((r) => r.month === selectedMonth);
    return {
      totalPayroll: filtered.reduce((acc, r) => acc + r.netSalary, 0),
      paid: filtered.filter((r) => r.status === 'paid').length,
      pending: filtered.filter((r) => r.status === 'pending').length,
      totalBonus: filtered.reduce((acc, r) => acc + r.bonus, 0),
    };
  }, [selectedMonth]);

  const filteredRecords = useMemo(() => {
    return payrollRecords.filter((r) => r.month === selectedMonth);
  }, [selectedMonth]);

  const columns = [
    {
      key: 'employee',
      header: 'Employee',
      render: (record: PayrollRecord) => (
        <div className="flex items-center gap-3">
          <Avatar name={record.employee} size="sm" />
          <span className="text-white">{record.employee}</span>
        </div>
      ),
    },
    {
      key: 'baseSalary',
      header: 'Base Salary',
      render: (record: PayrollRecord) => (
        <span className="text-white/80">${record.baseSalary.toLocaleString()}</span>
      ),
    },
    {
      key: 'bonus',
      header: 'Bonus',
      render: (record: PayrollRecord) => (
        <span className={record.bonus > 0 ? 'text-emerald-400' : 'text-white/40'}>
          {record.bonus > 0 ? `+$${record.bonus.toLocaleString()}` : '-'}
        </span>
      ),
    },
    {
      key: 'deductions',
      header: 'Deductions',
      render: (record: PayrollRecord) => (
        <span className="text-red-400">-${record.deductions.toLocaleString()}</span>
      ),
    },
    {
      key: 'netSalary',
      header: 'Net Salary',
      render: (record: PayrollRecord) => (
        <span className="text-white font-medium">${record.netSalary.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (record: PayrollRecord) => <StatusBadge status={record.status} />,
    },
    {
      key: 'paidDate',
      header: 'Paid Date',
      render: (record: PayrollRecord) => (
        <span className="text-white/60">
          {record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (record: PayrollRecord) => (
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Eye className="w-4 h-4" />
          </button>
          {record.status === 'pending' && (
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
              <CheckCircle className="w-3 h-3" />
              Mark Paid
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Payroll"
        subtitle="Manage employee salaries and payments"
        icon={Wallet}
        actions={
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white text-sm focus:outline-none focus:border-[#6366f1]/50"
            >
              <option value="December 2024">December 2024</option>
              <option value="November 2024">November 2024</option>
              <option value="October 2024">October 2024</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Play className="w-4 h-4" />
              Run Payroll
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Payroll"
          value={`$${stats.totalPayroll.toLocaleString()}`}
          icon={DollarSign}
          iconColor="#6366f1"
          iconBg="rgba(99, 102, 241, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Paid"
          value={stats.paid}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Total Bonus"
          value={`$${stats.totalBonus.toLocaleString()}`}
          icon={Wallet}
          iconColor="#8b5cf6"
          iconBg="rgba(139, 92, 246, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Payroll Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">{selectedMonth} Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/40 text-sm mb-2">Total Base Salaries</p>
            <p className="text-2xl font-bold text-white">
              ${filteredRecords.reduce((acc, r) => acc + r.baseSalary, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-sm mb-2">Total Deductions</p>
            <p className="text-2xl font-bold text-red-400">
              -${filteredRecords.reduce((acc, r) => acc + r.deductions, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-sm mb-2">Net Payable</p>
            <p className="text-2xl font-bold text-emerald-400">
              ${stats.totalPayroll.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Payroll Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredRecords}
          keyExtractor={(r) => String(r.id)}
          emptyMessage="No payroll records for this month"
        />
      </motion.div>
    </div>
  );
};
