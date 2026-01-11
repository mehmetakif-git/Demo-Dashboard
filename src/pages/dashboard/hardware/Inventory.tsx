import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  DollarSign,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  products,
  categories,
  hardwareStats,
  formatCurrency,
} from '@/data/hardware/hardwareData';

export const Inventory = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'low' | 'critical' | 'out'>('all');

  const stats = hardwareStats;

  const filteredProducts = useMemo(() => {
    switch (selectedFilter) {
      case 'low':
        return products.filter((p) => p.status === 'low-stock');
      case 'critical':
        return products.filter((p) => p.status === 'critical');
      case 'out':
        return products.filter((p) => p.currentStock === 0);
      default:
        return products;
    }
  }, [selectedFilter]);

  // Calculate inventory value by category
  const categoryValues = useMemo(() => {
    return categories.map((cat) => {
      const catProducts = products.filter((p) => p.categoryId.startsWith(cat.id));
      const value = catProducts.reduce((sum, p) => sum + p.currentStock * p.costPrice, 0);
      return { name: cat.name, value, productCount: catProducts.length };
    }).sort((a, b) => b.value - a.value);
  }, []);

  const maxValue = Math.max(...categoryValues.map((c) => c.value));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Overview"
        subtitle="Monitor stock levels and inventory value"
        actions={
          <Button leftIcon={<ClipboardList size={16} />}>Start Stock Count</Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Inventory Value"
          value={formatCurrency(stats.totalInventoryValue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockItems.toString()}
          icon={AlertTriangle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Critical Stock"
          value={stats.criticalStockItems.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Value by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Inventory Value by Category</h3>
          <div className="space-y-4">
            {categoryValues.slice(0, 8).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">{category.name}</span>
                  <span className="font-medium text-text-primary">{formatCurrency(category.value)}</span>
                </div>
                <div className="h-2 bg-white/[0.1] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.value / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Quick Filters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Stock Status Summary</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`p-4 rounded-lg transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-amber-500/20 border border-amber-500/50'
                  : 'bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <p className="text-2xl font-semibold text-text-primary">{products.length}</p>
              <p className="text-sm text-text-muted">All Products</p>
            </button>
            <button
              onClick={() => setSelectedFilter('low')}
              className={`p-4 rounded-lg transition-all cursor-pointer ${
                selectedFilter === 'low'
                  ? 'bg-amber-500/20 border border-amber-500/50'
                  : 'bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <p className="text-2xl font-semibold text-amber-400">
                {products.filter((p) => p.status === 'low-stock').length}
              </p>
              <p className="text-sm text-text-muted">Low Stock</p>
            </button>
            <button
              onClick={() => setSelectedFilter('critical')}
              className={`p-4 rounded-lg transition-all cursor-pointer ${
                selectedFilter === 'critical'
                  ? 'bg-red-500/20 border border-red-500/50'
                  : 'bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <p className="text-2xl font-semibold text-red-400">
                {products.filter((p) => p.status === 'critical').length}
              </p>
              <p className="text-sm text-text-muted">Critical Stock</p>
            </button>
            <button
              onClick={() => setSelectedFilter('out')}
              className={`p-4 rounded-lg transition-all cursor-pointer ${
                selectedFilter === 'out'
                  ? 'bg-gray-500/20 border border-gray-500/50'
                  : 'bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <p className="text-2xl font-semibold text-gray-400">
                {products.filter((p) => p.currentStock === 0).length}
              </p>
              <p className="text-sm text-text-muted">Out of Stock</p>
            </button>
          </div>

          {/* Filtered Products List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredProducts.slice(0, 10).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                    <Package size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      product.currentStock <= product.minStock ? 'text-red-400' : 'text-text-primary'
                    }`}
                  >
                    {product.currentStock}
                  </p>
                  <p className="text-xs text-text-muted">/ {product.maxStock}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <div className="p-4 border-b border-white/[0.08]">
          <h3 className="font-semibold text-text-primary">Inventory Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredProducts.map((product, index) => {
                const stockValue = product.currentStock * product.costPrice;
                const stockPercentage = (product.currentStock / product.maxStock) * 100;

                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-white/[0.03]"
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
                    <td className="py-3 px-4 text-text-secondary">{product.categoryName}</td>
                    <td className="py-3 px-4">
                      <div className="w-24">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text-primary">{product.currentStock}</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.1] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stockPercentage > 50 ? 'bg-emerald-500' : stockPercentage > 25 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${stockPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-primary">{formatCurrency(stockValue)}</td>
                    <td className="py-3 px-4 text-text-muted">{product.location}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
