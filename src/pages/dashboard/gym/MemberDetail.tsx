import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  LogIn,
  Pause,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
  User,
  Target,
  AlertTriangle,
  Heart,
  Activity,
  DollarSign,
  FileText,
} from 'lucide-react';
import { Card, Button, Tabs } from '@/components/common';
import {
  gymMembers,
  membershipPlans,
  trainers,
  attendanceRecords,
  ptSessions,
  fitnessAssessments,
  getMemberStatusColor,
  getMemberInitials,
  formatDate,
  formatDateTime,
  formatCurrency,
  getSessionStatusColor,
} from '@/data/gym/gymData';
import { ROUTES } from '@/utils/constants';
import { profileImages } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const MemberDetail = () => {
  const { t: _t } = useTranslation('common');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const member = gymMembers.find((m) => m.id === id);
  const plan = member ? membershipPlans.find((p) => p.id === member.membershipPlanId) : null;
  const trainer = member?.assignedTrainerId
    ? trainers.find((t) => t.id === member.assignedTrainerId)
    : null;

  const memberAttendance = attendanceRecords.filter((r) => r.memberId === id);
  const memberPTSessions = ptSessions.filter((s) => s.memberId === id);
  const memberAssessments = fitnessAssessments.filter((a) => a.memberId === id);

  if (!member) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Member not found</h2>
          <Button onClick={() => navigate(ROUTES.gym.members)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Members
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'membership', label: 'Membership' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'pt-sessions', label: 'PT Sessions' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'payments', label: 'Payments' },
  ];

  // Calculate days remaining
  const endDate = new Date(member.membershipEnd);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(ROUTES.gym.members)}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Members</span>
      </button>

      {/* Header */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {profileImages[`${member.firstName} ${member.lastName}`] ? (
                <img
                  src={profileImages[`${member.firstName} ${member.lastName}`]}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                getMemberInitials(member.firstName, member.lastName)
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-text-primary">
                  {member.firstName} {member.lastName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getMemberStatusColor(
                    member.membershipStatus
                  )}`}
                >
                  {member.membershipStatus.charAt(0).toUpperCase() +
                    member.membershipStatus.slice(1)}
                </span>
              </div>
              <p className="text-text-secondary font-mono">{member.memberId}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${plan?.color}20`,
                    color: plan?.color,
                  }}
                >
                  {member.membershipPlan}
                </span>
                {trainer && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent-primary/10 text-accent-primary">
                    Trainer: {trainer.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => console.log('Edit member')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="text-green-400 border-green-400/50 hover:bg-green-400/10"
              onClick={() => console.log('Check in')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Check In
            </Button>
            {member.membershipStatus === 'active' && (
              <Button
                variant="outline"
                className="text-blue-400 border-blue-400/50 hover:bg-blue-400/10"
                onClick={() => console.log('Freeze')}
              >
                <Pause className="h-4 w-4 mr-2" />
                Freeze
              </Button>
            )}
            {(member.membershipStatus === 'expired' ||
              member.membershipStatus === 'expiring') && (
              <Button onClick={() => console.log('Renew')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="text-text-primary">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p className="text-text-primary">{member.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Date of Birth</p>
                  <p className="text-text-primary">{formatDate(member.dateOfBirth)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-text-muted" />
                <div>
                  <p className="text-sm text-text-secondary">Gender</p>
                  <p className="text-text-primary capitalize">{member.gender}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="h-5 w-5 text-text-muted mt-0.5" />
                <div>
                  <p className="text-sm text-text-secondary">Address</p>
                  <p className="text-text-primary">{member.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm text-text-secondary">Emergency Contact</p>
                  <p className="text-text-primary">
                    {member.emergencyContact.name} ({member.emergencyContact.relationship})
                  </p>
                  <p className="text-text-secondary text-sm">{member.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Member Since</p>
                  <p className="text-text-primary font-semibold">{formatDate(member.joinDate)}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Visits</p>
                  <p className="text-text-primary font-semibold">{member.totalVisits}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Last Visit</p>
                  <p className="text-text-primary font-semibold">
                    {formatDate(member.lastVisit.split(' ')[0])}
                  </p>
                </div>
              </div>
            </Card>
            {member.lockerNumber && (
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#94B4C1]/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-[#94B4C1]" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Locker Number</p>
                    <p className="text-text-primary font-semibold">{member.lockerNumber}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Fitness Goals */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-accent-primary" />
              Fitness Goals
            </h2>
            <div className="flex flex-wrap gap-2">
              {member.goals.map((goal, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-accent-primary/10 text-accent-primary"
                >
                  {goal}
                </span>
              ))}
            </div>
          </Card>

          {/* Health Conditions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Health Conditions
            </h2>
            {member.healthConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {member.healthConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-400"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">No health conditions reported</p>
            )}
          </Card>

          {/* Notes */}
          {member.notes && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-text-muted" />
                Notes
              </h2>
              <p className="text-text-secondary">{member.notes}</p>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'membership' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Current Membership</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Plan</span>
                <span
                  className="px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `${plan?.color}20`,
                    color: plan?.color,
                  }}
                >
                  {member.membershipPlan}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Start Date</span>
                <span className="text-text-primary">{formatDate(member.membershipStart)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">End Date</span>
                <span className="text-text-primary">{formatDate(member.membershipEnd)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Days Remaining</span>
                <span
                  className={`font-semibold ${
                    daysRemaining > 30
                      ? 'text-green-400'
                      : daysRemaining > 7
                      ? 'text-orange-400'
                      : 'text-red-400'
                  }`}
                >
                  {daysRemaining > 0 ? `${daysRemaining} days` : 'Expired'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getMemberStatusColor(
                    member.membershipStatus
                  )}`}
                >
                  {member.membershipStatus.charAt(0).toUpperCase() +
                    member.membershipStatus.slice(1)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Plan Features</h2>
            <ul className="space-y-2">
              {plan?.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan?.restrictions && plan.restrictions.length > 0 && (
              <>
                <h3 className="text-sm font-medium text-text-primary mt-4 mb-2">Restrictions</h3>
                <ul className="space-y-2">
                  {plan.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-center gap-2 text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      {restriction}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'attendance' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Check-ins</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Check In
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Check Out
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {memberAttendance.length > 0 ? (
                  memberAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-white/[0.08]">
                      <td className="py-3 px-4 text-text-primary">
                        {formatDateTime(record.checkIn)}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {record.checkOut ? formatDateTime(record.checkOut) : 'Currently in gym'}
                      </td>
                      <td className="py-3 px-4 text-text-primary font-medium">
                        {record.duration || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-text-secondary">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'pt-sessions' && (
        <div className="space-y-6">
          {trainer && (
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold overflow-hidden">
                  {profileImages[trainer.name] ? (
                    <img
                      src={profileImages[trainer.name]}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    trainer.name.split(' ').map((n) => n[0]).join('')
                  )}
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Assigned Trainer</p>
                  <p className="text-text-primary font-semibold">{trainer.name}</p>
                  <p className="text-sm text-text-secondary">
                    {trainer.specializations.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">PT Sessions</h2>
              <Button size="sm" onClick={() => console.log('Book session')}>
                Book Session
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Trainer
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberPTSessions.length > 0 ? (
                    memberPTSessions.map((session) => (
                      <tr key={session.id} className="border-b border-white/[0.08]">
                        <td className="py-3 px-4 text-text-primary">
                          {formatDate(session.date)}
                        </td>
                        <td className="py-3 px-4 text-text-secondary">
                          {session.startTime} - {session.endTime}
                        </td>
                        <td className="py-3 px-4 text-text-primary">{session.trainerName}</td>
                        <td className="py-3 px-4 text-text-secondary">{session.type}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getSessionStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-text-secondary">
                        No PT sessions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'assessments' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Fitness Assessments</h2>
            <Button size="sm" onClick={() => console.log('Schedule assessment')}>
              Schedule Assessment
            </Button>
          </div>
          {memberAssessments.length > 0 ? (
            <div className="space-y-4">
              {memberAssessments.map((assessment) => (
                <Card key={assessment.id} className="p-4 bg-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-text-primary font-semibold">
                        Assessment on {formatDate(assessment.assessmentDate)}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Assessed by {assessment.assessedBy}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Weight</p>
                      <p className="text-text-primary font-semibold">
                        {assessment.metrics.weight} lbs
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Body Fat</p>
                      <p className="text-text-primary font-semibold">
                        {assessment.metrics.bodyFat}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">BMI</p>
                      <p className="text-text-primary font-semibold">{assessment.metrics.bmi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Resting HR</p>
                      <p className="text-text-primary font-semibold">
                        {assessment.metrics.restingHeartRate} bpm
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary py-8">No assessments found</p>
          )}
        </Card>
      )}

      {activeTab === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Balance Due</p>
                <p
                  className={`text-2xl font-bold ${
                    member.balance > 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {formatCurrency(member.balance)}
                </p>
              </div>
            </div>
            {member.balance > 0 && (
              <Button className="w-full" onClick={() => console.log('Add payment')}>
                Add Payment
              </Button>
            )}
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Payment History</h2>
            <p className="text-center text-text-secondary py-8">
              Payment history will be displayed here
            </p>
          </Card>
        </div>
      )}
    </motion.div>
  );
};
