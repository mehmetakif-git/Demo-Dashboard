import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Plus,
  Eye,
  Settings,
} from 'lucide-react';
import { PageHeader, StatsCard, Modal } from '@/components/common';
import { bankAccounts, transactions, getTransactionsByAccount } from '@/data/accountingData';
import type { BankAccount } from '@/data/accountingData';

const accountTypeLabels: Record<string, string> = {
  checking: 'Checking',
  savings: 'Savings',
  business: 'Business',
};

export const BankAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showTransactions, setShowTransactions] = useState(false);

  const stats = useMemo(() => {
    const totalBalance = bankAccounts.reduce((acc, a) => acc + a.balance, 0);
    const checkingBalance = bankAccounts
      .filter((a) => a.accountType === 'checking')
      .reduce((acc, a) => acc + a.balance, 0);
    const savingsBalance = bankAccounts
      .filter((a) => a.accountType === 'savings')
      .reduce((acc, a) => acc + a.balance, 0);

    return {
      totalBalance,
      checkingBalance,
      savingsBalance,
      accountCount: bankAccounts.length,
    };
  }, []);

  const handleViewTransactions = (account: BankAccount) => {
    setSelectedAccount(account);
    setShowTransactions(true);
  };

  const accountTransactions = useMemo(() => {
    if (!selectedAccount) return [];
    return getTransactionsByAccount(selectedAccount.id);
  }, [selectedAccount]);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Bank Accounts"
        subtitle="Manage your connected bank accounts"
        icon={Landmark}
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white hover:bg-[#1a1a24] transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4" />
              Sync All
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Account
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Balance"
          value={`$${(stats.totalBalance / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#6366f1"
          iconBg="rgba(99, 102, 241, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Checking Accounts"
          value={`$${(stats.checkingBalance / 1000).toFixed(0)}K`}
          icon={Landmark}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Savings"
          value={`$${(stats.savingsBalance / 1000).toFixed(0)}K`}
          icon={Landmark}
          iconColor="#8b5cf6"
          iconBg="rgba(139, 92, 246, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Connected Accounts"
          value={stats.accountCount}
          icon={Landmark}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bankAccounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6 hover:border-[#2e2e3e] transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/20 flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-[#6366f1]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{account.bankName}</h3>
                  <p className="text-xs text-white/40">{accountTypeLabels[account.accountType]}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleViewTransactions(account)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-white/40 hover:text-[#6366f1] hover:bg-[#6366f1]/10 transition-colors cursor-pointer">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-white/40 mb-1">Account Name</p>
                <p className="text-white">{account.accountName}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Account Number</p>
                <p className="text-white/60">{account.accountNumber}</p>
              </div>
            </div>

            {/* Balance */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/20">
              <p className="text-xs text-white/40 mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-white">${account.balance.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-2">
                Last synced: {new Date(account.lastSync).toLocaleString()}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1e1e2e]">
              <span
                className={`flex items-center gap-1 text-xs ${
                  account.isActive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    account.isActive ? 'bg-emerald-400' : 'bg-red-400'
                  }`}
                />
                {account.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-white/40">{account.currency}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 8).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit'
                      ? 'bg-emerald-500/20'
                      : 'bg-red-500/20'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-xs text-white/40">
                    {new Date(transaction.date).toLocaleDateString()} - {transaction.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-white/40">Bal: ${transaction.balance.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transactions Modal */}
      <Modal
        isOpen={showTransactions}
        onClose={() => setShowTransactions(false)}
        title={selectedAccount ? `${selectedAccount.bankName} - Transactions` : 'Transactions'}
      >
        {selectedAccount && (
          <div className="space-y-4">
            {/* Account Summary */}
            <div className="p-4 rounded-lg bg-[#1a1a24]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">{selectedAccount.accountName}</span>
                <span className="text-white font-semibold">
                  ${selectedAccount.balance.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-white/40">{selectedAccount.accountNumber}</p>
            </div>

            {/* Transaction List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {accountTransactions.length > 0 ? (
                accountTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          transaction.type === 'credit'
                            ? 'bg-emerald-500/20'
                            : 'bg-red-500/20'
                        }`}
                      >
                        {transaction.type === 'credit' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm">{transaction.description}</p>
                        <p className="text-xs text-white/40">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-center py-8">No transactions found</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
