import { AxiosResponse } from 'axios';

import { WEB_API_URL, getRequest, postRequest } from '../helpers';

import {
  CategoriesResponse,
  CreateCategoryResponse,
} from '@/src/types/category';

export const getCategories = async (): Promise<
  AxiosResponse<CategoriesResponse>
> => {
  return await getRequest<CategoriesResponse>(`${WEB_API_URL}/category`, {});
};

export type CreateCategoryParams = {
  value: string;
  description: string;
  type: string;
};
export const createCategory = async (
  data: CreateCategoryParams
): Promise<AxiosResponse<CreateCategoryResponse>> => {
  return await postRequest<CreateCategoryResponse>(
    `${WEB_API_URL}/category/user`,
    data
  );
};
