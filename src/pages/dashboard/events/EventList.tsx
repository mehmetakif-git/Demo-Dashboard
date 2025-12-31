import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  MoreHorizontal,
  CalendarDays,
  Users,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Grid3X3,
  List,
  Heart,
  Sparkles,
  Music,
  Trophy,
  Mountain,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  eventTypes,
  eventStatuses,
  eventsStats,
  formatCurrency,
  formatNumber,
  getEventStatusColor,
  getEventTypeColor,
} from '@/data/events/eventsData';

export const EventList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.client.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesType && matchesCategory;
    });
  }, [searchTerm, statusFilter, typeFilter, categoryFilter]);

  const categories = [...new Set(events.map((e) => e.category))];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding':
        return <Heart className="h-5 w-5" />;
      case 'gala':
        return <Sparkles className="h-5 w-5" />;
      case 'festival':
        return <Music className="h-5 w-5" />;
      case 'competition':
        return <Trophy className="h-5 w-5" />;
      case 'retreat':
        return <Mountain className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      case 'cancelled':
      case 'postponed':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title="Events"
        subtitle="Plan and manage all your events"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Upcoming Events"
          value={eventsStats.upcomingEvents.toString()}
          icon={CalendarDays}
          trend={{ value: `${eventsStats.upcomingThisMonth} this month`, type: 'up' }}
        />
        <StatsCard
          title="Active Now"
          value={eventsStats.activeEvents.toString()}
          icon={CheckCircle}
          trend={{ value: 'Currently running', type: 'up' }}
        />
        <StatsCard
          title="Guests Registered"
          value={formatNumber(eventsStats.totalGuests.registered)}
          icon={Users}
          trend={{ value: `${eventsStats.avgAttendanceRate}% attendance rate`, type: 'up' }}
        />
        <StatsCard
          title="Revenue This Month"
          value={formatCurrency(eventsStats.totalRevenue.thisMonth)}
          icon={DollarSign}
          trend={{ value: '+15% vs last month', type: 'up' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#6366f1] focus:outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Status</option>
            {eventStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Types</option>
            {eventTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
          <div className="flex rounded-lg border border-[#1e1e2e] bg-[#12121a] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-[#6366f1] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === 'list' ? 'bg-[#6366f1] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => {
            const statusColor = getEventStatusColor(event.status);
            const typeColor = getEventTypeColor(event.type);
            const budgetProgress = event.budget.estimated > 0
              ? (event.budget.actual / event.budget.estimated) * 100
              : 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden hover:border-[#6366f1]/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/dashboard/events/events/${event.id}`)}
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-[#1a1a24] flex items-center justify-center relative">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                  >
                    {getTypeIcon(event.type)}
                  </div>
                  <span className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                    {getStatusIcon(event.status)}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <span
                    className="absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                  >
                    {eventTypes.find(t => t.id === event.type)?.name || event.type}
                  </span>
                </div>

                {/* Event Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-lg mb-1 truncate">{event.name}</h3>
                  <p className="text-xs text-[#64748b] mb-3">{event.client.name}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-[#64748b]" />
                      <span className="text-[#94a3b8]">
                        {event.dates.start === event.dates.end
                          ? event.dates.start
                          : `${event.dates.start} - ${event.dates.end}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-[#64748b]" />
                      <span className="text-[#94a3b8] truncate">{event.venue.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-[#64748b]" />
                      <span className="text-[#94a3b8]">
                        {event.registeredAttendees} / {event.expectedAttendees} attendees
                      </span>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="pt-3 border-t border-[#1e1e2e]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#64748b]">Budget</span>
                      <span className="text-white">{formatCurrency(event.budget.estimated)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1e1e2e]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                        style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#1e1e2e]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/events/events/${event.id}`);
                      }}
                      className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Events List View */}
      {viewMode === 'list' && (
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Venue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Attendees
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2e]">
                {filteredEvents.map((event) => {
                  const statusColor = getEventStatusColor(event.status);
                  const typeColor = getEventTypeColor(event.type);

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-[#1a1a24] transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/events/events/${event.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                          >
                            {getTypeIcon(event.type)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{event.name}</p>
                            <p className="text-xs text-[#64748b]">{event.client.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                        >
                          {eventTypes.find(t => t.id === event.type)?.name || event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{event.dates.start}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{event.venue.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">{event.registeredAttendees}</span>
                        <span className="text-[#64748b]"> / {event.expectedAttendees}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                          {getStatusIcon(event.status)}
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/events/events/${event.id}`);
                            }}
                            className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Showing {filteredEvents.length} of {events.length} events
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Previous
          </button>
          <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};
