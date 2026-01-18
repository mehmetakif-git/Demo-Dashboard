import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Heart,
  AlertCircle,
  MoreVertical,
  User,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { patients, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';

export const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    male: patients.filter(p => p.gender === 'male').length,
    female: patients.filter(p => p.gender === 'female').length,
  }), []);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [searchQuery, statusFilter, genderFilter]);

  const getBloodTypeColor = (bloodType: string) => {
    const colors: Record<string, string> = {
      'A+': '#ef4444',
      'A-': '#f97316',
      'B+': '#3b82f6',
      'B-': '#6366f1',
      'AB+': '#8b5cf6',
      'AB-': '#a855f7',
      'O+': '#10b981',
      'O-': '#14b8a6',
    };
    return colors[bloodType] || HEALTHCARE_COLOR;
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle="Manage patient records and information"
        icon={Users}
        actions={
          <Button>
            <Plus size={18} />
            Add Patient
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: stats.total, icon: Users, color: HEALTHCARE_COLOR },
          { label: 'Active', value: stats.active, icon: Heart, color: '#10b981' },
          { label: 'Male', value: stats.male, icon: User, color: '#3b82f6' },
          { label: 'Female', value: stats.female, icon: User, color: '#ec4899' },
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
              placeholder="Search by name, ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
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
          <div className="flex gap-2">
            {['all', 'male', 'female'].map((gender) => (
              <Button
                key={gender}
                variant={genderFilter === gender ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setGenderFilter(gender)}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Patient Info */}
                <div className="flex items-center gap-4 flex-1">
                  {patient.profileImage ? (
                    <img
                      src={patient.profileImage}
                      alt={`${patient.firstName} ${patient.lastName}`}
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
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-text-primary">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <span className="text-xs px-2 py-0.5 bg-background-secondary rounded text-text-muted">
                        {patient.patientId}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted mt-1">
                      <span className="flex items-center gap-1">
                        <Phone size={12} />
                        {patient.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {patient.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">{calculateAge(patient.dateOfBirth)} yrs</p>
                    <p className="text-xs text-text-muted">Age</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium capitalize text-text-primary">{patient.gender}</p>
                    <p className="text-xs text-text-muted">Gender</p>
                  </div>
                  <div className="text-center">
                    <span
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${getBloodTypeColor(patient.bloodType)}20`,
                        color: getBloodTypeColor(patient.bloodType),
                      }}
                    >
                      {patient.bloodType}
                    </span>
                    <p className="text-xs text-text-muted mt-1">Blood</p>
                  </div>
                  {patient.lastVisit && (
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-text-primary">
                        <Calendar size={14} />
                        <span className="text-sm">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">Last Visit</p>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={patient.status} />
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: 'View Details', onClick: () => {} },
                      { id: 'edit', label: 'Edit Patient', onClick: () => {} },
                      { id: 'appointment', label: 'Book Appointment', onClick: () => {} },
                      { id: 'history', label: 'Medical History', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Allergies & Conditions */}
              {(patient.allergies.length > 0 || patient.chronicConditions.length > 0) && (
                <div className="mt-3 pt-3 border-t border-border-default flex flex-wrap gap-4">
                  {patient.allergies.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} className="text-error" />
                      <span className="text-xs text-error">
                        Allergies: {patient.allergies.join(', ')}
                      </span>
                    </div>
                  )}
                  {patient.chronicConditions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Heart size={14} className="text-warning" />
                      <span className="text-xs text-warning">
                        Conditions: {patient.chronicConditions.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No patients found</p>
        </Card>
      )}
    </div>
  );
};

export default Patients;
