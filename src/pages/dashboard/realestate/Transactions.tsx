import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  Building,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  transactions,
  realestateStats,
  getTransactionStatusColor,
  formatCurrency,
} from '@/data/realestate/realestateData';

type TabType = 'all' | 'pending' | 'active' | 'closed';

export const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || transaction.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const pendingCount = transactions.filter((t) => t.status === 'pending').length;
  const activeCount = transactions.filter((t) => t.status === 'active').length;
  const closedCount = transactions.filter((t) => t.status === 'closed').length;

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: transactions.length },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'active', label: 'Active', count: activeCount },
    { id: 'closed', label: 'Closed', count: closedCount },
  ];

  const selected = selectedTransaction ? transactions.find((t) => t.id === selectedTransaction) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        subtitle="Track sales and lease transactions"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pending Transactions"
          value={realestateStats.pendingTransactions}
          icon={Clock}
          iconColor="text-amber-400"
        />
        <StatsCard
          title="Closed This Month"
          value={realestateStats.closedThisMonth}
          icon={CheckCircle}
          iconColor="text-emerald-400"
          trend={{ value: "+20%", type: "up" }}
        />
        <StatsCard
          title="Total Volume"
          value={formatCurrency(realestateStats.totalVolume.ytd)}
          icon={DollarSign}
          trend={{ value: "+15%", type: "up" }}
        />
        <StatsCard
          title="Avg Days to Close"
          value="42"
          icon={TrendingUp}
          trend={{ value: "-5%", type: "down" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-[#1e1e2e]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-[#64748b] hover:text-white'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#1a1a24] text-[#64748b]'
            }`}>
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTransactionTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        <input
          type="text"
          placeholder="Search by address or transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border bg-[#12121a] p-6 cursor-pointer transition-colors ${
                selectedTransaction === transaction.id
                  ? 'border-indigo-500'
                  : 'border-[#1e1e2e] hover:border-[#2e2e3e]'
              }`}
              onClick={() => setSelectedTransaction(transaction.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-20 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                    <Building className="h-7 w-7 text-[#2e2e3e]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        transaction.type === 'sale' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mt-1">{transaction.propertyAddress}</h3>
                    <p className="text-xs text-[#64748b]">{transaction.transactionId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {transaction.type === 'sale'
                      ? `$${(transaction.salePrice || transaction.offerPrice || transaction.listPrice || 0).toLocaleString()}`
                      : `$${transaction.monthlyRent?.toLocaleString()}/mo`
                    }
                  </div>
                  {transaction.commission.total && (
                    <div className="text-sm text-[#64748b]">
                      Commission: ${transaction.commission.total.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#64748b] mb-1">{transaction.type === 'sale' ? 'Buyer' : 'Tenant'}</div>
                  <div className="text-sm text-[#94a3b8]">
                    {transaction.buyer?.name || transaction.tenant?.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-1">{transaction.type === 'sale' ? 'Seller' : 'Landlord'}</div>
                  <div className="text-sm text-[#94a3b8]">
                    {transaction.seller?.name || transaction.landlord?.name}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm text-[#64748b]">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Contract: {transaction.contractDate}
                </div>
                {transaction.closingDate && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    Closed: {transaction.closingDate}
                  </div>
                )}
                {transaction.expectedClosing && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-amber-400" />
                    Expected: {transaction.expectedClosing}
                  </div>
                )}
              </div>

              {/* Progress */}
              {transaction.currentStep && (
                <div className="mt-4 pt-4 border-t border-[#1e1e2e]">
                  <div className="text-xs text-[#64748b] mb-2">Current Step</div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-[#1a1a24] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${(transaction.timeline.length / 6) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">{transaction.currentStep}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Transaction Detail Panel */}
        <div className="space-y-6">
          {selected ? (
            <>
              {/* Timeline */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                <div className="space-y-4">
                  {selected.timeline.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          index === selected.timeline.length - 1
                            ? 'bg-indigo-500'
                            : 'bg-emerald-500'
                        }`}>
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        {index < selected.timeline.length - 1 && (
                          <div className="w-px h-full bg-[#2e2e3e] my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-white font-medium">{event.event}</div>
                        <div className="text-xs text-[#64748b]">{event.date}</div>
                        {event.notes && (
                          <p className="text-sm text-[#94a3b8] mt-1">{event.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parties */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Parties</h3>
                <div className="space-y-4">
                  {/* Buyer/Tenant */}
                  {(selected.buyer || selected.tenant) && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <div className="text-xs text-[#64748b] mb-1">
                        {selected.type === 'sale' ? 'Buyer' : 'Tenant'}
                      </div>
                      <div className="text-white font-medium">
                        {selected.buyer?.name || selected.tenant?.name}
                      </div>
                      <div className="text-sm text-[#94a3b8]">
                        {selected.buyer?.email || selected.tenant?.email}
                      </div>
                    </div>
                  )}

                  {/* Seller/Landlord */}
                  {(selected.seller || selected.landlord) && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <div className="text-xs text-[#64748b] mb-1">
                        {selected.type === 'sale' ? 'Seller' : 'Landlord'}
                      </div>
                      <div className="text-white font-medium">
                        {selected.seller?.name || selected.landlord?.name}
                      </div>
                      <div className="text-sm text-[#94a3b8]">
                        {selected.seller?.email || selected.landlord?.email}
                      </div>
                    </div>
                  )}

                  {/* Agents */}
                  <div className="p-3 rounded-lg bg-[#1a1a24]">
                    <div className="text-xs text-[#64748b] mb-1">Listing Agent</div>
                    <div className="text-white">{selected.listingAgent.name}</div>
                  </div>
                  {selected.buyerAgent && (
                    <div className="p-3 rounded-lg bg-[#1a1a24]">
                      <div className="text-xs text-[#64748b] mb-1">Buyer's Agent</div>
                      <div className="text-white">{selected.buyerAgent.name}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Documents</h3>
                <div className="space-y-2">
                  {selected.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] cursor-pointer transition-colors"
                    >
                      <FileText className="h-4 w-4 text-indigo-400" />
                      <span className="text-[#94a3b8]">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-8 text-center">
              <FileText className="h-12 w-12 text-[#2e2e3e] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Select a Transaction</h3>
              <p className="text-sm text-[#64748b]">Click on a transaction to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
