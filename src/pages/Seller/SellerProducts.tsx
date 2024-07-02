export default function SellerProducts() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {/* all products  */}
      <div className='p-2 relative bg-neutral-200 rounded-lg  hover:bg-neutral-300'>
        <div className='flex items-center space-x-4'>
          <img src='../../src/assets/watches.png' alt='Image' className='w-16 h-16' />
          <div>
            <h2 className='text-lg font-medium'>lorem </h2>
            <p className='text-gray-500'>Laptop</p>
            <p className='text-black'>$110</p>
          </div>
          <p className='absolute top-0 right-0 font-bold'>...</p>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold'>Summary</h1>
          <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur</p>
        </div>
      </div>
      {/* 2 product */}
      <div className='p-2 relative bg-neutral-200 rounded-lg hover:bg-neutral-300'>
        <div className='flex items-center space-x-4'>
          <img src='../../src/assets/watches.png' alt='Image' className='w-16 h-16' />
          <div>
            <h2 className='text-lg font-medium'>lorem </h2>
            <p className='text-gray-500'>Laptop</p>
            <p className='text-black'>$110</p>
          </div>
          <p className='absolute top-0 right-0 font-bold'>...</p>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold'>Summary</h1>
          <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur</p>
        </div>
      </div>
      {/* other products */}
    </div>
  );
}
