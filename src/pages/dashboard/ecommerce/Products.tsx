import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Plus,
  Grid3X3,
  List,
  Star,
  AlertTriangle,
  Eye,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { products, categories, productStatuses } from '@/data/ecommerce/ecommerceData';

export const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const stats = [
    { label: 'Total Products', value: products.length, color: '#6366f1' },
    { label: 'Active', value: products.filter(p => p.status === 'active').length, color: '#10b981' },
    { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, color: '#ef4444' },
    { label: 'Low Stock', value: products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length, color: '#f59e0b' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || product.categoryId.startsWith(categoryFilter);

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const getStockStatus = (product: typeof products[0]) => {
    if (product.stock === 0) return { label: 'Out of Stock', color: '#ef4444' };
    if (product.stock <= product.lowStockThreshold) return { label: 'Low Stock', color: '#f59e0b' };
    return { label: 'In Stock', color: '#10b981' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        icon={Package}
        actions={
          <Button>
            <Plus size={18} />
            Add Product
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <p className="text-sm text-text-secondary">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              <option value="all">All Status</option>
              {productStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List size={18} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Products View */}
      {viewMode === 'table' ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-secondary">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Product</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">SKU</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Stock</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border-default hover:bg-background-secondary/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/dashboard/ecommerce/products/${product.id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-background-tertiary flex items-center justify-center">
                            <Package size={20} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{product.name}</p>
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <Star size={12} className="text-warning fill-warning" />
                              {product.rating} ({product.reviewCount})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-text-secondary font-mono">{product.sku}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-text-secondary">{product.categoryName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="text-sm font-semibold text-text-primary">
                            {product.price.toLocaleString()} QAR
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-text-muted line-through ml-2">
                              {product.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {product.stock <= product.lowStockThreshold && product.stock > 0 && (
                            <AlertTriangle size={14} className="text-warning" />
                          )}
                          <span
                            className="text-sm font-medium"
                            style={{ color: stockStatus.color }}
                          >
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/dashboard/ecommerce/products/${product.id}`)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Dropdown
                            trigger={
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            }
                            items={[
                              { id: 'edit', label: 'Edit', onClick: () => {} },
                              { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
                              { id: 'archive', label: 'Archive', onClick: () => {} },
                            ]}
                          />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => {
            const stockStatus = getStockStatus(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-accent-primary/50 transition-all"
                  onClick={() => navigate(`/dashboard/ecommerce/products/${product.id}`)}
                >
                  <div className="aspect-square rounded-lg bg-background-secondary flex items-center justify-center mb-4">
                    <Package size={48} className="text-text-muted" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-text-primary line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-text-muted">{product.sku}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-text-primary">
                        {product.price.toLocaleString()} QAR
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-warning fill-warning" />
                        <span className="text-sm text-text-secondary">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{ backgroundColor: `${stockStatus.color}20`, color: stockStatus.color }}
                      >
                        {product.stock} in stock
                      </span>
                      <StatusBadge status={product.status} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No products found</p>
        </Card>
      )}
    </div>
  );
};

export default Products;
