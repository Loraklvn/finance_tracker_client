import { ReactElement } from 'react';

import { CategorySummary } from '@/src/types/transactions';
import { formatToMoney, getDisplyDate, getRandomColor } from '@/src/utils';

type SummaryByCategoryListProps = {
  summaries: CategorySummary[];
};

const SummaryByCategoryList = ({
  summaries,
}: SummaryByCategoryListProps): ReactElement => {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-8"
    >
      {summaries.map((summary) => {
        return (
          <li
            key={summary.category_id}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-x-4  border-b border-gray-900/5 bg-gray-100 p-1 sm:p-4">
              <div
                style={{ backgroundColor: getRandomColor() }}
                className="h-8 w-8 sm:h-12 sm:w-12 flex-none rounded-lg shadow-sm ring-1 ring-gray-900/10"
              />
              <div className="text- font-medium leading-6 text-gray-900">
                {summary.category}
              </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-2 sm:px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Last transaction</dt>
                <dd className="text-gray-700">
                  <time dateTime={summary.last_transaction_date}>
                    {getDisplyDate(new Date(summary.last_transaction_date))}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Amount</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">
                    ${formatToMoney(summary.total)}
                  </div>
                </dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
};
export default SummaryByCategoryList;
