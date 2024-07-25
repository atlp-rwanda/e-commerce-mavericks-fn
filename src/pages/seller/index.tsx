import { StatisticsCard } from '../../components/dashboard/StatisticsCard';
import AreaChart from '../../components/dashboard/AreaChart';
import { TopSellingProductCard } from '../../components/dashboard/TopSellingProductCard';
import Navbar from '../../components/dashboard/Navbar';
import TransactionTable from '../../components/dashboard/Table';

export const SellerDashboard = () => {
  return (
    <>
      <Navbar location='Dashboard' page='seller' />
      <div className='bg-[#EFF4FE] md:ml-64 p-4'>
        <div className='md:grid md:grid-cols-2 md:gap-3 md:w-full'>
          {/* SALES CHART */}
          <div className='bg-[#F9F9F9] p-3 rounded-lg border border-grayColor mb-2'>
            <p className='font-bold'>$3,234</p>
            <p className='text-sm'>Sales Report</p>
            <div className='h-72'>
              <AreaChart />
            </div>
            <div className='flex justify-end mt-4 p-2'>
              <p className='text-sm text-left text-[#1877F2] hover:underline hover:cursor-pointer'>Sales Report</p>
            </div>
          </div>
          {/* TOP SELLING PRODUCT */}
          <div className='bg-[#F9F9F9] p-3 rounded-lg border border-grayColor mb-2'>
            <p className='font-bold text-xl my-2'>Statistics this month</p>
            <div className='bg-[#D8D6D6] flex justify-between font-semibold px-4 py-3 rounded-t-md'>
              <p className='text-[#1877F2]'>Top Products</p>
              <p>Top Customers</p>
            </div>
            <div>
              <TopSellingProductCard />
              <TopSellingProductCard />
              <TopSellingProductCard />
              <TopSellingProductCard />
              <div className='flex justify-end mt-4 p-2'>
                <p className='text-sm text-left text-[#1877F2] hover:underline hover:cursor-pointer'>Full Report</p>
              </div>
            </div>
          </div>
        </div>
        {/* Numbers and statistics*/}
        <div className='md:grid md:grid-cols-2 gap-3 mt-3'>
          <StatisticsCard />
          <StatisticsCard />
        </div>
        <TransactionTable />
      </div>
    </>
  );
};
