import React from 'react';
import SellerSidebar from '../../components/SellerSideBar';
import { SellerNavBar } from '../../components/navbar/SellerNavBar';
import { Outlet } from 'react-router-dom';

export default function SellerDashboard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className='flex'>
        <SellerSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className='flex-1 p-6  md:ml-64 max-w-7xl mx-auto'>
          <SellerNavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
