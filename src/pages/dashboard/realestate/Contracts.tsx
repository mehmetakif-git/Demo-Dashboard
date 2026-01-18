import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileSignature,
  Search,
  MoreVertical,
  Calendar,
  Building,
  User,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { contracts, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';

export const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter(c => c.status === 'active').length;
    const pendingCompletion = contracts.filter(c => c.status === 'pending-completion').length;
    const totalValue = contracts.reduce((sum, c) => sum + (c.salePrice || c.rentAmount || 0), 0);

    return { total, active, pendingCompletion, totalValue };
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.contractNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
      const matchesType = typeFilter === 'all' || contract.contractType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const statuses = ['all', 'pending-completion', 'active', 'completed', 'cancelled'];
  const types = ['all', 'Sale Agreement', 'Lease Agreement'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contracts"
        subtitle="Manage sale and lease agreements"
        icon={FileSignature}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contracts', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Active Leases', value: stats.active, color: '#10b981' },
          { label: 'Pending Completion', value: stats.pendingCompletion, color: '#f59e0b' },
          { label: 'Total Value', value: `QAR ${(stats.totalValue / 1000000).toFixed(1)}M`, color: '#8b5cf6' },
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
                  <FileSignature size={20} style={{ color: stat.color }} />
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
              placeholder="Search contracts..."
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

      {/* Contracts Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Contract</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Owner</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Value</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Commission</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract, index) => (
                <motion.tr
                  key={contract.id}
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
                        <p className="font-medium text-text-primary">{contract.propertyTitle}</p>
                        <p className="text-xs text-text-muted font-mono">{contract.contractNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: contract.contractType === 'Sale Agreement' ? '#10b98120' : '#3b82f620',
                        color: contract.contractType === 'Sale Agreement' ? '#10b981' : '#3b82f6'
                      }}
                    >
                      {contract.contractType === 'Sale Agreement' ? 'Sale' : 'Lease'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <div>
                        <p className="text-text-secondary text-sm">{contract.clientName}</p>
                        <p className="text-xs text-text-muted">{contract.clientType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">{contract.ownerName}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                      QAR {(contract.salePrice || contract.rentAmount || 0).toLocaleString()}
                    </span>
                    {contract.rentAmount && (
                      <p className="text-xs text-text-muted">/month</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign size={12} className="text-text-muted" />
                      <span className="text-text-secondary">
                        QAR {contract.commission.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{contract.commissionRate}%</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <Calendar size={12} className="text-text-muted" />
                      <span>{contract.contractDate}</span>
                    </div>
                    {contract.leaseEnd && (
                      <p className="text-xs text-text-muted">Ends: {contract.leaseEnd}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(contract.status)}20`, color: getStatusColor(contract.status) }}
                    >
                      {contract.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                        { id: 'view', label: 'View Contract', onClick: () => {} },
                        { id: 'download', label: 'Download PDF', onClick: () => {} },
                        { id: 'renew', label: 'Renew', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContracts.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <FileSignature size={48} className="mx-auto mb-4 opacity-50" />
            <p>No contracts found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Contracts;
