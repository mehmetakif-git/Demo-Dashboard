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
  const { t } = useTranslation('agency');
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
        <p className="text-[#64748b] mb-4">{t('clientDetail.clientNotFound')}</p>
        <button
          onClick={() => navigate('/dashboard/agency/clients')}
          className="text-[#547792] hover:underline"
        >
          {t('clientDetail.backToClients')}
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
          {t('clientDetail.backToClients')}
        </button>
      </div>

      <PageHeader
        title={client.name}
        subtitle={`${client.industry} - ${t('clientDetail.clientSince', { date: client.contractStart })}`}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${tierColor}`}>
              {getTierIcon(client.tier)}
              {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)} {t('clientDetail.client')}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              {t('clientDetail.editClient')}
            </button>
          </div>
        }
      />

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('clientDetail.lifetimeValue')}
          value={formatCurrency(client.lifetimeValue)}
          icon={DollarSign}
          trend={{ value: t('clientDetail.vsLastYear'), type: 'up' }}
        />
        <StatsCard
          title={t('clientDetail.activeCampaigns')}
          value={client.activeCampaigns.toString()}
          icon={Target}
          trend={{ value: t('clientDetail.totalCampaigns', { count: client.totalCampaigns }), type: 'neutral' }}
        />
        <StatsCard
          title={t('clientDetail.ytdRevenue')}
          value={formatCurrency(client.ytdRevenue)}
          icon={TrendingUp}
          trend={{ value: t('clientDetail.thisYear'), type: 'up' }}
        />
        <StatsCard
          title={t('clientDetail.accountDirector')}
          value={client.accountTeam.accountDirector}
          icon={Users}
          trend={{ value: t('clientDetail.primaryContact'), type: 'neutral' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('clientDetail.contactInformation')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Building2 className="h-5 w-5 text-[#547792]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">{t('clientDetail.company')}</p>
                  <p className="text-white">{client.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Mail className="h-5 w-5 text-[#94B4C1]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">{t('clientDetail.email')}</p>
                  <p className="text-white">{client.primaryContact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Phone className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">{t('clientDetail.phone')}</p>
                  <p className="text-white">{client.primaryContact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                  <Globe className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b]">{t('clientDetail.website')}</p>
                  <p className="text-white">{client.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('clientDetail.clientDetails')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.industry')}</span>
                <span className="text-white">{client.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.clientTier')}</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tierColor}`}>
                  {getTierIcon(client.tier)}
                  {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.contractType')}</span>
                <span className="text-white">{client.contractType.charAt(0).toUpperCase() + client.contractType.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.contractStart')}</span>
                <span className="text-white">{client.contractStart}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.accountDirector')}</span>
                <span className="text-white">{client.accountTeam.accountDirector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('clientDetail.totalCampaignsLabel')}</span>
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
              <h3 className="text-lg font-semibold text-white">{t('clientDetail.activeCampaigns')}</h3>
              <button className="text-sm text-[#547792] hover:underline">{t('clientDetail.viewAll')}</button>
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
                          <p className="text-xs text-[#64748b]">{t('clientDetail.budget')}</p>
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
                  <p className="text-[#64748b]">{t('clientDetail.noCampaigns')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Revenue History */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('clientDetail.revenueSummary')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">{t('clientDetail.lifetimeValue')}</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(client.lifetimeValue)}</p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">{t('clientDetail.ytdRevenue')}</p>
                <p className="text-xl font-semibold text-emerald-400">{formatCurrency(client.ytdRevenue)}</p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">{t('clientDetail.avgCampaign')}</p>
                <p className="text-xl font-semibold text-white">
                  {formatCurrency(client.lifetimeValue / client.totalCampaigns)}
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <p className="text-xs text-[#64748b] mb-1">{t('clientList.rating')}</p>
                <p className="text-xl font-semibold text-[#547792]">{client.rating}/5</p>
              </div>
            </div>
          </div>

          {/* Services Used */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('clientDetail.servicesUsed')}</h3>
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
            <h3 className="text-lg font-semibold text-white mb-4">{t('clientDetail.brands')}</h3>
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
