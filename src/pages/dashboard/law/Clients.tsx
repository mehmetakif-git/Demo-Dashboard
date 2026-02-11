import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Building,
  User,
  DollarSign,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { clients, LAW_COLOR } from '@/data/law/lawData';

export const Clients = () => {
  const { t } = useTranslation('law');

  const statusMap: Record<string, string> = {
    'all': t('clients.allStatus'),
    'active': t('status.active'),
    'inactive': t('status.inactive'),
  };

  const typeMap: Record<string, string> = {
    'all': t('clients.allTypes'),
    'Individual': t('types.individual'),
    'Corporate': t('types.corporate'),
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const corporateClients = clients.filter(c => c.clientType === 'Corporate').length;
    const outstandingBalance = clients.reduce((acc, c) => acc + c.outstandingBalance, 0);

    return { totalClients, activeClients, corporateClients, outstandingBalance };
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const clientName = client.clientType === 'Individual' ? client.name : client.companyName;
      const matchesSearch = (clientName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery);

      const matchesType = clientTypeFilter === 'all' || client.clientType === clientTypeFilter;
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, clientTypeFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('clients.title')}
        subtitle={t('clients.subtitle')}
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            {t('clients.newClient')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('clients.totalClients'), value: stats.totalClients, icon: Users, color: LAW_COLOR },
          { label: t('clients.activeClients'), value: stats.activeClients, icon: CheckCircle, color: '#10b981' },
          { label: t('clients.corporate'), value: stats.corporateClients, icon: Building, color: '#3b82f6' },
          { label: t('clients.outstanding'), value: `QAR ${stats.outstandingBalance.toLocaleString()}`, icon: DollarSign, color: '#ef4444' },
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
              placeholder={t('clients.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'Individual', 'Corporate'].map((type) => (
              <Button
                key={type}
                variant={clientTypeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setClientTypeFilter(type)}
              >
                {typeMap[type] || type}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status] || status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Clients Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('clients.client')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('clients.contact')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('cases.type')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('clients.activeCases')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('clients.totalBilled')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('clients.outstanding')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('clients.retainer')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('clients.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('clients.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => {
                const displayName = client.clientType === 'Individual' ? client.name : client.companyName;
                const contactPerson = client.clientType === 'Corporate' ? client.contactPerson : null;

                return (
                  <motion.tr
                    key={client.id}
                    className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${LAW_COLOR}20` }}
                        >
                          {client.clientType === 'Corporate' ? (
                            <Building size={18} style={{ color: LAW_COLOR }} />
                          ) : (
                            <User size={18} style={{ color: LAW_COLOR }} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{displayName}</p>
                          {contactPerson && (
                            <p className="text-xs text-text-muted">{t('clients.contactLabel')} {contactPerson}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={12} className="text-text-muted" />
                          <span className="text-text-secondary">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={12} className="text-text-muted" />
                          <span className="text-text-secondary">{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: client.clientType === 'Corporate' ? '#3b82f620' : '#8b5cf620',
                          color: client.clientType === 'Corporate' ? '#3b82f6' : '#8b5cf6'
                        }}
                      >
                        {typeMap[client.clientType] || client.clientType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Briefcase size={14} className="text-text-muted" />
                        <span className="font-medium text-text-primary">{client.activeCases}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-text-primary font-medium">
                        QAR {client.totalBilled.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={client.outstandingBalance > 0 ? 'text-error font-medium' : 'text-text-muted'}>
                        QAR {client.outstandingBalance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {client.retainerAgreement ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                          {t('clients.yes')}
                        </span>
                      ) : (
                        <span className="text-text-muted text-sm">{t('clients.no')}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          client.status === 'active' ? 'bg-success/20 text-success' : 'bg-text-muted/20 text-text-muted'
                        }`}
                      >
                        {statusMap[client.status] || client.status}
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
                          { id: 'view', label: t('clients.viewProfile'), onClick: () => {} },
                          { id: 'edit', label: t('clients.edit'), onClick: () => {} },
                          { id: 'case', label: t('clients.newCase'), onClick: () => {} },
                          { id: 'invoice', label: t('clients.invoice'), onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('clients.noClientsFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Clients;
