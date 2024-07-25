import { useState, useEffect } from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { TbTruck } from 'react-icons/tb';
import { MdOutlinePayment } from 'react-icons/md';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import Category from '../categories/Category';
// import NewArrivals from '../Arrivals/NewArrivals';
import FeaturedProduct from '../FeaturedProducts/FeaturedProducts';
import { useGetAllCategoriesQuery } from '../../services/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsCategoriesFetched, setallCategories } from '../../redux/slices/categorySlice';
import CategorySkeleton from '../../components/categories/CategoriesSkeleton';

function HeroPage() {
  const dispatch = useDispatch();
  const { allCategories, isCategoriesFetched }: any = useSelector((state: RootState) => state.category);
  const { data: categoriess } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (!isCategoriesFetched && categoriess) {
      dispatch(setallCategories(categoriess));
      dispatch(setIsCategoriesFetched(true));
    }
  }, [categoriess, isCategoriesFetched, dispatch]);

  const categoriesToDisplay = allCategories.length ? allCategories.data : categoriess;
  const list = categoriesToDisplay?.data;

  const images = [
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://noticiasconcursos.com.br/wp-content/uploads/2023/08/noticiasconcursos.com.br-novo-iphone-da-apple-ja-tem-data-prevista-para-lancamento-veja-quando-09-iphone-15-750x430.jpg',
    'https://media.istockphoto.com/id/1170348086/photo/black-headphones-isolated-on-white-background-flat-lay-top-view-copy-space-music-concept.webp?s=170667a&w=0&k=20&c=7laDBNwNFtg0_BDSy2coo8oZMyYK9TofQzZBa-nuG3c=',
  ];

  // hero images auto display
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='p-3 md:p-4 xl:px-10 font-roboto 2xl:w-[1440px] mx-auto bg-[#fafafa]'>
      <div className='hero-container flex flex-col-reverse md:grid md:grid-cols-3 md:gap-4'>
        <div className='small-images grid grid-cols-2 md:flex md:flex-col md:gap-1 md:col-span-1'>
          <div className='upper-image relative'>
            <img
              src='https://image.gazetevatan.com/i/gazetevatan/75/1200x675/65004ecee14f2adf329c06c9.jpg'
              alt='Hot Phones'
              className='w-full h-[150px] md:h-[250px] object-cover rounded-sm'
            />
            <p className='absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor text-whiteColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-3xl font-roboto font-extrabold text-center'>
              Hot Sells from new Arrivals
            </p>
          </div>
          <div className=' relative lower-image'>
            <img
              src='https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Best Shoes in Town'
              className='w-full h-[150px] md:h-[250px] object-cover rounded-sm'
            />
            <p className='absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-3xl text-center font-roboto font-extrabold'>
              Enjoy Black Friday Discount
            </p>
          </div>
        </div>
        <div className='large-image relative max-h-[250px] md:max-h-[500px] md:col-span-2'>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Sliding ${index + 1}`}
              className={`w-full h-[250px] md:h-[500px] object-cover rounded-sm ${index === currentImageIndex ? '' : 'hidden'}`}
            />
          ))}
          <p className='absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-5xl text-center font-roboto font-extrabold'></p>
        </div>
      </div>
      <div className='category-header py-10'>
        <h1 className='text-2xl font-bold'>Shop By Category Here:</h1>
      </div>
      <div className='categories flex flex-row gap-4 overflow-x-auto snap-x'>
        {list && list.length ? (
          <div className='categories flex flex-row gap-4 overflow-x-auto snap-x'>
            {list.map((cat: { image: string; name: string }, index: number) => (
              <div key={index} className='snap-start'>
                <Category image={cat.image} name={cat.name} />
              </div>
            ))}
          </div>
        ) : (
          <div className=''>
            <CategorySkeleton />
          </div>
        )}
      </div>
      <div className='banner py-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
        <div className='smater-value flex justify-center items-center gap-2 font-bold text-xl'>
          SMARTER VALUES, GREAT DEALS
        </div>
        <div className='dollar flex justify-center items-center flex-col gap-2'>
          <AiOutlineDollarCircle className='text-4xl' />
          <div className='text text-center'>
            <h1 className='text-md font-bold pb-2'>Value-For-Money</h1>
            <p className='text-sm'>We offer compentitive price over millions of items</p>
          </div>
        </div>
        <div className='dollar flex justify-center items-center flex-col gap-2'>
          <MdOutlinePeopleAlt className='text-4xl' />
          <div className='text text-center'>
            <h1 className='text-md font-bold pb-2'>Shoppers worldwide</h1>
            <p className='text-sm'>More than 300 millions shoppers form 200+ countries & region</p>
          </div>
        </div>
        <div className='dollar flex justify-center items-center flex-col gap-2'>
          <TbTruck className='text-4xl' />
          <div className='text text-center'>
            <h1 className='text-md font-bold pb-2'>Fast delivery</h1>
            <p className='text-sm'>Faster delivery on selected items. Thanks to our improved logistics</p>
          </div>
        </div>
        <div className='dollar flex justify-center items-center flex-col gap-2'>
          <MdOutlinePayment className='text-4xl' />
          <div className='text text-center'>
            <h1 className='text-md font-bold pb-2'>Safe payments</h1>
            <p className='text-sm'>Safe payment methods preferred by international shoppers</p>
          </div>
        </div>
        <div className='dollar flex justify-center items-center flex-col gap-2'>
          <IoShieldCheckmarkOutline className='text-4xl' />
          <div className='text text-center'>
            <h1 className='text-md font-bold pb-2'>Buyer protection</h1>
            <p className='text-sm'>Get refund if item arrived late or not as described</p>
          </div>
        </div>
      </div>
      {/* New Arrivals */}
      {/* <div className="new-arrivals">
        <NewArrivals />
      </div> */}
      {/* Featured Products */}
      <div className='featured-products'>
        <FeaturedProduct />
      </div>
    </div>
  );
}

export default HeroPage;
