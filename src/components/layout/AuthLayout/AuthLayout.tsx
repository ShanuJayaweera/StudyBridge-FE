import { FC, useEffect } from 'react';
import CN from 'classnames';
import { useSelector } from 'react-redux';
import GENERAL from './config';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { Login } from '../../../pages/Login';

export interface AuthLayoutProps {
  [x: string]: any;
}

// Function to check if query parameters are present
function hasQueryParams(location: any) {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.has('token');
}

export const AuthLayout: FC<AuthLayoutProps> = ({ className, children, ...restProps }: AuthLayoutProps) => {
  const { clientToken } = useSelector((state: any) => state.rootReducer.auth);

  useEffect(() => {
    const clock = localStorage.getItem('clock');
    const ts = Number(clock); // cast it to a Number
    if (Date.now() - ts > GENERAL.timeToexpire) {
      // dispatch(resetOtp({ userToken: null, clientToken: null }));
    }
  }, []);

  const AuthLayoutClasses = CN('auth-layout', className);

  const navigate = useNavigate();

  const location = useLocation();


  if (!hasQueryParams(location) && location.pathname === '/auth/reset-password') {
    // Query parameters are missing; navigate to a certain route
    navigate('/auth/forgot-password');
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Bars height="80" width="80" color="#2460a2" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );
  } else if (clientToken) {
    return <Login />;
  } else {
    return (
      <>
        <div className={AuthLayoutClasses} {...restProps}>
          <div className="">{children}</div>
        </div>
      </>
    );
  }
};


export default AuthLayout;
