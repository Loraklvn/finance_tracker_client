/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ReactElement, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import CreateCategoryModal from '../CreateCategoryModal';
import CreateTransactionModal from '../CreateTransactionModal/CreateTransactionModal';

import CustomDateInput from '@/components/common/CustomDateInput';
import Button from '@/components/form/Button';
import { formatToMoney } from '@/src/utils';

type TransactionsHeadingProps = {
  title: string;
  balance: number;
  dateRange: [Date | null, Date | null];
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
  onCreateTransSuccess: () => void;
};

const TransactionsHeading = ({
  title,
  balance,
  dateRange,
  setDateRange,
  onCreateTransSuccess,
}: TransactionsHeadingProps): ReactElement => {
  const [startDate, endDate] = dateRange;
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState<boolean>(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] =
    useState<boolean>(false);

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <CreateTransactionModal
        show={showCreateTransactionModal}
        onClose={setShowCreateTransactionModal}
        onRefetch={onCreateTransSuccess}
      />

      <CreateCategoryModal
        show={showCreateCategoryModal}
        onClose={setShowCreateCategoryModal}
      />

      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-lg text-gray-500">
            <CurrencyDollarIcon
              className="mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Balance:{' '}
            <span
              className={`font-semibold ml-1 ${
                balance > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              ${formatToMoney(balance) || 0}
            </span>
          </div>
          <div className="mt-2 flex items-center text-lg text-gray-500">
            <CalendarIcon
              className="mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <ReactDatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update): void => {
                setDateRange(update);
              }}
              isClearable={true}
              customInput={<CustomDateInput />}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 sm:gap-0 lg:ml-4 lg:mt-0">
        <span className="ml-3 block">
          <button
            color="white"
            type="button"
            onClick={(): void => setShowCreateCategoryModal(true)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add a category
          </button>
        </span>

        <span className="sm:ml-3">
          <Button
            onClick={(): void => setShowCreateTransactionModal(true)}
            type="button"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Transaction
          </Button>
        </span>
      </div>
    </div>
  );
};
export default TransactionsHeading;
