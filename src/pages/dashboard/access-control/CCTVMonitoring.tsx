import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  AlertTriangle,
  CheckCircle,
  Circle,
  LayoutGrid,
  Grid3X3,
  Square,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { cameras, getCameraStatusColor } from '@/data/accessControlData';

type GridLayout = '2x2' | '3x3' | '4x4';

export const CCTVMonitoring = () => {
  const [gridLayout, setGridLayout] = useState<GridLayout>('3x3');
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [mutedCameras, setMutedCameras] = useState<Set<string>>(new Set());

  const onlineCameras = useMemo(() =>
    cameras.filter(c => c.status === 'online'),
    []
  );

  const stats = useMemo(() => ({
    online: cameras.filter(c => c.status === 'online').length,
    offline: cameras.filter(c => c.status === 'offline').length,
    maintenance: cameras.filter(c => c.status === 'maintenance').length,
    recording: cameras.filter(c => c.recording).length,
  }), []);

  const gridConfig = {
    '2x2': { cols: 2, count: 4 },
    '3x3': { cols: 3, count: 9 },
    '4x4': { cols: 4, count: 16 },
  };

  const displayCameras = selectedCamera
    ? cameras.filter(c => c.id === selectedCamera)
    : onlineCameras.slice(0, gridConfig[gridLayout].count);

  const toggleMute = (cameraId: string) => {
    setMutedCameras(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cameraId)) {
        newSet.delete(cameraId);
      } else {
        newSet.add(cameraId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'offline':
        return <AlertTriangle size={14} className="text-red-400" />;
      case 'maintenance':
        return <Settings size={14} className="text-yellow-400" />;
      default:
        return <Circle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="CCTV Monitoring"
        subtitle="Live camera feeds and surveillance monitoring"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Settings size={16} />}
            >
              Settings
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.online}</p>
              <p className="text-sm text-text-secondary">Online</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.offline}</p>
              <p className="text-sm text-text-secondary">Offline</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Settings size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.maintenance}</p>
              <p className="text-sm text-text-secondary">Maintenance</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Video size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.recording}</p>
              <p className="text-sm text-text-secondary">Recording</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Grid Layout:</span>
            <div className="flex gap-1 p-1 bg-background-secondary rounded-lg">
              <button
                onClick={() => { setGridLayout('2x2'); setSelectedCamera(null); }}
                className={`p-2 rounded transition-all ${
                  gridLayout === '2x2' && !selectedCamera
                    ? 'bg-accent-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="2x2 Grid"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => { setGridLayout('3x3'); setSelectedCamera(null); }}
                className={`p-2 rounded transition-all ${
                  gridLayout === '3x3' && !selectedCamera
                    ? 'bg-accent-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="3x3 Grid"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => { setGridLayout('4x4'); setSelectedCamera(null); }}
                className={`p-2 rounded transition-all ${
                  gridLayout === '4x4' && !selectedCamera
                    ? 'bg-accent-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="4x4 Grid"
              >
                <Square size={16} />
              </button>
            </div>
          </div>

          {selectedCamera && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedCamera(null)}
            >
              Back to Grid
            </Button>
          )}
        </div>
      </Card>

      {/* Camera Grid */}
      <div
        className={`grid gap-4 ${
          selectedCamera
            ? 'grid-cols-1'
            : gridLayout === '2x2'
            ? 'grid-cols-1 md:grid-cols-2'
            : gridLayout === '3x3'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {displayCameras.map((camera, index) => (
          <motion.div
            key={camera.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`overflow-hidden ${selectedCamera ? 'h-[600px]' : 'h-[200px] md:h-[240px]'}`}>
              {/* Camera Feed (Simulated) */}
              <div className="relative h-full bg-background-tertiary">
                {/* Simulated Video Feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video size={48} className="text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-muted">Live Feed</p>
                    <p className="text-xs text-text-muted mt-1">{camera.resolution}</p>
                  </div>
                </div>

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleMute(camera.id)}
                          className="p-1.5 bg-black/50 rounded hover:bg-black/70 transition-colors"
                        >
                          {mutedCameras.has(camera.id) ? (
                            <VolumeX size={14} className="text-white" />
                          ) : (
                            <Volume2 size={14} className="text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
                          className="p-1.5 bg-black/50 rounded hover:bg-black/70 transition-colors"
                        >
                          <Maximize2 size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Camera Info Overlay */}
                <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between">
                  <div className="bg-black/50 rounded px-2 py-1">
                    <p className="text-xs font-medium text-white">{camera.name}</p>
                    <p className="text-[10px] text-white/70">{camera.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {camera.recording && (
                      <div className="flex items-center gap-1 bg-red-500/80 rounded px-2 py-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] text-white font-medium">REC</span>
                      </div>
                    )}
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCameraStatusColor(camera.status) }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Camera List Sidebar */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">All Cameras</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {cameras.map(camera => (
            <button
              key={camera.id}
              onClick={() => camera.status === 'online' && setSelectedCamera(camera.id)}
              disabled={camera.status !== 'online'}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                selectedCamera === camera.id
                  ? 'bg-accent-primary/20 border border-accent-primary'
                  : camera.status === 'online'
                  ? 'bg-background-tertiary hover:bg-background-secondary'
                  : 'bg-background-tertiary opacity-50 cursor-not-allowed'
              }`}
            >
              {getStatusIcon(camera.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{camera.name}</p>
                <p className="text-xs text-text-secondary truncate">{camera.location}</p>
              </div>
              {camera.recording && camera.status === 'online' && (
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
