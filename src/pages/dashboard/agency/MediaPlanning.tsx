import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  MoreHorizontal,
  Tv,
  Radio,
  Globe,
  Smartphone,
  DollarSign,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  mediaPlans,
  formatCurrency,
} from '@/data/agency/agencyData';

export const MediaPlanning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPlans = useMemo(() => {
    return mediaPlans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
      const planChannels = plan.channels.map(c => c.channel.toLowerCase());
      const matchesChannel = channelFilter === 'all' || planChannels.includes(channelFilter.toLowerCase());
      const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [searchTerm, channelFilter, statusFilter]);

  const channels = [...new Set(mediaPlans.flatMap((p) => p.channels.map(c => c.channel)))];
  const statuses = [...new Set(mediaPlans.map((p) => p.status))];

  const totalBudget = mediaPlans.reduce((sum, p) => sum + p.totalBudget, 0);
  const totalSpent = mediaPlans.reduce((sum, p) => sum + p.spent, 0);
  const totalImpressions = mediaPlans.reduce((sum, p) => sum + p.channels.reduce((s, c) => s + (c.impressions || 0), 0), 0);
  const avgCPM = totalImpressions > 0 ? totalSpent / (totalImpressions / 1000) : 0;

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'tv':
        return <Tv className="h-4 w-4" />;
      case 'radio':
        return <Radio className="h-4 w-4" />;
      case 'digital':
        return <Globe className="h-4 w-4" />;
      case 'social':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'planned':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-[#6366f1]/20 text-[#6366f1]';
      default:
        return 'bg-[#1e1e2e] text-[#94a3b8]';
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
        title="Media Planning"
        subtitle="Plan and manage media placements across channels"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            New Media Plan
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          icon={DollarSign}
          trend={{ value: '+18%', type: 'up' }}
        />
        <StatsCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          icon={TrendingUp}
          trend={{ value: `${((totalSpent / totalBudget) * 100).toFixed(0)}% utilized`, type: 'neutral' }}
        />
        <StatsCard
          title="Total Impressions"
          value={`${(totalImpressions / 1000000).toFixed(1)}M`}
          icon={Eye}
          trend={{ value: '+25% reach', type: 'up' }}
        />
        <StatsCard
          title="Avg CPM"
          value={`$${avgCPM.toFixed(2)}`}
          icon={BarChart3}
          trend={{ value: 'Industry avg: $12', type: 'up' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search media plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#6366f1] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Media Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => {
          const statusColor = getStatusColor(plan.status);
          const budgetProgress = plan.totalBudget > 0 ? (plan.spent / plan.totalBudget) * 100 : 0;
          const planImpressions = plan.channels.reduce((sum, c) => sum + (c.impressions || 0), 0);
          const primaryChannel = plan.channels[0]?.channel || 'Multi-Channel';

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-[#6366f1]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20">
                    {getChannelIcon(primaryChannel)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{plan.name}</h3>
                    <p className="text-xs text-[#64748b]">{plan.campaignName}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">Channels</span>
                  <span className="text-white flex items-center gap-1.5">
                    {plan.channels.length} channels
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">Client</span>
                  <span className="text-white">{plan.client}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">Period</span>
                  <span className="text-white">{plan.flightDates.start} - {plan.flightDates.end}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e1e2e]">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-[#64748b]">Budget Usage</span>
                  <span className="text-xs text-white">{budgetProgress.toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#1e1e2e] mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#64748b]">Budget</p>
                    <p className="text-sm font-semibold text-white">{formatCurrency(plan.totalBudget)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">Impressions</p>
                    <p className="text-sm font-semibold text-white">{(planImpressions / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#1e1e2e]">
                <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Showing {filteredPlans.length} of {mediaPlans.length} media plans
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
    </motion.div>
  );
};
