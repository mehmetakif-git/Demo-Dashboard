import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Percent,
  Search,
  Plus,
  Tag,
  Truck,
  DollarSign,
  Calendar,
  Copy,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { discounts } from '@/data/ecommerce/ecommerceData';
import { useTranslation } from 'react-i18next';

export const Discounts = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');

  const stats = {
    activeCoupons: discounts.filter(d => d.status === 'active').length,
    totalUses: discounts.reduce((acc, d) => acc + d.usedCount, 0),
    totalSaved: discounts.reduce((acc, d) => {
      if (d.type === 'fixed') return acc + (d.value * d.usedCount);
      return acc;
    }, 0),
  };

  const filteredDiscounts = useMemo(() => {
    return discounts.filter(discount => {
      const matchesSearch = discount.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discount.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || discount.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'percentage': return Percent;
      case 'fixed': return DollarSign;
      case 'free_shipping': return Truck;
      default: return Tag;
    }
  };

  const getDiscountValue = (discount: typeof discounts[0]) => {
    switch (discount.type) {
      case 'percentage': return `${discount.value}% off`;
      case 'fixed': return `${discount.value} QAR off`;
      case 'free_shipping': return 'Free Shipping';
      default: return discount.value;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('ecommerce.discountsCoupons', 'Discounts & Coupons')}
        subtitle="Manage promotional codes and offers"
        icon={Percent}
        actions={
          <Button>
            <Plus size={18} />
            Create Coupon
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Tag size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Active Coupons</p>
                <p className="text-2xl font-bold text-text-primary">{stats.activeCoupons}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Percent size={20} className="text-accent-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Uses</p>
                <p className="text-2xl font-bold text-text-primary">{stats.totalUses}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <DollarSign size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Saved</p>
                <p className="text-2xl font-bold text-text-primary">{stats.totalSaved.toLocaleString()} QAR</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'expired'] as const).map((filter) => (
              <Button
                key={filter}
                variant={statusFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDiscounts.map((discount, index) => {
          const Icon = getDiscountIcon(discount.type);
          const isExpired = discount.status === 'expired' || new Date(discount.endDate) < new Date();
          const usagePercent = discount.maxUses ? (discount.usedCount / discount.maxUses * 100) : null;

          return (
            <motion.div
              key={discount.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-6 ${isExpired ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      discount.type === 'percentage' ? 'bg-accent-primary/20' :
                      discount.type === 'fixed' ? 'bg-success/20' : 'bg-warning/20'
                    }`}>
                      <Icon size={20} className={
                        discount.type === 'percentage' ? 'text-accent-primary' :
                        discount.type === 'fixed' ? 'text-success' : 'text-warning'
                      } />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary font-mono">{discount.code}</p>
                      <p className="text-sm text-text-muted">{getDiscountValue(discount)}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'edit', label: 'Edit', onClick: () => {} },
                      { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
                      { id: 'delete', label: 'Delete', onClick: () => {} },
                    ]}
                  />
                </div>

                <p className="text-sm text-text-secondary mb-4">{discount.description}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Min. Order</span>
                    <span className="text-text-primary">{discount.minOrderValue} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Usage</span>
                    <span className="text-text-primary">
                      {discount.usedCount} {discount.maxUses ? `/ ${discount.maxUses}` : 'uses'}
                    </span>
                  </div>
                  {usagePercent !== null && (
                    <div className="w-full h-2 rounded-full bg-background-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${usagePercent >= 90 ? 'bg-error' : usagePercent >= 70 ? 'bg-warning' : 'bg-success'}`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Calendar size={14} />
                    <span>
                      {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
                  <StatusBadge status={discount.status} />
                  <Button variant="ghost" size="sm">
                    <Copy size={14} className="mr-2" />
                    Copy Code
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredDiscounts.length === 0 && (
        <Card className="p-12 text-center">
          <Percent size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No discounts found</p>
        </Card>
      )}
    </div>
  );
};

export default Discounts;
