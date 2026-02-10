import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation('breadcrumb');

  // Generate breadcrumb items from current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      // Convert segment to camelCase for translation lookup
      const camelSegment = segment.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const translated = t(camelSegment, { defaultValue: '' });
      const label = translated || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        label,
        path: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      <Link
        to="/dashboard"
        className="flex items-center text-[#64748b] hover:text-white transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-[#64748b]" />
            {isLast ? (
              <span className="text-sm font-medium text-white">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-sm text-[#64748b] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
