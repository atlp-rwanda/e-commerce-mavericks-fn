import React from 'react';
import { BiLoader } from 'react-icons/bi';
import { LuUser } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserData } from '../../../redux/slices/userSlice';
interface WishNav {
  setWish: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  userInfo: string[];
}

const WishNav: React.FC<WishNav> = ({ isLoading, userInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, lastName] = userInfo;
  const handleSignOut = () => {
    dispatch(clearUserData());
    navigate('/');
  };
  return (
    <>
      <div className='absolute w-[280px] right-20 md:right-24 top-12 md:top-14 mt-2 bg-whiteColor text-blackColor rounded-md border border-grayColor shadow-customShadow p-3 px-4 flex flex-col gap-3 z-50'>
        {isLoading ? (
          <div className='min-h-20 flex flex-col items-center justify-center'>
            <BiLoader className='animate-spin w-full h-full max-h-12' />
          </div>
        ) : (
          <>
            <div className='flex flex-col justify-center items-center gap-1'>
              <p className='text-xl font-medium '>{firstName + ' ' + lastName}</p>
              <div className='flex items-center gap-3 mt-5 mb-2'>
                <LuUser className='size-6 md:size-8' strokeWidth={1} stroke='currentColor' />{' '}
                <Link to='/' className='hover:underline font-light text-base'>
                  Account Settings
                </Link>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 font-light'>
              <button
                className='rounded-full text-blackColor py-1 px-2 font-normal text-center select-none border border-greenColor cursor-pointer w-full transition-all hover:bg-greenColor hover:text-whiteColor'
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WishNav;
