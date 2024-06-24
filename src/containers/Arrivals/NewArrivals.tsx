import ProductCard from '../../components/Products/ProductCard';
import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
import { useState } from 'react';
import { Product } from '../../types/Types';
import { BiSolidCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const perPage = 6;

export default function NewArrivals() {
  const [currentPage, setCurrentPage] = useState(0);
    const { isLoading, productsDataList: productsList } = useSelector((state: any) => state.products);
  const next = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.floor(productsList.length / perPage)));
  };

  const prev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const allProductsOnPage = productsList.slice(startIndex, endIndex);

  return (
    <div className='new-arrivals'>
      <div className='arrivals-header py-5'>
        <h1 className='text-3xl font-bold'>New Arrivals</h1>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
        {isLoading
          ? Array.from({ length: perPage }).map((_, index) => <ProductCardSkeleton key={index} />)
          : allProductsOnPage.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className='next-previous flex justify-center items-center gap-2 p-7'>
        <BiSolidCircle
          onClick={prev}
          className={`cursor-pointer text-2xl ${currentPage === 0 ? 'text-grayColor' : ''}`}
        />
        <BiSolidCircle
          onClick={next}
          className={`cursor-pointer text-2xl ${
            currentPage >= Math.floor(productsList.length / perPage) ? 'text-grayColor' : ''
          }`}
        />
      </div>
    </div>
  );
}
