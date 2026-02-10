import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  reviews,
  getStaffById,
  getServiceById,
  formatDate,
} from '@/data/beauty/beautyData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Reviews = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  const staffList = useMemo(() => {
    const uniqueStaffIds = [...new Set(reviews.map((r) => r.stylistId))];
    return uniqueStaffIds.map((id) => getStaffById(id)).filter(Boolean);
  }, []);

  const stats = useMemo(() => {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
    const respondedCount = reviews.filter((r) => r.reply).length;

    return {
      totalReviews: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      fiveStarPercent: Math.round((fiveStarCount / reviews.length) * 100),
      responseRate: Math.round((respondedCount / reviews.length) * 100),
    };
  }, []);

  const ratingDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0]; // 1-5 stars
    reviews.forEach((r) => {
      dist[r.rating - 1]++;
    });
    return dist.reverse(); // 5 to 1
  }, []);

  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.clientName.toLowerCase().includes(query) ||
          (r.comment && r.comment.toLowerCase().includes(query))
      );
    }

    if (selectedRating !== 'all') {
      filtered = filtered.filter((r) => r.rating === parseInt(selectedRating));
    }

    if (selectedStaff !== 'all') {
      filtered = filtered.filter((r) => r.stylistId === selectedStaff);
    }

    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filtered;
  }, [searchQuery, selectedRating, selectedStaff]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('beauty.reviews', 'Reviews')}
        subtitle="Customer feedback and ratings"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reviews"
          value={stats.totalReviews.toString()}
          icon={MessageSquare}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Average Rating"
          value={stats.avgRating.toString()}
          icon={Star}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="5-Star Reviews"
          value={`${stats.fiveStarPercent}%`}
          icon={ThumbsUp}
          iconColor="#10b981"
        />
        <StatsCard
          title="Response Rate"
          value={`${stats.responseRate}%`}
          icon={TrendingUp}
          iconColor="#ec4899"
        />
      </div>

      {/* Rating Distribution & Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const count = ratingDistribution[index];
              const percent = Math.round((count / reviews.length) * 100);

              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-text-primary">{rating}</span>
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-muted w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Filters */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
              </div>

              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="all">All Staff</option>
                {staffList.map((s) =>
                  s ? (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
          </Card>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => {
          const staffMember = getStaffById(review.stylistId);
          const service = getServiceById(review.serviceId);

          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:border-white/[0.15] transition-all">
                <div className="flex items-start gap-4">
                  {/* Client Avatar */}
                  {getProfileImage(review.clientName) ? (
                    <img
                      src={getProfileImage(review.clientName)}
                      alt={review.clientName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-accent-primary">
                        {review.clientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  )}

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-text-primary">{review.clientName}</h4>
                        <p className="text-sm text-text-muted">{formatDate(review.date)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-600'
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Service & Staff Info */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {service && (
                        <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-xs rounded">
                          {service.name}
                        </span>
                      )}
                      {staffMember && (
                        <span
                          className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded cursor-pointer hover:bg-emerald-500/30 transition-colors"
                          onClick={() => navigate(`/dashboard/beauty/staff/${staffMember.id}`)}
                        >
                          {staffMember.name}
                        </span>
                      )}
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="text-text-secondary mb-3">{review.comment}</p>
                    )}

                    {/* Response */}
                    {review.reply && (
                      <div className="mt-4 p-4 bg-white/[0.03] rounded-lg border-l-2 border-accent-primary">
                        <p className="text-xs text-text-muted mb-1">Salon Response:</p>
                        <p className="text-sm text-text-secondary">{review.reply}</p>
                      </div>
                    )}

                    {/* Actions */}
                    {!review.reply && (
                      <div className="mt-4 flex gap-2">
                        <Button variant="secondary" size="sm" leftIcon={<MessageSquare size={14} />}>
                          Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="p-12 text-center">
          <Star size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No reviews found matching your filters</p>
        </Card>
      )}
    </div>
  );
};
