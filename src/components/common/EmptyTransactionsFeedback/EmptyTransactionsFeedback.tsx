import { PlusIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { ReactElement } from 'react';

import Button from '@/components/form/Button';

type EmptyTransactionsFeedbackProps = {
  onAddTransactionClick: () => void;
};

const EmptyTransactionsFeedback = ({
  onAddTransactionClick,
}: EmptyTransactionsFeedbackProps): ReactElement => {
  return (
    <div className="text-center mt-44">
      <BanknotesIcon className="mx-auto h-12 w-12 text-green-500" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        No transactions were made on this date range.
      </h3>
      <div className="mt-6">
        <Button onClick={onAddTransactionClick} type="button">
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add a new transaction
        </Button>
      </div>
    </div>
  );
};
export default EmptyTransactionsFeedback;
