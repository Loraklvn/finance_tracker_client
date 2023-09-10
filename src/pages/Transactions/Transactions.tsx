import { useQuery } from '@tanstack/react-query';
import { ReactElement, useState } from 'react';

import Container from '@/components/common/Container';
import EmptyTransactionsFeedback from '@/components/common/EmptyTransactionsFeedback';
import ErrorFeedback from '@/components/common/ErrorFeedback';
import LoadingContainer from '@/components/common/LoadingContainer';
import TransactionsHeading from '@/components/common/TransactionsHeading';
import TransactionsList from '@/components/Transactions/TransactionsList';
import TransactionsStats from '@/components/Transactions/TransactionsStats';
import { getTransactions } from '@/src/adapters/transactions';
import { getFilterDate, getFirstDayOfMonthDate } from '@/src/utils';

const Transactions = (): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    getFirstDayOfMonthDate(),
    new Date(),
  ]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions-history'],
    enabled: !!dateRange[0] && !!dateRange[1],
    queryFn: () =>
      getTransactions({
        startDate: getFilterDate(dateRange[0] as Date),
        endDate: getFilterDate(dateRange[1] as Date),
      }),
  });

  const transactionsData = data?.data?.data;

  const isEmpty =
    !isLoading &&
    !isError &&
    !transactionsData?.total_expenses &&
    !transactionsData?.total_income;
  const showLoading = isLoading && !data;

  if (showLoading) {
    return <LoadingContainer isLoading className="h-[500px]" />;
  }

  if (isError) {
    return (
      <ErrorFeedback
        errorTitle="Something went wrong loading your transactions history."
        errorMessage="Refresh the page to try again."
      />
    );
  }

  return (
    <article className="mt-4">
      <Container>
        <TransactionsHeading
          title="Transactions History"
          setDateRange={setDateRange}
          dateRange={dateRange}
          balance={transactionsData?.balance || 0}
          onCreateTransSuccess={refetch}
        />

        <TransactionsStats
          balance={transactionsData?.balance || 0}
          expenses={transactionsData?.total_expenses || 0}
          income={transactionsData?.total_income || 0}
        />

        {isEmpty ? (
          <EmptyTransactionsFeedback />
        ) : (
          <div className="mt-8">
            <TransactionsList
              transactions={transactionsData?.transactions || []}
              dateFrom={dateRange[0]}
              dateTo={dateRange[1]}
            />
          </div>
        )}
      </Container>
    </article>
  );
};
export default Transactions;
