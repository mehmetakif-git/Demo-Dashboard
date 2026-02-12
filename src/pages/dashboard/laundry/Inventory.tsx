import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  Edit,
  TrendingDown,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  inventory,
  formatCurrency,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Inventory = () => {
  const { t } = useTranslation('laundry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = ['detergent', 'softener', 'stain-remover', 'packaging', 'supplies', 'equipment'];

  const stats = useMemo(() => ({
    totalItems: inventory.length,
    lowStock: inventory.filter((i) => i.status === 'low-stock').length,
    outOfStock: inventory.filter((i) => i.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, i) => sum + i.currentStock * i.unitCost, 0),
  }), []);

  const filteredInventory = useMemo(() => {
    let filtered = [...inventory];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.sku.toLowerCase().includes(query) ||
          i.supplier.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((i) => i.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((i) => i.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'low-stock':
        return 'bg-amber-500/20 text-amber-400';
      case 'out-of-stock':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStockPercentage = (item: typeof inventory[0]) => {
    return Math.round((item.currentStock / item.maxStock) * 100);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('inventory.title')}
        subtitle={t('inventory.subtitle')}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<ShoppingCart size={16} />}>
              {t('inventory.purchaseOrder')}
            </Button>
            <Button leftIcon={<Plus size={16} />}>{t('inventory.addItem')}</Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('inventory.totalItems')}
          value={stats.totalItems.toString()}
          icon={Package}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title={t('inventory.lowStock')}
          value={stats.lowStock.toString()}
          icon={TrendingDown}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('inventory.outOfStock')}
          value={stats.outOfStock.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
        <StatsCard
          title={t('inventory.totalValue')}
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
      </div>

      {/* Alert for Low Stock */}
      {stats.lowStock + stats.outOfStock > 0 && (
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-amber-400" />
            <div>
              <p className="font-medium text-text-primary">{t('inventory.inventoryAlert')}</p>
              <p className="text-sm text-text-secondary">
                {t('inventory.inventoryAlertDesc', { lowStock: stats.lowStock, outOfStock: stats.outOfStock })}
              </p>
            </div>
            <Button variant="secondary" size="sm" className="ml-auto">
              {t('inventory.viewAll')}
            </Button>
          </div>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('inventory.searchPlaceholder')}
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
            <option value="all">{t('inventory.allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">{t('inventory.allStatus')}</option>
            <option value="in-stock">{t('inventory.statusInStock')}</option>
            <option value="low-stock">{t('inventory.statusLowStock')}</option>
            <option value="out-of-stock">{t('inventory.statusOutOfStock')}</option>
          </select>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.item')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.sku')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.category')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.stockLevel')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.unitCost')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.supplier')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('inventory.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredInventory.map((item, index) => {
                const stockPercentage = getStockPercentage(item);

                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                          <Package size={18} className="text-sky-400" />
                        </div>
                        <span className="font-medium text-text-primary">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-muted font-mono text-sm">{item.sku}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-white/[0.05] rounded text-sm text-text-secondary capitalize">
                        {item.category.split('-').join(' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text-primary">
                            {item.currentStock} / {item.maxStock} {item.unit}
                          </span>
                        </div>
                        <div className="h-2 bg-white/[0.1] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              stockPercentage > 50
                                ? 'bg-emerald-500'
                                : stockPercentage > 25
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${stockPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-primary">{formatCurrency(item.unitCost)}</td>
                    <td className="py-3 px-4 text-text-secondary">{item.supplier}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                        {item.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                          {t('inventory.edit')}
                        </Button>
                        <Button variant="secondary" size="sm" leftIcon={<ShoppingCart size={14} />}>
                          {t('inventory.reorder')}
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

      {filteredInventory.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('inventory.noItemsFound')}</p>
        </Card>
      )}
    </div>
  );
};
