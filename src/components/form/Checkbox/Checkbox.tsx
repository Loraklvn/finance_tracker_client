import React, { InputHTMLAttributes } from 'react';

import { classNames } from '@/src/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'normal' | 'lg';
}

const Checkbox = ({
  className = '',
  ...props
}: CheckboxProps): React.ReactElement => {
  const classes = classNames(
    'h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary',
    className
  );

  return <input className={classes} type="checkbox" {...props} />;
};
export default Checkbox;
