import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TestTube,
  Search,
  Plus,
  User,
  Clock,
  CheckCircle,
  MoreVertical,
  Droplets,
  Beaker,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { labTests, HEALTHCARE_COLOR, getPatientProfileImage } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const Laboratory = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: labTests.length,
    ordered: labTests.filter(t => t.status === 'ordered').length,
    processing: labTests.filter(t => t.status === 'processing' || t.status === 'sample-collected').length,
    completed: labTests.filter(t => t.status === 'completed').length,
  }), []);

  const filteredTests = useMemo(() => {
    return labTests.filter(test => {
      const matchesSearch = test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.testType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || test.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blood':
        return Droplets;
      case 'urine':
      case 'culture':
        return Beaker;
      default:
        return TestTube;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'blood': '#ef4444',
      'urine': '#f59e0b',
      'stool': '#a855f7',
      'culture': '#10b981',
      'imaging': '#3b82f6',
      'other': '#64748b',
    };
    return colors[category] || HEALTHCARE_COLOR;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'routine': '#10b981',
      'urgent': '#f59e0b',
      'stat': '#ef4444',
    };
    return colors[priority] || HEALTHCARE_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('healthcare.laboratory', 'Laboratory')}
        subtitle="Manage lab orders and test results"
        icon={TestTube}
        actions={
          <Button>
            <Plus size={18} />
            New Lab Order
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tests', value: stats.total, icon: TestTube, color: HEALTHCARE_COLOR },
          { label: 'Ordered', value: stats.ordered, icon: Clock, color: '#f59e0b' },
          { label: 'Processing', value: stats.processing, icon: Beaker, color: '#6366f1' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: '#10b981' },
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
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
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
              placeholder="Search by patient or test type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'ordered', 'sample-collected', 'processing', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'sample-collected' ? 'Collected' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', 'routine', 'urgent', 'stat'].map((priority) => (
              <Button
                key={priority}
                variant={priorityFilter === priority ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setPriorityFilter(priority)}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Lab Tests List */}
      <div className="space-y-4">
        {filteredTests.map((test, index) => {
          const CategoryIcon = getCategoryIcon(test.category);
          const categoryColor = getCategoryColor(test.category);

          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Test Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${categoryColor}20` }}
                    >
                      <CategoryIcon size={24} style={{ color: categoryColor }} />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{test.testType}</p>
                      <div className="flex items-center gap-2 text-sm text-text-muted mt-1">
                        <span
                          className="px-2 py-0.5 rounded text-xs capitalize"
                          style={{
                            backgroundColor: `${categoryColor}20`,
                            color: categoryColor,
                          }}
                        >
                          {test.category}
                        </span>
                        <span>|</span>
                        <span>{test.orderedBy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center gap-2">
                    {getPatientProfileImage(test.patientName) ? (
                      <img
                        src={getPatientProfileImage(test.patientName)}
                        alt={test.patientName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-text-muted" />
                    )}
                    <span className="text-sm text-text-primary">{test.patientName}</span>
                  </div>

                  {/* Dates */}
                  <div className="text-center">
                    <p className="text-sm text-text-primary">
                      {new Date(test.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-muted">Order Date</p>
                  </div>

                  {/* Priority */}
                  <div className="text-center">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium uppercase"
                      style={{
                        backgroundColor: `${getPriorityColor(test.priority)}20`,
                        color: getPriorityColor(test.priority),
                      }}
                    >
                      {test.priority}
                    </span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3">
                    <StatusBadge status={test.status} />
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'collect', label: 'Collect Sample', onClick: () => {} },
                        { id: 'results', label: 'Enter Results', onClick: () => {} },
                        { id: 'print', label: 'Print Report', onClick: () => {} },
                      ]}
                    />
                  </div>
                </div>

                {/* Results */}
                {test.status === 'completed' && test.results && (
                  <div className="mt-4 pt-4 border-t border-border-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary mb-1">Results:</p>
                        <p className="text-sm text-text-secondary">{test.results}</p>
                      </div>
                      {test.normalRange && (
                        <div className="text-right">
                          <p className="text-xs text-text-muted">Normal Range:</p>
                          <p className="text-sm text-text-secondary">{test.normalRange}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <Card className="p-12 text-center">
          <TestTube size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No lab tests found</p>
        </Card>
      )}
    </div>
  );
};

export default Laboratory;
