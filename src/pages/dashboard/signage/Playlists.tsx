import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  ListVideo,
  Clock,
  Monitor,
  Play,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Image,
  Video,
  Eye,
  GripVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { playlists, contentLibrary, type Playlist } from '@/data/signageData';

export const Playlists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const stats = useMemo(() => {
    const totalItems = playlists.reduce((acc, p) => acc + p.items.length, 0);
    const totalDisplays = playlists.reduce((acc, p) => acc + p.assignedDisplays, 0);

    return {
      total: playlists.length,
      active: playlists.filter(p => p.status === 'active').length,
      totalItems,
      totalDisplays,
    };
  }, []);

  const filteredPlaylists = useMemo(() => {
    let filtered = [...playlists];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const getStatusBadge = (status: Playlist['status']) => {
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

  const getContentById = (contentId: string) => {
    return contentLibrary.find(c => c.id === contentId);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Playlists"
        subtitle="Create and manage content playlists for your displays"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Create Playlist
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Playlists"
          value={stats.total.toString()}
          icon={ListVideo}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Active"
          value={stats.active.toString()}
          icon={Play}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Content Items"
          value={stats.totalItems.toString()}
          icon={Image}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Assigned Displays"
          value={stats.totalDisplays.toString()}
          icon={Monitor}
          iconColor="#8b5cf6"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder="Search playlists..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </Card>

      <div className="flex gap-6">
        {/* Playlists Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${selectedPlaylist ? 'lg:w-2/3' : 'lg:grid-cols-3'}`}>
          {filteredPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-5 hover:shadow-lg transition-all cursor-pointer group ${
                  selectedPlaylist?.id === playlist.id ? 'ring-2 ring-accent-primary' : ''
                }`}
                onClick={() => setSelectedPlaylist(selectedPlaylist?.id === playlist.id ? null : playlist)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{playlist.name}</h3>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">{playlist.description}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-1 hover:bg-background-tertiary rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical size={16} className="text-text-secondary" />
                  </button>
                </div>

                {/* Preview Thumbnails */}
                <div className="flex gap-1 mb-4">
                  {playlist.items.slice(0, 3).map((item, i) => {
                    const content = getContentById(item.contentId);
                    return (
                      <div
                        key={i}
                        className="w-16 h-12 bg-background-tertiary rounded flex items-center justify-center"
                      >
                        {content?.type === 'image' ? (
                          <Image size={16} className="text-text-muted" />
                        ) : (
                          <Video size={16} className="text-text-muted" />
                        )}
                      </div>
                    );
                  })}
                  {playlist.items.length > 3 && (
                    <div className="w-16 h-12 bg-background-tertiary rounded flex items-center justify-center">
                      <span className="text-xs text-text-secondary">+{playlist.items.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Status and Info */}
                <div className="flex items-center gap-3 mb-4">
                  {getStatusBadge(playlist.status)}
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock size={12} />
                    {playlist.totalDuration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <ListVideo size={12} />
                    {playlist.items.length} items
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border-default text-sm">
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Monitor size={14} />
                    <span>{playlist.assignedDisplays} displays</span>
                  </div>
                  <span className="text-xs text-text-muted">
                    Updated {new Date(playlist.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-default opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                  >
                    <Copy size={14} />
                    Duplicate
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Playlist Detail Panel */}
        {selectedPlaylist && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 hidden lg:block"
          >
            <Card className="p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">Playlist Details</h3>
                <button
                  onClick={() => setSelectedPlaylist(null)}
                  className="p-1 hover:bg-background-tertiary rounded"
                >
                  <XCircle size={16} className="text-text-secondary" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">{selectedPlaylist.name}</h4>
                  <p className="text-sm text-text-secondary mt-1">{selectedPlaylist.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedPlaylist.status)}
                  <span className="text-sm text-text-secondary">
                    {selectedPlaylist.totalDuration} total
                  </span>
                </div>

                {/* Content Items */}
                <div className="pt-4 border-t border-border-default">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-text-primary">Content Items</h4>
                    <Button variant="secondary" size="sm" leftIcon={<Plus size={12} />}>
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {selectedPlaylist.items.map((item, index) => {
                      const content = getContentById(item.contentId);
                      if (!content) return null;

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-background-tertiary rounded-lg group"
                        >
                          <GripVertical size={14} className="text-text-muted cursor-grab" />
                          <div className="w-12 h-9 bg-background-secondary rounded flex items-center justify-center shrink-0">
                            {content.type === 'image' ? (
                              <Image size={14} className="text-text-muted" />
                            ) : (
                              <Video size={14} className="text-text-muted" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{content.name}</p>
                            <p className="text-xs text-text-secondary">{formatDuration(item.duration)}</p>
                          </div>
                          <button className="p-1 hover:bg-background-secondary rounded opacity-0 group-hover:opacity-100">
                            <Trash2 size={12} className="text-text-muted hover:text-red-400" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border-default">
                  <Button variant="secondary" className="flex-1" leftIcon={<Eye size={14} />}>
                    Preview
                  </Button>
                  <Button className="flex-1" leftIcon={<Edit size={14} />}>
                    Edit
                  </Button>
                </div>

                {/* Meta Info */}
                <div className="pt-4 border-t border-border-default space-y-2 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Created by</span>
                    <span className="text-text-primary">{selectedPlaylist.createdBy}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Created</span>
                    <span className="text-text-primary">
                      {new Date(selectedPlaylist.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Last Updated</span>
                    <span className="text-text-primary">
                      {new Date(selectedPlaylist.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Assigned Displays</span>
                    <span className="text-text-primary">{selectedPlaylist.assignedDisplays}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {filteredPlaylists.length === 0 && (
        <Card className="p-12 text-center">
          <ListVideo size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No playlists found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
