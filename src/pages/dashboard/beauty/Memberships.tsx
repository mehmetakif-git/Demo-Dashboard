import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  CreditCard,
  Users,
  DollarSign,
  Star,
  Check,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  membershipPlans,
  memberships,
  getClientById,
  formatDate,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { useTranslation } from 'react-i18next';

export const Memberships = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'plans' | 'members'>('plans');

  const stats = useMemo(
    () => ({
      totalPlans: membershipPlans.length,
      activeMembers: memberships.filter((m) => m.status === 'active').length,
      monthlyRevenue: memberships
        .filter((m) => m.status === 'active')
        .reduce((sum, m) => {
          const plan = membershipPlans.find((p) => p.id === m.planId);
          return sum + (plan?.price || 0);
        }, 0),
      avgDiscount: Math.round(
        membershipPlans.reduce((sum, p) => {
          // Extract discount percentage from first benefit (e.g., "10% off all services")
          const discountBenefit = p.benefits.find(b => b.includes('% off'));
          const match = discountBenefit?.match(/(\d+)%/);
          return sum + (match ? parseInt(match[1]) : 0);
        }, 0) / membershipPlans.length
      ),
    }),
    []
  );

  const filteredMemberships = useMemo(() => {
    let filtered = [...memberships];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => {
        const client = getClientById(m.clientId);
        return client
          ? `${client.firstName} ${client.lastName}`.toLowerCase().includes(query)
          : false;
      });
    }

    if (selectedPlan !== 'all') {
      filtered = filtered.filter((m) => m.planId === selectedPlan);
    }

    return filtered;
  }, [searchQuery, selectedPlan]);

  const getPlanColor = (planId: string) => {
    const colors: Record<string, string> = {
      'plan-basic': 'from-gray-500/20 to-slate-500/20',
      'plan-premium': 'from-purple-500/20 to-pink-500/20',
      'plan-vip': 'from-amber-500/20 to-orange-500/20',
      'plan-unlimited': 'from-emerald-500/20 to-teal-500/20',
    };
    return colors[planId] || 'from-gray-500/20 to-slate-500/20';
  };

  const getStatusColor = (status: typeof memberships[0]['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'expired':
        return 'bg-red-500/20 text-red-400';
      case 'cancelled':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('beauty.memberships', 'Memberships')}
        subtitle="Manage membership plans and subscribers"
        actions={<Button leftIcon={<Plus size={16} />}>Create Plan</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Plans"
          value={stats.totalPlans.toString()}
          icon={CreditCard}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Active Members"
          value={stats.activeMembers.toString()}
          icon={Users}
          iconColor="#10b981"
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={DollarSign}
          iconColor="#ec4899"
        />
        <StatsCard
          title="Avg. Discount"
          value={`${stats.avgDiscount}%`}
          icon={Star}
          iconColor="#f59e0b"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/[0.03] rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'plans'
              ? 'bg-accent-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Membership Plans
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'members'
              ? 'bg-accent-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Active Members ({stats.activeMembers})
        </button>
      </div>

      {activeTab === 'plans' ? (
        /* Membership Plans */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden hover:border-white/[0.15] transition-all ${
                  plan.id === 'plan-vip' ? 'ring-2 ring-amber-500/50' : ''
                }`}
              >
                {/* Plan Header */}
                <div className={`p-6 bg-gradient-to-br ${getPlanColor(plan.id)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                    {plan.id === 'plan-vip' && (
                      <Crown size={20} className="text-amber-400" />
                    )}
                  </div>
                  <div className="flex items-end gap-1">
                    <p className="text-3xl font-bold text-text-primary">
                      {formatCurrency(plan.price)}
                    </p>
                    <span className="text-text-muted mb-1">/{plan.duration}</span>
                  </div>
                  {(() => {
                    const discountBenefit = plan.benefits.find(b => b.includes('% off'));
                    const match = discountBenefit?.match(/(\d+)%/);
                    const discountPercent = match ? parseInt(match[1]) : 0;
                    return discountPercent > 0 ? (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                        {discountPercent}% off services
                      </span>
                    ) : null;
                  })()}
                </div>

                {/* Benefits */}
                <div className="p-6">
                  <h4 className="text-sm font-medium text-text-muted mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subscribers Count */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08]">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Active Subscribers</span>
                      <span className="text-text-primary font-medium">
                        {memberships.filter((m) => m.planId === plan.id && m.status === 'active').length}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <Button variant="secondary" className="w-full mt-4">
                    Edit Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Members List */
        <>
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px] max-w-md">
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
              </div>

              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="all">All Plans</option>
                {membershipPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Member
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Plan
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Start Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      End Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Auto Renew
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {filteredMemberships.map((membership, index) => {
                    const client = getClientById(membership.clientId);
                    const plan = membershipPlans.find((p) => p.id === membership.planId);

                    if (!client || !plan) return null;

                    return (
                      <motion.tr
                        key={membership.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-white/[0.05] transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-accent-primary">
                                {client.firstName[0]}
                                {client.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">
                                {client.firstName} {client.lastName}
                              </p>
                              <p className="text-sm text-text-muted">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">
                            {plan.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-text-secondary">
                          {formatDate(membership.startDate)}
                        </td>
                        <td className="py-3 px-4 text-text-secondary">
                          {formatDate(membership.endDate)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-xs rounded ${
                              membership.autoRenew
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {membership.autoRenew ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(membership.status)}`}>
                            {membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={14} />}>
                            View
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'members' && filteredMemberships.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No members found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
