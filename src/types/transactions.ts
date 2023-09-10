export type Transaction = {
  transaction_id: number;
  amount: number;
  note: string;
  type: string;
  date: string;
  user_id: number;
  category_id: number;
  category: string;
  created_at: string;
  updated_at: string;
};

export type TransactionsResponse = {
  status: string;
  data: {
    total: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    total_income: number;
    total_expenses: number;
    balance: number;
    transactions: Transaction[];
  };
};

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
