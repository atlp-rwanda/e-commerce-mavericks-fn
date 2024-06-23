import { useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='bg-[#D3E4DE] min-h-screen'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <Navbar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </>
  );
}
