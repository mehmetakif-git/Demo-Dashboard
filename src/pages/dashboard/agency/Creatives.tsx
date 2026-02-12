import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Download,
  Image,
  Video,
  FileText,
  Music,
  Palette,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  creativeAssets,
  getAssetStatusColor,
} from '@/data/agency/agencyData';
import { getCreativeThumbnail } from '@/utils/creativeImages';
import { useTranslation } from 'react-i18next';

export const Creatives = () => {
  const { t } = useTranslation('agency');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAssets = useMemo(() => {
    return creativeAssets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || asset.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const types = [...new Set(creativeAssets.map((a) => a.type))];
  const statuses = [...new Set(creativeAssets.map((a) => a.status))];

  const totalAssets = creativeAssets.length;
  const approvedAssets = creativeAssets.filter((a) => a.status === 'approved').length;
  const draftAssets = creativeAssets.filter((a) => a.status === 'draft').length;
  const inReviewAssets = creativeAssets.filter((a) => a.status === 'in-review').length;

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'audio':
        return <Music className="h-5 w-5" />;
      default:
        return <Palette className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'live':
        return <CheckCircle className="h-3 w-3" />;
      case 'in-review':
        return <Clock className="h-3 w-3" />;
      case 'draft':
      case 'archived':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
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
        title={t('creatives.title')}
        subtitle={t('creatives.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            {t('creatives.uploadAsset')}
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('creatives.totalAssets')}
          value={totalAssets.toString()}
          icon={Palette}
          trend={{ value: '+12 this month', type: 'up' }}
        />
        <StatsCard
          title={t('creatives.approved')}
          value={approvedAssets.toString()}
          icon={CheckCircle}
          trend={{ value: `${((approvedAssets / totalAssets) * 100).toFixed(0)}%`, type: 'up' }}
        />
        <StatsCard
          title={t('creatives.draft')}
          value={draftAssets.toString()}
          icon={Clock}
          trend={{ value: t('creatives.inProgress'), type: 'neutral' }}
        />
        <StatsCard
          title={t('creatives.inReview')}
          value={inReviewAssets.toString()}
          icon={Eye}
          trend={{ value: t('creatives.beingReviewed'), type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder={t('creatives.searchAssets')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('creatives.allTypes')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('creatives.allStatus')}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            {t('creatives.moreFilters')}
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => {
          const statusColor = getAssetStatusColor(asset.status);

          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#547792]/50 transition-colors"
            >
              {/* Preview Area */}
              <div className="aspect-video bg-[#1a1a24] flex items-center justify-center relative overflow-hidden">
                {(() => {
                  const thumbnail = getCreativeThumbnail(asset.id);
                  if (thumbnail) {
                    return (
                      <img
                        src={thumbnail}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    );
                  }
                  return (
                    <div className={`flex items-center justify-center h-16 w-16 rounded-xl ${
                      asset.type === 'image' ? 'bg-blue-500/20 text-blue-400' :
                      asset.type === 'video' ? 'bg-red-500/20 text-red-400' :
                      asset.type === 'document' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-[#547792]/20 text-[#547792]'
                    }`}>
                      {getTypeIcon(asset.type)}
                    </div>
                  );
                })()}
                <span className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                  {getStatusIcon(asset.status)}
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white truncate mb-1">{asset.name}</h3>
                <p className="text-xs text-[#64748b] mb-3">{asset.client}</p>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[#64748b]">{asset.format.toUpperCase()}</span>
                  <span className="text-[#64748b]">{asset.resolution}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {asset.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#1e1e2e] px-2 py-0.5 text-xs text-[#94a3b8]"
                    >
                      {tag}
                    </span>
                  ))}
                  {asset.tags.length > 3 && (
                    <span className="rounded-full bg-[#1e1e2e] px-2 py-0.5 text-xs text-[#64748b]">
                      +{asset.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <span className="text-xs text-[#64748b]">{asset.createdAt}</span>
                  <div className="flex gap-1">
                    <button className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          {t('creatives.showing', { filtered: filteredAssets.length, total: creativeAssets.length })}
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('creatives.previous')}
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('creatives.next')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
