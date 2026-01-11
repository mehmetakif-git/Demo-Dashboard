import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Printer,
  Truck,
  Phone,
  Mail,
  MapPin,
  Package,
  CreditCard,
  User,
  Shirt,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  orders,
  getCustomerById,
  getDriverById,
  formatCurrency,
  formatDate,
  formatDateTime,
} from '@/data/laundry/laundryData';

export const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === id);
  const customer = order ? getCustomerById(order.customerId) : undefined;
  const driver = order?.driverId ? getDriverById(order.driverId) : undefined;

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Order Not Found"
          subtitle="The requested order could not be found"
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          }
        />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'picked-up':
        return 'bg-purple-500/20 text-purple-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'ready':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'out-for-delivery':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const statusSteps = ['pending', 'picked-up', 'processing', 'ready', 'out-for-delivery', 'delivered'];
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.orderNumber}
        subtitle={`Created on ${formatDateTime(order.createdAt)}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="secondary" leftIcon={<Printer size={16} />}>
              Print
            </Button>
            <Button leftIcon={<Edit size={16} />}>
              Edit Order
            </Button>
          </div>
        }
      />

      {/* Status Tracker */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Order Status</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
            {order.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </span>
        </div>

        {order.status !== 'cancelled' && (
          <div className="relative">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        isCompleted
                          ? 'bg-sky-500 text-white'
                          : 'bg-white/[0.05] text-text-muted'
                      } ${isCurrent ? 'ring-4 ring-sky-500/30' : ''}`}
                    >
                      {index + 1}
                    </div>
                    <p className={`mt-2 text-xs text-center ${isCompleted ? 'text-text-primary' : 'text-text-muted'}`}>
                      {step.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/[0.1]" style={{ transform: 'translateY(-50%)', margin: '0 5%' }}>
              <div
                className="h-full bg-sky-500 transition-all"
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <Shirt size={24} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{item.garmentName}</p>
                      <p className="text-sm text-text-muted">{item.serviceName}</p>
                      {item.specialInstructions && (
                        <p className="text-xs text-amber-400 mt-1">Note: {item.specialInstructions}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">{formatCurrency(item.total)}</p>
                    <p className="text-sm text-text-muted">{item.quantity} x {formatCurrency(item.unitPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Customer Info */}
          {customer && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Customer Information</h3>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-sky-400">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </span>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <User size={16} className="text-text-muted" />
                    {customer.firstName} {customer.lastName}
                    {customer.vipStatus && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">VIP</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Phone size={16} className="text-text-muted" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Mail size={16} className="text-text-muted" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MapPin size={16} className="text-text-muted" />
                    {customer.address}, {customer.city} {customer.postalCode}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Driver Info */}
          {driver && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Assigned Driver</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Truck size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{driver.name}</p>
                    <p className="text-sm text-text-muted">{driver.vehicleType} - {driver.vehiclePlate}</p>
                    <p className="text-sm text-text-secondary">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" leftIcon={<Phone size={14} />}>
                    Call
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Summary & Timeline */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>

            {order.isExpress && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm font-medium text-amber-400">Express Order</p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-primary">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tax</span>
                <span className="text-text-primary">{formatCurrency(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Delivery</span>
                <span className="text-text-primary">{formatCurrency(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Discount</span>
                  <span className="text-emerald-400">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="font-bold text-xl text-sky-400">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Payment</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-text-muted" />
                  <span className="text-text-secondary capitalize">{order.paymentMethod}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Package size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Pickup</p>
                  <p className="text-sm text-text-secondary">{formatDate(order.pickupDate)}</p>
                  <p className="text-xs text-text-muted">{order.pickupTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <Truck size={16} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Expected Delivery</p>
                  <p className="text-sm text-text-secondary">{formatDate(order.expectedDeliveryDate)}</p>
                  {order.actualDeliveryDate && (
                    <p className="text-xs text-emerald-400">Delivered: {formatDate(order.actualDeliveryDate)}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Notes</h3>
              <p className="text-sm text-text-secondary">{order.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
