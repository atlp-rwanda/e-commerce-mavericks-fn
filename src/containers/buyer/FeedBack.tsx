import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { FaStar, FaRegStar } from 'react-icons/fa';

type Rating = number;

interface Product {
  id: string;
  name: string;
  price: string;
  manufacturer: string;
  ratings: Rating[];
}

const productsData: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: '$100',
    manufacturer: 'Manufacturer A',
    ratings: [],
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$200',
    manufacturer: 'Manufacturer B',
    ratings: [4],
  },
  {
    id: '3',
    name: 'Product 3',
    price: '$300',
    manufacturer: 'Manufacturer C',
    ratings: [3],
  },
];

const FeedBack: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddFeedback = (product: Product) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  const handleFeedbackSubmit = (feedback: { message: string; image: File | null; rating: number }) => {
    console.log('Feedback submitted for product:', currentProduct?.id);
    console.log('Feedback details:', feedback);
  };

  const handleDeleteFeedback = (productId: string, feedbackIndex: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              ratings: product.ratings.filter((_, index) => index !== feedbackIndex),
            }
          : product
      )
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <div className="max-w-4xl p-8 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Purchased Products</h1>
      {currentProducts.map((product, index) => (
        <div
          key={product.id}
          className={`mb-4 p-2 rounded-md shadow-sm ${index % 2 === 0 ? 'bg-grayColor' : 'bg-whiteColor'}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            </div>
            <div className="flex items-center">
              {product.ratings.length === 0 ? (
                <button
                  onClick={() => handleAddFeedback(product)}
                  className="bg-darkGreen text-whiteColor px-3 py-1 rounded shadow hover:bg-greenColor transition duration-200"
                >
                  Add Feedback
                </button>
              ) : (
                <div className="flex flex-col space-y-1">
                  {product.ratings.map((rating, index) => (
                    <div key={index} className="flex justify-between items-center gap-4">
                      <div className="flex items-center">
                        <div className="flex">{renderStars(rating)}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteFeedback(product.id, index)}
                        className="bg-redColor text-whiteColor px-2 py-1 rounded shadow transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? 'bg-green-500 text-white'
                : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {currentProduct && (
        <FeedbackModal
          productName={currentProduct.name}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleFeedbackSubmit}
          productId={currentProduct.id}
        />
      )}
    </div>
  );
};

export default FeedBack;
