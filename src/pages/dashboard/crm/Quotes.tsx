import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Search,
  Send,
  Download,
  Copy,
  Eye,
} from 'lucide-react';
import { PageHeader, StatsCard, DataTable, Tabs } from '@/components/common';
import { quotes, quoteStatusColors, type Quote } from '@/data/crmData';

export const Quotes = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check if quote is expired
  const isExpired = (quote: Quote) => {
    return quote.status === 'sent' && new Date(quote.validUntil) < new Date();
  };

  // Filter quotes
  const filteredQuotes = useMemo(() => {
    let filtered = quotes;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(q => {
        if (activeTab === 'expired') {
          return isExpired(q);
        }
        return q.status === activeTab;
      });
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(q =>
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.opportunity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = quotes.length;
    const pending = quotes.filter(q => q.status === 'sent' && !isExpired(q)).length;
    const accepted = quotes.filter(q => q.status === 'accepted').length;
    const totalValue = quotes.reduce((sum, q) => sum + q.amount, 0);
    return { total, pending, accepted, totalValue };
  }, []);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'draft', label: 'Draft' },
    { id: 'sent', label: 'Sent' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Rejected' },
  ];

  const getQuoteStatus = (quote: Quote) => {
    if (isExpired(quote)) return 'expired';
    return quote.status;
  };

  const columns = [
    {
      key: 'id',
      header: 'Quote #',
      sortable: true,
      render: (quote: Quote) => (
        <span className="font-medium text-[#547792]">{quote.id}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      render: (quote: Quote) => (
        <span className="text-white">{quote.customer}</span>
      ),
    },
    {
      key: 'opportunity',
      header: 'Opportunity',
      sortable: true,
      render: (quote: Quote) => (
        <span className="text-[#94a3b8]">{quote.opportunity}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (quote: Quote) => (
        <span className="font-medium text-white">${quote.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (quote: Quote) => {
        const status = getQuoteStatus(quote);
        const colors = quoteStatusColors[status as keyof typeof quoteStatusColors];
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
            {status}
          </span>
        );
      },
    },
    {
      key: 'validUntil',
      header: 'Valid Until',
      sortable: true,
      render: (quote: Quote) => {
        const expired = isExpired(quote);
        return (
          <span className={expired ? 'text-[#ef4444]' : 'text-[#94a3b8]'}>
            {new Date(quote.validUntil).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: 'createdBy',
      header: 'Created By',
      sortable: true,
      render: (quote: Quote) => (
        <span className="text-[#94a3b8]">{quote.createdBy}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (quote: Quote) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          {quote.status === 'draft' && (
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-[#547792] transition-colors"
              title="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title="Clone"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Quotes & Proposals"
        subtitle="Create and manage sales quotes"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
            <Plus className="h-4 w-4" />
            Create Quote
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Quotes"
          value={stats.total.toString()}
          icon={FileText}
          iconColor="#547792"
        />
        <StatsCard
          title="Pending"
          value={stats.pending.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Accepted"
          value={stats.accepted.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Value"
          value={`$${(stats.totalValue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#94B4C1"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Search */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#547792]"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          columns={columns}
          data={filteredQuotes}
          keyExtractor={(q) => q.id}
          emptyMessage="No quotes found"
        />
      </motion.div>
    </div>
  );
};
