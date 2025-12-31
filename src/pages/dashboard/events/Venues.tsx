import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Users,
  Star,
  Building,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  CheckCircle,
  X,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  venues,
  formatCurrency,
} from '@/data/events/eventsData';

export const Venues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || venue.type === typeFilter;
      const matchesCity = cityFilter === 'all' || venue.city === cityFilter;
      return matchesSearch && matchesType && matchesCity;
    });
  }, [searchTerm, typeFilter, cityFilter]);

  const venueTypes = [...new Set(venues.map((v) => v.type))];
  const cities = [...new Set(venues.map((v) => v.city))];

  const totalCapacity = venues.reduce((sum, v) => sum + v.capacity.max, 0);
  const avgRating = venues.reduce((sum, v) => sum + v.rating, 0) / venues.length;
  const activeVenues = venues.filter((v) => v.status === 'active').length;

  const selectedVenueData = selectedVenue
    ? venues.find((v) => v.id === selectedVenue)
    : null;

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (lowerAmenity.includes('parking')) return <Car className="h-4 w-4" />;
    if (lowerAmenity.includes('catering') || lowerAmenity.includes('kitchen')) return <Utensils className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title="Venues"
        subtitle="Browse and manage event venues"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Venue
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Venues"
          value={venues.length.toString()}
          icon={Building}
          trend={{ value: `${activeVenues} active`, type: 'up' }}
        />
        <StatsCard
          title="Total Capacity"
          value={totalCapacity.toLocaleString()}
          icon={Users}
          trend={{ value: 'Combined capacity', type: 'neutral' }}
        />
        <StatsCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          trend={{ value: 'Out of 5 stars', type: 'up' }}
        />
        <StatsCard
          title="Cities"
          value={cities.length.toString()}
          icon={MapPin}
          trend={{ value: 'Locations covered', type: 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#6366f1] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Types</option>
            {venueTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVenues.map((venue) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden hover:border-[#6366f1]/50 transition-colors cursor-pointer"
            onClick={() => setSelectedVenue(venue.id)}
          >
            {/* Image Placeholder */}
            <div className="aspect-video bg-[#1a1a24] flex items-center justify-center relative">
              <Building className="h-16 w-16 text-[#64748b]" />
              <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-[#1a1a24] px-2 py-1 text-xs text-white">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                {venue.rating}
              </span>
              <span className="absolute top-2 left-2 rounded-full bg-[#6366f1]/20 px-2 py-1 text-xs text-[#6366f1]">
                {venue.type.charAt(0).toUpperCase() + venue.type.slice(1).replace('-', ' ')}
              </span>
            </div>

            {/* Venue Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white text-lg mb-1 truncate">{venue.name}</h3>
              <div className="flex items-center gap-2 text-sm text-[#64748b] mb-3">
                <MapPin className="h-4 w-4" />
                {venue.city}, {venue.state}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#64748b]">Max Capacity</p>
                  <p className="text-white font-semibold">{venue.capacity.max.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#64748b]">Starting at</p>
                  <p className="text-[#6366f1] font-semibold">
                    {formatCurrency(Object.values(venue.pricing)[0] as number || 0)}
                  </p>
                </div>
              </div>

              {/* Amenities Preview */}
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-[#1a1a24] px-2 py-1 text-xs text-[#94a3b8]"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
                {venue.amenities.length > 3 && (
                  <span className="rounded-full bg-[#1a1a24] px-2 py-1 text-xs text-[#64748b]">
                    +{venue.amenities.length - 3}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="pt-3 border-t border-[#1e1e2e] flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  venue.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-[#1e1e2e] text-[#64748b]'
                }`}>
                  {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                </span>
                <span className="text-xs text-[#64748b]">{venue.spaces.length} spaces</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Venue Detail Modal */}
      {selectedVenueData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#1e1e2e] bg-[#12121a]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1e1e2e] bg-[#12121a] p-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{selectedVenueData.name}</h2>
                <p className="text-sm text-[#64748b]">{selectedVenueData.city}, {selectedVenueData.state}</p>
              </div>
              <button
                onClick={() => setSelectedVenue(null)}
                className="rounded-lg p-2 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Key Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-[#1a1a24] p-4 text-center">
                  <Users className="h-6 w-6 text-[#6366f1] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedVenueData.capacity.max.toLocaleString()}</p>
                  <p className="text-xs text-[#64748b]">Max Capacity</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4 text-center">
                  <Star className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedVenueData.rating}</p>
                  <p className="text-xs text-[#64748b]">Rating</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4 text-center">
                  <Building className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedVenueData.spaces.length}</p>
                  <p className="text-xs text-[#64748b]">Spaces</p>
                </div>
              </div>

              {/* Address */}
              <div className="rounded-lg bg-[#1a1a24] p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#6366f1]" />
                  Address
                </h4>
                <p className="text-[#94a3b8]">{selectedVenueData.address}</p>
              </div>

              {/* Spaces */}
              <div>
                <h4 className="text-white font-semibold mb-3">Available Spaces</h4>
                <div className="space-y-2">
                  {selectedVenueData.spaces.map((space, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]">
                      <span className="text-white">{space.name}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#64748b]">{space.capacity} guests</span>
                        <span className="text-[#64748b]">{space.sqft.toLocaleString()} sq ft</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity Options */}
              <div>
                <h4 className="text-white font-semibold mb-3">Capacity by Setup</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedVenueData.capacity.theater && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <p className="text-[#64748b] text-xs">Theater</p>
                      <p className="text-white font-semibold">{selectedVenueData.capacity.theater.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedVenueData.capacity.banquet && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <p className="text-[#64748b] text-xs">Banquet</p>
                      <p className="text-white font-semibold">{selectedVenueData.capacity.banquet.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedVenueData.capacity.cocktail && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <p className="text-[#64748b] text-xs">Cocktail</p>
                      <p className="text-white font-semibold">{selectedVenueData.capacity.cocktail.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedVenueData.capacity.classroom && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <p className="text-[#64748b] text-xs">Classroom</p>
                      <p className="text-white font-semibold">{selectedVenueData.capacity.classroom.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-white font-semibold mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVenueData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-[#1a1a24] px-3 py-1.5 text-sm text-[#94a3b8]"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h4 className="text-white font-semibold mb-3">Pricing</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(selectedVenueData.pricing).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg bg-[#1a1a24]">
                      <p className="text-[#64748b] text-xs">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-[#6366f1] font-semibold">{formatCurrency(value as number)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <Phone className="h-4 w-4 text-[#6366f1]" />
                    <span className="text-[#94a3b8]">{selectedVenueData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <Mail className="h-4 w-4 text-[#6366f1]" />
                    <span className="text-[#94a3b8]">{selectedVenueData.contact.email}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedVenueData.notes && (
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <h4 className="text-white font-semibold mb-2">Notes</h4>
                  <p className="text-[#94a3b8]">{selectedVenueData.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Showing {filteredVenues.length} of {venues.length} venues
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Previous
          </button>
          <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};
