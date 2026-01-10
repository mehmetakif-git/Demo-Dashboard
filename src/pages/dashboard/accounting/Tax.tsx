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

const tabs = [
  { id: 'all', label: 'All Records' },
  { id: 'pending', label: 'Pending', count: 0 },
  { id: 'paid', label: 'Paid' },
  { id: 'overdue', label: 'Overdue', count: 0 },
];

export const Tax = () => {
  const [activeTab, setActiveTab] = useState('all');

  const stats = useMemo(() => {
    const totalTax = taxRecords.reduce((acc, t) => acc + t.amount, 0);
    const paidTax = taxRecords
      .filter((t) => t.status === 'paid')
      .reduce((acc, t) => acc + t.amount, 0);
    const pendingTax = taxRecords
      .filter((t) => t.status === 'pending')
      .reduce((acc, t) => acc + t.amount, 0);
    const overdueTax = taxRecords
      .filter((t) => t.status === 'overdue')
      .reduce((acc, t) => acc + t.amount, 0);
    const pendingCount = taxRecords.filter((t) => t.status === 'pending').length;
    const overdueCount = taxRecords.filter((t) => t.status === 'overdue').length;

    return {
      totalTax,
      paidTax,
      pendingTax,
      overdueTax,
      pendingCount,
      overdueCount,
    };
  }, []);

  // Update tab counts
  tabs[1].count = stats.pendingCount;
  tabs[3].count = stats.overdueCount;

  const filteredRecords = useMemo(() => {
    if (activeTab === 'all') return taxRecords;
    return taxRecords.filter((t) => t.status === activeTab);
  }, [activeTab]);

  const upcomingDeadlines = useMemo(() => {
    return taxRecords
      .filter((t) => t.status === 'pending')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  }, []);

  const columns = [
    {
      key: 'type',
      header: 'Tax Type',
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
      header: 'Period',
      render: (record: TaxRecord) => <span className="text-white/60">{record.period}</span>,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (record: TaxRecord) => (
        <span className={record.status === 'overdue' ? 'text-red-400' : 'text-white/60'}>
          {new Date(record.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (record: TaxRecord) => (
        <span className="text-white font-semibold">${record.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (record: TaxRecord) => <StatusBadge status={record.status} />,
    },
    {
      key: 'paidDate',
      header: 'Paid Date',
      render: (record: TaxRecord) => (
        <span className="text-white/60">
          {record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (record: TaxRecord) => (
        <div className="flex items-center gap-1">
          {record.status === 'pending' && (
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
              <CheckCircle className="w-3 h-3" />
              Mark Paid
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
        title="Tax Management"
        subtitle="Track tax obligations and deadlines"
        icon={Receipt}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Receipt className="w-4 h-4" />
              Record Tax Payment
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tax (YTD)"
          value={`$${(stats.totalTax / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Paid"
          value={`$${(stats.paidTax / 1000).toFixed(0)}K`}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Pending"
          value={`$${(stats.pendingTax / 1000).toFixed(0)}K`}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Overdue"
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
            <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
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
                      Due in {daysUntilDue} days
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
        <h3 className="text-lg font-semibold text-white mb-4">Tax Summary by Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Corporate Income Tax', 'Payroll Tax', 'Sales Tax', 'Other'].map((type) => {
            const typeRecords = taxRecords.filter(
              (t) => type === 'Other' ? !['Corporate Income Tax', 'Payroll Tax', 'Sales Tax'].includes(t.type) : t.type === type
            );
            const total = typeRecords.reduce((acc, t) => acc + t.amount, 0);
            const paid = typeRecords
              .filter((t) => t.status === 'paid')
              .reduce((acc, t) => acc + t.amount, 0);

            return (
              <div key={type} className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/60 text-sm mb-2">{type}</p>
                <p className="text-xl font-bold text-white">${total.toLocaleString()}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-emerald-400">Paid: ${paid.toLocaleString()}</span>
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
          keyExtractor={(t) => String(t.id)}
          emptyMessage="No tax records found"
        />
      </motion.div>
    </div>
  );
};
