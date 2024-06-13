import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-10'>
      <p className=' text-5xl text-blackColor font-bold'>Success!</p>
      <p className='text-xl text-blackColor '>
        Account was created successfully. Please check your email to activate the account
      </p>
      <Button text='Go to Home' className='-mt-5' onClick={() => navigate('/')} />
    </div>
  );
};

export default Success;
