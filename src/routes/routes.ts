import { AuthLayout } from "../components/layout/AuthLayout";
import { MainLayout } from "../components/layout/MainLayout";
import { FogotPassword } from "../pages/FogotPassword";
import { Login } from "../pages/Login";
import { ResetPassword } from "../pages/ResetPassword";

interface Route {
  [x: string]: any;
  path: string;
  component?: any;
  layout?: any;
  redirectTo?: string;
  isSecured?: boolean;
  isAuthScreen?: boolean;
  hassidebar?: boolean;
  hassubheading?: boolean;
  hassubfooter?: boolean;
  haspermissions?: boolean;
  heading?: any;
  permissions: string[];
}

export const routesBeforeLogin: Route[] = [
  {
    path: '/',
    redirectTo: '/auth/login',
    permissions: ['*'],
  },
  {
    path: '/auth',
    redirectTo: '/auth/login',
    permissions: ['*'],
  },
  {
    path: '/auth/login',
    component: Login,
    layout: AuthLayout,
    isAuthScreen: true,
    haspermissions: false,
    permissions: ['*'],
  },
  {
    path: '/auth/forgot-password',
    component: FogotPassword,
    layout: AuthLayout,
    isAuthScreen: true,
    permissions: ['*'],
  },
  {
    path: '/auth/reset-password',
    component: ResetPassword,
    layout: AuthLayout,
    isAuthScreen: true,
    permissions: ['*'],
  },
  
];

const pathString = (path: string, startingString: string) => {
  if (path.startsWith(startingString)){
    return path
  } else {
    return startingString
  }
}

export const routesAfterLogin: Route[] = [
  {
    path: '/',
    redirectTo: '/dashboard',
    permissions: ['*'],
  },
  // {
  //   path: '/dashboard',
  //   component: DashboardInstance,
  //   layout: MainLayout,
  //   hassidebar: true,
  //   isSecured: true,
  //   haspermissions: true,
  //   label: 'Dashboard',
  //   permissions: [''],
  // },
 
  {
    path: pathString(window.location.pathname, '/auth'),
    redirectTo: '/',
    permissions: ['*'],
  },
];


