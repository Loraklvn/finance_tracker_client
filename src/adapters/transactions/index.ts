import { AxiosResponse } from 'axios';

import { WEB_API_URL, getRequest } from '../helpers';

import {
  TransactionsResponse,
  TransactionsSummaryByCategoryResponse,
} from '@/src/types/transactions';

export type TransactionsParams = {
  page?: number;
  pageSize?: number;
  startDate: string;
  endDate: string;
};

export const getTransactions = async (
  params: TransactionsParams
): Promise<AxiosResponse<TransactionsResponse>> => {
  return await getRequest<TransactionsResponse>(`${WEB_API_URL}/transaction`, {
    params,
  });
};

export type TransactionsSummaryByCategoryParams = {
  startDate: string;
  endDate: string;
};

export const getTransactionsSummaryByCategories = async (
  params: TransactionsSummaryByCategoryParams
): Promise<AxiosResponse<TransactionsSummaryByCategoryResponse>> => {
  return await getRequest<TransactionsSummaryByCategoryResponse>(
    `${WEB_API_URL}/transaction/summary/category`,
    { params }
  );
};
