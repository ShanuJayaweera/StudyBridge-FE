import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { routesAfterLogin } from '../../routes/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppContext } from '../../context/AppContext';
// import { useAppContext } from '../../context/AppContext';

export interface BreadcrumbsProps {
  [x: string]: any;
}

interface BreadcrumbItem {
  path: string;
  label: string;
  parentLabel: string;
}

const findRouteByPath = (path: string) => {
  return routesAfterLogin.find((route) => {
    const routePath = route.path;
    const lastRouteSegment = routePath.split('/').pop();
    const lastPathSegment = path.split('/').pop();

    if (lastRouteSegment && lastPathSegment) {
      return lastRouteSegment === lastPathSegment;
    }

    return false;
  });
};


const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbArray = pathname.split('/').filter(Boolean);

  return breadcrumbArray.map((path, index) => {
    const fullPath = `/${breadcrumbArray.slice(0, index + 1).join('/')}`;

    const route = findRouteByPath(fullPath);

    if (index > 0 && route) {
      const parentRoute = findRouteByPath(`/${breadcrumbArray.slice(0, index).join('/')}`);
      return {
        path: fullPath,
        label: route.label || path,
        parentLabel: parentRoute?.label || '',
      };
    } else {
      return {
        path: fullPath,
        label: route ? route.label || path : path,
        parentLabel: '',
      };
    }
  });
};

const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.breadcrumbs);

  const location = useLocation();
  const navigate = useNavigate();
  const { updateBreadcrumbsFromPath } = useAppContext();

  useEffect(() => {
    const newBreadcrumbs: any = generateBreadcrumbs(location.pathname);
    updateBreadcrumbsFromPath(newBreadcrumbs);
  }, [location.pathname]);

  // Check if there are more than 1 breadcrumb items to determine if it's a detail page

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-wrap">
          {breadcrumbs.map((breadcrumb: any, index: number) => (
            <span className={`flex items-center text-light normal-case font-medium md:text-sm text-xs ${index === breadcrumbs.length - 1 ? 'text-primaryLight' : ''}`} key={breadcrumb.link}>
              <Link to={breadcrumb.link} className="hover:no-underline cursor-pointer" onClick={() => navigate(breadcrumb.link)}>
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="px-1 text-light">{' > '}</span>}
            </span>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Breadcrumbs;
