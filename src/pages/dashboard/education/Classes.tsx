import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  School,
  Search,
  Plus,
  Users,
  User,
  MapPin,
  BookOpen,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { classes, teachers, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';

export const Classes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [academicYear] = useState('2024-2025');

  const uniqueGrades = useMemo(() => {
    const grades = [...new Set(classes.map(c => c.grade))].sort((a, b) => a - b);
    return grades;
  }, []);

  const stats = useMemo(() => {
    const totalStudents = classes.reduce((acc, c) => acc + c.currentStrength, 0);
    const avgClassSize = Math.round(totalStudents / classes.length);
    const teacherCount = teachers.filter(t => t.classTeacherOf).length;

    return {
      totalClasses: classes.length,
      totalStudents,
      avgClassSize,
      teacherRatio: `1:${Math.round(totalStudents / teacherCount)}`,
    };
  }, []);

  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.classTeacherName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = gradeFilter === 'all' || cls.grade.toString() === gradeFilter;
      const matchesYear = cls.academicYear === academicYear;

      return matchesSearch && matchesGrade && matchesYear;
    });
  }, [searchQuery, gradeFilter, academicYear]);

  const getGradeColor = (grade: number) => {
    const colors: Record<number, string> = {
      8: '#10b981',
      9: EDUCATION_COLOR,
      10: '#f59e0b',
      11: '#ec4899',
      12: '#6366f1',
    };
    return colors[grade] || EDUCATION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Management"
        subtitle="Manage classes and sections"
        icon={School}
        actions={
          <Button>
            <Plus size={18} />
            Create New Class
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: stats.totalClasses, icon: School, color: EDUCATION_COLOR },
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: '#10b981' },
          { label: 'Avg Class Size', value: stats.avgClassSize, icon: Users, color: '#f59e0b' },
          { label: 'Teacher:Student', value: stats.teacherRatio, icon: User, color: '#6366f1' },
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
              placeholder="Search by class name or teacher..."
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
              All Grades
            </Button>
            {uniqueGrades.map((grade) => (
              <Button
                key={grade}
                variant={gradeFilter === grade.toString() ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setGradeFilter(grade.toString())}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls, index) => {
          const gradeColor = getGradeColor(cls.grade);
          const occupancy = Math.round((cls.currentStrength / cls.capacity) * 100);

          return (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${gradeColor}20` }}
                    >
                      <span className="text-xl font-bold" style={{ color: gradeColor }}>
                        {cls.name}
                      </span>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit Class', onClick: () => {} },
                      { id: 'timetable', label: 'View Timetable', onClick: () => {} },
                      { id: 'students', label: 'Students List', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Class Teacher */}
                <div className="flex items-center gap-2 mb-3">
                  {(() => {
                    const teacherImg = getProfileImage(cls.classTeacherName);
                    return teacherImg ? (
                      <img
                        src={teacherImg}
                        alt={cls.classTeacherName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: EDUCATION_COLOR }}
                      >
                        {cls.classTeacherName.split(' ').map(n => n[0]).join('')}
                      </div>
                    );
                  })()}
                  <div>
                    <p className="text-sm font-medium text-text-primary">{cls.classTeacherName}</p>
                    <p className="text-xs text-text-muted">Class Teacher</p>
                  </div>
                </div>

                {/* Room & Capacity */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-text-muted">
                      <MapPin size={14} />
                      Room
                    </span>
                    <span className="text-text-primary font-medium">{cls.roomNo}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-text-muted">
                      <Users size={14} />
                      Students
                    </span>
                    <span className="text-text-primary font-medium">
                      {cls.currentStrength} / {cls.capacity}
                    </span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${occupancy}%`,
                        backgroundColor: occupancy > 90 ? '#ef4444' : gradeColor,
                      }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1">{occupancy}% occupied</p>
                </div>

                {/* Subjects */}
                <div className="pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted mb-2 flex items-center gap-1">
                    <BookOpen size={12} />
                    Subjects
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cls.subjects.slice(0, 4).map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-0.5 rounded text-xs bg-background-secondary text-text-secondary"
                      >
                        {subject}
                      </span>
                    ))}
                    {cls.subjects.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-background-secondary text-text-muted">
                        +{cls.subjects.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <Card className="p-12 text-center">
          <School size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No classes found</p>
        </Card>
      )}
    </div>
  );
};

export default Classes;
