import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Truck,
  Star,
  Phone,
  Mail,
  Clock,
  Eye,
  Edit,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  vendors,
  formatDate,
  formatCurrency,
  getStatusColor,
  type Vendor,
} from '@/data/maintenanceData';

export const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    expiring: vendors.filter(v => v.status === 'expiring').length,
    avgRating: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1),
  }), []);

  const filteredVendors = useMemo(() => {
    let filtered = [...vendors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        v =>
          v.name.toLowerCase().includes(query) ||
          v.specialty.toLowerCase().includes(query) ||
          v.contact.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(v => v.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(v => v.status === selectedStatus);
    }

    return filtered.sort((a, b) => b.rating - a.rating);
  }, [searchQuery, selectedType, selectedStatus]);

  const getStatusBadge = (status: Vendor['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active' },
      expiring: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Expiring Soon' },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Expired' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: Vendor['type']) => {
    const config = {
      'Service Provider': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      'Supplier': { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    };
    const c = config[type];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {type}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-text-muted'}
          />
        ))}
        <span className="ml-1 text-sm text-text-secondary">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors & Suppliers"
        subtitle="Manage maintenance vendors and service providers"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Add Vendor
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Vendors"
          value={stats.total.toString()}
          icon={Truck}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Active Contracts"
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Expiring Soon"
          value={stats.expiring.toString()}
          icon={AlertCircle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Avg. Rating"
          value={stats.avgRating}
          icon={Star}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Types</option>
              <option value="Service Provider">Service Provider</option>
              <option value="Supplier">Supplier</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-background-secondary rounded-lg">
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

      {/* Vendors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all group">
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getStatusColor(vendor.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                        <Truck size={24} className="text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{vendor.name}</h3>
                        <p className="text-xs text-text-secondary">{vendor.specialty}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-background-tertiary rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(vendor.status)}
                    {getTypeBadge(vendor.type)}
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(vendor.rating)}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone size={14} />
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Mail size={14} />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock size={14} />
                      <span>Response: {vendor.responseTime}</span>
                    </div>
                  </div>

                  {/* Contract Info */}
                  {vendor.contractStart && (
                    <div className="pt-3 border-t border-border-default space-y-2 text-xs text-text-secondary">
                      <div className="flex justify-between">
                        <span>Contract Value</span>
                        <span className="text-text-primary font-medium">
                          {vendor.contractValue ? formatCurrency(vendor.contractValue) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expires</span>
                        <span className={vendor.status === 'expiring' ? 'text-yellow-400' : 'text-text-primary'}>
                          {vendor.contractEnd ? formatDate(vendor.contractEnd) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-default">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                      <FileText size={14} />
                      Contract
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
                      <Phone size={14} />
                      Contact
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Response Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Contract Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredVendors.map((vendor, index) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-background-tertiary transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                          <Truck size={18} className="text-accent-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">{vendor.name}</span>
                          <p className="text-xs text-text-secondary">{vendor.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getTypeBadge(vendor.type)}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-text-primary">{vendor.contact}</p>
                        <p className="text-text-secondary">{vendor.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{renderStars(vendor.rating)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{vendor.responseTime}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">
                      {vendor.contractValue ? formatCurrency(vendor.contractValue) : '-'}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(vendor.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-blue-400">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-red-400">
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

      {filteredVendors.length === 0 && (
        <Card className="p-12 text-center">
          <Truck size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No vendors found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
