import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Receipt,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  sales,
  getSaleById,
  getProductById,
  formatCurrency,
  formatDateTime,
} from '@/data/hardware/hardwareData';

export const SalesHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [selectedSale, setSelectedSale] = useState<string | null>(null);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todaySales = sales.filter((s) => new Date(s.createdAt).toDateString() === today);

    return {
      totalSales: sales.length,
      todayRevenue: todaySales.reduce((sum, s) => sum + s.total, 0),
      totalRevenue: sales.reduce((sum, s) => sum + s.total, 0),
      avgTransaction: sales.reduce((sum, s) => sum + s.total, 0) / sales.length,
    };
  }, []);

  const filteredSales = useMemo(() => {
    let filtered = [...sales];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.id.toLowerCase().includes(query) ||
          s.customerName?.toLowerCase().includes(query)
      );
    }

    if (selectedPayment !== 'all') {
      filtered = filtered.filter((s) => s.paymentMethod === selectedPayment);
    }

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered;
  }, [searchQuery, selectedPayment]);

  const selectedSaleData = selectedSale ? getSaleById(selectedSale) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales History"
        subtitle="View all completed transactions"
        actions={
          <Button variant="secondary" leftIcon={<Download size={16} />}>
            Export
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Transactions"
          value={stats.totalSales.toString()}
          icon={ShoppingCart}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={TrendingUp}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Avg. Transaction"
          value={formatCurrency(stats.avgTransaction)}
          icon={Receipt}
          iconColor="#0ea5e9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px] max-w-md">
                <Input
                  placeholder="Search by receipt # or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
              </div>

              <div className="flex gap-2">
                {['all', 'cash', 'card', 'split'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedPayment(method)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize flex items-center gap-1 ${
                      selectedPayment === method
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                    }`}
                  >
                    {method === 'cash' && <Banknote size={14} />}
                    {method === 'card' && <CreditCard size={14} />}
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Sales Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Receipt #</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Date/Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Payment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {filteredSales.map((sale, index) => (
                    <motion.tr
                      key={sale.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                        selectedSale === sale.id ? 'bg-white/[0.05]' : ''
                      }`}
                      onClick={() => setSelectedSale(sale.id)}
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono font-semibold text-amber-400">{sale.id}</span>
                      </td>
                      <td className="py-3 px-4 text-text-muted text-sm">
                        {formatDateTime(sale.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-text-primary">
                        {sale.customerName || 'Walk-in'}
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {sale.items.reduce((sum, i) => sum + i.quantity, 0)} items
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs capitalize flex items-center gap-1 w-fit ${
                          sale.paymentMethod === 'cash'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : sale.paymentMethod === 'card'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {sale.paymentMethod === 'cash' ? <Banknote size={12} /> : <CreditCard size={12} />}
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-text-primary">{formatCurrency(sale.total)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {filteredSales.length === 0 && (
            <Card className="p-12 text-center">
              <Receipt size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">No sales found</p>
            </Card>
          )}
        </div>

        {/* Sale Details Sidebar */}
        <div>
          <Card className="p-5 sticky top-6">
            {selectedSaleData ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Receipt Details</h3>
                  <span className="font-mono text-amber-400">{selectedSaleData.id}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <span className="text-text-secondary">{formatDateTime(selectedSaleData.createdAt)}</span>
                  </div>
                  {selectedSaleData.customerName && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-muted">Customer:</span>
                      <span className="text-text-primary">{selectedSaleData.customerName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-text-muted">Sales Person:</span>
                    <span className="text-text-primary">{selectedSaleData.salesPerson}</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4 mb-4">
                  <h4 className="text-sm font-medium text-text-secondary mb-3">Items</h4>
                  <div className="space-y-3">
                    {selectedSaleData.items.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <div>
                            <p className="text-text-primary">{product?.name || 'Unknown'}</p>
                            <p className="text-xs text-text-muted">
                              {item.quantity} x {formatCurrency(item.unitPrice)}
                            </p>
                          </div>
                          <span className="text-text-primary font-medium">
                            {formatCurrency(item.total)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Subtotal</span>
                    <span className="text-text-primary">{formatCurrency(selectedSaleData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Tax</span>
                    <span className="text-text-primary">{formatCurrency(selectedSaleData.tax)}</span>
                  </div>
                  {selectedSaleData.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Discount</span>
                      <span className="text-emerald-400">-{formatCurrency(selectedSaleData.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/[0.08]">
                    <span className="font-semibold text-text-primary">Total</span>
                    <span className="font-bold text-lg text-amber-400">
                      {formatCurrency(selectedSaleData.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="secondary" size="sm" leftIcon={<Receipt size={14} />}>
                    Print
                  </Button>
                  <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>
                    Export
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Receipt size={48} className="mx-auto mb-4 text-text-muted" />
                <p className="text-text-secondary">Select a sale to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
