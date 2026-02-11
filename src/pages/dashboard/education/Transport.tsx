import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bus,
  Search,
  Plus,
  Users,
  Phone,
  MapPin,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { busRoutes, transportStudents, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Transport = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'routes' | 'students'>('routes');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalStudents = busRoutes.reduce((acc, r) => acc + r.studentCount, 0);
    const totalCapacity = busRoutes.reduce((acc, r) => acc + r.capacity, 0);

    return {
      totalRoutes: busRoutes.length,
      totalBuses: busRoutes.length,
      totalStudents,
      utilizationRate: Math.round((totalStudents / totalCapacity) * 100),
    };
  }, []);

  const filteredRoutes = useMemo(() => {
    return busRoutes.filter(route => {
      return route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.routeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const filteredStudents = useMemo(() => {
    return transportStudents.filter(ts => {
      const matchesSearch = ts.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ts.routeNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRoute = !selectedRoute || ts.routeId === selectedRoute;
      return matchesSearch && matchesRoute;
    });
  }, [searchQuery, selectedRoute]);

  const getRouteColor = (routeNo: string) => {
    const colors: Record<string, string> = {
      'R1': '#ef4444',
      'R2': '#3b82f6',
      'R3': '#10b981',
    };
    return colors[routeNo] || EDUCATION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('transport.title')}
        subtitle={t('transport.subtitle')}
        icon={Bus}
        actions={
          <Button>
            <Plus size={18} />
            {t('transport.addRoute')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('transport.totalRoutes'), value: stats.totalRoutes, icon: MapPin, color: EDUCATION_COLOR },
          { label: t('transport.totalBuses'), value: stats.totalBuses, icon: Bus, color: '#10b981' },
          { label: t('transport.studentsUsing'), value: stats.totalStudents, icon: Users, color: '#f59e0b' },
          { label: t('transport.utilization'), value: `${stats.utilizationRate}%`, icon: Bus, color: '#6366f1' },
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

      {/* View Toggle and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={view === 'routes' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('routes')}
            >
              {t('transport.routes')}
            </Button>
            <Button
              variant={view === 'students' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('students')}
            >
              {t('transport.students')}
            </Button>
          </div>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={view === 'routes' ? t('transport.searchRoutes') : t('transport.searchStudents')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {view === 'students' && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={!selectedRoute ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedRoute(null)}
              >
                {t('transport.allRoutes')}
              </Button>
              {busRoutes.map((route) => (
                <Button
                  key={route.id}
                  variant={selectedRoute === route.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedRoute(route.id)}
                >
                  {route.routeNo}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Content */}
      {view === 'routes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route, index) => {
            const routeColor = getRouteColor(route.routeNo);
            const utilization = Math.round((route.studentCount / route.capacity) * 100);

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${routeColor}20` }}
                      >
                        <Bus size={28} style={{ color: routeColor }} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-text-primary">{route.routeNo}</p>
                        <p className="text-sm text-text-muted">{route.routeName}</p>
                      </div>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('transport.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('transport.editRoute'), onClick: () => {} },
                        { id: 'assign', label: t('transport.assignStudents'), onClick: () => {} },
                        { id: 'track', label: t('transport.trackBus'), onClick: () => {} },
                      ]}
                    />
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg mb-3">
                    {(() => {
                      const driverImg = getProfileImage(route.driverName);
                      return driverImg ? (
                        <img
                          src={driverImg}
                          alt={route.driverName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: EDUCATION_COLOR }}
                        >
                          {route.driverName.split(' ').map(n => n[0]).join('')}
                        </div>
                      );
                    })()}
                    <div>
                      <p className="text-sm font-medium text-text-primary">{route.driverName}</p>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Phone size={12} />
                        {route.driverPhone}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t('transport.vehicleNo')}</span>
                      <span className="text-text-primary font-mono">{route.vehicleNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t('transport.studentsLabel')}</span>
                      <span className="text-text-primary">{route.studentCount} / {route.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t('transport.timing')}</span>
                      <span className="text-text-primary">{route.startTime} - {route.endTime}</span>
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div className="mt-3">
                    <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${utilization}%`,
                          backgroundColor: utilization > 90 ? '#ef4444' : routeColor,
                        }}
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-1">{t('transport.capacity', { percent: utilization })}</p>
                  </div>

                  {/* Stops */}
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted mb-2">{t('transport.stops')}</p>
                    <div className="flex flex-wrap gap-1">
                      {route.stops.map((stop, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-background-secondary text-text-secondary"
                        >
                          <MapPin size={10} />
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((ts, index) => {
            const routeColor = getRouteColor(ts.routeNo);

            return (
              <motion.div
                key={ts.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-3 flex-1">
                      {(() => {
                        const studentImg = getProfileImage(ts.studentName);
                        return studentImg ? (
                          <img
                            src={studentImg}
                            alt={ts.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: EDUCATION_COLOR }}
                          >
                            {ts.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-semibold text-text-primary">{ts.studentName}</p>
                        <p className="text-xs text-text-muted">{ts.className}</p>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${routeColor}20` }}
                      >
                        <Bus size={16} style={{ color: routeColor }} />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{ts.routeNo}</span>
                    </div>

                    {/* Pickup Point */}
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-text-muted" />
                      <span className="text-sm text-text-primary">{ts.pickupPoint}</span>
                    </div>

                    {/* Drop Point */}
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-success" />
                      <span className="text-sm text-text-primary">{ts.dropPoint}</span>
                    </div>

                    {/* Status */}
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: ts.status === 'active' ? '#10b98120' : '#64748b20',
                        color: ts.status === 'active' ? '#10b981' : '#64748b',
                      }}
                    >
                      {ts.status === 'active' ? t('status.active') : t('status.inactive')}
                    </span>

                    {/* Actions */}
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'change', label: t('transport.changeRoute'), onClick: () => {} },
                        { id: 'remove', label: t('transport.removeFromTransport'), onClick: () => {} },
                      ]}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {((view === 'routes' && filteredRoutes.length === 0) || (view === 'students' && filteredStudents.length === 0)) && (
        <Card className="p-12 text-center">
          <Bus size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{view === 'routes' ? t('transport.noRoutesFound') : t('transport.noStudentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Transport;
