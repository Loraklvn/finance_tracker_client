import { AxiosResponse } from 'axios';

import { WEB_API_URL, postRequest } from '../helpers';

import { User } from '@/src/types/user';

export type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: 'success';
  data: {
    token: string;
    user_data: User;
  };
};

export const login = async (data: LoginParams): Promise<AxiosResponse> => {
  return await postRequest<LoginResponse>(`${WEB_API_URL}/login`, data);
};
