import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, DollarSign, CheckCircle, Clock, Download, Eye, Play } from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Avatar, DataTable } from '@/components/common';
import { payrollRecords } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';
import type { PayrollRecord } from '@/data/hrData';
import { useTranslation } from 'react-i18next';

export const Payroll = () => {
  const { t } = useTranslation('hr');
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
      header: t('payroll.employee'),
      render: (record: PayrollRecord) => (
        <div className="flex items-center gap-3">
          <Avatar name={record.employee} src={profileImages[record.employee]} size="sm" />
          <span className="text-white">{record.employee}</span>
        </div>
      ),
    },
    {
      key: 'baseSalary',
      header: t('payroll.baseSalary'),
      render: (record: PayrollRecord) => (
        <span className="text-white/80">${record.baseSalary.toLocaleString()}</span>
      ),
    },
    {
      key: 'bonus',
      header: t('payroll.bonus'),
      render: (record: PayrollRecord) => (
        <span className={record.bonus > 0 ? 'text-emerald-400' : 'text-white/40'}>
          {record.bonus > 0 ? `+$${record.bonus.toLocaleString()}` : '-'}
        </span>
      ),
    },
    {
      key: 'deductions',
      header: t('payroll.deductions'),
      render: (record: PayrollRecord) => (
        <span className="text-red-400">-${record.deductions.toLocaleString()}</span>
      ),
    },
    {
      key: 'netSalary',
      header: t('payroll.netSalary'),
      render: (record: PayrollRecord) => (
        <span className="text-white font-medium">${record.netSalary.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: t('payroll.status'),
      render: (record: PayrollRecord) => <StatusBadge status={record.status} />,
    },
    {
      key: 'paidDate',
      header: t('payroll.paidDate'),
      render: (record: PayrollRecord) => (
        <span className="text-white/60">
          {record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('payroll.actions'),
      render: (record: PayrollRecord) => (
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Eye className="w-4 h-4" />
          </button>
          {record.status === 'pending' && (
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
              <CheckCircle className="w-3 h-3" />
              {t('payroll.markPaid')}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('payroll.title')}
        subtitle={t('payroll.subtitle')}
        icon={Wallet}
        actions={
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-[#547792]/50"
            >
              <option value="December 2024">December 2024</option>
              <option value="November 2024">November 2024</option>
              <option value="October 2024">October 2024</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              {t('payroll.export')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Play className="w-4 h-4" />
              {t('payroll.runPayroll')}
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('payroll.totalPayroll')}
          value={`$${stats.totalPayroll.toLocaleString()}`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('payroll.paid')}
          value={stats.paid}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('payroll.pending')}
          value={stats.pending}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('payroll.totalBonus')}
          value={`$${stats.totalBonus.toLocaleString()}`}
          icon={Wallet}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Payroll Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">{t('payroll.monthSummary', { month: selectedMonth })}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/40 text-sm mb-2">{t('payroll.totalBaseSalaries')}</p>
            <p className="text-2xl font-bold text-white">
              ${filteredRecords.reduce((acc, r) => acc + r.baseSalary, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-sm mb-2">{t('payroll.totalDeductions')}</p>
            <p className="text-2xl font-bold text-red-400">
              -${filteredRecords.reduce((acc, r) => acc + r.deductions, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-sm mb-2">{t('payroll.netPayable')}</p>
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
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredRecords}
          keyExtractor={(r) => String(r.id)}
          emptyMessage={t('payroll.noRecords')}
        />
      </motion.div>
    </div>
  );
};
