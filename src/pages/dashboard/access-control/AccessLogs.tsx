import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Filter,
  LogIn,
  LogOut,
  AlertTriangle,
  XCircle,
  Clock,
  CreditCard,
  DoorOpen,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { accessLogs } from '@/data/accessControlData';

export const AccessLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedDoor, setSelectedDoor] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = accessLogs.filter(l => l.timestamp.startsWith(today));

    return {
      total: accessLogs.length,
      todayEntries: todayLogs.filter(l => l.action === 'entry').length,
      todayExits: todayLogs.filter(l => l.action === 'exit').length,
      deniedAttempts: accessLogs.filter(l => l.status === 'failed').length,
      alerts: accessLogs.filter(l => l.action === 'alarm').length,
    };
  }, []);

  const filteredLogs = useMemo(() => {
    let filtered = [...accessLogs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        l =>
          l.holderName.toLowerCase().includes(query) ||
          l.cardNumber.toLowerCase().includes(query) ||
          l.door.toLowerCase().includes(query)
      );
    }

    if (selectedAction !== 'all') {
      filtered = filtered.filter(l => l.action === selectedAction);
    }

    if (selectedDoor !== 'all') {
      filtered = filtered.filter(l => l.door === selectedDoor);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(l => l.status === selectedStatus);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [searchQuery, selectedAction, selectedDoor, selectedStatus]);

  const getActionBadge = (action: string) => {
    const config: Record<string, { bg: string; text: string; icon: typeof LogIn }> = {
      entry: { bg: 'bg-green-500/20', text: 'text-green-400', icon: LogIn },
      exit: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: LogOut },
      denied: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: XCircle },
      alarm: { bg: 'bg-red-500/20', text: 'text-red-400', icon: AlertTriangle },
    };
    const c = config[action] || config.entry;
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {action}
      </span>
    );
  };

  const getMethodBadge = (method: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      card: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
      pin: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      biometric: { bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
      manual: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
    };
    const c = config[method] || config.card;
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {method}
      </span>
    );
  };

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  const uniqueDoors = useMemo(() => {
    return [...new Set(accessLogs.map(l => l.door))].sort();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Access Logs"
        subtitle="Monitor and audit access events across all entry points"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<RefreshCw size={16} />}>
              Refresh
            </Button>
            <Button leftIcon={<Download size={16} />}>
              Export Logs
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title="Total Logs"
          value={stats.total.toString()}
          icon={Clock}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Today's Entries"
          value={stats.todayEntries.toString()}
          icon={LogIn}
          iconColor="#10b981"
        />
        <StatsCard
          title="Today's Exits"
          value={stats.todayExits.toString()}
          icon={LogOut}
          iconColor="#3b82f6"
        />
        <StatsCard
          title="Denied Attempts"
          value={stats.deniedAttempts.toString()}
          icon={XCircle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Alerts"
          value={stats.alerts.toString()}
          icon={AlertTriangle}
          iconColor={stats.alerts > 0 ? '#ef4444' : '#6b7280'}
        />
      </div>

      {/* Alert Banner */}
      {stats.alerts > 0 && (
        <Card className="p-4 bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400" />
            <div>
              <p className="font-medium text-red-400">Security Alerts Detected</p>
              <p className="text-sm text-red-400/80">
                {stats.alerts} alarm event(s) recorded. Review the logs for more details.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder="Search by name, card, or door..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Actions</option>
            <option value="entry">Entry</option>
            <option value="exit">Exit</option>
            <option value="denied">Denied</option>
            <option value="alarm">Alarm</option>
          </select>

          <select
            value={selectedDoor}
            onChange={(e) => setSelectedDoor(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Doors</option>
            {uniqueDoors.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>

          <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
            More Filters
          </Button>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Card</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Door</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Method</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredLogs.map((log, index) => {
                const { date, time } = formatTimestamp(log.timestamp);
                const isAlert = log.action === 'alarm' || log.status === 'failed';

                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`hover:bg-background-tertiary transition-colors ${
                      isAlert ? 'bg-red-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <div>
                          <p className="text-sm text-text-primary">{time}</p>
                          <p className="text-xs text-text-secondary">{date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          log.holderName === 'Unknown' ? 'bg-red-500/20' : 'bg-accent-primary/20'
                        }`}>
                          {log.holderName === 'Unknown' ? (
                            <AlertTriangle size={14} className="text-red-400" />
                          ) : (
                            <span className="text-xs font-bold text-accent-primary">
                              {log.holderName.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <span className={`font-medium ${
                          log.holderName === 'Unknown' ? 'text-red-400' : 'text-text-primary'
                        }`}>
                          {log.holderName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary font-mono">{log.cardNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <DoorOpen size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary">{log.door}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getActionBadge(log.action)}</td>
                    <td className="py-3 px-4">{getMethodBadge(log.method)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        log.status === 'success'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border-default">
          <p className="text-sm text-text-secondary">
            Showing {filteredLogs.length} of {accessLogs.length} logs
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

      {filteredLogs.length === 0 && (
        <Card className="p-12 text-center">
          <Clock size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No access logs found matching your filters</p>
        </Card>
      )}

      {/* Live Activity Indicator */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-text-secondary">Live monitoring active</span>
          </div>
          <span className="text-xs text-text-muted">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </Card>
    </div>
  );
};
