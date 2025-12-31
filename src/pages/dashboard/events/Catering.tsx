import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Users,
  Clock,
  AlertCircle,
  FileText,
  Coffee,
  Salad,
  Pizza,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  guests,
  eventVendors,
} from '@/data/events/eventsData';

export const Catering = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');

  const selectedEventData = useMemo(() => {
    return events.find((e) => e.id === selectedEvent);
  }, [selectedEvent]);

  const eventGuests = useMemo(() => {
    return guests.filter((g) => g.eventId === selectedEvent);
  }, [selectedEvent]);

  const cateringProvider = useMemo(() => {
    const cateringInfo = selectedEventData?.catering;
    if (!cateringInfo?.provider) return null;
    return eventVendors.find((v) =>
      v.id === cateringInfo.provider ||
      v.name.toLowerCase().includes(cateringInfo.provider.toLowerCase())
    );
  }, [selectedEventData]);

  const dietaryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    eventGuests.forEach((guest) => {
      const restriction = guest.dietaryRestrictions || 'None';
      breakdown[restriction] = (breakdown[restriction] || 0) + 1;
    });
    return breakdown;
  }, [eventGuests]);

  // Mock meal schedule
  const mealSchedule = selectedEventData?.catering?.mealsIncluded || [];

  const getMealIcon = (meal: string) => {
    switch (meal.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="h-5 w-5" />;
      case 'lunch':
        return <Pizza className="h-5 w-5" />;
      case 'dinner':
        return <UtensilsCrossed className="h-5 w-5" />;
      default:
        return <Salad className="h-5 w-5" />;
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
        title="Catering"
        subtitle="Manage event catering and dietary requirements"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <FileText className="h-4 w-4" />
            Generate BEO
          </button>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
        <label className="block text-sm text-[#64748b] mb-2">Select Event</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full max-w-md rounded-lg border border-[#1e1e2e] bg-[#1a1a24] px-4 py-2 text-white focus:border-[#6366f1] focus:outline-none"
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
          title="Expected Guests"
          value={selectedEventData?.expectedAttendees.toString() || '0'}
          icon={Users}
          trend={{ value: `${eventGuests.length} registered`, type: 'neutral' }}
        />
        <StatsCard
          title="Meals Included"
          value={mealSchedule.length.toString()}
          icon={UtensilsCrossed}
          trend={{ value: mealSchedule.join(', ') || 'None', type: 'neutral' }}
        />
        <StatsCard
          title="Dietary Options"
          value={selectedEventData?.catering?.dietaryOptions?.length.toString() || '0'}
          icon={Salad}
          trend={{ value: 'Available options', type: 'neutral' }}
        />
        <StatsCard
          title="Special Requests"
          value={Object.keys(dietaryBreakdown).filter(k => k !== 'None').length.toString()}
          icon={AlertCircle}
          trend={{ value: 'Dietary restrictions', type: 'neutral' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catering Provider */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Info */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-[#6366f1]" />
              Catering Provider
            </h3>
            {cateringProvider ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20">
                    <UtensilsCrossed className="h-7 w-7 text-[#6366f1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{cateringProvider.name}</h4>
                    <p className="text-sm text-[#64748b]">{cateringProvider.contact.email}</p>
                    <p className="text-sm text-[#64748b]">{cateringProvider.contact.phone}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#1e1e2e]">
                  <p className="text-sm text-[#64748b] mb-2">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {cateringProvider.services.map((service, index) => (
                      <span key={index} className="rounded-full bg-[#1a1a24] px-3 py-1 text-xs text-[#94a3b8]">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedEventData?.catering?.provider ? (
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white font-medium">{selectedEventData.catering.provider}</p>
                <p className="text-sm text-[#64748b]">Provider details not in database</p>
              </div>
            ) : (
              <p className="text-[#64748b]">No catering provider assigned.</p>
            )}
          </div>

          {/* Meal Schedule */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#6366f1]" />
              Meal Schedule
            </h3>
            {mealSchedule.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mealSchedule.map((meal, index) => (
                  <div key={index} className="rounded-lg bg-[#1a1a24] p-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6366f1]/20 text-[#6366f1] mx-auto mb-3">
                      {getMealIcon(meal)}
                    </div>
                    <h4 className="text-white font-semibold capitalize">{meal}</h4>
                    <p className="text-sm text-[#64748b]">{selectedEventData?.expectedAttendees} servings</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#64748b]">No meals scheduled.</p>
            )}
          </div>

          {/* Dietary Options */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Salad className="h-5 w-5 text-[#6366f1]" />
              Available Dietary Options
            </h3>
            {selectedEventData?.catering?.dietaryOptions && selectedEventData.catering.dietaryOptions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedEventData.catering.dietaryOptions.map((option, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#64748b]">No dietary options specified.</p>
            )}
          </div>
        </div>

        {/* Dietary Breakdown Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#6366f1]" />
              Dietary Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(dietaryBreakdown).map(([restriction, count]) => (
                <div key={restriction} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]">
                  <span className="text-[#94a3b8]">{restriction}</span>
                  <span className={`font-semibold ${restriction === 'None' ? 'text-white' : 'text-amber-400'}`}>
                    {count}
                  </span>
                </div>
              ))}
              {Object.keys(dietaryBreakdown).length === 0 && (
                <p className="text-[#64748b] text-center py-4">No dietary data available.</p>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-[#1e1e2e]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Total Guests</span>
                <span className="text-white font-semibold">{eventGuests.length}</span>
              </div>
            </div>
          </div>

          {/* BEO Quick Info */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#6366f1]" />
              BEO Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Event</span>
                <span className="text-white">{selectedEventData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Date</span>
                <span className="text-white">{selectedEventData?.dates.start}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Headcount</span>
                <span className="text-white">{selectedEventData?.expectedAttendees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Venue</span>
                <span className="text-white">{selectedEventData?.venue.name}</span>
              </div>
            </div>
            <button className="w-full mt-4 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Generate Full BEO
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
