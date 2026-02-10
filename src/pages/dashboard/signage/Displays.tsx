import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Monitor,
  MapPin,
  Wifi,
  WifiOff,
  Settings,
  RefreshCw,
  Send,
  Eye,
  LayoutGrid,
  List,
  MoreVertical,
  Maximize2,
  MonitorSmartphone,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { displays, displayGroups, type Display } from '@/data/signageData';

// Display images
import display1 from '@/assets/images/displays/display-1.webp';
import display2 from '@/assets/images/displays/display-2.webp';
import display3 from '@/assets/images/displays/display-3.webp';
import display4 from '@/assets/images/displays/display-4.webp';
import display5 from '@/assets/images/displays/display-5.webp';
import display6 from '@/assets/images/displays/display-6.webp';
import display7 from '@/assets/images/displays/display-7.webp';
import display8 from '@/assets/images/displays/display-8.webp';
import display9 from '@/assets/images/displays/display-9.webp';
import display10 from '@/assets/images/displays/display-10.webp';

// Map display IDs to images
const displayImages: Record<string, string> = {
  'DSP001': display1,  // Lobby Main Screen
  'DSP002': display2,  // Lobby Side Screen
  'DSP003': display3,  // Cafeteria Display
  'DSP004': display4,  // Floor 1 Info Board
  'DSP005': display5,  // Floor 2 Info Board
  'DSP006': display6,  // Meeting Room A Display
  'DSP007': display7,  // Meeting Room B Display
  'DSP008': display8,  // Warehouse Display
  'DSP009': display9,  // Reception Desk
  'DSP010': display10, // Parking Entrance Sign
};
import { useTranslation } from 'react-i18next';

export const Displays = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: displays.length,
    online: displays.filter(d => d.status === 'online').length,
    offline: displays.filter(d => d.status === 'offline').length,
    groups: displayGroups.length,
  }), []);

  const filteredDisplays = useMemo(() => {
    let filtered = [...displays];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(d => d.status === selectedStatus);
    }

    if (selectedGroup !== 'all') {
      filtered = filtered.filter(d => d.group === selectedGroup);
    }

    if (selectedOrientation !== 'all') {
      filtered = filtered.filter(d => d.orientation === selectedOrientation);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedGroup, selectedOrientation]);

  const uniqueGroups = useMemo(() => {
    return [...new Set(displays.map(d => d.group))].sort();
  }, []);

  const getStatusBadge = (status: Display['status']) => {
    const config = {
      online: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Online', icon: Wifi },
      offline: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Offline', icon: WifiOff },
    };
    const c = config[status];
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const getOrientationIcon = (orientation: Display['orientation']) => {
    return orientation === 'landscape' ? (
      <Monitor size={14} className="text-text-muted" />
    ) : (
      <MonitorSmartphone size={14} className="text-text-muted" />
    );
  };

  const formatLastSeen = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('signage.displayManagement', 'Display Management')}
        subtitle="Monitor and control all digital signage displays"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<RefreshCw size={16} />}>
              Refresh All
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              Add Display
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Displays"
          value={stats.total.toString()}
          icon={Monitor}
          iconColor="#547792"
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
          title="Groups"
          value={stats.groups.toString()}
          icon={LayoutGrid}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search displays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Groups</option>
              {uniqueGroups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select
              value={selectedOrientation}
              onChange={(e) => setSelectedOrientation(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Orientations</option>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
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

      {/* Displays Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDisplays.map((display, index) => (
            <motion.div
              key={display.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-0 overflow-hidden hover:shadow-lg transition-all group">
                {/* Display Preview */}
                <div className={`relative bg-white/[0.05] flex items-center justify-center overflow-hidden ${
                  display.orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16] max-h-48'
                }`}>
                  {displayImages[display.id] ? (
                    <img
                      src={displayImages[display.id]}
                      alt={display.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Monitor size={48} className="text-text-muted/30" />
                  )}
                  {/* Status Indicator */}
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                    display.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  {/* Recording Indicator */}
                  {display.status === 'online' && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/50 rounded text-xs text-white">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      LIVE
                    </div>
                  )}
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Eye size={18} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Maximize2 size={18} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Send size={18} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Display Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{display.name}</h3>
                      <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {display.location}
                      </p>
                    </div>
                    <button className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {getStatusBadge(display.status)}
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#94B4C1]/20 text-[#94B4C1]">
                      {getOrientationIcon(display.orientation)}
                      {display.orientation}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                      {display.resolution}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Current Content</span>
                      <span className="text-text-primary font-medium">{display.currentContent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Group</span>
                      <span className="text-text-primary">{display.group}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Last Seen</span>
                      <span className="text-text-primary">{formatLastSeen(display.lastSeen)}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.08]">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                      <Settings size={14} />
                      Settings
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
                      <Send size={14} />
                      Push
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
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Group</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Resolution</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Current Content</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Last Seen</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredDisplays.map((display, index) => (
                  <motion.tr
                    key={display.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors"
                  >
                    <td className="py-3 px-4">{getStatusBadge(display.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getOrientationIcon(display.orientation)}
                        <span className="font-medium text-text-primary">{display.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{display.location}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent-primary/20 text-accent-primary">
                        {display.group}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{display.resolution}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{display.currentContent}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{formatLastSeen(display.lastSeen)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400">
                          <Settings size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400">
                          <RefreshCw size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-[#94B4C1]">
                          <Send size={14} />
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

      {filteredDisplays.length === 0 && (
        <Card className="p-12 text-center">
          <Monitor size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No displays found matching your filters</p>
        </Card>
      )}

      {/* Display Groups Overview */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Display Groups</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayGroups.map(group => (
            <div
              key={group.id}
              className="p-3 bg-white/[0.05] rounded-lg hover:bg-white/[0.03] backdrop-blur-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <span className="text-sm font-medium text-text-primary">{group.name}</span>
              </div>
              <p className="text-xs text-text-secondary">{group.count} displays</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
