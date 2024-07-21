export const TopSellingProductCard = () => {
  return (
    <div className='flex justify-between items-center bg-[#F9F9F9] shadow-sm p-1'>
      <div className='flex gap-2 items-center mt-3'>
        <img
          className='w-12 h-10 rounded-sm'
          src='https://images.unsplash.com/photo-1703434123142-1b41a1b1055b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ></img>
        <div>
          <div>
            <p className='font-semibold text-sm'>iPhone 14 Pro</p>
            <p className='text-xs'>
              <span className='text-[#0E9F6E]'>12.5%</span> <span className='text-[#8F8183]'>vs last month</span>
            </p>
          </div>
        </div>
      </div>
      <p className='font-bold'>$445,557</p>
    </div>
  );
};
