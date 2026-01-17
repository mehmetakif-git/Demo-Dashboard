import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Printer,
  Mail,
  CheckCircle,
  Clock,
  Box,
} from 'lucide-react';
import { PageHeader, Card, Button, StatusBadge } from '@/components/common';
import { getOrderById, getCustomerById } from '@/data/ecommerce/ecommerceData';
import { ROUTES } from '@/utils/constants';

const timelineSteps = [
  { id: 'pending', label: 'Order Placed', icon: Clock },
  { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { id: 'processing', label: 'Processing', icon: Package },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Box },
];

export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-text-muted mb-4" />
        <p className="text-text-secondary">Order not found</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.ecommerce.orders)}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const customer = getCustomerById(order.customerId);

  // Determine current step index
  const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentStepIndex = statusOrder.indexOf(order.status);

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ecommerce.orders)}>
              <ArrowLeft size={20} />
            </Button>
            <span>Order {order.orderNumber}</span>
          </div>
        }
        subtitle={`Placed on ${new Date(order.createdAt).toLocaleDateString()} at ${new Date(order.createdAt).toLocaleTimeString()}`}
        icon={Package}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Mail size={18} />
              Resend Confirmation
            </Button>
            <Button variant="secondary">
              <Printer size={18} />
              Print Invoice
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        }
      />

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <StatusBadge status={order.status} />
        <StatusBadge status={order.paymentStatus} />
      </div>

      {/* Order Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Order Timeline</h3>
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-background-tertiary">
            <div
              className="h-full bg-success transition-all"
              style={{ width: `${(currentStepIndex / (timelineSteps.length - 1)) * 100}%` }}
            />
          </div>

          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            return (
              <div key={step.id} className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                    isCompleted
                      ? 'bg-success text-white'
                      : 'bg-background-tertiary text-text-muted'
                  } ${isCurrent ? 'ring-4 ring-success/30' : ''}`}
                >
                  <Icon size={20} />
                </div>
                <span className={`mt-2 text-xs font-medium ${isCompleted ? 'text-text-primary' : 'text-text-muted'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary"
                >
                  <div className="w-16 h-16 rounded-lg bg-background-tertiary flex items-center justify-center">
                    <Package size={24} className="text-text-muted" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{item.productName}</p>
                    {item.variantName && (
                      <p className="text-sm text-text-muted">{item.variantName}</p>
                    )}
                    <p className="text-xs text-text-muted">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                    <p className="font-semibold text-text-primary">{item.total.toLocaleString()} QAR</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-border-default space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">{order.subtotal.toLocaleString()} QAR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-text-primary">
                  {order.shippingCost === 0 ? 'Free' : `${order.shippingCost.toLocaleString()} QAR`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    Discount {order.discountCode && `(${order.discountCode})`}
                  </span>
                  <span className="text-success">-{order.discount.toLocaleString()} QAR</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border-default">
                <span className="text-text-primary">Total</span>
                <span className="text-accent-primary">{order.total.toLocaleString()} QAR</span>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Order Notes</h3>
              <p className="text-text-secondary">{order.notes}</p>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">Customer</h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-text-primary">{order.customerName}</p>
              <p className="text-sm text-text-secondary">{order.customerEmail}</p>
              {customer && (
                <>
                  <p className="text-sm text-text-muted">{customer.totalOrders} orders</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate(`/dashboard/ecommerce/customers/${customer.id}`)}
                  >
                    View Customer Profile
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">Shipping Address</h3>
            </div>
            <div className="space-y-1 text-sm text-text-secondary">
              <p className="font-medium text-text-primary">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Method</span>
                <span className="text-sm text-text-primary capitalize">
                  {order.paymentMethod.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Status</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
            </div>
          </Card>

          {/* Shipping Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">Shipping</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Method</span>
                <span className="text-sm text-text-primary capitalize">{order.shippingMethod}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Tracking #</span>
                  <span className="text-sm text-accent-primary font-medium">{order.trackingNumber}</span>
                </div>
              )}
              {order.deliveredAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Delivered</span>
                  <span className="text-sm text-text-primary">
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
