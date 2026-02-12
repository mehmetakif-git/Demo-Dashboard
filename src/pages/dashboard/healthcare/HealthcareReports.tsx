import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Stethoscope,
  TestTube,
  Bed,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PageHeader, Card, Button } from '@/components/common';
import { patients, appointments, consultations, labTests, beds, billings, HEALTHCARE_COLOR } from '@/data/healthcare/healthcareData';
import { useTranslation } from 'react-i18next';

export const HealthcareReports = () => {
  const { t } = useTranslation('healthcare');
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  const stats = useMemo(() => {
    const totalRevenue = billings.reduce((acc, b) => acc + b.total, 0);
    const totalPatients = patients.filter(p => p.status === 'active').length;
    const totalAppointments = appointments.length;
    const avgOccupancy = ((beds.filter(b => b.status === 'occupied').length / beds.length) * 100).toFixed(0);

    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalPatients,
      totalAppointments,
      avgOccupancy,
    };
  }, []);

  // Weekly appointments data
  const weeklyAppointments = [
    { name: 'Mon', appointments: 12, consultations: 10 },
    { name: 'Tue', appointments: 15, consultations: 13 },
    { name: 'Wed', appointments: 18, consultations: 15 },
    { name: 'Thu', appointments: 14, consultations: 12 },
    { name: 'Fri', appointments: 20, consultations: 17 },
    { name: 'Sat', appointments: 8, consultations: 6 },
    { name: 'Sun', appointments: 4, consultations: 3 },
  ];

  // Department distribution
  const departmentData = [
    { name: 'General', value: 35, color: HEALTHCARE_COLOR },
    { name: 'Cardiology', value: 25, color: '#ef4444' },
    { name: 'Pediatrics', value: 20, color: '#10b981' },
    { name: 'Orthopedics', value: 12, color: '#f59e0b' },
    { name: 'Neurology', value: 8, color: '#8b5cf6' },
  ];

  // Appointment types
  const appointmentTypes = [
    { name: 'Consultation', value: appointments.filter(a => a.type === 'consultation').length },
    { name: 'Follow-up', value: appointments.filter(a => a.type === 'follow-up').length },
    { name: 'Check-up', value: appointments.filter(a => a.type === 'check-up').length },
    { name: 'Procedure', value: appointments.filter(a => a.type === 'procedure').length },
    { name: 'Emergency', value: appointments.filter(a => a.type === 'emergency').length },
  ];

  // Lab test categories
  const labCategories = [
    { name: 'Blood', value: labTests.filter(t => t.category === 'blood').length, color: '#ef4444' },
    { name: 'Urine', value: labTests.filter(t => t.category === 'urine').length, color: '#f59e0b' },
    { name: 'Culture', value: labTests.filter(t => t.category === 'culture').length, color: '#10b981' },
    { name: 'Other', value: labTests.filter(t => !['blood', 'urine', 'culture'].includes(t.category)).length, color: '#6366f1' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.title')}
        subtitle={t('reports.subtitle')}
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            {(['today', 'week', 'month'] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Button>
            ))}
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('reports.totalRevenue'), value: `${stats.totalRevenue} QAR`, icon: DollarSign, color: '#10b981', change: '+12.5%' },
          { label: t('reports.activePatients'), value: stats.totalPatients, icon: Users, color: HEALTHCARE_COLOR, change: '+8.2%' },
          { label: t('reports.appointments'), value: stats.totalAppointments, icon: Calendar, color: '#f59e0b', change: '+15.3%' },
          { label: t('reports.bedOccupancy'), value: `${stats.avgOccupancy}%`, icon: Bed, color: '#6366f1', change: '+5.1%' },
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
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-text-muted">{stat.label}</p>
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Chart */}
        <Card className="p-4 lg:col-span-2">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.weeklyAppointmentsConsultations')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAppointments}>
                <defs>
                  <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={HEALTHCARE_COLOR} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={HEALTHCARE_COLOR} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="consultationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke={HEALTHCARE_COLOR}
                  fill="url(#appointmentGradient)"
                  name="Appointments"
                />
                <Area
                  type="monotone"
                  dataKey="consultations"
                  stroke="#10b981"
                  fill="url(#consultationGradient)"
                  name="Consultations"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Distribution */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.departmentDistribution')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Types */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.appointmentTypes')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill={HEALTHCARE_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Lab Test Categories */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">{t('reports.labTestCategories')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={labCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {labCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #1e1e2e',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('reports.consultations'), value: consultations.length, icon: Stethoscope, color: HEALTHCARE_COLOR },
          { label: t('reports.labTests'), value: labTests.length, icon: TestTube, color: '#ef4444' },
          { label: t('reports.avgWaitTime'), value: '15 min', icon: Calendar, color: '#f59e0b' },
          { label: t('reports.patientSatisfaction'), value: '94%', icon: TrendingUp, color: '#10b981' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 text-center">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthcareReports;
