import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  Plus,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  MoreVertical,
  Package,
  DollarSign,
  CreditCard,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { clients, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const industries = useMemo(() => {
    return ['all', ...new Set(clients.map(c => c.industry))];
  }, []);

  const stats = useMemo(() => {
    const total = clients.length;
    const active = clients.filter(c => c.status === 'active').length;
    const totalRevenue = clients.reduce((acc, c) => acc + c.currentBalance, 0);
    const avgShipments = Math.round(clients.reduce((acc, c) => acc + c.totalShipments, 0) / clients.length);

    return { total, active, totalRevenue, avgShipments };
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesIndustry && matchesStatus;
    });
  }, [searchQuery, industryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Client Management"
        subtitle="Manage clients and relationships"
        icon={Building2}
        actions={
          <Button>
            <Plus size={18} />
            Add Client
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: stats.total, icon: Building2, color: LOGISTICS_COLOR },
          { label: 'Active Clients', value: stats.active, icon: User, color: '#10b981' },
          { label: 'Outstanding Balance', value: `QAR ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#f59e0b' },
          { label: 'Avg Shipments', value: stats.avgShipments, icon: Package, color: '#3b82f6' },
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
              placeholder="Search by company, contact, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                  >
                    <Building2 size={24} style={{ color: LOGISTICS_COLOR }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{client.companyName}</h3>
                    <p className="text-sm text-text-muted">{client.industry}</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1 ${
                        client.status === 'active' ? 'bg-success/20 text-success' : 'bg-text-muted/20 text-text-muted'
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>
                </div>
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'view', label: 'View Profile', onClick: () => {} },
                    { id: 'edit', label: 'Edit', onClick: () => {} },
                    { id: 'shipment', label: 'New Shipment', onClick: () => {} },
                    { id: 'statement', label: 'View Statement', onClick: () => {} },
                  ]}
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-text-muted" />
                  <span className="text-text-primary">{client.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-text-muted" />
                  <span className="text-text-secondary">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-text-muted" />
                  <span className="text-text-secondary truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-text-muted" />
                  <span className="text-text-secondary truncate">{client.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-background-tertiary rounded-lg">
                <div>
                  <p className="text-xs text-text-muted">Credit Limit</p>
                  <p className="text-sm font-medium text-text-primary">QAR {client.creditLimit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Balance</p>
                  <p className={`text-sm font-medium ${client.currentBalance > 0 ? 'text-warning' : 'text-success'}`}>
                    QAR {client.currentBalance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-warning fill-warning" />
                  <span className="font-medium text-text-primary">{client.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <Package size={14} />
                  <span>{client.totalShipments} shipments</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <CreditCard size={14} />
                  <span>{client.paymentTerms}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No clients found</p>
        </Card>
      )}
    </div>
  );
};

export default Clients;
