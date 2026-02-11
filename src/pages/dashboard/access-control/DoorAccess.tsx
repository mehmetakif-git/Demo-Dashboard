import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  DoorOpen,
  DoorClosed,
  Lock,
  Unlock,
  AlertTriangle,
  MapPin,
  Clock,
  User,
  Settings,
  LayoutGrid,
  List,
  Shield,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { doors, getDoorStatusColor, type Door } from '@/data/accessControlData';
import { useTranslation } from 'react-i18next';

export const DoorAccess = () => {
  const { t } = useTranslation('accessControl');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: doors.length,
    locked: doors.filter(d => d.status === 'locked').length,
    unlocked: doors.filter(d => d.status === 'unlocked').length,
    alarm: doors.filter(d => d.status === 'alarm').length,
  }), []);

  const filteredDoors = useMemo(() => {
    let filtered = [...doors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query) ||
          d.accessLevel.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(d => d.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(d => d.type === selectedType);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedType]);

  const getStatusBadge = (status: Door['status']) => {
    const config = {
      locked: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('doorAccess.locked'), icon: Lock },
      unlocked: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: t('doorAccess.unlocked'), icon: Unlock },
      alarm: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('doorAccess.alarm'), icon: AlertTriangle },
    };
    const c = config[status];
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const getTypeBadge = (type: Door['type']) => {
    const config = {
      main: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]' },
      interior: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      emergency: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
      restricted: { bg: 'bg-red-500/20', text: 'text-red-400' },
    };
    const typeLabels: Record<string, string> = {
      main: t('doorAccess.main'),
      interior: t('doorAccess.interior'),
      emergency: t('doorAccess.emergency'),
      restricted: t('doorAccess.restricted'),
    };
    const c = config[type];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {typeLabels[type]}
      </span>
    );
  };

  const formatLastAccess = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('doorAccess.title')}
        subtitle={t('doorAccess.subtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Lock size={16} />}>
              {t('doorAccess.lockAll')}
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              {t('doorAccess.addDoor')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('doorAccess.totalDoors')}
          value={stats.total.toString()}
          icon={DoorOpen}
          iconColor="#547792"
        />
        <StatsCard
          title={t('doorAccess.locked')}
          value={stats.locked.toString()}
          icon={Lock}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('doorAccess.unlocked')}
          value={stats.unlocked.toString()}
          icon={Unlock}
          iconColor="#3b82f6"
        />
        <StatsCard
          title={t('doorAccess.alarms')}
          value={stats.alarm.toString()}
          icon={AlertTriangle}
          iconColor={stats.alarm > 0 ? '#ef4444' : '#6b7280'}
        />
      </div>

      {/* Alert Banner */}
      {stats.alarm > 0 && (
        <Card className="p-4 bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400" />
            <div>
              <p className="font-medium text-red-400">{t('doorAccess.securityAlert')}</p>
              <p className="text-sm text-red-400/80">
                {t('doorAccess.doorAlarmMessage', { count: stats.alarm })}
              </p>
            </div>
            <Button variant="secondary" size="sm" className="ml-auto">
              {t('doorAccess.viewDetails')}
            </Button>
          </div>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder={t('doorAccess.searchDoors')}
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
              <option value="all">{t('doorAccess.allStatus')}</option>
              <option value="locked">{t('doorAccess.locked')}</option>
              <option value="unlocked">{t('doorAccess.unlocked')}</option>
              <option value="alarm">{t('doorAccess.alarm')}</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('doorAccess.allTypes')}</option>
              <option value="main">{t('doorAccess.main')}</option>
              <option value="interior">{t('doorAccess.interior')}</option>
              <option value="emergency">{t('doorAccess.emergency')}</option>
              <option value="restricted">{t('doorAccess.restricted')}</option>
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

      {/* Door Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoors.map((door, index) => (
            <motion.div
              key={door.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-5 hover:shadow-lg transition-all ${
                door.status === 'alarm' ? 'ring-2 ring-red-500/50' : ''
              }`}>
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getDoorStatusColor(door.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        door.status === 'locked' ? 'bg-green-500/20' :
                        door.status === 'unlocked' ? 'bg-blue-500/20' : 'bg-red-500/20'
                      }`}>
                        {door.status === 'locked' ? (
                          <DoorClosed size={24} className="text-green-400" />
                        ) : door.status === 'unlocked' ? (
                          <DoorOpen size={24} className="text-blue-400" />
                        ) : (
                          <AlertTriangle size={24} className="text-red-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{door.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <MapPin size={12} />
                          {door.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(door.status)}
                    {getTypeBadge(door.type)}
                  </div>

                  {/* Access Level */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Shield size={14} className="text-text-muted" />
                    <span className="text-text-secondary">{t('doorAccess.accessLevel')}:</span>
                    <span className="text-text-primary font-medium">{door.accessLevel}</span>
                  </div>

                  {/* Last Access */}
                  <div className="p-3 bg-white/[0.05] rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
                      <Clock size={12} />
                      {t('doorAccess.lastAccess')}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-text-muted" />
                        <span className="text-sm text-text-primary">{door.lastAccessBy}</span>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {formatLastAccess(door.lastAccess)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
                    <button className={`flex-1 flex items-center justify-center gap-1 py-2 text-sm rounded transition-colors ${
                      door.status === 'locked'
                        ? 'text-blue-400 hover:bg-blue-400/10'
                        : 'text-green-400 hover:bg-green-400/10'
                    }`}>
                      {door.status === 'locked' ? (
                        <>
                          <Unlock size={14} />
                          {t('doorAccess.unlock')}
                        </>
                      ) : (
                        <>
                          <Lock size={14} />
                          {t('doorAccess.lock')}
                        </>
                      )}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Settings size={14} />
                      {t('doorAccess.settings')}
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.door')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.location')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.allStatus')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.type')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.accessLevel')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.lastAccess')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('doorAccess.settings')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredDoors.map((door, index) => (
                  <motion.tr
                    key={door.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className={`hover:bg-white/[0.05] transition-colors ${
                      door.status === 'alarm' ? 'bg-red-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          door.status === 'locked' ? 'bg-green-500/20' :
                          door.status === 'unlocked' ? 'bg-blue-500/20' : 'bg-red-500/20'
                        }`}>
                          <DoorOpen size={16} className={
                            door.status === 'locked' ? 'text-green-400' :
                            door.status === 'unlocked' ? 'text-blue-400' : 'text-red-400'
                          } />
                        </div>
                        <span className="font-medium text-text-primary">{door.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{door.location}</td>
                    <td className="py-3 px-4">{getStatusBadge(door.status)}</td>
                    <td className="py-3 px-4">{getTypeBadge(door.type)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{door.accessLevel}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-text-primary">{door.lastAccessBy}</p>
                        <p className="text-xs text-text-secondary">{formatLastAccess(door.lastAccess)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className={`p-2 rounded transition-colors ${
                          door.status === 'locked'
                            ? 'hover:bg-blue-400/10 text-blue-400'
                            : 'hover:bg-green-400/10 text-green-400'
                        }`}>
                          {door.status === 'locked' ? <Unlock size={14} /> : <Lock size={14} />}
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                          <Settings size={14} />
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

      {filteredDoors.length === 0 && (
        <Card className="p-12 text-center">
          <DoorOpen size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('doorAccess.noDoorsFound')}</p>
        </Card>
      )}
    </div>
  );
};
