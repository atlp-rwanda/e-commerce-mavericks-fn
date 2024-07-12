import React from 'react';
import { Review } from '../../utils/schemas';
import { FaStar } from 'react-icons/fa';
import defaultProfile from '../../assets/defaultProfile.avif';

interface Props {
  review: Review;
}

const ProductReviewCard: React.FC<Props> = ({ review }) => {
  const dateReviewed = new Date(review.createdAt).toLocaleDateString();
  const reviewText = review.feedback;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} size='15px' color={index < rating ? '#ffc107' : '#e4e5e9'} />
    ));
  };

  return (
    <div className='flex border-b border-grayColor py-2 snap-center'>
      <div className='flex p-2 w-1/5 min-h-14 justify-center'>
        <img className='rounded-full h-14 w-14' src={review.user.photoUrl || defaultProfile} alt='Buyer' />
      </div>
      <div className='w-4/5 p-2'>
        <div className='space-y-1'>
          <p className='font-medium'>{review.user.firstName}</p>
          <div className='flex gap-4 items-center'>
            <span className='flex'>{renderStars(review.rating)}</span>
            <span className='text-xs text-gray-500'>{dateReviewed}</span>
          </div>
          <p className='text-sm'>{reviewText}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
