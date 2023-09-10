import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { Fragment, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/form/Button';
import InputText from '@/components/form/InputText';
import Select from '@/components/form/Select';
import { CreateCategoryParams, createCategory } from '@/src/adapters/category';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/src/constants/meessages';

type CreateCategoryModalProps = {
  show: boolean;
  onClose: (status: boolean) => void;
};

const CreateCategoryModal = ({
  show,
  onClose,
}: CreateCategoryModalProps): ReactElement => {
  const { register, reset, handleSubmit } = useForm<CreateCategoryParams>();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset();
      onClose(false);
      toast.success(SUCCESS_MESSAGES.CREATING_CATEGORY);
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.CREATING_CATEGORY);
    },
  });

  const loading = isLoading;

  const submitHandler = async (data: CreateCategoryParams): Promise<void> => {
    mutate({ ...data, value: data.description.toLocaleLowerCase() });
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
                    Create a new category
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <InputText
                          register={register('description', { required: true })}
                          id="description"
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
                        <Select register={register('type', { required: true })}>
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </Select>
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
export default CreateCategoryModal;
