import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bed,
  Search,
  Plus,
  Users,
  Maximize,
  Eye,
  MoreVertical,
  Wifi,
  Tv,
  Wind,
  Wine,
  Lock,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { rooms, HOTEL_COLOR } from '@/data/hotel/hotelData';
import { useTranslation } from 'react-i18next';

export const Rooms = () => {
  const { t } = useTranslation('hotel');
  const [searchQuery, setSearchQuery] = useState('');
  const [floorFilter, setFloorFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const uniqueFloors = useMemo(() => {
    const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);
    return floors;
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(rooms.map(r => r.category))];
    return categories;
  }, []);

  const stats = useMemo(() => {
    const total = rooms.length;
    const occupied = rooms.filter(r => r.status === 'occupied').length;
    const available = rooms.filter(r => r.status === 'available').length;
    const maintenance = rooms.filter(r => r.status === 'maintenance').length;
    const reserved = rooms.filter(r => r.status === 'reserved').length;
    const occupancyRate = Math.round((occupied / total) * 100);

    return { total, occupied, available, maintenance, reserved, occupancyRate };
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.roomNo.includes(searchQuery) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFloor = floorFilter === 'all' || room.floor === floorFilter;
      const matchesCategory = categoryFilter === 'all' || room.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || room.status === statusFilter;

      return matchesSearch && matchesFloor && matchesCategory && matchesStatus;
    });
  }, [searchQuery, floorFilter, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'available': '#10b981',
      'occupied': '#ef4444',
      'reserved': '#3b82f6',
      'maintenance': '#f59e0b',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, typeof Wifi> = {
      'Wi-Fi': Wifi,
      'TV': Tv,
      'AC': Wind,
      'Minibar': Wine,
      'Safe': Lock,
    };
    return icons[amenity] || Wifi;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  const statusMap: Record<string, string> = {
    'all': t('rooms.all'),
    'available': t('status.available'),
    'occupied': t('status.occupied'),
    'reserved': t('status.reserved'),
    'maintenance': t('status.maintenance'),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('rooms.title')}
        subtitle={t('rooms.subtitle')}
        icon={Bed}
        actions={
          <Button>
            <Plus size={18} />
            {t('rooms.addNewRoom')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: t('rooms.totalRooms'), value: stats.total, color: HOTEL_COLOR },
          { label: t('rooms.occupied'), value: stats.occupied, color: '#ef4444' },
          { label: t('rooms.available'), value: stats.available, color: '#10b981' },
          { label: t('rooms.reserved'), value: stats.reserved, color: '#3b82f6' },
          { label: t('rooms.maintenance'), value: stats.maintenance, color: '#f59e0b' },
          { label: t('rooms.occupancyRate'), value: `${stats.occupancyRate}%`, color: '#6366f1' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
              <div
                className="mt-2 h-1 rounded-full"
                style={{ backgroundColor: `${stat.color}30` }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: typeof stat.value === 'number' ? `${(stat.value / stats.total) * 100}%` : '100%',
                    backgroundColor: stat.color,
                  }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('rooms.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={floorFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFloorFilter('all')}
            >
              {t('rooms.allFloors')}
            </Button>
            {uniqueFloors.map((floor) => (
              <Button
                key={floor}
                variant={floorFilter === floor ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFloorFilter(floor)}
              >
                {t('rooms.floor', { floor })}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={categoryFilter === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
            >
              {t('rooms.allTypes')}
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {['all', 'available', 'occupied', 'reserved', 'maintenance'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: status === 'all' ? '#64748b' : getStatusColor(status) }}
              />
              {statusMap[status]}
            </Button>
          ))}
        </div>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room, index) => {
          const statusColor = getStatusColor(room.status);

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${statusColor}20` }}
                    >
                      <span className="text-xl font-bold" style={{ color: statusColor }}>
                        {room.roomNo}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{room.type}</p>
                      <p className="text-xs text-text-muted">{t('rooms.floor', { floor: room.floor })} - {room.view}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('rooms.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('rooms.editRoom'), onClick: () => {} },
                      { id: 'assign', label: t('rooms.assignGuest'), onClick: () => {} },
                      { id: 'maintenance', label: t('rooms.requestMaintenance'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Room Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-text-muted">
                      <Bed size={14} /> {room.bedType}
                    </span>
                    <span className="flex items-center gap-1 text-text-muted">
                      <Users size={14} /> {room.capacity}
                    </span>
                    <span className="flex items-center gap-1 text-text-muted">
                      <Maximize size={14} /> {room.size} m²
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: HOTEL_COLOR }}>
                      {formatCurrency(room.currentPrice)}
                    </span>
                    <span className="text-xs text-text-muted">{t('rooms.perNight')}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                  >
                    {t(`status.${room.status}`)}
                  </span>
                  {room.cleaningStatus === 'dirty' && (
                    <span className="px-2 py-0.5 rounded text-xs bg-warning/20 text-warning">
                      {t('rooms.needsCleaning')}
                    </span>
                  )}
                </div>

                {/* Guest Info (if occupied or reserved) */}
                {room.status === 'occupied' && room.currentGuest && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: HOTEL_COLOR }}
                      >
                        {room.currentGuest.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{room.currentGuest}</p>
                        <p className="text-xs text-text-muted">{t('rooms.checkout', { date: room.checkOut })}</p>
                      </div>
                    </div>
                  </div>
                )}

                {room.status === 'reserved' && room.reservationGuest && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <div className="flex items-center gap-2">
                      <Eye size={14} className="text-text-muted" />
                      <div>
                        <p className="text-sm text-text-primary">{room.reservationGuest}</p>
                        <p className="text-xs text-text-muted">{t('rooms.arriving', { date: room.checkIn })}</p>
                      </div>
                    </div>
                  </div>
                )}

                {room.status === 'maintenance' && room.maintenanceIssue && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-warning">{room.maintenanceIssue}</p>
                  </div>
                )}

                {/* Amenities */}
                <div className="mt-3 pt-3 border-t border-border-default">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 5).map((amenity) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <span
                          key={amenity}
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-background-secondary text-text-muted"
                          title={amenity}
                        >
                          <Icon size={10} />
                          {amenity}
                        </span>
                      );
                    })}
                    {room.amenities.length > 5 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-background-secondary text-text-muted">
                        +{room.amenities.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="p-12 text-center">
          <Bed size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('rooms.noRoomsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Rooms;
