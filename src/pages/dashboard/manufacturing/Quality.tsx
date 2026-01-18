import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Search,
  Plus,
  Calendar,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { qualityChecks, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Quality = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const checkTypes = useMemo(() => {
    return ['all', ...new Set(qualityChecks.map(q => q.checkType))];
  }, []);

  const stats = useMemo(() => {
    const totalChecks = qualityChecks.length;
    const passed = qualityChecks.filter(q => q.status === 'passed').length;
    const failed = qualityChecks.filter(q => q.status === 'failed').length;
    const avgDefectRate = qualityChecks.length > 0
      ? (qualityChecks.reduce((acc, q) => acc + q.defectRate, 0) / qualityChecks.length).toFixed(1)
      : '0';

    return { totalChecks, passed, failed, avgDefectRate };
  }, []);

  const filteredChecks = useMemo(() => {
    return qualityChecks.filter(check => {
      const matchesSearch = check.workOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.inspector.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || check.checkType === typeFilter;
      const matchesStatus = statusFilter === 'all' || check.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'passed': '#10b981',
      'failed': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Minor': '#f59e0b',
      'Major': '#ef4444',
      'Critical': '#dc2626',
    };
    return colors[severity] || MANUFACTURING_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quality Control"
        subtitle="Manage quality checks and inspections"
        icon={CheckSquare}
        actions={
          <Button>
            <Plus size={18} />
            New Quality Check
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Checks Today', value: stats.totalChecks, icon: CheckSquare, color: MANUFACTURING_COLOR },
          { label: 'Passed', value: stats.passed, icon: CheckCircle, color: '#10b981' },
          { label: 'Failed', value: stats.failed, icon: XCircle, color: stats.failed > 0 ? '#ef4444' : '#10b981' },
          { label: 'Avg Defect Rate', value: `${stats.avgDefectRate}%`, icon: AlertTriangle, color: parseFloat(stats.avgDefectRate) > 5 ? '#f59e0b' : '#10b981' },
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
              placeholder="Search by work order, product, or inspector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {checkTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'passed', 'failed'].map((status) => (
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

      {/* Quality Checks List */}
      <div className="space-y-4">
        {filteredChecks.map((check, index) => (
          <motion.div
            key={check.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getStatusColor(check.status)}20` }}
                  >
                    {check.status === 'passed' ? (
                      <CheckCircle size={24} style={{ color: getStatusColor(check.status) }} />
                    ) : (
                      <XCircle size={24} style={{ color: getStatusColor(check.status) }} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{check.productName}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <ClipboardList size={12} />
                        {check.workOrderNo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(check.checkDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {check.checkTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${getStatusColor(check.status)}20`, color: getStatusColor(check.status) }}
                  >
                    {check.status}
                  </span>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit', onClick: () => {} },
                      { id: 'print', label: 'Print Report', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Check Details */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Check Type</p>
                  <p className="text-sm font-medium text-text-primary">{check.checkType}</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Sample Size</p>
                  <p className="text-sm font-medium text-text-primary">{check.sampleSize} units</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Defects Found</p>
                  <p className="text-sm font-medium text-text-primary">{check.defectsFound}</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Defect Rate</p>
                  <p className={`text-sm font-medium ${check.defectRate > 10 ? 'text-error' : check.defectRate > 5 ? 'text-warning' : 'text-success'}`}>
                    {check.defectRate}%
                  </p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Inspector</p>
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-text-muted" />
                    <p className="text-sm font-medium text-text-primary">{check.inspector}</p>
                  </div>
                </div>
              </div>

              {/* Defects List */}
              {check.defects.length > 0 && (
                <div className="border-t border-border-default pt-4">
                  <p className="text-sm font-medium text-text-primary mb-2">Defects Found:</p>
                  <div className="space-y-2">
                    {check.defects.map((defect, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-background-tertiary rounded-lg">
                        <div className="flex items-center gap-3">
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{ backgroundColor: `${getSeverityColor(defect.severity)}20`, color: getSeverityColor(defect.severity) }}
                          >
                            {defect.severity}
                          </span>
                          <span className="text-sm text-text-primary">{defect.defectType}</span>
                          <span className="text-sm text-text-muted">- {defect.description}</span>
                        </div>
                        <span className="text-sm font-medium text-text-primary">x{defect.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {check.notes && (
                <div className="mt-3 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-sm text-text-secondary">{check.notes}</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredChecks.length === 0 && (
        <Card className="p-12 text-center">
          <CheckSquare size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No quality checks found</p>
        </Card>
      )}
    </div>
  );
};

export default Quality;
