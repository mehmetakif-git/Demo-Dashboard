import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  FileCode,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  AlertCircle,
  Eye,
  X,
  Calendar,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  exportHistory,
  formatDateTime,
  getFormatColor,
  type ExportHistoryItem,
} from '@/data/reportData';

export const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<ExportHistoryItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredHistory = useMemo(() => {
    let history = [...exportHistory];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      history = history.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.createdBy.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== 'all') {
      history = history.filter((h) => h.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      history = history.filter((h) => h.status === statusFilter);
    }

    return history.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [searchQuery, typeFilter, statusFilter]);

  const getTypeIcon = (type: ExportHistoryItem['type']) => {
    switch (type) {
      case 'export':
        return <Download size={16} className="text-blue-400" />;
      case 'import':
        return <Upload size={16} className="text-green-400" />;
      case 'report':
        return <FileText size={16} className="text-purple-400" />;
    }
  };

  const getTypeBadge = (type: ExportHistoryItem['type']) => {
    const config = {
      export: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Export' },
      import: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Import' },
      report: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Report' },
    };
    const c = config[type];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {getTypeIcon(type)}
        {c.label}
      </span>
    );
  };

  const getStatusBadge = (status: ExportHistoryItem['status']) => {
    const config = {
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle },
      failed: { bg: 'bg-red-500/20', text: 'text-red-400', icon: XCircle },
      processing: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: Loader2 },
    };
    const c = config[status];
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} className={status === 'processing' ? 'animate-spin' : ''} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFormatIcon = (format: string) => {
    const icons: Record<string, React.ReactNode> = {
      Excel: <FileSpreadsheet size={16} />,
      CSV: <FileText size={16} />,
      JSON: <FileCode size={16} />,
      PDF: <FileText size={16} />,
    };
    return icons[format] || <FileText size={16} />;
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredHistory.map((h) => h.id));
    }
  };

  const showDetails = (item: ExportHistoryItem) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Export & Import History"
        subtitle="View and manage your export and import history"
      />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-text-muted" />
            <select className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Types</option>
            <option value="export">Exports</option>
            <option value="import">Imports</option>
            <option value="report">Reports</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="processing">Processing</option>
          </select>

          <div className="flex-1 min-w-64 max-w-md">
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              {selectedItems.length} selected
            </span>
            <button
              onClick={() => setSelectedItems([])}
              className="text-sm text-accent-primary hover:underline"
            >
              Clear selection
            </button>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>
              Download Selected
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Trash2 size={14} />}
              className="text-red-400 hover:bg-red-500/10"
            >
              Delete Selected
            </Button>
          </div>
        </Card>
      )}

      {/* History Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary border-b border-border-default">
                <th className="px-4 py-3 w-12">
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all cursor-pointer ${
                      selectedItems.length === filteredHistory.length && filteredHistory.length > 0
                        ? 'bg-accent-primary border-accent-primary'
                        : 'border-border-default'
                    }`}
                    onClick={toggleSelectAll}
                  >
                    {selectedItems.length === filteredHistory.length && filteredHistory.length > 0 && (
                      <svg
                        className="w-full h-full text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Format
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Records
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-border-default hover:bg-background-tertiary cursor-pointer ${
                    selectedItems.includes(item.id) ? 'bg-accent-primary/10' : ''
                  } ${item.status === 'failed' ? 'bg-red-500/5' : ''}`}
                  onClick={() => showDetails(item)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div
                      className={`w-5 h-5 rounded border-2 transition-all cursor-pointer ${
                        selectedItems.includes(item.id)
                          ? 'bg-accent-primary border-accent-primary'
                          : 'border-border-default'
                      }`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      {selectedItems.includes(item.id) && (
                        <svg
                          className="w-full h-full text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">{item.name}</span>
                      {item.status === 'failed' && (
                        <AlertCircle size={14} className="text-red-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{getTypeBadge(item.type)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span style={{ color: getFormatColor(item.format) }}>
                        {getFormatIcon(item.format)}
                      </span>
                      <span className="text-sm text-text-secondary">{item.format}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {item.records?.toLocaleString() || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{item.size}</td>
                  <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{item.createdBy}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      {item.downloadUrl && item.status === 'completed' && (
                        <button
                          className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary"
                          title="Download"
                        >
                          <Download size={14} />
                        </button>
                      )}
                      <button
                        className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary"
                        title="View Details"
                        onClick={() => showDetails(item)}
                      >
                        <Eye size={14} />
                      </button>
                      {item.type === 'report' && (
                        <button
                          className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-green-400"
                          title="Re-run"
                        >
                          <RefreshCw size={14} />
                        </button>
                      )}
                      <button
                        className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-red-400"
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
      </Card>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card className="p-12 text-center">
          <Clock size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No history found</p>
        </Card>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          Showing {filteredHistory.length} of {exportHistory.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="secondary" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-secondary rounded-xl max-w-lg w-full"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(selectedDetail.type)}
                  <h2 className="text-lg font-semibold text-text-primary">
                    {selectedDetail.name}
                  </h2>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-background-tertiary rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Type</p>
                  {getTypeBadge(selectedDetail.type)}
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Status</p>
                  {getStatusBadge(selectedDetail.status)}
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Format</p>
                  <div className="flex items-center gap-2">
                    <span style={{ color: getFormatColor(selectedDetail.format) }}>
                      {getFormatIcon(selectedDetail.format)}
                    </span>
                    <span className="text-sm text-text-primary">{selectedDetail.format}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Size</p>
                  <p className="text-sm text-text-primary">{selectedDetail.size}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Records</p>
                  <p className="text-sm text-text-primary">
                    {selectedDetail.records?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Created By</p>
                  <p className="text-sm text-text-primary">{selectedDetail.createdBy}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-text-muted mb-1">Date & Time</p>
                <p className="text-sm text-text-primary">
                  {formatDateTime(selectedDetail.createdAt)}
                </p>
              </div>

              {selectedDetail.status === 'failed' && selectedDetail.error && (
                <div className="p-4 bg-red-500/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-red-400" />
                    <span className="text-sm font-medium text-red-400">Error Details</span>
                  </div>
                  <p className="text-sm text-red-400">{selectedDetail.error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-default bg-background-tertiary flex justify-end gap-3">
              {selectedDetail.type === 'report' && (
                <Button variant="secondary" leftIcon={<RefreshCw size={14} />}>
                  Re-run Report
                </Button>
              )}
              {selectedDetail.downloadUrl && selectedDetail.status === 'completed' && (
                <Button leftIcon={<Download size={14} />}>
                  Download
                </Button>
              )}
              {!selectedDetail.downloadUrl && (
                <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                  Close
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
