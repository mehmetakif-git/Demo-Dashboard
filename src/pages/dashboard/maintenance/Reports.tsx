import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock,
  Wrench,
  Box,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  PieChart,
  Activity,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  maintenanceStats,
  assets,
  workOrders,
  sparePartsInventory,
  formatCurrency,
  assetCategories,
} from '@/data/maintenanceData';

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Calculate additional stats
  const assetStats = useMemo(() => {
    const byStatus = {
      operational: assets.filter(a => a.status === 'operational').length,
      needsRepair: assets.filter(a => a.status === 'needs-repair').length,
      underMaintenance: assets.filter(a => a.status === 'under-maintenance').length,
      outOfService: assets.filter(a => a.status === 'out-of-service').length,
    };
    const byCategory = assetCategories.map(cat => ({
      name: cat.name,
      count: assets.filter(a => a.category === cat.name).length,
      color: cat.color,
    }));
    return { byStatus, byCategory };
  }, []);

  const workOrderStats = useMemo(() => {
    const completed = workOrders.filter(wo => wo.status === 'completed');
    const totalHours = completed.reduce((sum, wo) => sum + (wo.actualHours || 0), 0);
    const totalCost = workOrders.reduce((sum, wo) => {
      const partsCost = wo.parts.reduce((s, p) => s + p.cost, 0);
      return sum + partsCost + wo.laborCost;
    }, 0);
    return {
      byType: {
        preventive: workOrders.filter(wo => wo.type === 'preventive').length,
        corrective: workOrders.filter(wo => wo.type === 'corrective').length,
        inspection: workOrders.filter(wo => wo.type === 'inspection').length,
      },
      byStatus: {
        scheduled: workOrders.filter(wo => wo.status === 'scheduled').length,
        inProgress: workOrders.filter(wo => wo.status === 'in-progress').length,
        pendingParts: workOrders.filter(wo => wo.status === 'pending-parts').length,
        completed: workOrders.filter(wo => wo.status === 'completed').length,
      },
      totalHours,
      totalCost,
    };
  }, []);

  const inventoryStats = useMemo(() => {
    const totalValue = sparePartsInventory.reduce((sum, p) => sum + (p.quantity * p.unitCost), 0);
    const lowStockItems = sparePartsInventory.filter(p => p.status === 'low-stock').length;
    const outOfStockItems = sparePartsInventory.filter(p => p.status === 'out-of-stock').length;
    return { totalValue, lowStockItems, outOfStockItems };
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Reports"
        subtitle="Analytics and insights for maintenance operations"
        actions={
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Assets"
          value={maintenanceStats.totalAssets.toString()}
          subtitle={`${maintenanceStats.operationalAssets} operational`}
          icon={Box}
          iconColor="#547792"
        />
        <StatsCard
          title="Open Work Orders"
          value={maintenanceStats.openWorkOrders.toString()}
          subtitle={`${maintenanceStats.completedThisMonth} completed this month`}
          icon={Wrench}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Total Maintenance Cost"
          value={formatCurrency(maintenanceStats.totalMaintenanceCost)}
          subtitle="Year to date"
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg Response Time"
          value={maintenanceStats.averageResponseTime}
          subtitle="Work order response"
          icon={Clock}
          iconColor="#94B4C1"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Asset Status Distribution</h3>
              <PieChart size={20} className="text-text-muted" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Operational', value: assetStats.byStatus.operational, color: '#10b981', total: assets.length },
                { label: 'Needs Repair', value: assetStats.byStatus.needsRepair, color: '#f59e0b', total: assets.length },
                { label: 'Under Maintenance', value: assetStats.byStatus.underMaintenance, color: '#547792', total: assets.length },
                { label: 'Out of Service', value: assetStats.byStatus.outOfService, color: '#ef4444', total: assets.length },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="text-text-primary font-medium">{item.value} ({Math.round((item.value / item.total) * 100)}%)</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / item.total) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Work Order Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Work Orders by Type</h3>
              <BarChart3 size={20} className="text-text-muted" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Preventive', value: workOrderStats.byType.preventive, color: '#3b82f6', icon: Calendar },
                { label: 'Corrective', value: workOrderStats.byType.corrective, color: '#f59e0b', icon: Wrench },
                { label: 'Inspection', value: workOrderStats.byType.inspection, color: '#10b981', icon: CheckCircle },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg text-center"
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{item.value}</p>
                  <p className="text-sm text-text-secondary">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Work Order Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Scheduled', value: workOrderStats.byStatus.scheduled, color: '#547792' },
                { label: 'In Progress', value: workOrderStats.byStatus.inProgress, color: '#f59e0b' },
                { label: 'Pending Parts', value: workOrderStats.byStatus.pendingParts, color: '#94B4C1' },
                { label: 'Completed', value: workOrderStats.byStatus.completed, color: '#10b981' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-text-secondary">{item.label}</span>
                  </div>
                  <span className="font-semibold text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Assets by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Assets by Category</h3>
            <div className="space-y-3">
              {assetStats.byCategory.filter(c => c.count > 0).map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-text-secondary">{item.name}</span>
                  </div>
                  <span className="font-semibold text-text-primary">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Inventory Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Total Inventory Value</span>
                  <DollarSign size={18} className="text-green-400" />
                </div>
                <p className="text-2xl font-bold text-text-primary">{formatCurrency(inventoryStats.totalValue)}</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                  <AlertTriangle size={20} className="mx-auto mb-1 text-yellow-400" />
                  <p className="text-xl font-bold text-yellow-400">{inventoryStats.lowStockItems}</p>
                  <p className="text-xs text-text-secondary">Low Stock</p>
                </div>
                <div className="flex-1 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                  <AlertTriangle size={20} className="mx-auto mb-1 text-red-400" />
                  <p className="text-xl font-bold text-red-400">{inventoryStats.outOfStockItems}</p>
                  <p className="text-xs text-text-secondary">Out of Stock</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Cost Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Cost Summary</h3>
            <Activity size={20} className="text-text-muted" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
              <p className="text-sm text-text-secondary mb-1">Total Work Order Cost</p>
              <p className="text-xl font-bold text-text-primary">{formatCurrency(workOrderStats.totalCost)}</p>
            </div>
            <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
              <p className="text-sm text-text-secondary mb-1">Labor Hours</p>
              <p className="text-xl font-bold text-text-primary">{workOrderStats.totalHours}h</p>
            </div>
            <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
              <p className="text-sm text-text-secondary mb-1">Parts Inventory Value</p>
              <p className="text-xl font-bold text-text-primary">{formatCurrency(inventoryStats.totalValue)}</p>
            </div>
            <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
              <p className="text-sm text-text-secondary mb-1">Total Asset Value</p>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(assets.reduce((sum, a) => sum + a.purchasePrice, 0))}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Reports</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Asset Summary Report', icon: Box },
              { label: 'Work Order Report', icon: Wrench },
              { label: 'Cost Analysis Report', icon: DollarSign },
              { label: 'Vendor Performance', icon: TrendingUp },
            ].map((report) => (
              <button
                key={report.label}
                className="flex flex-col items-center gap-3 p-4 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] rounded-lg transition-colors"
              >
                <report.icon size={24} className="text-accent-primary" />
                <span className="text-sm text-text-secondary text-center">{report.label}</span>
                <Download size={16} className="text-text-muted" />
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
