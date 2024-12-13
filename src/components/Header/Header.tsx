import { FC, ReactNode, Fragment } from 'react';
import CN from 'classnames';
import avetra from '../../assets/images/defaultAvatar.png';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from '../../../store/reducers/side/sidebarMenu.Slice';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

import { RxHamburgerMenu } from 'react-icons/rx';
import { motion } from 'framer-motion';
import PageTitle from './plugins/PageTitle';
import { closeSidebar, toggleSidebar } from '../../store/reducers/side/sidebarMenu.Slice';

export interface HeaderProps {
  [x: string]: any;
  navbar?: any | ReactNode;
  handleNavClick?: any | ReactNode;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Header: FC<HeaderProps> = ({ className, handleClick, hasHeaderTitle = true, navbar, ...restProps }: HeaderProps) => {
  const HeaderClasses = CN('header', className);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userToken } = useSelector((state: any) => state.rootReducer.auth);

  const { isOpen } = useSelector((state: any) => state.SidebarState);

  const handleClickNow = () => {
    if (isOpen) {
      dispatch(toggleSidebar());
    } else {
      dispatch(closeSidebar());
    }
  };




  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${HeaderClasses}`} {...restProps}>
      <div className="flex justify-between items-start md:px-8 px-4 pb-4 pt-5 gap-4 text-semi is-toolbar">
        <div className="flex items-center justify-center py-2">
          <RxHamburgerMenu size={24} onClick={handleClickNow} className="cursor-pointer hover:text-dark" />
        </div>
        <div className="items-center max-md:w-full justify-start py-2 pt-1 font-semibold uppercase tracking-wide">
          <PageTitle />
          {/* {hasHeaderTitle ? <Breadcrumbs /> : <></>} */}
          <Breadcrumbs />
        </div>
        <div className="flex-auto flex items-center justify-end w-64">
          <div className="flex flex-row px-0 gap-2 max-sm:gap-1 max-sm:px-0">
            <div className="items-center justify-center hidden">
              <div className="p-1 px-2 border-2 rounded-md shadow-sm">
                <i className="text-2xl ri-notification-3-line max-sm:text-md"></i>
              </div>
            </div>

            <div className="flex items-center justify-center ">
              {/* <Link to={`/users/${profileData?.id}`}> */}
              <div className="p-2 px-2 bg-cover border-2 rounded-md shadow-sm w-10 h-10" style={{ backgroundImage: `url("${avetra}")` }}></div>
              {/* </Link> */}
            </div>

            

            {/* logou menu icon  */}
            <div className="flex items-center justify-center ">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center justify-center gap-1">
                    <div className="flex justify-center items-center max-sm:hidden">
                      <p className="text-base font-medium leading-5 capitalize">user name</p>
                    </div>
                    <i className="text-xl ri-arrow-down-s-line"></i>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-1 origin-top-right bg-primary3 rounded shadow-drpdwnShadow w-36 focus:outline-none">
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button type="submit" className={classNames(active ? 'text-primaryDark' : 'text-semi', 'block w-full px-4 py-2 text-left text-sm')} onClick={() => navigate(`/my-profile/`)}>
                            My Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button type="submit" className={classNames(active ? 'text-primaryDark' : 'text-semi', 'block w-full px-4 py-2 text-left text-sm')}>
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default Header;
