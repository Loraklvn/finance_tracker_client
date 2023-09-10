import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '../Navbar';

import useAuth from '@/src/hooks/useAuth';

const PrivateRoutesWrapper = (): ReactElement => {
  const { logout, isAuth } = useAuth();
  return isAuth ? (
    <>
      <Navbar logout={logout} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoutesWrapper;
