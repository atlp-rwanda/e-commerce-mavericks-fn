import { useEffect } from 'react';
import ProductCard from '../../components/Products/ProductCard';
import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
import { Product, ProductResponse } from '../../types/Types';
import { useGetProductsQuery } from '../../services/productApi';

export default function FeaturedProduct() {
  const { data, error, isLoading } = useGetProductsQuery();

  useEffect(() => {}, [isLoading, error, data]);

  if (isLoading) {
    // Display skeleton loaders
    return (
      <div className='featured-products pb-5'>
        <div className='featured-header py-5'>
          <h1 className='text-3xl font-bold'>Featured Products</h1>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const productsData: ProductResponse = data as unknown as ProductResponse;

  if (!productsData) {
    return null;
  }

  const productsList: Product[] = productsData.data;
  return (
    <div className='featured-products pb-5'>
      <div className='featured-header py-5'>
        <h1 className='text-3xl font-bold'>Featured Products</h1>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
        {productsList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
