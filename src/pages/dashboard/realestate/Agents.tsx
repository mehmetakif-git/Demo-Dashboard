import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  Phone,
  Mail,
  Building,
  DollarSign,
  TrendingUp,
  Calendar,
  Award,
  Users,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import { agents, formatCurrency } from '@/data/realestate/realestateData';

export const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const filteredAgents = agents.filter((agent) => {
    return (
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const totalListings = agents.reduce((sum, a) => sum + a.stats.activeListings, 0);
  const totalVolume = agents.reduce((sum, a) => sum + (a.stats.totalSalesYTD || 0), 0);
  const avgRating = (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1);

  const selected = selectedAgent ? agents.find((a) => a.id === selectedAgent) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agents"
        subtitle="Manage your real estate agents"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Agents"
          value={activeAgents}
          icon={Users}
        />
        <StatsCard
          title="Total Listings"
          value={totalListings}
          icon={Building}
        />
        <StatsCard
          title="Total Volume YTD"
          value={formatCurrency(totalVolume)}
          icon={DollarSign}
          trend={{ value: "+18%", type: "up" }}
        />
        <StatsCard
          title="Avg Rating"
          value={avgRating}
          icon={Star}
          iconColor="text-amber-400"
        />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        <input
          type="text"
          placeholder="Search agents or specializations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border bg-[#12121a] p-6 cursor-pointer transition-colors ${
                selectedAgent === agent.id
                  ? 'border-indigo-500'
                  : 'border-[#1e1e2e] hover:border-[#2e2e3e]'
              }`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {agent.name.split(' ').map(n => n.charAt(0)).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      agent.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748b]">{agent.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-white">{agent.rating}</span>
                    <span className="text-sm text-[#64748b]">({agent.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1 mt-4">
                {agent.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 rounded bg-[#1a1a24] text-xs text-[#94a3b8]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#1e1e2e]">
                <div>
                  <div className="text-xs text-[#64748b]">Active Listings</div>
                  <div className="text-lg font-semibold text-white">{agent.stats.activeListings}</div>
                </div>
                <div>
                  <div className="text-xs text-[#64748b]">YTD Volume</div>
                  <div className="text-lg font-semibold text-emerald-400">
                    {formatCurrency(agent.stats.totalSalesYTD || agent.stats.totalRentalsYTD || 0)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agent Detail Panel */}
        <div className="space-y-6">
          {selected ? (
            <>
              {/* Profile */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <div className="text-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selected.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
                  <p className="text-[#64748b]">{selected.title}</p>
                  {selected.teamName && (
                    <p className="text-sm text-indigo-400 mt-1">{selected.teamName}</p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(selected.rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-[#2e2e3e]'
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2">{selected.rating}</span>
                  <span className="text-[#64748b]">({selected.reviews})</span>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-indigo-400" />
                    <span className="text-[#94a3b8]">{selected.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-indigo-400" />
                    <span className="text-[#94a3b8]">{selected.email}</span>
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{selected.bio}</p>
              </div>

              {/* Stats Dashboard */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <Building className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">{selected.stats.activeListings}</div>
                    <div className="text-xs text-[#64748b]">Active Listings</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">
                      {selected.stats.transactionsYTD || selected.stats.totalRentalsYTD || 0}
                    </div>
                    <div className="text-xs text-[#64748b]">Transactions YTD</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <Calendar className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">{selected.stats.avgDaysOnMarket}</div>
                    <div className="text-xs text-[#64748b]">Avg Days on Market</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1a1a24] text-center">
                    <Award className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">
                      {selected.stats.listToSaleRatio || selected.stats.clientSatisfaction || 0}%
                    </div>
                    <div className="text-xs text-[#64748b]">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Commission */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Commission</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Split</span>
                    <span className="text-white">{selected.commission.split}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">YTD Earnings</span>
                    <span className="text-emerald-400 font-semibold">
                      ${selected.commission.ytdEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* License Info */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">License</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">License #</span>
                    <span className="text-white">{selected.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Expires</span>
                    <span className="text-white">{selected.licenseExpiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Since</span>
                    <span className="text-white">{selected.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {(selected.socialMedia.linkedin || selected.socialMedia.instagram) && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
                  <div className="space-y-2">
                    {selected.socialMedia.linkedin && (
                      <a
                        href={`https://${selected.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {selected.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${selected.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-8 text-center">
              <Briefcase className="h-12 w-12 text-[#2e2e3e] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Select an Agent</h3>
              <p className="text-sm text-[#64748b]">Click on an agent to view their profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
