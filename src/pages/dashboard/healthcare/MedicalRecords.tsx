import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  User,
  Calendar,
  Stethoscope,
  Pill,
  TestTube,
  Scan,
  MoreVertical,
  FolderOpen,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { patients, consultations, prescriptions, labTests, radiologyStudies, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const MedicalRecords = () => {
  const { t } = useTranslation('healthcare');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const patientRecords = useMemo(() => {
    if (!selectedPatient) return null;

    const patient = patients.find(p => p.id === selectedPatient);
    const patientConsultations = consultations.filter(c => c.patientId === selectedPatient);
    const patientPrescriptions = prescriptions.filter(p => p.patientId === selectedPatient);
    const patientLabTests = labTests.filter(l => l.patientId === selectedPatient);
    const patientRadiology = radiologyStudies.filter(r => r.patientId === selectedPatient);

    return {
      patient,
      consultations: patientConsultations,
      prescriptions: patientPrescriptions,
      labTests: patientLabTests,
      radiology: patientRadiology,
    };
  }, [selectedPatient]);

  const stats = useMemo(() => ({
    totalPatients: patients.length,
    totalRecords: consultations.length + prescriptions.length + labTests.length + radiologyStudies.length,
    consultations: consultations.length,
    prescriptions: prescriptions.length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('medicalRecords.title')}
        subtitle={t('medicalRecords.subtitle')}
        icon={FileText}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('medicalRecords.totalPatients'), value: stats.totalPatients, icon: User, color: HEALTHCARE_COLOR },
          { label: t('medicalRecords.totalRecords'), value: stats.totalRecords, icon: FileText, color: '#6366f1' },
          { label: t('medicalRecords.consultations'), value: stats.consultations, icon: Stethoscope, color: '#10b981' },
          { label: t('medicalRecords.prescriptions'), value: stats.prescriptions, icon: Pill, color: '#f59e0b' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder={t('medicalRecords.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          <Card className="p-4 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-text-primary mb-3">{t('medicalRecords.patients')}</h3>
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedPatient === patient.id
                      ? 'bg-[#06b6d4]/20 border border-[#06b6d4]'
                      : 'bg-background-secondary hover:bg-background-tertiary'
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                    >
                      <User size={18} style={{ color: HEALTHCARE_COLOR }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-xs text-text-muted">{patient.patientId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Patient Records */}
        <div className="lg:col-span-2 space-y-4">
          {patientRecords ? (
            <>
              {/* Patient Info */}
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${HEALTHCARE_COLOR}20` }}
                    >
                      <User size={32} style={{ color: HEALTHCARE_COLOR }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary">
                        {patientRecords.patient?.firstName} {patientRecords.patient?.lastName}
                      </h2>
                      <p className="text-sm text-text-muted">{patientRecords.patient?.patientId}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                        <span className="capitalize">{patientRecords.patient?.gender}</span>
                        <span>{t('medicalRecords.bloodLabel')}: {patientRecords.patient?.bloodType}</span>
                        <span>{patientRecords.patient?.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'export', label: t('medicalRecords.exportRecords'), onClick: () => {} },
                      { id: 'print', label: t('medicalRecords.printSummary'), onClick: () => {} },
                      { id: 'share', label: t('medicalRecords.shareRecords'), onClick: () => {} },
                    ]}
                  />
                </div>

                {(patientRecords.patient?.allergies?.length ?? 0) > 0 && (
                  <div className="mt-4 p-3 bg-error/10 rounded-lg">
                    <p className="text-sm font-medium text-error">{t('medicalRecords.allergies')}</p>
                    <p className="text-sm text-error">{patientRecords.patient?.allergies.join(', ')}</p>
                  </div>
                )}

                {(patientRecords.patient?.chronicConditions?.length ?? 0) > 0 && (
                  <div className="mt-2 p-3 bg-warning/10 rounded-lg">
                    <p className="text-sm font-medium text-warning">{t('medicalRecords.chronicConditions')}</p>
                    <p className="text-sm text-warning">{patientRecords.patient?.chronicConditions.join(', ')}</p>
                  </div>
                )}
              </Card>

              {/* Record Sections */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t('medicalRecords.consultations'), count: patientRecords.consultations.length, icon: Stethoscope, color: '#10b981' },
                  { label: t('medicalRecords.prescriptions'), count: patientRecords.prescriptions.length, icon: Pill, color: '#f59e0b' },
                  { label: t('medicalRecords.labTests'), count: patientRecords.labTests.length, icon: TestTube, color: '#6366f1' },
                  { label: t('medicalRecords.radiology'), count: patientRecords.radiology.length, icon: Scan, color: HEALTHCARE_COLOR },
                ].map((section) => {
                  const Icon = section.icon;
                  return (
                    <Card key={section.label} className="p-4 cursor-pointer hover:bg-background-secondary transition-colors">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${section.color}20` }}
                        >
                          <Icon size={20} style={{ color: section.color }} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-text-primary">{section.count}</p>
                          <p className="text-xs text-text-muted">{section.label}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Consultations */}
              {patientRecords.consultations.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold text-text-primary mb-3">{t('medicalRecords.recentConsultations')}</h3>
                  <div className="space-y-3">
                    {patientRecords.consultations.map((consultation) => (
                      <div
                        key={consultation.id}
                        className="p-3 bg-background-secondary rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-text-muted" />
                            <span className="text-sm text-text-primary">
                              {new Date(consultation.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-sm text-text-muted">{consultation.doctorName}</span>
                        </div>
                        <p className="text-sm font-medium text-text-primary">{consultation.diagnosis}</p>
                        <p className="text-xs text-text-muted mt-1">{consultation.chiefComplaint}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Recent Lab Tests */}
              {patientRecords.labTests.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold text-text-primary mb-3">{t('medicalRecords.labTestsSection')}</h3>
                  <div className="space-y-2">
                    {patientRecords.labTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <TestTube size={18} style={{ color: HEALTHCARE_COLOR }} />
                          <div>
                            <p className="text-sm font-medium text-text-primary">{test.testType}</p>
                            <p className="text-xs text-text-muted">
                              {new Date(test.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {test.results && (
                          <span className="text-sm text-text-secondary">{test.results}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <FolderOpen size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary">{t('medicalRecords.selectPatient')}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
