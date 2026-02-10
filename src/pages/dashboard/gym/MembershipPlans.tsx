import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Check,
  X,
  Edit,
  Copy,
  Archive,
  Users,
  DollarSign,
  CreditCard,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  membershipPlans,
  formatCurrency,
  type MembershipPlan,
} from '@/data/gym/gymData';
import { useTranslation } from 'react-i18next';

export const MembershipPlans = () => {
  const { t } = useTranslation('common');
  const [, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [, setIsModalOpen] = useState(false);

  const totalActiveMembers = membershipPlans.reduce((sum, plan) => sum + plan.activeMembers, 0);
  const totalMonthlyRevenue = membershipPlans.reduce((sum, plan) => {
    if (plan.type === 'monthly') return sum + plan.price * plan.activeMembers;
    if (plan.type === 'annual') return sum + (plan.price / 12) * plan.activeMembers;
    return sum;
  }, 0);

  const stats = [
    {
      title: 'Total Plans',
      value: membershipPlans.length.toString(),
      icon: CreditCard,
      iconColor: '#547792',
    },
    {
      title: 'Active Members',
      value: totalActiveMembers.toString(),
      icon: Users,
      iconColor: '#10b981',
    },
    {
      title: 'Est. Monthly Revenue',
      value: formatCurrency(totalMonthlyRevenue),
      icon: DollarSign,
      iconColor: '#f59e0b',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('gym.membershipPlans', 'Membership Plans')}
        subtitle="Manage membership plans and pricing"
        actions={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={() => {
              setSelectedPlan(plan);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Plan Comparison Table */}
      <Card className="p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Feature
                </th>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <th
                    key={plan.id}
                    className="text-center py-3 px-4 text-xs font-semibold uppercase"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className="py-3 px-4 text-text-secondary">Price</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    <span className="text-text-primary font-semibold">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-text-secondary text-sm">
                      /{plan.type === 'annual' ? 'year' : plan.type === 'day' ? 'day' : 'mo'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="py-3 px-4 text-text-secondary">Gym Access</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    <Check className="h-5 w-5 text-green-400 mx-auto" />
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="py-3 px-4 text-text-secondary">Group Classes</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    {plan.features.some((f) => f.toLowerCase().includes('class')) ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="py-3 px-4 text-text-secondary">Pool Access</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    {plan.features.some((f) => f.toLowerCase().includes('pool')) ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className="py-3 px-4 text-text-secondary">PT Sessions</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    {plan.features.some((f) => f.toLowerCase().includes('pt')) ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-secondary">Active Members</td>
                {membershipPlans.slice(0, 4).map((plan) => (
                  <td key={plan.id} className="py-3 px-4 text-center text-text-primary font-medium">
                    {plan.activeMembers}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};

interface PlanCardProps {
  plan: MembershipPlan;
  onEdit: () => void;
}

const PlanCard = ({ plan, onEdit }: PlanCardProps) => {
  const isPopular = plan.activeMembers > 100;

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]"
      style={{ borderTopColor: plan.color, borderTopWidth: '4px' }}
    >
      {isPopular && (
        <div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: plan.color }}
        >
          Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-1">{plan.name}</h3>
        <p className="text-text-secondary text-sm mb-4">{plan.description}</p>

        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-text-primary">
            {formatCurrency(plan.price)}
          </span>
          <span className="text-text-secondary">
            /{plan.type === 'annual' ? 'year' : plan.type === 'day' ? 'day' : 'month'}
          </span>
        </div>

        {plan.setupFee > 0 && (
          <p className="text-sm text-text-secondary mb-4">
            + {formatCurrency(plan.setupFee)} setup fee
          </p>
        )}

        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {plan.restrictions.length > 0 && (
          <div className="border-t border-white/[0.08] pt-4 mb-6">
            <p className="text-xs text-text-muted mb-2">Restrictions:</p>
            {plan.restrictions.map((restriction, index) => (
              <div key={index} className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-xs">{restriction}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-text-secondary">Active Members</span>
          <span className="text-text-primary font-semibold">{plan.activeMembers}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Duplicate', plan.id)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-400 hover:text-orange-300"
            onClick={() => console.log('Archive', plan.id)}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
