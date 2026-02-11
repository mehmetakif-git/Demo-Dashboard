import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Download,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { grades, students, classes, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Grades = () => {
  const { t } = useTranslation('education');
  const [selectedClass, setSelectedClass] = useState<string>('CLS001');
  const [selectedTerm, setSelectedTerm] = useState<string>('1st Semester');
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const classStudents = useMemo(() => {
    return students.filter(s => s.classId === selectedClass);
  }, [selectedClass]);

  const classGrades = useMemo(() => {
    return grades.filter(g => g.classId === selectedClass && g.term === selectedTerm);
  }, [selectedClass, selectedTerm]);

  const classSubjects = useMemo(() => {
    const cls = classes.find(c => c.id === selectedClass);
    return cls?.subjects || [];
  }, [selectedClass]);

  const stats = useMemo(() => {
    const avgScore = classGrades.length > 0
      ? Math.round(classGrades.reduce((acc, g) => acc + g.average, 0) / classGrades.length)
      : 0;
    const aGrades = classGrades.filter(g => g.grade === 'A').length;
    const failingGrades = classGrades.filter(g => g.grade === 'F' || g.average < 50).length;

    return {
      avgScore,
      aGrades,
      failingGrades,
      totalEntries: classGrades.length,
    };
  }, [classGrades]);

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      'A': '#10b981',
      'B': '#3b82f6',
      'C': '#f59e0b',
      'D': '#ef4444',
      'F': '#dc2626',
    };
    return colors[grade] || EDUCATION_COLOR;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#ef4444';
    return '#dc2626';
  };

  const selectedClassInfo = classes.find(c => c.id === selectedClass);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('grades.title')}
        subtitle={t('grades.subtitle')}
        icon={Award}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">
              <Download size={18} />
              {t('grades.exportGrades')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('grades.averageScore'), value: stats.avgScore, icon: TrendingUp, color: EDUCATION_COLOR },
          { label: t('grades.aGrades'), value: stats.aGrades, icon: Award, color: '#10b981' },
          { label: t('grades.atRisk'), value: stats.failingGrades, icon: Users, color: '#ef4444' },
          { label: t('grades.totalEntries'), value: stats.totalEntries, icon: BookOpen, color: '#6366f1' },
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

      {/* Class and Term Selection */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
          <div className="flex gap-2">
            {['1st Semester', '2nd Semester'].map((term) => {
              const termLabelMap: Record<string, string> = { '1st Semester': t('grades.firstSemester'), '2nd Semester': t('grades.secondSemester') };
              return (
                <Button
                  key={term}
                  variant={selectedTerm === term ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTerm(term)}
                >
                  {termLabelMap[term]}
                </Button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'view' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('view')}
            >
              {t('grades.viewMode')}
            </Button>
            <Button
              variant={viewMode === 'edit' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('edit')}
            >
              {t('grades.editMode')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Grade Table */}
      <Card className="p-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">
            {t('grades.classGrades', { className: selectedClassInfo?.name, term: selectedTerm })}
          </h3>
          {viewMode === 'edit' && (
            <Button size="sm">{t('grades.saveGrades')}</Button>
          )}
        </div>

        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border-default">
              <th className="text-left py-3 px-2 text-sm text-text-muted font-medium sticky left-0 bg-background-primary">
                {t('grades.student')}
              </th>
              {classSubjects.slice(0, 5).map((subject) => (
                <th key={subject} className="text-center py-3 px-2 text-sm text-text-muted font-medium">
                  {subject}
                </th>
              ))}
              <th className="text-center py-3 px-2 text-sm text-text-muted font-medium">{t('grades.average')}</th>
              <th className="text-center py-3 px-2 text-sm text-text-muted font-medium">{t('grades.grade')}</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student, index) => {
              const studentGrades = classGrades.filter(g => g.studentId === student.id);
              const overallAvg = studentGrades.length > 0
                ? Math.round(studentGrades.reduce((acc, g) => acc + g.average, 0) / studentGrades.length)
                : 0;
              const overallGrade = overallAvg >= 90 ? 'A' : overallAvg >= 80 ? 'B' : overallAvg >= 70 ? 'C' : overallAvg >= 60 ? 'D' : 'F';

              return (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-border-default hover:bg-background-secondary"
                >
                  <td className="py-3 px-2 sticky left-0 bg-background-primary">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted w-6">#{student.rollNo}</span>
                      {(() => {
                        const profileImg = getProfileImage(student.name);
                        return profileImg ? (
                          <img
                            src={profileImg}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                            style={{ backgroundColor: EDUCATION_COLOR }}
                          >
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        );
                      })()}
                      <span className="text-sm font-medium text-text-primary">{student.name}</span>
                    </div>
                  </td>
                  {classSubjects.slice(0, 5).map((subject) => {
                    const grade = studentGrades.find(g => g.subjectName === subject);
                    const score = grade?.average || 0;
                    const scoreColor = getScoreColor(score);

                    return (
                      <td key={subject} className="py-3 px-2 text-center">
                        {viewMode === 'edit' ? (
                          <input
                            type="number"
                            className="w-16 px-2 py-1 text-center text-sm rounded bg-background-tertiary border border-border-default"
                            defaultValue={score || ''}
                            min={0}
                            max={100}
                          />
                        ) : (
                          <span
                            className="text-sm font-medium"
                            style={{ color: score > 0 ? scoreColor : '#64748b' }}
                          >
                            {score > 0 ? score : '-'}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-3 px-2 text-center">
                    <span
                      className="text-lg font-bold"
                      style={{ color: getScoreColor(overallAvg) }}
                    >
                      {overallAvg > 0 ? overallAvg : '-'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: `${getGradeColor(overallGrade)}20`,
                        color: getGradeColor(overallGrade),
                      }}
                    >
                      {overallAvg > 0 ? overallGrade : '-'}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Grade Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('grades.gradeDistribution')}</h3>
        <div className="flex gap-4 flex-wrap">
          {['A', 'B', 'C', 'D', 'F'].map((grade) => {
            const count = classGrades.filter(g => g.grade === grade).length;
            const percentage = classGrades.length > 0
              ? Math.round((count / classGrades.length) * 100)
              : 0;
            const color = getGradeColor(grade);

            return (
              <div
                key={grade}
                className="flex-1 min-w-[100px] p-4 rounded-lg text-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <p className="text-3xl font-bold" style={{ color }}>{grade}</p>
                <p className="text-sm text-text-primary font-medium">{t('grades.studentsCount', { count })}</p>
                <p className="text-xs text-text-muted">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Grades;
