import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  
  const pathMap = {
    '/student-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/disaster-learning-modules': { label: 'Learning Modules', icon: 'BookOpen' },
    '/virtual-emergency-drills': { label: 'Virtual Drills', icon: 'Target' },
    '/emergency-contacts': { label: 'Emergency Contacts', icon: 'Phone' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/student-dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap?.[currentPath];
      
      if (pathInfo) {
        breadcrumbs?.push({
          label: pathInfo?.label,
          path: currentPath,
          icon: pathInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    // Remove duplicate home if current path is dashboard
    if (breadcrumbs?.length > 1 && breadcrumbs?.[1]?.path === '/student-dashboard') {
      breadcrumbs?.shift();
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login/register pages or if only one item
  if (location?.pathname === '/login' || 
      location?.pathname === '/register' || 
      breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
            )}
            
            {crumb?.isLast ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-standard"
              >
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;