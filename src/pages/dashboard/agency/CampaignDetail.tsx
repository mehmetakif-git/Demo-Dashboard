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
import { useTranslation } from 'react-i18next';

export const CampaignDetail = () => {
  const { t } = useTranslation('agency');
  const { id } = useParams();
  const navigate = useNavigate();

  const campaign = useMemo(() => {
    return campaigns.find((c) => c.id === id);
  }, [id]);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#64748b] mb-4">{t('campaignDetail.campaignNotFound')}</p>
        <button
          onClick={() => navigate('/dashboard/agency/campaigns')}
          className="text-[#547792] hover:underline"
        >
          {t('campaignDetail.backToCampaigns')}
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
          {t('campaignDetail.backToCampaigns')}
        </button>
      </div>

      <PageHeader
        title={campaign.name}
        subtitle={t('campaignDetail.campaignFor', { type: campaign.type, client: campaign.client })}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}>
              {getStatusIcon(campaign.status)}
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              {t('campaignDetail.editCampaign')}
            </button>
          </div>
        }
      />

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('campaignDetail.totalBudget')}
          value={formatCurrency(campaign.budget.total)}
          icon={DollarSign}
          trend={{ value: t('campaignDetail.used', { percent: budgetProgress.toFixed(0) }), type: budgetProgress > 80 ? 'down' : 'neutral' }}
        />
        <StatsCard
          title={t('campaignDetail.amountSpent')}
          value={formatCurrency(campaign.budget.spent)}
          icon={Target}
          trend={{ value: t('campaignDetail.remaining', { amount: formatCurrency(campaign.budget.remaining) }), type: 'neutral' }}
        />
        <StatsCard
          title={t('campaignDetail.performance')}
          value={`${performance >= 0 ? '+' : ''}${performance.toFixed(0)}%`}
          icon={TrendingUp}
          trend={{ value: performance >= 0 ? t('campaignDetail.performingWell') : t('campaignDetail.needsAttention'), type: performance >= 0 ? 'up' : 'down' }}
        />
        <StatsCard
          title={t('campaignDetail.duration')}
          value={t('campaignDetail.days', { count: Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24)) })}
          icon={Calendar}
          trend={{ value: `${campaign.startDate} - ${campaign.endDate}`, type: 'neutral' }}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Campaign Details */}
        <div className="space-y-6">
          {/* Campaign Info */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('campaignDetail.campaignInformation')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.client')}</span>
                <span className="text-white">{campaign.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.campaignType')}</span>
                <span className="text-white">{campaign.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.accountDirector')}</span>
                <span className="text-white">{campaign.accountDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.creativeDirector')}</span>
                <span className="text-white">{campaign.creativeDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.startDate')}</span>
                <span className="text-white">{campaign.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.endDate')}</span>
                <span className="text-white">{campaign.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('campaignDetail.status')}</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                  {getStatusIcon(campaign.status)}
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('campaignDetail.budgetOverview')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#64748b]">{t('campaignDetail.budgetUsage')}</span>
                  <span className="text-white">{budgetProgress.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#1e1e2e]">
                  <div
                    className={`h-full rounded-full ${
                      budgetProgress > 90
                        ? 'bg-red-500'
                        : budgetProgress > 70
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-[#547792] to-[#94B4C1]'
                    }`}
                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('campaignDetail.totalBudget')}</p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(campaign.budget.total)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('campaignDetail.spent')}</p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(campaign.budget.spent)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('campaignDetail.remainingLabel')}</p>
                  <p className="text-xl font-semibold text-emerald-400">{formatCurrency(campaign.budget.remaining)}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('campaignDetail.performanceLabel')}</p>
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
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('campaignDetail.kpi')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-[#547792]" />
                  <span className="text-xs text-[#64748b]">{t('campaignDetail.impressions')}</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.impressions?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  {t('campaignDetail.target', { value: formatNumber(campaign.kpis.impressions?.target || 0) })}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#94B4C1]" />
                  <span className="text-xs text-[#64748b]">{t('campaignDetail.reach')}</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.reach?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  {t('campaignDetail.target', { value: formatNumber(campaign.kpis.reach?.target || 0) })}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-[#64748b]">{t('campaignDetail.engagement')}</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.engagement?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  {t('campaignDetail.target', { value: formatNumber(campaign.kpis.engagement?.target || 0) })}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-[#64748b]">{t('campaignDetail.conversions')}</span>
                </div>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(campaign.kpis.conversions?.actual || 0)}
                </p>
                <p className="text-xs text-[#64748b] mt-1">
                  {t('campaignDetail.target', { value: formatNumber(campaign.kpis.conversions?.target || 0) })}
                </p>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('campaignDetail.channelPerformance')}</h3>
            <div className="space-y-4">
              {campaign.channels.map((channel, index) => (
                <div key={channel} className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">{channel}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-[#1e1e2e]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#547792] to-[#94B4C1]"
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
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('campaignDetail.campaignTeam')}</h3>
            <div className="space-y-3">
              {campaign.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] text-sm font-medium text-white">
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
