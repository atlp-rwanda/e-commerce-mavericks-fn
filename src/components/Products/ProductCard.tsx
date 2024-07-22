import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAddProductToCartMutation, useDeleteCartMutation } from '../../services/cartApi';
import { useAddProductToWishlistMutation, useRemoveWishListMutation } from '../../services/wishlistApi';
import { Product } from '../../types/Types';
import StarRating from '../common/Ratings';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
interface ProductCardProps {
  product: Product;
  cartAdded?: boolean,
  wishList?: boolean,
  wishListId?: string | string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartAdded, wishList, wishListId }) => {
  const imageUrl = product?.images?.[0] ?? '';
  const price = product?.sizes?.[0]?.price ?? '';
  const productId = product?.id
  const sizeId = product?.sizes[0].id
  const [addProductToCart] = useAddProductToCartMutation()
  const [deleteCart] = useDeleteCartMutation()
  const [addProductToWishlist] = useAddProductToWishlistMutation()
  const [removeWishList] = useRemoveWishListMutation()
  const isAuthenticated = useSelector((state: RootState) => state.user.token) ? true : false;
  const navigate = useNavigate()

  // AddCart
  const onAddProductToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isAuthenticated) {
      await addProductToCart({ productId, sizeId })
    } else {
      navigate("/login")
    }
  }
  //  RemoveCart
  const onRemoveProductToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isAuthenticated && sizeId) {
      await deleteCart({ productId, sizeId })
    } else {
      navigate("/login")
    }
  }
  // AddWishList
  const onAddWishList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isAuthenticated && sizeId) {
      await addProductToWishlist(sizeId)
    } else {
      navigate("/login")
    }
  }
  // onRemoveWishList
  const onRemoveWishList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isAuthenticated && wishListId) {
      await removeWishList(wishListId)
    } else {
      navigate("/login")
    }
  }
  return (
    <div
      onClick={() => {
        window.open(`/products/${product.id}`, '_blank');
        // window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className='bg-whiteColor flex-col relative w-[49%] sm:w-52 md:w-[32.5%] lg:w-[19%] 2xl:w-[253px] mb-2 drop-shadow-md rounded-lg cursor-pointer'
    >
      <div className='product-image flex justify-center w-full rounded-tl-lg rounded-tr-lg relative'>
        <img src={imageUrl} alt={product.name} className='w-full h-52 md:h-60 rounded-tl-lg rounded-tr-lg object-cover object-top' />
        <div className='absolute bottom-2 right-2 flex flex-col gap-1'>
          {cartAdded
            ? (
              <button
                onClick={onRemoveProductToCart}
                className={`cursor-pointer p-1 w-9 h-9 flex justify-center items-center rounded-full bg-[#fafafa] drop-shadow-lg ${cartAdded ? 'bg-blackColor' : ''}`}>
                <MdOutlineAddShoppingCart size={20} color='white' />
              </button>
            )
            : (
              <button
                onClick={onAddProductToCart}
                className='cursor-pointer p-1 w-9 h-9 flex justify-center items-center rounded-full bg-[#fafafa] drop-shadow-lg'>
                <MdOutlineAddShoppingCart size={20} />
              </button>
            )}
          {wishList
            ? (
              <button
                onClick={onRemoveWishList}
                className={`p-1 rounded-full w-9 h-9 flex justify-center items-center bg-[#fafafa] drop-shadow-md`}>
                <IoIosHeart size={30} />
              </button>
            )
            : (
              <button
                onClick={onAddWishList}
                className='p-1 rounded-full w-9 h-9 flex justify-center items-center bg-[#fafafa] drop-shadow-md'>
                <IoIosHeartEmpty size={30} />
              </button>
            )}

        </div>
      </div>
      <div className='product-name-cart-button p-1 '>
        <div className='product-manufacturer'>
          <div className='flex flex-col justify-between'>
            <h3 className='text-xs font-normal tracking-tighter truncate capitalize'>{product.name.toLowerCase()}</h3>
            <div>
              <StarRating reviews={product.reviews} />
            </div>
            <p className='flex items-center py-2'>
              <span className='self-start'>$</span>
              <span className='text-2xl font-bold self-end'>{price.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
