import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  Clock,
  CheckCircle,
  Reply,
  MoreVertical,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown } from '@/components/common';
import { customerFeedback } from '@/data/restaurant/restaurantData';

export const Feedback = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const stats = useMemo(() => {
    const totalFeedback = customerFeedback.length;
    const avgRating = customerFeedback.reduce((acc, f) => acc + f.rating, 0) / totalFeedback;
    const avgFood = customerFeedback.reduce((acc, f) => acc + f.foodRating, 0) / totalFeedback;
    const avgService = customerFeedback.reduce((acc, f) => acc + f.serviceRating, 0) / totalFeedback;
    const pending = customerFeedback.filter(f => f.status === 'pending').length;

    return {
      totalFeedback,
      avgRating: avgRating.toFixed(1),
      avgFood: avgFood.toFixed(1),
      avgService: avgService.toFixed(1),
      pending,
    };
  }, []);

  const filteredFeedback = useMemo(() => {
    return customerFeedback.filter(feedback => {
      const matchesSearch = feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (feedback.comment?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
      const matchesRating = ratingFilter === null || feedback.rating === ratingFilter;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [searchQuery, statusFilter, ratingFilter]);

  const renderStars = (rating: number, size: number = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= rating ? 'text-warning fill-warning' : 'text-text-muted'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Feedback"
        subtitle="Manage reviews and ratings"
        icon={MessageSquare}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Reviews', value: stats.totalFeedback, icon: MessageSquare, color: '#f97316' },
          { label: 'Avg Rating', value: stats.avgRating, icon: Star, color: '#f59e0b' },
          { label: 'Food Rating', value: stats.avgFood, icon: ThumbsUp, color: '#10b981' },
          { label: 'Service Rating', value: stats.avgService, icon: TrendingUp, color: '#6366f1' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: '#ef4444' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Rating Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Rating Distribution</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = customerFeedback.filter(f => f.rating === rating).length;
            const percentage = (count / customerFeedback.length) * 100;

            return (
              <div
                key={rating}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                  ratingFilter === rating ? 'bg-[#f97316]/10' : 'hover:bg-background-secondary'
                }`}
                onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
              >
                <div className="flex items-center gap-1 w-24">
                  {renderStars(rating, 14)}
                </div>
                <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-16 text-right">{count} reviews</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'reviewed', 'responded'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Customer Info */}
                <div className="flex items-start gap-3 lg:w-48 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#f97316]">
                      {feedback.customerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{feedback.customerName}</p>
                    <p className="text-xs text-text-muted">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Ratings & Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-muted">Overall:</span>
                      {renderStars(feedback.rating)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-muted">Food:</span>
                      {renderStars(feedback.foodRating, 14)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-muted">Service:</span>
                      {renderStars(feedback.serviceRating, 14)}
                    </div>
                    {feedback.ambienceRating && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-muted">Ambience:</span>
                        {renderStars(feedback.ambienceRating, 14)}
                      </div>
                    )}
                  </div>

                  {feedback.comment && (
                    <p className="text-sm text-text-secondary mb-3">{feedback.comment}</p>
                  )}

                  {feedback.reply && (
                    <div className="bg-background-secondary rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply size={14} className="text-[#f97316]" />
                        <span className="text-sm font-medium text-text-primary">Restaurant Reply</span>
                        {feedback.replyDate && (
                          <span className="text-xs text-text-muted">
                            {new Date(feedback.replyDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{feedback.reply}</p>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-start gap-2">
                  <StatusBadge status={feedback.status} />
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'reply', label: feedback.reply ? 'Edit Reply' : 'Reply', onClick: () => {} },
                      { id: 'mark', label: 'Mark as Reviewed', onClick: () => {} },
                      { id: 'view', label: 'View Order', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Quick Actions */}
              {feedback.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-border-default flex gap-2">
                  <Button variant="primary" size="sm">
                    <Reply size={14} className="mr-1" />
                    Reply
                  </Button>
                  <Button variant="secondary" size="sm">
                    <CheckCircle size={14} className="mr-1" />
                    Mark Reviewed
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No feedback found</p>
        </Card>
      )}
    </div>
  );
};

export default Feedback;
