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

type TabType = 'overview' | 'agenda' | 'guests' | 'vendors' | 'budget' | 'team';

export const EventDetail = () => {
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
        <p className="text-[#64748b] mb-4">Event not found</p>
        <button
          onClick={() => navigate('/dashboard/events/events')}
          className="text-[#6366f1] hover:underline"
        >
          Back to Events
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

  const ticketRevenue = event.ticketTypes.reduce((sum, t) => sum + t.price * t.sold, 0);
  const sponsorRevenue = event.sponsors.reduce((sum, s) => sum + s.amount, 0);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'guests', label: 'Guests' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'budget', label: 'Budget' },
    { id: 'team', label: 'Team' },
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
          Back to Events
        </button>
      </div>

      {/* Header */}
      <PageHeader
        title={event.name}
        subtitle={`${eventTypes.find(t => t.id === event.type)?.name || event.type} - ${event.category}`}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}>
              {getStatusIcon(event.status)}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              Edit Event
            </button>
          </div>
        }
      />

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Registered"
          value={event.registeredAttendees.toString()}
          icon={Users}
          trend={{ value: `of ${event.expectedAttendees} expected`, type: 'neutral' }}
        />
        <StatsCard
          title="Checked In"
          value={event.checkedIn.toString()}
          icon={CheckCircle}
          trend={{
            value: event.registeredAttendees > 0
              ? `${((event.checkedIn / event.registeredAttendees) * 100).toFixed(0)}% attendance`
              : '0% attendance',
            type: 'up'
          }}
        />
        <StatsCard
          title="Budget"
          value={formatCurrency(event.budget.estimated)}
          icon={DollarSign}
          trend={{ value: `${formatCurrency(event.budget.actual)} spent`, type: 'neutral' }}
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(event.budget.revenue)}
          icon={Ticket}
          trend={{
            value: event.budget.profit > 0
              ? `+${formatCurrency(event.budget.profit)} profit`
              : formatCurrency(event.budget.profit),
            type: event.budget.profit >= 0 ? 'up' : 'down'
          }}
        />
      </div>

      {/* Date and Venue Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#6366f1]" />
            Event Dates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Event Date(s)</span>
              <span className="text-white">
                {event.dates.start === event.dates.end
                  ? event.dates.start
                  : `${event.dates.start} - ${event.dates.end}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Setup Starts</span>
              <span className="text-white">{event.dates.setupStart}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Teardown Ends</span>
              <span className="text-white">{event.dates.teardownEnd}</span>
            </div>
            {event.times.doorsOpen && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">Doors Open</span>
                <span className="text-white">{event.times.doorsOpen}</span>
              </div>
            )}
            {event.times.eventStart && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">Event Starts</span>
                <span className="text-white">{event.times.eventStart}</span>
              </div>
            )}
            {event.times.eventEnd && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">Event Ends</span>
                <span className="text-white">{event.times.eventEnd}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#6366f1]" />
            Venue
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Venue Name</span>
              <span className="text-white">{event.venue.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Address</span>
              <span className="text-white text-right max-w-[200px]">{event.venue.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Capacity</span>
              <span className="text-white">{event.venue.capacity.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e1e2e]">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#6366f1] border-[#6366f1]'
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
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
              <p className="text-[#94a3b8]">{event.description}</p>
            </div>

            {/* Client Info */}
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Building className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">Company</p>
                    <p className="text-white">{event.client.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <User className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">Contact</p>
                    <p className="text-white">{event.client.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Mail className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">Email</p>
                    <p className="text-white">{event.client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                    <Phone className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748b]">Phone</p>
                    <p className="text-white">{event.client.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            {event.ticketTypes.length > 0 && (
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ticket Sales</h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket, index) => {
                    const progress = ticket.quantity > 0 ? (ticket.sold / ticket.quantity) * 100 : 0;
                    return (
                      <div key={index} className="p-4 rounded-lg bg-[#1a1a24]">
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{ticket.name}</span>
                          <span className="text-[#6366f1] font-semibold">{formatCurrency(ticket.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[#64748b] mb-2">
                          <span>{ticket.sold} sold</span>
                          <span>{ticket.quantity} available</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1e1e2e]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
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
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Sponsors</h3>
                <div className="space-y-3">
                  {event.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]">
                      <div>
                        <p className="text-white font-medium">{sponsor.name}</p>
                        <p className="text-xs text-[#64748b]">{sponsor.level}</p>
                      </div>
                      <span className="text-[#6366f1] font-semibold">{formatCurrency(sponsor.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-[#1e1e2e] flex justify-between">
                    <span className="text-[#64748b]">Total Sponsorship</span>
                    <span className="text-white font-semibold">{formatCurrency(sponsorRevenue)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <Users className="h-6 w-6 text-[#6366f1]" />
                  <span className="text-xs text-[#94a3b8]">Guest List</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <Ticket className="h-6 w-6 text-[#8b5cf6]" />
                  <span className="text-xs text-[#94a3b8]">Tickets</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <FileText className="h-6 w-6 text-emerald-400" />
                  <span className="text-xs text-[#94a3b8]">Reports</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                  <CalendarDays className="h-6 w-6 text-amber-400" />
                  <span className="text-xs text-[#94a3b8]">Schedule</span>
                </button>
              </div>
            </div>

            {/* Notes */}
            {event.notes && (
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                <p className="text-[#94a3b8]">{event.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'agenda' && (
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Event Agenda</h3>
          {event.agenda && event.agenda.length > 0 ? (
            <div className="space-y-4">
              {event.agenda.map((day) => (
                <div key={day.day} className="p-4 rounded-lg bg-[#1a1a24]">
                  <h4 className="text-white font-medium mb-3">Day {day.day}</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-[#64748b]">Sessions</p>
                      <p className="text-white font-semibold">{day.sessions}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">Keynotes</p>
                      <p className="text-white font-semibold">{day.keynotes}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">Workshops</p>
                      <p className="text-white font-semibold">{day.workshops}</p>
                    </div>
                    <div>
                      <p className="text-[#64748b]">Networking</p>
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1]/20">
                    <CalendarDays className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.name}</p>
                    <p className="text-sm text-[#64748b]">Day {activity.day} - {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b]">No agenda items available.</p>
          )}
        </div>
      )}

      {activeTab === 'guests' && (
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden">
          <div className="p-6 border-b border-[#1e1e2e]">
            <h3 className="text-lg font-semibold text-white">Guest List</h3>
            <p className="text-sm text-[#64748b]">{eventGuests.length} guests registered</p>
          </div>
          {eventGuests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Dietary</th>
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
            <div className="p-6 text-center text-[#64748b]">No guests registered for this event.</div>
          )}
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventVendorsList.length > 0 ? (
            eventVendorsList.map((vendor) => (
              <div key={vendor.id} className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
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
                <div className="mt-4 pt-4 border-t border-[#1e1e2e]">
                  <p className="text-xs text-[#64748b] mb-2">Services</p>
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
              No vendors assigned to this event.
            </div>
          )}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <p className="text-[#64748b] text-sm mb-1">Estimated Budget</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(event.budget.estimated)}</p>
            </div>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <p className="text-[#64748b] text-sm mb-1">Actual Spent</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(event.budget.actual)}</p>
            </div>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <p className="text-[#64748b] text-sm mb-1">Revenue</p>
              <p className="text-2xl font-bold text-emerald-400">{formatCurrency(event.budget.revenue)}</p>
            </div>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <p className="text-[#64748b] text-sm mb-1">Profit/Loss</p>
              <p className={`text-2xl font-bold ${event.budget.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {event.budget.profit >= 0 ? '+' : ''}{formatCurrency(event.budget.profit)}
              </p>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">Ticket Sales</p>
                <p className="text-xl font-bold text-white">{formatCurrency(ticketRevenue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">Sponsorships</p>
                <p className="text-xl font-bold text-white">{formatCurrency(sponsorRevenue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#64748b] text-sm mb-1">Other</p>
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
            <div key={member.id} className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold">{member.name}</p>
                  <p className="text-sm text-[#64748b]">{member.role}</p>
                </div>
              </div>
              {member.name === event.eventManager && (
                <span className="mt-4 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#6366f1]/20 text-[#6366f1]">
                  <CheckCircle className="h-3 w-3" />
                  Event Manager
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
