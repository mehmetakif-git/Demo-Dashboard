import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
} from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, DataTable } from '@/components/common';
import { incomeRecords } from '@/data/accountingData';
import type { IncomeRecord } from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

export const Income = () => {
  const { t } = useTranslation('accounting');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => [
    { value: 'All', label: t('income.categories.all') },
    { value: 'Software Sales', label: t('income.categories.softwareSales') },
    { value: 'Consulting', label: t('income.categories.consulting') },
    { value: 'Cloud Services', label: t('income.categories.cloudServices') },
    { value: 'Development', label: t('income.categories.development') },
    { value: 'Support', label: t('income.categories.support') },
    { value: 'Training', label: t('income.categories.training') },
  ], [t]);

  const paymentMethodLabels: Record<string, string> = useMemo(() => ({
    bank_transfer: t('income.paymentMethods.bankTransfer'),
    credit_card: t('income.paymentMethods.creditCard'),
    cash: t('income.paymentMethods.cash'),
    check: t('income.paymentMethods.check'),
  }), [t]);

  const stats = useMemo(() => {
    const totalIncome = incomeRecords.reduce((acc, r) => acc + r.amount, 0);
    const receivedIncome = incomeRecords
      .filter((r) => r.status === 'received')
      .reduce((acc, r) => acc + r.amount, 0);
    const pendingIncome = incomeRecords
      .filter((r) => r.status === 'pending')
      .reduce((acc, r) => acc + r.amount, 0);
    const avgTransaction = totalIncome / incomeRecords.length;

    return {
      totalIncome,
      receivedIncome,
      pendingIncome,
      avgTransaction,
      transactionCount: incomeRecords.length,
    };
  }, []);

  const filteredRecords = useMemo(() => {
    return incomeRecords.filter((record) => {
      const matchesSearch =
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const columns = [
    {
      key: 'date',
      header: t('income.date'),
      render: (record: IncomeRecord) => (
        <span className="text-white/60">{new Date(record.date).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'description',
      header: t('income.description'),
      render: (record: IncomeRecord) => (
        <div>
          <p className="text-white font-medium">{record.description}</p>
          <p className="text-xs text-white/40">{record.invoiceId}</p>
        </div>
      ),
    },
    {
      key: 'client',
      header: t('income.client'),
      render: (record: IncomeRecord) => <span className="text-white/80">{record.client}</span>,
    },
    {
      key: 'category',
      header: t('income.category'),
      render: (record: IncomeRecord) => (
        <span className="px-2 py-1 rounded-full bg-[#547792]/10 text-[#547792] text-xs font-medium">
          {record.category}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: t('income.paymentMethod'),
      render: (record: IncomeRecord) => (
        <span className="text-white/60">{paymentMethodLabels[record.paymentMethod]}</span>
      ),
    },
    {
      key: 'amount',
      header: t('income.amount'),
      render: (record: IncomeRecord) => (
        <span className="text-emerald-400 font-semibold">+${record.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: t('income.status'),
      render: (record: IncomeRecord) => <StatusBadge status={record.status} />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('income.title')}
        subtitle={t('income.subtitle')}
        icon={ArrowUpCircle}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              {t('income.export')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <ArrowUpCircle className="w-4 h-4" />
              {t('income.recordIncome')}
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('income.totalIncome')}
          value={`$${(stats.totalIncome / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('income.received')}
          value={`$${(stats.receivedIncome / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('income.pending')}
          value={`$${(stats.pendingIncome / 1000).toFixed(0)}K`}
          icon={Calendar}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('income.avgTransaction')}
          value={`$${(stats.avgTransaction / 1000).toFixed(1)}K`}
          icon={TrendingUp}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder={t('income.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#547792]/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-[#547792]/50 cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Income Table */}
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
          emptyMessage={t('income.noRecords')}
        />
      </motion.div>
    </div>
  );
};
