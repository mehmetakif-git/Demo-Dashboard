import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  DollarSign,
  ShoppingBag,
  Star,
  ChevronRight,
  Mail,
  Phone,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  customers,
  formatCurrency,
  formatDate,
} from '@/data/laundry/laundryData';
import { getProfileImage } from '@/utils/profileImages';

export const Customers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: customers.length,
    vip: customers.filter((c) => c.vipStatus).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
      customers.reduce((sum, c) => sum + c.totalOrders, 0)
    ),
  }), []);

  const filteredCustomers = useMemo(() => {
    let filtered = [...customers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          c.address.toLowerCase().includes(query)
      );
    }

    if (selectedFilter === 'vip') {
      filtered = filtered.filter((c) => c.vipStatus);
    } else if (selectedFilter === 'active') {
      filtered = filtered.filter((c) => c.totalOrders >= 10);
    } else if (selectedFilter === 'new') {
      filtered = filtered.filter((c) => c.totalOrders < 5);
    }

    // Sort by total spent
    filtered.sort((a, b) => b.totalSpent - a.totalSpent);

    return filtered;
  }, [searchQuery, selectedFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        subtitle="Manage your customer database"
        actions={<Button leftIcon={<Plus size={16} />}>Add Customer</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Customers"
          value={stats.total.toString()}
          icon={Users}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title="VIP Customers"
          value={stats.vip.toString()}
          icon={Star}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg. Order Value"
          value={formatCurrency(stats.avgOrderValue)}
          icon={ShoppingBag}
          iconColor="#8b5cf6"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex gap-2">
            {['all', 'vip', 'active', 'new'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                    : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="p-5 hover:border-white/[0.15] transition-all cursor-pointer group"
              onClick={() => navigate(`/dashboard/laundry/customers/${customer.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getProfileImage(`${customer.firstName} ${customer.lastName}`) ? (
                    <img
                      src={getProfileImage(`${customer.firstName} ${customer.lastName}`)}
                      alt={`${customer.firstName} ${customer.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-sky-400">
                        {customer.firstName[0]}{customer.lastName[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary">
                        {customer.firstName} {customer.lastName}
                      </h3>
                      {customer.vipStatus && (
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                      )}
                    </div>
                    <p className="text-sm text-text-muted">{customer.city}</p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-muted group-hover:text-text-primary transition-colors"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Phone size={14} className="text-text-muted" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail size={14} className="text-text-muted" />
                  {customer.email}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">{customer.totalOrders}</p>
                  <p className="text-xs text-text-muted">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">{formatCurrency(customer.totalSpent)}</p>
                  <p className="text-xs text-text-muted">Total Spent</p>
                </div>
              </div>

              {customer.lastOrderDate && (
                <p className="text-xs text-text-muted text-center mt-3">
                  Last order: {formatDate(customer.lastOrderDate)}
                </p>
              )}

              {customer.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {customer.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No customers found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
