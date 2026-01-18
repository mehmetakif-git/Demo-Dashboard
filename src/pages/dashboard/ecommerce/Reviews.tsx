import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Search,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Filter,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge, Dropdown, Avatar } from '@/components/common';
import { reviews } from '@/data/ecommerce/ecommerceData';

export const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'published' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
    const pendingCount = reviews.filter(r => r.status === 'pending').length;
    const fiveStarCount = reviews.filter(r => r.rating === 5).length;
    return {
      totalReviews,
      avgRating: avgRating.toFixed(1),
      pendingCount,
      fiveStarCount,
    };
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch =
        review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      const matchesRating = ratingFilter === null || review.rating === ratingFilter;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [searchQuery, statusFilter, ratingFilter]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-warning fill-warning' : 'text-text-muted'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        subtitle="Manage product reviews and customer feedback"
        icon={Star}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <MessageSquare size={20} className="text-accent-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Reviews</p>
                <p className="text-2xl font-bold text-text-primary">{stats.totalReviews}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Star size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Avg. Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-text-primary">{stats.avgRating}</p>
                  <Star size={18} className="text-warning fill-warning" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Pending</p>
                <p className="text-2xl font-bold text-text-primary">{stats.pendingCount}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Star size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">5-Star Reviews</p>
                <p className="text-2xl font-bold text-text-primary">{stats.fiveStarCount}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Status Filter */}
            {(['all', 'pending', 'published', 'rejected'] as const).map((filter) => (
              <Button
                key={filter}
                variant={statusFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
          <Dropdown
            trigger={
              <Button variant="secondary" size="sm">
                <Filter size={16} className="mr-2" />
                {ratingFilter ? `${ratingFilter} Stars` : 'All Ratings'}
              </Button>
            }
            items={[
              { id: 'all', label: 'All Ratings', onClick: () => setRatingFilter(null) },
              { id: '5-stars', label: '5 Stars', onClick: () => setRatingFilter(5) },
              { id: '4-stars', label: '4 Stars', onClick: () => setRatingFilter(4) },
              { id: '3-stars', label: '3 Stars', onClick: () => setRatingFilter(3) },
              { id: '2-stars', label: '2 Stars', onClick: () => setRatingFilter(2) },
              { id: '1-star', label: '1 Star', onClick: () => setRatingFilter(1) },
            ]}
          />
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => {
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Customer Info */}
                  <div className="flex items-start gap-3 lg:w-48 flex-shrink-0">
                    <Avatar name={review.customerName} size="md" />
                    <div>
                      <p className="font-medium text-text-primary">{review.customerName}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {renderStars(review.rating)}
                      <StatusBadge status={review.status} />
                    </div>

                    <h3 className="font-semibold text-text-primary mb-2">{review.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{review.comment}</p>

                    {/* Product Reference */}
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                      <Package size={14} />
                      <span>{review.productName}</span>
                    </div>

                    {/* Reply Section */}
                    {review.reply && (
                      <div className="bg-background-secondary rounded-lg p-4 mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={14} className="text-accent-primary" />
                          <span className="text-sm font-medium text-text-primary">Store Reply</span>
                          <span className="text-xs text-text-muted">
                            {review.replyDate && new Date(review.replyDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">{review.reply}</p>
                      </div>
                    )}

                    {/* Helpful Count */}
                    {review.helpful > 0 && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-text-muted">
                        <ThumbsUp size={14} />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 lg:w-32">
                    {review.status === 'pending' && (
                      <>
                        <Button variant="primary" size="sm" className="flex-1">
                          <CheckCircle size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <XCircle size={14} className="mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {review.status === 'published' && !review.reply && (
                      <Button variant="secondary" size="sm" className="flex-1">
                        <MessageSquare size={14} className="mr-1" />
                        Reply
                      </Button>
                    )}
                    {review.status === 'published' && review.reply && (
                      <Button variant="ghost" size="sm" className="flex-1">
                        Edit Reply
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}

        {filteredReviews.length === 0 && (
          <Card className="p-12 text-center">
            <Star size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">No reviews found</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reviews;
