import { cn, getInitials } from '@/utils/helpers';
import { getProfileImage } from '@/utils/profileImages';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export const Avatar = ({ src, name, size = 'md', className }: AvatarProps) => {
  const initials = getInitials(name);
  const imageSrc = src || getProfileImage(name);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary font-semibold text-white overflow-hidden',
        sizes[size],
        className
      )}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
