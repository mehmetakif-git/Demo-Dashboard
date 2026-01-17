import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  Edit,
  Eye,
  Zap,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge } from '@/components/common';
import { shippingMethods, shippingZones, orders } from '@/data/ecommerce/ecommerceData';

export const Shipping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'methods' | 'zones' | 'shipments'>('shipments');

  // Get pending shipments (orders that need to be shipped)
  const pendingShipments = useMemo(() => {
    return orders.filter(o =>
      o.status === 'processing' || o.status === 'confirmed' || o.status === 'shipped'
    );
  }, []);

  const stats = {
    pendingShipments: orders.filter(o => o.status === 'processing' || o.status === 'confirmed').length,
    inTransit: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    activeMethods: shippingMethods.filter(m => m.status === 'active').length,
  };

  const filteredShipments = useMemo(() => {
    return pendingShipments.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery, pendingShipments]);

  const getShippingMethodLabel = (code: string) => {
    const method = shippingMethods.find(m => m.code === code);
    return method?.name || code;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipping"
        subtitle="Manage shipping methods, zones, and track deliveries"
        icon={Truck}
        actions={
          <Button>
            <Plus size={18} />
            Add Method
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Package size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Pending</p>
                <p className="text-2xl font-bold text-text-primary">{stats.pendingShipments}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-secondary/20 flex items-center justify-center">
                <Truck size={20} className="text-accent-secondary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">In Transit</p>
                <p className="text-2xl font-bold text-text-primary">{stats.inTransit}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Delivered</p>
                <p className="text-2xl font-bold text-text-primary">{stats.delivered}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Zap size={20} className="text-accent-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Active Methods</p>
                <p className="text-2xl font-bold text-text-primary">{stats.activeMethods}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            {[
              { key: 'shipments', label: 'Shipments', icon: Package },
              { key: 'methods', label: 'Methods', icon: Truck },
              { key: 'zones', label: 'Zones', icon: MapPin },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
          {activeTab === 'shipments' && (
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search by order number, customer, or tracking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Shipments Tab */}
      {activeTab === 'shipments' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-secondary border-b border-border-default">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Order</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Address</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Method</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Tracking</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredShipments.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-background-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-text-primary">{order.orderNumber}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-text-primary">{order.customerName}</p>
                      <p className="text-xs text-text-muted">{order.customerEmail}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-text-secondary">{order.shippingAddress.address1}</p>
                      <p className="text-xs text-text-muted">{order.shippingAddress.city}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {order.shippingMethod === 'express' ? (
                          <Zap size={14} className="text-warning" />
                        ) : (
                          <Truck size={14} className="text-text-muted" />
                        )}
                        <span className="text-sm text-text-secondary">
                          {getShippingMethodLabel(order.shippingMethod)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {order.trackingNumber ? (
                        <p className="text-sm font-mono text-text-primary">{order.trackingNumber}</p>
                      ) : (
                        <span className="text-sm text-text-muted">Not assigned</span>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredShipments.length === 0 && (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary">No shipments found</p>
            </div>
          )}
        </Card>
      )}

      {/* Shipping Methods Tab */}
      {activeTab === 'methods' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shippingMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      method.code === 'express' ? 'bg-warning/20' :
                      method.code === 'same-day' ? 'bg-error/20' : 'bg-accent-primary/20'
                    }`}>
                      {method.code === 'express' ? (
                        <Zap size={20} className="text-warning" />
                      ) : method.code === 'same-day' ? (
                        <Clock size={20} className="text-error" />
                      ) : (
                        <Truck size={20} className="text-accent-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{method.name}</p>
                      <p className="text-xs text-text-muted">{method.code}</p>
                    </div>
                  </div>
                  <StatusBadge status={method.status} />
                </div>

                <p className="text-sm text-text-secondary mb-4">{method.description}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Price</span>
                    <span className="text-text-primary font-medium">{method.price} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Free Above</span>
                    <span className="text-text-primary">
                      {method.freeAbove ? `${method.freeAbove} QAR` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Est. Delivery</span>
                    <span className="text-text-primary">
                      {method.estimatedDays === '0' ? 'Same day' :
                       method.estimatedDays === '1' ? 'Next day' :
                       `${method.estimatedDays} days`}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border-default">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Edit size={14} className="mr-2" />
                    Edit Method
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Shipping Zones Tab */}
      {activeTab === 'zones' && (
        <div className="space-y-4">
          {shippingZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                      <MapPin size={20} className="text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{zone.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {zone.areas.map((area) => (
                          <span
                            key={area}
                            className="px-2 py-1 text-xs bg-background-secondary rounded-full text-text-secondary"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-text-muted mb-1">Standard</p>
                      <p className="font-medium text-text-primary">{zone.standardPrice} QAR</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted mb-1">Express</p>
                      <p className="font-medium text-text-primary">{zone.expressPrice} QAR</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-muted mb-1">Same Day</p>
                      {zone.sameDayAvailable ? (
                        <CheckCircle size={18} className="mx-auto text-success" />
                      ) : (
                        <AlertCircle size={18} className="mx-auto text-text-muted" />
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit size={14} className="mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          <Card className="p-6 border-2 border-dashed border-border-default hover:border-accent-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center gap-3 text-text-muted">
              <Plus size={20} />
              <span>Add New Zone</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Shipping;
