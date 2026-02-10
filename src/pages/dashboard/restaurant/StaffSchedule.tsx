import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Calendar,
  Clock,
  ChefHat,
  User,
  Phone,
  Mail,
  CheckCircle,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { staffMembers, staffSchedule } from '@/data/restaurant/restaurantData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const StaffSchedule = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');

  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(staffMembers.map(s => s.role))];
    return ['all', ...uniqueRoles];
  }, []);

  const today = '2024-01-15'; // Using fixed date from mock data
  const tomorrow = '2024-01-16';

  const stats = useMemo(() => {
    const todayShifts = staffSchedule.filter(s => s.date === today);
    return {
      totalStaff: staffMembers.filter(s => s.isActive).length,
      onDuty: todayShifts.filter(s => s.status === 'in-progress').length,
      scheduled: staffSchedule.filter(s => s.status === 'scheduled').length,
      completed: todayShifts.filter(s => s.status === 'completed').length,
    };
  }, [today]);

  const filteredSchedule = useMemo(() => {
    const dateToFilter = dateFilter === 'today' ? today : dateFilter === 'tomorrow' ? tomorrow : null;

    return staffSchedule.filter(shift => {
      const matchesSearch = shift.staffName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || shift.role === roleFilter;
      const matchesDate = !dateToFilter || shift.date === dateToFilter;

      return matchesSearch && matchesRole && matchesDate;
    });
  }, [searchQuery, roleFilter, dateFilter, today, tomorrow]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'chef':
      case 'sous-chef':
      case 'kitchen-staff':
        return ChefHat;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return '#f97316';
      case 'chef': return '#ef4444';
      case 'sous-chef': return '#f59e0b';
      case 'waiter': return '#6366f1';
      case 'host': return '#8b5cf6';
      case 'cashier': return '#10b981';
      case 'kitchen-staff': return '#f97316';
      case 'delivery': return '#0ea5e9';
      default: return '#64748b';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.staffSchedule', 'Staff Schedule')}
        subtitle="Manage staff shifts and schedules"
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            Add Shift
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: stats.totalStaff, icon: Users, color: '#f97316' },
          { label: 'On Duty', value: stats.onDuty, icon: CheckCircle, color: '#10b981' },
          { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: '#6366f1' },
          { label: 'Completed', value: stats.completed, icon: Clock, color: '#8b5cf6' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['today', 'tomorrow', 'all'].map((date) => (
              <Button
                key={date}
                variant={dateFilter === date ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDateFilter(date)}
              >
                {date.charAt(0).toUpperCase() + date.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {roles.slice(0, 5).map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setRoleFilter(role)}
              >
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Staff Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffMembers.filter(s => s.isActive).map((staff, index) => {
          const RoleIcon = getRoleIcon(staff.role);
          const roleColor = getRoleColor(staff.role);
          const todayShift = staffSchedule.find(s => s.staffId === staff.id && s.date === today);

          return (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex items-start gap-4">
                  {(() => {
                    const profileImg = getProfileImage(staff.name);
                    return profileImg ? (
                      <img
                        src={profileImg}
                        alt={staff.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${roleColor}20` }}
                      >
                        <RoleIcon size={24} style={{ color: roleColor }} />
                      </div>
                    );
                  })()}
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{staff.name}</h3>
                    <p className="text-sm capitalize" style={{ color: roleColor }}>
                      {staff.role.replace('-', ' ')}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-text-muted flex items-center gap-1">
                        <Phone size={12} />
                        {staff.phone}
                      </p>
                      <p className="text-xs text-text-muted flex items-center gap-1">
                        <Mail size={12} />
                        {staff.email}
                      </p>
                    </div>
                    {todayShift && (
                      <div className="mt-3 pt-3 border-t border-border-default">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock size={14} className="text-text-muted" />
                            <span className="text-text-secondary">
                              {todayShift.startTime} - {todayShift.endTime}
                            </span>
                          </div>
                          <StatusBadge status={todayShift.status} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Schedule Timeline */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Schedule Timeline</h3>
        <div className="space-y-3">
          {filteredSchedule.map((shift, index) => {
            const RoleIcon = getRoleIcon(shift.role);
            const roleColor = getRoleColor(shift.role);

            return (
              <motion.div
                key={shift.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center gap-4 p-3 bg-background-secondary rounded-lg"
              >
                {(() => {
                  const profileImg = getProfileImage(shift.staffName);
                  return profileImg ? (
                    <img
                      src={profileImg}
                      alt={shift.staffName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${roleColor}20` }}
                    >
                      <RoleIcon size={20} style={{ color: roleColor }} />
                    </div>
                  );
                })()}
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{shift.staffName}</p>
                  <p className="text-xs capitalize text-text-muted">{shift.role.replace('-', ' ')}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    {new Date(shift.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-text-muted">
                    {shift.startTime} - {shift.endTime}
                  </p>
                </div>
                <StatusBadge status={shift.status} />
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'edit', label: 'Edit Shift', onClick: () => {} },
                    { id: 'swap', label: 'Swap Shift', onClick: () => {} },
                    { id: 'cancel', label: 'Cancel Shift', onClick: () => {} },
                  ]}
                />
              </motion.div>
            );
          })}
        </div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">No shifts scheduled</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StaffSchedule;
