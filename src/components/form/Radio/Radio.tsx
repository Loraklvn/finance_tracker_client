import React, { InputHTMLAttributes } from 'react';

import { classNames } from '@/src/utils';
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Radio = ({
  className = '',
  ...props
}: RadioProps): React.ReactElement => {
  const classes = classNames(
    'h-4 w-4 border-gray-300 text-primary focus:ring-green-500',
    className
  );

  return <input className={classes} type="radio" {...props} />;
};
export default Radio;
