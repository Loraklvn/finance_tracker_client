import {
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ReactElement } from 'react';

import Button from '@/components/form/Button';

type ErrorFeedbackProps = {
  errorTitle: string;
  errorMessage: string;
};

const ErrorFeedback = ({
  errorTitle,
  errorMessage,
}: ErrorFeedbackProps): ReactElement => {
  return (
    <div className="h-96 flex justify-center items-center">
      <div className="text-center">
        <div className="flex justify-center">
          <ExclamationCircleIcon className="w-10 h-10 text-orange-600" />
        </div>

        <h3 className="mt-2 font-medium text-orange-500">{errorTitle}</h3>
        <p className="mt-1 text-gray-500">{errorMessage}</p>
        <div className="mt-6">
          <Button type="button" onClick={(): void => window?.location.reload()}>
            Refrescar la página <ArrowPathIcon className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ErrorFeedback;
