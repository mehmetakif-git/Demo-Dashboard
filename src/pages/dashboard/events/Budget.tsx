import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  FileDown,
  Building,
  UtensilsCrossed,
  Speaker,
  Flower2,
  Music,
  Camera,
  Package,
  Users,
  Megaphone,
  Bus,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  Ticket,
  HandshakeIcon,
  Receipt,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  eventBudgets,
  budgetCategories,
  formatCurrency,
  getExpenseStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Budget = () => {
  const { t } = useTranslation('events');
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const selectedBudget = useMemo(() => {
    return eventBudgets.find((b) => b.eventId === selectedEvent);
  }, [selectedEvent]);

  const selectedEventData = useMemo(() => {
    return events.find((e) => e.id === selectedEvent);
  }, [selectedEvent]);

  const filteredExpenses = useMemo(() => {
    if (!selectedBudget) return [];
    return selectedBudget.expenses.filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [selectedBudget, searchTerm, categoryFilter, statusFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'venue':
        return <Building className="h-5 w-5" />;
      case 'catering':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'av-production':
        return <Speaker className="h-5 w-5" />;
      case 'decor':
        return <Flower2 className="h-5 w-5" />;
      case 'entertainment':
        return <Music className="h-5 w-5" />;
      case 'photography':
        return <Camera className="h-5 w-5" />;
      case 'rentals':
        return <Package className="h-5 w-5" />;
      case 'staffing':
        return <Users className="h-5 w-5" />;
      case 'marketing':
        return <Megaphone className="h-5 w-5" />;
      case 'transportation':
        return <Bus className="h-5 w-5" />;
      default:
        return <MoreHorizontal className="h-5 w-5" />;
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = budgetCategories.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'overdue':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  // Calculate profit/loss
  const profitLoss = selectedBudget
    ? selectedBudget.revenue.total - selectedBudget.totalSpent - selectedBudget.totalCommitted
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('budget.title')}
        subtitle={t('budget.subtitle')}
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a24] transition-colors">
              <FileDown className="h-4 w-4" />
              {t('budget.exportReport')}
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" />
              {t('budget.addExpense')}
            </button>
          </div>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <label className="block text-sm text-[#64748b] mb-2">{t('budget.selectEvent')}</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full max-w-md rounded-lg border border-white/[0.08] bg-[#1a1a24] px-4 py-2 text-white focus:border-[#547792] focus:outline-none"
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Overview Stats */}
      {selectedBudget && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard
            title={t('budget.totalBudget')}
            value={formatCurrency(selectedBudget.totalBudget)}
            icon={Wallet}
            trend={{ value: t('budget.allocated'), type: 'neutral' }}
          />
          <StatsCard
            title={t('budget.spent')}
            value={formatCurrency(selectedBudget.totalSpent)}
            icon={DollarSign}
            trend={{
              value: t('budget.ofBudget', { percent: ((selectedBudget.totalSpent / selectedBudget.totalBudget) * 100).toFixed(0) }),
              type: 'neutral',
            }}
          />
          <StatsCard
            title={t('budget.committed')}
            value={formatCurrency(selectedBudget.totalCommitted)}
            icon={Clock}
            trend={{ value: t('budget.pendingPayments'), type: 'neutral' }}
          />
          <StatsCard
            title={t('budget.remaining')}
            value={formatCurrency(selectedBudget.remaining)}
            icon={PiggyBank}
            trend={{
              value: t('budget.left', { percent: ((selectedBudget.remaining / selectedBudget.totalBudget) * 100).toFixed(0) }),
              type: selectedBudget.remaining > 0 ? 'up' : 'down',
            }}
          />
          <StatsCard
            title={t('budget.profitLoss')}
            value={formatCurrency(Math.abs(profitLoss))}
            icon={profitLoss >= 0 ? TrendingUp : TrendingDown}
            trend={{
              value: profitLoss >= 0 ? t('budget.projectedProfit') : t('budget.projectedLoss'),
              type: profitLoss >= 0 ? 'up' : 'down',
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget by Category */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('budget.budgetByCategory')}</h3>
          {selectedBudget && selectedBudget.categories.length > 0 ? (
            <div className="space-y-4">
              {selectedBudget.categories.map((cat) => {
                const total = cat.budgeted;
                const used = cat.spent + cat.committed;
                const progress = total > 0 ? (used / total) * 100 : 0;
                const isOverBudget = used > total;

                return (
                  <div key={cat.category} className="p-4 rounded-lg bg-[#1a1a24]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e1e2e] text-[#547792]">
                          {getCategoryIcon(cat.category)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{getCategoryName(cat.category)}</p>
                          <p className="text-xs text-[#64748b]">
                            {t('budget.spentAndCommitted', { spent: formatCurrency(cat.spent), committed: formatCurrency(cat.committed) })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatCurrency(total)}</p>
                        <p
                          className={`text-xs ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}
                        >
                          {isOverBudget
                            ? t('budget.over', { amount: formatCurrency(used - total) })
                            : t('budget.categoryRemaining', { amount: formatCurrency(total - used) })}
                        </p>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-[#1e1e2e]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOverBudget
                            ? 'bg-red-500'
                            : progress >= 90
                            ? 'bg-amber-500'
                            : 'bg-gradient-to-r from-[#547792] to-[#94B4C1]'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-[#64748b]">
                        {t('budget.used', { percent: progress.toFixed(0) })}
                      </span>
                      <span className="text-xs text-[#64748b]">
                        {t('budget.budgeted', { amount: formatCurrency(total) })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#64748b]">{t('budget.noBudgetCategories')}</p>
          )}
        </div>

        {/* Revenue Tracking */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('budget.revenue')}</h3>
          {selectedBudget && selectedBudget.revenue ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#64748b] text-sm">{t('budget.ticketSales')}</p>
                    <p className="text-white font-semibold text-lg">
                      {formatCurrency(selectedBudget.revenue.ticketSales)}
                    </p>
                  </div>
                </div>
                {selectedEventData && (
                  <p className="text-xs text-[#64748b]">
                    {t('budget.ticketsSold', { count: selectedEventData.ticketTypes.reduce((sum, tt) => sum + tt.sold, 0) })}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#547792]/20 text-[#547792]">
                    <HandshakeIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#64748b] text-sm">{t('budget.sponsorships')}</p>
                    <p className="text-white font-semibold text-lg">
                      {formatCurrency(selectedBudget.revenue.sponsorships)}
                    </p>
                  </div>
                </div>
                {selectedEventData && (
                  <p className="text-xs text-[#64748b]">
                    {t('budget.sponsors', { count: selectedEventData.sponsors.length })}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#64748b] text-sm">{t('budget.otherRevenue')}</p>
                    <p className="text-white font-semibold text-lg">
                      {formatCurrency(selectedBudget.revenue.other)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#64748b]">{t('budget.merchandiseEtc')}</p>
              </div>

              <div className="border-t border-white/[0.08] pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[#64748b]">{t('budget.totalRevenue')}</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(selectedBudget.revenue.total)}
                  </p>
                </div>
              </div>

              {/* Budget vs Revenue Summary */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-[#547792]/10 to-[#94B4C1]/10 border border-[#547792]/20">
                <p className="text-sm text-[#64748b] mb-2">{t('budget.netPosition')}</p>
                <p
                  className={`text-2xl font-bold ${
                    profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {profitLoss >= 0 ? '+' : '-'}
                  {formatCurrency(Math.abs(profitLoss))}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  {t('budget.revenueMinusExpenses', { revenue: formatCurrency(selectedBudget.revenue.total), expenses: formatCurrency(selectedBudget.totalSpent + selectedBudget.totalCommitted) })}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[#64748b]">{t('budget.noRevenueData')}</p>
          )}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <input
                type="text"
                placeholder={t('budget.searchExpenses')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#1a1a24] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-white/[0.08] bg-[#1a1a24] px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
              >
                <option value="all">{t('budget.allCategories')}</option>
                {budgetCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-white/[0.08] bg-[#1a1a24] px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
              >
                <option value="all">{t('budget.allStatus')}</option>
                <option value="paid">{t('budget.paid')}</option>
                <option value="pending">{t('budget.pending')}</option>
                <option value="overdue">{t('budget.overdue')}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.category')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.description')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.vendor')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.amount')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">
                  {t('budget.status')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => {
                  const statusColor = getExpenseStatusColor(expense.status);
                  return (
                    <tr key={expense.id} className="hover:bg-[#1a1a24]">
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{expense.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1e2e] text-[#547792]">
                            {getCategoryIcon(expense.category)}
                          </div>
                          <span className="text-white">{getCategoryName(expense.category)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">{expense.description}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{expense.vendor}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">
                          {formatCurrency(expense.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}
                        >
                          {getStatusIcon(expense.status)}
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#64748b]">
                    {t('budget.noExpensesFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        {filteredExpenses.length > 0 && (
          <div className="border-t border-white/[0.08] px-6 py-4 flex justify-between items-center">
            <p className="text-sm text-[#64748b]">
              {t('budget.showingExpenses', { count: filteredExpenses.length })}
            </p>
            <div className="text-right">
              <p className="text-sm text-[#64748b]">{t('budget.totalFilteredExpenses')}</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(filteredExpenses.reduce((sum, e) => sum + e.amount, 0))}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Budget vs Actual Chart Placeholder */}
      {selectedBudget && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('budget.budgetVsActual')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedBudget.categories.slice(0, 4).map((cat) => {
              const variance = cat.budgeted - (cat.spent + cat.committed);
              const variancePercent =
                cat.budgeted > 0 ? (variance / cat.budgeted) * 100 : 0;

              return (
                <div key={cat.category} className="p-4 rounded-lg bg-[#1a1a24]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1e2e] text-[#547792]">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <span className="text-white font-medium">{getCategoryName(cat.category)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748b]">{t('budget.totalBudget')}</span>
                      <span className="text-white">{formatCurrency(cat.budgeted)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748b]">{t('budget.actual')}</span>
                      <span className="text-white">
                        {formatCurrency(cat.spent + cat.committed)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/[0.08] pt-2">
                      <span className="text-[#64748b]">{t('budget.variance')}</span>
                      <span className={variance >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {variance >= 0 ? '+' : ''}
                        {formatCurrency(variance)} ({variancePercent >= 0 ? '+' : ''}
                        {variancePercent.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};
