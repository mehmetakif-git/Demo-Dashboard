import { useState, useMemo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Search,
  Truck,
  User,
  Clock,
  Navigation,
  Package,
  Loader2,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { vehicles, shipments, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

// Lazy load the map component for better performance
const TrackingMap = lazy(() => import('@/components/logistics/TrackingMap'));

export const Tracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.plateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vehicle.driverName && vehicle.driverName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'on-route': '#3b82f6',
      'maintenance': '#f59e0b',
      'out-of-service': '#64748b',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getActiveShipment = (vehicleId: string) => {
    return shipments.find(s => s.vehicleId === vehicleId && s.status === 'in-transit');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Real-time Vehicle Tracking"
        subtitle="Track vehicles and shipments in real-time"
        icon={MapPin}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card className="p-4 h-[600px]">
            <Suspense
              fallback={
                <div className="w-full h-full bg-background-tertiary rounded-lg flex flex-col items-center justify-center">
                  <Loader2 size={48} className="text-text-muted animate-spin mb-4" />
                  <p className="text-text-muted">Loading map...</p>
                </div>
              }
            >
              <TrackingMap
                vehicles={vehicles}
                selectedVehicle={selectedVehicle}
                onVehicleSelect={setSelectedVehicle}
              />
            </Suspense>
          </Card>
        </div>

        {/* Vehicle List Panel */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-[600px] flex flex-col">
            <div className="mb-4">
              <h3 className="font-semibold text-text-primary mb-3">Vehicle List</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {['all', 'on-route', 'active', 'maintenance'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="text-xs px-2 py-1"
                  >
                    {status === 'all' ? 'All' : status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredVehicles.map((vehicle, index) => {
                const activeShipment = getActiveShipment(vehicle.id);
                const isSelected = selectedVehicle === vehicle.id;

                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-background-tertiary border-2 border-accent-primary'
                        : 'bg-background-secondary hover:bg-background-tertiary border-2 border-transparent'
                    }`}
                    onClick={() => setSelectedVehicle(isSelected ? null : vehicle.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(vehicle.status)}20` }}
                        >
                          <Truck size={16} style={{ color: getStatusColor(vehicle.status) }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary text-sm">{vehicle.plateNo}</p>
                          <span
                            className="inline-block px-1.5 py-0.5 rounded text-xs font-medium capitalize"
                            style={{ backgroundColor: `${getStatusColor(vehicle.status)}20`, color: getStatusColor(vehicle.status) }}
                          >
                            {vehicle.status.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {vehicle.driverName && (
                      <div className="flex items-center gap-1 text-xs text-text-muted mb-1">
                        <User size={10} />
                        <span>{vehicle.driverName}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <MapPin size={10} />
                      <span className="truncate">{vehicle.currentLocation}</span>
                    </div>

                    {activeShipment && (
                      <div className="mt-2 p-2 bg-background-primary rounded">
                        <div className="flex items-center gap-1 text-xs text-text-muted mb-1">
                          <Package size={10} />
                          <span>{activeShipment.trackingNo}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Navigation size={10} className="text-success" />
                          <span className="text-text-secondary truncate">{activeShipment.destination}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-text-muted mt-2">
                      <Clock size={10} />
                      <span>Last updated: Just now</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Shipment Tracking Section */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Track Shipment</h3>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Enter tracking number (e.g., QTR-2024-001)"
              className="pl-10"
            />
          </div>
          <Button>Track</Button>
        </div>

        {/* Active Shipments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shipments.filter(s => s.status === 'in-transit').map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-background-secondary rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-medium text-text-primary">{shipment.trackingNo}</span>
                <span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs font-medium">
                  In Transit
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{shipment.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation size={14} className="text-success" />
                  <span className="text-sm text-text-primary">{shipment.destination}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border-default">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Truck size={12} />
                    <span>{shipment.vehiclePlate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={12} />
                    <span>ETA: {shipment.estimatedDelivery}</span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary mt-2">{shipment.currentLocation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {filteredVehicles.length === 0 && (
        <Card className="p-12 text-center">
          <Truck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No vehicles found</p>
        </Card>
      )}
    </div>
  );
};

export default Tracking;
