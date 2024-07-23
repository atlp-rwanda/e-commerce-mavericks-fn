import React, { useState } from 'react';
import { useSubmitFeedbackMutation } from '../../services/feedbackApi';

interface FeedbackModalProps {
  productName: string;
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { message: string; image: File | null; rating: number }) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ productName, productId, isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [submitFeedback, { isLoading, error }] = useSubmitFeedbackMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dummyImage = 'https://via.placeholder.com/150';
    const feedbackImage: any = image || dummyImage;

    try {
      await submitFeedback({ productId, feedbackData: { message, image:feedbackImage, rating } }).unwrap();
      onSubmit({ message, image, rating });
      onClose();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blackColor bg-opacity-50">
      <div className="bg-whiteColor p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{productName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Feedback Message
            </label>
            <textarea
              id="message"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload Image (optional)
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Rating
            </label>
            <select
              id="rating"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              <option value={0} disabled>Select rating</option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate} star{rate > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-darkGreen text-whiteColor px-4 py-2 rounded hover:bg-greenColor"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">You already Provided feedback.</p>}
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
