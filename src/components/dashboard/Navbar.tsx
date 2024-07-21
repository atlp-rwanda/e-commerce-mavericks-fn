import { IoIosNotificationsOutline } from 'react-icons/io';
import adminProfile from '../../assets/profile-picture-5.jpg';
import { FaBars } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../../redux/slices/sidebarSlice';
import Notifications from '../navbar/notifications/Notifications';
import { useState } from 'react';

export default function Navbar({ location, page }: { location: string; page: string }) {
  const dispatch = useDispatch();

  const [openNotification, setOpenNotification] = useState(false);

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  const toggleSidebar = () => {
    dispatch(setIsOpen());
  };

  return (
    <div
      className={`md:ml-64 flex justify-between items-center sticky top-0 ${page === 'admin' ? 'bg-[#D3E4DE]' : 'bg-[#EFF4FE]'} px-6 z-10`}
    >
      <h1 className='text-2xl font-normal'>{location}</h1>
      <div className='flex items-center'>
        <button className='m-3 bg-whiteColor rounded p-1 relative' onClick={handleOpenNotification}>
          <IoIosNotificationsOutline size={30} className='text-[#8F8183]' />
          <div className='relative'>
            {openNotification && (
              <div className='absolute top-5 right-0 min-w-72 z-10'>
                <Notifications />
              </div>
            )}
          </div>
        </button>
        <div className='mr-5'>
          <img src={adminProfile} alt='' width={35} height={35} className='rounded-lg' />
        </div>
        <button className='text-2xl p-1 md:hidden top-5 z-50 bg-whiteColor rounded' onClick={toggleSidebar}>
          <FaBars className='text-[#8F8183]' />
        </button>
      </div>
    </div>
  );
}
