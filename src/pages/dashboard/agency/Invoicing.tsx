import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Send,
  MoreHorizontal,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  invoices,
  formatCurrency,
  getInvoiceStatusColor,
} from '@/data/agency/agencyData';

export const Invoicing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const statuses = [...new Set(invoices.map((i) => i.status))];

  const totalAmount = invoices.reduce((sum, i) => sum + i.total, 0);
  const paidAmount = invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingAmount = invoices.filter((i) => i.status === 'pending').reduce((sum, i) => sum + i.total, 0);
  const overdueAmount = invoices.filter((i) => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'overdue':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title="Invoicing"
        subtitle="Manage invoices and billing"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Create Invoice
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Invoiced"
          value={formatCurrency(totalAmount)}
          icon={DollarSign}
          trend={{ value: '+18% this month', type: 'up' }}
        />
        <StatsCard
          title="Paid"
          value={formatCurrency(paidAmount)}
          icon={CheckCircle}
          trend={{ value: `${invoices.filter((i) => i.status === 'paid').length} invoices`, type: 'up' }}
        />
        <StatsCard
          title="Pending"
          value={formatCurrency(pendingAmount)}
          icon={Clock}
          trend={{ value: `${invoices.filter((i) => i.status === 'pending').length} awaiting`, type: 'neutral' }}
        />
        <StatsCard
          title="Overdue"
          value={formatCurrency(overdueAmount)}
          icon={AlertCircle}
          trend={{ value: `${invoices.filter((i) => i.status === 'overdue').length} need attention`, type: 'down' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#6366f1] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none"
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Issue Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Due Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredInvoices.map((invoice) => {
                const statusColor = getInvoiceStatusColor(invoice.status);

                return (
                  <tr
                    key={invoice.id}
                    className="hover:bg-[#1a1a24] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a24]">
                          <FileText className="h-5 w-5 text-[#6366f1]" />
                        </div>
                        <span className="font-medium text-white">{invoice.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94a3b8]">{invoice.clientName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94a3b8]">{invoice.campaignName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{formatCurrency(invoice.total)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94a3b8]">{invoice.issueDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${
                        invoice.status === 'overdue' ? 'text-red-400' : 'text-[#94a3b8]'
                      }`}>
                        {invoice.dueDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        <button className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#1e1e2e] px-6 py-4">
          <p className="text-sm text-[#64748b]">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              Previous
            </button>
            <button className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-[#94a3b8]">Paid</span>
              </div>
              <span className="text-white font-medium">{formatCurrency(paidAmount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-[#94a3b8]">Pending</span>
              </div>
              <span className="text-white font-medium">{formatCurrency(pendingAmount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-[#94a3b8]">Overdue</span>
              </div>
              <span className="text-white font-medium">{formatCurrency(overdueAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment Trend */}
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Statistics</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Collection Rate</span>
                <span className="text-emerald-400 font-semibold">
                  {((paidAmount / totalAmount) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-[#1e1e2e]">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(paidAmount / totalAmount) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Avg Payment Time</span>
                <span className="text-white font-semibold">12 days</span>
              </div>
            </div>
            <div className="rounded-lg bg-[#1a1a24] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">On-time Payments</span>
                <span className="text-emerald-400 font-semibold">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Due */}
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Due</h3>
          <div className="space-y-3">
            {invoices
              .filter((i) => i.status === 'pending')
              .slice(0, 4)
              .map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{invoice.clientName}</p>
                    <p className="text-xs text-[#64748b]">{invoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{formatCurrency(invoice.total)}</p>
                    <p className="text-xs text-[#64748b]">Due {invoice.dueDate}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
