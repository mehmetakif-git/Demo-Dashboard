import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Target,
  UserPlus,
  TrendingUp,
  Percent,
  MoreHorizontal,
  Mail,
  Phone,
  UserCheck,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PageHeader, StatsCard, DataTable } from '@/components/common';
import { leads, leadSources, leadStatusColors, type Lead } from '@/data/crmData';

export const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [assignedFilter, setAssignedFilter] = useState<string>('all');

  // Get unique values for filters
  const sources = useMemo(() => [...new Set(leads.map(l => l.source))], []);
  const assignees = useMemo(() => [...new Set(leads.map(l => l.assignedTo))], []);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      const matchesAssigned = assignedFilter === 'all' || lead.assignedTo === assignedFilter;
      return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
    });
  }, [searchQuery, statusFilter, sourceFilter, assignedFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const newThisWeek = leads.filter(l => {
      const created = new Date(l.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= weekAgo;
    }).length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const conversionRate = Math.round((qualified / totalLeads) * 100);
    return { totalLeads, newThisWeek, qualified, conversionRate };
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const columns = [
    {
      key: 'name',
      header: 'Lead',
      sortable: true,
      render: (lead: Lead) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#547792]/10">
            <span className="text-sm font-medium text-[#547792]">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-white">{lead.name}</p>
            <p className="text-xs text-[#64748b]">{lead.company}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (lead: Lead) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <Mail className="h-3 w-3" />
            {lead.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <Phone className="h-3 w-3" />
            {lead.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      render: (lead: Lead) => (
        <span className="text-[#94a3b8]">{lead.source}</span>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      render: (lead: Lead) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-[#1a1a24] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${lead.score}%`,
                backgroundColor: getScoreColor(lead.score),
              }}
            />
          </div>
          <span className="text-sm font-medium" style={{ color: getScoreColor(lead.score) }}>
            {lead.score}
          </span>
        </div>
      ),
    },
    {
      key: 'value',
      header: 'Est. Value',
      sortable: true,
      render: (lead: Lead) => (
        <span className="font-medium text-white">${lead.value.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (lead: Lead) => {
        const colors = leadStatusColors[lead.status];
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
            {lead.status}
          </span>
        );
      },
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      sortable: true,
      render: (lead: Lead) => (
        <span className="text-[#94a3b8]">{lead.assignedTo}</span>
      ),
    },
    {
      key: 'lastActivity',
      header: 'Last Activity',
      sortable: true,
      render: (lead: Lead) => (
        <span className="text-[#94a3b8]">
          {new Date(lead.lastActivity).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-[#10b981] transition-colors"
            title="Convert to Customer"
          >
            <UserCheck className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#1a1a24] hover:text-white transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Leads"
        subtitle="Track and manage your sales leads"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads.toString()}
          icon={Target}
          iconColor="#547792"
        />
        <StatsCard
          title="New This Week"
          value={stats.newThisWeek.toString()}
          icon={UserPlus}
          iconColor="#10b981"
          trend={{ value: "+12% from last week", type: "up" }}
        />
        <StatsCard
          title="Qualified"
          value={stats.qualified.toString()}
          icon={TrendingUp}
          iconColor="#94B4C1"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={Percent}
          iconColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Leads Table */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#547792]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
              </select>

              {/* Source Filter */}
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>

              {/* Assigned Filter */}
              <select
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
                className="px-3 py-2 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-sm text-white focus:outline-none focus:border-[#547792]"
              >
                <option value="all">All Assignees</option>
                {assignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataTable
              columns={columns}
              data={filteredLeads}
              keyExtractor={(l) => l.id}
              emptyMessage="No leads found"
            />
          </motion.div>
        </div>

        {/* Lead Sources Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Lead Sources</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="99%" height={250}>
              <PieChart>
                <Pie
                  data={leadSources as any[]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a24',
                    border: '1px solid #2e2e3e',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value, name) => [`${value} leads`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {leadSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-[#94a3b8]">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-white">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
