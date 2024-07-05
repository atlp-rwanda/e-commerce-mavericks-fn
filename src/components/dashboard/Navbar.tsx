import { IoIosNotificationsOutline } from 'react-icons/io';
import adminProfile from '../../assets/profile-picture-5.jpg';
import { FaBars } from 'react-icons/fa6';

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className='md:ml-64 flex justify-between items-center sticky top-0 bg-[#D3E4DE] px-6'>
      <h1 className='text-2xl font-normal'>Dashboard</h1>
      <div className='flex items-center'>
        <button className='m-3 bg-whiteColor rounded p-1 relative'>
          <IoIosNotificationsOutline size={30} className='text-[#8F8183]' />
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
