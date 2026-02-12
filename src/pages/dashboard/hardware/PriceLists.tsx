import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Tag,
  DollarSign,
  Edit,
  Trash2,
  Package,
  MoreVertical,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  priceLists,
  products,
  formatCurrency,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

export const PriceLists = () => {
  const { t } = useTranslation('hardware');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const stats = useMemo(() => ({
    totalLists: priceLists.length,
    activeLists: priceLists.filter((pl) => pl.status === 'active').length,
    avgDiscount: Math.round(
      priceLists.reduce((sum, pl) => sum + (pl.discountPercent || 0), 0) / priceLists.length
    ),
    totalProducts: products.length,
  }), []);

  const filteredLists = useMemo(() => {
    let filtered = [...priceLists];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pl) =>
          pl.name.toLowerCase().includes(query) ||
          pl.description.toLowerCase().includes(query) ||
          pl.code.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((pl) => pl.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const selectedListData = selectedList
    ? priceLists.find((pl) => pl.id === selectedList)
    : null;

  // Get sample products with discounted prices
  const getDiscountedProducts = (discountPercent: number) => {
    return products.slice(0, 8).map((product) => ({
      ...product,
      discountedPrice: product.retailPrice * (1 - discountPercent / 100),
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('priceLists.title')}
        subtitle={t('priceLists.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('priceLists.newPriceList')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('priceLists.totalPriceLists')}
          value={stats.totalLists.toString()}
          icon={Tag}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('priceLists.activeLists')}
          value={stats.activeLists.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('priceLists.avgDiscount')}
          value={`${stats.avgDiscount}%`}
          icon={DollarSign}
          iconColor="#6366f1"
        />
        <StatsCard
          title={t('priceLists.totalProducts')}
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#0ea5e9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Lists Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filter Bar */}
          <Card className="p-4">
            <Input
              placeholder={t('priceLists.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />

            <div className="flex gap-2 mt-4">
              {(['all', 'active', 'inactive'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${
                    selectedStatus === status
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </Card>

          {/* Price Lists */}
          <div className="space-y-3">
            {filteredLists.map((priceList, index) => (
              <motion.div
                key={priceList.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selectedList === priceList.id
                      ? 'border-amber-500/50'
                      : 'hover:border-white/[0.15]'
                  }`}
                  onClick={() => setSelectedList(priceList.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Tag size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{priceList.name}</h4>
                        <p className="text-xs text-text-muted">{priceList.code}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === priceList.id ? null : priceList.id);
                        }}
                        className="p-2 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdown === priceList.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-background-secondary border border-white/[0.08] rounded-lg shadow-lg z-10">
                          <button className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                            <Edit size={14} /> {t('priceLists.edit')}
                          </button>
                          <button className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                            <Copy size={14} /> {t('priceLists.duplicate')}
                          </button>
                          <button className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                            <Trash2 size={14} /> {t('priceLists.delete')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-text-muted mb-3 line-clamp-2">{priceList.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-semibold">{priceList.discountPercent}% {t('priceLists.off')}</span>
                      {priceList.minOrderValue && (
                        <span className="text-text-muted">{t('priceLists.min')}: {formatCurrency(priceList.minOrderValue)}</span>
                      )}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-xs capitalize ${
                        priceList.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {priceList.status}
                    </span>
                  </div>

                  {priceList.isDefault && (
                    <div className="mt-3 pt-3 border-t border-white/[0.08]">
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">{t('priceLists.defaultPriceList')}</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}

            {filteredLists.length === 0 && (
              <Card className="p-8 text-center">
                <Tag size={32} className="mx-auto mb-3 text-text-muted" />
                <p className="text-text-secondary">{t('priceLists.noPriceLists')}</p>
              </Card>
            )}
          </div>
        </div>

        {/* Price List Details */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            {selectedListData ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-1">
                      {selectedListData.name}
                    </h3>
                    <p className="text-text-muted">{selectedListData.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" leftIcon={<Edit size={14} />}>
                      {t('priceLists.edit')}
                    </Button>
                  </div>
                </div>

                {/* Price List Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('priceLists.code')}</p>
                    <p className="font-medium text-text-primary">{selectedListData.code}</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('priceLists.discount')}</p>
                    <p className="font-medium text-amber-400">{selectedListData.discountPercent}%</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('priceLists.minOrder')}</p>
                    <p className="font-medium text-text-primary">
                      {selectedListData.minOrderValue ? formatCurrency(selectedListData.minOrderValue) : 'None'}
                    </p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('priceLists.statusLabel')}</p>
                    <span
                      className={`px-2 py-0.5 rounded text-xs capitalize ${
                        selectedListData.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {selectedListData.status}
                    </span>
                  </div>
                </div>

                {/* Sample Products with Discount Applied */}
                <div className="border-t border-white/[0.08] pt-4">
                  <h4 className="font-semibold text-text-primary mb-4">{t('priceLists.sampleProductPricing')}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.08]">
                          <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('priceLists.product')}</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('priceLists.sku')}</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('priceLists.original')}</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('priceLists.listPrice')}</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('priceLists.savings')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-default">
                        {getDiscountedProducts(selectedListData.discountPercent).map((product, index) => {
                          const savings = product.retailPrice - product.discountedPrice;
                          return (
                            <motion.tr
                              key={product.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.03 }}
                              className="hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                                    <Package size={14} className="text-amber-400" />
                                  </div>
                                  <span className="font-medium text-text-primary">{product.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-text-muted font-mono text-sm">{product.sku}</td>
                              <td className="py-3 px-4 text-right text-text-muted line-through">
                                {formatCurrency(product.retailPrice)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <span className="font-semibold text-amber-400">
                                  {formatCurrency(product.discountedPrice)}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <span className="text-emerald-400">
                                  -{selectedListData.discountPercent}% ({formatCurrency(savings)})
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Tag size={48} className="mx-auto mb-4 text-text-muted" />
                <p className="text-text-secondary">{t('priceLists.selectPriceList')}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
