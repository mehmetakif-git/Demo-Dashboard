import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingDown,
  ShoppingCart,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { ingredients } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const RestaurantInventory = () => {
  const { t } = useTranslation('restaurant');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(ingredients.map(i => i.category))];
    return ['all', ...uniqueCategories];
  }, []);

  const stats = useMemo(() => ({
    totalItems: ingredients.length,
    inStock: ingredients.filter(i => i.status === 'in-stock').length,
    lowStock: ingredients.filter(i => i.status === 'low-stock').length,
    outOfStock: ingredients.filter(i => i.status === 'out-of-stock').length,
  }), []);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return CheckCircle;
      case 'low-stock': return AlertTriangle;
      case 'out-of-stock': return XCircle;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-success';
      case 'low-stock': return 'text-warning';
      case 'out-of-stock': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('inventory.title')}
        subtitle={t('inventory.subtitle')}
        icon={Package}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">
              <ShoppingCart size={18} />
              {t('inventory.purchaseOrder')}
            </Button>
            <Button>
              <Plus size={18} />
              {t('inventory.addItem')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('inventory.totalItems'), value: stats.totalItems, icon: Package, color: '#f97316', filter: 'all' },
          { label: t('inventory.inStock'), value: stats.inStock, icon: CheckCircle, color: '#10b981', filter: 'in-stock' },
          { label: t('inventory.lowStock'), value: stats.lowStock, icon: AlertTriangle, color: '#f59e0b', filter: 'low-stock' },
          { label: t('inventory.outOfStock'), value: stats.outOfStock, icon: XCircle, color: '#ef4444', filter: 'out-of-stock' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const isActive = statusFilter === stat.filter;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-[#f97316]' : 'hover:bg-background-secondary'}`}
                onClick={() => setStatusFilter(stat.filter)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
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
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'all' ? t('inventory.allCategories') : cat}
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
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.item')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.category')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.stock')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.minStock')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.unitCost')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.supplier')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.status')}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">{t('inventory.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((item, index) => {
                const StatusIcon = getStatusIcon(item.status);
                const stockPercent = (item.currentStock / item.minStock) * 100;

                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border-default hover:bg-background-secondary/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          item.status === 'in-stock' ? 'bg-success/20' :
                          item.status === 'low-stock' ? 'bg-warning/20' : 'bg-error/20'
                        }`}>
                          <StatusIcon size={16} className={getStatusColor(item.status)} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{item.name}</p>
                          {item.expiryDate && (
                            <p className="text-xs text-text-muted flex items-center gap-1">
                              <Calendar size={10} />
                              {t('inventory.exp', { date: new Date(item.expiryDate).toLocaleDateString() })}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-secondary">{item.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.currentStock} {item.unit}
                        </p>
                        <div className="w-20 h-1.5 bg-background-tertiary rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stockPercent > 100 ? 'bg-success' :
                              stockPercent > 50 ? 'bg-warning' : 'bg-error'
                            }`}
                            style={{ width: `${Math.min(stockPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-muted">{item.minStock} {item.unit}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-primary">{item.unitCost} QAR</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-secondary">{item.supplier}</span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'edit', label: t('inventory.editItem'), onClick: () => {} },
                          { id: 'restock', label: t('inventory.restock'), onClick: () => {} },
                          { id: 'adjust', label: t('inventory.adjustStock'), onClick: () => {} },
                          { id: 'history', label: t('inventory.viewHistory'), onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">{t('inventory.noItemsFound')}</p>
          </div>
        )}
      </Card>

      {/* Low Stock Alerts */}
      {stats.lowStock > 0 || stats.outOfStock > 0 ? (
        <Card className="p-4 border-2 border-warning">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-warning" />
            <h3 className="font-semibold text-text-primary">{t('inventory.stockAlerts')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ingredients
              .filter(i => i.status !== 'in-stock')
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingDown size={16} className={getStatusColor(item.status)} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{item.name}</p>
                      <p className="text-xs text-text-muted">
                        {item.currentStock} / {item.minStock} {item.unit}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    {t('inventory.reorder')}
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default RestaurantInventory;
