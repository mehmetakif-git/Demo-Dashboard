import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  Package,
  DollarSign,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
  Edit,
  Printer,
  Download,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  getPurchaseOrderById,
  getSupplierById,
  getProductById,
  formatCurrency,
  formatDate,
  getPOStatusColor,
} from '@/data/hardware/hardwareData';

export const PurchaseOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = id ? getPurchaseOrderById(id) : undefined;
  const supplier = order ? getSupplierById(order.supplierId) : undefined;

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Purchase Order Not Found"
          subtitle="The requested purchase order does not exist"
        />
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary mb-4">Purchase order not found</p>
          <Button onClick={() => navigate('/dashboard/hardware/purchase-orders')}>
            Back to Orders
          </Button>
        </Card>
      </div>
    );
  }

  const statusColor = getPOStatusColor(order.status);

  const getStatusIcon = () => {
    switch (order.status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-emerald-400" />;
      case 'cancelled':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'shipped':
        return <Truck size={20} className="text-amber-400" />;
      default:
        return <FileText size={20} className="text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Purchase Order ${order.id}`}
        subtitle={`Order from ${supplier?.name || 'Unknown Supplier'}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/hardware/purchase-orders')}
            >
              Back
            </Button>
            <Button variant="secondary" leftIcon={<Printer size={16} />}>
              Print
            </Button>
            <Button variant="secondary" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Edit size={16} />}>Edit Order</Button>
          </div>
        }
      />

      {/* Order Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon()}
              <div>
                <p className="text-text-muted text-sm">Order Status</p>
                <span className={`px-3 py-1 rounded text-sm font-medium capitalize ${statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-text-muted text-sm">Order Date</p>
                <p className="font-medium text-text-primary">{formatDate(order.orderDate)}</p>
              </div>
              <div className="text-center">
                <p className="text-text-muted text-sm">Expected Date</p>
                <p className="font-medium text-text-primary">{order.expectedDelivery ? formatDate(order.expectedDelivery) : '-'}</p>
              </div>
              {order.deliveredDate && (
                <div className="text-center">
                  <p className="text-text-muted text-sm">Delivered Date</p>
                  <p className="font-medium text-emerald-400">{formatDate(order.deliveredDate)}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Table */}
          <Card>
            <div className="p-4 border-b border-white/[0.08]">
              <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <Package size={20} className="text-amber-400" />
                Order Items
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">SKU</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Unit Price</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {order.items.map((item, index) => {
                    const product = getProductById(item.productId);
                    return (
                      <motion.tr
                        key={item.productId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-amber-500/20 flex items-center justify-center">
                              <Package size={16} className="text-amber-400" />
                            </div>
                            <span className="font-medium text-text-primary">
                              {product?.name || 'Unknown Product'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-text-muted font-mono text-sm">
                          {product?.sku || '-'}
                        </td>
                        <td className="py-3 px-4 text-right text-text-primary font-medium">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-right text-text-muted">
                          {formatCurrency(item.unitCost)}
                        </td>
                        <td className="py-3 px-4 text-right text-text-primary font-semibold">
                          {formatCurrency(item.total)}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Notes</h3>
              <p className="text-text-secondary">{order.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-amber-400" />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-primary">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tax</span>
                <span className="text-text-primary">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Shipping</span>
                <span className="text-text-primary">{formatCurrency(order.shipping)}</span>
              </div>
              <div className="border-t border-white/[0.08] pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="font-bold text-xl text-amber-400">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Supplier Info */}
          {supplier && (
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Truck size={20} className="text-amber-400" />
                Supplier
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-text-primary">{supplier.name}</p>
                  <p className="text-sm text-text-muted">{supplier.contactPerson}</p>
                </div>
                <div className="text-sm text-text-muted">
                  <p>{supplier.phone}</p>
                  <p>{supplier.email}</p>
                </div>
                <div className="text-sm text-text-muted">
                  <p>{supplier.address}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.08]">
                  <p className="text-sm">
                    <span className="text-text-muted">Payment Terms: </span>
                    <span className="text-text-primary font-medium">{supplier.paymentTerms}</span>
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Timeline */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-amber-400" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Order Created</p>
                  <p className="text-xs text-text-muted">{formatDate(order.orderDate)}</p>
                </div>
              </div>
              {order.status !== 'draft' && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Order Sent</p>
                    <p className="text-xs text-text-muted">Sent to supplier</p>
                  </div>
                </div>
              )}
              {order.deliveredDate && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Items Delivered</p>
                    <p className="text-xs text-text-muted">{formatDate(order.deliveredDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
