import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  LayoutGrid,
  List,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  products,
  formatCurrency,
  type BeautyProduct,
} from '@/data/beauty/beautyData';
import { getProductImage } from '@/utils/productImages';
import { useTranslation } from 'react-i18next';

export const Products = () => {
  const { t } = useTranslation('beauty');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories;
  }, []);

  const stats = useMemo(
    () => ({
      totalProducts: products.length,
      inStock: products.filter((p) => p.stock > 0).length,
      lowStock: products.filter((p) => p.stock <= p.lowStockThreshold && p.stock > 0).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    }),
    []
  );

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const getStockStatus = (product: BeautyProduct) => {
    if (product.stock === 0) {
      return { label: t('products.outOfStock'), color: 'bg-red-500/20 text-red-400' };
    }
    if (product.stock <= product.lowStockThreshold) {
      return { label: t('products.lowStock'), color: 'bg-amber-500/20 text-amber-400' };
    }
    return { label: t('products.inStock'), color: 'bg-emerald-500/20 text-emerald-400' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('products.title')}
        subtitle={t('products.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('products.addProduct')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('products.totalProducts')}
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('products.inStock')}
          value={stats.inStock.toString()}
          icon={Package}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('products.lowStock')}
          value={stats.lowStock.toString()}
          icon={AlertTriangle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('products.outOfStock')}
          value={stats.outOfStock.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px] max-w-md">
              <Input
                placeholder={t('products.searchProducts')}
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
              <option value="all">{t('products.allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => {
            const stockStatus = getStockStatus(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:border-white/[0.15] transition-all">
                  {/* Product Image */}
                  <div className="aspect-square bg-white/[0.03] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {getProductImage(product.id) ? (
                      <img
                        src={getProductImage(product.id)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package size={48} className="text-text-muted" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-text-muted">{product.brand}</p>
                        <h3 className="font-medium text-text-primary line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <button className="p-1 rounded hover:bg-white/[0.05] text-text-muted cursor-pointer">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-text-muted">{t('products.sku')}: {product.sku}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-text-primary">
                        {formatCurrency(product.price)}
                      </p>
                      <span className={`px-2 py-0.5 rounded text-xs ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08] text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">{t('products.stock')}:</span>
                        <span className="text-text-primary">{t('products.stockUnits', { count: product.stock })}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.product')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.sku')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.category')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.cost')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.price')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.stock')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    {t('products.statusLabel')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-white/[0.05] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-white/[0.03] flex items-center justify-center overflow-hidden">
                            {getProductImage(product.id) ? (
                              <img
                                src={getProductImage(product.id)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package size={18} className="text-text-muted" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{product.name}</p>
                            <p className="text-xs text-text-muted">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{product.sku}</td>
                      <td className="py-3 px-4 text-text-secondary">{product.category}</td>
                      <td className="py-3 px-4 text-text-secondary">
                        {formatCurrency(product.costPrice)}
                      </td>
                      <td className="py-3 px-4 text-text-primary font-medium">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="py-3 px-4 text-text-primary">{product.stock}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 text-xs rounded ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                            {t('staffDetail.edit')}
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('products.noProductsFound')}</p>
        </Card>
      )}
    </div>
  );
};
