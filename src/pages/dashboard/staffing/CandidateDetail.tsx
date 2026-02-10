import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  FileText,
  Star,
  Edit,
  Download,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  candidates,
  jobOrders,
  formatSalaryRange,
  getCandidateStatusBgColor,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

type TabType = 'overview' | 'applications' | 'interviews' | 'documents' | 'notes';

export const CandidateDetail = () => {
  const { t: _t } = useTranslation('common');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">Candidate not found</h3>
          <p className="text-text-secondary mb-4">The candidate you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(ROUTES.staffing.candidates)}>Back to Candidates</Button>
        </Card>
      </div>
    );
  }

  const appliedJobs = jobOrders.filter((job) => candidate.appliedJobs.includes(job.id));

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'applications', label: 'Applications', count: candidate.appliedJobs.length },
    { id: 'interviews', label: 'Interviews', count: candidate.interviewHistory.length },
    { id: 'documents', label: 'Documents', count: candidate.documents.length },
    { id: 'notes', label: 'Notes' },
  ];

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={`${candidate.firstName} ${candidate.lastName}`}
        subtitle={candidate.currentTitle}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(ROUTES.staffing.candidates)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={() => console.log('Edit candidate')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        }
      />

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-4">
            {getProfileImage(`${candidate.firstName} ${candidate.lastName}`) ? (
              <img
                src={getProfileImage(`${candidate.firstName} ${candidate.lastName}`)}
                alt={`${candidate.firstName} ${candidate.lastName}`}
                className="w-20 h-20 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-2xl font-bold">
                {candidate.firstName[0]}
                {candidate.lastName[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-text-primary">
                  {candidate.firstName} {candidate.lastName}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getCandidateStatusBgColor(
                    candidate.status
                  )}`}
                >
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              </div>
              <p className="text-text-secondary">{candidate.currentTitle}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <a
                  href={`mailto:${candidate.email}`}
                  className="flex items-center gap-1 text-text-secondary hover:text-accent-primary"
                >
                  <Mail className="h-4 w-4" />
                  {candidate.email}
                </a>
                <a
                  href={`tel:${candidate.phone}`}
                  className="flex items-center gap-1 text-text-secondary hover:text-accent-primary"
                >
                  <Phone className="h-4 w-4" />
                  {candidate.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-wrap gap-4 md:justify-end">
            <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${candidate.email}`)}>
              <Send className="h-4 w-4 mr-1" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log('Submit to job')}>
              <Briefcase className="h-4 w-4 mr-1" />
              Submit to Job
            </Button>
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
                layoutId="candidateTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm bg-accent-primary/10 text-accent-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Notes</h3>
              <p className="text-text-secondary">{candidate.notes || 'No notes available.'}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Location</p>
                    <p className="text-text-primary">{candidate.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Experience</p>
                    <p className="text-text-primary">{candidate.experience} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Desired Salary</p>
                    <p className="text-text-primary">{formatSalaryRange(candidate.desiredSalary)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Availability</p>
                    <p className="text-text-primary capitalize">
                      {candidate.availability.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Willing to Relocate</p>
                    <p className="text-text-primary">{candidate.willingToRelocate ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm text-text-secondary">Source</p>
                    <p className="text-text-primary capitalize">{candidate.source.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-text-secondary">Added:</span>
                  <span className="text-text-primary">
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-text-secondary">Updated:</span>
                  <span className="text-text-primary">
                    {new Date(candidate.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <Card className="overflow-hidden">
          {appliedJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Job Title
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Salary Range
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job) => (
                    <tr key={job.id} className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-text-primary">{job.title}</p>
                        <p className="text-sm text-text-secondary">{job.location}</p>
                      </td>
                      <td className="py-3 px-4 text-text-primary">{job.clientName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {formatSalaryRange(job.salaryRange)}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(ROUTES.staffing.jobDetail.replace(':id', job.id))
                          }
                        >
                          View Job
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No applications</h3>
              <p className="text-text-secondary">This candidate hasn't been submitted to any jobs yet.</p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'interviews' && (
        <Card className="overflow-hidden">
          {candidate.interviewHistory.length > 0 ? (
            <div className="divide-y divide-border-default">
              {candidate.interviewHistory.map((interview, index) => {
                const job = jobOrders.find((j) => j.id === interview.jobOrderId);
                return (
                  <div key={index} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-text-primary">{job?.title || 'Unknown Job'}</h4>
                        <p className="text-sm text-text-secondary">{job?.clientName || 'Unknown Client'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getOutcomeIcon(interview.outcome)}
                        <span className="text-sm text-text-primary capitalize">{interview.outcome}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-text-muted">Date</p>
                        <p className="text-text-primary">
                          {new Date(interview.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted">Type</p>
                        <p className="text-text-primary capitalize">{interview.type}</p>
                      </div>
                      <div>
                        <p className="text-text-muted">Interviewer</p>
                        <p className="text-text-primary">{interview.interviewer}</p>
                      </div>
                      <div>
                        <p className="text-text-muted">Rating</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < interview.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/[0.05] rounded-lg p-3">
                      <p className="text-sm text-text-muted mb-1">Feedback</p>
                      <p className="text-text-secondary">{interview.feedback}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No interviews</h3>
              <p className="text-text-secondary">This candidate hasn't had any interviews yet.</p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card className="overflow-hidden">
          {candidate.documents.length > 0 ? (
            <div className="divide-y divide-border-default">
              {candidate.documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-white/[0.03] backdrop-blur-xl/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{doc.name}</p>
                      <p className="text-sm text-text-secondary capitalize">
                        {doc.type.replace('-', ' ')} • Uploaded{' '}
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No documents</h3>
              <p className="text-text-secondary">No documents have been uploaded for this candidate.</p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'notes' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Notes</h3>
            <Button variant="outline" size="sm" onClick={() => console.log('Add note')}>
              Add Note
            </Button>
          </div>
          <div className="bg-white/[0.05] rounded-lg p-4">
            <p className="text-text-secondary">{candidate.notes || 'No notes available for this candidate.'}</p>
          </div>
        </Card>
      )}
    </motion.div>
  );
};
