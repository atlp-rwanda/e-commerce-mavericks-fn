import ProductCard from '../../components/Products/ProductCard';
import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
import { useSelector } from 'react-redux';
import { Product } from '../../types/Types';

export default function FeaturedProduct() {
  const { isLoading, productsDataList: productsList } = useSelector((state: any) => state.products);  if (isLoading) {
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

  return (
    <div className='featured-products pb-5'>
      <div className='featured-header py-5'>
        <h1 className='text-3xl font-bold'>Featured Products</h1>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
        {productsList.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
