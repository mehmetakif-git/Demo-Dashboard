import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  MoreVertical,
  MapPin,
  Bed,
  Bath,
  Car,
  Square,
  User,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { properties, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Listings = () => {
  const { t } = useTranslation('realestate');
  const [searchQuery, setSearchQuery] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const forSale = properties.filter(p => p.listingType === 'For Sale').length;
    const forRent = properties.filter(p => p.listingType === 'For Rent').length;
    const available = properties.filter(p => p.status === 'available').length;
    const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);

    return { forSale, forRent, available, totalValue };
  }, []);

  const filteredListings = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesListingType = listingTypeFilter === 'all' || property.listingType === listingTypeFilter;

      return matchesSearch && matchesListingType;
    });
  }, [searchQuery, listingTypeFilter]);

  const formatPrice = (price: number | null, rentPrice: number | null, listingType: string) => {
    if (listingType === 'For Sale' && price) {
      return `QAR ${price.toLocaleString()}`;
    }
    if (listingType === 'For Rent' && rentPrice) {
      return `QAR ${rentPrice.toLocaleString()}/month`;
    }
    return 'N/A';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('listings.title')}
        subtitle={t('listings.subtitle')}
        icon={Home}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('listings.forSale'), value: stats.forSale, color: REALESTATE_COLOR },
          { label: t('listings.forRent'), value: stats.forRent, color: '#3b82f6' },
          { label: t('listings.available'), value: stats.available, color: '#10b981' },
          { label: t('listings.totalValue'), value: `QAR ${(stats.totalValue / 1000000).toFixed(1)}M`, color: '#f59e0b' },
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
                  <Home size={20} style={{ color: stat.color }} />
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
              placeholder={t('listings.searchListings')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'For Sale', 'For Rent'].map((type) => (
              <Button
                key={type}
                variant={listingTypeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setListingTypeFilter(type)}
              >
                {type === 'all' ? t('listings.allListings') : type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Listings Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('listings.property')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('listings.type')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('listings.details')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('listings.price')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('listings.agent')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('listings.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('listings.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings.map((property, index) => (
                <motion.tr
                  key={property.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                      >
                        <Home size={18} style={{ color: REALESTATE_COLOR }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{property.title}</p>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <MapPin size={10} />
                          <span>{property.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: property.listingType === 'For Sale' ? '#10b98120' : '#3b82f620',
                        color: property.listingType === 'For Sale' ? '#10b981' : '#3b82f6'
                      }}
                    >
                      {property.listingType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      {property.bedrooms !== null && (
                        <div className="flex items-center gap-1">
                          <Bed size={12} className="text-text-muted" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Bath size={12} className="text-text-muted" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square size={12} className="text-text-muted" />
                        <span>{property.area} {property.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car size={12} className="text-text-muted" />
                        <span>{property.parking}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div>
                      <p className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                        {formatPrice(property.price, property.rentPrice, property.listingType)}
                      </p>
                      <p className="text-xs text-text-muted">{property.propertyType}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{property.agentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(property.status)}20`, color: getStatusColor(property.status) }}
                    >
                      {property.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('listings.viewListing'), onClick: () => {} },
                        { id: 'edit', label: t('listings.editListing'), onClick: () => {} },
                        { id: 'share', label: t('listings.share'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredListings.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Home size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('listings.noListingsFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Listings;
