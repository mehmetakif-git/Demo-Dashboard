import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Search,
  Image,
  Video,
  FolderOpen,
  FolderPlus,
  Play,
  Download,
  Trash2,
  MoreVertical,
  Grid3X3,
  List,
  HardDrive,
  Clock,
  Tag,
  Eye,
  Edit,
  Check,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { contentLibrary, contentFolders, type ContentItem } from '@/data/signageData';

// Content thumbnail images (reusing display images)
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
import { useTranslation } from 'react-i18next';

export const ContentLibrary = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const stats = useMemo(() => {
    const images = contentLibrary.filter(c => c.type === 'image');
    const videos = contentLibrary.filter(c => c.type === 'video');

    // Calculate total storage
    const totalStorage = contentLibrary.reduce((acc, c) => {
      const size = parseFloat(c.fileSize);
      const unit = c.fileSize.includes('GB') ? 1024 : 1;
      return acc + (size * unit);
    }, 0);

    return {
      total: contentLibrary.length,
      images: images.length,
      videos: videos.length,
      storage: `${(totalStorage / 1024).toFixed(1)} GB`,
    };
  }, []);

  const filteredContent = useMemo(() => {
    let filtered = [...contentLibrary];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(c => c.type === selectedType);
    }

    if (selectedFolder !== 'all') {
      filtered = filtered.filter(c => c.folder === selectedFolder);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        break;
      case 'size':
        filtered.sort((a, b) => {
          const sizeA = parseFloat(a.fileSize);
          const sizeB = parseFloat(b.fileSize);
          return sizeB - sizeA;
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedType, selectedFolder, sortBy]);

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map(c => c.id));
    }
  };

  const getTypeBadge = (type: ContentItem['type']) => {
    const config = {
      image: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: Image },
      video: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: Video },
    };
    const c = config[type];
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('signage.contentLibrary', 'Content Library')}
        subtitle="Manage your digital signage content"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<FolderPlus size={16} />}>
              New Folder
            </Button>
            <Button leftIcon={<Upload size={16} />}>
              Upload Content
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Items"
          value={stats.total.toString()}
          icon={FolderOpen}
          iconColor="#547792"
        />
        <StatsCard
          title="Images"
          value={stats.images.toString()}
          icon={Image}
          iconColor="#3b82f6"
        />
        <StatsCard
          title="Videos"
          value={stats.videos.toString()}
          icon={Video}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Storage Used"
          value={stats.storage}
          icon={HardDrive}
          iconColor="#94B4C1"
        />
      </div>

      <div className="flex gap-6">
        {/* Folder Sidebar */}
        <Card className="w-64 p-4 shrink-0 hidden lg:block">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Folders</h3>
            <button className="p-1 hover:bg-white/[0.05] rounded">
              <FolderPlus size={16} className="text-text-secondary" />
            </button>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedFolder('all')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedFolder === 'all'
                  ? 'bg-accent-primary/20 text-accent-primary'
                  : 'text-text-secondary hover:bg-white/[0.05]'
              }`}
            >
              <FolderOpen size={16} />
              All Content
              <span className="ml-auto text-xs">{contentLibrary.length}</span>
            </button>
            {contentFolders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedFolder === folder.name
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-white/[0.05]'
                }`}
              >
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: folder.color }}
                />
                {folder.name}
                <span className="ml-auto text-xs">{folder.count}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center flex-1">
                <div className="flex-1 min-w-50 max-w-md">
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search size={16} />}
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="size">Sort by Size</option>
                </select>

                {/* Mobile Folder Select */}
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="lg:hidden px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  <option value="all">All Folders</option>
                  {contentFolders.map(f => (
                    <option key={f.id} value={f.name}>{f.name}</option>
                  ))}
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
                  <Grid3X3 size={16} />
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

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.08]">
                <span className="text-sm text-text-secondary">
                  {selectedItems.length} item(s) selected
                </span>
                <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>
                  Download
                </Button>
                <Button variant="secondary" size="sm" leftIcon={<Trash2 size={14} />}>
                  Delete
                </Button>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-sm text-text-secondary hover:text-text-primary"
                >
                  Clear selection
                </button>
              </div>
            )}
          </Card>

          {/* Content Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="p-0 overflow-hidden hover:shadow-lg transition-all group">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-white/[0.05] flex items-center justify-center overflow-hidden">
                      {contentImages[content.name] ? (
                        <img
                          src={contentImages[content.name]}
                          alt={content.name}
                          className="w-full h-full object-cover"
                        />
                      ) : content.type === 'image' ? (
                        <Image size={32} className="text-text-muted/30" />
                      ) : (
                        <Video size={32} className="text-text-muted/30" />
                      )}
                      {/* Selection Checkbox */}
                      <button
                        onClick={() => toggleSelectItem(content.id)}
                        className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedItems.includes(content.id)
                            ? 'bg-accent-primary border-accent-primary'
                            : 'border-white/50 bg-black/30 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {selectedItems.includes(content.id) && (
                          <Check size={12} className="text-white" />
                        )}
                      </button>
                      {/* Video Play Button */}
                      {content.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <Play size={24} className="text-white ml-1" />
                          </div>
                        </div>
                      )}
                      {/* Duration Badge */}
                      {content.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white">
                          {content.duration}
                        </div>
                      )}
                      {/* Hover Actions */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-black/50 hover:bg-black/70 rounded transition-colors">
                          <Eye size={14} className="text-white" />
                        </button>
                        <button className="p-1.5 bg-black/50 hover:bg-black/70 rounded transition-colors">
                          <MoreVertical size={14} className="text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Content Info */}
                    <div className="p-3">
                      <h3 className="font-medium text-text-primary text-sm truncate">{content.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {getTypeBadge(content.type)}
                        <span className="text-xs text-text-secondary">{content.fileSize}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                        <Clock size={12} />
                        {new Date(content.uploadedAt).toLocaleDateString()}
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary w-8">
                        <button
                          onClick={toggleSelectAll}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            selectedItems.length === filteredContent.length && filteredContent.length > 0
                              ? 'bg-accent-primary border-accent-primary'
                              : 'border-white/[0.08]'
                          }`}
                        >
                          {selectedItems.length === filteredContent.length && filteredContent.length > 0 && (
                            <Check size={10} className="text-white" />
                          )}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Resolution</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Size</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Duration</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Folder</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Uploaded</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {filteredContent.map((content, index) => (
                      <motion.tr
                        key={content.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-white/[0.05] transition-colors"
                      >
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleSelectItem(content.id)}
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              selectedItems.includes(content.id)
                                ? 'bg-accent-primary border-accent-primary'
                                : 'border-white/[0.08]'
                            }`}
                          >
                            {selectedItems.includes(content.id) && (
                              <Check size={10} className="text-white" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-white/[0.05] flex items-center justify-center overflow-hidden">
                              {contentImages[content.name] ? (
                                <img
                                  src={contentImages[content.name]}
                                  alt={content.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : content.type === 'image' ? (
                                <Image size={16} className="text-text-muted" />
                              ) : (
                                <Video size={16} className="text-text-muted" />
                              )}
                            </div>
                            <span className="font-medium text-text-primary">{content.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getTypeBadge(content.type)}</td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{content.resolution}</td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{content.fileSize}</td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{content.duration || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Tag size={12} className="text-text-muted" />
                            <span className="text-sm text-text-secondary">{content.folder}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-secondary">
                          {new Date(content.uploadedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                              <Eye size={14} />
                            </button>
                            <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400">
                              <Edit size={14} />
                            </button>
                            <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400">
                              <Download size={14} />
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

          {filteredContent.length === 0 && (
            <Card className="p-12 text-center">
              <FolderOpen size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">No content found matching your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
