import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  MapPin,
  DollarSign,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Truck,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { rawMaterials, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(rawMaterials.map(m => m.category))];
  }, []);

  const stats = useMemo(() => {
    const totalMaterials = rawMaterials.length;
    const totalValue = rawMaterials.reduce((acc, m) => acc + (m.currentStock * m.unitCost), 0);
    const lowStockAlerts = rawMaterials.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').length;
    const categoriesCount = new Set(rawMaterials.map(m => m.category)).size;

    return { totalMaterials, totalValue, lowStockAlerts, categoriesCount };
  }, []);

  const filteredMaterials = useMemo(() => {
    return rawMaterials.filter(material => {
      const matchesSearch = material.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || material.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-stock': '#10b981',
      'low-stock': '#f59e0b',
      'out-of-stock': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return CheckCircle;
      case 'low-stock': return AlertTriangle;
      case 'out-of-stock': return XCircle;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Raw Materials Inventory"
        subtitle="Manage raw materials and stock levels"
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
          { label: 'Total Materials', value: stats.totalMaterials, icon: Package, color: MANUFACTURING_COLOR },
          { label: 'Total Value', value: `QAR ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: 'Low Stock Alerts', value: stats.lowStockAlerts, icon: AlertTriangle, color: stats.lowStockAlerts > 0 ? '#ef4444' : '#10b981' },
          { label: 'Categories', value: stats.categoriesCount, icon: Package, color: '#3b82f6' },
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
              placeholder="Search by code, name, or supplier..."
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
            {['all', 'in-stock', 'low-stock', 'out-of-stock'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                const StatusIcon = getStatusIcon(material.status);
                const stockPercent = material.maxStock > 0 ? Math.round((material.currentStock / material.maxStock) * 100) : 0;
                const totalValue = material.currentStock * material.unitCost;

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
                          style={{ backgroundColor: `${MANUFACTURING_COLOR}20` }}
                        >
                          <Package size={20} style={{ color: MANUFACTURING_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{material.materialName}</p>
                          <p className="text-xs text-text-muted font-mono">{material.materialCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{material.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-center">
                        <p className="font-medium text-text-primary">{material.currentStock.toLocaleString()} {material.unit}</p>
                        <div className="flex items-center justify-center gap-1 text-xs text-text-muted">
                          <span className="text-success">{material.availableQty.toLocaleString()}</span>
                          <span>/</span>
                          <span className="text-warning">{material.reservedQty.toLocaleString()}</span>
                        </div>
                        <div className="w-16 mx-auto bg-background-tertiary rounded-full h-1.5 mt-1">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${Math.min(stockPercent, 100)}%`, backgroundColor: getStatusColor(material.status) }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${getStatusColor(material.status)}20`, color: getStatusColor(material.status) }}
                      >
                        <StatusIcon size={10} />
                        {material.status.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-text-primary">QAR {material.unitCost.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-text-primary">QAR {totalValue.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Truck size={12} className="text-text-muted" />
                        <span className="text-text-secondary">{material.supplier}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
                        <MapPin size={10} />
                        <span>{material.location}</span>
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
                          { id: 'edit', label: 'Edit', onClick: () => {} },
                          { id: 'restock', label: 'Restock', onClick: () => {} },
                          { id: 'allocate', label: 'Allocate', onClick: () => {} },
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

export default Inventory;
