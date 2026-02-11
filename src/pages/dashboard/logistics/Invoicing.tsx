import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Receipt,
  Search,
  Plus,
  Calendar,
  MoreVertical,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Printer,
  Mail,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { invoices, clients, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Invoicing = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'paid': t('status.paid'),
    'pending': t('status.pending'),
    'overdue': t('status.overdue'),
    'cancelled': t('status.cancelled'),
  };

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((acc, i) => acc + i.total, 0);
    const pending = invoices.filter(i => i.status === 'pending').length;
    const paid = invoices.filter(i => i.status === 'paid').length;
    const overdue = invoices.filter(i => i.status === 'overdue').length;
    const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.balance, 0);

    return { totalRevenue, pending, paid, overdue, pendingAmount };
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesClient = clientFilter === 'all' || invoice.clientId === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchQuery, statusFilter, clientFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'pending': '#f59e0b',
      'overdue': '#ef4444',
      'cancelled': '#64748b',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertTriangle;
      default: return Receipt;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('invoicing.title')}
        subtitle={t('invoicing.subtitle')}
        icon={Receipt}
        actions={
          <Button>
            <Plus size={18} />
            {t('invoicing.createInvoice')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('invoicing.totalRevenue'), value: `QAR ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: t('invoicing.pending'), value: stats.pending, icon: Clock, color: '#f59e0b' },
          { label: t('invoicing.paid'), value: stats.paid, icon: CheckCircle, color: '#10b981' },
          { label: t('invoicing.overdue'), value: stats.overdue, icon: AlertTriangle, color: stats.overdue > 0 ? '#ef4444' : '#10b981' },
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
              placeholder={t('invoicing.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="all">{t('invoicing.allClients')}</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'paid', 'pending', 'overdue', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.invoiceNo')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.client')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.date')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.dueDate')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.total')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.paid')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.balance')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('invoicing.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const StatusIcon = getStatusIcon(invoice.status);

                return (
                  <motion.tr
                    key={invoice.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(invoice.status)}20` }}
                        >
                          <StatusIcon size={20} style={{ color: getStatusColor(invoice.status) }} />
                        </div>
                        <div>
                          <p className="font-mono font-medium text-text-primary">{invoice.invoiceNo}</p>
                          <p className="text-xs text-text-muted">{invoice.shipments.length} {t('invoicing.shipments')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text-primary">{invoice.clientName}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-primary">
                        <Calendar size={12} />
                        <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium text-text-primary">QAR {invoice.total.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="text-success">QAR {invoice.paidAmount.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className={`font-medium ${invoice.balance > 0 ? 'text-warning' : 'text-text-muted'}`}>
                        QAR {invoice.balance.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(invoice.status)}20`, color: getStatusColor(invoice.status) }}
                      >
                        {statusMap[invoice.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" title={t('invoicing.view')}>
                          <FileText size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title={t('invoicing.print')}>
                          <Printer size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title={t('invoicing.sendEmail')}>
                          <Mail size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: t('invoicing.viewDetails'), onClick: () => {} },
                            { id: 'edit', label: t('invoicing.edit'), onClick: () => {} },
                            { id: 'payment', label: t('invoicing.recordPayment'), onClick: () => {} },
                            { id: 'cancel', label: t('invoicing.cancelInvoice'), onClick: () => {} },
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
      </Card>

      {filteredInvoices.length === 0 && (
        <Card className="p-12 text-center">
          <Receipt size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('invoicing.noInvoicesFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Invoicing;
