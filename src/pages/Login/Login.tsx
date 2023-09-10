import { useMutation } from '@tanstack/react-query';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/form/Button';
import InputText from '@/components/form/InputText';
import { LoginParams, login } from '@/src/adapters/user';
import useAuth from '@/src/hooks/useAuth';

const Login = (): ReactElement => {
  const { register, handleSubmit } = useForm<LoginParams>();
  const navigate = useNavigate();
  const { isAuth, setAuthInfo } = useAuth();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: ({ data: { data } }) => {
      setAuthInfo(data.user_data, data.token);
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const submitHandler = async (props: LoginParams): Promise<void> => {
    mutate(props);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <InputText
                register={register('email')}
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <InputText
                register={register('password')}
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="#"
            className="font-semibold leading-6 text-primary hover:brightness-75"
          >
            Create a free account
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;
