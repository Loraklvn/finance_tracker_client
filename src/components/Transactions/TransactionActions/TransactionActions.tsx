import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactElement } from 'react';

type TransactionActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const TransactionActions = ({
  onEdit,
  onDelete,
}: TransactionActionsProps): ReactElement => {
  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Button
            className="flex gap-1 px-3 py-1 text-sm leading-6 text-yellow-600  hover:brightness-50"
            onClick={onEdit}
          >
            <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Edit
          </Menu.Button>

          <Menu.Button
            className="flex gap-1 px-3 py-1 text-sm leading-6 text-red-600 hover:brightness-75"
            onClick={onDelete}
          >
            <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Delete
          </Menu.Button>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default TransactionActions;
