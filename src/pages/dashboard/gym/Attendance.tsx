import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  LogIn,
  LogOut,
  Users,
  Clock,
  Activity,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  gymMembers,
  attendanceRecords,
  gymStats,
  getMemberInitials,
  formatDateTime,
  type GymMember,
  type AttendanceRecord,
} from '@/data/gym/gymData';
import { profileImages } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Attendance = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);

  // Currently in gym (no checkout time)
  const currentlyInGym = attendanceRecords.filter((r) => r.checkOut === null);

  // Filter attendance records by date
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const recordDate = record.checkIn.split(' ')[0];
      return recordDate === dateFilter;
    });
  }, [dateFilter]);

  // Search members for check-in
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return gymMembers.filter(
      (member) =>
        (member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.memberId.toLowerCase().includes(searchQuery.toLowerCase())) &&
        member.membershipStatus === 'active'
    );
  }, [searchQuery]);

  const handleCheckIn = (member: GymMember) => {
    console.log('Check in member:', member.id);
    setSearchQuery('');
  };

  const handleCheckOut = (record: AttendanceRecord) => {
    console.log('Check out:', record.id);
  };

  const stats = [
    {
      title: 'Today\'s Check-ins',
      value: gymStats.todayCheckIns.toString(),
      icon: LogIn,
      iconColor: '#10b981',
    },
    {
      title: 'Currently In Gym',
      value: currentlyInGym.length.toString(),
      icon: Users,
      iconColor: '#547792',
    },
    {
      title: 'Avg Daily Check-ins',
      value: gymStats.averageDailyCheckIns.toString(),
      icon: Activity,
      iconColor: '#f59e0b',
    },
    {
      title: 'Peak Hours',
      value: gymStats.peakHours[0],
      icon: Clock,
      iconColor: '#94B4C1',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title={t('gym.attendance', 'Attendance')} subtitle="Track member check-ins and check-outs" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Quick Check-in */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-accent-primary" />
          Quick Check-in
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search member by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 border border-white/[0.08] rounded-lg overflow-hidden">
            {searchResults.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border-b border-white/[0.08] last:border-b-0 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium overflow-hidden">
                    {profileImages[`${member.firstName} ${member.lastName}`] ? (
                      <img
                        src={profileImages[`${member.firstName} ${member.lastName}`]}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getMemberInitials(member.firstName, member.lastName)
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-text-secondary">{member.memberId}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleCheckIn(member)}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Check In
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Currently In Gym */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Users className="h-5 w-5 text-green-400" />
            Currently In Gym ({currentlyInGym.length})
          </h2>
        </div>

        {currentlyInGym.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyInGym.map((record) => {
              const member = gymMembers.find((m) => m.id === record.memberId);
              const checkInTime = new Date(record.checkIn);
              const now = new Date();
              const duration = Math.floor((now.getTime() - checkInTime.getTime()) / (1000 * 60));
              const hours = Math.floor(duration / 60);
              const minutes = duration % 60;

              return (
                <div
                  key={record.id}
                  className="p-4 bg-white/[0.05] rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium overflow-hidden">
                      {profileImages[record.memberName] ? (
                        <img
                          src={profileImages[record.memberName]}
                          alt={record.memberName}
                          className="w-full h-full object-cover"
                        />
                      ) : member ? (
                        getMemberInitials(member.firstName, member.lastName)
                      ) : (
                        record.memberName.split(' ').map((n) => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{record.memberName}</p>
                      <p className="text-sm text-text-secondary">
                        In: {checkInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-green-400">
                        {hours > 0 ? `${hours}h ` : ''}{minutes}m in gym
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                    onClick={() => handleCheckOut(record)}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-text-secondary py-8">No members currently in gym</p>
        )}
      </Card>

      {/* Recent Check-ins */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-primary" />
            Attendance Records
          </h2>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Member
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Check In
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Check Out
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Duration
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-white/[0.08]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                          {profileImages[record.memberName] ? (
                            <img
                              src={profileImages[record.memberName]}
                              alt={record.memberName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            record.memberName.split(' ').map((n) => n[0]).join('')
                          )}
                        </div>
                        <span className="text-text-primary font-medium">{record.memberName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {formatDateTime(record.checkIn)}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {record.checkOut ? (
                        formatDateTime(record.checkOut)
                      ) : (
                        <span className="text-green-400">Currently in gym</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {record.duration || '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!record.checkOut && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleCheckOut(record)}
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Check Out
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-secondary">
                    No attendance records for this date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};
