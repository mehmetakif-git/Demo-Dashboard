import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bed,
  Search,
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { beds, HEALTHCARE_COLOR, getPatientProfileImage } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const BedManagement = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [wardFilter, setWardFilter] = useState<string>('all');

  const wards = useMemo(() => {
    const uniqueWards = [...new Set(beds.map(b => b.ward))];
    return ['all', ...uniqueWards];
  }, []);

  const stats = useMemo(() => {
    const total = beds.length;
    const available = beds.filter(b => b.status === 'available').length;
    const occupied = beds.filter(b => b.status === 'occupied').length;
    const occupancyRate = ((occupied / total) * 100).toFixed(0);

    return {
      total,
      available,
      occupied,
      occupancyRate,
      reserved: beds.filter(b => b.status === 'reserved').length,
      maintenance: beds.filter(b => b.status === 'maintenance').length,
    };
  }, []);

  const filteredBeds = useMemo(() => {
    return beds.filter(bed => {
      const matchesSearch = bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bed.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bed.patientName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || bed.status === statusFilter;
      const matchesWard = wardFilter === 'all' || bed.ward === wardFilter;

      return matchesSearch && matchesStatus && matchesWard;
    });
  }, [searchQuery, statusFilter, wardFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'available': '#10b981',
      'occupied': '#ef4444',
      'reserved': '#f59e0b',
      'maintenance': '#64748b',
    };
    return colors[status] || HEALTHCARE_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return CheckCircle;
      case 'occupied':
        return User;
      case 'reserved':
        return Clock;
      case 'maintenance':
        return Wrench;
      default:
        return Bed;
    }
  };

  const getBedTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'general': HEALTHCARE_COLOR,
      'icu': '#ef4444',
      'private': '#8b5cf6',
      'semi-private': '#6366f1',
      'pediatric': '#10b981',
      'maternity': '#ec4899',
    };
    return colors[type] || HEALTHCARE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('healthcare.bedManagement', 'Bed Management')}
        subtitle="Monitor and manage hospital beds"
        icon={Bed}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Beds', value: stats.total, icon: Bed, color: HEALTHCARE_COLOR },
          { label: 'Available', value: stats.available, icon: CheckCircle, color: '#10b981' },
          { label: 'Occupied', value: stats.occupied, icon: User, color: '#ef4444' },
          { label: 'Reserved', value: stats.reserved, icon: Clock, color: '#f59e0b' },
          { label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, icon: Bed, color: '#6366f1' },
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
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Status Overview */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-3">Status Overview</h3>
        <div className="flex flex-wrap gap-4">
          {['available', 'occupied', 'reserved', 'maintenance'].map((status) => {
            const count = beds.filter(b => b.status === status).length;
            const StatusIcon = getStatusIcon(status);
            const color = getStatusColor(status);
            const isActive = statusFilter === status;

            return (
              <div
                key={status}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive ? 'ring-2 ring-current' : 'bg-background-secondary hover:bg-background-tertiary'
                }`}
                style={{
                  backgroundColor: isActive ? `${color}20` : undefined,
                  color: isActive ? color : undefined,
                }}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              >
                <StatusIcon size={20} style={{ color }} />
                <div>
                  <p className="text-lg font-bold text-text-primary">{count}</p>
                  <p className="text-xs text-text-muted capitalize">{status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by bed, ward, or patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {wards.slice(0, 5).map((ward) => (
              <Button
                key={ward}
                variant={wardFilter === ward ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setWardFilter(ward)}
              >
                {ward === 'all' ? 'All Wards' : ward.replace('Ward', '').replace('Unit', '')}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBeds.map((bed, index) => {
          const StatusIcon = getStatusIcon(bed.status);
          const statusColor = getStatusColor(bed.status);
          const typeColor = getBedTypeColor(bed.bedType);

          return (
            <motion.div
              key={bed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div
                className="rounded-lg border-l-4"
                style={{ borderLeftColor: statusColor }}
              >
              <Card className="p-4 rounded-l-none">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${statusColor}20` }}
                    >
                      <Bed size={24} style={{ color: statusColor }} />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-text-primary">{bed.bedNumber}</p>
                      <p className="text-xs text-text-muted">Room {bed.roomNumber}</p>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'assign', label: 'Assign Patient', onClick: () => {} },
                      { id: 'discharge', label: 'Discharge', onClick: () => {} },
                      { id: 'reserve', label: 'Reserve', onClick: () => {} },
                      { id: 'maintenance', label: 'Mark Maintenance', onClick: () => {} },
                    ]}
                  />
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Ward:</span>
                    <span className="text-text-primary">{bed.ward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Type:</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs capitalize"
                      style={{
                        backgroundColor: `${typeColor}20`,
                        color: typeColor,
                      }}
                    >
                      {bed.bedType.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Daily Rate:</span>
                    <span className="font-medium" style={{ color: HEALTHCARE_COLOR }}>
                      {bed.dailyRate} QAR
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border-default">
                  <div className="flex items-center gap-2">
                    <StatusIcon size={16} style={{ color: statusColor }} />
                    <span
                      className="text-sm font-medium capitalize"
                      style={{ color: statusColor }}
                    >
                      {bed.status}
                    </span>
                  </div>
                </div>

                {bed.status === 'occupied' && bed.patientName && (
                  <div className="mt-3 pt-3 border-t border-border-default">
                    <div className="flex items-center gap-2 mb-2">
                      {getPatientProfileImage(bed.patientName) ? (
                        <img
                          src={getPatientProfileImage(bed.patientName)}
                          alt={bed.patientName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <User size={14} className="text-text-muted" />
                      )}
                      <span className="text-sm font-medium text-text-primary">
                        {bed.patientName}
                      </span>
                    </div>
                    {bed.admissionDate && (
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Calendar size={12} />
                        <span>Admitted: {new Date(bed.admissionDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {bed.expectedDischarge && (
                      <div className="flex items-center gap-2 text-xs text-warning mt-1">
                        <AlertTriangle size={12} />
                        <span>
                          Expected Discharge: {new Date(bed.expectedDischarge).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredBeds.length === 0 && (
        <Card className="p-12 text-center">
          <Bed size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No beds found</p>
        </Card>
      )}
    </div>
  );
};

export default BedManagement;
