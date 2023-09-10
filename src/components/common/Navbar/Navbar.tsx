import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Account', href: '#' },
];

type NavbarProps = {
  logout: () => void;
};

const Navbar = ({ logout }: NavbarProps): React.ReactElement => {
  const { pathname } = useLocation();
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto w-full sm:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="Your Company" />
            </div>
            <div className=" sm:ml-6 flex space-x-1 sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center ${
                    item.href === pathname ? 'border-b-2 border-primary' : ''
                  } px-1 pt-1 text-sm font-medium text-gray-900`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center hover:brightness-75">
            <button
              className="text-sm font-medium text-gray-900 underline flex gap-2"
              onClick={logout}
            >
              Signout
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={logout}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
