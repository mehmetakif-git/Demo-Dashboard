import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Shirt,
  Clock,
  DollarSign,
  Zap,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  serviceCategories,
  services,
  garmentTypes,
  formatCurrency,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Services = () => {
  const { t } = useTranslation('laundry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'services' | 'garments'>('services');

  const stats = useMemo(() => ({
    totalServices: services.length,
    activeServices: services.filter((s) => s.status === 'active').length,
    categories: serviceCategories.length,
    avgPrice: Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length * 100) / 100,
  }), []);

  const filteredServices = useMemo(() => {
    let filtered = [...services];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(query));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.categoryId === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('services.addService')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('services.totalServices')}
          value={stats.totalServices.toString()}
          icon={Shirt}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title={t('services.activeServices')}
          value={stats.activeServices.toString()}
          icon={Shirt}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('services.categories')}
          value={stats.categories.toString()}
          icon={Clock}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('services.avgPrice')}
          value={formatCurrency(stats.avgPrice)}
          icon={DollarSign}
          iconColor="#f59e0b"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/[0.03] rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'services'
              ? 'bg-accent-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {t('services.servicesTab')}
        </button>
        <button
          onClick={() => setActiveTab('garments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'garments'
              ? 'bg-accent-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {t('services.garmentTypesTab')}
        </button>
      </div>

      {activeTab === 'services' ? (
        <>
          {/* Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px] max-w-md">
                <Input
                  placeholder={t('services.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="all">{t('services.allCategories')}</option>
                {serviceCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* Services by Category */}
          {serviceCategories.map((category) => {
            const categoryServices = filteredServices.filter((s) => s.categoryId === category.id);
            if (categoryServices.length === 0 && selectedCategory === 'all') return null;
            if (selectedCategory !== 'all' && selectedCategory !== category.id) return null;

            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <Shirt size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{category.name}</h3>
                  <span className="text-sm text-text-muted">({t('services.servicesCount', { count: categoryServices.length })})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-5 hover:border-white/[0.15] transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-text-primary">{service.name}</h4>
                              {service.status === 'inactive' && (
                                <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded">
                                  {t('services.inactive')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-muted">{service.description}</p>
                          </div>
                          <button className="p-2 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer">
                            <MoreVertical size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-text-muted mb-1">{t('services.regular')}</p>
                            <p className="text-lg font-bold text-text-primary">{formatCurrency(service.price)}</p>
                            <p className="text-xs text-text-muted">{t('services.days', { count: service.turnaroundDays })}</p>
                          </div>
                          <div>
                            <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                              <Zap size={12} className="text-amber-400" />
                              {t('services.express')}
                            </p>
                            <p className="text-lg font-bold text-amber-400">{formatCurrency(service.expressPrice)}</p>
                            <p className="text-xs text-text-muted">{service.expressTurnaroundHours}h</p>
                          </div>
                        </div>

                        <Button variant="secondary" size="sm" className="w-full" leftIcon={<Edit size={14} />}>
                          {t('services.editService')}
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        /* Garment Types Tab */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('services.garment')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('services.category')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('services.defaultPrice')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('services.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {garmentTypes.map((garment, index) => (
                  <motion.tr
                    key={garment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                          <Shirt size={18} className="text-sky-400" />
                        </div>
                        <span className="font-medium text-text-primary">{garment.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-white/[0.05] rounded text-sm text-text-secondary capitalize">
                        {garment.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {formatCurrency(garment.defaultPrice)}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                        {t('services.editButton')}
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
