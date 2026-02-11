import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Plus,
  Hash,
  Award,
  MoreVertical,
  GraduationCap,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { subjects, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Curriculum = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  const uniqueGrades = useMemo(() => {
    const grades = [...new Set(subjects.map(s => s.grade))].sort((a, b) => a - b);
    return grades;
  }, []);

  const stats = useMemo(() => {
    const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
    const byGrade = subjects.reduce((acc, s) => {
      acc[s.grade] = (acc[s.grade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalSubjects: subjects.length,
      totalCredits,
      byGrade,
      avgCredits: Math.round(totalCredits / subjects.length),
    };
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.teacher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = gradeFilter === 'all' || subject.grade.toString() === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [searchQuery, gradeFilter]);

  const getSubjectColor = (code: string) => {
    const colors: Record<string, string> = {
      'MAT': '#ef4444',
      'TUR': '#f59e0b',
      'ENG': '#3b82f6',
      'FEN': '#10b981',
      'SOS': '#ec4899',
      'FIZ': '#8b5cf6',
      'KIM': '#06b6d4',
      'BIO': '#22c55e',
    };
    return colors[code] || EDUCATION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('curriculum.title')}
        subtitle={t('curriculum.subtitle')}
        icon={BookOpen}
        actions={
          <Button>
            <Plus size={18} />
            {t('curriculum.addSubject')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('curriculum.totalSubjects'), value: stats.totalSubjects, icon: BookOpen, color: EDUCATION_COLOR },
          { label: t('curriculum.totalCredits'), value: stats.totalCredits, icon: Award, color: '#10b981' },
          { label: t('curriculum.avgCredits'), value: stats.avgCredits, icon: Hash, color: '#f59e0b' },
          { label: t('curriculum.gradeNSubjects', { n: 9 }), value: stats.byGrade[9] || 0, icon: GraduationCap, color: '#6366f1' },
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
              placeholder={t('curriculum.searchPlaceholder')}
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
              {t('curriculum.allGrades')}
            </Button>
            {uniqueGrades.map((grade) => (
              <Button
                key={grade}
                variant={gradeFilter === grade.toString() ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setGradeFilter(grade.toString())}
              >
                {t('curriculum.gradeN', { n: grade })}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject, index) => {
          const color = getSubjectColor(subject.code);

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <BookOpen size={24} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">{subject.name}</p>
                      <p className="text-xs text-text-muted">{subject.code}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('curriculum.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('curriculum.editSubject'), onClick: () => {} },
                      { id: 'syllabus', label: t('curriculum.viewSyllabus'), onClick: () => {} },
                      { id: 'assign', label: t('curriculum.assignTeacher'), onClick: () => {} },
                    ]}
                  />
                </div>

                <div className="space-y-3">
                  {/* Grade */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{t('curriculum.grade')}</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {t('curriculum.gradeN', { n: subject.grade })}
                    </span>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{t('curriculum.credits')}</span>
                    <span className="text-sm font-medium text-text-primary">{subject.credits}</span>
                  </div>

                  {/* Teacher */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{t('curriculum.teacher')}</span>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const teacherImg = getProfileImage(subject.teacher);
                        return teacherImg ? (
                          <img
                            src={teacherImg}
                            alt={subject.teacher}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                            style={{ backgroundColor: EDUCATION_COLOR }}
                          >
                            {subject.teacher.split(' ').map(n => n[0]).join('')}
                          </div>
                        );
                      })()}
                      <span className="text-sm text-text-primary">{subject.teacher}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 pt-3 border-t border-border-default">
                  <p className="text-xs text-text-secondary">{subject.description}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('curriculum.noSubjectsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Curriculum;
