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

export const Reports = () => {
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
      title: 'Property Overview',
      icon: Building,
      color: REALESTATE_COLOR,
      stats: [
        { label: 'Total Properties', value: propertyStats.total },
        { label: 'Available', value: propertyStats.available },
        { label: 'Rented', value: propertyStats.rented },
        { label: 'For Sale', value: propertyStats.forSale },
        { label: 'For Rent', value: propertyStats.forRent },
        { label: 'Total Portfolio Value', value: `QAR ${(propertyStats.totalValue / 1000000).toFixed(1)}M` },
      ],
    },
    {
      title: 'Lead Analytics',
      icon: Users,
      color: '#3b82f6',
      stats: [
        { label: 'Total Leads', value: leadStats.total },
        { label: 'New Leads', value: leadStats.newLeads },
        { label: 'Qualified', value: leadStats.qualified },
        { label: 'Converted', value: leadStats.converted },
        { label: 'Conversion Rate', value: `${leadStats.conversionRate}%` },
        { label: 'Buyers', value: leadStats.buyers },
      ],
    },
    {
      title: 'Viewing Performance',
      icon: Eye,
      color: '#8b5cf6',
      stats: [
        { label: 'Total Viewings', value: viewingStats.total },
        { label: 'Scheduled', value: viewingStats.scheduled },
        { label: 'Completed', value: viewingStats.completed },
        { label: 'Interested', value: viewingStats.interested },
        { label: 'Interest Rate', value: `${viewingStats.interestRate}%` },
      ],
    },
    {
      title: 'Offer Analysis',
      icon: Handshake,
      color: '#f59e0b',
      stats: [
        { label: 'Total Offers', value: offerStats.total },
        { label: 'Accepted', value: offerStats.accepted },
        { label: 'Pending/Negotiating', value: offerStats.pending },
        { label: 'Success Rate', value: `${offerStats.successRate}%` },
        { label: 'Accepted Value', value: `QAR ${(offerStats.totalValue / 1000000).toFixed(1)}M` },
      ],
    },
    {
      title: 'Contract Summary',
      icon: FileSignature,
      color: '#0ea5e9',
      stats: [
        { label: 'Total Contracts', value: contractStats.total },
        { label: 'Active Leases', value: contractStats.active },
        { label: 'Completed Sales', value: contractStats.completed },
        { label: 'Total Commission', value: `QAR ${contractStats.totalCommission.toLocaleString()}` },
        { label: 'Avg Commission', value: `QAR ${Math.round(contractStats.avgCommission).toLocaleString()}` },
      ],
    },
    {
      title: 'Payment Collection',
      icon: CreditCard,
      color: '#10b981',
      stats: [
        { label: 'Total Payments', value: paymentStats.total },
        { label: 'Paid', value: paymentStats.paid },
        { label: 'Pending', value: paymentStats.pending },
        { label: 'Overdue', value: paymentStats.overdue },
        { label: 'Total Collected', value: `QAR ${paymentStats.totalCollected.toLocaleString()}` },
        { label: 'Collection Rate', value: `${paymentStats.collectionRate}%` },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Analytics and performance metrics"
        icon={BarChart3}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Properties', value: propertyStats.total, icon: Building, color: REALESTATE_COLOR },
          { label: 'Active Tenants', value: tenants.filter(t => t.status === 'active').length, icon: Users, color: '#3b82f6' },
          { label: 'Total Commission', value: `QAR ${(contractStats.totalCommission / 1000).toFixed(0)}K`, icon: DollarSign, color: '#10b981' },
          { label: 'Top Agent', value: agentStats.topAgent?.name || 'N/A', icon: TrendingUp, color: '#8b5cf6' },
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
          <h3 className="text-lg font-semibold text-text-primary">Agent Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Agent</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Active Listings</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Total Sales</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Total Commission</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
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
