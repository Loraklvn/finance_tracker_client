import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import Container from '@/components/common/Container';
import EmptyTransactionsFeedback from '@/components/common/EmptyTransactionsFeedback';
import ErrorFeedback from '@/components/common/ErrorFeedback';
import LoadingContainer from '@/components/common/LoadingContainer';
import TransactionsHeading from '@/components/common/TransactionsHeading';
import SummaryByCategoryList from '@/components/Home/SummaryByCategoryList';
import { getTransactionsSummaryByCategories } from '@/src/adapters/transactions';
import { useAppDispatch } from '@/src/redux/hooks';
import { setShowCreateTransactionModal } from '@/src/redux/slices/transactionSlice';
import {
  formatToMoney,
  getFilterDate,
  getFirstDayOfMonthDate,
} from '@/src/utils';

const Home = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    getFirstDayOfMonthDate(),
    new Date(),
  ]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions'],
    enabled: !!dateRange[0] && !!dateRange[1],
    queryFn: () =>
      getTransactionsSummaryByCategories({
        startDate: getFilterDate(dateRange[0] as Date),
        endDate: getFilterDate(dateRange[1] as Date),
      }),
  });

  const summary = data?.data?.data;

  const isEmpty =
    !isLoading &&
    !isError &&
    !summary?.total_expenses &&
    !summary?.total_income;
  const showLoading = isLoading && !data;

  if (showLoading) {
    return <LoadingContainer isLoading className="h-[500px]" />;
  }

  if (isError) {
    return (
      <ErrorFeedback
        errorTitle="Something went wrong loading your transactions summary."
        errorMessage="Refresh the page to try again."
      />
    );
  }

  return (
    <article className="mt-4">
      <Container>
        <TransactionsHeading
          title="Finance Summary"
          setDateRange={setDateRange}
          dateRange={dateRange}
          balance={summary?.balance || 0}
          onCreateTransSuccess={refetch}
        />

        {isEmpty ? (
          <EmptyTransactionsFeedback
            onAddTransactionClick={(): void => {
              dispatch(setShowCreateTransactionModal(true));
            }}
          />
        ) : (
          <>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-red-500">
                Expenses:{' '}
                <span className="font-semibold text-gray-900">
                  ${formatToMoney(summary?.total_expenses || 0)}
                </span>
              </h3>

              <div className="mt-2">
                <SummaryByCategoryList summaries={summary?.expenses || []} />
              </div>
            </div>

            <div className="w-full border-t my-6 sm:my-10 border-gray-300" />

            <div className="mt-">
              <h3 className="text-lg font-semibold text-green-500">
                Income:{' '}
                <span className="font-semibold text-gray-900">
                  ${formatToMoney(summary?.total_income || 0)}
                </span>
              </h3>
              <div className="mt-2">
                <SummaryByCategoryList summaries={summary?.income || []} />
              </div>
            </div>
          </>
        )}
      </Container>
    </article>
  );
};
export default Home;
