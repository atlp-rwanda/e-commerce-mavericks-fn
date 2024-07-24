import ProductCard from '../../components/Products/ProductCard';
import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
import { Product } from '../../types/Types';
import { useGetProductsQuery } from '../../services/productApi';
import { useGetCartsQuery } from '../../services/cartApi';
import { useGetUserWishlistQuery } from '../../services/wishlistApi';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';


export default function FeaturedProduct() {
  // const isAuthenticated = useSelector((state: RootState) => state.user.token) ? true : false;
  const { data: productsList, isLoading, isSuccess } = useGetProductsQuery()
  const { data: cartList, isLoading: cartListLoading } = useGetCartsQuery()
  const { data: wishList, isLoading: wishLoading } = useGetUserWishlistQuery()
  const product = productsList?.data
  let content;
  if (isLoading && cartListLoading && wishLoading) {
    content = (
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
  } else if (isSuccess) {
    content = (
      <div className='featured-products pb-5'>
        <div className='featured-header py-5'>
          <h1 className='text-3xl font-bold'>Featured Products</h1>
        </div>
        <div className='flex justify-start items-start flex-wrap gap-1 sm:justify-start md:justify-start md:gap-2'>
          {
            product?.map((product: Product) => {
              const wishListed = wishList?.data.find(item => item.productId === product.sizes[0].id)
              const wishListId = wishListed?.id
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartAdded={cartList?.cartProducts.some((cartProduct) => cartProduct.id === product.id)}
                  wishList={wishList?.data.some((wishList) => wishList.productId === product.sizes[0].id)}
                  wishListId={wishListId}
                />
              )
            })}
        </div>

      </div>
    )
  }

  return content;
}
