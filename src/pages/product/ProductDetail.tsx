import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Button from '../../components/common/Button';
import Navbar from '../../components/navbar/Navbar';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ProductReviewCard from '../../components/Products/ProductReviewCard';
import { ImageToggle } from '../../components/Products/ImageToggle';
import { ImageCard } from '../../components/Products/ImageCard';
import { ColorComponent } from '../../components/Products/ColorComponent';
import { useGetProductByIdQuery } from '../../services/productApi';
import { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import { useAddProductToWishlistMutation, useGetUserWishlistQuery } from '../../services/wishlistApi';
import ProductDetailSkeleton from '../../containers/ProductDetail/ProductDetailSkeleton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAddProductToCartMutation } from '../../services/cartApi';
import { toast } from 'react-toastify';
import { QueryErrorData } from '../../utils/schemas';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import { Product, Size } from '../../types/Types';
import { useRef } from 'react';
import useCheckToken from '../../hooks/useCheckToken';
import StarRating from '../../components/common/Ratings';
import { RootState } from '../../redux/store';
import { toastConfig } from '../../utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const isExpired = useCheckToken();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.user.token);

  const authenticated = isAuthenticated !== null;
  const { data: productData, error: productError, isLoading: productLoading } = useGetProductByIdQuery(id!);
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const [addProductToCart, { isLoading: cartLoading }] = useAddProductToCartMutation();
  const { data } = useGetUserWishlistQuery(undefined, { skip: !authenticated });
  const products: Product[] = useSelector((state: RootState) => state.products.productsDataList);

  const [spottedImage, setSpottedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isInWishlist, setIsInwishlist] = useState(false);
  const recommendedProductsRef = useRef<HTMLDivElement>(null);
  let similarProducts: Product[] = [];

  useEffect(() => {
    if (productData) {
      setSpottedImage(productData.data.images[0]);
    }
    if (!selectedSize) {
      setSelectedSize(productData?.data.sizes[0]);
    }
  }, [productData]);

  useEffect(() => {
    if (data && selectedSize) {
      setIsInwishlist(data.data.some((size: any) => selectedSize.id === size.productId));
    }
  }, [data, selectedSize]);

  similarProducts = products.filter(product => product.categoryId === productData?.data.categoryId);

  if (productLoading) {
    return <ProductDetailSkeleton />;
  }

  if (productError) {
    navigate('/');
    return <div>Error loading product details</div>;
  }

  const scrollRecommendedProducts = (direction: string) => {
    if (recommendedProductsRef.current) {
      const { current } = recommendedProductsRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'right') {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (!productData) {
    navigate('/');
    toast.error('No product data found', toastConfig);
    return;
  }
  const handleSideImage = (image: string) => {
    setSpottedImage(image);
  };

  const handleImageNavigation = (direction: string) => {
    const productImages = productData.data.images;
    const index = productImages.findIndex(image => image === spottedImage);

    let newIndex;
    if (direction === 'forward') {
      newIndex = (index + 1) % productImages.length;
    } else if (direction === 'backward') {
      newIndex = (index - 1 + productImages.length) % productImages.length;
    }

    setSpottedImage(productImages[newIndex!]);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // A FUNCTION TO HANDLE ADDING A PRODUCT TO WISHLIST
  const handleAddToWishlist = async () => {
    if (!isAuthenticated || isExpired) {
      navigate('/login', { state: { from: location } });
    }
    try {
      const sizeId = selectedSize?.id;
      const result = await addProductToWishlist(sizeId!).unwrap();
      if (result) {
        const message: string = result.message;
        toast.success(message, toastConfig!);
      }
    } catch (error) {
      const message: string = (error as QueryErrorData).data.message!;
      toast.error(message, toastConfig);
    }
  };

  // A FUNCTION TO HANDLE ADDING A PRODUCT TO CART
  const handleAddToCart = async () => {
    if (!isAuthenticated || isExpired) {
      navigate('/login');
    }
    try {
      const productId: string = productData?.data.id;
      const sizeId = selectedSize?.id;
      const result = await addProductToCart({ productId, sizeId });

      if (result.error) {
        const message: string = (result.error as QueryErrorData).data.message!;
        toast.error(message, toastConfig);
      } else {
        const message: string = result.data.message;
        toast.success(message, toastConfig);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  //  FUNCTION TO HANDLE SIZE CHANGES AND RENDER THE VALUES ASSOCIATED WITH PRODUCT SIZE LIKE PRICE....
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentSize = productData.data.sizes.find(Size => Size.size === e.target.value);
    if (currentSize) {
      setSelectedSize(currentSize);
    }
  };

  return (
    <>
      <div className='w-full space-y-2'>
        <Navbar />
        <div className='w-full lg:flex lg:px-12'>
          <div className='lg:flex md:flex relative lg:flex-auto'>
            <div className='hidden lg:max-h-[500px] gap-2 md:flex md:flex-col md:mx-auto md:max-h-[400px] lg:flex lg:flex-col overflow-y-scroll scrollbar'>
              {productData.data.images.map(image => (
                <ImageCard
                  key={image}
                  handleClick={handleSideImage}
                  styles='w-20 h-20 mx-auto mt-2 object-cover hover:cursor-pointer'
                  image={image}
                  enableZoom={false}
                  isSpotted={image === spottedImage}
                />
              ))}
            </div>
            <div className='relative w-full overflow-hidden md:w-4/5 lg:min-h-[500px] md:min-h-[500px] lg:min-w-4/5 mx-auto'>
              <ImageCard
                image={spottedImage!}
                styles='md:min-h-full max-h-96 rounded-sm lg:min-h-full w-full object-cover'
              />
              <ImageToggle
                handleClick={() => handleImageNavigation('forward')}
                size='20px'
                icon={IoIosArrowForward}
                positionClass='right-4 lg:right-10 top-1/2'
              />
              <ImageToggle
                handleClick={() => handleImageNavigation('backward')}
                size='20px'
                icon={IoIosArrowBack}
                positionClass='left-4 lg:left-10 top-1/2'
              />
            </div>
          </div>
          <div className='lg:w-2/5 px-3 space-y-3 mt-3'>
            {/* SIZE SELECTOR DIV */}
            <div className='lg:flex lg:flex-col md:flex md:gap-8'>
              <div className='lg:w-full md:w-1/2'>
                <div className='w-full gap-3 flex mb-3 justify-between text-2xl font-semibold'>
                  <p className='w-3/5 flex-1'>{productData.data.name}</p>
                  <p>${selectedSize?.price || productData.data.sizes[0].price}</p>
                </div>
                <div>
                  {productData.data.colors ? (
                    <div>
                      <p className='font-medium'>Color</p>
                      <div className='flex gap-2 w-full p-2 flex-wrap'>
                        {productData.data.colors?.map(color => <ColorComponent key={color} name={color} />)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className='flex'>
                  <div className='w-full flex flex-col gap-2'>
                    <label htmlFor='size' className='leading-none font-medium'>
                      Size
                    </label>
                    <div className='flex w-full gap-2'>
                      <select
                        name='size'
                        id='size'
                        className='border-greenColor border-2 rounded-full lg:py-2 text-sm px-2 bg-whiteColor w-1/2 outline-none hover:cursor-pointer'
                        onChange={e => handleSizeChange(e)}
                      >
                        {productData.data.sizes.map(size => (
                          <option key={size.size}>{size.size}</option>
                        ))}
                      </select>
                      <div
                        className={`flex border-2 items-center transition-all py-1 px-6 gap-4 rounded-full w-1/2 border-blackColor ${
                          isInWishlist
                            ? 'bg-greenColor text-whiteColor border-2 border-greenColor cursor-not-allowed'
                            : 'hover:bg-greenColor hover:text-whiteColor hover:border-2 hover:border-greenColor hover:cursor-pointer'
                        }`}
                        onClick={!isInWishlist ? handleAddToWishlist : undefined}
                      >
                        {isInWishlist ? <FaHeart size='20px' /> : <FaRegHeart size='20px' />}
                        <span className='text-sm lg:text-sm'>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  disabled={cartLoading}
                  onClick={handleAddToCart}
                  text={cartLoading ? 'Loading ...' : 'ADD TO CART'}
                  className='w-full rounded-3xl py-2 my-4 transition-all disabled:bg-blackColor'
                />
              </div>
              <div className='lg:w-full md:w-1/2'>
                {/* PRODUCT stars */}
                <div className='border-y border-grayColor gap-3 flex flex-row items-center py-4'>
                  <span>Review</span>
                  <span className='flex'>
                    <StarRating reviews={productData.data.reviews} />
                  </span>
                </div>
                {/* PRODUCT DESCRIPTION */}
                <div className='border-b text-sm border-grayColor py-2'>
                  <p>
                    {isDescriptionExpanded
                      ? productData.data.description
                      : `${productData.data.description.substring(0, 100)}...`}
                  </p>
                  <p
                    className='text-greenColor mt-4 font-medium text-right hover:cursor-pointer'
                    onClick={toggleDescription}
                  >
                    {isDescriptionExpanded ? 'Show less' : 'Show more'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCT REVIEW AND COMMENTS */}
      <div className='lg:px-12 lg:flex my-4 border-y border-grayColor'>
        {productData.data.reviews.length > 0 && (
          <div className='lg:w-1/2  border-grayColor lg:rounded-sm lg:p-2 relative'>
            <div className='max-h-96'>
              <h1 className='font-bold text-2xl border-b border-grayColor py-4'>Product Reviews</h1>
              <div className='flex flex-col max-h-80 overflow-y-scroll  scrollbar snap-y snap-mandatory'>
                {productData.data.reviews.map(review => (
                  <ProductReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RECOMMENDED PRODUCTS */}
        <div
          className={productData.data.reviews.length === 0 ? 'w-full relative py-2' : 'w-full lg:w-3/5 relative py-2'}
        >
          <h1 className='font-bold text-2xl border-b border-grayColor py-4'>Similar Products</h1>
          <div className='flex items-center'>
            <ImageToggle
              handleClick={() => scrollRecommendedProducts('left')}
              size='16px'
              icon={IoIosArrowBack}
              positionClass='absolute left-0 ml-2 z-50'
            />
            <div
              ref={recommendedProductsRef}
              className='flex overflow-scroll gap-4 lg:gap-8 py-2 scrollbar scroll-smooth'
            >
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ImageToggle
              handleClick={() => scrollRecommendedProducts('right')}
              size='16px'
              icon={IoIosArrowForward}
              positionClass='absolute right-0 mr-2'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
