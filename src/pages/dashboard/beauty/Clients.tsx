import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Calendar,
  DollarSign,
  LayoutGrid,
  List,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  clients,
  staff,
  formatDate,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';

export const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: clients.length,
    vip: clients.filter((c) => c.vipStatus).length,
    newThisMonth: clients.filter((c) => {
      const createdDate = new Date(c.createdAt);
      const now = new Date();
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
    }).length,
    avgSpend: Math.round(clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.length),
  }), []);

  const filteredClients = useMemo(() => {
    let filtered = [...clients];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query)
      );
    }

    if (selectedFilter === 'vip') {
      filtered = filtered.filter((c) => c.vipStatus);
    } else if (selectedFilter === 'members') {
      filtered = filtered.filter((c) => c.membershipId);
    }

    // Sort by total spent (VIPs first, then by spending)
    filtered.sort((a, b) => {
      if (a.vipStatus && !b.vipStatus) return -1;
      if (!a.vipStatus && b.vipStatus) return 1;
      return b.totalSpent - a.totalSpent;
    });

    return filtered;
  }, [searchQuery, selectedFilter]);

  const getPreferredStylistName = (stylistId: string | null) => {
    if (!stylistId) return null;
    const stylist = staff.find((s) => s.id === stylistId);
    return stylist?.name;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        subtitle="Manage your salon clients"
        actions={
          <Button leftIcon={<Plus size={16} />}>Add Client</Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Clients"
          value={stats.total.toString()}
          icon={Users}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="VIP Clients"
          value={stats.vip.toString()}
          icon={Crown}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="New This Month"
          value={stats.newThisMonth.toString()}
          icon={Calendar}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg. Spend"
          value={formatCurrency(stats.avgSpend)}
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
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Clients</option>
              <option value="vip">VIP Only</option>
              <option value="members">Members Only</option>
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

      {/* Clients Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-5 hover:border-white/[0.15] transition-all cursor-pointer group"
                onClick={() => navigate(`/dashboard/beauty/clients/${client.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getProfileImage(`${client.firstName} ${client.lastName}`) ? (
                      <img
                        src={getProfileImage(`${client.firstName} ${client.lastName}`)}
                        alt={`${client.firstName} ${client.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent-primary">
                          {client.firstName[0]}
                          {client.lastName[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text-primary">
                          {client.firstName} {client.lastName}
                        </h3>
                        {client.vipStatus && (
                          <Crown size={14} className="text-amber-400" />
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{client.email}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-text-muted group-hover:text-text-primary transition-colors"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {client.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08]">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-text-primary">{client.visitCount}</p>
                    <p className="text-xs text-text-muted">Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-text-primary">
                      {formatCurrency(client.totalSpent)}
                    </p>
                    <p className="text-xs text-text-muted">Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      {formatDate(client.lastVisit)}
                    </p>
                    <p className="text-xs text-text-muted">Last Visit</p>
                  </div>
                </div>

                {/* Preferred Stylist */}
                {client.preferredStylist && (
                  <div className="mt-4 pt-4 border-t border-white/[0.08] text-sm">
                    <span className="text-text-muted">Preferred: </span>
                    <span className="text-text-secondary">
                      {getPreferredStylistName(client.preferredStylist)}
                    </span>
                  </div>
                )}
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Visits</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total Spent</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Last Visit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredClients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/beauty/clients/${client.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(`${client.firstName} ${client.lastName}`) ? (
                          <img
                            src={getProfileImage(`${client.firstName} ${client.lastName}`)}
                            alt={`${client.firstName} ${client.lastName}`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent-primary">
                              {client.firstName[0]}
                              {client.lastName[0]}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary">
                            {client.firstName} {client.lastName}
                          </span>
                          {client.vipStatus && <Crown size={12} className="text-amber-400" />}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-text-primary">{client.phone}</p>
                        <p className="text-text-secondary">{client.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-primary">{client.visitCount}</td>
                    <td className="py-3 px-4 text-text-primary font-medium">
                      {formatCurrency(client.totalSpent)}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{formatDate(client.lastVisit)}</td>
                    <td className="py-3 px-4">
                      {client.membershipId ? (
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">
                          Member
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded">
                          Regular
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredClients.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No clients found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
