import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Users,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  Grid3X3,
  List,
  Eye,
  Edit,
  LogIn,
  Calendar,
  CreditCard,
  Clock,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  gymMembers,
  gymStats,
  membershipPlans,
  trainers,
  getMemberStatusColor,
  getMemberInitials,
  formatDate,
  type GymMember,
} from '@/data/gym/gymData';
import { ROUTES } from '@/utils/constants';
import { profileImages } from '@/utils/profileImages';

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'active' | 'expiring' | 'expired' | 'frozen';

export const MemberList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [trainerFilter, setTrainerFilter] = useState<string>('all');

  const filteredMembers = useMemo(() => {
    return gymMembers.filter((member) => {
      // Search filter
      const searchMatch =
        searchQuery === '' ||
        member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.memberId.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' || member.membershipStatus === statusFilter;

      // Plan filter
      const planMatch = planFilter === 'all' || member.membershipPlanId === planFilter;

      // Trainer filter
      const trainerMatch =
        trainerFilter === 'all' ||
        (trainerFilter === 'unassigned' && !member.assignedTrainerId) ||
        member.assignedTrainerId === trainerFilter;

      return searchMatch && statusMatch && planMatch && trainerMatch;
    });
  }, [searchQuery, statusFilter, planFilter, trainerFilter]);

  const handleViewMember = (memberId: string) => {
    navigate(ROUTES.gym.memberDetail.replace(':id', memberId));
  };

  const stats = [
    {
      title: 'Total Members',
      value: gymStats.totalMembers.toString(),
      icon: Users,
      iconColor: '#547792',
    },
    {
      title: 'Active Members',
      value: gymStats.activeMembers.toString(),
      icon: UserCheck,
      iconColor: '#10b981',
    },
    {
      title: 'Expiring This Month',
      value: gymStats.expiringMemberships.toString(),
      icon: AlertTriangle,
      iconColor: '#f59e0b',
    },
    {
      title: 'New This Month',
      value: gymStats.newMembersThisMonth.toString(),
      icon: TrendingUp,
      iconColor: '#10b981',
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
        title="Members"
        subtitle="Manage gym members and their memberships"
        actions={
          <Button onClick={() => console.log('Add member')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring</option>
              <option value="expired">Expired</option>
              <option value="frozen">Frozen</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              <option value="all">All Plans</option>
              {membershipPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>

            {/* Trainer Filter */}
            <select
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              <option value="all">All Trainers</option>
              <option value="unassigned">Unassigned</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        Showing {filteredMembers.length} of {gymMembers.length} members
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onView={() => handleViewMember(member.id)}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Visits
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50 cursor-pointer"
                    onClick={() => handleViewMember(member.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium overflow-hidden">
                          {profileImages[`${member.firstName} ${member.lastName}`] ? (
                            <img
                              src={profileImages[`${member.firstName} ${member.lastName}`]}
                              alt={`${member.firstName} ${member.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getMemberInitials(member.firstName, member.lastName)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-sm text-text-secondary">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-secondary font-mono text-sm">
                      {member.memberId}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${membershipPlans.find((p) => p.id === member.membershipPlanId)?.color}20`,
                          color: membershipPlans.find((p) => p.id === member.membershipPlanId)?.color,
                        }}
                      >
                        {member.membershipPlan}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getMemberStatusColor(
                          member.membershipStatus
                        )}`}
                      >
                        {member.membershipStatus.charAt(0).toUpperCase() +
                          member.membershipStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary text-sm">
                      {formatDate(member.joinDate)}
                    </td>
                    <td className="py-3 px-4 text-text-secondary text-sm">
                      {formatDate(member.lastVisit.split(' ')[0])}
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {member.totalVisits}
                    </td>
                    <td className="py-3 px-4">
                      {member.balance > 0 ? (
                        <span className="text-red-400 font-medium">
                          ${member.balance.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-text-secondary">$0.00</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMember(member.id);
                          }}
                          className="p-1.5 text-text-secondary hover:text-accent-primary transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Check in', member.id);
                          }}
                          className="p-1.5 text-text-secondary hover:text-green-400 transition-colors"
                          title="Check In"
                        >
                          <LogIn className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit', member.id);
                          }}
                          className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredMembers.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No members found</h3>
          <p className="text-text-secondary">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </motion.div>
  );
};

// Member Card Component
interface MemberCardProps {
  member: GymMember;
  onView: () => void;
}

const MemberCard = ({ member, onView }: MemberCardProps) => {
  const plan = membershipPlans.find((p) => p.id === member.membershipPlanId);

  return (
    <Card className="p-4 hover:border-accent-primary/50 transition-colors cursor-pointer" onClick={onView}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
            {profileImages[`${member.firstName} ${member.lastName}`] ? (
              <img
                src={profileImages[`${member.firstName} ${member.lastName}`]}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              getMemberInitials(member.firstName, member.lastName)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-sm text-text-secondary font-mono">{member.memberId}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getMemberStatusColor(
            member.membershipStatus
          )}`}
        >
          {member.membershipStatus.charAt(0).toUpperCase() + member.membershipStatus.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-text-muted" />
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${plan?.color}20`,
              color: plan?.color,
            }}
          >
            {member.membershipPlan}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock className="h-4 w-4 text-text-muted" />
          <span>Last visit: {formatDate(member.lastVisit.split(' ')[0])}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Calendar className="h-4 w-4 text-text-muted" />
          <span>{member.totalVisits} visits total</span>
        </div>

        {member.assignedTrainer && (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <UserCheck className="h-4 w-4 text-text-muted" />
            <span>Trainer: {member.assignedTrainer}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08]">
        <Button variant="ghost" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); onView(); }}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-green-400 hover:text-green-300"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Check in', member.id);
          }}
        >
          <LogIn className="h-4 w-4 mr-1" />
          Check In
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Edit', member.id);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
