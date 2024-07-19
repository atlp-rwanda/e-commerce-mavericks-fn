import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import { RxDashboard } from 'react-icons/rx';
import { FaCog } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { FaClipboardList } from 'react-icons/fa';

export default function SellerLayout() {
  const sellerSidebarLinks = [
    { name: 'Dashboard', path: '/seller', icon: <RxDashboard className='mr-3' /> },
    { name: 'Orders', path: 'orders', icon: <GiShoppingCart className='mr-3' /> },
    { name: 'Products', path: 'products', icon: <FaClipboardList className='mr-3' /> },
    { name: 'Customers', path: 'Customers', icon: <IoIosPeople className='mr-3' /> },
    { name: 'Messages', path: 'messages', icon: <FaRegEnvelope className='mr-3' /> },
    { name: 'Settings', path: 'settings', icon: <FaCog className='mr-3' /> },
  ];

  return (
    <>
      <div className='bg-[#EFF4FE] min-h-screen'>
        <Sidebar sidebarLinks={sellerSidebarLinks} />
        <Outlet />
      </div>
    </>
  );
}
