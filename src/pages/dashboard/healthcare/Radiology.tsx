import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Scan,
  Search,
  Plus,
  User,
  Clock,
  CheckCircle,
  Image,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { radiologyStudies, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';

export const Radiology = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [studyTypeFilter, setStudyTypeFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: radiologyStudies.length,
    ordered: radiologyStudies.filter(s => s.status === 'ordered' || s.status === 'scheduled').length,
    inProgress: radiologyStudies.filter(s => s.status === 'in-progress').length,
    completed: radiologyStudies.filter(s => s.status === 'completed').length,
  }), []);

  const filteredStudies = useMemo(() => {
    return radiologyStudies.filter(study => {
      const matchesSearch = study.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.bodyPart.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
      const matchesType = studyTypeFilter === 'all' || study.studyType === studyTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, studyTypeFilter]);

  const getStudyTypeColor = (studyType: string) => {
    const colors: Record<string, string> = {
      'x-ray': '#3b82f6',
      'ct-scan': '#8b5cf6',
      'mri': '#06b6d4',
      'ultrasound': '#10b981',
      'mammography': '#ec4899',
      'pet-scan': '#f59e0b',
    };
    return colors[studyType] || HEALTHCARE_COLOR;
  };

  const getStudyTypeLabel = (studyType: string) => {
    const labels: Record<string, string> = {
      'x-ray': 'X-Ray',
      'ct-scan': 'CT Scan',
      'mri': 'MRI',
      'ultrasound': 'Ultrasound',
      'mammography': 'Mammography',
      'pet-scan': 'PET Scan',
    };
    return labels[studyType] || studyType;
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
        title="Radiology"
        subtitle="Manage imaging studies and reports"
        icon={Scan}
        actions={
          <Button>
            <Plus size={18} />
            New Study Order
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Studies', value: stats.total, icon: Scan, color: HEALTHCARE_COLOR },
          { label: 'Ordered/Scheduled', value: stats.ordered, icon: Clock, color: '#f59e0b' },
          { label: 'In Progress', value: stats.inProgress, icon: Image, color: '#6366f1' },
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

      {/* Study Types */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-3">Study Types</h3>
        <div className="flex flex-wrap gap-3">
          {['x-ray', 'ct-scan', 'mri', 'ultrasound', 'mammography', 'pet-scan'].map((type) => {
            const count = radiologyStudies.filter(s => s.studyType === type).length;
            const color = getStudyTypeColor(type);
            return (
              <div
                key={type}
                className="flex items-center gap-2 px-3 py-2 bg-background-secondary rounded-lg cursor-pointer hover:bg-background-tertiary transition-colors"
                onClick={() => setStudyTypeFilter(studyTypeFilter === type ? 'all' : type)}
                style={{
                  borderWidth: 2,
                  borderColor: studyTypeFilter === type ? color : 'transparent',
                }}
              >
                <Scan size={16} style={{ color }} />
                <span className="text-sm text-text-primary">{getStudyTypeLabel(type)}</span>
                <span className="text-xs text-text-muted">({count})</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by patient or body part..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'ordered', 'scheduled', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Studies List */}
      <div className="space-y-4">
        {filteredStudies.map((study, index) => {
          const studyColor = getStudyTypeColor(study.studyType);

          return (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Study Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${studyColor}20` }}
                    >
                      <Scan size={24} style={{ color: studyColor }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">
                          {getStudyTypeLabel(study.studyType)}
                        </p>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: `${studyColor}20`,
                            color: studyColor,
                          }}
                        >
                          {study.bodyPart}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mt-1">
                        Ordered by: {study.orderedBy}
                      </p>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-text-muted" />
                    <span className="text-sm text-text-primary">{study.patientName}</span>
                  </div>

                  {/* Dates */}
                  <div className="text-center">
                    <p className="text-sm text-text-primary">
                      {new Date(study.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-muted">Order Date</p>
                  </div>

                  {study.studyDate && (
                    <div className="text-center">
                      <p className="text-sm text-text-primary">
                        {new Date(study.studyDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-muted">Study Date</p>
                    </div>
                  )}

                  {/* Priority */}
                  <div className="text-center">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium uppercase"
                      style={{
                        backgroundColor: `${getPriorityColor(study.priority)}20`,
                        color: getPriorityColor(study.priority),
                      }}
                    >
                      {study.priority}
                    </span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3">
                    <StatusBadge status={study.status} />
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'images', label: 'View Images', onClick: () => {} },
                        { id: 'report', label: 'Enter Report', onClick: () => {} },
                        { id: 'print', label: 'Print Report', onClick: () => {} },
                      ]}
                    />
                  </div>
                </div>

                {/* Findings & Impression */}
                {study.status === 'completed' && study.findings && (
                  <div className="mt-4 pt-4 border-t border-border-default">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-text-primary mb-1">Findings:</p>
                        <p className="text-sm text-text-secondary">{study.findings}</p>
                      </div>
                      {study.impression && (
                        <div>
                          <p className="text-sm font-medium text-text-primary mb-1">Impression:</p>
                          <p className="text-sm" style={{ color: HEALTHCARE_COLOR }}>
                            {study.impression}
                          </p>
                        </div>
                      )}
                    </div>
                    {study.radiologist && (
                      <p className="text-xs text-text-muted mt-2">
                        Reported by: {study.radiologist}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredStudies.length === 0 && (
        <Card className="p-12 text-center">
          <Scan size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No radiology studies found</p>
        </Card>
      )}
    </div>
  );
};

export default Radiology;
