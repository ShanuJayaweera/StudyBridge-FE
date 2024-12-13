import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { routesBeforeLogin } from "./routes/routes";

const BeforeLoginRouter = () => {
    const location = useLocation();
    const { userToken, isLoading, errorCode, logoutData } = useSelector(
        (state: any) => state.rootReducer.auth
    );

    /* Render component with or without Layout */
    const renderWithLayout = ({ Component, Layout, ...restProps }: any) => {
        if (Layout) {
            return (
                <Layout {...restProps}>
                    <Component />
                </Layout>
            )
        }
        return <Component {...restProps} />
    }

    /* Rendering routes */
    const renderComponent = ({ isSecured, ...restProps }: any) => {
        return renderWithLayout({ ...restProps })
    }

    return (
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={errorCode == 401 || logoutData ? <Navigate to={'/'} /> : <Navigate to={'/'} />} />
          {routesBeforeLogin.map(({ redirectTo, path, layout: Layout, component: Component, isSecured, hassidebar, heading, hassubheading, hassubfooter, haspermissions }: any, key) => {
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
      </AnimatePresence>
    );
}

export default BeforeLoginRouter