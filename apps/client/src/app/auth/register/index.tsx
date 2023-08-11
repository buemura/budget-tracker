import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/features/AuthForm/Button';
import { Input } from '../../../components/features/AuthForm/Input';
import { useRouterNavigate } from '../../../hooks/useRouterNavigate';
import { authService } from '../../../services/http/auth-service';

export default function Register() {
  const { routerNavigate } = useRouterNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await authService.register({ name, email, password });
      setIsLoading(false);
      return routerNavigate('/auth/login');
    } catch (error: any) {
      alert('Registration failed');
      location.reload();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-200">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 sm:w-4/5 md:w-4/5 lg:w-1/3"
      >
        <h1 className="font-medium uppercase text-2xl mb-8">Register</h1>

        <Input label="Name" type="text" setInputValue={setName} />
        <Input label="Email" type="text" setInputValue={setEmail} />
        <Input label="Password" type="password" setInputValue={setPassword} />
        <div className="mt-3">
          <Button label="Register" isLoading={isLoading} />
        </div>

        <div className="flex mt-4">
          <p className=" text-neutral-400">Already registered?&nbsp;</p>
          <Link className="text-neutral-500 hover:underline" to={'/auth/login'}>
            Click hete to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
