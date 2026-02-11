import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
  Download,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { feeStructure, feePayments, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Fees = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [view, setView] = useState<'payments' | 'structure'>('payments');

  const stats = useMemo(() => {
    const totalFees = feePayments.reduce((acc, p) => acc + p.totalFee, 0);
    const collected = feePayments.reduce((acc, p) => acc + p.paidAmount, 0);
    const pending = feePayments.reduce((acc, p) => acc + p.dueAmount, 0);
    const collectionRate = Math.round((collected / totalFees) * 100);

    return {
      totalFees,
      collected,
      pending,
      collectionRate,
    };
  }, []);

  const filteredPayments = useMemo(() => {
    return feePayments.filter(payment => {
      const matchesSearch = payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.className.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': '#10b981',
      'partial': '#f59e0b',
      'pending': '#ef4444',
    };
    return colors[status] || EDUCATION_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return CheckCircle;
      case 'partial':
        return Clock;
      case 'pending':
        return AlertTriangle;
      default:
        return CreditCard;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} QAR`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('fees.title')}
        subtitle={t('fees.subtitle')}
        icon={CreditCard}
        actions={
          <Button variant="secondary">
            <Download size={18} />
            {t('fees.exportReport')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('fees.totalFees'), value: formatCurrency(stats.totalFees), icon: DollarSign, color: EDUCATION_COLOR },
          { label: t('fees.collected'), value: formatCurrency(stats.collected), icon: CheckCircle, color: '#10b981' },
          { label: t('fees.pending'), value: formatCurrency(stats.pending), icon: AlertTriangle, color: '#ef4444' },
          { label: t('fees.collectionRate'), value: `${stats.collectionRate}%`, icon: TrendingUp, color: '#6366f1' },
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

      {/* View Toggle */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={view === 'payments' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('payments')}
            >
              {t('fees.feePayments')}
            </Button>
            <Button
              variant={view === 'structure' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('structure')}
            >
              {t('fees.feeStructure')}
            </Button>
          </div>
          {view === 'payments' && (
            <>
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <Input
                  placeholder={t('fees.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'paid', 'partial', 'pending'] as const).map((status) => {
                  const statusMap: Record<string, string> = {
                    'all': t('status.all'),
                    'paid': t('status.paid'),
                    'partial': t('status.partial'),
                    'pending': t('status.pending'),
                  };
                  return (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                    >
                      {statusMap[status]}
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Content */}
      {view === 'payments' ? (
        <div className="space-y-4">
          {filteredPayments.map((payment, index) => {
            const statusColor = getStatusColor(payment.status);
            const StatusIcon = getStatusIcon(payment.status);
            const paymentProgress = Math.round((payment.paidAmount / payment.totalFee) * 100);

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-3 flex-1">
                      {(() => {
                        const studentImg = getProfileImage(payment.studentName);
                        return studentImg ? (
                          <img
                            src={studentImg}
                            alt={payment.studentName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: EDUCATION_COLOR }}
                          >
                            {payment.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-semibold text-text-primary">{payment.studentName}</p>
                        <p className="text-sm text-text-muted">{payment.className}</p>
                      </div>
                    </div>

                    {/* Fee Details */}
                    <div className="grid grid-cols-3 gap-4 min-w-[300px]">
                      <div className="text-center">
                        <p className="text-lg font-bold text-text-primary">{formatCurrency(payment.totalFee)}</p>
                        <p className="text-xs text-text-muted">{t('fees.totalFee')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-success">{formatCurrency(payment.paidAmount)}</p>
                        <p className="text-xs text-text-muted">{t('fees.paid')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-error">{formatCurrency(payment.dueAmount)}</p>
                        <p className="text-xs text-text-muted">{t('fees.due')}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="min-w-[150px]">
                      <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${paymentProgress}%`,
                            backgroundColor: statusColor,
                          }}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1 text-center">{t('fees.percentPaid', { percent: paymentProgress })}</p>
                    </div>

                    {/* Status */}
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      <StatusIcon size={14} />
                      {({ paid: t('status.paid'), partial: t('status.partial'), pending: t('status.pending') } as Record<string, string>)[payment.status] || payment.status}
                    </span>

                    {/* Actions */}
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('fees.viewDetails'), onClick: () => {} },
                        { id: 'record', label: t('fees.recordPayment'), onClick: () => {} },
                        { id: 'reminder', label: t('fees.sendReminder'), onClick: () => {} },
                        { id: 'receipt', label: t('fees.printReceipt'), onClick: () => {} },
                      ]}
                    />
                  </div>

                  {/* Payment History */}
                  {payment.payments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border-default">
                      <p className="text-xs text-text-muted mb-2">{t('fees.paymentHistory')}</p>
                      <div className="flex flex-wrap gap-2">
                        {payment.payments.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-2 py-1 bg-background-secondary rounded text-xs"
                          >
                            <span className="text-text-muted">{new Date(p.date).toLocaleDateString()}</span>
                            <span className="text-success font-medium">{formatCurrency(p.amount)}</span>
                            <span className="text-text-muted">({p.method})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}

          {filteredPayments.length === 0 && (
            <Card className="p-12 text-center">
              <CreditCard size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary">{t('fees.noPaymentsFound')}</p>
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('fees.feeStructureTitle')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 px-2 text-sm text-text-muted font-medium">{t('fees.gradeCol')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.tuition')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.admission')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.exam')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.libraryFee')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.transportFee')}</th>
                  <th className="text-right py-3 px-2 text-sm text-text-muted font-medium">{t('fees.total')}</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((fee, index) => (
                  <motion.tr
                    key={fee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border-default hover:bg-background-secondary"
                  >
                    <td className="py-3 px-2">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: `${EDUCATION_COLOR}20`, color: EDUCATION_COLOR }}
                      >
                        {t('fees.gradeCol')} {fee.grade}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-text-primary">
                      {formatCurrency(fee.tuitionFee)}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-text-primary">
                      {formatCurrency(fee.admissionFee)}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-text-primary">
                      {formatCurrency(fee.examFee)}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-text-primary">
                      {formatCurrency(fee.libraryFee)}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-text-primary">
                      {formatCurrency(fee.transportFee)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-lg font-bold" style={{ color: EDUCATION_COLOR }}>
                        {formatCurrency(fee.total)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Fees;
