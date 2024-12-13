import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routesAfterLogin } from '../../../routes/routes';
import { useAppContext } from '../../../context/AppContext';
// import { useAppContext } from '../../../context/AppContext';

const findRouteByPath = (path: string) => {
  return routesAfterLogin.find((route) => {
    const routeSegments = route.path.split('/');
    const pathSegments = path.split('/');

    if (routeSegments.length !== pathSegments.length) {
      return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
      if (routeSegments[i] !== pathSegments[i] && !routeSegments[i].startsWith(':')) {
        return false;
      }
    }

    return true;
  });
};

const generateTitle = (pathname: string): any => {
  const titleArray = pathname.split('/').filter(Boolean);
  const currentPath = `/${titleArray.join('/')}`;
  const route = findRouteByPath(currentPath);

  return [
    {
      path: currentPath,
      label: route ? route.label || '' : '',
      parentLabel: '',
    },
  ];
};

export const PageTitle: FC<{}> = () => {
  const { title, updateTitle } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const newTitle = generateTitle(location.pathname);
    updateTitle(newTitle);
  }, [location.pathname]);

  return <h1 className="flex mxs:text-2xl text-lg whitespace-pre">{title[0]?.label}</h1>;
  // return <h1 className="flex mxs:text-2xl text-lg whitespace-pre">{activeTab}</h1>;
};

export default PageTitle;
