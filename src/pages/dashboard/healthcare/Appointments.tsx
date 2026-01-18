import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Plus,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { appointments, doctors, HEALTHCARE_COLOR, getPatientProfileImage } from '@/data/healthcare/healthcareData';

export const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');

  const today = '2024-01-15';
  const tomorrow = '2024-01-16';

  const stats = useMemo(() => ({
    total: appointments.length,
    scheduled: appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length,
    inProgress: appointments.filter(a => a.status === 'in-progress').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  }), []);

  const filteredAppointments = useMemo(() => {
    const dateToFilter = dateFilter === 'today' ? today : dateFilter === 'tomorrow' ? tomorrow : null;

    return appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchesDate = !dateToFilter || apt.date === dateToFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, dateFilter]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'consultation': HEALTHCARE_COLOR,
      'follow-up': '#10b981',
      'emergency': '#ef4444',
      'procedure': '#8b5cf6',
      'check-up': '#f59e0b',
    };
    return colors[type] || HEALTHCARE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle="Manage patient appointments and schedules"
        icon={Calendar}
        actions={
          <Button>
            <Plus size={18} />
            New Appointment
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Appointments', value: stats.total, icon: Calendar, color: HEALTHCARE_COLOR },
          { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: '#f59e0b' },
          { label: 'In Progress', value: stats.inProgress, icon: Stethoscope, color: '#6366f1' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Doctor Schedule */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-3">Available Doctors</h3>
        <div className="flex flex-wrap gap-3">
          {doctors.filter(d => d.isActive).map((doctor) => {
            const doctorAppointments = appointments.filter(
              a => a.doctorId === doctor.id && a.date === today && a.status !== 'cancelled'
            ).length;
            return (
              <div
                key={doctor.id}
                className="flex items-center gap-3 px-4 py-2 bg-background-secondary rounded-lg"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                >
                  <Stethoscope size={16} style={{ color: HEALTHCARE_COLOR }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{doctor.name}</p>
                  <p className="text-xs text-text-muted">
                    {doctorAppointments} appointments today
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by patient or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['today', 'tomorrow', 'all'].map((date) => (
              <Button
                key={date}
                variant={dateFilter === date ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDateFilter(date)}
              >
                {date.charAt(0).toUpperCase() + date.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'scheduled', 'confirmed', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Time & Type */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex flex-col items-center justify-center"
                    style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                  >
                    <span className="text-lg font-bold" style={{ color: HEALTHCARE_COLOR }}>
                      {appointment.time}
                    </span>
                    <span className="text-xs text-text-muted">{appointment.duration}min</span>
                  </div>
                  <div>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getTypeColor(appointment.type)}20`,
                        color: getTypeColor(appointment.type),
                      }}
                    >
                      {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace('-', ' ')}
                    </span>
                    <p className="text-sm text-text-muted mt-1">{appointment.department}</p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {getPatientProfileImage(appointment.patientName) ? (
                      <img
                        src={getPatientProfileImage(appointment.patientName)}
                        alt={appointment.patientName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                      >
                        <User size={18} style={{ color: HEALTHCARE_COLOR }} />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-text-primary">{appointment.patientName}</p>
                      <p className="text-sm text-text-muted">{appointment.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                  >
                    <Stethoscope size={18} style={{ color: HEALTHCARE_COLOR }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{appointment.doctorName}</p>
                    <p className="text-xs text-text-muted">{appointment.department}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="text-center">
                  <div className="flex items-center gap-1 text-text-primary">
                    <Calendar size={14} />
                    <span className="text-sm">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">Date</p>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={appointment.status} />
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'start', label: 'Start Consultation', onClick: () => {} },
                      { id: 'reschedule', label: 'Reschedule', onClick: () => {} },
                      { id: 'cancel', label: 'Cancel', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {appointment.notes && (
                <div className="mt-3 pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">Note: {appointment.notes}</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No appointments found</p>
        </Card>
      )}
    </div>
  );
};

export default Appointments;
