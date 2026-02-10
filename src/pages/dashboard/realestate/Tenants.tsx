import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Search,
  MoreVertical,
  Building,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { tenants, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { getProfileImage, getCompanyLogo } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Tenants = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = tenants.length;
    const active = tenants.filter(t => t.status === 'active').length;
    const totalRent = tenants.filter(t => t.status === 'active').reduce((sum, t) => sum + t.monthlyRent, 0);
    const totalDeposits = tenants.reduce((sum, t) => sum + t.securityDeposit, 0);

    return { total, active, totalRent, totalDeposits };
  }, []);

  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.tenantNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const statuses = ['all', 'active', 'expired', 'terminated'];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('realestate.tenants', 'Tenants')}
        subtitle="Manage tenants and lease information"
        icon={UserCheck}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tenants', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Active Leases', value: stats.active, color: '#10b981' },
          { label: 'Monthly Rent', value: `QAR ${stats.totalRent.toLocaleString()}`, color: '#3b82f6' },
          { label: 'Total Deposits', value: `QAR ${stats.totalDeposits.toLocaleString()}`, color: '#f59e0b' },
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
                  <UserCheck size={20} style={{ color: stat.color }} />
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
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tenants Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Tenant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Lease Period</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Monthly Rent</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Deposit</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <motion.tr
                  key={tenant.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const profileImg = getProfileImage(tenant.name);
                        const companyLogo = getCompanyLogo(tenant.name);
                        const image = profileImg || companyLogo;

                        if (image) {
                          return (
                            <img
                              src={image}
                              alt={tenant.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          );
                        }
                        return (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                          >
                            <UserCheck size={18} style={{ color: REALESTATE_COLOR }} />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium text-text-primary">{tenant.name}</p>
                        <p className="text-xs text-text-muted font-mono">{tenant.tenantNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building size={14} className="text-text-muted" />
                      <div>
                        <p className="text-text-secondary text-sm">{tenant.propertyTitle}</p>
                        <p className="text-xs text-text-muted font-mono">{tenant.propertyCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail size={12} className="text-text-muted" />
                        <span className="text-text-secondary">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Phone size={10} />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={12} className="text-text-muted" />
                        <span className="text-text-secondary">{tenant.leaseStart}</span>
                      </div>
                      <p className="text-xs text-text-muted">to {tenant.leaseEnd}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                      QAR {tenant.monthlyRent.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign size={12} className="text-text-muted" />
                      <span className="text-text-secondary">
                        QAR {tenant.securityDeposit.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(tenant.status)}20`, color: getStatusColor(tenant.status) }}
                    >
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
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
                        { id: 'renew', label: 'Renew Lease', onClick: () => {} },
                        { id: 'contact', label: 'Contact', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTenants.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <UserCheck size={48} className="mx-auto mb-4 opacity-50" />
            <p>No tenants found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Tenants;
