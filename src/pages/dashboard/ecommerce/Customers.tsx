import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Download,
  UserPlus,
  Crown,
  ShoppingBag,
  Eye,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { customers, ecommerceStats } from '@/data/ecommerce/ecommerceData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Customers = () => {
  const { t } = useTranslation('ecommerce');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const stats = [
    { label: t('customers.totalCustomers'), value: ecommerceStats.totalCustomers, icon: Users, color: '#6366f1' },
    { label: t('customers.newThisMonth'), value: ecommerceStats.newCustomersThisMonth, icon: UserPlus, color: '#10b981' },
    { label: t('customers.vipCustomers'), value: customers.filter(c => c.tags.includes('vip')).length, icon: Crown, color: '#f59e0b' },
    { label: t('customers.avgLifetimeValue'), value: `${Math.round(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length).toLocaleString()} QAR`, icon: ShoppingBag, color: '#8b5cf6' },
  ];

  const allTags = [...new Set(customers.flatMap(c => c.tags))];

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery);

      const matchesTag = tagFilter === 'all' || customer.tags.includes(tagFilter);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, tagFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('customers.title')}
        subtitle={t('customers.subtitle')}
        icon={Users}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Download size={18} />
              {t('customers.export')}
            </Button>
            <Button>
              <UserPlus size={18} />
              {t('customers.addCustomer')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
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
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                    <p className="text-xl font-bold text-text-primary">{stat.value}</p>
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
              placeholder={t('customers.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
          >
            <option value="all">{t('customers.allTags')}</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-secondary">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.customer')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.contact')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.orders')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.totalSpent')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.lastOrder')}</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.tags')}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">{t('customers.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => {
                const fullName = `${customer.firstName} ${customer.lastName}`;
                const profileImage = getProfileImage(fullName);
                return (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border-default hover:bg-background-secondary/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/ecommerce/customers/${customer.id}`)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-accent-primary">
                              {customer.firstName[0]}{customer.lastName[0]}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-text-primary">{fullName}</p>
                          <p className="text-xs text-text-muted">{t('customers.since', { date: new Date(customer.createdAt).toLocaleDateString() })}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm text-text-primary">{customer.email}</p>
                        <p className="text-xs text-text-muted">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-text-primary">{customer.totalOrders}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-text-primary">
                        {customer.totalSpent.toLocaleString()} QAR
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-secondary">
                        {new Date(customer.lastOrderAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              tag === 'vip' ? 'bg-warning/20 text-warning' : 'bg-accent-primary/20 text-accent-primary'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {customer.tags.length > 2 && (
                          <span className="text-xs text-text-muted">+{customer.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/ecommerce/customers/${customer.id}`)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'view', label: t('customers.viewProfile'), onClick: () => navigate(`/dashboard/ecommerce/customers/${customer.id}`) },
                            { id: 'email', label: t('customers.sendEmail'), onClick: () => {} },
                            { id: 'orders', label: t('customers.viewOrders'), onClick: () => {} },
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">{t('customers.noCustomersFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Customers;
