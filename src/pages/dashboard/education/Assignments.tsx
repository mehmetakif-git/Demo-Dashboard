import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Search,
  Plus,
  Calendar,
  Users,
  Clock,
  FileText,
  MoreVertical,
  BookOpen,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { assignments, submissions, classes, EDUCATION_COLOR } from '@/data/education/educationData';

export const Assignments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const active = assignments.filter(a => a.status === 'active').length;
    const totalSubmissions = assignments.reduce((acc, a) => acc + a.submissionCount, 0);
    const gradedThisWeek = submissions.filter(s => s.status === 'graded').length;

    return {
      active,
      totalSubmissions,
      gradedThisWeek,
      pending: assignments.reduce((acc, a) => acc + (a.totalStudents - a.submissionCount), 0),
    };
  }, []);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesClass = classFilter === 'all' || assignment.classId === classFilter;

      return matchesSearch && matchesStatus && matchesClass;
    });
  }, [searchQuery, statusFilter, classFilter]);

  const getSubjectColor = (subjectName: string) => {
    const colors: Record<string, string> = {
      'Matematik': '#ef4444',
      'Turkce': '#f59e0b',
      'Ingilizce': '#3b82f6',
      'Fen Bilgisi': '#10b981',
      'Sosyal Bilgiler': '#ec4899',
    };
    return colors[subjectName] || EDUCATION_COLOR;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date('2024-01-17');
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignment Management"
        subtitle="Create and manage student assignments"
        icon={CheckSquare}
        actions={
          <Button>
            <Plus size={18} />
            Create Assignment
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Assignments', value: stats.active, icon: CheckSquare, color: EDUCATION_COLOR },
          { label: 'Total Submissions', value: stats.totalSubmissions, icon: FileText, color: '#10b981' },
          { label: 'Graded This Week', value: stats.gradedThisWeek, icon: Users, color: '#f59e0b' },
          { label: 'Pending Submissions', value: stats.pending, icon: Clock, color: '#ef4444' },
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
              placeholder="Search by title, subject, or teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={classFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setClassFilter('all')}
            >
              All Classes
            </Button>
            {classes.map((cls) => (
              <Button
                key={cls.id}
                variant={classFilter === cls.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setClassFilter(cls.id)}
              >
                {cls.name}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment, index) => {
          const subjectColor = getSubjectColor(assignment.subjectName);
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const submissionRate = Math.round((assignment.submissionCount / assignment.totalStudents) * 100);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Assignment Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${subjectColor}20` }}
                    >
                      <BookOpen size={24} style={{ color: subjectColor }} />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{assignment.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
                        >
                          {assignment.subjectName}
                        </span>
                        <span className="text-xs text-text-muted">{assignment.className}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{assignment.description}</p>
                    </div>
                  </div>

                  {/* Teacher */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: EDUCATION_COLOR }}
                    >
                      {assignment.teacherName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-text-primary">{assignment.teacherName}</span>
                  </div>

                  {/* Dates */}
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Calendar size={14} />
                      <span className="text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <p
                      className={`text-xs ${
                        isOverdue ? 'text-error' : isDueSoon ? 'text-warning' : 'text-text-muted'
                      }`}
                    >
                      {isOverdue
                        ? `${Math.abs(daysUntilDue)} days overdue`
                        : daysUntilDue === 0
                        ? 'Due today'
                        : `${daysUntilDue} days left`}
                    </p>
                  </div>

                  {/* Submissions */}
                  <div className="min-w-[120px]">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-muted">Submissions</span>
                      <span className="text-text-primary font-medium">
                        {assignment.submissionCount}/{assignment.totalStudents}
                      </span>
                    </div>
                    <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${submissionRate}%`,
                          backgroundColor: submissionRate === 100 ? '#10b981' : EDUCATION_COLOR,
                        }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      backgroundColor: assignment.status === 'active' ? '#10b98120' : '#64748b20',
                      color: assignment.status === 'active' ? '#10b981' : '#64748b',
                    }}
                  >
                    {assignment.status}
                  </span>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit Assignment', onClick: () => {} },
                      { id: 'submissions', label: 'View Submissions', onClick: () => {} },
                      { id: 'delete', label: 'Delete', onClick: () => {} },
                    ]}
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <Card className="p-12 text-center">
          <CheckSquare size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No assignments found</p>
        </Card>
      )}
    </div>
  );
};

export default Assignments;
