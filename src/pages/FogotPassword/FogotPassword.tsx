import { FC, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { forgotPassword, resetErrMsg } from '../../store/reducers/auth/authSlice';
import Logo from "../../assets/images/logo.svg";

import { Oval } from 'react-loader-spinner';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import store from '../../store/store';


export interface FogotPasswordProps {
  [x: string]: any;
  email?: string;
}

type FormValues = {
  email: string;
};

export const FogotPassword: FC<FogotPasswordProps> = () => {

  const [userEmail, setUserEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const { isLoading, forgotPasswordData, errorMsg } = useAppSelector((state) => state.rootReducer.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('The selected email is invalid.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const forgotPasswordDetails = {
      ...data,
    };
    dispatch(forgotPassword(forgotPasswordDetails));
  };

  const onBlurHandler = (e: any) => {
    setUserEmail(e.target.value);
  };


  useEffect(() => {
    if (isValid && isSubmitted && isDirty) {
      setErrMessage(errorMsg);
    } else {
      store.dispatch(resetErrMsg());
    }
  }, [errorMsg, isValid, isSubmitting, isSubmitted, isDirty]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center bg-darkBg">
      <div className="w-full px-4 mx-auto md:max-w-xl lg:max-w-xl">
        <div className="bg-primaryDarkBg mxs:py-20 py-10 px-10 lg:py-16 rounded-lg">
          <div className="flex items-center justify-center">
            <img className="object-cover rounded-lg w-40" src={Logo} alt="#" />
          </div>
          <h2 className="mxs:text-2xl text-lg text-white font-bold mxs:my-8 my-5 text-center">
          Forgot Password?          </h2>
          <p className={`mxs:text-base text-sm justify-center text-white font-semibold mb-4 md:mb-6 max-sm:items-center max-sm:justify-center text-center ${forgotPasswordData?.data?.success ? 'hidden' : 'flex'}`}>
          Type in the email you registered with Study Bridge
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col md:justify-center space-y-4 m-auto xs:w-96 ${forgotPasswordData?.data?.success ? 'hidden' : 'flex'}`}>
            <div className="flex flex-col">
              <div className="flex flex-col mt-4 justify-center">
                <input
                  type="text"
                  {...register('email')}
                  className={`tracking-normal block max-sm:text-sm w-full px-4 py-2 max-sm:h-11 h-12 m-1 shadow-md text-base font-normal text-semi transition ease-in-out bg-transparent border border-solid rounded-lg form-control bg-clip-padding focus:text-semi focus:bg-primary3 focus:outline-none ${
                    errors.email || errorMsg ? 'is-invalid border-l-cancel border-cancel focus:border-cancel' : 'border-white'
                  }`}
                  placeholder="Email"
                  name="email"
                  id="email"
                  onBlur={onBlurHandler}
                />
                <div className="">
                  {/* {errors.email?.message} */}
                  {/* <p className="mt-1 ml-4 font-medium text-cancel">{errors.email?.message}</p> */}
                  <p className="mt-1 ml-4 font-medium text-cancel" dangerouslySetInnerHTML={{ __html: errors.email?.message ? errors.email?.message : errMessage }}></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0">
              <Button type="submit" isLoading={isLoading} disabled={isLoading || !isDirty} size="lg">
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

                  <div className="normal-case font-normal text-base">
                  Submit
                  </div>
                </div>
              </Button>
              {/* <div id="forgotPwdErr" className="py-2 m-2 text-sm text-center">
                <div>
                  <p className="mt-1 font-medium text-cancel" dangerouslySetInnerHTML={{ __html: errorMsg }}></p>
                </div>
              </div> */}
            </div>
          </form>

          <div className="flex flex-col md:justify-center space-y-4 m-auto xs:w-5/6">
            {forgotPasswordData === null
              ? ' '
              : forgotPasswordData?.data?.success && (
                  <div className="p-0 m-2 font-semibold mxs:text-base text-sm text-success">
                    <p className="text-center">
                    You will soon receive an email at {userEmail} with a link that will allow you to reset your password
                    </p>
                  </div>
                )}
          </div>

          {forgotPasswordData?.data?.success ? (
            <div className="flex justify-center mt-8 mb-0">
              <button
                type="button"
                className="font-semibold mxs:text-base text-sm transition duration-200 ease-in-out text-primary1 hover:text-blue-700 focus:text-blue-700 active:text-blue-800"
                disabled={isLoading}
                onClick={() => navigate('/auth/login')}
              >
                <div className="flex justify-center flex-row items-center gap-2">
                  <span>
                    <FaArrowLeftLong />
                  </span>
                  <span>
                  Back to Login
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-3 mt-4 max-sm:gap-2 font-normal text-white whitespace-pre">
                <p className="max-sm:text-xs">
                Did you remember your password?
                </p>
                <Link className="text-white font-bold max-sm:text-xs" to="/auth/login" style={{ textDecoration: 'none' }}>
                Try logging in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};


export default FogotPassword;
