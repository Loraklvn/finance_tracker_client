import React, { InputHTMLAttributes } from 'react';

import { classNames } from '@/src/utils';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  inputSize?: 'sm' | 'normal' | 'lg';
}

const sizes = {
  sm: 'py-1',
  normal: 'py-2',
  lg: 'py-3',
};

const Select = ({
  inputSize = 'normal',
  className = '',
  children,
  ...props
}: SelectProps): React.ReactElement => {
  const classes = classNames(
    'mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm',
    sizes[inputSize],
    className
  );

  return (
    <select className={classes} {...props}>
      {children}
    </select>
  );
};
export default Select;
