import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  DollarSign,
  Building2,
  User,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  placements,
  staffingStats,
  formatCurrency,
  getPlacementStatusBgColor,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';

export const Placements = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter placements
  const filteredPlacements = useMemo(() => {
    return placements.filter((placement) => {
      const matchesSearch =
        searchQuery === '' ||
        placement.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        placement.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        placement.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || placement.status === statusFilter;
      const matchesType = typeFilter === 'all' || placement.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  // Calculate stats
  const avgMargin = placements.length > 0
    ? Math.round(
        placements.reduce((sum, p) => {
          if (p.type === 'contract' && p.billRate > 0) {
            return sum + ((p.billRate - p.payRate) / p.billRate) * 100;
          }
          return sum;
        }, 0) / placements.filter((p) => p.type === 'contract').length
      )
    : 0;

  const stats = [
    {
      title: 'Total Placements',
      value: staffingStats.totalPlacements.toString(),
      icon: CheckCircle,
      iconColor: '#6366f1',
    },
    {
      title: 'Active Placements',
      value: staffingStats.activePlacements.toString(),
      icon: User,
      iconColor: '#10b981',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(staffingStats.monthlyRevenue),
      icon: DollarSign,
      iconColor: '#f59e0b',
    },
    {
      title: 'Avg Margin',
      value: `${avgMargin}%`,
      icon: TrendingUp,
      iconColor: '#8b5cf6',
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
        title="Placements"
        subtitle="Track active and completed placements"
        actions={
          <Button onClick={() => console.log('Add placement')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Placement
          </Button>
        }
      />

      {/* Stats */}
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search placements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
            <option value="extended">Extended</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Types</option>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="temp-to-hire">Temp-to-Hire</option>
          </select>
        </div>
      </Card>

      {/* Placements Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Candidate
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Position
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Client
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Start Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Bill/Pay Rate
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlacements.map((placement) => (
                <tr
                  key={placement.id}
                  className="border-b border-border-default hover:bg-background-secondary/50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                        {placement.candidateName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <p className="font-medium text-text-primary">{placement.candidateName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-primary">{placement.jobTitle}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-text-muted" />
                      <span className="text-text-secondary">{placement.clientName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-background-tertiary text-text-primary capitalize">
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
                  <td className="py-3 px-4">
                    {placement.type === 'contract' || placement.type === 'temp-to-hire' ? (
                      <div className="text-sm">
                        <p className="text-text-primary">${placement.billRate}/hr</p>
                        <p className="text-text-muted">${placement.payRate}/hr pay</p>
                      </div>
                    ) : (
                      <span className="text-text-secondary">{formatCurrency(placement.payRate)}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(ROUTES.staffing.candidateDetail.replace(':id', placement.candidateId))
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredPlacements.length === 0 && (
        <Card className="p-12 text-center">
          <CheckCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No placements found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </motion.div>
  );
};
