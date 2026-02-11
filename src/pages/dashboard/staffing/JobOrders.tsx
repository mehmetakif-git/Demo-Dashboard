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
import { useTranslation } from 'react-i18next';

export const JobOrders = () => {
  const { t } = useTranslation('staffing');
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
      title: t('jobOrders.openPositions'),
      value: staffingStats.openJobOrders.toString(),
      icon: Briefcase,
      iconColor: '#547792',
    },
    {
      title: t('jobOrders.totalJobOrders'),
      value: staffingStats.totalJobOrders.toString(),
      icon: Briefcase,
      iconColor: '#10b981',
    },
    {
      title: t('jobOrders.criticalUrgent'),
      value: criticalJobsCount.toString(),
      icon: AlertTriangle,
      iconColor: '#ef4444',
    },
    {
      title: t('jobOrders.avgTimeToFill'),
      value: t('jobOrders.days', { count: staffingStats.avgTimeToFill }),
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
        title={t('jobOrders.title')}
        subtitle={t('jobOrders.subtitle')}
        actions={
          <Button onClick={() => console.log('Add job order')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('jobOrders.addJobOrder')}
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
              placeholder={t('jobOrders.searchJobs')}
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
            <option value="all">{t('jobOrders.allStatuses')}</option>
            <option value="open">{t('jobOrders.open')}</option>
            <option value="filled">{t('jobOrders.filled')}</option>
            <option value="on-hold">{t('jobOrders.onHold')}</option>
            <option value="cancelled">{t('jobOrders.cancelled')}</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('jobOrders.allUrgencies')}</option>
            <option value="critical">{t('jobOrders.critical')}</option>
            <option value="high">{t('jobOrders.high')}</option>
            <option value="medium">{t('jobOrders.medium')}</option>
            <option value="low">{t('jobOrders.low')}</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('jobOrders.allClients')}</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('jobOrders.allTypes')}</option>
            <option value="full-time">{t('jobOrders.fullTime')}</option>
            <option value="part-time">{t('jobOrders.partTime')}</option>
            <option value="contract">{t('jobOrders.contract')}</option>
            <option value="temp-to-hire">{t('jobOrders.tempToHire')}</option>
          </select>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-text-secondary">
        {t('jobOrders.showingOf', { shown: filteredJobs.length, total: jobOrders.length })}
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
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('jobOrders.noJobOrdersFound')}</h3>
          <p className="text-text-secondary">{t('jobOrders.tryAdjusting')}</p>
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
  const { t } = useTranslation('staffing');
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
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05] text-text-secondary">
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
      <div className="bg-white/[0.05] rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-text-secondary">{t('jobOrders.pipeline')}</span>
          <span className="text-text-primary font-medium">
            {t('jobOrders.filledOf', { filled: job.filled, openings: job.openings })}
          </span>
        </div>
        <div className="w-full h-2 bg-white/[0.03] backdrop-blur-xl rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div>
            <p className="text-text-primary font-medium">{job.applicants}</p>
            <p className="text-text-muted">{t('jobOrders.applicants')}</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.submissions}</p>
            <p className="text-text-muted">{t('jobOrders.submitted')}</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.interviews}</p>
            <p className="text-text-muted">{t('jobOrders.interviews')}</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">{job.filled}</p>
            <p className="text-text-muted">{t('jobOrders.filled')}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <div className="text-sm text-text-secondary">
          <span>{t('jobOrders.recruiter')}</span>
          <span className="text-text-primary">{job.assignedRecruiter}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" />
          {t('jobOrders.view')}
        </Button>
      </div>
    </Card>
  );
};
