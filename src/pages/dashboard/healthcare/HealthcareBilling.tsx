import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  Plus,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { billings, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';

export const HealthcareBilling = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalRevenue = billings.reduce((acc, b) => acc + b.total, 0);
    const totalPaid = billings.reduce((acc, b) => acc + b.paid, 0);
    const totalPending = billings.reduce((acc, b) => acc + b.balance, 0);
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      totalPending: totalPending.toFixed(2),
      invoiceCount: billings.length,
    };
  }, []);

  const filteredBillings = useMemo(() => {
    return billings.filter(billing => {
      const matchesSearch = billing.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || billing.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'partial': '#f59e0b',
      'pending': '#6366f1',
      'overdue': '#ef4444',
    };
    return colors[status] || HEALTHCARE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        subtitle="Manage patient invoices and payments"
        icon={CreditCard}
        actions={
          <Button>
            <Plus size={18} />
            New Invoice
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `${stats.totalRevenue} QAR`, icon: DollarSign, color: HEALTHCARE_COLOR },
          { label: 'Collected', value: `${stats.totalPaid} QAR`, icon: CheckCircle, color: '#10b981' },
          { label: 'Pending', value: `${stats.totalPending} QAR`, icon: Clock, color: '#f59e0b' },
          { label: 'Invoices', value: stats.invoiceCount, icon: CreditCard, color: '#6366f1' },
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by patient or invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'paid', 'partial', 'pending', 'overdue'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Billings List */}
      <div className="space-y-4">
        {filteredBillings.map((billing, index) => {
          const statusColor = getPaymentStatusColor(billing.paymentStatus);

          return (
            <motion.div
              key={billing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Invoice Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                      >
                        <CreditCard size={24} style={{ color: HEALTHCARE_COLOR }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-text-primary">{billing.invoiceNumber}</p>
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                            style={{
                              backgroundColor: `${statusColor}20`,
                              color: statusColor,
                            }}
                          >
                            {billing.paymentStatus}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {billing.patientName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(billing.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {billing.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm p-2 bg-background-secondary rounded"
                        >
                          <span className="text-text-secondary">{item.description}</span>
                          <span className="text-text-primary">{item.total} QAR</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="lg:w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Subtotal:</span>
                      <span className="text-text-primary">{billing.subtotal} QAR</span>
                    </div>
                    {billing.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Discount:</span>
                        <span className="text-success">-{billing.discount} QAR</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium border-t border-border-default pt-2">
                      <span className="text-text-primary">Total:</span>
                      <span style={{ color: HEALTHCARE_COLOR }}>{billing.total} QAR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Paid:</span>
                      <span className="text-success">{billing.paid} QAR</span>
                    </div>
                    {billing.balance > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Balance:</span>
                        <span className="text-warning">{billing.balance} QAR</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <p className="text-xs text-text-muted">
                        Due: {new Date(billing.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'payment', label: 'Record Payment', onClick: () => {} },
                      { id: 'print', label: 'Print Invoice', onClick: () => {} },
                      { id: 'email', label: 'Email Invoice', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Insurance Claim */}
                {billing.insuranceClaim && (
                  <div className="mt-4 pt-4 border-t border-border-default">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-text-muted" />
                        <span className="text-sm text-text-muted">
                          Insurance Claim: {billing.insuranceClaim.claimNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-text-secondary">
                          Amount: {billing.insuranceClaim.amount} QAR
                        </span>
                        <StatusBadge status={billing.insuranceClaim.status} />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredBillings.length === 0 && (
        <Card className="p-12 text-center">
          <CreditCard size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No billing records found</p>
        </Card>
      )}
    </div>
  );
};

export default HealthcareBilling;
