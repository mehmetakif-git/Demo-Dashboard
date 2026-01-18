import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  DollarSign,
  MapPin,
  MoreVertical,
  TrendingDown,
  Warehouse,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { materials, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Materials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(materials.map(m => m.category))];
  }, []);

  const stats = useMemo(() => {
    const total = materials.length;
    const lowStock = materials.filter(m => m.currentStock <= m.minStock).length;
    const totalValue = materials.reduce((acc, m) => acc + (m.currentStock * m.unitCost), 0);
    const categoryCount = new Set(materials.map(m => m.category)).size;

    return { total, lowStock, totalValue, categoryCount };
  }, []);

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;

      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = material.currentStock <= material.minStock;
      } else if (stockFilter === 'out') {
        matchesStock = material.currentStock === 0;
      } else if (stockFilter === 'in-stock') {
        matchesStock = material.currentStock > material.minStock;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, categoryFilter, stockFilter]);

  const getStockStatus = (material: typeof materials[0]) => {
    if (material.currentStock === 0) return { label: 'Out of Stock', color: '#ef4444' };
    if (material.currentStock <= material.minStock) return { label: 'Low Stock', color: '#f59e0b' };
    return { label: 'In Stock', color: '#10b981' };
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M QAR`;
    }
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials & Inventory"
        subtitle="Manage construction materials and stock levels"
        icon={Package}
        actions={
          <Button>
            <Plus size={18} />
            Add Material
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.total, icon: Package, color: CONSTRUCTION_COLOR },
          { label: 'Low Stock Alerts', value: stats.lowStock, icon: AlertTriangle, color: stats.lowStock > 0 ? '#ef4444' : '#10b981' },
          { label: 'Total Value', value: formatCurrency(stats.totalValue), icon: DollarSign, color: '#3b82f6' },
          { label: 'Categories', value: stats.categoryCount, icon: Warehouse, color: '#8b5cf6' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
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
              placeholder="Search by material name or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'in-stock', label: 'In Stock' },
              { id: 'low', label: 'Low Stock' },
              { id: 'out', label: 'Out of Stock' },
            ].map((filter) => (
              <Button
                key={filter.id}
                variant={stockFilter === filter.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStockFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Materials Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Material</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Category</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Stock</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Unit Cost</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Total Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Supplier</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((material, index) => {
                const stockStatus = getStockStatus(material);
                const stockPercent = Math.min((material.currentStock / material.maxStock) * 100, 100);

                return (
                  <motion.tr
                    key={material.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${CONSTRUCTION_COLOR}20` }}
                        >
                          <Package size={20} style={{ color: CONSTRUCTION_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{material.name}</p>
                          <p className="text-xs text-text-muted">{material.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{material.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-center">
                        <p className="font-medium text-text-primary">{material.currentStock.toLocaleString()}</p>
                        <div className="w-20 mx-auto mt-1 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${stockPercent}%`,
                              backgroundColor: stockStatus.color,
                            }}
                          />
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">
                          Min: {material.minStock} | Max: {material.maxStock}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${stockStatus.color}20`, color: stockStatus.color }}
                      >
                        {stockStatus.label === 'Low Stock' && <TrendingDown size={12} />}
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-text-primary">{material.unitCost.toLocaleString()} QAR</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium" style={{ color: CONSTRUCTION_COLOR }}>
                        {formatCurrency(material.currentStock * material.unitCost)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-text-primary">{material.supplier}</p>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <MapPin size={10} />
                          {material.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'view', label: 'View Details', onClick: () => {} },
                          { id: 'edit', label: 'Edit Material', onClick: () => {} },
                          { id: 'restock', label: 'Restock', onClick: () => {} },
                          { id: 'allocate', label: 'Allocate to Project', onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredMaterials.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No materials found</p>
        </Card>
      )}
    </div>
  );
};

export default Materials;
