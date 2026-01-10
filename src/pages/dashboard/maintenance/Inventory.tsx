import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  LayoutGrid,
  List,
  RefreshCw,
  ShoppingCart,
  TrendingDown,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  sparePartsInventory,
  formatCurrency,
  getStatusColor,
  type SparePart,
} from '@/data/maintenanceData';

export const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const stats = useMemo(() => {
    const totalValue = sparePartsInventory.reduce((sum, p) => sum + (p.quantity * p.unitCost), 0);
    return {
      totalItems: sparePartsInventory.length,
      inStock: sparePartsInventory.filter(p => p.status === 'in-stock').length,
      lowStock: sparePartsInventory.filter(p => p.status === 'low-stock').length,
      outOfStock: sparePartsInventory.filter(p => p.status === 'out-of-stock').length,
      totalValue,
    };
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(sparePartsInventory.map(p => p.category))];
    return cats;
  }, []);

  const filteredParts = useMemo(() => {
    let filtered = [...sparePartsInventory];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedCategory]);

  const getStatusBadge = (status: SparePart['status']) => {
    const config = {
      'in-stock': { bg: 'bg-green-500/20', text: 'text-green-400', label: 'In Stock', icon: CheckCircle },
      'low-stock': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Low Stock', icon: AlertTriangle },
      'out-of-stock': { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Out of Stock', icon: XCircle },
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <c.icon size={12} />
        {c.label}
      </span>
    );
  };

  const getStockLevel = (quantity: number, minQuantity: number) => {
    const percentage = (quantity / minQuantity) * 100;
    if (percentage === 0) return { width: '0%', color: 'bg-red-500' };
    if (percentage <= 100) return { width: `${percentage}%`, color: 'bg-yellow-500' };
    return { width: '100%', color: 'bg-green-500' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spare Parts Inventory"
        subtitle="Track and manage maintenance spare parts"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<ShoppingCart size={16} />}>
              Create Order
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              Add Part
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Items"
          value={stats.totalItems.toString()}
          icon={Package}
          iconColor="#547792"
        />
        <StatsCard
          title="In Stock"
          value={stats.inStock.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Low Stock"
          value={stats.lowStock.toString()}
          icon={TrendingDown}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Out of Stock"
          value={stats.outOfStock.toString()}
          icon={XCircle}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
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

      {/* Inventory Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredParts.map((part, index) => {
            const stockLevel = getStockLevel(part.quantity, part.minQuantity);
            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-5 hover:shadow-lg transition-all group">
                  {/* Status Indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                    style={{ backgroundColor: getStatusColor(part.status) }}
                  />

                  <div className="pt-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary text-sm">{part.name}</h3>
                        <p className="text-xs text-text-secondary font-mono">{part.sku}</p>
                      </div>
                      <button className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit size={14} className="text-text-secondary" />
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-3">
                      {getStatusBadge(part.status)}
                    </div>

                    {/* Quantity */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Quantity</span>
                        <span className="text-text-primary font-medium">
                          {part.quantity} / {part.minQuantity} min
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stockLevel.color} transition-all`}
                          style={{ width: stockLevel.width }}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-xs text-text-secondary mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{part.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Cost</span>
                        <span className="text-text-primary">{formatCurrency(part.unitCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Value</span>
                        <span className="text-text-primary">{formatCurrency(part.quantity * part.unitCost)}</span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="pt-3 border-t border-white/[0.08]">
                      <span className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary">
                        {part.category}
                      </span>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Part</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Min Qty</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Unit Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredParts.map((part, index) => (
                  <motion.tr
                    key={part.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(part.status)}20` }}
                        >
                          <Package size={16} style={{ color: getStatusColor(part.status) }} />
                        </div>
                        <span className="font-medium text-text-primary">{part.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary font-mono">{part.sku}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary">
                        {part.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{part.location}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${
                        part.quantity === 0 ? 'text-red-400' :
                        part.quantity <= part.minQuantity ? 'text-yellow-400' : 'text-text-primary'
                      }`}>
                        {part.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{part.minQuantity}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{formatCurrency(part.unitCost)}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{formatCurrency(part.quantity * part.unitCost)}</td>
                    <td className="py-3 px-4">{getStatusBadge(part.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400">
                          <RefreshCw size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredParts.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No parts found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
