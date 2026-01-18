import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarClock,
  Search,
  Plus,
  Calendar,
  Factory,
  Clock,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Package,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { productionPlan, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Planning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalPlans = productionPlan.length;
    const scheduled = productionPlan.filter(p => p.status === 'scheduled').length;
    const materialShortages = productionPlan.filter(p => p.requiredMaterials.some(m => m.shortage > 0)).length;
    const totalPlannedQty = productionPlan.reduce((acc, p) => acc + p.plannedQty, 0);

    return { totalPlans, scheduled, materialShortages, totalPlannedQty };
  }, []);

  const filteredPlans = useMemo(() => {
    return productionPlan.filter(plan => {
      const matchesSearch = plan.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.lineName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || plan.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'planned': '#64748b',
      'scheduled': '#3b82f6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': '#ef4444',
      'normal': '#3b82f6',
      'low': '#64748b',
    };
    return colors[priority] || MANUFACTURING_COLOR;
  };

  const hasMaterialShortage = (plan: typeof productionPlan[0]) => {
    return plan.requiredMaterials.some(m => m.shortage > 0);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Planning"
        subtitle="Plan and schedule production activities"
        icon={CalendarClock}
        actions={
          <Button>
            <Plus size={18} />
            Create Plan
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Plans', value: stats.totalPlans, icon: CalendarClock, color: MANUFACTURING_COLOR },
          { label: 'Scheduled', value: stats.scheduled, icon: CheckCircle, color: '#3b82f6' },
          { label: 'Material Shortages', value: stats.materialShortages, icon: AlertTriangle, color: stats.materialShortages > 0 ? '#ef4444' : '#10b981' },
          { label: 'Total Planned Qty', value: stats.totalPlannedQty.toLocaleString(), icon: Package, color: '#10b981' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by product or production line..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {['all', 'planned', 'scheduled', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'All' : status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Production Plans */}
      <div className="space-y-4">
        {filteredPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-4 ${hasMaterialShortage(plan) ? 'border-l-4 border-l-error' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getStatusColor(plan.status)}20` }}
                  >
                    <CalendarClock size={24} style={{ color: getStatusColor(plan.status) }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{plan.productName}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(plan.planDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Factory size={12} />
                        {plan.lineName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {plan.shift}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${getPriorityColor(plan.priority)}20`, color: getPriorityColor(plan.priority) }}
                  >
                    {plan.priority}
                  </span>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: `${getStatusColor(plan.status)}20`, color: getStatusColor(plan.status) }}
                  >
                    {plan.status}
                  </span>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit', onClick: () => {} },
                      { id: 'create-wo', label: 'Create Work Order', onClick: () => {} },
                      { id: 'cancel', label: 'Cancel', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Plan Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Planned Quantity</p>
                  <p className="text-lg font-bold text-text-primary">{plan.plannedQty.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Production Line</p>
                  <p className="text-sm font-medium text-text-primary">{plan.lineName}</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Shift</p>
                  <p className="text-sm font-medium text-text-primary">{plan.shift}</p>
                </div>
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <p className="text-xs text-text-muted">Material Status</p>
                  <div className="flex items-center gap-1">
                    {hasMaterialShortage(plan) ? (
                      <>
                        <AlertTriangle size={14} className="text-error" />
                        <p className="text-sm font-medium text-error">Shortage</p>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} className="text-success" />
                        <p className="text-sm font-medium text-success">Available</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Material Requirements */}
              {plan.requiredMaterials.length > 0 && (
                <div className="border-t border-border-default pt-4">
                  <p className="text-sm font-medium text-text-primary mb-2">Material Requirements:</p>
                  <div className="space-y-2">
                    {plan.requiredMaterials.map((material, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          material.shortage > 0 ? 'bg-error/10' : 'bg-background-tertiary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-text-muted" />
                          <span className="text-sm text-text-primary">{material.materialName}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-text-muted">Required: {material.required}</span>
                          <span className={material.available < 0 ? 'text-error' : 'text-text-muted'}>
                            Available: {material.available}
                          </span>
                          {material.shortage > 0 && (
                            <span className="text-error font-medium">Shortage: {material.shortage}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-default">
                <Button variant="ghost" size="sm">
                  <ClipboardList size={16} className="mr-1" />
                  Check Materials
                </Button>
                <Button size="sm">
                  Create Work Order
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <Card className="p-12 text-center">
          <CalendarClock size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No production plans found</p>
        </Card>
      )}
    </div>
  );
};

export default Planning;
