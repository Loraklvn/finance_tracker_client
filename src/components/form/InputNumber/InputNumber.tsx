import React, { InputHTMLAttributes } from 'react';

import { classNames } from '@/src/utils';

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'normal' | 'lg';
}

const sizes = {
  sm: 'py-1',
  normal: 'py-2',
  lg: 'py-3',
};

const InputNumber = ({
  inputSize = 'normal',
  className = '',
  ...props
}: InputNumberProps): React.ReactElement => {
  const classes = classNames(
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    sizes[inputSize],
    className
  );

  return <input type="number" className={classes} {...props} />;
};
export default InputNumber;
