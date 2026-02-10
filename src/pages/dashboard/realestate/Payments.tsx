import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  MoreVertical,
  Building,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { payments, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { useTranslation } from 'react-i18next';

export const Payments = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalDue = payments.reduce((sum, p) => sum + p.amount, 0);
    const collected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.paidAmount, 0);
    const pending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    const overdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

    return { totalDue, collected, pending, overdue };
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = payment.paymentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (payment.tenantName && payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        payment.landlordName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesType = typeFilter === 'all' || payment.paymentType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const statuses = ['all', 'paid', 'pending', 'overdue'];
  const types = ['all', 'Rent', 'Security Deposit', 'Commission', 'Other'];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('realestate.payments', 'Payments')}
        subtitle="Track rent payments and collections"
        icon={CreditCard}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Due', value: `QAR ${stats.totalDue.toLocaleString()}`, color: REALESTATE_COLOR },
          { label: 'Collected', value: `QAR ${stats.collected.toLocaleString()}`, color: '#10b981' },
          { label: 'Pending', value: `QAR ${stats.pending.toLocaleString()}`, color: '#f59e0b' },
          { label: 'Overdue', value: `QAR ${stats.overdue.toLocaleString()}`, color: '#ef4444' },
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
                  <CreditCard size={20} style={{ color: stat.color }} />
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
              placeholder="Search payments..."
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
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
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

      {/* Payments Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Payment</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Tenant/Landlord</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Due Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Amount</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Paid</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
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
                        <CreditCard size={18} style={{ color: REALESTATE_COLOR }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary font-mono">{payment.paymentNo}</p>
                        {payment.referenceNo && (
                          <p className="text-xs text-text-muted">Ref: {payment.referenceNo}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: payment.paymentType === 'Rent' ? '#10b98120' :
                          payment.paymentType === 'Commission' ? '#8b5cf620' : '#3b82f620',
                        color: payment.paymentType === 'Rent' ? '#10b981' :
                          payment.paymentType === 'Commission' ? '#8b5cf6' : '#3b82f6'
                      }}
                    >
                      {payment.paymentType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building size={14} className="text-text-muted" />
                      <span className="text-text-secondary text-sm font-mono">{payment.propertyCode}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {payment.tenantName && (
                        <div className="flex items-center gap-1 text-sm">
                          <User size={12} className="text-text-muted" />
                          <span className="text-text-secondary">{payment.tenantName}</span>
                        </div>
                      )}
                      <p className="text-xs text-text-muted">To: {payment.landlordName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <Calendar size={12} className="text-text-muted" />
                      <span>{payment.dueDate}</span>
                    </div>
                    {payment.status === 'overdue' && (
                      <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle size={10} />
                        <span>Overdue</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                      QAR {payment.amount.toLocaleString()}
                    </span>
                    {payment.lateFee > 0 && (
                      <p className="text-xs text-red-500">+{payment.lateFee} late fee</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {payment.paidAmount > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={12} className="text-text-muted" />
                        <span className="text-text-secondary">
                          QAR {payment.paidAmount.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
                    )}
                    {payment.paymentDate && (
                      <p className="text-xs text-text-muted">{payment.paymentDate}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(payment.status)}20`, color: getStatusColor(payment.status) }}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
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
                        { id: 'record', label: 'Record Payment', onClick: () => {} },
                        { id: 'reminder', label: 'Send Reminder', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
            <p>No payments found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Payments;
