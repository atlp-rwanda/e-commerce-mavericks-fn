import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import { RxDashboard } from 'react-icons/rx';
import { FaCog, FaRegListAlt, FaUserFriends, FaUsers } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa6';

export default function AdminLayout() {
  const adminSidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: <RxDashboard className='mr-3' /> },
    { name: 'Categories', path: 'categories', icon: <FaRegListAlt className='mr-3' /> },
    { name: 'Sellers', path: 'sellers', icon: <FaUserFriends className='mr-3' /> },
    { name: 'Buyers', path: 'buyers', icon: <FaUserTie className='mr-3' /> },
    { name: 'Users', path: 'users', icon: <FaUsers className='mr-3' /> },
    { name: 'Settings', path: 'settings', icon: <FaCog className='mr-3' /> },
  ];

  return (
    <>
      <div className='bg-[#D3E4DE] min-h-screen'>
        <Sidebar sidebarLinks={adminSidebarLinks} />
        <Outlet />
      </div>
    </>
  );
}
