import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Fragment, ReactElement, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CustomDateInput from '../CustomDateInput';

import Button from '@/components/form/Button';
import InputNumber from '@/components/form/InputNumber';
import InputText from '@/components/form/InputText';
import Select from '@/components/form/Select';
import { getCategories } from '@/src/adapters/category';
import {
  CreateTransactionParams,
  createTransaction,
} from '@/src/adapters/transactions';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/src/constants/meessages';

type CreateTransactionModalProps = {
  show: boolean;
  onClose: (status: boolean) => void;
  onRefetch: () => void;
};

const CreateTransactionModal = ({
  show,
  onClose,
  onRefetch,
}: CreateTransactionModalProps): ReactElement => {
  const { register, reset, handleSubmit } = useForm<CreateTransactionParams>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'expense'
  );

  const { data: categoriesRes, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories', show],
    enabled: show,
    queryFn: getCategories,
    onError: () => {
      toast.error(ERROR_MESSAGES.LOADING_CATEGORIES);
    },
  });
  const categories =
    categoriesRes?.data?.data?.categories?.filter(
      (category) => category.type === selectedType
    ) || [];

  const { mutate, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      reset();
      onClose(false);
      onRefetch();
      toast.success(SUCCESS_MESSAGES.CREATING_TRANSACTION);
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.CREATING_TRANSACTION);
    },
  });

  const loading = isLoading || isCategoryLoading;

  const submitHandler = async (
    data: CreateTransactionParams
  ): Promise<void> => {
    mutate({ ...data, date: selectedDate?.toISOString() });
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-2 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hiddens rounded-lg bg-white pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[500px]">
                <form
                  role="form"
                  onSubmit={handleSubmit(submitHandler)}
                  className={`border-b border-gray-900/10 p-6 ${
                    loading ? 'pointer-events-none bg-gray-50 opacity-60' : ''
                  }`}
                >
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Create a new transaction
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Amount
                      </label>
                      <div className="mt-2">
                        <InputNumber
                          register={register('amount', {
                            required: true,
                            valueAsNumber: true,
                          })}
                          id="amount"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type
                      </label>
                      <div className="mt-2">
                        <Select
                          register={register('type', {
                            required: true,
                            value: selectedType,
                            onChange: (e) =>
                              setSelectedType(
                                e.target.value as 'expense' | 'income'
                              ),
                          })}
                        >
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </Select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="category_id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <div className="mt-2">
                          <Select
                            register={register('category_id', {
                              required: true,
                            })}
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.description}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date
                      </label>
                      <div className="mt-2">
                        <ReactDatePicker
                          selected={selectedDate}
                          onChange={(update): void => {
                            setSelectedDate(update as Date);
                          }}
                          customInput={<CustomDateInput />}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="note"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Note (optional)
                      </label>
                      <div className="mt-2">
                        <InputText
                          register={register('note', { required: false })}
                          id="note"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-6 pt-3 flex items-center justify-end gap-x-6 border-t border-gray-300">
                    <Button
                      onClick={(): void => onClose(false)}
                      type="button"
                      color="white"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Guardar</Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CreateTransactionModal;
