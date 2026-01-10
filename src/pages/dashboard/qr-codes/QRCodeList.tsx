import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  QrCode,
  LayoutGrid,
  List,
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  ExternalLink,
  BarChart3,
  Calendar,
  Scan,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  qrCodes,
  qrFolders,
  qrCodeTypes,
  formatDate,
  formatNumber,
  getStatusColor,
  getTypeColor,
  getTypeLabel,
  type QRCode,
} from '@/data/qrCodeData';

export const QRCodeList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: qrCodes.length,
    active: qrCodes.filter(q => q.status === 'active').length,
    totalScans: qrCodes.reduce((sum, q) => sum + q.scans, 0),
    dynamic: qrCodes.filter(q => q.isDynamic).length,
  }), []);

  const filteredQRCodes = useMemo(() => {
    let filtered = [...qrCodes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        q =>
          q.name.toLowerCase().includes(query) ||
          q.id.toLowerCase().includes(query) ||
          (typeof q.content === 'string' && q.content.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(q => q.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(q => q.status === selectedStatus);
    }

    if (selectedFolder !== 'all') {
      filtered = filtered.filter(q => q.folderId === selectedFolder);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchQuery, selectedType, selectedStatus, selectedFolder]);

  const getStatusBadge = (status: QRCode['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active' },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Expired' },
      disabled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Disabled' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: QRCode['type']) => {
    const color = getTypeColor(type);
    const label = getTypeLabel(type);
    return (
      <span
        className="px-2 py-0.5 rounded text-xs font-medium"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {label}
      </span>
    );
  };

  const handleCopyShortUrl = (shortUrl: string | null) => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="QR Code Management"
        subtitle="Create, manage and track your QR codes"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
              Create QR Code
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total QR Codes"
          value={stats.total.toString()}
          icon={QrCode}
          iconColor="#547792"
        />
        <StatsCard
          title="Active QR Codes"
          value={stats.active.toString()}
          icon={QrCode}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Scans"
          value={formatNumber(stats.totalScans)}
          icon={Scan}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Dynamic QR Codes"
          value={stats.dynamic.toString()}
          icon={BarChart3}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search QR codes..."
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
              {qrCodeTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="disabled">Disabled</option>
            </select>

            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Folders</option>
              {qrFolders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
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

      {/* QR Code Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredQRCodes.map((qr, index) => (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all group cursor-pointer" onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}>
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getStatusColor(qr.status) }}
                />

                <div className="pt-1">
                  {/* QR Code Preview */}
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: qr.style.backgroundColor,
                        border: `2px solid ${qr.style.foregroundColor}`,
                      }}
                    >
                      <QrCode size={48} style={{ color: qr.style.foregroundColor }} />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-text-primary truncate">{qr.name}</h3>
                    <p className="text-xs text-text-secondary font-mono">{qr.id}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {getTypeBadge(qr.type)}
                    {getStatusBadge(qr.status)}
                  </div>

                  {/* Dynamic Badge */}
                  {qr.isDynamic && (
                    <div className="flex justify-center mb-3">
                      <span className="px-2 py-0.5 bg-[#94B4C1]/20 text-[#94B4C1] rounded text-xs font-medium">
                        Dynamic
                      </span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-text-secondary mb-3">
                    <div className="flex items-center gap-1">
                      <Scan size={14} />
                      <span>{formatNumber(qr.scans)} scans</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(qr.createdAt)}</span>
                    </div>
                  </div>

                  {/* Short URL */}
                  {qr.shortUrl && (
                    <div className="flex items-center gap-2 p-2 bg-white/[0.03] backdrop-blur-xl rounded-lg text-xs mb-3">
                      <ExternalLink size={12} className="text-text-muted flex-shrink-0" />
                      <span className="text-text-secondary truncate">{qr.shortUrl}</span>
                      <button
                        className="p-1 hover:bg-white/[0.05] rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyShortUrl(qr.shortUrl);
                        }}
                      >
                        <Copy size={12} className="text-text-muted" />
                      </button>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-accent-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/qr-codes/${qr.id}`);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-blue-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-green-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} />
                    </button>
                    <button
                      className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={16} />
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">QR Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Folder</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Scans</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Unique</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Created</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredQRCodes.map((qr, index) => (
                  <motion.tr
                    key={qr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: qr.style.backgroundColor,
                            border: `1px solid ${qr.style.foregroundColor}`,
                          }}
                        >
                          <QrCode size={18} style={{ color: qr.style.foregroundColor }} />
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">{qr.name}</span>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-text-secondary font-mono">{qr.id}</p>
                            {qr.isDynamic && (
                              <span className="px-1.5 py-0.5 bg-[#94B4C1]/20 text-[#94B4C1] rounded text-[10px] font-medium">
                                Dynamic
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getTypeBadge(qr.type)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary">
                        {qr.folder}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-primary font-medium">
                      {formatNumber(qr.scans)}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {formatNumber(qr.uniqueScans)}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {formatDate(qr.createdAt)}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(qr.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/qr-codes/${qr.id}`);
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400"
                          onClick={(e) => e.stopPropagation()}
                        >
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

      {filteredQRCodes.length === 0 && (
        <Card className="p-12 text-center">
          <QrCode size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No QR codes found matching your filters</p>
          <Button className="mt-4" leftIcon={<Plus size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
            Create Your First QR Code
          </Button>
        </Card>
      )}
    </div>
  );
};
