import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { PageHeader, StatsCard } from '@/components/common';
import {
  financialSummary,
  cashFlowData,
  expenseCategories,
  invoices,
  incomeRecords,
  expenseRecords,
} from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

export const Overview = () => {
  const { t } = useTranslation('accounting');
  const stats = useMemo(() => ({
    totalRevenue: financialSummary.totalRevenue,
    totalExpenses: financialSummary.totalExpenses,
    netProfit: financialSummary.netProfit,
    pendingInvoices: financialSummary.pendingInvoices,
    overdueInvoices: financialSummary.overdueInvoices,
    cashBalance: financialSummary.cashBalance,
    profitMargin: ((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1),
  }), []);

  const recentIncome = useMemo(() => incomeRecords.slice(0, 5), []);
  const recentExpenses = useMemo(() => expenseRecords.slice(0, 5), []);

  const pendingInvoicesList = useMemo(
    () => invoices.filter((inv) => inv.status === 'pending' || inv.status === 'overdue').slice(0, 5),
    []
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('overview.title')}
        subtitle={t('overview.subtitle')}
        icon={PieChart}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('overview.totalRevenue')}
          value={`$${(stats.totalRevenue / 1000000).toFixed(2)}M`}
          icon={TrendingUp}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('overview.totalExpenses')}
          value={`$${(stats.totalExpenses / 1000000).toFixed(2)}M`}
          icon={TrendingDown}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('overview.netProfit')}
          value={`$${(stats.netProfit / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('overview.pendingInvoices')}
          value={stats.pendingInvoices}
          icon={FileText}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">{t('overview.cashFlow')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="99%" height={300}>
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a24',
                    border: '1px solid #2e2e3e',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#inflowGradient)"
                  name={t('overview.inflow')}
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#outflowGradient)"
                  name={t('overview.outflow')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Expense Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">{t('overview.expenseDistribution')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="99%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseCategories as unknown as Record<string, unknown>[]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
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
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Financial Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-white/60 mb-4">{t('overview.financialHealth')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">{t('overview.profitMargin')}</span>
              <span className="text-emerald-400 font-semibold">{stats.profitMargin}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">{t('overview.cashBalance')}</span>
              <span className="text-white font-semibold">${stats.cashBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">{t('overview.receivables')}</span>
              <span className="text-blue-400 font-semibold">
                ${financialSummary.accountsReceivable.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">{t('overview.payables')}</span>
              <span className="text-orange-400 font-semibold">
                ${financialSummary.accountsPayable.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Recent Income */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-white/60 mb-4">{t('overview.recentIncome')}</h3>
          <div className="space-y-3">
            {recentIncome.map((income) => (
              <div key={income.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/80 text-sm truncate max-w-[120px]">{income.client}</span>
                </div>
                <span className="text-emerald-400 font-medium text-sm">
                  +${income.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-white/60 mb-4">{t('overview.recentExpenses')}</h3>
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                  <span className="text-white/80 text-sm truncate max-w-[120px]">{expense.category}</span>
                </div>
                <span className="text-red-400 font-medium text-sm">
                  -${expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pending Invoices Alert */}
      {stats.overdueInvoices > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">
                {t(stats.overdueInvoices > 1 ? 'overview.overdueInvoices' : 'overview.overdueInvoice', { count: stats.overdueInvoices })}
              </h3>
              <p className="text-white/60 text-sm mb-3">
                {t('overview.overdueInvoicesMessage')}
              </p>
              <div className="space-y-2">
                {pendingInvoicesList
                  .filter((inv) => inv.status === 'overdue')
                  .map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] backdrop-blur-xl/50"
                    >
                      <div>
                        <span className="text-white font-medium">{invoice.invoiceNumber}</span>
                        <span className="text-white/40 mx-2">-</span>
                        <span className="text-white/60">{invoice.client}</span>
                      </div>
                      <span className="text-red-400 font-semibold">
                        ${invoice.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
