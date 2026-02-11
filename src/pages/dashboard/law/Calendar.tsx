import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { hearings, LAW_COLOR } from '@/data/law/lawData';

export const Calendar = () => {
  const { t } = useTranslation('law');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysCount; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return hearings.filter(h => h.hearingDate === dateStr);
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return hearings.filter(h => h.hearingDate === selectedDate);
  }, [selectedDate]);

  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    return hearings
      .filter(h => h.status === 'scheduled' && new Date(h.hearingDate) >= today)
      .sort((a, b) => new Date(a.hearingDate).getTime() - new Date(b.hearingDate).getTime())
      .slice(0, 5);
  }, []);

  const monthNames = [t('calendar.months.january'), t('calendar.months.february'), t('calendar.months.march'), t('calendar.months.april'), t('calendar.months.may'), t('calendar.months.june'), t('calendar.months.july'), t('calendar.months.august'), t('calendar.months.september'), t('calendar.months.october'), t('calendar.months.november'), t('calendar.months.december')];
  const dayNames = [t('calendar.days.sun'), t('calendar.days.mon'), t('calendar.days.tue'), t('calendar.days.wed'), t('calendar.days.thu'), t('calendar.days.fri'), t('calendar.days.sat')];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return t('calendar.today');
    if (diff === 1) return t('calendar.tomorrow');
    return t('calendar.daysAway', { count: diff });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('calendar.title')}
        subtitle={t('calendar.subtitle')}
        icon={CalendarDays}
        actions={
          <Button>
            <Plus size={18} />
            {t('calendar.addEvent')}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={goToPrevMonth}>
                  <ChevronLeft size={18} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentDate(new Date())}>
                  {t('calendar.today')}
                </Button>
                <Button variant="ghost" size="sm" onClick={goToNextMonth}>
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-text-muted py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map((day, index) => {
                const dateStr = formatDateString(day.date);
                const events = getEventsForDate(day.date);
                const hasEvents = events.length > 0;
                const isSelected = selectedDate === dateStr;

                return (
                  <motion.button
                    key={index}
                    className={`
                      relative p-2 min-h-[80px] rounded-lg text-left transition-all
                      ${day.isCurrentMonth ? 'bg-background-secondary' : 'bg-background-tertiary/50'}
                      ${isToday(day.date) ? 'ring-2 ring-accent-primary' : ''}
                      ${isSelected ? 'bg-accent-primary/20' : 'hover:bg-background-tertiary'}
                    `}
                    onClick={() => setSelectedDate(dateStr)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.01 }}
                  >
                    <span
                      className={`
                        text-sm font-medium
                        ${day.isCurrentMonth ? 'text-text-primary' : 'text-text-muted'}
                        ${isToday(day.date) ? 'text-accent-primary' : ''}
                      `}
                    >
                      {day.date.getDate()}
                    </span>
                    {hasEvents && (
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map((event, i) => (
                          <div
                            key={i}
                            className="text-xs px-1 py-0.5 rounded truncate"
                            style={{ backgroundColor: `${LAW_COLOR}30`, color: LAW_COLOR }}
                          >
                            {event.hearingTime}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-text-muted">{t('calendar.moreEvents', { count: events.length - 2 })}</div>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </Card>

          {/* Selected Date Events */}
          {selectedDate && selectedDateEvents.length > 0 && (
            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-text-primary mb-4">{t('calendar.eventsOn', { date: selectedDate })}</h3>
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-background-tertiary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} style={{ color: LAW_COLOR }} />
                      <span className="font-medium text-text-primary">{event.hearingTime}</span>
                      <span className="font-mono text-xs text-text-muted">{event.caseNo}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{event.caseTitle}</p>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <MapPin size={12} />
                      <span>{event.court}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <AlertTriangle size={18} style={{ color: LAW_COLOR }} />
              {t('calendar.upcomingDeadlines')}
            </h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((hearing, index) => (
                <motion.div
                  key={hearing.id}
                  className="p-3 bg-background-tertiary rounded-lg"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-text-muted">{hearing.caseNo}</span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: getDaysUntil(hearing.hearingDate) === 'Today' ? '#ef444420' : `${LAW_COLOR}20`,
                        color: getDaysUntil(hearing.hearingDate) === 'Today' ? '#ef4444' : LAW_COLOR,
                      }}
                    >
                      {getDaysUntil(hearing.hearingDate)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary mb-1">{hearing.hearingType}</p>
                  <p className="text-xs text-text-secondary truncate">{hearing.caseTitle}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <Clock size={12} />
                    <span>{hearing.hearingDate} at {hearing.hearingTime}</span>
                  </div>
                </motion.div>
              ))}

              {upcomingDeadlines.length === 0 && (
                <div className="text-center py-8 text-text-muted">
                  <CalendarDays size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t('calendar.noUpcomingDeadlines')}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4 mt-4">
            <h3 className="font-semibold text-text-primary mb-4">{t('calendar.thisMonth')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">{t('calendar.scheduledHearings')}</span>
                <span className="font-medium text-text-primary">
                  {hearings.filter(h => h.status === 'scheduled').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">{t('calendar.completed')}</span>
                <span className="font-medium text-success">
                  {hearings.filter(h => h.status === 'completed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">{t('calendar.activeCases')}</span>
                <span className="font-medium text-text-primary">
                  {new Set(hearings.map(h => h.caseId)).size}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
