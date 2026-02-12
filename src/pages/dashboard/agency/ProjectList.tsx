import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  MoreHorizontal,
  FolderKanban,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  projects,
  agencyStats,
  projectStatuses,
  formatCurrency,
  getProjectStatusColor,
} from '@/data/agency/agencyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const ProjectList = () => {
  const { t } = useTranslation('agency');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const projectTypes = [...new Set(projects.map((p) => p.type))];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      case 'on-hold':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('projectList.title')}
        subtitle={t('projectList.subtitle')}
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#547792] to-[#94B4C1] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            {t('projectList.newProject')}
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('projectList.activeProjects')}
          value={agencyStats.activeProjects.toString()}
          icon={FolderKanban}
          trend={{ value: '+4 this month', type: 'up' }}
        />
        <StatsCard
          title={t('projectList.completed')}
          value={completedProjects.toString()}
          icon={CheckCircle}
          trend={{ value: t('projectList.successRate'), type: 'up' }}
        />
        <StatsCard
          title={t('projectList.totalBudget')}
          value={formatCurrency(totalBudget)}
          icon={DollarSign}
          trend={{ value: '+22%', type: 'up' }}
        />
        <StatsCard
          title={t('projectList.onTrack')}
          value={`${agencyStats.projectsOnTrack}%`}
          icon={Users}
          trend={{ value: t('projectList.projectsOnSchedule'), type: 'up' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder={t('projectList.searchProjects')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:border-[#547792] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('projectList.allStatus')}</option>
            {projectStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-white focus:border-[#547792] focus:outline-none"
          >
            <option value="all">{t('projectList.allTypes')}</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
            <Filter className="h-4 w-4" />
            {t('projectList.moreFilters')}
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.project')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.client')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.type')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.status')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.budget')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.progress')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.team')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {t('projectList.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {filteredProjects.map((project) => {
                const statusColor = getProjectStatusColor(project.status);

                return (
                  <tr
                    key={project.id}
                    className="hover:bg-[#1a1a24] transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/agency/projects/${project.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{project.name}</p>
                        <p className="text-xs text-[#64748b]">
                          {project.startDate} - {project.dueDate}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94a3b8]">{project.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#1e1e2e] px-2.5 py-1 text-xs text-[#94a3b8]">
                        {project.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{formatCurrency(project.budget)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const completedDeliverables = project.deliverables.filter(d => d.status === 'completed').length;
                        const progress = project.deliverables.length > 0
                          ? Math.round((completedDeliverables / project.deliverables.length) * 100)
                          : 0;
                        return (
                          <div className="w-32">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#64748b]">{progress}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[#1e1e2e]">
                              <div
                                className={`h-full rounded-full ${
                                  project.status === 'completed'
                                    ? 'bg-emerald-500'
                                    : project.status === 'on-hold'
                                    ? 'bg-amber-500'
                                    : 'bg-gradient-to-r from-[#547792] to-[#94B4C1]'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member) => {
                          const profileImg = getProfileImage(member.name);
                          return (
                            <div
                              key={member.id}
                              className="h-8 w-8 rounded-full ring-2 ring-[#12121a] overflow-hidden"
                              title={member.name}
                            >
                              {profileImg ? (
                                <img
                                  src={profileImg}
                                  alt={member.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#547792] to-[#94B4C1] text-xs font-medium text-white">
                                  {member.name.split(' ').map((n) => n[0]).join('')}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {project.team.length > 3 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e1e2e] text-xs font-medium text-[#94a3b8] ring-2 ring-[#12121a]">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/agency/projects/${project.id}`);
                          }}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 text-[#64748b] hover:bg-[#1e1e2e] hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/[0.08] px-6 py-4">
          <p className="text-sm text-[#64748b]">
            {t('projectList.showing', { filtered: filteredProjects.length, total: projects.length })}
          </p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              {t('projectList.previous')}
            </button>
            <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-[#94a3b8] hover:bg-[#1a1a24]">
              {t('projectList.next')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
