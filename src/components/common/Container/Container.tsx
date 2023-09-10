import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

import { classNames } from '@/src/utils';

export type ContainerProps = {
  className?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Container = ({
  className = '',
  ...props
}: ContainerProps): ReactElement => {
  return (
    <div
      className={classNames(
        'mx-auto max-w-7xl px-3 sm:px-6 lg:px-6 xl:px-2',
        className
      )}
      {...props}
    />
  );
};

export default Container;
