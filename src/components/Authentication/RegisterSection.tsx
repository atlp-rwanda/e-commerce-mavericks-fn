import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '../../assets/googleIcon.svg';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { extendedSchema, ExtendedFormFields } from '../../utils/schemas';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRegistered } from '../../redux/slices/registerSlice';
import { useEffect } from 'react';
import { QueryErrorData } from '../../utils/schemas';
import { useRegisterUserMutation } from '../../services/authAPI';
import handleGoogleAuthentication from '../../utils/handleGoogleAuthentication';

const RegisterSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExtendedFormFields>({
    resolver: zodResolver(extendedSchema),
  });
  const [registerUser, { data, isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
  let loginData: any;

  const onSubmit: SubmitHandler<ExtendedFormFields> = async retrievedData => {
    const { password, lastName, firstName, gender, phoneNumber, email } = retrievedData;

    loginData = { password, lastName, firstName, gender, phoneNumber, email };
    await registerUser({ email, password, lastName, firstName, gender, phoneNumber });
  };
  useEffect(() => {
    const loginError = error as QueryErrorData;

    if (isError) {
      console.log(loginError);
      setError('root', {
        message: loginError.data?.error || loginError.data?.message,
      });
      if (/email is already used/gi.test(loginError.data?.error || (loginError.data?.message as string))) {
        setTimeout(() => {
          setError('root', {
            message: 'Redirecting you to login page....',
          });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }, 2000);
      }
      return;
    }
    if (isSuccess) {
      dispatch(setUserRegistered({ ...loginData }));
      navigate('/register/success');
    }
  }, [isLoading, isError, error, isSuccess, data]);

  return (
    <>
      <div
        className={`w-full xl:container flex flex-col-reverse gap-14 md:flex-row px-4 items-center md:gap-5 transition-all 
        md:justify-between md:px-10 lg:justify-around mt-5 md:mt-10 `}
      >
        <div className='w-full md:w-7/12 xl:w-4/12 '>
          <p className='font-bold text-3xl '>New Customer?</p>
          <p>Sign Up to continue</p>
          <form action='' className='flex flex-col gap-4 justify-center mt-8 ' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2  gap-3'>
              <Input
                id='firstName'
                label='First Name'
                type='text'
                placeholder='Enter your fisrt name'
                {...register('firstName')}
                error={errors.firstName && errors.firstName?.message}
              />
              <Input
                id='lastName'
                label='Last Name'
                type='text'
                placeholder='Enter your last name'
                {...register('lastName')}
                error={errors.lastName && errors.lastName?.message}
              />
            </div>
            <Input
              id='registerEmail'
              label='Email'
              type='email'
              placeholder='Enter your email'
              {...register('email')}
              error={errors.email && errors.email?.message}
            />
            <Input
              type='tel'
              label='Phone Number'
              id='phoneNumber'
              placeholder='Enter your Phone Number'
              {...register('phoneNumber')}
              error={errors.phoneNumber && errors.phoneNumber.message}
            />
            <Input
              id='password'
              label='Enter your Password'
              type='password'
              placeholder='Enter your Password'
              {...register('password')}
              error={errors.password && errors.password?.message}
            />

            <Input
              id='confirm__password'
              label='Confirm your Password'
              type='password'
              placeholder='Confirm your password'
              {...register('confirmPassword')}
              error={errors.confirmPassword && errors.confirmPassword?.message}
            />
            <Select
              placeholder='Gender'
              options={['male', 'female']}
              {...register('gender')}
              error={errors.gender && errors.gender.message}
            />
            <button
              type='submit'
              className='p-2 rounded-lg bg-greenColor hover:bg-darkGreen transition-all text-whiteColor font-bold'
            >
              {isSubmitting ? 'Loading..' : 'Sign Up'}
            </button>
            <p
              className={`text-sm bg-redColor text-whiteColor -mt-2 p-1 rounded-lg px-3 ${!errors.root ? 'hidden' : 'block'}`}
            >
              {errors.root?.message}
            </p>
            <span className='self-center font-bold text-grayColor'>or</span>
            <button
              className='p-2 font-bold text-greenColor border-2 border-greenColor rounded-lg flex flex-row 
            items-center justify-center gap-2 hover:bg-teal-100 transition-all'
              onClick={handleGoogleAuthentication}
            >
              <img src={GoogleIcon} alt='Google Icon' className='w-5' />
              Continue with Google
            </button>
          </form>
        </div>
        <div className='w-full md:w-3/12 mt-0  p-5 border-b-2 md:p-0 md:border-b-0 h-fit flex flex-col gap-3 justify-self-start self-start '>
          <p className='font-bold text-3xl'>Existing Customer?</p>
          <p>Go to Login Page to sign in</p>
          <Button type='submit' text='Sign In' onClick={() => navigate('/login')} />
        </div>
      </div>
      <Button className={`my-10 mx-auto block`} text='Back to Home Page' onClick={() => navigate('/')} />
    </>
  );
};

export default RegisterSection;
