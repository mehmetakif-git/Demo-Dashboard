import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  User,
  Phone,
  Mail,
  Truck,
  Star,
  Calendar,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { drivers, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';
import { getProfileImage } from '@/utils/profileImages';

export const Drivers = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [licenseExpiryAlert, setLicenseExpiryAlert] = useState(false);

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'active': t('status.active'),
    'on-leave': t('status.onLeave'),
    'inactive': t('status.inactive'),
  };

  const stats = useMemo(() => {
    const total = drivers.length;
    const active = drivers.filter(d => d.status === 'active').length;
    const onLeave = drivers.filter(d => d.status === 'on-leave').length;
    const avgRating = drivers.length > 0
      ? (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1)
      : '0';

    // Check for expiring licenses (within 90 days)
    const expiringLicenses = drivers.filter(d => {
      const expiry = new Date(d.licenseExpiry);
      const now = new Date();
      const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0;
    }).length;

    return { total, active, onLeave, avgRating, expiringLicenses };
  }, []);

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.employeeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.licenseNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;

      // License expiry filter
      if (licenseExpiryAlert) {
        const expiry = new Date(driver.licenseExpiry);
        const now = new Date();
        const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 90) return false;
      }

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, licenseExpiryAlert]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'on-leave': '#f59e0b',
      'inactive': '#64748b',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 90;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('drivers.title')}
        subtitle={t('drivers.subtitle')}
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            {t('drivers.addDriver')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('drivers.totalDrivers'), value: stats.total, icon: Users, color: LOGISTICS_COLOR },
          { label: t('drivers.active'), value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: t('drivers.onLeave'), value: stats.onLeave, icon: Clock, color: '#f59e0b' },
          { label: t('drivers.avgRating'), value: stats.avgRating, icon: Star, color: '#f59e0b' },
          { label: t('drivers.licenseAlerts'), value: stats.expiringLicenses, icon: AlertTriangle, color: stats.expiringLicenses > 0 ? '#ef4444' : '#10b981' },
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
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
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
              placeholder={t('drivers.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={licenseExpiryAlert ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setLicenseExpiryAlert(!licenseExpiryAlert)}
          >
            <AlertTriangle size={16} />
            {t('drivers.licenseExpiring')}
          </Button>
          <div className="flex gap-2">
            {['all', 'active', 'on-leave', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Drivers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.driver')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.license')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.contact')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.vehicle')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.rating')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.trips')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('drivers.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver, index) => (
                <motion.tr
                  key={driver.id}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const profileImage = getProfileImage(driver.name);
                        return profileImage ? (
                          <img
                            src={profileImage}
                            alt={driver.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                          >
                            <User size={20} style={{ color: LOGISTICS_COLOR }} />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium text-text-primary">{driver.name}</p>
                        <p className="text-xs font-mono text-text-muted">{driver.employeeNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-mono text-text-primary">{driver.licenseNo}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={10} className={isLicenseExpiringSoon(driver.licenseExpiry) ? 'text-warning' : 'text-text-muted'} />
                      <span className={`text-xs ${isLicenseExpiringSoon(driver.licenseExpiry) ? 'text-warning' : 'text-text-muted'}`}>
                        {t('drivers.exp')} {new Date(driver.licenseExpiry).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone size={12} className="text-text-muted" />
                      <span className="text-text-secondary">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <Mail size={12} className="text-text-muted" />
                      <span className="text-text-secondary truncate max-w-[150px]">{driver.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(driver.status)}20`, color: getStatusColor(driver.status) }}
                    >
                      {statusMap[driver.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {driver.vehiclePlate ? (
                      <div className="flex items-center gap-1">
                        <Truck size={14} className="text-text-muted" />
                        <span className="text-text-primary">{driver.vehiclePlate}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-text-muted">{t('drivers.unassigned')}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={14} className="text-warning fill-warning" />
                      <span className="font-medium text-text-primary">{driver.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-medium text-text-primary">{driver.totalTrips.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('drivers.viewProfile'), onClick: () => {} },
                        { id: 'edit', label: t('drivers.edit'), onClick: () => {} },
                        { id: 'assign', label: t('drivers.assignVehicle'), onClick: () => {} },
                        { id: 'performance', label: t('drivers.performance'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredDrivers.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('drivers.noDriversFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Drivers;
