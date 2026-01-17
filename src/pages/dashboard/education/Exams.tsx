import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Users,
  MapPin,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { exams, examSchedule, EDUCATION_COLOR } from '@/data/education/educationData';

export const Exams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string | null>('EXM002');

  const stats = useMemo(() => ({
    upcoming: exams.filter(e => e.status === 'upcoming').length,
    ongoing: exams.filter(e => e.status === 'ongoing').length,
    completed: exams.filter(e => e.status === 'completed').length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
  }), []);

  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const selectedExamSchedule = useMemo(() => {
    if (!selectedExam) return [];
    return examSchedule.filter(s => s.examId === selectedExam);
  }, [selectedExam]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'upcoming': '#f59e0b',
      'ongoing': '#6366f1',
      'completed': '#10b981',
      'scheduled': '#3b82f6',
    };
    return colors[status] || EDUCATION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'ongoing':
        return Clock;
      default:
        return Calendar;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Management"
        subtitle="Schedule and manage examinations"
        icon={FileText}
        actions={
          <Button>
            <Plus size={18} />
            Create Exam
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming', value: stats.upcoming, icon: Calendar, color: '#f59e0b' },
          { label: 'Ongoing', value: stats.ongoing, icon: Clock, color: '#6366f1' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: 'Scheduled', value: stats.scheduled, icon: AlertCircle, color: '#3b82f6' },
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
              placeholder="Search exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'upcoming', 'ongoing', 'completed', 'scheduled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exams List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-text-primary">Exams</h3>
          {filteredExams.map((exam, index) => {
            const StatusIcon = getStatusIcon(exam.status);
            const statusColor = getStatusColor(exam.status);
            const isSelected = selectedExam === exam.id;

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:bg-background-secondary ${
                    isSelected ? 'ring-2 ring-[#8b5cf6]' : ''
                  }`}
                  onClick={() => setSelectedExam(exam.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${statusColor}20` }}
                      >
                        <FileText size={20} style={{ color: statusColor }} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{exam.name}</p>
                        <p className="text-xs text-text-muted">{exam.type}</p>
                      </div>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'schedule', label: 'View Schedule', onClick: () => {} },
                        { id: 'edit', label: 'Edit Exam', onClick: () => {} },
                        { id: 'results', label: 'Enter Results', onClick: () => {} },
                        { id: 'publish', label: 'Publish Results', onClick: () => {} },
                      ]}
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Date Range</span>
                      <span className="text-text-primary">
                        {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Term</span>
                      <span className="text-text-primary">{exam.term}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Status</span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize"
                        style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                      >
                        <StatusIcon size={12} />
                        {exam.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border-default">
                    <p className="text-xs text-text-muted">
                      Grades: {exam.grades.join(', ')}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Exam Schedule */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">
              Exam Schedule {selectedExam && `- ${exams.find(e => e.id === selectedExam)?.name}`}
            </h3>

            {selectedExamSchedule.length > 0 ? (
              <div className="space-y-3">
                {selectedExamSchedule.map((schedule, index) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-background-secondary rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Date & Time */}
                      <div
                        className="w-20 h-20 rounded-lg flex flex-col items-center justify-center"
                        style={{ backgroundColor: `${EDUCATION_COLOR}20` }}
                      >
                        <span className="text-2xl font-bold" style={{ color: EDUCATION_COLOR }}>
                          {new Date(schedule.date).getDate()}
                        </span>
                        <span className="text-xs text-text-muted">
                          {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>

                      {/* Subject Info */}
                      <div className="flex-1">
                        <p className="font-semibold text-text-primary">{schedule.subjectName}</p>
                        <p className="text-sm text-text-muted">{schedule.className}</p>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-text-muted" />
                        <span className="text-sm text-text-primary">{schedule.time}</span>
                        <span className="text-xs text-text-muted">({schedule.duration} min)</span>
                      </div>

                      {/* Room */}
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-text-muted" />
                        <span className="text-sm text-text-primary">Room {schedule.roomNo}</span>
                      </div>

                      {/* Invigilator */}
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-text-muted" />
                        <span className="text-sm text-text-primary">{schedule.invigilator}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-text-muted mb-4" />
                <p className="text-text-secondary">
                  {selectedExam ? 'No schedule entries for this exam' : 'Select an exam to view schedule'}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exams;
