import React from 'react';

import Spinner from '../Spinner';

type LoadingContainerProps = {
  isLoading: boolean;
  className?: string;
};

const LoadingContainer = ({
  isLoading,
  className,
}: LoadingContainerProps): React.ReactElement => {
  if (!isLoading) return <></>;
  return (
    <div className={`h-96 flex justify-center items-center ${className}`}>
      <div className="text-center">
        <Spinner loading size="w-12 h-12" textColor="text-primary" />
      </div>
    </div>
  );
};
export default LoadingContainer;
