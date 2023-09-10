import { AxiosResponse } from 'axios';

import { WEB_API_URL, getRequest, postRequest } from '../helpers';

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

export type CreateTransactionParams = {
  amount: number;
  note?: string;
  type: string;
  category_id: number;
  date: string;
};

export const createTransaction = async (
  data: CreateTransactionParams
): Promise<AxiosResponse> => {
  return await postRequest(`${WEB_API_URL}/transaction`, data);
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
