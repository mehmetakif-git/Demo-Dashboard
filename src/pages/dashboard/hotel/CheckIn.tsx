import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LogIn,
  LogOut,
  Search,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { reservations, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const CheckIn = () => {
  const { t } = useTranslation('hotel');
  const [view, setView] = useState<'checkin' | 'checkout'>('checkin');
  const [searchQuery, setSearchQuery] = useState('');

  const todayArrivals = useMemo(() => {
    const today = '2024-01-17';
    return reservations.filter(r =>
      r.checkInDate === today && r.status === 'confirmed'
    );
  }, []);

  const todayDepartures = useMemo(() => {
    const today = '2024-01-17';
    return reservations.filter(r =>
      r.checkOutDate === today && r.status === 'checked-in'
    );
  }, []);

  const filteredArrivals = useMemo(() => {
    return todayArrivals.filter(res =>
      res.confirmationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.guestName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todayArrivals, searchQuery]);

  const filteredDepartures = useMemo(() => {
    return todayDepartures.filter(res =>
      res.roomNo?.includes(searchQuery) ||
      res.guestName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todayDepartures, searchQuery]);

  const stats = useMemo(() => ({
    arrivals: todayArrivals.length,
    departures: todayDepartures.length,
    pendingCheckins: todayArrivals.filter(r => r.status === 'confirmed').length,
    pendingCheckouts: todayDepartures.filter(r => r.paymentStatus !== 'paid').length,
  }), [todayArrivals, todayDepartures]);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('checkIn.title')}
        subtitle={t('checkIn.subtitle')}
        icon={LogIn}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('checkIn.todaysArrivals'), value: stats.arrivals, icon: LogIn, color: '#10b981' },
          { label: t('checkIn.todaysDepartures'), value: stats.departures, icon: LogOut, color: '#f59e0b' },
          { label: t('checkIn.pendingCheckins'), value: stats.pendingCheckins, icon: Clock, color: '#3b82f6' },
          { label: t('checkIn.pendingCheckouts'), value: stats.pendingCheckouts, icon: AlertCircle, color: '#ef4444' },
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

      {/* View Toggle & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={view === 'checkin' ? 'primary' : 'ghost'}
              onClick={() => setView('checkin')}
            >
              <LogIn size={18} className="mr-2" />
              {t('checkIn.checkInCount', { count: stats.arrivals })}
            </Button>
            <Button
              variant={view === 'checkout' ? 'primary' : 'ghost'}
              onClick={() => setView('checkout')}
            >
              <LogOut size={18} className="mr-2" />
              {t('checkIn.checkOutCount', { count: stats.departures })}
            </Button>
          </div>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={view === 'checkin' ? t('checkIn.searchCheckin') : t('checkIn.searchCheckout')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Check-in View */}
      {view === 'checkin' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{t('checkIn.expectedArrivals')}</h3>
          {filteredArrivals.length > 0 ? (
            filteredArrivals.map((res, index) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Guest Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: HOTEL_COLOR }}
                        >
                          {res.guestName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{res.guestName}</p>
                          <p className="text-xs font-mono text-text-muted">{res.confirmationNo}</p>
                        </div>
                      </div>

                      {/* Room Type & Assignment */}
                      <div className="text-center">
                        <p className="text-sm font-medium text-text-primary">{res.roomType}</p>
                        {res.roomNo ? (
                          <span
                            className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                            style={{ backgroundColor: `${HOTEL_COLOR}20`, color: HOTEL_COLOR }}
                          >
                            {t('checkIn.roomAssigned', { roomNo: res.roomNo })}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 bg-warning/20 text-warning">
                            {t('checkIn.notAssigned')}
                          </span>
                        )}
                      </div>

                      {/* Stay Duration */}
                      <div className="text-center">
                        <p className="text-sm text-text-muted">{t('checkIn.nights', { count: res.nights })}</p>
                        <p className="text-xs text-text-muted">{t('checkIn.until', { date: res.checkOutDate })}</p>
                      </div>

                      {/* Payment Status */}
                      <div className="text-center">
                        <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                          {formatCurrency(res.totalAmount)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            res.paymentStatus === 'paid' ? 'bg-success/20 text-success' :
                            res.paymentStatus === 'partial' ? 'bg-warning/20 text-warning' :
                            'bg-error/20 text-error'
                          }`}
                        >
                          {t(`status.${res.paymentStatus}`)}
                        </span>
                      </div>

                      {/* Check-in Button */}
                      <Button variant="primary">
                        <CheckCircle size={18} className="mr-2" />
                        {t('checkIn.checkIn')}
                      </Button>
                    </div>

                    {/* Special Requests */}
                    {res.specialRequests && (
                      <div className="mt-3 pt-3 border-t border-border-default">
                        <p className="text-xs text-text-muted">
                          <span className="font-medium">{t('checkIn.specialRequests')}</span> {res.specialRequests}
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center">
              <LogIn size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary">{t('checkIn.noArrivals')}</p>
            </Card>
          )}
        </div>
      )}

      {/* Check-out View */}
      {view === 'checkout' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{t('checkIn.expectedDepartures')}</h3>
          {filteredDepartures.length > 0 ? (
            filteredDepartures.map((res, index) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Room & Guest Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                      >
                        <span className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                          {res.roomNo}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{res.guestName}</p>
                        <p className="text-xs text-text-muted">{t('checkIn.checkInDate', { date: res.checkInDate })}</p>
                      </div>
                    </div>

                    {/* Stay Duration */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-text-primary">{t('checkIn.nights', { count: res.nights })}</p>
                      <p className="text-xs text-text-muted">{res.roomType}</p>
                    </div>

                    {/* Balance Due */}
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                        {formatCurrency(res.totalAmount - res.paidAmount)}
                      </p>
                      <p className="text-xs text-text-muted">{t('checkIn.balanceDue')}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="secondary">
                        <CreditCard size={18} className="mr-2" />
                        {t('checkIn.viewBill')}
                      </Button>
                      <Button variant="primary">
                        <LogOut size={18} className="mr-2" />
                        {t('checkIn.checkOut')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center">
              <LogOut size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary">{t('checkIn.noDepartures')}</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckIn;
