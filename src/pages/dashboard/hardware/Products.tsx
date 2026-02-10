import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  DollarSign,
  Grid,
  List,
  Eye,
  Edit,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  products,
  categories,
  hardwareStats,
  formatCurrency,
  getStatusColor,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

export const Products = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const stats = hardwareStats;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.barcode.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory || p.categoryId.startsWith(selectedCategory));
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus]);

  const getStockIndicator = (product: typeof products[0]) => {
    if (product.currentStock <= 0) return { color: 'bg-gray-500', text: 'Out of Stock' };
    if (product.currentStock <= product.minStock) return { color: 'bg-red-500', text: 'Critical' };
    if (product.currentStock <= product.reorderPoint) return { color: 'bg-amber-500', text: 'Low' };
    return { color: 'bg-emerald-500', text: 'In Stock' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('hardware.products', 'Products')}
        subtitle="Manage your product catalog"
        actions={<Button leftIcon={<Plus size={16} />}>Add Product</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Low Stock"
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
        <StatsCard
          title="Inventory Value"
          value={formatCurrency(stats.totalInventoryValue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px] max-w-md">
              <Input
                placeholder="Search by name, SKU, barcode..."
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
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="critical">Critical</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/[0.05] text-text-muted hover:bg-white/[0.08]'
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/[0.05] text-text-muted hover:bg-white/[0.08]'
              }`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Products View */}
      {viewMode === 'table' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Retail</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredProducts.map((product, index) => {
                  const stockIndicator = getStockIndicator(product);
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
                          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <Package size={18} className="text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{product.name}</p>
                            <p className="text-xs text-text-muted">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-muted font-mono text-sm">{product.sku}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-white/[0.05] rounded text-sm text-text-secondary">
                          {product.categoryName}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${stockIndicator.color}`} />
                          <span className="text-text-primary">{product.currentStock}</span>
                          <span className="text-text-muted text-sm">/ {product.maxStock}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{formatCurrency(product.costPrice)}</td>
                      <td className="py-3 px-4 text-text-primary font-medium">{formatCurrency(product.retailPrice)}</td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: `${getStatusColor(product.status)}20`,
                            color: getStatusColor(product.status),
                          }}
                        >
                          {stockIndicator.text}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Eye size={14} />}
                            onClick={() => navigate(`/dashboard/hardware/products/${product.id}`)}
                          >
                            View
                          </Button>
                          <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                            Edit
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => {
            const stockIndicator = getStockIndicator(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:border-white/[0.15] transition-all cursor-pointer">
                  <div className="w-full h-32 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <Package size={48} className="text-amber-400" />
                  </div>
                  <h3 className="font-medium text-text-primary mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-text-muted mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-amber-400">{formatCurrency(product.retailPrice)}</span>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${stockIndicator.color}`} />
                      <span className="text-sm text-text-secondary">{product.currentStock} in stock</span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/dashboard/hardware/products/${product.id}`)}
                  >
                    View Details
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No products found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
