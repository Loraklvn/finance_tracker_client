import { AxiosResponse } from 'axios';

import {
  WEB_API_URL,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../helpers';

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

export type UpdateTransactionParams = {
  id: number;
  data: Partial<CreateTransactionParams>;
};

export const updateTransaction = async ({
  id,
  data,
}: UpdateTransactionParams): Promise<AxiosResponse> => {
  return await putRequest(`${WEB_API_URL}/transaction/${id}`, data);
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

export const deleteTransaction = async (id: number): Promise<AxiosResponse> => {
  return await deleteRequest(`${WEB_API_URL}/transaction/${id}`, {});
};
