import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Star,
  DollarSign,
  LayoutGrid,
  List,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  staff,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Staff = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(staff.map((s) => s.role))];
    return uniqueRoles;
  }, []);

  const stats = useMemo(
    () => ({
      total: staff.length,
      active: staff.filter((s) => s.status === 'available').length,
      avgRating:
        Math.round((staff.reduce((sum, s) => sum + s.rating, 0) / staff.length) * 10) / 10,
      totalRevenue: staff.reduce(
        (sum, s) => sum + s.monthlySales,
        0
      ),
    }),
    []
  );

  const filteredStaff = useMemo(() => {
    let filtered = [...staff];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.role.toLowerCase().includes(query)
      );
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter((s) => s.role === selectedRole);
    }

    // Sort by rating
    filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [searchQuery, selectedRole]);

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
        title={t('beauty.staff', 'Staff')}
        subtitle="Manage your salon team"
        actions={<Button leftIcon={<Plus size={16} />}>Add Staff</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Staff"
          value={stats.total.toString()}
          icon={Users}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Active"
          value={stats.active.toString()}
          icon={Users}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg. Rating"
          value={stats.avgRating.toString()}
          icon={Star}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          iconColor="#ec4899"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px] max-w-md">
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Staff Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-5 hover:border-white/[0.15] transition-all cursor-pointer group"
                onClick={() => navigate(`/dashboard/beauty/staff/${member.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getProfileImage(member.name) ? (
                      <img
                        src={getProfileImage(member.name)}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-emerald-400">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-text-primary">{member.name}</h3>
                      <p className="text-sm text-text-secondary">{member.role}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-text-muted group-hover:text-text-primary transition-colors"
                  />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= Math.round(member.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-600'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {member.rating} ({member.reviewCount} reviews)
                  </span>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specializations.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-text-primary">
                      {member.appointmentsToday}
                    </p>
                    <p className="text-xs text-text-muted">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-text-primary">
                      {formatCurrency(member.monthlySales)}
                    </p>
                    <p className="text-xs text-text-muted">Monthly Sales</p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Staff Member
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Appointments
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/beauty/staff/${member.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(member.name) ? (
                          <img
                            src={getProfileImage(member.name)}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-emerald-400">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-text-primary">{member.name}</p>
                          <p className="text-sm text-text-secondary">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-text-primary">{member.phone}</p>
                        <p className="text-text-secondary">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-text-primary">{member.rating}</span>
                        <span className="text-text-muted">({member.reviewCount})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-primary">
                      {member.appointmentsToday}
                    </td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {formatCurrency(member.monthlySales)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredStaff.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No staff members found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
