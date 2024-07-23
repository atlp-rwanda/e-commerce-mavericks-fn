import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserWishlistQuery, useClearWishlistMutation } from '../../services/wishlistApi';
import { clearWishLists, setWishLists } from '../../redux/slices/wishlistSlice';

function WishList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserWishlistQuery();
  const [clearWishlist] = useClearWishlistMutation();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);

  const handleClearWishlist = async () => {
    try {
      await clearWishlist().unwrap();
      dispatch(clearWishLists());
    } catch (error) {
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setWishLists(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <div className='font-bold text-2xl'>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Wish List</h1>
      <button
        onClick={handleClearWishlist}
        className="mb-6 bg-redColor text-whiteColor py-2 px-4 rounded-md"
      >
        Clear Wishlist
      </button>
      {wishlistItems.length === 0 ? (
        <div className="text-xl text-gray-500">No items in your wishlist</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item:any) => (
            <div
              key={item.id}
              className="product-card bg-white shadow-lg rounded-lg p-4 m-4 transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="product-image flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-sm object-cover md:h-48 md:w-48"
                />
              </div>
              <div className="product-details pt-2">
                <h3 className="text-md font-bold">{item.name}</h3>
                <p className="text-md font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
