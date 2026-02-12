import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Pill,
  Search,
  Plus,
  User,
  Stethoscope,
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { prescriptions, HEALTHCARE_COLOR, getPatientProfileImage } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const Prescriptions = () => {
  const { t } = useTranslation('healthcare');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: prescriptions.length,
    active: prescriptions.filter(p => p.status === 'active').length,
    completed: prescriptions.filter(p => p.status === 'completed').length,
    dispensed: prescriptions.filter(p => p.dispensedDate).length,
  }), []);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(prescription => {
      const matchesSearch = prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.medications.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('prescriptions.title')}
        subtitle={t('prescriptions.subtitle')}
        icon={Pill}
        actions={
          <Button>
            <Plus size={18} />
            {t('prescriptions.newPrescription')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('prescriptions.totalPrescriptions'), value: stats.total, icon: Pill, color: HEALTHCARE_COLOR },
          { label: t('prescriptions.active'), value: stats.active, icon: Clock, color: '#f59e0b' },
          { label: t('prescriptions.completed'), value: stats.completed, icon: CheckCircle, color: '#10b981' },
          { label: t('prescriptions.dispensed'), value: stats.dispensed, icon: Pill, color: '#6366f1' },
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
              placeholder={t('prescriptions.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'completed', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription, index) => (
          <motion.div
            key={prescription.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Patient & Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {getPatientProfileImage(prescription.patientName) ? (
                      <img
                        src={getPatientProfileImage(prescription.patientName)}
                        alt={prescription.patientName}
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{prescription.patientName}</p>
                        <StatusBadge status={prescription.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                        <span className="flex items-center gap-1">
                          <Stethoscope size={14} />
                          {prescription.doctorName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(prescription.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('prescriptions.viewDetails'), onClick: () => {} },
                        { id: 'print', label: t('prescriptions.printPrescription'), onClick: () => {} },
                        { id: 'refill', label: t('prescriptions.requestRefill'), onClick: () => {} },
                        { id: 'cancel', label: t('prescriptions.cancel'), onClick: () => {} },
                      ]}
                    />
                  </div>

                  {/* Medications */}
                  <div className="space-y-3">
                    {prescription.medications.map((med, i) => (
                      <div
                        key={i}
                        className="p-3 bg-background-secondary rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-text-primary">{med.name}</p>
                            <p className="text-sm text-text-muted">{med.dosage}</p>
                          </div>
                          <span
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: `${HEALTHCARE_COLOR}20`,
                              color: HEALTHCARE_COLOR,
                            }}
                          >
                            {med.duration}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-text-muted">{t('prescriptions.frequency')}</span>
                            <span className="text-text-secondary">{med.frequency}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">{t('prescriptions.instructions')}</span>
                            <span className="text-text-secondary">{med.instructions}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dispensed Info */}
              {prescription.dispensedDate && (
                <div className="mt-4 pt-4 border-t border-border-default">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-success">
                      {t('prescriptions.dispensedOn')} {new Date(prescription.dispensedDate).toLocaleDateString()}
                      {prescription.dispensedBy && ` ${t('prescriptions.by')} ${prescription.dispensedBy}`}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <Card className="p-12 text-center">
          <Pill size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('prescriptions.noPrescriptions')}</p>
        </Card>
      )}
    </div>
  );
};

export default Prescriptions;
