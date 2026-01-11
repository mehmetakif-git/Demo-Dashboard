import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  FileText,
  Package,
  DollarSign,
  Clock,
  Eye,
  Download,
  Filter,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  purchaseOrders,
  getSupplierById,
  formatCurrency,
  formatDate,
  getPOStatusColor,
} from '@/data/hardware/hardwareData';

export const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => ({
    totalOrders: purchaseOrders.length,
    pendingOrders: purchaseOrders.filter((po) => po.status === 'draft' || po.status === 'sent').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.total, 0),
    receivedValue: purchaseOrders
      .filter((po) => po.status === 'delivered')
      .reduce((sum, po) => sum + po.total, 0),
  }), []);

  const filteredOrders = useMemo(() => {
    let filtered = [...purchaseOrders];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (po) =>
          po.id.toLowerCase().includes(query) ||
          getSupplierById(po.supplierId)?.name.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((po) => po.status === selectedStatus);
    }

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

    return filtered;
  }, [searchQuery, selectedStatus]);

  const statusOptions = ['all', 'draft', 'sent', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Orders"
        subtitle="Manage supplier purchase orders"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Plus size={16} />}>New Order</Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          icon={FileText}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders.toString()}
          icon={Clock}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title="Received Value"
          value={formatCurrency(stats.receivedValue)}
          icon={Package}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search by PO number or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-text-muted" />
            <div className="flex gap-1 flex-wrap">
              {statusOptions.map((status) => (
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

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">PO Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Supplier</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Order Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Expected</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Items</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredOrders.map((order, index) => {
                const supplier = getSupplierById(order.supplierId);
                const statusColor = getPOStatusColor(order.status);

                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/hardware/purchase-orders/${order.id}`)}
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono font-semibold text-amber-400">{order.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-primary">{supplier?.name || 'Unknown'}</span>
                    </td>
                    <td className="py-3 px-4 text-text-muted">{formatDate(order.orderDate)}</td>
                    <td className="py-3 px-4 text-text-muted">{order.expectedDelivery ? formatDate(order.expectedDelivery) : '-'}</td>
                    <td className="py-3 px-4">
                      <span className="text-text-primary">{order.items.length} items</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-text-primary">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs capitalize ${statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye size={14} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/hardware/purchase-orders/${order.id}`);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No purchase orders found</p>
        </Card>
      )}
    </div>
  );
};
