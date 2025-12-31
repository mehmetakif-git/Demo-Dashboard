import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  MoreHorizontal,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  Play,
  Pause,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  campaigns,
  agencyStats,
  formatCurrency,
  getCampaignStatusColor,
} from '@/data/agency/agencyData';

export const CampaignList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const campaignTypes = [...new Set(campaigns.map((c) => c.type))];
  const campaignStatuses = ['planning', 'active', 'paused', 'completed', 'cancelled'];

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget.total, 0);
  const avgROI = campaigns.length > 0
    ? campaigns.reduce((sum, c) => {
        const impressionsTarget = c.kpis.impressions?.target || 0;
        const impressionsActual = c.kpis.impressions?.actual || 0;
        return sum + (impressionsTarget > 0 ? ((impressionsActual / impressionsTarget) * 100) - 100 : 0);
      }, 0) / campaigns.length
    : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-3 w-3" />;
      case 'paused':
        return <Pause className="h-3 w-3" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Target className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title="Campaigns"
        subtitle="Manage all marketing and advertising campaigns"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Campaigns"
          value={agencyStats.activeCampaigns.toString()}
          icon={Target}
          trend={{ value: '+3 this month', type: 'up' }}
        />
        <StatsCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          icon={DollarSign}
          trend={{ value: '+15%', type: 'up' }}
        />
        <StatsCard
          title="Performance"
          value={`${avgROI >= 0 ? '+' : ''}${avgROI.toFixed(0)}%`}
          icon={TrendingUp}
          trend={{ value: 'vs target', type: avgROI >= 0 ? 'up' : 'down' }}
        />
        <StatsCard
          title="Planning"
          value={campaigns.filter((c) => c.status === 'planning').length.toString()}
          icon={Calendar}
          trend={{ value: 'In pipeline', type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#6366f1] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Status</option>
            {campaignStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Types</option>
            {campaignTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Channels
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredCampaigns.map((campaign) => {
                const statusColor = getCampaignStatusColor(campaign.status);
                const progressPercent = (campaign.budget.spent / campaign.budget.total) * 100;

                return (
                  <tr
                    key={campaign.id}
                    className="hover:bg-[#1a1a24] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/agency/campaigns/${campaign.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{campaign.name}</p>
                        <p className="text-xs text-[#64748b]">
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94a3b8]">{campaign.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#1e1e2e] px-2.5 py-1 text-xs text-[#94a3b8]">
                        {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}
                      >
                        {getStatusIcon(campaign.status)}
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white">{formatCurrency(campaign.budget.total)}</p>
                        <p className="text-xs text-[#64748b]">
                          Spent: {formatCurrency(campaign.budget.spent)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#64748b]">{progressPercent.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#1e1e2e]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-32">
                        {campaign.channels.slice(0, 2).map((channel) => (
                          <span key={channel} className="text-xs text-[#64748b]">{channel}</span>
                        ))}
                        {campaign.channels.length > 2 && (
                          <span className="text-xs text-[#64748b]">+{campaign.channels.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/agency/campaigns/${campaign.id}`);
                          }}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#1e1e2e] px-6 py-4">
          <p className="text-sm text-[#64748b]">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              Previous
            </button>
            <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
