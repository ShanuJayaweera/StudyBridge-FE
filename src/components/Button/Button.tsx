import React, { FC, ReactNode } from 'react';
import CN from 'classnames';

export interface ButtonProps {
  [x: string]: any;
  children?: string | ReactNode;
  apparence?: 'default' | 'success' | 'danger' | 'gray' | 'back' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  view?: 'default' | 'ghoust' | 'gray';
  iconBefore?: string | ReactNode;
  iconSVG?: string;
  iconAfter?: string | ReactNode;
  action?: any;
  type?: string;
  optSubmit?: any;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ className, children, apparence, iconBefore, iconAfter, action, size, view, type, iconSVG, isLoading, ...restProps }: ButtonProps) => {
  const ButtonClasses = CN(
    'button gap-x-1 flex',
    {
      'bg-green-600': apparence === 'success',
      'bg-blue-600': apparence === 'default',
      'bg-red-600': apparence === 'danger',
      'bg-transparent border border-primary4': apparence === 'gray',
      ' ': apparence === 'none',
      'bg-[#488BF3]': isLoading,
      'border-semi': action,
    },
    {
      'opacity-70 cursor-not-allowed': isLoading,
    },
    {
      'inline-block w-full max-sm:py-2 justify-center max-sm:w-full max-sm:text-base m-1 px-2 py-2 text-lg font-semibold text-white transition duration-150 ease-in-out bg-primary4 rounded-lg shadow-md  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg':
        size === 'lg',
      'inline-block w-full m-1 py-2 text-sm text-black font-semibold text-white transition duration-150 ease-in-out rounded-md shadow-lg px-7 hover:bg-gray-200 hover:shadow-xl focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg':
        size === 'md',
      'flex justify-center items-center lg:text-base lg:h-auto font-medium gap-3 py-2 top-[140px] tracking-[0.025em] no-underline shadow-md  lg:px-5 hover:shadow-hoverShadow bg-primary4 text-primary1 border border-solid border-primary1 rounded hover:no-underline visited:text-purple-700 right-2 md:text-[13px] max-lg:px-4':
        view === 'ghoust',
      'flex justify-center items-center text-white lg:text-base lg:h-auto font-medium gap-3 py-2 top-[140px] tracking-[0.025em] no-underline  lg:px-5 bg-primary4 rounded hover:no-underline visited:text-purple-700 right-2 hover:shadow-hoverShadow md:text-base max-lg:px-4 text-primary3':
        view === 'default',
      'flex px-6 py-2 font-medium text-center text-semi rounded whitespace-pre hover:outline hover:outline-1 text-primary4 hover:outline-semi flex justify-center items-center lg:text-base lg:h-auto font-medium gap-3 py-2 top-[140px] tracking-[0.025em] no-underline  lg:px-5 bg-transparent border-primary4 rounded hover:no-underline visited:text-purple-700 right-2 md:text-base max-lg:px-4 text-primary3':
        apparence === 'gray',
      'flex gap-3 px-2 py-2 text-base bg-white font-medium text-center text-semi rounded whitespace-pre': apparence === 'back',
    },

    className,
  );

  const isDisabled = isLoading;

  return (
    <button typeof={type} className={className ? className : ButtonClasses} disabled={isDisabled} {...restProps}>
      {iconBefore && iconBefore}
      {iconSVG && <img src={iconSVG} alt="" />}
      {children && <div className="">{children}</div>}
      {iconAfter && iconAfter}
    </button>
  );
};

export default Button;
