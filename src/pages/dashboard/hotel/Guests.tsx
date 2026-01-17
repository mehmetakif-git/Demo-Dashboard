import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Star,
  Crown,
  MoreVertical,
  Calendar,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { guests, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const Guests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [vipFilter, setVipFilter] = useState<boolean | 'all'>('all');

  const stats = useMemo(() => {
    const total = guests.length;
    const vip = guests.filter(g => g.vip).length;
    const returning = guests.filter(g => g.totalStays > 1).length;
    const active = guests.filter(g => g.lastStay !== null).length;

    return { total, vip, returning, active };
  }, []);

  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.phone.includes(searchQuery) ||
        guest.idNo.includes(searchQuery);

      const matchesTier = tierFilter === 'all' || guest.membershipTier === tierFilter ||
        (tierFilter === 'none' && guest.membershipTier === null);

      const matchesVip = vipFilter === 'all' || guest.vip === vipFilter;

      return matchesSearch && matchesTier && matchesVip;
    });
  }, [searchQuery, tierFilter, vipFilter]);

  const getTierColor = (tier: string | null) => {
    const colors: Record<string, string> = {
      'Gold': '#f59e0b',
      'Silver': '#94a3b8',
      'Bronze': '#cd7f32',
    };
    return colors[tier || ''] || '#64748b';
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guest Management"
        subtitle="Manage hotel guests and profiles"
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            Add New Guest
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Guests', value: stats.total, icon: Users, color: HOTEL_COLOR },
          { label: 'VIP Guests', value: stats.vip, icon: Crown, color: '#f59e0b' },
          { label: 'Returning Guests', value: stats.returning, icon: Star, color: '#10b981' },
          { label: 'Active Guests', value: stats.active, icon: Calendar, color: '#3b82f6' },
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
              placeholder="Search by name, email, phone, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'Gold', 'Silver', 'Bronze', 'none'].map((tier) => (
              <Button
                key={tier}
                variant={tierFilter === tier ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTierFilter(tier)}
              >
                {tier === 'none' ? 'No Tier' : tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={vipFilter === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setVipFilter('all')}
            >
              All
            </Button>
            <Button
              variant={vipFilter === true ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setVipFilter(true)}
            >
              <Crown size={14} className="mr-1 text-warning" />
              VIP Only
            </Button>
          </div>
        </div>
      </Card>

      {/* Guests List */}
      <div className="space-y-4">
        {filteredGuests.map((guest, index) => {
          const tierColor = getTierColor(guest.membershipTier);

          return (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Guest Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: HOTEL_COLOR }}
                      >
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {guest.vip && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning flex items-center justify-center">
                          <Crown size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{guest.name}</p>
                        {guest.membershipTier && (
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{ backgroundColor: `${tierColor}20`, color: tierColor }}
                          >
                            {guest.membershipTier}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Mail size={12} /> {guest.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {guest.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ID Info */}
                  <div className="text-center">
                    <p className="text-sm text-text-muted">{guest.idType}</p>
                    <p className="text-sm font-mono text-text-primary">{guest.idNo}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-text-primary">{guest.totalStays}</p>
                      <p className="text-xs text-text-muted">Total Stays</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                        {formatCurrency(guest.totalSpent)}
                      </p>
                      <p className="text-xs text-text-muted">Total Spent</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {guest.lastStay || 'Never'}
                      </p>
                      <p className="text-xs text-text-muted">Last Stay</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Profile', onClick: () => {} },
                      { id: 'edit', label: 'Edit Guest', onClick: () => {} },
                      { id: 'reservation', label: 'New Reservation', onClick: () => {} },
                      { id: 'vip', label: guest.vip ? 'Remove VIP' : 'Mark as VIP', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Preferences */}
                {guest.preferences.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted mb-2">Preferences</p>
                    <div className="flex flex-wrap gap-1">
                      {guest.preferences.map((pref, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-xs bg-background-secondary text-text-secondary"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {guest.notes && (
                  <div className="mt-2">
                    <p className="text-xs text-text-muted italic">{guest.notes}</p>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredGuests.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No guests found</p>
        </Card>
      )}
    </div>
  );
};

export default Guests;
