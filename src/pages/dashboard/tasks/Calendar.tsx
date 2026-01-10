import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  X,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { tasks, calendarEvents, getPriorityColor, getStatusColor, type Task, type CalendarEvent } from '@/data/taskData';

type ViewMode = 'month' | 'week';

interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
  events: CalendarEvent[];
}

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days: DayCell[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        tasks: tasks.filter(t => t.dueDate === dateStr),
        events: calendarEvents.filter(e => e.date === dateStr),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        tasks: tasks.filter(t => t.dueDate === dateStr),
        events: calendarEvents.filter(e => e.date === dateStr),
      });
    }

    // Next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        tasks: tasks.filter(t => t.dueDate === dateStr),
        events: calendarEvents.filter(e => e.date === dateStr),
      });
    }

    return days;
  }, [currentDate]);

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return tasks
      .filter(t => {
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate <= nextWeek && t.status !== 'done';
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  }, []);

  const selectedDayData = useMemo(() => {
    if (!selectedDate) return null;
    const dateStr = selectedDate.toISOString().split('T')[0];
    return {
      tasks: tasks.filter(t => t.dueDate === dateStr),
      events: calendarEvents.filter(e => e.date === dateStr),
    };
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Calendar"
        subtitle="View tasks and deadlines in calendar format"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-text-primary">
                  {formatMonth(currentDate)}
                </h2>
                <Button variant="secondary" size="sm" onClick={goToToday}>
                  Today
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      viewMode === 'month'
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      viewMode === 'week'
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Week
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={goToPrevMonth}
                    className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-text-primary"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-text-primary"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-text-secondary py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      min-h-[100px] p-2 rounded-lg cursor-pointer transition-colors
                      ${day.isCurrentMonth ? 'bg-white/[0.03] backdrop-blur-xl' : 'bg-background-primary/50'}
                      ${day.isToday ? 'ring-2 ring-accent-primary' : ''}
                      ${selectedDate?.toDateString() === day.date.toDateString() ? 'bg-accent-primary/10' : ''}
                      hover:bg-white/[0.05]
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`
                          text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                          ${day.isToday ? 'bg-accent-primary text-white' : ''}
                          ${day.isCurrentMonth ? 'text-text-primary' : 'text-text-muted'}
                        `}
                      >
                        {day.date.getDate()}
                      </span>
                    </div>

                    {/* Task/Event Indicators */}
                    <div className="space-y-1">
                      {day.tasks.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className="text-xs truncate px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${getPriorityColor(task.priority)}20`,
                            color: getPriorityColor(task.priority),
                          }}
                        >
                          {task.title}
                        </div>
                      ))}
                      {day.events.slice(0, 2 - day.tasks.length).map(event => (
                        <div
                          key={event.id}
                          className="text-xs truncate px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400"
                        >
                          {event.title}
                        </div>
                      ))}
                      {(day.tasks.length + day.events.length) > 2 && (
                        <div className="text-xs text-text-muted px-1">
                          +{day.tasks.length + day.events.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/[0.08]">
              <span className="text-sm text-text-secondary">Priority:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-text-secondary">Urgent</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-xs text-text-secondary">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#547792]" />
                  <span className="text-xs text-text-secondary">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-xs text-text-secondary">Low</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Panel */}
          <AnimatePresence mode="wait">
            {selectedDate && selectedDayData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </h3>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="p-1 hover:bg-white/[0.05] rounded text-text-secondary"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {selectedDayData.tasks.length === 0 && selectedDayData.events.length === 0 ? (
                    <p className="text-sm text-text-secondary text-center py-4">
                      No tasks or events for this day
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedDayData.tasks.map(task => (
                        <div
                          key={task.id}
                          className="p-3 bg-white/[0.05] rounded-lg"
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: getPriorityColor(task.priority) }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {task.title}
                              </p>
                              <p className="text-xs text-text-secondary">{task.project}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: `${getStatusColor(task.status)}20`,
                                    color: getStatusColor(task.status),
                                  }}
                                >
                                  {task.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {selectedDayData.events.map(event => (
                        <div
                          key={event.id}
                          className="p-3 bg-white/[0.05] rounded-lg"
                        >
                          <div className="flex items-start gap-2">
                            <CalendarIcon size={14} className="text-blue-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {event.title}
                              </p>
                              <p className="text-xs text-text-secondary capitalize">
                                {event.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upcoming Deadlines */}
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Clock size={16} className="text-orange-400" />
              Upcoming Deadlines
            </h3>

            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-text-secondary text-center py-4">
                No upcoming deadlines
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map(task => {
                  const dueDate = new Date(task.dueDate);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isToday = task.dueDate === today.toISOString().split('T')[0];
                  const isOverdue = dueDate < today;

                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {task.title}
                        </p>
                        <p
                          className={`text-xs ${
                            isOverdue
                              ? 'text-red-400'
                              : isToday
                              ? 'text-orange-400'
                              : 'text-text-secondary'
                          }`}
                        >
                          {isToday
                            ? 'Due Today'
                            : isOverdue
                            ? 'Overdue'
                            : dueDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
