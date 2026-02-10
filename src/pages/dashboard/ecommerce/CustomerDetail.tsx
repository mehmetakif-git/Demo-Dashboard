import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
  Edit,
  Ban,
  Crown,
} from 'lucide-react';
import { PageHeader, Card, Button, StatusBadge, Tabs } from '@/components/common';
import { getCustomerById, orders } from '@/data/ecommerce/ecommerceData';
import { getProfileImage } from '@/utils/profileImages';
import { ROUTES } from '@/utils/constants';
import { useTranslation } from 'react-i18next';

export const CustomerDetail = () => {
  const { t: _t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const customer = getCustomerById(id || '');

  if (!customer) {
    return (
      <div className="text-center py-12">
        <User size={48} className="mx-auto text-text-muted mb-4" />
        <p className="text-text-secondary">Customer not found</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.ecommerce.customers)}>
          Back to Customers
        </Button>
      </div>
    );
  }

  const fullName = `${customer.firstName} ${customer.lastName}`;
  const profileImage = getProfileImage(fullName);
  const customerOrders = orders.filter(o => o.customerId === customer.id);

  const tabs = [
    { id: 'orders', label: `Orders (${customerOrders.length})` },
    { id: 'addresses', label: 'Addresses' },
    { id: 'activity', label: 'Activity' },
  ];

  const stats = [
    { label: 'Total Orders', value: customer.totalOrders, icon: ShoppingBag },
    { label: 'Total Spent', value: `${customer.totalSpent.toLocaleString()} QAR`, icon: DollarSign },
    { label: 'Avg Order Value', value: `${customer.averageOrderValue.toLocaleString()} QAR`, icon: DollarSign },
    { label: 'Member Since', value: new Date(customer.createdAt).toLocaleDateString(), icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ecommerce.customers)}>
              <ArrowLeft size={20} />
            </Button>
            <span>{fullName}</span>
          </div>
        }
        subtitle={`Customer ID: ${customer.id}`}
        icon={User}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Mail size={18} />
              Send Email
            </Button>
            <Button variant="secondary">
              <Ban size={18} />
              Block
            </Button>
            <Button>
              <Edit size={18} />
              Edit
            </Button>
          </div>
        }
      />

      {/* Customer Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-accent-primary">
                {customer.firstName[0]}{customer.lastName[0]}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-text-primary">{fullName}</h2>
              {customer.tags.includes('vip') && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-warning/20 text-warning text-sm font-medium">
                  <Crown size={14} />
                  VIP
                </span>
              )}
              <StatusBadge status={customer.status} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {customer.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {customer.phone}
              </div>
            </div>
            {customer.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {customer.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-background-secondary text-text-secondary text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
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
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                    <Icon size={20} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-6">
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {customerOrders.length > 0 ? (
                    customerOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-background-secondary cursor-pointer hover:bg-background-tertiary transition-colors"
                        onClick={() => navigate(`/dashboard/ecommerce/orders/${order.id}`)}
                      >
                        <div>
                          <p className="font-medium text-accent-primary">{order.orderNumber}</p>
                          <p className="text-sm text-text-muted">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">{order.total.toLocaleString()} QAR</p>
                          <StatusBadge status={order.status} />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-text-muted">
                      <ShoppingBag size={32} className="mx-auto mb-2" />
                      <p>No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  {customer.addresses.map((address, index) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg bg-background-secondary"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-accent-primary" />
                          <span className="font-medium text-text-primary capitalize">{address.type}</span>
                          {address.default && (
                            <span className="px-2 py-0.5 rounded bg-success/20 text-success text-xs">Default</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                      </div>
                      <div className="text-sm text-text-secondary ml-6 space-y-1">
                        <p>{address.firstName} {address.lastName}</p>
                        <p>{address.address1}</p>
                        {address.address2 && <p>{address.address2}</p>}
                        <p>{address.city}, {address.state} {address.postalCode}</p>
                        <p>{address.country}</p>
                        <p>{address.phone}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="text-center py-8 text-text-muted">
                  <Calendar size={32} className="mx-auto mb-2" />
                  <p>Activity timeline coming soon</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Notes</h3>
            {customer.notes ? (
              <p className="text-text-secondary">{customer.notes}</p>
            ) : (
              <p className="text-text-muted">No notes added</p>
            )}
            <Button variant="ghost" size="sm" className="mt-4">
              <Edit size={14} className="mr-2" />
              Edit Notes
            </Button>
          </Card>

          {/* Marketing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Marketing</h3>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Email Marketing</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                customer.marketingConsent ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
              }`}>
                {customer.marketingConsent ? 'Subscribed' : 'Not Subscribed'}
              </span>
            </div>
          </Card>

          {/* Activity Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Created</span>
                <span className="text-text-primary">{new Date(customer.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Last Order</span>
                <span className="text-text-primary">{new Date(customer.lastOrderAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
