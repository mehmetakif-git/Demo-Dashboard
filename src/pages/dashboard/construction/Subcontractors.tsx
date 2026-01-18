import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Star,
  Briefcase,
  CheckCircle,
  MoreVertical,
  Award,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { subcontractors, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Subcontractors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(subcontractors.map(s => s.category))];
  }, []);

  const stats = useMemo(() => {
    const total = subcontractors.length;
    const active = subcontractors.filter(s => s.status === 'active').length;
    const avgRating = subcontractors.reduce((acc, s) => acc + s.rating, 0) / total;
    const activeContracts = subcontractors.reduce((acc, s) => acc + s.activeProjects, 0);

    return { total, active, avgRating: avgRating.toFixed(1), activeContracts };
  }, []);

  const filteredSubcontractors = useMemo(() => {
    return subcontractors.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= Math.floor(rating) ? 'fill-warning text-warning' : 'text-text-muted'}
          />
        ))}
        <span className="ml-1 text-sm text-text-primary">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subcontractor Management"
        subtitle="Manage subcontractors and vendor relationships"
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            Add Subcontractor
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subcontractors', value: stats.total, icon: Users, color: CONSTRUCTION_COLOR },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: '#10b981' },
          { label: 'Avg Rating', value: stats.avgRating, icon: Star, color: '#f59e0b' },
          { label: 'Active Contracts', value: stats.activeContracts, icon: Briefcase, color: '#3b82f6' },
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
              placeholder="Search by name or contact person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Subcontractors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubcontractors.map((sub, index) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: CONSTRUCTION_COLOR }}
                  >
                    {sub.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{sub.name}</h3>
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs mt-1"
                      style={{ backgroundColor: `${CONSTRUCTION_COLOR}20`, color: CONSTRUCTION_COLOR }}
                    >
                      {sub.category}
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
                    { id: 'view', label: 'View Profile', onClick: () => {} },
                    { id: 'edit', label: 'Edit Details', onClick: () => {} },
                    { id: 'assign', label: 'Assign to Project', onClick: () => {} },
                    { id: 'rate', label: 'Rate Performance', onClick: () => {} },
                  ]}
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Users size={14} />
                  <span>{sub.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone size={14} />
                  <span>{sub.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail size={14} />
                  <span className="truncate">{sub.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={14} />
                  <span>{sub.address}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                {renderStars(sub.rating)}
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {sub.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-background-tertiary rounded text-xs text-text-secondary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {sub.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/20 text-success rounded text-xs"
                    >
                      <Award size={10} />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: CONSTRUCTION_COLOR }}>{sub.activeProjects}</p>
                  <p className="text-xs text-text-muted">Active Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">{sub.completedProjects}</p>
                  <p className="text-xs text-text-muted">Completed</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sub.status === 'active' ? 'bg-success/20 text-success' : 'bg-background-tertiary text-text-muted'
                  }`}
                >
                  {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSubcontractors.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No subcontractors found</p>
        </Card>
      )}
    </div>
  );
};

export default Subcontractors;
