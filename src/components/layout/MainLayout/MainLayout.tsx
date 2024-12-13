import { FC } from "react";
import CN from "classnames";
import { Header } from "../../Header";
import { useSelector } from "react-redux";

import { Bars } from "react-loader-spinner";
import { routesAfterLogin } from "../../../routes/routes";
import { Sidebar } from "../../Sidebar";

export interface MainLayoutProps {
  [x: string]: any;
  open?: string;
}


export const MainLayout: FC<MainLayoutProps> = ({
  hassidebar,
  heading,
  hasHeaderTitle,
  hasHeader = true,
  children}: MainLayoutProps) => {
  // const MainLayoutClasses = CN('main-layout', className);

  // const dispatch = useDispatch();
  const { isOpen } = useSelector((state: any) => state.SidebarState);

  if (routesAfterLogin.length <= 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Bars
          height="80"
          width="80"
          color="#2460a2"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const renderLayoutInner = () => {
    return (
      <>
        <div
          className={CN("flex flex-col w-full mt-20 p-3 pl-0 mr-5", {
            " h-full left-0 right-0 bottom-0 top-[1px]": hassidebar,
          
          })}
        >
          <div className="relative flex flex-col w-full h-full main-layout__content gap-3 bg-primary2 rounded-xl">
            {heading && (
              <div
                className={CN("flex w-full h-[24px] items-center", {
                  "absolute top-0": hassidebar,
                })}
              >
                <h4 className="font-semibold">{heading}</h4>
              </div>
            )}

            <div
              className={CN(
                `main-layout__inner flex flex-col py-6 pt-0 md:pb-0 absolute px-0 overflow-auto`,
                {
                  "left-0 right-0 bottom-0": hassidebar,
                  "top-9": heading,
                  "top-0": !heading,
                }
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderLayout = () => {
    // Render with sidebar
    if (hassidebar) {
      return (
        <>
          {hasHeader ? (
            <Header
              hasHeaderTitle={hasHeaderTitle}
              className={`${
                isOpen ? "md:left-64" : "md:left-20"
              } items-center fixed top-0 right-0 max-sm:left-0 max-md:left-0 z-[1002] bg-primary3`}
            />
          ) : (
            <></>
          )}
          <Sidebar
            className={`${
              isOpen
                ? "w-264 max-md:hidden"
                : "w-20 max-md:block max-md:w-260 overflow-hidden"
            } bg-primary3 duration-300 bottom-0 top-0 fixed mt-0 z-[1004]`}
          />

          <div
            id={"navmenu"}
            className={`fixed top-0 left-0 w-full h-full bg-overlay z-[1003] md:hidden ${
              isOpen && "md:hidden max-md:hidden"
            } `}
          ></div>
          <div
            className={`relative flex flex-col grow bg-primary3 ${
              isOpen ? "md:ml-16.5" : "ml-20 max-md:ml-0"
            }`}
          >
            {renderLayoutInner()}
          </div>
        </>
      );
    }

    // Render without sidebar
    return (
      <div className="container">
        {hasHeader ? (
          <Header
            hasHeaderTitle={hasHeaderTitle}
            className="fixed top-0 left-0 right-0"
          />
        ) : (
          <></>
        )}
        {renderLayoutInner()}
      </div>
    );
  };

  return (
    <>
      <div
        className={CN(
          "main-layout__container fixed top-0 left-0 right-0 bottom-0 flex overflow-auto bg-primary3"
        )}
      >
        {renderLayout()}
      </div>
    </>
  );
};


export default MainLayout;
