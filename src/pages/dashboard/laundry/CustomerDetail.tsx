import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Package,
  DollarSign,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  customers,
  orders,
  formatCurrency,
  formatDate,
} from '@/data/laundry/laundryData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const CustomerDetail = () => {
  const { t } = useTranslation('laundry');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const customer = customers.find((c) => c.id === id);
  const customerOrders = customer ? orders.filter((o) => o.customerId === customer.id) : [];

  if (!customer) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t('customerDetail.customerNotFound')}
          subtitle={t('customerDetail.customerNotFoundSubtitle')}
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('customerDetail.goBack')}
            </Button>
          }
        />
      </div>
    );
  }

  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${customer.firstName} ${customer.lastName}`}
        subtitle={customer.vipStatus ? t('customerDetail.vipCustomer') : t('customerDetail.customerLabel')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              {t('customerDetail.back')}
            </Button>
            <Button leftIcon={<Edit size={16} />}>
              {t('customerDetail.edit')}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              {getProfileImage(`${customer.firstName} ${customer.lastName}`) ? (
                <img
                  src={getProfileImage(`${customer.firstName} ${customer.lastName}`)}
                  alt={`${customer.firstName} ${customer.lastName}`}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-sky-400">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  {customer.vipStatus && (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm flex items-center gap-1">
                      <Star size={14} className="fill-amber-400" />
                      VIP
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Phone size={16} className="text-text-muted" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail size={16} className="text-text-muted" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary md:col-span-2">
                    <MapPin size={16} className="text-text-muted" />
                    {customer.address}, {customer.city} {customer.postalCode}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Package size={20} className="mx-auto mb-2 text-sky-400" />
              <p className="text-2xl font-bold text-text-primary">{customer.totalOrders}</p>
              <p className="text-xs text-text-muted">{t('customerDetail.totalOrders')}</p>
            </Card>
            <Card className="p-4 text-center">
              <DollarSign size={20} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(customer.totalSpent)}</p>
              <p className="text-xs text-text-muted">{t('customerDetail.totalSpent')}</p>
            </Card>
            <Card className="p-4 text-center">
              <Star size={20} className="mx-auto mb-2 text-amber-400" />
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(avgOrderValue)}</p>
              <p className="text-xs text-text-muted">{t('customerDetail.avgOrder')}</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar size={20} className="mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold text-text-primary">
                {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : 'N/A'}
              </p>
              <p className="text-xs text-text-muted">{t('customerDetail.lastOrder')}</p>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.recentOrders')}</h3>
            {customerOrders.length > 0 ? (
              <div className="space-y-3">
                {customerOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/laundry/orders/${order.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-text-primary">
                          {new Date(order.pickupDate).getDate()}
                        </p>
                        <p className="text-xs text-text-muted">
                          {new Date(order.pickupDate).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{order.orderNumber}</p>
                        <p className="text-sm text-text-secondary">
                          {t('customerDetail.itemsCount', { count: order.items.reduce((sum, i) => sum + i.quantity, 0) })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-text-primary">{formatCurrency(order.totalAmount)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          order.status === 'delivered'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : order.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-4">{t('customerDetail.noOrdersYet')}</p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preferences */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.preferences')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-muted mb-1">{t('customerDetail.preferredPickup')}</p>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={14} className="text-text-muted" />
                  {customer.preferredPickupTime}
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">{t('customerDetail.preferredDelivery')}</p>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={14} className="text-text-muted" />
                  {customer.preferredDeliveryTime}
                </div>
              </div>
            </div>
          </Card>

          {/* Tags */}
          {customer.tags.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-sky-500/20 text-sky-400 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Notes */}
          {customer.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.notes')}</h3>
              <p className="text-sm text-text-secondary">{customer.notes}</p>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.quickActions')}</h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start"
                leftIcon={<Package size={16} />}
                onClick={() => navigate('/dashboard/laundry/orders/new')}
              >
                {t('customerDetail.newOrder')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Phone size={16} />}>
                {t('customerDetail.callCustomer')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Mail size={16} />}>
                {t('customerDetail.sendEmail')}
              </Button>
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('customerDetail.accountInfo')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">{t('customerDetail.memberSince')}</span>
                <span className="text-text-primary">{formatDate(customer.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{t('customerDetail.statusLabel')}</span>
                <span className="text-emerald-400">{t('customerDetail.active')}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
