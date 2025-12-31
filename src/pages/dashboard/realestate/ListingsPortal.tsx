import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  MessageSquare,
  Settings,
  TrendingUp,
  Building,
  Zap,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import { properties } from '@/data/realestate/realestateData';

interface Portal {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  listings: number;
  views: number;
  inquiries: number;
}

const portals: Portal[] = [
  {
    id: 'zillow',
    name: 'Zillow',
    logo: 'Z',
    status: 'connected',
    lastSync: '2024-12-20 14:30',
    listings: 18,
    views: 12450,
    inquiries: 89,
  },
  {
    id: 'realtor',
    name: 'Realtor.com',
    logo: 'R',
    status: 'connected',
    lastSync: '2024-12-20 14:25',
    listings: 18,
    views: 8920,
    inquiries: 67,
  },
  {
    id: 'trulia',
    name: 'Trulia',
    logo: 'T',
    status: 'connected',
    lastSync: '2024-12-20 14:20',
    listings: 18,
    views: 5680,
    inquiries: 42,
  },
  {
    id: 'mls',
    name: 'Local MLS',
    logo: 'M',
    status: 'connected',
    lastSync: '2024-12-20 14:35',
    listings: 24,
    views: 3240,
    inquiries: 28,
  },
  {
    id: 'apartments',
    name: 'Apartments.com',
    logo: 'A',
    status: 'disconnected',
    lastSync: '2024-12-18 10:00',
    listings: 0,
    views: 0,
    inquiries: 0,
  },
  {
    id: 'redfin',
    name: 'Redfin',
    logo: 'RF',
    status: 'error',
    lastSync: '2024-12-19 08:15',
    listings: 15,
    views: 4200,
    inquiries: 31,
  },
];

export const ListingsPortal = () => {
  const [syncing, setSyncing] = useState<string | null>(null);

  const connectedPortals = portals.filter((p) => p.status === 'connected').length;
  const totalViews = portals.reduce((sum, p) => sum + p.views, 0);
  const totalInquiries = portals.reduce((sum, p) => sum + p.inquiries, 0);
  const activeListings = properties.filter((p) => p.status === 'active').length;

  const handleSync = (portalId: string) => {
    setSyncing(portalId);
    setTimeout(() => setSyncing(null), 2000);
  };

  const handleSyncAll = () => {
    setSyncing('all');
    setTimeout(() => setSyncing(null), 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'disconnected':
        return <AlertCircle className="h-4 w-4 text-slate-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Listings Portal"
        subtitle="Manage your property syndication across platforms"
        actions={
          <button
            onClick={handleSyncAll}
            disabled={syncing === 'all'}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${syncing === 'all' ? 'animate-spin' : ''}`} />
            {syncing === 'all' ? 'Syncing...' : 'Sync All'}
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Connected Portals"
          value={`${connectedPortals}/${portals.length}`}
          icon={Globe}
        />
        <StatsCard
          title="Active Listings"
          value={activeListings}
          icon={Building}
        />
        <StatsCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={Eye}
          trend={{ value: "+18%", type: "up" }}
        />
        <StatsCard
          title="Total Inquiries"
          value={totalInquiries}
          icon={MessageSquare}
          trend={{ value: "+12%", type: "up" }}
        />
      </div>

      {/* Connected Portals */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Connected Portals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map((portal) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {portal.logo}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{portal.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getStatusIcon(portal.status)}
                      <span className={`text-xs ${
                        portal.status === 'connected' ? 'text-emerald-400' :
                        portal.status === 'error' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {portal.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSync(portal.id)}
                  disabled={syncing === portal.id || portal.status === 'disconnected'}
                  className="p-2 rounded-lg border border-[#1e1e2e] text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${syncing === portal.id ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {portal.status !== 'disconnected' && (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 rounded-lg bg-[#12121a]">
                      <div className="text-lg font-semibold text-white">{portal.listings}</div>
                      <div className="text-xs text-[#64748b]">Listings</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#12121a]">
                      <div className="text-lg font-semibold text-white">{portal.views.toLocaleString()}</div>
                      <div className="text-xs text-[#64748b]">Views</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#12121a]">
                      <div className="text-lg font-semibold text-white">{portal.inquiries}</div>
                      <div className="text-xs text-[#64748b]">Inquiries</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#64748b]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Last sync: {portal.lastSync}
                    </div>
                    <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                      <Settings className="h-3.5 w-3.5" />
                      Settings
                    </button>
                  </div>
                </>
              )}

              {portal.status === 'disconnected' && (
                <button className="w-full mt-2 py-2 rounded-lg border border-dashed border-[#2e2e3e] text-sm text-[#94a3b8] hover:text-white hover:border-indigo-500/50 transition-colors">
                  Connect Portal
                </button>
              )}

              {portal.status === 'error' && (
                <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs text-red-400">Sync failed. Check API credentials.</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance by Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Views by Portal</h3>
          <div className="space-y-4">
            {portals
              .filter((p) => p.status !== 'disconnected')
              .sort((a, b) => b.views - a.views)
              .map((portal) => {
                const percentage = (portal.views / totalViews) * 100;
                return (
                  <div key={portal.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{portal.name}</span>
                      <span className="text-sm text-[#94a3b8]">{portal.views.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Inquiries by Portal</h3>
          <div className="space-y-4">
            {portals
              .filter((p) => p.status !== 'disconnected')
              .sort((a, b) => b.inquiries - a.inquiries)
              .map((portal) => {
                const percentage = (portal.inquiries / totalInquiries) * 100;
                return (
                  <div key={portal.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{portal.name}</span>
                      <span className="text-sm text-[#94a3b8]">{portal.inquiries}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bulk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#2e2e3e] transition-colors">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Sync All Listings</div>
              <div className="text-xs text-[#64748b]">Update all portals with latest data</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#2e2e3e] transition-colors">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Update Pricing</div>
              <div className="text-xs text-[#64748b]">Sync price changes across portals</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#2e2e3e] transition-colors">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Refresh Photos</div>
              <div className="text-xs text-[#64748b]">Re-upload images to all platforms</div>
            </div>
          </button>
        </div>
      </div>

      {/* Listing Sync Status */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Listing Sync Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b]">Property</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b]">Zillow</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b]">Realtor.com</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b]">Trulia</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b]">MLS</th>
              </tr>
            </thead>
            <tbody>
              {properties.filter((p) => p.status === 'active').slice(0, 5).map((property) => (
                <tr key={property.id} className="border-b border-[#1e1e2e]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                        <Building className="h-5 w-5 text-[#2e2e3e]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white truncate max-w-[200px]">{property.title}</div>
                        <div className="text-xs text-[#64748b]">{property.address.city}, {property.address.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
