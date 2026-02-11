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
import { useTranslation } from 'react-i18next';

export const FrontDesk = () => {
  const { t } = useTranslation('hotel');
  const today = '2024-01-17';

  const stats = useMemo(() => {
    const occupied = rooms.filter(r => r.status === 'occupied').length;
    const total = rooms.length;
    const arrivals = reservations.filter(r => r.checkInDate === today && r.status === 'confirmed').length;
    const departures = reservations.filter(r => r.checkOutDate === today && r.status === 'checked-in').length;
    const walkIns = 2;

    return {
      occupancy: `${occupied}/${total}`,
      occupancyRate: Math.round((occupied / total) * 100),
      arrivals,
      departures,
      walkIns,
      requests: 3,
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
        title={t('frontDesk.title')}
        subtitle={t('frontDesk.subtitle')}
        icon={ConciergeBell}
      />

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: t('frontDesk.occupancy'), value: stats.occupancy, subtext: `${stats.occupancyRate}%`, color: HOTEL_COLOR },
          { label: t('frontDesk.arrivalsToday'), value: stats.arrivals, icon: LogIn, color: '#10b981' },
          { label: t('frontDesk.departuresToday'), value: stats.departures, icon: LogOut, color: '#f59e0b' },
          { label: t('frontDesk.walkIns'), value: stats.walkIns, icon: Users, color: '#3b82f6' },
          { label: t('frontDesk.pendingRequests'), value: stats.requests, icon: MessageSquare, color: '#ef4444' },
          { label: t('frontDesk.availableRooms'), value: rooms.filter(r => r.status === 'available').length, icon: Bed, color: '#10b981' },
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
        <h3 className="font-semibold text-text-primary mb-4">{t('frontDesk.quickActions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: t('frontDesk.newReservation'), icon: Plus, color: HOTEL_COLOR },
            { label: t('frontDesk.quickCheckIn'), icon: LogIn, color: '#10b981' },
            { label: t('frontDesk.quickCheckOut'), icon: LogOut, color: '#f59e0b' },
            { label: t('frontDesk.roomChange'), icon: Bed, color: '#3b82f6' },
            { label: t('frontDesk.guestRequest'), icon: MessageSquare, color: '#ec4899' },
            { label: t('frontDesk.issueKeyCard'), icon: Key, color: '#6366f1' },
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
          <h3 className="font-semibold text-text-primary mb-4">{t('frontDesk.roomStatusBoard')}</h3>
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
                  <p className="text-xs text-text-muted">{t(`status.${room.status}`)}</p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success" /> {t('frontDesk.available')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error" /> {t('frontDesk.occupied')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" /> {t('frontDesk.reserved')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning" /> {t('frontDesk.maintenance')}
            </span>
          </div>
        </Card>

        {/* Guest Requests */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('frontDesk.recentGuestRequests')}</h3>
          <div className="space-y-3">
            {[
              { room: '102', guest: 'Ahmet Yilmaz', request: t('frontDesk.extraTowels'), time: '10:30', status: 'pending' },
              { room: '201', guest: 'Fatma Demir', request: t('frontDesk.wakeUpCall'), time: '09:45', status: 'completed' },
              { room: '203', guest: 'Zeynep Kaya', request: t('frontDesk.ironAndBoard'), time: '11:15', status: 'in-progress' },
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
                    className={`text-xs px-2 py-0.5 rounded ${
                      req.status === 'completed' ? 'bg-success/20 text-success' :
                      req.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                      'bg-warning/20 text-warning'
                    }`}
                  >
                    {t(`status.${req.status === 'in-progress' ? 'inProgress' : req.status}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3">
            {t('frontDesk.viewAllRequests')}
          </Button>
        </Card>
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">{t('frontDesk.todaysArrivals')}</h3>
            <span className="text-sm font-medium" style={{ color: HOTEL_COLOR }}>
              {t('frontDesk.guests', { count: stats.arrivals })}
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
                <Button size="sm" variant="primary">{t('frontDesk.checkIn')}</Button>
              </div>
            ))}
          {stats.arrivals === 0 && (
            <p className="text-sm text-text-muted text-center py-4">{t('frontDesk.noArrivalsToday')}</p>
          )}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">{t('frontDesk.todaysDepartures')}</h3>
            <span className="text-sm font-medium text-warning">
              {t('frontDesk.guests', { count: stats.departures })}
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
                    <p className="text-xs text-text-muted">{t('reservations.room', { roomNo: res.roomNo })}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary">{t('frontDesk.checkOut')}</Button>
              </div>
            ))}
          {stats.departures === 0 && (
            <p className="text-sm text-text-muted text-center py-4">{t('frontDesk.noDeparturesToday')}</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FrontDesk;
