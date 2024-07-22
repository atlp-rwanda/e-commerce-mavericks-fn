import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { Review } from '../../types/Types';

interface RatingsProps {
  reviews: Review[];
}

const StarRating: React.FC<RatingsProps> = ({ reviews }) => {
  // Calculate the average rating
  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (averageRating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (averageRating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<CiStar key={i} />);
      }
    }
    return stars;
  };
  return <div className="ratings flex items-center gap-1 w-12">
    <span className='flex'>{renderStars()}</span>
    <span className='text-sm'>({reviews.length > 0 ? averageRating : '0'})</span>
  </div>;
};

export default StarRating;
