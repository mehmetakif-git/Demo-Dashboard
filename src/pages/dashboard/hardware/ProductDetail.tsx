import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  Package,
  MapPin,
  Truck,
  BarChart3,
  QrCode,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  getProductById,
  getSupplierById,
  stockMovements,
  formatCurrency,
  formatDate,
} from '@/data/hardware/hardwareData';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const supplier = product ? getSupplierById(product.supplierId) : null;
  const productMovements = stockMovements.filter((m) => m.productId === id).slice(0, 5);

  if (!product) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Product Not Found"
          subtitle="The requested product could not be found"
          actions={
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          }
        />
      </div>
    );
  }

  const margin = ((product.retailPrice - product.costPrice) / product.retailPrice) * 100;
  const stockPercentage = (product.currentStock / product.maxStock) * 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        subtitle={`SKU: ${product.sku}`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="secondary" leftIcon={<QrCode size={16} />}>
              Print Barcode
            </Button>
            <Button leftIcon={<Edit size={16} />}>Edit Product</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Overview */}
          <Card className="p-6">
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Package size={48} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{product.name}</h2>
                    <p className="text-text-muted">{product.brand}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : product.status === 'low-stock'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {product.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <p className="text-text-secondary mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Package size={14} />
                    <span>{product.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin size={14} />
                    <span>Location: {product.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <QrCode size={14} />
                    <span>Barcode: {product.barcode}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stock Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Stock Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <p className="text-sm text-text-muted mb-1">Current Stock</p>
                <p className="text-2xl font-semibold text-text-primary">{product.currentStock}</p>
                <p className="text-xs text-text-muted">{product.unit}</p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <p className="text-sm text-text-muted mb-1">Min Stock</p>
                <p className="text-2xl font-semibold text-amber-400">{product.minStock}</p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <p className="text-sm text-text-muted mb-1">Reorder Point</p>
                <p className="text-2xl font-semibold text-text-primary">{product.reorderPoint}</p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg">
                <p className="text-sm text-text-muted mb-1">Max Stock</p>
                <p className="text-2xl font-semibold text-text-primary">{product.maxStock}</p>
              </div>
            </div>

            {/* Stock Level Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted">Stock Level</span>
                <span className="text-text-primary">{stockPercentage.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-white/[0.1] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    stockPercentage > 50 ? 'bg-emerald-500' : stockPercentage > 25 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {product.currentStock <= product.reorderPoint && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-3">
                <AlertTriangle className="text-amber-400" size={20} />
                <div>
                  <p className="font-medium text-amber-400">Low Stock Alert</p>
                  <p className="text-sm text-text-secondary">
                    Stock is below reorder point. Consider creating a purchase order.
                  </p>
                </div>
                <Button size="sm" className="ml-auto">
                  Create PO
                </Button>
              </div>
            )}
          </Card>

          {/* Recent Stock Movements */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Recent Stock Movements</h3>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {productMovements.length > 0 ? (
                productMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          movement.type === 'in' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}
                      >
                        <BarChart3
                          size={14}
                          className={movement.type === 'in' ? 'text-emerald-400' : 'text-red-400'}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-text-primary capitalize">{movement.reason}</p>
                        <p className="text-xs text-text-muted">{formatDate(movement.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${movement.type === 'in' ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-xs text-text-muted">{movement.reference}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-text-muted py-4">No recent movements</p>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Pricing</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Cost Price</span>
                <span className="font-medium text-text-primary">{formatCurrency(product.costPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Retail Price</span>
                <span className="font-semibold text-amber-400 text-lg">{formatCurrency(product.retailPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Wholesale Price</span>
                <span className="font-medium text-text-primary">{formatCurrency(product.wholesalePrice)}</span>
              </div>
              <div className="border-t border-white/[0.08] pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Margin</span>
                  <span className="font-semibold text-emerald-400">{margin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Supplier Info */}
          {supplier && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={18} className="text-amber-400" />
                <h3 className="text-lg font-semibold text-text-primary">Supplier</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-text-primary">{supplier.name}</p>
                  <p className="text-sm text-text-muted">{supplier.contactPerson}</p>
                </div>
                <div className="text-sm text-text-secondary">
                  <p>{supplier.phone}</p>
                  <p>{supplier.email}</p>
                </div>
                <Button variant="secondary" className="w-full" size="sm">
                  Contact Supplier
                </Button>
              </div>
            </Card>
          )}

          {/* Product Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Unit</span>
                <span className="text-text-primary">{product.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Weight</span>
                <span className="text-text-primary">{product.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Dimensions</span>
                <span className="text-text-primary">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Warranty</span>
                <span className="text-text-primary">{product.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Last Restocked</span>
                <span className="text-text-primary">{formatDate(product.lastRestocked)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
