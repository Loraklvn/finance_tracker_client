import { ReactElement } from 'react';

import { formatToMoney } from '@/src/utils';

type TransactionsStatsProps = {
  balance: number;
  expenses: number;
  income: number;
};

const TransactionsStats = ({
  balance,
  expenses,
  income,
}: TransactionsStatsProps): ReactElement => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Balance
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            <span
              className={` ${
                (balance as number) > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              ${formatToMoney(balance)}
            </span>
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Income
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            ${formatToMoney(income)}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Expenses
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            ${formatToMoney(expenses)}
          </dd>
        </div>
      </dl>
    </div>
  );
};
export default TransactionsStats;
