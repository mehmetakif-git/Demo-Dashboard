import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Warehouse,
  Search,
  Download,
  Upload,
  AlertTriangle,
  Package,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  Minus,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { products, stockMovements } from '@/data/ecommerce/ecommerceData';
import { useTranslation } from 'react-i18next';

export const Inventory = () => {
  const { t } = useTranslation('ecommerce');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  const stats = {
    totalSKUs: products.reduce((acc, p) => acc + Math.max(1, p.variants.length), 0),
    lowStock: products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0),
  };

  // Flatten products with variants for inventory view
  const inventoryItems = useMemo(() => {
    const items: Array<{
      productId: string;
      productName: string;
      sku: string;
      variantName: string | null;
      stock: number;
      reserved: number;
      available: number;
      lowThreshold: number;
      status: 'in-stock' | 'low-stock' | 'out-of-stock';
    }> = [];

    products.forEach(product => {
      if (product.variants.length > 0) {
        product.variants.forEach(variant => {
          const status = variant.stock === 0 ? 'out-of-stock' : variant.stock <= 5 ? 'low-stock' : 'in-stock';
          items.push({
            productId: product.id,
            productName: product.name,
            sku: variant.sku,
            variantName: variant.name,
            stock: variant.stock,
            reserved: 0,
            available: variant.stock,
            lowThreshold: 5,
            status,
          });
        });
      } else {
        const status = product.stock === 0 ? 'out-of-stock' : product.stock <= product.lowStockThreshold ? 'low-stock' : 'in-stock';
        items.push({
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          variantName: null,
          stock: product.stock,
          reserved: 0,
          available: product.stock,
          lowThreshold: product.lowStockThreshold,
          status,
        });
      }
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        stockFilter === 'all' ||
        (stockFilter === 'low' && item.status === 'low-stock') ||
        (stockFilter === 'out' && item.status === 'out-of-stock');

      return matchesSearch && matchesFilter;
    });
  }, [inventoryItems, searchQuery, stockFilter]);

  const getStockFilterLabel = (filter: string) => {
    switch (filter) {
      case 'all': return t('inventory.filterAll');
      case 'low': return t('inventory.filterLowStock');
      case 'out': return t('inventory.filterOutOfStock');
      default: return filter;
    }
  };

  const getStockStatusLabel = (status: string) => {
    switch (status) {
      case 'out-of-stock': return t('inventory.statusOutOfStock');
      case 'low-stock': return t('inventory.statusLowStock');
      default: return t('inventory.statusInStock');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('inventory.title')}
        subtitle={t('inventory.subtitle')}
        icon={Warehouse}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Upload size={18} />
              {t('inventory.importCsv')}
            </Button>
            <Button variant="secondary">
              <Download size={18} />
              {t('inventory.export')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <p className="text-sm text-text-secondary">{t('inventory.totalSkus')}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{stats.totalSKUs}</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-4 cursor-pointer hover:border-warning/50 transition-colors" onClick={() => setStockFilter('low')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{t('inventory.lowStock')}</p>
                <p className="text-2xl font-bold text-warning mt-1">{stats.lowStock}</p>
              </div>
              <AlertTriangle size={24} className="text-warning" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4 cursor-pointer hover:border-error/50 transition-colors" onClick={() => setStockFilter('out')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{t('inventory.outOfStock')}</p>
                <p className="text-2xl font-bold text-error mt-1">{stats.outOfStock}</p>
              </div>
              <Package size={24} className="text-error" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4">
            <p className="text-sm text-text-secondary">{t('inventory.totalValue')}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{stats.totalValue.toLocaleString()} QAR</p>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('inventory.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'low', 'out'] as const).map((filter) => (
              <Button
                key={filter}
                variant={stockFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStockFilter(filter)}
              >
                {getStockFilterLabel(filter)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-secondary">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.product')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.sku')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.variant')}</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.stock')}</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.reserved')}</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.available')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.status')}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={`${item.productId}-${item.sku}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-border-default hover:bg-background-secondary/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-text-primary">{item.productName}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-text-secondary font-mono">{item.sku}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-text-secondary">{item.variantName || '-'}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`font-semibold ${
                      item.status === 'out-of-stock' ? 'text-error' :
                      item.status === 'low-stock' ? 'text-warning' : 'text-text-primary'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm text-text-secondary">{item.reserved}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm text-text-primary">{item.available}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'out-of-stock' ? 'bg-error/20 text-error' :
                      item.status === 'low-stock' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                    }`}>
                      {getStockStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" title={t('inventory.addStock')}>
                        <Plus size={16} className="text-success" />
                      </Button>
                      <Button variant="ghost" size="sm" title={t('inventory.removeStock')}>
                        <Minus size={16} className="text-error" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Warehouse size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">{t('inventory.noItemsFound')}</p>
          </div>
        )}
      </Card>

      {/* Recent Stock Movements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{t('inventory.recentStockMovements')}</h3>
        <div className="space-y-3">
          {stockMovements.slice(0, 5).map((movement, index) => (
            <motion.div
              key={movement.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background-secondary"
            >
              <div className="flex items-center gap-3">
                {movement.type === 'in' ? (
                  <ArrowUpCircle size={20} className="text-success" />
                ) : (
                  <ArrowDownCircle size={20} className="text-error" />
                )}
                <div>
                  <p className="font-medium text-text-primary">{movement.productName}</p>
                  <p className="text-xs text-text-muted">
                    {movement.variantName} • {movement.reason} • {movement.reference}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${movement.type === 'in' ? 'text-success' : 'text-error'}`}>
                  {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                </p>
                <p className="text-xs text-text-muted">
                  {new Date(movement.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
