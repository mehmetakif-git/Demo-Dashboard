import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Package,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  Speaker,
  Monitor,
  Lightbulb,
  Armchair,
  LayoutGrid,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  events,
  eventEquipment,
  formatCurrency,
  getEquipmentStatusColor,
} from '@/data/events/eventsData';
import { useTranslation } from 'react-i18next';

export const Equipment = () => {
  const { t } = useTranslation('events');
  const [selectedEvent, setSelectedEvent] = useState<string>(events[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEquipment = useMemo(() => {
    return eventEquipment.filter((item) => {
      const matchesEvent = item.eventId === selectedEvent;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesEvent && matchesSearch && matchesCategory;
    });
  }, [selectedEvent, searchTerm, categoryFilter]);

  const categories = [...new Set(eventEquipment.map((e) => e.category))];

  const equipmentStats = useMemo(() => {
    const eventItems = eventEquipment.filter((e) => e.eventId === selectedEvent);
    const totalCost = eventItems.reduce((sum, item) => sum + item.totalCost, 0);
    const totalItems = eventItems.length;
    const reserved = eventItems.filter((e) => e.status === 'reserved').length;
    const delivered = eventItems.filter((e) => e.status === 'delivered').length;
    return { totalCost, totalItems, reserved, delivered };
  }, [selectedEvent]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'audio':
        return <Speaker className="h-5 w-5" />;
      case 'video':
        return <Monitor className="h-5 w-5" />;
      case 'lighting':
        return <Lightbulb className="h-5 w-5" />;
      case 'furniture':
        return <Armchair className="h-5 w-5" />;
      case 'staging':
        return <LayoutGrid className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
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
        title={t('equipment.title')}
        subtitle={t('equipment.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            {t('equipment.addEquipment')}
          </button>
        }
      />

      {/* Event Selector */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <label className="block text-sm text-[#64748b] mb-2">{t('equipment.selectEvent')}</label>
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
          title={t('equipment.totalItems')}
          value={equipmentStats.totalItems.toString()}
          icon={Package}
          trend={{ value: t('equipment.equipmentItems'), type: 'neutral' }}
        />
        <StatsCard
          title={t('equipment.totalCost')}
          value={formatCurrency(equipmentStats.totalCost)}
          icon={DollarSign}
          trend={{ value: t('equipment.rentalCosts'), type: 'neutral' }}
        />
        <StatsCard
          title={t('equipment.reserved')}
          value={equipmentStats.reserved.toString()}
          icon={Clock}
          trend={{ value: t('equipment.awaitingDelivery'), type: 'neutral' }}
        />
        <StatsCard
          title={t('equipment.delivered')}
          value={equipmentStats.delivered.toString()}
          icon={CheckCircle}
          trend={{ value: t('equipment.onSite'), type: 'up' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder={t('equipment.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('equipment.allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Equipment List */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.item')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.category')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.vendor')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.qty')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.unitCost')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.total')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.delivery')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-[#64748b]">{t('equipment.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map((item) => {
                  const statusColor = getEquipmentStatusColor(item.status);
                  return (
                    <tr key={item.id} className="hover:bg-[#1a1a24]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24] text-[#547792]">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            {item.notes && (
                              <p className="text-xs text-[#64748b]">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#1a1a24] px-2.5 py-1 text-xs text-[#94a3b8]">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{item.vendor}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">{item.quantity}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#94a3b8]">{formatCurrency(item.unitCost)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{formatCurrency(item.totalCost)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-[#94a3b8]">{item.deliveryDate}</p>
                          <p className="text-xs text-[#64748b]">{t('equipment.returnLabel', { date: item.returnDate })}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                          {item.status === 'delivered' && <CheckCircle className="h-3 w-3" />}
                          {item.status === 'reserved' && <Clock className="h-3 w-3" />}
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#64748b]">
                    {t('equipment.noEquipmentFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        {filteredEquipment.length > 0 && (
          <div className="border-t border-white/[0.08] px-6 py-4 flex justify-end">
            <div className="text-right">
              <p className="text-sm text-[#64748b]">{t('equipment.totalEquipmentCost')}</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(equipmentStats.totalCost)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Delivery Schedule */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Truck className="h-5 w-5 text-[#547792]" />
          {t('equipment.deliverySchedule')}
        </h3>
        {filteredEquipment.length > 0 ? (
          <div className="space-y-3">
            {[...new Set(filteredEquipment.map(e => e.deliveryDate))].map((date) => {
              const itemsForDate = filteredEquipment.filter(e => e.deliveryDate === date);
              return (
                <div key={date} className="p-4 rounded-lg bg-[#1a1a24]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{date}</span>
                    <span className="text-[#64748b] text-sm">{t('equipment.items', { count: itemsForDate.length })}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {itemsForDate.map((item) => (
                      <span key={item.id} className="rounded-full bg-[#1e1e2e] px-2 py-1 text-xs text-[#94a3b8]">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[#64748b]">{t('equipment.noDeliveries')}</p>
        )}
      </div>
    </motion.div>
  );
};
