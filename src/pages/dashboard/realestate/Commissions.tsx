import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Search,
  MoreVertical,
  Building,
  User,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { contracts, agents, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Commissions = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [agentFilter, setAgentFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalCommission = contracts.reduce((sum, c) => sum + c.commission, 0);
    const paidCommission = contracts.filter(c => c.status === 'completed' || c.status === 'active').reduce((sum, c) => sum + c.commission, 0);
    const pendingCommission = contracts.filter(c => c.status === 'pending-completion').reduce((sum, c) => sum + c.commission, 0);
    const avgCommission = contracts.length > 0 ? totalCommission / contracts.length : 0;

    return { totalCommission, paidCommission, pendingCommission, avgCommission };
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.contractNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAgent = agentFilter === 'all' || contract.agentId === agentFilter;

      return matchesSearch && matchesAgent;
    });
  }, [searchQuery, agentFilter]);

  const agentCommissions = useMemo(() => {
    const commissionByAgent: Record<string, { name: string; total: number; count: number }> = {};
    contracts.forEach(contract => {
      if (!commissionByAgent[contract.agentId]) {
        commissionByAgent[contract.agentId] = { name: contract.agentName, total: 0, count: 0 };
      }
      commissionByAgent[contract.agentId].total += contract.commission;
      commissionByAgent[contract.agentId].count += 1;
    });
    return Object.entries(commissionByAgent).map(([id, data]) => ({ id, ...data }));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('realestate.commissions', 'Commissions')}
        subtitle="Track agent commissions and earnings"
        icon={DollarSign}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Commission', value: `QAR ${stats.totalCommission.toLocaleString()}`, color: REALESTATE_COLOR },
          { label: 'Paid', value: `QAR ${stats.paidCommission.toLocaleString()}`, color: '#10b981' },
          { label: 'Pending', value: `QAR ${stats.pendingCommission.toLocaleString()}`, color: '#f59e0b' },
          { label: 'Avg. Commission', value: `QAR ${Math.round(stats.avgCommission).toLocaleString()}`, color: '#8b5cf6' },
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
                  <DollarSign size={20} style={{ color: stat.color }} />
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

      {/* Agent Summary */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Commission by Agent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agentCommissions.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg border border-border-default hover:border-border-hover transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                >
                  <User size={18} style={{ color: REALESTATE_COLOR }} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{agent.name}</p>
                  <p className="text-xs text-text-muted">{agent.count} deals</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">Total</span>
                </div>
                <span className="font-bold" style={{ color: REALESTATE_COLOR }}>
                  QAR {agent.total.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search commissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
          >
            <option value="all">All Agents</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Commission Details Table */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Commission Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Contract</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Value</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Rate</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Commission</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Agent</th>
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
                  <td className="py-3 px-4 text-right">
                    <span className="text-text-secondary">
                      QAR {(contract.salePrice || contract.rentAmount || 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Percent size={12} className="text-text-muted" />
                      <span className="text-text-secondary">{contract.commissionRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold" style={{ color: REALESTATE_COLOR }}>
                      QAR {contract.commission.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm">{contract.agentName}</span>
                    </div>
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
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'payout', label: 'Process Payout', onClick: () => {} },
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
            <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
            <p>No commission records found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Commissions;
