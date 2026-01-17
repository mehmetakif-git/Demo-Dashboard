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

export const Transport = () => {
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
        title="Transport Management"
        subtitle="Manage school transport routes and students"
        icon={Bus}
        actions={
          <Button>
            <Plus size={18} />
            Add Route
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Routes', value: stats.totalRoutes, icon: MapPin, color: EDUCATION_COLOR },
          { label: 'Total Buses', value: stats.totalBuses, icon: Bus, color: '#10b981' },
          { label: 'Students Using', value: stats.totalStudents, icon: Users, color: '#f59e0b' },
          { label: 'Utilization', value: `${stats.utilizationRate}%`, icon: Bus, color: '#6366f1' },
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
              Routes
            </Button>
            <Button
              variant={view === 'students' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('students')}
            >
              Students
            </Button>
          </div>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={view === 'routes' ? 'Search routes...' : 'Search students...'}
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
                All Routes
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
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'edit', label: 'Edit Route', onClick: () => {} },
                        { id: 'assign', label: 'Assign Students', onClick: () => {} },
                        { id: 'track', label: 'Track Bus', onClick: () => {} },
                      ]}
                    />
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: EDUCATION_COLOR }}
                    >
                      {route.driverName.split(' ').map(n => n[0]).join('')}
                    </div>
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
                      <span className="text-text-muted">Vehicle No</span>
                      <span className="text-text-primary font-mono">{route.vehicleNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Students</span>
                      <span className="text-text-primary">{route.studentCount} / {route.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Timing</span>
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
                    <p className="text-xs text-text-muted mt-1">{utilization}% capacity</p>
                  </div>

                  {/* Stops */}
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted mb-2">Stops</p>
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
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: EDUCATION_COLOR }}
                      >
                        {ts.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
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
                      className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={{
                        backgroundColor: ts.status === 'active' ? '#10b98120' : '#64748b20',
                        color: ts.status === 'active' ? '#10b981' : '#64748b',
                      }}
                    >
                      {ts.status}
                    </span>

                    {/* Actions */}
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'change', label: 'Change Route', onClick: () => {} },
                        { id: 'remove', label: 'Remove from Transport', onClick: () => {} },
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
          <p className="text-text-secondary">No {view} found</p>
        </Card>
      )}
    </div>
  );
};

export default Transport;
