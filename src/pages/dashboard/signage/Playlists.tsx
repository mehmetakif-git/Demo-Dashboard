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

// Content thumbnail images
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
import display11 from '@/assets/images/displays/display-11.webp';
import display12 from '@/assets/images/displays/display-12.webp';
import { useTranslation } from 'react-i18next';

// Map content names to thumbnail images
const contentImages: Record<string, string> = {
  'Product Launch Teaser': display9,
  'Cafeteria Menu - Monday': display12,
  'Cafeteria Menu - Tuesday': display3,
  'Q4 Results Presentation': display11,
  'Holiday Announcement': display4,
  'Employee of the Month': display7,
  'Welcome Video': display1,
  'Company Logo': display2,
  'Safety Guidelines': display8,
  'Company Values': display5,
  'Meeting Room Instructions': display6,
  'Parking Rules': display10,
};

export const Playlists = () => {
  const { t } = useTranslation('signage');
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
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('playlists.active'), icon: CheckCircle },
      inactive: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: t('playlists.inactive'), icon: XCircle },
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
        title={t('playlists.title')}
        subtitle={t('playlists.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('playlists.createPlaylist')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title={t('playlists.totalPlaylists')}
          value={stats.total.toString()}
          icon={ListVideo}
          iconColor="#547792"
        />
        <StatsCard
          title={t('playlists.active')}
          value={stats.active.toString()}
          icon={Play}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('playlists.totalContentItems')}
          value={stats.totalItems.toString()}
          icon={Image}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('playlists.assignedDisplays')}
          value={stats.totalDisplays.toString()}
          icon={Monitor}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder={t('playlists.searchPlaylists')}
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
            <option value="all">{t('playlists.allStatus')}</option>
            <option value="active">{t('playlists.active')}</option>
            <option value="inactive">{t('playlists.inactive')}</option>
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
                    className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
                        className="w-16 h-12 bg-white/[0.05] rounded flex items-center justify-center overflow-hidden"
                      >
                        {content && contentImages[content.name] ? (
                          <img
                            src={contentImages[content.name]}
                            alt={content.name}
                            className="w-full h-full object-cover"
                          />
                        ) : content?.type === 'image' ? (
                          <Image size={16} className="text-text-muted" />
                        ) : (
                          <Video size={16} className="text-text-muted" />
                        )}
                      </div>
                    );
                  })}
                  {playlist.items.length > 3 && (
                    <div className="w-16 h-12 bg-white/[0.05] rounded flex items-center justify-center">
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
                    {playlist.items.length} {t('playlists.items')}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-sm">
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Monitor size={14} />
                    <span>{playlist.assignedDisplays} {t('playlists.displays')}</span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(playlist.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors"
                  >
                    <Edit size={14} />
                    {t('playlists.edit')}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                  >
                    <Copy size={14} />
                    {t('playlists.duplicate')}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                    {t('playlists.delete')}
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
                <h3 className="font-semibold text-text-primary">{t('playlists.playlistDetails')}</h3>
                <button
                  onClick={() => setSelectedPlaylist(null)}
                  className="p-1 hover:bg-white/[0.05] rounded"
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
                    {selectedPlaylist.totalDuration} {t('playlists.total')}
                  </span>
                </div>

                {/* Content Items */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-text-primary">{t('playlists.contentItems')}</h4>
                    <Button variant="secondary" size="sm" leftIcon={<Plus size={12} />}>
                      {t('playlists.add')}
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {selectedPlaylist.items.map((item, index) => {
                      const content = getContentById(item.contentId);
                      if (!content) return null;

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-white/[0.05] rounded-lg group"
                        >
                          <GripVertical size={14} className="text-text-muted cursor-grab" />
                          <div className="w-12 h-9 bg-white/[0.03] backdrop-blur-xl rounded flex items-center justify-center shrink-0 overflow-hidden">
                            {contentImages[content.name] ? (
                              <img
                                src={contentImages[content.name]}
                                alt={content.name}
                                className="w-full h-full object-cover"
                              />
                            ) : content.type === 'image' ? (
                              <Image size={14} className="text-text-muted" />
                            ) : (
                              <Video size={14} className="text-text-muted" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{content.name}</p>
                            <p className="text-xs text-text-secondary">{formatDuration(item.duration)}</p>
                          </div>
                          <button className="p-1 hover:bg-white/[0.03] backdrop-blur-xl rounded opacity-0 group-hover:opacity-100">
                            <Trash2 size={12} className="text-text-muted hover:text-red-400" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-white/[0.08]">
                  <Button variant="secondary" className="flex-1" leftIcon={<Eye size={14} />}>
                    {t('playlists.preview')}
                  </Button>
                  <Button className="flex-1" leftIcon={<Edit size={14} />}>
                    {t('playlists.edit')}
                  </Button>
                </div>

                {/* Meta Info */}
                <div className="pt-4 border-t border-white/[0.08] space-y-2 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>{t('playlists.createdBy')}</span>
                    <span className="text-text-primary">{selectedPlaylist.createdBy}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>{t('playlists.created')}</span>
                    <span className="text-text-primary">
                      {new Date(selectedPlaylist.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>{t('playlists.lastUpdated')}</span>
                    <span className="text-text-primary">
                      {new Date(selectedPlaylist.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>{t('playlists.assignedDisplays')}</span>
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
          <p className="text-text-secondary">{t('playlists.noPlaylistsFound')}</p>
        </Card>
      )}
    </div>
  );
};
