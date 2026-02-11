import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  QrCode,
  Edit,
  Trash2,
  Download,
  Copy,
  ExternalLink,
  BarChart3,
  Calendar,
  Scan,
  Clock,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  TrendingUp,
  Users,
  Eye,
  Share2,
  Pause,
  Play,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  qrCodes,
  scanLogs,
  formatDate,
  formatDateTime,
  formatNumber,
  getStatusColor,
  getTypeColor,
  getTypeLabel,
  type QRCode,
} from '@/data/qrCodeData';
import { useTranslation } from 'react-i18next';

export const QRCodeDetail = () => {
  const { t } = useTranslation('qrCodes');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const qrCode = useMemo(() => qrCodes.find(q => q.id === id), [id]);
  const qrScanLogs = useMemo(() => scanLogs.filter(log => log.qrCodeId === id), [id]);

  if (!qrCode) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t('qrCodeDetail.qrCodeNotFound')}
          subtitle={t('qrCodeDetail.qrCodeNotFoundSubtitle')}
          actions={
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/qr-codes/list')}
            >
              {t('qrCodeDetail.backToList')}
            </Button>
          }
        />
        <Card className="p-12 text-center">
          <QrCode size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('qrCodeDetail.qrCodeNotFoundMessage', { id })}</p>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: QRCode['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('qrCodeDetail.active') },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('qrCodeDetail.expired') },
      disabled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: t('qrCodeDetail.disabled') },
    };
    const c = config[status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: QRCode['type']) => {
    const color = getTypeColor(type);
    const label = getTypeLabel(type);
    return (
      <span
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {label}
      </span>
    );
  };

  const handleCopyShortUrl = () => {
    if (qrCode.shortUrl) {
      navigator.clipboard.writeText(qrCode.shortUrl);
    }
  };

  // Mock analytics data
  const mockAnalytics = {
    scansByDay: [
      { date: '2024-01-20', scans: 45 },
      { date: '2024-01-21', scans: 62 },
      { date: '2024-01-22', scans: 38 },
      { date: '2024-01-23', scans: 71 },
      { date: '2024-01-24', scans: 55 },
      { date: '2024-01-25', scans: 89 },
      { date: '2024-01-26', scans: 42 },
    ],
    deviceBreakdown: {
      mobile: 72,
      desktop: 18,
      tablet: 10,
    },
    topLocations: [
      { country: 'United States', scans: 1250 },
      { country: 'Germany', scans: 580 },
      { country: 'United Kingdom', scans: 420 },
      { country: 'Turkey', scans: 350 },
      { country: 'France', scans: 280 },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={qrCode.name}
        subtitle={`${getTypeLabel(qrCode.type)} QR Code • ${qrCode.id}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/qr-codes/list')}
            >
              {t('qrCodeDetail.back')}
            </Button>
            <Button
              variant="outline"
              leftIcon={<Edit size={16} />}
            >
              {t('qrCodeDetail.edit')}
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download size={16} />}
            >
              {t('qrCodeDetail.download')}
            </Button>
            <Button
              variant="outline"
              leftIcon={<Share2 size={16} />}
            >
              {t('qrCodeDetail.share')}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title={t('qrCodeDetail.totalScans')}
              value={formatNumber(qrCode.scans)}
              icon={Scan}
              iconColor="#547792"
            />
            <StatsCard
              title={t('qrCodeDetail.uniqueScans')}
              value={formatNumber(qrCode.uniqueScans)}
              icon={Users}
              iconColor="#10b981"
            />
            <StatsCard
              title={t('qrCodeDetail.viewsToday')}
              value="127"
              icon={Eye}
              iconColor="#f59e0b"
            />
            <StatsCard
              title={t('qrCodeDetail.conversionRate')}
              value="68%"
              icon={TrendingUp}
              iconColor="#94B4C1"
            />
          </div>

          {/* Scan Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">{t('qrCodeDetail.scanTrend')}</h3>
                <select className="px-3 py-1 bg-white/[0.05] border border-white/[0.08] rounded text-sm text-text-primary">
                  <option>{t('qrCodeDetail.last7Days')}</option>
                  <option>{t('qrCodeDetail.last30Days')}</option>
                  <option>{t('qrCodeDetail.last90Days')}</option>
                </select>
              </div>
              <div className="h-48 flex items-end gap-2">
                {mockAnalytics.scansByDay.map((day, index) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.scans / 100) * 100}%` }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="w-full bg-accent-primary rounded-t"
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-xs text-text-muted">{day.date.slice(-2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Device & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">{t('qrCodeDetail.deviceBreakdown')}</h3>
                <div className="space-y-4">
                  {[
                    { label: t('qrCodeDetail.mobile'), value: mockAnalytics.deviceBreakdown.mobile, icon: Smartphone, color: '#3b82f6' },
                    { label: t('qrCodeDetail.desktop'), value: mockAnalytics.deviceBreakdown.desktop, icon: Monitor, color: '#10b981' },
                    { label: t('qrCodeDetail.tablet'), value: mockAnalytics.deviceBreakdown.tablet, icon: Monitor, color: '#f59e0b' },
                  ].map((device) => (
                    <div key={device.label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <device.icon size={16} style={{ color: device.color }} />
                          <span className="text-sm text-text-secondary">{device.label}</span>
                        </div>
                        <span className="text-sm font-medium text-text-primary">{device.value}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${device.value}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">{t('qrCodeDetail.topLocations')}</h3>
                <div className="space-y-3">
                  {mockAnalytics.topLocations.map((location, index) => (
                    <div key={location.country} className="flex items-center justify-between p-2 hover:bg-white/[0.05] rounded transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-xs text-text-muted">
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-text-muted" />
                          <span className="text-sm text-text-primary">{location.country}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-text-secondary">{formatNumber(location.scans)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Scans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('qrCodeDetail.recentScans')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left py-2 px-3 text-sm font-medium text-text-secondary">{t('qrCodeDetail.time')}</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-text-secondary">{t('qrCodeDetail.location')}</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-text-secondary">{t('qrCodeDetail.device')}</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-text-secondary">{t('qrCodeDetail.browser')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {qrScanLogs.length > 0 ? qrScanLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.05] transition-colors">
                        <td className="py-2 px-3 text-sm text-text-primary">{formatDateTime(log.scannedAt)}</td>
                        <td className="py-2 px-3 text-sm text-text-secondary">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            {log.city}, {log.country}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-sm text-text-secondary">{log.device}</td>
                        <td className="py-2 px-3 text-sm text-text-secondary">{log.browser}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-text-muted">{t('qrCodeDetail.noScanLogs')}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                style={{ backgroundColor: getStatusColor(qrCode.status) }}
              />
              <div className="flex justify-center mb-4 pt-2">
                <div
                  className="w-40 h-40 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: qrCode.style.backgroundColor,
                    border: `4px solid ${qrCode.style.foregroundColor}`,
                  }}
                >
                  <QrCode size={80} style={{ color: qrCode.style.foregroundColor }} />
                </div>
              </div>
              <div className="text-center mb-4">
                <h3 className="font-semibold text-text-primary">{qrCode.name}</h3>
                <p className="text-xs text-text-secondary font-mono">{qrCode.id}</p>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {getTypeBadge(qrCode.type)}
                {getStatusBadge(qrCode.status)}
              </div>
              {qrCode.isDynamic && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-[#94B4C1]/20 text-[#94B4C1] rounded-full text-sm font-medium">
                    {t('qrCodeDetail.dynamicQrCode')}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" leftIcon={<Download size={14} />}>
                  PNG
                </Button>
                <Button variant="outline" size="sm" className="flex-1" leftIcon={<Download size={14} />}>
                  SVG
                </Button>
                <Button variant="outline" size="sm" className="flex-1" leftIcon={<Download size={14} />}>
                  PDF
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Short URL */}
          {qrCode.shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-text-primary mb-3">{t('qrCodeDetail.shortUrl')}</h3>
                <div className="flex items-center gap-2 p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                  <ExternalLink size={16} className="text-text-muted flex-shrink-0" />
                  <span className="text-sm text-text-secondary truncate flex-1">{qrCode.shortUrl}</span>
                  <button
                    onClick={handleCopyShortUrl}
                    className="p-1 hover:bg-white/[0.05] rounded"
                  >
                    <Copy size={16} className="text-text-muted hover:text-accent-primary" />
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold text-text-primary mb-4">{t('qrCodeDetail.details')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/[0.08]">
                  <span className="text-sm text-text-secondary flex items-center gap-2">
                    <Calendar size={14} />
                    {t('qrCodeDetail.created')}
                  </span>
                  <span className="text-sm text-text-primary">{formatDate(qrCode.createdAt)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/[0.08]">
                  <span className="text-sm text-text-secondary flex items-center gap-2">
                    <Clock size={14} />
                    {t('qrCodeDetail.lastUpdated')}
                  </span>
                  <span className="text-sm text-text-primary">{formatDate(qrCode.updatedAt)}</span>
                </div>
                {qrCode.lastScan && (
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-sm text-text-secondary flex items-center gap-2">
                      <Scan size={14} />
                      {t('qrCodeDetail.lastScan')}
                    </span>
                    <span className="text-sm text-text-primary">{formatDate(qrCode.lastScan)}</span>
                  </div>
                )}
                {qrCode.expiresAt && (
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-sm text-text-secondary flex items-center gap-2">
                      <Clock size={14} />
                      {t('qrCodeDetail.expires')}
                    </span>
                    <span className={`text-sm ${new Date(qrCode.expiresAt) < new Date() ? 'text-red-400' : 'text-text-primary'}`}>
                      {formatDate(qrCode.expiresAt)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-sm text-text-secondary">{t('qrCodeDetail.folder')}</span>
                  <span className="text-sm text-text-primary">{qrCode.folder}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold text-text-primary mb-4">{t('qrCodeDetail.quickActions')}</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/[0.05] rounded-lg transition-colors">
                  <Edit size={18} className="text-accent-primary" />
                  <span className="text-sm text-text-primary">{t('qrCodeDetail.editQrCode')}</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/[0.05] rounded-lg transition-colors">
                  <BarChart3 size={18} className="text-blue-400" />
                  <span className="text-sm text-text-primary">{t('qrCodeDetail.viewFullAnalytics')}</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/[0.05] rounded-lg transition-colors">
                  <Copy size={18} className="text-green-400" />
                  <span className="text-sm text-text-primary">{t('qrCodeDetail.duplicateQrCode')}</span>
                </button>
                {qrCode.status === 'active' ? (
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/[0.05] rounded-lg transition-colors">
                    <Pause size={18} className="text-yellow-400" />
                    <span className="text-sm text-text-primary">{t('qrCodeDetail.pauseQrCode')}</span>
                  </button>
                ) : (
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/[0.05] rounded-lg transition-colors">
                    <Play size={18} className="text-green-400" />
                    <span className="text-sm text-text-primary">{t('qrCodeDetail.activateQrCode')}</span>
                  </button>
                )}
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-500/10 rounded-lg transition-colors text-red-400">
                  <Trash2 size={18} />
                  <span className="text-sm">{t('qrCodeDetail.deleteQrCode')}</span>
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
