import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Folder,
  FolderOpen,
  Edit,
  Trash2,
  QrCode,
  ChevronRight,
  Calendar,
  Scan,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  qrCodes,
  qrFolders,
  formatDate,
  formatNumber,
  getTypeColor,
  getTypeLabel,
} from '@/data/qrCodeData';
import { useTranslation } from 'react-i18next';

export const Folders = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const stats = useMemo(() => ({
    totalFolders: qrFolders.length,
    totalQRCodes: qrCodes.length,
    avgPerFolder: Math.round(qrCodes.length / qrFolders.length),
    emptyFolders: qrFolders.filter(f => !qrCodes.some(q => q.folderId === f.id)).length,
  }), []);

  const filteredFolders = useMemo(() => {
    if (!searchQuery) return qrFolders;
    const query = searchQuery.toLowerCase();
    return qrFolders.filter(f => f.name.toLowerCase().includes(query));
  }, [searchQuery]);

  const selectedFolderData = useMemo(() => {
    if (!selectedFolder) return null;
    const folder = qrFolders.find(f => f.id === selectedFolder);
    const folderQRCodes = qrCodes.filter(q => q.folderId === selectedFolder);
    return { folder, qrCodes: folderQRCodes };
  }, [selectedFolder]);

  const getFolderStats = (folderId: string) => {
    const folderQRCodes = qrCodes.filter(q => q.folderId === folderId);
    return {
      count: folderQRCodes.length,
      totalScans: folderQRCodes.reduce((sum, q) => sum + q.scans, 0),
    };
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, this would create the folder via API
      console.log('Creating folder:', newFolderName);
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('qr-codes.qrCodeFolders', 'QR Code Folders')}
        subtitle="Organize your QR codes into folders"
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsCreating(true)}>
            New Folder
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Folders"
          value={stats.totalFolders.toString()}
          icon={Folder}
          iconColor="#547792"
        />
        <StatsCard
          title="Total QR Codes"
          value={stats.totalQRCodes.toString()}
          icon={QrCode}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg. per Folder"
          value={stats.avgPerFolder.toString()}
          icon={FolderOpen}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Empty Folders"
          value={stats.emptyFolders.toString()}
          icon={Folder}
          iconColor="#64748b"
        />
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
        </div>
      </Card>

      {/* Create Folder Modal */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsCreating(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 w-96">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Create New Folder</h3>
              <Input
                label="Folder Name"
                placeholder="Enter folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
                  Create
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folders List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">All Folders</h3>
            <div className="space-y-2">
              {filteredFolders.map((folder, index) => {
                const folderStats = getFolderStats(folder.id);
                const isSelected = selectedFolder === folder.id;

                return (
                  <motion.button
                    key={folder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                      isSelected
                        ? 'bg-accent-primary/10 border border-accent-primary/30'
                        : 'hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${folder.color}20` }}
                    >
                      {isSelected ? (
                        <FolderOpen size={20} style={{ color: folder.color }} />
                      ) : (
                        <Folder size={20} style={{ color: folder.color }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary truncate">{folder.name}</p>
                      <p className="text-xs text-text-muted">
                        {folderStats.count} QR codes • {formatNumber(folderStats.totalScans)} scans
                      </p>
                    </div>
                    <ChevronRight size={16} className={`text-text-muted transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Folder Content */}
        <div className="lg:col-span-2">
          {selectedFolderData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedFolder}
            >
              <Card className="p-6">
                {/* Folder Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${selectedFolderData.folder?.color}20` }}
                    >
                      <FolderOpen size={24} style={{ color: selectedFolderData.folder?.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{selectedFolderData.folder?.name}</h3>
                      <p className="text-sm text-text-secondary">
                        {selectedFolderData.qrCodes.length} QR codes
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-blue-400">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Folder Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                    <p className="text-sm text-text-muted mb-1">QR Codes</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedFolderData.qrCodes.length}</p>
                  </div>
                  <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                    <p className="text-sm text-text-muted mb-1">Total Scans</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatNumber(selectedFolderData.qrCodes.reduce((sum, q) => sum + q.scans, 0))}
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                    <p className="text-sm text-text-muted mb-1">Active</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {selectedFolderData.qrCodes.filter(q => q.status === 'active').length}
                    </p>
                  </div>
                </div>

                {/* QR Codes in Folder */}
                {selectedFolderData.qrCodes.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wide mb-3">
                      QR Codes in this folder
                    </h4>
                    {selectedFolderData.qrCodes.map((qr, index) => {
                      const typeColor = getTypeColor(qr.type);

                      return (
                        <motion.div
                          key={qr.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="flex items-center gap-4 p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                          onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}
                        >
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: qr.style.backgroundColor,
                              border: `2px solid ${qr.style.foregroundColor}`,
                            }}
                          >
                            <QrCode size={24} style={{ color: qr.style.foregroundColor }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-text-primary truncate">{qr.name}</p>
                              <span
                                className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                              >
                                {getTypeLabel(qr.type)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Scan size={12} />
                                {formatNumber(qr.scans)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(qr.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              qr.status === 'active'
                                ? 'bg-green-500/20 text-green-400'
                                : qr.status === 'expired'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-slate-500/20 text-slate-400'
                            }`}>
                              {qr.status}
                            </span>
                            <button
                              className="p-1 hover:bg-background-primary rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/dashboard/qr-codes/${qr.id}`);
                              }}
                            >
                              <Eye size={16} className="text-text-muted" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <QrCode size={48} className="mx-auto mb-4 text-text-muted" />
                    <p className="text-text-secondary mb-4">This folder is empty</p>
                    <Button
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                      onClick={() => navigate('/dashboard/qr-codes/create')}
                    >
                      Add QR Code
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ) : (
            <Card className="p-12 text-center">
              <Folder size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">Select a folder to view its contents</p>
            </Card>
          )}
        </div>
      </div>

      {filteredFolders.length === 0 && (
        <Card className="p-12 text-center">
          <Folder size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary mb-4">No folders found</p>
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsCreating(true)}>
            Create Your First Folder
          </Button>
        </Card>
      )}
    </div>
  );
};
