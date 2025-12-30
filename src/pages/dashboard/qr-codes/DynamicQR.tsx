import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  QrCode,
  Zap,
  Edit,
  Eye,
  ExternalLink,
  Copy,
  Scan,
  Calendar,
  RefreshCw,
  Link,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Settings,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  qrCodes,
  formatDate,
  formatNumber,
  getStatusColor,
  getTypeColor,
  getTypeLabel,
  type QRCode,
} from '@/data/qrCodeData';

export const DynamicQR = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const dynamicQRCodes = useMemo(() =>
    qrCodes.filter(q => q.isDynamic),
  []);

  const stats = useMemo(() => ({
    total: dynamicQRCodes.length,
    active: dynamicQRCodes.filter(q => q.status === 'active').length,
    totalScans: dynamicQRCodes.reduce((sum, q) => sum + q.scans, 0),
    withShortUrl: dynamicQRCodes.filter(q => q.shortUrl).length,
  }), [dynamicQRCodes]);

  const filteredQRCodes = useMemo(() => {
    let filtered = [...dynamicQRCodes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        q =>
          q.name.toLowerCase().includes(query) ||
          q.id.toLowerCase().includes(query) ||
          q.shortUrl?.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(q => q.status === selectedStatus);
    }

    return filtered.sort((a, b) => b.scans - a.scans);
  }, [searchQuery, selectedStatus, dynamicQRCodes]);

  const getStatusBadge = (status: QRCode['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active', icon: CheckCircle },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Expired', icon: AlertCircle },
      disabled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Disabled', icon: AlertCircle },
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <c.icon size={12} />
        {c.label}
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
        title="Dynamic QR Codes"
        subtitle="Manage QR codes with editable content"
        actions={
          <Button leftIcon={<Zap size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
            Create Dynamic QR
          </Button>
        }
      />

      {/* Info Banner */}
      <Card className="p-4 bg-purple-500/10 border-purple-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary mb-1">What are Dynamic QR Codes?</h3>
            <p className="text-sm text-text-secondary">
              Dynamic QR codes allow you to change the destination URL or content without reprinting the code.
              They also provide detailed scan analytics and can be paused or disabled at any time.
            </p>
          </div>
          <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
            Learn More
          </Button>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Dynamic QR Codes"
          value={stats.total.toString()}
          icon={Zap}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Active"
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Scans"
          value={formatNumber(stats.totalScans)}
          icon={Scan}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="With Short URLs"
          value={stats.withShortUrl.toString()}
          icon={Link}
          iconColor="#3b82f6"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder="Search by name, ID or short URL..."
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
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </Card>

      {/* Dynamic QR Codes List */}
      <div className="space-y-4">
        {filteredQRCodes.map((qr, index) => {
          const typeColor = getTypeColor(qr.type);

          return (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getStatusColor(qr.status) }}
                />

                <div className="flex flex-col lg:flex-row gap-6 pt-2">
                  {/* QR Preview */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 rounded-xl flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: qr.style.backgroundColor,
                        border: `3px solid ${qr.style.foregroundColor}`,
                      }}
                      onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}
                    >
                      <QrCode size={64} style={{ color: qr.style.foregroundColor }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">{qr.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-text-muted font-mono">{qr.id}</span>
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                          >
                            {getTypeLabel(qr.type)}
                          </span>
                          {getStatusBadge(qr.status)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
                          Edit Content
                        </Button>
                        <Button variant="outline" size="sm" leftIcon={<BarChart3 size={14} />} onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}>
                          Analytics
                        </Button>
                      </div>
                    </div>

                    {/* Short URL */}
                    {qr.shortUrl && (
                      <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg mb-4">
                        <Link size={16} className="text-accent-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-muted mb-0.5">Short URL</p>
                          <p className="text-sm text-text-primary truncate">{qr.shortUrl}</p>
                        </div>
                        <button
                          onClick={() => handleCopyShortUrl(qr.shortUrl)}
                          className="p-2 hover:bg-background-tertiary rounded transition-colors"
                        >
                          <Copy size={16} className="text-text-muted hover:text-accent-primary" />
                        </button>
                        <a
                          href={qr.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-background-tertiary rounded transition-colors"
                        >
                          <ExternalLink size={16} className="text-text-muted hover:text-accent-primary" />
                        </a>
                      </div>
                    )}

                    {/* Content Preview */}
                    <div className="p-3 bg-background-secondary rounded-lg mb-4">
                      <p className="text-xs text-text-muted mb-1">Current Destination</p>
                      <p className="text-sm text-text-primary truncate">
                        {typeof qr.content === 'string' ? qr.content : JSON.stringify(qr.content)}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Scan size={16} className="text-accent-primary" />
                        <span>{formatNumber(qr.scans)} scans</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Calendar size={16} />
                        <span>Created {formatDate(qr.createdAt)}</span>
                      </div>
                      {qr.lastScan && (
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Clock size={16} />
                          <span>Last scan {formatDate(qr.lastScan)}</span>
                        </div>
                      )}
                      {qr.expiresAt && (
                        <div className={`flex items-center gap-2 ${new Date(qr.expiresAt) < new Date() ? 'text-red-400' : 'text-text-secondary'}`}>
                          <AlertCircle size={16} />
                          <span>Expires {formatDate(qr.expiresAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-default">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded transition-colors">
                    <RefreshCw size={14} />
                    Update Content
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded transition-colors">
                    <Copy size={14} />
                    Duplicate
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded transition-colors">
                    <Settings size={14} />
                    Settings
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-accent-primary hover:bg-background-tertiary rounded transition-colors"
                    onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredQRCodes.length === 0 && (
        <Card className="p-12 text-center">
          <Zap size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary mb-4">No dynamic QR codes found</p>
          <Button leftIcon={<Zap size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
            Create Your First Dynamic QR Code
          </Button>
        </Card>
      )}

      {/* Features Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-6">Dynamic QR Code Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={20} className="text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Editable Content</h4>
              <p className="text-sm text-text-secondary">
                Change the destination URL anytime without reprinting the QR code
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={20} className="text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Detailed Analytics</h4>
              <p className="text-sm text-text-secondary">
                Track scans, locations, devices, and user behavior in real-time
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Link size={20} className="text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Short URLs</h4>
              <p className="text-sm text-text-secondary">
                Each dynamic QR includes a short URL for easy sharing
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
