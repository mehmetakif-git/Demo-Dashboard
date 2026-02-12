import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Gift,
  DollarSign,
  Clock,
  Scissors,
  Tag,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  packages,
  getServiceById,
  formatDuration,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { useTranslation } from 'react-i18next';

export const Packages = () => {
  const { t } = useTranslation('beauty');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(
    () => ({
      totalPackages: packages.length,
      activePackages: packages.filter((p) => p.status === 'active').length,
      avgDiscount: Math.round(
        packages.reduce((sum, p) => sum + Math.round((p.savings / p.regularPrice) * 100), 0) / packages.length
      ),
      avgValue: Math.round(packages.reduce((sum, p) => sum + p.packagePrice, 0) / packages.length),
    }),
    []
  );

  const filteredPackages = useMemo(() => {
    let filtered = [...packages];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedStatus === 'active') {
      filtered = filtered.filter((p) => p.status === 'active');
    } else if (selectedStatus === 'inactive') {
      filtered = filtered.filter((p) => p.status === 'inactive');
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const getPackageServices = (pkg: typeof packages[0]) => {
    return pkg.services.map((id) => getServiceById(id)).filter(Boolean);
  };

  const getTotalDuration = (pkg: typeof packages[0]) => {
    const pkgServices = getPackageServices(pkg);
    return pkgServices.reduce((sum, s) => sum + (s?.duration || 0), 0);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('packages.title')}
        subtitle={t('packages.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('packages.createPackage')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('packages.totalPackages')}
          value={stats.totalPackages.toString()}
          icon={Gift}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('packages.active')}
          value={stats.activePackages.toString()}
          icon={Gift}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('packages.avgDiscount')}
          value={`${stats.avgDiscount}%`}
          icon={Tag}
          iconColor="#ec4899"
        />
        <StatsCard
          title={t('packages.avgValue')}
          value={formatCurrency(stats.avgValue)}
          icon={DollarSign}
          iconColor="#8b5cf6"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('packages.searchPackages')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('packages.allStatus')}</option>
            <option value="active">{t('packages.activeStatus')}</option>
            <option value="inactive">{t('packages.inactive')}</option>
          </select>
        </div>
      </Card>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => {
          const pkgServices = getPackageServices(pkg);

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:border-white/[0.15] transition-all">
                {/* Package Header */}
                <div className="p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-text-primary">{pkg.name}</h3>
                        {pkg.status === 'inactive' && (
                          <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded">
                            {t('packages.inactive')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{pkg.description}</p>
                    </div>
                    <button className="p-2 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-3">
                    <p className="text-3xl font-bold text-text-primary">
                      {formatCurrency(pkg.packagePrice)}
                    </p>
                    <div className="mb-1">
                      <p className="text-sm text-text-muted line-through">
                        {formatCurrency(pkg.regularPrice)}
                      </p>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                        {t('packages.save', { percent: Math.round((pkg.savings / pkg.regularPrice) * 100) })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-6">
                  {/* Duration & Validity */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock size={14} className="text-text-muted" />
                      {formatDuration(getTotalDuration(pkg))}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Tag size={14} className="text-text-muted" />
                      {t('packages.validDays', { days: pkg.validityDays })}
                    </div>
                  </div>

                  {/* Included Services */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-text-muted mb-2">{t('packages.includedServices')}</h4>
                    <div className="space-y-2">
                      {pkgServices.map((service) =>
                        service ? (
                          <div
                            key={service.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Scissors size={12} className="text-pink-400" />
                            <span className="text-text-secondary">{service.name}</span>
                            <span className="text-text-muted">
                              ({formatDuration(service.duration)})
                            </span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/[0.08]">
                    <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Edit size={14} />}>
                      {t('staffDetail.edit')}
                    </Button>
                    <Button size="sm" className="flex-1">
                      {pkg.status === 'active' ? t('packages.deactivate') : t('packages.activate')}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredPackages.length === 0 && (
        <Card className="p-12 text-center">
          <Gift size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('packages.noPackagesFound')}</p>
        </Card>
      )}
    </div>
  );
};
