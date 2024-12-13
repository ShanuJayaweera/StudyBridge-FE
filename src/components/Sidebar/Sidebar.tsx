import {
  FC,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import CN from "classnames";
import { NavItem } from "../NavItem";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  closeSidebar,
  toggleSidebar,
} from "../../store/reducers/side/sidebarMenu.Slice";
import Logo from "../../assets/images/logo.svg";
import { useAppContext } from "../../context/AppContext";

export interface SidebarProps {
  [x: string]: any;
  open?: boolean | ReactNode;
  navbar?: boolean | ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({
  className,
  open,
  navbar,
  ...restProps
}: SidebarProps) => {
  const SidebarClasses = CN(`sidebar`, className);

  // const { profileData, isLoading: ProfileLoading } = useSelector(
  //   (state: any) => state.profile
  // );
  // const { userToken, isLoading } = useSelector(
  //   (state: any) => state.rootReducer.auth
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeTab, setActiveTab } = useAppContext();
  const sidebarRef = useRef<any>(null);

  const { isOpen } = useSelector((state: any) => state.SidebarState);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  //use ref handle in filter popup
  useEffect(() => {
    function assertIsNode(e: EventTarget | null): asserts e is Node {
      if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected`);
      }
    }
    const checkIfClickedOutside = ({ target }: MouseEvent) => {
      assertIsNode(target);
      const id = (target as HTMLElement).getAttribute("id");

      if (!sidebarRef.current?.contains(target)) {
        if (id === "navmenu") {
          dispatch(closeSidebar());
        }
      } else {
        if (id === "navmenu") {
          dispatch(toggleSidebar());
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  // if (!profileData && ProfileLoading.userProfileData) {
  //   return <></>;
  // }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.075 }}
        className={SidebarClasses}
        {...restProps}
      >
        <div
          ref={sidebarRef}
          className={`fixed h-full px-4  ${
            isOpen ? "md:w-264" : "max-sm:w-260 max-md:w-260"
          }  duration-300`}
        >
          <div className="flex flex-col">
            <div
              onClick={() => navigate("/")}
              className={`flex cursor-pointer items-center mb-10 justify-center  ${
                isOpen
                  ? "flex flex-row h-auto w-full mt-0"
                  : "mt-10 max-sm:mt-0"
              } max-sm:justify-start`}
            >
              <div
                className={`${
                  isOpen &&
                  "cursor-pointer hidden transition-all max-md:flex justify-center items-center"
                } mt-0`}
              >
                <img
                  className="w-12 max-sm:hidden max-md:hidden"
                  src={Logo}
                  alt="#"
                />
              </div>
              <div
                className={`${
                  !isOpen &&
                  "hidden max-md:block transition-all max-sm:flex max-sm:w-[70%] max-sm:ml-5 max-sm:mb-3"
                } w-full flex justify-center items-center max-sm:mt-10 max-md:mt-0 ml-6 mr-12 mt-10`}
              >
                <img className="w-full" src={Logo} alt="#" />
              </div>
            </div>

            <div className={`flex flex-col w-full ${!isOpen && ""}`}>
              <NavItem
                active={activeTab === "Dashboard"}
                onClick={() => handleTabClick("Dashboard")}
                linkPath="/dashboard"
                userIcon={<HiOutlineUserCircle size={24} />}
              >
                Dashboard
              </NavItem>
              
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};


export default Sidebar;
