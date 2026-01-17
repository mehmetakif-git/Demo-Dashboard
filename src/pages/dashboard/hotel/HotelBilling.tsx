import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Receipt,
  Search,
  Plus,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { billings, HOTEL_COLOR } from '@/data/hotel/hotelData';

export const HotelBilling = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalRevenue = billings.reduce((acc, b) => acc + b.total, 0);
    const pending = billings.filter(b => b.paymentStatus === 'pending').length;
    const paid = billings.filter(b => b.paymentStatus === 'paid').length;
    const partial = billings.filter(b => b.paymentStatus === 'partial').length;

    return { totalRevenue, pending, paid, partial };
  }, []);

  const filteredBillings = useMemo(() => {
    return billings.filter(billing => {
      const matchesSearch = billing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.roomNo.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || billing.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'pending': '#f59e0b',
      'partial': '#3b82f6',
      'refunded': '#ef4444',
    };
    return colors[status] || HOTEL_COLOR;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoices"
        subtitle="Manage guest billing and invoices"
        icon={Receipt}
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
          { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: HOTEL_COLOR },
          { label: 'Paid Invoices', value: stats.paid, icon: CheckCircle, color: '#10b981' },
          { label: 'Pending Payment', value: stats.pending, icon: Clock, color: '#f59e0b' },
          { label: 'Partial Payments', value: stats.partial, icon: CreditCard, color: '#3b82f6' },
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
                    <p className="text-xl font-bold text-text-primary">{stat.value}</p>
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
              placeholder="Search by billing ID, guest name, or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'paid', 'pending', 'partial'].map((status) => (
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

      {/* Billings List */}
      <div className="space-y-4">
        {filteredBillings.map((billing, index) => {
          const paymentColor = getPaymentStatusColor(billing.paymentStatus);
          const paidPercentage = Math.round((billing.paidAmount / billing.total) * 100);

          return (
            <motion.div
              key={billing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Invoice Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HOTEL_COLOR}20` }}
                    >
                      <Receipt size={24} style={{ color: HOTEL_COLOR }} />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{billing.id}</p>
                      <p className="text-sm text-text-muted">{billing.guestName}</p>
                      <p className="text-xs text-text-muted">
                        Room {billing.roomNo} • {new Date(billing.checkIn).toLocaleDateString()} - {new Date(billing.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Charges Breakdown */}
                  <div className="flex-1">
                    <p className="text-xs text-text-muted mb-2">Charges</p>
                    <div className="space-y-1 text-sm max-h-24 overflow-y-auto">
                      {billing.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-text-muted truncate">{item.description}</span>
                          <span className="text-text-primary">{formatCurrency(item.total)}</span>
                        </div>
                      ))}
                      {billing.items.length > 3 && (
                        <p className="text-xs text-text-muted">+{billing.items.length - 3} more items</p>
                      )}
                    </div>
                  </div>

                  {/* Total & Payment Progress */}
                  <div className="min-w-[160px]">
                    <div className="text-right mb-2">
                      <p className="text-xs text-text-muted">
                        Tax: {formatCurrency(billing.tax)} | Discount: {formatCurrency(billing.discount)}
                      </p>
                      <p className="text-xl font-bold" style={{ color: HOTEL_COLOR }}>
                        {formatCurrency(billing.total)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-muted">Paid</span>
                        <span className="text-text-primary">{formatCurrency(billing.paidAmount)}</span>
                      </div>
                      <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${paidPercentage}%`,
                            backgroundColor: paidPercentage === 100 ? '#10b981' : HOTEL_COLOR,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium capitalize text-center"
                      style={{ backgroundColor: `${paymentColor}20`, color: paymentColor }}
                    >
                      {billing.paymentStatus}
                    </span>
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
                      { id: 'edit', label: 'Edit Invoice', onClick: () => {} },
                      { id: 'payment', label: 'Record Payment', onClick: () => {} },
                      { id: 'print', label: 'Print Invoice', onClick: () => {} },
                      { id: 'email', label: 'Email to Guest', onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Payment Method & Balance */}
                <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-2">
                    <CreditCard size={12} />
                    Payment Method: {billing.paymentMethod || 'Not specified'}
                  </span>
                  <span>Balance: {formatCurrency(billing.balance)}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredBillings.length === 0 && (
        <Card className="p-12 text-center">
          <Receipt size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No invoices found</p>
        </Card>
      )}
    </div>
  );
};

export default HotelBilling;
