import React from 'react';
import { FaRegListAlt, FaUserFriends, FaUserTie, FaRegEnvelope, FaCog } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import logo from '../assets/Rectangle 2487.png';
import { Link } from 'react-router-dom';

export default function SellerSidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const [activeLink, setActiveLink] = React.useState('Dashboard');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const linkClasses = (link: string) =>
    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
      activeLink === link ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
    }`;

  return (
    <>
      <div
        className={`fixed inset-0 bg-blackColor opacity-50 z-40 ${isOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`w-64 h-screen bg-whiteColor shadow-md flex flex-col justify-between fixed z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='p-6 '>
          <div className='text-center font-semibold text-2xl mb-6 static'>
            <a href='#'>
              MAVERICKS <img src={logo} alt='' className='absolute top-5 right-5' width={40} height={40} />
            </a>
          </div>
          <nav>
            <ul className='space-y-2'>
              <li>
                <Link to={'/seller'} className={linkClasses('Dashboard')} onClick={() => handleLinkClick('Dashboard')}>
                  <RxDashboard className='mr-3' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={''} className={linkClasses('Orders')} onClick={() => handleLinkClick('Orders')}>
                  <FaRegListAlt className='mr-3' />
                  Orders
                </Link>
              </li>
              <li>
                <Link to={'products'} className={linkClasses('Products')} onClick={() => handleLinkClick('Products')}>
                  <FaUserTie className='mr-3' />
                  Products
                </Link>
              </li>
              <li>
                <Link to={''} className={linkClasses('Customers')} onClick={() => handleLinkClick('Customers')}>
                  <FaUserFriends className='mr-3' />
                  Customers
                </Link>
              </li>
              <li>
                <Link to={''} className={linkClasses('Messages')} onClick={() => handleLinkClick('Messages')}>
                  <FaRegEnvelope className='mr-3' />
                  Messages
                </Link>
              </li>
              <li>
                <Link to={''} className={linkClasses('Settings')} onClick={() => handleLinkClick('Settings')}>
                  <FaCog className='mr-3' />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='p-6'>
          <a href='#' className='flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB]'>
            <FiLogOut className='mr-3' />
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
