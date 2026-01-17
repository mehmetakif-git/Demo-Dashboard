import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ConciergeBell,
  LogIn,
  LogOut,
  Plus,
  Users,
  MessageSquare,
  Key,
  Bed,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { rooms, reservations, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const FrontDesk = () => {
  const today = '2024-01-17';

  const stats = useMemo(() => {
    const occupied = rooms.filter(r => r.status === 'occupied').length;
    const total = rooms.length;
    const arrivals = reservations.filter(r => r.checkInDate === today && r.status === 'confirmed').length;
    const departures = reservations.filter(r => r.checkOutDate === today && r.status === 'checked-in').length;
    const walkIns = 2; // Mock

    return {
      occupancy: `${occupied}/${total}`,
      occupancyRate: Math.round((occupied / total) * 100),
      arrivals,
      departures,
      walkIns,
      requests: 3, // Mock
    };
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'available': '#10b981',
      'occupied': '#ef4444',
      'reserved': '#3b82f6',
      'maintenance': '#f59e0b',
    };
    return colors[status] || HOTEL_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Front Desk"
        subtitle="Real-time hotel operations dashboard"
        icon={ConciergeBell}
      />

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Occupancy', value: stats.occupancy, subtext: `${stats.occupancyRate}%`, color: HOTEL_COLOR },
          { label: 'Arrivals Today', value: stats.arrivals, icon: LogIn, color: '#10b981' },
          { label: 'Departures Today', value: stats.departures, icon: LogOut, color: '#f59e0b' },
          { label: 'Walk-ins', value: stats.walkIns, icon: Users, color: '#3b82f6' },
          { label: 'Pending Requests', value: stats.requests, icon: MessageSquare, color: '#ef4444' },
          { label: 'Available Rooms', value: rooms.filter(r => r.status === 'available').length, icon: Bed, color: '#10b981' },
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
                <div className="text-center">
                  {Icon && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon size={20} style={{ color: stat.color }} />
                    </div>
                  )}
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  {stat.subtext && (
                    <p className="text-sm font-medium" style={{ color: stat.color }}>{stat.subtext}</p>
                  )}
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'New Reservation', icon: Plus, color: HOTEL_COLOR },
            { label: 'Quick Check-in', icon: LogIn, color: '#10b981' },
            { label: 'Quick Check-out', icon: LogOut, color: '#f59e0b' },
            { label: 'Room Change', icon: Bed, color: '#3b82f6' },
            { label: 'Guest Request', icon: MessageSquare, color: '#ec4899' },
            { label: 'Issue Key Card', icon: Key, color: '#6366f1' },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                className="h-auto py-4 flex-col gap-2"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <Icon size={20} style={{ color: action.color }} />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Board */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Room Status Board</h3>
          <div className="grid grid-cols-4 gap-2">
            {rooms.map((room) => {
              const color = getStatusColor(room.status);
              return (
                <button
                  key={room.id}
                  className="p-3 rounded-lg text-center transition-all hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <span className="text-lg font-bold" style={{ color }}>
                    {room.roomNo}
                  </span>
                  <p className="text-xs text-text-muted capitalize">{room.status}</p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error" /> Occupied
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" /> Reserved
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning" /> Maintenance
            </span>
          </div>
        </Card>

        {/* Guest Requests */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Recent Guest Requests</h3>
          <div className="space-y-3">
            {[
              { room: '102', guest: 'Ahmet Yilmaz', request: 'Extra towels', time: '10:30', status: 'pending' },
              { room: '201', guest: 'Fatma Demir', request: 'Wake-up call 7:00 AM', time: '09:45', status: 'completed' },
              { room: '203', guest: 'Zeynep Kaya', request: 'Iron and ironing board', time: '11:15', status: 'in-progress' },
            ].map((req, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                  >
                    <span className="font-bold" style={{ color: HOTEL_COLOR }}>{req.room}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{req.request}</p>
                    <p className="text-xs text-text-muted">{req.guest}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">{req.time}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded capitalize ${
                      req.status === 'completed' ? 'bg-success/20 text-success' :
                      req.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                      'bg-warning/20 text-warning'
                    }`}
                  >
                    {req.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3">
            View All Requests
          </Button>
        </Card>
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Arrivals */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Today's Arrivals</h3>
            <span className="text-sm font-medium" style={{ color: HOTEL_COLOR }}>
              {stats.arrivals} guests
            </span>
          </div>
          {reservations
            .filter(r => r.checkInDate === today && r.status === 'confirmed')
            .map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between p-3 bg-background-secondary rounded-lg mb-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: HOTEL_COLOR }}
                  >
                    {res.guestName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{res.guestName}</p>
                    <p className="text-xs text-text-muted">{res.roomType}</p>
                  </div>
                </div>
                <Button size="sm" variant="primary">Check-in</Button>
              </div>
            ))}
          {stats.arrivals === 0 && (
            <p className="text-sm text-text-muted text-center py-4">No arrivals today</p>
          )}
        </Card>

        {/* Today's Departures */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Today's Departures</h3>
            <span className="text-sm font-medium text-warning">
              {stats.departures} guests
            </span>
          </div>
          {reservations
            .filter(r => r.checkOutDate === today && r.status === 'checked-in')
            .map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between p-3 bg-background-secondary rounded-lg mb-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                  >
                    <span className="font-bold" style={{ color: HOTEL_COLOR }}>{res.roomNo}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{res.guestName}</p>
                    <p className="text-xs text-text-muted">Room {res.roomNo}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary">Check-out</Button>
              </div>
            ))}
          {stats.departures === 0 && (
            <p className="text-sm text-text-muted text-center py-4">No departures today</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FrontDesk;
