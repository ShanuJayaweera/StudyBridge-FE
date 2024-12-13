import { FC, useEffect } from "react";
import { Button } from "../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResetPasswordUser } from "../../store/reducers/auth/ResetPasswordUser.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hooks";
import {
  // clientAuth,
  resetUserPassword,
} from "../../store/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";

import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";

export interface ResetPasswordProps {
  [x: string]: any;
}

// Function to check if query parameters are present

export const ResetPassword: FC<ResetPasswordProps> = () => {

  const { isLoading, resetPasswordData, errorMsg } = useAppSelector(
    (state) => state.rootReducer.auth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  // if (!hasQueryParams(location)) {
  //   // Query parameters are missing; navigate to a certain route
  //    navigate('/forget-password');
  //     return <></>
  //   }
  // }, [location, navigate]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(40, "Password cannot exceed more than 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(40, "Password cannot exceed more than 40 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordUser>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordUser> = (data) => {
    let searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const newData = {
      ...data,
      token: token,
    };
    dispatch(resetUserPassword(newData));
  };

  useEffect(() => {
    if (resetPasswordData?.data?.success) {
      navigate("/auth/login");
    }
  }, [resetPasswordData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-primary3"
    >
      <div className="w-full px-4 mx-auto md:max-w-[720px] lg:max-w-[792px]">
        <div className="bg-primary3 mxs:py-20 py-10 px-10 lg:py-16 rounded-lg shadow-layoutShadow">
          <div
            className="flex items-center cursor-pointer justify-center"
            onClick={() => navigate("/")}
          >
            <img
              className="object-cover rounded-lg mxs:h-[52px] mxs:w-[206.79px] w-40"
              src={Logo}
              alt="#"
            />
          </div>
          <h2 className="mxs:text-2xl text-lg text-primary1 font-bold mxs:my-8 my-5 text-center">
            {" "}
            Reset Password
          </h2>
          <p
            className={`flex mxs:text-base text-sm justify-center text-primary1 font-semibold mb-4 md:mb-6 max-sm:items-center max-sm:justify-center text-center`}
          >
            Please enter a new password and repeat it
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col md:justify-center space-y-4 m-auto xs:w-96`}
          >
            <div className="flex flex-col">
              <div className="flex flex-col mt-4 justify-center">
                <input
                  type="password"
                  {...register("password")}
                  className={`block border-l-[10px] max-md:h-11 max-md:py-1 max-md:text-sm w-full max-sm:text-sm px-4 py-2 h-12 max-sm:h-10 max-sm:py-1 m-0 shadow-md text-base font-semibold text-semi transition ease-in-out bg-primary3 border border-solid rounded-lg form-control bg-clip-padding focus:text-semi focus:bg-primary3  focus:outline-none  ${
                    errors.password
                      ? "is-invalid border-l-cancel border-cancel focus:border-cancel"
                      : "border-l-primary1 border-primary1 focus:border-primary1"
                  }`}
                  placeholder="New password"
                  name="password"
                />
                <div className="mt-1 ml-4 font-medium text-cancel">
                  {errors.password?.message}
                </div>
              </div>

              <div className="flex flex-col mt-4 justify-center">
                <input
                  type="password"
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className={`block max-sm:h-10 max-md:h-11 max-md:py-1 max-md:text-sm max-sm:py-1 max-sm:text-sm border-l-[10px] w-full px-4 py-2 h-12 m-0 shadow-md text-base font-semibold text-semi transition ease-in-out bg-primary3 border border-solid rounded-lg form-control bg-clip-padding focus:text-semi focus:bg-primary3 focus:outline-none  ${
                    errors.confirmPassword
                      ? "is-invalid border-l-cancel border-cancel focus:border-cancel"
                      : "border-l-primary1 border-primary1 focus:border-primary1"
                  }`}
                />
                <div className="mt-1 ml-4 font-medium text-cancel">
                  {errors.confirmPassword?.message}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0">
              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading}
              >
                <div className="flex gap-1">
                  {isLoading && (
                    <Oval
                      height={18}
                      width={18}
                      color="#ffff"
                      wrapperStyle={{}}
                      wrapperClass="max-sm:mt-[3.5px] mt-[5.2px] max-lg:mt-[5.2px]"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="gray-primary"
                      strokeWidth={6}
                      strokeWidthSecondary={6}
                    />
                  )}

                  <div className="normal-case">Submit</div>
                </div>
              </Button>
            </div>

            {/* {resetPasswordData === null
              ? ''
              : !resetPasswordData?.data?.success && (
                  <div className="flex justify-center mt-4">
                    <p className="text-cancel">{resetPasswordData?.errorMsg}</p>
                  </div>
                )} */}

            <div id="resetPwdmsg" className="py-2 m-2 text-sm">
              <div>
                <p
                  className="text-cancel"
                  dangerouslySetInnerHTML={{ __html: errorMsg }}
                ></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};


export default ResetPassword;
