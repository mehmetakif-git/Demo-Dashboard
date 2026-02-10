import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  X,
  UtensilsCrossed,
  Speaker,
  Camera,
  Flower2,
  Music,
  Palette,
  Package,
  Shield,
  Bus,
  Users,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  eventVendors,
  vendorCategories,
  getVendorStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Vendors = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const filteredVendors = useMemo(() => {
    return eventVendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const statuses = [...new Set(eventVendors.map((v) => v.status))];

  const preferredVendors = eventVendors.filter((v) => v.status === 'preferred').length;
  const avgRating = eventVendors.reduce((sum, v) => sum + v.rating, 0) / eventVendors.length;

  const selectedVendorData = selectedVendor
    ? eventVendors.find((v) => v.id === selectedVendor)
    : null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'catering':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'av-equipment':
        return <Speaker className="h-5 w-5" />;
      case 'photography':
        return <Camera className="h-5 w-5" />;
      case 'florist':
        return <Flower2 className="h-5 w-5" />;
      case 'entertainment':
        return <Music className="h-5 w-5" />;
      case 'decor':
        return <Palette className="h-5 w-5" />;
      case 'rentals':
        return <Package className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'transportation':
        return <Bus className="h-5 w-5" />;
      case 'staffing':
        return <Users className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('events.vendors', 'Vendors')}
        subtitle="Manage event vendors and suppliers"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Vendor
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Vendors"
          value={eventVendors.length.toString()}
          icon={Users}
          trend={{ value: 'In database', type: 'neutral' }}
        />
        <StatsCard
          title="Preferred Vendors"
          value={preferredVendors.toString()}
          icon={Star}
          trend={{ value: 'Top rated partners', type: 'up' }}
        />
        <StatsCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          trend={{ value: 'Out of 5 stars', type: 'up' }}
        />
        <StatsCard
          title="Categories"
          value={vendorCategories.length.toString()}
          icon={Package}
          trend={{ value: 'Service types', type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {vendorCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => {
          const statusColor = getVendorStatusColor(vendor.status);
          const categoryInfo = vendorCategories.find(c => c.id === vendor.category);

          return (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#547792]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedVendor(vendor.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#547792]/20 to-[#94B4C1]/20 text-[#547792]">
                    {getCategoryIcon(vendor.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{vendor.name}</h3>
                    <p className="text-xs text-[#64748b]">{categoryInfo?.name || vendor.category}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{vendor.rating}</span>
                </div>
                <span className="text-[#64748b]">{vendor.priceRange}</span>
              </div>

              <div className="mb-4">
                <p className="text-xs text-[#64748b] mb-2">Services</p>
                <div className="flex flex-wrap gap-1">
                  {vendor.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-[#1a1a24] px-2 py-1 text-xs text-[#94a3b8]"
                    >
                      {service}
                    </span>
                  ))}
                  {vendor.services.length > 3 && (
                    <span className="rounded-full bg-[#1a1a24] px-2 py-1 text-xs text-[#64748b]">
                      +{vendor.services.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-[#64748b]" />
                  <span className="text-[#94a3b8]">{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#64748b]" />
                  <span className="text-[#94a3b8] truncate">{vendor.contact.email}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vendor Detail Modal */}
      {selectedVendorData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#547792]/20 to-[#94B4C1]/20 text-[#547792]">
                  {getCategoryIcon(selectedVendorData.category)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedVendorData.name}</h2>
                  <p className="text-sm text-[#64748b]">
                    {vendorCategories.find(c => c.id === selectedVendorData.category)?.name || selectedVendorData.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVendor(null)}
                className="rounded-lg p-2 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status and Rating */}
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${getVendorStatusColor(selectedVendorData.status)}`}>
                  {selectedVendorData.status.charAt(0).toUpperCase() + selectedVendorData.status.slice(1)}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{selectedVendorData.rating}</span>
                  <span className="text-[#64748b]">/ 5.0</span>
                </div>
                <span className="text-[#64748b]">Price: {selectedVendorData.priceRange}</span>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-3">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVendorData.services.map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-[#1a1a24] px-3 py-1.5 text-sm text-[#94a3b8]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <Users className="h-5 w-5 text-[#547792]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Contact Name</p>
                      <p className="text-white">{selectedVendorData.contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <Phone className="h-5 w-5 text-[#547792]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Phone</p>
                      <p className="text-white">{selectedVendorData.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <Mail className="h-5 w-5 text-[#547792]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Email</p>
                      <p className="text-white">{selectedVendorData.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <MapPin className="h-5 w-5 text-[#547792]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Address</p>
                      <p className="text-white">{selectedVendorData.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedVendorData.notes && (
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <h4 className="text-white font-semibold mb-2">Notes</h4>
                  <p className="text-[#94a3b8]">{selectedVendorData.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  Contact Vendor
                </button>
                <button className="flex-1 rounded-lg border border-white/[0.08] px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
                  View Past Events
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Showing {filteredVendors.length} of {eventVendors.length} vendors
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Previous
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};
