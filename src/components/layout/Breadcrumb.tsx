import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

// Map paths to readable labels
const pathLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/select-sector': 'Select Sector',
  '/select-account': 'Select Account',
};

export const Breadcrumb = () => {
  const location = useLocation();

  // Generate breadcrumb items from current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = pathLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
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
