import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Search,
  Plus,
  User,
  Heart,
  Thermometer,
  Activity,
  FileText,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { consultations, HEALTHCARE_COLOR, getPatientProfileImage } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const Consultations = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: consultations.length,
    inProgress: consultations.filter(c => c.status === 'in-progress').length,
    completed: consultations.filter(c => c.status === 'completed').length,
  }), []);

  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      const matchesSearch = consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('healthcare.consultations', 'Consultations')}
        subtitle="View and manage medical consultations"
        icon={Stethoscope}
        actions={
          <Button>
            <Plus size={18} />
            New Consultation
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Consultations', value: stats.total, icon: Stethoscope, color: HEALTHCARE_COLOR },
          { label: 'In Progress', value: stats.inProgress, icon: Activity, color: '#f59e0b' },
          { label: 'Completed', value: stats.completed, icon: FileText, color: '#10b981' },
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
              placeholder="Search by patient, doctor, or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'in-progress', 'completed'].map((status) => (
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

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation, index) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Patient & Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {getPatientProfileImage(consultation.patientName) ? (
                      <img
                        src={getPatientProfileImage(consultation.patientName)}
                        alt={consultation.patientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                      >
                        <User size={24} style={{ color: HEALTHCARE_COLOR }} />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-text-primary">{consultation.patientName}</p>
                      <p className="text-sm text-text-muted">
                        {consultation.doctorName} | {new Date(consultation.date).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={consultation.status} />
                  </div>

                  {/* Chief Complaint */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-text-primary">Chief Complaint:</p>
                    <p className="text-sm text-text-secondary">{consultation.chiefComplaint}</p>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-text-primary mb-1">Symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {consultation.symptoms.map((symptom, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-background-secondary rounded text-xs text-text-muted"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="p-3 bg-background-secondary rounded-lg">
                    <p className="text-sm font-medium text-text-primary">Diagnosis:</p>
                    <p className="text-sm" style={{ color: HEALTHCARE_COLOR }}>
                      {consultation.diagnosis}
                    </p>
                    <p className="text-xs text-text-muted">ICD Code: {consultation.diagnosisCode}</p>
                  </div>
                </div>

                {/* Vitals */}
                <div className="lg:w-64">
                  <p className="text-sm font-medium text-text-primary mb-3">Vitals</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-background-secondary rounded text-center">
                      <Heart size={16} className="mx-auto text-error mb-1" />
                      <p className="text-sm font-bold text-text-primary">{consultation.vitals.bloodPressure}</p>
                      <p className="text-xs text-text-muted">BP</p>
                    </div>
                    <div className="p-2 bg-background-secondary rounded text-center">
                      <Activity size={16} className="mx-auto text-success mb-1" />
                      <p className="text-sm font-bold text-text-primary">{consultation.vitals.heartRate}</p>
                      <p className="text-xs text-text-muted">HR (bpm)</p>
                    </div>
                    <div className="p-2 bg-background-secondary rounded text-center">
                      <Thermometer size={16} className="mx-auto text-warning mb-1" />
                      <p className="text-sm font-bold text-text-primary">{consultation.vitals.temperature}°C</p>
                      <p className="text-xs text-text-muted">Temp</p>
                    </div>
                    <div className="p-2 bg-background-secondary rounded text-center">
                      <Activity size={16} style={{ color: HEALTHCARE_COLOR }} className="mx-auto mb-1" />
                      <p className="text-sm font-bold text-text-primary">{consultation.vitals.oxygenSaturation}%</p>
                      <p className="text-xs text-text-muted">SpO2</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'view', label: 'View Full Record', onClick: () => {} },
                    { id: 'prescriptions', label: 'View Prescriptions', onClick: () => {} },
                    { id: 'labs', label: 'View Lab Orders', onClick: () => {} },
                    { id: 'print', label: 'Print Summary', onClick: () => {} },
                  ]}
                />
              </div>

              {/* Treatment */}
              <div className="mt-4 pt-4 border-t border-border-default">
                <p className="text-sm font-medium text-text-primary">Treatment Plan:</p>
                <p className="text-sm text-text-secondary">{consultation.treatment}</p>
                {consultation.followUp && (
                  <p className="text-xs text-text-muted mt-2">
                    Follow-up: {new Date(consultation.followUp).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <Card className="p-12 text-center">
          <Stethoscope size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No consultations found</p>
        </Card>
      )}
    </div>
  );
};

export default Consultations;
