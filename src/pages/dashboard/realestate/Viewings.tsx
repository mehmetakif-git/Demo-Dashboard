import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Search,
  MoreVertical,
  Calendar,
  Clock,
  User,
  Building,
  MapPin,
  Video,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { viewings, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { getProfileImage, getCompanyLogo } from '@/utils/profileImages';

export const Viewings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = viewings.length;
    const scheduled = viewings.filter(v => v.status === 'scheduled').length;
    const completed = viewings.filter(v => v.status === 'completed').length;
    const interested = viewings.filter(v => v.interested === true).length;

    return { total, scheduled, completed, interested };
  }, []);

  const filteredViewings = useMemo(() => {
    return viewings.filter(viewing => {
      const matchesSearch = viewing.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        viewing.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        viewing.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        viewing.propertyCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || viewing.status === statusFilter;
      const matchesType = typeFilter === 'all' || viewing.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const statuses = ['all', 'scheduled', 'completed', 'cancelled', 'no-show'];
  const types = ['all', 'In-Person', 'Virtual'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Viewings"
        subtitle="Manage property viewings and tours"
        icon={Eye}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Viewings', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Scheduled', value: stats.scheduled, color: '#3b82f6' },
          { label: 'Completed', value: stats.completed, color: '#10b981' },
          { label: 'Interested', value: stats.interested, color: '#8b5cf6' },
        ].map((stat, index) => (
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
                  <Eye size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search viewings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Viewings Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date & Time</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Agent</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Interested</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredViewings.map((viewing, index) => (
                <motion.tr
                  key={viewing.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                      >
                        <Building size={18} style={{ color: REALESTATE_COLOR }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{viewing.propertyTitle}</p>
                        <p className="text-xs text-text-muted font-mono">{viewing.propertyCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const profileImg = getProfileImage(viewing.leadName);
                        const companyLogo = getCompanyLogo(viewing.leadName);
                        const image = profileImg || companyLogo;

                        if (image) {
                          return (
                            <img
                              src={image}
                              alt={viewing.leadName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          );
                        }
                        return <User size={14} className="text-text-muted" />;
                      })()}
                      <span className="text-text-secondary">{viewing.leadName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={12} className="text-text-muted" />
                        <span className="text-text-secondary">{viewing.viewingDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock size={10} />
                        <span>{viewing.viewingTime} ({viewing.duration} min)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {viewing.type === 'Virtual' ? (
                        <Video size={14} className="text-text-muted" />
                      ) : (
                        <MapPin size={14} className="text-text-muted" />
                      )}
                      <span className="text-sm text-text-secondary">{viewing.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">{viewing.agentName}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {viewing.interested === null ? (
                      <span className="text-text-muted text-sm">-</span>
                    ) : viewing.interested ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-500">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(viewing.status)}20`, color: getStatusColor(viewing.status) }}
                    >
                      {viewing.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'reschedule', label: 'Reschedule', onClick: () => {} },
                        { id: 'feedback', label: 'Add Feedback', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredViewings.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Eye size={48} className="mx-auto mb-4 opacity-50" />
            <p>No viewings found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Viewings;
