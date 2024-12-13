import { FC } from "react";
import CN from "classnames";
import Logo from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/store.hooks";
import { login } from "../../store/reducers/auth/authSlice";
import { LoginUser } from "../../store/reducers/auth/loginUser.interface";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

export interface LoginProps {
  [x: string]: any;
}

export const Login: FC<LoginProps> = ({
  className,
  ...restProps
}: LoginProps) => {
  const LoginClasses = CN("login overflow-hidden", className);

  const { isLoading, errorMsg } = useSelector(
    (state: any) => state.rootReducer.auth || {}
  );

  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginUser> = async (data: any) => {
    const loginUserAndClintToken: LoginUser = data;
    const loginUser = {
      username: loginUserAndClintToken.username,
      password: loginUserAndClintToken.password,
      // clientToken: localStorage.getItem('client'),
    };

    await dispatch(login(loginUser));
  };

  return (
    <motion.div
      className={LoginClasses}
      {...restProps}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className="flex h-screen items-center justify-center bg-darkBg">
        
          <form className="flex flex-col w-full max-w-lg md:p-16 p-8 rounded-lg bg-primaryDarkBg shadow-md justify-center max-lg:w-[65%] max-xl:w-[70%] max-sm:justify-start max-sm:w-[90%] max-md:w-[80%] max-md:justify-start z-50" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center">
            <img className="object-cover rounded-lg w-40" src={Logo} alt="#" />
          </div>
            <p className="py-6 text-2xl text-center max-sm:text-lg text-white font-bold">Hi, Welcome Back
            </p>
            <div className="mb-6 max-sm:mb-3">
              <input
                type="text"
                {...register('username')}
                name="username"
                id="email"
                className={`tracking-normal block max-sm:text-sm w-full px-4 py-2 max-sm:h-11 h-12 m-1 shadow-md text-base font-normal text-semi transition ease-in-out bg-transparent border border-solid rounded-lg form-control bg-clip-padding focus:text-semi focus:bg-primary3 focus:outline-none ${
                  errors.username ? 'is-invalid border-l-cancel border-cancel focus:border-cancel' : ' border-white'
                }`}
                placeholder="Username"
              />
              <div className="mt-1 ml-4 font-medium text-cancel">{errors.username?.message}</div>
            </div>
            <div className="mb-6 max-sm:mb-3">
              <input
                className={`block max-sm:text-sm w-full px-4 py-2 max-sm:h-11 h-12 m-1 shadow-md text-base font-normal text-semi transition ease-in-out bg-transparent border border-solid rounded-lg form-control bg-clip-padding focus:text-semi focus:bg-primary3 focus:outline-none ${
                  errors.password ? 'is-invalid border-l-cancel border-cancel focus:border-cancel' : 'border-white'
                }`}
                type="password"
                {...register('password')}
                placeholder="Password"
              />
              <div className="mt-1 ml-4 font-medium text-cancel">{errors.password?.message}</div>
            </div>

            <div className="flex items-center justify-end mb-6">
              <a href="/auth/forgot-password" className="hover:no-underline font-medium transition duration-200 ease-in-out text-white hover:text-blue-700 focus:text-primary1 active:text-primary1">
                Forgot Password?
              </a>
            </div>

            <Button isLoading={isLoading} size="lg" type="submit">
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
                <div className="font-normal text-base">Sign In</div>
              </div>
            </Button>

            <div id="errormsg" className="py-2 m-2 text-sm">
              <div>
                <p className="text-cancel" dangerouslySetInnerHTML={{ __html: errorMsg }}></p>
              </div>
            </div>
          </form>
        </div>
       

     
    </motion.div>
  );
};


export default Login;
