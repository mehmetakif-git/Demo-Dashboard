import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Grid3X3,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  candidates,
  staffingStats,
  formatCurrency,
  getCandidateStatusBgColor,
  type Candidate,
} from '@/data/staffing/staffingData';
import { getProfileImage } from '@/utils/profileImages';
import { ROUTES } from '@/utils/constants';
import { useTranslation } from 'react-i18next';

type ViewMode = 'grid' | 'table';

export const CandidateList = () => {
  const { t } = useTranslation('staffing');
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');

  // Get unique skills from all candidates
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    candidates.forEach((c) => c.skills.forEach((s) => skills.add(s)));
    return Array.from(skills).sort();
  }, []);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === '' ||
        `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesSkill = skillFilter === 'all' || candidate.skills.includes(skillFilter);
      return matchesSearch && matchesStatus && matchesSkill;
    });
  }, [searchQuery, statusFilter, skillFilter]);

  const stats = [
    {
      title: t('candidateList.totalCandidates'),
      value: staffingStats.totalCandidates.toString(),
      icon: Briefcase,
      iconColor: '#547792',
    },
    {
      title: t('candidateList.activeCandidates'),
      value: staffingStats.activeCandidates.toString(),
      icon: Briefcase,
      iconColor: '#10b981',
    },
    {
      title: t('candidateList.placedThisMonth'),
      value: staffingStats.monthlyPlacements.toString(),
      icon: Briefcase,
      iconColor: '#94B4C1',
    },
    {
      title: t('candidateList.fillRate'),
      value: `${staffingStats.fillRate}%`,
      icon: Briefcase,
      iconColor: '#f59e0b',
    },
  ];

  const handleViewCandidate = (candidateId: string) => {
    navigate(ROUTES.staffing.candidateDetail.replace(':id', candidateId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('candidateList.title')}
        subtitle={t('candidateList.subtitle')}
        actions={
          <Button onClick={() => console.log('Add candidate')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('candidateList.addCandidate')}
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
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder={t('candidateList.searchCandidates')}
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
              <option value="all">{t('candidateList.allStatuses')}</option>
              <option value="available">{t('candidateList.available')}</option>
              <option value="interviewing">{t('candidateList.interviewing')}</option>
              <option value="placed">{t('candidateList.placed')}</option>
              <option value="onboarding">{t('candidateList.onboarding')}</option>
              <option value="inactive">{t('candidateList.inactive')}</option>
            </select>

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('candidateList.allSkills')}</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-text-secondary">
        {t('candidateList.showingOf', { shown: filteredCandidates.length, total: candidates.length })}
      </p>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onView={() => handleViewCandidate(candidate.id)}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.candidate')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.status')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.title')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.skills')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.experience')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.location')}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    {t('candidateList.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(`${candidate.firstName} ${candidate.lastName}`) ? (
                          <img
                            src={getProfileImage(`${candidate.firstName} ${candidate.lastName}`)}
                            alt={`${candidate.firstName} ${candidate.lastName}`}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                            {candidate.firstName[0]}
                            {candidate.lastName[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-text-primary">
                            {candidate.firstName} {candidate.lastName}
                          </p>
                          <p className="text-sm text-text-secondary">{candidate.email}</p>
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
                    <td className="py-3 px-4 text-text-primary">{candidate.currentTitle}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 rounded-full text-xs bg-accent-primary/10 text-accent-primary"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 2 && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05] text-text-secondary">
                            +{candidate.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{t('candidateList.yrs', { years: candidate.experience })}</td>
                    <td className="py-3 px-4 text-text-secondary">{candidate.location}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleViewCandidate(candidate.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredCandidates.length === 0 && (
        <Card className="p-12 text-center">
          <Filter className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('candidateList.noCandidatesFound')}</h3>
          <p className="text-text-secondary">{t('candidateList.tryAdjusting')}</p>
        </Card>
      )}
    </motion.div>
  );
};

interface CandidateCardProps {
  candidate: Candidate;
  onView: () => void;
}

const CandidateCard = ({ candidate, onView }: CandidateCardProps) => {
  const { t } = useTranslation('staffing');
  const profileImage = getProfileImage(`${candidate.firstName} ${candidate.lastName}`);

  return (
    <Card className="p-6 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${candidate.firstName} ${candidate.lastName}`}
              className="w-14 h-14 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-lg font-bold">
              {candidate.firstName[0]}
              {candidate.lastName[0]}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-text-primary text-lg">
              {candidate.firstName} {candidate.lastName}
            </h3>
            <p className="text-text-secondary text-sm">{candidate.currentTitle}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getCandidateStatusBgColor(
            candidate.status
          )}`}
        >
          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-accent-primary/10 text-accent-primary"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05] text-text-secondary">
              +{candidate.skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-text-secondary">
            <Briefcase className="h-4 w-4" />
            <span>{t('candidateList.yrsExp', { years: candidate.experience })}</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{candidate.location.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <DollarSign className="h-4 w-4" />
            <span>{formatCurrency(candidate.desiredSalary.min)}+</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="h-4 w-4" />
            <span className="capitalize">{candidate.availability.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
        <Button variant="ghost" size="sm" className="flex-1" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" />
          {t('candidateList.view')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(`mailto:${candidate.email}`)}
        >
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => window.open(`tel:${candidate.phone}`)}>
          <Phone className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
