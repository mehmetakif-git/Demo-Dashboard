import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Download,
  RefreshCw,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  guests,
  guestStatuses,
  getGuestStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Registrations = () => {
  const { t } = useTranslation('events');
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const eventGuests = useMemo(() => {
    return guests.filter((g) => g.eventId === selectedEvent);
  }, [selectedEvent]);

  const filteredGuests = useMemo(() => {
    return eventGuests.filter((guest) => {
      const matchesSearch =
        guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [eventGuests, searchTerm, statusFilter]);

  const registrationStats = useMemo(() => {
    const total = eventGuests.length;
    const confirmed = eventGuests.filter((g) => g.status === 'confirmed').length;
    const pending = eventGuests.filter((g) => g.status === 'registered' || g.status === 'invited').length;
    const cancelled = eventGuests.filter((g) => g.status === 'cancelled').length;
    return { total, confirmed, pending, cancelled };
  }, [eventGuests]);

  const selectedEventData = events.find((e) => e.id === selectedEvent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('registrations.title')}
        subtitle={t('registrations.subtitle')}
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Download className="h-4 w-4" />
              {t('registrations.export')}
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Mail className="h-4 w-4" />
              {t('registrations.sendReminder')}
            </button>
          </div>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <label className="block text-sm text-[#64748b] mb-2">{t('registrations.selectEvent')}</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full max-w-md rounded-lg border border-white/[0.08] bg-[#1a1a24] px-4 py-2 text-white focus:border-[#547792] focus:outline-none"
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('registrations.totalRegistrations')}
          value={registrationStats.total.toString()}
          icon={Users}
          trend={{ value: selectedEventData ? t('registrations.ofExpected', { count: selectedEventData.expectedAttendees }) : '', type: 'neutral' }}
        />
        <StatsCard
          title={t('registrations.confirmed')}
          value={registrationStats.confirmed.toString()}
          icon={CheckCircle}
          trend={{ value: `${registrationStats.total > 0 ? ((registrationStats.confirmed / registrationStats.total) * 100).toFixed(0) : 0}%`, type: 'up' }}
        />
        <StatsCard
          title={t('registrations.pending')}
          value={registrationStats.pending.toString()}
          icon={Clock}
          trend={{ value: t('registrations.awaitingConfirmation'), type: 'neutral' }}
        />
        <StatsCard
          title={t('registrations.cancelled')}
          value={registrationStats.cancelled.toString()}
          icon={XCircle}
          trend={{ value: t('registrations.cancellations'), type: registrationStats.cancelled > 0 ? 'down' : 'neutral' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder={t('registrations.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('registrations.allStatus')}</option>
            {guestStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            {t('registrations.moreFilters')}
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('registrations.attendee')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('registrations.company')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('registrations.ticketType')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('registrations.status')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('registrations.registered')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-[#64748b]">{t('registrations.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => {
                  const statusColor = getGuestStatusColor(guest.status);
                  return (
                    <tr key={guest.id} className="hover:bg-[#1a1a24]">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{guest.firstName} {guest.lastName}</p>
                          <p className="text-xs text-[#64748b]">{guest.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{guest.company || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{guest.ticketType || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                          {guest.status === 'confirmed' && <CheckCircle className="h-3 w-3" />}
                          {guest.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                          {(guest.status === 'registered' || guest.status === 'invited') && <Clock className="h-3 w-3" />}
                          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{guest.registeredAt}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {guest.status !== 'confirmed' && guest.status !== 'cancelled' && (
                            <button className="rounded-lg p-2 text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#64748b]">
                    {t('registrations.noRegistrationsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <h4 className="text-white font-semibold mb-3">{t('registrations.bulkActions')}</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1a24] px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#1e1e2e]">
            <Mail className="h-4 w-4" />
            {t('registrations.sendReminderAll')}
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1a24] px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#1e1e2e]">
            <CheckCircle className="h-4 w-4" />
            {t('registrations.confirmAllPending')}
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1a24] px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#1e1e2e]">
            <Download className="h-4 w-4" />
            {t('registrations.exportAll')}
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          {t('registrations.showing', { filtered: filteredGuests.length, total: eventGuests.length })}
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('registrations.previous')}
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('registrations.next')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
