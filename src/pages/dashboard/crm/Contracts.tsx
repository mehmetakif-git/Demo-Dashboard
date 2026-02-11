import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  FileSignature,
  AlertTriangle,
  DollarSign,
  Search,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Check,
  X,
  Clock,
} from 'lucide-react';
import { PageHeader, StatsCard, DataTable, Tabs } from '@/components/common';
import { contracts, contractStatusColors, type Contract } from '@/data/crmData';
import { useTranslation } from 'react-i18next';

export const Contracts = () => {
  const { t } = useTranslation('crm');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contracts
  const filteredContracts = useMemo(() => {
    let filtered = contracts;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(c => c.status === activeTab);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    const active = contracts.filter(c => c.status === 'active').length;
    const totalValue = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0);
    const expiring = contracts.filter(c => c.status === 'expiring').length;
    const pending = contracts.filter(c => c.status === 'pending').length;
    return { active, totalValue, expiring, pending };
  }, []);

  // Count expiring contracts
  const expiringCount = contracts.filter(c => c.status === 'expiring').length;

  const tabs = [
    { id: 'all', label: t('contracts.tabAll') },
    { id: 'active', label: t('contracts.tabActive') },
    { id: 'pending', label: t('contracts.tabPending') },
    { id: 'expiring', label: t('contracts.tabExpiring') },
    { id: 'expired', label: t('contracts.tabExpired') },
  ];

  const columns = [
    {
      key: 'id',
      header: t('contracts.columnContractId'),
      sortable: true,
      render: (contract: Contract) => (
        <span className="font-medium text-[#547792]">{contract.id}</span>
      ),
    },
    {
      key: 'customer',
      header: t('contracts.columnCustomer'),
      sortable: true,
      render: (contract: Contract) => (
        <span className="text-white">{contract.customer}</span>
      ),
    },
    {
      key: 'title',
      header: t('contracts.columnTitle'),
      sortable: true,
      render: (contract: Contract) => (
        <div>
          <p className="text-white">{contract.title}</p>
          <p className="text-xs text-[#64748b]">{contract.type}</p>
        </div>
      ),
    },
    {
      key: 'value',
      header: t('contracts.columnValue'),
      sortable: true,
      render: (contract: Contract) => (
        <span className="font-medium text-white">${contract.value.toLocaleString()}</span>
      ),
    },
    {
      key: 'startDate',
      header: t('contracts.columnStartDate'),
      sortable: true,
      render: (contract: Contract) => (
        <span className="text-[#94a3b8]">
          {new Date(contract.startDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'endDate',
      header: t('contracts.columnEndDate'),
      sortable: true,
      render: (contract: Contract) => (
        <span className={contract.status === 'expiring' ? 'text-[#f59e0b]' : 'text-[#94a3b8]'}>
          {new Date(contract.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: t('contracts.columnStatus'),
      sortable: true,
      render: (contract: Contract) => {
        const colors = contractStatusColors[contract.status];
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
            {contract.status}
          </span>
        );
      },
    },
    {
      key: 'autoRenew',
      header: t('contracts.columnAutoRenew'),
      render: (contract: Contract) => (
        contract.autoRenew ? (
          <Check className="h-4 w-4 text-[#10b981]" />
        ) : (
          <X className="h-4 w-4 text-[#64748b]" />
        )
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (contract: Contract) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title={t('contracts.view')}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title={t('contracts.edit')}
          >
            <Edit className="h-4 w-4" />
          </button>
          {(contract.status === 'expiring' || contract.status === 'expired') && (
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-[#10b981] transition-colors"
              title={t('contracts.renew')}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
            title={t('contracts.download')}
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('contracts.title')}
        subtitle={t('contracts.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
            <Plus className="h-4 w-4" />
            {t('contracts.createContract')}
          </button>
        }
      />

      {/* Alert Banner */}
      {expiringCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-[#f59e0b]" />
          <p className="text-[#f59e0b]">
            <span className="font-semibold">{expiringCount} {expiringCount > 1 ? 'contracts' : 'contract'}</span> expiring this month. Review and renew to avoid service interruption.
          </p>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('contracts.activeContracts')}
          value={stats.active.toString()}
          icon={FileSignature}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('contracts.totalContractValue')}
          value={`$${(stats.totalValue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#547792"
        />
        <StatsCard
          title={t('contracts.expiringSoon')}
          value={stats.expiring.toString()}
          icon={AlertTriangle}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('contracts.pendingSignature')}
          value={stats.pending.toString()}
          icon={Clock}
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
            placeholder={t('contracts.searchPlaceholder')}
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
          data={filteredContracts}
          keyExtractor={(c) => c.id}
          emptyMessage={t('contracts.noContractsFound')}
        />
      </motion.div>
    </div>
  );
};
