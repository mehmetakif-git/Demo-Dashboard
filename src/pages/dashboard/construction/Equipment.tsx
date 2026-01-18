import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Search,
  Plus,
  Calendar,
  Wrench,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  MapPin,
  User,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { equipment, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(equipment.map(e => e.category))];
  }, []);

  const stats = useMemo(() => {
    const total = equipment.length;
    const inUse = equipment.filter(e => e.status === 'in-use').length;
    const available = equipment.filter(e => e.status === 'available').length;
    const maintenance = equipment.filter(e => e.status === 'maintenance').length;
    const totalValue = equipment.reduce((acc, e) => acc + e.purchaseCost, 0);

    return { total, inUse, available, maintenance, totalValue };
  }, []);

  const filteredEquipment = useMemo(() => {
    return equipment.filter(eq => {
      const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.serialNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || eq.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-use': '#3b82f6',
      'available': '#10b981',
      'maintenance': '#f59e0b',
      'out-of-service': '#ef4444',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return 'N/A';
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M QAR`;
    }
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment Management"
        subtitle="Track and manage construction equipment"
        icon={Truck}
        actions={
          <Button>
            <Plus size={18} />
            Add Equipment
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Equipment', value: stats.total, icon: Truck, color: CONSTRUCTION_COLOR },
          { label: 'In Use', value: stats.inUse, icon: CheckCircle, color: '#3b82f6' },
          { label: 'Available', value: stats.available, icon: CheckCircle, color: '#10b981' },
          { label: 'Maintenance', value: stats.maintenance, icon: Wrench, color: '#f59e0b' },
          { label: 'Total Value', value: formatCurrency(stats.totalValue), icon: DollarSign, color: '#8b5cf6' },
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
              placeholder="Search by name, model, or serial no..."
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
            {['all', 'in-use', 'available', 'maintenance', 'out-of-service'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Equipment Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Equipment</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Category</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Current Assignment</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Maintenance</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Daily Rate</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((eq, index) => (
                <motion.tr
                  key={eq.id}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${CONSTRUCTION_COLOR}20` }}
                      >
                        <Truck size={20} style={{ color: CONSTRUCTION_COLOR }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{eq.name}</p>
                        <p className="text-xs text-text-muted">{eq.model} | {eq.serialNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary">{eq.category}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ backgroundColor: `${getStatusColor(eq.status)}20`, color: getStatusColor(eq.status) }}
                    >
                      {eq.status === 'maintenance' && <Wrench size={12} />}
                      {eq.status === 'out-of-service' && <AlertCircle size={12} />}
                      {eq.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {eq.currentProject ? (
                      <div>
                        <div className="flex items-center gap-1 text-sm text-text-primary">
                          <MapPin size={12} />
                          <span className="truncate max-w-[150px]">{getProjectName(eq.currentProject)}</span>
                        </div>
                        {eq.operator && (
                          <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
                            <User size={10} />
                            <span>{eq.operator}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Calendar size={12} />
                        <span>Last: {new Date(eq.lastMaintenance).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-muted mt-1">
                        <Calendar size={12} />
                        <span>Next: {new Date(eq.nextMaintenance).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-medium" style={{ color: CONSTRUCTION_COLOR }}>
                      {eq.dailyRentalRate.toLocaleString()} QAR
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
                        { id: 'edit', label: 'Edit Equipment', onClick: () => {} },
                        { id: 'assign', label: 'Assign to Project', onClick: () => {} },
                        { id: 'maintenance', label: 'Maintenance Log', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredEquipment.length === 0 && (
        <Card className="p-12 text-center">
          <Truck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No equipment found</p>
        </Card>
      )}
    </div>
  );
};

export default Equipment;
