import React, { ReactElement } from 'react';

import Container from '@/components/common/Container';
import useAuth from '@/src/hooks/useAuth';

const Account = (): ReactElement => {
  const { user } = useAuth();

  return (
    <main className="mt-4">
      <Container>
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Full name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">{user?.name}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">{user?.email}</div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </main>
  );
};
export default Account;
