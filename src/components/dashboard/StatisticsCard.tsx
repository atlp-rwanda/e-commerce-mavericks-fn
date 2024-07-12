import BarChart from './BarChart';

export const StatisticsCard = () => {
  return (
    <div className='flex gap-2 md:flex-1 items-center justify-between  bg-[#F9F9F9] px-2 py-4 m-2 rounded-t-lg'>
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
