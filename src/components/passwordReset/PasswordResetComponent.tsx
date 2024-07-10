import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { cn } from '../../utils';
import Button from '../common/Button';
import Input from '../common/Input';
import { emailSchema } from '../../utils/schemas';
import { useResetPasswordMutation } from '../../services/resetPassword';
import { useAppSelector } from '../../hooks/customHooks';
interface UserData {
  email: string;
}

const PasswordResetComponent = () => {
  const token: string | undefined = useAppSelector(state => state.user.token)?.replace(/"/g, '');
  const navigate = useNavigate();
  useEffect(() => {
    if (token !== undefined) {
      navigate('/login');
    }
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(emailSchema),
  });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: UserData) => {
    try {
      const res = await resetPassword(data.email).unwrap();
      toast.success(res.message || 'Password reset email sent, Please verify your email!');
      reset();
    } catch (err) {
      toast.error('Failed to send email, check your provided email and try again!');
    }
  };
  return (
    <main className='flex-grow'>
      <h1 className={cn('font-roboto text-center mt-6 sm:text-3xl text-xl')}>Forgot Password?</h1>
      <form
        action='#'
        className={cn(
          'font-roboto sm:shadow-xl mt-4 mb-12 sm:mt-10 h-1/2 md:w-1/2 lg:w-1/3 mx-auto py-12 px-4 flex flex-col gap-4 sm:border-darkGreen sm:border-2 rounded-lg sm:w-3/4 w-full'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type='text' placeholder='Type your email' label='Email' id='email' {...register('email')} />
        {errors.email && <p className={cn('text-sm text-redColor -mt-4')}>{errors.email.message}</p>}
        <Button type='submit' text={!isLoading ? 'Reset Password' : 'Sending Email...'} />
      </form>
    </main>
  );
};

export default PasswordResetComponent;
