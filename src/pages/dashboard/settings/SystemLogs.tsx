import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  RefreshCw,
  ChevronUp,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  LogIn,
  Plus,
  Edit,
  Trash2,
  Upload,
  Database,
  Bell,
  Code,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  systemLogs,
  formatDateTime,
  getStatusColor,
  type SystemLog,
} from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

const actionIcons: Record<string, React.ElementType> = {
  login: LogIn,
  logout: LogIn,
  create: Plus,
  update: Edit,
  delete: Trash2,
  export: Download,
  upload: Upload,
  backup: Database,
  sync: RefreshCw,
  notification: Bell,
  api_call: Code,
  alert: AlertTriangle,
};

export const SystemLogs = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const stats = useMemo(() => ({
    total: systemLogs.length,
    success: systemLogs.filter(l => l.status === 'success').length,
    failed: systemLogs.filter(l => l.status === 'failed').length,
    warning: systemLogs.filter(l => l.status === 'warning').length,
  }), []);

  const uniqueUsers = useMemo(() =>
    [...new Set(systemLogs.map(l => l.user))].sort(),
  []);

  const uniqueActions = useMemo(() =>
    [...new Set(systemLogs.map(l => l.action))].sort(),
  []);

  const uniqueModules = useMemo(() =>
    [...new Set(systemLogs.map(l => l.module))].sort(),
  []);

  const filteredLogs = useMemo(() => {
    let filtered = [...systemLogs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(l =>
        l.details.toLowerCase().includes(query) ||
        l.user.toLowerCase().includes(query)
      );
    }

    if (userFilter !== 'all') {
      filtered = filtered.filter(l => l.user === userFilter);
    }

    if (actionFilter !== 'all') {
      filtered = filtered.filter(l => l.action === actionFilter);
    }

    if (moduleFilter !== 'all') {
      filtered = filtered.filter(l => l.module === moduleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(l => l.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, userFilter, actionFilter, moduleFilter, statusFilter]);

  const getStatusIcon = (status: SystemLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'failed':
        return <XCircle size={16} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400" />;
    }
  };

  const getActionIcon = (action: string) => {
    const Icon = actionIcons[action] || Activity;
    return <Icon size={16} />;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('settings.systemLogs', 'System Logs')}
        subtitle="View and export system activity logs"
        actions={
          <div className="flex gap-2">
            <Button
              variant={autoRefresh ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<RefreshCw size={14} className={autoRefresh ? 'animate-spin' : ''} />}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'Stop' : 'Auto Refresh'}
            </Button>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Logs"
          value={stats.total.toString()}
          icon={Activity}
          iconColor="#547792"
        />
        <StatsCard
          title="Successful"
          value={stats.success.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Failed"
          value={stats.failed.toString()}
          icon={XCircle}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Warnings"
          value={stats.warning.toString()}
          icon={AlertTriangle}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-48 max-w-md">
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Modules</option>
            {uniqueModules.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Timestamp</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">User</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Action</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Module</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Details</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredLogs.map((log, index) => {
                const isExpanded = expandedLog === log.id;

                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`hover:bg-white/[0.05]/50 transition-colors cursor-pointer ${
                      log.status === 'failed' ? 'bg-red-500/5' :
                      log.status === 'warning' ? 'bg-amber-500/5' : ''
                    }`}
                    onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${log.user === 'System' || log.user === 'API' ? 'text-accent-primary' : 'text-text-primary'}`}>
                        {log.user}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-text-muted">{getActionIcon(log.action)}</span>
                        <span className="text-sm text-text-primary capitalize">{log.action.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-text-secondary">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-text-secondary truncate max-w-xs">{log.details}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span
                          className="text-xs font-medium capitalize"
                          style={{ color: getStatusColor(log.status) }}
                        >
                          {log.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <code className="text-xs text-text-muted bg-white/[0.05] px-2 py-1 rounded">
                        {log.ip}
                      </code>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <Activity size={48} className="mx-auto mb-4 text-text-muted" />
            <p className="text-text-secondary">No logs found matching your filters</p>
          </div>
        )}
      </Card>

      {/* Log Detail Panel */}
      {expandedLog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            {(() => {
              const log = systemLogs.find(l => l.id === expandedLog);
              if (!log) return null;

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary">Log Details</h3>
                    <button
                      onClick={() => setExpandedLog(null)}
                      className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                    >
                      <ChevronUp size={18} className="text-text-muted" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">Timestamp</p>
                      <p className="text-sm text-text-primary">{formatDateTime(log.timestamp)}</p>
                    </div>
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">User</p>
                      <p className="text-sm text-text-primary">{log.user}</p>
                    </div>
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">Action</p>
                      <p className="text-sm text-text-primary capitalize">{log.action.replace('_', ' ')}</p>
                    </div>
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">Module</p>
                      <p className="text-sm text-text-primary">{log.module}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                    <p className="text-xs text-text-muted mb-2">Details</p>
                    <p className="text-text-primary">{log.details}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="text-sm capitalize" style={{ color: getStatusColor(log.status) }}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <p className="text-xs text-text-muted mb-1">IP Address</p>
                      <code className="text-sm text-text-primary">{log.ip}</code>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        </motion.div>
      )}
    </div>
  );
};
