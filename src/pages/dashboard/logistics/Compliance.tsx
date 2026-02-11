import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FileCheck,
  Search,
  Plus,
  Truck,
  User,
  Calendar,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  FileText,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { complianceDocuments, vehicles, drivers, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Compliance = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'valid': t('status.valid'),
    'expiring-soon': t('status.expiringSoon'),
    'expired': t('status.expired'),
  };

  const documentTypes = useMemo(() => {
    return ['all', ...new Set(complianceDocuments.map(d => d.documentType))];
  }, []);

  const stats = useMemo(() => {
    const total = complianceDocuments.length;
    const valid = complianceDocuments.filter(d => d.status === 'valid').length;
    const expiringSoon = complianceDocuments.filter(d => d.status === 'expiring-soon').length;
    const expired = complianceDocuments.filter(d => d.status === 'expired').length;

    return { total, valid, expiringSoon, expired };
  }, []);

  const filteredDocuments = useMemo(() => {
    return complianceDocuments.filter(doc => {
      const matchesSearch = (doc.vehiclePlate && doc.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.driverName && doc.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.documentNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || doc.documentType === typeFilter;
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesEntity = entityFilter === 'all' ||
        (entityFilter === 'vehicles' && doc.vehicleId) ||
        (entityFilter === 'drivers' && doc.driverId);

      return matchesSearch && matchesType && matchesStatus && matchesEntity;
    });
  }, [searchQuery, typeFilter, statusFilter, entityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'valid': '#10b981',
      'expiring-soon': '#f59e0b',
      'expired': '#ef4444',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return CheckCircle;
      case 'expiring-soon': return AlertTriangle;
      case 'expired': return XCircle;
      default: return FileCheck;
    }
  };

  // Compliance checklist
  const complianceChecks = useMemo(() => {
    const vehicleRegistrations = complianceDocuments.filter(d => d.vehicleId && d.documentType === 'Vehicle Registration');
    const vehicleInsurance = complianceDocuments.filter(d => d.vehicleId && d.documentType === 'Insurance');
    const driverLicenses = complianceDocuments.filter(d => d.driverId && d.documentType === 'Driving License');

    return [
      {
        label: t('compliance.vehicleRegistration'),
        passed: vehicleRegistrations.every(d => d.status === 'valid'),
        count: `${vehicleRegistrations.filter(d => d.status === 'valid').length}/${vehicles.length}`,
      },
      {
        label: t('compliance.vehicleInsurance'),
        passed: vehicleInsurance.every(d => d.status === 'valid'),
        count: `${vehicleInsurance.filter(d => d.status === 'valid').length}/${vehicles.length}`,
      },
      {
        label: t('compliance.driverLicenses'),
        passed: driverLicenses.every(d => d.status === 'valid'),
        count: `${driverLicenses.filter(d => d.status === 'valid').length}/${drivers.length}`,
      },
    ];
  }, [t]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('compliance.title')}
        subtitle={t('compliance.subtitle')}
        icon={FileCheck}
        actions={
          <Button>
            <Plus size={18} />
            {t('compliance.addDocument')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('compliance.totalDocuments'), value: stats.total, icon: FileText, color: LOGISTICS_COLOR },
          { label: t('compliance.valid'), value: stats.valid, icon: CheckCircle, color: '#10b981' },
          { label: t('compliance.expiringSoon'), value: stats.expiringSoon, icon: AlertTriangle, color: '#f59e0b' },
          { label: t('compliance.expired'), value: stats.expired, icon: XCircle, color: stats.expired > 0 ? '#ef4444' : '#10b981' },
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

      {/* Compliance Checklist */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('compliance.complianceChecklist')}</h3>
        <div className="space-y-3">
          {complianceChecks.map((check, index) => (
            <motion.div
              key={check.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg"
            >
              <div className="flex items-center gap-3">
                {check.passed ? (
                  <CheckCircle size={20} className="text-success" />
                ) : (
                  <AlertTriangle size={20} className="text-warning" />
                )}
                <span className="text-text-primary">{check.label}</span>
              </div>
              <span className={`text-sm font-medium ${check.passed ? 'text-success' : 'text-warning'}`}>
                {check.count}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('compliance.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {documentTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? t('compliance.allTypes') : type}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
          >
            <option value="all">{t('compliance.allEntities')}</option>
            <option value="vehicles">{t('compliance.vehicles')}</option>
            <option value="drivers">{t('compliance.drivers')}</option>
          </select>
          <div className="flex gap-2">
            {['all', 'valid', 'expiring-soon', 'expired'].map((status) => (
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

      {/* Documents Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.entity')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.documentType')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.documentNo')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.issueDate')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.expiryDate')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.authority')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('compliance.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, index) => {
                const StatusIcon = getStatusIcon(doc.status);

                return (
                  <motion.tr
                    key={doc.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                        >
                          {doc.vehicleId ? (
                            <Truck size={20} style={{ color: LOGISTICS_COLOR }} />
                          ) : (
                            <User size={20} style={{ color: LOGISTICS_COLOR }} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {doc.vehiclePlate || doc.driverName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {doc.vehicleId ? t('compliance.vehicleLabel') : t('compliance.driverLabel')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-primary">{doc.documentType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-text-secondary">{doc.documentNo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} />
                        <span>{new Date(doc.issueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm" style={{ color: getStatusColor(doc.status) }}>
                        <Calendar size={12} />
                        <span>{new Date(doc.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(doc.status)}20`, color: getStatusColor(doc.status) }}
                      >
                        <StatusIcon size={10} />
                        {statusMap[doc.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{doc.authority}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" title={t('compliance.viewBtn')}>
                          <FileText size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title={t('compliance.download')}>
                          <Download size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title={t('compliance.upload')}>
                          <Upload size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: t('compliance.viewDetails'), onClick: () => {} },
                            { id: 'edit', label: t('compliance.edit'), onClick: () => {} },
                            { id: 'renew', label: t('compliance.renew'), onClick: () => {} },
                            { id: 'delete', label: t('compliance.delete'), onClick: () => {} },
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

      {filteredDocuments.length === 0 && (
        <Card className="p-12 text-center">
          <FileCheck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('compliance.noDocumentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Compliance;
