import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Package,
  Download,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  stockMovements,
  movementReasons,
  formatDateTime,
} from '@/data/hardware/hardwareData';

export const StockMovements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'in' | 'out'>('all');
  const [selectedReason, setSelectedReason] = useState<string>('all');

  const stats = useMemo(() => ({
    totalIn: stockMovements.filter((m) => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0),
    totalOut: stockMovements.filter((m) => m.type === 'out').reduce((sum, m) => sum + m.quantity, 0),
    todayMovements: stockMovements.filter((m) =>
      new Date(m.createdAt).toDateString() === new Date().toDateString()
    ).length,
    totalMovements: stockMovements.length,
  }), []);

  const filteredMovements = useMemo(() => {
    let filtered = [...stockMovements];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.productName.toLowerCase().includes(query) ||
          m.reference.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((m) => m.type === selectedType);
    }

    if (selectedReason !== 'all') {
      filtered = filtered.filter((m) => m.reason === selectedReason);
    }

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered;
  }, [searchQuery, selectedType, selectedReason]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Movements"
        subtitle="Track all inventory changes"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Plus size={16} />}>New Movement</Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Stock In"
          value={stats.totalIn.toString()}
          icon={ArrowDown}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Stock Out"
          value={stats.totalOut.toString()}
          icon={ArrowUp}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Today's Movements"
          value={stats.todayMovements.toString()}
          icon={Package}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Total Movements"
          value={stats.totalMovements.toString()}
          icon={Package}
          iconColor="#6366f1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search by product or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('in')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-1 ${
                selectedType === 'in'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              <ArrowDown size={14} /> Stock In
            </button>
            <button
              onClick={() => setSelectedType('out')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-1 ${
                selectedType === 'out'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              <ArrowUp size={14} /> Stock Out
            </button>
          </div>

          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">All Reasons</option>
            {movementReasons.map((reason) => (
              <option key={reason.id} value={reason.id}>
                {reason.name}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Movements Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Date/Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Reason</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Before</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">After</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Reference</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredMovements.map((movement, index) => (
                <motion.tr
                  key={movement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3 px-4 text-text-muted text-sm">
                    {formatDateTime(movement.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        movement.type === 'in'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {movement.type === 'in' ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                      {movement.type === 'in' ? 'IN' : 'OUT'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                        <Package size={14} className="text-amber-400" />
                      </div>
                      <span className="font-medium text-text-primary">{movement.productName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-white/[0.05] rounded text-sm text-text-secondary capitalize">
                      {movement.reason.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        movement.type === 'in' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-muted">{movement.previousStock}</td>
                  <td className="py-3 px-4 text-text-primary font-medium">{movement.newStock}</td>
                  <td className="py-3 px-4 text-text-muted font-mono text-sm">{movement.reference}</td>
                  <td className="py-3 px-4 text-text-secondary">{movement.createdBy}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredMovements.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No stock movements found</p>
        </Card>
      )}
    </div>
  );
};
