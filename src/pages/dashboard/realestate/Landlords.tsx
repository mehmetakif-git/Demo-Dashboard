import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Search,
  MoreVertical,
  Building,
  Phone,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { landlords, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Landlords = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = landlords.length;
    const individual = landlords.filter(l => l.type === 'Individual').length;
    const corporate = landlords.filter(l => l.type === 'Corporate').length;
    const totalProperties = landlords.reduce((sum, l) => sum + l.totalProperties, 0);

    return { total, individual, corporate, totalProperties };
  }, []);

  const filteredLandlords = useMemo(() => {
    return landlords.filter(landlord => {
      const matchesSearch = landlord.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        landlord.landlordNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        landlord.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || landlord.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const types = ['all', 'Individual', 'Corporate', 'Developer'];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Individual': '#8b5cf6',
      'Corporate': '#3b82f6',
      'Developer': '#f59e0b',
    };
    return colors[type] || REALESTATE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('realestate.landlords', 'Landlords')}
        subtitle="Manage property owners and landlords"
        icon={User}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Landlords', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Individual', value: stats.individual, color: '#8b5cf6' },
          { label: 'Corporate', value: stats.corporate, color: '#3b82f6' },
          { label: 'Total Properties', value: stats.totalProperties, color: '#f59e0b' },
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
                  <User size={20} style={{ color: stat.color }} />
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
              placeholder="Search landlords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Landlords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLandlords.map((landlord, index) => (
          <motion.div
            key={landlord.id}
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
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getTypeColor(landlord.type)}20` }}
                    >
                      {landlord.type === 'Individual' ? (
                        <User size={24} style={{ color: getTypeColor(landlord.type) }} />
                      ) : (
                        <Building size={24} style={{ color: getTypeColor(landlord.type) }} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{landlord.name}</p>
                      <p className="text-xs text-text-muted font-mono">{landlord.landlordNo}</p>
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
                      { id: 'properties', label: 'View Properties', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Type Badge */}
                <div>
                  <span
                    className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${getTypeColor(landlord.type)}20`, color: getTypeColor(landlord.type) }}
                  >
                    {landlord.type}
                  </span>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail size={14} className="text-text-muted" />
                    <span className="truncate">{landlord.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone size={14} className="text-text-muted" />
                    <span>{landlord.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={14} className="text-text-muted" />
                    <span className="truncate">{landlord.address}</span>
                  </div>
                </div>

                {/* Properties & Status */}
                <div className="flex justify-between items-center pt-2 border-t border-border-default">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Building size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">{landlord.totalProperties} properties</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">{landlord.activeTenancies} tenants</span>
                    </div>
                  </div>
                  <span
                    className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${getStatusColor(landlord.status)}20`, color: getStatusColor(landlord.status) }}
                  >
                    {landlord.status.charAt(0).toUpperCase() + landlord.status.slice(1)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredLandlords.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-text-muted">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>No landlords found</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Landlords;
