import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Box,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Wrench,
  AlertTriangle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  assets,
  assetCategories,
  getStatusColor,
  formatDate,
  type Asset,
} from '@/data/maintenanceData';
import { useTranslation } from 'react-i18next';

export const AssetList = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => ({
    total: assets.length,
    operational: assets.filter(a => a.status === 'operational').length,
    needsRepair: assets.filter(a => a.status === 'needs-repair').length,
    underMaintenance: assets.filter(a => a.status === 'under-maintenance').length,
  }), []);

  const filteredAssets = useMemo(() => {
    let filtered = [...assets];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        a =>
          a.name.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.location.toLowerCase().includes(query) ||
          a.serialNumber.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(a => a.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category.toLowerCase() === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedCategory]);

  const getStatusBadge = (status: Asset['status']) => {
    const config = {
      operational: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Operational' },
      'needs-repair': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Needs Repair' },
      'under-maintenance': { bg: 'bg-[#547792]/20', text: 'text-[#547792]', label: 'Under Maintenance' },
      'out-of-service': { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Out of Service' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getConditionBadge = (condition: Asset['condition']) => {
    const config = {
      good: { bg: 'bg-green-500/20', text: 'text-green-400' },
      fair: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      poor: { bg: 'bg-red-500/20', text: 'text-red-400' },
    };
    const c = config[condition];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {condition}
      </span>
    );
  };

  const getPriorityBadge = (priority: Asset['criticality']) => {
    const config = {
      critical: { bg: 'bg-red-500/20', text: 'text-red-400' },
      high: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      medium: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      low: { bg: 'bg-slate-500/20', text: 'text-slate-400' },
    };
    const c = config[priority];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${c.bg} ${c.text}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('maintenance.assets', 'Assets')}
        subtitle="Manage and track all maintenance assets"
        actions={
          <Button leftIcon={<Plus size={16} />}>
            Add Asset
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Assets"
          value={stats.total.toString()}
          icon={Box}
          iconColor="#547792"
        />
        <StatsCard
          title="Operational"
          value={stats.operational.toString()}
          icon={Box}
          iconColor="#10b981"
        />
        <StatsCard
          title="Needs Repair"
          value={stats.needsRepair.toString()}
          icon={Wrench}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Under Maintenance"
          value={stats.underMaintenance.toString()}
          icon={AlertTriangle}
          iconColor="#547792"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Status</option>
              <option value="operational">Operational</option>
              <option value="needs-repair">Needs Repair</option>
              <option value="under-maintenance">Under Maintenance</option>
              <option value="out-of-service">Out of Service</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">All Categories</option>
              {assetCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Asset Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-5 hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => navigate(`/dashboard/maintenance/assets/${asset.id}`)}
              >
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getStatusColor(asset.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getStatusColor(asset.status)}20` }}
                      >
                        <Box size={20} style={{ color: getStatusColor(asset.status) }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{asset.name}</h3>
                        <p className="text-xs text-text-secondary">{asset.id}</p>
                      </div>
                    </div>
                    <button
                      className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-text-secondary">
                    <MapPin size={14} />
                    <span>{asset.location}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {getStatusBadge(asset.status)}
                    {getConditionBadge(asset.condition)}
                    {getPriorityBadge(asset.criticality)}
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${assetCategories.find(c => c.name === asset.category)?.color || '#64748b'}20`,
                        color: assetCategories.find(c => c.name === asset.category)?.color || '#64748b'
                      }}
                    >
                      {asset.category}
                    </span>
                    <span className="text-sm text-text-secondary">{asset.type}</span>
                  </div>

                  {/* Meta Info */}
                  <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between">
                      <span>Last Maintenance</span>
                      <span className="text-text-primary">{formatDate(asset.lastMaintenance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Maintenance</span>
                      <span className="text-text-primary">{formatDate(asset.nextMaintenance)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.08]">
                    <button
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/maintenance/assets/${asset.id}`);
                      }}
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Asset</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Condition</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Criticality</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Next Maintenance</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredAssets.map((asset, index) => (
                  <motion.tr
                    key={asset.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/maintenance/assets/${asset.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(asset.status)}20` }}
                        >
                          <Box size={16} style={{ color: getStatusColor(asset.status) }} />
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">{asset.name}</span>
                          <p className="text-xs text-text-secondary">{asset.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{asset.category}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{asset.location}</td>
                    <td className="py-3 px-4">{getStatusBadge(asset.status)}</td>
                    <td className="py-3 px-4">{getConditionBadge(asset.condition)}</td>
                    <td className="py-3 px-4">{getPriorityBadge(asset.criticality)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{formatDate(asset.nextMaintenance)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/maintenance/assets/${asset.id}`);
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredAssets.length === 0 && (
        <Card className="p-12 text-center">
          <Box size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No assets found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
