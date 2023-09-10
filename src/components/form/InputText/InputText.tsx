import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { classNames } from '@/src/utils';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'normal' | 'lg';
  register?: UseFormRegisterReturn;
  passedRef?: React.LegacyRef<HTMLInputElement> | undefined;
}

const sizes = {
  sm: 'py-1',
  normal: 'py-2',
  lg: 'py-3',
};

const InputText = ({
  inputSize = 'normal',
  className = '',
  register = {} as UseFormRegisterReturn,
  passedRef,
  ...props
}: InputTextProps): React.ReactElement => {
  const { ref: formRef, ...registerRest } = register;

  const classes = classNames(
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    sizes[inputSize],
    className
  );

  return (
    <input
      type="text"
      ref={passedRef || formRef}
      className={classes}
      {...props}
      {...registerRest}
    />
  );
};
export default InputText;
