import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Camera,
  Video,
  MapPin,
  Wifi,
  WifiOff,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  Power,
  RefreshCw,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { cameras, getCameraStatusColor, type Camera as CameraType } from '@/data/accessControlData';

export const Cameras = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: cameras.length,
    online: cameras.filter(c => c.status === 'online').length,
    offline: cameras.filter(c => c.status === 'offline').length,
    maintenance: cameras.filter(c => c.status === 'maintenance').length,
  }), []);

  const filteredCameras = useMemo(() => {
    let filtered = [...cameras];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query) ||
          c.ipAddress.includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(c => c.type === selectedType);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedType]);

  const getStatusBadge = (status: CameraType['status']) => {
    const config = {
      online: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Online' },
      offline: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Offline' },
      maintenance: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Maintenance' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: CameraType['type']) => {
    const config = {
      indoor: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      outdoor: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
      ptz: { bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
    };
    const c = config[type];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${c.bg} ${c.text}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cameras"
        subtitle="Manage and configure security cameras"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Add Camera
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Cameras"
          value={stats.total.toString()}
          icon={Camera}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Online"
          value={stats.online.toString()}
          icon={Wifi}
          iconColor="#10b981"
        />
        <StatsCard
          title="Offline"
          value={stats.offline.toString()}
          icon={WifiOff}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Maintenance"
          value={stats.maintenance.toString()}
          icon={Settings}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Types</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="ptz">PTZ</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-background-secondary rounded-lg">
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
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Camera Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all group">
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getCameraStatusColor(camera.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                        <Camera size={20} className="text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{camera.name}</h3>
                        <p className="text-xs text-text-secondary">{camera.ipAddress}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-background-tertiary rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-text-secondary">
                    <MapPin size={14} />
                    <span>{camera.location}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(camera.status)}
                    {getTypeBadge(camera.type)}
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-background-tertiary text-text-secondary">
                      {camera.resolution}
                    </span>
                  </div>

                  {/* Recording Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <Video size={14} className={camera.recording ? 'text-red-400' : 'text-text-muted'} />
                    <span className={`text-sm ${camera.recording ? 'text-red-400' : 'text-text-muted'}`}>
                      {camera.recording ? 'Recording' : 'Not Recording'}
                    </span>
                    {camera.recording && (
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="pt-3 border-t border-border-default space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between">
                      <span>Last Maintenance</span>
                      <span className="text-text-primary">
                        {new Date(camera.lastMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Installed</span>
                      <span className="text-text-primary">
                        {new Date(camera.installDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-default">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Edit size={14} />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                      <RefreshCw size={14} />
                      Restart
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                      <Power size={14} />
                      {camera.status === 'online' ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Camera</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Resolution</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Recording</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">IP Address</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredCameras.map((camera, index) => (
                  <motion.tr
                    key={camera.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-background-tertiary transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                          <Camera size={16} className="text-accent-primary" />
                        </div>
                        <span className="font-medium text-text-primary">{camera.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{camera.location}</td>
                    <td className="py-3 px-4">{getStatusBadge(camera.status)}</td>
                    <td className="py-3 px-4">{getTypeBadge(camera.type)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{camera.resolution}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${camera.recording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                        <span className="text-sm text-text-secondary">
                          {camera.recording ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary font-mono">{camera.ipAddress}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredCameras.length === 0 && (
        <Card className="p-12 text-center">
          <Camera size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No cameras found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
