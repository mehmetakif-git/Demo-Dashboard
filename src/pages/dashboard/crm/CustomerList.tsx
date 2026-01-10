import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Building2,
  Users,
  DollarSign,
  LayoutGrid,
  List,
  MoreHorizontal,
  Mail,
  Phone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, StatsCard, DataTable, StatusBadge } from '@/components/common';
import { customers, segmentColors, type Customer } from '@/data/crmData';

type ViewMode = 'table' | 'card';

export const CustomerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Get unique industries
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(customers.map(c => c.industry))];
    return uniqueIndustries.sort();
  }, []);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter;
      const matchesIndustry = industryFilter === 'all' || customer.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesSegment && matchesIndustry && matchesStatus;
    });
  }, [searchQuery, segmentFilter, industryFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const enterpriseCustomers = customers.filter(c => c.segment === 'Enterprise').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalRevenue, 0);
    return { totalCustomers, activeCustomers, enterpriseCustomers, totalRevenue };
  }, []);

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#547792]/10">
            <Building2 className="h-5 w-5 text-[#547792]" />
          </div>
          <div>
            <p className="font-medium text-white">{customer.name}</p>
            <p className="text-xs text-[#64748b]">{customer.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'industry',
      header: 'Industry',
      sortable: true,
      render: (customer: Customer) => (
        <span className="text-[#94a3b8]">{customer.industry}</span>
      ),
    },
    {
      key: 'segment',
      header: 'Segment',
      sortable: true,
      render: (customer: Customer) => {
        const colors = segmentColors[customer.segment];
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {customer.segment}
          </span>
        );
      },
    },
    {
      key: 'accountManager',
      header: 'Account Manager',
      sortable: true,
      render: (customer: Customer) => (
        <span className="text-[#94a3b8]">{customer.accountManager}</span>
      ),
    },
    {
      key: 'totalRevenue',
      header: 'Total Revenue',
      sortable: true,
      render: (customer: Customer) => (
        <span className="font-medium text-white">
          ${customer.totalRevenue.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'lastContact',
      header: 'Last Contact',
      sortable: true,
      render: (customer: Customer) => (
        <span className="text-[#94a3b8]">
          {new Date(customer.lastContact).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (customer: Customer) => (
        <StatusBadge status={customer.status} />
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const CustomerCard = ({ customer }: { customer: Customer }) => {
    const colors = segmentColors[customer.segment];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate(`/dashboard/crm/customers/${customer.id}`)}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-5 hover:border-[#547792]/50 transition-colors cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#547792]/10">
              <Building2 className="h-6 w-6 text-[#547792]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{customer.name}</h3>
              <p className="text-sm text-[#64748b]">{customer.industry}</p>
            </div>
          </div>
          <StatusBadge status={customer.status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <Mail className="h-4 w-4 text-[#64748b]" />
            {customer.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <Phone className="h-4 w-4 text-[#64748b]" />
            {customer.phone}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {customer.segment}
          </span>
          <div className="text-right">
            <p className="text-lg font-semibold text-white">
              ${customer.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-[#64748b]">{customer.totalOrders} orders</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Customers"
        subtitle="Manage your customer relationships"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
            <Plus className="h-4 w-4" />
            Add Customer
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers.toString()}
          icon={Building2}
          iconColor="#547792"
        />
        <StatsCard
          title="Active Customers"
          value={stats.activeCustomers.toString()}
          icon={Users}
          iconColor="#10b981"
          subtitle={`${Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}% of total`}
        />
        <StatsCard
          title="Enterprise Segment"
          value={stats.enterpriseCustomers.toString()}
          icon={Building2}
          iconColor="#94B4C1"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filters */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#547792] w-64"
              />
            </div>

            {/* Segment Filter */}
            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
            >
              <option value="all">All Segments</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="SMB">SMB</option>
            </select>

            {/* Industry Filter */}
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-[#1a1a24] rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#547792] text-white'
                  : 'text-[#64748b] hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'card'
                  ? 'bg-[#547792] text-white'
                  : 'text-[#64748b] hover:text-white'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {viewMode === 'table' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DataTable
            columns={columns}
            data={filteredCustomers}
            keyExtractor={(c) => c.id}
            onRowClick={(customer) => navigate(`/dashboard/crm/customers/${customer.id}`)}
            emptyMessage="No customers found"
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
          {filteredCustomers.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#64748b]">
              No customers found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
