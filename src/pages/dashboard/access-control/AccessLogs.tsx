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
import { useTranslation } from 'react-i18next';

export const AccessLogs = () => {
  const { t } = useTranslation('accessControl');
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
    const config: Record<string, { bg: string; text: string; icon: typeof LogIn; label: string }> = {
      entry: { bg: 'bg-green-500/20', text: 'text-green-400', icon: LogIn, label: t('accessLogs.entry') },
      exit: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: LogOut, label: t('accessLogs.exit') },
      denied: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: XCircle, label: t('accessLogs.denied') },
      alarm: { bg: 'bg-red-500/20', text: 'text-red-400', icon: AlertTriangle, label: t('accessLogs.alerts') },
    };
    const c = config[action] || config.entry;
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const getMethodBadge = (method: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      card: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]' },
      pin: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      biometric: { bg: 'bg-[#547792]/20', text: 'text-[#547792]' },
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
        title={t('accessLogs.title')}
        subtitle={t('accessLogs.subtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<RefreshCw size={16} />}>
              {t('accessLogs.refresh')}
            </Button>
            <Button leftIcon={<Download size={16} />}>
              {t('accessLogs.exportLogs')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title={t('accessLogs.totalLogs')}
          value={stats.total.toString()}
          icon={Clock}
          iconColor="#547792"
        />
        <StatsCard
          title={t('accessLogs.todaysEntries')}
          value={stats.todayEntries.toString()}
          icon={LogIn}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('accessLogs.todaysExits')}
          value={stats.todayExits.toString()}
          icon={LogOut}
          iconColor="#3b82f6"
        />
        <StatsCard
          title={t('accessLogs.deniedAttempts')}
          value={stats.deniedAttempts.toString()}
          icon={XCircle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('accessLogs.alerts')}
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
              <p className="font-medium text-red-400">{t('accessLogs.securityAlerts')}</p>
              <p className="text-sm text-red-400/80">
                {t('accessLogs.alarmEventsMessage', { count: stats.alerts })}
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
              placeholder={t('accessLogs.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('accessLogs.allActions')}</option>
            <option value="entry">{t('accessLogs.entry')}</option>
            <option value="exit">{t('accessLogs.exit')}</option>
            <option value="denied">{t('accessLogs.denied')}</option>
            <option value="alarm">{t('accessLogs.alerts')}</option>
          </select>

          <select
            value={selectedDoor}
            onChange={(e) => setSelectedDoor(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('accessLogs.allDoors')}</option>
            {uniqueDoors.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('accessLogs.allStatus')}</option>
            <option value="success">{t('accessLogs.success')}</option>
            <option value="failed">{t('accessLogs.failed')}</option>
          </select>

          <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
            {t('accessLogs.moreFilters')}
          </Button>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.time')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.user')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.card')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.door')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.action')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.method')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessLogs.allStatus')}</th>
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
                    className={`hover:bg-white/[0.05] transition-colors ${
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
                        {log.status === 'success' ? t('accessLogs.success') : t('accessLogs.failed')}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-white/[0.08]">
          <p className="text-sm text-text-secondary">
            {t('accessLogs.showing', { filtered: filteredLogs.length, total: accessLogs.length })}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled>
              {t('accessLogs.previous')}
            </Button>
            <Button variant="secondary" size="sm">
              {t('accessLogs.next')}
            </Button>
          </div>
        </div>
      </Card>

      {filteredLogs.length === 0 && (
        <Card className="p-12 text-center">
          <Clock size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('accessLogs.noLogsFound')}</p>
        </Card>
      )}

      {/* Live Activity Indicator */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-text-secondary">{t('accessLogs.liveMonitoring')}</span>
          </div>
          <span className="text-xs text-text-muted">
            {t('accessLogs.lastUpdated', { time: new Date().toLocaleTimeString() })}
          </span>
        </div>
      </Card>
    </div>
  );
};
