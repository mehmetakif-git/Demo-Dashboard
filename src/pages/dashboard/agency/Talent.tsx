import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  MoreHorizontal,
  Users,
  Star,
  Crown,
  Instagram,
  Youtube,
  Twitter,
  Sparkles,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  talent,
  formatNumber,
  formatCurrency,
  getTalentTierColor,
} from '@/data/agency/agencyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Talent = () => {
  const { t } = useTranslation('agency');
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTalent = useMemo(() => {
    return talent.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = tierFilter === 'all' || item.tier === tierFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [searchTerm, tierFilter, categoryFilter]);

  const categories = [...new Set(talent.map((item) => item.category))];
  const tiers = ['mega', 'macro', 'micro', 'nano'];

  const totalFollowers = talent.reduce((sum, item) => sum + item.totalFollowers, 0);
  const avgEngagement = talent.reduce((sum, item) => sum + item.avgEngagement, 0) / talent.length;
  const totalContracts = talent.reduce((sum, item) => sum + item.currentContracts.length, 0);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'mega':
        return <Crown className="h-3 w-3" />;
      case 'macro':
        return <Star className="h-3 w-3 fill-current" />;
      case 'micro':
        return <Star className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
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
        title={t('talent.title')}
        subtitle={t('talent.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            {t('talent.addTalent')}
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('talent.totalTalent')}
          value={talent.length.toString()}
          icon={Users}
          trend={{ value: '+5 this month', type: 'up' }}
        />
        <StatsCard
          title={t('talent.totalReach')}
          value={formatNumber(totalFollowers)}
          icon={TrendingUp}
          trend={{ value: '+18% growth', type: 'up' }}
        />
        <StatsCard
          title={t('talent.avgEngagement')}
          value={`${avgEngagement.toFixed(1)}%`}
          icon={Sparkles}
          trend={{ value: t('talent.aboveIndustryAvg'), type: 'up' }}
        />
        <StatsCard
          title={t('talent.activeContracts')}
          value={totalContracts.toString()}
          icon={DollarSign}
          trend={{ value: `${talent.length} talent`, type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder={t('talent.searchTalent')}
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
            <option value="all">{t('talent.allTiers')}</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('talent.allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            {t('talent.moreFilters')}
          </button>
        </div>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTalent.map((item) => {
          const tierColor = getTalentTierColor(item.tier);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#547792]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const profileImg = getProfileImage(item.name);
                    if (profileImg) {
                      return (
                        <img
                          src={profileImg}
                          alt={item.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      );
                    }
                    return (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] text-lg font-semibold text-white">
                        {item.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-xs text-[#64748b]">{item.category}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tierColor}`}>
                  {getTierIcon(item.tier)}
                  {item.tier.charAt(0).toUpperCase() + item.tier.slice(1)}
                </span>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.platforms.map((platform) => (
                  <span
                    key={platform.platform}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1a24] px-2.5 py-1 text-xs text-[#94a3b8]"
                  >
                    {getPlatformIcon(platform.platform)}
                    {formatNumber(platform.followers)}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-white/[0.08]">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{formatNumber(item.totalFollowers)}</p>
                  <p className="text-xs text-[#64748b]">{t('talent.followers')}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-emerald-400">{item.avgEngagement}%</p>
                  <p className="text-xs text-[#64748b]">{t('talent.engagement')}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{item.currentContracts.length}</p>
                  <p className="text-xs text-[#64748b]">{t('talent.contracts')}</p>
                </div>
              </div>

              {/* Rate */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#64748b] text-sm">{t('talent.ratePerPost')}</span>
                <span className="text-white font-semibold">
                  {typeof item.rate.instagramPost === 'number'
                    ? formatCurrency(item.rate.instagramPost)
                    : item.rate.instagramPost || t('talent.negotiable')}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#64748b] text-sm">{t('talent.status')}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : item.status === 'prospect'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
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
          {t('talent.showing', { filtered: filteredTalent.length, total: talent.length })}
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('talent.previous')}
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('talent.next')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
