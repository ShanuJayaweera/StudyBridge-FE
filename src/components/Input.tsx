import { FC } from 'react';
import CN from 'classnames';

export interface InputProps {
  [x: string]: any;
  apparence?: 'globel' | 'checkbox ' | 'textarea' | 'otp' | 'search';
  type?: string;
  placeholder?: string;
  onChange?: any;
}

export const Input: FC<InputProps> = ({ className, type, placeholder, apparence, onChange, ...restProps }: InputProps) => {
  const InputClasses = CN(
    'input',
    {
      'block border-l-[#488BF3] border-l-[10px] w-full px-4 py-2 h-12 m-1 shadow-md text-base font-semibold text-[#9D9D9D] transition ease-in-out bg-[#F3F3F3] border border-gray-300 border-solid rounded-lg form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none':
        apparence === 'globel',
      'absolute w-[90%] h-[90%] bg-[#F3F3F3] focus:outline-none text-center font-extrabold text-2xl text-[#4583F3] rounded-md': apparence === 'otp',
    },
    className,
  );

  return <input type={type} className={InputClasses} {...restProps} placeholder={placeholder} onChange={onChange} />;
};


export default Input;
