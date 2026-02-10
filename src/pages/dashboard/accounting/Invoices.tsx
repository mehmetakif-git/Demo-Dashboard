import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Download,
  Eye,
  Send,
  Pencil,
} from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Tabs, DataTable, Modal } from '@/components/common';
import { invoices } from '@/data/accountingData';
import type { Invoice } from '@/data/accountingData';
import { useTranslation } from 'react-i18next';

const tabs = [
  { id: 'all', label: 'All Invoices' },
  { id: 'pending', label: 'Pending', count: 0 },
  { id: 'overdue', label: 'Overdue', count: 0 },
  { id: 'paid', label: 'Paid' },
  { id: 'draft', label: 'Draft' },
];

export const Invoices = () => {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showModal, setShowModal] = useState(false);

  const stats = useMemo(() => {
    const totalAmount = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const paidAmount = invoices
      .filter((inv) => inv.status === 'paid')
      .reduce((acc, inv) => acc + inv.total, 0);
    const pendingAmount = invoices
      .filter((inv) => inv.status === 'pending')
      .reduce((acc, inv) => acc + inv.total, 0);
    const overdueAmount = invoices
      .filter((inv) => inv.status === 'overdue')
      .reduce((acc, inv) => acc + inv.total, 0);
    const pendingCount = invoices.filter((inv) => inv.status === 'pending').length;
    const overdueCount = invoices.filter((inv) => inv.status === 'overdue').length;

    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      totalCount: invoices.length,
      pendingCount,
      overdueCount,
    };
  }, []);

  // Update tab counts
  tabs[1].count = stats.pendingCount;
  tabs[2].count = stats.overdueCount;

  const filteredInvoices = useMemo(() => {
    if (activeTab === 'all') return invoices;
    return invoices.filter((inv) => inv.status === activeTab);
  }, [activeTab]);

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const columns = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      render: (invoice: Invoice) => (
        <span className="text-[#547792] font-medium">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: 'client',
      header: 'Client',
      render: (invoice: Invoice) => (
        <div>
          <p className="text-white font-medium">{invoice.client}</p>
          <p className="text-xs text-white/40">{invoice.clientEmail}</p>
        </div>
      ),
    },
    {
      key: 'issueDate',
      header: 'Issue Date',
      render: (invoice: Invoice) => (
        <span className="text-white/60">{new Date(invoice.issueDate).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (invoice: Invoice) => (
        <span className={`${invoice.status === 'overdue' ? 'text-red-400' : 'text-white/60'}`}>
          {new Date(invoice.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Amount',
      render: (invoice: Invoice) => (
        <span className="text-white font-semibold">${invoice.total.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice: Invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (invoice: Invoice) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleViewInvoice(invoice)}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-white/40 hover:text-[#547792] hover:bg-[#547792]/10 transition-colors cursor-pointer">
            <Pencil className="w-4 h-4" />
          </button>
          {invoice.status === 'draft' && (
            <button className="p-2 rounded-lg text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('accounting.invoices', 'Invoices')}
        subtitle="Create and manage customer invoices"
        icon={FileText}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Plus className="w-4 h-4" />
              Create Invoice
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Invoiced"
          value={`$${(stats.totalAmount / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Paid"
          value={`$${(stats.paidAmount / 1000).toFixed(0)}K`}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Pending"
          value={`$${(stats.pendingAmount / 1000).toFixed(0)}K`}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Overdue"
          value={`$${(stats.overdueAmount / 1000).toFixed(0)}K`}
          icon={AlertCircle}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredInvoices}
          keyExtractor={(inv) => inv.id}
          emptyMessage="No invoices found"
        />
      </motion.div>

      {/* Invoice Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Invoice ${selectedInvoice?.invoiceNumber || ''}`}
      >
        {selectedInvoice && (
          <div className="space-y-6">
            {/* Client Info */}
            <div className="p-4 rounded-lg bg-[#1a1a24]">
              <p className="text-white/40 text-xs mb-1">Client</p>
              <p className="text-white font-medium">{selectedInvoice.client}</p>
              <p className="text-white/60 text-sm">{selectedInvoice.clientEmail}</p>
            </div>

            {/* Dates & Status */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/40 text-xs mb-1">Issue Date</p>
                <p className="text-white">{new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/40 text-xs mb-1">Due Date</p>
                <p className={selectedInvoice.status === 'overdue' ? 'text-red-400' : 'text-white'}>
                  {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/40 text-xs mb-1">Status</p>
                <StatusBadge status={selectedInvoice.status} />
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Items</h4>
              <div className="bg-[#1a1a24] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2e2e3e]">
                      <th className="px-4 py-2 text-left text-xs font-medium text-white/40">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-white/40">Qty</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-white/40">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-white/40">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index} className="border-b border-[#2e2e3e] last:border-b-0">
                        <td className="px-4 py-3 text-white text-sm">{item.description}</td>
                        <td className="px-4 py-3 text-white/60 text-sm text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-white/60 text-sm text-right">
                          ${item.unitPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-white text-sm text-right font-medium">
                          ${item.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-[#2e2e3e]">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">${selectedInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Tax</span>
                <span className="text-white">${selectedInvoice.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[#2e2e3e]">
                <span className="text-white">Total</span>
                <span className="text-[#547792]">${selectedInvoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
