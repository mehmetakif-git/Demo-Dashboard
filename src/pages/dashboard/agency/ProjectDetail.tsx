import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Paperclip,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/common';
import {
  projects,
  formatCurrency,
  getProjectStatusColor,
} from '@/data/agency/agencyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const ProjectDetail = () => {
  const { t } = useTranslation('agency');
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => {
    return projects.find((p) => p.id === id);
  }, [id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#64748b] mb-4">{t('projectDetail.projectNotFound')}</p>
        <button
          onClick={() => navigate('/dashboard/agency/projects')}
          className="text-[#547792] hover:underline"
        >
          {t('projectDetail.backToProjects')}
        </button>
      </div>
    );
  }

  const statusColor = getProjectStatusColor(project.status);

  // Calculate progress from deliverables
  const completedDeliverables = project.deliverables.filter(d => d.status === 'completed').length;
  const progress = project.deliverables.length > 0
    ? Math.round((completedDeliverables / project.deliverables.length) * 100)
    : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'on-hold':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const daysRemaining = Math.ceil(
    (new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/agency/projects')}
          className="flex items-center gap-2 text-[#64748b] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('projectDetail.backToProjects')}
        </button>
      </div>

      <PageHeader
        title={project.name}
        subtitle={t('projectDetail.projectFor', { type: project.type, client: project.client })}
        actions={
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}>
              {getStatusIcon(project.status)}
              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
            </span>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm font-medium text-[#94a3b8] hover:bg-[#1a1a24]">
              <Edit2 className="h-4 w-4" />
              {t('projectDetail.editProject')}
            </button>
          </div>
        }
      />

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('projectDetail.progressLabel')}
          value={`${progress}%`}
          icon={CheckCircle}
          trend={{ value: progress >= 50 ? t('projectDetail.onTrack') : t('projectDetail.behindSchedule'), type: progress >= 50 ? 'up' : 'down' }}
        />
        <StatsCard
          title={t('projectDetail.budget')}
          value={formatCurrency(project.budget)}
          icon={DollarSign}
          trend={{ value: t('projectDetail.spent', { amount: formatCurrency(project.spent) }), type: 'neutral' }}
        />
        <StatsCard
          title={t('projectDetail.teamSize')}
          value={project.team.length.toString()}
          icon={Users}
          trend={{ value: t('projectDetail.members', { count: project.team.length }), type: 'neutral' }}
        />
        <StatsCard
          title={t('projectDetail.daysRemaining')}
          value={daysRemaining > 0 ? daysRemaining.toString() : '0'}
          icon={Calendar}
          trend={{ value: daysRemaining > 0 ? t('projectDetail.due', { date: project.dueDate }) : t('projectDetail.overdue'), type: daysRemaining > 7 ? 'neutral' : 'down' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Info */}
        <div className="space-y-6">
          {/* Project Details */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.projectDetails')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.client')}</span>
                <span className="text-white">{project.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.projectType')}</span>
                <span className="text-white">{project.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.projectManager')}</span>
                <span className="text-white">{project.projectManager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.startDate')}</span>
                <span className="text-white">{project.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.dueDate')}</span>
                <span className="text-white">{project.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">{t('projectDetail.priority')}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  project.priority === 'high'
                    ? 'bg-red-500/20 text-red-400'
                    : project.priority === 'medium'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.progressOverview')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#64748b]">{t('projectDetail.overallProgress')}</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#1e1e2e]">
                  <div
                    className={`h-full rounded-full ${
                      progress >= 80
                        ? 'bg-emerald-500'
                        : progress >= 50
                        ? 'bg-gradient-to-r from-[#547792] to-[#94B4C1]'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('projectDetail.deliverables')}</p>
                  <p className="text-xl font-semibold text-white">{project.deliverables.length}</p>
                </div>
                <div className="rounded-lg bg-[#1a1a24] p-4">
                  <p className="text-xs text-[#64748b] mb-1">{t('projectDetail.completedLabel')}</p>
                  <p className="text-xl font-semibold text-emerald-400">{completedDeliverables}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Team & Deliverables */}
        <div className="space-y-6">
          {/* Team Members */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.teamMembers')}</h3>
            <div className="space-y-3">
              {project.team.map((member) => {
                const profileImg = getProfileImage(member.name);
                return (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      {profileImg ? (
                        <img
                          src={profileImg}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#547792] to-[#94B4C1] text-sm font-medium text-white">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-xs text-[#64748b]">{member.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.deliverables')}</h3>
            <div className="space-y-3">
              {project.deliverables.map((deliverable) => (
                <div key={deliverable.name} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    deliverable.status === 'completed'
                      ? 'bg-emerald-500/20'
                      : 'bg-[#1e1e2e]'
                  }`}>
                    <CheckCircle className={`h-4 w-4 ${
                      deliverable.status === 'completed'
                        ? 'text-emerald-400'
                        : 'text-[#64748b]'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm ${
                      deliverable.status === 'completed'
                        ? 'text-[#94a3b8] line-through'
                        : 'text-white'
                    }`}>
                      {deliverable.name}
                    </span>
                    <p className="text-xs text-[#64748b]">Due: {deliverable.dueDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    deliverable.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : deliverable.status === 'in-progress'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-[#1e1e2e] text-[#64748b]'
                  }`}>
                    {deliverable.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.quickActions')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                <FileText className="h-6 w-6 text-[#547792]" />
                <span className="text-xs text-[#94a3b8]">{t('projectDetail.viewFiles')}</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                <MessageSquare className="h-6 w-6 text-[#94B4C1]" />
                <span className="text-xs text-[#94a3b8]">{t('projectDetail.messages')}</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                <Paperclip className="h-6 w-6 text-emerald-400" />
                <span className="text-xs text-[#94a3b8]">{t('projectDetail.attachments')}</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg bg-[#1a1a24] p-4 hover:bg-[#1e1e2e] transition-colors">
                <Calendar className="h-6 w-6 text-amber-400" />
                <span className="text-xs text-[#94a3b8]">{t('projectDetail.schedule')}</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.recentActivity')}</h3>
            <div className="space-y-4">
              {[
                { action: t('projectDetail.updatedProjectStatus'), user: project.projectManager, time: t('projectDetail.hoursAgo', { count: 2 }) },
                { action: t('projectDetail.addedNewDeliverable'), user: project.team[1]?.name || project.projectManager, time: t('projectDetail.hoursAgo', { count: 5 }) },
                { action: t('projectDetail.completedMilestone'), user: project.team[0]?.name || project.projectManager, time: t('projectDetail.dayAgo') },
                { action: t('projectDetail.budgetApproved'), user: t('projectDetail.financeTeam'), time: t('projectDetail.daysAgo', { count: 2 }) },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a24] mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-[#64748b]">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
