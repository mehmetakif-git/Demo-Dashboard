import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  TrendingDown,
  ShoppingCart,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  lowStockAlerts,
  products,
  getProductById,
  formatDate,
  getAlertPriorityColor,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

export const Alerts = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => {
    const criticalCount = lowStockAlerts.filter((a) => a.priority === 'critical').length;
    const highCount = lowStockAlerts.filter((a) => a.priority === 'high').length;
    const outOfStock = products.filter((p) => p.currentStock === 0).length;
    const lowStock = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStock).length;

    return {
      totalAlerts: lowStockAlerts.length,
      criticalAlerts: criticalCount,
      highAlerts: highCount,
      outOfStock,
      lowStock,
    };
  }, []);

  const filteredAlerts = useMemo(() => {
    let filtered = [...lowStockAlerts];

    if (selectedPriority !== 'all') {
      filtered = filtered.filter((a) => a.priority === selectedPriority);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((a) => a.status === selectedStatus);
    }

    // Sort by priority (critical first) then by date
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [selectedPriority, selectedStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ordered':
        return <Clock size={16} className="text-blue-400" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-emerald-400" />;
      default:
        return <AlertTriangle size={16} className="text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('hardware.lowStockAlerts', 'Low Stock Alerts')}
        subtitle="Monitor and manage inventory alerts"
        actions={
          <Button variant="secondary" leftIcon={<Bell size={16} />}>
            Alert Settings
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Alerts"
          value={stats.totalAlerts.toString()}
          icon={Bell}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Critical Alerts"
          value={stats.criticalAlerts.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Out of Stock"
          value={stats.outOfStock.toString()}
          icon={XCircle}
          iconColor="#dc2626"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStock.toString()}
          icon={TrendingDown}
          iconColor="#f97316"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:border-white/[0.15] transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Critical Items</h4>
              <p className="text-sm text-text-muted">{stats.criticalAlerts} items need immediate attention</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:border-white/[0.15] transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingCart size={24} className="text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Create Purchase Order</h4>
              <p className="text-sm text-text-muted">Order stock for low items</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:border-white/[0.15] transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle size={24} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Resolve All</h4>
              <p className="text-sm text-text-muted">Mark all alerts as resolved</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-text-muted mb-2">Priority</p>
            <div className="flex gap-2">
              {['all', 'critical', 'high', 'medium', 'low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${
                    selectedPriority === priority
                      ? priority === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                        : priority === 'high'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-2">Status</p>
            <div className="flex gap-2">
              {['all', 'pending', 'acknowledged', 'resolved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${
                    selectedStatus === status
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => {
          const product = getProductById(alert.productId);
          const priorityColor = getAlertPriorityColor(alert.priority);

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:border-white/[0.15] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        alert.priority === 'critical'
                          ? 'bg-red-500/20'
                          : alert.priority === 'high'
                          ? 'bg-orange-500/20'
                          : 'bg-amber-500/20'
                      }`}
                    >
                      <AlertTriangle
                        size={24}
                        className={
                          alert.priority === 'critical'
                            ? 'text-red-400'
                            : alert.priority === 'high'
                            ? 'text-orange-400'
                            : 'text-amber-400'
                        }
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-text-primary">{product?.name || 'Unknown Product'}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs capitalize ${priorityColor}`}>
                          {alert.priority}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          {getStatusIcon(alert.status)}
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mb-2">
                        SKU: {product?.sku || '-'} | Current Stock: <span className="text-red-400 font-semibold">{alert.currentStock}</span> | Min: {alert.minStock}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Suggested reorder: <span className="text-amber-400 font-medium">{alert.suggestedOrder} units</span>
                      </p>
                      <p className="text-xs text-text-muted mt-2">Created: {formatDate(alert.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<Eye size={14} />}
                      onClick={() => navigate(`/dashboard/hardware/products/${alert.productId}`)}
                    >
                      View Product
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<ShoppingCart size={14} />}
                    >
                      Order
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-emerald-400" />
            <p className="text-text-primary font-medium">No alerts found</p>
            <p className="text-text-muted text-sm mt-1">All inventory levels are within acceptable ranges</p>
          </Card>
        )}
      </div>
    </div>
  );
};
