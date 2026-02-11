import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Edit,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  clients,
  jobOrders,
  placements,
  formatCurrency,
  getClientTierBgColor,
  getJobStatusBgColor,
  getPlacementStatusBgColor,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';
import { getCompanyLogo } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

type TabType = 'overview' | 'jobs' | 'placements' | 'contacts';

export const ClientDetail = () => {
  const { t } = useTranslation('staffing');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const client = clients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('clientDetail.clientNotFound')}</h3>
          <p className="text-text-secondary mb-4">{t('clientDetail.clientNotFoundDesc')}</p>
          <Button onClick={() => navigate(ROUTES.staffing.clients)}>{t('clientDetail.backToClients')}</Button>
        </Card>
      </div>
    );
  }

  // Get client's job orders and placements
  const clientJobs = jobOrders.filter((j) => j.clientId === client.id);
  const clientPlacements = placements.filter((p) => p.clientId === client.id);

  const tabs = [
    { id: 'overview', label: t('clientDetail.overview') },
    { id: 'jobs', label: t('clientDetail.jobOrders'), count: clientJobs.length },
    { id: 'placements', label: t('clientDetail.placements'), count: clientPlacements.length },
    { id: 'contacts', label: t('clientDetail.contacts') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={client.companyName}
        subtitle={client.industry}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(ROUTES.staffing.clients)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('clientDetail.back')}
            </Button>
            <Button variant="outline" onClick={() => console.log('Add job order')}>
              <Plus className="h-4 w-4 mr-2" />
              {t('clientDetail.newJob')}
            </Button>
            <Button onClick={() => console.log('Edit client')}>
              <Edit className="h-4 w-4 mr-2" />
              {t('clientDetail.edit')}
            </Button>
          </div>
        }
      />

      {/* Client Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-4">
            {getCompanyLogo(client.companyName) ? (
              <img
                src={getCompanyLogo(client.companyName)}
                alt={client.companyName}
                className="w-20 h-20 rounded-lg object-cover border border-white/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-3xl font-bold">
                {client.companyName.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-text-primary">{client.companyName}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getClientTierBgColor(client.tier)}`}>
                  {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : client.status === 'prospect'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
              </div>
              <p className="text-text-secondary mb-2">{client.industry}</p>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="h-4 w-4" />
                <span>
                  {client.address.street}, {client.address.city}, {client.address.state}{' '}
                  {client.address.zip}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/[0.05] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{client.totalPlacements}</p>
              <p className="text-sm text-text-muted">{t('clientDetail.totalPlacements')}</p>
            </div>
            <div className="bg-white/[0.05] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{client.activePositions}</p>
              <p className="text-sm text-text-muted">{t('clientDetail.openPositions')}</p>
            </div>
            <div className="bg-white/[0.05] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(client.totalRevenue / 1000)}k</p>
              <p className="text-sm text-text-muted">{t('clientDetail.totalRevenue')}</p>
            </div>
            <div className="bg-white/[0.05] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{client.paymentTerms}</p>
              <p className="text-sm text-text-muted">{t('clientDetail.paymentTermsDays')}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.08]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-accent-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/[0.05]">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="clientTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.notes')}</h3>
              <p className="text-text-secondary">{client.notes || t('clientDetail.noNotesAvailable')}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-accent-primary/10 text-accent-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.contractInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">{t('clientDetail.contractStart')}</p>
                    <p className="text-text-primary">
                      {new Date(client.contractStart).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {client.contractEnd && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-text-muted" />
                    <div>
                      <p className="text-sm text-text-secondary">{t('clientDetail.contractEnd')}</p>
                      <p className="text-text-primary">
                        {new Date(client.contractEnd).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">{t('clientDetail.paymentTerms')}</p>
                    <p className="text-text-primary">{t('clientDetail.netDays', { days: client.paymentTerms })}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.primaryContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-text-primary font-medium">{client.primaryContact.name}</p>
                    <p className="text-sm text-text-secondary">{client.primaryContact.title}</p>
                  </div>
                </div>
                <a
                  href={`mailto:${client.primaryContact.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary"
                >
                  <Mail className="h-5 w-5 text-text-muted" />
                  <span>{client.primaryContact.email}</span>
                </a>
                <a
                  href={`tel:${client.primaryContact.phone}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary"
                >
                  <Phone className="h-5 w-5 text-text-muted" />
                  <span>{client.primaryContact.phone}</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <Card className="overflow-hidden">
          {clientJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.position')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.status')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.openings')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.applicants')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.created')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientJobs.map((job) => (
                    <tr key={job.id} className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-text-primary">{job.title}</p>
                        <p className="text-sm text-text-secondary">{job.department}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getJobStatusBgColor(
                            job.status
                          )}`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {job.filled}/{job.openings}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{job.applicants}</td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(ROUTES.staffing.jobDetail.replace(':id', job.id))}
                        >
                          {t('clientDetail.view')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">{t('clientDetail.noJobOrders')}</h3>
              <p className="text-text-secondary mb-4">{t('clientDetail.noJobOrdersDesc')}</p>
              <Button onClick={() => console.log('Add job order')}>
                <Plus className="h-4 w-4 mr-2" />
                {t('clientDetail.addJobOrder')}
              </Button>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'placements' && (
        <Card className="overflow-hidden">
          {clientPlacements.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.candidate')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.position')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.type')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.status')}
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      {t('clientDetail.startDate')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientPlacements.map((placement) => (
                    <tr
                      key={placement.id}
                      className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                    >
                      <td className="py-3 px-4 text-text-primary font-medium">
                        {placement.candidateName}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{placement.jobTitle}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-text-primary capitalize">
                          {placement.type.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlacementStatusBgColor(
                            placement.status
                          )}`}
                        >
                          {placement.status.charAt(0).toUpperCase() + placement.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(placement.startDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">{t('clientDetail.noPlacements')}</h3>
              <p className="text-text-secondary">{t('clientDetail.noPlacementsDesc')}</p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.primaryContact')}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-text-primary font-medium text-lg">{client.primaryContact.name}</p>
                <p className="text-text-secondary">{client.primaryContact.title}</p>
              </div>
              <a
                href={`mailto:${client.primaryContact.email}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent-primary"
              >
                <Mail className="h-4 w-4" />
                {client.primaryContact.email}
              </a>
              <a
                href={`tel:${client.primaryContact.phone}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent-primary"
              >
                <Phone className="h-4 w-4" />
                {client.primaryContact.phone}
              </a>
            </div>
          </Card>

          {client.billingContact && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('clientDetail.billingContact')}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-text-primary font-medium text-lg">{client.billingContact.name}</p>
                </div>
                <a
                  href={`mailto:${client.billingContact.email}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-accent-primary"
                >
                  <Mail className="h-4 w-4" />
                  {client.billingContact.email}
                </a>
                <a
                  href={`tel:${client.billingContact.phone}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-accent-primary"
                >
                  <Phone className="h-4 w-4" />
                  {client.billingContact.phone}
                </a>
              </div>
            </Card>
          )}
        </div>
      )}
    </motion.div>
  );
};
