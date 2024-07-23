import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderItemsQuery } from '../../services/orderItemsApi';
import { setIsOrderItemsFetching, setOrderItems } from '../../redux/slices/orderItemsSlice';
import FeedbackModal from './FeedbackModal';
import ConfirmationModal from './ConfirmationModal';
import { useCancelOrderMutation } from '../../services/orderApi';


function OrderDetails({ orderss }: any) {
  const dispatch = useDispatch();
  const { data } = orderss;
  const [cancelOrderMutation] = useCancelOrderMutation();
  const activeMenuId = useSelector((state: any) => state.activeMenu.id);
  const { data: orderDetails, error, isLoading } = useGetOrderItemsQuery(activeMenuId);

  // State for feedback modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  // State for confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState<string | null>(null);

  // Find the active order with 'delivered' or 'pending' status
  const activeOrder = data.find((order: any) => order.id === activeMenuId);
  const isPending = activeOrder?.status === 'pending';
  const isDelivered = activeOrder?.status === 'delivered';

  // Handle API call and Redux state updates
  useEffect(() => {
    if (isLoading) {
      dispatch(setIsOrderItemsFetching(true));
    } else if (orderDetails) {
      dispatch(setOrderItems(orderDetails.orderItems));
      dispatch(setIsOrderItemsFetching(false));
    }
  }, [isLoading, error, orderDetails, dispatch]);

  // Redux state for order items and loading/error status
  const orderItems = useSelector((state: any) => state.orderItems.orderItems);
  const isOrderItemsFetching = useSelector((state: any) => state.orderItems.isOrderItemsFetching);
  const orderItemsError = useSelector((state: any) => state.orderItems.orderItemsError);

  if (isOrderItemsFetching) {
    return <p>Loading...</p>;
  }

  if (orderItemsError) {
    return <p>Error loading order details: {orderItemsError}</p>;
  }

  if (orderItems.length === 0) {
    return <p>No order details found</p>;
  }

  const handleCancelOrder = async (orderId: string) => {
    setOrderIdToCancel(orderId);
    setConfirmModalOpen(true);
  };

  const confirmCancelOrder = async () => {
    if (!orderIdToCancel) return;

    try {
      await cancelOrderMutation(orderIdToCancel).unwrap();
      sessionStorage.setItem('navigateTo', 'orders');
      window.location.reload();
      setConfirmModalOpen(false);
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleAddFeedback = (product: any) => {
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
    sessionStorage.setItem('navigateTo', 'orders');
    window.location.reload();
    setModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="order-details space-y-4">
        {/* Order Items */}
        <div className="order-items p-4 bg-gray-50 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="space-y-4">
            {orderItems.map((product: any) => (
              <div key={product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-medium">{product.quantity}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">${product.sizes[0].price}</span>
                </div>
                {/* Conditionally render the review button */}
                {isDelivered && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleAddFeedback(product)}
                      className="bg-darkGreen text-whiteColor py-1 px-4 rounded-md"
                    >
                      Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="actions p-4 bg-gray-50 rounded-md flex justify-end space-x-4">
          {isPending && (
            <>
              <button
                className="px-6 py-2 bg-redColor text-whiteColor rounded-lg hover:bg-red-600 transition duration-200"
                 onClick={() => orderDetails?.orderId && handleCancelOrder(orderDetails.orderId)}
>
                Cancel
              </button>
              <button className="px-6 py-2 bg-darkGreen text-whiteColor rounded-md hover:bg-greenColor transition duration-200">
                Go To Payment
              </button>
            </>
          )}
        </div>
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
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmCancelOrder}
        message="Are you sure you want to cancel this order?"
      />
    </div>
  );
}

export default OrderDetails;

