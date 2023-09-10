import { AxiosResponse } from 'axios';

import { WEB_API_URL, getRequest } from '../helpers';

import { CategoriesResponse } from '@/src/types/category';

export const getCategories = async (): Promise<
  AxiosResponse<CategoriesResponse>
> => {
  return await getRequest<CategoriesResponse>(`${WEB_API_URL}/category`, {});
};
