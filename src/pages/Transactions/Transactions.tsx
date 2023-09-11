import { useMutation, useQuery } from '@tanstack/react-query';
import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';

import ConfirmationModal from '@/components/common/ConfirmationModal';
import Container from '@/components/common/Container';
import EmptyTransactionsFeedback from '@/components/common/EmptyTransactionsFeedback';
import ErrorFeedback from '@/components/common/ErrorFeedback';
import LoadingContainer from '@/components/common/LoadingContainer';
import TransactionsHeading from '@/components/common/TransactionsHeading';
import TransactionsList from '@/components/Transactions/TransactionsList';
import TransactionsStats from '@/components/Transactions/TransactionsStats';
import {
  deleteTransaction,
  getTransactions,
} from '@/src/adapters/transactions';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/src/constants/meessages';
import { useAppDispatch } from '@/src/redux/hooks';
import {
  setIsEditingTransaction,
  setShowCreateTransactionModal,
} from '@/src/redux/slices/transactionSlice';
import { Transaction } from '@/src/types/transactions';
import { getFilterDate, getFirstDayOfMonthDate } from '@/src/utils';

const Transactions = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    getFirstDayOfMonthDate(),
    new Date(),
  ]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions-history'],
    enabled: !!dateRange[0] && !!dateRange[1],
    queryFn: () =>
      getTransactions({
        startDate: getFilterDate(dateRange[0] as Date),
        endDate: getFilterDate(dateRange[1] as Date),
      }),
  });
  const { mutate } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      setShowConfirmationModal(false);
      refetch();
      toast.success(SUCCESS_MESSAGES.DELETE_TRANSACTION);
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.DELETE_TRANSACTION);
    },
  });

  const transactionsData = data?.data?.data;

  const isEmpty =
    !isLoading &&
    !isError &&
    !transactionsData?.total_expenses &&
    !transactionsData?.total_income;
  const showLoading = isLoading && !data;

  const handleDeleteTransaction = (): void => {
    if (selectedTransaction) {
      mutate(selectedTransaction.transaction_id);
    }
  };

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
      <ConfirmationModal
        open={showConfirmationModal}
        title="Delete transaction"
        description="Are you sure you want to delete this transaction?"
        onConfirm={handleDeleteTransaction}
        onCancel={(): void => setShowConfirmationModal(false)}
      />

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
              onDeleteTransaction={(transaction: Transaction): void => {
                setSelectedTransaction(transaction);
                setShowConfirmationModal(true);
              }}
              onEditTransaction={(transaction: Transaction): void => {
                dispatch(setShowCreateTransactionModal(true));
                dispatch(
                  setIsEditingTransaction({ isEditng: true, transaction })
                );
              }}
            />
          </div>
        )}
      </Container>
    </article>
  );
};
export default Transactions;
