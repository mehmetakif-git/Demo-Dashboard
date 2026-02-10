import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Building2,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Target,
  Star,
  Crown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  agencyClients,
  campaigns,
  formatCurrency,
  getClientTierColor,
  getCampaignStatusColor,
} from '@/data/agency/agencyData';
import { useTranslation } from 'react-i18next';

export const ClientDetail = () => {
  const { t: _t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();

  const client = useMemo(() => {
    return agencyClients.find((c) => c.id === id);
  }, [id]);

  const clientCampaigns = useMemo(() => {
    if (!client) return [];
    return campaigns.filter((c) => c.client === client.name);
  }, [client]);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#64748b] mb-4">Client not found</p>
        <button
          onClick={() => navigate('/dashboard/agency/clients')}
          className="text-[#547792] hover:underline"
        >
          Back to Clients
        </button>
      </div>
    );
  }

  const tierColor = getClientTierColor(client.tier);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Crown className="h-4 w-4" />;
      case 'gold':
        return <Star className="h-4 w-4 fill-current" />;
      default:
        return <Star className="h-4 w-4" />;
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
          onClick={() => navigate('/dashboard/agency/clients')}
          className="flex items-center gap-2 text-[#64748b] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Clients
        </button>
      </div>

      <PageHeader
        title={client.name}
        subtitle={`${client.industry} - Client since ${client.contractStart}`}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${tierColor}`}>
              {getTierIcon(client.tier)}
              {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)} Client
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              Edit Client
            </button>
          </div>
        }
      />

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Lifetime Value"
          value={formatCurrency(client.lifetimeValue)}
          icon={DollarSign}
          trend={{ value: '+18% vs last year', type: 'up' }}
        />
        <StatsCard
          title="Active Campaigns"
          value={client.activeCampaigns.toString()}
          icon={Target}
          trend={{ value: `${client.totalCampaigns} total`, type: 'neutral' }}
        />
        <StatsCard
          title="YTD Revenue"
          value={formatCurrency(client.ytdRevenue)}
          icon={TrendingUp}
          trend={{ value: 'This year', type: 'up' }}
        />
        <StatsCard
          title="Account Director"
          value={client.accountTeam.accountDirector}
          icon={Users}
          trend={{ value: 'Primary contact', type: 'neutral' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Building2 className="h-5 w-5 text-[#547792]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Company</p>
                  <p className="text-white">{client.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Mail className="h-5 w-5 text-[#94B4C1]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Email</p>
                  <p className="text-white">{client.primaryContact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Phone className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Phone</p>
                  <p className="text-white">{client.primaryContact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Globe className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">Website</p>
                  <p className="text-white">{client.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Client Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Industry</span>
                <span className="text-white">{client.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Client Tier</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tierColor}`}>
                  {getTierIcon(client.tier)}
                  {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Contract Type</span>
                <span className="text-white">{client.contractType.charAt(0).toUpperCase() + client.contractType.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Contract Start</span>
                <span className="text-white">{client.contractStart}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Account Director</span>
                <span className="text-white">{client.accountTeam.accountDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Total Campaigns</span>
                <span className="text-white">{client.totalCampaigns}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Campaigns */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
              <button className="text-sm text-[#547792] hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {clientCampaigns.length > 0 ? (
                clientCampaigns.slice(0, 4).map((campaign) => {
                  const statusColor = getCampaignStatusColor(campaign.status);
                  return (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] cursor-pointer transition-colors"
                      onClick={() => navigate(`/dashboard/agency/campaigns/${campaign.id}`)}
                    >
                      <div>
                        <p className="font-medium text-white">{campaign.name}</p>
                        <p className="text-xs text-[#64748b]">{campaign.type}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white">{formatCurrency(campaign.budget.total)}</p>
                          <p className="text-xs text-[#64748b]">Budget</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-[#64748b] mx-auto mb-3" />
                  <p className="text-[#64748b]">No campaigns found for this client</p>
                </div>
              )}
            </div>
          </div>

          {/* Revenue History */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">Lifetime Value</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(client.lifetimeValue)}</p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">YTD Revenue</p>
                <p className="text-xl font-semibold text-emerald-400">{formatCurrency(client.ytdRevenue)}</p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">Avg. Campaign</p>
                <p className="text-xl font-semibold text-white">
                  {formatCurrency(client.lifetimeValue / client.totalCampaigns)}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">Rating</p>
                <p className="text-xl font-semibold text-[#547792]">{client.rating}/5</p>
              </div>
            </div>
          </div>

          {/* Services Used */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Services Used</h3>
            <div className="flex flex-wrap gap-2">
              {client.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-[#1a1a24] px-3 py-1.5 text-sm text-[#94a3b8]"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Brands</h3>
            <div className="flex flex-wrap gap-2">
              {client.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 px-3 py-1.5 text-sm text-white"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
