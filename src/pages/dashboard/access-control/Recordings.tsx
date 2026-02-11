import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Film,
  Play,
  Download,
  Trash2,
  Clock,
  HardDrive,
  Calendar,
  Camera,
  Archive,
  RefreshCw,
  Filter,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { recordings, cameras } from '@/data/accessControlData';
import { useTranslation } from 'react-i18next';

export const Recordings = () => {
  const { t } = useTranslation('accessControl');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => {
    const totalSize = recordings.reduce((acc, r) => {
      const size = parseFloat(r.size);
      const unit = r.size.includes('GB') ? 1024 : 1;
      return acc + (size * unit);
    }, 0);

    return {
      total: recordings.length,
      available: recordings.filter(r => r.status === 'available').length,
      archived: recordings.filter(r => r.status === 'archived').length,
      totalStorage: `${(totalSize / 1024).toFixed(1)} GB`,
    };
  }, []);

  const filteredRecordings = useMemo(() => {
    let filtered = [...recordings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.cameraName.toLowerCase().includes(query) ||
          r.type.toLowerCase().includes(query)
      );
    }

    if (selectedCamera !== 'all') {
      filtered = filtered.filter(r => r.cameraId === selectedCamera);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }

    return filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }, [searchQuery, selectedCamera, selectedType, selectedStatus]);

  const getTypeBadge = (type: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      continuous: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      motion: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
      scheduled: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]' },
      manual: { bg: 'bg-green-500/20', text: 'text-green-400' },
    };
    const typeLabels: Record<string, string> = {
      continuous: t('recordings.continuous'),
      motion: t('recordings.motion'),
      scheduled: t('recordings.scheduled'),
      manual: t('recordings.manual'),
    };
    const c = config[type] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {typeLabels[type] || type}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      available: { bg: 'bg-green-500/20', text: 'text-green-400' },
      archived: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
      processing: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
    };
    const statusLabels: Record<string, string> = {
      available: t('recordings.available'),
      archived: t('recordings.archived'),
      processing: t('recordings.processing'),
    };
    const c = config[status] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('recordings.title')}
        subtitle={t('recordings.subtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Archive size={16} />}>
              {t('recordings.archiveOld')}
            </Button>
            <Button leftIcon={<Download size={16} />}>
              {t('recordings.exportSelected')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('recordings.totalRecordings')}
          value={stats.total.toString()}
          icon={Film}
          iconColor="#547792"
        />
        <StatsCard
          title={t('recordings.available')}
          value={stats.available.toString()}
          icon={Play}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('recordings.archived')}
          value={stats.archived.toString()}
          icon={Archive}
          iconColor="#6b7280"
        />
        <StatsCard
          title={t('recordings.totalStorage')}
          value={stats.totalStorage}
          icon={HardDrive}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder={t('recordings.searchRecordings')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('recordings.allCameras')}</option>
            {cameras.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('recordings.allTypes')}</option>
            <option value="continuous">{t('recordings.continuous')}</option>
            <option value="motion">{t('recordings.motion')}</option>
            <option value="scheduled">{t('recordings.scheduled')}</option>
            <option value="manual">{t('recordings.manual')}</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('recordings.allStatus')}</option>
            <option value="available">{t('recordings.available')}</option>
            <option value="archived">{t('recordings.archived')}</option>
            <option value="processing">{t('recordings.processing')}</option>
          </select>

          <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
            {t('recordings.moreFilters')}
          </Button>
        </div>
      </Card>

      {/* Recordings List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  <input type="checkbox" className="rounded border-white/[0.08]" />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.camera')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.time')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.duration')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.type')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.size')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.allStatus')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('recordings.camera')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredRecordings.map((recording, index) => (
                <motion.tr
                  key={recording.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/[0.05] transition-colors"
                >
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded border-white/[0.08]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                        <Camera size={16} className="text-accent-primary" />
                      </div>
                      <span className="font-medium text-text-primary">{recording.cameraName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-text-muted" />
                      <div>
                        <p className="text-text-primary">{formatDateTime(recording.startTime)}</p>
                        <p className="text-xs text-text-secondary">{t('recordings.to')} {formatDateTime(recording.endTime)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Clock size={14} />
                      {recording.duration}
                    </div>
                  </td>
                  <td className="py-3 px-4">{getTypeBadge(recording.type)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <HardDrive size={14} />
                      {recording.size}
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(recording.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary"
                        title="Play"
                        disabled={recording.status === 'processing'}
                      >
                        <Play size={14} />
                      </button>
                      <button
                        className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400"
                        title="Download"
                        disabled={recording.status === 'processing'}
                      >
                        <Download size={14} />
                      </button>
                      <button
                        className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400"
                        title="Delete"
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

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-white/[0.08]">
          <p className="text-sm text-text-secondary">
            {t('recordings.showing', { filtered: filteredRecordings.length, total: recordings.length })}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled>
              {t('recordings.previous')}
            </Button>
            <Button variant="secondary" size="sm">
              {t('recordings.next')}
            </Button>
          </div>
        </div>
      </Card>

      {filteredRecordings.length === 0 && (
        <Card className="p-12 text-center">
          <Film size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('recordings.noRecordingsFound')}</p>
        </Card>
      )}

      {/* Storage Info */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HardDrive size={20} className="text-text-muted" />
            <div>
              <p className="text-sm font-medium text-text-primary">{t('recordings.storageUsage')}</p>
              <p className="text-xs text-text-secondary">{t('recordings.storageDetail', { used: '82.5 GB', total: '500 GB' })}</p>
            </div>
          </div>
          <div className="flex-1 max-w-md mx-8">
            <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary rounded-full"
                style={{ width: '16.5%' }}
              />
            </div>
          </div>
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={14} />}>
            {t('recordings.cleanUp')}
          </Button>
        </div>
      </Card>
    </div>
  );
};
