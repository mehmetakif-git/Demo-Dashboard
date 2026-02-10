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
  const { t } = useTranslation('common');
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
    const c = config[type] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {type}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      available: { bg: 'bg-green-500/20', text: 'text-green-400' },
      archived: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
      processing: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
    };
    const c = config[status] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {status}
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
        title={t('access-control.recordings', 'Recordings')}
        subtitle="View and manage camera recordings"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Archive size={16} />}>
              Archive Old
            </Button>
            <Button leftIcon={<Download size={16} />}>
              Export Selected
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Recordings"
          value={stats.total.toString()}
          icon={Film}
          iconColor="#547792"
        />
        <StatsCard
          title="Available"
          value={stats.available.toString()}
          icon={Play}
          iconColor="#10b981"
        />
        <StatsCard
          title="Archived"
          value={stats.archived.toString()}
          icon={Archive}
          iconColor="#6b7280"
        />
        <StatsCard
          title="Total Storage"
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
              placeholder="Search recordings..."
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
            <option value="all">All Cameras</option>
            {cameras.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Types</option>
            <option value="continuous">Continuous</option>
            <option value="motion">Motion</option>
            <option value="scheduled">Scheduled</option>
            <option value="manual">Manual</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="archived">Archived</option>
            <option value="processing">Processing</option>
          </select>

          <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
            More Filters
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
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Camera</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Size</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
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
                        <p className="text-xs text-text-secondary">to {formatDateTime(recording.endTime)}</p>
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
            Showing {filteredRecordings.length} of {recordings.length} recordings
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>
            <Button variant="secondary" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>

      {filteredRecordings.length === 0 && (
        <Card className="p-12 text-center">
          <Film size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No recordings found matching your filters</p>
        </Card>
      )}

      {/* Storage Info */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HardDrive size={20} className="text-text-muted" />
            <div>
              <p className="text-sm font-medium text-text-primary">Storage Usage</p>
              <p className="text-xs text-text-secondary">82.5 GB used of 500 GB</p>
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
            Clean Up
          </Button>
        </div>
      </Card>
    </div>
  );
};
