import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Ticket,
  DollarSign,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  formatCurrency,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Ticketing = () => {
  const { t } = useTranslation('common');
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedEventData = useMemo(() => {
    return events.find((e) => e.id === selectedEvent);
  }, [selectedEvent]);

  const ticketStats = useMemo(() => {
    if (!selectedEventData) return { totalSold: 0, totalRevenue: 0, totalAvailable: 0 };

    const totalSold = selectedEventData.ticketTypes.reduce((sum, t) => sum + t.sold, 0);
    const totalRevenue = selectedEventData.ticketTypes.reduce((sum, t) => sum + t.price * t.sold, 0);
    const totalAvailable = selectedEventData.ticketTypes.reduce((sum, t) => sum + t.quantity, 0);

    return { totalSold, totalRevenue, totalAvailable };
  }, [selectedEventData]);

  // Mock ticket sales data
  const ticketSales = [
    { id: 'TKT001', buyer: 'John Smith', email: 'john@example.com', type: 'VIP Pass', quantity: 2, amount: 1198, date: '2024-12-15', status: 'completed' },
    { id: 'TKT002', buyer: 'Sarah Johnson', email: 'sarah@example.com', type: 'General Admission', quantity: 1, amount: 299, date: '2024-12-14', status: 'completed' },
    { id: 'TKT003', buyer: 'Mike Davis', email: 'mike@example.com', type: 'General Admission', quantity: 3, amount: 897, date: '2024-12-14', status: 'completed' },
    { id: 'TKT004', buyer: 'Emily Brown', email: 'emily@example.com', type: 'Workshop Add-on', quantity: 1, amount: 149, date: '2024-12-13', status: 'completed' },
    { id: 'TKT005', buyer: 'Alex Turner', email: 'alex@example.com', type: 'VIP Pass', quantity: 1, amount: 599, date: '2024-12-13', status: 'pending' },
  ];

  const filteredSales = ticketSales.filter(
    (sale) =>
      sale.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('events.ticketing', 'Ticketing')}
        subtitle="Manage ticket sales and pricing"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Create Ticket Type
          </button>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <label className="block text-sm text-[#64748b] mb-2">Select Event</label>
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
          title="Tickets Sold"
          value={ticketStats.totalSold.toLocaleString()}
          icon={Ticket}
          trend={{ value: `of ${ticketStats.totalAvailable.toLocaleString()} available`, type: 'up' }}
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(ticketStats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: '+12% vs last event', type: 'up' }}
        />
        <StatsCard
          title="Sell Rate"
          value={`${ticketStats.totalAvailable > 0 ? ((ticketStats.totalSold / ticketStats.totalAvailable) * 100).toFixed(0) : 0}%`}
          icon={TrendingUp}
          trend={{ value: 'Tickets sold', type: 'up' }}
        />
        <StatsCard
          title="Avg. Price"
          value={formatCurrency(ticketStats.totalSold > 0 ? ticketStats.totalRevenue / ticketStats.totalSold : 0)}
          icon={BarChart3}
          trend={{ value: 'Per ticket', type: 'neutral' }}
        />
      </div>

      {/* Ticket Types */}
      {selectedEventData && selectedEventData.ticketTypes.length > 0 && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ticket Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedEventData.ticketTypes.map((ticket, index) => {
              const progress = ticket.quantity > 0 ? (ticket.sold / ticket.quantity) * 100 : 0;
              const remaining = ticket.quantity - ticket.sold;

              return (
                <div key={index} className="rounded-lg bg-[#1a1a24] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{ticket.name}</h4>
                    <span className="text-[#547792] font-bold">{formatCurrency(ticket.price)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748b]">Sold</span>
                      <span className="text-white">{ticket.sold} / {ticket.quantity}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1e1e2e]">
                      <div
                        className={`h-full rounded-full ${
                          progress >= 90 ? 'bg-red-500' : progress >= 70 ? 'bg-amber-500' : 'bg-gradient-to-r from-[#547792] to-[#94B4C1]'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748b]">Remaining</span>
                      <span className={remaining <= 50 ? 'text-amber-400' : 'text-emerald-400'}>{remaining}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-white/[0.08]">
                      <span className="text-[#64748b]">Revenue</span>
                      <span className="text-white font-semibold">{formatCurrency(ticket.price * ticket.sold)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sales Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recent Sales</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-white/[0.08] bg-[#1a1a24] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Ticket Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-[#1a1a24]">
                  <td className="px-6 py-4 text-white font-mono text-sm">{sale.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white">{sale.buyer}</p>
                      <p className="text-xs text-[#64748b]">{sale.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#94a3b8]">{sale.type}</td>
                  <td className="px-6 py-4 text-white">{sale.quantity}</td>
                  <td className="px-6 py-4 text-white font-semibold">{formatCurrency(sale.amount)}</td>
                  <td className="px-6 py-4 text-[#94a3b8]">{sale.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      sale.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
