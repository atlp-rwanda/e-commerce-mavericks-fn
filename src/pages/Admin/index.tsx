import React from 'react';
import { IoPeople } from 'react-icons/io5';
import Sidebar from '../../components/Sidebar';
import { IoIosNotificationsOutline, IoIosPeople } from 'react-icons/io';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import adminProfile from '../../assets/profile-picture-5.jpg';
import { GoArrowUp } from 'react-icons/go';
import { FaBars } from 'react-icons/fa6';

export default function AdminPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className='flex'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className='flex-1 p-6 bg-[#D3E4DE] md:ml-64 max-w-7xl mx-auto'>
          <div className='flex justify-between items-center mb-[3rem] sticky top-0 bg-[#D3E4DE]'>
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
          {/* Information Cards */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6'>
            <div className='py-9 px-3 w-full shadow-md rounded text-center bg-[#F9F9F9]'>
              <div className='flex'>
                <IoPeople size={50} />
                <div className='mx-auto'>
                  <h3 className='font-medium'>Sellers</h3>
                  <h3 className='text-2xl font-semibold'>4k</h3>
                </div>
              </div>
            </div>
            <div className='py-9 px-3 w-full shadow-md rounded text-center bg-[#F9F9F9]'>
              <div className='flex'>
                <IoIosPeople size={50} />
                <div className='mx-auto'>
                  <h3>Buyers</h3>
                  <h3 className='text-2xl font-semibold'>2,500</h3>
                </div>
              </div>
            </div>
            <div className='py-9 px-3 w-full shadow-md rounded text-center bg-[#F9F9F9]'>
              <div className='flex'>
                <PiShoppingCartSimpleFill size={50} />
                <div className='mx-auto'>
                  <h3>Products</h3>
                  <h3 className='text-2xl font-semibold'>2,500</h3>
                </div>
              </div>
            </div>
          </div>
          <div className='grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3'>
            <div className='items-center justify-between p-4 bg-whiteColor my-5 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
              <div className='w-full'>
                <h3 className='text-base font-normal text-gray-500 dark:text-gray-400'>New products</h3>
                <span className='text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white'>2,340</span>
                <p className='flex items-center text-base font-normal text-gray-500 dark:text-gray-400'>
                  <span className='flex items-center mr-1.5 text-sm text-[#0E9F6E] dark:text-green-400'>
                    <GoArrowUp className='w-4 h-4' />
                    12.5%
                  </span>
                  Since last month
                </p>
              </div>
              <div className='w-full' id='new-products-chart'></div>
            </div>
            <div className='items-center justify-between p-4 bg-whiteColor my-5 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
              <div className='w-full'>
                <h3 className='text-base font-normal text-gray-500 dark:text-gray-400'>Users</h3>
                <span className='text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white'>2,340</span>
                <p className='flex items-center text-base font-normal text-gray-500 dark:text-gray-400'>
                  <span className='flex items-center mr-1.5 text-sm text-[#0E9F6E] dark:text-green-400'>
                    <GoArrowUp className='w-4 h-4' />
                    3.4%
                  </span>
                  Since last month
                </p>
              </div>
              <div className='w-full' id='week-signups-chart'></div>
            </div>
          </div>

          {/* Tables */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <div className='shadow-md rounded-lg bg-[#F9F9F9] p-5'>
              <div className='flex justify-between items-center mb-4'>
                <div className='font-bold text-lg'>Top Sellers</div>
                <a href='#' className='text-[#1877F2]'>
                  See more
                </a>
              </div>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-[#D9D9D9]'>
                    <th className='pb-2 px-4'>Seller name</th>
                    <th className='pb-2 px-4'>Shop Name</th>
                    <th className='pb-2 px-4'>No. of products</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='py-2 px-4'>james ndiho</td>
                    <td className='py-2 px-4'>beauty shop</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>patrick hag</td>
                    <td className='py-2 px-4'>kitchen appliance</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4'>Np leon</td>
                    <td className='py-2 px-4'>phones shop</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>Kwiz Ben</td>
                    <td className='py-2 px-4'>electronics</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4'>Malek yvan</td>
                    <td className='py-2 px-4'>furnitures</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>Keza cynthia</td>
                    <td className='py-2 px-4'>salon tools</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='p-4 shadow-md rounded bg-[#F9F9F9]'>
              <div className='flex justify-between items-center mb-4'>
                <div className='font-bold text-lg'>Top products</div>
                <a href='#' className='text-[#1877F2]'>
                  See more
                </a>
              </div>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-[#D9D9D9]'>
                    <th className='pb-2 px-4'>Buyer Name</th>
                    <th className='pb-2 px-4'>Contacts</th>
                    <th className='pb-2 px-4'>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='py-2 px-4'>james ndiho</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>patrick hag</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4'>Np leon</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>Kwiz Ben</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4'>Malek yvan</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                  <tr className='bg-[#D9D9D9]'>
                    <td className='py-2 px-4'>Keza cynthia</td>
                    <td className='py-2 px-4'>2344324</td>
                    <td className='py-2 px-4'>100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
