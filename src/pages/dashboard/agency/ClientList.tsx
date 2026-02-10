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
  Building2,
  Mail,
  Phone,
  DollarSign,
  Star,
  Crown,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  agencyClients,
  agencyStats,
  formatCurrency,
  getClientTierColor,
} from '@/data/agency/agencyData';
import { getCompanyLogo } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const ClientList = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  const filteredClients = useMemo(() => {
    return agencyClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
      const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
      return matchesSearch && matchesTier && matchesIndustry;
    });
  }, [searchTerm, tierFilter, industryFilter]);

  const industries = [...new Set(agencyClients.map((c) => c.industry))];
  const tiers = ['platinum', 'gold', 'silver', 'bronze'];

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Crown className="h-3 w-3" />;
      case 'gold':
        return <Star className="h-3 w-3 fill-current" />;
      case 'silver':
        return <Star className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  const totalRevenue = agencyClients.reduce((sum, c) => sum + c.ytdRevenue, 0);
  const avgRating = agencyClients.reduce((sum, c) => sum + c.rating, 0) / agencyClients.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('agency.clients', 'Clients')}
        subtitle="Manage your agency's client portfolio"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Client
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Clients"
          value={agencyStats.activeClients.toString()}
          icon={Building2}
          trend={{ value: '+2 this quarter', type: 'up' }}
        />
        <StatsCard
          title="YTD Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend={{ value: '+12%', type: 'up' }}
        />
        <StatsCard
          title="Avg Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          trend={{ value: 'Out of 5', type: 'up' }}
        />
        <StatsCard
          title="Active Campaigns"
          value={agencyStats.activeCampaigns.toString()}
          icon={Building2}
          trend={{ value: 'Across all clients', type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Tiers</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const tierColor = getClientTierColor(client.tier);
          return (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#547792]/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/dashboard/agency/clients/${client.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const companyLogo = getCompanyLogo(client.name);
                    if (companyLogo) {
                      return (
                        <img
                          src={companyLogo}
                          alt={client.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      );
                    }
                    return (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20">
                        <Building2 className="h-6 w-6 text-[#547792]" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-semibold text-white">{client.name}</h3>
                    <p className="text-xs text-[#64748b]">{client.industry}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tierColor}`}>
                  {getTierIcon(client.tier)}
                  {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#64748b]" />
                  <span className="text-[#94a3b8]">{client.primaryContact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-[#64748b]" />
                  <span className="text-[#94a3b8]">{client.primaryContact.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                <div>
                  <p className="text-xs text-[#64748b]">YTD Revenue</p>
                  <p className="text-sm font-semibold text-white">{formatCurrency(client.ytdRevenue)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Active Campaigns</p>
                  <p className="text-sm font-semibold text-white">{client.activeCampaigns}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Rating</p>
                  <p className="text-sm font-semibold text-emerald-400">{client.rating}/5</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Contract</p>
                  <p className="text-sm font-semibold text-white">{client.contractType.charAt(0).toUpperCase() + client.contractType.slice(1)}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/agency/clients/${client.id}`);
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
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Showing {filteredClients.length} of {agencyClients.length} clients
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Previous
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};
