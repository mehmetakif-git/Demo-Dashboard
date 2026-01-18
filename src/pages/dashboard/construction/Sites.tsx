import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Search,
  Plus,
  Phone,
  Users,
  AlertTriangle,
  Calendar,
  CheckCircle,
  MoreVertical,
  HardHat,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { sites, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Sites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = sites.length;
    const active = sites.filter(s => s.status === 'active').length;
    const totalWorkers = sites.reduce((acc, s) => acc + s.activeWorkers, 0);
    const safetyIncidents = sites.reduce((acc, s) => acc + s.safetyIncidents, 0);

    return { total, active, totalWorkers, safetyIncidents };
  }, []);

  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      const matchesSearch = site.siteNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || site.status === statusFilter;
      const matchesProject = projectFilter === 'all' || site.projectId === projectFilter;

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [searchQuery, statusFilter, projectFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'preparation': '#f59e0b',
      'active': '#10b981',
      'suspended': '#ef4444',
      'closed': '#64748b',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Management"
        subtitle="Manage construction sites and workforce"
        icon={MapPin}
        actions={
          <Button>
            <Plus size={18} />
            Add New Site
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sites', value: stats.total, icon: MapPin, color: CONSTRUCTION_COLOR },
          { label: 'Active Sites', value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: 'Total Workers', value: stats.totalWorkers, icon: Users, color: '#3b82f6' },
          { label: 'Safety Incidents', value: stats.safetyIncidents, icon: AlertTriangle, color: stats.safetyIncidents > 0 ? '#ef4444' : '#10b981' },
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by site no, project, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'preparation', 'active', 'suspended', 'closed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${CONSTRUCTION_COLOR}20` }}
                  >
                    <HardHat size={24} style={{ color: CONSTRUCTION_COLOR }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted">{site.siteNo}</p>
                    <h3 className="font-semibold text-text-primary">{site.projectName}</h3>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1"
                      style={{ backgroundColor: `${getStatusColor(site.status)}20`, color: getStatusColor(site.status) }}
                    >
                      {site.status}
                    </span>
                  </div>
                </div>
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'view', label: 'View Details', onClick: () => {} },
                    { id: 'edit', label: 'Edit Site', onClick: () => {} },
                    { id: 'inspection', label: 'Schedule Inspection', onClick: () => {} },
                    { id: 'safety', label: 'Safety Log', onClick: () => {} },
                  ]}
                />
              </div>

              {/* Site Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={14} />
                  <span>{site.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Users size={14} />
                  <span>Supervisor: {site.supervisor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone size={14} />
                  <span>{site.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-default">
                <div>
                  <p className="text-2xl font-bold" style={{ color: CONSTRUCTION_COLOR }}>{site.activeWorkers}</p>
                  <p className="text-xs text-text-muted">Active Workers</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${site.safetyIncidents > 0 ? 'text-error' : 'text-success'}`}>
                    {site.safetyIncidents}
                  </p>
                  <p className="text-xs text-text-muted">Safety Incidents</p>
                </div>
              </div>

              {/* Inspection Info */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Calendar size={12} />
                  <span>Last: {site.lastInspection ? new Date(site.lastInspection).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Calendar size={12} />
                  <span>Next: {site.nextInspection ? new Date(site.nextInspection).toLocaleDateString() : 'TBD'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <Card className="p-12 text-center">
          <MapPin size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No sites found</p>
        </Card>
      )}
    </div>
  );
};

export default Sites;
