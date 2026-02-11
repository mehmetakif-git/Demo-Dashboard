import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Receipt,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Download,
} from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Tabs, DataTable } from '@/components/common';
import { taxRecords } from '@/data/accountingData';
import type { TaxRecord } from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

export const Tax = () => {
  const { t } = useTranslation('accounting');
  const [activeTab, setActiveTab] = useState('all');

  const stats = useMemo(() => {
    const totalTax = taxRecords.reduce((acc, r) => acc + r.amount, 0);
    const paidTax = taxRecords
      .filter((r) => r.status === 'paid')
      .reduce((acc, r) => acc + r.amount, 0);
    const pendingTax = taxRecords
      .filter((r) => r.status === 'pending')
      .reduce((acc, r) => acc + r.amount, 0);
    const overdueTax = taxRecords
      .filter((r) => r.status === 'overdue')
      .reduce((acc, r) => acc + r.amount, 0);
    const pendingCount = taxRecords.filter((r) => r.status === 'pending').length;
    const overdueCount = taxRecords.filter((r) => r.status === 'overdue').length;

    return {
      totalTax,
      paidTax,
      pendingTax,
      overdueTax,
      pendingCount,
      overdueCount,
    };
  }, []);

  const tabs = useMemo(() => [
    { id: 'all', label: t('tax.tabs.all') },
    { id: 'pending', label: t('tax.tabs.pending'), count: stats.pendingCount },
    { id: 'paid', label: t('tax.tabs.paid') },
    { id: 'overdue', label: t('tax.tabs.overdue'), count: stats.overdueCount },
  ], [t, stats.pendingCount, stats.overdueCount]);

  const filteredRecords = useMemo(() => {
    if (activeTab === 'all') return taxRecords;
    return taxRecords.filter((r) => r.status === activeTab);
  }, [activeTab]);

  const upcomingDeadlines = useMemo(() => {
    return taxRecords
      .filter((r) => r.status === 'pending')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  }, []);

  const taxTypeLabels: Record<string, string> = useMemo(() => ({
    'Corporate Income Tax': t('tax.taxTypes.corporateIncomeTax'),
    'Payroll Tax': t('tax.taxTypes.payrollTax'),
    'Sales Tax': t('tax.taxTypes.salesTax'),
    'Other': t('tax.taxTypes.other'),
  }), [t]);

  const columns = [
    {
      key: 'type',
      header: t('tax.taxType'),
      render: (record: TaxRecord) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#547792]/20">
            <Receipt className="w-4 h-4 text-[#547792]" />
          </div>
          <span className="text-white font-medium">{record.type}</span>
        </div>
      ),
    },
    {
      key: 'period',
      header: t('tax.period'),
      render: (record: TaxRecord) => <span className="text-white/60">{record.period}</span>,
    },
    {
      key: 'dueDate',
      header: t('tax.dueDate'),
      render: (record: TaxRecord) => (
        <span className={record.status === 'overdue' ? 'text-red-400' : 'text-white/60'}>
          {new Date(record.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'amount',
      header: t('tax.amount'),
      render: (record: TaxRecord) => (
        <span className="text-white font-semibold">${record.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: t('tax.status'),
      render: (record: TaxRecord) => <StatusBadge status={record.status} />,
    },
    {
      key: 'paidDate',
      header: t('tax.paidDate'),
      render: (record: TaxRecord) => (
        <span className="text-white/60">
          {record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('tax.actions'),
      render: (record: TaxRecord) => (
        <div className="flex items-center gap-1">
          {record.status === 'pending' && (
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
              <CheckCircle className="w-3 h-3" />
              {t('tax.markPaid')}
            </button>
          )}
          {record.reference && (
            <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
              <FileText className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('tax.title')}
        subtitle={t('tax.subtitle')}
        icon={Receipt}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              {t('tax.exportReport')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Receipt className="w-4 h-4" />
              {t('tax.recordTaxPayment')}
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('tax.totalTaxYTD')}
          value={`$${(stats.totalTax / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('tax.paid')}
          value={`$${(stats.paidTax / 1000).toFixed(0)}K`}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('tax.pending')}
          value={`$${(stats.pendingTax / 1000).toFixed(0)}K`}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('tax.overdue')}
          value={`$${(stats.overdueTax / 1000).toFixed(0)}K`}
          icon={AlertCircle}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#547792]" />
            <h3 className="text-lg font-semibold text-white">{t('tax.upcomingDeadlines')}</h3>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((tax) => {
              const daysUntilDue = Math.ceil(
                (new Date(tax.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              const isUrgent = daysUntilDue <= 7;

              return (
                <div
                  key={tax.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isUrgent ? 'bg-red-500/10 border border-red-500/20' : 'bg-[#1a1a24]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        isUrgent ? 'bg-red-500/20' : 'bg-[#547792]/20'
                      }`}
                    >
                      {isUrgent ? (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <Receipt className="w-5 h-5 text-[#547792]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{tax.type}</p>
                      <p className="text-xs text-white/40">{tax.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${tax.amount.toLocaleString()}</p>
                    <p className={`text-xs ${isUrgent ? 'text-red-400' : 'text-white/40'}`}>
                      {t('tax.dueInDays', { count: daysUntilDue })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Tax Type Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">{t('tax.taxSummaryByType')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Corporate Income Tax', 'Payroll Tax', 'Sales Tax', 'Other'].map((type) => {
            const typeRecords = taxRecords.filter(
              (r) => type === 'Other' ? !['Corporate Income Tax', 'Payroll Tax', 'Sales Tax'].includes(r.type) : r.type === type
            );
            const total = typeRecords.reduce((acc, r) => acc + r.amount, 0);
            const paid = typeRecords
              .filter((r) => r.status === 'paid')
              .reduce((acc, r) => acc + r.amount, 0);

            return (
              <div key={type} className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/60 text-sm mb-2">{taxTypeLabels[type] || type}</p>
                <p className="text-xl font-bold text-white">${total.toLocaleString()}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-emerald-400">{t('tax.paid')}: ${paid.toLocaleString()}</span>
                  <span className="text-xs text-white/40">
                    {((paid / total) * 100 || 0).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(paid / total) * 100 || 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tax Records Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredRecords}
          keyExtractor={(r) => String(r.id)}
          emptyMessage={t('tax.noRecords')}
        />
      </motion.div>
    </div>
  );
};
