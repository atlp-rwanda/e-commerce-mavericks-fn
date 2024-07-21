import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import ErrorImage from '../../assets/face-id-error.svg';
import Button from '../../components/common/Button';

export const ErrorContainer = () => {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.log(error);
  return (
    <div className='flex items-center justify-between lg:shadow-sm rounded-lg gap-16 my-4 p-4 md:gap-40 md:my-24 lg:mx-60'>
      <div>
        <div className='flex flex-col md:flex md:flex-row'>
          <img className='max-h-32 md:max-h-60' src={ErrorImage} alt='' />
          <div className='flex  flex-col justify-center space-y-4'>
            <p className='text-greenColor font-bold  md:text-3xl'>
              {isRouteErrorResponse(error) ? 'Ooops page not found...' : 'Unexpected Error occured...🥹'}
            </p>
            <p className='text-xs lg:text-sm'>
              We&apos;re very sorry, the page you have requested could not be found or the URL has been typed
              incorrectly.
            </p>
            <p className='font-medium text-sm lg:text-sm'>
              Perhaps, you can click on the button below 👇 or search for the product in the search input above 👆
            </p>
            <div className='flex flex-wrap gap-4'>
              <Button text=' Go Home' onClick={() => navigate('/')}></Button>
              <Button text='Electronics' onClick={() => navigate('/categories/Electronics')}></Button>
              <Button text='Sports' onClick={() => navigate('categories/Sports')}></Button>
              <Button text='Fashion' onClick={() => navigate('/categories/Fashions')}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
