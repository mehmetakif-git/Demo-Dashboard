import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  DollarSign,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Building,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  commissions,
  getCommissionStatusColor,
} from '@/data/realestate/realestateData';

export const Commissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');

  const filteredCommissions = commissions.filter((commission) => {
    const matchesSearch =
      commission.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    const matchesAgent = agentFilter === 'all' || commission.agentId === agentFilter;
    return matchesSearch && matchesStatus && matchesAgent;
  });

  const totalYTD = commissions.reduce((sum, c) => sum + c.netCommission, 0);
  const pendingTotal = commissions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.netCommission, 0);
  const paidThisMonth = commissions.filter((c) => c.status === 'paid' && c.paidDate?.startsWith('2024-12')).reduce((sum, c) => sum + c.netCommission, 0);
  const avgCommission = totalYTD / commissions.length;

  // Get unique agents for filter
  const uniqueAgents = [...new Map(commissions.map((c) => [c.agentId, { id: c.agentId, name: c.agentName }])).values()];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commissions"
        subtitle="Track agent commissions and payments"
        actions={
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total YTD"
          value={`$${totalYTD.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: "+22%", type: "up" }}
        />
        <StatsCard
          title="Pending"
          value={`$${pendingTotal.toLocaleString()}`}
          icon={Clock}
          iconColor="text-amber-400"
        />
        <StatsCard
          title="Paid This Month"
          value={`$${paidThisMonth.toLocaleString()}`}
          icon={CheckCircle}
          iconColor="text-emerald-400"
        />
        <StatsCard
          title="Avg Commission"
          value={`$${avgCommission.toLocaleString()}`}
          icon={TrendingUp}
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search by property or agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-[#0a0a0f] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-4 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-4 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">All Agents</option>
            {uniqueAgents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Commission Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Property</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Close Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Side</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#64748b]">Gross</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#64748b]">Split</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#64748b]">Net</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommissions.map((commission) => (
                <motion.tr
                  key={commission.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/[0.08] hover:bg-[#1a1a24]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                        <Building className="h-5 w-5 text-[#2e2e3e]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white truncate max-w-[200px]">
                          {commission.propertyAddress}
                        </div>
                        <div className="text-xs text-[#64748b]">
                          {commission.transactionType === 'sale'
                            ? `Sale: $${commission.salePrice?.toLocaleString()}`
                            : `Rent: $${commission.monthlyRent?.toLocaleString()}/mo`
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      commission.transactionType === 'sale'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {commission.transactionType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Calendar className="h-4 w-4 text-[#64748b]" />
                      {commission.closeDate}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] flex items-center justify-center text-white text-xs font-bold">
                        {commission.agentName.split(' ').map(n => n.charAt(0)).join('')}
                      </div>
                      <span className="text-sm text-white">{commission.agentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      commission.side === 'listing'
                        ? 'bg-[#94B4C1]/20 text-[#94B4C1]'
                        : 'bg-[#547792]/20 text-[#547792]'
                    }`}>
                      {commission.side}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm text-white">${commission.grossCommission.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm text-[#94a3b8]">{commission.split}%</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-semibold text-emerald-400">
                      ${commission.netCommission.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCommissionStatusColor(commission.status)}`}>
                      {commission.status === 'paid' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {commission.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#1a1a24]">
                <td colSpan={5} className="px-4 py-3 text-sm font-medium text-white">
                  Total ({filteredCommissions.length} records)
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-white">
                  ${filteredCommissions.reduce((sum, c) => sum + c.grossCommission, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-emerald-400">
                  ${filteredCommissions.reduce((sum, c) => sum + c.netCommission, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">By Agent</h3>
          <div className="space-y-3">
            {uniqueAgents.map((agent) => {
              const agentTotal = commissions
                .filter((c) => c.agentId === agent.id)
                .reduce((sum, c) => sum + c.netCommission, 0);
              return (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] flex items-center justify-center text-white text-xs font-bold">
                      {agent.name.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    <span className="text-sm text-white">{agent.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">${agentTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">By Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-white">Paid</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                ${commissions.filter((c) => c.status === 'paid').reduce((sum, c) => sum + c.netCommission, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <span className="text-sm text-white">Pending</span>
              </div>
              <span className="text-sm font-semibold text-amber-400">
                ${commissions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.netCommission, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
