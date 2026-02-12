import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Building,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  suppliers,
  products,
  formatCurrency,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

export const Suppliers = () => {
  const { t } = useTranslation('hardware');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalValue = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
    return {
      totalSuppliers: suppliers.length,
      activeSuppliers: suppliers.filter((s) => s.status === 'active').length,
      totalProducts: products.length,
      totalOrderValue: totalValue,
    };
  }, []);

  const filteredSuppliers = useMemo(() => {
    let filtered = [...suppliers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.contactPerson.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((s) => s.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const getProductCount = (supplierId: string) => {
    return products.filter((p) => p.supplierId === supplierId).length;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('suppliers.title')}
        subtitle={t('suppliers.subtitle')}
        actions={<Button leftIcon={<Plus size={16} />}>{t('suppliers.addSupplier')}</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('suppliers.totalSuppliers')}
          value={stats.totalSuppliers.toString()}
          icon={Users}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('suppliers.activeSuppliers')}
          value={stats.activeSuppliers.toString()}
          icon={Users}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('suppliers.totalProducts')}
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#6366f1"
        />
        <StatsCard
          title={t('suppliers.totalOrderValue')}
          value={formatCurrency(stats.totalOrderValue)}
          icon={DollarSign}
          iconColor="#0ea5e9"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder={t('suppliers.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${
                  selectedStatus === status
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                    : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-5 hover:border-white/[0.15] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Building size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{supplier.name}</h4>
                    <p className="text-sm text-text-muted">{supplier.contactPerson}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === supplier.id ? null : supplier.id)}
                    className="p-2 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {activeDropdown === supplier.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-background-secondary border border-white/[0.08] rounded-lg shadow-lg z-10">
                      <button className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                        <Eye size={14} /> {t('suppliers.viewDetails')}
                      </button>
                      <button className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                        <Edit size={14} /> {t('suppliers.edit')}
                      </button>
                      <button className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/[0.05] flex items-center gap-2 cursor-pointer">
                        <Trash2 size={14} /> {t('suppliers.delete')}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone size={14} />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail size={14} />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={14} />
                  <span className="truncate">{supplier.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">{getProductCount(supplier.id)}</p>
                  <p className="text-xs text-text-muted">{t('suppliers.products')}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">{supplier.paymentTerms}</p>
                  <p className="text-xs text-text-muted">{t('suppliers.paymentTerms')}</p>
                </div>
                <div className="text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      supplier.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">{t('suppliers.totalOrders')}</span>
                  <span className="font-semibold text-amber-400">{formatCurrency(supplier.totalPurchases)}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('suppliers.noSuppliers')}</p>
        </Card>
      )}
    </div>
  );
};
