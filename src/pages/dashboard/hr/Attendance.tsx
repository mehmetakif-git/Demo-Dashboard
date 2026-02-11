import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, UserCheck, Clock, UserX, Calendar as CalendarIcon } from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Avatar, DataTable } from '@/components/common';
import { attendanceRecords } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';
import type { AttendanceRecord } from '@/data/hrData';
import { useTranslation } from 'react-i18next';

export const Attendance = () => {
  const { t } = useTranslation('hr');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const stats = useMemo(() => {
    const filtered = attendanceRecords.filter((r) => r.date === selectedDate);
    return {
      present: filtered.filter((r) => r.status === 'present').length,
      late: filtered.filter((r) => r.status === 'late').length,
      absent: filtered.filter((r) => r.status === 'absent').length,
      onLeave: filtered.filter((r) => r.status === 'on-leave').length,
    };
  }, [selectedDate]);

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((r) => r.date === selectedDate);
  }, [selectedDate]);

  const columns = [
    {
      key: 'employee',
      header: t('attendance.employee'),
      render: (record: AttendanceRecord) => (
        <div className="flex items-center gap-3">
          <Avatar name={record.employee} src={profileImages[record.employee]} size="sm" />
          <span className="text-white">{record.employee}</span>
        </div>
      ),
    },
    {
      key: 'checkIn',
      header: t('attendance.checkIn'),
      render: (record: AttendanceRecord) => (
        <span className={`font-mono ${
          record.checkIn && record.checkIn > '09:00' ? 'text-orange-400' : 'text-white/80'
        }`}>
          {record.checkIn || '-'}
        </span>
      ),
    },
    {
      key: 'checkOut',
      header: t('attendance.checkOut'),
      render: (record: AttendanceRecord) => (
        <span className="text-white/80 font-mono">{record.checkOut || '-'}</span>
      ),
    },
    {
      key: 'status',
      header: t('attendance.status'),
      render: (record: AttendanceRecord) => <StatusBadge status={record.status} />,
    },
    {
      key: 'hoursWorked',
      header: t('attendance.hoursWorked'),
      render: (record: AttendanceRecord) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#1a1a24] rounded-full overflow-hidden max-w-[100px]">
            <div
              className="h-full bg-[#547792] rounded-full"
              style={{ width: `${Math.min((record.hoursWorked / 9) * 100, 100)}%` }}
            />
          </div>
          <span className="text-white/60 text-sm">{record.hoursWorked}h</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('attendance.title')}
        subtitle={t('attendance.subtitle')}
        icon={CalendarCheck}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg">
              <CalendarIcon className="w-4 h-4 text-white/40" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
              />
            </div>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('attendance.present')}
          value={stats.present}
          icon={UserCheck}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('attendance.late')}
          value={stats.late}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('attendance.absent')}
          value={stats.absent}
          icon={UserX}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('attendance.onLeave')}
          value={stats.onLeave}
          icon={CalendarCheck}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Attendance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{t('attendance.dailySummary')}</h3>
          <p className="text-white/40 text-sm">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-400 text-sm">{t('attendance.present')}</span>
              <span className="text-white font-medium">{stats.present}</span>
            </div>
            <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${(stats.present / (filteredRecords.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-400 text-sm">{t('attendance.late')}</span>
              <span className="text-white font-medium">{stats.late}</span>
            </div>
            <div className="h-2 bg-orange-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{
                  width: `${(stats.late / (filteredRecords.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-sm">{t('attendance.absent')}</span>
              <span className="text-white font-medium">{stats.absent}</span>
            </div>
            <div className="h-2 bg-red-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: `${(stats.absent / (filteredRecords.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">{t('attendance.onLeave')}</span>
              <span className="text-white font-medium">{stats.onLeave}</span>
            </div>
            <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${(stats.onLeave / (filteredRecords.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredRecords}
          keyExtractor={(r) => String(r.id)}
          emptyMessage={t('attendance.noRecords')}
        />
      </motion.div>
    </div>
  );
};
