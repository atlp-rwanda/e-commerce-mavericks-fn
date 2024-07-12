import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import AreaChart from '../../components/dashboard/AreaChart';
import { TopSellingProductCard } from '../../components/dashboard/TopSellingProductCard';
import { StatisticsCard } from '../../components/dashboard/StatisticsCard';
import Table from '../../components/dashboard/Table';

export const SellerDashboard = () => {
  const data = [
    {
      referenceNumber: '12345',
      customer: 'John Doe',
      product: 'Product 1',
      date: '2024-07-15',
      status: 'Shipped',
      price: '$100',
    },
    {
      referenceNumber: '12346',
      customer: 'Jane Smith',
      product: 'Product 2',
      date: '2024-07-14',
      status: 'Pending',
      price: '$150',
    },
    // Add more rows as needed
  ];
  return (
    <div className='bg-[#EFF4FE] h-screen'>
      {/* HEADER */}
      <div className='px-2 shadow-sm sticky top-0 z-auto bg-[#EFF4FE]'>
        <div className='flex  items-center justify-between gap-8'>
          <div>
            <p className='font-medium'>Dashboard</p>
            <p className='text-[#1877F2] text-sm'>Hello, Jane</p>
          </div>
          <div className='flex gap-4 py-2'>
            <div className='hidden lg:flex items-center p-1 bg-[#F9F9F9]  rounded-sm'>
              <CiSearch size='20px' />
              <input type='text' className='text-sm bg-[#F9F9F9] outline-none px-2' placeholder='Search something' />
            </div>
            <div className='bg-[#F9F9F9] px-2 py-1 flex items-center rounded-sm justify-center'>
              <IoMdNotificationsOutline size='20px' />
            </div>
            <div className='flex items-center gap-2'>
              <img
                className='h-8 w-8 rounded-sm'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
              <div>
                <p className='text-sm'>Jane's Shop</p>
                <p className='text-xs'>seller</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:flex lg:w-full md:flex'>
        {/* SALES CHART */}
        <div className='bg-[#F9F9F9] md:w-1/2 p-2 rounded-lg m-2'>
          <p className='font-bold'>$3,234</p>
          <p className='text-sm'>Sales Report</p>
          <div className=''>
            <AreaChart />
          </div>
          <div className='flex justify-end mt-4 p-2'>
            <p className='text-sm text-left text-[#1877F2] hover:underline hover:cursor-pointer'>Sales Report</p>
          </div>
        </div>
        {/* TOP SELLING PRODUCT */}
        <div className='md:w-1/2'>
          <div className='m-2 bg-[#F9F9F9] p-1'>
            <p className='font-bold text-xl my-2'>Statistics this month</p>
            <div className='bg-[#D8D6D6] flex  justify-between font-semibold px-4 py-3 rounded-t-md'>
              <p className='text-[#1877F2]'>Top Products</p>
              <p>Top Customers</p>
            </div>
            <div>
              <TopSellingProductCard />
              <TopSellingProductCard />
              <TopSellingProductCard />
              <TopSellingProductCard />
            </div>
            <div className='flex justify-end mt-4 p-2'>
              <p className='text-sm text-left text-[#1877F2] hover:underline hover:cursor-pointer'>Full Report</p>
            </div>
          </div>
        </div>
      </div>
      {/* Numbers and statistics*/}
      <div className='md:flex w-full'>
        <StatisticsCard />
        <StatisticsCard />
      </div>
      <div>
        <Table data={data} />
      </div>
    </div>
  );
};
