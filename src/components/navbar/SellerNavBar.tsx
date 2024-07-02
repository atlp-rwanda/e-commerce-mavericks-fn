import { IoIosNotificationsOutline } from 'react-icons/io';
import sellerProfile from '../../assets/profile-picture-5.jpg';
import { FaBars } from 'react-icons/fa6';

export const SellerNavBar = () => {
  return (
    <div>
      {' '}
      <div className='flex justify-between items-center mb-[3rem] sticky top-0'>
        <h1 className='text-xl font-semibold '> Dashboard </h1>
        <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 w-1/2 relative'>
          <input
            type='text'
            id='search'
            name='search'
            className='pl-10 focus:outline-none w-full'
            placeholder='Search Products'
          />
          <button type='submit' className='text-gray-600 hover:text-gray-900 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>

        <div className='flex items-center'>
          <button className='m-3 bg-whiteColor rounded p-1 relative'>
            <IoIosNotificationsOutline size={30} className='text-[#8F8183]' />
          </button>
          <div className='mr-5'>
            <img src={sellerProfile} alt='' width={35} height={35} className='rounded-lg' />
          </div>
          <button className='text-2xl p-1 md:hidden top-5 z-50 bg-whiteColor rounded'>
            <FaBars className='text-[#8F8183]' />
          </button>
        </div>
      </div>
    </div>
  );
};
