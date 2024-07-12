import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { ImageToggle } from '../../components/Products/ImageToggle';
import { ImageCard } from '../../components/Products/ImageCard';

const ProductDetailSkeleton = () => {
  return (
    <div className='w-full space-y-2'>
      <Navbar />
      <div className='w-full lg:flex lg:px-12'>
        <div className='lg:flex md:flex relative lg:flex-auto'>
          <div className='hidden lg:max-h-[500px] gap-2 md:flex md:flex-col md:mx-auto md:max-h-[400px] lg:flex lg:flex-col overflow-hidden'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='w-full h-20 mx-auto mt-2 bg-slate-700 rounded-md animate-pulse' />
            ))}
          </div>
          <div className='relative w-full overflow-hidden md:w-4/5 lg:h-[500px] lg:w-4/5 mx-auto'>
            <div className='md:min-h-full max-h-80 lg:min-h-full w-full bg-slate-700 rounded-md animate-pulse' />
            <ImageCard image='' styles='animate-pulse bg-slate-700 w-full h-full rounded-md' />
            <ImageToggle size='20px' icon={IoIosArrowForward} positionClass='right-4 lg:right-10 top-1/2' />
            <ImageToggle size='20px' icon={IoIosArrowBack} positionClass='left-4 lg:left-10 top-1/2' />
          </div>
        </div>
        <div className='lg:w-2/5 px-3 space-y-3 mt-3'>
          <div className='lg:flex lg:flex-col md:flex md:gap-8'>
            <div className='lg:w-full md:w-1/2'>
              <div className='w-full gap-3 flex mb-3 justify-between text-xl font-medium'>
                <div className='w-3/5 flex-1 bg-slate-700 h-6 rounded-md animate-pulse'></div>
                <div className='bg-slate-700 h-6 w-20 rounded-md animate-pulse'></div>
              </div>
              <div>
                <p className='font-medium'>Color</p>
                <div className='flex gap-2 w-full p-2 flex-wrap'>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className='bg-slate-700 w-8 h-8 rounded-full animate-pulse'></div>
                  ))}
                </div>
              </div>
              <div className='flex'>
                <div className='w-full flex flex-col gap-2'>
                  <label htmlFor='size' className='leading-none font-medium'>
                    Size
                  </label>
                  <div className='flex w-full gap-2'>
                    <div className='border-greenColor border-2 lg:py-2 text-sm px-2 bg-slate-700 w-1/2 h-10 rounded-md animate-pulse'></div>
                    <div className='flex border-2 items-center py-1 px-6 gap-4 w-1/2 bg-slate-700 h-10 rounded-md animate-pulse'></div>
                  </div>
                </div>
              </div>
              <div className='w-full py-2 my-4 bg-slate-700 h-10 rounded-md animate-pulse'></div>
            </div>
            <div className='lg:w-full md:w-1/2'>
              <div className='border-y border-grayColor gap-3 flex flex-row items-center py-4'>
                <span>Review</span>
                <span className='flex gap-1'>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className='bg-slate-700 w-5 h-5 rounded-full animate-pulse'></div>
                  ))}
                </span>
                <span>(8)</span>
              </div>
              <div className='border-b text-sm border-grayColor py-2'>
                <div className='bg-slate-700 h-6 w-full rounded-md animate-pulse mb-2'></div>
                <div className='bg-slate-700 h-6 w-3/4 rounded-md animate-pulse'></div>
                <div className='text-greenColor mt-4 font-medium text-right hover:cursor-pointer'>Show more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:px-12 lg:flex'>
        <div className='lg:w-1/2 lg:border border-grayColor lg:rounded-sm lg:p-2'>
          <div>
            <h1 className='font-bold text-2xl border-b border-grayColor py-4'>Product Reviews</h1>
            {[...Array(2)].map((_, index) => (
              <div key={index} className='flex gap-4 py-4 border-b border-grayColor'>
                <div className='w-12 h-12 rounded-full bg-slate-700 animate-pulse'></div>
                <div className='flex-1'>
                  <div className='bg-slate-700 h-4 w-1/2 rounded-md animate-pulse mb-2'></div>
                  <div className='bg-slate-700 h-4 w-3/4 rounded-md animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='lg:w-1/2 lg:border border-grayColor lg:rounded-sm lg:p-2'>
          <h1 className='font-bold text-2xl border-b border-grayColor py-4'>Recommended Products</h1>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='flex gap-4 py-4 border-b border-grayColor'>
              <div className='w-20 h-20 bg-slate-700 rounded-md animate-pulse'></div>
              <div className='flex-1'>
                <div className='bg-slate-700 h-4 w-3/4 rounded-md animate-pulse mb-2'></div>
                <div className='bg-slate-700 h-4 w-1/2 rounded-md animate-pulse'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailSkeleton;
