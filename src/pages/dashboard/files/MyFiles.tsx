import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FolderPlus,
  Grid3X3,
  List,
  Search,
  ChevronRight,
  Home,
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  Video,
  Archive,
  File,
  Star,
  Share2,
  MoreVertical,
  Download,
  Trash2,
  Copy,
  Move,
  Edit,
  Eye,
  Palette,
  Code,
  Presentation,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  fileStructure,
  storageInfo,
  formatDate,
  type FileItem,
} from '@/data/fileData';
import { useTranslation } from 'react-i18next';

export const MyFiles = () => {
  const { t } = useTranslation('files');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'size' | 'type'>('modified');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentPath, setCurrentPath] = useState<string[]>([t('myFiles.title')]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showContextMenu, setShowContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);

  const currentFiles = useMemo(() => {
    let files = [...fileStructure.myFiles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      files = files.filter(f => f.name.toLowerCase().includes(query));
    }

    if (filterType !== 'all') {
      if (filterType === 'folder') {
        files = files.filter(f => f.type === 'folder');
      } else {
        files = files.filter(f => f.type === 'file' && f.fileType === filterType);
      }
    }

    // Sort
    files.sort((a, b) => {
      // Folders first
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime();
        case 'size':
          const sizeA = a.size ? parseFloat(a.size) : 0;
          const sizeB = b.size ? parseFloat(b.size) : 0;
          return sizeB - sizeA;
        case 'type':
          return (a.fileType || 'folder').localeCompare(b.fileType || 'folder');
        default:
          return 0;
      }
    });

    return files;
  }, [searchQuery, filterType, sortBy]);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder size={24} style={{ color: item.color || '#547792' }} />;
    }

    const iconMap: Record<string, React.ReactNode> = {
      document: <FileText size={24} className="text-blue-400" />,
      spreadsheet: <FileSpreadsheet size={24} className="text-green-400" />,
      pdf: <FileText size={24} className="text-red-400" />,
      image: <Image size={24} className="text-pink-400" />,
      video: <Video size={24} className="text-yellow-400" />,
      presentation: <Presentation size={24} className="text-orange-400" />,
      archive: <Archive size={24} className="text-gray-400" />,
      design: <Palette size={24} className="text-[#94B4C1]" />,
      code: <Code size={24} className="text-[#94B4C1]" />,
    };

    return iconMap[item.fileType || 'default'] || <File size={24} className="text-gray-400" />;
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would update the starred status
    console.log('Toggle star for:', id);
  };

  const handleFolderClick = (folder: FileItem) => {
    if (folder.type === 'folder') {
      setCurrentPath([...currentPath, folder.name]);
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const FileCard = ({ item }: { item: FileItem }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className={`p-4 cursor-pointer transition-all hover:shadow-lg relative group ${
          selectedItems.includes(item.id) ? 'ring-2 ring-accent-primary' : ''
        }`}
        onClick={() => item.type === 'folder' ? handleFolderClick(item) : null}
      >
        {/* Selection Checkbox */}
        <div
          className={`absolute top-2 left-2 w-5 h-5 rounded border-2 transition-all cursor-pointer ${
            selectedItems.includes(item.id)
              ? 'bg-accent-primary border-accent-primary'
              : 'border-white/[0.08] opacity-0 group-hover:opacity-100'
          }`}
          onClick={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
        >
          {selectedItems.includes(item.id) && (
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>

        {/* Star */}
        <button
          onClick={(e) => toggleStar(item.id, e)}
          className={`absolute top-2 right-2 p-1 rounded transition-all ${
            item.starred
              ? 'text-yellow-400'
              : 'text-text-muted opacity-0 group-hover:opacity-100 hover:text-yellow-400'
          }`}
        >
          <Star size={16} fill={item.starred ? 'currentColor' : 'none'} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3 pt-4">
          <div className="w-12 h-12 flex items-center justify-center">
            {getFileIcon(item)}
          </div>
        </div>

        {/* Name */}
        <p className="text-sm font-medium text-text-primary text-center truncate mb-1">
          {item.name}
        </p>

        {/* Info */}
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
          {item.type === 'folder' ? (
            <span>{item.itemCount} {t('myFiles.items')}</span>
          ) : (
            <span>{item.size}</span>
          )}
          {item.shared && <Share2 size={12} className="text-accent-primary" />}
        </div>
      </Card>
    </motion.div>
  );

  const FileRow = ({ item }: { item: FileItem }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`border-b border-white/[0.08] hover:bg-white/[0.05] cursor-pointer group ${
        selectedItems.includes(item.id) ? 'bg-accent-primary/10' : ''
      }`}
      onClick={() => item.type === 'folder' ? handleFolderClick(item) : null}
    >
      <td className="px-4 py-3">
        <div
          className={`w-5 h-5 rounded border-2 transition-all cursor-pointer ${
            selectedItems.includes(item.id)
              ? 'bg-accent-primary border-accent-primary'
              : 'border-white/[0.08]'
          }`}
          onClick={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
        >
          {selectedItems.includes(item.id) && (
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {getFileIcon(item)}
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary">{item.name}</span>
            {item.shared && <Share2 size={14} className="text-accent-primary" />}
            <button
              onClick={(e) => toggleStar(item.id, e)}
              className={item.starred ? 'text-yellow-400' : 'text-text-muted opacity-0 group-hover:opacity-100'}
            >
              <Star size={14} fill={item.starred ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">{formatDate(item.modifiedAt)}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">
        {item.type === 'folder' ? `${item.itemCount} ${t('myFiles.items')}` : item.size}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">{item.modifiedBy}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
            <Download size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
            <Share2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
            <Trash2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary">
            <MoreVertical size={14} />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('myFiles.title')}
        subtitle={t('myFiles.subtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<FolderPlus size={16} />}>
              {t('myFiles.newFolder')}
            </Button>
            <Button leftIcon={<Upload size={16} />}>
              {t('myFiles.upload')}
            </Button>
          </div>
        }
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        {currentPath.map((path, index) => (
          <div key={index} className="flex items-center gap-1">
            {index === 0 ? (
              <button
                onClick={() => navigateToBreadcrumb(index)}
                className="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <Home size={16} />
                <span>{path}</span>
              </button>
            ) : (
              <>
                <ChevronRight size={16} className="text-text-muted" />
                <button
                  onClick={() => navigateToBreadcrumb(index)}
                  className={`hover:text-text-primary transition-colors ${
                    index === currentPath.length - 1 ? 'text-text-primary font-medium' : 'text-text-muted'
                  }`}
                >
                  {path}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Storage Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            {storageInfo.used} {storageInfo.unit} {t('myFiles.of')} {storageInfo.total} {storageInfo.unit} {t('myFiles.used')}
          </span>
          <button className="text-sm text-accent-primary hover:underline">{t('myFiles.manageStorage')}</button>
        </div>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
          <div className="h-full flex">
            {storageInfo.breakdown.map((item, index) => (
              <div
                key={index}
                className="h-full"
                style={{
                  width: `${(item.size / storageInfo.total) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          {storageInfo.breakdown.map((item, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-text-muted">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.type}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64 max-w-md">
            <Input
              placeholder={t('myFiles.searchFiles')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="modified">{t('myFiles.sortByModified')}</option>
            <option value="name">{t('myFiles.sortByName')}</option>
            <option value="size">{t('myFiles.sortBySize')}</option>
            <option value="type">{t('myFiles.sortByType')}</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('myFiles.allTypes')}</option>
            <option value="folder">{t('myFiles.folders')}</option>
            <option value="document">{t('myFiles.documents')}</option>
            <option value="spreadsheet">{t('myFiles.spreadsheets')}</option>
            <option value="pdf">{t('myFiles.pdfs')}</option>
            <option value="image">{t('myFiles.images')}</option>
            <option value="video">{t('myFiles.videos')}</option>
          </select>

          <div className="flex items-center border border-white/[0.08] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Selected Items Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08]">
            <span className="text-sm text-text-secondary">{t('myFiles.selected', { count: selectedItems.length })}</span>
            <button
              onClick={() => setSelectedItems([])}
              className="text-sm text-accent-primary hover:underline"
            >
              {t('myFiles.clearSelection')}
            </button>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" leftIcon={<Move size={14} />}>{t('myFiles.move')}</Button>
            <Button variant="secondary" size="sm" leftIcon={<Copy size={14} />}>{t('myFiles.copy')}</Button>
            <Button variant="secondary" size="sm" leftIcon={<Share2 size={14} />}>{t('myFiles.share')}</Button>
            <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>{t('myFiles.download')}</Button>
            <Button variant="secondary" size="sm" leftIcon={<Trash2 size={14} />} className="text-red-400 hover:bg-red-500/10">{t('myFiles.delete')}</Button>
          </div>
        )}
      </Card>

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {currentFiles.map(item => (
            <FileCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.05] border-b border-white/[0.08]">
                  <th className="px-4 py-3 w-12" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('myFiles.name')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('myFiles.modified')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('myFiles.size')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('myFiles.owner')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('myFiles.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map(item => (
                  <FileRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {currentFiles.length === 0 && (
        <Card className="p-12 text-center">
          <Folder size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('myFiles.noFilesFound')}</p>
        </Card>
      )}

      {/* Context Menu */}
      {showContextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowContextMenu(null)}
          />
          <div
            className="fixed z-50 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg shadow-xl py-1 min-w-48"
            style={{ top: showContextMenu.y, left: showContextMenu.x }}
          >
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Eye size={14} /> {t('myFiles.preview')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Share2 size={14} /> {t('myFiles.share')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Download size={14} /> {t('myFiles.download')}
            </button>
            <hr className="my-1 border-white/[0.08]" />
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Move size={14} /> {t('myFiles.moveTo')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Copy size={14} /> {t('myFiles.copyTo')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Edit size={14} /> {t('myFiles.rename')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-white/[0.05] flex items-center gap-2">
              <Star size={14} /> {t('myFiles.star')}
            </button>
            <hr className="my-1 border-white/[0.08]" />
            <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/[0.05] flex items-center gap-2">
              <Trash2 size={14} /> {t('myFiles.delete')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
