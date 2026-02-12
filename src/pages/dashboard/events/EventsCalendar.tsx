import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Users,
  MapPin,
  Clock,
} from 'lucide-react';
import { PageHeader } from '@/components/common';
import {
  events,
  eventTypes,
  getEventTypeColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

type ViewMode = 'month' | 'week' | 'day';

export const EventsCalendar = () => {
  const { t } = useTranslation('events');
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty days for the start of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => {
      const startDate = new Date(event.dates.start);
      const endDate = new Date(event.dates.end);
      const checkDate = new Date(dateStr);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const days = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const upcomingEvents = events
    .filter((e) => new Date(e.dates.start) >= new Date())
    .sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime())
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('calendar.title')}
        subtitle={t('calendar.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            {t('calendar.createEvent')}
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-lg hover:bg-[#1a1a24] text-[#64748b] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg hover:bg-[#1a1a24] text-[#64748b] hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8] hover:bg-[#1a1a24]"
                >
                  {t('calendar.today')}
                </button>
                <div className="flex rounded-lg border border-white/[0.08] bg-[#1a1a24] p-1">
                  {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        viewMode === mode
                          ? 'bg-[#547792] text-white'
                          : 'text-[#64748b] hover:text-white'
                      }`}
                    >
                      {mode === 'month' ? t('calendar.month') : mode === 'week' ? t('calendar.week') : t('calendar.day')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="py-2 text-center text-xs font-semibold text-[#64748b] uppercase">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isToday = day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 rounded-lg border ${
                        day ? 'border-white/[0.08] hover:border-[#547792]/50 cursor-pointer' : 'border-transparent'
                      } ${isToday ? 'bg-[#547792]/10' : ''}`}
                    >
                      {day && (
                        <>
                          <span className={`text-sm font-medium ${
                            isToday ? 'text-[#547792]' : 'text-[#94a3b8]'
                          }`}>
                            {day}
                          </span>
                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event) => {
                              const typeColor = getEventTypeColor(event.type);
                              return (
                                <div
                                  key={event.id}
                                  onClick={() => navigate(`/dashboard/events/events/${event.id}`)}
                                  className="px-1.5 py-0.5 rounded text-xs truncate cursor-pointer"
                                  style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                                >
                                  {event.name}
                                </div>
                              );
                            })}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-[#64748b] pl-1">
                                {t('calendar.more', { count: dayEvents.length - 2 })}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Upcoming Events */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#547792]" />
              {t('calendar.upcomingEvents')}
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const typeColor = getEventTypeColor(event.type);

                return (
                  <div
                    key={event.id}
                    onClick={() => navigate(`/dashboard/events/events/${event.id}`)}
                    className="p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm truncate flex-1 mr-2">
                        {event.name}
                      </h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                      >
                        {eventTypes.find(t => t.id === event.type)?.name || event.type}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <Clock className="h-3 w-3" />
                        {event.dates.start}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <MapPin className="h-3 w-3" />
                        {event.venue.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <Users className="h-3 w-3" />
                        {event.registeredAttendees} {t('calendar.registered')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Legend */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('calendar.eventTypes')}</h3>
            <div className="space-y-2">
              {eventTypes.slice(0, 6).map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-sm text-[#94a3b8]">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
