import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useClearCartsMutation } from '../../services/cartApi';
import { BiLoader } from 'react-icons/bi';
import { cn } from '../../utils';
import { toast } from 'react-toastify';
const PaymentSuccessCard = () => {
  const [successParams] = useSearchParams();

  const isPayed = (successParams.get('ok') as string) === 'true' ? true : false;

  const [clearCart, { isLoading, isError }] = useClearCartsMutation();

  useEffect(() => {
    const handleClearCart = async () => {
      await clearCart({});
      if (isError) {
        toast.error('Payment done, but cart could not be cleared successfully');
        return;
      }
    };
    if (isPayed) {
      handleClearCart();
      return;
    }
  }, []);
  return (
    <div className='flex justify-center items-center min-h-screen bg-grayColor'>
      <div className='text-center p-8 bg-whiteColor rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-greenColor mb-4'>Payment Successful!</h1>
        <p className='text-greenColor mb-6'>Thank you for your purchase.</p>
        <Link
          to='/'
          className={cn(
            'inline-block px-6 py-3 bg-greenColor text-whiteColor font-semibold rounded-md hover:bg-darkGreen transition duration-300',
            isLoading ? 'pointer-events-none bg-grayColor cursor-not-allowed' : 'pointer-events-auto cursor-pointer '
          )}
        >
          {isLoading ? <BiLoader className='animate-spin w-2 h-2' /> : 'Return to Homepage'}
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
