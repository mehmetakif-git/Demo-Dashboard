import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building,
  Search,
  MoreVertical,
  Home,
  MapPin,
  Bed,
  Bath,
  Car,
  Square,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { properties, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Properties = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = properties.length;
    const available = properties.filter(p => p.status === 'available').length;
    const rented = properties.filter(p => p.status === 'rented').length;
    const underOffer = properties.filter(p => p.status === 'under-offer').length;

    return { total, available, rented, underOffer };
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || property.propertyType === typeFilter;
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const formatPrice = (price: number | null, rentPrice: number | null, listingType: string) => {
    if (listingType === 'For Sale' && price) {
      return `QAR ${price.toLocaleString()}`;
    }
    if (listingType === 'For Rent' && rentPrice) {
      return `QAR ${rentPrice.toLocaleString()}/month`;
    }
    return 'N/A';
  };

  const propertyTypes = ['all', 'Apartment', 'Villa', 'Office', 'Warehouse', 'Land'];
  const statuses = ['all', 'available', 'rented', 'under-offer', 'sold'];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('realestate.properties', 'Properties')}
        subtitle="Manage your property portfolio"
        icon={Building}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Properties', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Available', value: stats.available, color: '#10b981' },
          { label: 'Rented', value: stats.rented, color: '#3b82f6' },
          { label: 'Under Offer', value: stats.underOffer, color: '#f59e0b' },
        ].map((stat, index) => (
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
                  <Building size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 hover:border-border-hover transition-colors">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                    >
                      <Home size={24} style={{ color: REALESTATE_COLOR }} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{property.title}</p>
                      <p className="text-xs text-text-muted font-mono">{property.propertyCode}</p>
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
                      { id: 'schedule', label: 'Schedule Viewing', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin size={14} className="text-text-muted" />
                  <span>{property.location}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  {property.bedrooms !== null && (
                    <div className="flex items-center gap-1">
                      <Bed size={14} className="text-text-muted" />
                      <span>{property.bedrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath size={14} className="text-text-muted" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square size={14} className="text-text-muted" />
                    <span>{property.area} {property.unit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car size={14} className="text-text-muted" />
                    <span>{property.parking}</span>
                  </div>
                </div>

                {/* Price & Status */}
                <div className="flex justify-between items-center pt-2 border-t border-border-default">
                  <div>
                    <p className="text-lg font-bold" style={{ color: REALESTATE_COLOR }}>
                      {formatPrice(property.price, property.rentPrice, property.listingType)}
                    </p>
                    <p className="text-xs text-text-muted">{property.listingType}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(property.status)}20`, color: getStatusColor(property.status) }}
                    >
                      {property.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="text-xs text-text-muted">{property.propertyType}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-text-muted">
            <Building size={48} className="mx-auto mb-4 opacity-50" />
            <p>No properties found</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Properties;
