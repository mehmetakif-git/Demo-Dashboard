import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, CheckCircle, Clock, AlertCircle, Play } from 'lucide-react';
import { PageHeader, StatsCard, StatusBadge, Avatar, DataTable } from '@/components/common';
import { performanceReviews } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';
import type { PerformanceReview } from '@/data/hrData';
import { useTranslation } from 'react-i18next';

export const Performance = () => {
  const { t } = useTranslation('hr');
  const [currentPeriod] = useState('Q4 2024');

  const stats = useMemo(() => {
    const filtered = performanceReviews.filter((r) => r.period === currentPeriod);
    return {
      totalReviews: filtered.length,
      completed: filtered.filter((r) => r.status === 'completed').length,
      inProgress: filtered.filter((r) => r.status === 'in-progress').length,
      pending: filtered.filter((r) => r.status === 'pending').length,
    };
  }, [currentPeriod]);

  const completionPercentage = Math.round((stats.completed / stats.totalReviews) * 100);

  const filteredReviews = useMemo(() => {
    return performanceReviews.filter((r) => r.period === currentPeriod);
  }, [currentPeriod]);

  const renderStars = (rating: number | null) => {
    if (rating === null) return <span className="text-white/40">N/A</span>;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : star <= rating
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-white/20'
            }`}
          />
        ))}
        <span className="text-white/60 text-sm ml-1">({rating})</span>
      </div>
    );
  };

  const columns = [
    {
      key: 'employee',
      header: t('performance.employee'),
      render: (review: PerformanceReview) => (
        <div className="flex items-center gap-3">
          <Avatar name={review.employee} src={profileImages[review.employee]} size="sm" />
          <span className="text-white">{review.employee}</span>
        </div>
      ),
    },
    {
      key: 'reviewer',
      header: t('performance.reviewer'),
      render: (review: PerformanceReview) => (
        <span className="text-white/80">{review.reviewer}</span>
      ),
    },
    {
      key: 'period',
      header: t('performance.period'),
      render: (review: PerformanceReview) => (
        <span className="text-white/60">{review.period}</span>
      ),
    },
    {
      key: 'rating',
      header: t('performance.rating'),
      render: (review: PerformanceReview) => renderStars(review.rating),
    },
    {
      key: 'status',
      header: t('performance.status'),
      render: (review: PerformanceReview) => <StatusBadge status={review.status} />,
    },
    {
      key: 'completedDate',
      header: t('performance.completedDate'),
      render: (review: PerformanceReview) => (
        <span className="text-white/60">
          {review.completedDate
            ? new Date(review.completedDate).toLocaleDateString()
            : '-'}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('performance.title')}
        subtitle={t('performance.subtitle')}
        icon={Star}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
            <Play className="w-4 h-4" />
            {t('performance.startReviewCycle')}
          </button>
        }
      />

      {/* Current Cycle Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {t('performance.periodReview', { period: currentPeriod })}
            </h3>
            <p className="text-white/60 text-sm">
              {t('performance.reviewInProgress', { count: stats.pending })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{completionPercentage}%</p>
              <p className="text-xs text-white/40">{t('performance.completed')}</p>
            </div>
            <div className="w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-[#1a1a24]"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${completionPercentage * 3.52} 352`}
                  strokeLinecap="round"
                  className="text-[#547792]"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('performance.totalReviews')}
          value={stats.totalReviews}
          icon={Users}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title={t('performance.completedCount')}
          value={stats.completed}
          icon={CheckCircle}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title={t('performance.inProgress')}
          value={stats.inProgress}
          icon={Clock}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title={t('performance.pending')}
          value={stats.pending}
          icon={AlertCircle}
          iconColor="#ef4444"
          iconBg="rgba(239, 68, 68, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">{t('performance.ratingDistribution')}</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = filteredReviews.filter(
              (r) => r.rating !== null && Math.floor(r.rating) === rating
            ).length;
            const percentage = (count / stats.completed) * 100 || 0;

            return (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-24">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex-1 h-3 bg-[#1a1a24] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.4 + rating * 0.05, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#547792] to-[#94B4C1] rounded-full"
                  />
                </div>
                <span className="text-white/60 text-sm w-12">{count}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reviews Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredReviews}
          keyExtractor={(r) => String(r.id)}
          emptyMessage={t('performance.noReviews')}
        />
      </motion.div>
    </div>
  );
};
