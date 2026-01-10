import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  Monitor,
  ListVideo,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { schedules, type Schedule as ScheduleType } from '@/data/signageData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLAYLIST_COLORS: Record<string, string> = {
  'Welcome Playlist': '#547792',
  'Company News': '#94B4C1',
  'Menu & Announcements': '#f59e0b',
  'Department Updates': '#10b981',
  'Room Schedule': '#3b82f6',
  'Safety Guidelines': '#ef4444',
  'Visitor Welcome': '#ec4899',
  'Parking Info': '#14b8a6',
  'Holiday Special': '#f97316',
};

export const Schedule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisplay, setSelectedDisplay] = useState<string>('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const stats = useMemo(() => ({
    total: schedules.length,
    active: schedules.filter(s => s.status === 'active').length,
    displays: new Set(schedules.map(s => s.display)).size,
    playlists: new Set(schedules.map(s => s.playlist)).size,
  }), []);

  const filteredSchedules = useMemo(() => {
    let filtered = [...schedules];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.display.toLowerCase().includes(query) ||
          s.playlist.toLowerCase().includes(query)
      );
    }

    if (selectedDisplay !== 'all') {
      filtered = filtered.filter(s => s.display === selectedDisplay);
    }

    if (selectedPlaylist !== 'all') {
      filtered = filtered.filter(s => s.playlist === selectedPlaylist);
    }

    return filtered;
  }, [searchQuery, selectedDisplay, selectedPlaylist]);

  const uniqueDisplays = useMemo(() => {
    return [...new Set(schedules.map(s => s.display))].sort();
  }, []);

  const uniquePlaylists = useMemo(() => {
    return [...new Set(schedules.map(s => s.playlist))].sort();
  }, []);

  const getStatusBadge = (status: ScheduleType['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active', icon: CheckCircle },
      inactive: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Inactive', icon: XCircle },
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

  const getPlaylistColor = (playlist: string) => {
    return PLAYLIST_COLORS[playlist] || '#6b7280';
  };

  // Group schedules by display for calendar view
  const schedulesByDisplay = useMemo(() => {
    const grouped: Record<string, ScheduleType[]> = {};
    filteredSchedules.forEach(schedule => {
      if (!grouped[schedule.display]) {
        grouped[schedule.display] = [];
      }
      grouped[schedule.display].push(schedule);
    });
    return grouped;
  }, [filteredSchedules]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Display Schedule"
        subtitle="Manage content schedules for your displays"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Create Schedule
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Schedules"
          value={stats.total.toString()}
          icon={Calendar}
          iconColor="#547792"
        />
        <StatsCard
          title="Active"
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Displays"
          value={stats.displays.toString()}
          icon={Monitor}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Playlists"
          value={stats.playlists.toString()}
          icon={ListVideo}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search schedules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedDisplay}
              onChange={(e) => setSelectedDisplay(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Displays</option>
              {uniqueDisplays.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Playlists</option>
              {uniquePlaylists.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded transition-all ${
                viewMode === 'calendar'
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

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <Card className="p-4">
          {/* Week Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/[0.05] rounded">
                <ChevronLeft size={16} className="text-text-secondary" />
              </button>
              <h3 className="font-semibold text-text-primary">This Week</h3>
              <button className="p-2 hover:bg-white/[0.05] rounded">
                <ChevronRight size={16} className="text-text-secondary" />
              </button>
            </div>
            <Button variant="secondary" size="sm">Today</Button>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Days Header */}
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="p-2 text-sm font-medium text-text-secondary">Display</div>
                {DAYS.map(day => (
                  <div key={day} className="p-2 text-sm font-medium text-text-secondary text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Display Rows */}
              {Object.entries(schedulesByDisplay).map(([display, displaySchedules]) => (
                <div key={display} className="grid grid-cols-8 gap-2 mb-2">
                  <div className="p-2 text-sm font-medium text-text-primary truncate flex items-center">
                    <Monitor size={14} className="mr-2 text-text-muted shrink-0" />
                    <span className="truncate">{display}</span>
                  </div>
                  {DAYS.map(day => {
                    const daySchedules = displaySchedules.filter(s => s.days.includes(day));
                    return (
                      <div
                        key={day}
                        className="p-1 min-h-16 bg-white/[0.05] rounded-lg relative"
                      >
                        {daySchedules.map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`p-1.5 rounded text-xs mb-1 cursor-pointer hover:opacity-80 transition-opacity ${
                              schedule.status === 'inactive' ? 'opacity-50' : ''
                            }`}
                            style={{ backgroundColor: `${getPlaylistColor(schedule.playlist)}30` }}
                          >
                            <div
                              className="font-medium truncate"
                              style={{ color: getPlaylistColor(schedule.playlist) }}
                            >
                              {schedule.playlist}
                            </div>
                            <div className="text-text-muted text-[10px]">
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-white/[0.08]">
            <h4 className="text-sm font-medium text-text-secondary mb-2">Playlists</h4>
            <div className="flex flex-wrap gap-3">
              {uniquePlaylists.map(playlist => (
                <div key={playlist} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: getPlaylistColor(playlist) }}
                  />
                  <span className="text-xs text-text-secondary">{playlist}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Display</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Playlist</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Start Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">End Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Days</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredSchedules.map((schedule, index) => (
                  <motion.tr
                    key={schedule.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Monitor size={14} className="text-text-muted" />
                        <span className="font-medium text-text-primary">{schedule.display}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: getPlaylistColor(schedule.playlist) }}
                        />
                        <span className="text-text-primary">{schedule.playlist}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Clock size={14} />
                        {schedule.startTime}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Clock size={14} />
                        {schedule.endTime}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {schedule.days.map(day => (
                          <span
                            key={day}
                            className="px-2 py-0.5 bg-accent-primary/20 text-accent-primary text-xs rounded"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(schedule.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
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

      {filteredSchedules.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No schedules found matching your filters</p>
        </Card>
      )}

      {/* Schedule Tips */}
      <Card className="p-4 bg-accent-primary/5 border border-accent-primary/20">
        <h3 className="font-semibold text-accent-primary mb-2">Schedule Tips</h3>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Schedules define when playlists are displayed on each screen</li>
          <li>• Overlapping schedules on the same display will show the most recently created one</li>
          <li>• Set schedules to inactive to temporarily disable them without deleting</li>
        </ul>
      </Card>
    </div>
  );
};
