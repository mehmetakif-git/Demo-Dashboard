import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Vehicle type for map display
interface MapVehicle {
  id: string;
  plateNo: string;
  make: string;
  model: string;
  status: string;
  driverName: string | null;
  currentLocation: string;
  coordinates: { lat: number; lng: number };
}

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

// Custom marker icons based on vehicle status
const createVehicleIcon = (status: string) => {
  const colors: Record<string, string> = {
    'active': '#10b981',
    'on-route': '#3b82f6',
    'maintenance': '#f59e0b',
    'out-of-service': '#64748b',
  };
  const color = colors[status] || '#3b82f6';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg
          style="transform: rotate(45deg); width: 18px; height: 18px; color: white;"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

// Warehouse icon
const warehouseIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      background-color: #8b5cf6;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg
        style="width: 22px; height: 22px; color: white;"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/>
        <path d="M6 18h12"/>
        <path d="M6 14h12"/>
        <rect x="6" y="10" width="12" height="12"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Component to handle map center updates
const MapUpdater = ({ center, selectedVehicle }: { center: [number, number]; selectedVehicle: string | null }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle) {
      map.flyTo(center, 14, { duration: 0.5 });
    }
  }, [center, selectedVehicle, map]);

  return null;
};

interface TrackingMapProps {
  vehicles: MapVehicle[];
  selectedVehicle: string | null;
  onVehicleSelect: (vehicleId: string | null) => void;
}

export const TrackingMap = ({ vehicles, selectedVehicle, onVehicleSelect }: TrackingMapProps) => {
  // Doha Warehouse location
  const warehouseLocation: [number, number] = [25.2867, 51.5333];

  // Calculate map center
  const mapCenter = useMemo(() => {
    if (selectedVehicle) {
      const vehicle = vehicles.find(v => v.id === selectedVehicle);
      if (vehicle) {
        return [vehicle.coordinates.lat, vehicle.coordinates.lng] as [number, number];
      }
    }
    return warehouseLocation;
  }, [selectedVehicle, vehicles]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'on-route': '#3b82f6',
      'maintenance': '#f59e0b',
      'out-of-service': '#64748b',
    };
    return colors[status] || '#3b82f6';
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={warehouseLocation}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={mapCenter} selectedVehicle={selectedVehicle} />

        {/* Warehouse Marker */}
        <Marker position={warehouseLocation} icon={warehouseIcon}>
          <Popup>
            <div className="p-2">
              <h4 className="font-bold text-purple-600">Doha Warehouse</h4>
              <p className="text-sm text-gray-600">Main Distribution Center</p>
            </div>
          </Popup>
        </Marker>

        {/* Vehicle Markers */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.coordinates.lat, vehicle.coordinates.lng]}
            icon={createVehicleIcon(vehicle.status)}
            eventHandlers={{
              click: () => onVehicleSelect(vehicle.id),
            }}
          >
            <Popup>
              <div className="p-2 min-w-50">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium capitalize text-white"
                    style={{ backgroundColor: getStatusColor(vehicle.status) }}
                  >
                    {vehicle.status.replace(/-/g, ' ')}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800">{vehicle.plateNo}</h4>
                <p className="text-sm text-gray-600">{vehicle.make} {vehicle.model}</p>
                {vehicle.driverName && (
                  <p className="text-sm text-gray-500 mt-1">
                    Driver: {vehicle.driverName}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">{vehicle.currentLocation}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background-primary/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border-default z-1000">
        <p className="text-xs font-medium text-text-primary mb-2">Vehicle Status</p>
        <div className="space-y-1">
          {[
            { status: 'active', label: 'Active' },
            { status: 'on-route', label: 'On Route' },
            { status: 'maintenance', label: 'Maintenance' },
            { status: 'out-of-service', label: 'Parked' },
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getStatusColor(status) }}
              />
              <span className="text-xs text-text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
