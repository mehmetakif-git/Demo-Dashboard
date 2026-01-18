import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  Printer,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { invoices, LAW_COLOR } from '@/data/law/lawData';

export const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalBilled = invoices.reduce((acc, i) => acc + i.total, 0);
    const collected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
    const outstanding = invoices.reduce((acc, i) => acc + i.balance, 0);
    const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'partial').length;

    return { totalBilled, collected, outstanding, pendingInvoices };
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (invoice.caseNo?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'partial': '#f59e0b',
      'pending': '#3b82f6',
      'overdue': '#ef4444',
    };
    return colors[status] || LAW_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'partial': return Clock;
      case 'pending': return Clock;
      case 'overdue': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoicing"
        subtitle="Manage invoices and payments"
        icon={DollarSign}
        actions={
          <Button>
            <Plus size={18} />
            Create Invoice
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Billed', value: `QAR ${stats.totalBilled.toLocaleString()}`, icon: DollarSign, color: LAW_COLOR },
          { label: 'Collected', value: `QAR ${stats.collected.toLocaleString()}`, icon: CheckCircle, color: '#10b981' },
          { label: 'Outstanding', value: `QAR ${stats.outstanding.toLocaleString()}`, icon: Clock, color: '#ef4444' },
          { label: 'Pending Invoices', value: stats.pendingInvoices, icon: AlertTriangle, color: '#f59e0b' },
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
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'paid', 'partial', 'pending', 'overdue'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Invoice No</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Case</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Due Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Total</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Paid</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Balance</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const StatusIcon = getStatusIcon(invoice.status);

                return (
                  <motion.tr
                    key={invoice.id}
                    className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-text-primary">{invoice.invoiceNo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-text-muted" />
                        <span className="text-text-secondary">{invoice.clientName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {invoice.caseNo ? (
                        <span className="font-mono text-sm text-text-secondary">{invoice.caseNo}</span>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary text-sm">{invoice.invoiceDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <span className="text-text-secondary text-sm">{invoice.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-text-primary">
                        QAR {invoice.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-success font-medium">
                        QAR {invoice.paidAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={invoice.balance > 0 ? 'text-error font-medium' : 'text-text-muted'}>
                        QAR {invoice.balance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${getStatusColor(invoice.status)}20`, color: getStatusColor(invoice.status) }}
                      >
                        <StatusIcon size={10} />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" title="Print">
                          <Printer size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title="Send">
                          <Send size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: 'View Details', onClick: () => {} },
                            { id: 'edit', label: 'Edit', onClick: () => {} },
                            { id: 'payment', label: 'Record Payment', onClick: () => {} },
                          ]}
                        />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
            <p>No invoices found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Billing;
