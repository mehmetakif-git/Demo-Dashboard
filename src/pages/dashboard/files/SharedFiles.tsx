import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  Share2,
  MoreVertical,
  Download,
  Eye,
  X,
  Users,
  UserPlus,
  Copy,
  Link,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import { sharedFiles, formatDate, type SharedFile } from '@/data/fileData';
import { useTranslation } from 'react-i18next';

export const SharedFiles = () => {
  const { t } = useTranslation('files');
  const [activeTab, setActiveTab] = useState<'with-me' | 'by-me'>('with-me');
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [permissionFilter, setPermissionFilter] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const owners = useMemo(() => {
    return [...new Set(sharedFiles.map(f => f.owner))];
  }, []);

  const filteredFiles = useMemo(() => {
    let files = [...sharedFiles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      files = files.filter(f => f.name.toLowerCase().includes(query));
    }

    if (ownerFilter !== 'all') {
      files = files.filter(f => f.owner === ownerFilter);
    }

    if (permissionFilter !== 'all') {
      files = files.filter(f => f.permission === permissionFilter);
    }

    return files.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());
  }, [searchQuery, ownerFilter, permissionFilter]);

  const getFileIcon = (item: SharedFile) => {
    if (item.type === 'folder') {
      return <Folder size={20} style={{ color: item.color || '#547792' }} />;
    }

    const iconMap: Record<string, React.ReactNode> = {
      document: <FileText size={20} className="text-blue-400" />,
      spreadsheet: <FileSpreadsheet size={20} className="text-green-400" />,
      pdf: <FileText size={20} className="text-red-400" />,
      image: <Image size={20} className="text-pink-400" />,
    };

    return iconMap[item.fileType || 'default'] || <File size={20} className="text-gray-400" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPermissionBadge = (permission: SharedFile['permission']) => {
    if (permission === 'edit') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400">
          {t('sharedFiles.canEdit')}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
        {t('sharedFiles.viewOnly')}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('sharedFiles.title')}
        subtitle={t('sharedFiles.subtitle')}
      />

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('with-me')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'with-me'
              ? 'bg-accent-primary text-white'
              : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
          }`}
        >
          {t('sharedFiles.sharedWithMe')}
        </button>
        <button
          onClick={() => setActiveTab('by-me')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'by-me'
              ? 'bg-accent-primary text-white'
              : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
          }`}
        >
          {t('sharedFiles.sharedByMe')}
        </button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64 max-w-md">
            <Input
              placeholder={t('sharedFiles.searchSharedFiles')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('sharedFiles.allOwners')}</option>
            {owners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>

          <select
            value={permissionFilter}
            onChange={(e) => setPermissionFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('sharedFiles.allPermissions')}</option>
            <option value="edit">{t('sharedFiles.canEdit')}</option>
            <option value="view">{t('sharedFiles.viewOnly')}</option>
          </select>
        </div>
      </Card>

      {/* Shared Files List */}
      <div className="space-y-3">
        {filteredFiles.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  {getFileIcon(file)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-text-primary truncate">{file.name}</h3>
                    {getPermissionBadge(file.permission)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-accent-primary">
                          {getInitials(file.owner)}
                        </span>
                      </div>
                      {file.owner}
                    </span>
                    <span>{formatDate(file.modifiedAt)}</span>
                    {file.type === 'folder' ? (
                      <span>{file.itemCount} {t('myFiles.items')}</span>
                    ) : (
                      <span>{file.size}</span>
                    )}
                  </div>
                </div>

                {/* Shared With */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {file.sharedWith.slice(0, 3).map((user, index) => (
                      <div
                        key={index}
                        className="w-7 h-7 rounded-full bg-accent-primary/20 border-2 border-white/[0.08] flex items-center justify-center"
                        title={user}
                      >
                        <span className="text-[10px] font-bold text-accent-primary">
                          {user === 'You' ? 'U' : user === 'All Employees' ? 'All' : getInitials(user)}
                        </span>
                      </div>
                    ))}
                    {file.sharedWith.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-white/[0.05] border-2 border-white/[0.08] flex items-center justify-center">
                        <span className="text-[10px] font-bold text-text-muted">
                          +{file.sharedWith.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary">
                    <Download size={16} />
                  </button>
                  {activeTab === 'with-me' ? (
                    <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-red-400">
                      <X size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => { setSelectedFile(file); setShowShareModal(true); }}
                      className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary"
                    >
                      <Users size={16} />
                    </button>
                  )}
                  <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card className="p-12 text-center">
          <Share2 size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">
            {activeTab === 'with-me'
              ? t('sharedFiles.noSharedWithMe')
              : t('sharedFiles.noSharedByMe')}
          </p>
        </Card>
      )}

      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedFile)}
                  <h2 className="text-lg font-semibold text-text-primary">{t('sharedFiles.shareFile', { name: selectedFile.name })}</h2>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-white/[0.05] rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Add People */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t('sharedFiles.addPeople')}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={t('sharedFiles.enterNameOrEmail')}
                      leftIcon={<UserPlus size={16} />}
                    />
                  </div>
                  <select className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary">
                    <option value="edit">{t('sharedFiles.canEdit')}</option>
                    <option value="view">{t('sharedFiles.viewOnly')}</option>
                  </select>
                  <Button>{t('sharedFiles.add')}</Button>
                </div>
              </div>

              {/* People with Access */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t('sharedFiles.peopleWithAccess')}</h4>
                <div className="space-y-2">
                  {selectedFile.sharedWith.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-accent-primary">
                            {user === 'You' ? 'U' : user === 'All Employees' ? 'All' : getInitials(user)}
                          </span>
                        </div>
                        <span className="text-sm text-text-primary">{user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="px-2 py-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded text-xs text-text-primary">
                          <option value="edit">{t('sharedFiles.canEdit')}</option>
                          <option value="view">{t('sharedFiles.viewOnly')}</option>
                        </select>
                        <button className="p-1 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-muted hover:text-red-400">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Get Link */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">{t('sharedFiles.getLink')}</h4>
                <div className="flex items-center gap-2 p-3 bg-white/[0.05] rounded-lg">
                  <Link size={16} className="text-text-muted" />
                  <span className="flex-1 text-sm text-text-secondary truncate">
                    https://files.company.com/share/{selectedFile.id}
                  </span>
                  <Button variant="secondary" size="sm" leftIcon={<Copy size={14} />}>
                    {t('myFiles.copy')}
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-muted">{t('sharedFiles.access')}:</span>
                  <select className="px-2 py-1 bg-white/[0.05] border border-white/[0.08] rounded text-xs text-text-primary">
                    <option value="restricted">{t('sharedFiles.restricted')}</option>
                    <option value="anyone">{t('sharedFiles.anyoneWithLink')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.05] flex justify-end">
              <Button onClick={() => setShowShareModal(false)}>{t('sharedFiles.done')}</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
