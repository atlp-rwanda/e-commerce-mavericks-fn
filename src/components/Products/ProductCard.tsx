import { FaHeart } from 'react-icons/fa6';
import { Product } from '../../types/Types';
import { TiShoppingCart } from 'react-icons/ti';
import StarRating from '../common/Ratings';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product?.images?.[0] ?? '';
  const price = product?.sizes?.[0]?.price ?? '';

  return (
    <div className="product-card bg-whiteColor shadow-lg rounded-lg p-2 m-4 md:p-4 md:m-4 transition-transform hover:scale-105 cursor-pointer">
      <div className="product-image flex justify-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-32 h-32 rounded-sm object-cover md:h-48 md:w-48"
        />
      </div>
      <div className="product-name-cart-button pt-2">
        <div className="product-manufacturer">
          <div className="name-price flex justify-between">
            <h3 className="text-md font-bold">{product.name}</h3>
            <p className="text-md font-bold">${price}</p>
          </div>
          <p className="text-sm p-2 text-[#949191]">{product.manufacturer}</p>
        </div>
        <div className="cart-button mt-4">
          <div className="cart-wish-icons-ratings flex justify-between">
            <div className="cart-wish-icons text-2xl flex gap-2">
                <TiShoppingCart className='cursor-pointer'/>
                <FaHeart className='cursor-pointer'/>
            </div>
            <div className="ratings flex ">
              <StarRating reviews={product.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
