import { FormEvent, useEffect, useRef } from 'react';
import { useVerifyOTPMutation } from '../../services/Enable2FAApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/customHooks';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const token = useAppSelector(state => state.user.token);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [verifyOTP] = useVerifyOTPMutation();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpValues = inputRefs.current.map(input => input?.value || '').join('');
    if (otpValues.length < 6) {
      toast.warning('Please Provide the correct OTP');
      return;
    }

    try {
      await verifyOTP({ token, otp: otpValues }).unwrap();
      navigate('/seller');
    } catch (err) {
      toast.dark((err as any).data?.error || 'Wrong OTP, Verify again');
    }
  };
  useEffect(() => {
    inputRefs.current.forEach((input, i) => {
      if (input) {
        input.addEventListener('input', (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (target.value.length === 1 && i < inputRefs.current.length - 1) {
            inputRefs.current[i + 1]?.focus();
          }
        });
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputRefs.current.forEach(input => {
        if (input) {
          input.removeEventListener('input', () => {});
        }
      });
    };
  }, []);
  return (
    <div className='w-full flex flex-col items-center justify-center gap-8'>
      <h1 className='text-xl'>VERIFY YOUR OTP</h1>
      <form
        className='bg-grayColor rounded-xl py-10 px-8 flex flex-col lg:w-1/3 items-center gap-6 mx-2'
        onSubmit={ev => onSubmit(ev)}
      >
        <h1>Please Enter Your OTP</h1>
        <div className='flex items-center gap-2 overflow-hidden'>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                key={i}
                type='text'
                maxLength={1}
                minLength={1}
                ref={el => (inputRefs.current[i] = el)}
                className='bg-[transparent] w-1/6 outline-none text-xl text-center border-b-2 font-extrabold text-greenColor pb-2 border-greenColor'
              />
            ))}
        </div>

        <button
          type='submit'
          className={`bg-darkGreen text-whiteColor px-6 py-2 rounded-md transition-colors duration-300 hover:bg-greenColor hover:scale-105`}
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
