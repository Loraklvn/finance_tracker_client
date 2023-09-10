export type CategorySummary = {
  category_id: 24;
  category: string;
  type: string;
  total: number;
  last_transaction_date: string;
};

export type TransactionsSummaryByCategoryResponse = {
  status: string;
  data: {
    total_income: number;
    total_expenses: number;
    balance: number;
    expenses: CategorySummary[];
    income: CategorySummary[];
  };
};
