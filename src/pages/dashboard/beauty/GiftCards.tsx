import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Gift,
  DollarSign,
  CreditCard,
  Copy,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  giftCards,
  formatDate,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { useTranslation } from 'react-i18next';

export const GiftCards = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(
    () => ({
      totalCards: giftCards.length,
      activeCards: giftCards.filter((g) => g.status === 'active').length,
      totalValue: giftCards.reduce((sum, g) => sum + g.initialValue, 0),
      remainingValue: giftCards.reduce((sum, g) => sum + g.currentBalance, 0),
    }),
    []
  );

  const filteredGiftCards = useMemo(() => {
    let filtered = [...giftCards];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.code.toLowerCase().includes(query) ||
          g.purchasedByName.toLowerCase().includes(query) ||
          g.recipientName.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((g) => g.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const getStatusColor = (status: 'active' | 'redeemed' | 'expired') => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'redeemed':
        return 'bg-blue-500/20 text-blue-400';
      case 'expired':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('beauty.giftCards', 'Gift Cards')}
        subtitle="Manage gift cards and vouchers"
        actions={<Button leftIcon={<Plus size={16} />}>Create Gift Card</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Cards"
          value={stats.totalCards.toString()}
          icon={Gift}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Active Cards"
          value={stats.activeCards.toString()}
          icon={CreditCard}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Remaining Value"
          value={formatCurrency(stats.remainingValue)}
          icon={DollarSign}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search by code, purchaser, or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="redeemed">Redeemed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </Card>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGiftCards.map((giftCard, index) => (
          <motion.div
            key={giftCard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:border-white/[0.15] transition-all">
              {/* Gift Card Header */}
              <div className="p-6 bg-gradient-to-br from-rose-500/20 to-pink-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.1] flex items-center justify-center">
                      <Gift size={24} className="text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Gift Card</h3>
                      <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(giftCard.status)}`}>
                        {giftCard.status.charAt(0).toUpperCase() + giftCard.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Code */}
                <div className="flex items-center gap-2 p-3 bg-white/[0.05] rounded-lg">
                  <code className="flex-1 text-lg font-mono text-text-primary tracking-wider">
                    {giftCard.code}
                  </code>
                  <button
                    onClick={() => copyCode(giftCard.code)}
                    className="p-2 rounded hover:bg-white/[0.1] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              {/* Gift Card Details */}
              <div className="p-6">
                {/* Amounts */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-text-muted">Original Value</p>
                    <p className="text-xl font-bold text-text-primary">
                      {formatCurrency(giftCard.initialValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-muted">Remaining</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {formatCurrency(giftCard.currentBalance)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all"
                      style={{
                        width: `${(giftCard.currentBalance / giftCard.initialValue) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1 text-right">
                    {Math.round((giftCard.currentBalance / giftCard.initialValue) * 100)}% remaining
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Purchased by</span>
                    <span className="text-text-primary">{giftCard.purchasedByName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Recipient</span>
                    <span className="text-text-primary">{giftCard.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Purchase Date</span>
                    <span className="text-text-secondary">{formatDate(giftCard.purchaseDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Expires</span>
                    <span className="text-text-secondary">{formatDate(giftCard.expiryDate)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.08]">
                  <Button variant="secondary" size="sm" className="flex-1">
                    View History
                  </Button>
                  {giftCard.status === 'active' && (
                    <Button size="sm" className="flex-1">
                      Redeem
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredGiftCards.length === 0 && (
        <Card className="p-12 text-center">
          <Gift size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No gift cards found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
