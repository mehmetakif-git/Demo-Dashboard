import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserSearch,
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Plus,
  Eye,
  Pencil,
  X,
  MapPin,
} from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge } from '@/components/common';
import { jobPostings } from '@/data/hrData';

export const Recruitment = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const stats = useMemo(() => ({
    activePostings: jobPostings.filter((j) => j.status === 'active').length,
    totalApplicants: jobPostings.reduce((acc, j) => acc + j.applicants, 0),
    interviewsScheduled: 12, // Mock value
    positionsFilled: jobPostings.filter((j) => j.status === 'closed').length,
  }), []);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Recruitment"
        subtitle="Manage job postings and candidates"
        icon={UserSearch}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Postings"
          value={stats.activePostings}
          icon={Briefcase}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Total Applicants"
          value={stats.totalApplicants}
          icon={Users}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="Interviews Scheduled"
          value={stats.interviewsScheduled}
          icon={Calendar}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Positions Filled"
          value={stats.positionsFilled}
          icon={CheckCircle}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Job Postings</h3>
        <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#547792]/20 text-[#547792]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-[#547792]/20 text-[#547792]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Job Postings */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobPostings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-[#2e2e3e] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">{job.title}</h4>
                  <p className="text-sm text-white/60">{job.department}</p>
                </div>
                <StatusBadge status={job.status} />
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{job.applicants} applicants</span>
                </div>
              </div>

              {/* Salary & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <span className="text-sm text-emerald-400">{job.salaryRange}</span>
                <span className="text-xs text-white/40">
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#547792]/10 text-[#547792] text-sm font-medium hover:bg-[#547792]/20 transition-colors cursor-pointer">
                  <Eye className="w-4 h-4" />
                  View Applicants
                </button>
                <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a24]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Applicants
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Posted
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobPostings.map((job) => (
                <tr key={job.id} className="border-t border-white/[0.08] hover:bg-[#1a1a24]">
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-white font-medium">{job.title}</p>
                      <p className="text-xs text-emerald-400">{job.salaryRange}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white/60">{job.department}</td>
                  <td className="px-4 py-4 text-white/60">{job.location}</td>
                  <td className="px-4 py-4 text-white/60">{job.type}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full bg-[#547792]/10 text-[#547792] text-sm font-medium">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-4 text-white/60">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-white/40 hover:text-[#547792] hover:bg-[#547792]/10 transition-colors cursor-pointer">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};
