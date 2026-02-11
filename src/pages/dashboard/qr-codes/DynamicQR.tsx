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
import { useTranslation } from 'react-i18next';

export const DynamicQR = () => {
  const { t } = useTranslation('qrCodes');
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
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('dynamicQr.active'), icon: CheckCircle },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('dynamicQr.expired'), icon: AlertCircle },
      disabled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: t('dynamicQr.disabled'), icon: AlertCircle },
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
        title={t('dynamicQr.title')}
        subtitle={t('dynamicQr.subtitle')}
        actions={
          <Button leftIcon={<Zap size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
            {t('dynamicQr.createDynamic')}
          </Button>
        }
      />

      {/* Info Banner */}
      <Card className="p-4 bg-[#94B4C1]/10 border-[#94B4C1]/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#94B4C1]/20 flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-[#94B4C1]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary mb-1">{t('dynamicQr.whatAreDynamic')}</h3>
            <p className="text-sm text-text-secondary">
              {t('dynamicQr.dynamicDescription')}
            </p>
          </div>
          <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
            {t('dynamicQr.learnMore')}
          </Button>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('dynamicQr.dynamicQrCodes')}
          value={stats.total.toString()}
          icon={Zap}
          iconColor="#94B4C1"
        />
        <StatsCard
          title={t('dynamicQr.active')}
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('dynamicQr.totalScans')}
          value={formatNumber(stats.totalScans)}
          icon={Scan}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('dynamicQr.withShortUrls')}
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
              placeholder={t('dynamicQr.searchPlaceholder')}
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
            <option value="all">{t('dynamicQr.allStatus')}</option>
            <option value="active">{t('dynamicQr.active')}</option>
            <option value="expired">{t('dynamicQr.expired')}</option>
            <option value="disabled">{t('dynamicQr.disabled')}</option>
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
                          {t('dynamicQr.editContent')}
                        </Button>
                        <Button variant="outline" size="sm" leftIcon={<BarChart3 size={14} />} onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}>
                          {t('dynamicQr.analytics')}
                        </Button>
                      </div>
                    </div>

                    {/* Short URL */}
                    {qr.shortUrl && (
                      <div className="flex items-center gap-3 p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg mb-4">
                        <Link size={16} className="text-accent-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-muted mb-0.5">{t('dynamicQr.shortUrl')}</p>
                          <p className="text-sm text-text-primary truncate">{qr.shortUrl}</p>
                        </div>
                        <button
                          onClick={() => handleCopyShortUrl(qr.shortUrl)}
                          className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                        >
                          <Copy size={16} className="text-text-muted hover:text-accent-primary" />
                        </button>
                        <a
                          href={qr.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                        >
                          <ExternalLink size={16} className="text-text-muted hover:text-accent-primary" />
                        </a>
                      </div>
                    )}

                    {/* Content Preview */}
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg mb-4">
                      <p className="text-xs text-text-muted mb-1">{t('dynamicQr.currentDestination')}</p>
                      <p className="text-sm text-text-primary truncate">
                        {typeof qr.content === 'string' ? qr.content : JSON.stringify(qr.content)}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Scan size={16} className="text-accent-primary" />
                        <span>{formatNumber(qr.scans)} {t('dynamicQr.scans')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Calendar size={16} />
                        <span>{t('dynamicQr.created')} {formatDate(qr.createdAt)}</span>
                      </div>
                      {qr.lastScan && (
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Clock size={16} />
                          <span>{t('dynamicQr.lastScan')} {formatDate(qr.lastScan)}</span>
                        </div>
                      )}
                      {qr.expiresAt && (
                        <div className={`flex items-center gap-2 ${new Date(qr.expiresAt) < new Date() ? 'text-red-400' : 'text-text-secondary'}`}>
                          <AlertCircle size={16} />
                          <span>{t('dynamicQr.expires')} {formatDate(qr.expiresAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08]">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.05] rounded transition-colors">
                    <RefreshCw size={14} />
                    {t('dynamicQr.updateContent')}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.05] rounded transition-colors">
                    <Copy size={14} />
                    {t('dynamicQr.duplicate')}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.05] rounded transition-colors">
                    <Settings size={14} />
                    {t('dynamicQr.settings')}
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-accent-primary hover:bg-white/[0.05] rounded transition-colors"
                    onClick={() => navigate(`/dashboard/qr-codes/${qr.id}`)}
                  >
                    <Eye size={14} />
                    {t('dynamicQr.viewDetails')}
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
          <p className="text-text-secondary mb-4">{t('dynamicQr.noDynamicFound')}</p>
          <Button leftIcon={<Zap size={16} />} onClick={() => navigate('/dashboard/qr-codes/create')}>
            {t('dynamicQr.createFirstDynamic')}
          </Button>
        </Card>
      )}

      {/* Features Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-6">{t('dynamicQr.features')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={20} className="text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">{t('dynamicQr.editableContent')}</h4>
              <p className="text-sm text-text-secondary">
                {t('dynamicQr.editableContentDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={20} className="text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">{t('dynamicQr.detailedAnalytics')}</h4>
              <p className="text-sm text-text-secondary">
                {t('dynamicQr.detailedAnalyticsDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#94B4C1]/20 flex items-center justify-center flex-shrink-0">
              <Link size={20} className="text-[#94B4C1]" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">{t('dynamicQr.shortUrls')}</h4>
              <p className="text-sm text-text-secondary">
                {t('dynamicQr.shortUrlsDesc')}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
