import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Phone,
  MoreVertical,
  UserCheck,
  GraduationCap,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { students, classes, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Students = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const uniqueGrades = useMemo(() => {
    const grades = [...new Set(students.map(s => s.grade))].sort((a, b) => a - b);
    return grades;
  }, []);

  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    byGrade: classes.reduce((acc, cls) => {
      acc[cls.grade] = (acc[cls.grade] || 0) + cls.currentStrength;
      return acc;
    }, {} as Record<number, number>),
    newThisMonth: 2,
  }), []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.className.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;

      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [searchQuery, gradeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'inactive': '#64748b',
      'alumni': '#6366f1',
    };
    return colors[status] || EDUCATION_COLOR;
  };

  const getGenderColor = (gender: string) => {
    return gender === 'Male' ? '#3b82f6' : '#ec4899';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('students.title')}
        subtitle={t('students.subtitle')}
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            {t('students.registerStudent')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('students.totalStudents'), value: stats.total, icon: Users, color: EDUCATION_COLOR },
          { label: t('students.activeStudents'), value: stats.active, icon: UserCheck, color: '#10b981' },
          { label: t('students.newThisMonth'), value: stats.newThisMonth, icon: GraduationCap, color: '#f59e0b' },
          { label: t('students.gradeN', { n: 9 }), value: stats.byGrade[9] || 0, icon: Users, color: '#6366f1' },
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
              placeholder={t('students.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={gradeFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setGradeFilter('all')}
            >
              {t('students.allGrades')}
            </Button>
            {uniqueGrades.map((grade) => (
              <Button
                key={grade}
                variant={gradeFilter === grade.toString() ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setGradeFilter(grade.toString())}
              >
                {t('students.gradeN', { n: grade })}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => {
              const statusMap: Record<string, string> = { 'all': t('status.all'), 'active': t('status.active'), 'inactive': t('status.inactive') };
              return (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {statusMap[status]}
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student, index) => {
          const statusColor = getStatusColor(student.status);
          const genderColor = getGenderColor(student.gender);

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Student Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {(() => {
                      const profileImg = getProfileImage(student.name);
                      return profileImg ? (
                        <img
                          src={profileImg}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: EDUCATION_COLOR }}
                        >
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      );
                    })()}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{student.name}</p>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: `${genderColor}20`, color: genderColor }}
                        >
                          {student.gender}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted">{student.studentNo}</p>
                    </div>
                  </div>

                  {/* Class */}
                  <div className="text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ color: EDUCATION_COLOR }}
                    >
                      {student.className}
                    </p>
                    <p className="text-xs text-text-muted">{t('students.classLabel')}</p>
                  </div>

                  {/* Roll No */}
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">#{student.rollNo}</p>
                    <p className="text-xs text-text-muted">{t('students.rollNo')}</p>
                  </div>

                  {/* Parent Info */}
                  <div className="min-w-[150px]">
                    <p className="text-sm font-medium text-text-primary">{student.parentName}</p>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Phone size={12} />
                      {student.parentPhone}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      {({ 'active': t('status.active'), 'inactive': t('status.inactive'), 'alumni': t('status.alumni') } as Record<string, string>)[student.status] || student.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('students.viewProfile'), onClick: () => {} },
                      { id: 'edit', label: t('students.editDetails'), onClick: () => {} },
                      { id: 'attendance', label: t('students.attendance'), onClick: () => {} },
                      { id: 'grades', label: t('students.viewGrades'), onClick: () => {} },
                    ]}
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('students.noStudentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Students;
