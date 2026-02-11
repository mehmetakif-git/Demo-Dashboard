import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Calendar,
  Clock,
  User,
  Dumbbell,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  ptSessions,
  trainers,
  gymMembers,
  getSessionStatusColor,
  formatDate,
  type PTSession,
} from '@/data/gym/gymData';
import { profileImages } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const PTSessions = () => {
  const { t } = useTranslation('gym');
  const [searchQuery, setSearchQuery] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [selectedSession, setSelectedSession] = useState<PTSession | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  // Book session form state
  const [bookForm, setBookForm] = useState({
    memberId: '',
    trainerId: '',
    date: '',
    time: '',
    duration: '60',
    sessionType: 'strength',
    notes: '',
  });

  const stats = useMemo(() => ({
    total: ptSessions.length,
    scheduled: ptSessions.filter(s => s.status === 'scheduled').length,
    completed: ptSessions.filter(s => s.status === 'completed').length,
    cancelled: ptSessions.filter(s => s.status === 'cancelled').length,
  }), []);

  const filteredSessions = useMemo(() => {
    let filtered = [...ptSessions];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.memberName.toLowerCase().includes(query) ||
        s.trainerName.toLowerCase().includes(query)
      );
    }

    if (trainerFilter !== 'all') {
      filtered = filtered.filter(s => s.trainerId === trainerFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, trainerFilter, statusFilter]);

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredSessions.filter(s => s.date === dateStr);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const getStatusIcon = (status: PTSession['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleBookSession = () => {
    console.log('Booking session:', bookForm);
    setIsBookModalOpen(false);
    setBookForm({
      memberId: '',
      trainerId: '',
      date: '',
      time: '',
      duration: '60',
      sessionType: 'strength',
      notes: '',
    });
  };

  const weekDates = getWeekDates();
  const timeSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('ptSessions.title')}
        subtitle={t('ptSessions.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsBookModalOpen(true)}>
            {t('ptSessions.bookSession')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('ptSessions.totalSessions')}
          value={stats.total.toString()}
          icon={Calendar}
          iconColor="#547792"
        />
        <StatsCard
          title={t('ptSessions.scheduled')}
          value={stats.scheduled.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('ptSessions.completed')}
          value={stats.completed.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('ptSessions.cancelled')}
          value={stats.cancelled.toString()}
          icon={XCircle}
          iconColor="#ef4444"
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="w-64">
              <Input
                placeholder={t('ptSessions.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            <select
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('ptSessions.allTrainers')}</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.firstName} {trainer.lastName}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('ptSessions.allStatus')}</option>
              <option value="scheduled">{t('ptSessions.scheduled')}</option>
              <option value="completed">{t('ptSessions.completed')}</option>
              <option value="cancelled">{t('ptSessions.cancelled')}</option>
              <option value="no-show">{t('ptSessions.noShow')}</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              {t('ptSessions.list')}
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              {t('ptSessions.calendar')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-text-secondary" />
            </button>
            <h3 className="text-lg font-semibold text-text-primary">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="p-2 text-center text-text-muted text-sm">Time</div>
                {weekDates.map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`p-2 text-center rounded-lg ${isToday ? 'bg-accent-primary/20' : ''}`}
                    >
                      <p className="text-xs text-text-secondary">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p className={`text-lg font-semibold ${isToday ? 'text-accent-primary' : 'text-text-primary'}`}>
                        {date.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="space-y-1">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 gap-1">
                    <div className="p-2 text-right text-text-muted text-xs">{time}</div>
                    {weekDates.map((date, dateIndex) => {
                      const sessions = getSessionsForDate(date).filter(s => s.startTime.startsWith(time.split(':')[0]));
                      return (
                        <div
                          key={dateIndex}
                          className="min-h-[40px] p-1 bg-white/[0.05]/50 rounded border border-white/[0.08]"
                        >
                          {sessions.map(session => (
                            <button
                              key={session.id}
                              onClick={() => setSelectedSession(session)}
                              className="w-full text-left text-xs p-1 rounded truncate"
                              style={{
                                backgroundColor: `${getSessionStatusColor(session.status)}20`,
                                color: getSessionStatusColor(session.status),
                              }}
                            >
                              {session.memberName.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/[0.05]">
                <tr>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.dateTime')}</th>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.member')}</th>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.trainer')}</th>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.type')}</th>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.duration')}</th>
                  <th className="text-left p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.status')}</th>
                  <th className="text-right p-4 text-xs font-semibold text-text-secondary uppercase">{t('ptSessions.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredSessions.map((session) => (
                  <motion.tr
                    key={session.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.05]/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-text-muted" />
                        <div>
                          <p className="text-text-primary font-medium">{formatDate(session.date)}</p>
                          <p className="text-sm text-text-secondary">{session.startTime} - {session.endTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                          {profileImages[session.memberName] ? (
                            <img
                              src={profileImages[session.memberName]}
                              alt={session.memberName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            session.memberName.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <span className="text-text-primary font-medium">{session.memberName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-accent-primary" />
                        <span className="text-text-secondary">{session.trainerName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-text-secondary capitalize">
                        {session.sessionType}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">
                      {session.duration} min
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span style={{ color: getSessionStatusColor(session.status) }}>
                          {getStatusIcon(session.status)}
                        </span>
                        <span
                          className="px-2 py-1 rounded text-xs font-medium capitalize"
                          style={{
                            backgroundColor: `${getSessionStatusColor(session.status)}20`,
                            color: getSessionStatusColor(session.status),
                          }}
                        >
                          {session.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSession(session)}
                      >
                        {t('ptSessions.view')}
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSessions.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">{t('ptSessions.noSessions')}</p>
            </div>
          )}
        </Card>
      )}

      {/* Session Detail Modal */}
      {selectedSession && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSession(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">{t('ptSessions.sessionDetails')}</h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <span style={{ color: getSessionStatusColor(selectedSession.status) }}>
                    {getStatusIcon(selectedSession.status)}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                    style={{
                      backgroundColor: `${getSessionStatusColor(selectedSession.status)}20`,
                      color: getSessionStatusColor(selectedSession.status),
                    }}
                  >
                    {selectedSession.status}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-lg">
                  <Calendar className="h-5 w-5 text-accent-primary" />
                  <div>
                    <p className="text-text-primary font-medium">{formatDate(selectedSession.date)}</p>
                    <p className="text-sm text-text-secondary">{selectedSession.startTime} - {selectedSession.endTime}</p>
                  </div>
                </div>

                {/* Member & Trainer */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('ptSessions.member')}</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-text-secondary" />
                      <span className="text-text-primary">{selectedSession.memberName}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('ptSessions.trainer')}</p>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-accent-primary" />
                      <span className="text-text-primary">{selectedSession.trainerName}</span>
                    </div>
                  </div>
                </div>

                {/* Type & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('ptSessions.sessionType')}</p>
                    <p className="text-text-primary capitalize">{selectedSession.sessionType}</p>
                  </div>
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('ptSessions.duration')}</p>
                    <p className="text-text-primary">{selectedSession.duration} {t('ptSessions.minutes')}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <p className="text-xs text-text-muted mb-1">{t('ptSessions.location')}</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-primary">{selectedSession.location}</span>
                  </div>
                </div>

                {/* Notes */}
                {selectedSession.notes && (
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">{t('ptSessions.notes')}</p>
                    <p className="text-text-secondary text-sm">{selectedSession.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                {selectedSession.status === 'scheduled' && (
                  <>
                    <Button variant="outline" className="text-red-400 border-red-400/50">
                      {t('ptSessions.cancelSession')}
                    </Button>
                    <Button>
                      {t('ptSessions.markComplete')}
                    </Button>
                  </>
                )}
                {selectedSession.status !== 'scheduled' && (
                  <Button variant="outline" onClick={() => setSelectedSession(null)}>
                    {t('ptSessions.close')}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Book Session Modal */}
      {isBookModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsBookModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">{t('ptSessions.bookPtSession')}</h3>
                <button
                  onClick={() => setIsBookModalOpen(false)}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Member</label>
                  <select
                    value={bookForm.memberId}
                    onChange={(e) => setBookForm({ ...bookForm, memberId: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    <option value="">Select member...</option>
                    {gymMembers.filter(m => m.membershipStatus === 'active').map(member => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Trainer</label>
                  <select
                    value={bookForm.trainerId}
                    onChange={(e) => setBookForm({ ...bookForm, trainerId: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    <option value="">Select trainer...</option>
                    {trainers.filter(tr => tr.status === 'active').map(trainer => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.firstName} {trainer.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Date</label>
                    <input
                      type="date"
                      value={bookForm.date}
                      onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Time</label>
                    <input
                      type="time"
                      value={bookForm.time}
                      onChange={(e) => setBookForm({ ...bookForm, time: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Duration</label>
                    <select
                      value={bookForm.duration}
                      onChange={(e) => setBookForm({ ...bookForm, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Session Type</label>
                    <select
                      value={bookForm.sessionType}
                      onChange={(e) => setBookForm({ ...bookForm, sessionType: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      <option value="strength">Strength Training</option>
                      <option value="cardio">Cardio</option>
                      <option value="hiit">HIIT</option>
                      <option value="flexibility">Flexibility</option>
                      <option value="functional">Functional</option>
                      <option value="assessment">Assessment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Notes (optional)</label>
                  <textarea
                    value={bookForm.notes}
                    onChange={(e) => setBookForm({ ...bookForm, notes: e.target.value })}
                    placeholder="Any special instructions or focus areas..."
                    rows={3}
                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                <Button variant="outline" onClick={() => setIsBookModalOpen(false)}>
                  {t('ptSessions.cancel')}
                </Button>
                <Button
                  onClick={handleBookSession}
                  disabled={!bookForm.memberId || !bookForm.trainerId || !bookForm.date || !bookForm.time}
                >
                  {t('ptSessions.bookSession')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
