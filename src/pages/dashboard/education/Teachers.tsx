import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  MoreVertical,
  Award,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { teachers, classes, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Teachers = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const allSubjects = useMemo(() => {
    const subjects = new Set<string>();
    teachers.forEach(tch => tch.subjects.forEach(s => subjects.add(s)));
    return Array.from(subjects);
  }, []);

  const stats = useMemo(() => {
    const active = teachers.filter(tch => tch.status === 'active').length;
    const totalExperience = teachers.reduce((acc, tch) => acc + tch.experience, 0);
    const avgExperience = Math.round(totalExperience / teachers.length);
    const classTeachers = teachers.filter(tch => tch.classTeacherOf).length;

    return {
      total: teachers.length,
      active,
      avgExperience,
      classTeachers,
    };
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.employeeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject = subjectFilter === 'all' || teacher.subjects.includes(subjectFilter);
      const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchQuery, subjectFilter, statusFilter]);

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Mathematics': '#ef4444',
      'English': '#f59e0b',
      'Arabic': '#3b82f6',
      'Physics': '#8b5cf6',
      'Chemistry': '#10b981',
      'Biology': '#06b6d4',
      'Science': '#ec4899',
      'Social Studies': '#6366f1',
    };
    return colors[subject] || EDUCATION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teachers.title')}
        subtitle={t('teachers.subtitle')}
        icon={UserCheck}
        actions={
          <Button>
            <Plus size={18} />
            {t('teachers.addTeacher')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('teachers.totalTeachers'), value: stats.total, icon: UserCheck, color: EDUCATION_COLOR },
          { label: t('teachers.activeTeachers'), value: stats.active, icon: UserCheck, color: '#10b981' },
          { label: t('teachers.avgExperience'), value: `${stats.avgExperience} ${t('teachers.yrs')}`, icon: Award, color: '#f59e0b' },
          { label: t('teachers.classTeachers'), value: stats.classTeachers, icon: BookOpen, color: '#6366f1' },
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

      {/* Subject Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-3">{t('teachers.subjectDistribution')}</h3>
        <div className="flex flex-wrap gap-3">
          {allSubjects.map((subject) => {
            const count = teachers.filter(tch => tch.subjects.includes(subject)).length;
            const color = getSubjectColor(subject);
            const isActive = subjectFilter === subject;

            return (
              <div
                key={subject}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                  isActive ? 'ring-2 ring-current' : 'bg-background-secondary hover:bg-background-tertiary'
                }`}
                style={{
                  backgroundColor: isActive ? `${color}20` : undefined,
                  color: isActive ? color : undefined,
                }}
                onClick={() => setSubjectFilter(subjectFilter === subject ? 'all' : subject)}
              >
                <BookOpen size={16} style={{ color }} />
                <span className="text-sm text-text-primary">{subject}</span>
                <span className="text-xs text-text-muted">({count})</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('teachers.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
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

      {/* Teachers List */}
      <div className="space-y-4">
        {filteredTeachers.map((teacher, index) => {
          const classInfo = teacher.classTeacherOf
            ? classes.find(c => c.id === teacher.classTeacherOf)
            : null;

          return (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Teacher Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {(() => {
                      const profileImg = getProfileImage(teacher.name);
                      return profileImg ? (
                        <img
                          src={profileImg}
                          alt={teacher.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: EDUCATION_COLOR }}
                        >
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      );
                    })()}
                    <div>
                      <p className="font-semibold text-text-primary">{teacher.name}</p>
                      <p className="text-sm text-text-muted">{teacher.employeeNo}</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: `${getSubjectColor(subject)}20`,
                          color: getSubjectColor(subject),
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  {/* Class Teacher Of */}
                  <div className="text-center min-w-[100px]">
                    {classInfo ? (
                      <>
                        <p className="text-lg font-bold" style={{ color: EDUCATION_COLOR }}>
                          {classInfo.name}
                        </p>
                        <p className="text-xs text-text-muted">{t('teachers.classTeacher')}</p>
                      </>
                    ) : (
                      <p className="text-sm text-text-muted">-</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{teacher.experience}</p>
                    <p className="text-xs text-text-muted">{t('teachers.yearsExp')}</p>
                  </div>

                  {/* Contact */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Mail size={12} />
                      {teacher.email}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Phone size={12} />
                      {teacher.phone}
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: teacher.status === 'active' ? '#10b98120' : '#64748b20',
                      color: teacher.status === 'active' ? '#10b981' : '#64748b',
                    }}
                  >
                    {({ 'active': t('status.active'), 'inactive': t('status.inactive') } as Record<string, string>)[teacher.status] || teacher.status}
                  </span>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('teachers.viewProfile'), onClick: () => {} },
                      { id: 'edit', label: t('teachers.editDetails'), onClick: () => {} },
                      { id: 'classes', label: t('teachers.assignClasses'), onClick: () => {} },
                      { id: 'schedule', label: t('teachers.viewSchedule'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Qualifications */}
                <div className="mt-3 pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">
                    <span className="font-medium">{t('teachers.qualifications')}</span>{' '}
                    {teacher.qualifications.join(', ')}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredTeachers.length === 0 && (
        <Card className="p-12 text-center">
          <UserCheck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('teachers.noTeachersFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Teachers;
