import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  MoreVertical,
  Mail,
  User,
  Target,
  MapPin,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { leads, REALESTATE_COLOR, getStatusColor, getPriorityColor } from '@/data/realestate/realestateData';
import { getProfileImage, getCompanyLogo } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Leads = () => {
  const { t } = useTranslation('realestate');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const converted = leads.filter(l => l.status === 'converted').length;

    return { total, newLeads, qualified, converted };
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.leadNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const statuses = ['all', 'new', 'contacted', 'qualified', 'viewing-scheduled', 'converted', 'lost'];
  const priorities = ['all', 'high', 'normal', 'low'];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('leads.title')}
        subtitle={t('leads.subtitle')}
        icon={Users}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('leads.totalLeads'), value: stats.total, color: REALESTATE_COLOR },
          { label: t('leads.new'), value: stats.newLeads, color: '#0ea5e9' },
          { label: t('leads.qualified'), value: stats.qualified, color: '#10b981' },
          { label: t('leads.converted'), value: stats.converted, color: '#8b5cf6' },
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
                  <Users size={20} style={{ color: stat.color }} />
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
              placeholder={t('leads.searchLeads')}
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
                  {status === 'all' ? t('leads.allStatus') : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? t('leads.allPriorities') : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('leads.lead')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('leads.type')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('leads.lookingFor')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('leads.budget')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('leads.agent')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('leads.priority')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('leads.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('leads.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const profileImg = getProfileImage(lead.name);
                        const companyLogo = getCompanyLogo(lead.name);
                        const image = profileImg || companyLogo;

                        if (image) {
                          return (
                            <img
                              src={image}
                              alt={lead.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          );
                        }
                        return (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                          >
                            <User size={18} style={{ color: REALESTATE_COLOR }} />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium text-text-primary">{lead.name}</p>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Mail size={10} />
                          <span>{lead.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: lead.leadType === 'Buyer' ? '#10b98120' : lead.leadType === 'Seller' ? '#f59e0b20' : '#3b82f620',
                        color: lead.leadType === 'Buyer' ? '#10b981' : lead.leadType === 'Seller' ? '#f59e0b' : '#3b82f6'
                      }}
                    >
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Target size={12} className="text-text-muted" />
                        <span className="text-text-secondary">{lead.lookingFor}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <MapPin size={10} />
                        <span>{lead.preferredLocations.join(', ')}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                      QAR {lead.budget.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">{lead.agentName}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getPriorityColor(lead.priority)}20`, color: getPriorityColor(lead.priority) }}
                    >
                      {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(lead.status)}20`, color: getStatusColor(lead.status) }}
                    >
                      {lead.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                        { id: 'view', label: t('leads.viewDetails'), onClick: () => {} },
                        { id: 'contact', label: t('leads.contact'), onClick: () => {} },
                        { id: 'schedule', label: t('leads.scheduleViewing'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('leads.noLeadsFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Leads;
