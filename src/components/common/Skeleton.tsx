import { cn } from '@/utils/helpers';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-background-tertiary',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

// Pre-built skeleton components for common use cases
export const SkeletonCard = () => (
  <div className="rounded-xl border border-border-default bg-background-secondary p-6">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    <div className="flex gap-4 border-b border-border-default pb-3">
      <Skeleton width="25%" height={16} />
      <Skeleton width="25%" height={16} />
      <Skeleton width="25%" height={16} />
      <Skeleton width="25%" height={16} />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 py-2">
        <Skeleton width="25%" height={14} />
        <Skeleton width="25%" height={14} />
        <Skeleton width="25%" height={14} />
        <Skeleton width="25%" height={14} />
      </div>
    ))}
  </div>
);
