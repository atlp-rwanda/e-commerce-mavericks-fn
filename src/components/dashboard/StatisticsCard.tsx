import BarChart from './BarChart';

export const StatisticsCard = () => {
  return (
    <div className='flex md:flex-1 items-center justify-between bg-[#F9F9F9] px-3 py-5 rounded-lg border border-grayColor mb-2'>
      <div className='w-1/2 space-y-1'>
        <p>New Products</p>
        <p className='font-medium'>2,300</p>
        <p className='text-sm'>
          <span className='text-greenColor'>12.5%</span> since last month
        </p>
      </div>
      <div className='h-20 w-1/2'>
        <BarChart />
      </div>
    </div>
  );
};
