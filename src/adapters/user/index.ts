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

export const login = async (
  data: LoginParams
): Promise<AxiosResponse<LoginResponse>> => {
  return await postRequest<LoginResponse>(`${WEB_API_URL}/login`, data);
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (
  data: RegisterParams
): Promise<AxiosResponse<LoginResponse>> => {
  return await postRequest<LoginResponse>(`${WEB_API_URL}/register`, data);
};
