import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Users,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import { owners } from '@/data/realestate/realestateData';

export const Owners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);

  const filteredOwners = owners.filter((owner) => {
    const matchesSearch =
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || owner.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalOwners = owners.length;
  const companies = owners.filter((o) => o.type === 'company').length;
  const individuals = owners.filter((o) => o.type === 'individual').length;
  const totalProperties = owners.reduce((sum, o) => sum + o.totalProperties, 0);

  const selected = selectedOwner ? owners.find((o) => o.id === selectedOwner) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Property Owners"
        subtitle="Manage property owners and landlords"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Owner
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Owners"
          value={totalOwners}
          icon={Users}
        />
        <StatsCard
          title="Companies"
          value={companies}
          icon={Building}
        />
        <StatsCard
          title="Individuals"
          value={individuals}
          icon={User}
        />
        <StatsCard
          title="Total Properties"
          value={totalProperties}
          icon={Home}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="company">Companies</option>
          <option value="individual">Individuals</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Owner List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOwners.map((owner) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border bg-[#12121a] p-6 cursor-pointer transition-colors ${
                selectedOwner === owner.id
                  ? 'border-indigo-500'
                  : 'border-[#1e1e2e] hover:border-[#2e2e3e]'
              }`}
              onClick={() => setSelectedOwner(owner.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-lg flex items-center justify-center ${
                    owner.type === 'company'
                      ? 'bg-indigo-500/20'
                      : 'bg-purple-500/20'
                  }`}>
                    {owner.type === 'company' ? (
                      <Building className="h-7 w-7 text-indigo-400" />
                    ) : (
                      <User className="h-7 w-7 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{owner.name}</h3>
                    <p className="text-sm text-[#64748b] capitalize">{owner.type}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#94a3b8]">
                      <span className="flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" />
                        {owner.totalProperties} properties
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        {owner.activeListings} active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1e1e2e] grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <Mail className="h-4 w-4 text-[#64748b]" />
                  {owner.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <Phone className="h-4 w-4 text-[#64748b]" />
                  {owner.phone}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Owner Detail Panel */}
        <div className="space-y-6">
          {selected ? (
            <>
              {/* Owner Info */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${
                    selected.type === 'company'
                      ? 'bg-indigo-500/20'
                      : 'bg-purple-500/20'
                  }`}>
                    {selected.type === 'company' ? (
                      <Building className="h-8 w-8 text-indigo-400" />
                    ) : (
                      <User className="h-8 w-8 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
                    <p className="text-sm text-[#64748b] capitalize">{selected.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-[#64748b]" />
                    <a href={`mailto:${selected.email}`} className="text-[#94a3b8] hover:text-white">
                      {selected.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-[#64748b]" />
                    <a href={`tel:${selected.phone}`} className="text-[#94a3b8] hover:text-white">
                      {selected.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#64748b] mt-0.5" />
                    <span className="text-[#94a3b8]">{selected.address}</span>
                  </div>
                </div>
              </div>

              {/* Primary Contact */}
              {selected.primaryContact && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Primary Contact</h3>
                  <div className="space-y-2">
                    <div className="text-white font-medium">{selected.primaryContact.name}</div>
                    <div className="text-sm text-[#64748b]">{selected.primaryContact.title}</div>
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Mail className="h-3.5 w-3.5" />
                      {selected.primaryContact.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Phone className="h-3.5 w-3.5" />
                      {selected.primaryContact.phone}
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Portfolio</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <div className="text-2xl font-bold text-white">{selected.totalProperties}</div>
                    <div className="text-xs text-[#64748b]">Total Properties</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <div className="text-2xl font-bold text-indigo-400">{selected.activeListings}</div>
                    <div className="text-xs text-[#64748b]">Active Listings</div>
                  </div>
                </div>
              </div>

              {/* Preferred Agent */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Preferred Agent</h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {selected.preferredAgent.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </div>
                  <span className="text-white">{selected.preferredAgent}</span>
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                  <p className="text-sm text-[#94a3b8]">{selected.notes}</p>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-8 text-center">
              <User className="h-12 w-12 text-[#2e2e3e] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Select an Owner</h3>
              <p className="text-sm text-[#64748b]">Click on an owner to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
