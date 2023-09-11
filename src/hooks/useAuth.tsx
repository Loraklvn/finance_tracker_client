import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

import { AUTH_COOKIE_NAME } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserAuth } from '../redux/slices/userSlice';
import { User } from '../types/user';

type AuthResponse = {
  user: User | null;
  isAuth: boolean;
  logout: () => void;
  setAuthInfo: (user: User, token: string) => void;
};

const useAuth = (): AuthResponse => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const logout = (): void => {
    Cookies.remove(AUTH_COOKIE_NAME);
    location.reload();
  };

  const setAuthInfo = (passedUser: User, token: string): void => {
    Cookies.set(AUTH_COOKIE_NAME, token);
    dispatch(setUserAuth({ user: passedUser }));
  };

  useEffect(() => {
    const authToken = Cookies.get(AUTH_COOKIE_NAME);

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken) as User;
        dispatch(setUserAuth({ user: decodedToken }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('JWT decoding error:', error);
        logout();
      }
    }
  }, []);

  return {
    user,
    isAuth,
    logout,
    setAuthInfo,
  };
};

export default useAuth;
