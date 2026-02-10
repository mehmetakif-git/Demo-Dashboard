import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Line,
} from 'recharts';
import { PageHeader, StatsCard } from '@/components/common';
import { cashFlowData } from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

export const CashFlow = () => {
  const { t } = useTranslation('common');
  const stats = useMemo(() => {
    const totalInflow = cashFlowData.reduce((acc, m) => acc + m.inflow, 0);
    const totalOutflow = cashFlowData.reduce((acc, m) => acc + m.outflow, 0);
    const netCashFlow = totalInflow - totalOutflow;
    const avgMonthlyNet = netCashFlow / 12;
    const currentMonth = cashFlowData[cashFlowData.length - 1];

    return {
      totalInflow,
      totalOutflow,
      netCashFlow,
      avgMonthlyNet,
      currentMonthInflow: currentMonth.inflow,
      currentMonthOutflow: currentMonth.outflow,
      currentMonthNet: currentMonth.net,
    };
  }, []);

  const quarterlyData = useMemo(() => {
    return [
      {
        quarter: 'Q1',
        inflow: cashFlowData.slice(0, 3).reduce((acc, m) => acc + m.inflow, 0),
        outflow: cashFlowData.slice(0, 3).reduce((acc, m) => acc + m.outflow, 0),
        net: cashFlowData.slice(0, 3).reduce((acc, m) => acc + m.net, 0),
      },
      {
        quarter: 'Q2',
        inflow: cashFlowData.slice(3, 6).reduce((acc, m) => acc + m.inflow, 0),
        outflow: cashFlowData.slice(3, 6).reduce((acc, m) => acc + m.outflow, 0),
        net: cashFlowData.slice(3, 6).reduce((acc, m) => acc + m.net, 0),
      },
      {
        quarter: 'Q3',
        inflow: cashFlowData.slice(6, 9).reduce((acc, m) => acc + m.inflow, 0),
        outflow: cashFlowData.slice(6, 9).reduce((acc, m) => acc + m.outflow, 0),
        net: cashFlowData.slice(6, 9).reduce((acc, m) => acc + m.net, 0),
      },
      {
        quarter: 'Q4',
        inflow: cashFlowData.slice(9, 12).reduce((acc, m) => acc + m.inflow, 0),
        outflow: cashFlowData.slice(9, 12).reduce((acc, m) => acc + m.outflow, 0),
        net: cashFlowData.slice(9, 12).reduce((acc, m) => acc + m.net, 0),
      },
    ];
  }, []);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('accounting.cashFlow', 'Cash Flow')}
        subtitle="Analyze your cash inflows and outflows"
        icon={Activity}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Inflow (YTD)"
          value={`$${(stats.totalInflow / 1000000).toFixed(2)}M`}
          icon={TrendingUp}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Total Outflow (YTD)"
          value={`$${(stats.totalOutflow / 1000000).toFixed(2)}M`}
          icon={TrendingDown}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Net Cash Flow"
          value={`$${(stats.netCashFlow / 1000000).toFixed(2)}M`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Avg. Monthly Net"
          value={`$${(stats.avgMonthlyNet / 1000).toFixed(0)}K`}
          icon={Activity}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-white/60">This Month Inflow</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">
            ${stats.currentMonthInflow.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-white/60">This Month Outflow</span>
          </div>
          <p className="text-3xl font-bold text-red-400">
            ${stats.currentMonthOutflow.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#547792]/20">
              <DollarSign className="w-5 h-5 text-[#547792]" />
            </div>
            <span className="text-white/60">This Month Net</span>
          </div>
          <p className="text-3xl font-bold text-[#547792]">
            +${stats.currentMonthNet.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Monthly Cash Flow Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Cash Flow</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="99%" height={350}>
            <ComposedChart data={cashFlowData}>
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
              <Legend />
              <Area
                type="monotone"
                dataKey="inflow"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#inflowGradient)"
                name="Inflow"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#outflowGradient)"
                name="Outflow"
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#547792"
                strokeWidth={3}
                dot={{ fill: '#547792', strokeWidth: 2 }}
                name="Net"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quarterly Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quarterly Comparison</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="99%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={12} />
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
              <Legend />
              <Bar dataKey="inflow" fill="#10b981" name="Inflow" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="#ef4444" name="Outflow" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" fill="#547792" name="Net" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Monthly Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/[0.08]">
          <h3 className="text-lg font-semibold text-white">Monthly Breakdown</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1a24]">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                Month
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-[#64748b]">
                Inflow
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-[#64748b]">
                Outflow
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-[#64748b]">
                Net
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-[#64748b]">
                Margin
              </th>
            </tr>
          </thead>
          <tbody>
            {cashFlowData.map((month) => {
              const margin = ((month.net / month.inflow) * 100).toFixed(1);
              return (
                <tr key={month.month} className="border-t border-white/[0.08] hover:bg-[#1a1a24]">
                  <td className="px-6 py-4 text-white font-medium">{month.month}</td>
                  <td className="px-6 py-4 text-emerald-400 text-right">
                    +${month.inflow.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-red-400 text-right">
                    -${month.outflow.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-[#547792] font-semibold text-right">
                    ${month.net.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-white/60 text-right">{margin}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
