import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  PieChart,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { budgetCategories, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Budget = () => {
  const { t } = useTranslation('construction');
  const [selectedProject, setSelectedProject] = useState<string>('PRJ001');

  const projectBudget = useMemo(() => {
    return budgetCategories.filter(b => b.projectId === selectedProject);
  }, [selectedProject]);

  const stats = useMemo(() => {
    const totalBudget = projectBudget.reduce((acc, b) => acc + b.budgeted, 0);
    const totalSpent = projectBudget.reduce((acc, b) => acc + b.spent, 0);
    const totalCommitted = projectBudget.reduce((acc, b) => acc + b.committed, 0);
    const totalRemaining = projectBudget.reduce((acc, b) => acc + b.remaining, 0);
    const variance = totalBudget - totalSpent;

    return { totalBudget, totalSpent, totalCommitted, totalRemaining, variance };
  }, [projectBudget]);

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M QAR`;
    }
    return `${amount.toLocaleString()} QAR`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Labor': '#3b82f6',
      'Materials': CONSTRUCTION_COLOR,
      'Equipment': '#8b5cf6',
      'Subcontractors': '#10b981',
      'Overheads': '#f59e0b',
    };
    return colors[category] || CONSTRUCTION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('budget.title')}
        subtitle={t('budget.subtitle')}
        icon={DollarSign}
        actions={
          <div className="flex gap-2">
            <Button variant="ghost">
              <Download size={18} />
              {t('budget.exportReport')}
            </Button>
            <Button>
              <Plus size={18} />
              {t('budget.addExpense')}
            </Button>
          </div>
        }
      />

      {/* Project Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-text-muted">{t('budget.selectProject')}</span>
          <select
            className="px-4 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary flex-1 max-w-md"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.projectNo} - {p.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('budget.totalBudget'), value: formatCurrency(stats.totalBudget), icon: DollarSign, color: CONSTRUCTION_COLOR },
          { label: t('budget.totalSpent'), value: formatCurrency(stats.totalSpent), icon: TrendingUp, color: '#3b82f6' },
          { label: t('budget.committed'), value: formatCurrency(stats.totalCommitted), icon: PieChart, color: '#8b5cf6' },
          { label: t('budget.remaining'), value: formatCurrency(stats.totalRemaining), icon: DollarSign, color: '#10b981' },
          { label: t('budget.variance'), value: formatCurrency(stats.variance), icon: stats.variance >= 0 ? TrendingUp : TrendingDown, color: stats.variance >= 0 ? '#10b981' : '#ef4444' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Breakdown Table */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">{t('budget.breakdownByCategory')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-tertiary">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('budget.category')}</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('budget.budgeted')}</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('budget.spent')}</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('budget.committed')}</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('budget.remaining')}</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('budget.percentSpent')}</th>
                  </tr>
                </thead>
                <tbody>
                  {projectBudget.map((budget, index) => {
                    const categoryColor = getCategoryColor(budget.category);
                    const isOverBudget = budget.spent > budget.budgeted * 0.9;

                    return (
                      <motion.tr
                        key={budget.id}
                        className="border-b border-border-default last:border-b-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: categoryColor }}
                            />
                            <span className="font-medium text-text-primary">{budget.category}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-text-primary">
                          {formatCurrency(budget.budgeted)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={isOverBudget ? 'text-error' : 'text-text-primary'}>
                            {formatCurrency(budget.spent)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-text-secondary">
                          {formatCurrency(budget.committed)}
                        </td>
                        <td className="py-3 px-4 text-right text-success">
                          {formatCurrency(budget.remaining)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 bg-background-tertiary rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: isOverBudget ? '#ef4444' : categoryColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(budget.percentSpent, 100)}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <span className={`text-sm ${isOverBudget ? 'text-error' : 'text-text-primary'}`}>
                              {budget.percentSpent.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-background-tertiary">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">{t('budget.total')}</td>
                    <td className="py-3 px-4 text-right font-semibold text-text-primary">
                      {formatCurrency(stats.totalBudget)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-text-primary">
                      {formatCurrency(stats.totalSpent)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-text-secondary">
                      {formatCurrency(stats.totalCommitted)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-success">
                      {formatCurrency(stats.totalRemaining)}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold" style={{ color: CONSTRUCTION_COLOR }}>
                      {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>

        {/* Budget Visual */}
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">{t('budget.budgetDistribution')}</h3>
            <div className="space-y-3">
              {projectBudget.map((budget, index) => {
                const categoryColor = getCategoryColor(budget.category);
                const percent = (budget.budgeted / stats.totalBudget) * 100;

                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-text-primary">{budget.category}</span>
                      <span className="text-sm text-text-muted">{percent.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-background-tertiary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: categoryColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">{t('budget.projectSummary')}</h3>
            {selectedProjectData && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('budget.project')}</span>
                  <span className="text-text-primary font-medium">{selectedProjectData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('budget.completion')}</span>
                  <span className="font-medium" style={{ color: CONSTRUCTION_COLOR }}>{selectedProjectData.completion}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{t('budget.budgetUtilization')}</span>
                  <span className="font-medium text-text-primary">
                    {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="pt-3 border-t border-border-default">
                  {stats.totalSpent / stats.totalBudget > selectedProjectData.completion / 100 ? (
                    <div className="flex items-center gap-2 text-warning">
                      <AlertTriangle size={16} />
                      <span className="text-sm">{t('budget.spendingAhead')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-success">
                      <TrendingUp size={16} />
                      <span className="text-sm">{t('budget.budgetOnTrack')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;
