import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Calendar,
  List,
  Users,
  Clock,
  MapPin,
  User,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  gymClasses,
  trainers,
  getDifficultyColor,
  type GymClass,
} from '@/data/gym/gymData';
import { useTranslation } from 'react-i18next';

type ViewMode = 'calendar' | 'list';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export const ClassSchedule = () => {
  const { t } = useTranslation('common');
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [instructorFilter, setInstructorFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(gymClasses.map((c) => c.category));
    return Array.from(cats);
  }, []);

  const filteredClasses = useMemo(() => {
    return gymClasses.filter((cls) => {
      const categoryMatch = categoryFilter === 'all' || cls.category === categoryFilter;
      const instructorMatch = instructorFilter === 'all' || cls.instructorId === instructorFilter;
      const difficultyMatch = difficultyFilter === 'all' || cls.difficulty === difficultyFilter;
      return categoryMatch && instructorMatch && difficultyMatch;
    });
  }, [categoryFilter, instructorFilter, difficultyFilter]);

  // Get classes for a specific day and time slot
  const getClassesForSlot = (day: string, time: string) => {
    return filteredClasses.filter((cls) =>
      cls.schedule.some((s) => s.day === day && s.time === time)
    );
  };

  const totalClasses = gymClasses.length;
  const totalEnrollment = gymClasses.reduce((sum, cls) => sum + cls.currentEnrollment, 0);
  const avgCapacityUsage = Math.round(
    (gymClasses.reduce((sum, cls) => sum + cls.currentEnrollment / cls.maxCapacity, 0) /
      gymClasses.length) *
      100
  );

  const stats = [
    { title: 'Total Classes', value: totalClasses.toString(), icon: Calendar, iconColor: '#547792' },
    { title: 'Total Enrollment', value: totalEnrollment.toString(), icon: Users, iconColor: '#10b981' },
    { title: 'Avg Capacity', value: `${avgCapacityUsage}%`, icon: Users, iconColor: '#f59e0b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('gym.classSchedule', 'Class Schedule')}
        subtitle="Manage group fitness classes"
        actions={
          <Button onClick={() => console.log('Add class')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Filters and View Toggle */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Instructors</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels">All Levels</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Calendar className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card className="p-4 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-xs font-semibold text-text-secondary py-2">Time</div>
                {DAYS.map((day) => (
                  <div key={day} className="text-xs font-semibold text-text-secondary py-2 text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {TIME_SLOTS.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2 min-h-[60px]">
                  <div className="text-xs text-text-secondary py-2 border-t border-white/[0.08]">
                    {time}
                  </div>
                  {DAYS.map((day) => {
                    const classes = getClassesForSlot(day, time);
                    return (
                      <div
                        key={`${day}-${time}`}
                        className="border-t border-white/[0.08] p-1"
                      >
                        {classes.map((cls) => (
                          <button
                            key={cls.id}
                            onClick={() => setSelectedClass(cls)}
                            className="w-full p-2 rounded-lg text-left text-xs mb-1 transition-opacity hover:opacity-80"
                            style={{ backgroundColor: `${cls.color}30`, borderLeft: `3px solid ${cls.color}` }}
                          >
                            <p className="font-semibold text-text-primary truncate">{cls.name}</p>
                            <p className="text-text-secondary truncate">{cls.instructor}</p>
                            <p className="text-text-muted">
                              {cls.currentEnrollment}/{cls.maxCapacity}
                            </p>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Instructor
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Schedule
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Capacity
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Difficulty
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Room
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <tr
                    key={cls.id}
                    className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50 cursor-pointer"
                    onClick={() => setSelectedClass(cls)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cls.color }}
                        />
                        <div>
                          <p className="font-medium text-text-primary">{cls.name}</p>
                          <p className="text-sm text-text-secondary">{cls.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-text-primary">
                        {cls.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-primary">{cls.instructor}</td>
                    <td className="py-3 px-4 text-text-secondary text-sm">
                      {cls.schedule.map((s) => `${s.day} ${s.time}`).join(', ')}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{cls.duration} min</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary font-medium">
                          {cls.currentEnrollment}/{cls.maxCapacity}
                        </span>
                        <div className="w-20 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(cls.currentEnrollment / cls.maxCapacity) * 100}%`,
                              backgroundColor:
                                cls.currentEnrollment >= cls.maxCapacity
                                  ? '#ef4444'
                                  : cls.currentEnrollment >= cls.maxCapacity * 0.8
                                  ? '#f59e0b'
                                  : '#10b981',
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                          cls.difficulty
                        )}`}
                      >
                        {cls.difficulty === 'all-levels' ? 'All Levels' : cls.difficulty.charAt(0).toUpperCase() + cls.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{cls.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div
              className="p-6 border-b border-white/[0.08]"
              style={{ borderTopColor: selectedClass.color, borderTopWidth: '4px' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{selectedClass.name}</h2>
                  <p className="text-text-secondary">{selectedClass.description}</p>
                </div>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Instructor</p>
                  <p className="text-text-primary font-medium">{selectedClass.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Duration</p>
                  <p className="text-text-primary font-medium">{selectedClass.duration} minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Location</p>
                  <p className="text-text-primary font-medium">{selectedClass.room}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Capacity</p>
                  <p className="text-text-primary font-medium">
                    {selectedClass.currentEnrollment}/{selectedClass.maxCapacity} enrolled
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Schedule</p>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.schedule.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-text-primary"
                    >
                      {s.day} at {s.time}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                    selectedClass.difficulty
                  )}`}
                >
                  {selectedClass.difficulty === 'all-levels' ? 'All Levels' : selectedClass.difficulty.charAt(0).toUpperCase() + selectedClass.difficulty.slice(1)}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/[0.05] text-text-primary">
                  {selectedClass.category}
                </span>
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.08] flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedClass(null)}>
                Close
              </Button>
              <Button className="flex-1" onClick={() => console.log('Edit class', selectedClass.id)}>
                Edit Class
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
