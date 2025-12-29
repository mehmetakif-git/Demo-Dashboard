import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Target,
  Percent,
  List,
  LayoutGrid,
  Calendar,
  User,
  GripVertical,
} from 'lucide-react';
import { PageHeader, StatsCard, DataTable } from '@/components/common';
import { opportunities, pipelineStages, type Opportunity } from '@/data/crmData';

type ViewMode = 'pipeline' | 'list';

export const Opportunities = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('pipeline');

  // Group opportunities by stage
  const opportunitiesByStage = useMemo(() => {
    const grouped: Record<string, Opportunity[]> = {};
    pipelineStages.forEach(stage => {
      grouped[stage.id] = opportunities.filter(o => o.stage === stage.id);
    });
    return grouped;
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const activeOpps = opportunities.filter(o => !['closed-won', 'closed-lost'].includes(o.stage));
    const totalPipeline = activeOpps.reduce((sum, o) => sum + o.value, 0);
    const weightedValue = activeOpps.reduce((sum, o) => sum + (o.value * o.probability / 100), 0);

    const thisMonth = new Date();
    const dealsThisMonth = opportunities.filter(o => {
      const closeDate = new Date(o.expectedClose);
      return closeDate.getMonth() === thisMonth.getMonth() &&
             closeDate.getFullYear() === thisMonth.getFullYear() &&
             !['closed-won', 'closed-lost'].includes(o.stage);
    }).length;

    const closedWon = opportunities.filter(o => o.stage === 'closed-won').length;
    const closedTotal = opportunities.filter(o => ['closed-won', 'closed-lost'].includes(o.stage)).length;
    const winRate = closedTotal > 0 ? Math.round((closedWon / closedTotal) * 100) : 0;

    return { totalPipeline, weightedValue, dealsThisMonth, winRate };
  }, []);

  // Get stage value totals
  const getStageTotals = (stageId: string) => {
    const stageOpps = opportunitiesByStage[stageId] || [];
    return stageOpps.reduce((sum, o) => sum + o.value, 0);
  };

  const columns = [
    {
      key: 'name',
      header: 'Opportunity',
      sortable: true,
      render: (opp: Opportunity) => (
        <div>
          <p className="font-medium text-white">{opp.name}</p>
          <p className="text-xs text-[#64748b]">{opp.id}</p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      render: (opp: Opportunity) => (
        <span className="text-[#94a3b8]">{opp.customer}</span>
      ),
    },
    {
      key: 'value',
      header: 'Value',
      sortable: true,
      render: (opp: Opportunity) => (
        <span className="font-medium text-white">${opp.value.toLocaleString()}</span>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      sortable: true,
      render: (opp: Opportunity) => {
        const stage = pipelineStages.find(s => s.id === opp.stage);
        return (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: `${stage?.color}20`, color: stage?.color }}
          >
            {stage?.name}
          </span>
        );
      },
    },
    {
      key: 'probability',
      header: 'Probability',
      sortable: true,
      render: (opp: Opportunity) => (
        <span className="text-[#94a3b8]">{opp.probability}%</span>
      ),
    },
    {
      key: 'expectedClose',
      header: 'Expected Close',
      sortable: true,
      render: (opp: Opportunity) => (
        <span className="text-[#94a3b8]">
          {new Date(opp.expectedClose).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      render: (opp: Opportunity) => (
        <span className="text-[#94a3b8]">{opp.owner}</span>
      ),
    },
  ];

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => {
    const isClosedLost = opportunity.stage === 'closed-lost';

    return (
      <div
        className={`bg-[#1a1a24] rounded-lg p-4 border border-[#2e2e3e] hover:border-[#6366f1]/50 transition-colors cursor-pointer ${
          isClosedLost ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-[#64748b]" />
            <span className="text-xs text-[#64748b]">{opportunity.customer}</span>
          </div>
        </div>
        <h4 className="font-medium text-white mb-2 line-clamp-2">{opportunity.name}</h4>
        <p className="text-xl font-bold text-white mb-3">
          ${opportunity.value.toLocaleString()}
        </p>
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <div className="flex items-center gap-1">
            <Percent className="h-3 w-3" />
            {opportunity.probability}%
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(opportunity.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#2e2e3e]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6366f1]/10">
            <User className="h-3 w-3 text-[#6366f1]" />
          </div>
          <span className="text-xs text-[#94a3b8]">{opportunity.owner}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Sales Pipeline"
        subtitle="Track and manage your sales opportunities"
        actions={
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#1a1a24] rounded-lg p-1">
              <button
                onClick={() => setViewMode('pipeline')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'pipeline'
                    ? 'bg-[#6366f1] text-white'
                    : 'text-[#64748b] hover:text-white'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#6366f1] text-white'
                    : 'text-[#64748b] hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
              <Plus className="h-4 w-4" />
              Add Opportunity
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Pipeline"
          value={`$${(stats.totalPipeline / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Weighted Value"
          value={`$${(stats.weightedValue / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          iconColor="#10b981"
        />
        <StatsCard
          title="Deals This Month"
          value={stats.dealsThisMonth.toString()}
          icon={Target}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          icon={Percent}
          iconColor="#8b5cf6"
        />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map((stage) => {
              const stageOpps = opportunitiesByStage[stage.id] || [];
              const stageTotal = getStageTotals(stage.id);
              const isClosedWon = stage.id === 'closed-won';
              const isClosedLost = stage.id === 'closed-lost';

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-72 flex-shrink-0 rounded-xl p-4 ${
                    isClosedWon ? 'bg-[#10b981]/10 border border-[#10b981]/30' :
                    isClosedLost ? 'bg-[#ef4444]/10 border border-[#ef4444]/30' :
                    'bg-[#12121a] border border-[#1e1e2e]'
                  }`}
                >
                  {/* Stage Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <h3 className="font-semibold text-white">{stage.name}</h3>
                    </div>
                    <span className="text-sm text-[#64748b]">{stageOpps.length}</span>
                  </div>

                  {/* Stage Total */}
                  <div className="mb-4 p-3 bg-[#0a0a0f]/50 rounded-lg">
                    <p className="text-xs text-[#64748b]">Total Value</p>
                    <p className="text-lg font-bold text-white">
                      ${stageTotal.toLocaleString()}
                    </p>
                  </div>

                  {/* Opportunity Cards */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {stageOpps.map((opp) => (
                      <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                    {stageOpps.length === 0 && (
                      <div className="text-center py-8 text-[#64748b] text-sm">
                        No opportunities
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DataTable
            columns={columns}
            data={opportunities}
            keyExtractor={(o) => o.id}
            emptyMessage="No opportunities found"
          />
        </motion.div>
      )}
    </div>
  );
};
