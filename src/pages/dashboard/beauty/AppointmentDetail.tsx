import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Scissors,
  DollarSign,
  CheckCircle,
  Play,
  Edit,
  Phone,
  Mail,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  getAppointmentById,
  getClientById,
  getStaffById,
  getAppointmentStatusColor,
  formatDate,
  formatTime,
  formatDuration,
  formatCurrency,
  type Appointment,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const AppointmentDetail = () => {
  const { t } = useTranslation('beauty');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const appointment = id ? getAppointmentById(id) : undefined;
  const client = appointment ? getClientById(appointment.clientId) : undefined;
  const stylist = appointment ? getStaffById(appointment.stylistId) : undefined;

  if (!appointment) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t('appointmentDetail.appointmentNotFound')}
          subtitle={t('appointmentDetail.notFoundSubtitle')}
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('appointmentDetail.goBack')}
            </Button>
          }
        />
      </div>
    );
  }

  const getStatusBadge = (status: Appointment['status']) => {
    const config = {
      scheduled: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', label: t('appointments.scheduled') },
      confirmed: { bg: 'bg-sky-500/20', text: 'text-sky-400', label: t('appointments.confirmed') },
      'in-progress': { bg: 'bg-amber-500/20', text: 'text-amber-400', label: t('appointments.inProgress') },
      completed: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: t('appointments.completed') },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('appointments.cancelled') },
      'no-show': { bg: 'bg-gray-500/20', text: 'text-gray-400', label: t('appointments.noShow') },
    };
    const c = config[status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('appointmentDetail.appointmentWith', { name: appointment.clientName })}
        subtitle={`${formatDate(appointment.date)} at ${formatTime(appointment.startTime)}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('appointmentDetail.back')}
            </Button>
            <Button variant="secondary" leftIcon={<Edit size={16} />}>
              {t('appointmentDetail.edit')}
            </Button>
            {appointment.status === 'scheduled' && (
              <Button leftIcon={<CheckCircle size={16} />}>{t('appointmentDetail.confirm')}</Button>
            )}
            {appointment.status === 'confirmed' && (
              <Button leftIcon={<Play size={16} />}>{t('appointmentDetail.start')}</Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-12 rounded-full"
                  style={{ backgroundColor: getAppointmentStatusColor(appointment.status) }}
                />
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{t('appointmentDetail.appointmentDetails')}</h2>
                  <p className="text-text-secondary">ID: {appointment.id}</p>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <Calendar size={14} />
                  <span className="text-xs">{t('appointmentDetail.date')}</span>
                </div>
                <p className="font-medium text-text-primary">{formatDate(appointment.date)}</p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <Clock size={14} />
                  <span className="text-xs">{t('appointmentDetail.time')}</span>
                </div>
                <p className="font-medium text-text-primary">
                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <Clock size={14} />
                  <span className="text-xs">{t('appointmentDetail.duration')}</span>
                </div>
                <p className="font-medium text-text-primary">{formatDuration(appointment.totalDuration)}</p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <DollarSign size={14} />
                  <span className="text-xs">{t('appointmentDetail.total')}</span>
                </div>
                <p className="font-medium text-text-primary">{formatCurrency(appointment.totalPrice)}</p>
              </div>
            </div>
          </Card>

          {/* Services */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('appointmentDetail.services')}</h3>
            <div className="space-y-3">
              {appointment.services.map((service) => (
                <div
                  key={service.serviceId}
                  className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Scissors size={18} className="text-pink-400" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{service.name}</p>
                      <p className="text-sm text-text-secondary">{formatDuration(service.duration)}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-text-primary">{formatCurrency(service.price)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.08] flex justify-between">
              <span className="text-text-secondary">{t('appointmentDetail.total')}</span>
              <span className="text-xl font-bold text-text-primary">
                {formatCurrency(appointment.totalPrice)}
              </span>
            </div>
          </Card>

          {/* Notes */}
          {appointment.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('appointmentDetail.notes')}</h3>
              <p className="text-text-secondary">{appointment.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('appointmentDetail.client')}</h3>
            <div className="flex items-center gap-4 mb-4">
              {getProfileImage(appointment.clientName) ? (
                <img
                  src={getProfileImage(appointment.clientName)}
                  alt={appointment.clientName}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent-primary">
                    {appointment.clientName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-text-primary">{appointment.clientName}</p>
                {client?.vipStatus && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                    VIP
                  </span>
                )}
              </div>
            </div>
            {client && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-text-muted" />
                  <span className="text-text-secondary">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={14} className="text-text-muted" />
                  <span className="text-text-secondary">{client.email}</span>
                </div>
              </div>
            )}
            <Button
              variant="secondary"
              className="w-full mt-4"
              leftIcon={<User size={16} />}
              onClick={() => client && navigate(`/dashboard/beauty/clients/${client.id}`)}
            >
              {t('appointmentDetail.viewProfile')}
            </Button>
          </Card>

          {/* Stylist Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('appointmentDetail.stylist')}</h3>
            <div className="flex items-center gap-4 mb-4">
              {getProfileImage(appointment.stylistName) ? (
                <img
                  src={getProfileImage(appointment.stylistName)}
                  alt={appointment.stylistName}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-400">
                    {appointment.stylistName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-text-primary">{appointment.stylistName}</p>
                {stylist && (
                  <p className="text-sm text-text-secondary">{stylist.role}</p>
                )}
              </div>
            </div>
            {stylist && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= Math.round(stylist.rating) ? 'text-amber-400' : 'text-gray-600'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {stylist.rating} ({t('appointmentDetail.reviews', { count: stylist.reviewCount })})
                </span>
              </div>
            )}
            <Button
              variant="secondary"
              className="w-full"
              leftIcon={<User size={16} />}
              onClick={() => stylist && navigate(`/dashboard/beauty/staff/${stylist.id}`)}
            >
              {t('appointmentDetail.viewProfile')}
            </Button>
          </Card>

          {/* Payment Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('appointmentDetail.payment')}</h3>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg">
              <span className="text-text-secondary">{t('appointmentDetail.status')}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.paymentStatus === 'paid'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {appointment.paymentStatus === 'paid' ? t('appointments.paid') : t('appointments.pending')}
              </span>
            </div>
            {appointment.paymentStatus === 'pending' && (
              <Button className="w-full mt-4" leftIcon={<DollarSign size={16} />}>
                {t('appointmentDetail.processPayment')}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
