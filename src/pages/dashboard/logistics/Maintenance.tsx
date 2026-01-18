import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  Plus,
  Truck,
  Calendar,
  MoreVertical,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { maintenanceRecords, vehicles, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalCost = maintenanceRecords.filter(m => m.status === 'completed').reduce((acc, m) => acc + m.cost, 0);
    const inProgress = maintenanceRecords.filter(m => m.status === 'in-progress').length;
    const scheduled = maintenanceRecords.filter(m => m.status === 'scheduled').length;
    const totalDowntime = maintenanceRecords.filter(m => m.downtime).reduce((acc, m) => acc + (m.downtime || 0), 0);

    return { totalCost, inProgress, scheduled, totalDowntime };
  }, []);

  const filteredRecords = useMemo(() => {
    return maintenanceRecords.filter(record => {
      const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.serviceProvider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || record.maintenanceType === typeFilter;
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesVehicle = vehicleFilter === 'all' || record.vehicleId === vehicleFilter;

      return matchesSearch && matchesType && matchesStatus && matchesVehicle;
    });
  }, [searchQuery, typeFilter, statusFilter, vehicleFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': '#3b82f6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'in-progress': return Clock;
      case 'completed': return CheckCircle;
      default: return Wrench;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Maintenance"
        subtitle="Manage vehicle maintenance and repairs"
        icon={Wrench}
        actions={
          <Button>
            <Plus size={18} />
            Schedule Maintenance
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Cost (Month)', value: `QAR ${stats.totalCost.toLocaleString()}`, icon: DollarSign, color: '#ef4444' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: '#f59e0b' },
          { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: '#3b82f6' },
          { label: 'Total Downtime', value: `${stats.totalDowntime}h`, icon: AlertTriangle, color: '#64748b' },
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
              placeholder="Search by vehicle, description, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="all">All Vehicles</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.plateNo}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Routine Service">Routine Service</option>
            <option value="Repair">Repair</option>
            <option value="Inspection">Inspection</option>
          </select>
          <div className="flex gap-2">
            {['all', 'scheduled', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Maintenance Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record, index) => {
          const StatusIcon = getStatusIcon(record.status);

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getStatusColor(record.status)}20` }}
                    >
                      <StatusIcon size={24} style={{ color: getStatusColor(record.status) }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-text-muted" />
                        <h3 className="font-semibold text-text-primary">{record.vehiclePlate}</h3>
                      </div>
                      <p className="text-sm text-text-muted">{record.maintenanceType}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1"
                        style={{ backgroundColor: `${getStatusColor(record.status)}20`, color: getStatusColor(record.status) }}
                      >
                        {record.status.replace(/-/g, ' ')}
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
                      { id: 'edit', label: 'Edit', onClick: () => {} },
                      { id: 'complete', label: 'Mark Complete', onClick: () => {} },
                      { id: 'invoice', label: 'View Invoice', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Description */}
                <div className="mb-4 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-sm text-text-primary">{record.description}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-muted">Date</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={12} className="text-text-muted" />
                      <span className="text-sm text-text-primary">{new Date(record.maintenanceDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Service Provider</p>
                    <p className="text-sm text-text-primary mt-1">{record.serviceProvider}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Mileage</p>
                    <p className="text-sm text-text-primary mt-1">{record.mileage.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Labor Hours</p>
                    <p className="text-sm text-text-primary mt-1">{record.laborHours}h</p>
                  </div>
                </div>

                {/* Parts */}
                {record.parts.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-2">Parts Used</p>
                    <div className="flex flex-wrap gap-2">
                      {record.parts.map((part, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-background-tertiary rounded text-xs text-text-secondary"
                        >
                          <Settings size={10} />
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border-default">
                  <div>
                    <p className="text-xs text-text-muted">Cost</p>
                    <p className="text-lg font-bold" style={{ color: LOGISTICS_COLOR }}>
                      QAR {record.cost.toLocaleString()}
                    </p>
                  </div>
                  {record.downtime && (
                    <div className="text-right">
                      <p className="text-xs text-text-muted">Downtime</p>
                      <p className="text-sm font-medium text-warning">{record.downtime} hours</p>
                    </div>
                  )}
                  {record.nextServiceMileage && (
                    <div className="text-right">
                      <p className="text-xs text-text-muted">Next Service</p>
                      <p className="text-sm font-medium text-text-primary">{record.nextServiceMileage.toLocaleString()} km</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="p-12 text-center">
          <Wrench size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No maintenance records found</p>
        </Card>
      )}
    </div>
  );
};

export default Maintenance;
