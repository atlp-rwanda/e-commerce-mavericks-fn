import { Product } from '../../types/Types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product?.images?.[0] ?? 'default-image-url';
  const price = product?.sizes?.[0]?.price ?? 'default-image-url';

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-48 w-full rounded-sm"
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
        <div className="cart-button">
          <button className="px-5 py-2 text-center bg-[#007A7A] text-whiteColor font-bold rounded-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
