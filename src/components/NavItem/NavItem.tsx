import { FC, ReactNode, useEffect } from 'react';
import CN from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useAppContext } from '../../context/AppContext';
import store from '../../store/store';
import { closeSidebar } from '../../store/reducers/side/sidebarMenu.Slice';
import { useAppContext } from '../../context/AppContext';

export interface NavItemProps {
  [x: string]: any;
  children?: string | ReactNode;
  linkPath?: any;
  open?: boolean | ReactNode;
  navbar?: boolean | ReactNode;
  active?: string | ReactNode;
  onClick?: any;
}

export const NavItem: FC<NavItemProps> = ({
  className,
  children,
  userIcon,
  settingIcon,
  profileIcon,
  dashBoardIcon,
  darkIcon,
  linkPath,
  open,
  navbar,
  active,
  onClick,
  ...restProps
}: NavItemProps) => {
  const NavItemClasses = CN('nav-item', className);

  const { isOpen } = useSelector((state: any) => state.SidebarState);

  const { activeTab, setActiveTab, setPageTitle } = useAppContext();

  const location = useLocation();
  const isActive = location.pathname.includes(linkPath);

  useEffect(() => {
    setPageTitle(activeTab);
  }, []);

  useEffect(() => {
    if (isActive) {
      const formattedString = linkPath.charAt(1).toUpperCase() + linkPath.slice(2);
      setActiveTab(formattedString);
    }
  }, []);

  const closeSidebarOnMobile = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      store.dispatch(closeSidebar());
    }
  };

  useEffect(() => {
    closeSidebarOnMobile();
  }, [activeTab]);

  return (
    <div className={NavItemClasses} {...restProps}>
      <Link to={linkPath} className="no-underline" style={{ textDecoration: 'none' }} onClick={onClick}>
        <div
          className={`flex gap-3 py-4 text-base rounded-xl px-8 ${!isOpen && ' duration-300 max-md:w-full items-center justify-center pl-0 pr-0'} ${
            isActive ? 'text-primaryDark bg-primary1' : 'text-semi'
          } duration-300 mb-6 text-base group/item hover:text-primaryDark hover:bg-primary1 hover:border-1 hover:border-black hover:cursor-pointer`}
        >
          <div className={`my-auto ${!isOpen && 'ml-1 text-2xl'}`}>
            <div className="flex items-center float-left">
              {userIcon && <div className="inline-flex">{userIcon}</div>}
            </div>
          </div>
          <div className={`font-semibold float-right my-auto  ${!isOpen && 'hidden max-md:flex '}`}>{children}</div>
        </div>
      </Link>
    </div>
  );
};

export default NavItem;
