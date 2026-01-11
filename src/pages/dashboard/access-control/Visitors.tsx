import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  UserCheck,
  UserX,
  Clock,
  Building2,
  User,
  Calendar,
  LogIn,
  LogOut,
  Badge,
  MoreVertical,
  Edit,
  Trash2,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { visitors, getVisitorStatusColor, type Visitor } from '@/data/accessControlData';
import { getProfileImage } from '@/utils/profileImages';

export const Visitors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const departments = useMemo(() => {
    const unique = [...new Set(visitors.map(v => v.hostDepartment))];
    return unique.sort();
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: visitors.length,
      checkedIn: visitors.filter(v => v.status === 'checked-in').length,
      checkedOut: visitors.filter(v => v.status === 'checked-out').length,
      expected: visitors.filter(v => v.status === 'expected').length,
      todayTotal: visitors.filter(v => v.checkInTime.startsWith(today)).length,
    };
  }, []);

  const filteredVisitors = useMemo(() => {
    let filtered = [...visitors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        v =>
          v.name.toLowerCase().includes(query) ||
          v.company.toLowerCase().includes(query) ||
          v.hostName.toLowerCase().includes(query) ||
          v.purpose.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(v => v.status === selectedStatus);
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(v => v.hostDepartment === selectedDepartment);
    }

    return filtered.sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime());
  }, [searchQuery, selectedStatus, selectedDepartment]);

  const getStatusBadge = (status: Visitor['status']) => {
    const config = {
      'checked-in': { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Checked In', icon: LogIn },
      'checked-out': { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Checked Out', icon: LogOut },
      expected: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Expected', icon: Clock },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled', icon: UserX },
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

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDuration = (checkIn: string, checkOut?: string) => {
    const start = new Date(checkIn);
    const end = checkOut ? new Date(checkOut) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
    return `${diffMins}m`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visitor Management"
        subtitle="Track and manage visitor check-ins and check-outs"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Calendar size={16} />}>
              Schedule Visit
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              Check In Visitor
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title="Total Visitors"
          value={stats.total.toString()}
          icon={User}
          iconColor="#547792"
        />
        <StatsCard
          title="Checked In"
          value={stats.checkedIn.toString()}
          icon={LogIn}
          iconColor="#10b981"
        />
        <StatsCard
          title="Checked Out"
          value={stats.checkedOut.toString()}
          icon={LogOut}
          iconColor="#6b7280"
        />
        <StatsCard
          title="Expected Today"
          value={stats.expected.toString()}
          icon={Clock}
          iconColor="#3b82f6"
        />
        <StatsCard
          title="Today's Visits"
          value={stats.todayTotal.toString()}
          icon={Calendar}
          iconColor="#f59e0b"
        />
      </div>

      {/* Currently Checked In Alert */}
      {stats.checkedIn > 0 && (
        <Card className="p-4 bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <UserCheck size={20} className="text-green-400" />
            <div>
              <p className="font-medium text-green-400">{stats.checkedIn} Visitors Currently On-Site</p>
              <p className="text-sm text-green-400/80">
                All visitors must check out before leaving the premises.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search visitors..."
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
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="expected">Expected</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
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

      {/* Visitors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVisitors.map((visitor, index) => (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all group">
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getVisitorStatusColor(visitor.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getProfileImage(visitor.name) ? (
                        <img
                          src={getProfileImage(visitor.name)}
                          alt={visitor.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-accent-primary">
                            {visitor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-text-primary">{visitor.name}</h3>
                        <p className="text-xs text-text-secondary">{visitor.company}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(visitor.status)}
                    {visitor.badgeNumber && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#94B4C1]/20 text-[#94B4C1]">
                        <Badge size={12} />
                        {visitor.badgeNumber}
                      </span>
                    )}
                  </div>

                  {/* Purpose */}
                  <div className="p-3 bg-white/[0.05] rounded-lg mb-4">
                    <p className="text-xs text-text-muted mb-1">Purpose of Visit</p>
                    <p className="text-sm text-text-primary">{visitor.purpose}</p>
                  </div>

                  {/* Host Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary">Host:</span>
                      <span className="text-text-primary">{visitor.hostName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{visitor.hostDepartment}</span>
                    </div>
                  </div>

                  {/* Time Info */}
                  <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <LogIn size={12} />
                        Check In
                      </span>
                      <span className="text-text-primary">
                        {formatTime(visitor.checkInTime)} - {formatDate(visitor.checkInTime)}
                      </span>
                    </div>
                    {visitor.checkOutTime ? (
                      <div className="flex items-center justify-between text-text-secondary">
                        <span className="flex items-center gap-1">
                          <LogOut size={12} />
                          Check Out
                        </span>
                        <span className="text-text-primary">
                          {formatTime(visitor.checkOutTime)}
                        </span>
                      </div>
                    ) : visitor.status === 'checked-in' ? (
                      <div className="flex items-center justify-between text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Duration
                        </span>
                        <span className="text-green-400">
                          {getDuration(visitor.checkInTime)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.08]">
                    {visitor.status === 'checked-in' ? (
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-green-400 hover:bg-green-400/10 rounded transition-colors">
                        <LogOut size={14} />
                        Check Out
                      </button>
                    ) : visitor.status === 'expected' ? (
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                        <LogIn size={14} />
                        Check In
                      </button>
                    ) : (
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                        <Edit size={14} />
                        View Details
                      </button>
                    )}
                    <button className="px-4 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Edit size={14} />
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Visitor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Host</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Purpose</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Badge</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Check In</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Check Out</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredVisitors.map((visitor, index) => (
                  <motion.tr
                    key={visitor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(visitor.name) ? (
                          <img
                            src={getProfileImage(visitor.name)}
                            alt={visitor.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent-primary">
                              {visitor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-text-primary">{visitor.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{visitor.company}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-text-primary">{visitor.hostName}</p>
                        <p className="text-xs text-text-secondary">{visitor.hostDepartment}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary max-w-[200px] truncate">
                      {visitor.purpose}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(visitor.status)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {visitor.badgeNumber || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {formatTime(visitor.checkInTime)}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {visitor.checkOutTime ? formatTime(visitor.checkOutTime) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        {visitor.status === 'checked-in' && (
                          <button className="p-2 hover:bg-green-400/10 rounded text-green-400">
                            <LogOut size={14} />
                          </button>
                        )}
                        {visitor.status === 'expected' && (
                          <button className="p-2 hover:bg-blue-400/10 rounded text-blue-400">
                            <LogIn size={14} />
                          </button>
                        )}
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
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
      )}

      {filteredVisitors.length === 0 && (
        <Card className="p-12 text-center">
          <User size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No visitors found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
