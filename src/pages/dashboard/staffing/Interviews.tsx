import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  Users,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  interviews,
  getInterviewStatusBgColor,
  type Interview,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Interviews = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  // Filter interviews
  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const matchesSearch =
        searchQuery === '' ||
        interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
      const matchesType = typeFilter === 'all' || interview.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  // Calculate stats
  const scheduledCount = interviews.filter((i) => i.status === 'scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'completed').length;
  const upcomingToday = interviews.filter((i) => {
    const interviewDate = new Date(i.scheduledAt).toDateString();
    const today = new Date().toDateString();
    return i.status === 'scheduled' && interviewDate === today;
  }).length;

  const stats = [
    {
      title: 'Scheduled',
      value: scheduledCount.toString(),
      icon: Calendar,
      iconColor: '#3b82f6',
    },
    {
      title: 'Today',
      value: upcomingToday.toString(),
      icon: Clock,
      iconColor: '#f59e0b',
    },
    {
      title: 'Completed',
      value: completedCount.toString(),
      icon: CheckCircle,
      iconColor: '#10b981',
    },
    {
      title: 'Total',
      value: interviews.length.toString(),
      icon: Users,
      iconColor: '#94B4C1',
    },
  ];

  const getTypeIcon = (type: Interview['type']) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      case 'technical':
        return <Calendar className="h-4 w-4" />;
      case 'panel':
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getOutcomeIcon = (outcome?: string) => {
    switch (outcome) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('staffing.interviews', 'Interviews')}
        subtitle="Schedule and manage candidate interviews"
        actions={
          <Button onClick={() => console.log('Schedule interview')}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
            <option value="rescheduled">Rescheduled</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Types</option>
            <option value="phone">Phone</option>
            <option value="video">Video</option>
            <option value="in-person">In-Person</option>
            <option value="technical">Technical</option>
            <option value="panel">Panel</option>
          </select>
        </div>
      </Card>

      {/* Interviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInterviews.map((interview) => {
          const { date, time } = formatDateTime(interview.scheduledAt);
          return (
            <Card key={interview.id} className="p-6 hover:border-accent-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {getProfileImage(interview.candidateName) ? (
                    <img
                      src={getProfileImage(interview.candidateName)}
                      alt={interview.candidateName}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                      {interview.candidateName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-text-primary">{interview.candidateName}</h3>
                    <p className="text-sm text-text-secondary">{interview.jobTitle}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getInterviewStatusBgColor(
                    interview.status
                  )}`}
                >
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-text-muted" />
                  <span className="text-text-secondary">{interview.clientName}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-text-muted" />
                    <span className="text-text-primary">{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-text-muted" />
                    <span className="text-text-primary">{time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {getTypeIcon(interview.type)}
                  <span className="text-text-secondary capitalize">{interview.type} Interview</span>
                  <span className="text-text-muted">• {interview.duration} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-text-secondary">{interview.interviewers.join(', ')}</span>
                </div>
              </div>

              {interview.outcome && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-white/[0.05] rounded-lg">
                  {getOutcomeIcon(interview.outcome)}
                  <span className="text-sm text-text-primary capitalize">{interview.outcome}</span>
                  {interview.rating && (
                    <span className="text-sm text-text-muted">• Rating: {interview.rating}/5</span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedInterview(interview)}
                >
                  View Details
                </Button>
                {interview.meetingLink && interview.status === 'scheduled' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(interview.meetingLink, '_blank')}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Join
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(ROUTES.staffing.candidateDetail.replace(':id', interview.candidateId))}
                >
                  View Candidate
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No interviews found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}

      {/* Interview Detail Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Interview Details</h2>
                  <p className="text-text-secondary">{selectedInterview.candidateName}</p>
                </div>
                <button
                  onClick={() => setSelectedInterview(null)}
                  className="text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-text-muted">Position</p>
                <p className="text-text-primary font-medium">{selectedInterview.jobTitle}</p>
                <p className="text-sm text-text-secondary">{selectedInterview.clientName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted">Date & Time</p>
                  <p className="text-text-primary">
                    {new Date(selectedInterview.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Duration</p>
                  <p className="text-text-primary">{selectedInterview.duration} minutes</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-text-muted">Type</p>
                <div className="flex items-center gap-2 mt-1">
                  {getTypeIcon(selectedInterview.type)}
                  <span className="text-text-primary capitalize">{selectedInterview.type}</span>
                </div>
              </div>

              {selectedInterview.location && (
                <div>
                  <p className="text-sm text-text-muted">Location</p>
                  <p className="text-text-primary">{selectedInterview.location}</p>
                </div>
              )}

              {selectedInterview.meetingLink && (
                <div>
                  <p className="text-sm text-text-muted">Meeting Link</p>
                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary hover:underline"
                  >
                    {selectedInterview.meetingLink}
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm text-text-muted">Interviewers</p>
                <p className="text-text-primary">{selectedInterview.interviewers.join(', ')}</p>
              </div>

              {selectedInterview.feedback && (
                <div>
                  <p className="text-sm text-text-muted">Feedback</p>
                  <p className="text-text-secondary">{selectedInterview.feedback}</p>
                </div>
              )}

              {selectedInterview.notes && (
                <div>
                  <p className="text-sm text-text-muted">Notes</p>
                  <p className="text-text-secondary">{selectedInterview.notes}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getInterviewStatusBgColor(
                    selectedInterview.status
                  )}`}
                >
                  {selectedInterview.status.charAt(0).toUpperCase() +
                    selectedInterview.status.slice(1).replace('-', ' ')}
                </span>
                {selectedInterview.outcome && (
                  <div className="flex items-center gap-1">
                    {getOutcomeIcon(selectedInterview.outcome)}
                    <span className="text-sm text-text-primary capitalize">{selectedInterview.outcome}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.08] flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedInterview(null)}>
                Close
              </Button>
              <Button className="flex-1" onClick={() => console.log('Edit interview')}>
                Edit Interview
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
