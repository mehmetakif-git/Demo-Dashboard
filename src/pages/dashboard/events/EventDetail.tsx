import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  CalendarDays,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Ticket,
  Building,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  eventTypes,
  eventVendors,
  guests,
  formatCurrency,
  getEventStatusColor,
  getGuestStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

type TabType = 'overview' | 'agenda' | 'guests' | 'vendors' | 'budget' | 'team';

export const EventDetail = () => {
  const { t } = useTranslation('events');
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const event = useMemo(() => {
    return events.find((e) => e.id === id);
  }, [id]);

  const eventGuests = useMemo(() => {
    return guests.filter((g) => g.eventId === id);
  }, [id]);

  const eventVendorsList = useMemo(() => {
    if (!event) return [];
    return eventVendors.filter((v) => event.vendors.includes(v.id));
  }, [event]);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#64748b] mb-4">{t('eventDetail.eventNotFound')}</p>
        <button
          onClick={() => navigate('/dashboard/events/events')}
          className="text-[#547792] hover:underline"
        >
          {t('eventDetail.backToEvents')}
        </button>
      </div>
    );
  }

  const statusColor = getEventStatusColor(event.status);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
      case 'postponed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const ticketRevenue = event.ticketTypes.reduce((sum, tt) => sum + tt.price * tt.sold, 0);
  const sponsorRevenue = event.sponsors.reduce((sum, s) => sum + s.amount, 0);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: t('eventDetail.overview') },
    { id: 'agenda', label: t('eventDetail.agenda') },
    { id: 'guests', label: t('eventDetail.guests') },
    { id: 'vendors', label: t('eventDetail.vendors') },
    { id: 'budget', label: t('eventDetail.budget') },
    { id: 'team', label: t('eventDetail.team') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/events/events')}
          className="flex items-center gap-2 text-[#64748b] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('eventDetail.backToEvents')}
        </button>
      </div>

      {/* Header */}
      <PageHeader
        title={event.name}
        subtitle={`${eventTypes.find(et => et.id === event.type)?.name || event.type} - ${event.category}`}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}>
              {getStatusIcon(event.status)}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              {t('eventDetail.editEvent')}
            </button>
          </div>
        }
      />

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('eventDetail.registered')}
          value={event.registeredAttendees.toString()}
          icon={Users}
          trend={{ value: t('eventDetail.ofExpected', { count: event.expectedAttendees }), type: 'neutral' }}
        />
        <StatsCard
          title={t('eventDetail.checkedIn')}
          value={event.checkedIn.toString()}
          icon={CheckCircle}
          trend={{
            value: event.registeredAttendees > 0
              ? t('eventDetail.attendance', { percent: ((event.checkedIn / event.registeredAttendees) * 100).toFixed(0) })
              : t('eventDetail.attendance', { percent: 0 }),
            type: 'up'
          }}
        />
        <StatsCard
          title={t('eventDetail.budget')}
          value={formatCurrency(event.budget.estimated)}
          icon={DollarSign}
          trend={{ value: t('eventDetail.spentAmount', { amount: formatCurrency(event.budget.actual) }), type: 'neutral' }}
        />
        <StatsCard
          title={t('eventDetail.revenue')}
          value={formatCurrency(event.budget.revenue)}
          icon={Ticket}
          trend={{
            value: event.budget.profit > 0
              ? t('eventDetail.profit', { amount: formatCurrency(event.budget.profit) })
              : formatCurrency(event.budget.profit),
            type: event.budget.profit >= 0 ? 'up' : 'down'
          }}
        />
      </div>

      {/* Date and Venue Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#547792]" />
            {t('eventDetail.eventDates')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.eventDateRange')}</span>
              <span className="text-white">
                {event.dates.start === event.dates.end
                  ? event.dates.start
                  : `${event.dates.start} - ${event.dates.end}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.setupStarts')}</span>
              <span className="text-white">{event.dates.setupStart}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.teardownEnds')}</span>
              <span className="text-white">{event.dates.teardownEnd}</span>
            </div>
            {event.times.doorsOpen && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('eventDetail.doorsOpen')}</span>
                <span className="text-white">{event.times.doorsOpen}</span>
              </div>
            )}
            {event.times.eventStart && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('eventDetail.eventStarts')}</span>
                <span className="text-white">{event.times.eventStart}</span>
              </div>
            )}
            {event.times.eventEnd && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('eventDetail.eventEnds')}</span>
                <span className="text-white">{event.times.eventEnd}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#547792]" />
            {t('eventDetail.venue')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.venueName')}</span>
              <span className="text-white">{event.venue.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.address')}</span>
              <span className="text-white text-right max-w-[200px]">{event.venue.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">{t('eventDetail.capacity')}</span>
              <span className="text-white">{event.venue.capacity.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.08]">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#547792] border-[#547792]'
                  : 'text-[#64748b] border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.description')}</h3>
              <p className="text-[#94a3b8]">{event.description}</p>
            </div>

            {/* Client Info */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.clientInformation')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Building className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">{t('eventDetail.company')}</p>
                    <p className="text-white">{event.client.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <User className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">{t('eventDetail.contact')}</p>
                    <p className="text-white">{event.client.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Mail className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">{t('eventDetail.email')}</p>
                    <p className="text-white">{event.client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Phone className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">{t('eventDetail.phone')}</p>
                    <p className="text-white">{event.client.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            {event.ticketTypes.length > 0 && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.ticketSales')}</h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket, index) => {
                    const progress = ticket.quantity > 0 ? (ticket.sold / ticket.quantity) * 100 : 0;
                    return (
                      <div key={index} className="p-4 rounded-lg bg-[#1a1a24]">
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{ticket.name}</span>
                          <span className="text-[#547792] font-semibold">{formatCurrency(ticket.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[#64748b] mb-2">
                          <span>{t('eventDetail.sold', { count: ticket.sold })}</span>
                          <span>{t('eventDetail.available', { count: ticket.quantity })}</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1e1e2e]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#547792] to-[#94B4C1]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Sponsors */}
            {event.sponsors.length > 0 && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.sponsors')}</h3>
                <div className="space-y-3">
                  {event.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]">
                      <div>
                        <p className="text-white font-medium">{sponsor.name}</p>
                        <p className="text-xs text-[#64748b]">{sponsor.level}</p>
                      </div>
                      <span className="text-[#547792] font-semibold">{formatCurrency(sponsor.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/[0.08] flex justify-between">
                    <span className="text-[#64748b]">{t('eventDetail.totalSponsorship')}</span>
                    <span className="text-white font-semibold">{formatCurrency(sponsorRevenue)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.quickActions')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <Users className="h-6 w-6 text-[#547792]" />
                  <span className="text-xs text-[#94a3b8]">{t('eventDetail.guestList')}</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <Ticket className="h-6 w-6 text-[#94B4C1]" />
                  <span className="text-xs text-[#94a3b8]">{t('eventDetail.tickets')}</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <FileText className="h-6 w-6 text-emerald-400" />
                  <span className="text-xs text-[#94a3b8]">{t('eventDetail.reports')}</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <CalendarDays className="h-6 w-6 text-amber-400" />
                  <span className="text-xs text-[#94a3b8]">{t('eventDetail.schedule')}</span>
                </button>
              </div>
            </div>

            {/* Notes */}
            {event.notes && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.notes')}</h3>
                <p className="text-[#94a3b8]">{event.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'agenda' && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.eventAgenda')}</h3>
          {event.agenda && event.agenda.length > 0 ? (
            <div className="space-y-4">
              {event.agenda.map((day) => (
                <div key={day.day} className="p-4 rounded-lg bg-[#1a1a24]">
                  <h4 className="text-white font-medium mb-3">{t('eventDetail.day', { number: day.day })}</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-[#64748b]">{t('eventDetail.sessions')}</p>
                      <p className="text-white font-semibold">{day.sessions}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">{t('eventDetail.keynotes')}</p>
                      <p className="text-white font-semibold">{day.keynotes}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">{t('eventDetail.workshops')}</p>
                      <p className="text-white font-semibold">{day.workshops}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">{t('eventDetail.networking')}</p>
                      <p className="text-white font-semibold">{day.networking}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : event.activities && event.activities.length > 0 ? (
            <div className="space-y-3">
              {event.activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-[#1a1a24]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#547792]/20">
                    <CalendarDays className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.name}</p>
                    <p className="text-sm text-[#64748b]">{t('eventDetail.day', { number: activity.day })} - {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b]">{t('eventDetail.noAgendaItems')}</p>
          )}
        </div>
      )}

      {activeTab === 'guests' && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.08]">
            <h3 className="text-lg font-semibold text-white">{t('eventDetail.guestListTitle')}</h3>
            <p className="text-sm text-[#64748b]">{t('eventDetail.guestsRegistered', { count: eventGuests.length })}</p>
          </div>
          {eventGuests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">{t('eventDetail.guest')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">{t('eventDetail.company')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">{t('eventDetail.ticketCol')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">{t('eventDetail.status')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">{t('eventDetail.dietary')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2e]">
                  {eventGuests.map((guest) => {
                    const guestStatusColor = getGuestStatusColor(guest.status);
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
                          <span className="text-[#94a3b8]">{guest.ticketType || '-'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${guestStatusColor}`}>
                            {guest.checkedIn && <CheckCircle className="h-3 w-3" />}
                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[#94a3b8]">{guest.dietaryRestrictions || 'None'}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-[#64748b]">{t('eventDetail.noGuestsRegistered')}</div>
          )}
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventVendorsList.length > 0 ? (
            eventVendorsList.map((vendor) => (
              <div key={vendor.id} className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold">{vendor.name}</h4>
                    <p className="text-sm text-[#64748b]">{vendor.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    vendor.status === 'preferred'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#64748b]" />
                    <span className="text-[#94a3b8]">{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#64748b]" />
                    <span className="text-[#94a3b8]">{vendor.contact.email}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.08]">
                  <p className="text-xs text-[#64748b] mb-2">{t('eventDetail.services')}</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-[#1a1a24] text-[#94a3b8]">
                        {service}
                      </span>
                    ))}
                    {vendor.services.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#1a1a24] text-[#64748b]">
                        +{vendor.services.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-[#64748b]">
              {t('eventDetail.noVendorsAssigned')}
            </div>
          )}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.estimatedBudget')}</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(event.budget.estimated)}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.actualSpent')}</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(event.budget.actual)}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.revenue')}</p>
              <p className="text-2xl font-bold text-emerald-400">{formatCurrency(event.budget.revenue)}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.profitLoss')}</p>
              <p className={`text-2xl font-bold ${event.budget.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {event.budget.profit >= 0 ? '+' : ''}{formatCurrency(event.budget.profit)}
              </p>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('eventDetail.revenueBreakdown')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.ticketSalesRevenue')}</p>
                <p className="text-xl font-bold text-white">{formatCurrency(ticketRevenue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.sponsorshipsRevenue')}</p>
                <p className="text-xl font-bold text-white">{formatCurrency(sponsorRevenue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">{t('eventDetail.other')}</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(event.budget.revenue - ticketRevenue - sponsorRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {event.team.map((member) => (
            <div key={member.id} className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold">{member.name}</p>
                  <p className="text-sm text-[#64748b]">{member.role}</p>
                </div>
              </div>
              {member.name === event.eventManager && (
                <span className="mt-4 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#547792]/20 text-[#547792]">
                  <CheckCircle className="h-3 w-3" />
                  {t('eventDetail.eventManager')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
