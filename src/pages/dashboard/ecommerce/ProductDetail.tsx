import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Star,
  Edit,
  Copy,
  Archive,
  Box,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, Card, Button, StatusBadge, Tabs } from '@/components/common';
import { getProductById, stockMovements } from '@/data/ecommerce/ecommerceData';
import { ROUTES } from '@/utils/constants';
import { useTranslation } from 'react-i18next';

export const ProductDetail = () => {
  const { t } = useTranslation('ecommerce');
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-text-muted mb-4" />
        <p className="text-text-secondary">{t('productDetail.productNotFound')}</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.ecommerce.products)}>
          {t('productDetail.backToProducts')}
        </Button>
      </div>
    );
  }

  const productMovements = stockMovements.filter(m => m.productId === product.id);
  const margin = ((product.price - product.costPrice) / product.price * 100).toFixed(1);

  const tabs = [
    { id: 'general', label: t('productDetail.general') },
    { id: 'variants', label: t('productDetail.variantsCount', { count: product.variants.length }) },
    { id: 'inventory', label: t('productDetail.inventory') },
    { id: 'seo', label: t('productDetail.seo') },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ecommerce.products)}>
              <ArrowLeft size={20} />
            </Button>
            <span>{product.name}</span>
          </div>
        }
        subtitle={`SKU: ${product.sku} • ${product.categoryName}`}
        icon={Package}
        actions={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Copy size={18} />
              {t('productDetail.duplicate')}
            </Button>
            <Button variant="secondary">
              <Archive size={18} />
              {t('productDetail.archive')}
            </Button>
            <Button>
              <Edit size={18} />
              {t('productDetail.edit')}
            </Button>
          </div>
        }
      />

      {/* Status & Rating */}
      <div className="flex items-center gap-4">
        <StatusBadge status={product.status} />
        {product.featured && (
          <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-sm font-medium">
            {t('productDetail.featured')}
          </span>
        )}
        <div className="flex items-center gap-1">
          <Star size={16} className="text-warning fill-warning" />
          <span className="text-text-primary font-medium">{product.rating}</span>
          <span className="text-text-muted">({product.reviewCount} {t('productDetail.reviews')})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image */}
          <Card className="p-6">
            <div className="aspect-video rounded-lg bg-background-secondary flex items-center justify-center">
              <Package size={64} className="text-text-muted" />
            </div>
          </Card>

          {/* Tabs Content */}
          <Card className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.description')}</h4>
                    <p className="text-text-primary">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.shortDescription')}</h4>
                    <p className="text-text-primary">{product.shortDescription}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.brand')}</h4>
                      <p className="text-text-primary">{product.brand}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.category')}</h4>
                      <p className="text-text-primary">{product.categoryName}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.tags')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-background-secondary text-text-secondary text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {product.dimensions && (
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.dimensionsWeight')}</h4>
                      <p className="text-text-primary">
                        {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} cm • {product.weight} kg
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'variants' && (
                <div className="space-y-4">
                  {product.variants.length > 0 ? (
                    product.variants.map((variant, index) => (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-background-secondary"
                      >
                        <div>
                          <p className="font-medium text-text-primary">{variant.name}</p>
                          <p className="text-sm text-text-muted">SKU: {variant.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">{variant.price.toLocaleString()} QAR</p>
                          <p className={`text-sm ${variant.stock <= 5 ? 'text-warning' : 'text-text-secondary'}`}>
                            {variant.stock} {t('productDetail.inStock')}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-text-muted">
                      <Box size={32} className="mx-auto mb-2" />
                      <p>{t('productDetail.noVariants')}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-background-secondary">
                      <p className="text-sm text-text-secondary">{t('productDetail.currentStock')}</p>
                      <p className="text-2xl font-bold text-text-primary">{product.stock}</p>
                    </Card>
                    <Card className="p-4 bg-background-secondary">
                      <p className="text-sm text-text-secondary">{t('productDetail.lowStockThreshold')}</p>
                      <p className="text-2xl font-bold text-text-primary">{product.lowStockThreshold}</p>
                    </Card>
                    <Card className="p-4 bg-background-secondary">
                      <p className="text-sm text-text-secondary">{t('productDetail.totalSold')}</p>
                      <p className="text-2xl font-bold text-text-primary">{product.soldCount}</p>
                    </Card>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-4">{t('productDetail.stockMovements')}</h4>
                    {productMovements.length > 0 ? (
                      <div className="space-y-3">
                        {productMovements.map((movement) => (
                          <div key={movement.id} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{movement.reason}</p>
                              <p className="text-xs text-text-muted">{new Date(movement.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`font-semibold ${movement.type === 'in' ? 'text-success' : 'text-error'}`}>
                              {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted text-center py-4">{t('productDetail.noStockMovements')}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.urlSlug')}</h4>
                    <p className="text-text-primary font-mono text-sm">/products/{product.slug}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.metaTitle')}</h4>
                    <p className="text-text-primary">{product.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{t('productDetail.metaDescription')}</h4>
                    <p className="text-text-primary">{product.shortDescription}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">{t('productDetail.pricing')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.priceLabel')}</span>
                <span className="font-semibold text-text-primary">{product.price.toLocaleString()} QAR</span>
              </div>
              {product.compareAtPrice && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t('productDetail.compareAtPrice')}</span>
                  <span className="text-text-muted line-through">{product.compareAtPrice.toLocaleString()} QAR</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.costPrice')}</span>
                <span className="text-text-primary">{product.costPrice.toLocaleString()} QAR</span>
              </div>
              <div className="pt-4 border-t border-border-default">
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t('productDetail.profitMargin')}</span>
                  <span className="font-semibold text-success">{margin}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={20} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">{t('productDetail.performance')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.totalSold')}</span>
                <span className="font-semibold text-text-primary">{t('productDetail.totalSoldUnits', { count: product.soldCount })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.reviewsLabel')}</span>
                <span className="font-semibold text-text-primary">{product.reviewCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.rating')}</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-warning fill-warning" />
                  <span className="font-semibold text-text-primary">{product.rating}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Dates */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t('productDetail.activity')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.created')}</span>
                <span className="text-text-primary">{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('productDetail.lastUpdated')}</span>
                <span className="text-text-primary">{new Date(product.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
