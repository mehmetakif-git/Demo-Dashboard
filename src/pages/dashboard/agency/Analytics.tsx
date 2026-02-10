import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Eye,
  MousePointer,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  campaigns,
  agencyStats,
  formatCurrency,
  formatNumber,
} from '@/data/agency/agencyData';
import { useTranslation } from 'react-i18next';

export const Analytics = () => {
  const { t } = useTranslation('common');
  // Calculate metrics from campaigns
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget.total, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.budget.spent, 0);

  // Calculate totals from KPIs
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.kpis.impressions?.actual || 0), 0);
  const totalReach = campaigns.reduce((sum, c) => sum + (c.kpis.reach?.actual || 0), 0);
  const totalEngagement = campaigns.reduce((sum, c) => sum + (c.kpis.engagement?.actual || 0), 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.kpis.conversions?.actual || 0), 0);

  // Calculate average performance
  const avgPerformance = campaigns.reduce((sum, c) => {
    const target = c.kpis.impressions?.target || 0;
    const actual = c.kpis.impressions?.actual || 0;
    return sum + (target > 0 ? ((actual / target) * 100) - 100 : 0);
  }, 0) / campaigns.length;

  const ctr = totalEngagement > 0 && totalImpressions > 0 ? (totalEngagement / totalImpressions) * 100 : 0;
  const conversionRate = totalConversions > 0 && totalEngagement > 0 ? (totalConversions / totalEngagement) * 100 : 0;
  const cpa = totalConversions > 0 ? totalSpent / totalConversions : 0;
  const cpm = totalImpressions > 0 ? (totalSpent / totalImpressions) * 1000 : 0;

  // Campaign performance by type
  const campaignsByType = campaigns.reduce((acc, c) => {
    if (!acc[c.type]) {
      acc[c.type] = { count: 0, budget: 0, performance: 0 };
    }
    acc[c.type].count++;
    acc[c.type].budget += c.budget.total;
    const target = c.kpis.impressions?.target || 0;
    const actual = c.kpis.impressions?.actual || 0;
    acc[c.type].performance += target > 0 ? ((actual / target) * 100) - 100 : 0;
    return acc;
  }, {} as Record<string, { count: number; budget: number; performance: number }>);

  // Top performing campaigns by performance
  const topCampaigns = [...campaigns]
    .map((c) => {
      const target = c.kpis.impressions?.target || 0;
      const actual = c.kpis.impressions?.actual || 0;
      const performance = target > 0 ? ((actual / target) * 100) - 100 : 0;
      return { ...c, calculatedPerformance: performance };
    })
    .sort((a, b) => b.calculatedPerformance - a.calculatedPerformance)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('agency.analytics', 'Analytics')}
        subtitle="Performance metrics and campaign insights"
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(agencyStats.totalRevenue.ytd)}
          icon={DollarSign}
          trend={{ value: '+24%', type: 'up' }}
        />
        <StatsCard
          title="Active Campaigns"
          value={agencyStats.activeCampaigns.toString()}
          icon={Target}
          trend={{ value: '+3 this month', type: 'up' }}
        />
        <StatsCard
          title="Total Reach"
          value={formatNumber(totalReach)}
          icon={Users}
          trend={{ value: '+18%', type: 'up' }}
        />
        <StatsCard
          title="Avg Performance"
          value={`${avgPerformance >= 0 ? '+' : ''}${avgPerformance.toFixed(1)}%`}
          icon={TrendingUp}
          trend={{ value: avgPerformance > 0 ? 'Positive' : 'Negative', type: avgPerformance > 0 ? 'up' : 'down' }}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Key Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-[#547792]" />
                <span className="text-xs text-[#64748b]">Total Impressions</span>
              </div>
              <p className="text-2xl font-semibold text-white">{formatNumber(totalImpressions)}</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +15% vs last month
              </p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-4 w-4 text-[#94B4C1]" />
                <span className="text-xs text-[#64748b]">Total Engagement</span>
              </div>
              <p className="text-2xl font-semibold text-white">{formatNumber(totalEngagement)}</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +22% vs last month
              </p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-[#64748b]">Conversions</span>
              </div>
              <p className="text-2xl font-semibold text-white">{formatNumber(totalConversions)}</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +28% vs last month
              </p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-[#64748b]">CTR</span>
              </div>
              <p className="text-2xl font-semibold text-white">{ctr.toFixed(2)}%</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                Above industry avg
              </p>
            </div>
          </div>
        </div>

        {/* Cost Metrics */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-[#547792]" />
                <span className="text-xs text-[#64748b]">Total Budget</span>
              </div>
              <p className="text-2xl font-semibold text-white">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-[#94B4C1]" />
                <span className="text-xs text-[#64748b]">Total Spent</span>
              </div>
              <p className="text-2xl font-semibold text-white">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-[#64748b]">CPA</span>
              </div>
              <p className="text-2xl font-semibold text-white">${cpa.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-[#64748b]">CPM</span>
              </div>
              <p className="text-2xl font-semibold text-white">${cpm.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Type */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Performance by Campaign Type</h3>
          <div className="space-y-4">
            {Object.entries(campaignsByType).map(([type, data]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Target className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{type}</p>
                    <p className="text-xs text-[#64748b]">{data.count} campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{formatCurrency(data.budget)}</p>
                  <p className={`text-xs flex items-center justify-end gap-1 ${
                    data.performance / data.count > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {data.performance / data.count > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {(data.performance / data.count).toFixed(1)}% Perf
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Campaigns</h3>
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
                    index === 0 ? 'bg-amber-500/20 text-amber-400' :
                    index === 1 ? 'bg-slate-400/20 text-slate-400' :
                    index === 2 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-[#1a1a24] text-[#64748b]'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{campaign.name}</p>
                    <p className="text-xs text-[#64748b]">{campaign.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${campaign.calculatedPerformance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {campaign.calculatedPerformance >= 0 ? '+' : ''}{campaign.calculatedPerformance.toFixed(0)}%
                  </p>
                  <p className="text-xs text-[#64748b]">Performance</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="h-32 bg-gradient-to-b from-[#547792]/30 to-[#547792]/10 rounded-t-xl flex items-center justify-center">
              <div>
                <p className="text-2xl font-semibold text-white">{formatNumber(totalImpressions)}</p>
                <p className="text-xs text-[#64748b]">Impressions</p>
              </div>
            </div>
          </div>
          <div className="text-[#64748b]">→</div>
          <div className="flex-1 text-center">
            <div className="h-28 bg-gradient-to-b from-[#94B4C1]/30 to-[#94B4C1]/10 rounded-t-xl flex items-center justify-center">
              <div>
                <p className="text-2xl font-semibold text-white">{formatNumber(totalEngagement)}</p>
                <p className="text-xs text-[#64748b]">Engagement</p>
              </div>
            </div>
          </div>
          <div className="text-[#64748b]">→</div>
          <div className="flex-1 text-center">
            <div className="h-24 bg-gradient-to-b from-emerald-500/30 to-emerald-500/10 rounded-t-xl flex items-center justify-center">
              <div>
                <p className="text-2xl font-semibold text-white">{formatNumber(totalConversions)}</p>
                <p className="text-xs text-[#64748b]">Conversions</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around mt-4 pt-4 border-t border-white/[0.08]">
          <div className="text-center">
            <p className="text-lg font-semibold text-[#547792]">{ctr.toFixed(2)}%</p>
            <p className="text-xs text-[#64748b]">Engagement Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-emerald-400">{conversionRate.toFixed(2)}%</p>
            <p className="text-xs text-[#64748b]">Conversion Rate</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
