import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Building2,
  Briefcase,
  Users,
  Edit,
  UserPlus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  jobOrders,
  candidates,
  formatSalaryRange,
  getJobStatusBgColor,
  getJobUrgencyBgColor,
  getCandidateStatusBgColor,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';

type TabType = 'overview' | 'candidates' | 'activity';

export const JobOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const job = jobOrders.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">Job order not found</h3>
          <p className="text-text-secondary mb-4">The job order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(ROUTES.staffing.jobs)}>Back to Job Orders</Button>
        </Card>
      </div>
    );
  }

  // Get candidates who applied to this job
  const appliedCandidates = candidates.filter((c) => c.appliedJobs.includes(job.id));

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'candidates', label: 'Candidates', count: appliedCandidates.length },
    { id: 'activity', label: 'Activity' },
  ];

  const fillPercentage = job.openings > 0 ? Math.round((job.filled / job.openings) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={job.title}
        subtitle={`${job.clientName} • ${job.department}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(ROUTES.staffing.jobs)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" onClick={() => console.log('Submit candidate')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Submit Candidate
            </Button>
            <Button onClick={() => console.log('Edit job')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        }
      />

      {/* Job Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobStatusBgColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('-', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobUrgencyBgColor(job.urgency)}`}>
                {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)} Priority
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/[0.05] text-text-primary capitalize">
                {job.employmentType.replace('-', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-text-muted">Client</p>
                  <p className="text-text-primary font-medium">{job.clientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-text-muted">Location</p>
                  <p className="text-text-primary font-medium">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-text-muted">Salary Range</p>
                  <p className="text-text-primary font-medium">{formatSalaryRange(job.salaryRange)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-text-muted">Remote</p>
                  <p className="text-text-primary font-medium capitalize">{job.remote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Stats */}
          <div className="md:w-64">
            <div className="bg-white/[0.05] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary text-sm">Pipeline Progress</span>
                <span className="text-text-primary font-medium text-sm">
                  {job.filled}/{job.openings}
                </span>
              </div>
              <div className="w-full h-3 bg-white/[0.03] backdrop-blur-xl rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="bg-white/[0.03] backdrop-blur-xl rounded p-2">
                  <p className="text-text-primary font-bold text-lg">{job.applicants}</p>
                  <p className="text-text-muted">Applicants</p>
                </div>
                <div className="bg-white/[0.03] backdrop-blur-xl rounded p-2">
                  <p className="text-text-primary font-bold text-lg">{job.submissions}</p>
                  <p className="text-text-muted">Submissions</p>
                </div>
                <div className="bg-white/[0.03] backdrop-blur-xl rounded p-2">
                  <p className="text-text-primary font-bold text-lg">{job.interviews}</p>
                  <p className="text-text-muted">Interviews</p>
                </div>
                <div className="bg-white/[0.03] backdrop-blur-xl rounded p-2">
                  <p className="text-text-primary font-bold text-lg">{job.filled}</p>
                  <p className="text-text-muted">Filled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.08]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-accent-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/[0.05]">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="jobTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Description</h3>
              <p className="text-text-secondary">{job.description}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm bg-accent-primary/10 text-accent-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {job.notes && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notes</h3>
                <p className="text-text-secondary">{job.notes}</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted">Assigned Recruiter</p>
                  <p className="text-text-primary font-medium">{job.assignedRecruiter}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Openings</p>
                  <p className="text-text-primary font-medium">{job.openings}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Created</p>
                  <p className="text-text-primary font-medium">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {job.deadline && (
                  <div>
                    <p className="text-sm text-text-muted">Deadline</p>
                    <p className="text-text-primary font-medium">
                      {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Client Info</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                  {job.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{job.clientName}</p>
                  <p className="text-sm text-text-secondary">{job.department}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const client = job.clientId;
                  navigate(ROUTES.staffing.clientDetail.replace(':id', client));
                }}
              >
                View Client
              </Button>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'candidates' && (
        <Card className="overflow-hidden">
          {appliedCandidates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Candidate
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Experience
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appliedCandidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                            {candidate.firstName[0]}
                            {candidate.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {candidate.firstName} {candidate.lastName}
                            </p>
                            <p className="text-sm text-text-secondary">{candidate.currentTitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getCandidateStatusBgColor(
                            candidate.status
                          )}`}
                        >
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{candidate.experience} years</td>
                      <td className="py-3 px-4 text-text-secondary">{candidate.location}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(ROUTES.staffing.candidateDetail.replace(':id', candidate.id))
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No candidates yet</h3>
              <p className="text-text-secondary mb-4">
                No candidates have been submitted for this position.
              </p>
              <Button onClick={() => console.log('Submit candidate')}>
                <UserPlus className="h-4 w-4 mr-2" />
                Submit Candidate
              </Button>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'activity' && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-text-primary">Job order created</p>
                <p className="text-sm text-text-secondary">
                  {new Date(job.createdAt).toLocaleDateString()} by {job.assignedRecruiter}
                </p>
              </div>
            </div>
            {job.status === 'filled' && (
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#94B4C1]/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-[#94B4C1]" />
                </div>
                <div>
                  <p className="text-text-primary">Position filled</p>
                  <p className="text-sm text-text-secondary">
                    All openings have been filled
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </motion.div>
  );
};
