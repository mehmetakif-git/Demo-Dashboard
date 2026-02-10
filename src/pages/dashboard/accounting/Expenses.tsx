import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownCircle,
  DollarSign,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Search,
  Plus,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { PageHeader, StatsCard, StatusBadge, DataTable } from '@/components/common';
import { expenseRecords, expenseCategories } from '@/data/accountingData';
import type { ExpenseRecord } from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

const categories = ['All', 'Rent', 'Technology', 'Payroll', 'Marketing', 'Operations', 'Professional Services', 'Insurance', 'Travel', 'Equipment', 'Utilities', 'Training'];

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: 'Bank Transfer',
  credit_card: 'Credit Card',
  cash: 'Cash',
  check: 'Check',
};

export const Expenses = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const stats = useMemo(() => {
    const totalExpenses = expenseRecords.reduce((acc, r) => acc + r.amount, 0);
    const paidExpenses = expenseRecords
      .filter((r) => r.status === 'paid')
      .reduce((acc, r) => acc + r.amount, 0);
    const pendingExpenses = expenseRecords
      .filter((r) => r.status === 'pending')
      .reduce((acc, r) => acc + r.amount, 0);
    const avgExpense = totalExpenses / expenseRecords.length;

    return {
      totalExpenses,
      paidExpenses,
      pendingExpenses,
      avgExpense,
      expenseCount: expenseRecords.length,
    };
  }, []);

  const filteredRecords = useMemo(() => {
    return expenseRecords.filter((record) => {
      const matchesSearch =
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const columns = [
    {
      key: 'date',
      header: 'Date',
      render: (record: ExpenseRecord) => (
        <span className="text-white/60">{new Date(record.date).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (record: ExpenseRecord) => (
        <div>
          <p className="text-white font-medium">{record.description}</p>
          <p className="text-xs text-white/40">{record.vendor}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (record: ExpenseRecord) => (
        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
          {record.category}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Payment Method',
      render: (record: ExpenseRecord) => (
        <span className="text-white/60">{paymentMethodLabels[record.paymentMethod]}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (record: ExpenseRecord) => (
        <span className="text-red-400 font-semibold">-${record.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (record: ExpenseRecord) => <StatusBadge status={record.status} />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('accounting.expenses', 'Expenses')}
        subtitle="Track and manage all outgoing expenses"
        icon={ArrowDownCircle}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Expenses"
          value={`$${(stats.totalExpenses / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Paid"
          value={`$${(stats.paidExpenses / 1000).toFixed(0)}K`}
          icon={TrendingDown}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Pending"
          value={`$${(stats.pendingExpenses / 1000).toFixed(0)}K`}
          icon={Calendar}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Avg. Expense"
          value={`$${(stats.avgExpense / 1000).toFixed(1)}K`}
          icon={TrendingDown}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Category Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Expense by Category</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="99%" height={250}>
            <PieChart>
              <Pie
                data={expenseCategories as unknown as Record<string, unknown>[]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="amount"
                nameKey="name"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #2e2e3e',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by description or vendor..."
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
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Expenses Table */}
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
          emptyMessage="No expense records found"
        />
      </motion.div>
    </div>
  );
};
