import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Package,
  MapPin,
  Phone,
  Clock,
  User,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  drivers,
  deliverySchedule,
  dashboardStats,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

export const Delivery = () => {
  const { t } = useTranslation('laundry');
  const [selectedDriver, setSelectedDriver] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const stats = dashboardStats;

  const filteredSchedule = useMemo(() => {
    let filtered = [...deliverySchedule];

    if (selectedDriver !== 'all') {
      filtered = filtered.filter((d) => d.driverId === selectedDriver);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((d) => d.type === selectedType);
    }

    if (selectedDate) {
      filtered = filtered.filter((d) => d.scheduledDate === selectedDate);
    }

    return filtered;
  }, [selectedDriver, selectedType, selectedDate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400';
      case 'scheduled':
        return 'bg-amber-500/20 text-amber-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'on-route':
        return 'bg-blue-500/20 text-blue-400';
      case 'off-duty':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('delivery.title')}
        subtitle={t('delivery.subtitle')}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('delivery.pendingPickups')}
          value={stats.pendingPickups.toString()}
          icon={Package}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title={t('delivery.pendingDeliveries')}
          value={stats.pendingDeliveries.toString()}
          icon={Truck}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title={t('delivery.activeDrivers')}
          value={drivers.filter((d) => d.status !== 'off-duty').length.toString()}
          icon={User}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('delivery.avgTurnaround')}
          value={`${stats.avgTurnaroundHours}h`}
          icon={Clock}
          iconColor="#f59e0b"
        />
      </div>

      {/* Drivers Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{t('delivery.drivers')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers.map((driver) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedDriver === driver.id
                  ? 'bg-sky-500/10 border-sky-500/50'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15]'
              }`}
              onClick={() => setSelectedDriver(selectedDriver === driver.id ? 'all' : driver.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Truck size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{driver.name}</p>
                    <p className="text-xs text-text-muted">{driver.vehiclePlate}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs ${getDriverStatusColor(driver.status)}`}>
                  {driver.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-muted">{t('delivery.pickups')}</p>
                  <p className="font-medium text-text-primary">{driver.todayPickups}</p>
                </div>
                <div>
                  <p className="text-text-muted">{t('delivery.deliveries')}</p>
                  <p className="font-medium text-text-primary">{driver.todayDeliveries}</p>
                </div>
              </div>

              {driver.currentLocation && driver.status !== 'off-duty' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                  <MapPin size={12} />
                  {driver.currentLocation}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Schedule Section */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-text-primary">{t('delivery.todaysSchedule')}</h3>

          <div className="flex gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            />

            <div className="flex gap-1 p-1 bg-white/[0.03] rounded-lg">
              {(['all', 'pickup', 'delivery'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded text-sm transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredSchedule.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  schedule.type === 'pickup' ? 'bg-purple-500/20' : 'bg-sky-500/20'
                }`}>
                  {schedule.type === 'pickup' ? (
                    <Package size={20} className="text-purple-400" />
                  ) : (
                    <Truck size={20} className="text-sky-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-text-primary">{schedule.orderNumber}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      schedule.type === 'pickup' ? 'bg-purple-500/20 text-purple-400' : 'bg-sky-500/20 text-sky-400'
                    }`}>
                      {schedule.type.charAt(0).toUpperCase() + schedule.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{schedule.customerName}</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                    <MapPin size={12} />
                    {schedule.customerAddress}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-text-primary">
                    <Clock size={14} className="text-text-muted" />
                    {schedule.scheduledTime}
                  </div>
                  {schedule.driverName && (
                    <p className="text-sm text-text-muted mt-1">{schedule.driverName}</p>
                  )}
                </div>

                <span className={`px-3 py-1 rounded text-xs ${getStatusColor(schedule.status)}`}>
                  {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                </span>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" leftIcon={<Phone size={14} />}>
                    {t('delivery.call')}
                  </Button>
                  {schedule.status === 'scheduled' && (
                    <Button size="sm" leftIcon={<CheckCircle size={14} />}>
                      {t('delivery.start')}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredSchedule.length === 0 && (
            <div className="text-center py-8">
              <Truck size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">{t('delivery.noScheduled')}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
