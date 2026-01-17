import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Pill,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { medications, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';

export const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: medications.length,
    inStock: medications.filter(m => m.status === 'in-stock').length,
    lowStock: medications.filter(m => m.status === 'low-stock').length,
    outOfStock: medications.filter(m => m.status === 'out-of-stock').length,
  }), []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(medications.map(m => m.category))];
    return ['all', ...uniqueCategories];
  }, []);

  const filteredMedications = useMemo(() => {
    return medications.filter(medication => {
      const matchesSearch = medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medication.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medication.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || medication.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || medication.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-stock': '#10b981',
      'low-stock': '#f59e0b',
      'out-of-stock': '#ef4444',
    };
    return colors[status] || HEALTHCARE_COLOR;
  };

  const getDosageFormIcon = () => {
    return Pill;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pharmacy"
        subtitle="Manage medications and inventory"
        icon={Building2}
        actions={
          <Button>
            <Plus size={18} />
            Add Medication
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.total, icon: Package, color: HEALTHCARE_COLOR },
          { label: 'In Stock', value: stats.inStock, icon: CheckCircle, color: '#10b981' },
          { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: '#f59e0b' },
          { label: 'Out of Stock', value: stats.outOfStock, icon: AlertTriangle, color: '#ef4444' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all hover:bg-background-secondary`}
                onClick={() => {
                  if (stat.label === 'In Stock') setStatusFilter('in-stock');
                  else if (stat.label === 'Low Stock') setStatusFilter('low-stock');
                  else if (stat.label === 'Out of Stock') setStatusFilter('out-of-stock');
                  else setStatusFilter('all');
                }}
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
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'in-stock', 'low-stock', 'out-of-stock'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.slice(0, 5).map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedications.map((medication, index) => {
          const FormIcon = getDosageFormIcon();
          const statusColor = getStatusColor(medication.status);

          return (
            <motion.div
              key={medication.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                    >
                      <FormIcon size={20} style={{ color: HEALTHCARE_COLOR }} />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{medication.name}</p>
                      <p className="text-xs text-text-muted">{medication.genericName}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit', onClick: () => {} },
                      { id: 'reorder', label: 'Create Reorder', onClick: () => {} },
                      { id: 'history', label: 'Stock History', onClick: () => {} },
                    ]}
                  />
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Strength:</span>
                    <span className="text-text-primary">{medication.strength}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Form:</span>
                    <span className="text-text-primary capitalize">{medication.dosageForm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Category:</span>
                    <span className="text-text-primary">{medication.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Manufacturer:</span>
                    <span className="text-text-primary">{medication.manufacturer}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-default">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">Stock Level</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                      style={{
                        backgroundColor: `${statusColor}20`,
                        color: statusColor,
                      }}
                    >
                      {medication.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-text-primary">{medication.stock}</p>
                      <p className="text-xs text-text-muted">Units available</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: HEALTHCARE_COLOR }}>
                        {medication.unitPrice} QAR
                      </p>
                      <p className="text-xs text-text-muted">Per unit</p>
                    </div>
                  </div>
                  {medication.stock <= medication.reorderLevel && (
                    <div className="mt-2 flex items-center gap-1 text-warning text-xs">
                      <AlertTriangle size={14} />
                      Reorder level: {medication.reorderLevel}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-border-default flex justify-between text-xs text-text-muted">
                  <span>Batch: {medication.batchNumber}</span>
                  <span>Exp: {new Date(medication.expiryDate).toLocaleDateString()}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredMedications.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No medications found</p>
        </Card>
      )}
    </div>
  );
};

export default Pharmacy;
