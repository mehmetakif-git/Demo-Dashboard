import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Users,
  CheckCircle,
  UserCheck,
  AlertCircle,
  Download,
  Upload,
  QrCode,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  guests,
  guestStatuses,
  getGuestStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Guests = () => {
  const { t } = useTranslation('events');
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [checkInMode, setCheckInMode] = useState(false);

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

  const guestStats = useMemo(() => {
    const total = eventGuests.length;
    const checkedIn = eventGuests.filter((g) => g.checkedIn).length;
    const vip = eventGuests.filter((g) => g.tags.includes('vip')).length;
    const withDietary = eventGuests.filter((g) => g.dietaryRestrictions && g.dietaryRestrictions !== 'None').length;
    return { total, checkedIn, vip, withDietary };
  }, [eventGuests]);

  const handleCheckIn = (guestId: string) => {
    // In real app, this would update the guest status
    console.log('Check in guest:', guestId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('guests.title')}
        subtitle={t('guests.subtitle')}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => setCheckInMode(!checkInMode)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                checkInMode
                  ? 'bg-emerald-500 text-white'
                  : 'border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-[#94a3b8] hover:bg-[#1a1a24]'
              }`}
            >
              <QrCode className="h-4 w-4" />
              {t('guests.checkInMode')}
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" />
              {t('guests.addGuest')}
            </button>
          </div>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <label className="block text-sm text-[#64748b] mb-2">{t('guests.selectEvent')}</label>
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
          title={t('guests.totalGuests')}
          value={guestStats.total.toString()}
          icon={Users}
          trend={{ value: t('guests.registeredLabel'), type: 'neutral' }}
        />
        <StatsCard
          title={t('guests.checkedIn')}
          value={guestStats.checkedIn.toString()}
          icon={UserCheck}
          trend={{ value: t('guests.attendance', { percent: guestStats.total > 0 ? ((guestStats.checkedIn / guestStats.total) * 100).toFixed(0) : 0 }), type: 'up' }}
        />
        <StatsCard
          title={t('guests.vipGuests')}
          value={guestStats.vip.toString()}
          icon={CheckCircle}
          trend={{ value: t('guests.specialGuests'), type: 'neutral' }}
        />
        <StatsCard
          title={t('guests.dietaryRequests')}
          value={guestStats.withDietary.toString()}
          icon={AlertCircle}
          trend={{ value: t('guests.specialRequirements'), type: 'neutral' }}
        />
      </div>

      {/* Check-In Mode Panel */}
      {checkInMode && (
        <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{t('guests.checkInModeActive')}</h3>
              <p className="text-sm text-[#94a3b8]">{t('guests.checkInModeDesc')}</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748b]" />
            <input
              type="text"
              placeholder={t('guests.searchByNameOrEmail')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-emerald-500/50 bg-white/[0.03] backdrop-blur-xl py-3 pl-12 pr-4 text-lg text-white placeholder-[#64748b] focus:border-emerald-500 focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Filters */}
      {!checkInMode && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
            <input
              type="text"
              placeholder={t('guests.searchGuests')}
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
              <option value="all">{t('guests.allStatus')}</option>
              {guestStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              <Filter className="h-4 w-4" />
              {t('guests.moreFilters')}
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              <Upload className="h-4 w-4" />
              {t('guests.import')}
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              <Download className="h-4 w-4" />
              {t('guests.export')}
            </button>
          </div>
        </div>
      )}

      {/* Guests Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.guest')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.companyTitle')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.ticket')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.table')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.dietary')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.tags')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('guests.status')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-[#64748b]">{t('guests.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => {
                  const statusColor = getGuestStatusColor(guest.status);
                  return (
                    <tr key={guest.id} className="hover:bg-[#1a1a24]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] text-white text-sm font-semibold">
                            {guest.firstName[0]}{guest.lastName[0]}
                          </div>
                          <div>
                            <p className="text-white font-medium">{guest.firstName} {guest.lastName}</p>
                            <p className="text-xs text-[#64748b]">{guest.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-[#94a3b8]">{guest.company || '-'}</p>
                          <p className="text-xs text-[#64748b]">{guest.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{guest.ticketType || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{guest.tableNumber || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        {guest.dietaryRestrictions && guest.dietaryRestrictions !== 'None' ? (
                          <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-400">
                            {guest.dietaryRestrictions}
                          </span>
                        ) : (
                          <span className="text-[#64748b]">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {guest.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                tag === 'vip'
                                  ? 'bg-[#547792]/20 text-[#547792]'
                                  : 'bg-[#1e1e2e] text-[#94a3b8]'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                          {guest.checkedIn && <CheckCircle className="h-3 w-3" />}
                          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {!guest.checkedIn && (
                            <button
                              onClick={() => handleCheckIn(guest.id)}
                              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
                            >
                              {t('guests.checkIn')}
                            </button>
                          )}
                          {guest.checkedIn && (
                            <span className="text-xs text-emerald-400">
                              {guest.checkedInAt ? new Date(guest.checkedInAt).toLocaleTimeString() : t('guests.checkedInLabel')}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#64748b]">
                    {t('guests.noGuestsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          {t('guests.showing', { filtered: filteredGuests.length, total: eventGuests.length })}
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('guests.previous')}
          </button>
          <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            {t('guests.next')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
