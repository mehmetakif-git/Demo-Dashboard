import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarClock,
  Search,
  Plus,
  Clock,
  CheckCircle,
  Users,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { reservations, tables } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const Reservations = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');

  const stats = useMemo(() => ({
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    seated: reservations.filter(r => r.status === 'seated').length,
  }), []);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      const matchesSearch = res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.customerPhone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || res.status === statusFilter;

      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = res.date === today;
      } else if (dateFilter === 'tomorrow') {
        matchesDate = res.date === tomorrow;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, dateFilter, today, tomorrow]);

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'phone': return 'bg-accent-primary/20 text-accent-primary';
      case 'website': return 'bg-success/20 text-success';
      case 'app': return 'bg-warning/20 text-warning';
      case 'walk-in': return 'bg-accent-secondary/20 text-accent-secondary';
      default: return 'bg-background-secondary text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.reservations', 'Reservations')}
        subtitle="Manage table reservations"
        icon={CalendarClock}
        actions={
          <Button>
            <Plus size={18} />
            New Reservation
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: CalendarClock, color: '#f97316' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
          { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: '#10b981' },
          { label: 'Seated', value: stats.seated, icon: Users, color: '#6366f1' },
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
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['today', 'tomorrow', 'all'].map((date) => (
              <Button
                key={date}
                variant={dateFilter === date ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDateFilter(date)}
              >
                {date.charAt(0).toUpperCase() + date.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'confirmed', 'seated'].map((status) => (
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

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation, index) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Customer Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                      <Users size={20} className="text-[#f97316]" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{reservation.customerName}</p>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {reservation.customerPhone}
                        </span>
                        {reservation.customerEmail && (
                          <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {reservation.customerEmail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Calendar size={14} />
                      <span className="text-sm font-medium">
                        {new Date(reservation.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">Date</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Clock size={14} />
                      <span className="text-sm font-medium">{reservation.time}</span>
                    </div>
                    <p className="text-xs text-text-muted">Time</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Users size={14} />
                      <span className="text-sm font-medium">{reservation.partySize}</span>
                    </div>
                    <p className="text-xs text-text-muted">Guests</p>
                  </div>
                  {reservation.tableNumber && (
                    <div className="text-center">
                      <span className="text-sm font-medium text-[#f97316]">Table {reservation.tableNumber}</span>
                      <p className="text-xs text-text-muted">Assigned</p>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={reservation.status} />
                  <span className={`px-2 py-1 rounded text-xs ${getSourceBadge(reservation.source)}`}>
                    {reservation.source}
                  </span>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'confirm', label: 'Confirm', onClick: () => {} },
                      { id: 'assign', label: 'Assign Table', onClick: () => {} },
                      { id: 'seat', label: 'Mark as Seated', onClick: () => {} },
                      { id: 'cancel', label: 'Cancel', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Notes & Special Requests */}
              {(reservation.notes || reservation.specialRequests) && (
                <div className="mt-3 pt-3 border-t border-border-default">
                  {reservation.specialRequests && (
                    <div className="flex items-start gap-2 text-sm">
                      <MessageSquare size={14} className="text-warning mt-0.5" />
                      <span className="text-warning">{reservation.specialRequests}</span>
                    </div>
                  )}
                  {reservation.notes && (
                    <p className="text-xs text-text-muted mt-1">Note: {reservation.notes}</p>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <Card className="p-12 text-center">
          <CalendarClock size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No reservations found</p>
        </Card>
      )}

      {/* Available Tables */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Available Tables</h3>
        <div className="flex flex-wrap gap-2">
          {tables.filter(t => t.status === 'available').map((table) => (
            <div
              key={table.id}
              className="px-3 py-2 bg-success/20 border border-success rounded-lg text-center"
            >
              <p className="font-medium text-success">Table {table.number}</p>
              <p className="text-xs text-success/80">{table.capacity} seats</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reservations;
