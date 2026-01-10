import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Scale,
  Heart,
  Ruler,
  Target,
  Award,
  ChevronRight,
  X,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  fitnessAssessments,
  gymMembers,
  trainers,
  formatDate,
  type FitnessAssessment,
} from '@/data/gym/gymData';

export const Assessments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [memberFilter, setMemberFilter] = useState('all');
  const [selectedAssessment, setSelectedAssessment] = useState<FitnessAssessment | null>(null);
  const [isNewAssessmentOpen, setIsNewAssessmentOpen] = useState(false);

  // New assessment form state
  const [assessmentForm, setAssessmentForm] = useState({
    memberId: '',
    trainerId: '',
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFatPercentage: '',
    muscleMass: '',
    bmi: '',
    restingHeartRate: '',
    bloodPressure: '',
    vo2Max: '',
    flexibility: '',
    pushUps: '',
    sitUps: '',
    plankTime: '',
    notes: '',
    goals: '',
  });

  const stats = useMemo(() => ({
    total: fitnessAssessments.length,
    thisMonth: fitnessAssessments.filter(a => {
      const assessmentDate = new Date(a.date);
      const now = new Date();
      return assessmentDate.getMonth() === now.getMonth() && assessmentDate.getFullYear() === now.getFullYear();
    }).length,
    improved: fitnessAssessments.filter(a =>
      Object.values(a.comparison || {}).some(c => c.trend === 'improved')
    ).length,
    needsAttention: fitnessAssessments.filter(a =>
      Object.values(a.comparison || {}).some(c => c.trend === 'declined')
    ).length,
  }), []);

  const filteredAssessments = useMemo(() => {
    let filtered = [...fitnessAssessments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        a.memberName.toLowerCase().includes(query)
      );
    }

    if (memberFilter !== 'all') {
      filtered = filtered.filter(a => a.memberId === memberFilter);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, memberFilter]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'improved') return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (trend === 'declined') return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Activity className="h-4 w-4 text-text-muted" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'improved') return 'text-green-400';
    if (trend === 'declined') return 'text-red-400';
    return 'text-text-muted';
  };

  const handleCreateAssessment = () => {
    console.log('Creating assessment:', assessmentForm);
    setIsNewAssessmentOpen(false);
    setAssessmentForm({
      memberId: '',
      trainerId: '',
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFatPercentage: '',
      muscleMass: '',
      bmi: '',
      restingHeartRate: '',
      bloodPressure: '',
      vo2Max: '',
      flexibility: '',
      pushUps: '',
      sitUps: '',
      plankTime: '',
      notes: '',
      goals: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Fitness Assessments"
        subtitle="Track member fitness progress and metrics"
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsNewAssessmentOpen(true)}>
            New Assessment
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Assessments"
          value={stats.total.toString()}
          icon={ClipboardList}
          iconColor="#547792"
        />
        <StatsCard
          title="This Month"
          value={stats.thisMonth.toString()}
          icon={Calendar}
          iconColor="#94B4C1"
        />
        <StatsCard
          title="Showing Improvement"
          value={stats.improved.toString()}
          icon={TrendingUp}
          iconColor="#10b981"
        />
        <StatsCard
          title="Needs Attention"
          value={stats.needsAttention.toString()}
          icon={TrendingDown}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-64">
            <Input
              placeholder="Search member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Members</option>
            {gymMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Assessments List */}
      <div className="grid gap-4">
        {filteredAssessments.map((assessment) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 hover:border-white/[0.12] transition-colors cursor-pointer" onClick={() => setSelectedAssessment(assessment)}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium">
                    {assessment.memberName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{assessment.memberName}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(assessment.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {assessment.assessedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-text-muted" />
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Scale className="h-4 w-4" />
                    <span className="text-xs">Weight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-text-primary">{assessment.metrics.weight} kg</span>
                    {assessment.comparison?.weight && (
                      <span className={`text-xs ${getTrendColor(assessment.comparison.weight.trend)}`}>
                        {assessment.comparison.weight.change > 0 ? '+' : ''}{assessment.comparison.weight.change}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Activity className="h-4 w-4" />
                    <span className="text-xs">Body Fat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-text-primary">{assessment.metrics.bodyFatPercentage}%</span>
                    {assessment.comparison?.bodyFat && getTrendIcon(assessment.comparison.bodyFat.trend)}
                  </div>
                </div>

                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-xs">BMI</span>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{assessment.metrics.bmi}</span>
                </div>

                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Resting HR</span>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{assessment.metrics.restingHeartRate} bpm</span>
                </div>

                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Ruler className="h-4 w-4" />
                    <span className="text-xs">Muscle Mass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-text-primary">{assessment.metrics.muscleMass} kg</span>
                    {assessment.comparison?.muscleMass && getTrendIcon(assessment.comparison.muscleMass.trend)}
                  </div>
                </div>

                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Award className="h-4 w-4" />
                    <span className="text-xs">VO2 Max</span>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{assessment.metrics.vo2Max}</span>
                </div>
              </div>

              {/* Goals */}
              {assessment.goals && assessment.goals.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/[0.08]">
                  <p className="text-xs text-text-muted mb-2">Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {assessment.goals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-xs rounded-full"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}

        {filteredAssessments.length === 0 && (
          <Card className="p-12 text-center">
            <ClipboardList className="h-12 w-12 mx-auto mb-4 text-text-muted" />
            <p className="text-text-secondary">No assessments found</p>
          </Card>
        )}
      </div>

      {/* Assessment Detail Modal */}
      {selectedAssessment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAssessment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium">
                    {selectedAssessment.memberName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{selectedAssessment.memberName}</h3>
                    <p className="text-sm text-text-secondary">
                      Assessment on {formatDate(selectedAssessment.date)} by {selectedAssessment.assessedBy}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              {/* Body Metrics */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Body Composition</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Weight</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.weight} <span className="text-sm font-normal">kg</span></p>
                    {selectedAssessment.comparison?.weight && (
                      <div className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(selectedAssessment.comparison.weight.trend)}`}>
                        {getTrendIcon(selectedAssessment.comparison.weight.trend)}
                        <span>{selectedAssessment.comparison.weight.change > 0 ? '+' : ''}{selectedAssessment.comparison.weight.change} kg</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Body Fat</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.bodyFatPercentage}<span className="text-sm font-normal">%</span></p>
                    {selectedAssessment.comparison?.bodyFat && (
                      <div className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(selectedAssessment.comparison.bodyFat.trend)}`}>
                        {getTrendIcon(selectedAssessment.comparison.bodyFat.trend)}
                        <span>{selectedAssessment.comparison.bodyFat.change > 0 ? '+' : ''}{selectedAssessment.comparison.bodyFat.change}%</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Muscle Mass</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.muscleMass} <span className="text-sm font-normal">kg</span></p>
                    {selectedAssessment.comparison?.muscleMass && (
                      <div className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(selectedAssessment.comparison.muscleMass.trend)}`}>
                        {getTrendIcon(selectedAssessment.comparison.muscleMass.trend)}
                        <span>{selectedAssessment.comparison.muscleMass.change > 0 ? '+' : ''}{selectedAssessment.comparison.muscleMass.change} kg</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">BMI</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.bmi}</p>
                  </div>
                </div>
              </div>

              {/* Cardiovascular */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Cardiovascular Health</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Resting Heart Rate</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.restingHeartRate} <span className="text-sm font-normal">bpm</span></p>
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Blood Pressure</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.bloodPressure}</p>
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">VO2 Max</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.vo2Max} <span className="text-sm font-normal">ml/kg/min</span></p>
                  </div>
                </div>
              </div>

              {/* Fitness Tests */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Fitness Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Flexibility</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.flexibility} <span className="text-sm font-normal">cm</span></p>
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Push-ups (1 min)</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.pushUps}</p>
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Sit-ups (1 min)</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.sitUps}</p>
                  </div>
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Plank Time</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedAssessment.metrics.plankTime} <span className="text-sm font-normal">sec</span></p>
                  </div>
                </div>
              </div>

              {/* Goals & Notes */}
              <div className="grid md:grid-cols-2 gap-4">
                {selectedAssessment.goals && selectedAssessment.goals.length > 0 && (
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">Goals</h4>
                    <ul className="space-y-2">
                      {selectedAssessment.goals.map((goal, index) => (
                        <li key={index} className="flex items-center gap-2 text-text-secondary">
                          <Target className="h-4 w-4 text-accent-primary" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedAssessment.notes && (
                  <div className="p-4 bg-white/[0.05] rounded-lg">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">Notes</h4>
                    <p className="text-text-secondary text-sm">{selectedAssessment.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                <Button variant="outline" onClick={() => setSelectedAssessment(null)}>
                  Close
                </Button>
                <Button>
                  Download PDF
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* New Assessment Modal */}
      {isNewAssessmentOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsNewAssessmentOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">New Fitness Assessment</h3>
                <button
                  onClick={() => setIsNewAssessmentOpen(false)}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Member</label>
                    <select
                      value={assessmentForm.memberId}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, memberId: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      <option value="">Select member...</option>
                      {gymMembers.filter(m => m.membershipStatus === 'active').map(member => (
                        <option key={member.id} value={member.id}>
                          {member.firstName} {member.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Assessed By</label>
                    <select
                      value={assessmentForm.trainerId}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, trainerId: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      <option value="">Select trainer...</option>
                      {trainers.map(trainer => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.firstName} {trainer.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Date</label>
                    <input
                      type="date"
                      value={assessmentForm.date}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                </div>

                {/* Body Composition */}
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Body Composition</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      label="Weight (kg)"
                      type="number"
                      value={assessmentForm.weight}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, weight: e.target.value })}
                      placeholder="75"
                    />
                    <Input
                      label="Body Fat %"
                      type="number"
                      value={assessmentForm.bodyFatPercentage}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, bodyFatPercentage: e.target.value })}
                      placeholder="20"
                    />
                    <Input
                      label="Muscle Mass (kg)"
                      type="number"
                      value={assessmentForm.muscleMass}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, muscleMass: e.target.value })}
                      placeholder="35"
                    />
                    <Input
                      label="BMI"
                      type="number"
                      value={assessmentForm.bmi}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, bmi: e.target.value })}
                      placeholder="24.5"
                    />
                  </div>
                </div>

                {/* Cardiovascular */}
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Cardiovascular</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Input
                      label="Resting Heart Rate (bpm)"
                      type="number"
                      value={assessmentForm.restingHeartRate}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, restingHeartRate: e.target.value })}
                      placeholder="68"
                    />
                    <Input
                      label="Blood Pressure"
                      value={assessmentForm.bloodPressure}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, bloodPressure: e.target.value })}
                      placeholder="120/80"
                    />
                    <Input
                      label="VO2 Max"
                      type="number"
                      value={assessmentForm.vo2Max}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, vo2Max: e.target.value })}
                      placeholder="42"
                    />
                  </div>
                </div>

                {/* Fitness Tests */}
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Fitness Tests</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      label="Flexibility (cm)"
                      type="number"
                      value={assessmentForm.flexibility}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, flexibility: e.target.value })}
                      placeholder="15"
                    />
                    <Input
                      label="Push-ups (1 min)"
                      type="number"
                      value={assessmentForm.pushUps}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, pushUps: e.target.value })}
                      placeholder="30"
                    />
                    <Input
                      label="Sit-ups (1 min)"
                      type="number"
                      value={assessmentForm.sitUps}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, sitUps: e.target.value })}
                      placeholder="35"
                    />
                    <Input
                      label="Plank Time (sec)"
                      type="number"
                      value={assessmentForm.plankTime}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, plankTime: e.target.value })}
                      placeholder="90"
                    />
                  </div>
                </div>

                {/* Notes & Goals */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Goals</label>
                    <textarea
                      value={assessmentForm.goals}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, goals: e.target.value })}
                      placeholder="Enter goals, one per line..."
                      rows={3}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Notes</label>
                    <textarea
                      value={assessmentForm.notes}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, notes: e.target.value })}
                      placeholder="Additional observations..."
                      rows={3}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                <Button variant="outline" onClick={() => setIsNewAssessmentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateAssessment}
                  disabled={!assessmentForm.memberId || !assessmentForm.trainerId}
                >
                  Save Assessment
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
