import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { cn } from '../../utils';
import Button from '../common/Button';
import Input from '../common/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../utils/schemas';
import { useParams, useNavigate } from 'react-router-dom';

import { useNewPasswordMutation } from '../../services/resetPassword';

interface PasswordData {
  newPassword: string;
  passwordConfirm: string;
}
const NewPasswordComponent = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [mutate, { isLoading }] = useNewPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordData>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (data: PasswordData) => {
    try {
      const { newPassword } = data;
      const res = await mutate({ newPassword, token });
      if (res.error) {
        const { data } = res.error as any;
        return toast.error(data.error || 'Failed, please try again later!');
      } else {
        reset();
        const {
          data: { message },
        } = res;
        toast.success(message || 'Password reset successfully!');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };
  return (
    <main className='flex-grow'>
      <form
        action='#'
        className={cn(
          ' font-roboto shadow-xl mt-4 mb-12 lg:w-1/3 sm:mt-10 h-1/2 md:w-1/2 mx-auto py-12 px-4 flex flex-col gap-4 sm:border-darkGreen sm:border-2 rounded-lg sm:w-3/4 w-full'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type='password'
          placeholder='Type your new Password'
          label='New Password'
          id='newPassword'
          {...register('newPassword')}
        />
        {errors.newPassword && <p className={cn('text-sm text-redColor -mt-4')}>{errors.newPassword.message}</p>}
        <Input
          type='password'
          placeholder='Confirm your new Password'
          label='Confirm Password'
          id='passwordConfirm'
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <p className={cn('text-sm text-redColor -mt-4')}>{errors.passwordConfirm.message}</p>
        )}
        <Button type='submit' text={isLoading ? 'Loading...' : 'Change Password'} />
      </form>
    </main>
  );
};

export default NewPasswordComponent;
