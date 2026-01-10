import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Eye,
  Edit,
  Share2,
  Star,
  Building,
  TrendingUp,
  Clock,
  DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, StatsCard } from '@/components/common';
import {
  properties,
  propertyTypes,
  propertyStatuses,
  realestateStats,
  formatPrice,
  getPropertyStatusColor,
} from '@/data/realestate/realestateData';

type ViewMode = 'grid' | 'list' | 'map';
type CategoryFilter = 'all' | 'sale' | 'rent';

export const PropertyList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.mlsNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || property.category === categoryFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  const activeListings = properties.filter((p) => p.status === 'active').length;
  const pendingListings = properties.filter((p) => p.status === 'pending').length;

  const formatFullAddress = (address: typeof properties[0]['address']) => {
    const parts = [address.street];
    if (address.unit) parts.push(address.unit);
    parts.push(`${address.city}, ${address.state}`);
    return parts.join(', ');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        subtitle="Manage your property listings"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Listing
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Listings"
          value={activeListings}
          icon={Building}
          trend={{ value: "+12%", type: "up" }}
        />
        <StatsCard
          title="Pending"
          value={pendingListings}
          icon={Clock}
          trend={{ value: "+5%", type: "up" }}
        />
        <StatsCard
          title="Sold/Rented This Month"
          value={realestateStats.closedThisMonth}
          icon={TrendingUp}
          trend={{ value: "+8%", type: "up" }}
        />
        <StatsCard
          title="Total Volume"
          value={`$${(realestateStats.totalVolume.thisMonth / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          trend={{ value: "+15%", type: "up" }}
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search by address, MLS#..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0a0a0f] p-1">
            {(['all', 'sale', 'rent'] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  categoryFilter === category
                    ? 'bg-[#547792]/20 text-[#547792]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {category === 'all' ? 'All' : category === 'sale' ? 'For Sale' : 'For Rent'}
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              showFilters
                ? 'border-[#547792] bg-[#547792]/10 text-[#547792]'
                : 'border-white/[0.08] text-[#94a3b8] hover:text-white'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0a0a0f] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-2 transition-colors ${
                viewMode === 'grid' ? 'bg-[#547792]/20 text-[#547792]' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md p-2 transition-colors ${
                viewMode === 'list' ? 'bg-[#547792]/20 text-[#547792]' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`rounded-md p-2 transition-colors ${
                viewMode === 'map' ? 'bg-[#547792]/20 text-[#547792]' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-[#64748b] mb-1">Property Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
              >
                <option value="all">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748b] mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                {propertyStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#64748b]">
        Showing {filteredProperties.length} of {properties.length} properties
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#2e2e3e] transition-colors cursor-pointer"
              onClick={() => navigate(`/dashboard/realestate/properties/${property.id}`)}
            >
              {/* Image Placeholder */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-16 w-16 text-[#2e2e3e]" />
                </div>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.featured && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 text-xs font-medium text-white">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPropertyStatusColor(property.status)}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    property.category === 'sale' ? 'bg-emerald-500/90 text-white' : 'bg-blue-500/90 text-white'
                  }`}>
                    {property.category === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Price */}
                <div className="text-2xl font-bold text-white mb-2">
                  {formatPrice(property.price, property.category)}
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-white mb-1 group-hover:text-[#547792] transition-colors">
                  {property.title}
                </h3>

                {/* Address */}
                <p className="text-xs text-[#64748b] mb-3 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {formatFullAddress(property.address)}
                </p>

                {/* Property Details */}
                <div className="flex items-center gap-4 text-xs text-[#94a3b8] mb-3">
                  {property.size.bedrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bed className="h-3.5 w-3.5" />
                      {property.size.bedrooms} beds
                    </span>
                  )}
                  {property.size.bathrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" />
                      {property.size.bathrooms} baths
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Square className="h-3.5 w-3.5" />
                    {property.size.sqft.toLocaleString()} sqft
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs text-[#64748b]">
                    <Calendar className="h-3.5 w-3.5" />
                    {property.daysOnMarket} days on market
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a1a24] transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a1a24] transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a1a24] transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Property</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Days</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#64748b]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-white/[0.08] hover:bg-[#1a1a24] cursor-pointer"
                  onClick={() => navigate(`/dashboard/realestate/properties/${property.id}`)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                        <Building className="h-6 w-6 text-[#2e2e3e]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{property.title}</div>
                        <div className="text-xs text-[#64748b]">{formatFullAddress(property.address)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-white">{formatPrice(property.price, property.category)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#94a3b8] capitalize">{property.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPropertyStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#94a3b8]">{property.agent.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#94a3b8]">{property.daysOnMarket}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-1.5 rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a1a24] transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-1.5 rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a1a24] transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Map View Placeholder */}
      {viewMode === 'map' && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 text-center">
          <MapPin className="h-16 w-16 text-[#2e2e3e] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Map View</h3>
          <p className="text-sm text-[#64748b]">Interactive map view coming soon. Properties will be displayed on an interactive map with clustering and quick info popups.</p>
        </div>
      )}
    </div>
  );
};
