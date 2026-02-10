import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Plus,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  FileText,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { billings, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const Insurance = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const insuranceClaims = useMemo(() => {
    return billings
      .filter(b => b.insuranceClaim)
      .map(b => ({
        ...b.insuranceClaim!,
        patientName: b.patientName,
        invoiceNumber: b.invoiceNumber,
        invoiceDate: b.date,
        invoiceTotal: b.total,
        billingId: b.id,
      }));
  }, []);

  const stats = useMemo(() => {
    const totalClaimed = insuranceClaims.reduce((acc, c) => acc + c.amount, 0);
    const approved = insuranceClaims.filter(c => c.status === 'approved');
    const approvedAmount = approved.reduce((acc, c) => acc + c.amount, 0);
    return {
      totalClaims: insuranceClaims.length,
      totalClaimed: totalClaimed.toFixed(2),
      approved: approved.length,
      approvedAmount: approvedAmount.toFixed(2),
      pending: insuranceClaims.filter(c => c.status === 'pending' || c.status === 'submitted').length,
      rejected: insuranceClaims.filter(c => c.status === 'rejected').length,
    };
  }, [insuranceClaims]);

  const filteredClaims = useMemo(() => {
    return insuranceClaims.filter(claim => {
      const matchesSearch = claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, insuranceClaims]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'approved': '#10b981',
      'pending': '#f59e0b',
      'submitted': '#6366f1',
      'rejected': '#ef4444',
    };
    return colors[status] || HEALTHCARE_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('healthcare.insuranceClaims', 'Insurance Claims')}
        subtitle="Manage insurance claims and reimbursements"
        icon={Shield}
        actions={
          <Button>
            <Plus size={18} />
            New Claim
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Claims', value: stats.totalClaims, icon: Shield, color: HEALTHCARE_COLOR },
          { label: 'Total Claimed', value: `${stats.totalClaimed} QAR`, icon: DollarSign, color: '#6366f1' },
          { label: 'Approved', value: `${stats.approvedAmount} QAR`, icon: CheckCircle, color: '#10b981' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
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

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['submitted', 'pending', 'approved', 'rejected'].map((status, index) => {
          const count = insuranceClaims.filter(c => c.status === status).length;
          const StatusIcon = getStatusIcon(status);
          const color = getStatusColor(status);

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <div
                className={`rounded-lg cursor-pointer transition-all hover:bg-background-secondary ${
                  statusFilter === status ? 'ring-2 ring-current' : ''
                }`}
                style={{ color: statusFilter === status ? color : undefined }}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <StatusIcon size={20} style={{ color }} />
                    <div>
                      <p className="text-lg font-bold text-text-primary">{count}</p>
                      <p className="text-xs text-text-muted capitalize">{status}</p>
                    </div>
                  </div>
                </Card>
              </div>
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
              placeholder="Search by patient, claim, or invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'submitted', 'pending', 'approved', 'rejected'].map((status) => (
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

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.map((claim, index) => {
          const StatusIcon = getStatusIcon(claim.status);
          const statusColor = getStatusColor(claim.status);

          return (
            <motion.div
              key={claim.claimNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Claim Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                    >
                      <Shield size={24} style={{ color: HEALTHCARE_COLOR }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{claim.claimNumber}</p>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium capitalize flex items-center gap-1"
                          style={{
                            backgroundColor: `${statusColor}20`,
                            color: statusColor,
                          }}
                        >
                          <StatusIcon size={12} />
                          {claim.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {claim.invoiceNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-text-muted" />
                    <span className="text-sm text-text-primary">{claim.patientName}</span>
                  </div>

                  {/* Invoice Date */}
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-text-primary">
                      <Calendar size={14} />
                      <span className="text-sm">
                        {new Date(claim.invoiceDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">Invoice Date</p>
                  </div>

                  {/* Amounts */}
                  <div className="text-center">
                    <p className="text-sm text-text-muted">Invoice Total</p>
                    <p className="text-sm font-medium text-text-primary">{claim.invoiceTotal} QAR</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-text-muted">Claim Amount</p>
                    <p className="text-lg font-bold" style={{ color: HEALTHCARE_COLOR }}>
                      {claim.amount} QAR
                    </p>
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
                      { id: 'documents', label: 'View Documents', onClick: () => {} },
                      { id: 'followup', label: 'Follow Up', onClick: () => {} },
                      { id: 'appeal', label: 'File Appeal', onClick: () => {} },
                    ]}
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredClaims.length === 0 && (
        <Card className="p-12 text-center">
          <Shield size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No insurance claims found</p>
        </Card>
      )}
    </div>
  );
};

export default Insurance;
