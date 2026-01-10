import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  Building,
  CheckCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  showings,
  getShowingStatusColor,
} from '@/data/realestate/realestateData';

export const Showings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredShowings = showings.filter((showing) => {
    const matchesSearch =
      showing.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showing.leadName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || showing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayShowings = showings.filter((s) => s.date === new Date().toISOString().split('T')[0]);
  const scheduledCount = showings.filter((s) => s.status === 'scheduled').length;
  const completedCount = showings.filter((s) => s.status === 'completed').length;
  const thisWeekShowings = showings.filter((s) => {
    const showingDate = new Date(s.date);
    const today = new Date();
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);
    return showingDate >= today && showingDate <= weekEnd;
  }).length;

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getShowingsForDay = (day: number) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return showings.filter((s) => s.date === dateStr);
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Showings"
        subtitle="Manage property showings and viewings"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Schedule Showing
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Showings"
          value={todayShowings.length}
          icon={Calendar}
          trend={{ value: "+2", type: "up" }}
        />
        <StatsCard
          title="This Week"
          value={thisWeekShowings}
          icon={Clock}
          trend={{ value: "+5", type: "up" }}
        />
        <StatsCard
          title="Scheduled"
          value={scheduledCount}
          icon={CheckCircle}
          iconColor="text-blue-400"
        />
        <StatsCard
          title="Completed"
          value={completedCount}
          icon={CheckCircle}
          iconColor="text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs text-[#64748b] py-2">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const dayShowings = day ? getShowingsForDay(day) : [];
              const isToday = day === new Date().getDate() &&
                selectedDate.getMonth() === new Date().getMonth() &&
                selectedDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-1 border border-white/[0.08] rounded-lg ${
                    day ? 'hover:border-[#2e2e3e] cursor-pointer' : 'bg-[#0a0a0f]'
                  } ${isToday ? 'border-[#547792]/50' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-xs text-right p-1 ${isToday ? 'text-[#547792] font-bold' : 'text-[#64748b]'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayShowings.slice(0, 2).map((showing) => (
                          <div
                            key={showing.id}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              showing.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                              showing.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {showing.startTime}
                          </div>
                        ))}
                        {dayShowings.length > 2 && (
                          <div className="text-xs text-[#64748b] text-center">
                            +{dayShowings.length - 2} more
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

        {/* Today's Panel */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Today's Showings</h3>
            {todayShowings.length > 0 ? (
              <div className="space-y-3">
                {todayShowings.map((showing) => (
                  <div key={showing.id} className="p-3 rounded-lg bg-[#1a1a24]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{showing.startTime} - {showing.endTime}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getShowingStatusColor(showing.status)}`}>
                        {showing.status}
                      </span>
                    </div>
                    <div className="text-sm text-[#94a3b8] truncate">{showing.propertyAddress}</div>
                    <div className="text-xs text-[#64748b] mt-1">{showing.leadName}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#64748b] text-center py-4">No showings scheduled for today</p>
            )}
          </div>

          {/* Quick Filters */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Filter</h3>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Search showings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Showings List */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.08]">
          <h3 className="text-lg font-semibold text-white">All Showings</h3>
        </div>
        <div className="divide-y divide-[#1e1e2e]">
          {filteredShowings.map((showing) => (
            <motion.div
              key={showing.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-[#1a1a24] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-12 w-16 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                    <Building className="h-6 w-6 text-[#2e2e3e]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{showing.propertyAddress}</div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#64748b]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {showing.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {showing.startTime} - {showing.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#94a3b8]">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {showing.leadName}
                      </span>
                      <span>Agent: {showing.agentName}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getShowingStatusColor(showing.status)}`}>
                    {showing.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    showing.type === 'private' ? 'bg-[#547792]/20 text-[#547792]' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {showing.type === 'private' ? 'Private' : 'Open House'}
                  </span>
                </div>
              </div>

              {/* Feedback (for completed showings) */}
              {showing.feedback && (
                <div className="mt-4 p-3 rounded-lg bg-[#1a1a24] border-l-2 border-[#547792]">
                  <div className="flex items-center gap-2 text-xs text-[#64748b] mb-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Feedback
                  </div>
                  <p className="text-sm text-[#94a3b8]">{showing.feedback}</p>
                  {showing.interestLevel && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-[#64748b]">Interest Level:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-6 rounded ${
                              level <= showing.interestLevel! ? 'bg-[#547792]' : 'bg-[#2e2e3e]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
