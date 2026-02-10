import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  DollarSign,
  AlertCircle,
  List,
  ChevronRight,
  CheckCircle,
  XCircle,
  Play,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  appointments,
  staff,
  getAppointmentStatusColor,
  formatDate,
  formatTime,
  formatDuration,
  formatCurrency,
  type Appointment,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Appointments = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStylist, setSelectedStylist] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter((a) => a.date === today);
    return {
      total: todayAppointments.length,
      todayRevenue: todayAppointments.reduce((sum, a) => sum + a.totalPrice, 0),
      pending: appointments.filter((a) => a.status === 'scheduled').length,
      noShows: appointments.filter((a) => a.status === 'no-show').length,
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.clientName.toLowerCase().includes(query) ||
          a.stylistName.toLowerCase().includes(query) ||
          a.services.some((s) => s.name.toLowerCase().includes(query))
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((a) => a.status === selectedStatus);
    }

    if (selectedStylist !== 'all') {
      filtered = filtered.filter((a) => a.stylistId === selectedStylist);
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

    return filtered;
  }, [searchQuery, selectedStatus, selectedStylist]);

  const getStatusBadge = (status: Appointment['status']) => {
    const config = {
      scheduled: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', label: 'Scheduled' },
      confirmed: { bg: 'bg-sky-500/20', text: 'text-sky-400', label: 'Confirmed' },
      'in-progress': { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'In Progress' },
      completed: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Completed' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled' },
      'no-show': { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'No Show' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getPaymentBadge = (status: Appointment['paymentStatus']) => {
    if (status === 'paid') {
      return (
        <span className="flex items-center gap-1 text-xs text-emerald-400">
          <CheckCircle size={12} />
          Paid
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs text-amber-400">
        <Clock size={12} />
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('beauty.appointments', 'Appointments')}
        subtitle="Manage salon appointments and schedules"
        actions={
          <Button leftIcon={<Plus size={16} />}>New Appointment</Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Appointments"
          value={stats.total.toString()}
          icon={Calendar}
          iconColor="#ec4899"
        />
        <StatsCard
          title="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Pending Confirmation"
          value={stats.pending.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="No Shows (This Week)"
          value={stats.noShows.toString()}
          icon={AlertCircle}
          iconColor="#ef4444"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px] max-w-md">
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>

            <select
              value={selectedStylist}
              onChange={(e) => setSelectedStylist(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Stylists</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Calendar size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="p-5 hover:border-white/[0.15] transition-all cursor-pointer group"
              onClick={() => navigate(`/dashboard/beauty/appointments/${appointment.id}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Bar */}
                  <div
                    className="w-1 h-full min-h-[80px] rounded-full"
                    style={{ backgroundColor: getAppointmentStatusColor(appointment.status) }}
                  />

                  {/* Client Avatar */}
                  {getProfileImage(appointment.clientName) ? (
                    <img
                      src={getProfileImage(appointment.clientName)}
                      alt={appointment.clientName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-accent-primary">
                        {appointment.clientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-text-primary">
                            {appointment.clientName}
                          </h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-text-secondary">
                          with {appointment.stylistName}
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-text-muted group-hover:text-text-primary transition-colors"
                      />
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2">
                      {appointment.services.map((service) => (
                        <span
                          key={service.serviceId}
                          className="px-2 py-1 bg-white/[0.05] rounded text-xs text-text-secondary"
                        >
                          {service.name}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-1.5 text-text-secondary">
                        <Calendar size={14} className="text-text-muted" />
                        {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-1.5 text-text-secondary">
                        <Clock size={14} className="text-text-muted" />
                        {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                      </span>
                      <span className="flex items-center gap-1.5 text-text-secondary">
                        <Clock size={14} className="text-text-muted" />
                        {formatDuration(appointment.totalDuration)}
                      </span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(appointment.totalPrice)}
                      </span>
                      {getPaymentBadge(appointment.paymentStatus)}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {appointment.status === 'scheduled' && (
                    <button className="p-2 hover:bg-emerald-500/10 rounded text-emerald-400 transition-colors">
                      <CheckCircle size={18} />
                    </button>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button className="p-2 hover:bg-amber-500/10 rounded text-amber-400 transition-colors">
                      <Play size={18} />
                    </button>
                  )}
                  <button className="p-2 hover:bg-red-500/10 rounded text-red-400 transition-colors">
                    <XCircle size={18} />
                  </button>
                </div>
              </div>

              {/* Notes */}
              {appointment.notes && (
                <div className="mt-3 pt-3 border-t border-white/[0.08]">
                  <p className="text-sm text-text-muted italic">{appointment.notes}</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No appointments found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
