import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Calendar,
  Phone,
  Mail,
  Star,
  DollarSign,
  TrendingUp,
  Award,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  getStaffById,
  staff,
  appointments,
  reviews,
  formatDate,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const StaffDetail = () => {
  const { t } = useTranslation('beauty');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const member = id ? getStaffById(id) : undefined;
  const staffAppointments = member
    ? appointments.filter((a) => a.stylistId === member.id)
    : [];
  const staffReviews = member ? reviews.filter((r) => r.stylistId === member.id) : [];

  if (!member) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t('staffDetail.staffNotFound')}
          subtitle={t('staffDetail.notFoundSubtitle')}
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('staffDetail.goBack')}
            </Button>
          }
        />
      </div>
    );
  }

  const getStatusColor = (status: typeof staff[0]['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'busy':
        return 'bg-amber-500/20 text-amber-400';
      case 'off':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={member.name}
        subtitle={member.role}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('staffDetail.back')}
            </Button>
            <Button variant="secondary" leftIcon={<Edit size={16} />}>
              {t('staffDetail.edit')}
            </Button>
            <Button leftIcon={<Calendar size={16} />}>{t('staffDetail.viewSchedule')}</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              {getProfileImage(member.name) ? (
                <img
                  src={getProfileImage(member.name)}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
              ) : member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-emerald-400">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">{member.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>

                <p className="text-text-secondary mb-4">{member.role}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Phone size={16} className="text-text-muted" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail size={16} className="text-text-muted" />
                    {member.email}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= Math.round(member.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-600'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-text-secondary">
                    {member.rating} ({t('appointmentDetail.reviews', { count: member.reviewCount })})
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Calendar size={20} className="mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold text-text-primary">
                {member.appointmentsToday}
              </p>
              <p className="text-xs text-text-muted">{t('staff.today')}</p>
            </Card>
            <Card className="p-4 text-center">
              <DollarSign size={20} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(member.monthlySales)}
              </p>
              <p className="text-xs text-text-muted">{t('staffDetail.monthlySales')}</p>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp size={20} className="mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold text-text-primary">
                {member.commissionRate}%
              </p>
              <p className="text-xs text-text-muted">{t('staffDetail.commission')}</p>
            </Card>
            <Card className="p-4 text-center">
              <Award size={20} className="mx-auto mb-2 text-pink-400" />
              <p className="text-2xl font-bold text-text-primary">
                {member.rating}
              </p>
              <p className="text-xs text-text-muted">{t('staff.rating')}</p>
            </Card>
          </div>

          {/* Specializations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.specializations')}</h3>
            <div className="flex flex-wrap gap-2">
              {member.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1.5 bg-pink-500/20 text-pink-400 rounded-lg text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </Card>

          {/* Recent Reviews */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.recentReviews')}</h3>
            {staffReviews.length > 0 ? (
              <div className="space-y-4">
                {staffReviews.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-white/[0.03] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-accent-primary">
                            {review.clientName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <span className="font-medium text-text-primary">{review.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={
                              star <= review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-600'
                            }
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-text-secondary text-sm">{review.comment}</p>
                    )}
                    <p className="text-xs text-text-muted mt-2">{formatDate(review.date)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-4">{t('staffDetail.noReviewsYet')}</p>
            )}
          </Card>

          {/* Recent Appointments */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.recentAppointments')}</h3>
            {staffAppointments.length > 0 ? (
              <div className="space-y-3">
                {staffAppointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/beauty/appointments/${apt.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-text-primary">
                          {new Date(apt.date).toLocaleDateString('en-US', { day: 'numeric' })}
                        </p>
                        <p className="text-xs text-text-muted">
                          {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{apt.clientName}</p>
                        <p className="text-sm text-text-secondary">
                          {apt.services.map((s) => s.name).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{formatCurrency(apt.totalPrice)}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          apt.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : apt.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-4">{t('staffDetail.noAppointmentsYet')}</p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schedule Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.workingHours')}</h3>
            <div className="space-y-3">
              {Object.entries(member.workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-text-secondary capitalize">{day}</span>
                  {hours ? (
                    <span className="text-text-primary">
                      {hours.start} - {hours.end}
                    </span>
                  ) : (
                    <span className="text-text-muted">{t('staffDetail.off')}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Commission */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.commission')}</h3>
            <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg text-center">
              <p className="text-4xl font-bold text-emerald-400">{member.commissionRate}%</p>
              <p className="text-sm text-text-secondary mt-1">{t('staffDetail.perService')}</p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.quickActions')}</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Calendar size={16} />}>
                {t('staffDetail.viewSchedule')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Phone size={16} />}>
                {t('staffDetail.callStaff')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Mail size={16} />}>
                {t('staffDetail.sendEmail')}
              </Button>
            </div>
          </Card>

          {/* Employment Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('staffDetail.employmentInfo')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">{t('staffDetail.experience')}</span>
                <span className="text-text-primary">{t('staffDetail.yearsExperience', { count: member.yearsExperience })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{t('staffDetail.role')}</span>
                <span className="text-text-primary">{member.role}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
