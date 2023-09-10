import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import Container from '@/components/common/Container';
import EmptyTransactionsFeedback from '@/components/common/EmptyTransactionsFeedback';
import ErrorFeedback from '@/components/common/ErrorFeedback';
import LoadingContainer from '@/components/common/LoadingContainer';
import HomeHeading from '@/components/Home/HomeHeading';
import SummaryByCategoryList from '@/components/Home/SummaryByCategoryList';
import { getTransactionsSummaryByCategories } from '@/src/adapters/transactions';
import {
  formatToMoney,
  getFilterDate,
  getFirstDayOfMonthDate,
} from '@/src/utils';

const Home = (): React.ReactElement => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    getFirstDayOfMonthDate(),
    new Date(),
  ]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    enabled: !!dateRange[0] && !!dateRange[1],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
        <HomeHeading
          setDateRange={setDateRange}
          dateRange={dateRange}
          balance={summary?.balance || 0}
        />

        {isEmpty ? (
          <EmptyTransactionsFeedback />
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