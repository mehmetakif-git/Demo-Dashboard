import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Plus,
  Clock,
  CheckCircle,
  MapPin,
  Users,
  MoreVertical,
  Star,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { amenities, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const Amenities = () => {
  const { t } = useTranslation('hotel');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(amenities.map(a => a.category))];
    return categories;
  }, []);

  const stats = useMemo(() => ({
    total: amenities.length,
    active: amenities.filter(a => a.status === 'operational').length,
    free: amenities.filter(a => a.priceRange.toLowerCase().includes('free')).length,
    premium: amenities.filter(a => !a.priceRange.toLowerCase().includes('free')).length,
  }), []);

  const filteredAmenities = useMemo(() => {
    return amenities.filter(amenity => {
      const matchesSearch = amenity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        amenity.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'available' && amenity.status === 'operational') ||
        (statusFilter === 'unavailable' && amenity.status !== 'operational');

      const matchesCategory = categoryFilter === 'all' || amenity.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Recreation': '#10b981',
      'Dining': '#f59e0b',
      'Wellness': '#ec4899',
      'Business': '#3b82f6',
      'Transportation': '#8b5cf6',
      'Services': '#06b6d4',
    };
    return colors[category] || HOTEL_COLOR;
  };

  const statusFilters: Record<string, string> = {
    'all': t('amenities.all'),
    'available': t('status.available'),
    'unavailable': t('amenities.unavailable'),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('amenities.title')}
        subtitle={t('amenities.subtitle')}
        icon={Sparkles}
        actions={
          <Button>
            <Plus size={18} />
            {t('amenities.addAmenity')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('amenities.totalAmenities'), value: stats.total, icon: Sparkles, color: HOTEL_COLOR },
          { label: t('amenities.available'), value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: t('amenities.freeAmenities'), value: stats.free, icon: Star, color: '#f59e0b' },
          { label: t('amenities.premiumServices'), value: stats.premium, icon: DollarSign, color: '#3b82f6' },
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
              placeholder={t('amenities.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={categoryFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
            >
              {t('amenities.allCategories')}
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'available', 'unavailable'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusFilters[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map((amenity, index) => {
          const categoryColor = getCategoryColor(amenity.category);

          return (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                {/* Amenity Header */}
                <div
                  className="h-24 relative flex items-center justify-center"
                  style={{ backgroundColor: `${categoryColor}20` }}
                >
                  <Sparkles size={36} style={{ color: categoryColor }} />
                  {!amenity.priceRange.toLowerCase().includes('free') && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary rounded text-xs text-white font-medium">
                      <DollarSign size={12} />
                      {t('amenities.premium')}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Amenity Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{amenity.name}</h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs mt-1"
                        style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                      >
                        {amenity.category}
                      </span>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('amenities.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('amenities.editAmenity'), onClick: () => {} },
                        { id: 'toggle', label: amenity.status === 'operational' ? t('amenities.markUnavailable') : t('amenities.markAvailable'), onClick: () => {} },
                        { id: 'delete', label: t('amenities.delete'), onClick: () => {} },
                      ]}
                    />
                  </div>

                  <p className="text-xs text-text-muted mb-3 line-clamp-2">{amenity.description}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <MapPin size={12} />
                      <span>{amenity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock size={12} />
                      <span>{amenity.openingHours}</span>
                    </div>
                    {amenity.capacity && (
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Users size={12} />
                        <span>{t('amenities.capacity', { capacity: amenity.capacity })}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Status */}
                  <div className="flex items-end justify-between pt-3 border-t border-border-default">
                    <div>
                      {amenity.priceRange.toLowerCase().includes('free') ? (
                        <p className="text-lg font-bold text-success">{t('amenities.free')}</p>
                      ) : (
                        <>
                          <p className="text-sm font-bold" style={{ color: HOTEL_COLOR }}>
                            {amenity.priceRange}
                          </p>
                        </>
                      )}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        amenity.status === 'operational'
                          ? 'bg-success/20 text-success'
                          : 'bg-error/20 text-error'
                      }`}
                    >
                      {amenity.status === 'operational' ? t('status.available') : amenity.status}
                    </span>
                  </div>

                  {/* Reservation Required */}
                  {amenity.bookable && (
                    <div className="mt-3 pt-3 border-t border-border-default">
                      <p className="text-xs text-warning flex items-center gap-1">
                        <Clock size={12} />
                        {t('amenities.reservationAvailable')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredAmenities.length === 0 && (
        <Card className="p-12 text-center">
          <Sparkles size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('amenities.noAmenitiesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Amenities;
