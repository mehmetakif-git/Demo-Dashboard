import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  jobOrders,
  clients,
  staffingStats,
  formatSalaryRange,
  getJobStatusBgColor,
  getJobUrgencyBgColor,
  type JobOrder,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';

export const JobOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter job orders
  const filteredJobs = useMemo(() => {
    return jobOrders.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesUrgency = urgencyFilter === 'all' || job.urgency === urgencyFilter;
      const matchesClient = clientFilter === 'all' || job.clientId === clientFilter;
      const matchesType = typeFilter === 'all' || job.employmentType === typeFilter;
      return matchesSearch && matchesStatus && matchesUrgency && matchesClient && matchesType;
    });
  }, [searchQuery, statusFilter, urgencyFilter, clientFilter, typeFilter]);

  const criticalJobsCount = jobOrders.filter((j) => j.urgency === 'critical' && j.status === 'open').length;

  const stats = [
    {
      title: 'Open Positions',
      value: staffingStats.openJobOrders.toString(),
      icon: Briefcase,
      iconColor: '#6366f1',
    },
    {
      title: 'Total Job Orders',
      value: staffingStats.totalJobOrders.toString(),
      icon: Briefcase,
      iconColor: '#10b981',
    },
    {
      title: 'Critical/Urgent',
      value: criticalJobsCount.toString(),
      icon: AlertTriangle,
      iconColor: '#ef4444',
    },
    {
      title: 'Avg Time to Fill',
      value: `${staffingStats.avgTimeToFill} days`,
      icon: Clock,
      iconColor: '#f59e0b',
    },
  ];

  const handleViewJob = (jobId: string) => {
    navigate(ROUTES.staffing.jobDetail.replace(':id', jobId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Job Orders"
        subtitle="Manage open positions and requisitions"
        actions={
          <Button onClick={() => console.log('Add job order')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Job Order
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
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="filled">Filled</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Urgencies</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Clients</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="temp-to-hire">Temp-to-Hire</option>
          </select>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-text-secondary">
        Showing {filteredJobs.length} of {jobOrders.length} job orders
      </p>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobOrderCard key={job.id} job={job} onView={() => handleViewJob(job.id)} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="p-12 text-center">
          <Briefcase className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No job orders found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </motion.div>
  );
};

interface JobOrderCardProps {
  job: JobOrder;
  onView: () => void;
}

const JobOrderCard = ({ job, onView }: JobOrderCardProps) => {
  const fillPercentage = job.openings > 0 ? Math.round((job.filled / job.openings) * 100) : 0;

  return (
    <Card className="p-6 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text-primary text-lg">{job.title}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getJobUrgencyBgColor(job.urgency)}`}>
              {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Building2 className="h-4 w-4" />
            <span>{job.clientName}</span>
            <span className="text-text-muted">•</span>
            <span>{job.department}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getJobStatusBgColor(job.status)}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('-', ' ')}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-accent-primary/10 text-accent-primary"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-background-tertiary text-text-secondary">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-text-secondary">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <DollarSign className="h-4 w-4" />
            <span>{formatSalaryRange(job.salaryRange)}</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Briefcase className="h-4 w-4" />
            <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <MapPin className="h-4 w-4" />
            <span className="capitalize">{job.remote}</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="bg-background-tertiary rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-text-secondary">Pipeline</span>
          <span className="text-text-primary font-medium">
            {job.filled}/{job.openings} filled
          </span>
        </div>
        <div className="w-full h-2 bg-background-secondary rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div>
            <p className="text-text-primary font-medium">{job.applicants}</p>
            <p className="text-text-muted">Applicants</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.submissions}</p>
            <p className="text-text-muted">Submitted</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.interviews}</p>
            <p className="text-text-muted">Interviews</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.filled}</p>
            <p className="text-text-muted">Filled</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-default">
        <div className="text-sm text-text-secondary">
          <span>Recruiter: </span>
          <span className="text-text-primary">{job.assignedRecruiter}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </div>
    </Card>
  );
};
