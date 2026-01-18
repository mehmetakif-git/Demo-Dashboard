import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileSignature,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  DollarSign,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { contracts, LAW_COLOR } from '@/data/law/lawData';

export const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const contractTypes = useMemo(() => {
    return ['all', ...new Set(contracts.map(c => c.contractType))];
  }, []);

  const stats = useMemo(() => {
    const activeContracts = contracts.filter(c => c.status === 'active').length;
    const expiringSoon = contracts.filter(c => {
      const endDate = new Date(c.endDate);
      const monthFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return c.status === 'active' && endDate <= monthFromNow;
    }).length;
    const totalValue = contracts.filter(c => c.status === 'active').reduce((acc, c) => acc + c.value, 0);
    const completedContracts = contracts.filter(c => c.status === 'completed').length;

    return { activeContracts, expiringSoon, totalValue, completedContracts };
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.contractTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || contract.contractType === typeFilter;
      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'completed': '#3b82f6',
      'expired': '#ef4444',
    };
    return colors[status] || LAW_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contract Management"
        subtitle="Manage retainers and agreements"
        icon={FileSignature}
        actions={
          <Button>
            <Plus size={18} />
            New Contract
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Contracts', value: stats.activeContracts, icon: CheckCircle, color: '#10b981' },
          { label: 'Expiring Soon', value: stats.expiringSoon, icon: AlertTriangle, color: '#f59e0b' },
          { label: 'Total Value', value: `QAR ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: LAW_COLOR },
          { label: 'Completed', value: stats.completedContracts, icon: FileSignature, color: '#3b82f6' },
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
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {contractTypes.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'completed', 'expired'].map((status) => (
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

      {/* Contracts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredContracts.map((contract, index) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getStatusColor(contract.status)}20` }}
                  >
                    <FileSignature size={18} style={{ color: getStatusColor(contract.status) }} />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{contract.contractTitle}</p>
                    <p className="text-xs text-text-muted">{contract.contractType}</p>
                  </div>
                </div>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{ backgroundColor: `${getStatusColor(contract.status)}20`, color: getStatusColor(contract.status) }}
                >
                  {contract.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{contract.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    {contract.startDate} - {contract.endDate}
                  </span>
                </div>
                {contract.value > 0 && (
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary">
                      QAR {contract.value.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-default">
                <div className="flex items-center gap-2">
                  {contract.autoRenew && (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <RefreshCw size={12} />
                      Auto-renew
                    </span>
                  )}
                  <span className="text-xs text-text-muted">
                    {contract.paymentTerms}
                  </span>
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
                    { id: 'renew', label: 'Renew', onClick: () => {} },
                    { id: 'terminate', label: 'Terminate', onClick: () => {} },
                  ]}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card className="p-12 text-center">
          <FileSignature size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No contracts found</p>
        </Card>
      )}
    </div>
  );
};

export default Contracts;
