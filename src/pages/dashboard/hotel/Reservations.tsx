import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Plus,
  Users,
  CreditCard,
  Clock,
  MoreVertical,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { reservations, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const Reservations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const today = '2024-01-17';
    const todayArrivals = reservations.filter(r => r.checkInDate === today && r.status === 'confirmed').length;
    const todayDepartures = reservations.filter(r => r.checkOutDate === today && r.status === 'checked-in').length;
    const totalBookings = reservations.length;
    const totalRevenue = reservations.reduce((acc, r) => acc + r.totalAmount, 0);

    return { todayArrivals, todayDepartures, totalBookings, totalRevenue };
  }, []);

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      const matchesSearch = res.confirmationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || res.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'confirmed': '#3b82f6',
      'checked-in': '#10b981',
      'checked-out': '#64748b',
      'cancelled': '#ef4444',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'partial': '#f59e0b',
      'pending': '#ef4444',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reservations"
        subtitle="Manage hotel reservations and bookings"
        icon={Calendar}
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
          { label: "Today's Arrivals", value: stats.todayArrivals, icon: CheckCircle, color: '#10b981' },
          { label: "Today's Departures", value: stats.todayDepartures, icon: AlertCircle, color: '#f59e0b' },
          { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: HOTEL_COLOR },
          { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: CreditCard, color: '#6366f1' },
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
                    <p className="text-xl font-bold text-text-primary">{stat.value}</p>
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
              placeholder="Search by confirmation no, guest name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'confirmed', 'checked-in', 'checked-out', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((res, index) => {
          const statusColor = getStatusColor(res.status);
          const paymentColor = getPaymentStatusColor(res.paymentStatus);

          return (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Confirmation & Guest Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: HOTEL_COLOR }}
                    >
                      {res.guestName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{res.guestName}</p>
                        <span className="text-xs font-mono text-text-muted bg-background-secondary px-2 py-0.5 rounded">
                          {res.confirmationNo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Mail size={12} /> {res.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {res.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Check-in</p>
                        <p className="font-medium text-text-primary">{res.checkInDate}</p>
                      </div>
                      <span className="text-text-muted">→</span>
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Check-out</p>
                        <p className="font-medium text-text-primary">{res.checkOutDate}</p>
                      </div>
                    </div>
                    <p className="text-xs text-text-muted mt-1">{res.nights} nights</p>
                  </div>

                  {/* Room Info */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">{res.roomType}</p>
                    {res.roomNo ? (
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                        style={{ backgroundColor: `${HOTEL_COLOR}20`, color: HOTEL_COLOR }}
                      >
                        Room {res.roomNo}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted mt-1">Not assigned</span>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-text-muted" />
                    <span className="text-sm text-text-primary">
                      {res.adults} Adult{res.adults > 1 ? 's' : ''}
                      {res.children > 0 && `, ${res.children} Child${res.children > 1 ? 'ren' : ''}`}
                    </span>
                  </div>

                  {/* Amount & Payment */}
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                      {formatCurrency(res.totalAmount)}
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                        style={{ backgroundColor: `${paymentColor}20`, color: paymentColor }}
                      >
                        {res.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                  >
                    {res.status.replace('-', ' ')}
                  </span>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit Reservation', onClick: () => {} },
                      { id: 'assign', label: 'Assign Room', onClick: () => {} },
                      { id: 'checkin', label: 'Check-in', onClick: () => {} },
                      { id: 'cancel', label: 'Cancel', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Special Requests & Source */}
                {(res.specialRequests || res.source) && (
                  <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                    {res.specialRequests && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {res.specialRequests}
                      </span>
                    )}
                    <span className="bg-background-secondary px-2 py-0.5 rounded">
                      Source: {res.source}
                    </span>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredReservations.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No reservations found</p>
        </Card>
      )}
    </div>
  );
};

export default Reservations;
