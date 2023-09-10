import { AxiosResponse } from 'axios';

import { WEB_API_URL, getRequest } from '../helpers';

import { TransactionsSummaryByCategoryResponse } from '@/src/types/transactions';

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
