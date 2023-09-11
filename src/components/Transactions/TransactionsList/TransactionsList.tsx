import { Fragment, ReactElement } from 'react';

import TransactionActions from '../TransactionActions';

import { Transaction } from '@/src/types/transactions';
import { formatToMoney, getDisplyDate } from '@/src/utils';

type TransactionsListProps = {
  dateFrom: Date | null;
  dateTo: Date | null;
  transactions: Transaction[];
  onDeleteTransaction: (transaction: Transaction) => void;
  onEditTransaction: (transaction: Transaction) => void;
};

const TransactionsList = ({
  transactions,
  dateFrom,
  dateTo,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionsListProps): ReactElement => {
  return (
    <>
      <div className="mt-6 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Description</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  <tr className="text-sm leading-6 text-gray-900">
                    <th
                      scope="colgroup"
                      colSpan={3}
                      className="relative isolate py-2 font-semibold"
                    >
                      <time>
                        {dateFrom && dateTo && (
                          <span>
                            {getDisplyDate(dateFrom)} - {getDisplyDate(dateTo)}
                          </span>
                        )}{' '}
                      </time>
                      <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                      <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                    </th>
                  </tr>
                  {transactions.map((transaction) => (
                    <tr key={transaction.transaction_id}>
                      <td className="relative py-5 pr-3 sm:pr-6">
                        <div className="flex gap-x-2 sm:gap-x-6">
                          <div className="flex-auto">
                            <div className="flex items-start gap-x-3">
                              <div className="text- font-medium leading-6 text-gray-900">
                                ${formatToMoney(transaction.amount)}
                              </div>
                            </div>
                            <div className="mt-1 text-sm leading-5 text-gray-500">
                              {transaction.type === 'income' ? (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  Income
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                  Expense
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                      </td>
                      <td className="py-5 pr-6 sm:table-cell">
                        <div className="mt-1 text-sm leading-5 text-gray-500">
                          {transaction.note}
                        </div>
                      </td>
                      <td className="py-5 text-right">
                        <div className="flex justify-end">
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {transaction.category}
                          </span>
                        </div>
                        <div className="mt-1 textsm leading-5 text-gray-500">
                          <span className="font-semibold">
                            {getDisplyDate(new Date(transaction.date))}
                          </span>
                        </div>
                      </td>
                      <td>
                        <TransactionActions
                          onDelete={(): void =>
                            onDeleteTransaction(transaction)
                          }
                          onEdit={(): void => {
                            onEditTransaction(transaction);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransactionsList;
