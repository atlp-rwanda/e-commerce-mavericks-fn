import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import GoogleIcon from '../../assets/googleIcon.svg';
import Button from '../common/Button';
import Input from '../common/Input';
import { loginSchema, LoginData } from '../../utils/schemas';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser, setRole, enable2FA } from '../../redux/slices/userSlice';
import { useLoginUserMutation } from '../../services/authAPI';
import handleGoogleAuthentication from '../../utils/handleGoogleAuthentication';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomJwtPayload } from '../../types/Types';
import { RootState } from '../../redux/store';
import { useGetUserByIdQuery } from '../../services/userApi';
import { useAppDispatch } from '../../hooks/customHooks';

const LoginComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.userId);
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const [loginUser, { data: loginData, error, isLoading, isSuccess: isLoginSuccess, isError }] = useLoginUserMutation();

  const { data: userData, isSuccess: isUserSuccess } = useGetUserByIdQuery(userId, { skip: !isLoginSuccess });

  useEffect(() => {
    if (isError && error) {
      setError('root', {
        message: 'Invalid email or password',
      });
    }
    if (isLoginSuccess && loginData.ok) {
      const token: string = loginData.token;
      dispatch(setToken(token));
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      dispatch(setUser(decodedToken.id));
    }
    const message = searchParams.get('message');
    if (message) {
      toast.success(message, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
    // handling login according to roles
    if (isUserSuccess && userData) {
      const role = userData.message.Role.name;
      const is2FAEnabled = userData.message.enable2FA;
      dispatch(setRole(role));
      appDispatch(enable2FA(userData.message.enable2FA));
      const from = location.state?.from?.pathname || '/';
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'seller':
          navigate('/seller');
          break;
        default:
          isAuthenticated && navigate(from);
      }
      if (role === 'seller' && is2FAEnabled) navigate('/verifyOTP');
    }
  }, [
    isError,
    isAuthenticated,
    isLoginSuccess,
    error,
    loginData,
    searchParams,
    setSearchParams,
    navigate,
    location.state,
    dispatch,
    setError,
    userId,
    userData,
    isUserSuccess,
  ]);

  const onSubmit: SubmitHandler<LoginData> = async userCredentials => {
    await loginUser(userCredentials);
  };

  return (
    <div className='w-full xl:container flex flex-col-reverse gap-14 md:flex-row px-4 mb-8 items-center md:gap-5 transition-all md:justify-between md:px-10 lg:justify-around mt-5 md:mt-10'>
      <div className='w-full md:w-7/12 xl:w-4/12 border-greenColor border-2 rounded-xl p-8'>
        <p className='font-bold text-3xl'>Existing Customer?</p>
        <p>Sign in to continue</p>
        {errors.root && (
          <p className='text-lg bg-redColor text-whiteColor mt-4 py-2 rounded-lg px-3'>{errors.root.message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center mt-8'>
          <Input
            id='loginEmail'
            label='Email'
            type='email'
            placeholder='Enter your email'
            {...register('email')}
            error={errors.email && errors.email.message}
          />
          <Input
            id='loginPassword'
            label='Password'
            type='password'
            placeholder='Enter your password'
            {...register('password')}
            error={errors.password && errors.password.message}
          />
          <p
            className='text-sm text-end hover:cursor-pointer hover:underline'
            onClick={() => navigate('/reset-password')}
          >
            Forget password
          </p>
          <button
            type='submit'
            className='p-2 rounded-lg bg-greenColor hover:bg-darkGreen transition-all text-whiteColor font-bold'
          >
            {isSubmitting || isLoading ? 'Loading...' : 'Sign In'}
          </button>
          {isLoginSuccess && <p className='text-green-600 text-xs font-normal'>Login successful!</p>}
          <span className='self-center font-bold text-grayColor'>or</span>
          <button
            onClick={handleGoogleAuthentication}
            className='p-2 font-bold text-teal-700 border-2 border-greenColor rounded-lg flex flex-row items-center justify-center gap-2 hover:bg-teal-100 transition-all'
          >
            <img src={GoogleIcon} alt='Google Icon' className='w-5' />
            Continue with Google
          </button>
        </form>
      </div>
      <div className='w-full md:w-3/12 mt-0 p-5 border-b-2 md:p-0 md:border-b-0 h-fit flex flex-col gap-3 justify-self-start self-start'>
        <p className='font-bold text-3xl'>New Customer?</p>
        <p>Create an account here</p>
        <Button type='button' text='Register Here' onClick={() => navigate('/register')} />
      </div>
    </div>
  );
};

export default LoginComponent;
