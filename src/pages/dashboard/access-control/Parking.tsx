import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Car,
  ParkingCircle,
  Clock,
  MapPin,
  Zap,
  Accessibility,
  Star,
  Users,
  Wrench,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { parkingSpots, getParkingStatusColor, type ParkingSpot } from '@/data/accessControlData';
import { useTranslation } from 'react-i18next';

export const Parking = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const zones = useMemo(() => {
    const unique = [...new Set(parkingSpots.map(p => p.zone))];
    return unique.sort();
  }, []);

  const stats = useMemo(() => ({
    total: parkingSpots.length,
    available: parkingSpots.filter(p => p.status === 'available').length,
    occupied: parkingSpots.filter(p => p.status === 'occupied').length,
    reserved: parkingSpots.filter(p => p.status === 'reserved').length,
    maintenance: parkingSpots.filter(p => p.status === 'maintenance').length,
  }), []);

  const filteredSpots = useMemo(() => {
    let filtered = [...parkingSpots];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.spotNumber.toLowerCase().includes(query) ||
          p.zone.toLowerCase().includes(query) ||
          (p.vehiclePlate && p.vehiclePlate.toLowerCase().includes(query)) ||
          (p.assignedTo && p.assignedTo.toLowerCase().includes(query))
      );
    }

    if (selectedZone !== 'all') {
      filtered = filtered.filter(p => p.zone === selectedZone);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedZone, selectedType, selectedStatus]);

  const getStatusBadge = (status: ParkingSpot['status']) => {
    const config = {
      available: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Available' },
      occupied: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Occupied' },
      reserved: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Reserved' },
      maintenance: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Maintenance' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeIcon = (type: ParkingSpot['type']) => {
    switch (type) {
      case 'regular': return Car;
      case 'handicap': return Accessibility;
      case 'ev': return Zap;
      case 'reserved': return Star;
      case 'visitor': return Users;
      default: return Car;
    }
  };

  const getTypeBadge = (type: ParkingSpot['type']) => {
    const config = {
      regular: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
      handicap: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      ev: { bg: 'bg-green-500/20', text: 'text-green-400' },
      reserved: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]' },
      visitor: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    };
    const c = config[type];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {type}
      </span>
    );
  };

  const formatDuration = (entryTime?: string) => {
    if (!entryTime) return '-';
    const entry = new Date(entryTime);
    const now = new Date();
    const diffMs = now.getTime() - entry.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
    return `${diffMins}m`;
  };

  // Group spots by zone for map view
  const spotsByZone = useMemo(() => {
    return filteredSpots.reduce((acc, spot) => {
      if (!acc[spot.zone]) acc[spot.zone] = [];
      acc[spot.zone].push(spot);
      return acc;
    }, {} as Record<string, ParkingSpot[]>);
  }, [filteredSpots]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('access-control.parkingManagement', 'Parking Management')}
        subtitle="Monitor and manage parking spaces across all zones"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Wrench size={16} />}>
              Maintenance Mode
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              Add Spot
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title="Total Spots"
          value={stats.total.toString()}
          icon={ParkingCircle}
          iconColor="#547792"
        />
        <StatsCard
          title="Available"
          value={stats.available.toString()}
          icon={Car}
          iconColor="#10b981"
        />
        <StatsCard
          title="Occupied"
          value={stats.occupied.toString()}
          icon={Car}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Reserved"
          value={stats.reserved.toString()}
          icon={Star}
          iconColor="#3b82f6"
        />
        <StatsCard
          title="Maintenance"
          value={stats.maintenance.toString()}
          icon={Wrench}
          iconColor="#f59e0b"
        />
      </div>

      {/* Occupancy Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Occupancy Overview</h3>
          <span className="text-sm text-text-secondary">
            {Math.round((stats.occupied / stats.total) * 100)}% Full
          </span>
        </div>
        <div className="w-full h-4 bg-white/[0.05] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-red-500 transition-all"
            style={{ width: `${(stats.occupied / stats.total) * 100}%` }}
          />
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(stats.reserved / stats.total) * 100}%` }}
          />
          <div
            className="h-full bg-yellow-500 transition-all"
            style={{ width: `${(stats.maintenance / stats.total) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Available ({stats.available})
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            Occupied ({stats.occupied})
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Reserved ({stats.reserved})
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            Maintenance ({stats.maintenance})
          </div>
        </div>
      </Card>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search spots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Zones</option>
              {zones.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Types</option>
              <option value="regular">Regular</option>
              <option value="handicap">Handicap</option>
              <option value="ev">EV Charging</option>
              <option value="reserved">Reserved</option>
              <option value="visitor">Visitor</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded transition-all ${
                viewMode === 'map'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Parking Spots Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSpots.map((spot, index) => {
            const TypeIcon = getTypeIcon(spot.type);
            return (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className={`p-4 text-center cursor-pointer hover:shadow-lg transition-all ${
                  spot.status === 'available' ? 'hover:border-green-500/50' :
                  spot.status === 'occupied' ? 'opacity-75' : ''
                }`}>
                  {/* Status Indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                    style={{ backgroundColor: getParkingStatusColor(spot.status) }}
                  />

                  <div className="pt-2">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      spot.status === 'available' ? 'bg-green-500/20' :
                      spot.status === 'occupied' ? 'bg-red-500/20' :
                      spot.status === 'reserved' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                    }`}>
                      <TypeIcon size={24} className={
                        spot.status === 'available' ? 'text-green-400' :
                        spot.status === 'occupied' ? 'text-red-400' :
                        spot.status === 'reserved' ? 'text-blue-400' : 'text-yellow-400'
                      } />
                    </div>

                    {/* Spot Number */}
                    <h4 className="font-bold text-text-primary text-lg">{spot.spotNumber}</h4>
                    <p className="text-xs text-text-muted mb-2">{spot.zone.split(' - ')[1]}</p>

                    {/* Status Badge */}
                    {getStatusBadge(spot.status)}

                    {/* Vehicle Info */}
                    {spot.vehiclePlate && (
                      <div className="mt-3 pt-2 border-t border-white/[0.08]">
                        <p className="text-xs text-text-secondary font-mono">{spot.vehiclePlate}</p>
                        {spot.entryTime && (
                          <p className="text-xs text-text-muted mt-1">
                            <Clock size={10} className="inline mr-1" />
                            {formatDuration(spot.entryTime)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Assigned To */}
                    {spot.assignedTo && !spot.vehiclePlate && (
                      <div className="mt-3 pt-2 border-t border-white/[0.08]">
                        <p className="text-xs text-text-secondary">{spot.assignedTo}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Zone-based List View */
        <div className="space-y-6">
          {Object.entries(spotsByZone).map(([zone, spots]) => (
            <Card key={zone} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent-primary" />
                  <h3 className="font-semibold text-text-primary">{zone}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-400">
                    {spots.filter(s => s.status === 'available').length} available
                  </span>
                  <span className="text-red-400">
                    {spots.filter(s => s.status === 'occupied').length} occupied
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Spot</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Type</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Status</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Vehicle</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Assigned To</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-text-secondary">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {spots.map(spot => (
                      <tr key={spot.id} className="hover:bg-white/[0.05] transition-colors">
                        <td className="py-2 px-3 font-medium text-text-primary">{spot.spotNumber}</td>
                        <td className="py-2 px-3">{getTypeBadge(spot.type)}</td>
                        <td className="py-2 px-3">{getStatusBadge(spot.status)}</td>
                        <td className="py-2 px-3 text-sm text-text-secondary font-mono">
                          {spot.vehiclePlate || '-'}
                        </td>
                        <td className="py-2 px-3 text-sm text-text-secondary">
                          {spot.assignedTo || '-'}
                        </td>
                        <td className="py-2 px-3 text-sm text-text-secondary">
                          {formatDuration(spot.entryTime)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredSpots.length === 0 && (
        <Card className="p-12 text-center">
          <ParkingCircle size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No parking spots found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
