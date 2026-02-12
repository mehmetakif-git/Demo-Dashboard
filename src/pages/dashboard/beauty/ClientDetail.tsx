import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Calendar,
  Phone,
  Mail,
  Crown,
  AlertTriangle,
  Clock,
  DollarSign,
  Star,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  getClientById,
  getStaffById,
  appointments,
  formatDate,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { useTranslation } from 'react-i18next';

export const ClientDetail = () => {
  const { t } = useTranslation('beauty');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const client = id ? getClientById(id) : undefined;
  const preferredStylist = client?.preferredStylist ? getStaffById(client.preferredStylist) : undefined;
  const clientAppointments = client ? appointments.filter((a) => a.clientId === client.id) : [];

  if (!client) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t('clientDetail.clientNotFound')}
          subtitle={t('clientDetail.notFoundSubtitle')}
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('clientDetail.goBack')}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${client.firstName} ${client.lastName}`}
        subtitle={client.vipStatus ? t('clientDetail.vipClient') : t('clientDetail.regularClient')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('clientDetail.back')}
            </Button>
            <Button variant="secondary" leftIcon={<Edit size={16} />}>
              {t('clientDetail.edit')}
            </Button>
            <Button leftIcon={<Calendar size={16} />}>{t('clientDetail.bookAppointment')}</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-accent-primary">
                  {client.firstName[0]}
                  {client.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {client.firstName} {client.lastName}
                  </h2>
                  {client.vipStatus && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-400 text-sm rounded">
                      <Crown size={14} />
                      VIP
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Phone size={16} className="text-text-muted" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail size={16} className="text-text-muted" />
                    {client.email}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/[0.05] rounded text-sm text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Calendar size={20} className="mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold text-text-primary">{client.visitCount}</p>
              <p className="text-xs text-text-muted">{t('clientDetail.totalVisits')}</p>
            </Card>
            <Card className="p-4 text-center">
              <DollarSign size={20} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(client.totalSpent)}</p>
              <p className="text-xs text-text-muted">{t('clientDetail.totalSpent')}</p>
            </Card>
            <Card className="p-4 text-center">
              <Clock size={20} className="mx-auto mb-2 text-blue-400" />
              <p className="text-lg font-bold text-text-primary">{formatDate(client.lastVisit)}</p>
              <p className="text-xs text-text-muted">{t('clientDetail.lastVisit')}</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar size={20} className="mx-auto mb-2 text-pink-400" />
              <p className="text-lg font-bold text-text-primary">{formatDate(client.createdAt)}</p>
              <p className="text-xs text-text-muted">{t('clientDetail.clientSince')}</p>
            </Card>
          </div>

          {/* Preferences */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.preferencesAndDetails')}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-text-muted mb-2">{t('clientDetail.hairType')}</h4>
                <p className="text-text-primary">{client.hairType || t('clientDetail.notSpecified')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-muted mb-2">{t('clientDetail.skinType')}</h4>
                <p className="text-text-primary">{client.skinType || t('clientDetail.notSpecified')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-muted mb-2">{t('clientDetail.dateOfBirth')}</h4>
                <p className="text-text-primary">{formatDate(client.dateOfBirth)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-muted mb-2">{t('clientDetail.gender')}</h4>
                <p className="text-text-primary capitalize">{client.gender}</p>
              </div>
            </div>

            {/* Allergies */}
            {client.allergies.length > 0 && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle size={16} />
                  <h4 className="font-medium">{t('clientDetail.allergies')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {client.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {client.notes && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-text-muted mb-2">{t('clientDetail.notes')}</h4>
                <p className="text-text-secondary">{client.notes}</p>
              </div>
            )}
          </Card>

          {/* Appointment History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.recentAppointments')}</h3>
            {clientAppointments.length > 0 ? (
              <div className="space-y-3">
                {clientAppointments.slice(0, 5).map((apt) => (
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
                        <p className="font-medium text-text-primary">
                          {apt.services.map((s) => s.name).join(', ')}
                        </p>
                        <p className="text-sm text-text-secondary">{t('appointments.with', { name: apt.stylistName })}</p>
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
              <p className="text-text-muted text-center py-4">{t('clientDetail.noAppointmentsYet')}</p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preferred Stylist */}
          {preferredStylist && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.preferredStylist')}</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-400">
                    {preferredStylist.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{preferredStylist.name}</p>
                  <p className="text-sm text-text-secondary">{preferredStylist.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-text-secondary">{preferredStylist.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Membership */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.membership')}</h3>
            {client.membershipId ? (
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                <p className="font-semibold text-text-primary mb-2">{t('clientDetail.activeMember')}</p>
                <p className="text-sm text-text-secondary">ID: {client.membershipId}</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-text-muted mb-4">{t('clientDetail.notMemberYet')}</p>
                <Button variant="secondary" className="w-full">
                  {t('clientDetail.upgradeToMember')}
                </Button>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.quickActions')}</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Calendar size={16} />}>
                {t('clientDetail.bookAppointment')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Phone size={16} />}>
                {t('clientDetail.callClient')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Mail size={16} />}>
                {t('clientDetail.sendEmail')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
