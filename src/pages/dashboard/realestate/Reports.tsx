import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Building,
  Users,
  DollarSign,
  TrendingUp,
  FileSignature,
  Eye,
  Handshake,
  CreditCard,
} from 'lucide-react';
import { PageHeader, Card } from '@/components/common';
import {
  properties,
  leads,
  viewings,
  offers,
  contracts,
  tenants,
  payments,
  agents,
  REALESTATE_COLOR,
} from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Reports = () => {
  const { t } = useTranslation('realestate');
  const propertyStats = useMemo(() => {
    const total = properties.length;
    const available = properties.filter(p => p.status === 'available').length;
    const rented = properties.filter(p => p.status === 'rented').length;
    const forSale = properties.filter(p => p.listingType === 'For Sale').length;
    const forRent = properties.filter(p => p.listingType === 'For Rent').length;
    const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
    const avgPrice = forSale > 0 ? totalValue / forSale : 0;

    return { total, available, rented, forSale, forRent, totalValue, avgPrice };
  }, []);

  const leadStats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const converted = leads.filter(l => l.status === 'converted').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';
    const buyers = leads.filter(l => l.leadType === 'Buyer').length;
    const tenantLeads = leads.filter(l => l.leadType === 'Tenant').length;

    return { total, newLeads, qualified, converted, conversionRate, buyers, tenantLeads };
  }, []);

  const viewingStats = useMemo(() => {
    const total = viewings.length;
    const scheduled = viewings.filter(v => v.status === 'scheduled').length;
    const completed = viewings.filter(v => v.status === 'completed').length;
    const interested = viewings.filter(v => v.interested === true).length;
    const interestRate = completed > 0 ? ((interested / completed) * 100).toFixed(1) : '0';

    return { total, scheduled, completed, interested, interestRate };
  }, []);

  const offerStats = useMemo(() => {
    const total = offers.length;
    const accepted = offers.filter(o => o.status === 'accepted').length;
    const pending = offers.filter(o => o.status === 'pending' || o.status === 'negotiating').length;
    const successRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : '0';
    const totalValue = offers.filter(o => o.status === 'accepted').reduce((sum, o) => sum + o.offeredAmount, 0);

    return { total, accepted, pending, successRate, totalValue };
  }, []);

  const contractStats = useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter(c => c.status === 'active').length;
    const completed = contracts.filter(c => c.status === 'completed').length;
    const totalCommission = contracts.reduce((sum, c) => sum + c.commission, 0);
    const avgCommission = total > 0 ? totalCommission / total : 0;

    return { total, active, completed, totalCommission, avgCommission };
  }, []);

  const paymentStats = useMemo(() => {
    const total = payments.length;
    const paid = payments.filter(p => p.status === 'paid').length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const overdue = payments.filter(p => p.status === 'overdue').length;
    const totalCollected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.paidAmount, 0);
    const collectionRate = total > 0 ? ((paid / total) * 100).toFixed(1) : '0';

    return { total, paid, pending, overdue, totalCollected, collectionRate };
  }, []);

  const agentStats = useMemo(() => {
    const totalAgents = agents.length;
    const totalCommission = agents.reduce((sum, a) => sum + a.totalCommission, 0);
    const avgCommission = totalAgents > 0 ? totalCommission / totalAgents : 0;
    const topAgent = agents.sort((a, b) => b.totalCommission - a.totalCommission)[0];

    return { totalAgents, totalCommission, avgCommission, topAgent };
  }, []);

  const reportSections = [
    {
      title: t('reports.propertyOverview'),
      icon: Building,
      color: REALESTATE_COLOR,
      stats: [
        { label: t('reports.totalProperties'), value: propertyStats.total },
        { label: t('reports.available'), value: propertyStats.available },
        { label: t('reports.rented'), value: propertyStats.rented },
        { label: t('reports.forSale'), value: propertyStats.forSale },
        { label: t('reports.forRent'), value: propertyStats.forRent },
        { label: t('reports.totalPortfolioValue'), value: `QAR ${(propertyStats.totalValue / 1000000).toFixed(1)}M` },
      ],
    },
    {
      title: t('reports.leadAnalytics'),
      icon: Users,
      color: '#3b82f6',
      stats: [
        { label: t('reports.totalLeads'), value: leadStats.total },
        { label: t('reports.newLeads'), value: leadStats.newLeads },
        { label: t('reports.qualified'), value: leadStats.qualified },
        { label: t('reports.converted'), value: leadStats.converted },
        { label: t('reports.conversionRate'), value: `${leadStats.conversionRate}%` },
        { label: t('reports.buyers'), value: leadStats.buyers },
      ],
    },
    {
      title: t('reports.viewingPerformance'),
      icon: Eye,
      color: '#8b5cf6',
      stats: [
        { label: t('reports.totalViewings'), value: viewingStats.total },
        { label: t('reports.scheduled'), value: viewingStats.scheduled },
        { label: t('reports.completed'), value: viewingStats.completed },
        { label: t('reports.interested'), value: viewingStats.interested },
        { label: t('reports.interestRate'), value: `${viewingStats.interestRate}%` },
      ],
    },
    {
      title: t('reports.offerAnalysis'),
      icon: Handshake,
      color: '#f59e0b',
      stats: [
        { label: t('reports.totalOffers'), value: offerStats.total },
        { label: t('reports.accepted'), value: offerStats.accepted },
        { label: t('reports.pendingNegotiating'), value: offerStats.pending },
        { label: t('reports.successRate'), value: `${offerStats.successRate}%` },
        { label: t('reports.acceptedValue'), value: `QAR ${(offerStats.totalValue / 1000000).toFixed(1)}M` },
      ],
    },
    {
      title: t('reports.contractSummary'),
      icon: FileSignature,
      color: '#0ea5e9',
      stats: [
        { label: t('reports.totalContracts'), value: contractStats.total },
        { label: t('reports.activeLeases'), value: contractStats.active },
        { label: t('reports.completedSales'), value: contractStats.completed },
        { label: t('reports.totalCommission'), value: `QAR ${contractStats.totalCommission.toLocaleString()}` },
        { label: t('reports.avgCommission'), value: `QAR ${Math.round(contractStats.avgCommission).toLocaleString()}` },
      ],
    },
    {
      title: t('reports.paymentCollection'),
      icon: CreditCard,
      color: '#10b981',
      stats: [
        { label: t('reports.totalPayments'), value: paymentStats.total },
        { label: t('reports.paid'), value: paymentStats.paid },
        { label: t('reports.pending'), value: paymentStats.pending },
        { label: t('reports.overdue'), value: paymentStats.overdue },
        { label: t('reports.totalCollected'), value: `QAR ${paymentStats.totalCollected.toLocaleString()}` },
        { label: t('reports.collectionRate'), value: `${paymentStats.collectionRate}%` },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.title')}
        subtitle={t('reports.subtitle')}
        icon={BarChart3}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('reports.totalProperties'), value: propertyStats.total, icon: Building, color: REALESTATE_COLOR },
          { label: t('reports.activeTenants'), value: tenants.filter(tn => tn.status === 'active').length, icon: Users, color: '#3b82f6' },
          { label: t('reports.totalCommission'), value: `QAR ${(contractStats.totalCommission / 1000).toFixed(0)}K`, icon: DollarSign, color: '#10b981' },
          { label: t('reports.topAgent'), value: agentStats.topAgent?.name || 'N/A', icon: TrendingUp, color: '#8b5cf6' },
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
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card className="p-4 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    <Icon size={20} style={{ color: section.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
                </div>
                <div className="space-y-3">
                  {section.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex justify-between items-center py-2 border-b border-border-default last:border-b-0"
                    >
                      <span className="text-sm text-text-secondary">{stat.label}</span>
                      <span className="font-semibold text-text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Agent Performance */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
          >
            <TrendingUp size={20} style={{ color: REALESTATE_COLOR }} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">{t('reports.agentPerformance')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('reports.agent')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.activeListings')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.totalSales')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('reports.totalCommission')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('reports.status')}</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <motion.tr
                  key={agent.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-text-primary">{agent.name}</p>
                      <p className="text-xs text-text-muted">{agent.specialization.join(', ')}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-text-secondary">{agent.activeListings}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-text-secondary">{agent.totalSales}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                      QAR {agent.totalCommission.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: agent.status === 'active' ? '#10b98120' : '#64748b20',
                        color: agent.status === 'active' ? '#10b981' : '#64748b'
                      }}
                    >
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
