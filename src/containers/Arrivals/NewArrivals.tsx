import ProductCard from '../../components/Products/ProductCard';
import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
import { useState } from 'react';
import { useGetProductsQuery } from '../../services/productApi';
import { BiSolidCircle } from 'react-icons/bi';
import { ProductResponse, Product } from '../../types/Types';

const perPage = 6;

export default function NewArrivals() {
  const { data, error, isLoading } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(0);

  const productsData: ProductResponse = data as unknown as ProductResponse;

  if (error) {
    return <div>
              <div className="absolute inset-0 opacity-[0.8] flex justify-center items-center h-[100vh] p-128 bg-darkGreen text-redColor text-4xl">
                Check your internet :)
              </div>
          </div>;
  }

  const productsList: Product[] = productsData ? productsData.data : [];
  const sortedProducts = [...productsList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);

  const next = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.floor(productsList.length / perPage)));
  };

  const prev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const allProductsOnPage = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className='new-arrivals'>
      <div className='arrivals-header py-5'>
        <h1 className='text-3xl font-bold'>New Arrivals</h1>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
        {isLoading
          ? Array.from({ length: perPage }).map((_, index) => <ProductCardSkeleton key={index} />)
          : allProductsOnPage.map(product => <ProductCard key={product.id} product={product} />)}
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
