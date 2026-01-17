import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Search,
  Plus,
  Calendar,
  Users,
  CheckCircle,
  MoreVertical,
  Star,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { packages, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const Packages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(packages.map(p => p.category))];
    return categories;
  }, []);

  const stats = useMemo(() => ({
    active: packages.filter(p => p.status === 'active').length,
    total: packages.length,
    scheduled: packages.filter(p => p.status === 'scheduled').length,
    totalBookings: packages.reduce((acc, p) => acc + p.bookings, 0),
  }), []);

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && pkg.status === 'active') ||
        (statusFilter === 'inactive' && pkg.status !== 'active');

      const matchesType = typeFilter === 'all' || pkg.category === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Romance': '#ec4899',
      'Family': '#f59e0b',
      'Business': '#3b82f6',
      'Wellness': '#10b981',
      'Long Stay': '#8b5cf6',
    };
    return colors[category] || HOTEL_COLOR;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Packages & Offers"
        subtitle="Manage hotel packages and special offers"
        icon={Gift}
        actions={
          <Button>
            <Plus size={18} />
            Create Package
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Packages', value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: 'Total Packages', value: stats.total, icon: Gift, color: HOTEL_COLOR },
          { label: 'Scheduled', value: stats.scheduled, icon: Star, color: '#f59e0b' },
          { label: 'Total Bookings', value: stats.totalBookings, icon: Users, color: '#3b82f6' },
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
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={typeFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={typeFilter === category ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => {
          const categoryColor = getCategoryColor(pkg.category);

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                {/* Package Image/Header */}
                <div
                  className="h-32 relative flex items-center justify-center"
                  style={{ backgroundColor: `${categoryColor}20` }}
                >
                  <Gift size={48} style={{ color: categoryColor }} />
                  {pkg.status === 'scheduled' && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-warning rounded text-xs text-white font-medium">
                      <Star size={12} />
                      Upcoming
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Package Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{pkg.name}</h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs mt-1"
                        style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                      >
                        {pkg.category}
                      </span>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'edit', label: 'Edit Package', onClick: () => {} },
                        { id: 'toggle', label: pkg.status === 'active' ? 'Deactivate' : 'Activate', onClick: () => {} },
                        { id: 'delete', label: 'Delete', onClick: () => {} },
                      ]}
                    />
                  </div>

                  <p className="text-xs text-text-muted mb-3 line-clamp-2">{pkg.description}</p>

                  {/* Inclusions */}
                  <div className="mb-3">
                    <p className="text-xs text-text-muted mb-1">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {pkg.inclusions.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-background-secondary rounded text-xs text-text-secondary"
                        >
                          {item}
                        </span>
                      ))}
                      {pkg.inclusions.length > 3 && (
                        <span className="px-2 py-0.5 bg-background-secondary rounded text-xs text-text-muted">
                          +{pkg.inclusions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                    <Calendar size={12} />
                    <span>
                      {new Date(pkg.validFrom).toLocaleDateString()} - {new Date(pkg.validTo).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Price & Status */}
                  <div className="flex items-end justify-between pt-3 border-t border-border-default">
                    <div>
                      <p className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                        {formatCurrency(pkg.price)}
                      </p>
                      <p className="text-xs text-text-muted">per package</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          pkg.status === 'active'
                            ? 'bg-success/20 text-success'
                            : pkg.status === 'scheduled'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-background-tertiary text-text-muted'
                        }`}
                      >
                        {pkg.status}
                      </span>
                      <p className="text-xs text-text-muted mt-1">{pkg.bookings} bookings</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredPackages.length === 0 && (
        <Card className="p-12 text-center">
          <Gift size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No packages found</p>
        </Card>
      )}
    </div>
  );
};

export default Packages;
