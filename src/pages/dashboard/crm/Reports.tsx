import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  PieChart,
  Activity,
  Award,
  Clock,
  Percent,
  Play,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import { PageHeader } from '@/components/common';
import { opportunities, pipelineStages, leadSources } from '@/data/crmData';

export const Reports = () => {
  // Pipeline by Stage data
  const pipelineData = useMemo(() => {
    return pipelineStages
      .filter(s => !['closed-won', 'closed-lost'].includes(s.id))
      .map(stage => {
        const stageOpps = opportunities.filter(o => o.stage === stage.id);
        const totalValue = stageOpps.reduce((sum, o) => sum + o.value, 0);
        return {
          name: stage.name,
          value: totalValue,
          count: stageOpps.length,
          fill: stage.color,
        };
      });
  }, []);

  // Monthly closed deals (mock data)
  const monthlyDeals = [
    { month: 'Jul', won: 3, lost: 1 },
    { month: 'Aug', won: 5, lost: 2 },
    { month: 'Sep', won: 4, lost: 1 },
    { month: 'Oct', won: 6, lost: 2 },
    { month: 'Nov', won: 4, lost: 3 },
    { month: 'Dec', won: 7, lost: 1 },
  ];

  // Quick insights
  const insights = useMemo(() => {
    // Top performer (by closed deals)
    const closedWon = opportunities.filter(o => o.stage === 'closed-won');
    const ownerCounts: Record<string, number> = {};
    closedWon.forEach(o => {
      ownerCounts[o.owner] = (ownerCounts[o.owner] || 0) + 1;
    });
    const topPerformer = Object.entries(ownerCounts).sort((a, b) => b[1] - a[1])[0];

    // Best lead source
    const bestSource = leadSources.sort((a, b) => b.count - a.count)[0];

    // Average sales cycle (mock: 45 days)
    const avgSalesCycle = 45;

    // Customer retention (mock: 92%)
    const retentionRate = 92;

    return {
      topPerformer: topPerformer ? topPerformer[0] : 'N/A',
      topPerformerDeals: topPerformer ? topPerformer[1] : 0,
      bestSource: bestSource?.name || 'N/A',
      avgSalesCycle,
      retentionRate,
    };
  }, []);

  const reportCards = [
    {
      id: 'pipeline',
      title: 'Sales Pipeline Report',
      description: 'Detailed analysis of your sales pipeline stages and conversion rates',
      icon: Activity,
      color: '#6366f1',
    },
    {
      id: 'lead-conversion',
      title: 'Lead Conversion Report',
      description: 'Track lead sources and conversion metrics over time',
      icon: Target,
      color: '#10b981',
    },
    {
      id: 'customer-revenue',
      title: 'Customer Revenue Report',
      description: 'Revenue breakdown by customer segment and industry',
      icon: Users,
      color: '#8b5cf6',
    },
    {
      id: 'activity-summary',
      title: 'Activity Summary Report',
      description: 'Overview of sales activities and team performance',
      icon: BarChart3,
      color: '#f59e0b',
    },
    {
      id: 'win-loss',
      title: 'Win/Loss Analysis',
      description: 'Analyze factors contributing to deal outcomes',
      icon: TrendingUp,
      color: '#ef4444',
    },
    {
      id: 'forecast',
      title: 'Sales Forecast',
      description: 'Projected revenue based on pipeline probability',
      icon: PieChart,
      color: '#06b6d4',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="CRM Reports"
        subtitle="Analytics and insights for your sales performance"
      />

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((report, index) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5 hover:border-[#6366f1]/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${report.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: report.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{report.title}</h3>
                  <p className="text-sm text-[#64748b]">{report.description}</p>
                </div>
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-[#1a1a24] px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#6366f1] hover:text-white transition-colors group-hover:bg-[#6366f1]/10 group-hover:text-[#6366f1]">
                <Play className="h-4 w-4" />
                Generate Report
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#1a1a24] rounded-lg">
            <div className="flex items-center gap-2 text-[#64748b] mb-2">
              <Award className="h-4 w-4" />
              <span className="text-sm">Top Performer</span>
            </div>
            <p className="text-xl font-bold text-white">{insights.topPerformer}</p>
            <p className="text-sm text-[#10b981]">{insights.topPerformerDeals} closed deals</p>
          </div>
          <div className="p-4 bg-[#1a1a24] rounded-lg">
            <div className="flex items-center gap-2 text-[#64748b] mb-2">
              <Target className="h-4 w-4" />
              <span className="text-sm">Best Lead Source</span>
            </div>
            <p className="text-xl font-bold text-white">{insights.bestSource}</p>
            <p className="text-sm text-[#6366f1]">Highest conversion</p>
          </div>
          <div className="p-4 bg-[#1a1a24] rounded-lg">
            <div className="flex items-center gap-2 text-[#64748b] mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Avg Sales Cycle</span>
            </div>
            <p className="text-xl font-bold text-white">{insights.avgSalesCycle} days</p>
            <p className="text-sm text-[#f59e0b]">From lead to close</p>
          </div>
          <div className="p-4 bg-[#1a1a24] rounded-lg">
            <div className="flex items-center gap-2 text-[#64748b] mb-2">
              <Percent className="h-4 w-4" />
              <span className="text-sm">Retention Rate</span>
            </div>
            <p className="text-xl font-bold text-white">{insights.retentionRate}%</p>
            <p className="text-sm text-[#8b5cf6]">Customer loyalty</p>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline by Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Pipeline by Stage</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a24',
                    border: '1px solid #2e2e3e',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Lead Sources</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={leadSources as any[]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                >
                  {leadSources.map((entry, index) => (
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
                  formatter={(value, name) => [`${value} leads`, name]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {leadSources.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-[#94a3b8]">{source.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Closed Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Closed Deals</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDeals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a24',
                    border: '1px solid #2e2e3e',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="won" name="Won" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lost" name="Lost" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="text-sm text-[#94a3b8]">Won</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-[#94a3b8]">Lost</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
