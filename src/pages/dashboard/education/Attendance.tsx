import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { attendance, students, classes, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Attendance = () => {
  const { t } = useTranslation('education');
  const [selectedDate, setSelectedDate] = useState('2024-01-17');
  const [selectedClass, setSelectedClass] = useState<string>('CLS001');

  const classStudents = useMemo(() => {
    return students.filter(s => s.classId === selectedClass);
  }, [selectedClass]);

  const todayAttendance = useMemo(() => {
    return attendance.filter(a => a.date === selectedDate && a.classId === selectedClass);
  }, [selectedDate, selectedClass]);

  const stats = useMemo(() => {
    const present = todayAttendance.filter(a => a.status === 'present').length;
    const absent = todayAttendance.filter(a => a.status === 'absent').length;
    const late = todayAttendance.filter(a => a.status === 'late').length;
    const total = classStudents.length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return { present, absent, late, total, rate };
  }, [todayAttendance, classStudents]);

  const selectedClassInfo = classes.find(c => c.id === selectedClass);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'present': '#10b981',
      'absent': '#ef4444',
      'late': '#f59e0b',
    };
    return colors[status] || EDUCATION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return CheckCircle;
      case 'absent':
        return XCircle;
      case 'late':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('attendance.title')}
        subtitle={t('attendance.subtitle')}
        icon={ClipboardCheck}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('attendance.present'), value: stats.present, icon: UserCheck, color: '#10b981' },
          { label: t('attendance.absent'), value: stats.absent, icon: UserX, color: '#ef4444' },
          { label: t('attendance.late'), value: stats.late, icon: Clock, color: '#f59e0b' },
          { label: t('attendance.totalStudents'), value: stats.total, icon: Users, color: EDUCATION_COLOR },
          { label: t('attendance.attendanceRate'), value: `${stats.rate}%`, icon: ClipboardCheck, color: '#6366f1' },
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

      {/* Date and Class Selection */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-text-muted" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {classes.map((cls) => (
              <Button
                key={cls.id}
                variant={selectedClass === cls.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedClass(cls.id)}
              >
                {cls.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Attendance Marking */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-text-primary">
              {t('attendance.classAttendance', { className: selectedClassInfo?.name })}
            </h3>
            <p className="text-sm text-text-muted">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              {t('attendance.markAllPresent')}
            </Button>
            <Button size="sm">
              {t('attendance.saveAttendance')}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {classStudents.map((student, index) => {
            const studentAttendance = todayAttendance.find(a => a.studentId === student.id);
            const status = studentAttendance?.status || 'present';

            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center gap-4 p-3 bg-background-secondary rounded-lg"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3 flex-1 min-w-50">
                  <span className="w-8 text-center text-sm font-medium text-text-muted shrink-0">
                    #{student.rollNo}
                  </span>
                  {(() => {
                    const studentImg = getProfileImage(student.name);
                    return studentImg ? (
                      <img
                        src={studentImg}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: EDUCATION_COLOR }}
                      >
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    );
                  })()}
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary truncate">{student.name}</p>
                    <p className="text-xs text-text-muted">{student.studentNo}</p>
                  </div>
                </div>

                {/* Status Buttons */}
                <div className="flex gap-2">
                  {(() => {
                    const statusMap: Record<string, string> = {
                      'present': t('attendance.present'),
                      'absent': t('attendance.absent'),
                      'late': t('attendance.late'),
                    };
                    return ['present', 'absent', 'late'].map((s) => {
                      const isActive = status === s;
                      const color = getStatusColor(s);
                      return (
                        <button
                          key={s}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isActive ? 'ring-2 ring-current' : 'bg-background-tertiary hover:bg-background-secondary'
                          }`}
                          style={{
                            backgroundColor: isActive ? `${color}20` : undefined,
                            color: isActive ? color : undefined,
                          }}
                        >
                          {statusMap[s]}
                        </button>
                      );
                    });
                  })()}
                </div>

                {/* Time Input (for present/late) */}
                {status !== 'absent' && (
                  <Input
                    type="time"
                    defaultValue={studentAttendance?.arrivedAt || '08:00'}
                    className="w-auto text-sm"
                  />
                )}

                {/* Remarks */}
                <Input
                  placeholder={t('attendance.remarks')}
                  defaultValue={studentAttendance?.remarks || ''}
                  className="w-40 text-sm"
                />
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Recent Attendance History */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('attendance.recentRecords')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.date')}</th>
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.student')}</th>
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.class')}</th>
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.status')}</th>
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.arrived')}</th>
                <th className="text-left py-2 text-sm text-text-muted font-medium">{t('attendance.remarksCol')}</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const statusMap: Record<string, string> = {
                  'present': t('attendance.present'),
                  'absent': t('attendance.absent'),
                  'late': t('attendance.late'),
                };
                return attendance.slice(0, 10).map((record) => {
                  const StatusIcon = getStatusIcon(record.status);
                  const statusColor = getStatusColor(record.status);
                  return (
                    <tr key={record.id} className="border-b border-border-default">
                      <td className="py-3 text-sm text-text-primary">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-sm text-text-primary">{record.studentName}</td>
                      <td className="py-3 text-sm text-text-primary">{record.className}</td>
                      <td className="py-3">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                        >
                          <StatusIcon size={12} />
                          {statusMap[record.status]}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-text-muted">{record.arrivedAt || '-'}</td>
                      <td className="py-3 text-sm text-text-muted">{record.remarks || '-'}</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Attendance;
