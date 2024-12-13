import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routesAfterLogin } from './routes/routes';
import { MainLayout } from './components/layout/MainLayout';
import Page404 from './pages/404/404';

const AfterLoginRouter = () => {
  const location = useLocation();

  useEffect(() => {
  },[routesAfterLogin])

  /* Render component with or without Layout */
  const renderWithLayout = ({ Component, Layout, ...restProps }: any) => {
    if (Layout) {
      return (
        <Layout {...restProps}>
          <Component location={location} key={location.pathname} />
        </Layout>
      );
    }
    return <Component {...restProps} location={location} key={location.pathname} />;
  };

  /* Rendering routes */
  const renderComponent = ({ isSecured, ...restProps }: any) => {
    return renderWithLayout({ ...restProps });
  };

  return (
      <Routes>
        <Route
          path="*"
          // key={key}
          element={renderComponent({
            Component: Page404,
            Layout: MainLayout,
            hassidebar: true,
            heading: false,
            hassubheading: true,
            hasHeader: true,
            hasHeaderTitle: false,
            hassubfooter: true,
          })}
        />
        {routesAfterLogin.map(({ redirectTo, path, layout: Layout, component: Component, isSecured, hassidebar, heading, hassubheading, hassubfooter, haspermissions, funk }: any, key: any) => {
 
          /* If redirectTo is defined, render a Redirect component */
          if (redirectTo) {
            return <Route key={key} path={path} element={<Navigate to={redirectTo} />} />;
          } else {
            /* Render Route component */
            return (
              <Route
                path={path}
                key={key}
                element={renderComponent({
                  Component,
                  Layout,
                  isSecured,
                  hassidebar,
                  heading,
                  hassubheading,
                  hassubfooter,
                  haspermissions,
                  path,
                })}
              />
            );
          }
        })}
      </Routes>
  );
};

export default AfterLoginRouter;
