import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Play,
  Pause,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  campaigns,
  formatCurrency,
  formatNumber,
  getCampaignStatusColor,
} from '@/data/agency/agencyData';

export const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const campaign = useMemo(() => {
    return campaigns.find((c) => c.id === id);
  }, [id]);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#64748b] mb-4">Campaign not found</p>
        <button
          onClick={() => navigate('/dashboard/agency/campaigns')}
          className="text-[#6366f1] hover:underline"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  const statusColor = getCampaignStatusColor(campaign.status);
  const budgetProgress = (campaign.budget.spent / campaign.budget.total) * 100;

  // Calculate performance from KPIs
  const impressionsTarget = campaign.kpis.impressions?.target || 0;
  const impressionsActual = campaign.kpis.impressions?.actual || 0;
  const performance = impressionsTarget > 0
    ? ((impressionsActual / impressionsTarget) * 100) - 100
    : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4" />;
      case 'paused':
        return <Pause className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/agency/campaigns')}
          className="flex items-center gap-2 text-[#64748b] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Campaigns
        </button>
      </div>

      <PageHeader
        title={campaign.name}
        subtitle={`${campaign.type} Campaign for ${campaign.client}`}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}>
              {getStatusIcon(campaign.status)}
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              Edit Campaign
            </button>
          </div>
        }
      />

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Budget"
          value={formatCurrency(campaign.budget.total)}
          icon={DollarSign}
          trend={{ value: `${budgetProgress.toFixed(0)}% used`, type: budgetProgress > 80 ? 'down' : 'neutral' }}
        />
        <StatsCard
          title="Amount Spent"
          value={formatCurrency(campaign.budget.spent)}
          icon={Target}
          trend={{ value: formatCurrency(campaign.budget.remaining) + ' remaining', type: 'neutral' }}
        />
        <StatsCard
          title="Performance"
          value={`${performance >= 0 ? '+' : ''}${performance.toFixed(0)}%`}
          icon={TrendingUp}
          trend={{ value: performance >= 0 ? 'Performing well' : 'Needs attention', type: performance >= 0 ? 'up' : 'down' }}
        />
        <StatsCard
          title="Duration"
          value={`${Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`}
          icon={Calendar}
          trend={{ value: `${campaign.startDate} - ${campaign.endDate}`, type: 'neutral' }}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Campaign Details */}
        <div className="space-y-6">
          {/* Campaign Info */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Client</span>
                <span className="text-white">{campaign.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Campaign Type</span>
                <span className="text-white">{campaign.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Account Director</span>
                <span className="text-white">{campaign.accountDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Creative Director</span>
                <span className="text-white">{campaign.creativeDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Start Date</span>
                <span className="text-white">{campaign.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">End Date</span>
                <span className="text-white">{campaign.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Status</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                  {getStatusIcon(campaign.status)}
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#64748b]">Budget Usage</span>
                  <span className="text-white">{budgetProgress.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#1e1e2e]">
                  <div
                    className={`h-full rounded-full ${
                      budgetProgress > 90
                        ? 'bg-red-500'
                        : budgetProgress > 70
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'
                    }`}
                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">Total Budget</p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(campaign.budget.total)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">Spent</p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(campaign.budget.spent)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">Remaining</p>
                  <p className="text-xl font-semibold text-emerald-400">{formatCurrency(campaign.budget.remaining)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">Performance</p>
                  <p className={`text-xl font-semibold ${performance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {performance >= 0 ? '+' : ''}{performance.toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Performance */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-[#6366f1]" />
                  <span className="text-xs text-[#64748b]">Impressions</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.impressions?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  Target: {formatNumber(campaign.kpis.impressions?.target || 0)}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#8b5cf6]" />
                  <span className="text-xs text-[#64748b]">Reach</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.reach?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  Target: {formatNumber(campaign.kpis.reach?.target || 0)}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-[#64748b]">Engagement</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.engagement?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  Target: {formatNumber(campaign.kpis.engagement?.target || 0)}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-[#64748b]">Conversions</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.conversions?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  Target: {formatNumber(campaign.kpis.conversions?.target || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Channel Performance</h3>
            <div className="space-y-4">
              {campaign.channels.map((channel, index) => (
                <div key={channel} className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">{channel}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-[#1e1e2e]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                        style={{ width: `${80 - index * 15}%` }}
                      />
                    </div>
                    <span className="text-white text-sm w-12 text-right">{80 - index * 15}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Team</h3>
            <div className="space-y-3">
              {campaign.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-sm font-medium text-white">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-xs text-[#64748b]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
