import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Flame,
  UserCheck,
  TrendingUp,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Home,
  Building,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, StatsCard } from '@/components/common';
import {
  leads,
  leadStatuses,
  getLeadStatusColor,
  getLeadTypeColor,
  formatCurrency,
} from '@/data/realestate/realestateData';

export const LeadList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || lead.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.status === 'hot').length;
  const buyers = leads.filter((l) => l.type === 'buyer').length;
  const renters = leads.filter((l) => l.type === 'renter').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle="Manage buyer, renter, and seller leads"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          trend={{ value: "+15%", type: "up" }}
        />
        <StatsCard
          title="Hot Leads"
          value={hotLeads}
          icon={Flame}
          iconColor="text-red-400"
          trend={{ value: "+8%", type: "up" }}
        />
        <StatsCard
          title="Buyers"
          value={buyers}
          icon={UserCheck}
          trend={{ value: "+12%", type: "up" }}
        />
        <StatsCard
          title="Renters/Sellers"
          value={renters + leads.filter((l) => l.type === 'seller').length}
          icon={TrendingUp}
          trend={{ value: "+5%", type: "up" }}
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="buyer">Buyers</option>
            <option value="renter">Renters</option>
            <option value="seller">Sellers</option>
            <option value="investor">Investors</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            {leadStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#64748b]">
        Showing {filteredLeads.length} of {leads.length} leads
      </div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-[#2e2e3e] transition-colors cursor-pointer"
            onClick={() => navigate(`/dashboard/realestate/leads/${lead.id}`)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-medium">{lead.firstName} {lead.lastName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLeadTypeColor(lead.type)}`}>
                      {lead.type.charAt(0).toUpperCase() + lead.type.slice(1)}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLeadStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget / Property Info */}
            {lead.budget && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span className="text-[#94a3b8]">
                  Budget: {formatCurrency(lead.budget.min)} - {formatCurrency(lead.budget.max)}
                </span>
              </div>
            )}
            {lead.propertyAddress && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <Home className="h-4 w-4 text-indigo-400" />
                <span className="text-[#94a3b8] truncate">{lead.propertyAddress}</span>
              </div>
            )}

            {/* Preferences Summary */}
            {lead.preferences && (
              <div className="flex flex-wrap gap-1 mb-3">
                {lead.preferences.propertyTypes.slice(0, 2).map((type) => (
                  <span key={type} className="px-2 py-0.5 rounded bg-[#1a1a24] text-xs text-[#64748b] capitalize">
                    {type}
                  </span>
                ))}
                {lead.preferences.locations.slice(0, 2).map((loc) => (
                  <span key={loc} className="px-2 py-0.5 rounded bg-[#1a1a24] text-xs text-[#64748b]">
                    {loc}
                  </span>
                ))}
              </div>
            )}

            {/* Pre-approval Badge */}
            {lead.preApproved && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <Building className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Pre-Approved: {formatCurrency(lead.preApprovalAmount!)}</span>
              </div>
            )}

            {/* Agent */}
            <div className="text-xs text-[#64748b] mb-3">
              Assigned to: <span className="text-[#94a3b8]">{lead.assignedAgent}</span>
            </div>

            {/* Contact Info & Follow-up */}
            <div className="pt-3 border-t border-[#1e1e2e] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <Calendar className="h-3.5 w-3.5" />
                <span>Last Contact: {lead.lastContact}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>Next Follow-up: {lead.nextFollowUp}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1e1e2e]">
              <a
                href={`tel:${lead.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#1e1e2e] py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={`mailto:${lead.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#1e1e2e] py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
